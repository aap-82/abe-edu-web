# ABE Education Website Migration — Plan v2

**Prepared:** 16 July 2026
**Supersedes:** the 16 July draft ("plan v1") and folds in the repo's `abe-rebuild-plan.md` (10 Jul 2026), which remains the architecture and cutover authority.
**Evidence base:** `C:\dev\abe-web` repo docs (CLAUDE.md, HANDOVER.md, abe-rebuild-plan.md, PRODUCT.md, wrangler.jsonc), LearnWorlds page export of 16 Jul (321 pages), Google Search Console 16-month export (298 URLs, 1,003 queries), live-site PageSpeed audit run 16 Jul, project memory and mistakes log. Reconciled 16 Jul against `abe-rebuild-plan-review.md` (the 8–9 Jul decision record): no conflicts; the original plan already contemplated a guides/blog section, which §0's content-hub decision formalises.

Australian English throughout. The banned word is not used.

**Amended 16 Jul** per the risk audit (`abe-migration-plan-v2-risk-audit.md`): all 11 findings applied. Notable reversals from the earlier draft — canonical form flipped to **no trailing slash** (§4, keeps the equity core URL-identical), the `/course/` robots block dropped at cutover (§5), and the invented "10–30% dip" figure replaced with Google's own framing (§2, §8).

---

## 0. Decisions locked today

1. **Cutover model: full rebuild, one swap.** Every public marketing page is rebuilt or explicitly retired before the domain flips. One SEO move, no double redirects. The new site lives on `abe-edu-web.andrey-p-personal.workers.dev` until then.
2. **Content hub: designed in now, published after launch.** Routes, collection schema and article template ship with the migration; the publishing cadence starts post-cutover.
3. **Legacy pages: case-by-case.** All 44 public marketing pages get an explicit keep / rebuild / retire line in the redirect map. Nothing is silently dropped.
4. **SA and VIC: no products.** `/saaustralia` is the **Solar Association Australia** partner page (not South Australia); its keep/retire call is made at redirect-map sign-off. `/vic-building-industry` is legacy, 301 to the nearest hub.
5. **Architecture is settled and not revisited** (from the repo plan): Astro 7, static output, assets-only Worker, token CSS in `global.css` (not Tailwind), MDX + Content Collections with Zod-typed frontmatter, Workers Builds auto-deploy from `main`, Node 22, npm.
6. **Assumption (flagged):** `www` stays the canonical host — all current equity sits on `www.abeeducation.edu.au`, so the cutover is a platform swap on the same host, not a domain move. Apex 301s to www. Correct this if you want apex-canonical.

---

## 1. What changed since plan v1 — corrections from evidence

Plan v1 was written from the skill template's known state. The real build is further along, and different, in ways that matter:

