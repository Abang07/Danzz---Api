const { bratGen } = require('brat-canvas');

async function handler(req, res) {
  const { text } = req.query;

  if (!text) {
    return res.status(400).json({
      status: false,
      message: 'Query ?text= wajib diisi',
      example: '/api/maker/brat?text=Good morning'
    });
  }

  try {
    const outputBuffer = await bratGen(text, { BLUR: 0 });

    res.setHeader('Content-Type', 'image/png');
    return res.send(outputBuffer);

  } catch (err) {
    return res.status(500).json({
      status: false,
      message: err.message
    });
  }
}

module.exports = { handler };
