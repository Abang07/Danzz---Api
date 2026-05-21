const axios = require('axios');
const cheerio = require('cheerio');

const headers = { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' };

async function getDetails(url) {
    try {
        const { data } = await axios.get(url, { headers });
        const $ = cheerio.load(data);

        let ingredients = [];
        let steps = [];

        $('div[id^="ingredient_"], [itemprop="recipeIngredient"], .ingredient-list li').each((_, el) => {
            let text = $(el).text().trim().replace(/\s+/g, ' ');
            if (text && !ingredients.includes(text)) ingredients.push(text);
        });

        $('div[id^="step_"], [itemprop="recipeInstructions"], .step').each((_, el) => {
            let text = $(el).text().trim().replace(/\s+/g, ' ');
            if (text && text.length > 5 && !steps.includes(text)) steps.push(text);
        });

        return { ingredients, steps };
    } catch {
        return { ingredients: [], steps: [] };
    }
}

async function handler(req, res) {
    const { text } = req.query;

    if (!text) {
        return res.status(400).json({
            status: false,
            message: 'Query ?text= wajib diisi',
            example: '/api/tools/resep?text=nasi goreng'
        });
    }

    try {
        const url = `https://cookpad.com/id/cari/${encodeURIComponent(text)}`;
        const { data } = await axios.get(url, { headers });
        const $ = cheerio.load(data);

        let recipes = [];

        $('h2, a.block').each((_, el) => {
            if (recipes.length >= 3) return false;

            let title = $(el).text().trim().split('\n')[0];
            let href = $(el).attr('href') || $(el).find('a').attr('href') ||
                       $(el).closest('a').attr('href') || $(el).parent().attr('href');

            if (title && title.length > 3 && href && href.includes('/resep/')) {
                const fullLink = href.startsWith('/') ? `https://cookpad.com${href}` : href;
                if (!recipes.find(r => r.link === fullLink)) {
                    recipes.push({ title, link: fullLink });
                }
            }
        });

        if (recipes.length === 0) {
            return res.status(404).json({
                status: false,
                message: 'Resep tidak ditemukan'
            });
        }

        const results = await Promise.all(
            recipes.map(async (recipe) => {
                const details = await getDetails(recipe.link);
                return {
                    title: recipe.title,
                    link: recipe.link,
                    ingredients: details.ingredients,
                    steps: details.steps
                };
            })
        );

        return res.status(200).json({
            status: true,
            creator: 'Danzz',
            result: results
        });

    } catch (err) {
        return res.status(500).json({ status: false, message: err.message });
    }
}

module.exports = { handler };
