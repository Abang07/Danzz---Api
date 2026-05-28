const meta = {
  param: '',
  desc: 'Quotes kata-kata keadilan beserta artinya',
  placeholder: ''
}

const quotes = [
  { quote: 'Keadilan bukan soal memberi sama rata, tapi memberi sesuai kebutuhan.', arti: 'Adil bukan berarti semua mendapat hal yang sama.' },
  { quote: 'Hukum yang tidak adil bukan hukum, itu penindasan yang tertulis.', arti: 'Keadilan adalah jiwa dari hukum.' },
  { quote: 'Suara yang paling keras belum tentu yang paling benar.', arti: 'Kebenaran tidak diukur dari volume suara.' },
  { quote: 'Keadilan tertunda adalah keadilan yang ditolak.', arti: 'Keadilan yang lambat sama saja dengan ketidakadilan.' },
  { quote: 'Mereka yang diam saat ketidakadilan terjadi turut bertanggung jawab atasnya.', arti: 'Diam saat melihat ketidakadilan adalah bentuk persetujuan.' },
  { quote: 'Jangan nilai seseorang dari penampilannya, nilai dari keadilannya.', arti: 'Karakter seseorang terlihat dari cara ia berlaku adil.' },
  { quote: 'Kekuasaan tanpa keadilan adalah tirani, keadilan tanpa kekuasaan hanyalah mimpi.', arti: 'Keadilan dan kekuasaan harus berjalan beriringan.' },
  { quote: 'Membela yang lemah bukan kelemahan, itu adalah keberanian sejati.', arti: 'Keberanian sejati terlihat dari keberpihakan pada yang lemah.' },
  { quote: 'Orang yang baik bukan yang tidak pernah berbuat salah, tapi yang mau mengakui dan memperbaikinya.', arti: 'Mengakui kesalahan adalah bagian dari keadilan.' },
  { quote: 'Keadilan adalah hak semua orang, bukan hadiah bagi yang mampu membayar.', arti: 'Keadilan tidak boleh diperjualbelikan.' },
  { quote: 'Saat kebenaran dipendam terlalu lama, ia akan meledak dengan cara yang tidak terduga.', arti: 'Kebenaran tidak bisa terus-menerus disembunyikan.' },
  { quote: 'Jangan biarkan rasa takut membuatmu membungkam suara kebenaran.', arti: 'Berani bersuara untuk kebenaran adalah kewajiban moral.' },
  { quote: 'Yang paling berbahaya bukan penjahat yang kejam, tapi orang baik yang memilih diam.', arti: 'Ketidakpedulian pada ketidakadilan sama bahayanya dengan kejahatan.' },
  { quote: 'Perlakukan orang lain sebagaimana kamu ingin diperlakukan.', arti: 'Dasar keadilan adalah empati dan timbal balik.' },
  { quote: 'Keadilan bukan tentang membalas dendam, tapi tentang memulihkan keseimbangan.', arti: 'Tujuan keadilan adalah pemulihan, bukan pembalasan.' },
  { quote: 'Jika kamu netral di situasi ketidakadilan, kamu memilih sisi penindas.', arti: 'Tidak ada posisi netral saat ketidakadilan terjadi.' },
  { quote: 'Kebenaran mungkin pahit, tapi lebih baik dari kebohongan yang manis.', arti: 'Kejujuran adalah fondasi keadilan.' },
  { quote: 'Ukuran keadilan suatu masyarakat adalah bagaimana ia memperlakukan yang paling lemah.', arti: 'Keadilan sejati dilihat dari perlakuan terhadap yang paling rentan.' },
  { quote: 'Jangan menghukum orang atas kesalahan yang belum terbukti.', arti: 'Asas praduga tak bersalah adalah pilar keadilan.' },
  { quote: 'Keadilan yang lambat mengajarkan orang untuk mencari caranya sendiri.', arti: 'Sistem yang lambat mendorong main hakim sendiri.' },
  { quote: 'Hak asasi bukan pemberian negara, itu adalah milik setiap manusia sejak lahir.', arti: 'Hak asasi manusia tidak bisa dicabut oleh siapapun.' },
  { quote: 'Korupsi bukan hanya mencuri uang, tapi mencuri kepercayaan rakyat.', arti: 'Korupsi merusak fondasi keadilan dan kepercayaan.' },
  { quote: 'Satu kesaksian palsu bisa menghancurkan hidup seseorang yang tidak bersalah.', arti: 'Kejujuran dalam kesaksian adalah tanggung jawab besar.' },
  { quote: 'Tidak ada perdamaian sejati tanpa keadilan.', arti: 'Damai yang sejati hanya bisa terwujud dengan keadilan.' },
  { quote: 'Pemimpin yang adil lebih berharga dari seribu tentara.', arti: 'Kepemimpinan yang adil adalah kekuatan terbesar.' },
  { quote: 'Jangan biarkan jabatan membuatmu lupa bahwa kamu pernah jadi rakyat biasa.', arti: 'Kekuasaan seharusnya tidak mengubah rasa keadilan seseorang.' },
  { quote: 'Ketika kamu membela yang benar, kamu tidak perlu takut pada yang salah.', arti: 'Kebenaran adalah pelindung terkuat.' },
  { quote: 'Anak-anak belajar keadilan dari cara orang dewasa berlaku, bukan dari kata-katanya.', arti: 'Teladan lebih kuat dari seribu nasihat.' },
  { quote: 'Jangan biarkan amarah menguasaimu saat mencari keadilan, karena amarah sering membutakan.', arti: 'Keadilan yang dicari dengan kepala dingin lebih tepat sasaran.' },
  { quote: 'Ketidakadilan di mana pun adalah ancaman bagi keadilan di mana-mana.', arti: 'Keadilan bersifat universal dan tidak mengenal batas.' },
  { quote: 'Orang yang tidak tahu haknya mudah menjadi korban ketidakadilan.', arti: 'Pengetahuan tentang hak adalah benteng pertama keadilan.' },
  { quote: 'Berani jujur di tengah kebohongan massal adalah keberanian terbesar.', arti: 'Kejujuran di lingkungan yang korup butuh keberanian luar biasa.' },
  { quote: 'Jangan hanya menuntut keadilan untuk dirimu sendiri, perjuangkan juga untuk orang lain.', arti: 'Keadilan sejati bersifat universal bukan egois.' },
  { quote: 'Hukum yang sama harus diterapkan pada semua, tanpa melihat siapa yang melakukannya.', arti: 'Keadilan tidak boleh pandang bulu.' },
  { quote: 'Keberanian untuk berkata tidak pada ketidakadilan adalah awal dari perubahan.', arti: 'Penolakan terhadap ketidakadilan adalah benih perubahan.' },
  { quote: 'Yang kuat seharusnya melindungi yang lemah, bukan menginjaknya.', arti: 'Kekuatan sejati digunakan untuk keadilan.' },
  { quote: 'Memaafkan bukan berarti melupakan, tapi memilih untuk tidak membiarkan luka itu menguasai hidupmu.', arti: 'Memaafkan adalah keadilan untuk diri sendiri.' },
  { quote: 'Jangan diam saat melihat yang salah, karena diammu adalah bagian dari masalah.', arti: 'Sikap pasif terhadap ketidakadilan memperparah keadaan.' },
  { quote: 'Keadilan sejati tidak memandang warna kulit, agama, atau status sosial.', arti: 'Keadilan bersifat universal dan merata.' },
  { quote: 'Setiap orang berhak atas kesempatan yang sama untuk membuktikan dirinya.', arti: 'Kesempatan yang setara adalah wujud keadilan.' },
  { quote: 'Pelaku kejahatan takut pada dua hal: hukum yang tegas dan nurani yang jujur.', arti: 'Hukum dan moral adalah dua pilar keadilan.' },
  { quote: 'Keadilan bukan tentang siapa yang menang, tapi tentang siapa yang benar.', arti: 'Kebenaran harus di atas kemenangan.' },
  { quote: 'Lebih baik membebaskan seribu orang bersalah daripada menghukum satu orang yang tidak bersalah.', arti: 'Asas kehati-hatian dalam penegakan hukum sangat penting.' },
  { quote: 'Jangan gunakan kekuasaan untuk menekan kebenaran, karena kebenaran akan selalu muncul.', arti: 'Kebenaran tidak bisa dikubur selamanya.' },
  { quote: 'Transparansi adalah musuh terbesar korupsi dan ketidakadilan.', arti: 'Keterbukaan adalah kunci tegaknya keadilan.' },
  { quote: 'Rakyat yang terdidik adalah penjaga keadilan yang paling tangguh.', arti: 'Pendidikan adalah fondasi dari masyarakat yang adil.' },
  { quote: 'Tidak ada yang lebih melemahkan sebuah bangsa selain ketidakadilan yang terus dibiarkan.', arti: 'Ketidakadilan yang dibiarkan akan menghancurkan bangsa dari dalam.' },
  { quote: 'Keadilan dimulai dari rumah, dari cara kita memperlakukan orang-orang terdekat kita.', arti: 'Keadilan harus dimulai dari lingkungan terkecil.' },
  { quote: 'Jangan jadikan perbedaan sebagai alasan untuk berlaku tidak adil.', arti: 'Perbedaan bukan pembenaran atas ketidakadilan.' },
  { quote: 'Mereka yang berjuang untuk keadilan mungkin tidak selalu menang, tapi mereka tidak pernah kalah sepenuhnya.', arti: 'Perjuangan untuk keadilan selalu meninggalkan jejak yang berarti.' },
  { quote: 'Keadilan adalah kompas moral yang harus selalu kita pegang, terutama saat situasi memaksamu untuk menyimpang.', arti: 'Berpegang pada keadilan di situasi sulit adalah ujian karakter sejati.' },
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