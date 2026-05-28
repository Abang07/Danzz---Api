const meta = {
  param: 'id',
  desc: 'Stalk profil pemain Mobile Legends (format: userId (zoneId))',
  placeholder: 'Contoh: 1158325300 (13692)'
}

function parseInput(input) {
  const m1 = input.match(/^(\d+)\s*\((\d+)\)/)
  if (m1) return { userId: m1[1], zoneId: m1[2] }
  const m2 = input.match(/^(\d+)[.\s]+(\d+)$/)
  if (m2) return { userId: m2[1], zoneId: m2[2] }
  return null
}

async function handler(req, res) {
  const input = (req.query.id || '').trim()
  if (!input)
    return res.status(400).json({ status: false, message: 'Parameter id diperlukan.' })

  const parsed = parseInput(input)
  if (!parsed)
    return res.status(400).json({ status: false, message: 'Format salah. Contoh: 1158325300 (13692)' })

  const { userId, zoneId } = parsed
  const axios = require('axios')
  const results = []

  const endpoints = [
    // Codashop ID
    {
      name: 'codashop-id',
      fn: () => axios.post('https://order-id.codashop.com/initPayment.action',
        new URLSearchParams({
          'voucherPricePoint.id': '1453',
          'voucherPricePoint.price': '15000',
          'voucherPricePoint.variablePrice': '0',
          'user.userId': userId,
          'user.zoneId': zoneId,
          'voucherTypeName': 'MOBILE_LEGENDS',
          'shopLang': 'id_ID'
        }).toString(),
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Referer': 'https://www.codashop.com/id/mobile-legends' }, timeout: 8000 }
      )
    },
    // Codashop PH
    {
      name: 'codashop-ph',
      fn: () => axios.post('https://order-ph.codashop.com/initPayment.action',
        new URLSearchParams({
          'voucherPricePoint.id': '1482',
          'voucherPricePoint.price': '29',
          'voucherPricePoint.variablePrice': '0',
          'user.userId': userId,
          'user.zoneId': zoneId,
          'voucherTypeName': 'MOBILE_LEGENDS',
          'shopLang': 'en_PH'
        }).toString(),
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Referer': 'https://www.codashop.com/en-ph/mobile-legends' }, timeout: 8000 }
      )
    },
    // Codashop MY
    {
      name: 'codashop-my',
      fn: () => axios.post('https://order-my.codashop.com/initPayment.action',
        new URLSearchParams({
          'voucherPricePoint.id': '1471',
          'voucherPricePoint.price': '1.99',
          'voucherPricePoint.variablePrice': '0',
          'user.userId': userId,
          'user.zoneId': zoneId,
          'voucherTypeName': 'MOBILE_LEGENDS',
          'shopLang': 'en_MY'
        }).toString(),
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Referer': 'https://www.codashop.com/en-my/mobile-legends' }, timeout: 8000 }
      )
    },
    // Unipin ID
    {
      name: 'unipin',
      fn: () => axios.get('https://www.unipin.com/id/topup/mobilelegends/checkuser', {
        params: { user_id: userId, zone_id: zoneId },
        headers: { 'Referer': 'https://www.unipin.com/id/topup/mobilelegends', 'User-Agent': 'Mozilla/5.0' },
        timeout: 8000
      })
    }
  ]

  for (const ep of endpoints) {
    try {
      const { data } = await ep.fn()
      results.push({ name: ep.name, status: 'ok', data })
    } catch (err) {
      results.push({ name: ep.name, status: 'error', message: err.message })
    }
  }

  return res.json({ results })
}

module.exports = { meta, handler }