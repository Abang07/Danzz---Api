const axios = require('axios');
const crypto = require('crypto');
const FormData = require('form-data');

const meta = {
  param: 'prompt',
  desc: 'Edit gambar dengan AI (?prompt=deskripsi&url=link_gambar)',
  placeholder: 'ubah background jadi pantai',
  params: [
    { name: 'prompt', placeholder: 'ubah background jadi pantai' },
    { name: 'url', placeholder: 'https://example.com/foto.jpg' },
  ]
}

const config = {
  pkey: "LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0KTUlHZk1BMEdDU3FHU0liM0RRRUJBUVVBQTRHTkFEQ0JpUUtCZ1FDd2xPK2JvQzZjd1JvM1VmWFZCYWRhWXdjWDB6S1MyZnVWTlkycVowZGd3YjFOSisvUTlGZUFvc0w0T05pb3NENzFvbjNQVllxUlVsTDUwNDVtdkgySzlpOGJBRlZNRWlwN0U2Uk1LNnRLQUFpZjd4elpyWG5QMUdaNVJpanRxZGd3aCtZbXpUbzM5Y3VCQ3NacUs5b0VvZVEzci9teUc5Uys5Y1I1aHVUdUZRSURBUUFCCi0tLS0tRU5EIFBVQkxJQyBLRVktLS0tLQ==",
  aid: "aifaceswap",
  uid: "1H5tRtzsBkqXcaJ",
  origin: "8f3f0c7387123ae0",
  theme_version: '83EmcUoQTUv50LhNx0VrdcK8rcGexcP35FcZDcpgWsAXEyO4xqL5shCY6sFIWB2Q',
  model: 'nano_banana_2',
}

const crypt = {
  aes: (data, key) => {
    const cipher = crypto.createCipheriv('aes-128-cbc', key, key)
    return Buffer.concat([cipher.update(data, 'utf8'), cipher.final()]).toString('base64')
  },
  rsa: (data) => {
    return crypto.publicEncrypt({
      key: Buffer.from(config.pkey, 'base64').toString(),
      padding: crypto.constants.RSA_PKCS1_PADDING,
    }, Buffer.from(data, 'utf8')).toString('base64')
  }
}

function createApi() {
  const currentFp = crypto.randomBytes(16).toString('hex')

  const api = axios.create({
    baseURL: 'https://app-v1.live3d.io',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Linux; Android 16; NX729J) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.7499.34 Mobile Safari/537.36',
      'origin': 'https://live3d.io',
      'referer': 'https://live3d.io/',
      'theme-version': config.theme_version
    }
  })

  api.interceptors.request.use((cfg) => {
    const i = crypto.randomBytes(8).toString('hex')
    const d = crypto.randomUUID()
    const n = Math.floor(Date.now() / 1000)
    const s = crypt.rsa(i)
    const signStr = cfg.url.includes('upload-img')
      ? `${config.aid}:${d}:${s}`
      : `${config.aid}:${config.uid}:${n}:${d}:${s}`

    Object.assign(cfg.headers, {
      'fp': currentFp,
      'fp1': crypt.aes(`${config.aid}:${currentFp}`, i),
      'x-guide': s,
      'x-sign': crypt.aes(signStr, i),
      'x-code': Date.now().toString()
    })

    return cfg
  })

  return api
}

async function processImage(prompt, buffer) {
  const api = createApi()

  const form = new FormData()
  form.append('file', buffer, { filename: 'input.jpg', contentType: 'image/jpeg' })
  form.append('fn_name', 'demo-image-editor')
  form.append('request_from', '9')
  form.append('origin_from', config.origin)

  const { data: upRes } = await api.post('/aitools/upload-img', form, {
    headers: form.getHeaders()
  })

  if (!upRes?.data?.path) throw new Error(`Upload gagal: ${JSON.stringify(upRes)}`)

  const { data: job } = await api.post('/aitools/of/create', {
    fn_name: 'demo-image-editor',
    call_type: 3,
    input: {
      model: config.model,
      source_images: [upRes.data.path],
      prompt,
      aspect_radio: 'auto',
      request_from: 9
    },
    data: '',
    request_from: 9,
    origin_from: config.origin
  })

  const taskId = job?.data?.task_id
  if (!taskId) throw new Error(`TaskId tidak ditemukan: ${JSON.stringify(job)}`)

  for (let i = 0; i < 40; i++) {
    const { data: status } = await api.post('/aitools/of/check-status', {
      task_id: taskId,
      fn_name: 'demo-image-editor',
      call_type: 3,
      request_from: 9,
      origin_from: config.origin
    })

    if (status?.data?.status === 2) {
      return 'https://temp.live3d.io/' + status.data.result_image
    }
    if (status?.data?.status === 3) {
      throw new Error(status?.data?.msg || 'Task failed')
    }

    await new Promise(r => setTimeout(r, 3000))
  }

  throw new Error('Timeout menunggu hasil gambar')
}

async function handler(req, res) {
  const prompt   = req.query.prompt || req.query.text || req.query.q
  const imageUrl = req.query.url || req.query.image

  if (!prompt) return res.status(400).json({ status: false, message: 'Parameter ?prompt= wajib diisi' })
  if (!imageUrl) return res.status(400).json({ status: false, message: 'Parameter ?url= wajib diisi (link gambar)' })

  try {
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' })
    const buffer = Buffer.from(response.data)

    const resultUrl = await processImage(prompt, buffer)

    return res.json({
      status: true,
      creator: 'Danzz',
      prompt,
      result: resultUrl
    })
  } catch (err) {
    return res.status(500).json({ status: false, message: 'Terjadi kesalahan', error: err.message })
  }
}

module.exports = { meta, handler }