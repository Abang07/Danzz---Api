const meta = {
  param: 'id',
  desc: 'Cek profil pemain Free Fire (format: UID region)',
  placeholder: 'Contoh: 123456789 ID'
}

function parseInput(input) {
  const m = input.trim().split(/\s+/)
  if (m.length >= 2) return { uid: m[0], region: m[1].toUpperCase() }
  if (m.length === 1) return { uid: m[0], region: 'ID' }
  return null
}

async function handler(req, res) {
  const input = (req.query.id || '').trim()
  if (!input)
    return res.status(400).json({ status: false, message: 'Parameter id diperlukan. Format: 123456789 ID' })

  const parsed = parseInput(input)
  if (!parsed)
    return res.status(400).json({ status: false, message: 'Format salah. Contoh: 123456789 ID' })

  const { uid, region } = parsed

  try {
    const axios = require('axios')
    const { data: d } = await axios.get('https://ff-817ok-topidev-172.vercel.app/player-info', {
      params: { region, uid },
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
        'Accept': 'application/json, text/plain, */*',
        'Origin': 'https://ff-817ok-topidev-172.vercel.app',
        'Referer': 'https://ff-817ok-topidev-172.vercel.app/',
        'Accept-Language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7'
      },
      timeout: 10000
    })

    if (!d.basicInfo)
      return res.json({ status: false, message: 'UID tidak ditemukan atau region salah', raw: d })

    const formatTanggal = (timestamp) => {
      if (!timestamp || timestamp === '0') return 'N/A'
      return new Date(parseInt(timestamp) * 1000).toLocaleDateString('id-ID', {
        day: '2-digit', month: 'long', year: 'numeric'
      })
    }

    return res.json({
      status: true,
      nickname: d.basicInfo.nickname || 'Unknown',
      accountId: d.basicInfo.accountId || uid,
      region: d.basicInfo.region || region,
      level: d.basicInfo.level || 0,
      exp: d.basicInfo.exp || 0,
      liked: d.basicInfo.liked || 0,
      brRank: d.basicInfo.rank || 0,
      csRank: d.basicInfo.csRank || 0,
      createAt: formatTanggal(d.basicInfo.createAt),
      lastLogin: formatTanggal(d.basicInfo.lastLoginAt),
      clan: d.clanBasicInfo?.clanName || 'No Clan',
      signature: d.socialInfo?.signature || ''
    })

  } catch (err) {
    return res.status(500).json({ status: false, message: err.response?.data || err.message })
  }
}

module.exports = { meta, handler }