const { exec } = require('child_process')
const { promisify } = require('util')
const fs = require('fs')
const path = require('path')

const execAsync = promisify(exec)

const YTDLP = '/usr/local/bin/yt-dlp'
const PYTHON = '/usr/bin/python3'

async function downloadYoutubeYtdlp(videoUrl) {
  try {
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
      channel: {
        name: data.uploader || data.channel,
        avatar: data.uploader_url || null,
        subscribers: data.channel_follower_count || null,
      },
      duration: data.duration_string,
      filesize,
      mime: 'm4a',
      base64,
    }
  } catch (err) {
    throw new Error(`yt-dlp error: ${err.message}`)
  }
}

async function handler(req, res) {
  const { url } = req.query

  if (!url) return res.status(400).json({
    status: false,
    message: 'Query ?url= wajib diisi',
    example: '/api/downloader/youtube?url=https://youtu.be/xxx'
  })

  if (!url.includes('youtube.com') && !url.includes('youtu.be')) {
    return res.status(400).json({ status: false, message: 'URL YouTube tidak valid.' })
  }

  try {
    const result = await downloadYoutubeYtdlp(url)
    return res.json({ status: true, ...result })
  } catch (err) {
    return res.status(500).json({ status: false, message: err.message })
  }
}

module.exports = { handler }
