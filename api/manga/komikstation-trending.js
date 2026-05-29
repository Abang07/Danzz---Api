const axios = require('axios');
const cheerio = require('cheerio');

const BASE_URL = 'https://komikstation.org';

const headers = {
    'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
};

const meta = {
    param: false,

    desc: 'Trending manga KomikStation',

    params: []
};

async function request(url) {

    const { data } = await axios.get(
        url,
        { headers }
    );

    return cheerio.load(data);
}

async function trending() {

    try {

        const $ =
            await request(
                BASE_URL
            );

        const results = [];

        $('.hothome .popconslide .bs')
            .each((i, el) => {

                results.push({
                    title:
                        $(el)
                            .find('.tt')
                            .text()
                            .trim() ||

                        $(el)
                            .find('a')
                            .attr('title'),

                    link:
                        $(el)
                            .find('a')
                            .attr('href'),

                    thumbnail:
                        $(el)
                            .find(
                                'img.ts-post-image'
                            )
                            .attr('data-src'),

                    chapter:
                        $(el)
                            .find('.epxs')
                            .text()
                            .trim(),

                    rating:
                        $(el)
                            .find('.numscore')
                            .text()
                            .trim(),

                    type:
                        $(el)
                            .find('.type')
                            .attr('class')
                            ?.split(' ')[1] || null
                });
            });

        return {
            status: true,
            total: results.length,
            results
        };

    } catch (err) {

        return {
            status: false,
            message: err.message
        };
    }
}

async function handler(req, res) {

    try {

        const result =
            await trending();

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