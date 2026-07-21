# ABE site — handover / current state (updated 18 Jul 2026, Wave 0 close-out)

Where the build is, what exists, and the next-session sequence. Pairs with `CLAUDE.md` (rules).
**The live strategic plan is now in this repo**, under `new site/`: `abe-website-migration-plan-v2.md`
(the plan), `abe-migration-plan-v2-risk-audit.md` (11 findings amended into it 16 Jul),
`abe-new-site-sitemap.md` (the full Waves 1-5 IA), and `abe-migration-implementation-plan.md` (the
ticket-by-ticket runbook: three build recipes, per-ticket DoD, the cutover runbook, a progress
tracker). See "Wave 1-6 roadmap" below for the summary. `abe-rebuild-plan-review.md`, `MIGRATION.md`
and `wave0-closeout-spec.md` (the Wave 0 ticket detail this handover is itself derived from) still live
externally in `C:\Claude\Projects\2026 ASTRO Research 2 Website Pipeline\`.

## Repo location
- Canonical repo lives at **`C:\dev\abe-web`** (off OneDrive — cloud sync was corrupting builds).
  GitHub remote: `https://github.com/aap-82/abe-edu-web.git` (`main`, in sync).

## Live now
- **QLD, WA, TAS and ACT Owner Builder** course pages, static, on Cloudflare Workers:
  `https://abe-edu-web.andrey-p-personal.workers.dev/<slug>` (no trailing slash — see "Canonical URL
  form" below). Root `/` redirects to the QLD page (tracked TODO in `astro.config.mjs`: this must not
  still be the case at cutover).
- CPD hub (`/cpd`) and a TAS CPD page (`/cpd-tas`) exist as standalone `.astro` pages (not yet on the
  content-collection/`HubLayout` pipeline — see Phase C below).
- Deploy: **Workers Builds — connected & verified 9 Jul 2026.** `git push origin main` → Cloudflare
  auto-builds (`npm run build`) and deploys (`npx wrangler deploy`); non-`main` branches get preview
  URLs on their PRs. Manual `npx wrangler deploy` still works as a fallback. `wrangler.jsonc` now also
  carries a `main` entry (`worker/entry.js`) — see "Wave 0 changes" below; this is still a static-only
  build, not an SSR adapter.

## What exists in the repo

- **Layout + chrome:** `BaseLayout.astro` (head, schema, robots/OG, sitemap, non-render-blocking
  Google Fonts load), `SiteHeader.astro` (four click-open megamenus + utility links + mobile menu),
  `SourcesFooter.astro` (now the sitewide global footer as well as the page-foot sources block — see
  below), `layouts/CourseLayout.astro` (course pages, branches on `authorityModel` and `cpd`),
  `layouts/HubLayout.astro` (hub pages, not yet wired into a route — see Phase C), `styles/global.css`
  (token system).
