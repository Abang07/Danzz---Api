const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

const ENDPOINT_META = {
  // ai
  'editimage':        { param: 'url',      desc: 'Edit gambar dengan AI (?url= & ?prompt=)',         placeholder: 'https://example.com/image.jpg' },
  'openai':           { param: 'text',     desc: 'Tanya jawab dengan AI (GPT)',                       placeholder: 'Halo apa kabar' },
  // downloader
  'capcut':           { param: 'url',      desc: 'Download template CapCut',                          placeholder: 'https://www.capcut.com/template-detail/xxx' },
  'facebook':         { param: 'url',      desc: 'Download video Facebook',                           placeholder: 'https://www.facebook.com/watch?v=xxx' },
  'instagram':        { param: 'url',      desc: 'Download foto/video Instagram',                     placeholder: 'https://www.instagram.com/p/xxx' },
  'tiktok':           { param: 'url',      desc: 'Download video/slideshow TikTok tanpa watermark',   placeholder: 'https://vt.tiktok.com/xxx' },
  'youtube':          { param: 'url',      desc: 'Download audio/video YouTube (?type=video untuk MP4)', placeholder: 'https://youtu.be/xxx' },
  // game
  'tebakkata':        { param: '',         desc: 'Tebak kata — soal acak tanpa parameter',            placeholder: '' },
  // maker
  'brat':             { param: 'text',     desc: 'Generate gambar Brat style',                        placeholder: 'Good morning' },
  'brat-video':       { param: 'text',     desc: 'Generate video Brat style (MP4)',                   placeholder: 'Just friend ygy' },
  'fakeff':           { param: 'template', desc: 'Fake Free Fire card (?template=1-11 &name=NamaMu)', placeholder: '1' },
  'iqc':              { param: 'text',     desc: 'Generate IQC card (?text=Teks &time=09.31)',         placeholder: 'Hello World' },
  // manga
  'komik-detail':     { param: 'url',      desc: 'Detail komik dari Komikindo',                       placeholder: 'https://komikindo.ch/manga/xxx' },
  'komik-download':   { param: 'url',      desc: 'Download halaman chapter komik',                    placeholder: 'https://komikindo.ch/xxx-chapter-1' },
  'komik-search':     { param: 'keyword',  desc: 'Cari komik di Komikindo',                           placeholder: 'one piece' },
  'webtoon-detail':   { param: 'url',      desc: 'Detail webtoon + daftar episode',                   placeholder: 'https://www.webtoons.com/id/xxx' },
  'webtoon-download': { param: 'url',      desc: 'Download gambar episode webtoon',                   placeholder: 'https://www.webtoons.com/id/xxx/viewer?xxx' },
  'webtoon-search':   { param: 'keyword',  desc: 'Cari webtoon',                                      placeholder: 'tower of god' },
  // news
  'detik':            { param: 'action',   desc: 'Berita Detik (?action=latest|populer|search|detail)', placeholder: 'latest' },
  'liputan6-latest':  { param: 'limit',    desc: 'Berita terbaru Liputan6 (?limit=10)',                placeholder: '10' },
  'liputan6-search':  { param: 'q',        desc: 'Cari berita di Liputan6',                           placeholder: 'politik' },
  // search
  'cookpad':          { param: 'text',     desc: 'Cari resep masakan di Cookpad',                     placeholder: 'nasi goreng' },
  'gsmarena':         { param: 'q',        desc: 'Cari spesifikasi HP di GSMArena',                   placeholder: 'samsung galaxy s24' },
  // stalker
  'stalk-ig':         { param: 'username', desc: 'Stalk profil Instagram',                            placeholder: 'instagram' },
  'stalk-tiktok':     { param: 'username', desc: 'Stalk profil TikTok',                               placeholder: 'khaby.lame' },
  // tools
  'cekxl':            { param: 'nomor',    desc: 'Cek info paket nomor XL',                           placeholder: '087812345678' },
  'hd':               { param: 'url',      desc: 'Enhance gambar ke Ultra HD (AI)',                   placeholder: 'https://example.com/image.jpg' },
  'hd-video':         { param: 'url',      desc: 'Enhance video ke Ultra HD (AI)',                    placeholder: 'https://example.com/video.mp4' },
  'removebg':         { param: 'url',      desc: 'Hapus background gambar (AI)',                      placeholder: 'https://example.com/image.jpg' },
};

const apiDir = path.join(__dirname, 'api');
const endpoints = [];

fs.readdirSync(apiDir).forEach(category => {
  const categoryPath = path.join(apiDir, category);
  if (!fs.statSync(categoryPath).isDirectory()) return;

  fs.readdirSync(categoryPath).forEach(file => {
    if (!file.endsWith('.js')) return;
    const name = file.replace('.js', '');
    const mod = require(`./api/${category}/${file}`);
    app.get(`/api/${category}/${name}`, mod.handler);

    const fileMeta = mod.meta || {};
    const mapMeta  = ENDPOINT_META[name] || {};

    endpoints.push({
      path:        `/api/${category}/${name}`,
      param:       fileMeta.param       ?? mapMeta.param       ?? 'url',
      desc:        fileMeta.desc        ?? mapMeta.desc        ?? '',
      placeholder: fileMeta.placeholder ?? mapMeta.placeholder ?? '',
      params:      fileMeta.params      ?? null,  // ← fix: expose params array ke frontend
    });

    console.log(`[✓] Loaded: /api/${category}/${name}`);
  });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/api/list', (req, res) => {
  res.json({ status: true, total: endpoints.length, endpoints });
});

app.use((req, res) => {
  res.status(404).json({ status: false, message: '404 - Endpoint tidak ditemukan' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API jalan di port ${PORT}`));

module.exports = app;
