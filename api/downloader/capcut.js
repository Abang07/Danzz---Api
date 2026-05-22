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
    let title = '';

    page.on('response', async (response) => {
        const url = response.url();
        if (url.includes('capcutvod.com') && url.includes('.mp4')) {
            if (!videoUrl) videoUrl = url;
        }
    });

    await page.goto(`https://www.capcut.com/template-detail/${templateId}`, {
        waitUntil: 'networkidle2',
        timeout: 30000
    });

    title = await page.title();

    await browser.close();

    if (!videoUrl) throw new Error('Video tidak ditemukan');
    return { title, videoUrl };
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
