const axios = require('axios');
const cheerio = require('cheerio');

const meta = {
    param: 'query',
    desc: 'Search Yahoo (Google-like results)',
    placeholder: 'nasi goreng',
    params: [
        {
            name: 'query',
            placeholder: 'nasi goreng'
        }
    ]
};

function cleanUrl(href) {
    try {
        const match = href.match(/RU=([^/]+)/);
        if (match) return decodeURIComponent(match[1]);
    } catch {}
    return href;
}

async function handler(req, res) {

    const { query } = req.query;

    if (!query) {
        return res.status(400).json({
            status: false,
            message: 'Query ?query= wajib diisi',
            example: '/api/search/yahoo?query=nasi goreng'
        });
    }

    try {

        const { data } = await axios.get(
            `https://search.yahoo.com/search?p=${encodeURIComponent(query)}&ei=UTF-8`,
            {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
                    'Accept-Language': 'id-ID,id;q=0.9',
                },
                timeout: 15000
            }
        );

        const $ = cheerio.load(data);
        const results = [];

        $('#web .algo').each((i, el) => {
            const title = $(el).find('h3').text().trim();
            const rawLink = $(el).find('a').first().attr('href');
            const link = cleanUrl(rawLink);
            const snippet = $(el).find('.compText p').text().trim();
            if (title && link) {
                results.push({
                    no: i + 1,
                    title,
                    link,
                    snippet: snippet || null
                });
            }
        });

        if (!results.length) {
            return res.status(404).json({
                status: false,
                message: 'Tidak ada hasil ditemukan'
            });
        }

        // ======================
        // RESULT
        // ======================
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

module.exports = {
    meta,
    handler
};