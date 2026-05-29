const axios = require('axios');

const CLIENT_ID = 'IRnK0myxxLJdwXXjybXQo71mXyDGpaM6';

const meta = {
    param: 'q',
    desc: 'Search lagu di SoundCloud',
    placeholder: 'Dewa 19',
    params: [
        { name: 'q', placeholder: 'Dewa 19' },
        { name: 'limit', placeholder: '5 (opsional)' }
    ]
};

function formatDuration(ms) {
    const min = Math.floor(ms / 60000);
    const sec = String(Math.floor((ms % 60000) / 1000)).padStart(2, '0');
    return `${min}:${sec}`;
}

async function searchTracks(query, limit = 5) {
    const res = await axios.get('https://api-v2.soundcloud.com/search/tracks', {
        params: {
            q: query,
            client_id: CLIENT_ID,
            limit: Math.min(parseInt(limit) || 5, 20),
            offset: 0
        }
    });

    return (res.data.collection || []).map(t => ({
        title: t.title,
        artist: t.user.username,
        duration: formatDuration(t.duration),
        duration_ms: t.duration,
        genre: t.genre || null,
        plays: t.playback_count || null,
        artwork_url: t.artwork_url || null,
        permalink_url: t.permalink_url
    }));
}

async function handler(req, res) {
    const { q, limit } = req.query;

    if (!q) {
        return res.status(400).json({
            status: false,
            message: 'Query ?q= wajib diisi',
            example: '/api/music/sc-search?q=Dewa+19&limit=5'
        });
    }

    try {
        const results = await searchTracks(q.trim(), limit);

        return res.status(200).json({
            status: true,
            creator: 'Danzz',
            result: {
                query: q,
                total: results.length,
                tracks: results
            }
        });
    } catch (err) {
        return res.status(500).json({
            status: false,
            message: err.response?.data || err.message
        });
    }
}

module.exports = { meta, handler };