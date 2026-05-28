const meta = {
  param: '',
  desc: 'Quotes peribahasa dan kata-kata Aceh beserta artinya',
  placeholder: ''
}

const quotes = [
  { quote: 'Adat ngon hukom lagee zat ngon sifeut.', arti: 'Adat dan hukum seperti zat dan sifat. (Adat dan hukum agama tidak bisa dipisahkan dalam kehidupan masyarakat Aceh.)' },
  { quote: 'Bek ta peuingat ureueng laen, la ta ingat droe keuh.', arti: 'Jangan mengingatkan orang lain, ingatkanlah diri sendiri dahulu.' },
  { quote: 'Meunyoe na akai, teuma na buet.', arti: 'Kalau ada akal, maka ada usaha. (Kecerdasan harus disertai dengan tindakan nyata.)' },
  { quote: 'Cit rhet blang, ureueng jeut ta peuteubiet, tapi hana jeut ta peuteubiet watee.', arti: 'Sawah yang tergenang bisa dikeringkan, tapi waktu tidak bisa dikembalikan.' },
  { quote: 'Bek peumulia droe ngon hana buet.', arti: 'Jangan memuliakan diri sendiri dengan tanpa amal perbuatan.' },
  { quote: 'Reujang gata boh atra, teuma gata boh atra droe.', arti: 'Sebelum kamu membuang milik orang, buanglah dulu milikmu sendiri. (Koreksi diri sebelum mengkritik orang lain.)' },
  { quote: 'Meunyoe hana ulee, hana badan.', arti: 'Kalau tidak ada kepala, tidak ada badan. (Pemimpin adalah inti dari segalanya.)' },
  { quote: 'Han jeut cit ta ek u langik, tapi buet ta peugah ka ek.', arti: 'Tidak bisa naik ke langit, tapi pekerjaan kita katakan sudah naik. (Sindiran untuk orang yang suka berbohong tentang kemampuannya.)' },
  { quote: 'Beurangkat ureueng ngon adab, teuma beurangkat ngon akai.', arti: 'Seseorang maju dengan adab, lalu maju dengan akal.' },
  { quote: 'Soe nyang na meukeusud, pasti teuka jalan.', arti: 'Siapa yang punya tujuan, pasti akan menemukan jalan.' },
  { quote: 'Ureung nyang sabar, sigala perkara jeut ta selesaikan.', arti: 'Orang yang sabar, segala perkara bisa diselesaikan.' },
  { quote: 'Bek kheun hana jeut, kheun keuh pane cara.', arti: 'Jangan bilang tidak bisa, katakanlah bagaimana caranya.' },
  { quote: 'Akai nyang got, bek ta pake bak gob, pake keuh bak droe.', arti: 'Akal yang baik, jangan dipakai untuk orang lain saja, pakai juga untuk diri sendiri.' },
  { quote: 'Meunyoe hana usaha, hana hasil.', arti: 'Kalau tidak ada usaha, tidak ada hasil.' },
  { quote: 'Seuneubok nyang got, tumbuh dari bijeh nyang got.', arti: 'Pohon yang baik, tumbuh dari benih yang baik. (Keturunan yang baik berasal dari orang tua yang baik.)' },
  { quote: 'Bek ta jak uteun ngon hana bekal.', arti: 'Jangan pergi ke hutan tanpa bekal. (Jangan melakukan sesuatu tanpa persiapan.)' },
  { quote: 'Ureueng nyang na buet, na rezeki.', arti: 'Orang yang bekerja, ada rezekinya.' },
  { quote: 'Meunyoe ta peutheun hawa napsu, sigala kebaikan jeut ta capai.', arti: 'Jika bisa menahan hawa nafsu, segala kebaikan bisa diraih.' },
  { quote: 'Bek cit ta peuingat ureueng laen, ingat keuh soe droe.', arti: 'Jangan selalu mengingatkan orang lain, ingatkanlah diri sendiri.' },
  { quote: 'Adab le teuma ileum, ileum le teuma amai.', arti: 'Adab dulu kemudian ilmu, ilmu dulu kemudian amal.' },
  { quote: 'Ureueng nyang jeut ta percaya, nyang setia bak masa susah.', arti: 'Orang yang bisa dipercaya, yang setia di masa susah.' },
  { quote: 'Meunyoe hana kepercayaan, hana persahabatan.', arti: 'Kalau tidak ada kepercayaan, tidak ada persahabatan.' },
  { quote: 'Geupeutimang aneuk ngon kasih sayang, geupeuingat ngon ileum nyang got.', arti: 'Anak diasuh dengan kasih sayang, diingatkan dengan ilmu yang baik.' },
  { quote: 'Bek ta cok atra gob ngon tanpa hak.', arti: 'Jangan mengambil milik orang lain tanpa hak.' },
  { quote: 'Meunyoe ta meusu ngon ureueng, teuma ta kalah.', arti: 'Kalau kita bermusuhan dengan orang, maka kita yang kalah.' },
  { quote: 'Ureueng nyang got, na akhlak nyang got.', arti: 'Orang yang baik, memiliki akhlak yang baik.' },
  { quote: 'Bek ta peutuah droe ngon hana buet.', arti: 'Jangan memuji diri sendiri tanpa amal perbuatan.' },
  { quote: 'Ileum nyang got, bek ta pake bak buet nyang jelek.', arti: 'Ilmu yang baik, jangan dipakai untuk perbuatan yang buruk.' },
  { quote: 'Ureueng nyang na ileum, nyang jeut ta hormat.', arti: 'Orang yang berilmu, yang layak dihormati.' },
  { quote: 'Meunyoe ta jak ngon buet nyang got, rezeki ta ikot.', arti: 'Kalau kita berjalan dengan perbuatan yang baik, rezeki akan mengikuti.' },
  { quote: 'Bek ta tinggai keluarga bak masa nyang susah.', arti: 'Jangan tinggalkan keluarga di saat yang susah.' },
  { quote: 'Ureueng nyang sabar ngon ujian, jeut ta sukses.', arti: 'Orang yang sabar menghadapi ujian, bisa sukses.' },
  { quote: 'Meunyoe hana agama, hana ketentraman.', arti: 'Kalau tidak ada agama, tidak ada ketentraman.' },
  { quote: 'Bek ta sia-siakan waktu ngon buet nyang hana guna.', arti: 'Jangan sia-siakan waktu dengan hal yang tidak berguna.' },
  { quote: 'Ureueng nyang na syukur, na bahagia.', arti: 'Orang yang bersyukur, memiliki kebahagiaan.' },
  { quote: 'Meunyoe ta peuingat droe, hana ureueng nyang jeut ta salahkan.', arti: 'Kalau kita selalu mengingatkan diri sendiri, tidak ada orang yang perlu disalahkan.' },
  { quote: 'Bek ta peugah nyang hana that, karena hana that nyan dosa.', arti: 'Jangan mengatakan yang tidak benar, karena yang tidak benar itu dosa.' },
  { quote: 'Ureueng nyang tulong ureueng laen, nyang na kemuliaan.', arti: 'Orang yang menolong orang lain, yang memiliki kemuliaan.' },
  { quote: 'Meunyoe ta meukeusud ngon sungguh-sungguh, Tuhan pasti bantu.', arti: 'Kalau kita berniat dengan sungguh-sungguh, Tuhan pasti menolong.' },
  { quote: 'Bek ta hitung salah ureueng laen, hitung keuh salah droe.', arti: 'Jangan menghitung kesalahan orang lain, hitunglah kesalahan diri sendiri.' },
  { quote: 'Ureueng nyang peumulia ibu bapak, nyang na berkah.', arti: 'Orang yang memuliakan ibu bapak, yang mendapat berkah.' },
  { quote: 'Meunyoe ta na kasih sayang, sigala halangan jeut ta lewati.', arti: 'Kalau ada kasih sayang, segala halangan bisa dilewati.' },
  { quote: 'Bek ta remehkan ureueng laen, karena hana nyang tahu masa depan.', arti: 'Jangan meremehkan orang lain, karena tidak ada yang tahu masa depan.' },
  { quote: 'Ureueng nyang na sabar, na kemenangan.', arti: 'Orang yang sabar, ada kemenangan.' },
  { quote: 'Meunyoe hana persatuan, hana kekuatan.', arti: 'Kalau tidak ada persatuan, tidak ada kekuatan.' },
  { quote: 'Bek ta peuget musuh ngon hana perlu, karena musuh peureulee pengorbanan.', arti: 'Jangan membuat musuh tanpa perlu, karena musuh memerlukan pengorbanan.' },
  { quote: 'Ureueng nyang jujur, nyang na kepercayaan ureueng laen.', arti: 'Orang yang jujur, yang mendapat kepercayaan orang lain.' },
  { quote: 'Meunyoe ta jak ngon kebenaran, hana nyang jeut ta kalahkan.', arti: 'Kalau kita berjalan dengan kebenaran, tidak ada yang bisa mengalahkan kita.' },
  { quote: 'Bek ta lupai asal usui droe, meskipun ka sukses.', arti: 'Jangan lupa asal-usul diri, meskipun sudah sukses.' },
  { quote: 'Ureueng nyang na iman, na ketentraman hati.', arti: 'Orang yang beriman, memiliki ketentraman hati.' },
  { quote: 'Meunyoe ta jak ngon niat nyang got, hasil nyang got pasti ta capai.', arti: 'Kalau kita berjalan dengan niat yang baik, hasil yang baik pasti diraih.' },
  { quote: 'Bek ta tinggai agama bak masa susah, karena agama nyan peutimang bak masa susah.', arti: 'Jangan tinggalkan agama di saat susah, karena agama itu pegangan di saat susah.' },
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