const axios = require('axios');

const meta = {
    param: 'surah',
    desc: 'Data Al-Quran per surah lengkap dengan ayat, terjemahan Indonesia, dan audio murottal (?surah=nomor)',
    placeholder: '1',
    params: [
        { name: 'surah', placeholder: '1' }
    ]
};

const API     = 'https://api.alquran.cloud/v1';
const CDN     = 'https://cdn.islamic.network/quran/audio-surah/128/ar.alafasy';
const CDN_AYH = 'https://cdn.islamic.network/quran/audio/128/ar.alafasy';

async function handler(req, res) {
    const { surah } = req.query;

    if (!surah) {
        return res.status(400).json({
            status: false,
            message: 'Query ?surah= wajib diisi (nomor 1-114)',
            example: '/api/search/alquran?surah=1'
        });
    }

    const nomor = parseInt(surah);
    if (isNaN(nomor) || nomor < 1 || nomor > 114) {
        return res.status(400).json({
            status: false,
            message: 'Nomor surah harus antara 1 sampai 114'
        });
    }

    try {
        // Fetch arab + terjemahan Indonesia sekaligus
        const [arabRes, terjRes] = await Promise.all([
            axios.get(`${API}/surah/${nomor}`, { timeout: 15000 }),
            axios.get(`${API}/surah/${nomor}/id.indonesian`, { timeout: 15000 })
        ]);

        const surahData = arabRes.data.data;
        const terjData  = terjRes.data.data;

        // Gabungkan ayat arab + terjemahan
        const ayat = surahData.ayahs.map((a, i) => ({
            nomor:      a.numberInSurah,
            arab:       a.text,
            terjemahan: terjData.ayahs[i]?.text || null,
            audio_ayat: `${CDN_AYH}/${a.number}.mp3`
        }));

        return res.status(200).json({
            status: true,
            creator: 'Danzz',
            result: {
                nomor:        surahData.number,
                nama:         surahData.name,
                nama_latin:   surahData.englishName,
                arti:         surahData.englishNameTranslation,
                jumlah_ayat:  surahData.numberOfAyahs,
                tempat_turun: surahData.revelationType === 'Meccan' ? 'Mekah' : 'Madinah',
                audio_surah:  `${CDN}/${nomor}.mp3`,
                ayat
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