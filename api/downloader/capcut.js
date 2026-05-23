const puppeteer = require('puppeteer');

async function downloadCapcut(capcutUrl) {
    const templateId = capcutUrl.match(/template-detail\/(\d+)/)?.[1];
    if (!templateId) throw new Error('URL tidak valid');

    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
    });

    const page = await browser.newPage();
    let videoUrl = null;

    page.on('response', async (response) => {
        const url = response.url();
        if (url.includes('capcutvod.com') && url.includes('mp4')) {
            if (!videoUrl) videoUrl = url;
        }
    });

    await page.goto(`https://www.capcut.com/template-detail/${templateId}`, {
        waitUntil: 'networkidle2',
        timeout: 60000
    });

    // Tunggu 5 detik biar video autoplay
    await new Promise(r => setTimeout(r, 5000));

    // Coba klik play button kalau ada
    try {
        await page.click('video');
    } catch {}

    await new Promise(r => setTimeout(r, 3000));

    await browser.close();

    if (!videoUrl) throw new Error('Video tidak ditemukan');
    return { videoUrl };
}

async function handler(req, res) {
    const { url } = req.query;

    if (!url) {
        return res.status(400).json({
            status: false,
            message: 'Query ?url= wajib diisi',
            example: '/api/downloader/capcut?url=https://www.capcut.com/template-detail/xxx'
        });
    }

    try {
        const result = await downloadCapcut(url);
        return res.status(200).json({
            status: true,
            creator: 'Danzz',
            result
        });
    } catch (err) {
        return res.status(500).json({ status: false, message: err.message });
    }
}

module.exports = { handler };
