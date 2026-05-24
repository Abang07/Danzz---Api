const meta = {
  param: '',
  desc: 'Quotes bucin beserta artinya',
  placeholder: ''
}

const quotes = [
  { quote: 'Kamu itu seperti WiFi, aku selalu mencari sinyalmu.', arti: 'Kamu selalu dicari-cari.' },
  { quote: 'Cinta itu buta, tapi tetap bisa stalking Instagram kamu.', arti: 'Cinta di era digital.' },
  { quote: 'Aku bukan penjaga, tapi aku selalu ingin tahu kamu baik-baik saja.', arti: 'Peduli tanpa batas.' },
  { quote: 'Kalau kamu hujan, aku mau jadi tanah yang selalu siap menerimamu.', arti: 'Selalu siap ada untukmu.' },
  { quote: 'Kamu bukan prioritasku, kamu adalah satu-satunya.', arti: 'Kamu di atas segalanya.' },
  { quote: 'Tiap malam aku tidur sambil berharap besok masih bisa lihat kamu.', arti: 'Rindu yang mendalam.' },
  { quote: 'Aku tidak butuh peta, karena semua jalanku berujung ke kamu.', arti: 'Kamu adalah tujuanku.' },
  { quote: 'Kamu itu seperti baterai HP, kalau jauh aku langsung low.', arti: 'Kamu sumber energiku.' },
  { quote: 'Dari sekian banyak notifikasi, mention kamu yang paling aku tunggu.', arti: 'Kamu yang paling spesial.' },
  { quote: 'Aku bisa hidup tanpa makan sehari, tapi tidak bisa tanpa mikirkan kamu.', arti: 'Kamu selalu ada di pikiran.' },
  { quote: 'Katanya jangan bucin, tapi gimana kalau yang kamu cintai memang segalanya?', arti: 'Cinta sejati tidak bisa ditahan.' },
  { quote: 'Aku tidak minta bulan, cukup kamu yang selalu ada di sisiku.', arti: 'Kamu sudah lebih dari cukup.' },
  { quote: 'Setiap lagu yang aku dengar, ujung-ujungnya mengingatkanku padamu.', arti: 'Kamu ada di mana-mana.' },
  { quote: 'Cemburu bukan karena tidak percaya, tapi karena tidak mau kehilanganmu.', arti: 'Cemburu tanda sayang.' },
  { quote: 'Kamu satu-satunya orang yang bisa buat aku senyum tanpa alasan.', arti: 'Kamu kebahagiaan tanpa sebab.' },
  { quote: 'Aku tidak butuh surga kalau kamu sudah ada di sini.', arti: 'Kamu adalah surgaku.' },
  { quote: 'Jauh di mata, tapi selalu dekat di hati dan di pikiran.', arti: 'Jarak tidak memisahkan perasaan.' },
  { quote: 'Kamu tahu tidak? Mikirin kamu itu aktivitas favoritku.', arti: 'Kamu selalu di pikiran.' },
  { quote: 'Kalau rindu bisa dikirim, aku sudah spam kamu dari tadi.', arti: 'Rindu yang tidak tertahankan.' },
  { quote: 'Aku tidak minta sempurna, aku hanya minta kamu.', arti: 'Kamu sudah lebih dari sempurna.' },
  { quote: 'Di antara semua pilihan di dunia, aku selalu akan memilih kamu.', arti: 'Kamu pilihan utamaku.' },
  { quote: 'Satu pesan darimu bisa bikin hariku berubah 180 derajat.', arti: 'Pengaruhmu luar biasa besar.' },
  { quote: 'Kamu itu seperti kopi pagi, tanpa kamu aku tidak bisa mulai hari.', arti: 'Kamu bagian dari rutinitasku.' },
  { quote: 'Aku tidak takut gelap, yang aku takutkan adalah dunia tanpamu.', arti: 'Kamu adalah cahayaku.' },
  { quote: 'Kalau hati bisa di-screenshot, setiap momentnya ada kamu.', arti: 'Kamu mengisi seluruh hatiku.' },
  { quote: 'Bukan karena tidak ada pilihan lain, tapi karena kamu memang yang terbaik.', arti: 'Kamu dipilih dari hati.' },
  { quote: 'Aku tidak tahu cara berhenti memikirkanmu.', arti: 'Kamu selalu ada di kepala.' },
  { quote: 'Kamu itu bukan kebetulan, kamu adalah jawaban dari doaku.', arti: 'Kamu takdir yang indah.' },
  { quote: 'Satu senyummu bisa bayar semua lelahku seharian.', arti: 'Senyummu sangat berharga.' },
  { quote: 'Aku tidak minta waktu yang lama, aku minta selamanya bersamamu.', arti: 'Ingin selalu bersamamu.' },
  { quote: 'Waktu terasa lambat kalau tidak ada kabar darimu.', arti: 'Kamu yang membuat waktu terasa hidup.' },
  { quote: 'Aku tidak butuh bintang di langit, cukup sinar matamu saja.', arti: 'Kamu lebih indah dari bintang.' },
  { quote: 'Kalau bisa kuputar waktu, aku ingin terus berada di momen bersamamu.', arti: 'Setiap momen bersamamu sangat berharga.' },
  { quote: 'Namamu adalah kata pertama yang aku pikirkan saat bangun tidur.', arti: 'Kamu hal pertama di pikiranku setiap hari.' },
  { quote: 'Aku tidak takut jatuh asal kamu yang ada di bawah untuk menangkapku.', arti: 'Kamu adalah rasa amanku.' },
  { quote: 'Sejauh apapun pergi, hatiku selalu pulang ke kamu.', arti: 'Kamu adalah rumahku.' },
  { quote: 'Kamu bukan sekadar seseorang, kamu adalah alasanku tersenyum hari ini.', arti: 'Kamu sumber kebahagiaanku.' },
  { quote: 'Bahkan dalam keramaian, mataku selalu mencari kamu duluan.', arti: 'Kamu yang paling pertama kulihat.' },
  { quote: 'Aku tidak pernah bosan melihatmu, setiap hari selalu ada hal baru yang membuatku kagum.', arti: 'Kamu selalu menarik di mataku.' },
  { quote: 'Ribuan kata tidak cukup untuk menjelaskan betapa pentingnya kamu bagiku.', arti: 'Perasaanku padamu melampaui kata-kata.' },
  { quote: 'Kamu adalah playlist favoritku, semua lagunya pas di hati.', arti: 'Kamu cocok di setiap suasana hatiku.' },
  { quote: 'Aku tidak takut masa depan karena aku tahu kamu ada di sana.', arti: 'Kamu adalah kepastian di masa depanku.' },
  { quote: 'Bahkan ketika kita bertengkar, aku masih memilihmu.', arti: 'Cintaku tidak bersyarat.' },
  { quote: 'Kamu membuat hal yang biasa terasa luar biasa.', arti: 'Kehadiranmu mengubah segalanya.' },
  { quote: 'Aku tidak perlu kenangan indah lain, yang ada bersamamu sudah lebih dari cukup.', arti: 'Kenangan bersamamu adalah yang terbaik.' },
  { quote: 'Kalau bisa memilih lahir lagi, aku tetap ingin bertemu kamu.', arti: 'Di kehidupan manapun aku akan memilihmu.' },
  { quote: 'Doaku selalu ada namamu di dalamnya.', arti: 'Kamu termasuk dalam hal terpenting yang kuminta kepada Tuhan.' },
  { quote: 'Aku sudah di titik di mana kehilanganmu terasa lebih menakutkan dari apapun.', arti: 'Kamu sangat berarti bagiku.' },
  { quote: 'Bukan karena tidak bisa hidup tanpamu, tapi karena hidup terasa lebih berarti bersamamu.', arti: 'Kamu menambah makna pada hidupku.' },
  { quote: 'Aku ingin menjadi alasan kenapa kamu tersenyum setiap harinya.', arti: 'Kebahagiaanmu adalah tujuanku.' },
  { quote: 'Kamu adalah satu hal yang tidak pernah aku sesali dalam hidupku.', arti: 'Memilihmu adalah keputusan terbaikku.' },
  { quote: 'Setiap detik bersamamu terasa seperti hadiah yang tidak aku minta tapi sangat aku syukuri.', arti: 'Kebersamaan kita adalah berkah.' },
  { quote: 'Aku tidak butuh banyak hal untuk bahagia, cukup tahu kamu baik-baik saja.', arti: 'Kebahagiaanmu adalah kebahagiaanku.' },
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