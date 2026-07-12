# ABE site — handover / current state (9 Jul 2026)

Where the build is, what exists, and the next-session sequence. Pairs with `CLAUDE.md` (rules).
The planning docs (`abe-rebuild-plan-review.md`, `MIGRATION.md`) live in the OneDrive backup folder
`…\OneDrive\Desktop\Claude Code ABE-EDU-WEB 070726\`, not in this repo.

## Repo location (migrated 9 Jul 2026)
- Canonical repo now lives at **`C:\dev\abe-web`** (off OneDrive — cloud sync was corrupting builds).
  GitHub remote: `https://github.com/aap-82/abe-edu-web.git` (`main`, in sync).
- The old copies under `…\Claude\Projects\R2W Workflow\astro-qld-owner-builder` and the two on the
  Desktop are **stale** — do not build from them.

## Live now
- **QLD Owner Builder** and **WA Owner Builder** pages, static, on Cloudflare Workers:
  `https://abe-edu-web.andrey-p-personal.workers.dev/qld-owner-builder-course/` and
  `/wa-owner-builder-course/`. Root `/` redirects to the QLD page (astro.config.mjs).
- Deploy: **Workers Builds — connected & verified 9 Jul 2026.** `git push origin main` → Cloudflare
  auto-builds (`npm run build`) and deploys (`npx wrangler deploy`); non-`main` branches get preview
  URLs on their PRs. Manual `npx wrangler deploy` still works as a fallback. Assets-only Worker;
  `workers_dev: true`; Worker name `abe-edu-web` equals `wrangler.jsonc` `name` (required, matches).

## What exists in the repo
- **Layout + chrome:** `BaseLayout.astro` (head, schema, robots/OG, sitemap), `SiteHeader.astro`
  (logo + dropdown nav + mobile menu; active-page highlight), `styles/global.css` (token system).
- **Component library** (`src/components/`): Hero, Section, ZSplit, AnswerCapsule, FactGrid, CanCant,
  Stepper, TopicGrid, PriceCard, Credentials, Faq, Note, VerifiedSources, SectionWayfinder, CtaBand,
  SourcesFooter, Placeholder, WayfinderNav, StickyCta.
- **Pages (per-page .astro — to be migrated to Content Collections):**
  `pages/qld-owner-builder-course.astro`, `pages/wa-owner-builder-course.astro`.
- **Data:** `data/modules.ts` + `data/faqs.ts` (QLD), `data/modules-wa.ts` + `data/faqs-wa.ts` (WA),
  `types/course.ts`.
- **Config:** `astro.config.mjs` (site + sitemap + root redirect), `wrangler.jsonc`, `.nvmrc` (22),
  `public/robots.txt`.
- **Images:** QLD page fully wired to R2 (hero certificate, on-site, laptop, insurance, + Dominic &
  Warwick portraits, grayscale-hover). WA page images/portraits are **still FPO placeholders**.

## Verified facts on the live pages (re-verify on cadence)
- QLD: QBCC permit fee **$477.47** (indexation-pending — re-verify with QBCC before relying on it);
  course $179; bundle $303 (+$124 White Card, CPCCWHS1001); 18 modules; 80% pass / 3 attempts.
- WA: approval fee **$212 residential / $467 industrial-commercial** — confirmed current 2025-26 (from
  1 July), verified 8 Jul 2026; **next re-verify 1 Jul 2027**. Course $179; bundle $278 (+$99 White
  Card, CPCWHS1001); Introduction + 12 modules; 80% pass / 3 attempts; Warwick review 4 Jun 2026.
- Full sourced facts live in the research space memory (QLD/WA verified-facts). Fold the load-bearing
  ones into this repo's CLAUDE.md when convenient.

## Next-session sequence (agreed: keep & extend, static, Content Collections)
1. ~~**Repo + Claude Code + Workers Builds**~~ **DONE 9 Jul 2026** — repo at `C:\dev\abe-web`, clean
   install (275 pkgs), build green, pushed to `origin/main`, and **Workers Builds connected + verified**
   (git push → auto build + deploy; build `npm run build`, deploy `npx wrangler deploy`, root `/`,
   branch `main`). Push→deploy confirmed live.
2. **Guardrails** (plan Phase 2): Husky + lint-staged + gitleaks, `.claude/settings.json`
   (deny/ask/allow), `/ship` slash command, `.mcp.json` (Astro Docs, Cloudflare, Notion).
3. **Content Collections migration** (the one refactor to do before scaling):
   - `src/content.config.ts` with Zod schemas: `courses`, `experts`, `partners` (see
     `../abe-rebuild-plan-review.md` for fields — keep rich prose in the MDX body, structured data in
     frontmatter).
   - `src/layouts/CourseLayout.astro` (renders Hero/FactGrid/PriceCard/Credentials/VerifiedSources/
     SourcesFooter from frontmatter + the MDX body).
   - `src/pages/[slug]/index.astro` with `getStaticPaths()` over `getCollection('courses')`.
   - Convert QLD + WA to `content/courses/*.mdx`; **build-diff the rendered HTML against the current
     live pages to confirm parity** before deleting the old `.astro` pages.
4. **Roll out** as MDX: TAS / NSW / ACT owner builder, White Card per state (RTO-partner disclosure),
   CPD 5-industry x state matrix, per-state hubs, first expert profile (`/experts/dominic-ogburn/`).
5. **Finish images:** wire Dominic + Warwick headshots into the WA page (same R2 URLs as QLD); add WA
   hero/on-site/laptop images when generated (use the abe-course-page-astro skill's image-prompts).
6. **Custom domain for images:** attach e.g. `images.abeeducation.edu.au` to the R2 bucket and swap the
   `r2.dev` URLs (drop-in). 
7. **Redirects + cutover** (plan Phases 7-13, unchanged): LearnWorlds -> `learn.` subdomain, redirect
   map, DNS swap, GSC/GA4. This is the plan's strongest section — follow it as written.

## Open items / watchlist
- WA page portraits + content images are placeholders (item 5).
- `r2.dev` is dev-grade / rate-limited (item 6).
- QLD QBCC fee is indexation-pending; WA fee re-verify due 1 Jul 2027.
- Expert profile pages (`/experts/*`) not built yet.
- The content research pipeline (gov-source map -> gap -> outline -> extended content -> components) is
  the `abe-course-page-astro` skill; its Stage-6 output target changes to `content/courses/{slug}.mdx`
  once Content Collections is wired.
- **Formal grid system — backlogged (explored Jul 2026).** Current design stays as-is. If picked up:
  adopt a 12-column model + 8px spacing tokens (8/16/24/32/48/64/80/96; margins 32, gutters 24), NOT a
  strict line-height baseline grid. Plan first, then codify tokens in `src/styles/global.css` + align
  components. Verified whole-page QLD mockup and an 8-col baseline experiment live on the Desktop
  (`abe-qld-fullpage-mockup.html`, `abe-qld-grid-sample.html`), not in the repo.

## Deploy
- **Once Workers Builds is connected:** just `git push origin main` — Cloudflare builds and deploys.
  Non-`main` branches get preview URLs (`npx wrangler versions upload`) posted to the PR.
- **Manual fallback** (works anytime):
  ```
  npm install
  npm run build && npx wrangler deploy
  ```
