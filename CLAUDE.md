# ABE Education marketing site — project rules (read first)

Astro 7 static marketing site for abeeducation.edu.au, on Cloudflare Workers. Wave 0 (platform
close-out — templates, chrome, CI, redirects) merged and live 18 Jul 2026. **Waves 1-3 are built**;
Wave 3's exit gate is only *half* met (7 Aug 2026 — ASQA / `PartnerDisclosure` hardening still open),
and Wave 4 (CPD) is in progress. Built today: six owner-builder courses (QLD/WA/TAS/ACT plus two NSW
pre-launch), five White Card spokes (NSW/QLD/WA/TAS/ACT), two hubs, three TAS CPD bundles, two expert
profiles, three partner pages, and `/owner-builder-insurance`, `/project-advisory`, `/reviews`,
`/accreditation` and the CPD pages. **This paragraph is a summary and goes stale — `ROADMAP.md`
"Current state" is the authority on phase, and `node scripts/system-health.mjs` beats both.**
Read `handover/HANDOVER-2026-08-12-session-close.md` first: it is the one marked "OPEN — start here"
among the 13 files in `handover/`. Read **`new site/abe-website-migration-plan-v2.md`**
(the live strategic plan), its
`new site/abe-migration-plan-v2-risk-audit.md` (11 findings amended into the plan, incl. the no-slash
canonical call below), `new site/abe-new-site-sitemap.md` (the full ~44-page IA for Waves 1-5), and
**`new site/abe-migration-implementation-plan.md`** (the ticket-by-ticket runbook — three build recipes,
per-ticket DoD, the cutover runbook, and the progress tracker) before starting Wave 1+ work.
`abe-rebuild-plan.md` is the superseded first plan, kept for its Phase A-E shape only.
**Read `ROADMAP.md` before starting phase work** — it says what phase the system is in, what is gated,
and what must not be built yet. If it disagrees with `node scripts/system-health.mjs`, the script wins.
**`SYSTEM.md`** is the standing design reference — how the system is meant to behave and the six ideas
it follows from (including one session, one kind of work). Read it for the why behind any rule here.

Australian English. Never the word "comprehensive". No em dashes in body copy.

## House style (confirmed 15 Jul 2026, GSC-backed)
- **"owner builder" — open, no hyphen — in all prose.** GSC shows searchers use the open form ~215:5
  over "owner-builder", and Google normalises hyphens anyway, so the open form best mirrors query
  language. Keep the hyphen only when quoting a regulator's exact page/document name in a Source
  citation (e.g. QBCC "Fees for owner-builders"), and in URL slugs (`/qld-owner-builder-course`),
  which are unaffected.
- **The company is "ABE Education", never bare "ABE", anywhere a reader can see it.** Prose, headings,
  answer capsules, FAQ answers, alt text, meta and schema, CanCant lists, button labels. The one
  exception is the logotype in `SiteHeader.astro`, where "ABE" is the mark and "Education" sits beside
  it. Bare "ABE" reads as an initialism the reader has to decode, it competes with the many other
  three-letter training brands, and it made the site inconsistent with its own footer disclaimer
  ("ABE Education is not a Registered Training Organisation"). Internal files (comments, `kb/`,
  `pipeline/`, `/styleguide`) may use the short form freely. Enforced by `check-claims.mjs` §6.
- **Spell out "five years" in prose and answer capsules**; use numerals ("5 yrs" / "5 years") only in
  data cells (FactGrid, PriceCard), sticky bars, CTAs and meta/schema. Applies to any duration stated
  in body copy, not just five years specifically.

## Agreed stack (do not drift)
- **astro ^7** (NOT 6 or 5). Stricter Rust compiler; `Astro.glob()` is gone -> use `import.meta.glob()`.
- **Static output** (assets-only Worker). `astro build` -> `dist/`, served by `wrangler.jsonc`
  (`workers_dev: true`, `assets.directory: ./dist`). **No SSR adapter, no `output: 'server'`.**
