const axios = require('axios');
const cheerio = require('cheerio');

const meta = {
  param: 'query',
  desc: 'Cari lirik lagu (?query=nama lagu)',
  placeholder: 'Sempurna Andra and the Backbone',
  params: [
    { name: 'query', placeholder: 'Sempurna Andra and the Backbone' }
  ]
}

async function scrapeLirik(query) {
  const searchUrl = `https://genius.com/api/search/multi?per_page=1&q=${encodeURIComponent(query)}`
  const searchRes = await axios.get(searchUrl, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
    }
  })

  const hits = searchRes.data?.response?.sections?.[0]?.hits
  if (!hits || hits.length === 0) throw new Error('Lagu tidak ditemukan')

  const laguData = hits[0].result
  const urlLirik = laguData.url
  const judulPenuh = laguData.full_title
  const thumbnail = laguData.song_art_image_thumbnail_url
  const artis = laguData.artist_names

  const htmlRes = await axios.get(urlLirik, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
    }
  })

  const $ = cheerio.load(htmlRes.data)

  $('[data-lyrics-container="true"]').each((i, el) => {
    let html = $(el).html()
    html = html.replace(/<br\s*[\/]?>/gi, '\n')
    html = html.replace(/<[^>]*>?/gm, '')
    $(el).text(html)
  })

  const lirik = $('[data-lyrics-container="true"]').text().trim()
  if (!lirik) throw new Error('Gagal mengambil lirik, struktur web mungkin berubah')

  return { judulPenuh, artis, thumbnail, urlLirik, lirik }
}

async function handler(req, res) {
  const query = req.query.query || req.query.q || req.query.text

  if (!query) return res.status(400).json({ status: false, message: 'Parameter ?query= wajib diisi' })

  try {
    const result = await scrapeLirik(query)

    return res.json({
      status: true,
      creator: 'Danzz',
      judul: result.judulPenuh,
      artis: result.artis,
      thumbnail: result.thumbnail,
      sumber: result.urlLirik,
      lirik: result.lirik
    })
  } catch (err) {
    return res.status(500).json({ status: false, message: 'Terjadi kesalahan', error: err.message })
  }
}

module.exports = { meta, handler }