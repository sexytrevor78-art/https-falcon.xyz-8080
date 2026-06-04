# 🦅 Falcon – Free Stremio Addon

A free Stremio addon serving public domain movies from the Internet Archive plus curated classic catalogs from the 80s, 90s, 2000s, and horror genre.

## Install

Add the addon to Stremio using this URL:

```
https://https-falcon-xyz-8080.onrender.com/manifest.json
```

Or click the link below to install directly:

[Install Falcon Addon](https://app.strem.io/#https://https-falcon-xyz-8080.onrender.com/manifest.json)

---

## Manifest

```json
{
  "id": "com.falcon.addon",
  "version": "1.1.0",
  "name": "Falcon",
  "description": "Free public domain movies and classics from the Internet Archive",
  "logo": "https://i.imgur.com/8JNNFpE.png",
  "background": "https://i.imgur.com/8JNNFpE.png",
  "resources": ["catalog", "meta", "stream"],
  "types": ["movie", "series"],
  "catalogs": [
    {
      "type": "movie",
      "id": "falcon-public-domain",
      "name": "Falcon – Free Movies"
    },
    {
      "type": "movie",
      "id": "falcon-classics-80s90s",
      "name": "Falcon – 80s & 90s Classics"
    },
    {
      "type": "movie",
      "id": "falcon-classics-2000s",
      "name": "Falcon – 2000s Classics"
    },
    {
      "type": "movie",
      "id": "falcon-horror",
      "name": "Falcon – Horror"
    },
    {
      "type": "series",
      "id": "falcon-series-80s90s",
      "name": "Falcon – Classic TV Shows"
    }
  ],
  "idPrefixes": ["falcon:", "tt"],
  "behaviorHints": {
    "configurable": false
  }
}
```

---

## Catalogs

| Catalog | Type | Description |
|---|---|---|
| Falcon – Free Movies | Movie | Public domain films from the Internet Archive |
| Falcon – 80s & 90s Classics | Movie | Best movies from the 80s and 90s |
| Falcon – 2000s Classics | Movie | Best movies from the 2000s |
| Falcon – Horror | Movie | Classic horror films |
| Falcon – Classic TV Shows | Series | Best TV shows from the 80s, 90s and 2000s |

---

## Tech Stack

- [Stremio Addon SDK](https://github.com/Stremio/stremio-addon-sdk)
- [Node.js](https://nodejs.org)
- [Internet Archive API](https://archive.org)
- Hosted on [Render.com](https://render.com)

---

## License

MIT
