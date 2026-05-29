const axios = require('axios');

const meta = {
    param: 'keyword',
    desc: 'Cari dalil Al-Quran & Hadits berdasarkan keyword (?keyword=kata_kunci)',
    placeholder: 'sabar',
    params: [
        { name: 'keyword', placeholder: 'sabar' }
    ]
};

const ALQURAN_API = 'https://api.alquran.cloud/v1';
const HADITS_API  = 'https://api.hadith.gading.dev';
const CDN_AYH    = 'https://cdn.islamic.network/quran/audio/128/ar.alafasy';

// Perawi hadits yang akan dicari
const PERAWI = ['bukhari', 'muslim', 'abu-dawud', 'tirmidzi', 'nasai', 'ibnu-majah'];

async function cariAyat(keyword) {
    try {
        // Search di terjemahan Indonesia
        const res = await axios.get(`${ALQURAN_API}/search/${encodeURIComponent(keyword)}/all/id`, {
            timeout: 10000
        });

        const matches = res.data?.data?.matches || [];

        return matches.slice(0, 5).map(a => ({
            surah:      a.surah?.englishName || null,
            surah_arab: a.surah?.name || null,
            ayat:       a.numberInSurah,
            arab:       a.text,
            terjemahan: null, // search id edition sudah return terjemahan di text
            referensi:  `QS. ${a.surah?.englishName} (${a.surah?.number}): ${a.numberInSurah}`,
            audio:      `${CDN_AYH}/${a.number}.mp3`
        }));
    } catch {
        return [];
    }
}

async function cariHadits(keyword) {
    try {
        // Cari dari beberapa perawi, ambil yang ada keyword-nya
        const results = [];

        for (const perawi of PERAWI) {
            if (results.length >= 3) break;
            try {
                const res = await axios.get(`${HADITS_API}/books/${perawi}`, {
                    params: { range: '1-50' },
                    timeout: 8000
                });

                const hadiths = res.data?.data?.hadiths || [];
                const cocok = hadiths.filter(h =>
                    h.arab?.toLowerCase().includes(keyword.toLowerCase()) ||
                    h.id?.toLowerCase().includes(keyword.toLowerCase())
                );

                cocok.slice(0, 2).forEach(h => {
                    results.push({
                        perawi:    perawi.replace('-', ' '),
                        nomor:     h.number,
                        arab:      h.arab,
                        terjemahan: h.id,
                        referensi: `HR. ${perawi.replace('-', ' ')} No. ${h.number}`
                    });
                });
            } catch {
                continue;
            }
        }

        return results;
    } catch {
        return [];
    }
}

async function handler(req, res) {
    const { keyword } = req.query;

    if (!keyword) {
        return res.status(400).json({
            status: false,
            message: 'Query ?keyword= wajib diisi',
            example: '/api/search/dalil?keyword=sabar'
        });
    }

    try {
        // Jalankan pencarian Al-Quran dan Hadits bersamaan
        const [ayat, hadits] = await Promise.all([
            cariAyat(keyword),
            cariHadits(keyword)
        ]);

        if (ayat.length === 0 && hadits.length === 0) {
            return res.status(404).json({
                status: false,
                message: `Tidak ditemukan dalil untuk keyword "${keyword}"`
            });
        }

        return res.status(200).json({
            status: true,
            creator: 'Danzz',
            keyword,
            result: {
                alquran: ayat,
                hadits
            }
        });

    } catch (err) {
        return res.status(500).json({
            status: false,
            message: err.message
        });
    }
}

module.exports = { meta, handler };