- **@astrojs/sitemap** (emits sitemap-index.xml + sitemap-0.xml; `site` is set in astro.config.mjs).
- **Token CSS in `src/styles/global.css`** (CSS custom properties). **Not Tailwind.** Fonts:
  Archivo (display), DM Sans (body), DM Mono (mono). Accent maroon `#800000` on a warm cream
  ground. **`--ground` (#fbf9f5) is the page and its full-width chrome; `--paper` (#ffffff) is the
  fill of an ELEVATED surface** (cards, megamenu, mobile nav). They were one token until 24 Jul 2026,
  which is why the site ran on pure white against this line: creaming the shared token would also
  have creamed every card and sunk it into the `.bg-warm` bands. Do not re-merge them.
- **Content model: MDX + Astro Content Collections — done, not a target.** Zod-typed frontmatter, and
  `src/pages/[slug]/index.astro` renders every entry in the `courses` collection through one
  `CourseLayout`. QLD and WA migrated in `dd5d4c7`; their per-page `.astro` files are gone. Collections
  in use: `courses`, `hubs`, `cpd-bundles`, `experts`, `partners`, typed by `src/content.config.ts`.
  **Every new course page is MDX in a collection** — the old "once the collection is wired" condition
  is met. Some MDX files still import module/FAQ arrays from `src/data/*.ts` (build-owned); that is the
  data-module pattern, not an unmigrated page.
- Node 22+, npm only.

## Build / deploy
- `npm install` — once, or when deps change (pulls `@astrojs/sitemap`).
- `npm run dev` — http://localhost:4321/
- `npm run build` — static build to `./dist`
- `npm run preview` — preview the build
- `npx wrangler deploy` — deploy `dist/` (manual). Live: `abe-edu-web.<subdomain>.workers.dev`.
  (When git + Workers Builds is set up, a push to `main` auto-deploys instead.)
- Always `npm run build` before `wrangler deploy`. Confirm the build is green first.

## Authority model (hard rules — per jurisdiction)
**ABE is NOT an RTO.** Never claim it is, in copy or schema.
- **State-approved-direct** (QLD/QBCC, TAS/CBOS): "Approved by [regulator]", Certificate of Completion.
  No RTO/accredited/"Statement of Attainment". Schema credential `recognizedBy` the regulator.
  QLD specifically: there is no accredited version; only the QBCC-approved course is accepted.
- **Knowledge-requirement** (WA / Form 75): "supports your Form 75 owner-builder approval". No
  "WA-approved course/provider", no "permit"/"licence" for the owner-builder step (it is an *approval*).
  Schema credential has **no `recognizedBy`**. White Card unit is `CPCWHS1001` (single C in WA).
- **ASQA-accredited** (White Card, asbestos/silica): name the RTO partner + number
  (Blue Dog Training RTO 31193, AlertForce RTO 91826), "nationally recognised" is accurate, carry ASQA
  disclosure. ABE is the publisher, not the RTO. **NSW Owner Builder was in this group and is now
  ⛔ on hold** — unsigned partnership, and the five required units are not on RTO 45708's scope.
  Do not build it. Canonical status: `kb/rules/authority-model.md` → "NSW Owner Builder".
- **Every government fact is sourced + dated** in the page-foot Sources block. Re-verify indexed fees
  on their cadence (WA approval fee and similar reset ~1 July). An unresolved gov fact is a publish
  hard-blocker.
- **Never default a regulatory fact.** Verify it, or mark it explicitly UNVERIFIED. A plausible figure
  is worse than a visible gap.
- `[confirm: ...]` marks a regulatory fact awaiting verification and nothing else. Internal facts
  (price, pass mark, points, modules) are asked and answered before content is written.
- **Product scope confirmed 16 Jul 2026** (migration plan v2 §1), amended 23 Jul 2026: NSW Real Estate
  CPD is retired, not a current product — its legacy pages 301 away, never rebuilt. White Card is
  confirmed for all five states (NSW/QLD/WA/TAS/ACT). SA and VIC have no products. `/saaustralia` is
  the Solar Association Australia partner page (not South Australia) and stays.
  **Amended 25 Jul 2026 (Andrey):** two new CPD products are **in scope** — **NSW Building CPD** and
  **WA Real Estate CPD** — points, price, authority model and RTO all **TBC**; neither is built or
  recorded, and neither ships until those land. Two cautions carried from the day: NSW Building CPD is a
  distinct product from the ⛔ on-hold NSW **owner builder** course — do not conflate them; and "Real
  Estate CPD" is the exact category *retired for NSW* on 23 Jul, so the WA-in-scope call is a
  deliberate, state-specific extension, not a reversal of that NSW retirement. The live CPD bundle
  line-up alongside these: TAS Building (12 pts, $499, live), TAS Electrical (11 pts, $449) and TAS
  Plumbing (12 pts, $499) — the two TAS bundles are being built; see `handover/HANDOVER-cpd-bundles.md`.
- **Asbestos and silica (amended 23 Jul 2026 — the earlier "no asbestos/silica" line was wrong).**
  ABE has **two different products** here and conflating them is an authority-model error:
  1. **Two AlertForce (RTO 91826) accredited courses**, resold by ABE, nationally recognised, full ASQA
     disclosure. **Codes verified at source 3 Aug 2026** (`kb/register/alertforce-scope.md`), and the
     reading did **not** confirm the "every state" this line used to claim:
     - **11084NAT, Course in Asbestos Awareness** — delivery notification **NATIONAL**. Confirmed as
       claimed.
     - **10830NAT, Course in Crystalline Silica Exposure Prevention** — **there is no course called
       "Silica Awareness" on AlertForce's scope**; use this title and code. Its delivery notification
       lists **NSW, VIC, QLD, TAS, ACT only**. **WA, SA and NT are UNVERIFIED, not confirmed either
       way** — whether an absent delivery notification is a hard bar or an administrative gap was not
       settled. Do not state *or* deny availability in those three states until it is.
     The jurisdictional limit sits on **AlertForce's own scope entry**, not on the course's national
     accreditation: an RTO's entitlement to deliver a nationally accredited course is gated per RTO,
     per state, by its own scope. Same distinction that blocked NSW Owner Builder.
  2. **A CBOS-approved asbestos CPD course for TAS** ("Workplace Asbestos Basics", 1 point, a bundle
     component). A Tasmanian licence-renewal credit, **not** an awareness card, and never
     "nationally recognised".
  No page exists for either yet and none is planned this wave — parked 23 Jul, evidence recorded in
  `kb/rules/authority-model.md` and `kb/register/cbos-tas-reference.md` §A6.

## Reviews — never `AggregateRating`
ABE's reviews live on its Google Business Profile (4.8/5 from 52 reviews, confirmed 16 Jul 2026) — an
off-site score. Display it and link to the profile on `/reviews` and in trust furniture; **never** mark
it up as `AggregateRating` or any review schema anywhere on the site. Google treats third-party-sourced
ratings in structured data as self-serving, and pages of an entity that controls reviews about itself
are ineligible for the review-snippet rich result. Standing decision, not a preference. Collecting
native on-site reviews post-launch is the only path to earning `AggregateRating` back.

## Third-party scripts (CWV budget policy)
Confirmed set: GA4 and Google Ads. Both route through **Cloudflare Zaraz** (or server-side GA4), never
a raw render-blocking `gtag` tag on the main thread — this is the difference between a 100 and a ~70
Lighthouse score. A chat widget and the Meta pixel are still "maybe" (Andrey's call, before Wave 6); if
either lands, it loads on interaction/idle only (facade pattern) with its TBT cost measured on preview
before shipping. Do not add any third-party script outside this policy without it being an explicit,
measured decision.

## SEO / E-E-A-T (per page)
- One `<h1>` (the hero), question-led sentence-case H2s, 40-60 word answer capsule opening each
  section (except FAQ).
- Single server-rendered JSON-LD `@graph`: Course + EducationalOccupationalCredential + BreadcrumbList
  + Person (x2 for ABE-developed courses; **x1 for asqa-accredited**, see below). `Course.offers.price`
  must equal the on-page price. `recognizedBy` conditional (above).
- Named experts: **state-approved-direct and knowledge-requirement** courses (owner builder QLD/WA/TAS/ACT,
  CPD) are developed by ABE, so name **two** — Dominic Ogburn (developer) and Warwick Smith (independent
  compliance/currency reviewer) — with `sameAs` LinkedIn and a dated last-reviewed line.
  **asqa-accredited** courses (White Card, asbestos, silica, NSW owner builder) are developed and owned
  by the **RTO partner**, not ABE: never credit an ABE person as developer. Name **one** Person (Warwick,
  the reviewer) and credit the RTO as the developer via `Course.creator` + `recognizedBy`. The build
  fails an asqa page with two Person nodes or a Person titled "developer". Owner: `kb/rules/authority-model.md`
  §6 and `kb/rules/asqa-disclosure-framework.md`.
- `BaseLayout.astro` ships robots, canonical, OG/Twitter and (via sitemap integration) the sitemap +
  `public/robots.txt` on every page. Pass an optional `ogImage` for image cards.

## Canonical URL form (decided Wave 0, Jul 2026 — risk audit R2)
The canonical form of every URL is **`https://www.abeeducation.edu.au/<slug>` with NO trailing slash**.
Canonicals, sitemap entries, JSON-LD `@id`s, breadcrumb items and internal links all use this form.
`astro.config.mjs` sets `trailingSlash: 'never'`; `wrangler.jsonc`'s `assets.html_handling` is
`"drop-trailing-slash"`.

Why: every live equity URL is already slash-less (e.g. `/wa-owner-builder-course`). Astro's
`format: 'directory'` still emits `/slug/index.html` on disk, but `drop-trailing-slash` serves a
`/slug` request as a direct **200** from that file, and 307s a `/slug/` request to it. That makes every
same-slug rebuild byte-identical to its current production URL: zero redirect on the equity core, and
roughly half the redirect-map surface versus the trailing-slash alternative. This supersedes an earlier
trailing-slash decision recorded briefly during Wave 0 (superseded before merge, never reached `main`)
and the no-slash line in migration plan v2 §4, which it now matches. Apex->www and http->https are
zone-level Cloudflare redirect rules, not per-page config. Verified in the W0-7 redirect spike.

## Staging de-index (Wave 0 risk audit R3)
The `*.workers.dev` preview host must never be indexable while the real domain is still in
preparation, or Google can index the build as duplicate content on the wrong host. `_headers` can't
vary by hostname, and Cloudflare Transform Rules only apply to zones Andrey controls (`workers.dev` is
shared Cloudflare infra, not his zone), so the header has to be added in the Worker itself.
`worker/entry.js` is a thin passthrough to the `ASSETS` binding (`wrangler.jsonc`'s `main` +
`assets.binding`) that adds `X-Robots-Tag: noindex` only when the request hostname ends in
`.workers.dev`. `assets.run_worker_first: true` is required for this to fire at all: without it,
Cloudflare serves a matching static asset directly and never invokes `main`. This is not an SSR
adapter and does not change Astro's static output; remove the file and the `main`/`binding`/
`run_worker_first` lines at cutover once `workers_dev` is set to `false`.

## Content design and element selection
When building or auditing a page (including via `/abe-course-page-astro`),
use the content-design and element-selection guidance in **`DESIGN.md` section 7**: which treatment per
content type, which element for the reader's job, imagery, and reassurance-first. That section was
reconciled in from an out-of-repo source document that is **not available here and is not needed** —
§7 stands alone and is the whole of the rule. **`DESIGN.md` and `global.css` are canonical for tokens,
fonts, class names, components, and the warm palette, and win on any conflict.** If that source doc
ever resurfaces, do not adopt its `.t-*` classes, Public Sans / Source Serif fonts, `abe-tokens.css`,
cool-only palette, or `audit_*.py` scripts; none of them exist in this build.

## Images
- **Page imagery is local and served same-origin**, from `src/assets/images/` via `astro:assets`
  (23 files as of 15 Aug 2026). `src/lib/images.ts` is the resolver: `resolveImage()` matches a
  frontmatter image value to a file **by basename**, so placing an image is just dropping the file
  into `src/assets/images/` — no frontmatter, schema or component change. `responsiveImg()` (via
  `getImage()`) adds the width-based `srcset` + `sizes` and intrinsic `width`/`height`, still
  rendered as a raw `<img>` so scoped styles keep applying. Migrated 27 Jul 2026 (`006da23`,
  `57c38d4`, `645b4e7`); `handover/HANDOVER-images-astro-assets.md` records why the resolver is used
  instead of the content-collection `image()` helper (which hard-fails on existing public paths).
- **One image is still remote**: the logotype SVG in `SiteHeader.astro`, on
  `https://pub-e001e9a575874f24a0bcd7082a45cdbc.r2.dev/`. The `qld-ob` bucket
  (`pub-80a8c961e6274e19825de038e308436f.r2.dev`) is no longer referenced by the site, and
  `public/images/` no longer exists. `r2.dev` is dev-grade (rate-limited), so the standing "move to a
  custom domain (e.g. images.abeeducation.edu.au) before heavy production traffic" task still holds —
  but it is now that single SVG, not a bucket migration.
- `Placeholder` / `ZSplit` / `Hero` / `Credentials` accept a real image `src`; omit it to keep the FPO
  placeholder. Content alt text >= 80 chars, en-AU. Expert headshots are **real photos** (grayscale by
  default, colour on hover) — never AI-generated.

## Component gotcha — `SiteHeader.astro`
The nav is built as an HTML string and emitted via `set:html`, with its CSS in an `is:global` block
scoped under `.site-head`, plus a small `<script>` controller (megamenus open on **click**, not hover;
close on outside-click / Escape / selection). This is deliberate: Astro 7's compiler mis-parses dynamic
attributes inside mapped ternary JSX, and scoped styles do not reach `set:html` content. Do not
"simplify" it back to inline JSX. Sticky/layout rules use the `header.site-head` selector so they win
over `global.css` regardless of stylesheet order.

**Nav DATA lives in `src/data/nav.ts`, not in this file** (split 4 Aug 2026). `SiteHeader.astro`
imports `navGroups`, `utility` and `studentPortal` from it and owns everything about how they
render (the markup builders, the megamenu/burger controller, all CSS); `nav.ts` owns only what
each entry says (`code`/`name`/`href`/`desc`, the hub link, the feature panel). This closes the
repo's oldest fired trigger: a build session shipping a new page previously had to edit this
design-owned component just to add its own nav card, filed four separate times
(`skill-reviews/skills/2026-08-04-siteheader-nav-split.md` has the full history and the
before/after proof that the split changes zero rendered output). **Add a new page's nav entry in
`src/data/nav.ts`; never re-inline it into `SiteHeader.astro`.**

## Astro 7 compiler gotcha — nested template literals
**Never nest a template literal inside a `${...}` interpolation of another template literal** in
`.astro` frontmatter. The Rust compiler mis-scans it and dies with:

```
[CompilerError] Expected `}` but found `:`
    src/components/SiteHeader.astro:23:20
```

**The reported location is a lie.** It points at the first `interface` declaration, which is valid
TypeScript and nowhere near the real fault. You will burn builds bisecting it. Tell-tale signs: the same
interface compiles fine in a minimal file; deleting the first `interface` merely moves the error to the
second; the file has no BOM, no CRLF, and correct `---` fences.

Broken:
```ts
const html = `<ul>${items.map((i) => `<li>${i.label}</li>`).join('')}</ul>`;
```
Fixed — hoist the inner literal into its own const or helper:
```ts
const rows = items.map((i) => `<li>${i.label}</li>`).join('');
const html = `<ul>${rows}</ul>`;
```
Calling a *named function* inside `${...}` is fine (`${g.items.map(card).join('')}` compiles); it is the
literal-inside-a-literal that breaks. `SiteHeader.astro` follows this rule throughout: see `utilLinks`,
`priceHtml`, `trigger`, `cpdProf`, `mGroup`.

## Build reliability
- **Build off any cloud-synced folder.** OneDrive/Dropbox truncate large/many-file writes (it has
  truncated `package.json`, `SKILL.md`, component files this project) and mangle `node_modules`. Keep
  the repo on a plain local path (e.g. `C:\dev\abe-web`) or in WSL2. If a write looks truncated, verify
  the on-disk bytes and rewrite via a shell heredoc.

## Knowledge base and pipeline conventions
- `kb/register/` is the single owner of every verified regulatory figure. No second copies anywhere in
  the repo, the skill, or page data.
- `kb/content-source-map.md` is the index — read it before going live to a `.gov.au` page.
- `kb/rules/` holds the authority model, the authority/SEO rules and the ASQA disclosure framework, in
  full. This file carries only the short form.
- Stage artefacts are files: `pipeline/{slug}/01-source-map.md`, `02-gap.md`, `03-briefs.md`, and so on.
- **GSC exports live in `business data/GSC/` — note the space, so quote the path in every shell
  command.** They sit at the repo root beside `business data/LearnWorlds/` and are gitignored
  (`.gitignore` → `business data/`). **Corrected 29 Jul 2026:** this line said `data/GSC/` and had been
  wrong since the folder moved on ~28 Jul. `/data/*` now holds only `health-log.jsonl`, so a run
  following the old path finds nothing and wrongly concludes no export exists — which is exactly what
  happened on the `white-card-wa` build until Andrey pointed at the new location. `data/gsc/`
  lowercase, in older documents, is wronger still.
  **The zips are deliberately never committed** (ABE's commercial search data; the repo is public and
  git history is permanent). Unzip to a scratchpad, never into the repo tree, and **read `Filters.csv`
  first** — the site-wide and per-page exports are not distinguishable by filename, and reading a
  page-filtered export as site-wide will misstate demand.
  The site-wide export cannot satisfy the R4 query-coverage gate: Queries and Pages are separate
  dimensions and are not crossed, so there is no per-URL query list in it. **Ask Andrey for a per-page
  export at Stage 2**, not partway through.
- **Four scripts run automatically around every build**, so a failure in one is a build failure even
  though you never invoked it: `prebuild` runs `generate-redirects.mjs`, `check-assets.mjs` and
  `check-freshness.mjs`; `postbuild` runs `check-redirect-targets.mjs`.
  `check-freshness.mjs` **warns without blocking on register staleness**, but it is not warn-only in
  general: a CPD course marked live, past its CBOS expiry and still sold **fails the build without
  `--strict`** (`check-freshness.mjs:186`, and see ROADMAP "Expiry is a build-blocker").
  Run by hand: `system-health.mjs` before planning work, `review-trends.mjs` after filing a Stage-9
  review, `check-claims.mjs` when docs or figures change. `SYSTEM.md` §5 names every script that
  exists, and `check-claims.mjs` §7 fails the build if it stops doing so.
- Before adding any new record, log or file, read the recording policy in ROADMAP.md. Name the
  decision the record informs; if you cannot, do not add it.

## Ask, don't assume
- Ask when the request forks into materially different outputs, or a needed constraint is missing and
  cannot be inferred. Look in the brief, `pipeline/{slug}/` and `kb/` **first** — re-asking for
  something already on disk is its own failure.
- Where a sensible default will do, proceed and **flag the assumption inline**. Never bury it.
- Closed questions (either/or, pick-from-a-set, confirm-or-correct) use the interactive question tool,
  with the most likely value offered as an option. Open questions are asked in plain prose.
- Batch questions: one interaction with up to three beats three interactions.
- **Subagents cannot ask** — `AskUserQuestion` is unavailable to them. A subagent that hits an unknown
  stops and reports it upward. It never guesses.

## Session types
One session does one kind of work. The type is declared at the start and does not change mid-session.
If the work changes type, end the session and open the right one. This section loads into every session
and every subagent.

| Type | Purpose | May write | Must not touch |
|---|---|---|---|
| **build** | Run the pipeline for one page, Stages 1–8, then Stage 9 | `pipeline/{slug}/`, `src/content/**`, `skill-reviews/` (Stage 9 only) | `.claude/skills/**`, `kb/**`, `scripts/**`, `src/components/**`, `src/styles/**`, `src/content.config.ts` |
| **skills** | Act on the demand list — skills, scripts, rules, memory | `.claude/skills/**`, `scripts/**`, `kb/rules/**`, `CLAUDE.md`, `SYSTEM.md`, `ROADMAP.md`, `kb/mistakes-log.md`, `handover/**`, `src/content.config.ts` | `kb/register/**`, `src/styles/**`, `src/components/**`, any live run's artefacts |
| **design** | Component, CSS and styleguide changes | `src/components/**`, `src/styles/**`, styleguide specimens, `skill-reviews/design/**` (its own review only) | `kb/register/**`, `.claude/skills/**`, `pipeline/**` |
| **facts** | Verify and record regulatory figures | `kb/register/**`, `skill-reviews/facts/**` (its own review only) | everything else |

### Path ownership beyond the table

**The default: an unassigned path belongs to `skills`** — unless it is content (`build`), visual
(`design`), a verified figure (`facts`), or platform/deploy (below). This is not a question to
litigate per session. Assign it in the session that hit it, add a row here, and move on.

**The test.** A path is assignable when getting it wrong breaks one page's or the repo's own
correctness; it is a human decision when getting it wrong breaks the deployment itself. The shape
that goes unassigned is *infrastructure for* the work rather than *part of* the work — it belongs to
everyone's work and nobody's remit, so every session may take it or none dares to, and the second is
the worse failure.

**Deliberately unassigned, still:** `worker/`, `wrangler.jsonc`, `astro.config.mjs`, `.github/**`,
`package.json`. Platform and deploy configuration, not any session type's work. Changing one is its
own decision with a human in it — say so out loud rather than folding it into a session.

**Assigned so far**, each in the session that hit it:

| Path | Owner | Assigned | Because |
|---|---|---|---|
| `src/content.config.ts` | skills | 25 Jul 2026 | Cross-cutting content schema, not one page's build |
| `SYSTEM.md`, `handover/**` | skills | 29 Jul 2026 | Standing rules doc; the note layer demand lists route work *out of* |
| `public/**`, `.claude/launch.json` | skills | 1 Aug 2026 | Sitewide delivery artefacts no page owns; per-session verification tooling |
| `src/integrations/guardrails.ts`, `.gitignore` | skills | 4 Aug 2026 | Decide what every build enforces, and what enters version control at all |
| `PRODUCT.md`, `.impeccable/**` | skills | 14 Aug 2026 | Standing product-truth doc; its tool's own config sidecar |

Five sessions each spent thought on this same judgement call and reached the same answer, which is why
the default above is now *stated* rather than re-derived a sixth time. The reasoning for each row is in
the review that filed it — `git log -S` the path if you need it.

Two reconciliations carried from those sessions: the mistakes log is `kb/mistakes-log.md`, and design
owns all of `src/styles/**` (tokens live in `global.css`, there is no `tokens*` file).

**Disclosed crossing, 29 Jul 2026.** The system audit edited one comment in `worker/entry.js` — a stale
pointer at a file that had moved — which is on the deliberately-unassigned list above. Recorded here
rather than left to be discovered.

**`src/layouts/**` is owned by design.** Not a new precedent — this formalises what two design sessions
already did in practice, on the same judgement call each time: 28 Jul 2026
(`skill-reviews/design/2026-07-28-landmarks-and-carriers.md`, adding skip-link and `<main>` landmarks
across all four layouts) and 1 Aug 2026 (`skill-reviews/design/2026-08-01-type-floor-and-tap-targets.md`,
a `font-size` fix inside `CpdBundleLayout.astro`'s own `<style>` block, filed as unowned even while
fixing it). A layout wraps `BaseLayout` and renders the shared chrome and structural markup around a
page's content — the same category of work as `src/components/**`, never a page's own content, so a
build session still may not touch it.

**The five top-level `new site/*.md` planning documents are owned by skills** — `abe-architecture-
plan.md`, `abe-migration-implementation-plan.md`, `abe-migration-plan-v2-risk-audit.md`, `abe-new-site-
sitemap.md` and `abe-website-migration-plan-v2.md`. Hit 4 Aug 2026, editing the Stage-0 provenance gate
into `abe-migration-implementation-plan.md`'s Recipe A step 1 (todo item 9): these are standing
plan/rules documents in the same sense as `ROADMAP.md` and `SYSTEM.md`, just not co-located with them,
and changing a build recipe's steps is exactly the kind of change skills sessions make elsewhere in this
file. Deliberately scoped to the five files, not `new site/**`: the directory also holds `reference/`
and `examples of the certificates/`, gitignored source paperwork no session type edits, and `experts/`,
which is an asset drop, not planning prose.

**`src/data/**` is owned by build.** Named as unassigned twice before this — "it is page data,
edited by build sessions in practice, but the table does not say so"
(`skill-reviews/design/2026-08-02-siteheader-nsw-claim.md`) — and formalised 4 Aug 2026 as part of
splitting `SiteHeader.astro`'s nav data into `src/data/nav.ts` (see the component gotcha section
above), which made the gap load-bearing rather than theoretical: the whole point of the split was
giving build a file it may edit to add its own page's nav entry, so the directory needed an owner
the same day it needed a new file in it. Existing `src/data/faqs-*.ts` files (QLD/WA's per-page
FAQ and module copy, predating the MDX content-collection migration — see Agreed stack above)
were already build-edited in practice; this just says so.

