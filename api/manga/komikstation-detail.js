const axios = require('axios');
const cheerio = require('cheerio');

const headers = {
    'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
};

const meta = {
    param: 'url',

    desc:
        'Detail manga KomikStation',

    placeholder:
        'https://komikstation.org/manga/...',

    params: [
        {
            name: 'url',

            placeholder:
                'https://komikstation.org/manga/...'
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

async function detail(url) {

    try {

        const $ =
            await request(url);

        const genres = [];

        $('.mgen a').each(
            (i, el) => {

                genres.push(
                    $(el)
                        .text()
                        .trim()
                );
            }
        );

        const chapters = [];

        $('#chapterlist ul li')
            .each((i, el) => {

                chapters.push({
                    number:
                        $(el)
                            .attr('data-num'),

                    title:
                        $(el)
                            .find(
                                '.chapternum'
                            )
                            .text()
                            .trim(),

                    date:
                        $(el)
                            .find(
                                '.chapterdate'
                            )
                            .text()
                            .trim(),

                    readUrl:
                        $(el)
                            .find('a')
                            .first()
                            .attr('href'),

                    downloadUrl:
                        $(el)
                            .find('.dload')
                            .attr('href') || null
                });
            });

        return {
            status: true,

            detail: {
                title:
                    $('.entry-title')
                        .text()
                        .replace(
                            /[^\w\s]/gi,
                            ''
                        )
                        .trim(),

                altTitles:
                    $('.wd-full span')
                        .first()
                        .text()
                        .trim(),

                thumbnail:
                    $('.thumb img')
                        .attr('src'),

                status:
                    $('.imptdt i')
                        .first()
                        .text()
                        .trim(),

                type:
                    $('.imptdt a')
                        .first()
                        .text()
                        .trim(),

                rating:
                    $('.num')
                        .text()
                        .trim(),

                followers:
                    $('.bmc')
                        .text()
                        .replace(/\D/g, '')
                        .trim(),

                synopsis:
                    $('.entry-content p')
                        .text()
                        .trim(),

                author:
                    $('.fmed span')
                        .eq(0)
                        .text()
                        .trim(),

                artist:
                    $('.fmed span')
                        .eq(1)
                        .text()
                        .trim(),

                genres,

                lastRelease:
                    $('time')
                        .attr('datetime'),

                totalChapters:
                    chapters.length,

                firstChapter:
                    chapters[
                        chapters.length - 1
                    ] || null,

                latestChapter:
                    chapters[0] || null
            },

            chapters
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
                '/api/anime/komikstation-detail?url=https://komikstation.org/manga/...'
        });
    }

    try {

        const result =
            await detail(
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