const axios = require('axios');
const cheerio = require('cheerio');

const meta = {
  param: 'query',
  desc: 'Search Dongeng dari 1000dongeng.com',
  placeholder: 'malin kundang',
  params: [{ name: 'query', placeholder: 'malin kundang' }]
};

async function handler(req, res) {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({
      status: false,
      message: 'Query ?query= wajib diisi',
      example: '/api/search/dongeng?query=malin kundang'
    });
  }

  try {
    const { data } = await axios.get(`https://www.1000dongeng.com/search?q=${encodeURIComponent(query)}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
      },
      timeout: 15000
    });

    const $ = cheerio.load(data);
    const results = [];

    $('h2.post-title.entry-title').each((i, el) => {
      const title = $(el).attr('title') || $(el).text().trim();
      const link = $(el).find('a').attr('href') || $(el).closest('article, .post, .item').find('a').first().attr('href');
      const thumb = $(el).closest('article, .post, .item').find('amp-img, img').first().attr('src');
      if (title) results.push({ title, link: link || null, thumb: thumb || null });
    });

    if (!results.length) {
      return res.status(404).json({
        status: false,
        message: 'Tidak ada hasil ditemukan'
      });
    }

    return res.status(200).json({
      status: true,
      creator: 'Danzz',
      query,
      total: results.length,
      results
    });

  } catch (err) {
    return res.status(500).json({
      status: false,
      message: err.response?.data || err.message
    });
  }
}

module.exports = { meta, handler };