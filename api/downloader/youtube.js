const { exec } = require('child_process')
const { promisify } = require('util')

const execAsync = promisify(exec)

async function downloadYoutubeYtdlp(videoUrl) {
  try {
    const { stdout } = await execAsync(`yt-dlp --dump-json --no-playlist "${videoUrl}"`)
    const data = JSON.parse(stdout)

    const formats = data.formats || []

    // Filter format yang ada URL-nya
    const downloads = formats
      .filter(f => f.url && (f.ext === 'mp4' || f.ext === 'webm' || f.acodec !== 'none'))
      .map(f => ({
        label: f.height ? `${f.ext.toUpperCase()} ${f.height}p` : `${f.ext.toUpperCase()} (audio)`,
        url: f.url,
        itag: f.format_id,
        mime: f.ext,
        filesize: f.filesize || null,
        hasVideo: f.vcodec !== 'none',
        hasAudio: f.acodec !== 'none',
      }))
      // Urutkan: video dulu, audio di bawah
      .sort((a, b) => {
        if (a.hasVideo && !b.hasVideo) return -1
        if (!a.hasVideo && b.hasVideo) return 1
        return 0
      })

    return {
      title: data.title,
      thumbnail: data.thumbnail,
      channel: {
        name: data.uploader || data.channel,
        avatar: data.uploader_url || null,
        subscribers: data.channel_follower_count || null,
      },
      duration: data.duration_string,
      downloads,
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
