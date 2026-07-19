# ABE Website Migration — Implementation Plan (execution runbook)

**Prepared:** 16 July 2026
**Companions:** `abe-website-migration-plan-v2.md` (strategy and decisions), `wave0-closeout-spec.md` (Wave 0 detail), `redirect-map-v1.csv` (the redirect source of truth), `abe-migration-plan-v2-risk-audit.md` (the 11 Google-verified findings, referenced below as R1–R11).
**This document:** the followable, ticket-by-ticket runbook. Work top to bottom. Each ticket has an owner, dependencies, steps, and a definition of done (DoD). Australian English; the banned word is not used.
**Amended 16 Jul** — all 11 risk-audit findings applied: no-slash canonicals (W0-5), staging de-index (W0-10), query-coverage parity (Recipe A step 2b), and the Wave 6 gates for crawlability, full-inventory redirect verification, analytics parity and learn.* indexation.

---

## 0. How to use this plan

**Where the work happens.** All build work runs in a Claude Code session opened in `C:\dev\abe-web`. Content research and audits can run in this Cowork project. The runbook says which for each ticket.

**Branch and deploy flow (per ticket).**
1. `git switch -c <branch>` off `main` (branch names below, e.g. `content/nsw-owner-builder`).
2. Do the work; commit with Conventional Commits (`feat:` / `fix:` / `content:` / `chore:`).
3. Push the branch. Workers Builds gives the branch a **preview URL** on its PR. Run audits against that URL.
4. When the DoD is met, use `/ship` to merge to `main`. A push to `main` auto-deploys to `abe-edu-web.andrey-p-personal.workers.dev`. This is the staging site until Wave 6, so merging to `main` is safe and pre-cutover; the real domain is not touched until cutover.

**Owner legend.** `[CC]` = Claude Code session in the repo. `[COW]` = Cowork research/audit session. `[AP]` = Andrey (a decision, an access grant, or an external action). Most tickets are `[CC]` with a `[COW]` research input.

**The three build recipes.** Most tickets are "build a page". Rather than repeat the steps, three recipes are defined once in section 1 and referenced by every page ticket as *Recipe A/B/C*.

**Universal DoD (applies to every page ticket, on top of its own DoD).**
- Green `npm run build` (Zod schemas pass; no frontmatter drift).
- Exactly one `<h1>`; question-led sentence-case H2s; 40 to 60 word answer capsule opening each section except FAQ.
- Single JSON-LD `@graph` via `SeoGraph`, correct authority model, `Course.offers.price` equals the on-page price.
- Every government fact carries a dated, linked source in the page-foot Sources block (fact ledger closed).
- Em-dash / banned-word lint clean; `abe-readability-audit` pass; `final-check` clean where human-authored.
- Lighthouse CI green (Performance 100, budgets per Wave 0 §4).
- Named-reviewer E-E-A-T present (Dominic Ogburn developer, Warwick Smith reviewer), with a dated last-reviewed line.

**Progress tracker** is section 8. Tick tickets there as they close.

---

## 1. The three build recipes

### Recipe A — course / spoke page
For every owner-builder, White Card and CPD course page. Output: one `content/courses/{slug}.mdx`.