**Disclosed crossing, 4 Aug 2026.** The session that made this split was declared `skills`, whose
table forbids `src/components/**` outright and does not grant `src/data/**` (it does now, per the
paragraph above, decided IN that same session). Editing `SiteHeader.astro` and creating
`src/data/nav.ts` were both done anyway, on Andrey's direct, informed instruction after the
crossing was named and the alternative (leave the trigger unbuilt) was offered — the same shape as
the QLD build session's disclosed `SiteHeader.astro` edit and the design session's disclosed
`scripts/check-redirect-targets.mjs` cherry-pick before it. Recorded here rather than only in the
session transcript. See `skill-reviews/skills/2026-08-04-siteheader-nav-split.md`.

Subagents inherit the session type of the session that launched them and cannot widen it. A subagent
that needs to write outside the type stops and reports upward. It never guesses.

### Rules
1. **Pre-flight.** Run `node scripts/system-health.mjs` at the start of every session. On FAIL — or on a
   WARN you would want to fix — close the session and open the type that owns the fix. Never repair and
   continue.
2. **Friction is recorded, not fixed.** Inside a run, friction goes on the Stage 9 demand list. Outside a
   run, it goes to `kb/mistakes-log.md` (increment "times seen", do not duplicate). A build session that
   quietly fixes the process destroys the evidence the run exists to produce.
