const axios = require('axios');
const cheerio = require('cheerio');

const BASE_URL = 'https://www.webtoons.com';
const headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    'Accept-Language': 'id-ID,id;q=0.9'
};

async function handler(req, res) {
    const { keyword } = req.query;
    if (!keyword) return res.status(400).json({ status: false, message: '?keyword= wajib diisi' });

    try {
        const { data } = await axios.get(`${BASE_URL}/id/search?keyword=${encodeURIComponent(keyword)}`, { headers, timeout: 15000 });
        const $ = cheerio.load(data);
        const results = [];
        $('a.link._card_item').each((_, el) => {
            const title = $(el).find('strong.title').text().trim();
            const href = $(el).attr('href');
            const thumbnail = $(el).find('img').attr('src');
            const titleNo = $(el).attr('data-title-no');
            if (title) results.push({ title, titleNo, href, thumbnail });
        });
        return res.status(200).json({ status: true, creator: 'Danzz', result: results });
    } catch (err) {
        return res.status(500).json({ status: false, message: err.message });
    }
}

module.exports = { handler };
