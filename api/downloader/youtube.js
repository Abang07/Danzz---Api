const { exec } = require('child_process')
const { promisify } = require('util')
const fs = require('fs')
const path = require('path')

const execAsync = (cmd) => promisify(exec)(cmd, { timeout: 300000, maxBuffer: 1024 * 1024 * 600 })

const YTDLP = '/usr/local/bin/yt-dlp'
const PYTHON = '/usr/bin/python3'

async function downloadAudio(videoUrl) {
  const { stdout } = await execAsync(`${PYTHON} ${YTDLP} --dump-json --no-playlist "${videoUrl}"`)
  const data = JSON.parse(stdout)

  const tmpFile = path.join('/tmp', `audio_${Date.now()}.m4a`)
  await execAsync(`${PYTHON} ${YTDLP} -f "140/bestaudio[ext=m4a]/bestaudio" -o "${tmpFile}" --no-playlist "${videoUrl}"`)

  const fileBuffer = fs.readFileSync(tmpFile)
  const base64 = fileBuffer.toString('base64')
  const filesize = fs.statSync(tmpFile).size
  fs.unlinkSync(tmpFile)

  return {
    title: data.title,
    thumbnail: data.thumbnail,
    channel: { name: data.uploader || data.channel },
    duration: data.duration_string,
    filesize,
    mime: 'm4a',
    base64,
  }
}

async function downloadVideo(videoUrl) {
  const { stdout } = await execAsync(`${PYTHON} ${YTDLP} --dump-json --no-playlist "${videoUrl}"`)
  const data = JSON.parse(stdout)

  const tmpFile = path.join('/tmp', `video_${Date.now()}.mp4`)

  await execAsync(`${PYTHON} ${YTDLP} -f "18/22/bestvideo[ext=mp4][height<=480]+bestaudio[ext=m4a]" -o "${tmpFile}" --no-playlist --merge-output-format mp4 "${videoUrl}"`)

  const fileBuffer = fs.readFileSync(tmpFile)
  const base64 = fileBuffer.toString('base64')
  const filesize = fs.statSync(tmpFile).size
  fs.unlinkSync(tmpFile)

  return {
    title: data.title,
    thumbnail: data.thumbnail,
    channel: { name: data.uploader || data.channel },
    duration: data.duration_string,
    filesize,
    mime: 'mp4',
    base64,
  }
}

async function handler(req, res) {
  const { url, type } = req.query

  if (!url) return res.status(400).json({
    status: false,
    message: 'Query ?url= wajib diisi',
  })

  if (!url.includes('youtube.com') && !url.includes('youtu.be')) {
    return res.status(400).json({ status: false, message: 'URL YouTube tidak valid.' })
  }

  req.setTimeout(300000)
  res.setTimeout(300000)

  try {
    const result = type === 'video' ? await downloadVideo(url) : await downloadAudio(url)

    if (result.filesize > 100 * 1024 * 1024) {
      return res.status(400).json({ status: false, message: `File terlalu besar (${(result.filesize / 1024 / 1024).toFixed(1)} MB), maks 500 MB` })
    }

    return res.json({ status: true, ...result })
  } catch (err) {
    return res.status(500).json({ status: false, message: err.message })
  }
}

module.exports = { handler }
