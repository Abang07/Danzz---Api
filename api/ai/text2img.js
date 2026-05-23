const meta = {
  param: 'prompt',
  desc: 'Generate gambar dari teks dengan AI (?prompt=deskripsi)',
  placeholder: 'beautiful sunset over the ocean, cinematic, ultra realistic',
  params: [
    { name: 'prompt', placeholder: 'beautiful sunset over the ocean, cinematic, ultra realistic' }
  ]
}

async function handler(req, res) {
  const prompt = req.query.prompt || req.query.text || req.query.q

  if (!prompt) return res.status(400).json({ status: false, message: 'Parameter ?prompt= wajib diisi' })

  try {
    const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}&nologo=true&nofeed=true`

    return res.json({
      status: true,
      creator: 'Danzz',
      prompt,
      result: imageUrl
    })

  } catch (err) {
    return res.status(500).json({ status: false, message: 'Terjadi kesalahan', error: err.message })
  }
}

module.exports = { meta, handler }