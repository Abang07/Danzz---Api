const axios = require('axios');

const meta = {
  param:       'keyword',
  desc:        'Cari video di TikTok',
  placeholder: 'setup gaming kamar',
};

async function handler(req, res) {
  const { keyword, count } = req.query;

  if (!keyword) {
    return res.status(400).json({
      status: false,
      message: 'Query ?keyword= wajib diisi',
      example: '/api/search/ttsearch?keyword=setup gaming kamar'
    });
  }

  try {
    const response = await axios.post(
      'https://tikwm.com/api/feed/search',
      new URLSearchParams({
        keywords: keyword,
        count: count || 5,
        cursor: 0
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
        }
      }
    );

    const data = response.data.data;

    if (!data || !data.videos || data.videos.length === 0) {
      return res.status(404).json({
        status: false,
        message: 'Tidak ada hasil yang ditemukan'
      });
    }

    const results = data.videos.map(post => {
      const isSlide = post.images && post.images.length > 0;
      return {
        author: {
          username: post.author.unique_id,
          nickname: post.author.nickname
        },
        title:  post.title,
        likes:  post.digg_count,
        type:   isSlide ? 'foto' : 'video',
        media:  isSlide ? post.images : post.play
      };
    });

    return res.json({
      status: true,
      creator: 'Danzz',
      total: results.length,
      result: results
    });

  } catch (err) {
    return res.status(500).json({
      status: false,
      message: err.message
    });
  }
}

module.exports = { meta, handler };