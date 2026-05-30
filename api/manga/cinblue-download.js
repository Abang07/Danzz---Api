const axios  = require('axios');
const { parse } = require('node-html-parser');

const BASE_API = 'https://same.yui.pw/api/v6';
const VIEW_URL = 'https://cin.blue/v';

const meta = {
    param: 'url',
    desc: 'Info download (image URLs & PDF) dari cin.blue',
    placeholder: 'https://cin.blue/v/408176',
    params: [
        { name: 'url', placeholder: 'https://cin.blue/v/408176' }
    ]
};

// ── Extract ID ────────────────────────────────────────────────────
function extractId(arg) {
    if (!arg) return null;
    const clean = String(arg).trim();
    const mUrl  = clean.match(/\/v\/(\d+)/i) || clean.match(/\/g\/(\d+)/i);
    if (mUrl) return mUrl[1];
    if (/^\d+$/.test(clean)) return clean;
    return null;
}

// ── Coba ambil dari API ───────────────────────────────────────────
async function fetchFromApi(id) {
    try {
        const res = await axios.get(`${BASE_API}/g/${id}`, { timeout: 10000, validateStatus: () => true });
        if (res.data?.id) return { source: 'api', data: res.data };
    } catch {}
    return null;
}

// ── Fallback scrape HTML ──────────────────────────────────────────
async function fetchFromScrape(id) {
    const url = `${VIEW_URL}/${id}`;
    const res = await axios.get(url, {
        timeout: 12000,
        headers: { 'User-Agent': 'Mozilla/5.0 (Linux; Android 12) AppleWebKit/537.36 Chrome/112 Mobile Safari/537.36' },
        validateStatus: () => true
    });

    const root = parse(res.data);

    const rawTitle   = (root.querySelector('title')?.text || '').trim();
    const titleMatch = rawTitle.match(/^(.+?)\s*-\s*(\d+)\s*Pages?$/i);
    const title      = titleMatch ? titleMatch[1].trim() : rawTitle;
    const pages      = titleMatch ? parseInt(titleMatch[2]) : 0;

    let cover = null, mediaId = null;
    for (const m of root.querySelectorAll('meta')) {
        const prop = m.getAttribute('property') || m.getAttribute('name') || '';
        if (prop === 'og:image') {
            cover = m.getAttribute('content');
            const mId = cover?.match(/\/t\/(\d+)\//);
            if (mId) mediaId = mId[1];
            break;
        }
    }

    return { source: 'scrape', data: { id, title, num_pages: pages, media_id: mediaId, cover } };
}

// ── Bangun image URLs ─────────────────────────────────────────────
function buildImageUrls(mediaId, pages, apiImages) {
    if (!mediaId || !pages) return [];

    if (apiImages?.length) {
        return apiImages.map((img, i) => {
            const ext = img.t === 'p' ? 'png' : img.t === 'g' ? 'gif' : 'jpg';
            return `https://f.kontol.online/api/imageV2/i/${mediaId}/${i + 1}.${ext}`;
        });
    }

    // Fallback: asumsikan semua jpg
    return Array.from({ length: pages }, (_, i) =>
        `https://f.kontol.online/api/imageV2/i/${mediaId}/${i + 1}.jpg`
    );
}

async function handler(req, res) {
    const raw = req.query.url || '';
    const id  = extractId(raw);

    if (!id) {
        return res.status(400).json({
            status:  false,
            message: 'Query ?url= wajib diisi',
            example: '/api/manga/cinblue-download?url=https://cin.blue/v/408176'
        });
    }

    try {
        const fetched = await fetchFromApi(id) || await fetchFromScrape(id);
        const { data: info } = fetched;

        const mediaId  = info.media_id;
        const pages    = info.num_pages || 0;
        const apiPages = info.images?.pages || null;
        const title    = info.title?.english || info.title?.pretty || info.title?.japanese || info.title || `gallery_${id}`;

        const imageUrls = buildImageUrls(mediaId, pages, apiPages);

        return res.status(200).json({
            status:  true,
            creator: 'Danzz',
            result: {
                title,
                pages,
                cover:      info.cover || null,
                image_urls: imageUrls,
                pdf_url:    `https://cin.blue/g/${id}`,
                view_url:   `https://cin.blue/v/${id}`,
                bot_url:    `https://t.me/nHentaiV6_bot?start=${id}`
            }
        });

    } catch (err) {
        return res.status(500).json({
            status:  false,
            message: err.response?.data || err.message
        });
    }
}

module.exports = { meta, handler };