- **The platform already exists.** Repo at `C:\dev\abe-web`, GitHub `aap-82/abe-edu-web`, Workers Builds verified (push to `main` auto-deploys), QLD + WA owner-builder pages live, a CPD hub page, 25 components including `PartnerDisclosure` and `CpdMatrix`, Content Collections shipped with rendered-HTML parity verified. Most of v1's Wave 0 is done.
- **v1's platform assumptions partly don't match the repo.** There is no `abe-tokens.css` and no `abe-guardrails` Astro integration. The canonical design source is `DESIGN.md` + `src/styles/global.css`, and the quality gates are the Zod schemas (build fails on frontmatter drift), the `/ship` command, secretlint, and the skill audits (`abe-seo-content-engine` pre-production check, `abe-readability-audit`, `final-check`). Plan v2 is written against those gates. A **live `/styleguide/` route does exist** (confirmed 16 Jul) and documents ~27 components plus the full token set — v1's "every new component ships with a styleguide specimen" discipline is therefore kept as a `/ship` checklist rule, even though nothing enforces it in the build.
- **The frozen exemplars are QLD + WA, not QLD/WA/TAS.** TAS owner-builder content exists in the pipeline folder but has not been ported to repo MDX. That is a Wave 2 task, not a done item.
- **The live site is fully mapped now.** LearnWorlds at `www.abeeducation.edu.au`: 321 pages — 44 public marketing pages, 175 course-player pages, 54 program/bundle pages, the rest system pages. The reconciliation v1 deferred is done and is baked into the inventory below.
- **Equity is measured, not guessed.** 16 months of GSC: 4,642 clicks, 379k impressions across 298 URLs. Owner Builder (five state pages + hub + home) carries roughly two-thirds of all clicks. White Card WA is the single biggest impression pool (36.7k) with weak position (10.4) — the clearest growth target on the site.
- **NSW owner builder is split across two live URLs** — `/owner-builder-nsw-course` (324 clicks, pos 9.7) and `/nsw-owner-builder-course` (151 clicks, pos 16.3). The rebuild consolidates both onto one URL with 301s: a live cannibalisation problem v1 could not see.
- **Matrix corrections confirmed (16 Jul).** NSW Real Estate CPD is **not** a current product — its live page set (agent classes 1–2, strata manager 1–2, stock & station 1–2) is retired with 301s despite residual equity. White Card is confirmed for **all five states** (NSW, QLD, WA, TAS, ACT). Asbestos/silica are **not** current products — no marketing pages are built; the legacy `/course/` URLs simply follow the learn.* redirect rule. The SAA (Solar Association Australia) partner page **stays**.
- **The current site's performance is the case for the migration.** Live PageSpeed (16 Jul): mobile lab LCP **10.3 s**, TTI **22 s**, TBT 937 ms; desktop TBT 2.8 s; ~740 KB unused JavaScript. Field data: FCP/LCP "average", CLS good. A static Astro site clears this by an order of magnitude — the only real threat to a 100 score is third-party scripts, which is why they get their own gate (§6).

---

## 2. Goals and how each is measured

**Goal 1 — Core Web Vitals.** Two distinct targets, and it matters which one is the SEO metric. Google is explicit that "trying to get a perfect score just for SEO reasons may not be the best use of your time", and that Search "always seeks to show the most relevant content, even if the page experience is sub-par". So:
- *Lab (engineering budget, not the SEO goal):* Lighthouse Performance 100 on every template, enforced in CI on preview deploys. It is close to free on static Astro so we hold it — but no content-quality hour is traded for perf once a page is green.
- *Field (the actual SEO metric):* all-green Core Web Vitals at p75 in CrUX/GSC within one collection cycle (~28 days) of cutover. Field data follows real devices and cannot be "built" directly; the budgets in §6 are how we make it near-certain.

**Goal 2 — SEO: protect, then grow.**
- *Protect:* zero orphaned legacy URLs at cutover; single-hop 301s; and because the no-slash canonical (§4) keeps the equity core URL-identical, most of that equity never takes a redirect at all. Google's own framing for the settling period is that "a small to medium-sized website can take a few weeks for most pages to move" — recovery is watched over a ~4-week window, not judged against a fixed percentage drop.
- *Grow:* position targets from the GSC evidence — owner-builder state queries from positions 3–7 to 1–3; `white card wa` (4.5k impressions, pos 10.7) into the top 3; `owner builder course online` (2.1k impressions, pos 11) captured by the hub. Rank tracking registered per page at publish (skill Step 7.5), AI Overview capture measured in GSC's generative-AI reports.

**Goal 3 — a structure that produces content.** After migration, a new page of any type is one MDX file against a typed schema: no layout work, no schema hand-rolling. The content hub (§7) gives the growth engine a home, and every template carries the authority model, sourced-facts block and E-E-A-T furniture by default, so speed never trades against compliance.

---

## 3. Evidence snapshot

**Where today's equity lives (GSC, 16 months, top of 298 URLs):**

