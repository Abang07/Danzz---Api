const meta = {
  param: 'q',
  desc: 'Stalk channel YouTube',
  placeholder: 'Contoh: MrBeast'
}

async function handler(req, res) {
  const query = (req.query.q || '').trim()
  if (!query)
    return res.status(400).json({ status: false, message: 'Parameter q diperlukan. Contoh: ?q=MrBeast' })

  try {
    const yts = require('yt-search')
    const search = await yts(query)
    const channel = search.channels[0]

    if (!channel)
      return res.json({ status: false, message: 'Channel YouTube tidak ditemukan.' })

    return res.json({
      status: true,
      data: {
        name: channel.name,
        id: channel.id,
        url: channel.url,
        thumbnail: channel.image || channel.thumbnail,
        subscribers: channel.subCountLabel,
        subscribers_raw: channel.subCount,
        video_count: channel.videoCountLabel,
        verified: Boolean(channel.verified),
        about: channel.about || ''
      }
    })

  } catch (err) {
    return res.status(500).json({ status: false, message: err.message })
  }
}

module.exports = { meta, handler }