1. **[COW] Fact ledger.** Open a per-page ledger. Verify against `.gov.au` (or the internal verified register) with dates: regulator, legislation, permit/approval thresholds, fees, eligibility. Confirm internal facts against LearnWorlds/Notion (price, pass mark, attempts, modules, hours, reviewer) — never inferred from a sibling state. No figure is written without a source the moment it is written (mistakes-log M4).
2. **[COW] Keyword grounding.** GSC-first (the export in `Data/GSC/`), then Ubersuggest for the gap. Record primary + secondary keywords for the page.
2b. **[COW] Query-coverage parity gate (category A/B rebuilds only — R4).** From the GSC export, list every query that the *legacy* URL for this page won with clicks > 0. Each must be explicitly covered in the new page — a heading, an answer capsule, or body copy — and the title's search intent stays continuous with the old page. A full content rewrite can rank better, but this gate stops it silently dropping a query the old copy happened to answer. Record the checklist in the fact ledger and confirm at ship.
3. **[CC] Author** via the `abe-course-page-astro` skill (or the `abe-research-to-webpage` conductor), Stage-6 output target `content/courses/{slug}.mdx`. Set `authorityModel` in frontmatter; `partnerRto` if ASQA. Reuse existing components; any new component ships with a `/styleguide/` specimen in the same commit.
4. **[CC] In-force check** (mistakes-log M1): verify any standard/NCC edition against the in-force edition for that jurisdiction on the day; treat "newer taught as current" and "superseded taught as current" as equal blockers.
5. **[CC/COW] Audits:** `abe-seo-content-engine` pre-production check → `abe-readability-audit` → `final-check` / `ai-detector`. Apply fixes.
6. **[CC] Ship** when the universal DoD is green. Register the page's primary/secondary keywords for rank tracking (skill Step 7.5).

### Recipe B — hub page
For owner-builder, White Card and CPD hubs. Output: one `content/hubs/{slug}.mdx` on `HubLayout`.

1. **[COW]** Hub-level intro answer capsule + one card per spoke (name, price, key benefit). This must be genuinely hub-level content, not a state page in disguise (cannibalisation gate).
2. **[CC]** Build on `HubLayout`; `ItemList` + `BreadcrumbList` schema; card grid + `ComparisonTable` where states are compared. Links **down** to spokes only; no sideways links between competing spokes.
3. **[CC]** Confirm every downlink resolves (spokes must already exist — see dependencies).
4. Audits + ship per universal DoD.

### Recipe C — support / prose page
For About, Contact, FAQ, Help, Legal, SAA, catalogue. Output: `content/pages/{slug}.mdx` (or the route the repo uses for standalone pages).

1. **[COW]** Copy; authority-checked trust language; no per-page regulatory facts beyond links.
2. **[CC]** Build with prose/`Section` components; page-appropriate schema (`Organization`, `ContactPoint`, `FAQPage`, or breadcrumb-only for legal). "Last updated" freshness signal, crawlable, on every page.
3. Audits + ship. (Lighthouse + lint apply; readability audit optional for thin legal pages.)

---

## 2. Wave 0 — platform close-out

