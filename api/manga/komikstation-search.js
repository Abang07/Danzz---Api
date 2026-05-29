const axios = require('axios');
const cheerio = require('cheerio');

const BASE_URL = 'https://komikstation.org';

const headers = {
    'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
};

const meta = {
    param: 'text',

    desc: 'Search manga KomikStation',

    placeholder: 'solo leveling',

    params: [
        {
            name: 'text',
            placeholder: 'solo leveling'
        }
    ]
};

async function request(url) {

    const { data } = await axios.get(
        url,
        { headers }
    );

    return cheerio.load(data);
}

async function search(query) {

    try {

        const url =
            `${BASE_URL}/?s=${encodeURIComponent(query)}`;

        const $ = await request(url);

        const results = [];

        $('.postbody .listupd .bs').each(
            (i, el) => {

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
                            ?.split(' ')[1] || null,

                    status:
                        $(el)
                            .find('.status')
                            .text()
                            .trim() || 'Ongoing'
                });
            }
        );

        return {
            status: true,
            query,
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

    const { text } = req.query;

    if (!text) {
        return res.status(400).json({
            status: false,

            message:
                'Query ?text= wajib diisi'
        });
    }

    try {

        const result =
            await search(
                text.trim()
            );

        return res.status(200).json(result);

    } catch (err) {

        return res.status(500).json({
            status: false,
            message: err.message
        });
    }
}

module.exports = {
    meta,
    handler
};