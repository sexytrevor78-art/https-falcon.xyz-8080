# 🦅 Falcon Stremio Addon

Free public domain movies from the Internet Archive — works on PC and Android.

---

## Deploy on Render.com (Free, phone-friendly)

### Step 1 — Push these files to GitHub
1. Go to **github.com** on your phone browser
2. Open your existing repo: `sexytrevor78-art/https-falcon.xyz-8080`
3. Delete the old files (Sources.json, README.md)
4. Upload the new files: `index.js` and `package.json`

### Step 2 — Deploy on Render.com
1. Go to **render.com** and sign up (free)
2. Tap **New** → **Web Service**
3. Connect your GitHub account and pick your repo
4. Fill in these settings:
   - **Name**: falcon-addon
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Tap **Create Web Service**
6. Wait ~2 minutes for it to deploy
7. You'll get a URL like: `https://falcon-addon.onrender.com`

### Step 3 — Install in Stremio

**On PC:**
1. Open Stremio
2. Go to the addons page
3. Paste this URL into the search box:
   `https://falcon-addon.onrender.com/manifest.json`
4. Click Install

**On Android:**
1. Open Stremio app
2. Tap the puzzle piece icon (Addons)
3. Tap the 🔍 search icon
4. Paste: `https://falcon-addon.onrender.com/manifest.json`
5. Tap Install

> ⚠️ Replace `falcon-addon.onrender.com` with your actual Render URL

---

## What you get
- Hundreds of free, legal public domain movies
- Search works inside Stremio
- Streams directly — no sign-up needed
- Works on PC and Android Stremio apps
