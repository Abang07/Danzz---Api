const axios = require('axios');
const cheerio = require('cheerio');

const BASE_URL = 'https://www.webtoons.com';
const headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    'Accept-Language': 'id-ID,id;q=0.9'
};

async function handler(req, res) {
    const { url } = req.query;
    if (!url) return res.status(400).json({ status: false, message: '?url= wajib diisi' });

    try {
        const { data } = await axios.get(url, { headers: { ...headers, Referer: BASE_URL }, timeout: 15000 });
        const $ = cheerio.load(data);
        const images = [];
        $('#_imageList img').each((_, el) => {
            const src = $(el).attr('data-url') || $(el).attr('src');
            if (src) images.push(src);
        });

        return res.status(200).json({
            status: true,
            creator: 'Danzz',
            result: { totalImages: images.length, images }
        });
    } catch (err) {
        return res.status(500).json({ status: false, message: err.message });
    }
}

module.exports = { handler };
