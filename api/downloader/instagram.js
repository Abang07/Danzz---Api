const axios = require('axios');
const qs = require('qs');

async function igDownload(url) {
  try {
    const { data: res } = await axios.post(
      'https://savereels.io/api/ajaxSearch',
      qs.stringify({ q: url, v: 'v2' }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          'X-Requested-With': 'XMLHttpRequest',
          'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K)'
        }
      }
    );
    if (res.status !== 'ok') return { error: 'Failed' };
    const links = [...res.data.matchAll(/href="(https:\/\/dl\.snapcdn\.app\/get\?token=[^"]+)"/g)].map(m => m[1]);
    return { results: [...new Set(links)] };
  } catch (e) {
    return { error: e.message };
  }
}

async function handler(req, res) {
  const { url } = req.query;
  if (!url) return res.status(400).json({ status: false, message: 'Parameter url wajib diisi!' });
  const data = await igDownload(url);
  if (data.error) return res.status(500).json({ status: false, message: data.error });
  res.json({ status: true, creator: 'Danzz', result: data });
}

module.exports = { handler };
