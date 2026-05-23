const axios = require('axios')
const cheerio = require('cheerio')

const meta = {
  param:       'action',
  desc:        'Berita Detik (?action=latest|populer|search|detail)',
  placeholder: 'latest',
}

const HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
  'Accept-Language': 'id-ID,id;q=0.9',
}

function parseArticles($, selector) {
  const articles = []
  $(selector).each((_, el) => {
    const title = $(el).find('h2, h3, .media__title a, .title a').first().text().trim()
    const link  = $(el).find('a').first().attr('href')
    const date  = $(el).find('.date, .media__date, time').first().text().trim() || null
    const image = $(el).find('img').first().attr('src') || $(el).find('img').first().attr('data-src') || null
    if (title && link && link.includes('detik.com')) articles.push({ title, link, date, image })
  })
  return articles
}

async function scrapeLatest() {
  // Pakai RSS detik biar lebih stabil
  const { data } = await axios.get('https://rss.detik.com/index.php/detikcom_news', { headers: HEADERS, timeout: 10000 })
  const $ = cheerio.load(data, { xmlMode: true })
  const articles = []
  $('item').each((_, el) => {
    const title       = $(el).find('title').text().trim()
    const link        = $(el).find('link').text().trim() || $(el).find('guid').text().trim()
    const date        = $(el).find('pubDate').text().trim() || null
    const image       = $(el).find('enclosure').attr('url') || $(el).find('media\\:content').attr('url') || null
    if (title && link) articles.push({ title, link, date, image })
  })
  // Fallback ke scrape langsung kalau RSS kosong
  if (articles.length === 0) {
    const { data: html } = await axios.get('https://news.detik.com', { headers: HEADERS, timeout: 10000 })
    const $2 = cheerio.load(html)
    $2('article, .list-content__item').each((_, el) => {
      const title = $2(el).find('h2, h3, .media__title a').first().text().trim()
      const link  = $2(el).find('a').first().attr('href')
      const date  = $2(el).find('.date, .media__date, time').first().text().trim() || null
      const image = $2(el).find('img').first().attr('src') || $2(el).find('img').first().attr('data-src') || null
      if (title && link && link.includes('detik.com')) articles.push({ title, link, date, image })
    })
  }
  return articles
}

async function scrapePopuler() {
  // Coba beberapa URL populer detik
  const urls = [
    'https://news.detik.com/berita/sort-terpopuler',
    'https://news.detik.com/indeks?sortby=popular',
    'https://news.detik.com',
  ]
  for (const url of urls) {
    try {
      const { data } = await axios.get(url, { headers: HEADERS, timeout: 10000 })
      const $ = cheerio.load(data)
      const articles = parseArticles($, 'article, .list-content__item, .media')
      if (articles.length > 0) return articles
    } catch (e) { continue }
  }
  // Fallback: RSS terpopuler
  const { data } = await axios.get('https://rss.detik.com/index.php/detikcom_terpopuler', { headers: HEADERS, timeout: 10000 })
  const $ = cheerio.load(data, { xmlMode: true })
  const articles = []
  $('item').each((_, el) => {
    const title = $(el).find('title').text().trim()
    const link  = $(el).find('link').text().trim() || $(el).find('guid').text().trim()
    const date  = $(el).find('pubDate').text().trim() || null
    if (title && link) articles.push({ title, link, date, image: null })
  })
  return articles
}

async function scrapeSearch(query) {
  // Pakai Google News RSS biar tidak kena block
  const { data } = await axios.get(
    `https://news.google.com/rss/search?q=${encodeURIComponent(query)}+site:detik.com&hl=id&gl=ID&ceid=ID:id`,
    { headers: HEADERS, timeout: 10000 }
  )
  const $ = cheerio.load(data, { xmlMode: true })
  const articles = []
  $('item').each((_, el) => {
    const title = $(el).find('title').text().trim()
    const link  = $(el).find('link').text().trim() || $(el).find('guid').text().trim()
    const date  = $(el).find('pubDate').text().trim() || null
    if (title && link) articles.push({ title, link, date, image: null })
  })
  return articles
}

async function scrapeDetail(targetUrl) {
  if (!targetUrl) throw new Error('Parameter "url" diperlukan!')
  if (!targetUrl.includes('detik.com')) throw new Error('URL harus dari detik.com')
  const { data } = await axios.get(targetUrl, { headers: HEADERS, timeout: 10000 })
  const $ = cheerio.load(data)
  const title  = $('.detail__title, h1.title, h1').first().text().trim()
  const date   = $('.detail__date, .date, time').first().text().trim() || null
  const author = $('.detail__author, .author').first().text().trim() || null
  const image  = $('.detail__media img, .photo img').first().attr('src') || null
  const content = []
  $('.detail__body-text p, .itp_bodycontent p, article p').each((_, el) => {
    const t = $(el).text().trim()
    if (t && t.length > 20) content.push(t)
  })
  return { title, author, date, image, content: content.join('\n\n') }
}

async function handler(req, res) {
  const action    = req.query.action
  const query     = req.query.q || req.query.query
  const targetUrl = req.query.url

  try {
    let result
    switch (action) {
      case 'latest':
        result = await scrapeLatest()
        return res.json({ status: true, creator: 'Danzz', action: 'latest', total_results: result.length, data: result })

      case 'populer':
        result = await scrapePopuler()
        return res.json({ status: true, creator: 'Danzz', action: 'populer', total_results: result.length, data: result })

      case 'search':
        if (!query) return res.status(400).json({ status: false, message: 'Parameter ?q= wajib diisi' })
        result = await scrapeSearch(query)
        return res.json({ status: true, creator: 'Danzz', action: 'search', query, total_results: result.length, data: result })

      case 'detail':
        if (!targetUrl) return res.status(400).json({ status: false, message: 'Parameter ?url= wajib diisi' })
        result = await scrapeDetail(targetUrl)
        return res.json({ status: true, creator: 'Danzz', action: 'detail', data: result })

      default:
        return res.status(400).json({
          status: false,
          message: 'Parameter "action" tidak valid.',
          available_actions: ['latest', 'populer', 'search', 'detail'],
          example: '/api/news/detik?action=latest'
        })
    }
  } catch (err) {
    return res.status(500).json({ status: false, message: 'Terjadi kesalahan pada scraper', error: err.message })
  }
}

module.exports = { meta, handler }