const axios = require('axios')
const cheerio = require('cheerio')

async function downloadYoutubeKol(videoUrl) {
  const { data: html, headers } = await axios.get("https://kol.id/download-video/youtube")
  const match = html.match(/_token:\s*['"]([^'"]+)['"]/)
  const token = match ? match[1] : null
  if (!token) throw new Error("Token not found")

  const setCookie = headers['set-cookie'] || []
  const cookieHeader = setCookie.map(c => c.split(';')[0]).join('; ')

  const response = await axios.post(
    'https://kol.id/download-video/youtube',
    new URLSearchParams({ url: videoUrl, _token: token }),
    {
      headers: {
        'accept': '*/*',
        'accept-language': 'ms-MY',
        'cache-control': 'no-cache',
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'origin': 'https://kol.id',
        'pragma': 'no-cache',
        cookie: cookieHeader,
        'referer': 'https://kol.id/download-video/youtube',
        'user-agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Mobile Safari/537.36',
        'x-requested-with': 'XMLHttpRequest'
      }
    }
  )

  const $ = cheerio.load(response.data.html)

  const title = $('#title-content-here h2').text().trim()
  const thumbnail = $('#popupCover').attr('src')
  const channelName = $('.channel-info').clone().children().remove().end().text().trim()
  const avatar = $('.channel-info img').attr('src')
  const subscribers = $('.subscriber-info').text().replace(/[()]/g, '').trim()
  const duration = $('.time-details span')
    .filter((i, el) => $(el).text().includes('Duration'))
    .text().replace('Duration:', '').trim()

  const downloads = []
  $('.dropdown-menu a, .growth-btn').each((i, el) => {
    const label = $(el).text().trim()
    const url = $(el).attr('href')
    if (!url) return
    const itagMatch = url.match(/itag=(\d+)/)
    const mimeMatch = url.match(/mime=([^&]+)/)
    downloads.push({
      label,
      url: url.replace(/&amp;/g, '&'),
      itag: itagMatch ? itagMatch[1] : null,
      mime: mimeMatch ? decodeURIComponent(mimeMatch[1]) : null
    })
  })

  return {
    title,
    thumbnail,
    channel: { name: channelName, avatar, subscribers },
    duration,
    downloads
  }
}

async function handler(req, res) {
  const { url } = req.query

  if (!url) return res.status(400).json({
    status: false,
    message: 'Query ?url= wajib diisi',
    example: '/api/downloader/youtube?url=https://youtu.be/xxx'
  })

  if (!url.includes('youtube.com') && !url.includes('youtu.be')) {
    return res.status(400).json({ status: false, message: 'URL YouTube tidak valid.' })
  }

  try {
    const result = await downloadYoutubeKol(url)
    return res.json({ status: true, ...result })
  } catch (err) {
    return res.status(500).json({ status: false, message: err.message })
  }
}

module.exports = { handler }
