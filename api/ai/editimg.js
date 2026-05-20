/*
  AI Image Editor — Gemini Edition (Updated)
  Model: gemini-2.5-flash-image (free tier: 500 RPD)
  Requires: npm install @google/genai
*/

const { GoogleGenAI } = require('@google/genai')
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

async function editImageWithGemini(imagePath, mimeType, prompt) {
  const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY })

  const imageBase64 = fs.readFileSync(imagePath).toString('base64')

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: [
      {
        inlineData: {
          mimeType: mimeType,
          data: imageBase64
        }
      },
      { text: prompt }
    ],
    config: {
      responseModalities: ['TEXT', 'IMAGE']
    }
  })

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

  try {
    const { tmpPath: tp, contentType } = await downloadImageToTemp(imageUrl)
    tmpPath = tp

    const { imageBase64, mimeType, text } = await editImageWithGemini(tmpPath, contentType, prompt)

    return res.json({
      status: true,
      creator: 'Danzz',
      model: 'gemini-2.5-flash-image',
      text: text || null,
      mimeType,
      image: `data:${mimeType};base64,${imageBase64}`
    })

  } catch (err) {
    return res.status(500).json({ status: false, message: err.message })
  } finally {
    if (tmpPath && fs.existsSync(tmpPath)) fs.unlinkSync(tmpPath)
  }
}

module.exports = { handler }
  
