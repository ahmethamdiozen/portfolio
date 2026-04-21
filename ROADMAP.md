# Portfolio — Deployment Roadmap

**Target domain**: `ahmethamdiozen.site` (main) + `*.ahmethamdiozen.site` (subdomain pass-through)
**Deploy order in pipeline**: 0th — deploy first, then add live demo links to each project card as sibling projects go live.
**Status**: Next.js 15 App Router site with TR/EN i18n, MDX project pages, animations, and a Coolify-ready Dockerfile. Hero, About, Skills, Contact, and Projects sections exist. CI/CD via GitHub Actions is wired. Needs content polish, a few deploy-blocking fixes, and incremental feature additions.

---

## North Star

A recruiter or engineering lead hits `ahmethamdiozen.site`, immediately reads the pitch (AI + Backend + Full Stack), sees polished project cards with live demo links, clicks through to a project detail page with architecture context, and sends a message — all in under two minutes. The site is the hub: every other subdomain project links back here, and this site links out to all of them.

---

## Phase 0 — Deploy Blockers

### Content fixes

- [ ] **Fix placeholder email** — `app/[locale]/page.tsx` line 172 has `ahmet@example.com`. Replace with `hamdiahmetozen@gmail.com`.
- [ ] **Add `clinic-appointment` MDX files** — `content/projects/clinic-appointment.en.mdx` and `clinic-appointment.tr.mdx` are missing. Other four projects already have MDX. Add these so all five live-deploy projects appear.
- [ ] **Update project MDX `demo` frontmatter** — once each sibling project is deployed, add the live URL to each MDX file's frontmatter. Currently the `demo` field is absent on some entries, and the ProjectCard hides the demo button when it's missing.
- [ ] **Verify `featured: true` on all five projects** — `getFeaturedProjects()` filters by this flag; confirm all five have it so they render on the home page.

### Dockerfile hardening

- [ ] **Add non-root user** — current Dockerfile runs as root. Add `RUN addgroup -S appgroup && adduser -S appuser -G appgroup` and `USER appuser` before `CMD`.
- [ ] **Verify `output: "standalone"` in `next.config.ts`** — the runner stage copies `.next/standalone`, which only exists if standalone mode is enabled. Confirm this is set.
- [ ] **Copy `content/` in runner stage** — already present (`COPY --from=builder /app/content ./content`), but verify MDX reads work at runtime (not just at build time).

### Deploy wiring

- [ ] **DNS wildcard A record** — `*.ahmethamdiozen.site` → VPS IP covers all subdomain projects. Also ensure `ahmethamdiozen.site` (apex) has its own A record.
- [ ] **Coolify service** — one service: `portfolio/` repo, Dockerfile at root, port 3000. Let's Encrypt SSL.
- [ ] **Set `COOLIFY_WEBHOOK` + `COOLIFY_TOKEN` secrets on GitHub** — CI deploy job calls these; pipeline will silently fail on merge if unset.
- [ ] **Smoke test** — load `/en`, `/tr`, `/en/projects`, `/en/projects/hf-saas`. All must 200. Check custom cursor, scroll animations, and project card links.

---

## Phase 1 — Post-Deploy Content & UX

### Missing sections (from CLAUDE.md plan)

- [ ] **Services section** — "What I Build" grid, 3–4 cards: Backend & API / AI & LLM Integration / Full Stack Web App / Consulting. Placed between About and Projects on the home page. Copy in both EN and TR.
- [ ] **Timeline / Experience section** — vertical timeline: education, projects, freelance, employment history. Scroll-triggered reveal per entry. Data lives in `messages/en.json` and `messages/tr.json` so it's translatable.
- [ ] **GitHub Activity block** — animated counters (countUp with Framer Motion): total commits, projects shipped, technologies used. Static numbers seeded from a snapshot, not a live API (avoids rate-limit complexity).

### Project images

