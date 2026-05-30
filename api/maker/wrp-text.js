const { createCanvas, loadImage } = require('canvas');

const meta = {
    param: 'text',
    desc: 'Tulis teks di area lingkaran Windows Media Player',
    placeholder: 'Halo ini request gua',
    params: [
        { name: 'text', placeholder: 'Halo ini request gua' }
    ]
};

// ============================================
// URL foto WMP hardcoded, ga perlu query param
// ============================================
const WMP_IMAGE_URL = 'https://api.telegram.org/file/bot8601632315:AAHzh8KKi4gyOrpd-a59-0vLJiVSWwFnEZI/documents/file_625.jpeg';

function wrapText(ctx, text, maxWidth) {
    const words = text.split(' ');
    const lines = [];
    let current = '';
    for (const word of words) {
        const test = current ? current + ' ' + word : word;
        if (ctx.measureText(test).width > maxWidth && current) {
            lines.push(current);
            current = word;
        } else {
            current = test;
        }
    }
    if (current) lines.push(current);
    return lines;
}

async function drawWMP(text) {
    // Load foto asli sebagai background
    const img = await loadImage(WMP_IMAGE_URL);

    const W = img.width;
    const H = img.height;
    const canvas = createCanvas(W, H);
    const ctx = canvas.getContext('2d');

    // Render foto asli dulu
    ctx.drawImage(img, 0, 0, W, H);

    // ============================================
    // TULIS TEKS DI AREA LINGKARAN MERAH (kiri tengah)
    // Posisi dikalibrasi dari foto asli
    // ============================================
    const areaX  = Math.floor(W * 0.04);
    const areaY  = Math.floor(H * 0.30);
    const areaW  = Math.floor(W * 0.52);
    const areaH  = Math.floor(H * 0.38);

    const centerX = areaX + areaW / 2;
    const centerY = areaY + areaH / 2;

    const fontSize = Math.floor(W * 0.055);
    ctx.font = 'bold ' + fontSize + 'px Arial';
    ctx.fillStyle = '#1a1a1a';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const lines  = wrapText(ctx, text.trim(), areaW - 20);
    const lineH  = fontSize * 1.45;
    const totalH = lines.length * lineH;
    const startY = centerY - totalH / 2 + lineH / 2;

    lines.forEach(function(line, i) {
        ctx.fillText(line, centerX, startY + i * lineH);
    });

    return canvas.toBuffer('image/png');
}

async function handler(req, res) {
    const { text } = req.query;

    if (!text) {
        return res.status(400).json({
            status: false,
            message: 'Query ?text= wajib diisi',
            example: '/api/tools/wmp-text?text=Halo+ini+request+gua'
        });
    }

    try {
        const buffer = await drawWMP(text);
        res.setHeader('Content-Type', 'image/png');
        res.setHeader('Content-Disposition', 'inline; filename="wmp.png"');
        return res.end(buffer);
    } catch (err) {
        return res.status(500).json({
            status: false,
            message: err.message
        });
    }
}

module.exports = { meta, handler };