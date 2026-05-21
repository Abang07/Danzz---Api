const axios = require('axios');

const BASE_URL = 'https://api.groq.com';
const CHAT_URL = `${BASE_URL}/openai/v1/chat/completions`;
const API_KEY = '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';

async function handler(req, res) {
    const { text } = req.query;

    if (!text) {
        return res.status(400).json({
            status: false,
            message: 'Query ?text= wajib diisi',
            example: '/api/ai/openai?text=Halo apa kabar'
        });
    }

    try {
        const res_ = await axios.post(
            CHAT_URL,
            {
                model: 'openai/gpt-oss-20b',
                messages: [
                    { role: 'system', content: 'Kamu adalah asisten AI. Selalu jawab dalam Bahasa Indonesia.' },
                    { role: 'user', content: text.trim() }
                ]
            },
            {
                headers: {
                    'Authorization': `Bearer ${API_KEY}`,
                    'Content-Type': 'application/json'
                },
                timeout: 30000,
                validateStatus: () => true
            }
        );

        if (!res_.data?.choices?.[0]?.message?.content) {
            throw new Error(`Gagal dapat response: ${JSON.stringify(res_.data)}`);
        }

        const answer = res_.data.choices[0].message.content.trim();

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
