const axios = require('axios');
const cheerio = require('cheerio');

const BASE_URL = 'https://komikindo.ch';
const headers = { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' };

async function handler(req, res) {
    const { keyword } = req.query;
    if (!keyword) return res.status(400).json({ status: false, message: '?keyword= wajib diisi' });

    try {
        const { data } = await axios.get(`${BASE_URL}/?s=${encodeURIComponent(keyword)}`, { headers, timeout: 15000 });
        const $ = cheerio.load(data);
        const results = [];

        $('.animepost').each((_, el) => {
            const title = $(el).find('a').attr('title');
            const href = $(el).find('a').attr('href');
            const img = $(el).find('img').attr('src');
            const type = $(el).find('.typeflag').text().trim();
            if (title) results.push({ title, href, img, type });
        });

        return res.status(200).json({ status: true, creator: 'Danzz', result: results });
    } catch (err) {
        return res.status(500).json({ status: false, message: err.message });
    }
}

module.exports = { handler };
