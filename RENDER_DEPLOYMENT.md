# Deploy to Render - Step by Step Guide

Render is a cloud platform that runs your Next.js app as a regular Node.js server (not serverless), so there are **no timeout limits** for your Claude API calls.

---

## 🚀 Deployment Steps

### 1. Create Render Account

1. Go to https://render.com
2. Click **Get Started** or **Sign Up**
3. Sign up with GitHub (recommended) or email

---

### 2. Connect Your GitHub Repository

1. After signing in, click **New +** → **Web Service**
2. Click **Connect account** to connect your GitHub
3. Find and select your repository: **Oludiran-Ayoade/VLM**
4. Click **Connect**

---

### 3. Configure Your Web Service

Render will auto-detect Next.js. Configure these settings:

**Name:** `forex-visual-analyzer` (or any name you want)

**Region:** Choose closest to you (e.g., Oregon, Frankfurt, Singapore)

**Branch:** `main`

**Runtime:** `Node`

**Build Command:** 
```
npm install && npm run build
```

**Start Command:**
```
npm start
```

**Plan:** **Free** (select this)

---

### 4. Add Environment Variable

**CRITICAL:** Before deploying, add your API key:

1. Scroll down to **Environment Variables**
2. Click **Add Environment Variable**
3. Set:
   - **Key:** `ANTHROPIC_API_KEY`
   - **Value:** Your Anthropic API key (the one that works locally - starts with `sk-ant-api03-sSJTUVroL...`)
4. Click **Add**

---

### 5. Deploy!

1. Click **Create Web Service** at the bottom
2. Render will start building your app
3. Wait 3-5 minutes for the build to complete
4. You'll get a URL like: `https://forex-visual-analyzer.onrender.com`

---

## ✅ After Deployment

1. **Visit your URL** (e.g., `https://forex-visual-analyzer.onrender.com`)
2. **Upload your 3 chart images** (1D, 1H, 5M)
3. **Select currency pair**
4. **Click "Analyze"**
5. **It will work!** No timeout limits on Render

---

## 🎯 Why Render is Better for This App

| Feature | Netlify (Free) | Render (Free) |
|---------|---------------|---------------|
| **Function Timeout** | 10 seconds ❌ | No limit ✅ |
| **Deployment** | Serverless | Full Node.js server |
| **Claude API** | Times out | Works perfectly |
| **Cost** | Free | Free |

---

## 🔧 Render Configuration File

I've created `render.yaml` in your project. Render will auto-detect this and use these settings:

```yaml
services:
  - type: web
    name: forex-visual-analyzer
    runtime: node
    plan: free
    buildCommand: npm install && npm run build
    startCommand: npm start
    envVars:
      - key: NODE_VERSION
        value: 20
      - key: ANTHROPIC_API_KEY
        sync: false
```

---

## ⚠️ Important Notes

1. **Free tier sleeps after 15 minutes of inactivity**
   - First request after sleep takes ~30 seconds to wake up
   - Subsequent requests are instant
   - Upgrade to paid plan ($7/month) for always-on

2. **Environment variables are secure**
   - Never commit API keys to GitHub
   - Set them in Render dashboard only

3. **Auto-deploys on push**
   - Every time you push to `main` branch, Render auto-deploys
   - Just like Netlify

---

## 🎉 You're Done!

Your Forex Visual Analyzer will work perfectly on Render with no timeout issues. Claude 4 Opus can take as long as it needs to analyze your charts.

**Your app will be live at:** `https://forex-visual-analyzer.onrender.com` (or similar)

Enjoy! 🚀
