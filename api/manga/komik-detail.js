const axios = require('axios');
const cheerio = require('cheerio');

const headers = { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' };

async function handler(req, res) {
    const { url } = req.query;
    if (!url) return res.status(400).json({ status: false, message: '?url= wajib diisi' });

    try {
        const { data } = await axios.get(url, { headers, timeout: 15000 });
        const $ = cheerio.load(data);

        const title = $('.infox h1, .entry-title').text().trim();
        const thumbnail = $('.thumb img').attr('src');
        const desc = $('.entry-content p, .sinopsis').first().text().trim();
        const genre = [];
        $('.genre-info a, .mgen a, .genres-content a').each((_, el) => genre.push($(el).text().trim()));
        const status = $('.tsinfo .imptdt:contains("Status"), .infox .spe span:contains("Status")').text().replace('Status', '').trim();

        const chapters = [];
        $('ul').each((_, ul) => {
            if ($(ul).find('.lchx').length > 0) {
                $(ul).find('li').each((_, el) => {
                    const href = $(el).find('a').attr('href');
                    const chTitle = $(el).find('.lchx a').text().trim();
                    const date = $(el).find('.dt').text().trim();
                    if (href) chapters.push({ title: chTitle, href, date });
                });
            }
        });

        chapters.reverse();

        return res.status(200).json({
            status: true,
            creator: 'Danzz',
            result: { title, thumbnail, desc, genre, status, totalChapters: chapters.length, chapters }
        });
    } catch (err) {
        return res.status(500).json({ status: false, message: err.message });
    }
}

module.exports = { handler };
