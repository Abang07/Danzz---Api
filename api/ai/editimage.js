const axios = require('axios');
const crypto = require('crypto');

const BASE_URL = 'https://ai-image-editor.com';
const FILES_URL = 'https://files.ai-image-editor.com';

async function getEditedImage(imageUrl, prompt) {
    // 1. Download gambar dari URL
    const imgResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    const imgBuffer = Buffer.from(imgResponse.data);

    const fileName = `${crypto.randomUUID()}.jpg`;
    const bucket = 'ai-image-editor';
    const uploadPath = `original/${fileName}`;

    // 2. Dapatkan Signed URL untuk upload
    const signed = await axios.post(
        `${BASE_URL}/api/trpc/uploads.signedUploadUrl?batch=1`,
        { 0: { json: { bucket, path: uploadPath } } },
        { headers: { 'Content-Type': 'application/json', 'User-Agent': 'Mozilla/5.0' } }
    );

    const uploadUrl = signed.data[0].result.data.json;

    // 3. Upload gambar ke server AI
    await axios.put(uploadUrl, imgBuffer, { headers: { 'Content-Type': 'image/jpeg' } });
    const hostedUrl = `${FILES_URL}/${uploadPath}`;

    // 4. Picu proses AI
    const task = await axios.post(
        `${BASE_URL}/api/trpc/ai.createNanoBananaTask?batch=1`,
        {
            0: {
                json: {
                    imageUrls: [hostedUrl],
                    prompt,
                    outputFormat: 'png',
                    imageSize: 'auto',
                    nVariants: 1
                }
            }
        },
        { headers: { 'Content-Type': 'application/json', 'User-Agent': 'Mozilla/5.0' } }
    );

    const taskId = task.data[0].result.data.json.data.taskId;
    const visitorId = crypto.randomUUID();

    // 5. Polling status
    while (true) {
        const check = await axios.get(
            `${BASE_URL}/api/trpc/ai.queryNanoBananaTask?batch=1&input=${encodeURIComponent(
                JSON.stringify({ 0: { json: { taskId, visitorId } } })
            )}`,
            { headers: { 'User-Agent': 'Mozilla/5.0' } }
        );

        const data = check.data[0].result.data.json.data;

        if (data.state === 'success' && data.resultUrls?.length) {
            return data.resultUrls[0];
        } else if (data.state === 'failed' || data.state === 'error') {
            throw new Error('AI gagal memproses gambar');
        }

        await new Promise(r => setTimeout(r, 2000));
    }
}

async function handler(req, res) {
    const { url, prompt } = req.query;

    if (!url || !prompt) {
        return res.status(400).json({
            status: false,
            message: 'Query ?url= dan ?prompt= wajib diisi',
            example: '/api/maker/aiedit?url=https://example.com/image.jpg&prompt=remove background'
        });
    }

    try {
        const resultUrl = await getEditedImage(url, prompt);

        return res.status(200).json({
            status: true,
            creator: 'Danzz',
            result: {
                prompt,
                image: resultUrl
            }
        });

    } catch (err) {
        return res.status(500).json({
            status: false,
            message: err.message || 'Internal Server Error'
        });
    }
}

module.exports = { handler };
