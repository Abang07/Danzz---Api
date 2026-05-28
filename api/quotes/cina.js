const meta = {
  param: '',
  desc: 'Quotes peribahasa dan kata-kata Cina beserta artinya',
  placeholder: ''
}

const quotes = [
  { quote: '千里之行，始于足下。(Qiān lǐ zhī xíng, shǐ yú zú xià.)', arti: 'Perjalanan seribu mil dimulai dari satu langkah. (Hal besar dimulai dari langkah kecil.)' },
  { quote: '活到老，学到老。(Huó dào lǎo, xué dào lǎo.)', arti: 'Hidup sampai tua, belajar sampai tua. (Belajar tidak mengenal usia.)' },
  { quote: '不经一番寒彻骨，怎得梅花扑鼻香。(Bù jīng yī fān hán chè gǔ, zěn dé méihuā pū bí xiāng.)', arti: 'Tanpa merasakan dingin yang menusuk tulang, bagaimana bunga plum bisa semerbak harum. (Keberhasilan tidak datang tanpa perjuangan.)' },
  { quote: '己所不欲，勿施于人。(Jǐ suǒ bù yù, wù shī yú rén.)', arti: 'Apa yang tidak kamu inginkan untuk dirimu, jangan lakukan kepada orang lain. (Dasar dari empati dan keadilan.)' },
  { quote: '知己知彼，百战百胜。(Zhī jǐ zhī bǐ, bǎi zhàn bǎi shèng.)', arti: 'Kenali dirimu dan kenali musuhmu, seratus pertempuran seratus kemenangan.' },
  { quote: '失败是成功之母。(Shībài shì chénggōng zhī mǔ.)', arti: 'Kegagalan adalah ibu dari kesuksesan. (Kegagalan mengajarkan jalan menuju keberhasilan.)' },
  { quote: '人无远虑，必有近忧。(Rén wú yuǎn lǜ, bì yǒu jìn yōu.)', arti: 'Orang yang tidak memikirkan jauh ke depan, pasti akan menghadapi masalah dekat. (Pentingnya perencanaan jangka panjang.)' },
  { quote: '水滴石穿。(Shuǐ dī shí chuān.)', arti: 'Tetesan air bisa menembus batu. (Ketekunan yang konsisten bisa mengatasi segala rintangan.)' },
  { quote: '吃一堑，长一智。(Chī yī qiàn, zhǎng yī zhì.)', arti: 'Jatuh sekali, bertambah satu kebijaksanaan. (Setiap kegagalan mengajarkan sesuatu yang berharga.)' },
  { quote: '书山有路勤为径，学海无涯苦作舟。(Shū shān yǒu lù qín wéi jìng, xué hǎi wú yá kǔ zuò zhōu.)', arti: 'Di gunung buku ada jalan dengan ketekunan, di lautan ilmu tidak bertepi dengan kerja keras sebagai perahu.' },
  { quote: '一分耕耘，一分收获。(Yī fēn gēngyún, yī fēn shōuhuò.)', arti: 'Satu bagian kerja keras, satu bagian hasil. (Usaha yang dilakukan menentukan hasil yang diperoleh.)' },
  { quote: '路遥知马力，日久见人心。(Lù yáo zhī mǎlì, rì jiǔ jiàn rén xīn.)', arti: 'Jauh perjalanan menguji kekuatan kuda, lama waktu menguji hati manusia. (Waktu yang panjang mengungkap karakter seseorang.)' },
  { quote: '良药苦口利于病，忠言逆耳利于行。(Liángyào kǔ kǒu lì yú bìng, zhōngyán nì ěr lì yú xíng.)', arti: 'Obat yang baik pahit di mulut tapi menyembuhkan, nasihat jujur tidak enak didengar tapi bermanfaat.' },
  { quote: '近朱者赤，近墨者黑。(Jìn zhū zhě chì, jìn mò zhě hēi.)', arti: 'Dekat dengan merah menjadi merah, dekat dengan tinta hitam menjadi hitam. (Pergaulan mempengaruhi karakter seseorang.)' },
  { quote: '天下无难事，只怕有心人。(Tiānxià wú nán shì, zhǐ pà yǒu xīn rén.)', arti: 'Di dunia tidak ada hal yang sulit, hanya ditakuti oleh orang yang bersungguh-sungguh. (Dengan tekad, tidak ada yang tidak mungkin.)' },
  { quote: '有志者事竟成。(Yǒu zhì zhě shì jìng chéng.)', arti: 'Orang yang punya tekad, urusannya pasti selesai. (Tekad yang kuat adalah kunci keberhasilan.)' },
  { quote: '磨刀不误砍柴工。(Mó dāo bù wù kǎn chái gōng.)', arti: 'Mengasah pisau tidak mengganggu pekerjaan memotong kayu. (Persiapan yang baik meningkatkan efisiensi.)' },
  { quote: '塞翁失马，焉知非福。(Sài wēng shī mǎ, yān zhī fēi fú.)', arti: 'Orang tua di perbatasan kehilangan kudanya, siapa tahu itu bukan berkah. (Di balik musibah bisa ada keberuntungan.)' },
  { quote: '三人行，必有我师焉。(Sān rén xíng, bì yǒu wǒ shī yān.)', arti: 'Tiga orang berjalan bersama, pasti ada yang bisa menjadi guruku. (Bisa belajar dari siapa saja.)' },
  { quote: '知足者常乐。(Zhīzú zhě cháng lè.)', arti: 'Orang yang tahu puas selalu bahagia. (Rasa syukur adalah sumber kebahagiaan.)' },
  { quote: '树欲静而风不止，子欲养而亲不待。(Shù yù jìng ér fēng bù zhǐ, zǐ yù yǎng ér qīn bù dài.)', arti: 'Pohon ingin tenang tapi angin tidak berhenti, anak ingin berbakti tapi orang tua tidak bisa menunggu. (Jangan tunda berbakti kepada orang tua.)' },
  { quote: '宝剑锋从磨砺出，梅花香自苦寒来。(Bǎojiàn fēng cóng mólì chū, méihuā xiāng zì kǔhán lái.)', arti: 'Ketajaman pedang berharga dari proses pengasahan, keharuman bunga plum berasal dari dingin yang pahit. (Keunggulan lahir dari perjuangan.)' },
  { quote: '众志成城。(Zhòng zhì chéng chéng.)', arti: 'Tekad bersama membangun kota. (Persatuan dan kebersamaan menghasilkan kekuatan yang luar biasa.)' },
  { quote: '莫等闲，白了少年头。(Mò děng xián, bái le shàonián tóu.)', arti: 'Jangan habiskan waktu dengan sia-sia, sampai kepala muda menjadi putih. (Gunakan masa muda dengan sebaik-baiknya.)' },
  { quote: '患难见真情。(Huànnàn jiàn zhēnqíng.)', arti: 'Kesulitan menguji persahabatan sejati. (Teman sejati terlihat saat dalam kesusahan.)' },
  { quote: '学而不思则罔，思而不学则殆。(Xué ér bù sī zé wǎng, sī ér bù xué zé dài.)', arti: 'Belajar tanpa berpikir adalah sia-sia, berpikir tanpa belajar adalah berbahaya.' },
  { quote: '欲速则不达。(Yù sù zé bù dá.)', arti: 'Terlalu terburu-buru justru tidak akan sampai tujuan. (Kesabaran dan ketekunan lebih penting dari kecepatan.)' },
  { quote: '滴水之恩，当涌泉相报。(Dī shuǐ zhī ēn, dāng yǒng quán xiāng bào.)', arti: 'Kebaikan setetes air, harus dibalas dengan mata air yang mengalir deras. (Balas budi harus lebih besar dari yang diterima.)' },
  { quote: '冰冻三尺，非一日之寒。(Bīng dòng sān chǐ, fēi yī rì zhī hán.)', arti: 'Es setebal tiga kaki tidak terbentuk dalam satu hari. (Masalah besar tidak terjadi dalam semalam, begitu pula pencapaian besar.)' },
  { quote: '行百里者半九十。(Xíng bǎi lǐ zhě bàn jiǔshí.)', arti: 'Yang berjalan seratus mil, setengahnya ada di sembilan puluh. (Bagian terakhir dari perjalanan adalah yang terberat.)' },
  { quote: '不鸣则已，一鸣惊人。(Bù míng zé yǐ, yī míng jīng rén.)', arti: 'Kalau tidak bersuara biarlah, kalau bersuara mengejutkan semua orang. (Diam tapi sekali bertindak langsung memberikan dampak besar.)' },
  { quote: '金无足赤，人无完人。(Jīn wú zú chì, rén wú wán rén.)', arti: 'Emas tidak ada yang murni sempurna, manusia tidak ada yang sempurna. (Tidak ada manusia yang sempurna.)' },
  { quote: '逆境出人才。(Nì jìng chū réncái.)', arti: 'Kesulitan melahirkan orang-orang berbakat. (Perjuangan menghasilkan karakter dan kemampuan yang luar biasa.)' },
  { quote: '一寸光阴一寸金，寸金难买寸光阴。(Yī cùn guāngyīn yī cùn jīn, cùn jīn nán mǎi cùn guāngyīn.)', arti: 'Satu inci waktu satu inci emas, tapi emas tidak bisa membeli waktu. (Waktu lebih berharga dari uang.)' },
  { quote: '百闻不如一见。(Bǎi wén bù rú yī jiàn.)', arti: 'Seratus kali mendengar tidak sebanding dengan sekali melihat langsung. (Pengalaman langsung lebih berharga dari sekadar informasi.)' },
  { quote: '十年树木，百年树人。(Shí nián shù mù, bǎi nián shù rén.)', arti: 'Sepuluh tahun menanam pohon, seratus tahun mendidik manusia. (Pendidikan adalah investasi jangka panjang.)' },
  { quote: '好事不出门，坏事传千里。(Hǎo shì bù chū mén, huài shì chuán qiān lǐ.)', arti: 'Kebaikan tidak keluar pintu, keburukan tersebar seribu mil. (Kabar buruk lebih cepat menyebar daripada kabar baik.)' },
  { quote: '心诚则灵。(Xīn chéng zé líng.)', arti: 'Hati yang tulus maka doanya dikabulkan. (Ketulusan hati adalah kunci dari segala permohonan.)' },
  { quote: '静水流深。(Jìng shuǐ liú shēn.)', arti: 'Air yang tenang mengalir dalam. (Orang yang tenang biasanya memiliki kebijaksanaan yang mendalam.)' },
  { quote: '志同道合。(Zhì tóng dào hé.)', arti: 'Tekad sama, jalan sama. (Orang-orang yang punya tujuan dan visi yang sama akan berjalan bersama.)' },
  { quote: '笑一笑，十年少。(Xiào yī xiào, shí nián shào.)', arti: 'Satu kali tertawa, sepuluh tahun lebih muda. (Kebahagiaan dan senyum adalah obat terbaik.)' },
  { quote: '海纳百川，有容乃大。(Hǎi nà bǎichuān, yǒu róng nǎi dà.)', arti: 'Laut menampung ratusan sungai, karena bisa menerima maka menjadi besar. (Kebesaran jiwa terlihat dari kemampuan menerima perbedaan.)' },
  { quote: '福无双至，祸不单行。(Fú wú shuāng zhì, huò bù dān xíng.)', arti: 'Keberuntungan tidak datang dua kali sekaligus, musibah tidak datang sendirian. (Bersyukurlah saat beruntung, bersabarlah saat musibah datang.)' },
  { quote: '不积跬步，无以至千里。(Bù jī kuǐ bù, wú yǐ zhì qiān lǐ.)', arti: 'Tanpa mengumpulkan langkah-langkah kecil, tidak bisa mencapai seribu mil. (Pencapaian besar dibangun dari usaha-usaha kecil.)' },
  { quote: '业精于勤，荒于嬉。(Yè jīng yú qín, huāng yú xī.)', arti: 'Keahlian diasah dengan ketekunan, rusak karena bermain-main. (Ketekunan membangun keahlian, kelalaian menghancurkannya.)' },
  { quote: '人心齐，泰山移。(Rén xīn qí, Tàishān yí.)', arti: 'Hati manusia bersatu, Gunung Tai pun bisa dipindahkan. (Persatuan bisa mencapai hal yang mustahil sekalipun.)' },
  { quote: '做事要三思而后行。(Zuòshì yào sānsī ér hòu xíng.)', arti: 'Dalam melakukan sesuatu, pikirkanlah tiga kali sebelum bertindak. (Kehati-hatian adalah kunci keberhasilan.)' },
  { quote: '龙生龙，凤生凤。(Lóng shēng lóng, fèng shēng fèng.)', arti: 'Naga melahirkan naga, burung phoenix melahirkan phoenix. (Keturunan cenderung mengikuti sifat orang tuanya.)' },
  { quote: '名师出高徒。(Míng shī chū gāo tú.)', arti: 'Guru yang hebat menghasilkan murid yang unggul. (Kualitas pengajaran menentukan kualitas hasil didikan.)' },
  { quote: '善有善报，恶有恶报。(Shàn yǒu shàn bào, è yǒu è bào.)', arti: 'Kebaikan mendapat balasan kebaikan, kejahatan mendapat balasan kejahatan. (Hukum karma berlaku universal.)' },
  { quote: '授人以鱼不如授人以渔。(Shòu rén yǐ yú bùrú shòu rén yǐ yú.)', arti: 'Memberi seseorang ikan tidak sebaik mengajarinya cara memancing. (Mengajarkan kemampuan lebih berharga dari memberi secara langsung.)' },
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