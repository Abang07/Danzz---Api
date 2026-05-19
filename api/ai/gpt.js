const axios = require('axios');
const FormData = require('form-data');
const crypto = require('crypto');
const cheerio = require('cheerio');
const { CookieJar } = require('tough-cookie');
const { wrapper } = require('axios-cookiejar-support');

const BASE_URL = 'https://gptonline.ai';
const PAGE_URL = `${BASE_URL}/id/chat-online/`;
const AJAX_URL = `${BASE_URL}/id/wp-admin/admin-ajax.php`;
const UA = 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Mobile Safari/537.36';

function extractNonceCandidates(text) {
  const source = String(text || '');
  const candidates = [];
  const patterns = [
    /["']nonce["']\s*[:=]\s*["']([a-zA-Z0-9_-]{8,})["']/gi,
    /nonce\s*[:=]\s*["']([a-zA-Z0-9_-]{8,})["']/gi,
    /data-nonce=["']([a-zA-Z0-9_-]{8,})["']/gi,
  ];
  for (const pattern of patterns) {
    let match;
    while ((match = pattern.exec(source)) !== null) {
      if (match[1]) candidates.push(match[1]);
    }
  }
  return [...new Set(candidates)];
}

function cleanAnswer(text) {
  return String(text || '')
    .replace(/<br\s*\/?>/gi, '\n').replace(/<\/p>/gi, '\n')
    .replace(/<\/div>/gi, '\n').replace(/<li>/gi, '- ')
    .replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>').replace(/&quot;/g, '"')
    .replace(/\n{3,}/g, '\n\n').trim();
}

async function handler(req, res) {
  const { text } = req.query;

  if (!text) {
    return res.status(400).json({
      status: false,
      message: 'Query ?text= wajib diisi',
      example: '/api/ai/gpt?text=Halo apa kabar'
    });
  }

  try {
    const jar = new CookieJar();
    const client = wrapper(axios.create({
      jar, withCredentials: true, timeout: 60000,
      validateStatus: () => true,
      headers: { 'user-agent': UA, 'accept-language': 'id-ID,id;q=0.9' }
    }));

    // Get nonce
    const pageRes = await client.get(PAGE_URL, { headers: { accept: 'text/html', referer: BASE_URL } });
    const html = String(pageRes.data || '');
    const $ = cheerio.load(html);
    const candidates = [];
    $('[name="nonce"], [data-nonce]').each((_, el) => {
      const val = $(el).attr('value') || $(el).attr('data-nonce');
      if (val) candidates.push(val.trim());
    });
    candidates.push(...extractNonceCandidates(html));
    $('script').each((_, el) => candidates.push(...extractNonceCandidates($(el).html()))); 
    const nonce = [...new Set(candidates)].filter(x => /^[a-zA-Z0-9_-]{8,80}$/.test(x))[0];
    if (!nonce) throw new Error('Nonce tidak ditemukan');

    const userId = crypto.randomUUID();

    // Send message
    const sendForm = new FormData();
    sendForm.append('msg', text);
    sendForm.append('user_id', userId);
    sendForm.append('action', 'gpt_embed_send_message');
    const sendRes = await client.post(AJAX_URL, sendForm, {
      headers: { ...sendForm.getHeaders(), accept: '*/*', origin: BASE_URL, referer: PAGE_URL }
    });
    if (!sendRes.data?.id) throw new Error('Gagal send message');
    const chatHistoryId = sendRes.data.id;

    // Get message
    const getForm = new FormData();
    getForm.append('chat_history_id', String(chatHistoryId));
    getForm.append('user_id', userId);
    getForm.append('action', 'gpt_embed_get_message');
    getForm.append('nonce', nonce);
    const getRes = await client.post(AJAX_URL, getForm, {
      headers: { ...getForm.getHeaders(), accept: '*/*', origin: BASE_URL, referer: PAGE_URL }
    });
    if (!getRes.data?.message) throw new Error('Gagal get message');

    const answer = cleanAnswer(getRes.data.message);

    return res.status(200).json({
      status: true,
      creator: 'Danzz',
      result: {
        question: text,
        answer
      }
    });

  } catch (err) {
    return res.status(500).json({ status: false, message: err.message });
  }
}

module.exports = { handler };
