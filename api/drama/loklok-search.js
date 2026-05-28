const https = require("https");
const zlib = require("zlib");

const meta = {
  param: "query",
  desc: "Search film KlikXXI",
  placeholder: "Contoh: avengers"
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

        stream.on("error", reject);
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
// PARSE SEARCH
// ─────────────────────────────
function parseResults(html) {

  const results = [];
  const used = new Set();

  const matches = [

    ...html.matchAll(
      /<a[^>]+href="(https:\/\/klikxxi\.me\/[^"]+)"[^>]*title="([^"]+)"/gi
    ),
  ];

  for (const m of matches) {

    const url = m[1];
    const title = clean(m[2]);

    if (
      !url ||
      !title ||
      used.has(url)
    ) continue;

    used.add(url);

    const slug =
      url
        .replace("https://klikxxi.me/", "")
        .replace(/\//g, "");

    const year =
      title.match(/\b(19|20)\d{2}\b/)?.[0] || "";

    results.push({

      title,

      year,

      slug,

      url
    });
  }

  return results;
}

// ─────────────────────────────
// HANDLER
// ─────────────────────────────
async function handler(req, res) {

  const query =
    (req.query.query || "").trim();

  if (!query) {

    return res.status(400).json({

      status: false,

      message:
        "Parameter query diperlukan"
    });
  }

  try {

    const url =
      `https://klikxxi.me/?s=${encodeURIComponent(query)}&post_type[]=post&post_type[]=tv`;

    const html =
      await get(url);

    const results =
      parseResults(html);

    if (!results.length) {

      return res.json({

        status: false,

        message:
          "Film tidak ditemukan"
      });
    }

    return res.json({

      status: true,

      query,

      total:
        results.length,

      result:
        results
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