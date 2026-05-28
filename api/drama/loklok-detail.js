const https = require("https");
const zlib = require("zlib");

const meta = {
  param: "url",
  desc: "Detail film KlikXXI",
  placeholder: "https://klikxxi.me/in-thy-name-2025/"
};

// ─────────────────────────────
// REQUEST
// ─────────────────────────────
function get(url) {

  return new Promise((resolve, reject) => {

    https.get(
      url,
      {
        headers: {

          "User-Agent":
            "Mozilla/5.0",

          "Accept-Encoding":
            "gzip, deflate, br",

          Referer:
            "https://klikxxi.me/",
        },
      },

      (res) => {

        let stream = res;

        const enc =
          res.headers["content-encoding"];

        if (enc === "gzip") {

          stream = res.pipe(
            zlib.createGunzip()
          );

        } else if (enc === "br") {

          stream = res.pipe(
            zlib.createBrotliDecompress()
          );
        }

        let data = "";

        stream.on("data", c => {
          data += c.toString();
        });

        stream.on("end", () => {
          resolve(data);
        });

      }

    ).on("error", reject);
  });
}

// ─────────────────────────────
// CLEAN
// ─────────────────────────────
function clean(str = "") {

  return str
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&#8211;/g, "-")
    .replace(/\s+/g, " ")
    .trim();
}

// ─────────────────────────────
// FIELD PARSER
// ─────────────────────────────
function getField(html, name) {

  const fields = [
    "Genre",
    "Quality",
    "Year",
    "Duration",
    "Country",
    "Release",
    "Language",
    "Director",
    "Cast"
  ];

  const nextFields = fields
    .filter(f => f !== name)
    .join("|");

  const rgx = new RegExp(
    `${name}:\\s*<\\/strong>\\s*([\\s\\S]*?)(?=<strong>(?:${nextFields}):|# based on true events|DOWNLOAD|RELATED MOVIES)`,
    "i"
  );

  const match = html.match(rgx);

  if (!match) return "";

  return clean(match[1]);
}

// ─────────────────────────────
// HANDLER
// ─────────────────────────────
async function handler(req, res) {

  const url =
    (req.query.url || "").trim();

  if (!url) {

    return res.status(400).json({

      status: false,

      message:
        "Parameter url diperlukan"
    });
  }

  try {

    const html =
      await get(url);

    // title
    let title =
      html.match(
        /<title>(.*?)<\/title>/i
      )?.[1] || "";

    title = clean(title)
      .replace(/- KlikXXi/i, "")
      .trim();

    // synopsis
    let synopsis = "";

    const synopsisMatch =
      html.match(
        /<p>([\s\S]{100,1200}?)<\/p>/i
      );

    if (synopsisMatch) {
      synopsis = clean(
        synopsisMatch[1]
      );
    }

    // download
    const download = [];
    const used = new Set();

    const section =
      html.match(
        /DOWNLOAD[\s\S]{0,5000}?RELATED MOVIES/i
      )?.[0] || "";

    const matches = [

      ...section.matchAll(
        /<a[^>]+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi
      ),
    ];

    for (const m of matches) {

      const link = m[1];
      const text = clean(m[2]);

      if (
        !link ||
        !text ||
        used.has(link)
      ) continue;

      const valid =
        /usersdrive|lulu|streamhq|voe|upns|veev|1080|720|480|360|580/i
          .test(text);

      if (!valid) continue;

      used.add(link);

      const quality =
        text.match(/1080|720|580|480|360/i)?.[0] || "";

      const provider =
        text
          .replace(/1080|720|580|480|360/gi, "")
          .trim();

      download.push({

        provider,

        quality,

        url: link
      });
    }

    return res.json({

      status: true,

      result: {

        title,

        genre:
          getField(html, "Genre"),

        quality:
          getField(html, "Quality"),

        year:
          getField(html, "Year"),

        duration:
          getField(html, "Duration"),

        country:
          getField(html, "Country"),

        release:
          getField(html, "Release"),

        language:
          getField(html, "Language"),

        director:
          getField(html, "Director"),

        cast:
          getField(html, "Cast"),

        synopsis,

        download
      }
    });

  } catch (err) {

    return res.status(500).json({

      status: false,

      message:
        err.message
    });
  }
}

module.exports = {
  meta,
  handler
};