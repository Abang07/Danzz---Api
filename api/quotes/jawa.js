const meta = {
  param: '',
  desc: 'Quotes bahasa Jawa beserta artinya',
  placeholder: ''
}

const quotes = [
  { quote: 'Aja rumangsa bisa, nanging bisaa rumangsa.', arti: 'Jangan merasa bisa, tapi bisalah merasa.' },
  { quote: 'Sepi ing pamrih, rame ing gawe.', arti: 'Tanpa pamrih dalam bekerja, tapi giat dalam berkarya.' },
  { quote: 'Becik ketitik ala ketara.', arti: 'Yang baik akan terlihat, yang buruk akan tampak.' },
  { quote: 'Alon-alon waton kelakon.', arti: 'Pelan-pelan asal tercapai.' },
  { quote: 'Jer basuki mawa beya.', arti: 'Setiap keberhasilan membutuhkan pengorbanan.' },
  { quote: 'Aja dumeh.', arti: 'Jangan merasa sombong atau sok.' },
  { quote: 'Ngluruk tanpa bala, menang tanpa ngasorake.', arti: 'Berjuang tanpa pasukan, menang tanpa merendahkan.' },
  { quote: 'Urip iku urup.', arti: 'Hidup itu harus memberi manfaat bagi orang lain.' },
  { quote: 'Aja milik barang kang melok, aja mangro mundak kendo.', arti: 'Jangan tergiur barang yang menggiurkan, jangan ragu agar tidak lemah.' },
  { quote: 'Sapa nandur bakal ngunduh.', arti: 'Siapa menanam akan menuai.' },
  { quote: 'Ati pangembating praja.', arti: 'Hati adalah pengendali kehidupan.' },
  { quote: 'Datan serik lamun ketaman, datan susah lamun kelangan.', arti: 'Tidak sakit hati bila tertimpa musibah, tidak sedih bila kehilangan.' },
  { quote: 'Ing ngarsa sung tuladha, ing madya mangun karsa, tut wuri handayani.', arti: 'Di depan memberi contoh, di tengah membangun semangat, di belakang memberi dorongan.' },
  { quote: 'Aja nguya-uya marang kang wis kelaku.', arti: 'Jangan menyesali apa yang sudah terjadi.' },
  { quote: 'Wong sabar rejekine jembar.', arti: 'Orang yang sabar rezekinya lapang.' },
  { quote: 'Sura dira jayaningrat, lebur dening pangastuti.', arti: 'Sifat keras dan jahat akan hancur oleh kebaikan.' },
  { quote: 'Aja wedi kangelan yen arep nggayuh gegayuhan.', arti: 'Jangan takut susah jika ingin meraih cita-cita.' },
  { quote: 'Rukun agawe santosa, crah agawe bubrah.', arti: 'Rukun membuat kuat, perselisihan membuat hancur.' },
  { quote: 'Kendel ngringkel, wedi mati ngalor ngidul.', arti: 'Berani menghadapi masalah, takut malah tidak karuan.' },
  { quote: 'Aja gampang gumunan, aja gampang kagetan.', arti: 'Jangan mudah takjub, jangan mudah kaget.' },
  { quote: 'Nemu wirang becik tinimbang nemu pati.', arti: 'Lebih baik menanggung malu daripada mati.' },
  { quote: 'Yen wis kebacut, aja getun.', arti: 'Kalau sudah terlanjur, jangan menyesal.' },
  { quote: 'Ajining diri saka lathi, ajining raga saka busana.', arti: 'Harga diri seseorang dilihat dari ucapannya, kehormatan diri dari penampilannya.' },
  { quote: 'Kumenthus ora pecus.', arti: 'Sok bisa tapi nyatanya tidak mampu.' },
  { quote: 'Nglurug tanpa bala menang tanpa ngasorake, sekti tanpa aji-aji, sugih tanpa bandha.', arti: 'Menyerang tanpa pasukan, menang tanpa merendahkan, sakti tanpa ilmu, kaya tanpa harta.' },
  { quote: 'Sing sapa tekun bakal tekan.', arti: 'Siapa yang tekun pasti akan sampai tujuan.' },
  { quote: 'Aja turu sore kaki, ana dewa nganglang jagad.', arti: 'Jangan tidur sore, manfaatkan waktu dengan baik.' },
  { quote: 'Mulat sarira hangrasa wani.', arti: 'Berani introspeksi diri sendiri.' },
  { quote: 'Aja seneng gawe susahe liyan.', arti: 'Jangan suka membuat susah orang lain.' },
  { quote: 'Sabeja-bejane wong kang lali, isih beja wong kang eling lan waspada.', arti: 'Seberuntung-beruntungnya orang yang lupa, masih beruntung orang yang ingat dan waspada.' },
  { quote: 'Aja kuminter mundak keblinger.', arti: 'Jangan merasa paling pintar nanti malah tersesat.' },
  { quote: 'Urip iku mung mampir ngombe.', arti: 'Hidup itu hanya mampir minum, artinya hidup itu sangat singkat.' },
  { quote: 'Wong kang wedi ing kangelan, ora bakal ngrasakake manis-e urip.', arti: 'Orang yang takut akan kesulitan tidak akan merasakan manisnya hidup.' },
  { quote: 'Aja sok pinter dhewe.', arti: 'Jangan sok paling pintar sendiri.' },
  { quote: 'Yen urip kudu duwe guna.', arti: 'Kalau hidup harus punya manfaat.' },
  { quote: 'Sapa sing gelem usaha bakal oleh asil.', arti: 'Siapa yang mau berusaha akan mendapat hasil.' },
  { quote: 'Ngono ya ngono, ning aja ngono.', arti: 'Boleh begitu, tapi jangan keterlaluan.' },
  { quote: 'Wong apik bakal ketitik, wong ala bakal ketara.', arti: 'Orang baik akan terlihat kebaikannya, orang jahat akan terlihat kejahatannya.' },
  { quote: 'Aja adigang, adigung, adiguna.', arti: 'Jangan mengandalkan kekuatan, kebesaran, dan kepandaian secara berlebihan.' },
  { quote: 'Tansah eling lan waspada.', arti: 'Selalu ingat dan waspada.' },
  { quote: 'Aja mburu pepenginan kang ora karuwan.', arti: 'Jangan mengejar keinginan yang tidak jelas.' },
  { quote: 'Memayu hayuning bawana.', arti: 'Menjaga keselamatan dan keindahan dunia.' },
  { quote: 'Yen arep maju kudu wani ngalah.', arti: 'Kalau mau maju harus berani mengalah.' },
  { quote: 'Sing bisa ngatur awake dhewe, iku wong kang menang.', arti: 'Yang bisa mengatur dirinya sendiri, itulah orang yang menang.' },
  { quote: 'Enake urip iku yen bisa gawe senenge liyan.', arti: 'Enaknya hidup itu kalau bisa membuat orang lain senang.' },
  { quote: 'Aja grusa-grusu, mengko kesusu.', arti: 'Jangan terburu-buru, nanti malah salah.' },
  { quote: 'Kalamun sira durung bisa nglakoni, aja sok wani calathu.', arti: 'Kalau kamu belum bisa melakukan, jangan berani berkata.' },
  { quote: 'Sugih tanpa bandha, digdaya tanpa aji.', arti: 'Kaya tanpa harta, sakti tanpa jimat.' },
  { quote: 'Aja seneng ngunek-unekake liyan.', arti: 'Jangan suka membicarakan kejelekan orang lain.' },
  { quote: 'Tutur tinular, tindak tanduk.', arti: 'Nasihat menular, perilaku menjadi contoh.' },
  { quote: 'Aja ketungkul marang kalungguhan, kadonyan, lan kemareman.', arti: 'Jangan terlena dengan jabatan, harta, dan kepuasan duniawi.' },
  { quote: 'Dadi manungsa kudu ngerti marang pepesthene Gusti.', arti: 'Jadi manusia harus mengerti takdir dari Tuhan.' },
  { quote: 'Aja seneng nggawe gela marang liyan.', arti: 'Jangan suka mengecewakan orang lain.' },
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