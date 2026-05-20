/*
 * Endpoint: GET /api/ai/editimg?url=...&prompt=...
 * Source  : easemate.ai
 * By      : Danzz
 */

const { spawn } = require('child_process');
const path = require('path');

const SCRIPT_PATH = path.join(__dirname, 'editimg-core.mjs');

async function editImage(imageUrl, prompt) {
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [SCRIPT_PATH], {
      env: { ...process.env, IMG_URL: imageUrl, IMG_PROMPT: prompt },
      timeout: 180000
    });

    let stdout = '';
    let stderr = '';
    child.stdout.on('data', d => stdout += d);
    child.stderr.on('data', d => stderr += d);
    child.on('close', (code) => {
      try {
        const result = JSON.parse(stdout.trim());
        if (!result.Status) return reject(new Error(result.Error || 'Generate failed'));
        resolve(result.Url);
      } catch (e) {
        reject(new Error(stderr || stdout || 'Unknown error'));
      }
    });
    child.on('error', reject);
  });
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
