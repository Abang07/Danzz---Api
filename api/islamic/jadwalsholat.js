const axios = require('axios');
const cheerio = require('cheerio');

const meta = {
    param: 'kota',
    desc: 'Jadwal sholat hari ini berdasarkan kota (?kota=nama_kota)',
    placeholder: 'Bandung',
    params: [
        { name: 'kota', placeholder: 'Bandung' }
    ]
};

const BASE_URL = 'https://www.jadwalsholat.org/adzan/monthly.php';

// Cache kota list supaya ga fetch tiap request
let kotaCache = null;

async function getKotaList() {
    if (kotaCache) return kotaCache;

    const res = await axios.get(BASE_URL, {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36',
            'Accept-Language': 'id-ID,id;q=0.9',
        },
        timeout: 10000
    });

    const $ = cheerio.load(res.data);
    const list = {};

    // Ambil semua option dari select kota
    $('select option').each((i, el) => {
        const id   = $(el).attr('value');
        const nama = $(el).text().trim();
        if (id && nama && !isNaN(id)) {
            list[nama.toLowerCase()] = { id: parseInt(id), nama };
        }
    });

    kotaCache = list;
    return list;
}

function cariKota(kotaList, keyword) {
    const key = keyword.toLowerCase().trim();

    // Exact match dulu
    if (kotaList[key]) return kotaList[key];

    // Partial match
    for (const [nama, data] of Object.entries(kotaList)) {
        if (nama.includes(key) || key.includes(nama)) {
            return data;
        }
    }

    return null;
}

async function scrapeJadwal(kotaId) {
    const res = await axios.get(BASE_URL, {
        params: { id: kotaId },
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36',
            'Accept-Language': 'id-ID,id;q=0.9',
        },
        timeout: 10000
    });

    const $ = cheerio.load(res.data);

    // Ambil nama kota dari heading
    const namaKota = $('h1, h2').first().text().replace('Jadwal Sholat', '').trim() || '';

    // Tanggal hari ini dalam zona WIB
    const now = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' }));
    const tanggalHariIni = now.getDate();

    let jadwal = null;
    let hijriyah = null;

    // Format kolom tabel: Tanggal | Hijriyah | Imsyak | Shubuh | Terbit | Dhuha | Dzuhur | Ashr | Maghrib | Isya
    $('table tr').each((i, row) => {
        const cols = [];
        $(row).find('td').each((j, col) => {
            cols.push($(col).text().trim());
        });

        if (cols.length >= 9) {
            // Kolom pertama: "0114 Dzulqa'dah" — 2 digit pertama = tanggal masehi
            const tgl = parseInt(cols[0].substring(0, 2));
            if (tgl === tanggalHariIni) {
                hijriyah = cols[1] || null;
                jadwal = {
                    imsak:   cols[2] || null,
                    subuh:   cols[3] || null,
                    terbit:  cols[4] || null,
                    dhuha:   cols[5] || null,
                    dzuhur:  cols[6] || null,
                    ashr:    cols[7] || null,
                    maghrib: cols[8] || null,
                    isya:    cols[9] || null,
                };
                return false; // break forEach
            }
        }
    });

    return { namaKota, jadwal, hijriyah };
}

async function handler(req, res) {
    const { kota } = req.query;

    if (!kota) {
        return res.status(400).json({
            status: false,
            message: 'Query ?kota= wajib diisi',
            example: '/api/search/sholat?kota=Bandung'
        });
    }

    try {
        const kotaList = await getKotaList();
        const kotaInfo = cariKota(kotaList, kota);

        if (!kotaInfo) {
            return res.status(404).json({
                status: false,
                message: `Kota "${kota}" tidak ditemukan. Coba nama kota lain.`,
                example: '/api/search/sholat?kota=Bandung'
            });
        }

        const { namaKota, jadwal, hijriyah } = await scrapeJadwal(kotaInfo.id);

        if (!jadwal) {
            return res.status(500).json({
                status: false,
                message: 'Gagal mengambil jadwal sholat, coba lagi'
            });
        }

        const now = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' }));
        const tanggalLengkap = now.toLocaleDateString('id-ID', {
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
        });

        return res.status(200).json({
            status: true,
            creator: 'Danzz',
            result: {
                kota: namaKota || kotaInfo.nama,
                tanggal: tanggalLengkap,
                hijriyah,
                jadwal: {
                    imsak:   jadwal.imsak,
                    subuh:   jadwal.subuh,
                    terbit:  jadwal.terbit,
                    dhuha:   jadwal.dhuha,
                    dzuhur:  jadwal.dzuhur,
                    ashr:    jadwal.ashr,
                    maghrib: jadwal.maghrib,
                    isya:    jadwal.isya,
                }
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