const meta = {
  param: '',
  desc: 'Quotes ala Fiersa Besari beserta artinya',
  placeholder: ''
}

const quotes = [
  { quote: 'Kamu boleh patah, asal jangan sampai hancur.', arti: 'Rapuh boleh, tapi jangan berhenti sama sekali.' },
  { quote: 'Kadang perjalanan memang harus dilalui sendirian, bukan karena tidak ada yang menemani, tapi karena tidak semua orang bisa memahami arah yang kamu tuju.', arti: 'Kesendirian dalam perjalanan hidup adalah hal yang wajar.' },
  { quote: 'Kita tidak harus selalu kuat. Kadang mengakui bahwa kita lelah pun sudah cukup berani.', arti: 'Mengakui kelemahan adalah bentuk keberanian.' },
  { quote: 'Cinta yang baik bukan yang membuat kamu kehilangan dirimu sendiri.', arti: 'Cinta sejati tidak menghapus identitasmu.' },
  { quote: 'Mungkin kamu bukan pilihan pertama seseorang, tapi kamu bisa menjadi pilihan terakhirnya.', arti: 'Prioritas bisa berubah seiring waktu dan kedewasaan.' },
  { quote: 'Tidak semua yang pergi pantas untuk ditangisi, ada yang pergi justru agar kamu bisa tumbuh.', arti: 'Kehilangan bisa menjadi awal dari pertumbuhan.' },
  { quote: 'Rumah bukan tentang tempat, tapi tentang rasa aman yang kamu rasakan bersama seseorang.', arti: 'Rumah sejati ada pada ketenangan yang diberikan orang yang tepat.' },
  { quote: 'Jangan pernah lelah menjadi dirimu sendiri, dunia butuh originalitasmu, bukan tiruanmu.', arti: 'Keaslian dirimu adalah kontribusi terbesar untuk dunia.' },
  { quote: 'Kamu berhak bahagia, meski caramu berbeda dari orang lain.', arti: 'Kebahagiaan tidak harus mengikuti standar orang lain.' },
  { quote: 'Ada saatnya kamu harus memilih antara bertahan karena cinta atau pergi karena menghargai diri sendiri.', arti: 'Menghargai diri sendiri kadang berarti melepaskan.' },
  { quote: 'Waktu tidak menyembuhkan semua luka, tapi memberimu cara baru untuk hidup bersamanya.', arti: 'Luka tidak selalu hilang, tapi kita bisa berdamai dengannya.' },
  { quote: 'Kamu tidak harus punya jawaban atas semua pertanyaan dalam hidupmu sekarang.', arti: 'Ketidaktahuan adalah bagian dari perjalanan.' },
  { quote: 'Bukan jarak yang memisahkan, tapi hati yang sudah berhenti berusaha.', arti: 'Jauhnya hati lebih berbahaya dari jauhnya jarak.' },
  { quote: 'Seseorang yang tepat tidak akan membuatmu mempertanyakan apakah kamu cukup baik.', arti: 'Orang yang benar membuat kamu merasa diterima apa adanya.' },
  { quote: 'Kamu tidak bisa memaksa seseorang untuk mencintaimu, sama seperti kamu tidak bisa memaksakan matahari untuk bersinar di malam hari.', arti: 'Cinta tidak bisa dipaksakan.' },
  { quote: 'Terkadang yang paling menyakitkan bukan perpisahan, tapi harapan yang masih tertinggal setelah semuanya berakhir.', arti: 'Harapan yang tersisa setelah perpisahan adalah beban terberat.' },
  { quote: 'Jadilah seseorang yang kamu butuhkan dulu sebelum menjadi seseorang yang orang lain butuhkan.', arti: 'Self-love adalah fondasi untuk mencintai orang lain.' },
  { quote: 'Hidup terlalu singkat untuk dihabiskan dengan menjadi versi yang orang lain inginkan.', arti: 'Jadilah dirimu sendiri selagi masih ada waktu.' },
  { quote: 'Kamu tidak harus menunggu sampai semuanya sempurna untuk mulai merasa bahagia.', arti: 'Kebahagiaan bisa dimulai dari ketidaksempurnaan.' },
  { quote: 'Ada orang yang hadir bukan untuk menetap, tapi untuk mengajarkan sesuatu yang tidak bisa diajarkan oleh waktu.', arti: 'Setiap orang yang datang membawa pelajaran tersendiri.' },
  { quote: 'Luka yang kamu sembunyikan hari ini bisa menjadi beban yang kamu pikul sendirian selamanya.', arti: 'Jangan pendam luka terlalu lama.' },
  { quote: 'Kamu bisa berjalan lambat, asal jangan berhenti dan asal arahnya benar.', arti: 'Kecepatan tidak sepenting arah dan konsistensi.' },
  { quote: 'Tidak semua akhir itu sedih, kadang akhir adalah awal dari sesuatu yang lebih baik.', arti: 'Setiap akhir menyimpan kemungkinan awal yang baru.' },
  { quote: 'Cinta yang memaksamu berubah bukan cinta, itu kendali.', arti: 'Cinta sejati menerima, bukan mengubah paksa.' },
  { quote: 'Kamu lebih kuat dari yang kamu bayangkan, tapi kamu tidak harus membuktikan itu sendirian.', arti: 'Kekuatan tidak berarti harus menanggung segalanya sendiri.' },
  { quote: 'Berhentilah meminta maaf atas hal-hal yang membuat kamu menjadi dirimu sendiri.', arti: 'Keaslian dirimu tidak perlu meminta maaf.' },
  { quote: 'Mungkin kamu belum menemukan jalanmu, tapi kamu sudah cukup berani untuk terus mencarinya.', arti: 'Keberanian mencari jalan sudah merupakan pencapaian.' },
  { quote: 'Hubungan yang sehat bukan yang tanpa masalah, tapi yang selalu menemukan cara untuk menyelesaikannya bersama.', arti: 'Cara menghadapi masalah menentukan kesehatan hubungan.' },
  { quote: 'Kamu tidak harus melupakan masa lalumu, cukup berhenti membiarkannya menentukan masa depanmu.', arti: 'Masa lalu bukan penjara, tapi pelajaran.' },
  { quote: 'Pergi dari sesuatu yang menyakitimu bukan pelarian, itu adalah keberanian untuk menyelamatkan diri sendiri.', arti: 'Meninggalkan yang menyakiti adalah bentuk self-respect.' },
  { quote: 'Kamu berhak mendapatkan cinta yang tenang, bukan yang selalu penuh drama dan ketidakpastian.', arti: 'Cinta yang sehat memberi ketenangan, bukan kegelisahan.' },
  { quote: 'Jangan habiskan energimu untuk orang yang tidak menghargai kehadiranmu.', arti: 'Energimu terlalu berharga untuk disia-siakan.' },
  { quote: 'Terkadang kamu perlu menjauh bukan karena benci, tapi karena kamu perlu ruang untuk bernafas.', arti: 'Jarak kadang diperlukan untuk menjaga kesehatan jiwa.' },
  { quote: 'Seseorang yang mencintaimu tidak akan membuatmu merasa bersalah atas perasaanmu sendiri.', arti: 'Cinta tidak memanipulasi perasaan.' },
  { quote: 'Kamu tidak harus menjelaskan pilihan hidupmu kepada semua orang.', arti: 'Hidupmu adalah urusanmu, bukan pertunjukan untuk orang lain.' },
  { quote: 'Yang paling dewasa bukan yang tidak pernah menangis, tapi yang tahu kapan harus menangis dan kapan harus bangkit.', arti: 'Kedewasaan adalah mengelola emosi dengan bijak.' },
  { quote: 'Biarkan orang pergi yang memang ingin pergi, karena yang bertahan adalah yang benar-benar memilihmu.', arti: 'Yang tersisa adalah yang benar-benar berarti.' },
  { quote: 'Kamu tidak bisa menyenangkan semua orang, dan kamu tidak harus melakukan itu.', arti: 'Tidak mungkin memuaskan semua orang sekaligus.' },
  { quote: 'Rindu yang paling berat bukan rindu kepada seseorang, tapi rindu kepada versi dirimu yang dulu lebih bahagia.', arti: 'Rindu pada diri sendiri yang lebih bahagia adalah hal yang nyata.' },
  { quote: 'Cukup lakukan yang terbaik yang kamu bisa, sisanya serahkan kepada semesta.', arti: 'Usaha maksimal dan kepasrahan adalah kombinasi yang bijak.' },
  { quote: 'Kamu tidak sedang tertinggal, kamu hanya sedang berjalan di jalur yang berbeda.', arti: 'Setiap orang punya waktu dan jalannya sendiri.' },
  { quote: 'Hargai dirimu cukup untuk meninggalkan apa yang tidak lagi membuatmu bertumbuh.', arti: 'Melepas yang tidak mendukung pertumbuhanmu adalah keputusan bijak.' },
  { quote: 'Kesendirian bukan musuh, itu adalah waktu yang diberikan untuk kamu mengenal dirimu lebih dalam.', arti: 'Waktu sendiri adalah investasi untuk memahami diri.' },
  { quote: 'Seseorang yang tepat akan memilihmu di hari yang sulit, bukan hanya di hari yang menyenangkan.', arti: 'Kesetiaan diuji di saat susah, bukan saat senang.' },
  { quote: 'Kamu tidak harus baik-baik saja setiap saat, izinkan dirimu untuk juga merasakan tidak baik-baik saja.', arti: 'Mengizinkan diri untuk merasa adalah bentuk kejujuran.' },
  { quote: 'Yang datang dengan cara yang indah belum tentu pergi dengan cara yang sama.', arti: 'Awal yang baik tidak menjamin akhir yang baik.' },
  { quote: 'Kamu tidak sedang kalah, kamu sedang belajar cara menang yang lebih baik.', arti: 'Kegagalan adalah bagian dari proses menuju kemenangan.' },
  { quote: 'Jangan pernah malu dengan lukamu, itu bukti bahwa kamu pernah berani mencintai.', arti: 'Luka adalah tanda bahwa kamu pernah berani.' },
  { quote: 'Bertumbuhlah dengan caramu sendiri, tidak ada standar baku untuk menjadi manusia yang lebih baik.', arti: 'Pertumbuhan tidak harus mengikuti template orang lain.' },
  { quote: 'Kamu tidak perlu semua orang memahami perjalananmu, cukup kamu yang menjalaninya dengan penuh.', arti: 'Hidupmu tidak butuh validasi dari semua orang.' },
  { quote: 'Setiap luka yang kamu terima, jika kamu mau, bisa menjadi sumber kekuatan yang tidak pernah kamu bayangkan sebelumnya.', arti: 'Luka yang dikelola dengan baik bisa menjadi kekuatan.' },
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