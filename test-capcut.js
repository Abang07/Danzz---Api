const puppeteer = require('puppeteer');

(async () => {
    const templateId = '7299286607478181121';
    let videoUrl = null;

    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
    });

    const page = await browser.newPage();

    page.on('response', async (response) => {
        const url = response.url();
        if (url.includes('.mp4') || (url.includes('capcut') && url.includes('video'))) {
            console.log('Video URL:', url);
            videoUrl = url;
        }
    });

    await page.goto(`https://www.capcut.com/template-detail/${templateId}`, {
        waitUntil: 'networkidle2',
        timeout: 30000
    });

    await browser.close();
    console.log('Result:', videoUrl || 'Tidak ditemukan');
})();
