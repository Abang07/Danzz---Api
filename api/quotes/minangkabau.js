const meta = {
  param: '',
  desc: 'Quotes peribahasa dan kata-kata Minangkabau beserta artinya',
  placeholder: ''
}

const quotes = [
  { quote: 'Alam takambang jadi guru.', arti: 'Alam terkembang menjadi guru. (Segala sesuatu di alam ini bisa dijadikan pelajaran hidup.)' },
  { quote: 'Adat basandi syarak, syarak basandi Kitabullah.', arti: 'Adat bersendikan syariat, syariat bersendikan Kitabullah. (Adat Minangkabau berlandaskan agama Islam.)' },
  { quote: 'Karatau madang di hulu, babuah babungo balun. Marantau bujang dahulu, di rumah paguno balun.', arti: 'Pohon madang di hulu belum berbuah dan berbunga. Merantaulah pemuda dahulu, di rumah belum ada gunanya. (Merantau adalah cara untuk menempa diri.)' },
  { quote: 'Baa di ateh, baa di bawah. Nan elok dipauik, nan buruak dibuang.', arti: 'Apa di atas, apa di bawah. Yang baik diambil, yang buruk dibuang. (Bijak dalam memilah mana yang baik dan buruk.)' },
  { quote: 'Nan buto pahambuih lasuang, nan pakak palapeh badie, nan lumpuah palatak jarami, nan kuaik pambaok baban, nan pandai tampek batanyo, nan cadiak lawan barundiang.', arti: 'Yang buta penghembus lesung, yang tuli pelepas bedil, yang lumpuh penaruh jerami, yang kuat pembawa beban, yang pandai tempat bertanya, yang cerdik lawan berunding. (Setiap orang punya perannya masing-masing sesuai kemampuannya.)' },
  { quote: 'Indak ado rotan akanyo pun jadi.', arti: 'Tidak ada rotan, akarpun jadi. (Dalam keterbatasan, gunakanlah apa yang ada.)' },
  { quote: 'Bajalan paliharo kaki, bakato paliharo lidah.', arti: 'Berjalan jaga kaki, berkata jaga lidah. (Hati-hati dalam bertindak dan berkata-kata.)' },
  { quote: 'Dima bumi dipijak, di sinan langik dijunjuang.', arti: 'Di mana bumi dipijak, di sana langit dijunjung. (Hormati adat dan budaya di mana pun kamu berada.)' },
  { quote: 'Nan kuriak iyolah kundi, nan merah iyolah sago, nan baik iyolah budi, nan indah iyolah baso.', arti: 'Yang belang ialah kundi, yang merah ialah saga, yang baik ialah budi, yang indah ialah bahasa. (Budi pekerti dan tutur kata yang baik adalah keindahan sejati.)' },
  { quote: 'Saciok bak ayam, sadanciang bak basi.', arti: 'Seciap seperti ayam, sedering seperti besi. (Harus kompak dan satu suara dalam mengambil keputusan.)' },
  { quote: 'Bingkisan tak dapek dibali, kalau indak ado pareso dalam diri.', arti: 'Hadiah tidak bisa dibeli, kalau tidak ada rasa malu dalam diri. (Kehormatan lebih berharga dari materi.)' },
  { quote: 'Elok nagari dek panghulu, elok rumah dek bundo kanduang.', arti: 'Baik negeri karena penghulu, baik rumah karena ibu kandung. (Pemimpin dan ibu adalah fondasi utama suatu komunitas.)' },
  { quote: 'Adat diisi, limbago dituang.', arti: 'Adat diisi, lembaga dituang. (Setiap tindakan harus sesuai dengan aturan yang berlaku.)' },
  { quote: 'Takuik mati mandi di pantai, takuik hiduik di dalam rumah.', arti: 'Takut mati mandi di pantai, takut hidup di dalam rumah. (Orang yang selalu takut tidak akan pernah maju.)' },
  { quote: 'Tibo di mato indak dipiciangkan, tibo di paruik indak dikampihkan.', arti: 'Tiba di mata tidak dipejamkan, tiba di perut tidak dikempiskan. (Harus jujur dan adil dalam segala hal.)' },
  { quote: 'Gadang di dalam, ketek di luar.', arti: 'Besar di dalam, kecil di luar. (Orang yang bijak tidak sombong memperlihatkan kelebihannya.)' },
  { quote: 'Nan tuo dihormati, nan ketek disayangi, nan samo gadang diharagoi.', arti: 'Yang tua dihormati, yang kecil disayangi, yang sebaya dihargai. (Tata krama dalam bermasyarakat harus diterapkan pada semua golongan.)' },
  { quote: 'Rancak di labuah, elok di rumah.', arti: 'Cantik di jalan, baik di rumah. (Penampilan luar harus sejalan dengan perilaku di dalam.)' },
  { quote: 'Batang terandam, pucuak mati, nak hiduik ka pucuaknyo.', arti: 'Batang terendam, pucuk mati, ingin hidup ke pucuknya. (Jangan lupakan akar dan asal-usulmu.)' },
  { quote: 'Lamak dek awak, katuju dek urang.', arti: 'Enak bagi kita, disukai orang lain. (Lakukan sesuatu yang memberi manfaat bagi semua pihak.)' },
  { quote: 'Kayu gadang di tangah padang, tampek balinduang di hari paneh, tampek batuduh di hari hujan.', arti: 'Pohon besar di tengah padang, tempat berlindung di hari panas, tempat bernaung di hari hujan. (Jadilah orang yang bisa diandalkan oleh semua orang.)' },
  { quote: 'Nan lalu indak kambali, nan lapuak indak manjadi.', arti: 'Yang lalu tidak kembali, yang lapuk tidak jadi. (Masa lalu tidak bisa diulangi, jangan terpaku padanya.)' },
  { quote: 'Duduak surang basampik-sampik, duduak basamo balapang-lapang.', arti: 'Duduk sendiri bersempit-sempit, duduk bersama berlapang-lapang. (Kebersamaan membuat segala sesuatu terasa lebih mudah.)' },
  { quote: 'Manantang mato hari, buto mato nyo. Manantang bana, riso hati nyo.', arti: 'Menatap matahari, buta matanya. Melawan kebenaran, gelisah hatinya. (Kebenaran tidak bisa dilawan selamanya.)' },
  { quote: 'Usah gadang di nan ketek, usah ketek di nan gadang.', arti: 'Jangan besar di yang kecil, jangan kecil di yang besar. (Tempatkan sesuatu sesuai proporsinya.)' },
  { quote: 'Pulang ka nan bana, babaliak ka nan benar.', arti: 'Kembali ke yang benar, balik ke yang benar. (Selalu kembalilah pada kebenaran dan keadilan.)' },
  { quote: 'Kato sapatah dipikiri, langkah salangkah diileki.', arti: 'Satu kata dipikir, satu langkah dipikirkan. (Hati-hatilah dalam berkata dan bertindak.)' },
  { quote: 'Maukua samo panjang, manimbang samo barek.', arti: 'Mengukur sama panjang, menimbang sama berat. (Berlaku adil dan setara kepada semua orang.)' },
  { quote: 'Bumi dipijak, langik dijunjuang, lauik dirantang, gunuang dirangkuah.', arti: 'Bumi dipijak, langit dijunjung, laut direntang, gunung dirangkul. (Menghormati alam dan lingkungan sekitar.)' },
  { quote: 'Kok bulat boleh digolongkan, kok picak boleh dilayangkan.', arti: 'Kalau bulat bisa digelindingkan, kalau pipih bisa dilayangkan. (Segala sesuatu ada caranya masing-masing.)' },
  { quote: 'Aie mandidih indak ka lupo ka bukuanyo.', arti: 'Air mendidih tidak akan lupa asal-usulnya. (Jangan pernah melupakan asal-usul dan leluhurmu.)' },
  { quote: 'Pandai-pandai mambao diri, supayo salamaik di nagari urang.', arti: 'Pandai-pandailah membawa diri, supaya selamat di negeri orang. (Bijak menyesuaikan diri saat merantau.)' },
  { quote: 'Baa baik budi, baa elok bahaso.', arti: 'Betapa baik budi, betapa elok bahasa. (Kebaikan budi dan tutur kata adalah kunci diterima di mana pun.)' },
  { quote: 'Kayu diukua, kain diukua, budi dibaok.', arti: 'Kayu diukur, kain diukur, budi dibawa. (Dalam segala hal harus ada ukurannya, terutama dalam berperilaku.)' },
  { quote: 'Indak lapuak dek hujan, indak lakang dek paneh.', arti: 'Tidak lapuk karena hujan, tidak lekang karena panas. (Sesuatu yang berkualitas tidak akan rusak oleh waktu.)' },
  { quote: 'Sadanciang bak basi, saciok bak ayam.', arti: 'Sedering seperti besi, seciap seperti ayam. (Satu tekad, satu suara, satu tujuan bersama.)' },
  { quote: 'Nan bana tetap bana, nan salah tetap salah.', arti: 'Yang benar tetap benar, yang salah tetap salah. (Kebenaran dan kesalahan tidak bisa ditukar-tukar.)' },
  { quote: 'Malu batanyo sasek di jalan.', arti: 'Malu bertanya sesat di jalan. (Jangan malu untuk bertanya agar tidak salah arah.)' },
  { quote: 'Dima kato sapakaik, di sinan mufakat bajalan.', arti: 'Di mana kata sepakat, di sana mufakat berjalan. (Keputusan terbaik lahir dari musyawarah mufakat.)' },
  { quote: 'Musuah pantang dicari, basuo pantang diilakkan.', arti: 'Musuh pantang dicari, bertemu pantang dielakkan. (Jangan cari musuh, tapi jangan takut menghadapi masalah.)' },
  { quote: 'Hiduik baraka, mati bariman.', arti: 'Hidup berakal, mati beriman. (Gunakan akal selama hidup dan akhiri hidup dengan iman.)' },
  { quote: 'Nan elok dicaliak, nan buruak dijauahi.', arti: 'Yang baik dicontohi, yang buruk dijauhi. (Ambil teladan dari yang baik, hindari yang buruk.)' },
  { quote: 'Usah karuah aie di hulu, supayo janiah di hilianyo.', arti: 'Jangan keruh air di hulu, supaya jernih di hilirnya. (Perbaiki dari akar masalahnya agar hasilnya baik.)' },
  { quote: 'Sungguah pun lauik nan dalam, kok dicuboki ado juo dasanyo.', arti: 'Meskipun laut yang dalam, kalau dicari ada juga dasarnya. (Segala masalah pasti ada penyelesaiannya.)' },
  { quote: 'Tagang mancik, putiah banang. Tagang bana, putuih kawan.', arti: 'Tegang menangkap, putih benang. Tegang benar, putus pertemanan. (Terlalu keras dalam suatu hal bisa merusak hubungan.)' },
  { quote: 'Nan tuo dipandang-pandang, nan mudo diajak rundiangkan.', arti: 'Yang tua dipandang-pandang, yang muda diajak berunding. (Hargai yang tua, libatkan yang muda dalam pengambilan keputusan.)' },
  { quote: 'Baso baik budi baiak, itu tandanyo urang baiak.', arti: 'Bahasa baik budi baik, itu tandanya orang baik. (Tutur kata dan budi pekerti mencerminkan karakter seseorang.)' },
  { quote: 'Rancak di mato, elok di hati, mulia di dalam nagari.', arti: 'Indah di mata, baik di hati, mulia di dalam negeri. (Seseorang yang ideal itu indah penampilan, baik hati, dan mulia di masyarakat.)' },
  { quote: 'Adat nan elok dari nenek moyang, usah diubah-ubah siang.', arti: 'Adat yang baik dari nenek moyang, jangan diubah-ubah sesuka hati. (Warisan leluhur yang baik harus dijaga dan dilestarikan.)' },
  { quote: 'Basilang kayu dalam tungku, di sinan api mako iduik.', arti: 'Bersilang kayu dalam tungku, di sanalah api maka hidup. (Perbedaan dan keberagaman justru menghasilkan kekuatan.)' },
  { quote: 'Nan elok budinyo, elok pulo parasannyo. Nan buruak budinyo, sia-sia parasannyo.', arti: 'Yang baik budinya, baik pula perasaannya. Yang buruk budinya, sia-sia perasaannya. (Budi pekerti adalah cermin dari jiwa seseorang.)' },
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