const axios = require("axios");

const meta = {
  param: "text",
  desc: "Sticker.ly Pack Detail API",
  placeholder: "https://sticker.ly/s/XXXX atau PACK_ID",
  params: [
    {
      name: "text",
      placeholder: "pack id atau link",
    },
  ],
};

async function handler(req, res) {
  const { text } = req.query;

  if (!text) {
    return res.status(400).json({
      status: false,
      message: "Query ?text= wajib diisi",
      example: "/api/sticker/download?text=N7XANJ",
    });
  }

  try {
    const UA =
      "androidapp.stickerly/1.17.2 (G011A; U; Android 28; en-US; en;)";

    // ambil pack ID
    const packId = text.includes("sticker.ly")
      ? text.split("/s/")[1].split(/[/?#]/)[0]
      : text;

    const response = await axios.get(
      `http://api.sticker.ly/v3.1/stickerPack/${packId}`,
      {
        headers: {
          "User-Agent": UA,
          Host: "api.sticker.ly",
        },
        timeout: 30000,
      }
    );

    const pack = response.data?.result;

    if (!pack) {
      return res.status(404).json({
        status: false,
        message: "Pack tidak ditemukan",
      });
    }

    const files =
      pack.resourceFiles ||
      (pack.stickers || []).map((s) => s.fileName);

    const prefix = pack.resourceUrlPrefix;

    return res.status(200).json({
      status: true,
      type: "detail",
      result: {
        id: packId,
        name: pack.name,
        author: pack.authorName || pack.user?.userName || "-",
        stickerCount: files.length,
        isAnimated: pack.isAnimated || false,
        views: pack.viewCount || 0,
        exports: pack.exportCount || 0,
        baseUrl: prefix,
        stickers: files.map((file, i) => ({
          index: i + 1,
          fileName: file,
          url: prefix ? prefix + file : null,
        })),
      },
    });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: err.response?.data || err.message,
    });
  }
}

module.exports = {
  meta,
  handler,
};