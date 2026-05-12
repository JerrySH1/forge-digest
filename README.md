# Forge Digest

Daily digest for AI trends, agents, and LLM projects — powered by GitHub API.

## Features

- **Daily Top 10** — Trending AI/LLM repositories ranked by GitHub stars
- **Category tabs** — Trending, Agents, LLM, Skills tabs with customizable search queries
- **Search** — Full-text search across project names, descriptions, and tags
- **Yesterday Recap** — Quick overview of yesterday's top projects
- **Tag cloud** — Clickable custom tags for instant filtering
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

Push to `main` — GitHub Actions builds and deploys to GitHub Pages automatically.

1. Go to repo **Settings → Pages → Source** → select **GitHub Actions**
2. Push to `main`

## Settings Guide

Click the gear icon in the top-right corner to open Settings. All configurations are saved to your browser's localStorage.

### API Configuration

**GitHub Personal Access Token** (optional)

Without a token: 60 req/hour. With a token: 5000 req/hour.

1. Go to [GitHub Settings → Tokens](https://github.com/settings/tokens)
2. Generate a classic token — no scopes needed for public repos
3. Paste into the token field and click Save

### Date Range Filter

Controls the time window for trending repositories across all tabs:

| Option | Effect |
|--------|--------|
| **All Time (Default)** | No date restriction — returns all matching repos |
| **Created Last Week** | `created:>7 days ago` — repos created within the past 7 days |
| **Created Last Month** | `created:>30 days ago` — repos created within the past 30 days |
| **Pushed Last Month** | `pushed:>30 days ago` — repos with recent activity in the past 30 days |

> **Tip:** Use "Created Last Week" to discover brand-new projects, or "Pushed Last Month" to find actively maintained ones.

### Custom Tags

The Tag Cloud sidebar displays clickable tags for quick filtering. By default it includes: `Agent`, `LLM`, `RAG`, `Fine-tuning`, `LangChain`, `Multi-modal`, etc.

Enter comma-separated tag names to customize the tag cloud — for example:

```
Agent, LLM, RAG, Fine-tuning, LangChain, Multi-modal, Stable Diffusion, Transformer
```

Click any tag in the sidebar to filter repositories matching that topic. Click the edit icon next to "Hot Tags" to quickly jump to this setting.

### Custom Category Queries

Each category tab uses a GitHub code-search query string. You can customize them to narrow or broaden results:

| Tab | Default Query | Description |
|-----|---------------|-------------|
| **Trending** | `topic:artificial-intelligence language:python language:typescript pushed:>2024-01-01` | General AI projects (Python/TypeScript) |
| **Agents** | `topic:ai-agent topic:llm pushed:>2024-01-01` | AI Agent frameworks and tools |
| **LLM** | `topic:large-language-model topic:llm pushed:>2024-01-01` | Large language model projects |
| **Skills** | `topic:machine-learning topic:deep-learning pushed:>2024-01-01` | ML/DL related projects |

**Query syntax reference:**

- `topic:ai-agent` — filter by GitHub topic tag
- `language:python` — filter by programming language
- `pushed:>2024-01-01` — only repos pushed after a date
- `stars:>100` — only repos with 100+ stars
- `org:openai` — limit to a specific organization

**Examples of custom queries:**

```
# Find popular AI tools with 500+ stars
topic:artificial-intelligence stars:>500 language:python

# Search for MCP (Model Context Protocol) related projects
topic:mcp topic:llm pushed:>2025-01-01

# Focus on a specific organization
topic:llm org:meta-llama
```

> **Note:** The `Trending` tab query is built-in and not editable. Use the Date Range filter to control its time window.

### Appearance

Toggle **Dark Mode** on/off. Preference is saved and applied instantly.

## Tech Stack

- React 19 + TypeScript
- Vite 6
- Tailwind CSS 4
- Motion (animations)
- Lucide React (icons)
- GitHub Search API
