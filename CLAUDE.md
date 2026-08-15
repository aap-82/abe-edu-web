# ABE Education marketing site — project rules (read first)

Astro 7 static marketing site for abeeducation.edu.au, on Cloudflare Workers. **What phase the
system is in, what is gated, and what must not be built yet is `ROADMAP.md`'s job — read its
Current state before phase work; if it disagrees with `node scripts/system-health.mjs`, the script
wins. What is built, per page, is `node scripts/page-status.mjs`'s job.** Do not trust page
inventories written in prose, including in this file's own history.

Reading order for Wave 1+ work: `handover/` (whichever file carries `## Status: OPEN`), then
**`new site/abe-website-migration-plan-v2.md`** (live strategic plan), its
`new site/abe-migration-plan-v2-risk-audit.md`, `new site/abe-new-site-sitemap.md` (the ~44-page
IA), and **`new site/abe-migration-implementation-plan.md`** (the ticket-by-ticket runbook).
**`SYSTEM.md`** is the standing design reference — the why behind any rule here.

This file was cut from 47KB to its current size on 15 Aug 2026 under ROADMAP's recording policy:
rules kept verbatim, derivation stories moved to the reviews that produced them (`git log -S` any
rule for its history). If a rule here seems to lack justification, the justification exists — find
it before relitigating it.

Australian English. Never the word "comprehensive". No em dashes in body copy.

## Operating mode: STUDIO (until cutover)

Decided by Andrey, 16 Aug 2026: the site is pre-launch (host-level noindex on workers.dev), the
priority is design, content, conversion and UI/UX iteration, and the full governance weight was
built for a live regulated site with parallel operators. Until cutover the system runs lighter.
**The automated checks all stay on** — they cost seconds and are what makes fast iteration safe.
What relaxes is ceremony.

**Two walls stand in every mode, full strength:**
1. **Only a facts session writes `kb/register/**`**, and no figure enters it without a source read
   in that session. Facts sessions still close with a review (rule 11) — the reading record IS the
   verification.
2. **Production deploys are human-triggered, always.** Pushing to `main` deploys.

**Relaxed until cutover (each rule below carries a *(studio)* tag where it applies):**
- **Unverified regulatory facts are allowed on noindexed pages.** `[confirm: ...]` markers WARN
  there instead of failing the build (`guardrails.ts` check 7). Verification is a **publish gate**:
  it runs when `noindex` comes off a page, not while drafting. Indexable pages keep the hard rule
  unchanged.
- **Session types are declared, not policed.** Say what kind of work a session is doing; the
  may-write table below is the guide. Only wall 1 is enforced. Crossings into platform files still
  get named in the PR.
- **Reviews are optional for design and skills sessions**; recommended (not required) for build
  sessions on pages carrying regulatory claims. Facts reviews stay mandatory (wall 1).
- **Exclusive sessions for register/token changes become "flag it in the PR".**
- **Pre-flight `system-health` is recommended before planning work, not required per session** —
  CI runs the checks on every push and PR.
- **Demand-list closing is best-effort**; the list is advisory. `TODO`s and PR descriptions are
  legitimate homes for follow-ups.
- **The meta-length ratchet is off** (`check-meta.mjs` `STUDIO = true`): over-target titles and
  descriptions WARN so headline iteration for conversion costs nothing. Index-signal, canonical
  and missing-meta checks remain hard FAILs — those are correctness, not heuristics.

**At cutover, re-tighten — this is a checklist, not a rebuild:** flip `STUDIO` in `check-meta.mjs`
and re-measure its BUDGET; `[confirm:]` and every publish gate go hard everywhere as pages become
indexable; reviews and demand-list discipline return per the rules below; remove this section's
relaxations by deleting the *(studio)* tags. The cutover runbook in
`new site/abe-migration-implementation-plan.md` is where the sequence lives.

## House style (confirmed 15 Jul 2026, GSC-backed)
- **"owner builder" — open, no hyphen — in all prose** (searchers use the open form ~215:5 in GSC).
  Keep the hyphen only when quoting a regulator's exact page/document name in a Source citation, and
  in URL slugs (`/qld-owner-builder-course`), which are unaffected.
