const tebakKataData = require('./tebakkata.json');

function getRandomSoal(count = 1) {
  if (count > tebakKataData.length) throw new Error(`count maksimal ${tebakKataData.length}`);
  const shuffled = [...tebakKataData].sort(() => Math.random() - 0.5);
  const result = shuffled.slice(0, count);
  return count === 1 ? result[0] : result;
}

async function handler(req, res) {
  const { count, index, jawaban } = req.query;
  try {
    if (index !== undefined && jawaban !== undefined) {
      const soal = tebakKataData.find(item => item.index === parseInt(index));
      if (!soal) return res.status(404).json({ status: false, message: 'Soal tidak ditemukan' });
      const benar = soal.jawaban.trim().toUpperCase() === jawaban.trim().toUpperCase();
      return res.json({ status: true, creator: 'Danzz', result: { benar, jawaban_user: jawaban.toUpperCase(), ...(!benar && { hint: `Jawaban terdiri dari ${soal.jawaban.length} karakter` }) } });
    }
    if (index !== undefined) {
      const soal = tebakKataData.find(item => item.index === parseInt(index));
      if (!soal) return res.status(404).json({ status: false, message: 'Soal tidak ditemukan' });
      return res.json({ status: true, creator: 'Danzz', result: soal });
    }
    const result = getRandomSoal(count ? parseInt(count) : 1);
    res.json({ status: true, creator: 'Danzz', result });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
}

module.exports = { handler };
