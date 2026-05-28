const axios = require('axios')
const cheerio = require('cheerio')

const meta = {
  param: 'url',
  desc: 'Download video dari Melolo',
  placeholder: 'https://melolo.com/id/dramas/xxx/ep1',
  params: [
    {
      name: 'url',
      placeholder: 'https://melolo.com/id/dramas/xxx/ep1'
    }
  ]
}

// =========================
// SCRAPER
// =========================
async function scrapeMelolo(url) {
  if (!url)
    throw new Error('URL episode diperlukan')

  // =========================
  // Request halaman episode
  // =========================
  const { data } = await axios.get(url, {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 Chrome/120.0.0.0 Mobile Safari/537.36',
      Referer: 'https://melolo.com/',
      Origin: 'https://melolo.com'
    },
    timeout: 20000
  })

  const $ = cheerio.load(data)

  // =========================
  // Title
  // =========================
  const title =
    $('h1').first().text().trim() ||
    $('title').text().trim() ||
    'Unknown'

  // =========================
  // Thumbnail
  // =========================
  const thumbnail =
    $('meta[property="og:image"]').attr('content') ||
    $('img').first().attr('src') ||
    null

  // =========================
  // Cari stream
  // =========================
  let streams = []

  // Regex stream
  const regex =
    /https?:\/\/[^\s"'<>]+?\.(m3u8|mp4)[^\s"'<>]*/g

  const matches = data.match(regex)

  if (matches && matches.length) {
    matches.forEach(v => {
      v = v
        .replace(/\\u002F/g, '/')
        .replace(/\\/g, '')
        .replace(/"/g, '')
        .trim()

      if (!streams.includes(v))
        streams.push(v)
    })
  }

  // iframe fallback
  $('iframe').each((i, el) => {
    let src = $(el).attr('src')

    if (
      src &&
      (src.includes('.m3u8') ||
        src.includes('.mp4'))
    ) {
      src = src
        .replace(/\\u002F/g, '/')
        .replace(/\\/g, '')
        .replace(/"/g, '')
        .trim()

      if (!streams.includes(src))
        streams.push(src)
    }
  })

  // video source fallback
  $('video source').each((i, el) => {
    let src = $(el).attr('src')

    if (
      src &&
      (src.includes('.m3u8') ||
        src.includes('.mp4'))
    ) {
      src = src
        .replace(/\\u002F/g, '/')
        .replace(/\\/g, '')
        .replace(/"/g, '')
        .trim()

      if (!streams.includes(src))
        streams.push(src)
    }
  })

  // =========================
  // Validasi
  // =========================
  if (!streams.length)
    throw new Error(
      'Stream video tidak ditemukan'
    )

  // =========================
  // Format result
  // =========================
  return {
    title,
    thumbnail,
    episode: url,
    total_streams: streams.length,
    streams: streams.map((v, i) => ({
      no: i + 1,
      type: v.includes('.m3u8')
        ? 'hls'
        : 'mp4',
      url: v
    }))
  }
}

// =========================
// HANDLER API
// =========================
async function handler(req, res) {
  const url =
    req.query.url ||
    req.query.link ||
    req.query.q

  if (!url) {
    return res.status(400).json({
      status: false,
      message:
        'Parameter ?url= wajib diisi'
    })
  }

  try {
    const result = await scrapeMelolo(url)

    return res.json({
      status: true,
      creator: 'Danzz',
      result
    })

  } catch (err) {
    return res.status(500).json({
      status: false,
      message: 'Terjadi kesalahan',
      error: err.message
    })
  }
}

module.exports = {
  meta,
  handler
}