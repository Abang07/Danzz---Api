const axios = require('axios');

async function handler(req, res) {
    const { nomor } = req.query;

    if (!nomor) {
        return res.status(400).json({
            status: false,
            message: 'Query ?nomor= wajib diisi',
            example: '/api/tools/cekxl?nomor=087812345678'
        });
    }

    try {
        const url = `https://xl-ku.my.id/end.php?check=package&number=${nomor}&version=2`;

        const { data } = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
                'Accept': 'application/json, text/plain, */*'
            },
            timeout: 10000
        });

        if (data && data.success) {
            return res.status(200).json({
                status: true,
                creator: 'Danzz',
                result: data.data
            });
        } else {
            return res.status(200).json({
                status: false,
                message: data?.message || 'Gagal narik data dari server'
            });
        }

    } catch (err) {
        return res.status(500).json({
            status: false,
            message: err.response?.data?.message || err.message
        });
    }
}

module.exports = { handler };