3. **Second occurrence is the trigger.** One demand-list occurrence records a problem. Two authorise
   restructuring. Phase 3 candidates in `ROADMAP.md` each carry their own trigger — do not build ahead of it.
4. **No figure enters `kb/register/` without a source read in that session.** A figure carried in from
   another session, a prior chat, or a page is not verified. Mark UNVERIFIED rather than carry it silently.
5. **Build sessions stop at Stage 8.** Production deploy is human-triggered, always.
6. **Stage 9 is graded by a fresh subagent** given only the pipeline artefacts, built HTML, audit output
   and the review template. Self-grading is permitted only with `graded_by: self` and a stated reason.
7. **Token and design-register changes are exclusive.** A session that edits tokens or the design register
   does nothing else. The locked system (radius 0, flat surfaces, 1px borders, Heritage Maroon for actions
   only) opens when it cannot express what is needed — not when a page would look better.
8. **A readability audit measures; it does not authorise.** Audit findings become demand-list items routed
   to `design`. `.claude/skills/abe-course-page-astro/references/usability-map.md` decides.
9. **Design sessions close with a review.** A design session that ships component, token/design-register or
   styleguide changes writes one review to `skill-reviews/design/YYYY-MM-DD-<topic>.md` before merge — the
   build Stage-9 format applied to design: what shipped with **measured** before/after values (not ticks,
   per the self-certification lesson), each design-register change flagged, and a demand list tagged
   `[skills]`/`[design]`/`[facts]`. The `design/` subdirectory keeps it out of the **build-run trend and
   page-coverage scans** (`review-trends.mjs` and `system-health`'s review coverage read
   `skill-reviews/*.md` flat, deliberately — a design review has no run metrics and grades no page).
   **Demand routing is the exception and descends into it** (`demand-split.mjs` and `system-health`'s
   unrouted count), because a demand item is a demand item wherever it was filed. That asymmetry is
   deliberate; it was not, until 29 Jul 2026, when ten design reviews and their demand items turned out
   to be invisible to routing as well. Self-grading is allowed with `graded_by: self` and a stated
   reason — there is no fresh-subagent design grader yet.
