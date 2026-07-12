# ABE site — handover / current state (updated 12 Jul 2026)

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
  SourcesFooter, Placeholder, WayfinderNav, StickyCta, and (added since 9 Jul) ProcessTrack, PageBar,
  ArrowRight, CpdMatrix, PartnerDisclosure.
- **Content Collections (Phase B migration DONE):** `content.config.ts` (Zod `courses` schema),
  `content/courses/{qld,wa}-owner-builder-course.mdx`, `layouts/CourseLayout.astro`, and one dynamic
  route `pages/[slug]/index.astro` (`getStaticPaths()` over `getCollection('courses')`). The old
  per-page course `.astro` files are gone. `pages/cpd.astro` is the CPD hub (standalone page for now).
- **Data:** `data/modules.ts` + `data/faqs.ts` (QLD), `data/modules-wa.ts` + `data/faqs-wa.ts` (WA),
  `types/course.ts`.
- **Config:** `astro.config.mjs` (site + sitemap + root redirect), `wrangler.jsonc`, `.nvmrc` (22),
  `public/robots.txt`.
- **Images:** QLD + WA course images are now **local optimised AVIF** in `public/images/*` (4 slots
  each: hero, on-site, laptop, insurance), moved off `r2.dev` so Astro hashes and optimises them. WA
  imagery is **done** (was FPO placeholders on 9 Jul). Expert portraits (Dominic, Warwick,
  grayscale-hover) are still served from R2.

## Verified facts on the live pages (re-verify on cadence)
- QLD: QBCC permit fee **$477.47** (indexation-pending — re-verify with QBCC before relying on it);
  course $179; bundle $303 (+$124 White Card, CPCCWHS1001); 18 modules; 80% pass / 3 attempts.
- WA: approval fee **$212 residential / $467 industrial-commercial** — confirmed current 2025-26 (from
  1 July), verified 8 Jul 2026; **next re-verify 1 Jul 2027**. Course $179; bundle $278 (+$99 White
  Card, CPCWHS1001); Introduction + 12 modules; 80% pass / 3 attempts; Warwick review 4 Jun 2026.
- Full sourced facts live in the research space memory (QLD/WA verified-facts). Fold the load-bearing
  ones into this repo's CLAUDE.md when convenient.

## Phase status (plan phases A-F; strategic detail in `../abe-rebuild-plan-review.md`)

Architecture is settled and not up for re-decision: **Astro 7 · static assets · token CSS · MDX +
Content Collections.** The migration is no longer about architecture; it is now two tracks, building the
rest of the pages (Phase C) and flipping the public domain (Phase E).

- **Phase A — Guardrails: DONE** (bar one item). `.claude/settings.json` (deny `rm -rf` / force-push /
  `reset --hard` / `--no-verify` / amend / rebase / `npm update` / `wrangler delete` / `.env` & `.pem`
  reads; ask before push etc.), Husky `pre-commit`, lint-staged + **secretlint** (in place of gitleaks),
  and the `/ship` command are all in. Outstanding: `.mcp.json` (Astro Docs / Cloudflare / Notion) — low
  priority, MCP already works at the session level.
- **Phase B — Content Collections: DONE.** `content.config.ts` (Zod), `content/courses/*.mdx` (QLD +
  WA), `CourseLayout.astro`, `pages/[slug]/index.astro`. Old per-page course `.astro` files removed.
- **Phase C — Roll out as MDX: IN PROGRESS.** Live: QLD + WA owner builder, CPD hub. Roll-out infra
  exists (`CpdMatrix`, `PartnerDisclosure` for RTO courses); WA imagery done. **Remaining:** TAS / NSW /
  ACT owner builder, White Card per state (RTO-partner disclosure), the CPD 5-industry x state matrix,
  per-state hubs, expert profiles (`/experts/dominic-ogburn`, `/experts/warwick-smith`). Author via the
  `abe-course-page-astro` skill, output target `content/courses/{slug}.mdx`.
- **Phase D — Images to a custom domain: MOSTLY MOOT.** Course images are now local optimised AVIF
  (`public/images/*`), off `r2.dev`. Only the expert portraits + brand logo remain on R2; attach
  `images.abeeducation.edu.au` and swap those few if/when desired.
- **Phase E — Go-live cutover: PENDING — the sequence-blocker.** Site is still on
  `abe-edu-web.andrey-p-personal.workers.dev`, not the real domain. Attach `abeeducation.edu.au` (apex +
  `www`) to the Worker + TLS; move LearnWorlds to `learn.`; build the 301 map (no chains, kept
  indefinitely); drop TTL to 300 pre-cutover; **do not touch MX / SPF / DKIM**; swap DNS + monitor;
  submit sitemap + verify GSC + set up GA4; keep a rollback path. Expect a 10-30% reorg dip recovering
  in 2-4 weeks. Needs DNS access + user. Follow plan Phases 7-13 as written.
- **Phase F — CMS later.** Trigger unchanged: ~50 pages or multiple editors.

> **Concurrency note (Jul 2026):** this repo has had **parallel Claude Code sessions** building at the
> same time (the callout system, images-local move, and nav work landed from another session). Before
> Phase C work, confirm who owns what; always stage explicit paths, never `git add -A`.

## Open items / watchlist
- WA course imagery is done (local AVIF); only the **expert portraits** (both pages) are still on R2.
- `r2.dev` is dev-grade / rate-limited — now scoped to the expert portraits + logo only (course images
  moved to local optimised AVIF), so the custom-domain swap (Phase D) is a small remaining task.
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
