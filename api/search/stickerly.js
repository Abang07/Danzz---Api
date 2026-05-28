const axios = require("axios");

const meta = {
  param: "text",
  desc: "Sticker.ly Search API",
  placeholder: "anime / cewe / meme",
  params: [
    {
      name: "text",
      placeholder: "keyword sticker",
    },
  ],
};

async function handler(req, res) {
  const { text } = req.query;

  if (!text) {
    return res.status(400).json({
      status: false,
      message: "Query ?text= wajib diisi",
      example: "/api/sticker/search?text=anime",
    });
  }

  try {
    const UA =
      "androidapp.stickerly/1.17.2 (G011A; U; Android 28; en-US; en;)";

    const response = await axios.post(
      "http://api.sticker.ly/v3.1/stickerPack/search",
      {
        keyword: text,
        size: 30,
        cursor: 0,
      },
      {
        headers: {
          "User-Agent": UA,
          Host: "api.sticker.ly",
        },
        timeout: 30000,
      }
    );

    const packs = response.data?.result?.stickerPacks || [];

    return res.status(200).json({
      status: true,
      type: "search",
      query: text,
      total: packs.length,
      result: packs.map((p) => ({
        name: p.name,
        author: p.authorName || p.user?.userName || "-",
        stickerCount: (p.resourceFiles || []).length,
        views: p.viewCount || 0,
        exports: p.exportCount || 0,
        isAnimated: p.isAnimated || false,
        thumbnail: p.thumbnailUrl || null,
        url: p.shareUrl,
      })),
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