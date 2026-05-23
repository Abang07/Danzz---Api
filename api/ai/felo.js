const axios = require('axios');

const meta = {
  param:       'text',
  desc:        'Cari jawaban dengan Felo AI',
  placeholder: 'Apa itu Felo AI?',
};

async function handler(req, res) {
  const { text } = req.query;

  if (!text) {
    return res.status(400).json({
      status: false,
      message: 'Query ?text= wajib diisi',
      example: '/api/ai/felo?text=Apa itu Felo AI?'
    });
  }

  try {
    const gStr = n => Array.from({length: n}, () => 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.charAt(Math.floor(Math.random() * 62))).join('');
    const gHex = n => Array.from({length: n}, () => Math.floor(Math.random() * 16).toString(16)).join('');

    const searchUuid = gStr(21);
    const deviceId = gHex(32);

    const headers = {
      'Content-Type': 'application/json',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
      'Origin': 'https://felo.ai',
      'Referer': 'https://felo.ai/'
    };

    // 1. Thread Initiation
    const { data: threadRes } = await axios.post('https://felo.ai/api/search/threads', {
      query: text,
      search_uuid: searchUuid,
      lang: "",
      agent_lang: "id",
      search_options: { langcode: "id-ID" },
      search_video: true,
      query_from: "default",
      category: "social",
      model: "",
      auto_routing: true,
      mode: "concise",
      device_id: deviceId,
      stream_protocol: "message_center_v1",
      enable_task_state: true
    }, { headers });

    const streamKey = threadRes.stream_key;
    if (!streamKey) throw new Error('Gagal mendapatkan stream_key');

    // 2. Fetching Stream Data
    const { data: streamText } = await axios.get(`https://felo.ai/api/message/v1/stream/${streamKey}?offset=0`, {
      headers: { ...headers, 'Accept': 'text/event-stream' }
    });

    // 3. Parsing
    let finalAnswer = '';
    const lines = streamText.split('\n');

    for (const line of lines) {
      if (line.startsWith('data:')) {
        try {
          const rawData = JSON.parse(line.substring(5).trim());
          if (rawData.content) {
            const contentData = JSON.parse(rawData.content);
            if (contentData.data?.type === 'answer') {
              finalAnswer += contentData.data.data.text || '';
            }
          }
        } catch (e) {}
      }
    }

    return res.json({
      status: true,
      creator: 'Danzz',
      result: {
        query: text,
        answer: finalAnswer.trim() || 'Jawaban kosong, mungkin limit atau gagal parse.'
      }
    });

  } catch (err) {
    return res.status(500).json({
      status: false,
      message: err.response?.data?.message || err.message
    });
  }
}

module.exports = { meta, handler };