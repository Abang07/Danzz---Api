const axios = require('axios');

const BASE_URL = 'https://fbdownloader.to';

const headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept-Language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7'
};

async function getToken() {
    const { data: html } = await axios.get(`${BASE_URL}/id`, { headers });

    const match = html.match(/k_exp="(.*?)".*?k_token="(.*?)"/s);
    if (!match) throw new Error('Token tidak ditemukan');

    return { k_exp: match[1], k_token: match[2] };
}

async function getFbLinks(fbUrl) {
    const { k_exp, k_token } = await getToken();

    const payload = new URLSearchParams({
        k_exp, k_token,
        p: 'home',
        q: fbUrl,
        lang: 'id',
        v: 'v2',
        W: ''
    });

    const { data } = await axios.post(`${BASE_URL}/api/ajaxSearch`, payload, {
        headers: {
            ...headers,
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'X-Requested-With': 'XMLHttpRequest',
            'Origin': BASE_URL,
            'Referer': `${BASE_URL}/id`
        }
    });

    if (!data?.data) throw new Error('Gagal mengambil data video');

    const results = [];
    const rowRegex = /<td class="video-quality">(.*?)<\/td>[\s\S]*?(?:href="(.*?)"|data-videourl="(.*?)")/g;
    let match;
    while ((match = rowRegex.exec(data.data)) !== null) {
        const quality = match[1].trim();
        const url = match[2] || match[3];
        if (quality && url) results.push({ quality, url });
    }

    if (!results.length) throw new Error('Tidak ada video ditemukan');
    return results;
}

async function handler(req, res) {
    const { url } = req.query;

    if (!url) {
        return res.status(400).json({
            status: false,
            message: 'Query ?url= wajib diisi',
            example: '/api/downloader/facebook?url=https://www.facebook.com/xxx'
        });
    }

    try {
        const results = await getFbLinks(url);

        return res.status(200).json({
            status: true,
            creator: 'Danzz',
            result: {
                downloads: results
            }
        });

    } catch (err) {
        return res.status(500).json({
            status: false,
            message: err.message || 'Internal Server Error'
        });
    }
}

module.exports = { handler };
