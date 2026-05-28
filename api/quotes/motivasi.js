const meta = {
  param: '',
  desc: 'Quotes motivasi kehidupan beserta artinya',
  placeholder: ''
}

const quotes = [
  { quote: 'Setiap pagi adalah kesempatan baru untuk memulai sesuatu yang luar biasa.', arti: 'Hari baru selalu membawa peluang yang belum pernah ada sebelumnya.' },
  { quote: 'Kamu tidak harus menjadi sempurna untuk memulai, tapi kamu harus memulai untuk menjadi sempurna.', arti: 'Langkah pertama adalah yang paling penting dalam setiap perjalanan.' },
  { quote: 'Jika kamu lelah, istirahat. Tapi jangan pernah berhenti.', arti: 'Istirahat adalah bagian dari proses, bukan tanda kekalahan.' },
  { quote: 'Satu persen lebih baik setiap hari menghasilkan 37 kali lebih baik dalam setahun.', arti: 'Peningkatan kecil yang konsisten menghasilkan perubahan besar dalam jangka panjang.' },
  { quote: 'Yang memisahkan yang sukses dan yang tidak adalah kemampuan untuk terus melangkah saat semua terasa berat.', arti: 'Bertahan di saat sulit adalah pembeda antara sukses dan menyerah.' },
  { quote: 'Berhentilah menunggu momen yang tepat. Ciptakan momennya.', arti: 'Momen sempurna tidak datang sendiri, harus diciptakan dengan tindakan.' },
  { quote: 'Kesuksesan bukan tentang tidak pernah gagal, tapi tentang tidak pernah berhenti mencoba.', arti: 'Persistensi adalah kunci utama kesuksesan jangka panjang.' },
  { quote: 'Percayakan prosesmu. Hasil terbaik membutuhkan waktu.', arti: 'Kesabaran dalam proses adalah investasi menuju hasil terbaik.' },
  { quote: 'Jangan bandingkan Bab 1-mu dengan Bab 20 orang lain.', arti: 'Setiap orang berada di tahap perjalanan yang berbeda, perbandingan itu tidak adil.' },
  { quote: 'Kamu lebih dekat ke tujuanmu dari yang kamu bayangkan.', arti: 'Sering kali kita meremehkan seberapa jauh kita sudah melangkah.' },
  { quote: 'Pagi hari adalah investasi terbaik. Gunakan dengan bijak.', arti: 'Kebiasaan pagi yang baik menentukan produktivitas sepanjang hari.' },
  { quote: 'Setiap langkah kecil yang kamu ambil hari ini adalah investasi besar untuk masa depanmu.', arti: 'Konsistensi dalam hal kecil menghasilkan dampak besar dari waktu ke waktu.' },
  { quote: 'Kamu tidak bisa mengendalikan semua yang terjadi, tapi kamu bisa mengendalikan responsmu.', arti: 'Kekuatan terbesar adalah mengelola reaksi terhadap situasi yang tidak bisa dikontrol.' },
  { quote: 'Jangan takut gagal. Takutlah tidak pernah mencoba.', arti: 'Penyesalan tidak mencoba jauh lebih berat dari kegagalan itu sendiri.' },
  { quote: 'Orang sukses tidak berbeda darimu. Mereka hanya memilih untuk tidak menyerah.', arti: 'Pilihan untuk bertahan adalah yang membedakan sukses dari gagal.' },
  { quote: 'Mulai dari mana kamu berada sekarang. Gunakan apa yang kamu punya. Lakukan apa yang kamu bisa.', arti: 'Kondisi ideal tidak perlu ditunggu, mulailah dengan kondisi saat ini.' },
  { quote: 'Setiap mimpi besar dimulai dari seseorang yang berani berpikir berbeda.', arti: 'Keberanian berpikir out of the box adalah awal dari inovasi besar.' },
  { quote: 'Kerja kerasmu hari ini adalah kemudahan hidupmu esok hari.', arti: 'Investasi usaha saat ini memberikan hasil yang memudahkan masa depan.' },
  { quote: 'Jika rencanamu tidak berhasil, sesuaikan rencananya, bukan tujuannya.', arti: 'Fleksibilitas dalam strategi penting, tapi komitmen pada tujuan harus tetap kuat.' },
  { quote: 'Kamu tidak perlu izin siapapun untuk menjadi versi terbaik dirimu.', arti: 'Pertumbuhan diri adalah hak dan tanggung jawab pribadi, bukan menunggu restu orang lain.' },
  { quote: 'Kesulitan yang kamu hadapi hari ini sedang membangun kekuatanmu untuk esok hari.', arti: 'Setiap tantangan adalah latihan yang memperkuat kapasitas diri.' },
  { quote: 'Bukan tentang seberapa pintar kamu, tapi seberapa gigih kamu dalam menghadapi kesulitan.', arti: 'Ketekunan mengalahkan bakat yang tidak disertai usaha.' },
  { quote: 'Jangan lihat betapa panjang jalannya. Fokus pada langkah berikutnya.', arti: 'Membagi tujuan besar menjadi langkah kecil membuat perjalanan terasa lebih mudah.' },
  { quote: 'Kamu tidak harus melihat seluruh tangga, cukup ambil langkah pertama.', arti: 'Memulai dengan langkah pertama sudah cukup untuk memulai perjalanan.' },
  { quote: 'Waktu berlalu, apakah kamu menggunakannya atau tidak. Pilihan ada di tanganmu.', arti: 'Waktu adalah sumber daya yang sama bagi semua orang, bedanya ada pada cara penggunaannya.' },
  { quote: 'Disiplin adalah memilih antara apa yang kamu inginkan sekarang dan apa yang kamu inginkan paling dalam.', arti: 'Disiplin adalah soal prioritas jangka panjang atas keinginan jangka pendek.' },
  { quote: 'Setiap orang yang sukses pernah berada di posisimu. Yang membedakan adalah mereka tidak berhenti di sana.', arti: 'Perjuangan adalah bagian dari perjalanan semua orang sukses.' },
  { quote: 'Bangun kebiasaan yang mendukung mimpimu, bukan yang melemahkannya.', arti: 'Kebiasaan sehari-hari menentukan apakah kita mendekati atau menjauh dari tujuan.' },
  { quote: 'Hidupmu tidak akan berubah sampai kamu mengubah sesuatu yang kamu lakukan setiap hari.', arti: 'Perubahan besar dimulai dari perubahan kebiasaan harian yang konsisten.' },
  { quote: 'Mereka yang mengatakan tidak mungkin sebaiknya tidak mengganggu mereka yang sedang melakukannya.', arti: 'Pendapat negatif orang lain tidak seharusnya menghentikan usahamu.' },
  { quote: 'Jangan tunggu motivasi untuk datang sebelum mulai bekerja. Mulailah bekerja dan motivasi akan mengikuti.', arti: 'Tindakan menghasilkan momentum, bukan menunggu mood yang tepat.' },
  { quote: 'Setiap hari yang kamu lewati adalah hari yang tidak akan pernah kembali. Gunakan sebaik mungkin.', arti: 'Waktu yang berlalu tidak bisa diputar kembali, manfaatkan setiap harinya.' },
  { quote: 'Percayalah bahwa kamu mampu dan kamu sudah setengah jalan menuju keberhasilan.', arti: 'Kepercayaan diri adalah modal awal yang menentukan hasil akhir.' },
  { quote: 'Kritik keras adalah tanda orang lain melihat potensi besar dalam dirimu.', arti: 'Kritik yang membangun sering datang dari kepedulian, bukan kejahatan.' },
  { quote: 'Kamu tidak bisa mengubah angin, tapi kamu bisa mengatur layarmu.', arti: 'Yang bisa dikendalikan adalah respons dan persiapan kita, bukan keadaan.' },
  { quote: 'Yang paling sukses adalah yang paling banyak belajar dari kegagalannya.', arti: 'Kemampuan mengekstrak pelajaran dari kegagalan adalah keahlian yang paling berharga.' },
  { quote: 'Jangan biarkan ukuran mimpimu ditentukan oleh keterbatasan yang kamu bayangkan.', arti: 'Batasan terbesar sering ada di pikiran, bukan di kenyataan.' },
  { quote: 'Setiap malam sebelum tidur, tanyakan: Apa yang sudah aku lakukan hari ini untuk masa depanku?', arti: 'Refleksi harian adalah cara menjaga diri tetap pada jalur tujuan.' },
  { quote: 'Kamu tidak akan pernah tahu seberapa jauh kamu bisa pergi jika kamu tidak pernah mulai berjalan.', arti: 'Memulai adalah satu-satunya cara untuk mengetahui batas kemampuan diri.' },
  { quote: 'Orang yang bangkit setelah jatuh tidak kalah. Yang kalah adalah yang memilih untuk tetap di bawah.', arti: 'Kemenangan sejati adalah kemampuan untuk bangkit kembali.' },
  { quote: 'Impian yang besar membutuhkan keberanian yang besar dan usaha yang besar pula.', arti: 'Besarnya impian harus sebanding dengan besarnya tekad dan usaha.' },
  { quote: 'Jangan habiskan energimu untuk hal yang tidak membawamu ke tujuanmu.', arti: 'Selektivitas dalam menggunakan energi adalah kunci efektivitas.' },
  { quote: 'Kamu tidak bisa selalu mengontrol apa yang terjadi, tapi kamu bisa mengontrol siapa dirimu dalam menghadapinya.', arti: 'Karakter diuji dan dibentuk oleh bagaimana kita menghadapi situasi sulit.' },
  { quote: 'Investasi terbaik adalah pada dirimu sendiri. Tidak ada yang bisa mengambilnya darimu.', arti: 'Pengembangan diri adalah aset yang paling aman dan paling menguntungkan.' },
  { quote: 'Jadilah orang yang membuat orang lain merasa mungkin, bukan tidak mungkin.', arti: 'Pengaruh positif kepada orang lain adalah kontribusi terbesar yang bisa diberikan.' },
  { quote: 'Kelelahan adalah sementara, tapi menyerah adalah selamanya.', arti: 'Rasa lelah bisa pulih, tapi penyesalan menyerah bisa bertahan seumur hidup.' },
  { quote: 'Terus bergerak meski pelan, karena gerak pelan masih lebih baik dari diam.', arti: 'Progress sekecil apapun tetaplah progress yang membawa lebih dekat ke tujuan.' },
  { quote: 'Keberhasilan bukan milik yang berbakat, tapi milik yang tidak pernah berhenti belajar.', arti: 'Komitmen untuk terus belajar mengalahkan bakat alami yang tidak dikembangkan.' },
  { quote: 'Jadikan setiap pengalaman sebagai pelajaran, setiap kegagalan sebagai guru.', arti: 'Mengubah mindset tentang pengalaman negatif menjadi sumber pertumbuhan.' },
  { quote: 'Hari ini mungkin sulit, besok mungkin lebih sulit, tapi lusa akan lebih indah dari yang kamu bayangkan.', arti: 'Kesabaran melewati hari-hari sulit akan membawa kepada hari yang lebih baik.' },
  { quote: 'Kamu adalah satu-satunya orang yang bisa mengubah hidupmu. Tidak ada orang lain yang bisa melakukannya untukmu.', arti: 'Tanggung jawab atas kehidupan sendiri sepenuhnya ada di tangan diri sendiri.' },
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