| Live URL | Clicks | Impressions | Position |
|---|---|---|---|
| /wa-owner-builder-course | 878 | 34,738 | 10.4 |
| /owner-builder-courses (hub) | 598 | 59,933 | 8.2 |
| /tas-owner-builder-course | 387 | 14,062 | 12.2 |
| / (home) | 382 | 15,869 | 8.8 |
| /qld-owner-builder-course | 356 | 28,077 | 9.9 |
| /act-owner-builder-course | 344 | 16,244 | 16.3 |
| /owner-builder-nsw-course + /nsw-owner-builder-course | 475 | 37,396 | 9.7 / 16.3 |
| /nsw-building-cpd-courses | 140 | 17,446 | 11.3 |
| /white-card-wa-online | 119 | 36,755 | 9.0 |
| /wa-real-estatecpd | 92 | 5,911 | 15.9 |
| TAS CPD set (index, electrician, plumber, courses…) | ~250 | ~20,000 | 12–25 |
| /white-card (generic) | 38 | 10,810 | 20.0 |

**Live-site CWV baseline (16 Jul):** mobile lab LCP 10.3 s / TTI 22.0 s / TBT 937 ms / SI 9.0 s; desktop TBT 2.8 s; unused JS ~620–740 KB; redirects costing up to 1.1 s. Field: FCP and LCP "average", CLS good.

**Repo state:** QLD + WA OB live from `content/courses/*.mdx` via `CourseLayout` + `[slug]` route; CPD hub as a standalone page; **~27 components documented at the live `/styleguide/`** — including `PartnerDisclosure`, `CpdMatrix`, `BundleOffer`, `InsurancePartner`, `TrustBand` and `TrustStats`, so Waves 2–4 reuse more and build less than v1 assumed; sitemap + robots shipping; images local optimised AVIF except expert portraits/logo (still on r2.dev); husky + secretlint + `/ship` in force. Note: `HANDOVER.md` (12 Jul) is stale on the component list and the QLD fee — refreshing it is a Wave 0 task.

---

## 4. Page inventory and redirect map — first-class, up front

The single highest-risk SEO artefact. Authored and signed off in **Wave 1** (not at the end), then maintained as `redirects.csv` in the repo and implemented at cutover.

| Category | Count (approx.) | Action |
|---|---|---|
| A. Equity core — rebuild on same slug | ~10 (5× OB states, OB hub, home, White Card WA, NSW building CPD, WA RE CPD) | Rebuild; keep slug where it already matches the state-first convention |
| B. Rebuild with URL change | ~15 (NSW OB dual URLs → one; `/white-card-wa-online` → `/white-card-wa`; TAS CPD set → `/cpd-{trade}-tas` convention; `/wa-real-estatecpd` → clean slug) | Rebuild + single-hop 301 from every legacy variant |
| C. Rebuild, no legacy source | ~15 (White Card NSW/QLD/TAS/ACT pages, CPD trade/state hubs, bundles, experts, accreditation, reviews, catalogue) | New URLs, no redirect needed |
| D. Retire | ~18 pages: the low/no-equity set (VIC building industry, TAS architects, Keystone-funded, special bundles…) **plus the NSW Real Estate CPD set** (product retired, confirmed 16 Jul: agent classes 1–2, strata 1–2, stock & station 1–2) | 301 to nearest hub; each gets an explicit line. **Equity note (R5):** Google treats a 301 to a less-relevant page as a soft 404, so this residual equity is expected to be *lost, not transferred* — the 301s stay only because they beat a bare 404 for users. |
| E. Stays on LearnWorlds | 175 `/course/*`, 54 `/program/*`, `/bundle/*`, payment/system URLs | LearnWorlds moves to `learn.abeeducation.edu.au`; apex paths 301 to learn.* equivalents; enrol CTAs on the new site deep-link to learn.* checkout |
| F. Specials | `/saaustralia` (Solar Association Australia partner, 69 clicks) — **stays, rebuilt as a partner page** (confirmed 16 Jul); `http://` and non-www variants → single canonical | Explicit decisions in the map |

**Mechanics (verified against Cloudflare docs, 16 Jul):** a `_redirects` file in the static-assets build — Workers assets supports it natively with limits of 2,000 static + 100 dynamic (splat) rules, an order of magnitude above this map's ~70 rules, and cross-host targets (learn.*) are allowed, so no thin-Worker fallback is needed. Apex→www and http→https are zone-level Cloudflare rules (the zone is already on Cloudflare). No chains, kept indefinitely.