- **The company is "ABE Education", never bare "ABE", anywhere a reader can see it** — prose,
  headings, capsules, FAQ answers, alt text, meta, schema, button labels. The one exception is the
  logotype in `SiteHeader.astro`. Internal files (comments, `kb/`, `pipeline/`, `/styleguide`) may
  use the short form. Enforced by `check-claims.mjs` §6.
- **Spell out durations in prose and answer capsules** ("five years"); numerals only in data cells
  (FactGrid, PriceCard), sticky bars, CTAs and meta/schema.

## Agreed stack (do not drift)
- **astro ^7** (NOT 6 or 5). Stricter Rust compiler; `Astro.glob()` is gone → `import.meta.glob()`.
- **Static output** (assets-only Worker). `astro build` → `dist/`, served by `wrangler.jsonc`
  (`workers_dev: true`, `assets.directory: ./dist`). **No SSR adapter, no `output: 'server'`.**
- **@astrojs/sitemap**; `site` is set in `astro.config.mjs`.
- **Token CSS in `src/styles/global.css`** (CSS custom properties). **Not Tailwind.** Fonts: Archivo
  (display), DM Sans (body), DM Mono (mono). Accent maroon `#800000` on a warm cream ground.
  **`--ground` (#fbf9f5) is the page and its full-width chrome; `--paper` (#ffffff) is the fill of
  an ELEVATED surface** (cards, megamenu, mobile nav). Do not re-merge them — they were split from
  one token on 24 Jul 2026 precisely because creaming the shared token sank every card.
- **Content model: MDX + Astro Content Collections — done, not a target.** Zod-typed frontmatter;
  `src/pages/[slug]/index.astro` renders every `courses` entry through one `CourseLayout`.
  Collections: `courses`, `hubs`, `cpd-bundles`, `experts`, `partners`, typed by
  `src/content.config.ts`. **Every new course page is MDX in a collection.** Some MDX files import
  module/FAQ arrays from `src/data/*.ts` (build-owned) — that is the data-module pattern, not an
  unmigrated page.
- Node 22+, npm only.

## Build / deploy
- `npm install` — once, or when deps change.
- `npm run dev` — http://localhost:4321/
- `npm run build` — static build to `./dist`
- `npm run preview` — preview the build
- A push to `main` auto-deploys via Workers Builds — **pushing is deploying**. Manual fallback:
  `npx wrangler deploy` after a green `npm run build`.

## Authority model (hard rules — per jurisdiction)
**ABE is NOT an RTO.** Never claim it is, in copy or schema. Full model, evidence and canonical
product statuses: `kb/rules/authority-model.md`. This file carries only the short form.

- **State-approved-direct** (QLD/QBCC, TAS/CBOS): "Approved by [regulator]", Certificate of
  Completion. No RTO/accredited/"Statement of Attainment". Schema credential `recognizedBy` the
  regulator. QLD specifically: there is no accredited version; only the QBCC-approved course is
  accepted.
- **Knowledge-requirement** (WA / Form 75): "supports your Form 75 owner-builder approval". No
  "WA-approved course/provider", no "permit"/"licence" for the owner-builder step (it is an
  *approval*). Schema credential has **no `recognizedBy`**. White Card unit is `CPCWHS1001`
  (single C in WA).
- **ASQA-accredited** (White Card, asbestos/silica): name the RTO partner + number (Blue Dog
  Training RTO 31193, AlertForce RTO 91826), "nationally recognised" is accurate, carry ASQA
  disclosure. ABE is the publisher, not the RTO. **NSW Owner Builder was in this group and is
  ⛔ on hold — do not build it.** Canonical status: `kb/rules/authority-model.md` → "NSW Owner
  Builder".
- **An RTO's entitlement to deliver a nationally accredited course is gated per RTO, per state, by
  its own scope entry** — check the scope, not just the registration. This blocked NSW Owner
  Builder and limits the AlertForce silica course (10830NAT: NSW/VIC/QLD/TAS/ACT only; WA/SA/NT
  UNVERIFIED — state nothing either way). Codes and scope readings: `kb/register/alertforce-scope.md`.
  The TAS asbestos CPD course ("Workplace Asbestos Basics", 1 point) is a CBOS licence-renewal
  credit, **not** an awareness card, never "nationally recognised" — a different product from the
  AlertForce awareness courses; conflating them is an authority-model error.
- **Every government fact is sourced + dated** in the page-foot Sources block. Re-verify indexed
  fees on their cadence (WA approval fee and similar reset ~1 July). An unresolved gov fact is a
  publish hard-blocker.
- **Never default a regulatory fact.** Verify it, or mark it explicitly UNVERIFIED. A plausible
  figure is worse than a visible gap.
- `[confirm: ...]` marks a regulatory fact awaiting verification and nothing else. *(studio)* On a
  noindexed page the marker WARNs; it hard-blocks the moment the page is indexable. Internal facts
  (price, pass mark, points, modules) are asked and answered before content is written.
- **Product scope** (confirmed 16 Jul 2026, amended 23 and 25 Jul — full history in git): White
  Card in all five states; SA and VIC have no products; NSW Real Estate CPD is retired (legacy
  pages 301 away, never rebuilt); `/saaustralia` is the Solar Association Australia partner page
  and stays. In scope but TBC on every parameter, neither built nor recorded: **NSW Building CPD**
  (a distinct product from the on-hold NSW owner builder course — do not conflate) and **WA Real
  Estate CPD** (a deliberate state-specific extension, not a reversal of the NSW retirement).
  Live TAS CPD bundles: see `handover/HANDOVER-cpd-bundles.md` and the CPD register.

## Reviews — never `AggregateRating`
ABE's reviews live on its Google Business Profile — an off-site score. Display it and link to the
profile on `/reviews` and in trust furniture; **never** mark it up as `AggregateRating` or any
review schema anywhere on the site: Google treats third-party-sourced ratings in structured data as
self-serving, and self-controlled review pages are ineligible for the rich result. Standing
decision. Native on-site reviews post-launch are the only path to earning it back.

## Third-party scripts (CWV budget policy)
Confirmed set: GA4 and Google Ads, both via **Cloudflare Zaraz** (or server-side GA4), never a raw
render-blocking `gtag` on the main thread. Chat widget and Meta pixel are "maybe" (Andrey's call,
before Wave 6); if either lands it loads on interaction/idle only (facade pattern), TBT measured on
preview first. No third-party script outside this policy without an explicit, measured decision.

## SEO / E-E-A-T (per page)
- One `<h1>` (the hero), question-led sentence-case H2s, 40-60 word answer capsule opening each
  section (except FAQ).
- Single server-rendered JSON-LD `@graph`: Course + EducationalOccupationalCredential +
  BreadcrumbList + Person. `Course.offers.price` must equal the on-page price. `recognizedBy`
  conditional on the authority model (above).
- Named experts: **state-approved-direct and knowledge-requirement** courses are ABE-developed —
  name **two** (Dominic Ogburn, developer; Warwick Smith, independent reviewer) with `sameAs`
  LinkedIn and a dated last-reviewed line. **asqa-accredited** courses are developed and owned by
  the RTO partner — name **one** Person (Warwick, reviewer), credit the RTO via `Course.creator` +
  `recognizedBy`, and never credit an ABE person as developer. The build fails an asqa page with
  two Person nodes or a Person titled "developer". Owner: `kb/rules/authority-model.md` §6 and
  `kb/rules/asqa-disclosure-framework.md`.
- `BaseLayout.astro` ships robots, canonical, OG/Twitter, and (via the sitemap integration) the
  sitemap + `public/robots.txt` on every page. Optional `ogImage` for image cards.

## Canonical URL form (decided Wave 0 — risk audit R2)
**`https://www.abeeducation.edu.au/<slug>` with NO trailing slash**, everywhere: canonicals,
sitemap, JSON-LD `@id`s, breadcrumbs, internal links. `astro.config.mjs` sets
`trailingSlash: 'never'`; `wrangler.jsonc` `html_handling: "drop-trailing-slash"` serves a `/slug`
request as a direct 200 from the on-disk `/slug/index.html` and 307s `/slug/` to it — so every
same-slug rebuild is byte-identical to its live production URL and the equity core takes zero
redirects. Apex→www and http→https are zone-level Cloudflare rules, not per-page config.

## Staging de-index (Wave 0 risk audit R3)
The `*.workers.dev` preview host must never be indexable. `_headers` cannot vary by hostname and
Transform Rules do not reach the shared `workers.dev` zone, so `worker/entry.js` (a thin
passthrough to the `ASSETS` binding) adds `X-Robots-Tag: noindex` when the hostname ends in
`.workers.dev`. `assets.run_worker_first: true` is required or the Worker never runs. Not an SSR
adapter. **At cutover** (once `workers_dev: false`): remove the file and the
`main`/`binding`/`run_worker_first` lines.

## Content design and element selection
When building or auditing a page, use **`DESIGN.md` section 7** — treatment per content type,
element per reader job, imagery, reassurance-first. §7 stands alone; the out-of-repo source it was
reconciled from is not needed, and if it resurfaces, do not adopt its `.t-*` classes, Public Sans /
Source Serif fonts, `abe-tokens.css`, cool-only palette, or `audit_*.py` scripts — none exist in
this build. **`DESIGN.md` and `global.css` are canonical for tokens, fonts, class names,
components, and the palette, and win on any conflict.**

## Images
- **Page imagery is local and same-origin**, from `src/assets/images/` via `astro:assets`.
  `src/lib/images.ts` is the resolver: `resolveImage()` matches frontmatter image values **by
  basename**, so placing an image is dropping the file in — no frontmatter, schema or component
  change. `responsiveImg()` adds `srcset`/`sizes` and intrinsic dimensions, rendered as a raw
  `<img>` so scoped styles keep applying. Why the resolver instead of the collection `image()`
  helper: `handover/HANDOVER-images-astro-assets.md`.
- **One image is still remote**: the logotype SVG in `SiteHeader.astro` on an `r2.dev` URL, which
  is dev-grade and rate-limited — move it to a custom domain before heavy production traffic.
- `Placeholder` / `ZSplit` / `Hero` / `Credentials` accept a real image `src`; omit it to keep the
  FPO placeholder. Content alt text ≥ 80 chars, en-AU. Expert headshots are **real photos**
  (grayscale, colour on hover) — never AI-generated.

## Component gotcha — `SiteHeader.astro`
The nav is an HTML string emitted via `set:html`, CSS in an `is:global` block scoped under
`.site-head`, plus a `<script>` controller (megamenus open on **click**; close on outside-click /
Escape / selection). Deliberate: Astro 7's compiler mis-parses dynamic attributes inside mapped
ternary JSX, and scoped styles do not reach `set:html` content. Do not "simplify" it back to inline
JSX. Sticky/layout rules use `header.site-head` so they win regardless of stylesheet order.

**Nav DATA lives in `src/data/nav.ts`, not in the component** (split 4 Aug 2026 —
`skill-reviews/skills/2026-08-04-siteheader-nav-split.md`). **Add a new page's nav entry in
`src/data/nav.ts`; never re-inline it into `SiteHeader.astro`.**

## Astro 7 compiler gotcha — nested template literals
**Never nest a template literal inside a `${...}` interpolation of another template literal** in
`.astro` frontmatter. The Rust compiler mis-scans it and dies with:

```
[CompilerError] Expected `}` but found `:`
    src/components/SiteHeader.astro:23:20
```

