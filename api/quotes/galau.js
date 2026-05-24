const meta = {
  param: '',
  desc: 'Quotes galau beserta artinya',
  placeholder: ''
}

const quotes = [
  { quote: 'Lelah itu bukan di kaki, tapi di hati yang sudah terlalu banyak berharap.', arti: 'Harapan yang terlalu besar bisa melelahkan.' },
  { quote: 'Yang paling menyakitkan bukan pergi, tapi pergi tanpa alasan yang jelas.', arti: 'Ketidakjelasan lebih menyakitkan dari perpisahan.' },
  { quote: 'Aku baik-baik saja, hanya saja tidak sebaik yang dulu.', arti: 'Baik-baik saja versi yang sudah terluka.' },
  { quote: 'Kadang diam bukan karena tidak mau bicara, tapi karena sudah tidak tahu harus bilang apa.', arti: 'Diam adalah ekspresi yang terlalu dalam.' },
  { quote: 'Aku rindu seseorang yang bahkan tidak merindukanku.', arti: 'Rindu yang tidak terbalas adalah yang paling berat.' },
  { quote: 'Susah tidur bukan karena insomnia, tapi karena pikiran tidak mau istirahat.', arti: 'Beban pikiran lebih berat dari beban fisik.' },
  { quote: 'Yang menyedihkan bukan salah siapa, tapi kenyataan bahwa kita sudah tidak sama lagi.', arti: 'Perubahan hubungan adalah kehilangan paling nyata.' },
  { quote: 'Aku sudah belajar tersenyum meski di dalam masih hujan.', arti: 'Tersenyum bukan berarti baik-baik saja.' },
  { quote: 'Kehilangan orang yang masih hidup adalah rasa sakit yang paling aneh.', arti: 'Kehilangan bukan hanya soal kematian.' },
  { quote: 'Ada luka yang tidak berdarah tapi perih terus setiap hari.', arti: 'Luka hati tidak terlihat tapi sangat terasa.' },
  { quote: 'Aku tidak marah, aku hanya kecewa. Dan kecewa itu lebih berat dari marah.', arti: 'Kecewa lahir dari harapan yang terlalu besar.' },
  { quote: 'Malam selalu jujur, siang bisa pura-pura kuat.', arti: 'Malam adalah waktu paling jujur untuk perasaan.' },
  { quote: 'Beberapa hal tidak perlu dijelaskan, cukup dirasakan sambil menangis diam-diam.', arti: 'Tidak semua rasa bisa diungkapkan dengan kata.' },
  { quote: 'Aku ingin berhenti merasa, tapi hati ini tidak punya tombol off.', arti: 'Perasaan tidak bisa dikontrol begitu saja.' },
  { quote: 'Dulu kita sering bicara, sekarang cukup satu centang saja sudah biasa.', arti: 'Jarak emosional lebih menyakitkan dari jarak fisik.' },
  { quote: 'Bukan karena lemah, tapi kadang menangis adalah satu-satunya cara bernafas.', arti: 'Menangis bukan tanda lemah, tapi tanda manusiawi.' },
  { quote: 'Yang paling berat bukan melupakanmu, tapi berpura-pura sudah melupakanmu.', arti: 'Pura-pura baik-baik saja itu melelahkan.' },
  { quote: 'Aku ingin cerita, tapi tidak tahu harus mulai dari mana.', arti: 'Terkadang rasa terlalu kompleks untuk diungkapkan.' },
  { quote: 'Semua orang punya beban masing-masing, hanya saja tidak semua ditampilkan.', arti: 'Di balik senyum orang ada cerita yang tidak kamu tahu.' },
  { quote: 'Sakit hati itu nyata, meski tidak ada yang bisa melihatnya.', arti: 'Rasa sakit hati adalah luka yang paling sunyi.' },
  { quote: 'Aku tidak butuh solusi, kadang aku hanya butuh seseorang yang mau mendengar.', arti: 'Didengarkan kadang lebih penting dari jawaban.' },
  { quote: 'Pergi bukan berarti tidak sayang, kadang pergi justru karena terlalu sayang.', arti: 'Ada cinta yang mengharuskan melepaskan.' },
  { quote: 'Aku lelah berharap pada hal yang tidak pernah pasti.', arti: 'Ketidakpastian adalah beban terberat.' },
  { quote: 'Hal yang paling menyakitkan adalah ketika kamu tahu harus melepas tapi hati belum siap.', arti: 'Melepaskan butuh waktu, bukan keputusan sedetik.' },
  { quote: 'Terkadang yang paling kamu butuhkan hanyalah istirahat dari semua rasa.', arti: 'Jiwa juga butuh istirahat.' },
  { quote: 'Aku tidak apa-apa, hanya sedang belajar baik-baik saja.', arti: 'Proses membaik itu nyata dan butuh waktu.' },
  { quote: 'Ada momen dimana kamu ingin menghilang sebentar dari semua orang.', arti: 'Butuh ruang sendiri bukan berarti egois.' },
  { quote: 'Yang berat bukan masalahnya, tapi menghadapinya sendirian.', arti: 'Kesepian di tengah masalah adalah beban ganda.' },
  { quote: 'Aku sudah coba ikhlas, tapi ternyata ikhlas itu bukan sekali jadi.', arti: 'Ikhlas adalah proses panjang, bukan keputusan instan.' },
  { quote: 'Tidak semua luka perlu diceritakan, cukup disembuhkan pelan-pelan.', arti: 'Menyembuhkan diri sendiri adalah keberanian.' },
  { quote: 'Senyum paling melelahkan adalah senyum yang dipaksakan di depan orang banyak.', arti: 'Pura-pura bahagia menguras lebih banyak energi.' },
  { quote: 'Kadang kamu tidak butuh kata-kata, cukup seseorang yang duduk di sampingmu diam-diam.', arti: 'Kehadiran lebih bermakna dari seribu kata.' },
  { quote: 'Rindu itu aneh, bisa datang di waktu yang paling tidak tepat.', arti: 'Rindu tidak mengenal waktu dan tempat.' },
  { quote: 'Aku tidak tahu ini disebut apa, yang aku tahu dada ini terasa penuh tapi kosong.', arti: 'Ada rasa yang sulit dijelaskan tapi sangat terasa.' },
  { quote: 'Yang menyakitkan bukan ditinggal, tapi pernah merasa begitu dekat lalu tiba-tiba menjadi asing.', arti: 'Menjadi asing dari yang dulunya dekat adalah luka tersendiri.' },
  { quote: 'Aku ingin marah tapi tidak tahu kepada siapa, ingin menangis tapi tidak tahu mengapa.', arti: 'Galau sejati adalah perasaan yang tidak jelas asalnya.' },
  { quote: 'Terkadang hidup terasa seperti drama yang alurnya tidak kamu sukai tapi tidak bisa kamu skip.', arti: 'Hidup tidak selalu bisa dikendalikan.' },
  { quote: 'Aku sudah terlalu sering jadi orang yang pertama kali melepas, kali ini aku ingin dipertahankan.', arti: 'Semua orang ingin merasa berharga untuk dipertahankan.' },
  { quote: 'Yang paling menyedihkan adalah ketika kamu merasa sendirian di tengah keramaian.', arti: 'Kesepian bukan soal sendiri secara fisik.' },
  { quote: 'Sesekali aku ingin kembali ke masa lalu bukan untuk mengubah apapun, tapi untuk merasakan lagi.', arti: 'Kerinduan pada masa lalu adalah hal yang manusiawi.' },
  { quote: 'Bukan salahmu dan bukan salahku, kadang memang waktunya saja yang tidak tepat.', arti: 'Tidak semua akhir perlu ada yang disalahkan.' },
  { quote: 'Aku lelah jadi orang yang selalu ada, tapi tidak pernah ada yang benar-benar ada untukku.', arti: 'Semua orang butuh seseorang yang bisa diandalkan.' },
  { quote: 'Angin malam ini mengingatkanku pada banyak hal yang sudah aku coba lupakan.', arti: 'Kenangan datang tanpa permisi.' },
  { quote: 'Aku tidak minta banyak, hanya ingin tahu bahwa aku berarti bagi seseorang.', arti: 'Setiap orang butuh merasa dihargai.' },
  { quote: 'Diam-diam aku lelah, diam-diam aku ingin ada yang bertanya kabarku dengan sungguh-sungguh.', arti: 'Kepedulian tulus adalah hal yang langka dan berharga.' },
  { quote: 'Ada bagian dari diriku yang masih berharap, meski bagian lainnya sudah lelah berharap.', arti: 'Pertentangan batin adalah bagian dari proses sembuh.' },
  { quote: 'Aku tidak iri pada kebahagiaanmu, aku hanya bertanya kapan giliranku.', arti: 'Ingin bahagia bukan berarti iri.' },
  { quote: 'Yang susah bukan move on, tapi berhenti berharap pada hal yang sama.', arti: 'Lepas dari harapan lama lebih sulit dari move on.' },
  { quote: 'Mungkin aku tidak baik-baik saja, tapi aku sedang belajar untuk menjadi baik-baik saja.', arti: 'Proses penyembuhan bukan garis lurus.' },
  { quote: 'Terkadang aku ingin mengirim pesan, tapi aku hapus lagi sebelum dikirim.', arti: 'Ada rindu yang lebih baik disimpan sendiri.' },
  { quote: 'Hujan di luar tidak sebanding dengan hujan yang ada di dalam dadaku malam ini.', arti: 'Kesedihan batin bisa terasa lebih deras dari hujan.' },
  { quote: 'Aku tidak tahu kapan ini akan berakhir, yang aku tahu aku tidak ingin terus begini.', arti: 'Keinginan untuk sembuh adalah awal dari pemulihan.' },
  { quote: 'Beberapa orang hadir hanya untuk mengajarkan bahwa tidak semua yang indah itu abadi.', arti: 'Kehilangan mengajarkan arti kehadiran.' },
]

async function handler(req, res) {
  try {
    const random = quotes[Math.floor(Math.random() * quotes.length)]
    return res.json({
      status: true,
      creator: 'Danzz',
      total: quotes.length,
      quote: random.quote,
      arti: random.arti
    })
  } catch (err) {
    return res.status(500).json({ status: false, message: 'Terjadi kesalahan', error: err.message })
  }
}

module.exports = { meta, handler }