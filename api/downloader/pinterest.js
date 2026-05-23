const axios = require('axios');
const cheerio = require('cheerio');

const meta = {
  param: 'url',
  desc: 'Download foto/video dari Pinterest (?url=link_pinterest)',
  placeholder: 'https://pinterest.com/pin/xxx',
  params: [
    { name: 'url', placeholder: 'https://pinterest.com/pin/xxx' }
  ]
}

async function scrapePinterest(url) {
  const { data: html } = await axios.get(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
      'Accept-Language': 'en-US,en;q=0.9'
    },
    timeout: 15000
  })

  const $ = cheerio.load(html)

  // Ambil JSON data dari script tag
  let pinData = null
  $('script[data-relay-response="true"]').each((i, el) => {
    try {
      const json = JSON.parse($(el).html())
      const pin = json?.response?.data?.v3GetPinQuery?.data
      if (pin) { pinData = pin; return false }
    } catch {}
  })

  // Fallback: cari di __PWS_INITIAL_STRING__
  if (!pinData) {
    $('script').each((i, el) => {
      const content = $(el).html() || ''
      if (content.includes('__PWS_INITIAL_STRING__')) {
        try {
          const match = content.match(/__PWS_INITIAL_STRING__\s*=\s*'(.+?)';/)
          if (match) {
            const json = JSON.parse(decodeURIComponent(match[1]))
            const pins = json?.props?.initialReduxState?.pins
            if (pins) {
              const pinId = Object.keys(pins)[0]
              pinData = pins[pinId]
              return false
            }
          }
        } catch {}
      }
    })
  }

  // Fallback: ambil dari meta tag og
  if (!pinData) {
    const ogVideo = $('meta[property="og:video"]').attr('content')
    const ogImage = $('meta[property="og:image"]').attr('content')
    const ogTitle = $('meta[property="og:title"]').attr('content') || ''
    const ogDesc = $('meta[property="og:description"]').attr('content') || ''

    if (!ogVideo && !ogImage) throw new Error('Konten tidak ditemukan')

    return {
      title: ogTitle,
      description: ogDesc,
      type: ogVideo ? 'video' : 'photo',
      thumbnail: ogImage || null,
      videos: ogVideo ? [{ url: ogVideo }] : [],
      photos: ogImage && !ogVideo ? [{ url: ogImage }] : []
    }
  }

  // Parse dari pinData
  const title = pinData.title || pinData.grid_title || ''
  const description = pinData.description || ''
  const thumbnail = pinData.images?.orig?.url || pinData.images?.['736x']?.url || null

  // Cek video
  const videoList = []
  if (pinData.videos?.video_list) {
    const vl = pinData.videos.video_list
    for (const key of Object.keys(vl).sort()) {
      const v = vl[key]
      if (v?.url) videoList.push({ url: v.url, width: v.width, height: v.height })
    }
  }

  // Cek foto (carousel/multi-image)
  const photoList = []
  if (pinData.carousel_data?.carousel_slots?.length) {
    for (const slot of pinData.carousel_data.carousel_slots) {
      const imgUrl = slot.images?.orig?.url || slot.images?.['736x']?.url
      if (imgUrl) photoList.push({ url: imgUrl })
    }
  } else if (thumbnail && !videoList.length) {
    photoList.push({ url: thumbnail })
  }

  return {
    title,
    description,
    type: videoList.length ? 'video' : 'photo',
    thumbnail,
    videos: videoList,
    photos: photoList
  }
}

async function handler(req, res) {
  const url = req.query.url || req.query.link

  if (!url) return res.status(400).json({ status: false, message: 'Parameter ?url= wajib diisi' })
  if (!url.includes('pinterest.com') && !url.includes('pin.it')) {
    return res.status(400).json({ status: false, message: 'URL harus dari Pinterest' })
  }

  try {
    // Resolve short URL pin.it
    let finalUrl = url
    if (url.includes('pin.it')) {
      const resp = await axios.get(url, {
        maxRedirects: 5,
        timeout: 10000,
        headers: { 'User-Agent': 'Mozilla/5.0' }
      })
      finalUrl = resp.request.res.responseUrl || url
    }

    const result = await scrapePinterest(finalUrl)

    return res.json({
      status: true,
      creator: 'Danzz',
      result
    })
  } catch (err) {
    return res.status(500).json({ status: false, message: 'Terjadi kesalahan', error: err.message })
  }
}

module.exports = { meta, handler }