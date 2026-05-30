const PDFDocument = require('pdfkit');
const SVGtoPDF = require('svg-to-pdfkit');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const STORE_ICON_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M15 21v-5a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v5"/>
  <path d="M17.8 9.6a2 2 0 0 1-3.6 0 2 2 0 0 1-3.6 0 2 2 0 0 1-3.6 0"/>
  <path d="M3 21h18"/>
  <path d="M4 21V9"/>
  <path d="M20 21V9"/>
  <path d="M4 9h16"/>
  <path d="M5 9l1.2-5h11.6L19 9"/>
  <path d="M10 13h4"/>
</svg>
`;

const meta = {
    param: 'toko,kasir,pelanggan,bayar,nama1,qty1,harga1',
    desc: 'Generate Struk Belanja (PNG)',
    placeholder: 'toko=Karis Jaya&kasir=Admin&pelanggan=Budi&bayar=20000&nama1=Ayam Bakar&qty1=1&harga1=15000',
    params: [
        { name: 'toko',            placeholder: 'Nama Toko'                     },
        { name: 'alamatToko',      placeholder: 'Jl. Contoh No.1'               },
        { name: 'kotaToko',        placeholder: 'Surabaya'                      },
        { name: 'telpToko',        placeholder: '0812345678'                    },
        { name: 'kasir',           placeholder: 'Admin'                         },
        { name: 'pelanggan',       placeholder: 'Budi'                          },
        { name: 'alamatPelanggan', placeholder: 'Jl. Diponegoro 1'             },
        { name: 'nomorStruk',      placeholder: 'No.123456 (opsional)'          },
        { name: 'nama1',           placeholder: 'Nama produk ke-1'              },
        { name: 'qty1',            placeholder: 'Jumlah produk ke-1'            },
        { name: 'satuan1',         placeholder: 'Satuan ke-1 misal: pcs/lusin'  },
        { name: 'harga1',          placeholder: 'Harga satuan ke-1'             },

        { name: 'bayar',           placeholder: 'Jumlah bayar'                  },
        { name: 'metodeBayar',     placeholder: 'Cash'                          }
    ]
};

// ======================
// HELPERS
// ======================
function rupiah(value) {
    return `Rp ${Number(value || 0).toLocaleString('id-ID')}`;
}
function angka(value) {
    return Number(value || 0).toLocaleString('id-ID');
}
function waktuSekarang() {
    const parts = new Intl.DateTimeFormat('id-ID', {
        timeZone: 'Asia/Jakarta',
        year: 'numeric', month: '2-digit', day: '2-digit',
        hour: '2-digit', minute: '2-digit', hour12: false
    }).formatToParts(new Date());
    const get = (type) => parts.find((p) => p.type === type)?.value;
    return {
        tanggal: `${get('year')}-${get('month')}-${get('day')}`,
        jam:     `${get('hour')}.${get('minute')}`
    };
}
function safeFileName(value) {
    return String(value || '').replace(/[^a-zA-Z0-9-_]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
}
function hitungQty(items) {
    return items.reduce((t, i) => t + Number(i.qtyTotal ?? i.qty ?? 0), 0);
}
function hitungTotal(items) {
    return items.reduce((t, i) => t + Number(i.qty || 0) * Number(i.harga || 0), 0);
}
function hitungTinggi(items) {
    return Math.max(520, 385 + items.length * 48);
}

// parse items dari query: nama1, qty1, satuan1, harga1, nama2, dst
function parseItemsFromQuery(query) {
    const items = [];
    let i = 1;
    while (query[`nama${i}`]) {
        items.push({
            nama:   query[`nama${i}`]   || '-',
            qty:    Number(query[`qty${i}`]   || 1),
            satuan: query[`satuan${i}`] || '',
            harga:  Number(query[`harga${i}`] || 0)
        });
        i++;
    }
    return items;
}

// ======================
// GENERATE PDF → Buffer
// ======================
async function generatePDFBuffer(data = {}) {
    const {
        toko = {}, kasir = '-', pelanggan = '-',
        alamatPelanggan = '', nomorStruk = null,
        items = [], bayar = 0, metodeBayar = 'Cash'
    } = data;

    const now             = waktuSekarang();
    const finalNomorStruk = nomorStruk || `No.${Date.now().toString().slice(-6)}`;
    const lebarKertas     = 280;
    const margin          = 22;
    const contentWidth    = lebarKertas - margin * 2;

    return new Promise((resolve, reject) => {
        const doc    = new PDFDocument({
            size: [lebarKertas, hitungTinggi(items)],
            margins: { top: 16, bottom: 16, left: margin, right: margin }
        });
        const chunks = [];
        doc.on('data', chunk => chunks.push(chunk));
        doc.on('end', () => resolve(Buffer.concat(chunks)));
        doc.on('error', reject);

        const center = (text, opts = {}) =>
            doc.text(String(text ?? ''), margin, doc.y, { width: contentWidth, align: 'center', ...opts });

        const dashedLine = () => {
            doc.moveDown(0.55);
            const y = doc.y;
            doc.save().lineWidth(0.7).dash(4, { space: 4 })
                .moveTo(margin, y).lineTo(margin + contentWidth, y)
                .stroke().undash().restore();
            doc.moveDown(0.75);
        };

        const infoRow = (left, right) => {
            const y = doc.y;
            doc.text(String(left ?? ''), margin, y, { width: contentWidth * 0.45 });
            doc.text(String(right ?? ''), margin + contentWidth * 0.45, y, { width: contentWidth * 0.55, align: 'right' });
            doc.moveDown(0.5);
        };

        const row = (left, right) => {
            const y = doc.y;
            doc.text(String(left ?? ''), margin, y, { width: contentWidth * 0.5 });
            doc.text(String(right ?? ''), margin + contentWidth * 0.5, y, { width: contentWidth * 0.5, align: 'right' });
            doc.moveDown(0.42);
        };

        const iconSize = 48;
        SVGtoPDF(doc, STORE_ICON_SVG, (lebarKertas - iconSize) / 2, doc.y, {
            width: iconSize, height: iconSize, preserveAspectRatio: 'xMidYMid meet'
        });
        doc.y += iconSize + 9;

        doc.font('Helvetica').fontSize(14);
        center(toko.nama || 'Karis Jaya Shop');
        doc.font('Helvetica').fontSize(9.5);
        if (toko.alamat) center(toko.alamat);
        if (toko.kota)   center(toko.kota);
        if (toko.telp)   center(`No. Telp ${toko.telp}`);

        dashedLine();

        doc.font('Helvetica').fontSize(10);
        infoRow(now.tanggal, kasir);
        infoRow(now.jam, pelanggan);
        if (alamatPelanggan) {
            doc.text(alamatPelanggan, margin, doc.y, { width: contentWidth, align: 'right' });
            doc.moveDown(0.65);
        }
        doc.text(finalNomorStruk, margin, doc.y, { width: contentWidth });

        dashedLine();

        let total = 0;
        items.forEach((item, index) => {
            const nama     = item.nama   || '-';
            const qty      = Number(item.qty   || 0);
            const satuan   = item.satuan || '';
            const harga    = Number(item.harga || 0);
            const subtotal = qty * harga;
            const detail   = satuan ? `  ${qty} ${satuan} x ${angka(harga)}` : `  ${qty} x ${angka(harga)}`;
            total += subtotal;

            doc.font('Helvetica-Bold').fontSize(10.5);
            doc.text(`${index + 1}. ${nama}`, margin, doc.y, { width: contentWidth });
            const y = doc.y;
            doc.font('Helvetica').fontSize(9.5);
            doc.text(detail, margin, y, { width: contentWidth * 0.58 });
            doc.font('Helvetica').fontSize(10.5);
            doc.text(rupiah(subtotal), margin + contentWidth * 0.58, y, { width: contentWidth * 0.42, align: 'right' });
            doc.moveDown(0.75);
        });

        dashedLine();

        const totalQty = hitungQty(items);
        const subTotal = hitungTotal(items);
        const kembali  = Number(bayar || 0) - subTotal;

        doc.font('Helvetica').fontSize(10);
        doc.text(`Total QTY : ${totalQty}`, margin, doc.y);
        doc.moveDown(1.05);

        row('Sub Total', rupiah(subTotal));

        const yTotal = doc.y;
        doc.font('Helvetica-Bold').fontSize(12);
        doc.text('Total', margin, yTotal, { width: contentWidth * 0.45 });
        doc.font('Helvetica-Bold').fontSize(14);
        doc.text(rupiah(total), margin + contentWidth * 0.45, yTotal, { width: contentWidth * 0.55, align: 'right' });
        doc.moveDown(0.68);

        doc.font('Helvetica').fontSize(10);
        row(`Bayar (${metodeBayar})`, rupiah(bayar));
        row('Kembali', rupiah(kembali));

        doc.moveDown(1.1);
        doc.font('Helvetica').fontSize(10.5);
        center('Terimakasih Telah Berbelanja');
        doc.moveDown(0.3);
        doc.font('Helvetica').fontSize(8.5);
        center('Simpan struk ini sebagai bukti pembayaran');

        doc.end();
    });
}

// PDF Buffer → PNG Buffer via Ghostscript
function pdfToPng(pdfBuffer, dpi = 200) {
    const id     = Date.now();
    const tmpPdf = `/tmp/struk-${id}.pdf`;
    const tmpPng = `/tmp/struk-${id}.png`;
    try {
        fs.writeFileSync(tmpPdf, pdfBuffer);
        execSync(`ghostscript -dNOPAUSE -dBATCH -sDEVICE=png16m -r${dpi} -dFITPage -sOutputFile="${tmpPng}" "${tmpPdf}"`, { timeout: 30000 });
        return fs.readFileSync(tmpPng);
    } finally {
        try { fs.unlinkSync(tmpPdf); } catch (_) {}
        try { fs.unlinkSync(tmpPng); } catch (_) {}
    }
}

// ======================
// HANDLER
// ======================
async function handler(req, res) {
    const isPost = req.method === 'POST';
    const body   = isPost ? (req.body || {}) : req.query;

    const { toko, alamatToko, kotaToko, telpToko, kasir, pelanggan, alamatPelanggan, nomorStruk, bayar, metodeBayar } = body;

    // parse items dari nama1, qty1, harga1, nama2, dst
    const parsedItems = parseItemsFromQuery(body);

    if (!parsedItems || parsedItems.length === 0) {
        return res.status(400).json({
            status:  false,
            message: 'Minimal 1 produk wajib diisi (nama1, qty1, harga1)',
            contoh:  '/api/maker/struk?toko=Karis Jaya&kasir=Admin&pelanggan=Budi&bayar=20000&nama1=Ayam Bakar&qty1=1&harga1=15000&nama2=Es Teh&qty2=2&harga2=5000'
        });
    }

    try {
        const pdfBuf = await generatePDFBuffer({
            toko:   { nama: toko || 'Karis Jaya Shop', alamat: alamatToko || '', kota: kotaToko || '', telp: telpToko || '' },
            kasir:           kasir           || '-',
            pelanggan:       pelanggan       || '-',
            alamatPelanggan: alamatPelanggan || '',
            nomorStruk:      nomorStruk      || null,
            items:           parsedItems,
            bayar:           Number(bayar    || 0),
            metodeBayar:     metodeBayar     || 'Cash'
        });

        const pngBuf = pdfToPng(pdfBuf);

        res.setHeader('Content-Type', 'image/png');
        return res.send(pngBuf);

    } catch (err) {
        return res.status(500).json({ status: false, message: err.message });
    }
}

module.exports = { meta, handler };