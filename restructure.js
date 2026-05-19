const fs = require("fs");
const path = require("path");

// Base folder
const API_DIR = path.join(__dirname, "api");

// Mapping file -> subfolder tujuan
const fileMap = {
  // Downloader
  "tiktok.js":    "downloader",
  "instagram.js": "downloader",
  "youtube.js":   "downloader",

  // Stalker
  "stalk-tiktok.js": "stalker",

  // Tools
  "hd.js":       "tools",
  "removebg.js": "tools",

  // Game
  "tebakkata.js":   "game",
  "tebakkata.json": "game",

  // News / Scraper
  "liputan6-latest.js": "news",
  "liputan6-search.js": "news",

  // AI
  "gemini.js": "ai",
};

function restructure() {
  const subfolders = [...new Set(Object.values(fileMap))];
  for (const folder of subfolders) {
    const folderPath = path.join(API_DIR, folder);
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
      console.log(`📁 Folder dibuat: api/${folder}`);
    }
  }

  for (const [file, folder] of Object.entries(fileMap)) {
    const src  = path.join(API_DIR, file);
    const dest = path.join(API_DIR, folder, file);

    if (fs.existsSync(src)) {
      fs.renameSync(src, dest);
      console.log(`✅ Dipindahkan: api/${file} → api/${folder}/${file}`);
    } else {
      console.warn(`⚠️  File tidak ditemukan, dilewati: api/${file}`);
    }
  }

  console.log("\n🎉 Selesai! Struktur baru:");
  printTree(API_DIR, "");
}

function printTree(dir, indent) {
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const isDir = fs.statSync(fullPath).isDirectory();
    console.log(`${indent}${isDir ? "📁" : "📄"} ${item}`);
    if (isDir) printTree(fullPath, indent + "   ");
  }
}

restructure();
