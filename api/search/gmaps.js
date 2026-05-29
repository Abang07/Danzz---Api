const puppeteer = require('puppeteer');

const meta = {
    param: 'q',
    desc: 'Scrape hasil pencarian Google Maps',
    placeholder: 'Warteg Jakarta',
    params: [
        { name: 'q', placeholder: 'Warteg Jakarta' }
    ]
};

async function scrapeGoogleMaps(query) {
    const browser = await puppeteer.launch({
        headless: 'new',
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-gpu'
        ]
    });

    try {
        const page = await browser.newPage();

        await page.setUserAgent(
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36'
        );

        await page.setViewport({ width: 1280, height: 800 });

        // Blokir asset tidak perlu biar lebih cepat
        await page.setRequestInterception(true);
        page.on('request', req => {
            const type = req.resourceType();
            if (['image', 'stylesheet', 'font', 'media'].includes(type)) {
                req.abort();
            } else {
                req.continue();
            }
        });

        const searchUrl = `https://www.google.com/maps/search/${encodeURIComponent(query)}`;
        await page.goto(searchUrl, { waitUntil: 'networkidle2', timeout: 30000 });

        // Tunggu hasil muncul
        await page.waitForSelector('[role="feed"] .Nv2PK, [role="main"] .Nv2PK', {
            timeout: 15000
        }).catch(() => null);

        // Scroll untuk load lebih banyak hasil
        await autoScroll(page);

        const results = await page.evaluate(() => {
            const items = document.querySelectorAll('.Nv2PK');
            const data = [];

            items.forEach(el => {
                try {
                    // Nama
                    const name =
                        el.querySelector('.qBF1Pd')?.textContent?.trim() ||
                        el.querySelector('h3')?.textContent?.trim() ||
                        null;

                    // Rating & jumlah review
                    const ratingEl = el.querySelector('.MW4etd');
                    const reviewEl = el.querySelector('.UY7F9');
                    const rating = ratingEl ? parseFloat(ratingEl.textContent) : null;
                    const reviews = reviewEl
                        ? parseInt(reviewEl.textContent.replace(/\D/g, ''), 10)
                        : null;

                    // Kategori & alamat
                    const infoEls = el.querySelectorAll('.W4Efsd span');
                    const infoTexts = Array.from(infoEls)
                        .map(s => s.textContent.trim())
                        .filter(t => t && t !== '·' && t !== '');

                    const category = infoTexts[0] || null;
                    const address = infoTexts.slice(1).join(' ').trim() || null;

                    // Buka/tutup status
                    const statusEl = el.querySelector('.eXlrNe, .ZkP5Je');
                    const status = statusEl?.textContent?.trim() || null;

                    // URL Google Maps
                    const linkEl = el.querySelector('a[href*="maps/place"]');
                    const url = linkEl?.href || null;

                    if (name) {
                        data.push({ name, rating, reviews, category, address, status, url });
                    }
                } catch {}
            });

            return data;
        });

        return results;

    } finally {
        await browser.close();
    }
}

// Scroll otomatis sampai bawah list
async function autoScroll(page) {
    await page.evaluate(async () => {
        const feed =
            document.querySelector('[role="feed"]') ||
            document.querySelector('[aria-label*="Results"]');

        if (!feed) return;

        await new Promise(resolve => {
            let lastHeight = 0;
            let tries = 0;

            const interval = setInterval(() => {
                feed.scrollTop += 600;
                const newHeight = feed.scrollTop;

                if (newHeight === lastHeight) {
                    tries++;
                    if (tries >= 3) {
                        clearInterval(interval);
                        resolve();
                    }
                } else {
                    tries = 0;
                    lastHeight = newHeight;
                }
            }, 800);
        });
    });
}

async function handler(req, res) {
    const { q } = req.query;

    if (!q) {
        return res.status(400).json({
            status: false,
            message: 'Query ?q= wajib diisi',
            example: '/api/tools/gmaps?q=Warteg+Jakarta'
        });
    }

    try {
        const results = await scrapeGoogleMaps(q.trim());

        if (!results.length) {
            return res.status(404).json({
                status: false,
                message: 'Tidak ada hasil ditemukan'
            });
        }

        return res.status(200).json({
            status: true,
            creator: 'Danzz',
            result: {
                query: q,
                total: results.length,
                places: results
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