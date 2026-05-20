/*
Base : https://live3d.io
By : ZennzXD
*/

const crypto = require('crypto')
const fs = require('fs')
const path = require('path')
const os = require('os')
const CryptoJS = require('crypto-js')

const PUBLIC_KEY = `-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCwlO+boC6cwRo3UfXVBadaYwcX
0zKS2fuVNY2qZ0dgwb1NJ+/Q9FeAosL4ONiosD71on3PVYqRUlL5045mvH2K9i8b
AFVMEip7E6RMK6tKAAif7xzZrXnP1GZ5Rijtqdgwh+YmzTo39cuBCsZqK9oEoeQ3
r/myG9S+9cR5huTuFQIDAQAB
-----END PUBLIC KEY-----`

const APP_ID = 'aifaceswap'
const U_ID = '1H5tRtzsBkqXcaJ'
const BASE_HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36',
  'origin': 'https://live3d.io',
  'referer': 'https://live3d.io/',
  'theme-version': '83EmcUoQTUv50LhNx0VrdcK8rcGexcP35FcZDcpgWsAXEyO4xqL5shCY6sFIWB2Q'
}

function generateRandomString(len) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let res = ''
  for (let i = 0; i < len; i++) res += chars.charAt(Math.floor(Math.random() * chars.length))
  return res
}

function aesenc(data, key) {
  const k = CryptoJS.enc.Utf8.parse(key)
  return CryptoJS.AES.encrypt(data, k, {
    iv: k,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  }).toString()
}

function rsaenc(data) {
  return crypto.publicEncrypt(
    { key: PUBLIC_KEY, padding: crypto.constants.RSA_PKCS1_PADDING },
    Buffer.from(data, 'utf8')
  ).toString('base64')
}

function gencryptoheaders(type, fp = null) {
  const now = Math.floor(Date.now() / 1000)
  const r = crypto.randomUUID()
  const i = generateRandomString(16)
  const fingerPrint = fp || crypto.randomBytes(16).toString('hex')
  const s = rsaenc(i)

  const signStr = type === 'upload'
    ? `${APP_ID}:${r}:${s}`
    : `${APP_ID}:${U_ID}:${now}:${r}:${s}`

  return {
    fp: fingerPrint,
    fp1: aesenc(`${APP_ID}:${fingerPrint}`, i),
    'x-guide': s,
    'x-sign': aesenc(signStr, i),
    'x-code': Date.now().toString()
  }
}

async function downloadImageToTemp(imageUrl) {
  const res = await fetch(imageUrl)
  if (!res.ok) throw new Error(`Gagal download gambar: ${res.status} ${res.statusText}`)
  const contentType = res.headers.get('content-type') || 'image/jpeg'
  const ext = contentType.includes('png') ? '.png' : contentType.includes('webp') ? '.webp' : '.jpg'
  const tmpPath = path.join(os.tmpdir(), `live3d_${Date.now()}${ext}`)
  fs.writeFileSync(tmpPath, Buffer.from(await res.arrayBuffer()))
  return { tmpPath, contentType }
}

async function upimage(imgPath, contentType = 'image/jpeg') {
  const cryptoHeaders = gencryptoheaders('upload')
  const form = new FormData()
  form.append('file', new Blob([fs.readFileSync(imgPath)], { type: contentType }), path.basename(imgPath))
  form.append('fn_name', 'demo-image-editor')
  form.append('request_from', '9')
  form.append('origin_from', '8f3f0c7387123ae0')

  const res = await fetch('https://app.live3d.io/aitools/upload-img', {
    method: 'POST',
    headers: { ...BASE_HEADERS, ...cryptoHeaders },
    body: form
  })
  const data = await res.json()
  if (!data?.data?.path) throw new Error('Upload gagal: ' + JSON.stringify(data))
  return { path: data.data.path, fp: cryptoHeaders.fp }
}

async function createJob(imgRemote, prompt, fp) {
  const cryptoHeaders = gencryptoheaders('create', fp)
  const res = await fetch('https://app.live3d.io/aitools/of/create', {
    method: 'POST',
    headers: { ...BASE_HEADERS, 'Content-Type': 'application/json', ...cryptoHeaders },
    body: JSON.stringify({
      fn_name: 'demo-image-editor',
      call_type: 3,
      input: { model: 'nano_banana_pro', source_images: [imgRemote], prompt, aspect_radio: 'auto', request_from: 9 },
      request_from: 9,
      origin_from: '8f3f0c7387123ae0'
    })
  })
  const data = await res.json()
  if (!data?.data?.task_id) throw new Error('Buat job gagal: ' + JSON.stringify(data))
  return data.data.task_id
}

async function checkJob(taskId, fp) {
  const cryptoHeaders = gencryptoheaders('check', fp)
  const res = await fetch('https://app.live3d.io/aitools/of/check-status', {
    method: 'POST',
    headers: { ...BASE_HEADERS, 'Content-Type': 'application/json', ...cryptoHeaders },
    body: JSON.stringify({
      task_id: taskId,
      fn_name: 'demo-image-editor',
      call_type: 3,
      request_from: 9,
      origin_from: '8f3f0c7387123ae0'
    })
  })
  const data = await res.json()
  return data.data
}

async function handler(req, res) {
  const { imageUrl, prompt } = req.query

  if (!imageUrl) {
    return res.status(400).json({
      status: false,
      message: 'Query ?imageUrl= wajib diisi',
      example: '/api/ai/editimg?imageUrl=https://example.com/foto.jpg&prompt=ubah agar dia tersenyum'
    })
  }

  if (!prompt) {
    return res.status(400).json({
      status: false,
      message: 'Query ?prompt= wajib diisi',
      example: '/api/ai/editimg?imageUrl=https://example.com/foto.jpg&prompt=ubah agar dia tersenyum'
    })
  }

  try { new URL(imageUrl) } catch {
    return res.status(400).json({ status: false, message: 'imageUrl bukan URL yang valid' })
  }

  let tmpPath = null
  try {
    const { tmpPath: tp, contentType } = await downloadImageToTemp(imageUrl)
    tmpPath = tp

    const uploadInfo = await upimage(tmpPath, contentType)
    const taskId = await createJob(uploadInfo.path, prompt, uploadInfo.fp)

    let result, attempts = 0
    do {
      if (attempts >= 10) throw new Error('Timeout: job tidak selesai dalam waktu yang ditentukan')
      await new Promise(r => setTimeout(r, 4000))
      result = await checkJob(taskId, uploadInfo.fp)
      attempts++
    } while (result.status !== 2)

    return res.json({
      status: true,
      creator: 'Danzz',
      task_id: taskId,
      image: 'https://temp.live3d.io/' + result.result_image
    })
  } catch (err) {
    return res.status(500).json({ status: false, message: err.message })
  } finally {
    if (tmpPath && fs.existsSync(tmpPath)) fs.unlinkSync(tmpPath)
  }
}

module.exports = { handler }
    
