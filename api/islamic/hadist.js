const axios = require('axios');

const meta = {
    param: 'keyword',
    desc: 'Cari hadits berdasarkan keyword (Arab/Indonesia) dari 6 perawi (?keyword=kata_kunci)',
    placeholder: 'kurban',
    params: [
        { name: 'keyword', placeholder: 'kurban' }
    ]
};

const CDN = 'https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions';

const PERAWI = [
    { indo: 'ind-bukhari',   arab: 'ara-bukhari',   nama: 'Bukhari' },
    { indo: 'ind-muslim',    arab: 'ara-muslim',    nama: 'Muslim' },
    { indo: 'ind-abudawud',  arab: 'ara-abudawud',  nama: 'Abu Dawud' },
    { indo: 'ind-tirmidzi',  arab: 'ara-tirmidzi',  nama: 'Tirmidzi' },
    { indo: 'ind-nasai',     arab: 'ara-nasai',     nama: 'Nasai' },
    { indo: 'ind-ibnumajah', arab: 'ara-ibnumajah', nama: 'Ibnu Majah' },
];

const cache = {};

async function getKitab(edition) {
    if (cache[edition]) return cache[edition];
    const res = await axios.get(`${CDN}/${edition}.min.json`, { timeout: 20000 });
    cache[edition] = res.data?.hadiths || [];
    return cache[edition];
}

function isArab(text) {
    return /[\u0600-\u06FF]/.test(text);
}

async function cariDariPerawi(perawi, keyword) {
    try {
        const arabMode = isArab(keyword);

        // Fetch terjemahan Indo selalu (untuk response)
        // Fetch Arab juga kalau keyword Arab
        const [indoHadiths, arabHadiths] = await Promise.all([
            getKitab(perawi.indo),
            arabMode ? getKitab(perawi.arab) : Promise.resolve([])
        ]);

        let cocokNomor = new Set();

        if (arabMode) {
            // Cari di teks Arab dulu
            arabHadiths
                .filter(h => h.text?.includes(keyword))
                .forEach(h => cocokNomor.add(h.hadithnumber));
        } else {
            // Cari di teks Indo
            indoHadiths
                .filter(h => h.text?.toLowerCase().includes(keyword.toLowerCase()))
                .forEach(h => cocokNomor.add(h.hadithnumber));
        }

        // Ambil max 3, gabungkan arab + indo
        const nomorList = [...cocokNomor].slice(0, 3);

        return nomorList.map(nomor => {
            const indo = indoHadiths.find(h => h.hadithnumber === nomor);
            const arab = arabHadiths.find(h => h.hadithnumber === nomor);
            return {
                perawi:     perawi.nama,
                nomor,
                arab:       arab?.text || null,
                terjemahan: indo?.text || null,
                referensi:  `HR. ${perawi.nama} No. ${nomor}`
            };
        });

    } catch {
        return [];
    }
}

async function handler(req, res) {
    const { keyword, perawi } = req.query;

    if (!keyword) {
        return res.status(400).json({
            status: false,
            message: 'Query ?keyword= wajib diisi',
            example: '/api/search/hadits?keyword=kurban',
            perawi_tersedia: PERAWI.map(p => p.nama)
        });
    }

    try {
        const targetPerawi = perawi
            ? PERAWI.filter(p => p.nama.toLowerCase().includes(perawi.toLowerCase()))
            : PERAWI;

        if (targetPerawi.length === 0) {
            return res.status(400).json({
                status: false,
                message: `Perawi "${perawi}" tidak ditemukan`,
                perawi_tersedia: PERAWI.map(p => p.nama)
            });
        }

        const allResults = await Promise.all(
            targetPerawi.map(p => cariDariPerawi(p, keyword))
        );

        const hasil = allResults.flat();

        if (hasil.length === 0) {
            return res.status(404).json({
                status: false,
                message: `Tidak ditemukan hadits untuk keyword "${keyword}"`
            });
        }

        return res.status(200).json({
            status: true,
            creator: 'Danzz',
            keyword,
            total: hasil.length,
            result: hasil
        });

    } catch (err) {
        return res.status(500).json({
            status: false,
            message: err.message
        });
    }
}

module.exports = { meta, handler };