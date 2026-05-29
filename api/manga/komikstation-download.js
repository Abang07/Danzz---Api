const axios = require('axios');
const cheerio = require('cheerio');

const headers = {
    'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
};

const meta = {
    param: 'url',

    desc:
        'Download chapter KomikStation',

    placeholder:
        'https://komikstation.org/...',

    params: [
        {
            name: 'url',

            placeholder:
                'https://komikstation.org/...'
        }
    ]
};

async function request(url) {

    const { data } =
        await axios.get(
            url,
            { headers }
        );

    return cheerio.load(data);
}

async function download(chapterUrl) {

    try {

        const $ =
            await request(
                chapterUrl
            );

        const images = [];

        $(
            '#readerarea img, .reader-area img, .rdimage img'
        ).each((i, el) => {

            const src =
                $(el).attr(
                    'data-src'
                ) ||

                $(el).attr(
                    'src'
                );

            if (
                src &&
                src.startsWith(
                    'http'
                )
            ) {
                images.push(src);
            }
        });

        if (images.length === 0) {

            $('img').each((i, el) => {

                const src =
                    $(el).attr('src') ||
                    $(el).attr('data-src');

                if (
                    src &&
                    (
                        src.includes(
                            'wp-content/uploads'
                        ) ||

                        src.includes(
                            'cdn'
                        )
                    ) &&
                    !src.includes(
                        'flag'
                    )
                ) {
                    images.push(src);
                }
            });
        }

        return {
            status: true,

            chapter: {
                title:
                    $(
                        '.entry-title, .headpost h1, h1.entry-title'
                    )
                        .first()
                        .text()
                        .trim(),

                url:
                    chapterUrl,

                totalImages:
                    images.length,

                prevChapter:
                    $(
                        ".nextprev a[rel='prev']"
                    ).attr('href') || null,

                nextChapter:
                    $(
                        ".nextprev a[rel='next']"
                    ).attr('href') || null
            },

            images
        };

    } catch (err) {

        return {
            status: false,
            message: err.message
        };
    }
}

async function handler(req, res) {

    const { url } =
        req.query;

    if (!url) {

        return res.status(400).json({
            status: false,

            message:
                'Query ?url= wajib diisi',

            example:
                '/api/manga/komikstation-download?url=https://komikstation.org/...'
        });
    }

    try {

        const result =
            await download(
                url.trim()
            );

        return res.status(200).json(result);

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