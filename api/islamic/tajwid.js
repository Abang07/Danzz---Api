const TAJWID = [
    {
        nama: "Izhar Halqi",
        kategori: "Hukum Nun Mati & Tanwin",
        pengertian: "Nun mati atau tanwin bertemu dengan salah satu huruf halqi (tenggorokan), dibaca jelas tanpa dengung.",
        huruf: ["ء", "ه", "ع", "غ", "ح", "خ"],
        contoh: "مَنْ آمَنَ",
        cara_baca: "Dibaca jelas, terang, tanpa dengung"
    },
    {
        nama: "Idgham Bighunnah",
        kategori: "Hukum Nun Mati & Tanwin",
        pengertian: "Nun mati atau tanwin bertemu dengan huruf ya, nun, mim, wau — dibaca masuk (lebur) dengan dengung.",
        huruf: ["ي", "ن", "م", "و"],
        contoh: "مِنْ نِعْمَةٍ",
        cara_baca: "Dibaca lebur dan berdengung (ghunnah) 2 harakat"
    },
    {
        nama: "Idgham Bilaghunnah",
        kategori: "Hukum Nun Mati & Tanwin",
        pengertian: "Nun mati atau tanwin bertemu dengan huruf lam atau ra — dibaca masuk (lebur) tanpa dengung.",
        huruf: ["ل", "ر"],
        contoh: "مِنْ رَبِّهِمْ",
        cara_baca: "Dibaca lebur tanpa dengung"
    },
    {
        nama: "Iqlab",
        kategori: "Hukum Nun Mati & Tanwin",
        pengertian: "Nun mati atau tanwin bertemu dengan huruf ba — nun diubah menjadi mim dan dibaca dengung.",
        huruf: ["ب"],
        contoh: "مِنْ بَعْدِ",
        cara_baca: "Nun berubah menjadi mim, dibaca dengung 2 harakat"
    },
    {
        nama: "Ikhfa Haqiqi",
        kategori: "Hukum Nun Mati & Tanwin",
        pengertian: "Nun mati atau tanwin bertemu dengan 15 huruf ikhfa — dibaca samar-samar antara izhar dan idgham disertai dengung.",
        huruf: ["ت","ث","ج","د","ذ","ز","س","ش","ص","ض","ط","ظ","ف","ق","ك"],
        contoh: "مَنْ كَفَرَ",
        cara_baca: "Dibaca samar disertai dengung 2-3 harakat"
    },
    {
        nama: "Izhar Syafawi",
        kategori: "Hukum Mim Mati",
        pengertian: "Mim mati bertemu dengan huruf selain ba dan mim — dibaca jelas.",
        huruf: ["selain ب dan م"],
        contoh: "لَهُمْ فِيهَا",
        cara_baca: "Dibaca jelas tanpa dengung"
    },
    {
        nama: "Ikhfa Syafawi",
        kategori: "Hukum Mim Mati",
        pengertian: "Mim mati bertemu dengan huruf ba — dibaca samar disertai dengung.",
        huruf: ["ب"],
        contoh: "تَرْمِيهِمْ بِحِجَارَةٍ",
        cara_baca: "Dibaca samar disertai dengung 2 harakat"
    },
    {
        nama: "Idgham Mimi",
        kategori: "Hukum Mim Mati",
        pengertian: "Mim mati bertemu dengan mim — dibaca lebur dengan dengung.",
        huruf: ["م"],
        contoh: "كَمْ مِنْ",
        cara_baca: "Dibaca lebur dengan dengung 2 harakat"
    },
    {
        nama: "Mad Thabi'i (Mad Asli)",
        kategori: "Hukum Mad",
        pengertian: "Mad dasar yang terjadi karena huruf mad (alif, wau, ya) tidak bertemu hamzah atau sukun. Panjang 2 harakat.",
        huruf: ["ا", "و", "ي"],
        contoh: "قَالَ",
        cara_baca: "Dibaca panjang 2 harakat (1 alif)"
    },
    {
        nama: "Mad Wajib Muttasil",
        kategori: "Hukum Mad",
        pengertian: "Huruf mad bertemu hamzah dalam satu kata. Wajib dibaca panjang 4-5 harakat.",
        huruf: ["ا", "و", "ي"],
        contoh: "جَاءَ",
        cara_baca: "Dibaca panjang 4-5 harakat (2-2.5 alif)"
    },
    {
        nama: "Mad Jaiz Munfasil",
        kategori: "Hukum Mad",
        pengertian: "Huruf mad bertemu hamzah di kata yang berbeda. Boleh dibaca 2, 4, atau 5 harakat.",
        huruf: ["ا", "و", "ي"],
        contoh: "يَا أَيُّهَا",
        cara_baca: "Boleh dibaca 2, 4, atau 5 harakat"
    },
    {
        nama: "Mad Aridh Lissukun",
        kategori: "Hukum Mad",
        pengertian: "Mad thabi'i bertemu huruf yang diwaqafkan (berhenti). Dibaca 2, 4, atau 6 harakat.",
        huruf: ["ا", "و", "ي"],
        contoh: "نَسْتَعِيْنُ (waqaf)",
        cara_baca: "Dibaca 2, 4, atau 6 harakat saat waqaf"
    },
    {
        nama: "Mad Lazim Mutsaqqal Kilmi",
        kategori: "Hukum Mad",
        pengertian: "Huruf mad bertemu tasydid dalam satu kata. Wajib dibaca 6 harakat.",
        huruf: ["ا", "و", "ي"],
        contoh: "الضَّالِّيْنَ",
        cara_baca: "Wajib dibaca 6 harakat (3 alif)"
    },
    {
        nama: "Qalqalah Sughra",
        kategori: "Hukum Qalqalah",
        pengertian: "Huruf qalqalah berharakat sukun di tengah kalimat — dibaca memantul ringan.",
        huruf: ["ق", "ط", "ب", "ج", "د"],
        contoh: "يَقْطَعُونَ",
        cara_baca: "Dibaca memantul ringan di tengah kata"
    },
    {
        nama: "Qalqalah Kubra",
        kategori: "Hukum Qalqalah",
        pengertian: "Huruf qalqalah berada di akhir kata saat waqaf — dibaca memantul kuat.",
        huruf: ["ق", "ط", "ب", "ج", "د"],
        contoh: "قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ",
        cara_baca: "Dibaca memantul kuat saat waqaf"
    },
    {
        nama: "Tafkhim",
        kategori: "Hukum Lam & Ra",
        pengertian: "Huruf ra dibaca tebal (tafkhim) apabila berharakat fathah, dhammah, atau sukun yang didahului fathah/dhammah.",
        huruf: ["ر"],
        contoh: "رَبَّنَا",
        cara_baca: "Ra dibaca tebal/berat"
    },
    {
        nama: "Tarqiq",
        kategori: "Hukum Lam & Ra",
        pengertian: "Huruf ra dibaca tipis (tarqiq) apabila berharakat kasrah atau sukun yang didahului kasrah.",
        huruf: ["ر"],
        contoh: "بِسْمِ اللهِ الرَّحِيمِ (ra kasrah)",
        cara_baca: "Ra dibaca tipis/ringan"
    },
    {
        nama: "Lam Jalalah Tafkhim",
        kategori: "Hukum Lam & Ra",
        pengertian: "Lam pada lafaz Allah (الله) dibaca tebal apabila didahului harakat fathah atau dhammah.",
        huruf: ["ل"],
        contoh: "قَالَ اللهُ",
        cara_baca: "Lam Allah dibaca tebal"
    },
    {
        nama: "Lam Jalalah Tarqiq",
        kategori: "Hukum Lam & Ra",
        pengertian: "Lam pada lafaz Allah (الله) dibaca tipis apabila didahului harakat kasrah.",
        huruf: ["ل"],
        contoh: "بِسْمِ اللهِ",
        cara_baca: "Lam Allah dibaca tipis"
    },
    {
        nama: "Ghunnah",
        kategori: "Hukum Ghunnah",
        pengertian: "Nun atau mim yang bertasydid wajib dibaca dengung (ghunnah) selama 2 harakat.",
        huruf: ["ن", "م"],
        contoh: "إِنَّ، ثُمَّ",
        cara_baca: "Dibaca dengung 2 harakat"
    },
    {
        nama: "Waqaf Tam",
        kategori: "Hukum Waqaf",
        pengertian: "Berhenti pada akhir kalimat yang sempurna maknanya dan tidak ada kaitan dengan kalimat berikutnya.",
        huruf: [],
        contoh: "وَأُولَٰئِكَ هُمُ الْمُفْلِحُونَ ۞",
        cara_baca: "Boleh berhenti dan boleh melanjutkan, berhenti lebih utama"
    },
    {
        nama: "Waqaf Kafi",
        kategori: "Hukum Waqaf",
        pengertian: "Berhenti pada kalimat yang sempurna namun masih ada kaitan makna dengan kalimat berikutnya.",
        huruf: [],
        contoh: "الَّذِينَ يُؤْمِنُونَ بِالْغَيْبِ",
        cara_baca: "Boleh berhenti dan melanjutkan"
    }
];

const meta = {
    param: '',
    desc: 'Materi ilmu tajwid lengkap — random setiap request',
    placeholder: ''
};

async function handler(req, res) {
    try {
        const { kategori } = req.query;

        let data = TAJWID;

        // Filter by kategori kalau ada
        if (kategori) {
            data = TAJWID.filter(t =>
                t.kategori.toLowerCase().includes(kategori.toLowerCase())
            );
            if (data.length === 0) {
                return res.status(404).json({
                    status: false,
                    message: `Kategori "${kategori}" tidak ditemukan`,
                    kategori_tersedia: [...new Set(TAJWID.map(t => t.kategori))]
                });
            }
        }

        // Random satu
        const random = data[Math.floor(Math.random() * data.length)];

        return res.status(200).json({
            status: true,
            creator: 'Danzz',
            result: {
                nama:       random.nama,
                kategori:   random.kategori,
                pengertian: random.pengertian,
                huruf:      random.huruf,
                contoh:     random.contoh,
                cara_baca:  random.cara_baca
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