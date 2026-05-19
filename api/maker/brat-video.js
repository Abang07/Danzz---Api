const { bratVid } = require('brat-canvas/video');

async function handler(req, res) {
  const { text } = req.query;

  if (!text) {
    return res.status(400).json({
      status: false,
      message: 'Query ?text= wajib diisi',
      example: '/api/maker/bratvid?text=Just friend ygy'
    });
  }

  try {
    const buf = await bratVid(text, {
      outputFormat: 'mp4',
      fast_progress: true,
      lyric: {
        maxWordPerLayer: 5,
        frameDuration: 0.7,
        lastFrameDuration: 1.5
      },
      brat: { BLUR: 0 }
    });

    res.setHeader('Content-Type', 'video/mp4');
    return res.send(buf);

  } catch (err) {
    return res.status(500).json({ status: false, message: err.message });
  }
}

module.exports = { handler };
