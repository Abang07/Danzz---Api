/*
  detikNews Scraper All-in-One — REST API Edition
  Endpoint: /api/news/detik
  Format: CommonJS (CJS)
  Creator: Danzz
*/

const axios = require('axios')
const cheerio = require('cheerio')

// --- SCRAPER FUNCTIONS ---

async function scrapeLatest() {
  const url = 'https://news.detik.com'
  const { data } = await axios.get(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    }
  })
  const $ = cheerio.load(data)
  const articles = []

  $('article').each((index, element) => {
    const title = $(element).find('.media__title a').text().trim()
    const link = $(element).find('.media__title a').attr('href')
    const date = $(element).find('.media__date span').attr('title') || $(element).find('.media__date').text().trim()
    const image = $(element).find('.media__image img').attr('src') || $(element).find('.media__image img').attr('data-src')

    if (title && link) {
      articles.push({ title, link, date: date || null, image: image || null })
    }
  })
  return articles
}

async function scrapePopuler() {
  const url = 'https://news.detik.com/terpopuler'
  const { data } = await axios.get(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    }
  })
  const $ = cheerio.load(data)
  const articles = []

  $('.list-content article').each((index, element) => {
    const title = $(element).find('.media__title a').text().trim()
    const link = $(element).find('.media__title a').attr('href')
    const date = $(element).find('.media__date').text().trim()
    const image = $(element).find('.media__image img').attr('src') || $(element).find('.media__image img').attr('data-src')

    if (title && link) {
      articles.push({ title, link, date: date || null, image: image || null })
    }
  })
  return articles
}

async function scrapeSearch(query) {
  if (!query) throw new Error('Parameter "query/q" diperlukan untuk pencarian!')
  const url = `https://www.detik.com/search/searchall?query=${encodeURIComponent(query)}&siteid=2`
  const { data } = await axios.get(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    }
  })
  const $ = cheerio.load(data)
  const articles = []

  $('.list.media-rows article').each((index, element) => {
    const title = $(element).find('.title').text().trim()
    const link = $(element).find('a').attr('href')
    const date = $(element).find('.date').text().trim()
    const image = $(element).find('img').attr('src')

    if (title && link) {
      articles.push({ title, link, date: date || null, image: image || null })
    }
  })
  return articles
}

async function scrapeDetail(targetUrl) {
  if (!targetUrl) throw new Error('Parameter "url" diperlukan untuk melihat detail berita!')
  if (!targetUrl.includes('detik.com')) throw new Error('URL harus berupa link valid dari detik.com')

  const { data } = await axios.get(targetUrl, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    }
  })
  const $ = cheerio.load(data)
  
  const title = $('.detail__title').text().trim() || $('h1').text().trim()
  const date = $('.detail__date').text().trim() || $('.date').text().trim()
  const author = $('.detail__author').text().trim() || null
  
  let content = []
  $('.detail__body-text p').each((i, el) => {
    const pText = $(el).text().trim()
    if (pText) content.push(pText)
  })

  if (content.length === 0) {
    $('.itp_bodycontent p').each((i, el) => {
      const pText = $(el).text().trim()
      if (pText) content.push(pText)
    })
  }

  return { title, author, date, content: content.join('\n\n') }
}

// --- EXPRESS ROUTER HANDLER ---

async function handler(req, res) {
  // Mengambil parameter dari query string
  const action = req.query.action
  const query = req.query.q || req.query.query
  const targetUrl = req.query.url

  try {
    let result

    switch (action) {
      case 'latest':
        result = await scrapeLatest()
        return res.status(200).json({
          status: true,
          creator: 'Danzz',
          action: 'latest',
          total_results: result.length,
          data: result
        })

      case 'populer':
        result = await scrapePopuler()
        return res.status(200).json({
          status: true,
          creator: 'Danzz',
          action: 'populer',
          total_results: result.length,
          data: result
        })

      case 'search':
        if (!query) return res.status(400).json({ status: false, message: 'Masukkan parameter "?q=kata_kunci"' })
        result = await scrapeSearch(query)
        return res.status(200).json({
          status: true,
          creator: 'Danzz',
          action: 'search',
          query: query,
          total_results: result.length,
          data: result
        })

      case 'detail':
        if (!targetUrl) return res.status(400).json({ status: false, message: 'Masukkan parameter "?url=link_detik"' })
        result = await scrapeDetail(targetUrl)
        return res.status(200).json({
          status: true,
          creator: 'Danzz',
          action: 'detail',
          data: result
        })

      default:
        // Balasan jika parameter action kosong atau salah ketik
        return res.status(400).json({
          status: false,
          message: 'Parameter "action" tidak valid atau belum diisi.',
          available_actions: ['latest', 'populer', 'search', 'detail'],
          example: '/api/news/detik?action=latest'
        })
    }

  } catch (err) {
    return res.status(500).json({
      status: false,
      message: 'Terjadi kesalahan pada internal server/scraper',
      error: err.message
    })
  }
}

module.exports = { handler }
