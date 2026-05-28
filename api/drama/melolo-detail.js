const axios = require('axios')
const cheerio = require('cheerio')

const BASE_URL = 'https://melolo.com/id'

const meta = {
  param: 'url',
  desc: 'Detail drama Melolo',
  placeholder: 'pretty-baby',
  params: [
    {
      name: 'url',
      placeholder: 'pretty-baby'
    }
  ]
}

// =========================
// SCRAPER
// =========================
async function getDramaDetail(input) {

  if (!input)
    throw new Error('URL atau slug diperlukan')

  let url = input
  let slug = input

  // =========================
  // URL / SLUG
  // =========================
  if (input.startsWith('http')) {

    url = input

    slug =
      input
        .split('/dramas/')[1]
        ?.replace(/\/$/, '') ||
      input

  } else {

    url =
      `${BASE_URL}/dramas/${input}`

    slug = input
  }

  // =========================
  // REQUEST
  // =========================
  const res = await axios.get(url, {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 Chrome/120.0.0.0 Mobile Safari/537.36',
      'Accept-Language':
        'id-ID,id;q=0.9'
    },
    timeout: 20000
  })

  const $ = cheerio.load(res.data)

  // =========================
  // TITLE
  // =========================
  const title =
    $('h1').first().text().trim() ||
    $("meta[property='og:title']")
      .attr('content') ||
    'Tidak diketahui'

  // =========================
  // SYNOPSIS
  // =========================
  const synopsis =
    $("meta[name='description']")
      .attr('content') ||
    $("meta[property='og:description']")
      .attr('content') ||
    $('p').first().text().trim() ||
    'Tidak ada sinopsis'

  // =========================
  // RATING
  // =========================
  const rating =
    $("[class*='rating'], [class*='score']")
      .first()
      .text()
      .trim() || '-'

  // =========================
  // GENRES
  // =========================
  const genres = []

  $("a[href*='/category/']").each(
    (i, el) => {

      const genre =
        $(el).text().trim()

      if (
        genre &&
        !genres.includes(genre)
      ) {
        genres.push(genre)
      }
    }
  )

  // =========================
  // THUMBNAIL
  // =========================
  const thumbnail =
    $("meta[property='og:image']")
      .attr('content') ||
    $("img[src*='melolo']")
      .first()
      .attr('src') ||
    null

  // =========================
  // EPISODES
  // =========================
  const episodes = []

  $("a[href*='/ep']").each(
    (i, el) => {

      const href =
        $(el).attr('href')

      const epText =
        $(el).text().trim()

      if (
        href &&
        href.includes(
          `/dramas/${slug}`
        )
      ) {

        const epNum =
          href.match(/ep(\d+)/)?.[1]

        if (
          epNum &&
          !episodes.find(
            e => e.ep === epNum
          )
        ) {

          episodes.push({
            ep: epNum,
            label:
              epText ||
              `Episode ${epNum}`,
            url: href.startsWith(
              'http'
            )
              ? href
              : `https://melolo.com${href}`
          })
        }
      }
    }
  )

  // =========================
  // SORT EPISODE
  // =========================
  episodes.sort((a, b) =>
    parseInt(a.ep) -
    parseInt(b.ep)
  )

  // =========================
  // RESULT
  // =========================
  return {
    title,
    slug,
    rating,
    genres,
    synopsis,
    thumbnail,
    total_episodes:
      episodes.length,
    episodes
  }
}

// =========================
// API HANDLER
// =========================
async function handler(req, res) {

  const input =
    req.query.url ||
    req.query.slug ||
    req.query.q

  if (!input) {
    return res.status(400).json({
      status: false,
      message:
        'Parameter ?url= atau ?slug= wajib diisi'
    })
  }

  try {

    const result =
      await getDramaDetail(input)

    return res.json({
      status: true,
      creator: 'Danzz',
      result
    })

  } catch (err) {

    if (
      err.response?.status === 404
    ) {
      return res.status(404).json({
        status: false,
        message:
          'Drama tidak ditemukan'
      })
    }

    return res.status(500).json({
      status: false,
      message:
        'Terjadi kesalahan',
      error: err.message
    })
  }
}

module.exports = {
  meta,
  handler
}