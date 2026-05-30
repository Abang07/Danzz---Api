const axios = require('axios');
const { createCanvas, loadImage, registerFont } = require('canvas');

// ============================================
// TEMPLATE IMAGES
// ============================================
const imageUrls = {
    1:  'https://cloud-fukushima.vercel.app/uploader/8fjhd6ftps.jpg',
    2:  'https://cloud-fukushima.vercel.app/uploader/oz8hb4ow75.jpg',
    3:  'https://cloud-fukushima.vercel.app/uploader/tvz1cie8df.jpg',
    4:  'https://cloud-fukushima.vercel.app/uploader/yo9sg4vmo3.jpg',
    5:  'https://files.catbox.moe/cuatgd.jpg',
    6:  'https://files.catbox.moe/kfl1lb.jpg',
    7:  'https://files.catbox.moe/8vyh2k.jpg',
    8:  'https://files.catbox.moe/jxzw2r.jpg',
    9:  'https://files.catbox.moe/mmgua4.jpg',
    10: 'https://files.catbox.moe/rcgn6z.jpg',
    11: 'https://files.catbox.moe/v2np8h.jpg'
};

const TOTAL = Object.keys(imageUrls).length;

const meta = {
    param: 'name,template',
    desc: 'Free Fire Lobby Card Generator',
    placeholder: 'Kyuu | 1',
    params: [
        { name: 'name',     placeholder: 'Kyuu Depeloger' },
        { name: 'template', placeholder: '1' }
    ]
};

// ============================================
// DRAW TEXT WITH SHADOW (pengganti ffmpeg)
// ============================================
function drawTextWithShadow(ctx, text, x, y, fontSize) {
    ctx.font      = `bold ${fontSize}px TeutonNormal, Arial`;
    ctx.textAlign = 'center';

    // Shadow
    ctx.fillStyle   = 'rgba(0,0,0,0.85)';
    ctx.shadowColor = 'black';
    ctx.shadowBlur  = 0;
    for (let ox = -3; ox <= 3; ox++) {
        for (let oy = -3; oy <= 3; oy++) {
            if (ox === 0 && oy === 0) continue;
            ctx.fillText(text, x + ox, y + oy);
        }
    }

    // Main text (yellow)
    ctx.fillStyle   = '#FFD700';
    ctx.shadowColor = 'transparent';
    ctx.fillText(text, x, y);
}

async function handler(req, res) {
    const { name, template } = req.query;

    // VALIDASI
    if (!name || !template) {
        return res.status(400).json({
            status: false,
            message: 'Query ?name= dan ?template= wajib diisi',
            example: '/api/maker/fakeff?name=Kyuu&template=1',
            available_templates: `1 - ${TOTAL}`
        });
    }

    const num = parseInt(template);
    if (isNaN(num) || num < 1 || num > TOTAL) {
        return res.status(400).json({
            status: false,
            message: `Template tidak valid. Pilih antara 1 - ${TOTAL}`
        });
    }

    const imageUrl = imageUrls[num];

    try {
        // Load template image
        const imgRes = await axios.get(imageUrl, { responseType: 'arraybuffer' });
        const img    = await loadImage(Buffer.from(imgRes.data));

        const W = img.width;
        const H = img.height;

        const canvas = createCanvas(W, H);
        const ctx    = canvas.getContext('2d');

        // Draw background image
        ctx.drawImage(img, 0, 0, W, H);

        // Hitung font size dinamis berdasar panjang nama
        const nameLen  = name.length;
        const fontSize = nameLen <= 6
            ? Math.floor(W * 0.055)
            : nameLen <= 10
                ? Math.floor(W * 0.045)
                : Math.floor(W * 0.035);

        // Posisi teks: horizontal center, y = 80% tinggi gambar
        const x = W / 2 + W * 0.02;
        const y = H * 0.80;

        drawTextWithShadow(ctx, name.trim().toUpperCase(), x, y, fontSize);

        // Kirim sebagai PNG
        const buffer = canvas.toBuffer('image/jpeg', { quality: 0.92 });
        res.setHeader('Content-Type', 'image/jpeg');
        res.setHeader('Content-Disposition', 'inline; filename="fakeff.jpg"');
        return res.end(buffer);

    } catch (err) {
        return res.status(500).json({
            status: false,
            message: err.message
        });
    }
}

module.exports = { meta, handler };