10. **Skills sessions close with a review too**, to `skill-reviews/skills/YYYY-MM-DD-<topic>.md`, on the
   same terms as rule 9: measured before/after values rather than ticks, and a demand list tagged
   `[skills]`/`[design]`/`[facts]`/`[build]`. Added 29 Jul 2026 — a skills session changes the rules and
   the checks every other session runs under, which is the *most* consequential kind of change in the
   repo and was the only kind closing with no record at all. Same subdirectory logic as design: routed
   by `demand-split`, excluded from the build-run trend and page-coverage scans, because a skills
   session grades no page.
11. **Facts sessions close with a review as well**, to `skill-reviews/facts/YYYY-MM-DD-<topic>.md`, on
   the same terms as rules 9 and 10, with two additions that are specific to facts work and are the
   reason this rule exists rather than being folded into them.
   **(a) Record the reading, not just the figure.** `kb/register/**` stores what is true; the review
   stores *how it was established* — the instrument opened, the clause or page cited, the date, and
   what was searched for and not found. A register diff shows a row changing from ✅ to ❌ and cannot
   show why, so without the review the next session re-derives the reasoning from scratch or, worse,
   reverses it back.
   **(b) A reversal names what it contradicts.** When a reading overturns a position the repo already
   holds, the review lists every place still carrying the old one — rule docs, page copy, MDX
   comments, skill references — because those are skills- and build-owned and a facts session may not
   fix them itself. An unlisted contradiction is one nobody is assigned to close.
   Added 1 Aug 2026, after a facts session read SafeWork NSW's GIT conditions, reversed the NSW
   delivery row, and had **no mandated place to put the reasoning** — for the most consequential kind
   of change in the repo, since `kb/register/**` is the single owner of every verified regulatory
   figure and a wrong row propagates to page copy and schema. It filed one anyway, at
   `skill-reviews/facts/2026-08-01-nsw-git-conditions-and-fees.md`; this rule ratifies the practice
   rather than inventing it. Same subdirectory logic as rules 9 and 10, and **no tooling change was
   needed** — verified 1 Aug 2026: `demand-split.mjs` has been recursive since 29 Jul, so facts items
   already route (38 reviews scanned, ten hits from that one review), while `review-trends.mjs` and
   `system-health.mjs:177` read `skill-reviews/` flat and already exclude it. Self-grading is allowed
   with `graded_by: self` and a stated reason; there is no fresh-subagent facts grader, and note that
   rule 4 already forbids the obvious substitute — a second session cannot re-verify a figure without
   reading the source itself.

