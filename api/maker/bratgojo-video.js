const { createCanvas, loadImage } = require('canvas');
const { registerFont } = require('canvas');
const fs = require('fs');
const fsp = require('fs/promises');
const path = require('path');
const os = require('os');
const { execFile } = require('child_process');
const { promisify } = require('util');

const execFileAsync = promisify(execFile);

// ======================
// CONFIG
// ======================
const BRAT_IMAGE_URL = 'https://raw.githubusercontent.com/Ditzzx-vibecoder/Assets/main/Brat/Gojo.jpeg';
const BRAT_FONT_URL  = 'https://raw.githubusercontent.com/Ditzzx-vibecoder/Assets/main/Brat/Poppins.ttf';

const CANVAS = { width: 1254, height: 1254 };
const SAFE_ZONE = { a: 660, b: 1180, c: 270, d: 990 };

const TEXT_STYLE = {
    fontFamily: 'Poppins',
    maxFontSize: 90,
    minFontSize: 22,
    lineHeight:  1.18,
    color:       '#111111',
    align:       'center'
};

const VIDEO_CONFIG = {
    fps: 24,
    width: 512,
    height: 512,
    lyric: {
        maxWordPerLayer: 5,
        frameDuration: 0.7,
        lastFrameDuration: 1.5
    }
};

// ======================
// META
// ======================
const meta = {
    param:       'text',
    desc:        'Generate Brat Gojo Video dengan teks custom',
    placeholder: 'Nah, I\'d win',
    params: [
        { name: 'text', placeholder: 'Nah, I\'d win' }
    ]
};

// ======================
// CACHE
// ======================
let imageCache = null;
let fontLoaded = false;
let fontTmpPath = null;

