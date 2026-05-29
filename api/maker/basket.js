const { createCanvas, loadImage } = require('canvas');
const axios = require('axios');

const meta = {
    param: 'nama',
    desc: 'Generate sertifikat basket dengan nama penerima (?nama=NamaMu)',
    placeholder: 'Ahmad',
    params: [
        { name: 'nama', placeholder: 'Ahmad' }
    ]
};

const TEMPLATE_URL = 'https://api.telegram.org/file/bot8601632315:AAHzh8KKi4gyOrpd-a59-0vLJiVSWwFnEZI/documents/file_544.jpeg';
let templateCache = null;

async function getTemplate() {
    if (templateCache) return templateCache;
    const res = await axios.get(TEMPLATE_URL, { responseType: 'arraybuffer', timeout: 15000 });
    templateCache = await loadImage(Buffer.from(res.data));
    return templateCache;
}

function findNameY(ctx, canvasWidth, canvasHeight) {
    const cx = Math.floor(canvasWidth / 2);
    const scanWidth = Math.floor(canvasWidth * 0.3);

    let darkRows = [];

    const startY = Math.floor(canvasHeight * 0.25);
    const endY   = Math.floor(canvasHeight * 0.70);

    for (let y = startY; y < endY; y++) {
        const imgData = ctx.getImageData(cx - scanWidth/2, y, scanWidth, 1).data;
        let darkCount = 0;
        for (let i = 0; i < imgData.length; i += 4) {
            const r = imgData[i], g = imgData[i+1], b = imgData[i+2];
            if (r < 120 && g < 120 && b < 120) darkCount++;
        }
        if (darkCount > 3) darkRows.push(y);
    }

    // Cari gap terbesar antara baris gelap — itu tempat nama
    let maxGap = 0;
    let gapCenterY = Math.floor(canvasHeight * 0.48);

    for (let i = 1; i < darkRows.length; i++) {
        const gap = darkRows[i] - darkRows[i - 1];
        if (gap > maxGap) {
            maxGap = gap;
            gapCenterY = Math.floor((darkRows[i] + darkRows[i - 1]) / 2);
        }
    }

    return gapCenterY;
}

async function generateSertifikat(nama) {
    const template = await getTemplate();
    const W = template.width;
    const H = template.height;

    const canvas = createCanvas(W, H);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(template, 0, 0);

    // Cari posisi Y yang tepat
    const namaY = findNameY(ctx, W, H);

    // Font size proporsional
    const fontSize = Math.round(W * 0.038);
    ctx.font = `bold ${fontSize}px Arial, sans-serif`;
    ctx.fillStyle = '#000000';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(nama, W * 0.40, namaY);

    return canvas.toBuffer('image/jpeg', { quality: 0.95 });
}

async function handler(req, res) {
    const { nama } = req.query;

    if (!nama) {
        return res.status(400).json({
            status: false,
            message: 'Query ?nama= wajib diisi',
            example: '/api/maker/basket?nama=Ahmad'
        });
    }

    try {
        const buf = await generateSertifikat(nama.trim());
        res.setHeader('Content-Type', 'image/jpeg');
        return res.send(buf);
    } catch (err) {
        return res.status(500).json({ status: false, message: err.message });
    }
}

module.exports = { meta, handler };