### Demand-list format
Every demand-list item in a Stage 9 review carries a destination, so the handover notes can be derived
rather than written. **Valid destinations are `skills`, `design`, `facts` and `build` — one per session
type.** Anything else is reported UNROUTED by `scripts/demand-split.mjs` rather than dropped.
(`build` was added 29 Jul 2026: the list carried three of the four types, so page work filed by a
design session had no valid tag and two correctly-tagged items reported UNROUTED. A `build` item is
read at Stage 0 by the session building that page.)

**Open with the thing, in backticks, and put a repeat in the first line.** Both rules exist because
`demand-split.mjs` reads an item the way a person skims one, and an item written for neither is
counted by neither.
1. **Lead with the file, component or check the item is about, in backticks** — `SiteHeader.astro`,
   `check-claims.mjs:229`, `--slate-light`. The near-miss detector pairs items on a shared identifier
   *and then* on shared prose, so an item naming its subject only in the third sentence is one the
   tool cannot group with its own twin. A prose-only item is still valid; it is just invisible to the
   counter, which is the same as not being counted.
2. **If it is a repeat, say so in the opening line** — "SECOND SIGHTING", "third filing", "second
   occurrence". A declaration inside the first 200 characters is read as a count and promotes the item
   straight into *Trigger met*. The identical words further down are surfaced only as a question, and
   deliberately so: both false positives found when the whole item was matched sat below the lead, and
   one of them was a negation ("...the stranded-work row rather than a fourth instance of it"), where
   the tool would have reported four occurrences from a sentence declaring none.

   Added 2 Aug 2026, after the SiteHeader ownership complaint had been filed three times — the second
   filing opening with the literal words "SECOND SIGHTING" — while `demand-split` reported zero
   triggers on every destination. A human had already done the counting, in the item text, and the
   tool printed "None". ROADMAP rule 3 turns on that count, so a missed one is not a reporting blemish;
   it is restructuring work that never gets authorised.