// ======================
// HELPERS
// ======================
async function downloadBuffer(url) {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Gagal download: ${res.status} ${res.statusText}`);
    return Buffer.from(await res.arrayBuffer());
}

function normalizeText(text) {
    return String(text || '')
        .replace(/\r/g, '')
        .replace(/[ \t]+/g, ' ')
        .replace(/\n{3,}/g, '\n\n')
        .trim();
}

function tokenize(text) {
    return normalizeText(text)
        .replace(/[,，]/g, ' ')
        .split(/\s+/)
        .map(v => v.trim())
        .filter(Boolean);
}

function splitIntoLayers(tokens, maxWordPerLayer) {
    if (!Number.isFinite(maxWordPerLayer) || maxWordPerLayer <= 0) return [tokens];
    const layers = [];
    for (let i = 0; i < tokens.length; i += maxWordPerLayer) {
        layers.push(tokens.slice(i, i + maxWordPerLayer));
    }
    return layers;
}

function buildRevealFrames(text, config) {
    const tokens = tokenize(text);
    const layers = splitIntoLayers(tokens, config.lyric.maxWordPerLayer);
    const frames = [];

    for (const layer of layers) {
        let current = '';
        for (let i = 0; i < layer.length; i++) {
            current += (current ? ' ' : '') + layer[i];
            frames.push({
                text: current,
                isLastInLayer: i === layer.length - 1
            });
        }
    }

    return frames.map(frame => ({
        ...frame,
        duration: frame.isLastInLayer ? config.lyric.lastFrameDuration : config.lyric.frameDuration
    }));
}

function getSafeRect(zone) {
    return {
        x:       zone.c,
        y:       zone.a,
        w:       zone.d - zone.c,
        h:       zone.b - zone.a,
        centerX: (zone.c + zone.d) / 2,
        centerY: (zone.a + zone.b) / 2
    };
}

function setFont(ctx, size) {
    ctx.font = `${size}px ${TEXT_STYLE.fontFamily}`;
}

function splitLongWord(ctx, word, maxWidth) {
    const chars = [...word];
    const parts = [];
    let current = '';
    for (const char of chars) {
        const test = current + char;
        if (ctx.measureText(test).width <= maxWidth || !current) {
            current = test;
        } else {
            parts.push(current);
            current = char;
        }
    }
    if (current) parts.push(current);
    return parts;
}

function wrapParagraph(ctx, paragraph, maxWidth) {
    const words = paragraph.split(' ').filter(Boolean);
    const lines = [];
    let current = '';
    for (const word of words) {
        const test = current ? `${current} ${word}` : word;
        if (ctx.measureText(test).width <= maxWidth) { current = test; continue; }
        if (current) { lines.push(current); current = ''; }
        if (ctx.measureText(word).width <= maxWidth) {
            current = word;
        } else {
            const parts = splitLongWord(ctx, word, maxWidth);
            lines.push(...parts.slice(0, -1));
            current = parts.at(-1) || '';
        }
    }
    if (current) lines.push(current);
    return lines;
}

function wrapText(ctx, text, maxWidth) {
    return text.split('\n').flatMap(paragraph => {
        const clean = paragraph.trim();
        return clean ? wrapParagraph(ctx, clean, maxWidth) : [''];
    });
}

function fitText(ctx, text, rect) {
    for (let size = TEXT_STYLE.maxFontSize; size >= TEXT_STYLE.minFontSize; size--) {
        setFont(ctx, size);
        const lineHeight  = Math.ceil(size * TEXT_STYLE.lineHeight);
        const lines       = wrapText(ctx, text, rect.w);
        const totalHeight = lines.length * lineHeight;
        if (totalHeight <= rect.h) return { size, lines, lineHeight, totalHeight };
    }
    const size       = TEXT_STYLE.minFontSize;
    setFont(ctx, size);
    const lineHeight = Math.ceil(size * TEXT_STYLE.lineHeight);
    const lines      = wrapText(ctx, text, rect.w);
    const maxLines   = Math.max(1, Math.floor(rect.h / lineHeight));
    const clipped    = lines.slice(0, maxLines);
    if (lines.length > maxLines && clipped.length) {
        let last = clipped[clipped.length - 1];
        while (last.length > 0 && ctx.measureText(`${last}...`).width > rect.w) last = last.slice(0, -1);
        clipped[clipped.length - 1] = `${last}...`;
    }
    return { size, lines: clipped, lineHeight, totalHeight: clipped.length * lineHeight };
}

function drawCenteredText(ctx, text, zone) {
    const rect   = getSafeRect(zone);
    const fitted = fitText(ctx, text, rect);
    const startY = rect.y + (rect.h - fitted.totalHeight) / 2;
    ctx.save();
    ctx.beginPath();
    ctx.rect(rect.x, rect.y, rect.w, rect.h);
    ctx.clip();
    setFont(ctx, fitted.size);
    ctx.fillStyle    = TEXT_STYLE.color;
    ctx.textAlign    = TEXT_STYLE.align;
    ctx.textBaseline = 'top';
    fitted.lines.forEach((line, index) => {
        ctx.fillText(line, rect.centerX, startY + index * fitted.lineHeight);
    });
    ctx.restore();
}

async function ensureAssets() {
    if (!imageCache || !fontLoaded) {
        const [imageBuffer, fontBuffer] = await Promise.all([
            downloadBuffer(BRAT_IMAGE_URL),
            downloadBuffer(BRAT_FONT_URL)
        ]);

        // node-canvas pakai registerFont dari file path, bukan dari buffer
        // jadi font harus disimpan dulu ke tmp
        if (!fontLoaded) {
            fontTmpPath = path.join(os.tmpdir(), 'BratGojo-Poppins.ttf');
            if (!fs.existsSync(fontTmpPath)) {
                fs.writeFileSync(fontTmpPath, fontBuffer);
            }
            registerFont(fontTmpPath, { family: TEXT_STYLE.fontFamily });
            fontLoaded = true;
        }

        // node-canvas loadImage dari Buffer langsung bisa
        imageCache = await loadImage(imageBuffer);
    }
}

async function createFrame(text, filePath) {
    const canvas = createCanvas(CANVAS.width, CANVAS.height);
    const ctx    = canvas.getContext('2d');

    ctx.drawImage(imageCache, 0, 0, CANVAS.width, CANVAS.height);
    drawCenteredText(ctx, text, SAFE_ZONE);

    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(filePath, buffer);
}

function escapeConcatPath(filePath) {
    return filePath.replace(/'/g, "'\\''");
}

function buildManifest(frames, framePaths) {
    const lines = [];
    for (let i = 0; i < frames.length; i++) {
        lines.push(`file '${escapeConcatPath(framePaths[i])}'`);
        lines.push(`duration ${frames[i].duration}`);
    }
    // ffmpeg concat butuh entry terakhir tanpa duration
    lines.push(`file '${escapeConcatPath(framePaths[framePaths.length - 1])}'`);
    return lines.join('\n');
}

async function encodeVideo(concatPath, outputPath, config) {
    const args = [
        '-y',
        '-f', 'concat',
        '-safe', '0',
        '-i', concatPath,
        '-vf', `fps=${config.fps},scale=${config.width}:${config.height}:flags=lanczos`,
        '-c:v', 'libx264',
        '-preset', 'fast',
        '-crf', '18',
        '-pix_fmt', 'yuv420p',
        '-movflags', '+faststart',
        outputPath
    ];
    await execFileAsync('ffmpeg', args, { maxBuffer: 1024 * 1024 * 10 });
}

// ======================
// HANDLER
// ======================
async function handler(req, res) {
    const { text } = req.query;

    if (!text) {
        return res.status(400).json({
            status:  false,
            message: 'Query ?text= wajib diisi',
            example: '/api/maker/bratgojo-video?text=Nah Id win'
        });
    }

    const tmpDir    = await fsp.mkdtemp(path.join(os.tmpdir(), 'bratgojo-'));
    const outputPath = path.join(tmpDir, 'output.mp4');

    try {
        await ensureAssets();

        const input  = normalizeText(text);
        const frames = buildRevealFrames(input, VIDEO_CONFIG);

        if (!frames.length) throw new Error('Teks kosong setelah diproses');

        const framePaths = frames.map((_, i) =>
            path.join(tmpDir, `frame-${String(i + 1).padStart(4, '0')}.png`)
        );

        // render frames batch
        const batchSize = 5;
        for (let start = 0; start < frames.length; start += batchSize) {
            const batch = frames.slice(start, start + batchSize);
            await Promise.all(batch.map((frame, i) =>
                createFrame(frame.text, framePaths[start + i])
            ));
        }

        const concatPath = path.join(tmpDir, 'concat.txt');
        fs.writeFileSync(concatPath, buildManifest(frames, framePaths));

        await encodeVideo(concatPath, outputPath, VIDEO_CONFIG);

        const videoBuffer = fs.readFileSync(outputPath);
        res.setHeader('Content-Type', 'video/mp4');
        res.setHeader('Content-Disposition', 'inline; filename="bratgojo.mp4"');
        return res.send(videoBuffer);

    } catch (err) {
        return res.status(500).json({ status: false, message: err.message });

    } finally {
        // cleanup tmp
        await fsp.rm(tmpDir, { recursive: true, force: true }).catch(() => {});
    }
}

module.exports = { meta, handler };