**Canonical form: no trailing slash on www** (`html_handling: "drop-trailing-slash"` + Astro `trailingSlash: 'never'`). This is the decisive SEO call in the whole map, and it reverses an earlier trailing-slash draft (risk audit R2). Every live equity URL is already slash-less (`/wa-owner-builder-course`), so with no-slash canonicals every category A "rebuild same slug" page is **byte-identical** to its live URL and takes **zero** redirect — the top six owner-builder URLs (≈⅔ of all clicks) survive the migration URL-unchanged, and the redirect surface roughly halves. Cloudflare serves `/page` with a direct 200 from `page/index.html` under this setting; a slash-variant request gets a 307, acceptable since that variant was never canonical or externally linked. Canonical tags, sitemap, JSON-LD `@id`s and internal links are all slash-less. Full detail and the spike checklist live in the Wave 0 close-out spec.

---

## 5. The wave plan

Ordering principle preserved from v1 (its best structural idea): dependency first — platform → trust infrastructure → verticals with spokes before hubs → bundles after courses → homepage and catalogue last. Within that, verticals are sequenced by measured equity, so the most valuable pages get the longest bake time on the preview URL before cutover.

| Wave | Theme | Pages (approx.) | Exit gate |
|---|---|---|---|
| 0 | Platform close-out | 0 new | Templates ×3 exist; CI perf gate live; `site` config final |
| 1 | Trust infra + redirect map | 5 | Experts/accreditation/reviews live on preview; redirect map signed off |
| 2 | Owner Builder vertical | 7–8 | All 5 spokes + hub + insurance on preview, audits green |
| 3 | White Card vertical | 6 | 5 spokes + hub on preview, ASQA gates green |
| 4 | CPD vertical + bundles | 15–18 | Courses, trade/state hubs, bundles on preview |
| 5 | Support + homepage + content-hub scaffold | ~10 | Every remaining page built or retired per map |
| 6 | Pre-launch gates + cutover + watch | 0 new | Domain flipped, redirects verified, monitoring on |

### Wave 0 — Platform close-out (mostly already done)

