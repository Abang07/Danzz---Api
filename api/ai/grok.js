const axios = require('axios');

const BASE_URL = 'https://api.groq.com';
const CHAT_URL = `${BASE_URL}/openai/v1/chat/completions`;
const API_KEY = 'ISI_APIKEY_GROQ_KAMU';

const meta = {
    param: 'text',
    desc: 'Chat AI Meta Llama',
    placeholder: 'Halo apa kabar',
    params: [
        {
            name: 'text',
            placeholder: 'Halo apa kabar'
        }
    ]
};

async function handler(req, res) {

    const { text } = req.query;

    if (!text) {
        return res.status(400).json({
            status: false,
            message: 'Query ?text= wajib diisi',
            example: '/api/ai/meta?text=Halo apa kabar'
        });
    }

    try {

        const response = await axios.post(
            CHAT_URL,
            {
                // ======================
                // MODEL META LLAMA
                // ======================
                model: 'llama-3.3-70b-versatile',

                messages: [
                    {
                        role: 'system',
                        content:
                            'Kamu adalah asisten AI yang ramah dan selalu menjawab dalam Bahasa Indonesia.'
                    },
                    {
                        role: 'user',
                        content: text.trim()
                    }
                ],

                temperature: 0.7,
                max_tokens: 2048
            },
            {
                headers: {
                    Authorization:
                        `Bearer ${API_KEY}`,

                    'Content-Type':
                        'application/json'
                },

                timeout: 30000,

                validateStatus: () => true
            }
        );

        // ======================
        // VALIDASI RESPONSE
        // ======================
        if (
            !response.data?.choices?.[0]
                ?.message?.content
        ) {

            throw new Error(
                `Gagal dapat response: ${JSON.stringify(response.data)}`
            );
        }

        const answer =
            response.data
                .choices[0]
                .message.content
                .trim();

        // ======================
        // RESULT
        // ======================
        return res.status(200).json({
            status: true,
            creator: 'Danzz',

            model:
                'llama-3.3-70b-versatile',

            result: {
                question: text,
                answer
            }
        });

    } catch (err) {

        return res.status(500).json({
            status: false,

            message:
                err.response?.data ||
                err.message
        });
    }
}

module.exports = {
    meta,
    handler
};