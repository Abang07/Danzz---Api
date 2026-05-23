// simpan sebagai: gsmarena_search.js
// endpoint: /api/gsmarena/search?q=samsung+galaxy+s24

const axios = require('axios')
const cheerio = require('cheerio')

const headers = {
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
  'Referer': 'https://www.gsmarena.com/'
}

async function getDetail(url) {
  const { data } = await axios.get(url, { headers })
  const $ = cheerio.load(data)

  const title = $('h1.specs-phone-name-title').text().trim()
  const thumb = $('.specs-photo-main a img').attr('src') || ''
  let specs = []

  $('#specs-list table').each((i, table) => {
    const category = $(table).find('th').text().trim()
    let items = []
    $(table).find('tr').each((j, tr) => {
      const name = $(tr).find('td.ttl').text().trim()
      const value = $(tr).find('td.nfo').text().trim()
      if (name || value) items.push({ name: name || 'Details', value })
    })
    if (category && items.length > 0) specs.push({ category, items })
  })

  return { title, thumb, specs }
}

async function handler(req, res) {
  const { q } = req.query

  if (!q) {
    return res.status(400).json({
      status: false,
      message: 'Parameter q wajib diisi!',
      example: '/api/gsmarena/search?q=samsung+galaxy+s24'
    })
  }

  try {
    // Step 1: Search
    const { data } = await axios.get(
      `https://www.gsmarena.com/results.php3?sName=${encodeURIComponent(q)}`,
      { headers }
    )
    const $ = cheerio.load(data)
    let results = []

    $('.makers ul li').each((i, el) => {
      const title = $(el).find('strong').text().replace(/\s+/g, ' ').trim()
      const link = $(el).find('a').attr('href')
      const thumb = $(el).find('img').attr('src')
      if (title && link) results.push({
        title,
        thumb: thumb || '',
        url: `https://www.gsmarena.com/${link}`
      })
    })

    if (results.length === 0) {
      return res.status(404).json({
        status: false,
        message: 'HP tidak ditemukan!'
      })
    }

    // Step 2: Ambil detail HP pertama
    const detail = await getDetail(results[0].url)

    return res.status(200).json({
      status: true,
      creator: 'Danzz',
      result: {
        total_found: results.length,
        other_results: results.slice(1), // HP lain yang ditemukan
        detail: {
          title: detail.title,
          thumb: detail.thumb,
          url: results[0].url,
          specs: detail.specs
        }
      }
    })

  } catch (err) {
    return res.status(500).json({ status: false, message: err.message })
  }
}

module.exports = { handler }