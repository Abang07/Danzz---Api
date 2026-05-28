const meta = {
  param: '',
  desc: 'Kata-kata bijak kehidupan beserta artinya',
  placeholder: ''
}

const quotes = [
  { quote: 'Hidup adalah cermin, apa yang kamu pancarkan itulah yang akan kamu terima.', arti: 'Sikap dan energi yang kita keluarkan akan kembali kepada kita.' },
  { quote: 'Orang bijak belajar dari kesalahan orang lain, orang pintar belajar dari kesalahannya sendiri, orang bodoh tidak belajar sama sekali.', arti: 'Tingkat kebijaksanaan seseorang terlihat dari sumber belajarnya.' },
  { quote: 'Jangan ukur kecerdasanmu dari nilai ujian, ukur dari kemampuanmu menghadapi ujian hidup.', arti: 'Kecerdasan sejati terlihat dari cara menghadapi tantangan nyata.' },
  { quote: 'Yang membuat seseorang besar bukan posisinya, tapi caranya memperlakukan orang yang berada di bawahnya.', arti: 'Karakter sejati terlihat dari perlakuan kepada yang lemah.' },
  { quote: 'Diam di saat yang tepat lebih bijak dari berbicara di saat yang salah.', arti: 'Memilih waktu yang tepat untuk berbicara adalah kebijaksanaan.' },
  { quote: 'Pikiran adalah taman, kata-kata adalah benih, perbuatan adalah buahnya.', arti: 'Apa yang kita tanam dalam pikiran akan berbuah dalam tindakan.' },
  { quote: 'Kesederhanaan adalah puncak dari kecanggihan sejati.', arti: 'Yang paling kompleks seringkali bisa disederhanakan menjadi hal yang paling elegan.' },
  { quote: 'Jangan takut pada perubahan, takutlah pada stagnasi yang menyamar sebagai kenyamanan.', arti: 'Zona nyaman yang berlebihan adalah ancaman terbesar pertumbuhan.' },
  { quote: 'Kebijaksanaan bukan tentang mengetahui segalanya, tapi tentang tahu kapan harus bertanya.', arti: 'Mengakui ketidaktahuan dan berani bertanya adalah tanda kebijaksanaan.' },
  { quote: 'Manusia yang paling kaya adalah yang paling sedikit keinginannya.', arti: 'Kekayaan sejati berasal dari rasa cukup, bukan dari banyaknya harta.' },
  { quote: 'Sebelum berbicara, tanyakan tiga hal: Apakah ini benar? Apakah ini baik? Apakah ini perlu?', arti: 'Filter tiga pertanyaan sebelum berbicara mencegah banyak masalah.' },
  { quote: 'Pengalaman bukan apa yang terjadi padamu, tapi apa yang kamu lakukan dengan apa yang terjadi padamu.', arti: 'Respons terhadap pengalaman lebih penting dari pengalamannya sendiri.' },
  { quote: 'Orang yang tidak pernah membuat kesalahan tidak pernah mencoba hal baru.', arti: 'Kesalahan adalah tanda seseorang sedang berkembang dan berani mencoba.' },
  { quote: 'Kebahagiaan bukan tujuan akhir, ia adalah cara berjalan menuju tujuan itu.', arti: 'Kebahagiaan ditemukan dalam proses, bukan hanya di tujuan akhir.' },
  { quote: 'Yang paling sulit dalam hidup bukan menghadapi orang jahat, tapi menghadapi dirimu sendiri yang jahat.', arti: 'Musuh terbesar adalah ego dan kelemahan dalam diri sendiri.' },
  { quote: 'Hidup singkat untuk dipenuhi dengan kebencian, tapi cukup panjang untuk dipenuhi dengan cinta.', arti: 'Pilih mengisi hidup dengan hal yang membangun, bukan yang merusak.' },
  { quote: 'Bukan seberapa lama kamu hidup yang penting, tapi seberapa dalam kamu menjalaninya.', arti: 'Kualitas hidup lebih bermakna dari kuantitas waktu.' },
  { quote: 'Seseorang yang rendah hati selalu belajar, seseorang yang sombong selalu merasa sudah tahu.', arti: 'Kerendahan hati membuka pintu pengetahuan yang lebih luas.' },
  { quote: 'Perkataan yang keluar dari mulut menunjukkan isi hati yang sesungguhnya.', arti: 'Apa yang diucapkan mencerminkan kondisi batin seseorang.' },
  { quote: 'Jadikan setiap hari sebagai mahkota hidupmu, bukan hanya batu bata di fondasi masa depan.', arti: 'Nikmati setiap hari, tidak hanya mengorbankannya untuk hari esok.' },
  { quote: 'Maaf bukan tanda kelemahan, tapi tanda bahwa kamu lebih menghargai hubungan daripada ego.', arti: 'Kemampuan meminta maaf adalah tanda kedewasaan dan kekuatan karakter.' },
  { quote: 'Yang paling berharga dalam hidup tidak selalu bisa diukur dengan uang.', arti: 'Waktu, kesehatan, dan hubungan adalah kekayaan yang tidak ternilai.' },
  { quote: 'Orang yang paling bahagia bukan yang mendapatkan yang terbaik, tapi yang bisa membuat yang terbaik dari apa yang dimilikinya.', arti: 'Syukur dan kreativitas mengubah yang biasa menjadi luar biasa.' },
  { quote: 'Keberanian sejati bukan tidak punya rasa takut, tapi terus melangkah meski takut.', arti: 'Rasa takut adalah normal, yang membedakan adalah respons terhadapnya.' },
  { quote: 'Waktu adalah modal paling berharga yang dimiliki setiap manusia tanpa terkecuali.', arti: 'Semua orang punya waktu yang sama, yang berbeda adalah cara menggunakannya.' },
  { quote: 'Tidak ada cermin yang lebih jelas dari teman-teman yang kamu pilih.', arti: 'Orang-orang di sekitar kita mencerminkan siapa diri kita sebenarnya.' },
  { quote: 'Kehidupan yang baik bukan yang tanpa masalah, tapi yang punya makna di balik setiap masalahnya.', arti: 'Makna di balik penderitaan membuat hidup terasa lebih bernilai.' },
  { quote: 'Jangan cari sempurna, cari yang bermakna.', arti: 'Kesempurnaan adalah ilusi, tapi makna adalah kenyataan yang bisa diraih.' },
  { quote: 'Hati yang lapang adalah rumah terbaik untuk kedamaian.', arti: 'Ketenangan jiwa lahir dari keluasan hati dalam menerima segala hal.' },
  { quote: 'Orang yang tahu caranya bersyukur tidak akan pernah merasa miskin.', arti: 'Syukur adalah kunci kekayaan jiwa yang tidak terbatas.' },
  { quote: 'Kebenaran tidak selalu menyenangkan, tapi selalu lebih baik dari kebohongan yang nyaman.', arti: 'Jujur meski menyakitkan lebih baik dari bohong yang melegakan sesaat.' },
  { quote: 'Seorang pemimpin sejati tidak menciptakan pengikut, ia menciptakan pemimpin baru.', arti: 'Kepemimpinan yang baik mengembangkan orang lain, bukan menciptakan ketergantungan.' },
  { quote: 'Belajar tanpa batas usia adalah investasi terbaik yang bisa kamu lakukan untuk dirimu.', arti: 'Pendidikan seumur hidup adalah bekal yang tidak pernah habis.' },
  { quote: 'Pilihan yang kamu buat hari ini membentuk karakter yang akan kamu bawa seumur hidup.', arti: 'Setiap keputusan kecil berkontribusi pada pembentukan diri secara keseluruhan.' },
  { quote: 'Hidup bukan soal menunggu badai berlalu, tapi belajar menari di tengah hujan.', arti: 'Adaptasi dan penerimaan adalah kunci menghadapi tantangan hidup.' },
  { quote: 'Kata-kata memiliki kekuatan untuk menyembuhkan dan menghancurkan, gunakan dengan bijak.', arti: 'Kekuatan kata-kata harus disertai tanggung jawab yang besar.' },
  { quote: 'Tidak semua yang mengkilap adalah emas, tidak semua yang terlihat baik memang baik.', arti: 'Penampilan luar bisa menipu, perlu waktu untuk mengenal seseorang sungguhnya.' },
  { quote: 'Jadilah seperti pohon: semakin tinggi tumbuh, semakin dalam akarnya menancap.', arti: 'Kesuksesan harus diimbangi dengan fondasi karakter yang kuat.' },
  { quote: 'Keadaan tidak selalu bisa diubah, tapi sikap terhadap keadaan selalu bisa dipilih.', arti: 'Kontrol terbesar yang kita miliki adalah atas respons kita sendiri.' },
  { quote: 'Yang membuat seseorang menonjol bukan karena ia berbeda dari orang lain, tapi karena ia dengan berani menjadi dirinya sendiri.', arti: 'Keaslian diri adalah keunikan yang paling berharga.' },
  { quote: 'Persahabatan sejati tidak diuji oleh kesenangan, tapi oleh kesulitan.', arti: 'Masa-masa sulit adalah ujian terbaik dari sebuah hubungan.' },
  { quote: 'Jangan habiskan energimu untuk sesuatu yang tidak bisa kamu kontrol.', arti: 'Fokus pada apa yang bisa dikendalikan adalah kunci kedamaian jiwa.' },
  { quote: 'Ilmu yang tidak diamalkan seperti pohon yang tidak berbuah.', arti: 'Pengetahuan baru bermakna ketika dipraktikkan dalam kehidupan nyata.' },
  { quote: 'Orang yang bisa mengendalikan lidahnya bisa mengendalikan hidupnya.', arti: 'Kemampuan mengontrol ucapan mencerminkan kedewasaan dalam mengelola diri.' },
  { quote: 'Bermimpilah setinggi langit, tapi tetap berpijak di bumi.', arti: 'Ambisi yang besar harus disertai dengan usaha nyata dan realistis.' },
  { quote: 'Yang bertahan bukan yang terkuat, tapi yang paling bisa beradaptasi.', arti: 'Fleksibilitas dan kemampuan beradaptasi lebih penting dari kekuatan semata.' },
  { quote: 'Ketulusan dalam memberi jauh lebih berharga dari besarnya pemberian.', arti: 'Niat di balik sebuah perbuatan adalah yang paling bermakna.' },
  { quote: 'Jangan lihat ke belakang terlalu lama, kamu tidak sedang ke sana.', arti: 'Masa lalu adalah pelajaran, bukan tempat tinggal.' },
  { quote: 'Seseorang yang bisa tertawa di tengah kesulitan adalah seseorang yang telah menemukan kekuatan sejatinya.', arti: 'Humor di tengah kesulitan adalah tanda jiwa yang kuat dan sehat.' },
  { quote: 'Hidup bukan tentang menemukan diri sendiri, tapi tentang menciptakan diri sendiri setiap harinya.', arti: 'Diri kita adalah karya yang terus dibangun, bukan sesuatu yang statis untuk ditemukan.' },
  { quote: 'Kebaikan yang dilakukan dengan diam-diam lebih mulia dari yang dilakukan untuk dilihat orang.', arti: 'Keikhlasan dalam berbuat baik tanpa pamer adalah kemuliaan yang sesungguhnya.' },
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