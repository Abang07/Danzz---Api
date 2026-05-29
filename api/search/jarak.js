const puppeteer = require('puppeteer');

const meta = {
    param: 'from',
    desc: 'Cek jarak & estimasi waktu tempuh via Google Maps',
    placeholder: 'Jakarta',
    params: [
        { name: 'from', placeholder: 'Jakarta' },
        { name: 'to', placeholder: 'Bandung' }
    ]
};

const MODES = ['driving', 'walking', 'bicycling', 'transit'];

async function scrapeDistance(from, to) {
    const browser = await puppeteer.launch({
        headless: 'new',
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-gpu',
            '--lang=id-ID'
        ]
    });

    try {
        const page = await browser.newPage();

        await page.setUserAgent(
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36'
        );

        await page.setExtraHTTPHeaders({
            'Accept-Language': 'id-ID,id;q=0.9'
        });

        await page.setViewport({ width: 1280, height: 800 });

        // Blok resource yang tidak perlu
        await page.setRequestInterception(true);
        page.on('request', req => {
            const type = req.resourceType();
            if (['image', 'stylesheet', 'font', 'media'].includes(type)) {
                req.abort();
            } else {
                req.continue();
            }
        });

        const results = {};

        for (const mode of MODES) {
            try {
                // Tiap mode pakai URL langsung dengan parameter travelmode
                const modeParam = mode === 'driving' ? '0' : mode === 'walking' ? '2' : mode === 'bicycling' ? '1' : '3';
                const url = `https://www.google.com/maps/dir/${encodeURIComponent(from)}/${encodeURIComponent(to)}/@?entry=ttu&travelmode=${mode}&hl=id`;

                await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });

                // Tunggu konten rute
                await Promise.race([
                    page.waitForSelector('.m6QErb', { timeout: 12000 }).catch(() => null),
                    page.waitForSelector('[data-trip-index]', { timeout: 12000 }).catch(() => null),
                    page.waitForSelector('.section-directions-trip', { timeout: 12000 }).catch(() => null),
                    new Promise(r => setTimeout(r, 12000))
                ]);

                // Tambah delay biar JS selesai render
                await new Promise(r => setTimeout(r, 2000));

                const data = await page.evaluate(() => {
                    const routes = [];

                    // ── Coba berbagai selector untuk ambil rute ──
                    // Selector 1: kartu rute modern
                    const routeCards = document.querySelectorAll('[data-trip-index], .m6QErb[data-trip-index]');

                    // Selector 2: fallback lama
                    const legacyCards = document.querySelectorAll('.section-directions-trip');

                    const cards = routeCards.length > 0 ? routeCards : legacyCards;

                    cards.forEach((el, i) => {
                        // Ambil semua teks dari elemen, cari pola jarak & durasi
                        const text = el.innerText || el.textContent || '';

                        // Cari durasi format Indo: "X jam Y menit" / "X menit"
                        const durationMatch = text.match(/(\d+\s*jam\s*\d*\s*menit?|\d+\s*menit?)/i);
                        // Cari jarak: "X,X km" atau "X km" atau "X m"
                        const distanceMatch = text.match(/(\d+[.,]\d+\s*km|\d+\s*km|\d+\s*m\b)/i);

                        const duration = durationMatch ? durationMatch[0].trim() : null;
                        const distance = distanceMatch ? distanceMatch[0].trim() : null;

                        // Cari via
                        const viaEl = el.querySelector('.fontBodyMedium, .section-directions-trip-description');
                        const via = viaEl ? viaEl.textContent.trim().substring(0, 100) : null;

                        if (duration || distance) {
                            routes.push({
                                option: i + 1,
                                distance,
                                duration,
                                via,
                                fastest: i === 0
                            });
                        }
                    });

                    // Kalau cards kosong, coba ambil dari summary bar langsung
                    if (routes.length === 0) {
                        // Coba semua kemungkinan selector teks durasi & jarak
                        const allText = document.body.innerText;

                        const durationMatch = allText.match(/(\d+\s*jam\s*\d*\s*menit?|\d+\s*menit?)/i);
                        const distanceMatch = allText.match(/(\d+[.,]\d+\s*km|\d+\s*km)/i);

                        if (durationMatch || distanceMatch) {
                            routes.push({
                                option: 1,
                                distance: distanceMatch ? distanceMatch[0].trim() : null,
                                duration: durationMatch ? durationMatch[0].trim() : null,
                                via: null,
                                fastest: true
                            });
                        }
                    }

                    // Ambil lokasi dari input box
                    const inputs = document.querySelectorAll('input[aria-label], #directions-searchbox-0 input, #directions-searchbox-1 input');
                    const fromVal = inputs[0]?.value?.trim() || null;
                    const toVal   = inputs[1]?.value?.trim() || null;

                    return { routes: routes.length ? routes : null, from: fromVal, to: toVal };
                });

                results[mode] = {
                    summary: data.routes && data.routes[0] ? {
                        distance: data.routes[0].distance,
                        duration: data.routes[0].duration
                    } : null,
                    routes: data.routes
                };

                // Simpan lokasi dari page pertama yang berhasil
                if (!results._locations && data.from) {
                    results._locations = { from: data.from, to: data.to };
                }

            } catch (err) {
                results[mode] = null;
            }
        }

        const locations = results._locations || { from, to };
        delete results._locations;

        return { locations, routes: results };

    } finally {
        await browser.close();
    }
}

async function handler(req, res) {
    const { from, to } = req.query;

    if (!from || !to) {
        return res.status(400).json({
            status: false,
            message: 'Query ?from= dan ?to= wajib diisi',
            example: '/api/search/jarak?from=Jakarta&to=Bandung'
        });
    }

    try {
        const data = await scrapeDistance(from.trim(), to.trim());

        return res.status(200).json({
            status: true,
            creator: 'Danzz',
            result: {
                from: data.locations.from || from,
                to: data.locations.to || to,
                modes: data.routes
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