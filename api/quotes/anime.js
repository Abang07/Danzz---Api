const meta = {
  param: '',
  desc: 'Quotes inspiratif dari karakter anime beserta artinya',
  placeholder: ''
}

const quotes = [
  { quote: 'Aku tidak menyerah. Aku hanya mengubah strategi.', arti: 'Fleksibilitas dalam menghadapi kegagalan adalah kunci keberhasilan.' },
  { quote: 'Kalau kamu tidak dapat mengubah dunia, ubahlah dirimu sendiri.', arti: 'Perubahan terbesar dimulai dari dalam diri sendiri.' },
  { quote: 'Seseorang yang tidak bisa mengorbankan sesuatu, tidak bisa mengubah apapun.', arti: 'Pengorbanan adalah harga dari setiap perubahan yang berarti.' },
  { quote: 'Tidak peduli seberapa keras kamu berusaha, ada hal-hal yang tidak bisa kamu dapatkan. Tapi itu tidak berarti kamu berhenti berusaha.', arti: 'Usaha tetap bermakna meski hasilnya tidak selalu sesuai harapan.' },
  { quote: 'Aku tidak mencari musuh yang sempurna, aku mencari diri yang sempurna.', arti: 'Tantangan terbesar adalah mengalahkan kelemahan dalam diri sendiri.' },
  { quote: 'Kalau kamu tidak merasakan sakit, kamu tidak akan menghargai ketenangan.', arti: 'Kesulitan mengajarkan kita untuk mensyukuri kebaikan.' },
  { quote: 'Kekuatan sejati bukan tentang tidak pernah menangis, tapi tentang bangkit setelah menangis.', arti: 'Kelemahan yang diakui adalah awal dari kekuatan yang sesungguhnya.' },
  { quote: 'Dunia ini kejam dan juga sangat indah.', arti: 'Kehidupan memiliki dua sisi yang tidak bisa dipisahkan.' },
  { quote: 'Jangan katakan tidak mungkin. Katakan saja belum bisa.', arti: 'Mengubah perspektif dari negatif ke positif membuka kemungkinan yang lebih luas.' },
  { quote: 'Seseorang yang tidak bisa melindungi sesuatu, tidak bisa melindungi apapun.', arti: 'Tanggung jawab dimulai dari hal-hal kecil yang paling dekat.' },
  { quote: 'Takdir bukan sesuatu yang ditentukan sejak lahir, tapi sesuatu yang kamu ciptakan sendiri.', arti: 'Masa depan ditentukan oleh pilihan dan usaha, bukan nasib semata.' },
  { quote: 'Aku tidak butuh masa depan yang mudah. Aku hanya butuh teman yang akan bersamaku dalam kesulitan.', arti: 'Kebersamaan yang sejati lebih berharga dari kemudahan hidup.' },
  { quote: 'Impian tidak akan terwujud hanya dengan bermimpi, tapi dengan berjuang.', arti: 'Aksi nyata adalah jembatan antara mimpi dan kenyataan.' },
  { quote: 'Kalau kamu punya waktu untuk mengkhawatirkan kematianmu, gunakan waktu itu untuk hidup lebih baik.', arti: 'Fokus pada kualitas hidup, bukan pada ketakutan akan akhirnya.' },
  { quote: 'Orang yang kuat bukan yang tidak pernah jatuh, tapi yang selalu bangkit lebih tinggi dari sebelumnya.', arti: 'Kemampuan bangkit dari keterpurukan adalah ukuran kekuatan sejati.' },
  { quote: 'Aku hidup bukan untuk melindungi aturan, tapi untuk melindungi orang-orang yang aku cintai.', arti: 'Motivasi yang berlandaskan kasih sayang lebih kuat dari kewajiban.' },
  { quote: 'Kamu tidak bisa memenangkan pertempuran dengan menyerah di tengah jalan.', arti: 'Konsistensi dan ketekunan adalah kunci dari setiap kemenangan.' },
  { quote: 'Setiap orang bisa menjadi kuat jika mereka punya alasan yang cukup kuat untuk berjuang.', arti: 'Motivasi yang kuat menghasilkan kekuatan yang melampaui batas biasa.' },
  { quote: 'Masa lalu tidak bisa diubah, tapi masa depan masih di tanganmu.', arti: 'Fokus pada apa yang masih bisa dikendalikan, bukan yang sudah terjadi.' },
  { quote: 'Jadilah dirimu sendiri, karena orang lain sudah ada yang melakukan peran mereka.', arti: 'Keaslian adalah kontribusi unik yang hanya bisa kamu berikan.' },
  { quote: 'Mereka yang berhasil adalah mereka yang tidak berhenti saat semua orang lain menyerah.', arti: 'Bertahan di saat orang lain menyerah adalah yang membedakan pemenang.' },
  { quote: 'Dalam dunia ini, tidak ada yang benar-benar sendirian. Selalu ada seseorang yang peduli.', arti: 'Kepedulian ada di mana-mana, kita hanya perlu membuka mata untuk melihatnya.' },
  { quote: 'Kalau kamu tidak bisa percaya pada dirimu sendiri, bagaimana kamu bisa meminta orang lain mempercayaimu?', arti: 'Kepercayaan diri adalah fondasi dari kepercayaan orang lain.' },
  { quote: 'Bahkan jika aku harus berdiri sendirian, aku akan tetap berjuang untuk apa yang aku yakini benar.', arti: 'Integritas dan keyakinan harus dijaga bahkan saat sendirian.' },
  { quote: 'Yang membuat seseorang manusia sejati bukan kekuatannya, tapi pilihan yang ia buat dengan kekuatan itu.', arti: 'Kebijaksanaan dalam menggunakan kemampuan adalah tanda karakter yang baik.' },
  { quote: 'Semakin keras jalan yang kamu tempuh, semakin indah pemandangan di puncaknya.', arti: 'Perjuangan yang berat menghasilkan pencapaian yang lebih bermakna.' },
  { quote: 'Aku tidak takut mati. Yang aku takutkan adalah hidup tanpa tujuan.', arti: 'Hidup yang bermakna lebih berharga dari hidup yang panjang tanpa arah.' },
  { quote: 'Bukan tentang seberapa keras kamu memukul, tapi seberapa keras kamu bisa dipukul dan terus melangkah.', arti: 'Ketahanan menghadapi pukulan hidup adalah kekuatan yang sesungguhnya.' },
  { quote: 'Jika kamu tidak bisa melakukan hal besar, lakukanlah hal kecil dengan cara yang besar.', arti: 'Kesungguhan dalam hal kecil sama nilainya dengan hal besar.' },
  { quote: 'Terkadang yang kamu butuhkan bukan kemenangan, tapi seseorang yang percaya padamu.', arti: 'Dukungan dan kepercayaan orang lain bisa mengubah segalanya.' },
  { quote: 'Air mata bukan tanda kelemahan. Itu tanda bahwa kamu cukup berani untuk merasa.', arti: 'Mengekspresikan perasaan adalah bentuk keberanian, bukan kelemahan.' },
  { quote: 'Ketika semuanya terasa mustahil, ingat mengapa kamu memulai.', arti: 'Kembali ke motivasi awal memberi kekuatan untuk melanjutkan.' },
  { quote: 'Kamu tidak perlu menjadi pahlawan untuk seseorang, cukup jadilah seseorang yang bisa diandalkan.', arti: 'Konsistensi dan keandalan lebih berarti dari kepahlawanan yang dramatis.' },
  { quote: 'Setiap luka mengajarkan sesuatu. Jangan biarkan sakitnya sia-sia.', arti: 'Ambil pelajaran dari setiap penderitaan agar tidak sia-sia.' },
  { quote: 'Kebencian hanya akan menghancurkan dirimu sendiri dari dalam.', arti: 'Menyimpan kebencian merugikan diri sendiri lebih dari siapapun.' },
  { quote: 'Kamu bisa menangis, kamu bisa marah, tapi setelah itu berdiri dan terus berjalan.', arti: 'Izinkan diri untuk merasakan emosi, lalu bangkit dan lanjutkan.' },
  { quote: 'Yang paling menakutkan bukan musuh di luar, tapi keraguan dalam diri sendiri.', arti: 'Keraguan diri adalah musuh yang paling berbahaya.' },
  { quote: 'Senyum bisa menyembunyikan banyak hal, tapi tidak bisa menyembunyikan segalanya.', arti: 'Ada batas dari apa yang bisa disembunyikan di balik senyuman.' },
  { quote: 'Jadikan kegagalanmu sebagai bahan bakar, bukan sebagai alasan untuk berhenti.', arti: 'Mengubah perspektif tentang kegagalan adalah kunci untuk terus maju.' },
  { quote: 'Kita semua punya monster dalam diri kita. Yang membedakan adalah apakah kita mengendalikannya atau dikendalikannya.', arti: 'Setiap orang punya sisi gelap, keberhasilan adalah mengendalikannya.' },
  { quote: 'Hidup bukan tentang menghindari badai, tapi belajar untuk berlayar dalam badai.', arti: 'Kemampuan menghadapi kesulitan lebih penting dari menghindarinya.' },
  { quote: 'Jangan biarkan orang lain mendefinisikan siapa dirimu.', arti: 'Identitas diri ditentukan oleh diri sendiri, bukan oleh penilaian orang lain.' },
  { quote: 'Bahkan dalam kegelapan terpekat, selalu ada cahaya jika kamu cukup berani untuk mencarinya.', arti: 'Harapan selalu ada, kita hanya perlu keberanian untuk menemukannya.' },
  { quote: 'Aku tidak mencari jalan yang mudah, aku mencari jalan yang membuatku tumbuh.', arti: 'Pertumbuhan lebih berharga dari kenyamanan.' },
  { quote: 'Kesedihan adalah bukti bahwa kamu pernah merasakan sesuatu yang berarti.', arti: 'Rasa sedih menunjukkan bahwa kita pernah mencintai sesuatu dengan sungguh.' },
  { quote: 'Jangan remehkan dirimu hanya karena kamu berbeda. Perbedaanmu adalah kekuatanmu.', arti: 'Keunikan diri adalah sumber kekuatan, bukan kelemahan.' },
  { quote: 'Bahkan langkah terkecil ke arah yang benar lebih baik dari diam di tempat.', arti: 'Gerak kecil ke arah tujuan lebih baik dari tidak bergerak sama sekali.' },
  { quote: 'Percayalah pada dirimu sendiri bahkan ketika tidak ada yang lain yang percaya padamu.', arti: 'Kepercayaan diri sendiri adalah fondasi dari semua pencapaian.' },
  { quote: 'Semua orang hidup dengan membawa sesuatu yang tidak bisa mereka lihat sendiri.', arti: 'Setiap orang punya beban tersembunyi yang tidak selalu terlihat oleh orang lain.' },
  { quote: 'Jika kamu tidak bisa berlari, berjalanlah. Jika tidak bisa berjalan, merangkaklah. Tapi jangan pernah berhenti.', arti: 'Terus bergerak maju, tidak peduli seberapa lambatnya, adalah yang terpenting.' },
  { quote: 'Kita tidak memilih keluarga kita, tapi kita memilih siapa yang kita anggap keluarga.', arti: 'Ikatan yang dipilih dengan hati bisa lebih kuat dari ikatan darah.' },
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