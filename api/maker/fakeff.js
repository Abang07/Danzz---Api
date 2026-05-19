const axios = require('axios');
const Jimp = require('jimp');
const FormData = require('form-data');
const fetch = require('node-fetch');

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

async function uploader(buffer) {
  const filename = `danzz-${Date.now()}.jpg`;
  const form = new FormData();
  form.append('file', buffer, { filename, contentType: 'image/jpeg' });

  const res = await fetch('https://danzz-uploader.vercel.app/api/upload', {
    method: 'POST',
    body: form,
    headers: form.getHeaders(),
  });

  const data = await res.json();
  return data.url || null;
}

async function handler(req, res) {
  const { template, name } = req.query;

  if (!template || !name) {
    return res.status(400).json({
      status: false,
      message: 'Query ?template= dan ?name= wajib diisi',
      example: '/api/maker/fakeff?template=1&name=Danzz',
      total_template: TOTAL
    });
  }

  const num = parseInt(template);
  const imageUrl = imageUrls[num];

  if (!imageUrl) {
    return res.status(400).json({
      status: false,
      message: `Template tidak tersedia. Pilih 1-${TOTAL}`
    });
  }

  try {
    // 1. Download template langsung ke buffer
    const imgRes = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    const imgBuffer = Buffer.from(imgRes.data);

    // 2. Baca image dari buffer pakai Jimp
    const image = await Jimp.create(imgBuffer);
    const W = image.getWidth();
    const H = image.getHeight();

    // 3. Load font
    const nameLen = name.length;
    let font;
    if (nameLen <= 6) {
      font = await Jimp.loadFont(Jimp.FONT_SANS_64_YELLOW);
    } else if (nameLen <= 10) {
      font = await Jimp.loadFont(Jimp.FONT_SANS_32_YELLOW);
    } else {
      font = await Jimp.loadFont(Jimp.FONT_SANS_16_YELLOW);
    }

    // 4. Posisi tengah bawah
    const textWidth  = Jimp.measureText(font, name.toUpperCase());
    const textHeight = Jimp.measureTextHeight(font, name.toUpperCase(), W);
    const x = Math.max(0, (W - textWidth) / 2);
    const y = Math.max(0, H * 0.80 - textHeight / 2);

    // 5. Print text
    image.print(font, x, y, name.toUpperCase());

    // 6. Export ke buffer langsung tanpa tulis file
    const outputBuffer = await image.getBufferAsync(Jimp.MIME_JPEG);

    // 7. Upload
    const resultUrl = await uploader(outputBuffer);
    if (!resultUrl) return res.status(500).json({ status: false, message: 'Gagal upload gambar' });

    res.json({
      status: true,
      creator: 'Danzz',
      data: {
        name: name.toUpperCase(),
        template: num,
        resultUrl
      }
    });

  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
}

module.exports = { handler };
