/*
 * Endpoint: GET /api/ai/editimg?url=...&prompt=...
 * Source  : magiceraser.org + imgupscaler.ai
 * By      : Danzz
 */

const axios = require('axios');
const FormData = require('form-data');

function genserial() {
  let s = '';
  for (let i = 0; i < 32; i++) s += Math.floor(Math.random() * 16).toString(16);
  return s;
}

async function upimage(filename) {
  const form = new FormData();
  form.append('file_name', filename);
  const res = await axios.post('https://api.imgupscaler.ai/api/common/upload/upload-image', form, {
    headers: { ...form.getHeaders(), origin: 'https://imgupscaler.ai', referer: 'https://imgupscaler.ai/' }
  });
  return res.data.result;
}

async function uploadToOSS(putUrl, buffer, ext) {
  const type = ext === 'png' ? 'image/png' : 'image/jpeg';
  await axios.put(putUrl, buffer, {
    headers: { 'Content-Type': type, 'Content-Length': buffer.length },
    maxBodyLength: Infinity
  });
}

async function createJob(imageUrl, prompt) {
  const form = new FormData();
  form.append('model_name', 'magiceraser_v4');
  form.append('original_image_url', imageUrl);
  form.append('prompt', prompt);
  form.append('ratio', 'match_input_image');
  form.append('output_format', 'jpg');
  const res = await axios.post('https://api.magiceraser.org/api/magiceraser/v2/image-editor/create-job', form, {
    headers: {
      ...form.getHeaders(),
      'product-code': 'magiceraser',
      'product-serial': genserial(),
      origin: 'https://imgupscaler.ai',
      referer: 'https://imgupscaler.ai/'
    }
  });
  return res.data.result.job_id;
}

async function cekjob(jobId) {
  const res = await axios.get(`https://api.magiceraser.org/api/magiceraser/v1/ai-remove/get-job/${jobId}`, {
    headers: { origin: 'https://imgupscaler.ai', referer: 'https://imgupscaler.ai/' }
  });
  return res.data;
}

async function editImage(imageUrl, prompt) {
  // Download gambar dari URL
  const imgRes = await axios.get(imageUrl, { responseType: 'arraybuffer', timeout: 30000 });
  const buffer = Buffer.from(imgRes.data);
  const contentType = imgRes.headers['content-type'] || 'image/jpeg';
  const ext = contentType.includes('png') ? 'png' : 'jpg';
  const filename = `edit_${Date.now()}.${ext}`;

  // Upload ke imgupscaler
  const uploadInfo = await upimage(filename);
  await uploadToOSS(uploadInfo.url, buffer, ext);
  const cdnUrl = 'https://cdn.imgupscaler.ai/' + uploadInfo.object_name;

  // Buat job
  const jobId = await createJob(cdnUrl, prompt);

  // Polling hasil
  let result;
  let attempts = 0;
  do {
    await new Promise(r => setTimeout(r, 3000));
    result = await cekjob(jobId);
    attempts++;
    if (attempts > 40) throw new Error('Timeout menunggu hasil gambar.');
  } while (result.code === 300006);

  if (!result.result?.output_url?.[0]) throw new Error('Gagal mendapatkan hasil: ' + JSON.stringify(result));

  return result.result.output_url[0];
}

async function handler(req, res) {
  const { url, prompt, text } = req.query;
  const input = prompt || text;

  if (!url || !input) {
    return res.status(400).json({
      status: false,
      message: 'Parameter "url" dan "prompt" wajib diisi!\nContoh: /api/ai/editimg?url=https://...&prompt=ubah background jadi hitam'
    });
  }

  try {
    const result = await editImage(url, input.trim());
    res.json({ status: true, creator: 'Danzz', result });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
}

module.exports = { handler };
      