What remains before content scales, per the repo plan's Phase C precondition:
- **Templates ×3** (the repo's own "templates first" rule): CPD course layout (5-industry × state matrix), ASQA-accredited layout (RTO partner + number, "nationally recognised", ASQA disclosure, `partners` collection wired), and the home/hub layout. Each extends the proven `CourseLayout` pattern with a Zod schema.
- **Global chrome finalisation:** footer with the Course / Training Provider / Enrolment Partner block and sitewide ASQA disclosure line; nav IA covering the four verticals (respect the `SiteHeader.astro` `set:html` gotcha — do not refactor it).
- **`astro.config.mjs` `site`** set to `https://www.abeeducation.edu.au` before any sitemap that will be submitted (preview sitemaps are throwaway).
- **CI performance gate:** Lighthouse CI (GitHub Action) against preview URLs — Performance = 100, budgets from §6. Fails the PR, not just warns.
- **Redirect mechanism spike:** prove the chosen redirect implementation on the preview Worker with a dozen real rows from the map.
- **Staging de-index (R3):** serve `X-Robots-Tag: noindex` on the `workers.dev` host now (a hostname-scoped Worker header rule, since `_headers` cannot vary by host) so the in-progress build cannot be indexed as duplicate content on the wrong host; check whether any workers.dev URLs are already indexed. At cutover, `workers_dev: false` and the migration-only noindex is removed from the production host.
- **Doc hygiene:** refresh `HANDOVER.md` (stale on the component list and the QLD QBCC fee, which the 15 Jul rebuild verified at $493.59) so parallel sessions build from current truth.

### Wave 1 — Trust infrastructure + redirect map sign-off

- `/experts/dominic-ogburn`, `/experts/warwick-smith` + experts hub: `ProfilePage`/`Person` JSON-LD, real photos (grayscale-hover, never AI), credentials from the Notion Experts database ("All Verified" only, apply each expert's "what not to claim" list; state provenance if the snapshot is used).
- `/accreditation`: crawlable links to training.gov.au (Blue Dog 31193, Upskill 45708, AlertForce 91826), ASQA, CBOS, Access Canberra; plainly states ABE is not an RTO and names each partner.
- `/reviews`: resolved 16 Jul — ABE's reviews live on its Google Business Profile (**4.8/5 from 52 reviews**). That is an off-site score, so it is **displayed and linked, never marked up**: no `AggregateRating` anywhere on the site, because Google treats third-party-sourced ratings in schema as self-serving markup and it risks a structured-data penalty. The page renders the rating honestly with a link to the profile; review snippets can be quoted with attribution. Post-launch, collecting reviews natively on-site is the path to earning `AggregateRating` back — worth adding to the post-cutover backlog.
- **Redirect map v1 authored and signed off** — all 44 marketing pages + the learn.* rules, per §4. This is the wave's real deliverable; course-page E-E-A-T links unblock here too.

### Wave 2 — Owner Builder vertical (the equity core)

- **TAS:** port the pipeline content (TAS Owner Builder folder) to `content/courses/tas-owner-builder-course.mdx`; re-verify CBOS facts and fees at port time (fact ledger discipline, mistakes-log M1/M4).
- **NSW:** full pipeline build. RTO-partnered (Upskill 45708) — first use of the ASQA layout from Wave 0; consolidates the two live URLs onto `/nsw-owner-builder-course` with 301s from both.
- **ACT:** full pipeline build; state-approved-direct (Access Canberra), `recognizedBy` the regulator.
- **OB hub** (`/owner-builder-courses`, 59.9k impressions): hub layout from Wave 0, `ItemList` over the five spokes, genuinely hub-level content (cannibalisation gate) — the biggest single-page equity protect job in the migration.
- **Insurance:** `/insurances`, `/owner-builder-insurance`, `/professional-indemnity-insurance` rebuilt (they have live equity); `Service` schema; authority-checked partner copy.
- Every page: fact ledger closed before writing, keyword grounding GSC-first then Ubersuggest, named-reviewer E-E-A-T, skill audits + `final-check`/`ai-detector` pre-merge, rank tracking registered at publish.

### Wave 3 — White Card vertical (heaviest compliance load)

- Five state pages on `/white-card-{state}` (never an `-online` suffix; 301 from `/white-card-wa-online` and `/tas-online-white-card`). All ASQA: NSW = Upskill 45708, QLD/WA/TAS = Blue Dog 31193, ACT = AlertForce 91826. WA unit code is `CPCWHS1001` (single C). Delivery mode differs by state and is a hard accuracy point (NSW is trainer-led, never self-paced online).
- **WA first** — 36.7k impressions at position ~9–10 is the site's biggest near-term win.
- Hub at `/white-card` (10.8k impressions already on that slug): five state cards, `ItemList`, no sideways links between competing state pages.

### Wave 4 — CPD vertical + bundles (most structurally complex)

- **Course pages** per the confirmed matrix: TAS building/plumbing/electrical (CBOS context), WA real estate, NSW building. NSW real estate CPD and asbestos/silica are **out** — products retired / not sold (confirmed 16 Jul); their legacy URLs are handled in the redirect map instead. Slug convention `/cpd-{trade}-{state}`, 301s from the legacy TAS/NSW slugs.
- Each course page carries the bundle upsell (the existing `BundleOffer` component — no new build needed) and one canonical breadcrumb (trade hub primary).
- **Trade hubs + state hubs** reusing the hub layout + `CpdMatrix`; up/down link discipline; the existing repo CPD hub page is refreshed to the hub template rather than left standalone.
- **Bundles:** `Product` + `ItemList` schema, honest savings figure, child-course links resolving (courses built first). `AggregateRating` only from genuine native reviews.

### Wave 5 — Support, homepage, content-hub scaffold

- Homepage (final) + course catalogue: featured pathways into the four verticals; all links resolve because the verticals exist.
- About, Contact, FAQ (with `FAQPage` schema; decision-critical facts never in accordions), Help, policies/legal (thin, breadcrumb-only schema), SAA partner page per the map decision.
- **Content hub scaffold:** `/guides` collection (Zod: title, state?, courseRefs[], author from experts, publishedAt, lastReviewedAt), article layout with `Article` JSON-LD + named expert author, hub index page, RSS. No articles required for launch — the engine is the deliverable. First-topic shortlist comes straight from GSC opportunity queries (`owner builder course online`, cost/eligibility questions, White Card comparisons).

### Wave 6 — Pre-launch gates, cutover, watch

**Pre-launch gates (all block go-live):** site-wide SEO pre-production audit + readability audit + `final-check`; design polish pass against DESIGN.md; every fee re-verified within its cadence (note: the repo HANDOVER still carries the pre-indexation QLD QBCC fee of $477.47, but the 15 Jul QLD rebuild verified **$493.59** — update the repo doc and re-confirm at build time; WA verified to 1 Jul 2027); **full-inventory redirect verification (R7)** — a scripted, blocking check that every one of the ~370 live URLs (321 LW export + 298 GSC, de-duplicated) returns 200 (category A) or a single-hop 301 to its exact mapped target, output kept as the cutover evidence file; sitemap regenerated on the production `site`; **analytics parity (R11)** — Zaraz + GA4 + Google Ads conversions validated on staging so there is no signal gap the moment the platform swaps; **learn.\* indexation strategy decided (R6)** — indexable-vs-noindex for the course-player host, using whatever canonical/noindex control LearnWorlds exposes on a subdomain; expert portraits + logo moved off r2.dev (last Phase D remnant); Lighthouse 100 on every template.

**Cutover — the repo playbook, followed as written, with one correction:**
1. Attach `abeeducation.edu.au` (apex + www) to the `abe-edu-web` Worker; verify TLS.
2. Move LearnWorlds to `learn.abeeducation.edu.au` (confirm feasibility with LearnWorlds support ahead of time — §10); keep it serving course delivery and checkout. The learn.* indexation decision (R6) is made before this move.
3. Redirects live: one hop, kept indefinitely. The marketing host's robots.txt must **not** disallow `/course/`, `/program/` or `/bundle/` — those old URLs have to stay crawlable or Google never sees the 301 that carries them to learn.* (risk audit R1). Crawl control for the player URLs lives on the learn.* host instead.
4. TTL to 300 pre-switch; **never touch MX/SPF/DKIM**.
5. Switch, monitor errors and 301 resolution. Remove the migration-only `noindex` from the production host (R3).
6. Submit sitemap in GSC; **no change-of-address** — the canonical host does not change, so this is a platform swap plus URL reorg, not a site move. Confirm the GSC property is a **domain property** (so it covers both www and the new learn.* subdomain); if it is URL-prefix on www, add a learn.* property. Optionally submit a temporary sitemap of the old URLs for a few weeks to speed redirect discovery, then remove it (R8). Verify GA4 collection on the new pages.
7. Rollback: keep DNS repoint available for the whole window.

**Post-launch watch (4 weeks):** GSC coverage and 404s daily week 1 (watch for soft-404 spikes on the retire set — expected per R5); CrUX field data at day 28 against the all-green target; rank tracking on the registered keyword set; temporary ranking fluctuation watched over the ~4-week settling window Google describes, with no fixed percentage assumed; learn.* indexing behaviour monitored before any consolidation decisions.

---

## 6. The CWV-100 workstream (cross-wave, gated in CI)

The stack starts near-perfect: static HTML from the edge, no framework JS, system of ~25 lean components. The score is lost, not won, and it is lost in four places:

1. **Third-party scripts — the decisive one.** Confirmed set (16 Jul): **GA4 and Google Ads**; **chat and Meta pixel are possible** but not committed. Policy: no render-blocking gtag on the main thread — GA4 and Google Ads conversion tracking route through Cloudflare Zaraz (or server-side GA4), which keeps measurement at near-zero TBT. If the Meta pixel is confirmed it routes through Zaraz the same way. A chat widget is the single riskiest item for the 100 target: if confirmed, it loads on interaction or idle only (facade pattern), with its TBT cost measured on the preview before it ships. Anything beyond this set needs an explicit exception. This single policy is the difference between 100 and 70 — the current site's ~740 KB of unused JS is the cautionary tale.
2. **Fonts.** Self-host Archivo, DM Sans, DM Mono as subset woff2; preload the two above-the-fold weights; `font-display` with `size-adjust` fallback metrics so text never shifts (CLS) and never blocks (FCP).
3. **Images.** Already local optimised AVIF — keep the discipline: explicit width/height everywhere, `fetchpriority="high"` + preload on the hero LCP image only, lazy-load the rest, portraits/logo off r2.dev before launch.
4. **INP.** The only JS of consequence is the nav controller — keep handlers tiny, no long tasks. Accordion/FAQ stays CSS-first.

Enforcement: Lighthouse CI budgets (Performance 100, TBT < 50 ms, CLS < 0.02, LCP < 1.8 s lab mobile, total JS < 50 KB, zero render-blocking third parties) fail the PR. Field truth read from CrUX/GSC after cutover.

---

## 7. Kept from v1 and from the repo plan (the good bits, credited)

**From v1:** the dependency spine (spokes before hubs, courses before bundles, homepage last); the three-dimension breakdown (component/content/development) as the per-wave working format; authority model as a regulatory gate with per-jurisdiction rules; the fact-ledger discipline (no figures carried in the plan, resolved at build time against .gov.au); the build-vs-reuse component table idea; the cannibalisation gate; trust infrastructure before course pages; the risks/watch-items format.

**From the repo plan:** the settled architecture (unchanged); the cutover playbook (§5 Wave 6, with the change-of-address correction); the risk register (carried below); "templates first" as Phase C's opening move; `/ship` and the guardrails workflow; the CMS trigger (~50 pages or multiple editors — worth revisiting soon after launch, since this plan lands near that threshold).

---

## 8. Risks

| # | Risk | Mitigation |
|---|---|---|
| 1 | Ranking fluctuation after cutover (Google: fluctuation is expected and takes "a few weeks" to settle — no fixed % assumed) | Single-hop 301s kept indefinitely; **no-slash canonicals keep the equity core URL-identical (zero redirect)**; strong internal linking; monitor daily week 1 |
| 2 | LearnWorlds cannot move to learn.* cleanly (SSO, checkout, support process) | Confirm with LearnWorlds support **before** Wave 4 ends; this is the cutover's only external dependency |
| 3 | Third-party scripts reintroduced late and CWV target lost | §6 policy + CI budget; exceptions need measured cost |
| 4 | NSW OB consolidation loses rather than gains | Both legacy URLs 301 to one target; content supersedes both pages' coverage; watch the query set post-cutover |
| 5 | Matrix errors propagate | **Closed 16 Jul.** Product truth confirmed: NSW RE CPD retired, White Card five-state matrix stands, no asbestos/silica pages, SAA stays |
| 6 | Stale government fact goes live | Publish hard-blocker; per-page fact ledger; QLD QBCC fee indexation-pending flag; mistakes-log M1/M4 checks per run |
| 7 | Authority-model breach (Category N) | Per-jurisdiction rules in CLAUDE.md enforced in copy + schema; `/ship` diff check |
| 8 | Parallel Claude sessions collide in the repo | HANDOVER concurrency rule: confirm ownership, stage explicit paths, never `git add -A` |
| 9 | "Product snippets" search appearance (281 clicks) changes as LW `Product` schema is replaced by `Course` schema | Expected and acceptable; Course/FAQ rich results replace it; monitor appearance mix in GSC |
| 10 | Redirect mechanism assumption wrong | Wave 0 spike proves it before the map is built out |

---

## 9. Sizing honestly

Roughly **45 pages** to build or port (Waves 1–5), each through the research → fact ledger → content → MDX → audit pipeline, plus three templates and the redirect map. At the demonstrated pace of this pipeline (a full course page per working session, faster for hubs/support pages and ports), that is on the order of **25–35 working sessions** of content/build effort before the cutover gates. Wave 4 carries the largest page count; if calendar pressure appears, the case-by-case map allows trimming its long tail (retire more of category D) without touching the equity core.

---

## 10. What I still need from you

The short list — everything else is already in hand or self-servable.

1. **Must-have third-party scripts — answered 16 Jul:** GA4 and Google Ads confirmed; chat and Meta pixel are "maybe". §6's loading policy is written to that set. A final yes/no on chat and Meta is needed before the Wave 6 gates; if either is in, the measured-cost rule in §6 applies.
2. **Revenue data and checkout links** (nice to have, not a blocker). Two separate things: (a) *which products make the most money* — GSC only shows search traffic, so without revenue data pages are prioritised by traffic alone; the latest ABE_Master_Data workbook, a GA4 conversions export, or even a one-line ranking ("OB is 70% of revenue, then TAS CPD…") lets the money pages go first inside each wave. (b) *The page-to-product mapping for enrol buttons* — each live page's CTA points at a specific LearnWorlds product (e.g. `/payment?product_id=white-card-wa-enrol`), and these links move to learn.* at cutover; a LearnWorlds product list covers it, or I can reconstruct it by crawling the live pages once fetches are approved. Without either, the fallback is equity-only priority and per-page CTA checks during audits.
3. **LearnWorlds subdomain confirmation** — a support ticket asking whether the school can move to `learn.abeeducation.edu.au` and what happens to logins/checkout links when it does. The cutover's only external dependency.
4. **Product truth — answered 16 Jul:** NSW Real Estate CPD: **no** (page set retired into the redirect map). White Card QLD/NSW/ACT: **yes** — the five-state matrix stands. Asbestos/silica: **no** (no marketing pages built). SAA page: **stays**, rebuilt as a partner page.
5. **Native reviews — answered 16 Jul:** none held on-site; ABE's reviews live on its Google Business Profile (**4.8/5 from 52 reviews**). Displayed and linked on `/reviews` and in trust furniture, never in schema — no `AggregateRating` site-wide (third-party-sourced ratings in markup are self-serving per Google's rules). Post-launch backlog item: collect reviews natively to earn the markup back.
6. **DNS — answered 16 Jul:** the `abeeducation.edu.au` zone is already on Cloudflare. Cutover step 1 (attach the custom domain to the Worker) and the TTL drop are self-serve when the time comes; no registrar dependency.
7. **GSC extras** (nice to have): index-coverage report, any manual actions, the CWV report — screenshots or exports into `Data/GSC/`.
8. **Access approvals for me:** approve web fetches of `abeeducation.edu.au` when prompted (lets me crawl and diff the live pages directly); the Ubersuggest connector hit its free-tier daily limit today (3 reports) — keyword/backlink pulls resume tomorrow or on a paid tier; SiteGuru is connected but needs authorising in your connector settings if you want it used.
9. **Resolved 16 Jul:** `abe-rebuild-plan-review.md` and the updated rebuild plan were provided and reconciled — no conflicts with this plan; the review confirms the settled architecture, names `SeoGraph` as the schema component, and shows the original plan already intended a guides/blog section, which §0's content-hub decision formalises. (`MIGRATION.md` remains unseen but covers repo setup that is already done.)

## 11. Immediate next actions

1. You: raise the LearnWorlds `learn.` subdomain ticket (§10 item 3 — now the only external blocker); give the final yes/no on chat and the Meta pixel; send the workbook or GA4 export if you want revenue-ranked priority inside waves.
2. Me, unblocked now: Wave 0 close-out spec (three templates + CI perf gate + redirect spike) and the redirect map v1 draft from the LearnWorlds export × GSC join already done this session.
3. Then Wave 1 builds start.
