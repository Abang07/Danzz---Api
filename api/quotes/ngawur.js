const meta = {
  param: '',
  desc: 'Quotes ngawur dan random beserta artinya',
  placeholder: ''
}

const quotes = [
  { quote: 'Hidup itu seperti mi instan, panas di awal tapi lama-lama bikin eneg.', arti: 'Semangat awal sering kali tidak bertahan lama.' },
  { quote: 'Aku bukan pemalas, aku hanya dalam mode hemat energi.', arti: 'Pembelaan klasik orang yang sedang malas.' },
  { quote: 'Bangun pagi itu sehat, tapi tidur lagi setelah bangun itu surga.', arti: 'Godaan untuk tidur lagi setelah alarm berbunyi adalah nyata.' },
  { quote: 'Diet mulai besok. Besoknya mulai besok lagi. Konsisten sekali.', arti: 'Menunda diet adalah olahraga paling populer.' },
  { quote: 'Aku bukan pelupa, aku hanya punya sistem penyimpanan memori yang sangat selektif.', arti: 'Alasan kreatif untuk sering lupa.' },
  { quote: 'Otak saya sedang dalam proses loading, mohon tunggu.', arti: 'Kode basa-basi untuk otak yang belum aktif bekerja.' },
  { quote: 'Produktif itu penting. Tapi rebahan sambil mikirin rencana produktif juga penting.', arti: 'Fase merencanakan tanpa eksekusi adalah fase favorit banyak orang.' },
  { quote: 'Saya sudah diet hari ini. Makan siang saya hanya dua porsi.', arti: 'Logika diet yang sangat kreatif.' },
  { quote: 'Kalau hidup kasih kamu lemon, buat es teh lemon. Kalau tidak ada gula, minta tetangga.', arti: 'Solusi hidup yang pragmatis dan sedikit tidak sopan.' },
  { quote: 'Saya tidak takut sendirian, saya hanya takut tidak ada yang tahu kalau saya lapar.', arti: 'Lapar adalah musuh kesepian yang sebenarnya.' },
  { quote: 'Motivasi terbesar dalam hidupku adalah deadline yang sudah mepet.', arti: 'Tekanan waktu adalah motivasi paling ampuh.' },
  { quote: 'Aku bisa bangun jam 5 pagi kalau kepepet. Masalahnya aku tidak pernah mau kepepet.', arti: 'Kemampuan ada, tapi kemauan yang tidak hadir.' },
  { quote: 'Hidup itu singkat, jangan lupa makan enak.', arti: 'Filosofi sederhana yang sangat bisa diterima.' },
  { quote: 'Kalau sudah mepet deadline baru kerja, itu namanya efisiensi waktu.', arti: 'Pembenaran logis untuk kebiasaan menunda.' },
  { quote: 'Saya bukan moody, mood saya hanya lebih kreatif dari orang biasa.', arti: 'Alasan berbeda untuk suasana hati yang tidak menentu.' },
  { quote: 'Kunci sukses itu sederhana: kerja keras, doa, dan koneksi internet yang stabil.', arti: 'Di era digital, internet adalah kebutuhan dasar.' },
  { quote: 'Aku tidak procrastinate, aku hanya memberi masalah waktu untuk menyelesaikan dirinya sendiri.', arti: 'Teori menunda yang sangat inovatif.' },
  { quote: 'Tidur adalah investasi jangka pendek yang memberikan manfaat langsung dan nyata.', arti: 'Pembenaran ilmiah untuk tidur siang.' },
  { quote: 'Saya sudah olahraga hari ini. Naik turun tangga dua kali itu lumayan.', arti: 'Definisi olahraga yang sangat fleksibel.' },
  { quote: 'Jangan tanya saya cara sukses, tanya saja cara bertahan hidup sampai akhir bulan.', arti: 'Realita keuangan yang sangat relevan.' },
  { quote: 'Aku tidak lagi marah, aku hanya sedang mengumpulkan bukti.', arti: 'Diam yang strategis sebelum mengambil tindakan.' },
  { quote: 'Rencanaku sempurna, masalahnya eksekusinya yang sering tidak hadir rapat.', arti: 'Kesenjangan antara rencana dan tindakan adalah masalah universal.' },
  { quote: 'Saya multitasking: bisa rebahan sambil mikirin apa yang mau dimakan nanti.', arti: 'Multitasking versi santai yang sangat efisien.' },
  { quote: 'Kata orang saya terlalu santai. Kata saya, mereka terlalu tegang.', arti: 'Perspektif berbeda tentang gaya hidup.' },
  { quote: 'Mimpi saya sederhana: bisa makan enak tanpa mikirin kalori.', arti: 'Impian yang sangat realistis dan bisa dipahami semua orang.' },
  { quote: 'Hari ini saya berhasil tidak melakukan hal yang tidak perlu dilakukan. Produktif sekali.', arti: 'Mendefinisikan ulang produktivitas dengan cara yang sangat unik.' },
  { quote: 'Saya bukan orang yang mudah stress. Saya hanya menyimpan stres untuk dibuka nanti sekaligus.', arti: 'Strategi pengelolaan stres yang cukup berbahaya.' },
  { quote: 'Kenapa harus sekarang kalau bisa nanti? Kenapa harus nanti kalau bisa tidak sama sekali?', arti: 'Filosofi menunda yang sangat konsisten.' },
  { quote: 'Skill terbaik saya adalah bisa tidur di mana saja dan kapan saja.', arti: 'Bakat yang underrated tapi sangat berguna.' },
  { quote: 'Kalori tidak dihitung kalau makannya sendirian dan tidak ada yang lihat.', arti: 'Logika diet yang tidak berdasar tapi melegakan.' },
  { quote: 'Saya bukan pelupa, saya hanya ingat hal-hal yang berbeda dari yang orang lain harapkan.', arti: 'Cara manis untuk mengakui sering lupa.' },
  { quote: 'Resolusi tahun baru saya: menyelesaikan resolusi tahun lalu yang belum selesai.', arti: 'Siklus resolusi yang sangat realistis.' },
  { quote: 'Orang bilang saya keras kepala, saya bilang saya konsisten pada pendapat saya sendiri.', arti: 'Keras kepala dikemas dengan lebih positif.' },
  { quote: 'Saya tidak menghindari masalah, saya hanya memberi jarak yang cukup agar masalah tidak merasa terganggu.', arti: 'Menghindari masalah dengan cara yang sangat sopan.' },
  { quote: 'Motivasi datang dan pergi, tapi kemalasan selalu konsisten hadir.', arti: 'Ironi kemalasan yang sangat jujur.' },
  { quote: 'Hidup itu keras, tapi kasur lebih keras lagi memanggil setiap pagi.', arti: 'Gravitasi kasur adalah fenomena yang nyata.' },
  { quote: 'Saya bisa diandalkan dalam kondisi darurat: darurat lapar, darurat ngantuk, darurat gabut.', arti: 'Spesialisasi dalam bidang yang sangat spesifik.' },
  { quote: 'Bukan sombong, tapi saya memang jago dalam hal-hal yang tidak berguna.', arti: 'Keahlian dalam bidang yang tidak konvensional.' },
  { quote: 'Percaya diri itu penting. Tapi bukan berarti percaya semua diri yang ada di pikiran kamu.', arti: 'Tidak semua ide yang muncul di kepala layak untuk dieksekusi.' },
  { quote: 'Saya sudah tumbuh dewasa. Buktinya saya sekarang beli cemilan sendiri.', arti: 'Definisi kedewasaan yang sangat personal.' },
  { quote: 'Tidak apa-apa gagal, yang penting jangan sampai kehabisan bahan cerita.', arti: 'Mengambil sisi positif dari kegagalan dengan cara yang unik.' },
  { quote: 'Wisdom terbesar dalam hidupku: jangan diskusi perut kosong, hasilnya tidak ada yang menang.', arti: 'Keputusan yang diambil saat lapar biasanya buruk.' },
  { quote: 'Saya sangat terorganisir. Kekacauan saya pun terstruktur dengan rapi.', arti: 'Kekacauan yang terorganisir tetaplah kekacauan.' },
  { quote: 'Manusia diciptakan untuk bermimpi besar. Mimpi saya besar sekali: tidur 12 jam tanpa gangguan.', arti: 'Mendefinisikan mimpi besar dengan sangat santai.' },
  { quote: 'Saya tidak drama, saya hanya punya perasaan yang lebih sinematik dari orang biasa.', arti: 'Cara elegan untuk mengakui sifat dramatis.' },
  { quote: 'Hari ini saya berhasil. Berhasil tidak melakukan apa-apa sambil merasa sibuk.', arti: 'Seni terlihat sibuk tanpa melakukan apapun.' },
  { quote: 'Kenapa saya begini? Mungkin saya memang istimewa, atau mungkin memang begini adanya.', arti: 'Penerimaan diri tanpa terlalu banyak analisa.' },
  { quote: 'Saya tidak boros, saya hanya terlalu dermawan pada diri sendiri.', arti: 'Pembenaran belanja yang sangat kreatif.' },
  { quote: 'Keputusan terbaik dalam hidupku adalah tetap di kasur lima menit lagi setiap pagi.', arti: 'Lima menit yang selalu menjadi lebih dari lima menit.' },
  { quote: 'Saya bukan orang yang suka drama. Saya hanya penonton yang sangat terlibat.', arti: 'Cara tidak mengakui keterlibatan dalam drama orang lain.' },
  { quote: 'Hidup tanpa rencana itu menyenangkan, sampai tagihan datang.', arti: 'Kebebasan tanpa perencanaan punya konsekuensinya sendiri.' },
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