const meta = {
  param: '',
  desc: 'Kata-kata ilham dan motivasi beserta artinya',
  placeholder: ''
}

const quotes = [
  { quote: 'Mulailah dari mana kamu berada, gunakan apa yang kamu punya, lakukan apa yang kamu bisa.', arti: 'Jangan tunda, mulai sekarang dengan kondisi apapun.' },
  { quote: 'Gagal itu biasa, menyerah itu pilihan.', arti: 'Kegagalan bukan akhir, menyerah adalah kekalahan sesungguhnya.' },
  { quote: 'Orang sukses bukan yang tidak pernah jatuh, tapi yang selalu bangkit.', arti: 'Ketangguhan lebih penting dari kesempurnaan.' },
  { quote: 'Jangan bandingkan perjalananmu dengan orang lain, kamu beda jalur.', arti: 'Fokus pada prosesmu sendiri.' },
  { quote: 'Satu langkah ke depan lebih baik dari seribu rencana di kepala.', arti: 'Aksi lebih bermakna dari sekadar rencana.' },
  { quote: 'Waktu tidak akan kembali, tapi penyesalan bisa dicegah mulai sekarang.', arti: 'Manfaatkan waktu sebaik mungkin.' },
  { quote: 'Bukan seberapa cepat kamu sampai, tapi seberapa kuat kamu bertahan di perjalanan.', arti: 'Konsistensi lebih penting dari kecepatan.' },
  { quote: 'Hal besar dimulai dari keberanian melakukan hal kecil.', arti: 'Jangan remehkan langkah kecilmu.' },
  { quote: 'Dirimu hari ini adalah hasil dari keputusanmu kemarin.', arti: 'Setiap keputusan membentuk masa depanmu.' },
  { quote: 'Kesulitan bukan penghalang, itu adalah ujian kelayakanmu.', arti: 'Masalah adalah tanda kamu sedang berkembang.' },
  { quote: 'Jangan tunggu motivasi datang, mulai duluan nanti motivasi ikut.', arti: 'Aksi adalah kunci, bukan menunggu.' },
  { quote: 'Mimpi tanpa usaha hanya khayalan. Usaha tanpa mimpi hanya lelah.', arti: 'Mimpi dan usaha harus berjalan bersama.' },
  { quote: 'Kamu tidak akan tahu batasmu kalau tidak pernah mengujinya.', arti: 'Tantang dirimu untuk tumbuh.' },
  { quote: 'Versi terbaik dirimu sedang menunggu di sisi lain rasa takutmu.', arti: 'Keberanian adalah kunci bertumbuh.' },
  { quote: 'Tidak ada yang sia-sia dari setiap usaha yang kamu lakukan dengan sungguh-sungguh.', arti: 'Semua usaha punya hasilnya masing-masing.' },
  { quote: 'Hidupmu terlalu berharga untuk dihabiskan dengan membandingkan diri ke orang lain.', arti: 'Fokuslah pada dirimu sendiri.' },
  { quote: 'Perubahan dimulai dari keberanian untuk jujur pada diri sendiri.', arti: 'Kejujuran diri adalah awal dari pertumbuhan.' },
  { quote: 'Kamu lebih kuat dari yang kamu bayangkan, lebih berani dari yang kamu sadari.', arti: 'Percaya pada kemampuan diri sendiri.' },
  { quote: 'Setiap hari adalah kesempatan baru untuk menjadi lebih baik dari kemarin.', arti: 'Hari baru adalah peluang baru.' },
  { quote: 'Jangan takut lambat, yang perlu ditakuti adalah diam di tempat.', arti: 'Progress sekecil apapun tetap progress.' },
  { quote: 'Ilmu tanpa amal seperti pohon tanpa buah.', arti: 'Pengetahuan harus diaplikasikan.' },
  { quote: 'Orang yang tidak pernah salah adalah orang yang tidak pernah mencoba.', arti: 'Kesalahan adalah bukti kamu berani mencoba.' },
  { quote: 'Keberhasilan bukan milik orang yang tidak pernah gagal, tapi yang tidak pernah berhenti.', arti: 'Terus bergerak meski pernah jatuh.' },
  { quote: 'Bersyukur bukan karena hidup mudah, tapi karena kamu kuat menghadapinya.', arti: 'Syukur di tengah kesulitan adalah kekuatan.' },
  { quote: 'Masa depan milik mereka yang percaya pada keindahan mimpi-mimpinya.', arti: 'Mimpi adalah bahan bakar masa depan.' },
  { quote: 'Disiplin adalah jembatan antara mimpi dan pencapaian.', arti: 'Konsistensi setiap hari membangun segalanya.' },
  { quote: 'Satu kebiasaan baik yang dijalani setiap hari lebih kuat dari seribu niat yang tertunda.', arti: 'Konsistensi mengalahkan niat.' },
  { quote: 'Jangan khawatir tentang apa yang orang pikirkan, mereka juga sibuk khawatir tentang diri mereka.', arti: 'Fokus pada diri sendiri, bukan opini orang.' },
  { quote: 'Kegagalan adalah guru terbaik yang paling jujur.', arti: 'Belajar dari kegagalan adalah investasi terbaik.' },
  { quote: 'Kamu bukan hasil keadaanmu, kamu adalah hasil sikapmu terhadap keadaan itu.', arti: 'Sikap menentukan segalanya.' },
  { quote: 'Berani bermimpi besar, berani juga bekerja keras untuk mewujudkannya.', arti: 'Mimpi besar butuh usaha yang besar pula.' },
  { quote: 'Tidak ada jalan pintas menuju tempat yang berarti.', arti: 'Proses panjang adalah bagian dari perjalanan.' },
  { quote: 'Setiap ahli dulunya adalah pemula yang tidak menyerah.', arti: 'Ketekunan adalah kunci keahlian.' },
  { quote: 'Jangan nilai hari dari panen yang kamu dapat, tapi dari benih yang kamu tanam.', arti: 'Proses menanam lebih penting dari hasil.' },
  { quote: 'Kekuatan bukan tentang tidak pernah lelah, tapi tentang terus melangkah meski lelah.', arti: 'Melangkah meski lelah adalah kekuatan sejati.' },
  { quote: 'Hidup bukan soal menemukan dirimu, tapi menciptakan dirimu.', arti: 'Kamu bisa membentuk siapa dirimu.' },
  { quote: 'Kesuksesan adalah jumlah dari usaha-usaha kecil yang diulang setiap hari.', arti: 'Hal kecil yang konsisten menghasilkan hal besar.' },
  { quote: 'Percayalah pada prosesmu, bahkan ketika prosesnya menyakitkan.', arti: 'Proses yang sulit membentuk hasil yang luar biasa.' },
  { quote: 'Tidak ada kata terlambat untuk memulai, yang ada hanya terlambat untuk menyesal.', arti: 'Mulai saja dulu, jangan tunggu sempurna.' },
  { quote: 'Kamu tidak harus hebat untuk memulai, tapi kamu harus memulai untuk menjadi hebat.', arti: 'Langkah pertama adalah yang terpenting.' },
  { quote: 'Tantangan membuat kamu lebih kuat, bukan menghancurkanmu.', arti: 'Setiap tantangan adalah latihan untuk jiwa.' },
  { quote: 'Jangan biarkan hari kemarin mengambil terlalu banyak dari hari ini.', arti: 'Fokus pada hari ini, bukan masa lalu.' },
  { quote: 'Impianmu tidak akan kadaluarsa, kamu yang menentukan kapan mulai mengejarnya.', arti: 'Tidak ada kata terlambat untuk bermimpi.' },
  { quote: 'Karakter seseorang dibangun bukan saat kondisi mudah, tapi saat kondisi sulit.', arti: 'Kesulitan membentuk karakter terbaik.' },
  { quote: 'Lakukan hari ini apa yang orang lain tidak mau lakukan, agar besok kamu punya apa yang orang lain tidak punya.', arti: 'Kerja keras hari ini adalah investasi masa depan.' },
  { quote: 'Bukan masalah seberapa besar badainya, tapi seberapa kokoh kamu berdiri menghadapinya.', arti: 'Keteguhan hati lebih kuat dari badai apapun.' },
  { quote: 'Percaya diri bukan tentang merasa hebat, tapi tentang tidak berhenti meski merasa biasa.', arti: 'Terus melangkah adalah bentuk kepercayaan diri.' },
  { quote: 'Rezeki tidak akan salah alamat, selama kamu terus berusaha dan berdoa.', arti: 'Usaha dan doa adalah kunci rezeki.' },
  { quote: 'Yang membedakan orang biasa dan luar biasa hanya satu kata: konsisten.', arti: 'Konsistensi adalah pembeda terbesar.' },
  { quote: 'Jangan pernah meragukan kemampuanmu hanya karena orang lain meragukanmu.', arti: 'Percaya pada dirimu sendiri adalah fondasi segalanya.' },
  { quote: 'Hiduplah seolah setiap hari adalah hari pertama dan terakhirmu sekaligus.', arti: 'Jalani hidup dengan penuh dan bermakna.' },
  { quote: 'Kesabaran bukan tentang menunggu, tapi tentang bagaimana sikapmu saat menunggu.', arti: 'Sikap dalam menunggu menentukan hasilnya.' },
  { quote: 'Jadilah orang yang kamu butuhkan saat kamu masih kecil dulu.', arti: 'Tumbuh menjadi versi terbaik yang pernah kamu impikan.' },
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