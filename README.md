# Forge Digest

Daily digest for AI trends, agents, and LLM projects — powered by GitHub API.

## Features

- **Daily Top 10** — Trending AI/LLM repositories ranked by GitHub stars
- **Category filters** — Trending, Agents, LLM, Skills tabs with dedicated queries
- **Search** — Full-text search across project names, descriptions, and tags
- **Yesterday Recap** — Quick overview of yesterday's top projects
- **Tag cloud** — Clickable trending tags for instant filtering
- **i18n** — Chinese / English toggle
- **Dark mode** — Toggle in Settings
- **GitHub Token** — Optional, stored in localStorage for higher API rate limits

## Run Locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## GitHub Pages Deployment

### Automatic (recommended)

Push to `main` — GitHub Actions builds and deploys to GitHub Pages automatically.

1. Go to repo **Settings → Pages → Source** → select **GitHub Actions**
2. Push to `main`

### Manual

```bash
npm run build
# Deploy dist/ to your GitHub Pages branch
```

## GitHub API Token (optional)

Without a token: **60 req/hour**. With a token: **5000 req/hour**.

1. Go to [GitHub Settings → Tokens](https://github.com/settings/tokens)
2. Generate a classic token — no scopes needed for public repos
3. Paste into the app's **Settings** modal

## Tech Stack

- React 19 + TypeScript
- Vite 6
- Tailwind CSS 4
- Motion (animations)
- Lucide React (icons)
- GitHub Search API
