const meta = {
  param: '',
  desc: 'Quotes nyindir beserta artinya',
  placeholder: ''
}

const quotes = [
  { quote: 'Baik-baik saja kok, cuma lagi belajar ikhlas sama orang yang pura-pura baik.', arti: 'Sindiran halus untuk orang yang munafik.' },
  { quote: 'Kalau kamu tidak bisa loyal, minimal jangan pura-pura bisa.', arti: 'Kemunafikan lebih menyakitkan dari ketidaksetiaan.' },
  { quote: 'Hebat ya, bisa tersenyum ke mukaku tapi tikam dari belakang.', arti: 'Sindiran untuk orang yang bermuka dua.' },
  { quote: 'Orang yang sering membicarakan orang lain biasanya punya hidup yang kurang menarik untuk diceritakan.', arti: 'Bergosip adalah tanda hidup yang kurang produktif.' },
  { quote: 'Kalau kamu selalu punya masalah dengan semua orang, mungkin masalahnya bukan semua orang.', arti: 'Introspeksi diperlukan saat konflik terus berulang.' },
  { quote: 'Kasihan ya, sudah keras kepala tapi otaknya kosong.', arti: 'Sindiran untuk orang yang ngotot tapi tidak berdasar.' },
  { quote: 'Saya tidak anti sosial, saya hanya selektif dengan drama yang ingin saya ikuti.', arti: 'Memilih tidak bergaul dengan orang toxic adalah hak.' },
  { quote: 'Terima kasih sudah jadi bahan pelajaran hidupku, meski kamu sendiri tidak belajar apa-apa.', arti: 'Sindiran untuk orang yang tidak berkembang.' },
  { quote: 'Semoga suatu hari kamu diperlakukan seperti cara kamu memperlakukan orang lain.', arti: 'Karma akan datang pada waktunya.' },
  { quote: 'Kamu sibuk ngurusin hidup orang lain, sementara hidupmu sendiri berantakan.', arti: 'Terlalu ikut campur urusan orang tanda tidak punya kesibukan sendiri.' },
  { quote: 'Luar biasa, bisa berbicara tentang kejujuran sambil terus berbohong.', arti: 'Ironi orang yang berkhotbah tentang hal yang tidak dilakukannya.' },
  { quote: 'Tidak perlu balas dendam, cukup tunggu saja. Hidup lebih adil dari yang kamu kira.', arti: 'Karma lebih efektif dari balas dendam.' },
  { quote: 'Suka banget ngasih saran ya, padahal hidupnya sendiri masih perlu banyak dibenerin.', arti: 'Lebih mudah mengkritik orang lain daripada introspeksi diri.' },
  { quote: 'Kalau sudah tidak ada gunanya, tiba-tiba juga tidak ada orangnya.', arti: 'Sindiran untuk orang yang hadir hanya saat butuh.' },
  { quote: 'Wow, konsisten ya. Konsisten salah terus.', arti: 'Sarkasme untuk orang yang terus-menerus membuat kesalahan yang sama.' },
  { quote: 'Maaf ya kalau hidupku tidak sesuai ekspektasimu. Aku juga tidak minta pendapatmu.', arti: 'Sindiran untuk orang yang terlalu ikut campur.' },
  { quote: 'Kamu tidak perlu mematikan cahaya orang lain agar kamu terlihat bersinar.', arti: 'Menjatuhkan orang lain tidak membuatmu lebih tinggi.' },
  { quote: 'Terus bicara di belakangku, itu artinya kamu selalu di belakangku.', arti: 'Orang yang bergosip selalu ada di posisi yang lebih rendah.' },
  { quote: 'Semoga harimu seindah kepribadianmu.', arti: 'Sarkasme manis untuk orang yang bersikap buruk.' },
  { quote: 'Aku tahu aku tidak sempurna, setidaknya aku tidak berpura-pura sempurna sepertimu.', arti: 'Kejujuran tentang kekurangan lebih baik dari kepura-puraan.' },
  { quote: 'Kamu boleh meremehkanku, itu artinya kamu masih memperhatikanku.', arti: 'Perhatian negatif tetap perhatian.' },
  { quote: 'Pendapatmu sangat berharga. Tapi tidak aku butuhkan.', arti: 'Sopan tapi tegas menolak campur tangan orang lain.' },
  { quote: 'Rajin banget ya ngitung kesalahan orang lain, padahal kelemahanmu sendiri segudang.', arti: 'Menghitung kesalahan orang lain sambil mengabaikan diri sendiri adalah kemunafikan.' },
  { quote: 'Iya iya, saya yang salah. Kamu yang benar. Sudah puas?', arti: 'Sindiran sarkastis untuk orang yang selalu ingin menang sendiri.' },
  { quote: 'Capek juga ya pura-pura peduli terus.', arti: 'Kepedulian palsu itu melelahkan dan terlihat jelas.' },
  { quote: 'Bicaramu setinggi langit, kenyataanmu masih di bawah tanah.', arti: 'Omong besar tanpa bukti adalah tanda ketidakmatangan.' },
  { quote: 'Orang yang paling keras berteriak tentang kesetiaan biasanya adalah yang paling tidak setia.', arti: 'Yang paling lantang berkoar biasanya yang paling perlu dipertanyakan.' },
  { quote: 'Hidupku memang tidak sempurna, tapi setidaknya aku tidak hidup dengan pura-pura.', arti: 'Keaslian lebih berharga dari kesempurnaan palsu.' },
  { quote: 'Aneh ya, teman pas senang banyak, pas susah hitung sendiri.', arti: 'Sindiran untuk teman yang hanya ada saat situasi menguntungkan.' },
  { quote: 'Jangan khawatir, aku sudah terbiasa diabaikan oleh orang-orang yang tidak penting.', arti: 'Sarkasme balik untuk orang yang merasa dirinya penting.' },
  { quote: 'Kamu tahu tidak? Diam lebih elegan dari berbohong.', arti: 'Lebih baik diam daripada berkata hal yang tidak jujur.' },
  { quote: 'Makin keras kamu menjatuhkanku, makin kuat aku bangkitnya. Terima kasih ya.', arti: 'Tekanan dari orang lain bisa menjadi bahan bakar untuk bangkit.' },
  { quote: 'Ah iya, lupa. Kamu memang selalu tahu segalanya. Maaf sudah punya pendapat sendiri.', arti: 'Sarkasme untuk orang yang merasa paling tahu.' },
  { quote: 'Kudengar kamu sibuk membicarakanku. Senang rasanya masih jadi topik menarik bagimu.', arti: 'Balik sindiran dengan rasa percaya diri.' },
  { quote: 'Kamu boleh bilang aku aneh. Tapi setidaknya aku aneh dengan cara yang jujur.', arti: 'Lebih baik aneh tapi jujur daripada normal tapi palsu.' },
  { quote: 'Terima kasih sudah selalu punya waktu untuk mengkritikku, padahal hidupmu juga banyak yang perlu diperbaiki.', arti: 'Mengkritik orang sambil mengabaikan kekurangan diri sendiri.' },
  { quote: 'Kamu tidak perlu menjatuhkan orang lain untuk naik, kecuali tangga hidupmu memang pendek.', arti: 'Orang yang menjatuhkan orang lain tidak punya kemampuan untuk naik sendiri.' },
  { quote: 'Semoga besok kamu jadi orang yang lebih baik dari omong kosongmu hari ini.', arti: 'Harapan sarkastis agar kata-kata besar dibuktikan.' },
  { quote: 'Aku tidak punya waktu untuk membencimu, hidupku terlalu sibuk dengan hal yang lebih produktif.', arti: 'Tidak peduli dengan kebencian orang adalah tanda kedewasaan.' },
  { quote: 'Kamu selalu punya alasan untuk setiap kesalahanmu. Kreativitasmu luar biasa memang.', arti: 'Sarkasme untuk orang yang selalu mencari pembenaran.' },
  { quote: 'Bicara itu mudah, membuktikannya yang susah. Dan kamu sudah tahu kamu jago yang mana.', arti: 'Omong besar tanpa tindakan adalah tanda ketidakmampuan.' },
  { quote: 'Baik sekali kamu ya, selalu ada waktu untuk urusan orang lain. Urusanmu sendiri bagaimana?', arti: 'Terlalu fokus pada urusan orang lain adalah pelarian dari urusan sendiri.' },
  { quote: 'Aku dengar kamu tidak suka padaku. Sayang sekali. Aku tidak terlalu memikirkanmu.', arti: 'Ketidakpedulian adalah respons terbaik untuk kebencian.' },
  { quote: 'Kalau nanti kamu butuh, aku tidak kemana-mana. Tapi mungkin kamu perlu lebih dari sekadar butuh.', arti: 'Sindiran untuk orang yang hanya datang saat perlu.' },
  { quote: 'Sudah biasa kok. Orang yang paling banyak bicara biasanya yang paling sedikit melakukan.', arti: 'Tindakan lebih bermakna dari kata-kata.' },
  { quote: 'Maaf kalau aku tidak bereaksi seperti yang kamu harapkan. Aku memang tidak sedramatis dirimu.', arti: 'Tidak ikut drama orang lain adalah tanda kedewasaan.' },
  { quote: 'Lucu ya, yang paling sering bilang jangan egois biasanya yang paling egois.', arti: 'Ironi orang yang menuduhkan pada orang lain apa yang ada pada dirinya.' },
  { quote: 'Kamu boleh melupakanku. Tapi luka yang kamu tinggalkan tidak bisa kamu ambil kembali.', arti: 'Perbuatan meninggalkan jejak meski orangnya sudah pergi.' },
  { quote: 'Terima kasih sudah mengajariku bahwa tidak semua orang yang tersenyum padamu adalah temanmu.', arti: 'Pengkhianatan mengajarkan pentingnya menilai orang dengan cermat.' },
  { quote: 'Kamu tidak perlu repot-repot berbohong, kenyataannya sudah cukup bicara sendiri.', arti: 'Fakta selalu lebih jelas dari kebohongan.' },
  { quote: 'Hidupmu pasti sangat sibuk ya, sampai-sampai sibuk ngurusin hidup orang lain.', arti: 'Sarkasme untuk orang yang suka ikut campur.' },
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