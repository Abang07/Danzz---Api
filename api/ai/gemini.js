const axios = require('axios');
const { GoogleGenerativeAI } = require('@google/generative-ai');

/**
 * Edit foto menggunakan Gemini Official API
 * @param {string} imageUrl - URL gambar
 * @param {string} text - Instruksi edit
 * @returns {object} { text, imageBase64, imageMimeType }
 */
async function editImage(imageUrl, text) {
  const genAI = new GoogleGenerativeAI('AIzaSyBB-O56WKV1wnX89lWH6PEQqfdQLa9iRZc');

  // Download gambar dari URL
  const imageRes = await axios.get(imageUrl, { responseType: 'arraybuffer' });
  const buffer = Buffer.from(imageRes.data);
  const mimeType = imageRes.headers['content-type'] || 'image/jpeg';
  const base64 = buffer.toString('base64');

  const model = genAI.getGenerativeModel({
    model: 'gemini-2.0-flash-exp',
  });

  const result = await model.generateContent([
    { inlineData: { data: base64, mimeType } },
    { text },
  ]);

  const response = result.response;
  const responseText = response.text();

  // cek apakah ada gambar di response
  const parts = response.candidates?.[0]?.content?.parts || [];
  const imagePart = parts.find(p => p.inlineData?.mimeType?.startsWith('image/'));

  return {
    text: responseText,
    imageBase64: imagePart?.inlineData?.data || null,
    imageMimeType: imagePart?.inlineData?.mimeType || null,
  };
}

/**
 * Route handler Express
 * GET /api/gemini?url=https://example.com/photo.jpg&text=buat+background+putih
 */
async function handler(req, res) {
  const { url, text } = req.query;

  if (!url) {
    return res.status(400).json({
      status: false,
      message: 'Parameter url wajib diisi! Contoh: /api/gemini?url=https://example.com/photo.jpg&text=edit+foto+ini',
    });
  }

  if (!text) {
    return res.status(400).json({
      status: false,
      message: 'Parameter text wajib diisi! Contoh: &text=buat+background+jadi+putih',
    });
  }

  try {
    const result = await editImage(url, text);

    res.json({
      status: true,
      creator: 'Danzz',
      text: result.text,
      result: result.imageBase64
        ? `data:${result.imageMimeType};base64,${result.imageBase64}`
        : null,
    });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
}

module.exports = { handler };