- [ ] **Add `image` field to MDX frontmatter** — field already defined in `CLAUDE.md`, not yet used. Update `ProjectCard` to render the image at card top with a subtle hover zoom.
- [ ] **Take screenshots for each project** once live — one landscape screenshot per project, stored in `public/projects/[slug].png`. Use an accent-colored gradient placeholder until the screenshot exists.

### Content polish

- [ ] **Resume / CV download button** — add to Contact section and Hero. PDF stored in `public/resume.pdf`. Update when CV changes.
- [ ] **Update `about.body` copy** — the current text mentions "LLM-powered backends" generically; once projects are live, reference them by name for specificity.
- [ ] **Add LinkedIn URL** — contact section already has a LinkedIn button. Verify `https://linkedin.com/in/ahmethamdiozen` is the correct slug.

---

## Phase 2 — Polish / Portfolio Readiness

### SEO & metadata

- [ ] **`<title>` and `<meta description>` per page** — set `generateMetadata` in each route. Home page, projects list, and each project detail page each need their own title + description (TR and EN).
- [ ] **OG image** — generate per-page Open Graph images via `next/og`. Project detail pages should show project title and stack on a branded card.
- [ ] **`sitemap.xml` + `robots.txt`** — generated at build time from the MDX content list. Helps indexing.
- [ ] **`lang` attribute** — verify `<html lang="...">` is set from the locale param in `app/[locale]/layout.tsx`.

### Analytics

- [ ] **Plausible or Umami** — self-hosted on the same VPS (Coolify resource). Script tag in layout. Track: page views, project card clicks, demo link clicks, email clicks.

### Accessibility

- [ ] **Custom cursor fallback** — `CustomCursor` is pointer-only. Verify it's hidden on touch/mobile (currently: `md:block hidden` or similar).
- [ ] **Motion preference** — wrap Framer Motion animations in `prefers-reduced-motion` check. `AnimatedText` and `StaggerContainer` should be static when the user has reduced motion enabled.
- [ ] **Focus styles** — ensure keyboard navigation shows visible focus rings on all interactive elements.

### CI/CD hardening

- [ ] **Type-check step** — add `npm run type-check` (i.e. `tsc --noEmit`) to CI before build.
- [ ] **Cache `.next/cache`** between CI runs — speeds up GitHub Actions build significantly.
- [ ] **Smoke-test job on deploy** — after Coolify webhook fires, add a wait + curl step that hits `https://ahmethamdiozen.site/en` and fails the workflow if it doesn't return 200.

---

## Phase 3 — Stretch

- [ ] **Blog / Writing section** — MDX posts in `content/blog/`. Simple list page + post page. Good for SEO and showing depth of thinking.
- [ ] **Dark mode** — toggle in Navbar, persisted to `localStorage`. Tailwind CSS class strategy. The warm cream palette has an obvious dark inverse (dark charcoal + warm amber accents).
- [ ] **Project filtering by tag** — on the `/projects` page, filter cards by technology (Python, TypeScript, AI, etc.). Uses MDX frontmatter `stack` field.
- [ ] **Contact form** — replace email link with a form (Resend API backend). Keeps email private, adds a paper trail.
- [ ] **`/uses` page** — dev setup: hardware, editors, tools. Lightweight but good for SEO + personality.

---

## Deploy Checklist (Coolify)

1. DNS: apex A record `ahmethamdiozen.site` → VPS IP. Wildcard `*.ahmethamdiozen.site` → same IP.
2. Coolify service: Git source `portfolio/`, Dockerfile at root, port 3000.
3. Domain: `ahmethamdiozen.site` + `www.ahmethamdiozen.site`. Let's Encrypt SSL.
4. Set `COOLIFY_WEBHOOK` + `COOLIFY_TOKEN` in GitHub repo secrets.
5. Fix placeholder email, add clinic-appointment MDX, confirm `output: "standalone"`, add non-root user.
6. Push to `main` → CI lint + build pass → Coolify webhook triggers deploy.
7. Smoke test: `/en`, `/tr`, `/en/projects`, `/en/projects/hf-saas` — all 200, animations run, project cards show, contact links correct.
8. After each sibling project deploys: update the `demo` field in the relevant MDX file and push.
