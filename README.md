# 🧠 NeuroNav - PWA Installation Guide

NeuroNav is now a **Progressive Web App (PWA)** — it installs like a native desktop app but runs through your browser.

---

## 💻 Install on Windows (Chrome/Edge)

### Method 1: Automatic Prompt
1. Open NeuroNav in **Chrome** or **Edge**
2. Look for the **⬇️ Install NeuroNav** button at the bottom
3. Click it and select **Install**
4. NeuroNav will appear in your Start Menu and taskbar!

### Method 2: Manual Install
1. Open NeuroNav in Chrome/Edge
2. Click the **⋮** menu (top right)
3. Go to **Cast, save and share** → **Install page as app...**
4. Or look for the **📥 Install** icon in the address bar

---

## 🍎 Install on macOS (Chrome)

1. Open NeuroNav in **Chrome**
2. Click **⋮** → **Cast, save and share** → **Install page as app...**
3. NeuroNav appears in your Applications folder and Dock

---

## 🐧 Install on Linux (Chrome/Edge)

1. Open NeuroNav in Chrome/Edge
2. Click **⋮** → **More tools** → **Create shortcut...**
3. Check **"Open as window"**
4. The app will appear in your applications menu

---

## 📱 Install on Mobile (iOS/Android)

### iOS Safari
1. Open NeuroNav in Safari
2. Tap **Share** button (⬆️)
3. Scroll down and tap **"Add to Home Screen"**
4. Tap **Add**

### Android Chrome
1. Open NeuroNav in Chrome
2. Tap **⋮** menu
3. Tap **"Add to Home screen"** or **"Install app"**
4. Tap **Install**

---

## ✨ What You Get

| Feature | Benefit |
|---------|---------|
| 🖥️ **Standalone Window** | No browser chrome, looks like a real app |
| 📴 **Offline Support** | Works without internet (data saved locally) |
| 🔔 **Background Sync** | Data syncs when you reconnect |
| ⚡ **Fast Loading** | Cached for instant startup |
| 🔄 **Auto-Updates** | Gets new features automatically |
| 🎯 **Taskbar Icon** | Pin to taskbar/dock for quick access |

---

## 🔧 File Structure

```
neuronav-pwa/
├── index.html          # Main app (modified with PWA support)
├── manifest.json       # App metadata & icons
├── sw.js               # Service Worker (offline caching)
├── pwa.js              # Install prompt & PWA logic
└── icons/
    ├── icon-192x192.png    # App icon (small)
    ├── icon-512x512.png    # App icon (large)
    └── favicon-64x64.png   # Browser tab icon
```

---

## 🚀 Quick Start

1. **Download** all files in this folder
2. **Host** them on any web server (or open `index.html` directly for testing)
3. **Open** in Chrome/Edge
4. **Install** when prompted

### Local Testing
```bash
# Python 3
python -m http.server 8000

# Node.js
npx serve .

# Then open http://localhost:8000
```

---

## 📝 Notes

- **Data is stored locally** in your browser — it stays on your device
- **No app store needed** — install directly from the browser
- **Cross-platform** — same app works on Windows, Mac, Linux, iOS, Android
- **Updates automatically** — refresh to get the latest version

---

**Made with 💜 for ADHD brains**
