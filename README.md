# ahmethamdiozen.site

Personal portfolio site built with Next.js, featuring bilingual support (TR/EN) and multi-tenant subdomain routing.

## Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Content:** MDX (next-mdx-remote + gray-matter)
- **i18n:** next-intl — `/en/...` and `/tr/...`
- **Animations:** Framer Motion, Lenis
- **Deployment:** Coolify + Hetzner VPS

## Features

- Bilingual (Turkish / English) with URL-based locale routing
- Multi-tenant subdomain routing (`*.ahmethamdiozen.site` → `/apps/[tenant]`)
- MDX-based project pages with frontmatter metadata
- Warm cream color theme

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deployment

Deployed via Coolify on Hetzner CAX11. DNS and CDN managed through Cloudflare.

```bash
docker build -t portfolio .
docker run -p 3000:3000 portfolio
```
