const { addonBuilder, serveHTTP } = require("stremio-addon-sdk");
const axios = require("axios");

const manifest = {
  id: "com.falcon.addon",
  version: "1.0.0",
  name: "Falcon",
  description: "Free public domain movies and classics from the Internet Archive",
  logo: "https://i.imgur.com/8JNNFpE.png",
  background: "https://i.imgur.com/8JNNFpE.png",
  resources: ["catalog", "meta", "stream"],
  types: ["movie"],
  catalogs: [
    {
      type: "movie",
      id: "falcon-public-domain",
      name: "Falcon – Free Movies",
      extra: [
        { name: "search", isRequired: false },
        { name: "skip", isRequired: false }
      ]
    }
  ],
  idPrefixes: ["falcon:"],
  contactEmail: "support@falcon-addon.com"
};

const builder = new addonBuilder(manifest);

// ── CATALOG ────────��──────────────────────────────────────────────────
builder.defineCatalogHandler(async ({ type, id, extra }) => {
  if (type !== "movie" || id !== "falcon-public-domain") return { metas: [] };

  const search = extra && extra.search;
  const skip   = parseInt((extra && extra.skip) || 0);
  const rows   = 20;

  try {
    let url;
    if (search) {
      url = `https://archive.org/advancedsearch.php?q=${encodeURIComponent(search)}+AND+mediatype:movies+AND+licenseurl:*creativecommons*&fl[]=identifier,title,description,year,creator,subject&rows=${rows}&page=1&output=json`;
    } else {
      const page = Math.floor(skip / rows) + 1;
      url = `https://archive.org/advancedsearch.php?q=mediatype:movies+AND+subject:feature+film+AND+licenseurl:*creativecommons*&fl[]=identifier,title,description,year,creator,subject&rows=${rows}&page=${page}&output=json`;
    }

    const res  = await axios.get(url, { timeout: 10000 });
    const docs = res.data.response.docs;

    const metas = docs
      .filter(d => d.identifier && d.title)
      .map(d => ({
        id:          `falcon:${d.identifier}`,
        type:        "movie",
        name:        d.title,
        year:        d.year ? parseInt(d.year) : undefined,
        description: d.description || "",
        poster:      `https://archive.org/services/img/${d.identifier}`,
        background:  `https://archive.org/services/img/${d.identifier}`,
        director:    d.creator ? [d.creator] : []
      }));

    return { metas };
  } catch (e) {
    console.error("Catalog error:", e.message);
    return { metas: [] };
  }
});

// ── META ────────────────────────────────────────────────────────────
builder.defineMetaHandler(async ({ type, id }) => {
  if (type !== "movie" || !id.startsWith("falcon:")) return { meta: null };

  const identifier = id.replace("falcon:", "");

  try {
    const res  = await axios.get(`https://archive.org/metadata/${identifier}`, { timeout: 10000 });
    const data = res.data;
    const meta = data.metadata || {};

    return {
      meta: {
        id,
        type:        "movie",
        name:        Array.isArray(meta.title)       ? meta.title[0]       : (meta.title || identifier),
        year:        meta.year ? parseInt(meta.year) : undefined,
        description: Array.isArray(meta.description) ? meta.description[0] : (meta.description || ""),
        poster:      `https://archive.org/services/img/${identifier}`,
        background:  `https://archive.org/services/img/${identifier}`,
        director:    meta.creator ? (Array.isArray(meta.creator) ? meta.creator : [meta.creator]) : []
      }
    };
  } catch (e) {
    console.error("Meta error:", e.message);
    return { meta: null };
  }
});

// ── STREAMS ───────────────────────────────────────────────────────────
builder.defineStreamHandler(async ({ type, id }) => {
  if (type !== "movie" || !id.startsWith("falcon:")) return { streams: [] };

  const identifier = id.replace("falcon:", "");

  try {
    const res   = await axios.get(`https://archive.org/metadata/${identifier}`, { timeout: 10000 });
    const files = res.data.files || [];

    // Prefer MP4, then OGV, then AVI
    const priority = [".mp4", ".ogv", ".avi", ".mkv"];
    const videoFiles = files
      .filter(f => priority.some(ext => f.name.toLowerCase().endsWith(ext)))
      .sort((a, b) => {
        const ai = priority.findIndex(ext => a.name.toLowerCase().endsWith(ext));
        const bi = priority.findIndex(ext => b.name.toLowerCase().endsWith(ext));
        return ai - bi;
      });

    const streams = videoFiles.slice(0, 3).map(f => ({
      title: `Falcon – ${f.name}`,
      url:   `https://archive.org/download/${identifier}/${encodeURIComponent(f.name)}`
    }));

    return { streams };
  } catch (e) {
    console.error("Stream error:", e.message);
    return { streams: [] };
  }
});

// ── SERVE ───────────────────────────────────────────────────────────
const PORT = process.env.PORT || 7000;
serveHTTP(builder.getInterface(), { port: PORT });
console.log(`🦅 Falcon addon running on port ${PORT}`);
