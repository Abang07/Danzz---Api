const axios = require('axios');
const cheerio = require('cheerio');

const HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
  'Accept': 'application/rss+xml, application/xml, text/xml, */*',
  'Accept-Language': 'id-ID,id;q=0.9',
  'Cache-Control': 'no-cache'
};

// Coba Liputan6 RSS dulu, kalau gagal fallback ke Google News RSS
async function scrapeLatest({ limit = 10 } = {}) {
  let data;

  try {
    const res = await axios.get('https://www.liputan6.com/rss', { headers: HEADERS, timeout: 8000 });
    data = res.data;
  } catch (e) {
    const res = await axios.get(
      'https://news.google.com/rss/search?q=site:liputan6.com&hl=id&gl=ID&ceid=ID:id',
      { headers: HEADERS, timeout: 8000 }
    );
    data = res.data;
  }

  const $ = cheerio.load(data, { xmlMode: true });
  const results = [];

  $('item').slice(0, limit).each((_, el) => {
    const title       = $(el).find('title').first().text().trim();
    const url         = $(el).find('link').first().text().trim() || $(el).find('guid').text().trim();
    const category    = $(el).find('category').first().text().trim() || null;
    const publishedAt = $(el).find('pubDate').text().trim() || null;
    const author      = $(el).find('author, dc\\:creator').first().text().trim() || null;
    const thumbnail   =
      $(el).find('media\\:content').attr('url') ||
      $(el).find('enclosure').attr('url') ||
      null;

    if (title && url) {
      results.push({ title, url, thumbnail, category, publishedAt, author });
    }
  });

  return results;
}

/**
 * Route handler Express
 * GET /api/liputan6-latest?limit=10
 */
async function handler(req, res) {
  const limit = parseInt(req.query.limit) || 10;

  try {
    const data = await scrapeLatest({ limit });
    res.json({
      status: true,
      creator: 'Danzz',
      total: data.length,
      data
    });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
}

module.exports = { handler };
