const axios  = require('axios');
const { parse } = require('node-html-parser');

const VIEW_URL = 'https://cin.blue/v';

const meta = {
    param: 'url',
    desc: 'Detail doujin dari cin.blue',
    placeholder: 'https://cin.blue/v/408176',
    params: [
        { name: 'url', placeholder: 'https://cin.blue/v/408176' }
    ]
};

function extractId(arg) {
    if (!arg) return null;
    const clean = String(arg).trim();
    const mUrl  = clean.match(/\/v\/(\d+)/i) || clean.match(/\/g\/(\d+)/i);
    if (mUrl) return mUrl[1];
    if (/^\d+$/.test(clean)) return clean;
    return null;
}

async function scrapeDetail(id) {
    const url = `${VIEW_URL}/${id}`;

    const response = await axios.get(url, {
        timeout: 12000,
        headers: {
            'User-Agent':      'Mozilla/5.0 (Linux; Android 12) AppleWebKit/537.36 Chrome/112 Mobile Safari/537.36',
            'Accept-Language': 'en-US,en;q=0.9'
        },
        validateStatus: () => true
    });

    const root = parse(response.data);

    // Judul & pages dari <title>
    const rawTitle   = (root.querySelector('title')?.text || '').trim();
    const titleMatch = rawTitle.match(/^(.+?)\s*-\s*(\d+)\s*Pages?$/i);
    const title      = titleMatch ? titleMatch[1].trim() : rawTitle;
    const pages      = titleMatch ? parseInt(titleMatch[2]) : null;

    // meta-description → JP title + tags
    let metaDesc = '';
    let cover    = null;

    for (const m of root.querySelectorAll('meta')) {
        const name = m.getAttribute('name')     || '';
        const prop = m.getAttribute('property') || '';
        if (name === 'meta-description') metaDesc = m.getAttribute('content') || '';
        if (prop === 'og:image' || name === 'og:image') cover = m.getAttribute('content') || null;
    }

    const dashIdx  = metaDesc.indexOf(' - ');
    const jpTitle  = dashIdx !== -1 ? metaDesc.slice(0, dashIdx).trim() : null;
    const tagsStr  = dashIdx !== -1 ? metaDesc.slice(dashIdx + 3) : metaDesc;
    const allTags  = tagsStr.split(',').map(t => t.trim()).filter(Boolean);

    const LANGS    = ['japanese','english','chinese','korean','spanish','french','german','portuguese','russian','arabic'];
    const language = LANGS.find(l => allTags.some(t => t.toLowerCase() === l)) || null;
    const tags     = allTags.filter(t => !LANGS.includes(t.toLowerCase()));

    // Artist / circle / parody dari body
    const bodyText     = root.querySelector('body')?.text || '';
    const bracketMatch = bodyText.match(/\[([^\]]+)\]/g);
    let artist = null, circle = null, parody = null;

    if (bracketMatch?.length >= 2) {
        const first = bracketMatch[0].replace(/[\[\]]/g, '').trim();
        const inner = first.match(/^(.+?)\s*\((.+?)\)$/);
        if (inner) { circle = inner[1].trim(); artist = inner[2].trim(); }
        else { artist = first; }

        const second      = bracketMatch[1].replace(/[\[\]]/g, '').trim();
        const parodyInner = second.match(/\(([^)]+)\)$/);
        parody = parodyInner ? parodyInner[1].trim() : second;
    }

    return {
        title,
        title_jp:  jpTitle,
        pages,
        language,
        artist,
        circle,
        parody,
        tags,
        cover,
        pdf_url:  `https://cin.blue/g/${id}`,
        view_url: url,
        bot_url:  `https://t.me/nHentaiV6_bot?start=${id}`
    };
}

async function handler(req, res) {
    const raw = req.query.url || '';
    const id  = extractId(raw);

    if (!id) {
        return res.status(400).json({
            status:  false,
            message: 'Query ?url= wajib diisi',
            example: '/api/manga/cinblue-detail?url=https://cin.blue/v/408176'
        });
    }

    try {
        const detail = await scrapeDetail(id);

        return res.status(200).json({
            status:  true,
            creator: 'Danzz',
            result:  detail
        });

    } catch (err) {
        return res.status(500).json({
            status:  false,
            message: err.response?.data || err.message
        });
    }
}

module.exports = { meta, handler };