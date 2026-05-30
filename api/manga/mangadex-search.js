const axios = require('axios');

// ======================
// META
// ======================
const meta = {
    param:       'query',
    desc:        'Search manga dari MangaDex',
    placeholder: 'chainsaw man',
    params: [
        { name: 'query', placeholder: 'chainsaw man' },
        { name: 'limit', placeholder: '10' }
    ]
};

// ======================
// SEARCH MANGADEX
// ======================
async function searchMangaDex(query, limit = 10) {
    const url = 'https://api.mangadex.org/manga';
    const params = {
        title: query,
        limit: limit,
        contentRating: ['safe', 'suggestive', 'erotica'],
        includes: ['cover_art'],
        order: {
            followedCount: 'desc',
            relevance: 'desc'
        }
    };

    const response = await axios.get(url, { params });
    const data = response.data;

    return {
        total:   data.total,
        offset:  data.offset,
        results: data.data.map(manga => {
            const coverRel  = manga.relationships.find(rel => rel.type === 'cover_art');
            const coverFile = coverRel?.attributes?.fileName || null;

            return {
                id:            manga.id,
                title:         manga.attributes.title.en || Object.values(manga.attributes.title)[0] || 'No title',
                altTitles:     manga.attributes.altTitles.map(t => Object.values(t)[0]).filter(Boolean),
                status:        manga.attributes.status,
                year:          manga.attributes.year,
                demographic:   manga.attributes.publicationDemographic,
                contentRating: manga.attributes.contentRating,
                lastChapter:   manga.attributes.lastChapter,
                description:   manga.attributes.description.en?.substring(0, 200) + '...' || null,
                tags:          manga.attributes.tags.map(t => t.attributes.name.en),
                coverUrl:      coverFile ? `https://uploads.mangadex.org/covers/${manga.id}/${coverFile}` : null,
                externalLinks: manga.attributes.links || {}
            };
        })
    };
}

// ======================
// HANDLER
// ======================
async function handler(req, res) {
    const { query, limit } = req.query;

    if (!query) {
        return res.status(400).json({
            status:  false,
            message: 'Query ?query= wajib diisi',
            example: '/api/scrape/mangadex?query=chainsaw+man&limit=10'
        });
    }

    try {
        const { total, offset, results } = await searchMangaDex(query, parseInt(limit) || 10);

        return res.json({
            status:  true,
            query:   query,
            total:   total,
            offset:  offset,
            count:   results.length,
            results: results
        });

    } catch (err) {
        return res.status(500).json({ status: false, message: err.message });
    }
}

module.exports = { meta, handler };