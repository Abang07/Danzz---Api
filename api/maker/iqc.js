const { generateIQC } = require('iqc-canvas');

async function handler(req, res) {
  const { text, time } = req.query;

  if (!text) {
    return res.status(400).json({
      status: false,
      message: 'Query ?text= wajib diisi',
      example: '/api/maker/iqc?text=Hello World&time=09.31'
    });
  }

  try {
    const result = await generateIQC(text, time || '00.00', {
      baterai: [true, '100'],
      operator: true,
      timebar: true,
      wifi: true
    });

    if (!result.success) throw new Error(result.message || 'Failed generate IQC');

    res.setHeader('Content-Type', 'image/png');
    return res.send(result.image);

  } catch (err) {
    return res.status(500).json({ status: false, message: err.message });
  }
}

module.exports = { handler };
