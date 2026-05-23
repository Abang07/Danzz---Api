const axios = require('axios');
const cheerio = require('cheerio');

const headers = { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' };

async function handler(req, res) {
    const { url } = req.query;
    if (!url) return res.status(400).json({ status: false, message: '?url= wajib diisi' });

    try {
        const { data } = await axios.get(url, { headers, timeout: 15000 });
        const $ = cheerio.load(data);

        const images = [];
        $('img').each((_, el) => {
            const src = $(el).attr('src') || $(el).attr('data-src') || $(el).attr('data-lazy-src');
            if (src && (
                src.includes('imageainewgeneration') ||
                src.includes('himmga') ||
                src.includes('gaimgame')
            )) {
                images.push(src);
            }
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
