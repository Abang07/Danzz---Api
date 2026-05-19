const axios = require('axios')

function formatNumber(value) {
  const n = Number(value || 0)
  return Number.isFinite(n) ? n : 0
}

function cleanUsername(input = '') {
  return String(input || '')
    .trim()
    .replace(/^@/, '')
    .replace(/^https?:\/\/(www\.)?tiktok\.com\/@/i, '')
    .split('?')[0]
    .split('/')[0]
    .trim()
}

async function stalkTikTok(username) {
  const url = `https://www.tikwm.com/api/user/info?unique_id=${encodeURIComponent(username)}`
  const response = await axios.get(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
    }
  })

  const res = response.data
  if (res.code !== 0) throw new Error(res.msg || 'User TikTok tidak ditemukan.')

  const { user, stats } = res.data
  return {
    username:    user.uniqueId         || username,
    nickname:    user.nickname         || '',
    avatar:      user.avatarLarger || user.avatarMedium || user.avatarThumb || '',
    signature:   user.signature        || '',
    verified:    Boolean(user.verified),
    private:     Boolean(user.privateAccount),
    region:      user.region           || '',
    create_time: user.createTime ? new Date(user.createTime * 1000).toISOString() : null,
    stats: {
      followers: formatNumber(stats.followerCount),
      following: formatNumber(stats.followingCount),
      hearts:    formatNumber(stats.heartCount),
      videos:    formatNumber(stats.videoCount),
      digg:      formatNumber(stats.diggCount)
    },
    sec_uid:  user.secUid       || '',
    bio_link: user.bioLink?.link || ''
  }
}

async function handler(req, res) {
  const { username } = req.query
  if (!username) {
    return res.status(400).json({
      status: false,
      creator: 'Danzz',
      message: 'Parameter username wajib diisi. Contoh: /api/stalktiktok?username=khaby.lame'
    })
  }

  const target = cleanUsername(username)

  try {
    const data = await stalkTikTok(target)
    return res.json({ status: true, creator: 'Danzz', result: data })
  } catch (err) {
    return res.status(500).json({ status: false, creator: 'Danzz', message: err.message })
  }
}

module.exports = { handler }
