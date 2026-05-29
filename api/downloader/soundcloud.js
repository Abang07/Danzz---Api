const axios = require('axios');

const CLIENT_ID = 'IRnK0myxxLJdwXXjybXQo71mXyDGpaM6';

const meta = {
    param: 'url',
    desc: 'Download lagu dari SoundCloud via URL',
    placeholder: 'https://soundcloud.com/tyarmanggala/dewa-19-kangen',
    params: [
        { name: 'url', placeholder: 'https://soundcloud.com/user/track-slug' }
    ]
};

function formatDuration(ms) {
    const min = Math.floor(ms / 60000);
    const sec = String(Math.floor((ms % 60000) / 1000)).padStart(2, '0');
    return `${min}:${sec}`;
}

async function resolveUrl(scUrl) {
    const res = await axios.get('https://api-v2.soundcloud.com/resolve', {
        params: { url: scUrl, client_id: CLIENT_ID }
    });
    return res.data;
}

async function getStreamUrl(track) {
    const transcoding =
        track.media?.transcodings?.find(t => t.format?.protocol === 'progressive') ||
        track.media?.transcodings?.[0];

    if (!transcoding) throw new Error('Stream tidak tersedia untuk track ini');

    const res = await axios.get(transcoding.url, {
        params: { client_id: CLIENT_ID }
    });

    return {
        url: res.data.url,
        protocol: transcoding.format?.protocol
    };
}

async function resolveTrack(track) {
    const { url: streamUrl, protocol } = await getStreamUrl(track);
    return {
        title: track.title,
        artist: track.user.username,
        duration: formatDuration(track.duration),
        duration_ms: track.duration,
        genre: track.genre || null,
        plays: track.playback_count || null,
        artwork_url: track.artwork_url || null,
        permalink_url: track.permalink_url,
        protocol,
        stream_url: streamUrl
    };
}

async function handler(req, res) {
    const { url } = req.query;

    if (!url) {
        return res.status(400).json({
            status: false,
            message: 'Query ?url= wajib diisi',
            example: '/api/music/sc-download?url=https://soundcloud.com/tyarmanggala/dewa-19-kangen'
        });
    }

    const isValid = /^https?:\/\/(www\.)?soundcloud\.com\//i.test(url.trim());
    if (!isValid) {
        return res.status(400).json({
            status: false,
            message: 'URL tidak valid. Harus berupa link soundcloud.com'
        });
    }

    try {
        const data = await resolveUrl(url.trim());

        // ── Single track ──────────────────────────────────────────────────────
        if (data.kind === 'track') {
            const track = await resolveTrack(data);
            return res.status(200).json({
                status: true,
                creator: 'Danzz',
                result: {
                    kind: 'track',
                    ...track
                }
            });
        }

        // ── Playlist / set ────────────────────────────────────────────────────
        if (data.kind === 'playlist') {
            const tracks = await Promise.all(
                (data.tracks || []).map(async t => {
                    try {
                        return await resolveTrack(t);
                    } catch {
                        return {
                            title: t.title,
                            artist: t.user?.username || '-',
                            error: 'Stream tidak tersedia'
                        };
                    }
                })
            );

            return res.status(200).json({
                status: true,
                creator: 'Danzz',
                result: {
                    kind: 'playlist',
                    title: data.title,
                    artist: data.user.username,
                    total: tracks.length,
                    tracks
                }
            });
        }

        return res.status(400).json({
            status: false,
            message: `Tipe tidak didukung: ${data.kind}`
        });

    } catch (err) {
        return res.status(500).json({
            status: false,
            message: err.response?.data || err.message
        });
    }
}

module.exports = { meta, handler };