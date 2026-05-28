const meta = {
  param: 'q',
  desc: 'Cari Instagram Reels via Google CSE',
  placeholder: 'Contoh: dance tutorial'
}

async function handler(req, res) {
  const query = (req.query.q || '').trim()
  const num = parseInt(req.query.num) || 10

  if (!query)
    return res.status(400).json({ status: false, message: 'Parameter q diperlukan. Contoh: ?q=dance tutorial' })

  try {
    const axios = require('axios')
    const cx = 'e500c3a7a523b49df'

    const ins = axios.create({
      headers: {
        'user-agent': 'Mozilla/5.0 (Linux; Android 16; SM-F966B Build) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Mobile Safari/537.36',
        'x-client-data': 'CJDjygE='
      }
    })

    const { data: init } = await ins.get('https://cse.google.com/cse.js', { params: { cx } })

    const cfg_ = init.match(/}\)\(({[\s\S]*?})\);/)
    if (!cfg_?.[1]) throw new Error('Failed to found config')
    const cfg = JSON.parse(cfg_[1])

    const { data: raw } = await ins.get('https://cse.google.com/cse/element/v1', {
      params: {
        rsz: 'filtered_cse',
        num,
        hl: 'id',
        source: 'gcsc',
        cselibv: cfg.cselibVersion,
        cx,
        q: query,
        safe: 'off',
        cse_tok: cfg.cse_token,
        lr: '',
        cr: '',
        gl: 'id',
        filter: 0,
        sort: '',
        as_oq: '',
        as_sitesearch: '',
        exp: 'cc,apo',
        oq: '',
        callback: 'google.search.cse.api11171',
        rurl: Buffer.from('aHR0cHM6Ly9yZWVsc2ZpbmRlci5zYXRpc2h5YWRhdi5jb20v', 'base64').toString()
      }
    })

    const jsonString = raw.slice(raw.indexOf('{'), raw.lastIndexOf('}') + 1)
    const jsonData = JSON.parse(jsonString)

    if (!jsonData.results?.length)
      return res.json({ status: false, message: 'Tidak ada hasil ditemukan' })

    return res.json({
      status: true,
      total: jsonData.results.length,
      data: jsonData.results.map(item => ({
        title: item.richSnippet?.metatags?.ogTitle || '',
        description: item.richSnippet?.metatags?.ogDescription || '',
        url: item.url,
        image: item.richSnippet?.metatags?.ogImage || ''
      }))
    })

  } catch (err) {
    return res.status(500).json({ status: false, message: err.message })
  }
}

module.exports = { meta, handler }