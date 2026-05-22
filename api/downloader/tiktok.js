const cloudscraper = require('cloudscraper');
const cheerio = require('cheerio');

async function downloadTikTok(tiktokUrl) {
  const options = {
    uri: 'https://tikdownloader.io/api/ajaxSearch',
    formData: { q: tiktokUrl, lang: 'en' },
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'Referer': 'https://tikdownloader.io/en'
    }
  };

  const responseString = await cloudscraper.post(options);
  const resData = JSON.parse(responseString);

  if (resData.status !== 'ok' || !resData.data) {
    throw new Error('Gagal mengambil data dari sumber.');
  }

  const $ = cheerio.load(resData.data);
  const title = $('.content h3').text().trim();
  const thumbnail = $('.thumbnail img').attr('src');

  let downloadLinks = { mp4_1: '', mp4_2: '', mp4_hd: '', mp3: '' };
  let photos = [];

  $('.slide-image img, .photo-slide img, img[src*="photomode"]').each((_, el) => {
    const src = $(el).attr('src') || $(el).attr('data-src');
    if (src && !photos.includes(src)) photos.push(src);
  });

  if (photos.length === 0) {
    $('.swiper-slide img, .image-slide img').each((_, el) => {
      const src = $(el).attr('src') || $(el).attr('data-src');
      if (src && !photos.includes(src)) photos.push(src);
    });
  }

  $('.dl-action p a').each((_, el) => {
    const link = $(el).attr('href');
    const text = $(el).text().toLowerCase();
    if (text.includes('mp4 [1]')) downloadLinks.mp4_1 = link;
    else if (text.includes('mp4 [2]')) downloadLinks.mp4_2 = link;
    else if (text.includes('mp4 hd')) downloadLinks.mp4_hd = link;
    else if (text.includes('mp3')) downloadLinks.mp3 = link;
  });

  const isSlideshow = photos.length > 0;

  return {
    title,
    thumbnail,
    type: isSlideshow ? 'slideshow' : 'video',
    downloadLinks,
    photos: isSlideshow ? photos : []
  };
}

async function handler(req, res) {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({
      status: false,
      message: 'Parameter url wajib diisi! Contoh: /api/downloader/tiktok?url=https://vt.tiktok.com/xxx'
    });
  }

  try {
    const data = await downloadTikTok(url);
    res.json({ status: true, creator: 'Danzz', result: data });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
}

module.exports = { handler };
