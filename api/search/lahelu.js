const axios = require('axios');

const BASE = 'https://lahelu.com';

const UA =
    'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Mobile Safari/537.36';

const meta = {
    param: 'text',
    desc: 'Search post Lahelu',
    placeholder: 'meme kucing',
    params: [
        {
            name: 'text',
            placeholder: 'meme kucing'
        }
    ]
};

function clean(text = '') {
    return String(text)
        .replace(/\s+/g, ' ')
        .replace(/\\u002F/g, '/')
        .replace(/\\u0026/g, '&')
        .replace(/&amp;/g, '&')
        .replace(/&#39;/g, "'")
        .replace(/&quot;/g, '"')
        .trim();
}

function fullUrl(url = '') {
    if (!url) return null;

    if (url.startsWith('http'))
        return url;

    if (url.startsWith('//'))
        return 'https:' + url;

    if (url.startsWith('/'))
        return BASE + url;

    return url;
}

function getMediaType(url = '') {
    if (/\.(mp4|webm|mov)(\?|$)/i.test(url))
        return 'video';

    if (/\.(jpg|jpeg|png|webp|gif)(\?|$)/i.test(url))
        return 'image';

    return 'unknown';
}

async function handler(req, res) {

    const { text } = req.query;

    if (!text) {
        return res.status(400).json({
            status: false,
            message: 'Query ?text= wajib diisi',
            example:
                '/api/search/lahelu?text=meme kucing'
        });
    }

    try {

        const response = await axios.get(
            `${BASE}/api/post/get-search`,
            {
                params: {
                    query: text.trim()
                },

                headers: {
                    'user-agent': UA,
                    accept:
                        'application/json, text/plain, */*',

                    referer:
                        `${BASE}/search?q=${encodeURIComponent(text)}`
                },

                timeout: 30000,

                validateStatus: () => true
            }
        );

        const data = response.data;

        const posts =
            data?.postInfos ||
            data?.data?.postInfos ||
            data?.posts ||
            data?.data ||
            [];

        const result = posts
            .map(item => {

                const media = fullUrl(
                    item.media ||
                    item.mediaUrl ||
                    item.media_url ||
                    item.image ||
                    item.video ||
                    null
                );

                const postID =
                    item.postID ||
                    item.postId ||
                    item.post_id ||
                    item.id ||
                    null;

                return {
                    post_id: postID,

                    title: clean(
                        item.title ||
                        item.caption ||
                        item.text ||
                        ''
                    ),

                    type: getMediaType(media),

                    media,

                    thumbnail:
                        fullUrl(
                            item.thumbnail ||
                            item.thumbnailUrl ||
                            item.cover
                        ) || media,

                    author: {
                        username:
                            item.userUsername ||
                            item.username ||
                            item.authorUsername ||
                            item.user?.username ||
                            null,

                        name:
                            item.userName ||
                            item.name ||
                            item.user?.name ||
                            null,

                        avatar:
                            fullUrl(
                                item.userAvatar ||
                                item.avatar ||
                                item.user?.avatar
                            ) || null
                    },

                    stats: {
                        upvotes:
                            item.totalUpvotes ??
                            item.upvotes ??
                            item.likeCount ??
                            item.likes ??
                            null,

                        comments:
                            item.totalComments ??
                            item.comments ??
                            item.commentCount ??
                            null,

                        shares:
                            item.totalShares ??
                            item.shares ??
                            item.shareCount ??
                            null
                    },

                    hashtags:
                        item.hashtags || [],

                    url:
                        postID
                            ? `${BASE}/post/${postID}`
                            : null
                };
            })
            .filter(v => v.post_id || v.media);

        return res.status(200).json({
            status: true,
            creator: 'Danzz',
            query: text,
            total: result.length,
            result
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