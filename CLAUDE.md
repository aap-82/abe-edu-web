# ABE Education marketing site — project rules (read first)

Astro 7 static marketing site for abeeducation.edu.au. Four owner-builder course pages live on
Cloudflare Workers (QLD/WA/TAS/ACT); Wave 0 (platform close-out — templates, chrome, CI, redirects) is
merged and live as of 18 Jul 2026. Waves 1-6 (real content build-out + cutover) are next.
Read the current handover in `handover/` for state + backlog. Read **`new site/abe-website-migration-plan-v2.md`**
(the live strategic plan — supersedes `../abe-rebuild-plan-review.md`), its
`new site/abe-migration-plan-v2-risk-audit.md` (11 findings amended into the plan, incl. the no-slash
canonical call below), `new site/abe-new-site-sitemap.md` (the full ~44-page IA for Waves 1-5), and
**`new site/abe-migration-implementation-plan.md`** (the ticket-by-ticket runbook — three build recipes,
per-ticket DoD, the cutover runbook, and the progress tracker) before starting Wave 1+ work.
`../MIGRATION.md` still covers the original Claude Code / repo setup.
**Read `ROADMAP.md` before starting phase work** — it says what phase the system is in, what is gated,
and what must not be built yet. If it disagrees with `node scripts/system-health.mjs`, the script wins.

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
- **Content model target: MDX + Astro Content Collections** (Zod-typed frontmatter, one `CourseLayout`
  renders all states). QLD/WA are still per-page `.astro` + `data/*.ts` and are being migrated — see
  HANDOVER backlog. New course pages should be MDX once the collection is wired.
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
- **Asbestos and silica (amended 23 Jul 2026 — the earlier "no asbestos/silica" line was wrong).**
  ABE has **two different products** here and conflating them is an authority-model error:
  1. **AlertForce (RTO 91826) Asbestos Awareness and Silica Awareness**, resold by ABE **in every
     state** and **nationally recognised with a course code**. Full ASQA disclosure applies. The
     codes are **UNVERIFIED** — confirm on AlertForce's scope at
     `training.gov.au/Organisation/Details/91826` **in a browser** before any page states one.
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
content type, which element for the reader's job, imagery, and reassurance-first. That section is
reconciled from `outputs/md/abe-page-design-rules.md`, the fuller reference. **`DESIGN.md` and
`global.css` are canonical for tokens, fonts, class names, components, and the warm palette, and win on
any conflict.** Do not adopt the source doc's `.t-*` classes, Public Sans / Source Serif fonts,
`abe-tokens.css`, cool-only palette, or `audit_*.py` scripts; none of them exist in this build.

## Images
- Served from the Cloudflare R2 public bucket, referenced by URL:
  base `https://pub-e001e9a575874f24a0bcd7082a45cdbc.r2.dev/` (brand/logo/portraits) and
  `https://pub-80a8c961e6274e19825de038e308436f.r2.dev/` (QLD course images, bucket `qld-ob`).
- `Placeholder` / `ZSplit` / `Hero` / `Credentials` accept a real image `src`; omit it to keep the FPO
  placeholder. Content alt text >= 80 chars, en-AU. Expert headshots are **real photos** (grayscale by
  default, colour on hover) — never AI-generated.
- `r2.dev` is dev-grade (rate-limited). Move to a custom domain (e.g. images.abeeducation.edu.au) before
  heavy production traffic — it's a drop-in URL swap.

## Component gotcha — `SiteHeader.astro`
The nav is built as an HTML string and emitted via `set:html`, with its CSS in an `is:global` block
scoped under `.site-head`, plus a small `<script>` controller (megamenus open on **click**, not hover;
close on outside-click / Escape / selection). This is deliberate: Astro 7's compiler mis-parses dynamic
attributes inside mapped ternary JSX, and scoped styles do not reach `set:html` content. Do not
"simplify" it back to inline JSX. Sticky/layout rules use the `header.site-head` selector so they win
over `global.css` regardless of stylesheet order.

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
- GSC exports live in `data/GSC/` (lowercase `data`, uppercase `GSC` — the whole `/data/` tree is
  gitignored because it is ABE's commercial search data).
- `scripts/check-freshness.mjs` runs on every build via `prebuild` and warns without blocking.
  `system-health.mjs` before planning work, `review-trends.mjs` after filing a Stage-9 review,
  `check-claims.mjs` when docs or figures change.
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
| **skills** | Act on the demand list — skills, scripts, rules, memory | `.claude/skills/**`, `scripts/**`, `kb/rules/**`, `CLAUDE.md`, `kb/mistakes-log.md`, `ROADMAP.md`, `src/content.config.ts` | `kb/register/**`, `src/styles/**`, any live run's artefacts |
| **design** | Component, CSS and styleguide changes | `src/components/**`, `src/styles/**`, styleguide specimens | `kb/register/**`, `.claude/skills/**`, `pipeline/**` |
| **facts** | Verify and record regulatory figures | `kb/register/**` | everything else |

`src/content.config.ts` (the content schema) is owned by **skills** — it is cross-cutting model
infrastructure, not one page's build, so a build session treats it as fixed. (Assigned 25 Jul 2026, when
a demand item asked to make a schema field optional; the original session-types table left it
unassigned.) Paths reconciled to the live layout: the mistakes log is `kb/mistakes-log.md`, and design
owns all of `src/styles/**` (tokens live in `global.css`, there is no `tokens*` file).

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
   to `design`. `references/usability-map.md` decides.

### Demand-list format
Every demand-list item in a Stage 9 review carries a destination, so the handover notes can be derived
rather than written. Valid destinations: `skills`, `design`, `facts`. Anything else is reported UNROUTED
by `scripts/demand-split.mjs` rather than dropped.

```
## Demand list
Tag every item: [skills] | [design] | [facts]
- [skills] Stage 4 asks for keyword data the brief already supplies
- [design] FAQ block spacing collapses below 768px — component fix, not a page fix
- [facts] TAS White Card figure on the page has no register entry
```

Handover notes are a derived view (recording policy layer 3): regenerate them with
`node scripts/demand-split.mjs --write`, never edit them, and never treat one as a source.

## Human gates
- **Production deploys are human-triggered, always.** No agent, hook or workflow deploys to production
  without an explicit go in that session.
- Stage checkpoints stand: show the stage output and get a go-ahead before starting the next.
- The improvement pass proposes diffs only. It must never edit `src/integrations/guardrails.ts`, the
  hooks, or this file's Human gates section.
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
