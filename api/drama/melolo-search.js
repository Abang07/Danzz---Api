const axios = require('axios')
const cheerio = require('cheerio')

const BASE_URL = 'https://melolo.com/id'

const meta = {
  param: 'query',
  desc: 'Search drama Melolo',
  placeholder: 'CEO',
  params: [
    {
      name: 'query',
      placeholder: 'CEO'
    }
  ]
}

// =========================
// SCRAPER
// =========================
async function searchDrama(query) {

  if (!query)
    throw new Error('Query diperlukan')

  const res = await axios.get(
    `${BASE_URL}/search?q=${encodeURIComponent(query)}`,
    {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 Chrome/120.0.0.0 Mobile Safari/537.36',
        'Accept-Language':
          'id-ID,id;q=0.9'
      },
      timeout: 20000
    }
  )

  const $ = cheerio.load(res.data)

  const results = []

  // =========================
  // PARSE DRAMA
  // =========================
  $("a[href*='/dramas/']").each((i, el) => {

    const href = $(el).attr('href')

    const title =
      $(el).text().trim() ||
      $(el).find('img').attr('alt') ||
      ''

    const thumb =
      $(el).find('img').attr('src') ||
      $(el).find('img').attr('data-src') ||
      null

    if (
      href &&
      title &&
      !results.find(r => r.url === href)
    ) {

      const slug = href
        .split('/dramas/')[1]
        ?.replace(/\/$/, '')

      if (slug) {

        results.push({
          no: results.length + 1,
          title: title
            .replace(/\s+/g, ' ')
            .trim(),
          slug,
          thumbnail: thumb,
          url: href.startsWith('http')
            ? href
            : `https://melolo.com${href}`
        })
      }
    }
  })

  // =========================
  // VALIDASI
  // =========================
  if (!results.length)
    throw new Error(
      'Drama tidak ditemukan'
    )

  return {
    query,
    total: results.length,
    results
  }
}

// =========================
// API HANDLER
// =========================
async function handler(req, res) {

  const query =
    req.query.query ||
    req.query.q ||
    req.query.search

  if (!query) {
    return res.status(400).json({
      status: false,
      message:
        'Parameter ?query= wajib diisi'
    })
  }

  try {

    const result =
      await searchDrama(query)

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