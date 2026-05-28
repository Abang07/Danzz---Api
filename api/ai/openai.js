const axios = require('axios');

function cleanAnswer(text = '') {
    return text
        .replace(/support pollinations\.ai[\s\S]*$/i, '')
        .replace(/powered by pollinations\.ai[\s\S]*$/i, '')
        .replace(/🌸\s*ad\s*🌸[\s\S]*$/i, '')
        .replace(/pollinations\.ai[\s\S]*$/i, '')
        .trim();
}

async function handler(req, res) {
    const { text, model } = req.query;

    if (!text) {
        return res.status(400).json({
            status: false,
            message: 'Query ?text= wajib diisi'
        });
    }

    try {
        const response = await axios.post(
            'https://text.pollinations.ai/openai',
            {
                model: model || 'openai',
                messages: [
                    {
                        role: 'system',
                        content: 'Kamu adalah asisten AI. Jawab dalam Bahasa Indonesia.'
                    },
                    {
                        role: 'user',
                        content: text.trim()
                    }
                ]
            },
            { timeout: 60000 }
        );

        const raw =
            response.data?.choices?.[0]?.message?.content || '';

        const answer = cleanAnswer(raw);

        return res.json({
            status: true,
            result: {
                question: text,
                answer
            }
        });

    } catch (err) {
        return res.status(500).json({
            status: false,
            message: err.message
        });
    }
}

module.exports = { handler };