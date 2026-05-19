const axios = require('axios');
const FormData = require('form-data');

async function handler(req, res) {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({
      status: false,
      message: 'Query ?url= wajib diisi',
      example: '/api/tools/removebg?url=https://example.com/image.jpg'
    });
  }

  try {
    // 1. Download gambar dari URL
    const imgRes = await axios.get(url, { responseType: 'arraybuffer' });
    const buffer = Buffer.from(imgRes.data);
    const mime = imgRes.headers['content-type'] || 'image/jpeg';

    const jantung = {
      'Accept': 'application/json, text/plain, */*',
      'Accept-Language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7',
      'Origin': 'https://www.pixelcut.ai',
      'Referer': 'https://www.pixelcut.ai/',
      'Sec-Ch-Ua': '"Chromium";v="137", "Not/A)Brand";v="24"',
      'Sec-Ch-Ua-Mobile': '?1',
      'Sec-Ch-Ua-Platform': '"Android"',
      'Sec-Fetch-Dest': 'empty',
      'Sec-Fetch-Mode': 'cors',
      'Sec-Fetch-Site': 'cross-site',
      'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Mobile Safari/537.36',
      'X-Client-Version': 'web:pixelcut.ai:b98bfd12',
      'X-Locale': 'en'
    };

    // 2. Hit pixelcut API
    const form = new FormData();
    form.append('image', buffer, { filename: 'image.jpg', contentType: mime });
    form.append('format', 'png');
    form.append('model', 'v1');

    const { data } = await axios.post(
      'https://api2.pixelcut.app/image/matte/v1',
      form,
      { headers: { ...jantung, ...form.getHeaders() }, responseType: 'arraybuffer' }
    );

    // 3. Langsung return foto PNG
    res.setHeader('Content-Type', 'image/png');
    return res.send(Buffer.from(data));

  } catch (err) {
    return res.status(500).json({
      status: false,
      message: err.message
    });
  }
}

module.exports = { handler };