```
## Demand list
Tag every item: [skills] | [design] | [facts] | [build]
- [skills] `abe-course-page-astro` Stage 4 asks for keyword data the brief already supplies
- [design] SECOND SIGHTING — `.faq` block spacing collapses below 768px. Component fix, not a page fix
- [facts] `white-card-tas.mdx` states a figure with no entry in `kb/register/`
- [build] `owner-builder-courses.mdx` breadcrumb points at a hub that is not built yet
```

### Closing a demand item
An item stays on the handover list until it is **struck through in the review that filed it**:

```
- ~~[design] `Note.astro` renders a bare `<p>`~~ fixed in #89
```

It then leaves every future note, and the note's header counts it (`50 open · 1 closed`). Strikethrough
rather than deletion, so the run's record of what it found stays readable.

**Any session MUST close an item its work closes, in whichever review filed it.** Closing states a
fact about the item's status; it does not rewrite that run's findings, which stay visible under the
strike. Waiting for the filing session to come back would mean nothing is ever closed, because sessions
do not come back. **Close them in the same session as the fix** — every item this repo fixed before
30 Jul 2026 was still listed as outstanding, `Note.astro` in three places and the `Login` anchor in
four, because there was no mechanism and no rule.

**"May" became "must" on 14 Aug 2026, and the cost of the weaker word is on the record.** The 1-3 Aug
facts sessions read the delivery rows for TAS, ACT and QLD at their regulators, updated
`kb/register/**`, and did not strike the items in the 2 Aug review that asked for exactly that work.
Eleven days later `reports/handover-facts.md` still carried **5 of its 12 items already done**,
including "read the TAS delivery row at WorkSafe Tasmania, `/white-card-tas` is live and indexable" —
which reads as an unverified compliance claim on a published page. A session was ranked onto that list
ahead of a page-blocking bundle item and the unbuilt homepage, on the strength of a risk that no
longer existed. **A stale handover does not merely waste a session, it misdirects prioritisation**,
and it does it while looking exactly like good evidence.

