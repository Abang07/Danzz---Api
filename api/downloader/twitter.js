const axios = require('axios');

const meta = {
  param: 'url',
  desc: 'Download video/foto dari Twitter/X (?url=link_tweet)',
  placeholder: 'https://x.com/i/status/xxx',
  params: [
    { name: 'url', placeholder: 'https://x.com/i/status/xxx' }
  ]
}

async function downloadTwitter(twitterUrl) {
  const match = twitterUrl.match(/status\/(\d+)/)
  if (!match) throw new Error('URL tidak valid')
  const tweetId = match[1]

  const { data } = await axios.get(`https://api.fxtwitter.com/status/${tweetId}`, {
    headers: { 'User-Agent': 'Mozilla/5.0' },
    timeout: 15000
  })

  if (!data?.tweet) throw new Error('Tweet tidak ditemukan')

  const tweet = data.tweet
  const media = tweet.media

  const videos = (media?.videos || []).map(v => ({ url: v.url, type: v.type }))
  const photos = (media?.photos || []).map(p => ({ url: p.url, width: p.width, height: p.height }))

  return {
    text: tweet.text || '',
    author: tweet.author?.name || '',
    username: tweet.author?.screen_name || '',
    created_at: tweet.created_at || '',
    likes: tweet.likes || 0,
    retweets: tweet.retweets || 0,
    type: videos.length ? 'video' : photos.length ? 'photo' : 'text',
    videos,
    photos
  }
}

async function handler(req, res) {
  const url = req.query.url || req.query.link

  if (!url) return res.status(400).json({ status: false, message: 'Parameter ?url= wajib diisi' })

  try {
    const result = await downloadTwitter(url)
    return res.json({
      status: true,
      creator: 'Danzz',
      result
    })
  } catch (err) {
    return res.status(500).json({ status: false, message: 'Terjadi kesalahan', error: err.message })
  }
}

module.exports = { meta, handler }