/*
  AI Image Editor — Gemini Edition
  Replaces live3d.io scraper
  Requires: @google/generative-ai
  Install: npm install @google/generative-ai
*/

const { GoogleGenerativeAI } = require('@google/generative-ai')
const fs = require('fs')
const path = require('path')
const os = require('os')

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || 'AIzaSyAmTFA9sBiLr74nqxodixxeUPuErCsoMGM'

async function downloadImageToTemp(imageUrl) {
  const res = await fetch(imageUrl)
  if (!res.ok) throw new Error(`Gagal download gambar: ${res.status} ${res.statusText}`)
  const contentType = res.headers.get('content-type') || 'image/jpeg'
  const ext = contentType.includes('png') ? '.png' : contentType.includes('webp') ? '.webp' : '.jpg'
  const tmpPath = path.join(os.tmpdir(), `gemini_edit_${Date.now()}${ext}`)
  fs.writeFileSync(tmpPath, Buffer.from(await res.arrayBuffer()))
  return { tmpPath, contentType }
}

function imageToBase64(filePath) {
  return fs.readFileSync(filePath).toString('base64')
}

async function editImageWithGemini(imageBase64, mimeType, prompt) {
  const genAI = new GoogleGenerativeAI(GEMINI_API_KEY)

  const model = genAI.getGenerativeModel({
    model: 'gemini-2.0-flash-exp-image-generation',
    generationConfig: {
      responseModalities: ['Text', 'Image']
    }
  })

  const result = await model.generateContent([
    {
      inlineData: {
        data: imageBase64,
        mimeType: mimeType
      }
    },
    { text: prompt }
  ])

  const response = result.response
  let resultText = null
  let resultImageBase64 = null
  let resultMimeType = 'image/png'

  for (const part of response.candidates[0].content.parts) {
    if (part.text) {
      resultText = part.text
    } else if (part.inlineData) {
      resultImageBase64 = part.inlineData.data
      resultMimeType = part.inlineData.mimeType || 'image/png'
    }
  }

  if (!resultImageBase64) throw new Error('Gemini tidak mengembalikan gambar. Coba prompt yang lebih spesifik.')

  return { imageBase64: resultImageBase64, mimeType: resultMimeType, text: resultText }
}

async function handler(req, res) {
  const { imageUrl, prompt } = req.query

  if (!imageUrl) {
    return res.status(400).json({
      status: false,
      message: 'Query ?imageUrl= wajib diisi',
      example: '/api/ai/editimg?imageUrl=https://example.com/foto.jpg&prompt=ubah agar dia tersenyum'
    })
  }

  if (!prompt) {
    return res.status(400).json({
      status: false,
      message: 'Query ?prompt= wajib diisi',
      example: '/api/ai/editimg?imageUrl=https://example.com/foto.jpg&prompt=ubah agar dia tersenyum'
    })
  }

  try { new URL(imageUrl) } catch {
    return res.status(400).json({ status: false, message: 'imageUrl bukan URL yang valid' })
  }

  let tmpPath = null
  let outPath = null

  try {
    // 1. Download gambar input
    const { tmpPath: tp, contentType } = await downloadImageToTemp(imageUrl)
    tmpPath = tp

    // 2. Konversi ke base64
    const imageBase64 = imageToBase64(tmpPath)

    // 3. Edit pakai Gemini
    const { imageBase64: editedBase64, mimeType: editedMime, text } = await editImageWithGemini(
      imageBase64,
      contentType,
      prompt
    )

    // 4. Simpan hasil ke temp, lalu kirim sebagai response base64
    //    (atau simpan ke storage kamu sendiri kalau mau return URL)
    const ext = editedMime.includes('png') ? '.png' : editedMime.includes('webp') ? '.webp' : '.jpg'
    outPath = path.join(os.tmpdir(), `gemini_result_${Date.now()}${ext}`)
    fs.writeFileSync(outPath, Buffer.from(editedBase64, 'base64'))

    // Kirim sebagai base64 data URL — ganti bagian ini kalau mau upload ke CDN
    return res.json({
      status: true,
      creator: 'Danzz',
      model: 'gemini-2.0-flash-exp-image-generation',
      text: text || null,
      mimeType: editedMime,
      image: `data:${editedMime};base64,${editedBase64}`
    })

  } catch (err) {
    return res.status(500).json({ status: false, message: err.message })
  } finally {
    if (tmpPath && fs.existsSync(tmpPath)) fs.unlinkSync(tmpPath)
    if (outPath && fs.existsSync(outPath)) fs.unlinkSync(outPath)
  }
}

module.exports = { handler }
    