> **STATUS (19 Jul 2026): COMPLETE except W0-9.** W0-1..W0-8 + W0-10 merged to `main` and live on the preview Worker (W0-10's staging noindex shipped inside the W0-5 branch as `worker/entry.js`). Authoritative record: the repo's `HANDOVER.md` (refreshed 18 Jul) and `WAVE0-COMPLETE.md`. Residuals noted there: `HubLayout` not yet wired to a route (Wave 1 work); `cpd`/`asqa-accredited` branches unproven on real content; `/payment` query-string survival verified ABE-side only (LearnWorlds' own re-application of `product_id` unconfirmed). **The W0-6 Action was watched on a real GitHub PR** (not just simulated locally): a clean PR passed both Lighthouse CI and the prose lint in 2m35s, and a deliberately-regressed test PR correctly failed the prose lint (Lighthouse still passed, since nothing perf-related was regressed) — then closed without merging. Also surfaced and fixed along the way: 4 of the 8 tickets initially merged into the wrong intermediate branch instead of `main` (GitHub's stacked-PR auto-retarget stopped working partway through the chain, reporting "MERGED" regardless) — caught and corrected with one follow-up PR before deploy.

Detail in `wave0-closeout-spec.md`. Tickets:

| ID | Owner | Title | Depends on | Definition of done (DoD) |
|---|---|---|---|---|
| W0-1 | [CC] | Add `authorityModel` discriminator to `courses` Zod schema; branch `CourseLayout` on it (ASQA credential language + `PartnerDisclosure` + footer disclosure). Add `authorityModel` to QLD + WA frontmatter. | — | Build green; QLD + WA rendered-HTML + JSON-LD parity-diffed against current live pages before merge. |
| W0-2 | [CC] | CPD course template: `cpd` frontmatter block + `CourseLayout` branch rendering `CpdMatrix` + `BundleOffer` + points-by-licence `FactGrid`. | W0-1 | Build green; a throwaway sample CPD MDX renders; reverted or kept behind no nav link. |
| W0-3 | [CC] | `HubLayout` + new `ComparisonTable` component (+ `/styleguide/` specimen); `hubs` content collection + Zod schema. | — | Build green; specimen visible at `/styleguide/`; sample hub renders. |
| W0-4 | [CC] | Global footer (three-line publisher/provider/enrolment block + ASQA disclosure + link columns) with specimen; finalise nav IA (4 dropdowns, no NSW RE CPD). | W0-3 | Footer + nav live on preview; SiteHeader `set:html` pattern preserved (no refactor). |
| W0-5 | [CC] | Set `astro.config.mjs` `site` to `https://www.abeeducation.edu.au`; set **`trailingSlash: 'never'`** + Worker **`html_handling: "drop-trailing-slash"`**; document the **no-slash** canonical form in CLAUDE.md (R2). | — | Canonicals/OG/sitemap emit production, slash-less URLs; `/slug` serves 200 unchanged. |
| W0-6 | [CC] | Lighthouse CI GitHub Action (Perf=100 + budgets) + em-dash/banned-word lint job on PRs. | W0-5 | A deliberately-regressed PR fails; a clean PR passes. |
| W0-7 | [CC] | Redirect spike: generate `public/_redirects` from ~12 sample rows of `redirect-map-v1.csv`; verify single-hop 301s + 404 fall-through + a no-slash equity URL served 200 unchanged, on the preview Worker. | W0-5 | `curl -sI` loop shows one hop each; `/payment` query-param behaviour to learn.* recorded. |
| W0-8 | [CC] | Refresh `HANDOVER.md` (component list vs `/styleguide/`; QLD fee $493.59; styleguide-specimen convention; concurrency rule). | — | Doc matches reality. |
| W0-10 | [CC] | **Staging de-index (R3):** serve `X-Robots-Tag: noindex` on the `workers.dev` host only (hostname-scoped Worker rule; `_headers` can't vary by host); check current indexation (`site:abe-edu-web…workers.dev`). | — | workers.dev returns `noindex`; indexation status recorded; cutover note added to remove it + set `workers_dev: false`. |
| W0-9 | [AP] | **IA half SIGNED OFF 19 Jul 2026:** build `/cpd-building` only (NSW + TAS), plus the three state hubs `/cpd-nsw`, `/cpd-tas`, `/cpd-wa`. The 1-course plumbing/electrical/real-estate trade hubs are **not built**; those queries land directly on their course pages. Verified redirect-map-safe: every trade-related row already targets a course page (`/cpd-building-nsw`, `/cpd-electrical-tas`, `/cpd-plumbing-tas`, `/cpd-real-estate-wa`, `/cpd-building-tas`), never a trade hub, so no redirect target is invalidated. **STILL OPEN:** the 2 redirect CONFIRM flags (TAS architects, TAS building-designers CPD), both defaulting to retire. | — | IA decision recorded ✅; `redirect-map-v1.csv` → `redirects.csv` still blocked on the 2 flags. |

**Wave 0 exit gate:** W0-1..W0-8 and W0-10 green; W0-9 decided. Templates, chrome, CI gate, redirect mechanism and staging de-index all proven on the preview.

---

## 3. Wave 1 — trust infrastructure + redirect map sign-off

Blocks all course pages (E-E-A-T gate needs live `/experts/{name}` + `/accreditation`).

| ID | Owner | Title | Recipe | Depends on | Notes / DoD |
|---|---|---|---|---|---|
| W1-1 | [COW] | Pull expert data from the Notion Experts database (Dominic Ogburn, Warwick Smith): bio (4 lengths), role, org, headshot URL, LinkedIn, specialist areas, verified credentials, last-verified date. | — | — | Use only "All Verified" credentials; apply each expert's "What NOT to Claim" list; if Notion is down, use the bundled snapshot and state provenance. |
| W1-2 | [CC] | Expert profile template (`ProfilePage` + `Person` schema) + `/experts/dominic-ogburn`, `/experts/warwick-smith`. Real photos (grayscale-hover, never AI). | — | W1-1 | Empty headshot URL flagged as a missing resource; `sameAs` LinkedIn + `hasCredential` cross-checked. |
| W1-3 | [CC] | `/experts` hub. | B | W1-2 | `ItemList` over the profiles. |
| W1-4 | [COW]+[CC] | `/accreditation`: crawlable links to training.gov.au (Blue Dog 31193, Upskill 45708, AlertForce 91826), ASQA, CBOS, Access Canberra; `EducationalOrganization` schema; states plainly ABE is not an RTO and names each partner. | C | W0-4 | The cross-link target for every course page's "verify our accreditation". |
| W1-5 | [CC] | `/reviews`: display the Google Business Profile score (4.8/5, 52 reviews) with a link; quote snippets with attribution. **No `AggregateRating` schema.** | C | — | Hard rule: no third-party-sourced rating markup anywhere on the site. |
| W1-6 | [AP]+[COW] | Finalise `redirects.csv` from `redirect-map-v1.csv` (post W0-9). | — | W0-9 | Signed-off map; becomes the generator input for `public/_redirects`. |

**Wave 1 exit gate:** live reviewer profiles + accreditation on preview; redirect map signed off.

---

## 4. Wave 2 — Owner Builder vertical (equity core)

Sequenced first because it carries roughly two-thirds of current search clicks.

| ID | Owner | Title | Recipe | Depends on | Notes |
|---|---|---|---|---|---|
| W2-1 | [CC] | Confirm QLD + WA exemplars pass the current build + re-verify their fees at build time (QLD QBCC $493.59; WA to 1 Jul 2027). | — | W0-1 | Frozen for content/design; still gated by build + fee re-check. |
| W2-2 | [CC] | **TAS OB:** port the pipeline `TAS Owner Builder` content to `content/courses/tas-owner-builder-course.mdx`; re-verify CBOS facts. | A | W1-2, W1-4 | State-approved-direct (CBOS). Port, not fresh research; still runs audits. |
| W2-3 | [CC] | **NSW OB:** full build. RTO-partnered (Upskill 45708) — first ASQA use of the W0-1 layout. | A | W0-1, W1-2, W1-4 | Consolidates the two live URLs: `/owner-builder-nsw-course` + `/nsw-owner-builder-course` → `/nsw-owner-builder-course` (301s in the map). |
| W2-4 | [CC] | **ACT OB:** full build. State-approved-direct (Access Canberra), `recognizedBy` the regulator. | A | W1-2, W1-4 | |
| W2-5 | [CC] | **OB hub** `/owner-builder-courses` (59.9k impr — biggest single equity-protect page). | B | W2-1..W2-4 | All five spokes must resolve first. Links to Project Advisory + Insurance too. |
| W2-6 | [CC] | Insurance: `/insurances` hub + `/owner-builder-insurance` + `/professional-indemnity-insurance`. | B + C | W0-3 | `Service` schema on the service pages; reuse `InsurancePartner`. |
| W2-7 | [CC] | Project Advisory Pack page. | C | — | Satisfies the OB cross-links; light `Service`/`Product` schema. |

**Wave 2 exit gate:** five OB spokes live, hub live with resolving downlinks, insurance/advisory live. Hub-build pattern proven.

---

## 5. Wave 3 — White Card vertical

Heaviest compliance load; all five pages ASQA. Build **WA first** (36.7k impressions, position ~9 — the biggest near-term win).

| ID | Owner | Title | Recipe | Depends on | Notes |
|---|---|---|---|---|---|
| W3-1 | [CC] | **White Card WA** `/white-card-wa`. Blue Dog 31193; unit `CPCWHS1001` (single C). | A | W0-1 | 301 from `/white-card-wa-online`. Delivery mode per state is a hard accuracy point. |
| W3-2 | [CC] | **White Card NSW** `/white-card-nsw`. Upskill 45708. Trainer-led, never self-paced online. | A | W0-1 | Regulator: SafeWork NSW. |
| W3-3 | [CC] | **White Card QLD** `/white-card-qld`. Blue Dog 31193; `CPCCWHS1001`. | A | W0-1 | Regulator: WHSQ. |
| W3-4 | [CC] | **White Card TAS** `/white-card-tas`. Blue Dog 31193. | A | W0-1 | 301 from `/tas-online-white-card`. Regulator: WorkSafe Tasmania. |
| W3-5 | [CC] | **White Card ACT** `/white-card-act`. AlertForce 91826. | A | W0-1 | Regulator: WorkSafe ACT. |
| W3-6 | [CC] | **White Card hub** `/white-card` (10.8k impr already on the slug). | B | W3-1..W3-5 | Five state cards + `ItemList`; cross-links to `/faq`, `/accreditation`, `/experts`. |

**Wave 3 exit gate:** five spokes + hub live; ASQA / `PartnerDisclosure` hardened.

---

## 6. Wave 4 — CPD vertical + bundles

Most structurally complex; smallest after the matrix corrections (NSW RE CPD, asbestos/silica all out).

| ID | Owner | Title | Recipe | Depends on | Notes |
|---|---|---|---|---|---|
| W4-1 | [CC] | **CPD Building NSW** `/cpd-building-nsw`. | A | W0-2 | 301 from `/nsw-building-cpd-courses`. Carries `BundleOffer` upsell. |
| W4-2 | [CC] | **CPD Building TAS** `/cpd-building-tas`. CBOS context. | A | W0-2 | 301 from `/tas-builder-practitioners-cpd`. |
| W4-3 | [CC] | **CPD Plumbing TAS** `/cpd-plumbing-tas`. CBOS. | A | W0-2 | 301s from `/tas-cpd-plumber-courses`, `/tas-plumber-practitioner-cpd`. |
| W4-4 | [CC] | **CPD Electrical TAS** `/cpd-electrical-tas`. CBOS; verify in-force wiring-rules edition (mistakes-log M1). | A | W0-2 | 301s from `/tas-cpd-electrician-courses`, `/tas-electrical-practitioners-cpd`. |
| W4-5 | [CC] | **CPD Real Estate WA** `/cpd-real-estate-wa`. | A | W0-2 | 301 from `/wa-real-estatecpd`. |
| W4-6 | [CC] | Trade hub `/cpd-building` (NSW + TAS). Skip 1-course trade hubs per W0-9. | B | W4-1, W4-2 | |
| W4-7 | [CC] | State hubs `/cpd-nsw`, `/cpd-tas`, `/cpd-wa`. | B | W4-1..W4-5 | 301s from `/tas-cpd-index`, `/tas-cpd-courses`, `/nsw-building-industry`, `/nsw-real-estate-cpd`, and the retired NSW RE CPD set (all → `/cpd-nsw`). |
| W4-8 | [CC] | Refresh the existing repo CPD hub page to the `HubLayout` (`/cpd`). | B | W0-3 | Replaces the standalone `pages/cpd.astro`. |
| W4-9 | [COW] | Confirm the live bundle set (which state × trade × points bundles are sold now). | — | — | [AP] input; drives W4-10 count. |
| W4-10 | [CC] | Bundle pages + bundle hubs: `/cpd-bundles`, `/cpd-bundles-tas` (+ any per W4-9). `Product` + `ItemList` schema; honest savings figure; child-course links resolve. | B + A | W4-1..W4-5, W4-9 | `AggregateRating` **only** if genuine native bundle reviews exist — currently none, so omit. |

**Wave 4 exit gate:** CPD courses, hubs and bundles live; multi-parent breadcrumbs + bundle schema validated.

---

## 7. Wave 5 — support, homepage, content-hub scaffold

| ID | Owner | Title | Recipe | Depends on | Notes |
|---|---|---|---|---|---|
| W5-1 | [CC] | Homepage (final): replace the `/` → QLD redirect with the real homepage. Featured pathways into the four verticals + trust pages. | C | Waves 2-4 | All featured links resolve; `Organization` schema. |
| W5-2 | [CC] | Course catalogue `/courses`. | C | Waves 2-4 | Routing index; `ItemList`. |
| W5-3 | [CC] | `/about` (consolidate `/about-us`); `Organization` schema; "Last updated" freshness; no expert attribution. | C | — | 301 from `/about-us`. |
| W5-4 | [CC] | `/contact` (`ContactPoint`), `/faq` (`FAQPage`, 3,000-4,000 words, decision-critical facts never in accordions), Help. | C | Waves 2-4 | FAQ pulls across hubs/courses without duplicating course Q&A verbatim (cannibalisation gate). |
| W5-5 | [CC] | Legal: `/terms`, `/privacy`, `/cookies`, `/cancellation-and-refund-policy`. Thin; breadcrumb-only schema. | C | — | |
| W5-6 | [CC] | `/saaustralia` rebuilt as a Solar Association Australia partner page. | C | — | Stays (decision 16 Jul). |
| W5-7 | [CC] | Content-hub scaffold: `guides` collection + Zod schema + article template (`Article` JSON-LD, named expert author) + `/guides` index + RSS. **No articles required for launch.** | — | W1-2 | First-topic shortlist from GSC opportunity queries; publishing starts post-cutover. |

**Wave 5 exit gate:** every page type live on preview; content engine in place.

---

## 8. Wave 6 — pre-launch gates, cutover, watch

### 8.1 Pre-launch gates (all block go-live) — `[CC]`/`[COW]`
- [ ] Site-wide `abe-seo-content-engine` pre-production audit + `abe-readability-audit` + `final-check` across the finished site.
- [ ] Design polish pass against `DESIGN.md` (rhythm, spacing, hierarchy, states, responsive).
- [ ] Every fee re-verified within its cadence.
- [ ] `redirects.csv` fully implemented as `public/_redirects`. **Full-inventory verification (R7):** a script checks every one of the ~370 live URLs (321 LW export + 298 GSC, de-duplicated) returns 200 (category A, no-slash, unchanged) or a single-hop 301 to its exact mapped target. Output saved as the cutover evidence file. Blocking — not a spot-check.
- [ ] Internal link map holds (up/down, never sideways); no dead downlinks; all internal links slash-less (R2).
- [ ] Sitemap regenerates on the production `site`. **The marketing host does NOT robots-block `/course/`, `/program/`, `/bundle/`** — they must stay crawlable so Google follows the 301s to learn.* (R1). Crawl control for those lives on the learn.* host.
- [ ] **Analytics parity (R11):** Zaraz + GA4 + Google Ads conversions validated on staging, so no measurement gap at the swap.
- [ ] **learn.\* indexation strategy decided (R6):** indexable-vs-noindex chosen using LearnWorlds' subdomain canonical/noindex control; GSC confirmed as a **domain property** (covers www + learn.*).
- [ ] **Staging de-index confirmed (R3):** workers.dev was `noindex` during the build and is not indexed; plan set to remove the migration-only noindex + `workers_dev: false` at cutover.
- [ ] Expert portraits + logo moved off `r2.dev` (last Phase D remnant).
- [ ] Lighthouse CI 100 on every template.

### 8.2 Cutover runbook (in order) — `[AP]` with `[CC]` support
1. **[AP]** Raise + resolve the LearnWorlds ticket: move the school to `learn.abeeducation.edu.au`; confirm logins + checkout links behave there; ask what canonical/noindex control the platform offers on a subdomain and decide learn.* indexation before the move (R6). *(This is the one external blocker; start it early.)*
2. **[AP/CC]** Attach `abeeducation.edu.au` (apex + `www`) to the `abe-edu-web` Worker; verify TLS; confirm the site serves on the real host.
3. **[AP]** Point LearnWorlds at `learn.*`; keep it serving course delivery + checkout.
4. **[CC]** `public/_redirects` live: every legacy URL one hop; apex→www + http→https as zone rules. The marketing-host robots.txt does **not** disallow `/course/`, `/program/`, `/bundle/` (R1).
5. **[AP]** Drop DNS TTL to 300 ahead of the switch. **Do not touch MX / SPF / DKIM.**
6. **[AP]** Switch DNS; **[CC]** monitor errors + confirm 301s resolve in one hop. Remove the migration-only `noindex` from the production host and set `workers_dev: false` (R3).
7. **[CC/AP]** Submit sitemap in GSC. **No change-of-address** (canonical host unchanged — platform swap, not a domain move). Confirm the GSC property is a **domain property** so it covers www + learn.* (R6); optionally submit a temporary sitemap of the old URLs for a few weeks to speed redirect discovery, then remove it (R8). Confirm GA4 (via Zaraz/server-side) collects on the new pages.
8. **[AP]** Keep the DNS rollback path available for the whole window.

### 8.3 Post-launch watch (4 weeks) — `[COW]`
- [ ] GSC coverage + 404s daily in week 1.
- [ ] CrUX field data at day 28 vs the all-green Core Web Vitals target.
- [ ] Rank tracking on the registered keyword set; watch the NSW OB consolidation query set.
- [ ] Ranking fluctuation watched over the ~4-week settling window Google describes (no fixed % target); watch for soft-404 spikes on the retire set (expected — R5).
- [ ] Then: start the `/guides` publishing cadence; add native review collection to the backlog (to earn `AggregateRating` back).

---

## 9. Progress tracker

Tick as each ticket closes. `[AP]` rows are the ones that need you.

**Wave 0** — ☑ W0-1 ☑ W0-2 ☑ W0-3 ☑ W0-4 ☑ W0-5 ☑ W0-6 ☑ W0-7 ☑ W0-8 ☑ W0-10 ◐ **W0-9 [AP]** *(IA signed off 19 Jul; 2 redirect CONFIRM flags still open)*
**Wave 1** — ☑ W1-1 ☑ W1-2 ☑ W1-3 ☑ W1-4 ☑ W1-5 ☐ **W1-6 [AP]** *(W1-1..W1-5 shipped 19 Jul on `feat/experts-collection`; W1-6 blocked on the 2 W0-9 flags)*
**Wave 2** — ☐ W2-1 ☐ W2-2 ☐ W2-3 ☐ W2-4 ☐ W2-5 ☐ W2-6 ☐ W2-7
**Wave 3** — ☐ W3-1 ☐ W3-2 ☐ W3-3 ☐ W3-4 ☐ W3-5 ☐ W3-6
**Wave 4** — ☐ W4-1 ☐ W4-2 ☐ W4-3 ☐ W4-4 ☐ W4-5 ☐ W4-6 ☐ W4-7 ☐ W4-8 ☐ **W4-9 [AP]** ☐ W4-10
**Wave 5** — ☐ W5-1 ☐ W5-2 ☐ W5-3 ☐ W5-4 ☐ W5-5 ☐ W5-6 ☐ W5-7
**Wave 6** — ☐ pre-launch gates ☐ **cutover [AP]** ☐ post-launch watch

## 10. Critical path and your action items

**Critical path:** W0 templates → W1 trust pages → W2 OB spokes → W2-5 OB hub · (W3, W4 run after their template + trust deps) · W5 homepage after the verticals · W6 cutover after every page + the LearnWorlds move.

**What only you can do, in the order it bites:**
1. **Now:** W0-9 (thin-hub IA sign-off + 2 redirect CONFIRM flags); raise the **LearnWorlds `learn.` subdomain ticket** (longest lead time, gates cutover).
2. **Before Wave 4:** W4-9 (which bundles are sold now).
3. **Before Wave 6:** final yes/no on chat + Meta pixel; optional workbook/GA4 for revenue-ranked build order.
4. **At cutover:** the DNS/Worker steps in 8.2 (self-serve — zone is already on Cloudflare).

**What I can start immediately without you:** Wave 1 expert + accreditation research (W1-1, W1-4 content) here in Cowork, and the Wave 0 tickets in a Claude Code session on the repo.
