const axios = require('axios');

const BASE_URL = 'https://same.yui.pw/api/v6';

const meta = {
    param: 'query',
    desc: 'Search doujin dari cin.blue',
    placeholder: 'naruto',
    params: [
        { name: 'query', placeholder: 'naruto' },
        { name: 'page',  placeholder: '1' }
    ]
};

async function handler(req, res) {
    const { query, page = 1 } = req.query;

    if (!query) {
        return res.status(400).json({
            status: false,
            message: 'Query ?query= wajib diisi',
            example: '/api/cinblue/search?query=naruto&page=1'
        });
    }

    try {
        const response = await axios.get(
            `${BASE_URL}/search/${encodeURIComponent(query)}`,
            {
                params: { page },
                timeout: 10000,
                validateStatus: () => true
            }
        );

        const data = response.data;

        if (!data?.result) {
            throw new Error('Response tidak valid dari API');
        }

        const results = data.result.map(item => ({
            id:     item.id,
            title:  item.title?.english || item.title?.pretty || item.title?.japanese || null,
            lang:   item.lang || null,
            pages:  item.num_pages,
            cover:  item.cover?.t ? `https://f.kontol.online/api/imageV2/t/${item.media_id}/thumb.${item.cover.t}` : null,
            url:    `https://cin.blue/v/${item.id}`
        }));

        return res.status(200).json({
            status:    true,
            creator:   'Danzz',
            query,
            page:      Number(page),
            total:     (data.num_pages || 1) * (data.per_page || results.length),
            per_page:  data.per_page || results.length,
            total_pages: data.num_pages || 1,
            count:     results.length,
            result:    results
        });

    } catch (err) {
        return res.status(500).json({
            status:  false,
            message: err.response?.data || err.message
        });
    }
}

module.exports = { meta, handler };