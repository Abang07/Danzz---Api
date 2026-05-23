const axios = require('axios');
const cheerio = require('cheerio');

const BASE_URL = 'https://www.webtoons.com';
const headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    'Accept-Language': 'id-ID,id;q=0.9'
};

async function getEpisodePage(url) {
    const { data } = await axios.get(url, { headers: { ...headers, Referer: BASE_URL }, timeout: 15000 });
    const $ = cheerio.load(data);
    const episodes = [];
    $('#_listUl li').each((_, el) => {
        const epTitle = $(el).find('.subj span').text().trim();
        const epHref = $(el).find('a').attr('href');
        const epNo = parseInt($(el).attr('data-episode-no'));
        const epThumb = $(el).find('img').attr('src');
        if (epTitle) episodes.push({ epNo, epTitle, epHref, epThumb });
    });
    return episodes;
}

async function handler(req, res) {
    const { url } = req.query;
    if (!url) return res.status(400).json({ status: false, message: '?url= wajib diisi' });

    try {
        const baseUrl = url.split('&page=')[0];
        const { data } = await axios.get(baseUrl, { headers: { ...headers, Referer: BASE_URL }, timeout: 15000 });
        const $ = cheerio.load(data);

        const title = $('h1.subj').text().trim();
        const author = $('.author_area').clone().children().remove().end().text().trim();
        const genre = $('.genre').text().trim();
        const desc = $('.summary').text().trim();
        const thumbnail = $('div.thmb img').attr('src');

        let allEpisodes = [];
        let page = 1;
        let seenEpNos = new Set();

        while (true) {
            const eps = await getEpisodePage(`${baseUrl}&page=${page}`);
            if (eps.length === 0) break;
            const newEps = eps.filter(e => !seenEpNos.has(e.epNo));
            if (newEps.length === 0) break;
            newEps.forEach(e => seenEpNos.add(e.epNo));
            allEpisodes = allEpisodes.concat(newEps);
            page++;
            await new Promise(r => setTimeout(r, 300));
        }

        allEpisodes.sort((a, b) => a.epNo - b.epNo);

        return res.status(200).json({
            status: true,
            creator: 'Danzz',
            result: { title, author, genre, desc, thumbnail, totalEpisodes: allEpisodes.length, episodes: allEpisodes }
        });
    } catch (err) {
        return res.status(500).json({ status: false, message: err.message });
    }
}

module.exports = { handler };
