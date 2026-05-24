const axios = require('axios');

const meta = {
  param: 'keyword',
  desc: 'Search foto/video dari Pinterest (?keyword=keyword)',
  placeholder: 'aesthetic room'
}

let cachedSession = null
let sessionExpiry = 0

async function getSession() {
  if (cachedSession && Date.now() < sessionExpiry) return cachedSession

  const res = await axios.get('https://id.pinterest.com/', {
    headers: {
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36 Edg/148.0.0.0',
      'accept-language': 'en-US,en;q=0.9'
    },
    timeout: 10000
  })

  const raw = res.headers['set-cookie'] || []
  const cookies = raw.map(c => c.split(';')[0]).join('; ')
  const csrf = raw.find(c => c.startsWith('csrftoken='))?.match(/csrftoken=([^;]+)/)?.[1] || ''

  cachedSession = { cookies, csrf }
  sessionExpiry = Date.now() + (30 * 60 * 1000)
  return cachedSession
}

async function searchPinterest(query) {
  const session = await getSession()

  const data = {
    options: {
      query,
      scope: 'pins',
      page_size: 25,
      refine_search_with_filters: true
    },
    context: {}
  }

  const sourceUrl = `/search/pins/?q=${encodeURIComponent(query)}`
  const { data: json } = await axios.get('https://id.pinterest.com/resource/BaseSearchResource/get/', {
    params: {
      source_url: sourceUrl,
      data: JSON.stringify(data),
      _: Date.now()
    },
    headers: {
      'accept': 'application/json, text/javascript, */*, q=0.01',
      'accept-language': 'en-US,en;q=0.9',
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36 Edg/148.0.0.0',
      'referer': `https://id.pinterest.com${sourceUrl}`,
      'x-requested-with': 'XMLHttpRequest',
      'x-app-version': '6d51d5a',
      'x-pinterest-appstate': 'active',
      'x-pinterest-pws-handler': 'www/search/[scope].js',
      'x-pinterest-source-url': sourceUrl,
      ...(session.csrf ? { 'x-csrftoken': session.csrf } : {}),
      ...(session.cookies ? { 'cookie': session.cookies } : {})
    },
    timeout: 15000
  })

  const payload = json?.resource_response?.data
  if (!payload) throw new Error('Tidak ada data dari Pinterest')

  const arr = Array.isArray(payload) ? payload : payload.results || []

  return arr.filter(x => x?.id).map(pin => ({
    title: pin.title || pin.grid_title || '',
    type: pin.videos?.video_list ? 'video' : 'photo',
    image: pin.images?.orig?.url || pin.images?.['736x']?.url || null,
    video: pin.videos?.video_list?.V_HLSV4?.url
      || pin.videos?.video_list?.V_EXP7?.url
      || pin.videos?.video_list?.V_720P?.url
      || null,
    username: pin.pinner?.username || null,
    fullName: pin.pinner?.full_name || null,
    pinUrl: `https://id.pinterest.com/pin/${pin.id}/`
  }))
}

async function handler(req, res) {
  const query = req.query.keyword || req.query.query || req.query.q || req.query.text

  if (!query) return res.status(400).json({ status: false, message: 'Parameter ?keyword= wajib diisi' })

  try {
    const results = await searchPinterest(query)
    return res.json({
      status: true,
      creator: 'Danzz',
      query,
      total: results.length,
      results
    })
  } catch (err) {
    return res.status(500).json({ status: false, message: 'Terjadi kesalahan', error: err.message })
  }
}

module.exports = { meta, handler }