**The reported location is a lie** — it points at the first `interface` declaration, which is valid
and nowhere near the fault. Tell-tale signs: the same interface compiles in a minimal file;
deleting the first `interface` moves the error to the second; no BOM, no CRLF, fences correct.

Broken:
```ts
const html = `<ul>${items.map((i) => `<li>${i.label}</li>`).join('')}</ul>`;
```
Fixed — hoist the inner literal:
```ts
const rows = items.map((i) => `<li>${i.label}</li>`).join('');
const html = `<ul>${rows}</ul>`;
```
A *named function* inside `${...}` is fine; it is the literal-inside-a-literal that breaks.

## Build reliability
- **Never build off a cloud-synced folder.** OneDrive/Dropbox truncate large writes (it has
  truncated `package.json`, `SKILL.md` and component files in this project) and mangle
  `node_modules`. Plain local path (`C:\dev\abe-web`) or WSL2. If a write looks truncated, verify
  on-disk bytes and rewrite via a shell heredoc.

## Knowledge base and pipeline conventions
- `kb/register/` is the single owner of every verified regulatory figure. No second copies
  anywhere — repo, skill, or page data.
- `kb/content-source-map.md` is the index — read it before going live to a `.gov.au` page.
- `kb/rules/` holds the authority model, authority/SEO rules and ASQA disclosure framework in
  full. This file carries only short forms.
