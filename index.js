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

// Auto-load semua file dari subfolder api/kategori/
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

    // Ambil meta jika ada (param, desc, placeholder)
    const meta = mod.meta || {};
    endpoints.push({
      path:        `/api/${category}/${name}`,
      param:       meta.param       || 'url',
      desc:        meta.desc        || '',
      placeholder: meta.placeholder || '',
    });

    console.log(`[✓] Loaded: /api/${category}/${name}`);
  });
});

// Halaman utama
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Expose daftar endpoint ke frontend — INI YANG PENTING
app.get('/api/list', (req, res) => {
  res.json({ status: true, total: endpoints.length, endpoints });
});

// 404
app.use((req, res) => {
  res.status(404).json({ status: false, message: '404 - Endpoint tidak ditemukan' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API jalan di port ${PORT}`));

module.exports = app;
        
