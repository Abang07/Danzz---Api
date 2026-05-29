const axios = require('axios');

const meta = {
    param: '',
    desc: 'Doa harian Islam lengkap dengan arab, latin, dan terjemahan',
    placeholder: ''
};

const SOURCE_URL = 'https://islamic-api-zhirrr.vercel.app/api/doaharian';

// Cache data doa supaya ga fetch tiap request
let doaCache = null;

async function getDoas() {
    if (doaCache) return doaCache;
    const res = await axios.get(SOURCE_URL, { timeout: 10000 });
    doaCache = res.data.data || [];
    return doaCache;
}

async function handler(req, res) {
    try {
        const doas = await getDoas();

        // Ambil doa random
        const random = doas[Math.floor(Math.random() * doas.length)];

        return res.status(200).json({
            status: true,
            creator: 'Danzz',
            result: {
                judul:       random.title,
                arab:        random.arabic,
                latin:       random.latin,
                terjemahan:  random.translation
            }
        });

    } catch (err) {
        return res.status(500).json({
            status: false,
            message: err.message
        });
    }
}

module.exports = { meta, handler };