This applies to **every** session type, and specifically to `facts`: rules 9, 10 and 11 each require a
review, but only design and skills had grown the habit of closing. Before you write your review, search
`skill-reviews/` for items your work has just answered — the derived handover shows each item's source
review, so finding them is a grep, not an archaeology project. `node scripts/demand-split.mjs --stale`
lists open items whose named file has moved since filing, which helps when you are already hunting;
it is a weak prompt rather than a filter (75 of 83 checkable items flagged on the corpus that
motivated it) and it cannot see a prose-only item at all, which is what four of those five were.

The mechanism used to work by accident: a struck line failed the item regex and was discarded
silently, which is the right outcome by the wrong route — a typo in a tag was discarded just as
quietly. Closure is now deliberate and counted, and a line that looks like an item but parses as
neither is **reported**, not dropped (`--strict` exits 1). "Fixed" and "malformed" must never be the
same event to a tool whose output decides what gets built.

**Two different things are called handover notes. Do not confuse them.**
- **`reports/handover-{skills,design,facts}.md`** — the *derived* view (recording policy layer 3),
  written by `node scripts/demand-split.mjs --write` from the demand lists. Regenerate it, never edit
  it, never treat it as a source. It is gitignored and absent until you generate it, which is correct:
  a derived view that is committed is the duplication the four-layer policy exists to prevent.
- **`handover/HANDOVER-*.md`** — *hand-written* session notes, in git, and a legitimate source. They
  carry context a demand list cannot: what was attempted, what was ruled out, and why. **Close one
  explicitly when its work lands** — a `## Status:` header with the date and the commit SHAs, as
  `handover/HANDOVER-images-astro-assets.md` does. A handover with no closure record is
  indistinguishable from an open one, and **four currently are** (checked 15 Aug 2026):
  `HANDOVER-facts-cpd-tas.md`, `HANDOVER-image-prompts-2026-08-02.md`, `HANDOVER-stage7-reverify.md`
  and `HANDOVER-status-board.md`. The one to read first is whichever carries `## Status: OPEN` —
  `HANDOVER-2026-08-12-session-close.md` as at this date.

## Human gates
- **Production deploys are human-triggered, always.** No agent, hook or workflow deploys to production
  without an explicit go in that session.
- Stage checkpoints stand: show the stage output and get a go-ahead before starting the next.
- The improvement pass proposes diffs only. It must never edit `src/integrations/guardrails.ts`, this
  file's Human gates section, or any Claude Code hook. **No hooks exist today** — verified 15 Aug 2026:
  neither `.claude/settings.json` nor `.claude/settings.local.json` has a `hooks` key, and `.claude/`
  holds `commands/`, `skills/`, `launch.json` and `settings*.json`. Hooks are still an ungated Phase-3
  candidate in ROADMAP. The clause is written to bind the day one is added, not to describe something
  present. (`package.json`'s `prepare: husky` is a *git* hook chain, not a Claude Code hook, and is
  platform config no session type owns.)
- Legal pages (`terms`, `privacy`, `refund`, `contact`) are placed, never drafted or reworded.

## Git workflow (once the repo exists)
- Trunk-based on `main`; Conventional Commits (`feat:`/`fix:`/`chore:`/`content:`).
- Do not push unless asked. Use `/ship` (validate + show diff + wait for "ship it").
- Never `git push --force`/`--force-with-lease`, `git reset --hard`, `--no-verify`, or amend/rebase
  commits already on origin/main.

## Never do
- Never modify `package.json` / `package-lock.json` / `.npmrc` unless asked. Never `npm update`/`upgrade`.
- Never read or write `.env*`, `.dev.vars*`, `*.pem`, `*.key`. Never commit secrets.
- Never `rm -rf`, `wrangler delete`, or `wrangler ... delete`.
- Never downgrade Astro below 7. Never introduce an SSR adapter without an explicit decision.
- Never claim ABE is an RTO or that WA has a government-approved course.
- Never weaken a guardrail, or silence a check, to make a build pass. Fix the content or the data.
- Never keep a second copy of a figure that `kb/register/` owns.
