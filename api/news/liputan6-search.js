const axios = require('axios');
const cheerio = require('cheerio');

const HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Linux; Android 13; 23021RAA2Y Build/TKQ1.221114.001) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.7727.137 Mobile Safari/537.36',
  'Accept': 'application/json, text/plain, */*'
};

async function scrapeSearch({ query, limit = 10 } = {}) {
  // Pakai Google News RSS biar aman dari block
  const { data } = await axios.get(
    `https://news.google.com/rss/search?q=${encodeURIComponent(query)}+site:liputan6.com&hl=id&gl=ID&ceid=ID:id`,
    { headers: HEADERS }
  );

  const $ = cheerio.load(data, { xmlMode: true });
  const results = [];

  $('item').slice(0, limit).each((_, el) => {
    const title       = $(el).find('title').first().text().trim();
    const url         = $(el).find('link').first().text().trim() || $(el).find('guid').text().trim();
    const publishedAt = $(el).find('pubDate').text().trim() || null;
    const source      = $(el).find('source').text().trim() || null;

    if (title && url) {
      results.push({ title, url, publishedAt, source });
    }
  });

  return results;
}

/**
 * Route handler Express
 * GET /api/liputan6-search?q=politik&limit=10
 */
async function handler(req, res) {
  const { q, limit } = req.query;

  if (!q) {
    return res.status(400).json({
      status: false,
      message: 'Parameter q wajib diisi! Contoh: /api/liputan6-search?q=politik'
    });
  }

  try {
    const data = await scrapeSearch({ query: q, limit: parseInt(limit) || 10 });
    res.json({
      status: true,
      creator: 'Danzz',
      query: q,
      total: data.length,
      data
    });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
}

module.exports = { handler };