- Stage artefacts are files: `pipeline/{slug}/01-source-map.md`, `02-gap.md`, and so on.
- **GSC exports live in `business data/GSC/` — note the space; quote the path.** Gitignored and
  deliberately never committed (commercial search data, public repo). Unzip to a scratchpad, never
  into the repo tree, and **read `Filters.csv` first** — site-wide and per-page exports share
  filenames, and reading a page-filtered export as site-wide misstates demand. The site-wide
  export has no per-URL query list (Queries and Pages are uncrossed dimensions), so it cannot
  satisfy the R4 gate — **ask Andrey for a per-page export at Stage 2**, not partway through.
- **Six scripts run automatically around every build**: `prebuild` runs `generate-redirects.mjs`,
  `check-assets.mjs`, `check-freshness.mjs`; `postbuild` runs `check-redirect-targets.mjs`,
  `check-links.mjs`, `check-meta.mjs`. `check-links` always exits 0 and can never redden a build;
  `check-meta` can and will on a contradictory index signal, an off-form canonical or a missing
  title/description. *(studio)* Its length ratchet is off — over-target lengths WARN until cutover. `check-freshness` warns without blocking on register staleness but
  **fails the build, without `--strict`, on an expired live CPD course** (see ROADMAP "Expiry is a
  build-blocker"). **In CI additionally**: `check-claims.mjs --strict`, `check-positions.mjs
  --strict`, and `check-reflow.mjs` with its own browser install. Run by hand: `system-health.mjs`
  before planning work, `review-trends.mjs` after filing a review, `check-claims.mjs` when docs or
  figures change. `SYSTEM.md` §5 names every script; `check-claims.mjs` §7 fails the build if it
  stops doing so.
- Before adding any new record, log or file, read the recording policy in ROADMAP.md. Name the
  decision the record informs; if you cannot, do not add it.

## Ask, don't assume
- Ask when the request forks into materially different outputs, or a needed constraint is missing
  and cannot be inferred. Look in the brief, `pipeline/{slug}/` and `kb/` **first** — re-asking for
  something already on disk is its own failure.
- Where a sensible default will do, proceed and **flag the assumption inline**. Never bury it.
- Closed questions (either/or, pick-from-a-set, confirm-or-correct) use the interactive question
  tool, most likely value offered. Open questions in plain prose. Batch up to three.
- **Subagents cannot ask** — a subagent that hits an unknown stops and reports upward. Never guesses.

## Session types
One session does one kind of work. The type is declared at the start and does not change
mid-session. If the work changes type, end the session and open the right one. This section loads
into every session and every subagent. *(studio)* The type is declared, not policed — the table is
the guide, and only the two walls in Operating mode are enforced.

| Type | Purpose | May write | Must not touch |
|---|---|---|---|
| **build** | Run the pipeline for one page, Stages 1–8, then Stage 9 | `pipeline/{slug}/`, `src/content/**`, `src/data/**`, `skill-reviews/` (Stage 9 only) | `.claude/skills/**`, `kb/**`, `scripts/**`, `src/components/**`, `src/layouts/**`, `src/styles/**`, `src/content.config.ts` |
| **skills** | Act on the demand list — skills, scripts, rules, memory | `.claude/skills/**`, `scripts/**`, `kb/rules/**`, `CLAUDE.md`, `SYSTEM.md`, `ROADMAP.md`, `kb/mistakes-log.md`, `handover/**`, `src/content.config.ts`, `public/**`, `.claude/launch.json`, `src/integrations/guardrails.ts`, `.gitignore`, `PRODUCT.md`, `.impeccable/**`, the five top-level `new site/*.md` plans | `kb/register/**`, `src/styles/**`, `src/components/**`, any live run's artefacts |
| **design** | Component, CSS, layout and styleguide changes | `src/components/**`, `src/layouts/**`, `src/styles/**`, styleguide specimens, `skill-reviews/design/**` (its own review only) | `kb/register/**`, `.claude/skills/**`, `pipeline/**` |
| **facts** | Verify and record regulatory figures | `kb/register/**`, `skill-reviews/facts/**` (its own review only) | everything else |

### Path ownership beyond the table

**The default: an unassigned path belongs to `skills`** — unless it is content (`build`), visual
(`design`), or a verified figure (`facts`). Not a question to litigate per session: assign it in
the session that hit it, add it to the table, move on. The table rows above already fold in every
assignment made to date; the reasoning for each is in the review that filed it (`git log -S` the
path).

**Deliberately unassigned, still:** `worker/`, `wrangler.jsonc`, `astro.config.mjs`, `.github/**`,
`package.json`. Platform and deploy configuration — changing one is its own decision with a human
in it. Say so out loud rather than folding it into a session. **A crossing made on explicit
instruction is disclosed in that session's review and its commit message** — precedents: 29 Jul
(`worker/entry.js` comment), 4 Aug (SiteHeader/nav split), 15 Aug (audit fixes;
`skill-reviews/skills/2026-08-15-full-repo-audit.md`).

Subagents inherit the session type of the session that launched them and cannot widen it.

### Rules
*(studio)* Rules 1, 6, 7, 9 and 10 are relaxed per Operating mode above; 2-5, 8 and 11 stand.

1. **Pre-flight.** Run `node scripts/system-health.mjs` at the start of every session. On FAIL — or
   on a WARN you would want to fix — close the session and open the type that owns the fix. Never
   repair and continue. *(studio: recommended before planning work; CI enforces on every push.)*
2. **Friction is recorded, not fixed.** Inside a run, friction goes on the Stage 9 demand list.
   Outside a run, `kb/mistakes-log.md` (increment "times seen", never duplicate). A build session
   that quietly fixes the process destroys the evidence the run exists to produce.
3. **Second occurrence is the trigger.** One occurrence records a problem; two authorise
   restructuring. Phase 3 candidates in `ROADMAP.md` each carry their own trigger — do not build
   ahead of it.
4. **No figure enters `kb/register/` without a source read in that session.** A figure carried in
   from another session, a prior chat, or a page is not verified. Mark UNVERIFIED rather than carry
   it silently.
5. **Build sessions stop at Stage 8.** Production deploy is human-triggered, always.
6. **Stage 9 is graded by a fresh subagent** given only the pipeline artefacts, built HTML, audit
   output and the review template. Self-grading only with `graded_by: self` and a stated reason.
   *(studio: optional; recommended for pages carrying regulatory claims.)*
7. **Token and design-register changes are exclusive.** A session that edits tokens or the design
   register does nothing else. The locked system (radius 0, flat surfaces, 1px borders, Heritage
   Maroon for actions only) opens when it cannot express what is needed — not when a page would
   look better. *(studio: "exclusive session" becomes "flag the register change in the PR"; the
   opens-when-it-cannot-express test is unchanged.)*
8. **A readability audit measures; it does not authorise.** Findings become demand-list items
   routed to `design`. `.claude/skills/abe-course-page-astro/references/usability-map.md` decides.
9. **Design sessions close with a review** — `skill-reviews/design/YYYY-MM-DD-<topic>.md` before
   merge: what shipped with **measured** before/after values (never ticks), each design-register
   change flagged, demand list tagged. The subdirectory keeps it out of the build-run trend and
   page-coverage scans; demand routing descends into it deliberately. *(studio: optional — a PR
   description with measured values suffices.)*
10. **Skills sessions close with a review too** — `skill-reviews/skills/YYYY-MM-DD-<topic>.md`,
   same terms. A skills session changes the rules every other session runs under, the most
   consequential kind of change in the repo. *(studio: optional on the same terms as rule 9.)*
11. **Facts sessions close with a review as well** — `skill-reviews/facts/YYYY-MM-DD-<topic>.md`,
   same terms, plus two facts-specific duties: **(a) record the reading, not just the figure** —
   the instrument opened, the clause cited, the date, and what was searched for and not found; a
   register diff shows a row flipping and cannot show why. **(b) A reversal names what it
   contradicts** — every place still carrying the old position, because those are skills- and
   build-owned and a facts session may not fix them itself. An unlisted contradiction is one nobody
   is assigned to close.

### Demand-list format
Every item carries a destination: **`[skills]` | `[design]` | `[facts]` | `[build]`** — one per
session type. Anything else is reported UNROUTED by `scripts/demand-split.mjs` rather than dropped.

Two format rules, because the tool reads an item the way a person skims one:
1. **Lead with the file, component or check, in backticks** — the near-miss detector pairs items on
   a shared identifier first; a prose-only item is valid but invisible to the repeat counter.
2. **If it is a repeat, say so inside the first 200 characters** ("SECOND SIGHTING", "third
   filing") — a declaration in the lead is read as a count and promotes the item straight into
   *Trigger met*; the same words further down are surfaced only as a question, deliberately.

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

Strikethrough rather than deletion, so the run's record stays readable — and strikethrough is the
close signal, **never** emphasis or "carried" (one item was struck while its own text said "still
open" and silently left every handover note).

*(studio)* Closing is best-effort and the list is advisory; `TODO`s and PR descriptions are
legitimate homes for follow-ups. The mechanics below describe full discipline, which returns at
cutover.

**Any session MUST close an item its work closes, in the same session as the fix, in whichever
review filed it.** Sessions do not come back; waiting for the filing session means nothing is ever
closed. The cost of not closing is on the record: a stale handover once carried 5 done items of 12,
and a session was ranked onto it ahead of a page-blocking item — **a stale handover does not merely
waste a session, it misdirects prioritisation while looking exactly like good evidence.** Before
writing your review, grep `skill-reviews/` for items your work just answered;
`node scripts/demand-split.mjs --stale` helps but is a weak prompt, not a filter. A line that looks
like an item but parses as neither is **reported**, not dropped (`--strict` exits 1) — "fixed" and
"malformed" must never be the same event to a tool whose output decides what gets built.

**Two different things are called handover notes. Do not confuse them.**
- **`reports/handover-{skills,design,facts}.md`** — the *derived* view, written by
  `node scripts/demand-split.mjs --write`. Regenerate, never edit, never treat as a source.
  Gitignored and absent until generated — correct, per the recording policy.
- **`handover/HANDOVER-*.md`** — *hand-written* session notes, in git, a legitimate source for
  what was attempted and ruled out. **Every file there either carries a `## Status:` line or states
  why it does not** (a standing runbook has nothing to close). Close one when its work lands —
  date and SHAs, or what remains. Read first: whichever carries `## Status: OPEN`. When judging
  one, open the file — an absent header cannot tell you whether closure was forgotten or withheld.

## Human gates
- **Production deploys are human-triggered, always.** No agent, hook or workflow deploys to
  production without an explicit go in that session.
- Stage checkpoints stand: show the stage output and get a go-ahead before starting the next.
- The improvement pass proposes diffs only. It must never edit `src/integrations/guardrails.ts`,
  this file's Human gates section, or any Claude Code hook. No Claude Code hooks exist today; the
  clause binds the day one is added. (`package.json`'s `prepare: husky` is a *git* hook chain —
  platform config, not a Claude Code hook.)
- Legal pages (`terms`, `privacy`, `refund`, `contact`) are placed, never drafted or reworded.

## Git workflow
- Trunk-based on `main`; Conventional Commits (`feat:`/`fix:`/`chore:`/`content:`).
- Do not push unless asked. Use `/ship` (validate + show diff + wait for "ship it"). A push to
  `main` deploys.
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
