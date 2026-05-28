const meta = {
  param: '',
  desc: 'Quotes peribahasa dan kata-kata Batak beserta artinya',
  placeholder: ''
}

const quotes = [
  { quote: 'Anakkon hi do hamoraon di au.', arti: 'Anakkulah kekayaanku. (Anak adalah harta yang paling berharga bagi orang Batak.)' },
  { quote: 'Habang pidong pudi, na niadophon do na masa.', arti: 'Burung terbang ke belakang, yang dihadapi adalah masa depan. (Selalu menatap ke depan meski masa lalu terasa berat.)' },
  { quote: 'Ndang tartabusi harajaon, ndang tarbahen haumasan, laos do sude i molo adong pangurupion ni Debata.', arti: 'Kerajaan tidak bisa dibeli, kemuliaan tidak bisa dibuat, semua itu ada jika ada pertolongan Tuhan.' },
  { quote: 'Sipaingot ma ho molo lupa, sipasahat ma ho molo tading.', arti: 'Ingatkan aku jika aku lupa, antarkan aku jika aku pergi. (Pentingnya persaudaraan dan saling mengingatkan.)' },
  { quote: 'Molo naeng ho mangolu na denggan, patolhon ma ho di angka na uli.', arti: 'Jika kamu ingin hidup baik, arahkan dirimu kepada hal-hal yang baik.' },
  { quote: 'Rap mardalan, rap manjalo, rap pasahat.', arti: 'Bersama berjalan, bersama menerima, bersama memberikan. (Filosofi kebersamaan dalam adat Batak.)' },
  { quote: 'Na boi do pangalaho ni jolma i muba, alai so boi muba roha ni jolma i molo naeng do.', arti: 'Perilaku seseorang bisa berubah, tapi hati seseorang tidak bisa berubah kalau tidak mau. (Perubahan harus datang dari kemauan diri.)' },
  { quote: 'Hata na uli mambahen las ni roha, hata na roa mambahen lungun ni roha.', arti: 'Kata yang baik membuat hati senang, kata yang buruk membuat hati susah.' },
  { quote: 'Martua ma ho di saluhut ngolu-ngoluam.', arti: 'Semoga kamu bahagia di seluruh kehidupanmu. (Doa dan harapan yang tulus.)' },
  { quote: 'So adong na ummarga sian pardamean di hita hasuhuton.', arti: 'Tidak ada yang lebih berharga dari perdamaian di antara kita bersaudara.' },
  { quote: 'Arga do harajaon, alai arga dipangkuling do.', arti: 'Mulia memang kerajaan, tapi lebih mulia yang dibicarakan dengan penuh hormat.' },
  { quote: 'Molo so marroha ho tu dongam, unang porsea ho tu roham.', arti: 'Jika kamu tidak punya hati untuk temanmu, jangan percaya pada hatimu sendiri.' },
  { quote: 'Ndang adong na ummuli sian pangajarion ni natuatua.', arti: 'Tidak ada yang lebih indah dari ajaran orang tua.' },
  { quote: 'Ingkon dipatupa do na pinarsinta, asa boi jumpang.', arti: 'Yang dicita-citakan harus dikerjakan agar bisa tercapai.' },
  { quote: 'Dang na so boi do, molo naeng do roha ni jolma.', arti: 'Tidak ada yang tidak bisa, jika ada kemauan dari hati manusia.' },
  { quote: 'Molo naeng ho gabe raja, patupahon ma parngoluon na denggan.', arti: 'Jika kamu ingin menjadi pemimpin, wujudkanlah kehidupan yang baik.' },
  { quote: 'Sai tungkap ma sude na niluluan, sai jumpang ma sude na pinarsinta.', arti: 'Semoga semua yang dicari dapat ditemukan, semua yang dicita-citakan tercapai.' },
  { quote: 'Unang be di pudi panindangion, gabe i ma na loja.', arti: 'Jangan terus-menerus meratapi masa lalu, itu yang membuat lelah.' },
  { quote: 'Na timbo do pohon ni hau i molo godang ar ni gincat nai.', arti: 'Pohon yang tinggi karena banyak akarnya. (Kejayaan seseorang karena banyak pendukung dan fondasi yang kuat.)' },
  { quote: 'Sai torop ma angka na denggan na ro tu ho.', arti: 'Semoga banyak hal baik yang datang kepadamu.' },
  { quote: 'Molo ro na roa, diida ma na denggan nai.', arti: 'Jika datang yang buruk, carilah sisi baiknya.' },
  { quote: 'Parngoluon na denggan i ma na pinarsinta ni nasa jolma.', arti: 'Kehidupan yang baik itulah yang dicita-citakan semua manusia.' },
  { quote: 'Ndang tarbahen bona ni hau i gabe rura.', arti: 'Akar pohon tidak bisa menjadi lembah. (Asal-usul seseorang tidak bisa diubah, terimalah dirimu apa adanya.)' },
  { quote: 'Molo naeng ho malo, pabalaen ma tu na malo.', arti: 'Jika kamu ingin pintar, bergaulah dengan orang yang pintar.' },
  { quote: 'Ingot ma na binege, ingot ma na nilehon, asa unang muba.', arti: 'Ingatlah yang didengar, ingatlah yang diberikan, agar tidak berubah. (Pentingnya menepati janji.)' },
  { quote: 'Sai torus ma mangula asa jumpang boras na dao.', arti: 'Teruslah bekerja keras agar menemukan rezeki yang jauh.' },
  { quote: 'Na uli parngoluon i molo adong hadameon di bagasan jabu.', arti: 'Hidup akan indah jika ada kedamaian di dalam rumah.' },
  { quote: 'Roha na denggan i do na mambahen jolma i gabe hasian.', arti: 'Hati yang baik itulah yang membuat seseorang dicintai.' },
  { quote: 'Unang paulak uhum na so uhum, asa unang muba na pangantusion ni roha.', arti: 'Jangan balikkan hukum yang tidak benar, agar pemahaman hati tidak berubah.' },
  { quote: 'Molo dihaholongi do roha ni jolma i, so ra be mago.', arti: 'Jika hati seseorang dipenuhi kasih sayang, tidak akan pernah hilang.' },
  { quote: 'Gabe ma hamu, sai tutu ma ngolu-ngolumi.', arti: 'Berkembanglah kamu, semoga hidupmu sejahtera.' },
  { quote: 'Na manghargai natuatua i do na boi manghargai donganna.', arti: 'Yang menghormati orang tua itulah yang bisa menghormati sesamanya.' },
  { quote: 'Sai bia ma ngolumi asa tung denggan.', arti: 'Jadikanlah hidupmu sebaik-baiknya.' },
  { quote: 'Molo loja ho, pailehon ma tu Debata, Ibana do na mangoloi.', arti: 'Jika kamu lelah, serahkanlah kepada Tuhan, Dialah yang menanggung.' },
  { quote: 'Panurat ni ngolu i do natuatua, na mangajari anak nai.', arti: 'Orang tua adalah penulis kehidupan yang mengajarkan anaknya.' },
  { quote: 'Ndada arta do na umarga, na umarga i do roha na denggan.', arti: 'Bukan harta yang paling berharga, yang paling berharga adalah hati yang baik.' },
  { quote: 'Molo dihilala do hamoraon na di jolma i, ingkon dipangke ma tu na uli.', arti: 'Jika seseorang merasakan kekayaan, harus digunakan untuk hal yang baik.' },
  { quote: 'Sai jumpang ma na niluluan, sai ro ma na pinarsinta.', arti: 'Semoga yang dicari ditemukan, semoga yang dicita-citakan datang.' },
  { quote: 'Unang lupa tu bona-bona ni ngolu, ai i do pambahenan ni jolma i gabe na denggan.', arti: 'Jangan lupa pada asal-usul kehidupan, karena itulah yang membuat seseorang menjadi baik.' },
  { quote: 'Molo naeng jolma i gabe hasian, ingkon dipamasa ma haholongan di bagasan rohana.', arti: 'Jika seseorang ingin dicintai, harus menumbuhkan kasih sayang dalam hatinya.' },
  { quote: 'Martua do na mangolu na denggan, martua do na mangolu na boi mangurupi dongan.', arti: 'Beruntunglah yang hidup baik, beruntunglah yang hidup bisa menolong sesama.' },
  { quote: 'Na malo mangulahon ulaon na denggan i do na martua di ngolu-ngoluna.', arti: 'Yang pandai mengerjakan pekerjaan yang baik itulah yang beruntung dalam hidupnya.' },
  { quote: 'Unang panghirim-hirimhon na so adong, patolhon ma roha tu na adong.', arti: 'Jangan mengharapkan yang tidak ada, arahkan hati pada yang ada.' },
  { quote: 'Haholongan na togu i do pambahenan ni jolma i gabe na uli.', arti: 'Kasih sayang yang tulus itulah yang membuat seseorang menjadi baik.' },
  { quote: 'Molo naeng ho mangolu na denggan, ingkon pasangap ma natuatuam.', arti: 'Jika kamu ingin hidup baik, hormatilah orang tuamu.' },
  { quote: 'Sai uli ma ngolum, sai denggan ma hagabeon mi.', arti: 'Semoga hidupmu indah, semoga keturunanmu berkembang dengan baik.' },
  { quote: 'Na boi do jolma i manggomgomi rohana molo adong hapataronna.', arti: 'Seseorang bisa mengendalikan hatinya jika ada kebijaksanaan.' },
  { quote: 'Ingkon torop do panandaon ni jolma i asa boi gabe hasian.', arti: 'Seseorang harus banyak kenalan agar bisa dicintai banyak orang.' },
  { quote: 'Molo dihilala do hatonaon ni jolma i, ingkon dipangke ma tu na uli bahenon.', arti: 'Jika seseorang merasakan kepandaian, harus digunakan untuk hal yang baik.' },
  { quote: 'Sai unang mago na denggan di bagasan roham, ai i do pardamean ni ngolum.', arti: 'Semoga kebaikan di hatimu tidak hilang, karena itulah kedamaian hidupmu.' },
  { quote: 'Na pangoloi di Debata i do na martua di nasa ngolu-ngoluna.', arti: 'Yang taat kepada Tuhan itulah yang beruntung dalam seluruh kehidupannya.' },
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