- **Component library** (`src/components/`, 32 files): AnswerCapsule, ArrowRight, BundleOffer, CanCant,
  **ComparisonTable** (new W0-3), CpdMatrix, Credentials, CtaBand, FactGrid, Faq, Hero, **HubCard** (new
  W0-3), InsurancePartner, Note, PageBar, PartnerDisclosure, Placeholder, PriceCard, ProcessTrack,
  Section, SectionWayfinder, SiteHeader, SourcesFooter, Stepper, StickyCta, TopicGrid, TrustBand,
  TrustStats, VerifiedSources, WayfinderNav, ZSection, ZSplit. **Every component has a live specimen at
  `/styleguide/`** (build-enforced — see "Styleguide specimen convention" below); `/styleguide/` itself
  is a route the component list must not omit (noindex, excluded from the sitemap, its own async-font
  head since it doesn't use `BaseLayout`).
- **Content Collections:** `content.config.ts` (Zod schemas for `courses`, `hubs`, `experts` and
  `partners` — the latter two scaffolded, no entries yet), `content/courses/{act,qld,tas,wa}-owner-
  builder-course.mdx`, and the dynamic route `pages/[slug]/index.astro` (`getStaticPaths()` over
  `getCollection('courses')` only — hubs are not yet routed, see Phase C).
- **Data:** `data/{modules,faqs}{,-act,-cpd,-tas,-wa}.ts`, `types/course.ts`.
- **Config:** `astro.config.mjs` (site, `trailingSlash: 'never'`, sitemap, root redirect),
  `wrangler.jsonc` (assets + `worker/entry.js` + redirects/404 handling), `.nvmrc` (22),
  `public/robots.txt`, `public/_redirects` (generated, see below), `.lighthouserc.json` +
  `lighthouse-budget.json` (CI), `.github/workflows/ci.yml`.
- **Images:** QLD + WA course images are local optimised AVIF in `public/images/*` (4 slots each: hero,
  on-site, laptop, insurance). **TAS and ACT have no local images yet** — both fall back to the FPO
  `Placeholder` (no `artefactImg` set in their frontmatter). Expert portraits (Dominic, Warwick,
  grayscale-hover) are still served from R2.

## Wave 0 changes (closed out 18 Jul 2026)

All eight tickets shipped as separate branches/PRs against `main` (in ticket order below); none have
been merged yet as of this writing. Read each PR's own commit message for full detail — this section
is the index.

- **W0-5 — `chore/site-config`.** `site` confirmed production; then a **mid-wave reversal**: the
  canonical URL form is **no-slash** (`https://www.abeeducation.edu.au/<slug>`), not the trailing-slash
  form an earlier commit on this same branch briefly adopted (that commit never reached `main`). See
  CLAUDE.md "Canonical URL form" for the full why. `astro.config.mjs` sets `trailingSlash: 'never'`;
  `wrangler.jsonc`'s `assets.html_handling` is `"drop-trailing-slash"`. Also added **staging de-index**
  (risk audit R3): `worker/entry.js`, a thin passthrough to the `ASSETS` binding, adds
  `X-Robots-Tag: noindex` only on the `*.workers.dev` host. `assets.run_worker_first: true` is required
  or Cloudflare skips the Worker entirely for matching static assets and the header never fires —
  discovered the hard way. Verified with `wrangler dev`: no-slash 200, slash 307, noindex only on the
  workers.dev host.
- **W0-1 — `feat/authority-model`.** `partnerRto` + a `superRefine` on the `courses` schema (required
  iff `authorityModel === 'asqa-accredited'`, and rejects a `Certificate of Completion` credential on
  an ASQA page). `CourseLayout` branches: ASQA pages render `PartnerDisclosure` + the sitewide ASQA
  disclosure line; the RTO partner (never ABE) is credited in `EducationalOccupationalCredential`
  JSON-LD. No live page is `asqa-accredited` yet, so the branch is inert today; verified the guardrail
  fires with a throwaway invalid MDX (discarded).
- **W0-2 — `feat/cpd-template`.** Optional `cpd` frontmatter block (`points`, `licenceClasses`,
  `approvalRef`, `renewalPeriod`, optional `matrix` and `bundle`). `CourseLayout` renders a
  points-by-licence `FactGrid` + a linked approval-reference note, `CpdMatrix` if `matrix` is set,
  `BundleOffer` if `bundle` is set. No live page carries a `cpd` block yet. Verified end to end with a
  throwaway sample (TAS Building CPD), then reverted it (a discoverable draft risked leaking into the
  sitemap, since the sitemap filter only excludes `/styleguide` and `/preview`).
- **W0-3 — `feat/hub-layout`.** `HubLayout` (lite Hero, `AnswerCapsule` intro, a `HubCard` spoke grid,
  optional `ComparisonTable`, optional `TrustBand`, `Faq`, `CtaBand`) + the `hubs` content collection.
  Spokes are typed references into `courses` (`getEntries`), paired with a hub-authored `blurb` — price/
  state/URL always resolve from the referenced course, so they cannot drift. A hub's JSON-LD is
  `BreadcrumbList` + `ItemList` only, never `Course`. **`HubLayout` is not wired into any route yet** —
  combining it with `CourseLayout` behind the shared `[slug]/index.astro` file confused Vite's per-page
  CSS chunking (a course page picked up an unused `BundleOffer`/`ProcessTrack` stylesheet); verified via
  a throwaway isolated route + sample hub MDX, then reverted both. **Next session wiring hubs into
  routing is real work, not a formality** — needs its own dynamic route or a different split.
- **W0-4 — `feat/global-chrome`.** `SourcesFooter.astro` extended in place into the sitewide footer:
  four link columns (Courses, Trust, Company with a Partners sub-heading for `/saaustralia`, Legal), a
  publisher/RTO-partners/enrolment block, a sitewide ASQA disclosure line, all above the existing
  per-page sources/disclaimers block. `SiteHeader` rebuilt to the final IA: four megamenus in order
  (White Card, Owner Builder, CPD Courses, CPD Bundles) — CPD's old three-level (state > profession >
  bundle) structure is gone, replaced by the same `Group` shape as Owner Builder/White Card. Owner
  Builder gained an `extra` row (Project Advisory, soon; Insurance, moved out of the old top-level
  utility links) below a hairline. Utility row is About/FAQ/Contact/Login (Experts dropped — it lives
  in the footer's Trust column and the on-page reviewed-by byline instead). No NSW Real Estate CPD
  anywhere (confirmed by grep). Verified in the browser at desktop and mobile widths.
- **W0-6 — `chore/ci-gates`.** `.github/workflows/ci.yml`: build, then Lighthouse CI (via
  `npx @lhci/cli@0.15.1` — **the bare npm package "lhci" is unrelated and unofficial**, discovered the
  hard way; always pin `@lhci/cli`) against a course page, `/cpd`, and `/styleguide`, asserting
  performance = 1.0, LCP < 1.8s, TBT < 50ms, CLS < 0.02, a 50KB JS budget (`lighthouse-budget.json`),
  and a render-blocking-resources cap (1 for course/hub pages, 2 for `/styleguide`, via lhci's
  `assertMatrix` — note `assertMatrix` and a top-level `assertions` block are mutually exclusive, not
  layered). Same job, `scripts/prose-lint.mjs`: fails on an em dash or "comprehensive" in
  `src/content/**/*.mdx` prose, allowlisting frontmatter fields that are labels/data rather than
  reader-facing copy. **Fixed a real bug along the way:** both `BaseLayout.astro` and
  `styleguide.astro` (which builds its own `<head>`, not `BaseLayout`'s) had a render-blocking
  Google Fonts `<link>` — switched both to the standard print-media-swap async pattern, which alone
  dropped styleguide's LCP from ~3.1s (failing) to comfortably under budget. Also fixed a genuine
  pre-existing em dash in TAS's `disclaimersHtml` that the new lint caught. **Verified locally**
  (clean pass, then a deliberately regressed font-loading state and a deliberately regressed prose
  string, both confirmed failing, then restored) but **could not open an actual GitHub PR to watch the
  Action run remotely — no `gh` CLI or GitHub API credentials in that session's environment.** Worth a
  human verification pass once this PR is up.
- **W0-7 — `feat/redirects-spike`.** `redirects.csv` (repo root) is the source of truth;
  `scripts/generate-redirects.mjs` writes `public/_redirects` from it — **never hand-edit
  `public/_redirects`.** `redirects.csv` currently holds the **Wave 0 spike sample only (12 rows)**,
  not the full signed-off map (see "Open items" below). `wrangler.jsonc` gets
  `assets.not_found_handling: "404-page"`; `src/pages/404.astro` is a new on-brand 404 page. Verified
  against `wrangler dev`: every redirect/retire row resolves 301 in one hop (both slash variants); both
  LearnWorlds cross-host splats and the exact-prefix rules work; the equity URL
  `/qld-owner-builder-course` (no rule) serves 200 direct and its `/slash` form still 307s via
  `drop-trailing-slash`; an unmatched URL serves the custom 404. **The `/payment` finding:** a query
  string on the incoming request (e.g. `?product_id=qld-179`) survives the Cloudflare `_redirects` hop
  intact and arrives at `https://learn.abeeducation.edu.au/payment` with the same query string appended
  — confirmed by curl. Whether LearnWorlds' own backend then reads and re-applies `product_id` to
  resume checkout is server-side behaviour on their platform that could not be observed from this
  environment; only the ABE-side half (does the query string survive the hop) was verified, and it
  does.
- **W0-8 — `docs/handover-refresh`.** This refresh.

## Styleguide specimen convention

Every component in `src/components/` must have a live specimen in `src/pages/styleguide.astro`,
enforced by the `abe-guardrails` build integration (it fails the build if a component file has no
matching specimen block, with a named exemption list for the rare component that structurally cannot
render standalone — currently only `StickyCta`, a fixed overlay). When adding a component:

1. Build the component with real tokens, no magic numbers.
2. Add a `<div class="sg-item">` block to `styleguide.astro`: an `<span class="sg-name">` (the
   component name, must match the filename), an `<span class="sg-desc">` (one line, what it's for),
   an `<span class="sg-props">` (the prop signature), and an `<div class="sg-demo">` rendering it with
   representative sample data.
3. If the component genuinely cannot render outside its real context (a fixed overlay, something that
   needs a specific viewport state), add it to `SG_EXEMPT` in `src/integrations/guardrails.ts` with a
   one-line reason — do not just leave it out silently.

## Facts on the live pages

> **Government figures are not restated here.** `kb/register/` is their single owner, and this section
> carrying its own verified dates is what let the QLD fee sit at a stale $477.47 while the register had
> moved on. For any fee, threshold or statutory date, read `kb/register/state-fees-register.md` (indexed
> by `kb/content-source-map.md`) and nothing else. `npm run build` reports staleness via
> `scripts/check-freshness.mjs`. Below are the ABE-internal facts only, which the register does not own.

- QLD: course $179; bundle $303 (+$124 White Card, CPCCWHS1001); 18 modules; 80% pass / 3 attempts.
- WA: course $179; bundle $278 (+$99 White Card, CPCWHS1001); Introduction + 12 modules; 80% pass /
  3 attempts; Warwick review 4 Jun 2026.
- TAS: course $185; 80% pass / 3 attempts.
- ACT: see `content/courses/act-owner-builder-course.mdx` frontmatter and footer sources directly for
  current sourced facts.
- Full sourced facts live in the research space memory (QLD/WA verified-facts). Fold the load-bearing
  ones into this repo's CLAUDE.md when convenient.

## Phase status (plan phases A-F; strategic detail in the migration plan docs)

Architecture is settled and not up for re-decision: **Astro 7 · static assets · token CSS · MDX +
Content Collections.** Wave 0 (templates, chrome, config, CI, redirects) is **merged to `main` and
live** as of 18 Jul 2026 (one Andrey sign-off still open, see "Open items" below). Wave 1+ starts actual
content: the rest of the course/CPD pages, hub content, expert profiles — see "Wave 1-6 roadmap" below
for the full plan.

- **Phase A — Guardrails: DONE.** `.claude/settings.json`, Husky pre-commit, lint-staged + secretlint,
  `/ship`, and now the CI gates from W0-6.
- **Phase B — Content Collections: DONE.**
- **Phase C — Roll out as MDX: IN PROGRESS.** Live: QLD/WA/TAS/ACT owner builder, CPD hub (still a
  standalone page, not yet on the collection). Templates for CPD courses, ASQA-accredited courses and
  hubs are now ready (W0-1/W0-2/W0-3) but **unproven on real content** — none of the four live course
  pages use the `cpd` or `asqa-accredited` branches, and `HubLayout` has no route. **Remaining:** NSW
  owner builder, White Card per state, real CPD course pages (currently only `/cpd` and `/cpd-tas` as
  hand-built `.astro` pages), wiring `HubLayout` into routing, expert profiles
  (`/experts/dominic-ogburn`, `/experts/warwick-smith`), TAS/ACT local imagery.
- **Phase D — Images to a custom domain: MOSTLY MOOT.** QLD/WA course images are local optimised AVIF;
  TAS/ACT still need theirs (currently FPO placeholders). Only the expert portraits + brand logo remain
  on R2.
- **Phase E — Go-live cutover: PENDING — the sequence-blocker.** Site is still on
  `abe-edu-web.andrey-p-personal.workers.dev`. Follow the migration plan's cutover phases as written;
  additionally, at cutover: set `workers_dev: false` and remove `worker/entry.js` / the `main` +
  `run_worker_first` lines from `wrangler.jsonc` (the staging noindex shim, no longer needed once the
  real domain is live and the workers.dev host should stop serving traffic); replace the root `/` →
  QLD redirect with the real Wave 5 homepage first (tracked TODO in `astro.config.mjs`); the full
  `redirects.csv` (not just the Wave 0 spike sample) needs to be signed off and imported first — see
  W0-9 below.
- **Phase F — CMS later.** Trigger unchanged: ~50 pages or multiple editors.

> **Concurrency note:** this repo has had **parallel Claude Code sessions** building at the same time.
> Before starting work, confirm who owns what. **Always stage explicit paths, never `git add -A`** —
> a broad add can sweep up another session's in-progress files.

## Wave 1-6 roadmap (migration plan v2, 16 Jul 2026)

The full strategic plan for everything after Wave 0 now lives **in this repo**, under `new site/`:
`abe-website-migration-plan-v2.md` (the plan), `abe-migration-plan-v2-risk-audit.md` (11 findings, 3
high-severity, amended into the plan — the source of the no-slash canonical call and the staging
noindex mechanism, both already implemented in Wave 0), `abe-new-site-sitemap.md` (the full ~44-page
IA), and `abe-migration-implementation-plan.md` (the ticket-by-ticket runbook, referenced W0-1..W0-10,
W1-1..W6 — three build recipes with a universal DoD, per-ticket owner/dependencies/DoD, the Wave 6
cutover runbook, and a progress tracker). Read these before starting Wave 1+ work; this section is only
the index.

**Wave order** (dependency-first: platform → trust infra → verticals by measured equity → hubs after
spokes → bundles after courses → homepage/cutover last):

| Wave | Theme | Exit gate |
|---|---|---|
| 0 | Platform close-out | **DONE** (this doc) |
| 1 | Trust infra + redirect map sign-off | Experts/accreditation/reviews live; full `redirects.csv` signed off |
| 2 | Owner Builder vertical | All 5 spokes + hub + insurance on preview, audits green |
| 3 | White Card vertical | 5 spokes + hub on preview, ASQA gates green |
| 4 | CPD vertical + bundles | Courses, trade/state hubs, bundles on preview |
| 5 | Support + homepage + content-hub scaffold | Every remaining page built or retired per the map |
| 6 | Pre-launch gates, cutover, watch | Domain flipped, redirects verified, monitoring on |

**Where the equity actually is** (16-month GSC, informs build order within each wave): WA owner builder
(878 clicks/34.7k impressions) and the OB hub (598/59.9k) are the two biggest pages on the site; White
Card WA (36.7k impressions at position ~10) is the single biggest *growth* target; NSW owner builder is
split across two live legacy URLs that Wave 2 consolidates onto one with 301s from both.

**Confirmed 16 Jul 2026** (product truth, folded into CLAUDE.md's hard rules too): NSW Real Estate CPD
retired, not rebuilt; no asbestos/silica pages; White Card confirmed for all five states; SAA partner
page stays; reviews are GBP display-only, never `AggregateRating`; GA4 + Google Ads confirmed as the
third-party script set, routed through Cloudflare Zaraz.

**Open items needing Andrey** (plan §10, none blocking Wave 1 start):
1. The LearnWorlds `learn.*` subdomain support ticket — the only real external blocker for cutover.
2. Final yes/no on a chat widget and the Meta pixel (currently "maybe"; needed before Wave 6).
3. Revenue data (nice-to-have) — without it, pages are prioritised by GSC traffic alone within each wave.

## Open items / watchlist

- **CPD hub IA — DECIDED 19 Jul 2026.** Build **`/cpd-building` only** (it has two courses, NSW +
  TAS), plus the three state hubs **`/cpd-nsw`, `/cpd-tas`, `/cpd-wa`**. The one-course trade hubs
  (plumbing, electrical, real estate) are **not built**; those queries land directly on their course
  pages, which avoids a thin hub cannibalising the page it links to. This is Wave 4 work (W4-6, W4-7),
  not something to build now. Checked at decision time: the redirect map is unaffected, because every
  trade-related row already targets a course page (`/cpd-building-nsw`, `/cpd-electrical-tas`,
  `/cpd-plumbing-tas`, `/cpd-real-estate-wa`, `/cpd-building-tas`), never a trade hub.
- **W0-9 remainder [AP] — the last blocker on W1-6.** Two redirect CONFIRM flags are still open:
  `/tas-cpd-architects-courses` (0 clicks / 74 impressions) and `/tas-cpd-building-designers-courses`
  (7 clicks / 1,570 impressions), both currently defaulting to retire into `/cpd-tas`. Until these are
  confirmed, `redirect-map-v1.csv` cannot be finalised into the real `redirects.csv` — which is still
  only the Wave 0 spike sample of 12 rows (see W0-7).
- `HubLayout` still has no route. Wave 1 built `/experts` hand-built on `BaseLayout` instead, because
  HubLayout's spokes are typed `reference('courses')` and experts are not courses. The first real
  consumer will be the CPD hubs in Wave 4, so the routing decision lands there.
- TAS and ACT owner builder pages have no local imagery (FPO placeholder); QLD/WA do.
- `r2.dev` is dev-grade / rate-limited — scoped to the expert portraits + logo only now.
- Expert profile pages (`/experts/*`) not built yet.
- Chat widget + Meta pixel are "maybe" (decision before Wave 6). No third-party scripts beyond Google
  Fonts (now non-render-blocking) and the fonts preconnects.
- The LearnWorlds `learn.*` subdomain migration is the external cutover blocker. The nav's Login link
  is still a `#` placeholder (its post-cutover target, `https://learn.abeeducation.edu.au/signin`, is
  noted in a TODO comment in `SiteHeader.astro` but not yet wired in); several `_redirects` targets
  (course/program/payment/signin splats) already point at `https://learn.abeeducation.edu.au/*` in
  anticipation and will 404 there until that migration happens.
- **Formal grid system — backlogged.** Current design stays as-is. If picked up: 12-column model + 8px
  spacing tokens, not a strict line-height baseline grid. Mockups live on the Desktop, not in the repo.

## Deploy

- **Once Workers Builds is connected:** just `git push origin main` — Cloudflare builds and deploys.
  Non-`main` branches get preview URLs posted to the PR.
- **Manual fallback** (works anytime):
  ```
  npm install
  npm run build && npx wrangler deploy
  ```
