const meta = {
  param: '',
  desc: 'Quotes bacot dan celotehan random beserta artinya',
  placeholder: ''
}

const quotes = [
  { quote: 'Aku bukan orang yang banyak bicara. Ini saja sudah ribuan kata yang aku ucapkan hari ini.', arti: 'Ironi orang yang mengaku pendiam tapi nyatanya cerewet.' },
  { quote: 'Mulutku memang nggak ada filternya, tapi setidaknya aku jujur.', arti: 'Pembelaan klasik orang yang suka bacot tanpa mikir dulu.' },
  { quote: 'Maaf, otakku lagi loading. Mulutku duluan yang jalan.', arti: 'Ngomong sebelum berpikir adalah kebiasaan yang sangat umum.' },
  { quote: 'Aku bisa diam, tapi itu butuh energi yang sangat besar dan aku lagi hemat.', arti: 'Diam itu butuh effort, makanya banyak yang memilih terus ngomong.' },
  { quote: 'Kata siapa diam itu emas? Aku udah ngomong dan dapat lebih dari emas.', arti: 'Bantahan kreatif untuk pepatah diam adalah emas.' },
  { quote: 'Pendapatku banyak, waktu kalian terbatas. Jadi dengarkan baik-baik ya.', arti: 'Pernyataan percaya diri dari orang yang memang suka bacot.' },
  { quote: 'Aku tidak cerewet, aku hanya punya banyak informasi penting yang perlu dibagikan segera.', arti: 'Rebranding kata cerewet menjadi sesuatu yang terdengar lebih profesional.' },
  { quote: 'Kalau kamu minta aku diam, siapkan hati untuk kalimat terakhir yang sangat panjang.', arti: 'Orang yang bacot selalu punya last word yang tidak ada habisnya.' },
  { quote: 'Jangan salah, aku bisa diam. Cuma lagi tidak mau aja sekarang.', arti: 'Perbedaan antara tidak bisa dan tidak mau itu penting.' },
  { quote: 'Teorinya sederhana: kalau tidak diucapkan, bagaimana orang tahu?', arti: 'Alasan logis untuk terus berbicara walau tidak diminta.' },
  { quote: 'Mulutku bukan keran yang bisa ditutup sembarangan.', arti: 'Pernyataan tegas dari seseorang yang memang tidak bisa diam.' },
  { quote: 'Aku sudah coba diam tadi. Terasa seperti setahun padahal baru 10 detik.', arti: 'Bagi yang suka bacot, diam terasa sangat lama dan menyiksa.' },
  { quote: 'Bukannya aku tidak bisa mendengar, aku hanya lebih suka berbicara.', arti: 'Jujur mengakui lebih senang ngomong daripada mendengar.' },
  { quote: 'Kamu bilang aku terlalu banyak bicara? Itu baru permulaan.', arti: 'Ancaman manis dari orang yang memang tidak ada batasnya.' },
  { quote: 'Mulutku itu seperti browser dengan seribu tab terbuka, semuanya berbicara sekaligus.', arti: 'Analogi tepat untuk orang yang pikirannya tidak pernah berhenti.' },
  { quote: 'Aku tidak gosip, aku hanya berbagi informasi yang belum terverifikasi.', arti: 'Eufemisme kreatif untuk kebiasaan bergosip.' },
  { quote: 'Setiap kalimatku penting. Kamu yang belum siap mendengarnya saja.', arti: 'Percaya diri level tertinggi dari seorang pembicara aktif.' },
  { quote: 'Kata-kataku itu seperti air bah, susah dibendung kalau sudah mulai.', arti: 'Pengakuan jujur bahwa sekali mulai ngomong susah berhenti.' },
  { quote: 'Diam itu indah katanya. Tapi indah versi siapa? Bukan versiku.', arti: 'Menolak filosofi diam dengan cara yang khas.' },
  { quote: 'Aku sedang berbicara ini untuk kepentingan kita bersama. Jadi tolong dengarkan.', arti: 'Justifikasi mulia untuk kebiasaan bacot yang tidak ada habisnya.' },
  { quote: 'Maaf ya kalau kepanjangan. Tapi ini versi ringkasnya lho.', arti: 'Ketika versi ringkas pun masih sangat panjang.' },
  { quote: 'Orang bilang think before you speak. Aku speak before I think, lebih efisien.', arti: 'Membalik prinsip komunikasi yang baik dengan penuh percaya diri.' },
  { quote: 'Aku cuma mau bilang satu hal lagi. Yang terakhir ini aku janji.', arti: 'Janji yang tidak pernah ditepati oleh orang yang suka bacot.' },
  { quote: 'Kalau ada lomba ngomong, aku belum tentu menang. Tapi aku pasti finalis.', arti: 'Rendah hati tapi tetap mengakui kemampuan berbicara yang luar biasa.' },
  { quote: 'Diam itu menyiksa. Ngomong itu melegakan. Jadi aku pilih melegakan.', arti: 'Logika sederhana yang menjelaskan kenapa selalu bacot.' },
  { quote: 'Aku tidak bisa tidak berkomentar. Itu bukan sifatku.', arti: 'Mengakui dengan tulus bahwa diam bukan bagian dari karakter diri.' },
  { quote: 'Sesekali aku ingin diam, tapi mulutku selalu punya agenda sendiri.', arti: 'Mulut yang terasa hidup mandiri tanpa kontrol dari pikiran.' },
  { quote: 'Kamu lelah mendengarku? Aku tidak lelah bicara, jadi kita lanjut ya.', arti: 'Ketidakseimbangan antara stamina berbicara dan mendengar.' },
  { quote: 'Pikiranku penuh dan satu-satunya cara mengurangi bebannya adalah dengan ngomong.', arti: 'Berbicara sebagai mekanisme coping yang sangat aktif.' },
  { quote: 'Aku tidak cerewet. Aku hanya komunikatif di atas rata-rata.', arti: 'Mendefinisikan ulang cerewet menjadi kelebihan komunikasi.' },
  { quote: 'Kamu tahu tidak, kata-kata itu seperti nafas bagiku. Aku perlu terus mengeluarkannya.', arti: 'Berbicara adalah kebutuhan dasar bagi orang yang suka bacot.' },
  { quote: 'Aku sudah bilang ini tadi kan? Oh belum? Oke aku ulangi dari awal.', arti: 'Mengulang cerita yang sama berkali-kali adalah ciri khas pembicara aktif.' },
  { quote: 'Mereka bilang less is more. Tapi dalam kasusku, more is more.', arti: 'Menolak prinsip minimalis dalam berkomunikasi.' },
  { quote: 'Pendapatku mungkin tidak diminta, tapi tetap perlu didengar.', arti: 'Memberikan pendapat tanpa ditanya adalah seni tersendiri.' },
  { quote: 'Saat aku diam, itu artinya aku sedang mengumpulkan amunisi kata-kata berikutnya.', arti: 'Diam bagi orang yang bacot hanyalah jeda sebelum serangan berikutnya.' },
  { quote: 'Aku tidak pernah kehabisan bahan omongan. Kreativitasku tak terbatas dalam hal ini.', arti: 'Kemampuan menemukan topik pembicaraan kapan pun dan di mana pun.' },
  { quote: 'Bicara itu gratis. Jadi kenapa harus hemat?', arti: 'Logika ekonomi yang diterapkan dalam komunikasi.' },
  { quote: 'Mungkin aku memang bawel, tapi setidaknya kamu tidak akan pernah bosan bersamaku.', arti: 'Sisi positif dari kebiasaan bacot yang tidak ada habisnya.' },
  { quote: 'Aku tidak gosip, aku hanya melakukan investigasi sosial secara verbal.', arti: 'Cara fancy untuk menggambarkan kebiasaan bergosip.' },
  { quote: 'Kalau kata-kataku bisa ditimbang, beratnya mungkin melebihi badanku sendiri.', arti: 'Gambaran betapa banyaknya kata-kata yang sudah dikeluarkan.' },
  { quote: 'Orang introvert ngisi energi dengan sendirian. Aku ngisi energi dengan ngomong terus.', arti: 'Cara unik ekstrovert yang sangat verbal dalam mengisi ulang energi.' },
  { quote: 'Aku punya hak atas kebebasan berbicara, dan aku sangat serius menggunakannya.', arti: 'Menggunakan hak asasi sebagai pembenaran untuk terus bacot.' },
  { quote: 'Mereka minta aku singkat. Ini sudah singkat versi aku.', arti: 'Ketika singkat versi diri sendiri masih sangat panjang bagi orang lain.' },
  { quote: 'Kata-kataku bukan polusi udara, ini kontribusi intelektual.', arti: 'Memuliakan kebiasaan banyak bicara dengan istilah yang lebih terhormat.' },
  { quote: 'Aku tidak suka silence yang awkward, jadi aku isi dengan kata-kata yang bermanfaat.', arti: 'Motivasi sosial yang baik di balik kebiasaan mengisi keheningan.' },
  { quote: 'Kamu tidak harus setuju dengan semua yang aku bilang. Tapi kamu tetap harus mendengarnya.', arti: 'Syarat komunikasi yang cukup satu arah dari orang yang suka bicara.' },
  { quote: 'Aku bicara banyak bukan karena tidak ada yang mau dengar, tapi karena terlalu banyak yang ingin aku sampaikan.', arti: 'Positif thinking di balik kebiasaan bacot yang tidak ada habisnya.' },
  { quote: 'Jangan khawatir, aku hampir selesai. Tinggal beberapa poin lagi.', arti: 'Beberapa poin yang ternyata masih sangat banyak.' },
  { quote: 'Aku introspeksi dan sadar: aku memang banyak bicara. Tapi aku damai dengan itu.', arti: 'Menerima diri sendiri dengan lapang dada termasuk kekurangannya.' },
  { quote: 'Hidup terlalu singkat untuk diam. Jadi aku gunakan setiap detiknya untuk berbicara.', arti: 'Filosofi hidup yang menjadikan berbicara sebagai prioritas utama.' },
  { quote: 'Aku tidak mengoceh, aku sedang melakukan presentasi kehidupan secara real-time.', arti: 'Mendefinisikan ulang ocehan menjadi sesuatu yang terdengar profesional.' },
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