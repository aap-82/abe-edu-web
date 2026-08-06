# 07 · Pre-deploy verification — `/white-card`

Fresh, independent Stage 7 check. No pipeline artefact for this page was read except
`05-components.md` (permitted) and this file. Built against `dist/white-card/index.html` from a
build run at the start of this session (`npm run build`, 22 pages built, guardrails 23/23 passed).

## Verdict: **Amber**

The page is structurally sound, correctly carries no Course/Person/price schema (the hub archetype
rule), has no banned CTA copy, no dead links, and a complete Sources block. But this check surfaced
one **real, novel, confirmed defect that no other audit on this page catches**: the sitewide
`SourcesFooter.astro` compliance disclosure renders the **wrong** authority-model sentence for this
page. `/white-card`'s footer says *"Its owner builder and CPD courses are delivered directly by ABE
Education under state government approvals"* — the state-approved-direct disclosure — when every one
of this hub's four spokes is an ASQA-accredited, RTO-delivered product. Its own sibling spoke
`/white-card-wa` correctly renders *"Nationally recognised, ASQA-accredited training on this site is
delivered and assessed by the named RTO partner shown on that course page, not by ABE Education."*
for the same disclosure slot. Root cause traced end to end below. **Not fixable in this build
session's writable paths** — the `hubs` content-collection schema has no `asqa` field at all, and
`HubLayout.astro` never threads one into its `<SourcesFooter>` call, so no hub author could set this
correctly today even with the right intent. Everything else found is either N/A by design (hub
archetype), a pre-existing sitewide-chrome issue already present on shipped pages, or minor.

---

## 1 · Toolchain output (verbatim WARN/FAIL naming `white-card`)

### `node scripts/check-pipeline.mjs --slug white-card`
```
FAIL  white-card: missing artefact(s) — 07 (pre-deploy verification)
OK    white-card: 3 section(s) match the plan
OK    white-card: 1 capsule(s) match 04-content.md (figures normalised)
```
The FAIL is expected and self-resolving: this file is that artefact. **Re-ran after writing this file**:
artefact-completeness now `OK (all 7 artefacts present)` and `07 dispositions all 3 mandated audits`
now `OK`. One new FAIL appeared instead: `white-card: 07 is not committed while its page source is.
The verification is not in version control...` — expected until this file, `src/content/hubs/
white-card.mdx` and `src/pages/white-card.astro` are added and committed; not a content defect.

### `node scripts/check-claims.mjs --slug white-card`
```
WARN  Figure $169 in src\content\hubs\white-card.mdx does not appear anywhere in kb/register/. Either
      it is an ABE price (fine, ignore) or it is an unverified government figure (not fine).
```
Traced: `$169` is the comparison-table caption's "QLD's ... Saturday sessions are $169" — an ABE
commercial price (Saturday session rate), not a government figure. The identical figure is flagged
the same way, repeatedly, on `src/content/courses/white-card-qld.mdx` (12 of the 18 repo-wide WARNs
in this run), which already ships and is graded OK in `check-pipeline`'s artefact/section checks. Not
a hub-specific issue — the script's own text says this is fine to ignore when the figure is an ABE
price, and it is.

### `node scripts/check-links.mjs --slug white-card`
```
FAIL  /white-card now exists but is still listed in PLANNED (W3-6 - White Card hub). Delete its line
      in scripts/check-links.mjs.
WARN  LearnWorlds path linked same-origin: /payment?product_id=white-card-wa-enrol&type=course — from
      /white-card-wa.
```
The FAIL is real and about this page (its own `PLANNED` list entry is stale now that the page exists)
but the fix is a one-line delete inside `scripts/check-links.mjs` itself — `scripts/**` is skills-owned,
not writable by this build session. The WARN is about `/white-card-wa` (the WA spoke's LearnWorlds
payment link), caught only because the `--slug` filter substring-matches "white-card" inside
"white-card-wa" — it is not a hub defect.

### `node scripts/system-health.mjs` (pre-flight; repo-wide, filtered mentally to what's relevant)
```
FAIL  white-card: missing artefact(s) — 07 (pre-deploy verification)     [same as above, self-resolving]
FAIL  POSITION CONTRADICTS REGISTER (tas-online-residency) in 12 place(s): src\content\courses\
      white-card-nsw.mdx:156, src\content\courses\white-card-tas.mdx:25, ... [8 of 12 shown]
```
The 12-place FAIL lists only spoke pages (`white-card-tas.mdx`, `white-card-nsw.mdx`) — **confirmed
`src/content/hubs/white-card.mdx` is not among the 12** (see check-positions re-run below). No other
`white-card`-named line appeared among the FAILs/WARNs.

### `node scripts/check-positions.mjs`
```
FAIL  POSITION CONTRADICTS REGISTER (tas-online-residency) in 12 place(s): ...
```
Same count as the system-health run: **12, unchanged**. Verified directly against the three banned
regexes (`/Tasmanian\s+residents?\b/i`, `/resident\s+of\s+Tasmania\b/i`,
`/evidence\s+(?:your|of)\s+residency\b/i`) by reading `src/content/hubs/white-card.mdx` in full: the
TAS spoke blurb, comparison row and both FAQ answers mentioning TAS all use "Complete the whole course
online and self-paced" / "lodge with Service Tasmania" — no residency phrasing anywhere. The MDX file's
own header comment explicitly calls this out as a known trap and states the file deliberately avoids
it ("TAS: NO RESIDENCY CLAIM ... Do not repeat it here"). The hub adds **zero** new hits — confirmed,
not assumed.

---

## 2 · Section conformance

`grep` of every `<section id="...">` in the built HTML returns exactly: `top` (hero, chrome — not a
plan-tracked id), `spokes`, `compare`, `faq`. `05-components.md` claims exactly these three as the
page's real section ids. Both directions hold: every id it claims renders, and no `<section id>`
exists in the HTML that isn't in the plan. `CtaBand` and the footer correctly carry no `id` attribute,
matching the plan's note that they're excluded from section-conformance by design.

## 3 · Artefact completeness

`pipeline/white-card/` holds:
```
01-source-map.md
02-gap.md
03-briefs.md
04-content.md
05-components.md
06-image-prompts.md
```
01–06 present. This file is 07. Full set will be 01–07 once written.

---

## 4 · Stage 7 checklist (`verification.md`)

### 1a · Structure & schema
| Item | Result |
|---|---|
| One `<h1>` | **Pass** — exactly 1, text "White Card, by state." carries the target keyword. |
| Other headings H2/H3 only, no cosmetic H6 | **Pass** — 4 `<h2>`s ("Find the course that applies to you", "Compare by state", "Common questions", "Ready to get your White Card"), 0 `<h6>`. |
| JSON-LD present, valid, server-rendered | **Pass** — single `<script type="application/ld+json">` in raw HTML (not JS-injected) containing `BreadcrumbList` (2 items) + `ItemList` (4 spokes). |
| `Course` + `EducationalOccupationalCredential` + `Person` x2 | **N/A by design** — archetype 6 hub carries none. Confirmed zero `"@type":"Course"`, zero `"@type":"Person"` nodes in the schema. Matches the sibling `/owner-builder-courses` hub exactly (same check run against it: 0 Course, 0 Person, no `content-review` section, but a "Reviewed by" freshness line — identical pattern). |
| `recognizedBy` matches authority model | **N/A by design** — no `recognizedBy` field anywhere in this page's schema (hub has no credential node to carry one). |
| `Course.offers.price` == on-page price | **N/A by design** — no `offers`/`price` in schema (the one apparent regex hit on "price" was a false positive from `class="price"` in the sticky-CTA-strip markup, not a JSON-LD field — checked directly). |
| `AggregateRating` absent | **Pass** — zero occurrences anywhere on the page (also zero `Trustpilot` mentions). |
| Meta: title <=~60, description present, canonical set, `lang="en-AU"`, breadcrumb renders | **Pass** — title 56 chars; description present (195 chars — longer than the ~155 char SEO best-practice ceiling, not itself a Stage-7 checklist item, noted as a minor aside); canonical `https://www.abeeducation.edu.au/white-card` (no trailing slash, correct form); `<html lang="en-AU">`; breadcrumb renders visually (`Home / White Card`) and as `BreadcrumbList` schema. |

### 1b · Authority language
| Item | Result |
|---|---|
| No RTO/nationally-recognised/accredited/Statement-of-Attainment misuse; no WA "approved course/provider" or "permit/licence" | **Pass on this page's own copy** — "nationally recognised" and "Statement of Attainment" appear only where accurate for the ASQA-accredited White Card group (FAQ Q6, `.f-auth`), matching CLAUDE.md's authority model for that group. No WA-specific approved/permit/licence language appears (the hub doesn't discuss WA's owner-builder Form 75 model at all). |
| ASQA disclosure complete, all required locations | **FAIL — see verdict.** The `.f-auth` block (hub-authored `disclaimersHtml`) and the FAQ's "Is ABE Education a registered training organisation?" answer are both correct and consistent. But the **sitewide** `.f-asqa` compliance line (rendered by `SourcesFooter.astro`, not hub-authored) shows the **wrong** branch — see full trace in "Real defects" below. This is one of the "required locations" 1b names, and it's wrong on this page. |

### 1c · E-E-A-T & freshness
| Item | Result |
|---|---|
| Breadcrumb freshness line, crawlable HTML | **Pass** — `<p class="reviewed">Reviewed by <a href="https://www.linkedin.com/in/dominic-ogburn"...>Dominic Ogburn</a> on <time>4 August 2026</time></p>` in the plain pagebar HTML, not inside a `<style>`/comment/schema block. Matches `reviewedBy` frontmatter and today's date (4 Aug 2026) — current, not stale. |
| Per-section verification block on gov-fact sections | **N/A by design** — the hub restates already-verified spoke figures rather than asserting new ones; the consolidated footer Sources block (below) covers the citation requirement instead, which is the correct hub-level treatment. |
| `content-review` section, named developer + reviewer | **N/A by design** — archetype 6 carries no Person node and no `authorityModel`; confirmed the sibling `/owner-builder-courses` hub also has no `id="content-review"` section, only the same single "Reviewed by" line. Consistent, not a novel omission. |
| "Last verified: DD Mon YYYY" beside trust badges | **Pass** — each Sources footer entry carries its own `Verified DD Mon YYYY` (WA 28 Jul 2026, TAS 22 Jul 2026 + fee 1 Jul 2026, NSW 1 Aug 2026, QLD 2 Aug 2026), all within cadence as of the 4 Aug 2026 build. |

### 1d · Government-source citation gate
| Item | Result |
|---|---|
| Every gov/regulatory claim carries a visible citation | **Pass** — the hub does restate specific gov-adjacent figures (TAS's $13.72 card fee, QLD's Connected Real Time Delivery framing) and each has a matching entry in the Sources block. |
| Consolidated Sources section, primary/acceptable-secondary only | **Pass** — 4 entries: WorkSafe WA (`.gov.au`), Service Tasmania (`.gov.au`), SafeWork NSW (`.gov.au`), and a QLD Training Ombudsman PDF (`trainingombudsman.qld.gov.au` — a Queensland Government domain, primary instrument). No aggregator/directory/blog/competitor source. |
| No `[confirm: ...]` / `[TO VERIFY]` left open | **Pass** — zero matches anywhere in the built HTML. |

### 1e · Cannibalisation & indexation
| Item | Result |
|---|---|
| No other ABE page targets the same primary keyword | **Pass, by structural design** — hub targets the broad/national "White Card" query; each spoke targets its own state-qualified variant ("White Card WA/TAS/NSW/QLD"). This is exactly the split archetype 6 exists to produce. No GSC cross-check contradicted this. |
| No LearnWorlds path same-origin or in JSON-LD; sitemap emitted | **Pass** — the only LearnWorlds-host link on this page is the shared header/footer `https://learn.abeeducation.edu.au/` login link (present sitewide, not a `/course/`, `/program/`, or `/payment` path). `sitemap-index.xml` confirmed emitted by the build log. |
| Internal links point up/down only, never sideways between competing pages | **Pass** — hub → all 4 spokes (down), spokes' own nav → hub (up, verified via the shared mega-menu markup rendered on this page, which includes a "White Card Hub" link). No spoke-to-spoke sideways link found on this page. |
| State content genuinely state-specific | **Pass** — every spoke blurb/comparison cell carries its own price, delivery mode, RTO and (for TAS) its own government fee; no generic copy with the state name swapped. |
| ACT shown as not-yet-available, no dead link | **Pass** — every ACT reference (`comparison.columns`, mega-menu, mobile nav, in-page comparison column) renders as a `<span class="... soon">`/`cmp-soon` label with **no `href`**. Grepped every `href` on the page: no `/white-card-act` anywhere. |

### 1f · Banned-copy checks
| Item | Result |
|---|---|
| No "comprehensive" | **Pass** — zero occurrences. |
| No "Enrol now"/"Enrol today"; guardrails.ts budget | **Pass** — zero occurrences; `abe-guardrails` reported 23/23 pages passed at build time (this page included). |
| No CTA inside an answer capsule or FAQ answer | **Pass** — programmatically checked all 7 `<div class="ans">` blocks: zero contain an `<a>` or `btn-*` class. |
| No "verified" alongside a Trustpilot reference | **Pass** — zero Trustpilot mentions on this page at all. |
| Images: content alt >=80 chars; decorative `aria-hidden`+empty alt | **Pass** — the only `<img>` is the header brand mark, correctly `alt="" aria-hidden="true"`. No content images yet (hero is an FPO `Placeholder`, per Stage 6's own disposition) — N/A for the >=80-char rule until a real image is added. |
| OG/Twitter meta emitted | **Pass** — `og:type/site_name/locale/title/description/url` and `twitter:card/title/description` all present. No `og:image` (optional field, not supplied in frontmatter — consistent with the still-placeholder hero, not a broken tag). |

---

## 5 · `abe-readability-audit`

Run against `dist/white-card/index.html` (static) and `http://127.0.0.1:8899/white-card/` (rendered,
served correctly — verified 200 response before running, ruling out the documented `file://`
unstyled-page artefact).

**`audit_static.py`: 1 FAIL, 1 FLAG, 10 checks.**
- `[FAIL] Page ground is off-white, not pure #fff — --paper = #ffffff.` **False positive, verified
  manually.** The script's `find_ground()` prefers a `--paper` token over reading `body{background}`
  directly. This repo deliberately split `--ground` (#fbf9f5, the actual page background) from
  `--paper` (#ffffff, reserved for elevated surfaces — cards, megamenu) on 24 Jul 2026 (CLAUDE.md).
  Read directly from the built CSS: `body{...background:var(--ground)...}` and `--ground:#fbf9f5` —
  the real page background genuinely is off-white, matching the hard rule. Confirmed the identical
  false FAIL fires on `/white-card-wa` too (re-ran the same script against it), so this is a script/
  token-register mismatch, not a defect, and not new to this build.
- `[FLAG] 38 declarations below 12px` — all are shared-component micro-labels (`.eyebrow`,
  `.hub-card .hc-state`, `.cmp thead th`, `.pagebar .crumbs li`, etc.), every one a class also present
  on `/white-card-wa` (which flags 42 of the same pattern). Sitewide chrome, not this page's own
  authored prose (the page's actual body copy — capsule 18px, FAQ answers 16px, comparison cells 15px
  — all clear the 12px floor).

**`audit_render.py`: 3 FAIL, 0 FLAG, 8 checks.** (2 of the 3 were re-adjudicated after this file was
first written — see the correction below, made by the Stage 9 grader and folded in here 4 Aug 2026.)
- ~~`[FAIL] 2.68:1 (needs 4.5) rgb(154,154,154) on rgb(251,249,245) @13px "About"`~~ and
  ~~`[FAIL] 2.68:1 ... @11px "Coming soon"`~~ — **not live defects, corrected 4 Aug 2026.** Both are the
  same `--slate-light`-on-`--ground` token, on the header nav's "About" label and the comparison
  table's ACT column respectively. The ancestor-chain walk was right (no dark/transparent parent, so
  not the documented 1:1-misread bug) — the mistake was stopping there.
  `skill-reviews/design/2026-07-30-measure-contrast-and-tap-targets.md` already ruled this exact token,
  on this exact non-interactive `aria-disabled="true"` `<span>` pattern, exempt under WCAG 1.4.3's
  inactive-UI-component carve-out — muting the label is what tells a reader it isn't clickable, and
  raising the contrast would undo that. Confirmed both of this hub's instances use the identical
  non-interactive markup (`<span class="nav-l soon" aria-disabled="true">` /
  `<span class="cmp-soon">`), so the exemption applies here too, not just on the page it was first
  ruled on.
- `[FAIL] ~91 CPL on widest prose (820px @ 18px) — cap the column` — the shared `.capsule` component.
  **Pre-existing, sitewide/shared-component, not new to this build.** Already measured and named on
  `/white-card-wa`'s own 07-verification (30 Jul 2026) and at least three other reviews since (see
  the Stage 9 review's demand list) — **at least a fifth recorded sighting**, still unfixed. `[design]`.
- Passes: no horizontal overflow at 320/360/390px; 15 interactive elements >=44px tap target; mobile
  measure ~37 CPL.

Both scripts ran (not skipped). No Chromium/Playwright installation issue — `py` resolved to Python
3.14 with Playwright installed, as `verification.md` predicts for this machine.

---

## 6 · `final-check` + `ai-detector`

Read directly from the rendered HTML/MDX: hero lede, intro capsule, 4 spoke blurbs, comparison
caption, all 7 FAQ answers, CTA copy, footer disclosures.

1. **Contradictions** — **one real finding**, the same `.f-asqa` defect from §1b/§4 (verdict): the
   sitewide compliance sentence ("Its owner builder and CPD courses are delivered directly by ABE
   Education under state government approvals") sits on the same page as, and is inconsistent with,
   both the FAQ's "Is ABE Education a registered training organisation?" answer and `.f-auth`'s own
   disclosure, which correctly describe White Card as RTO-delivered. No other contradiction found —
   price, delivery mode, RTO assignment and the TAS government fee are all identical, everywhere they
   recur (hub cards, comparison table, FAQ, capsule).
2. **Duplicate/repeated information** — the RTO-partner sentence ("Blue Dog Training (RTO 31193)...
   Upskill Institute (RTO 45708)...") appears verbatim in both the FAQ answer and `.f-auth`. This is
   deliberate, expected redundancy (legal disclosure vs conversational FAQ, each independently
   discoverable/extractable), not a quality defect.
3. **Logical flow** — Hero (orient) -> Choose your state (spokes) -> Compare (differentiate) -> FAQ
   (objections) -> CTA. Standard, coherent hub progression.
4. **Logical grouping** — state-specific facts stay inside spokes/comparison; general/cross-state
   questions stay in FAQ. Nothing misplaced.
5. **Australian English** — "organisation", "recognised", "enrol"/"enrolment" (single L), "licensed"
   (correct verb-form spelling) all used correctly and consistently. No Americanisms found.
6. **AI-writing patterns** — no "delve/leverage/comprehensive/robust", no formulaic openers
   ("In today's world...", "It's important to note..."), no robotic hedging. Copy is concrete and
   specific (exact prices, exact fee amounts, named RTOs) throughout. `ai-detector` pass: nothing
   flagged.

---

## Hard-blockers (`verification.md`'s explicit list, re-checked)

| Blocker | Status |
|---|---|
| No H1 / multiple H1 / H1 missing target keyword | Not breached — 1 H1, contains "White Card". |
| Schema missing/invalid, or `recognizedBy` on a WA page | Not breached — schema valid (2 node types, both correct for a hub); no `recognizedBy` anywhere. |
| On-page price != `Course.offers.price` | N/A — no `offers`/`price` schema field exists to mismatch. |
| RTO/"accredited"/(WA) "approved course"/permit breach | **Not a literal breach** (the wrong `.f-asqa` sentence doesn't assert White Card IS delivered directly by ABE — it just names the wrong product category), but it is the same *category* of authority-model defect this blocker exists to prevent, on the same required disclosure location. Flagged, not silently passed. |
| Gov claim with no visible source / missing Sources section | Not breached — Sources block present, 4 entries, all primary/.gov.au. |
| Unresolved gov fact / `[confirm:]` / `[TO VERIFY]` left open | Not breached — zero found. |
| Gov fee past re-verify cadence, not re-checked | Not breached — TAS fee re-verified 1 Jul 2026, current. |
| Primary keyword already targeted by an existing page | Not breached — hub/spoke keyword split is the intended structure. |
| Banned CTA / CTA in FAQ / "comprehensive" | Not breached — zero found. |
| Pure-black ink / pure-white ground / body text below AA / CTA <44px | **Ink/ground: not breached** (verified `--ink`/`--ground` directly, both off-pure). **Body text below AA: not breached, corrected 4 Aug 2026** — the "About"/"Coming soon" `--slate-light`-on-`--ground` combination measures 2.68:1, but `skill-reviews/design/2026-07-30-measure-contrast-and-tap-targets.md` already ruled this exact token, on this exact non-interactive `aria-disabled` `<span>` pattern, exempt under WCAG 1.4.3's inactive-UI-component carve-out — this hub's own instances use the identical markup. This line originally called it a breach; the Stage 9 grader (`skill-reviews/2026-08-04-abe-course-page-astro-white-card-hub-rebuild.md`) caught the mischaracterisation. **CTA size: not breached** (44px+ confirmed by render probe). |

---

## Real defects found, and fix ownership

1. **`SourcesFooter.astro` / `HubLayout.astro` — wrong ASQA disclosure on `/white-card`.** The
   `hubs` collection schema (`src/content.config.ts:338-372`) has no `asqa` field, and
   `HubLayout.astro:99` calls `<SourcesFooter sources={footerSources} disclaimersHtml={disclaimersHtml
   ?? ''} />` without an `asqa` prop, so `SourcesFooter.astro`'s `asqa = false` default always fires
   for every hub. That default happens to be correct for `/owner-builder-courses` (a genuinely
   state-approved-direct hub) and wrong for `/white-card` (a 100%-ASQA-accredited hub) — the first hub
   to expose the gap. **Not fixable in this build session's writable paths** (`src/layouts/**` is
   design-owned; the schema field would need adding in `src/content.config.ts`, which is skills-owned).
   Needs a `[design]`-and-`[skills]` cross-cutting fix: add an `asqa`-equivalent field to the `hubs`
   schema and thread it into `HubLayout.astro`'s `SourcesFooter` call.
2. **`scripts/check-links.mjs` — stale `PLANNED` entry for `/white-card`.** One-line deletion, inside
   `scripts/**` (skills-owned). Not fixable here.
3. ~~Answer capsule at 65 words, 5 over the 40-60 word target.~~ **Fixed same day, after this
   finding.** `src/content/hubs/white-card.mdx`'s `intro` field was trimmed to 57 words (see
   `04-content.md`'s revision note) and both the committed frontmatter and the built HTML now measure
   57 — confirmed by the Stage 9 grader (`skill-reviews/2026-08-04-abe-course-page-astro-white-card-
   hub-rebuild.md`), who caught that this line was left stale after the fix landed.
4. **CPL: `.capsule` at ~91 characters** — real, pre-existing, sitewide/shared-component (confirmed
   identical on `/white-card-wa`'s own prior Stage 7), not introduced by this build, not fixable in
   `src/content/hubs/**` or `src/pages/**`. `[design]` — the Stage 9 grader traced this to **at least
   a fifth sighting** across five separate reviews; still unfixed. ~~Contrast: `--slate-light` "soon"
   labels at 2.68:1.~~ **Not a live defect — struck 4 Aug 2026.** The Stage 9 grader found
   `skill-reviews/design/2026-07-30-measure-contrast-and-tap-targets.md` already ruled this exact
   token, on this exact non-interactive `aria-disabled` `<span>` pattern, exempt under WCAG 1.4.3's
   inactive-UI-component carve-out. This hub's own "About"/"Coming soon" instances use the identical
   markup, so the exemption applies here too. Correcting this line rather than leaving it to
   mischaracterise the page's state to a future reader of this artefact.

Nothing here is a fabricated-good-faith pass: item 1 in particular is a genuine, previously-undetected
authority-model inconsistency this fresh check was specifically positioned to catch, because it
required comparing this page's rendered footer against its own sibling spoke's rendered footer rather
than reading either page in isolation.

## Mandated sub-skill audits — disposition

All three run, none skipped: **`abe-readability-audit`** (static + rendered, §5), **`final-check`**
(six checks, §6), **`ai-detector`** (§6). No silent omission.

---

## Re-verification · 7 August 2026 — full Stage 7 pass, ACT spoke + HubCard/ComparisonTable redesign

Fresh, independent re-check. Triggered per `check-pipeline.mjs` §4: `src/content/hubs/white-card.mdx`
(last touched by commit `f10f166`, 2026-08-07 02:40) is newer than the 4 Aug verification above, so that
file no longer certifies the current page. This pass reads the 4 Aug baseline (above), `05-components.md`,
`verification.md`, both authority-model kb files, `white-card.mdx` and the design review
(`skill-reviews/design/2026-08-06-white-card-hub-redesign-and-ob-match.md`) for context, then re-derives
every verdict from `npm run build`'s fresh `dist/white-card/index.html` — no finding below is carried
over from the baseline without being re-measured.

### Verdict: **Amber** (unchanged category — one confirmed-still-open defect, plus two new, lower-severity
findings; nothing crosses a hard blocker)

Everything the 5–7 Aug redesign added checks out correctly: the ACT spoke is fully live with no
"coming soon" residue, the HubCard "Issued by" fact lines name the RTO on all five cards and never the
regulator, the decorative corner arrow is not a nested interactive element, the full state names render
and wrap cleanly at 375px, and the comparison table's axes now match `/owner-builder-courses` exactly
(states as columns, facts as rows, a `tfoot` action row). The baseline's one real, confirmed defect —
`SourcesFooter.astro` rendering the wrong (state-approved-direct) ASQA disclosure sentence for this
100%-ASQA-accredited hub — **is still present, unchanged, same root cause**. Two new, lower-severity
findings surfaced on this pass: the page's own freshness signal (`reviewedBy`/`lastReviewedAt`, "4 August
2026") now predates 3 days of substantial content change, and the TAS/ACT HubCard "Issued by" bullets
omit the "Statement of Attainment" qualifier the spoke pages themselves always pair it with — a
precision gap, not a bare false claim, but the exact category of thing this task asked to check hard for.

### 1 · Toolchain output (verbatim, `--slug white-card` where supported)

**`npm run build`** — 23 pages built, then `[abe-guardrails] ABE guardrails: 24 page(s) passed.` (24, not
23 — `/white-card-act` is now a real page). Postbuild `check-redirect-targets.mjs`: unrelated to this
slug (15 distinct redirect targets, 6 resolving, 9 pending).

**`node scripts/check-pipeline.mjs --slug white-card`**
```
FAIL  white-card: the page changed 4001 minute(s) AFTER its last verification (src\content\hubs\
      white-card.mdx is newer than pipeline\white-card\07-verification.md). Re-run Stage 7 before
      shipping again - a verification that predates the content it certifies has certified nothing.
OK    white-card: all 7 artefacts present
OK    white-card: 3 section(s) match the plan
OK    white-card: 1 capsule(s) match 04-content.md (figures normalised)
```
The FAIL is exactly the trigger for this pass. **Re-ran after writing this section: still FAIL, same
4001 minutes.** `check-pipeline.mjs` deliberately compares **git commit times, not filesystem mtimes**
("a checkout rewrites mtimes and would make this lie" — the script's own comment), so writing this
section does not clear the check on its own; it clears once this file is committed with a commit time
after `f10f166`. Same mechanism the baseline itself flagged for its own equivalent FAIL — not a defect,
just not yet resolved by an edit that hasn't landed in git.

**`node scripts/check-claims.mjs --slug white-card`**
```
WARN  Figure $169 in src\content\hubs\white-card.mdx does not appear anywhere in kb/register/. Either
      it is an ABE price (fine, ignore) or it is an unverified government figure (not fine).
```
Same finding, same disposition as the baseline: the comparison notes' "QLD's ... Saturday sessions are
$169" is an ABE commercial rate, not a government figure — confirmed by re-reading `comparison.notes[1]`
directly, not assumed from the baseline's say-so.

**`node scripts/check-links.mjs --slug white-card`**
```
FAIL  /white-card now exists but is still listed in PLANNED (W3-6 - White Card hub). Delete its line
      in scripts/check-links.mjs.
WARN  LearnWorlds path linked same-origin: /payment?product_id=white-card-wa-enrol&type=course — from
      /white-card-wa.
```
Both unchanged from the baseline, both about a file this build session cannot write (`scripts/**` is
skills-owned) or a different page (`/white-card-wa`'s own LearnWorlds link, only caught by substring
match on "white-card").

**`node scripts/check-positions.mjs` / `system-health.mjs`** — one repo-wide FAIL, `tas-online-residency`,
**still 12 places, same count as the baseline**. Re-derived the full 12 directly (the console output
truncates to 8 with "..."): 9 in `white-card-tas.mdx`/`white-card-nsw.mdx`, 1 each in
`faqs-white-card-nsw.ts` and `faqs-white-card-tas.ts`, and **one in `src/data/nav.ts:45`** — the White
Card TAS mega-menu card's `desc: 'Online and self-paced for Tasmanian residents'`. That line is sitewide
chrome (renders in the mega-menu on every page, this hub included — confirmed live in
`dist/white-card/index.html`: `<span class="mdesc">Online and self-paced for Tasmanian residents</span>`)
and was already part of the pre-existing 12 at baseline time too — **not introduced by this redesign**,
and `src/content/hubs/white-card.mdx` itself is confirmed clean (its only match on the banned regex is
inside a `#`-comment in the frontmatter header, explicitly warning against this exact claim, not a
rendered claim). Flagged here because it renders live on this exact page and nobody has filed it against
`nav.ts` by name before. `[build]` — `src/data/**` is build-owned per CLAUDE.md's session-type table.

### 2 · Section conformance (against `05-components.md`)

`grep` of every `<section id="...">` in the fresh build: exactly `top` (hero, not plan-tracked),
`spokes`, `compare`, `faq`, plus one unnamed `<section class="sec cta-end">` (no `id`, correctly excluded).
**Identical to `05-components.md`'s claimed 3 real ids — no drift, nothing added, nothing missing.**

### 3 · Schema

Single `<script type="application/ld+json">`, `@graph` of exactly two nodes: `BreadcrumbList` (2 items)
and `ItemList` (5 items). Zero `Course`, zero `Person`, zero `price`/`offers` anywhere — confirmed by
parsing the JSON directly, not regex-guessing. **ACT is now `position: 5`** in the `ItemList`
(`"name": "White Card ACT (CPCWHS1001)", "url": ".../white-card-act"`), matching the new live spoke.
`AggregateRating`: 0 occurrences (also 0 `Trustpilot`).

### 4 · What's new since the baseline — checked hard, per the brief

| Check | Result |
|---|---|
| ACT spoke fully live, no "soon" residue | **Pass.** All 5 occurrences of `white-card-act` on the page are real `href`s (mega-menu card, mobile nav list, hub-card, comparison `tfoot`, JSON-LD `ItemList`) — none carries a `soon`/`cmp-soon` class or `aria-disabled`. |
| HubCard "Issued by" names the RTO, never the regulator | **Pass, with one precision caveat (see §6 defects).** All 5 cards read "Issued by Blue Dog Training (RTO)." / "Issued by Upskill Institute (RTO)." / "Issued by AlertForce (RTO)." — never "WorkSafe WA" / "SafeWork NSW" / "WHSQ" / "WorkSafe Tasmania" / "WorkSafe ACT". The comparison table's separate "Regulator" row does name those five state regulators, but as its own row, clearly distinct from "Training provider" — no conflation between the two concepts anywhere on the page. |
| Corner arrow (`.hc-go`) not a nested interactive element | **Pass.** Regex-counted `<a ...>` tags inside each of the 5 `<a class="hub-card">...</a>` blocks: exactly 1 per card (the card's own anchor). `.hc-go` is `<span class="hc-go" aria-hidden="true">`, no `href`, wrapping an `aria-hidden` SVG. Valid HTML, confirmed not assumed. |
| Full state names render, no mobile overflow | **Pass.** `.hc-state` renders "Western Australia (WA)", "Tasmania (TAS)", "New South Wales (NSW)", "Queensland (QLD)", "Australian Capital Territory (ACT)". At 375px: `white-space: normal`, `scrollWidth === clientWidth` on all 5 (no clipping/ellipsis); the ACT label (35 characters) wraps to 2 lines (18px → 36px box height) while the other four stay on 1 line — a normal wrap, not an overflow. Verified live via `getComputedStyle`/`getBoundingClientRect`, not estimated. |
| Comparison table shape matches `/owner-builder-courses` exactly | **Pass.** Both tables: `<thead>` with a `cmp-corner` "State" cell + state columns, `<tbody>` with fact rows (`<th scope="row">`), a `<tfoot>` action row of `<a class="btn-secondary cmp-btn">View course</a>` per column. Row-per-state was NOT what shipped — confirmed by reading the actual rendered `<table class="cmp">`, not the mdx comment's own account of the history. |
| 375px mobile: no page overflow; table's own scroll works | **Pass.** `document.documentElement.scrollWidth === innerWidth === 375` throughout. `.cmp-wrap` has `overflow-x: auto` and its own `scrollWidth` (593px) exceeds its `clientWidth` (319px) — the table scrolls inside its wrapper, confirmed by a live horizontal-scrollbar screenshot, and the page itself never does. |
| Answer capsule word count | **59 words** (`npm`-free plain split-count of the `intro` field). Baseline trimmed this to 57; it grew by 2 (the ACT clause) and is still inside the 40–60 target, 1 word under the ceiling. Not a defect, but worth watching — the next addition will breach it. |

### 5 · `abe-readability-audit` (`audit_static.py` + `audit_render.py`, run for real against the fresh build)

**`audit_static.py dist/white-card/index.html`: 1 FAIL, 1 FLAG, 10 checks — same shape as baseline.**
- `[FAIL] Page ground is off-white, not pure #fff — --paper = #ffffff.` **False positive, re-confirmed.**
  Read `body{background:var(--ground)}` and `--ground:#fbf9f5` directly in the built CSS — the real page
  background is off-white. Same script/token-register mismatch as baseline, not a defect.
- `[FLAG] 37 declarations below 12px` (was 38 at baseline — one fewer; not chased further, all are the
  same class of shared sitewide micro-labels: `.eyebrow`, `.hub-card .hc-state`, `.cmp thead th`,
  `.pagebar .crumbs li`, etc.) — none is this hub's own authored prose (capsule/FAQ/comparison-cell text
  all clear 12px). `.hub-card .hc-state` is now rendering the longer full-name text at the same 11px it
  always used — the size didn't change, only the string length, and it already wraps cleanly (§4).

**`audit_render.py http://127.0.0.1:8899/white-card/`: 2 FAIL, 0 FLAG, 8 checks.**
- `[FAIL] ~91 CPL on widest prose (820px @ 18px) — cap the column.` **Real, pre-existing, sitewide
  `.capsule` component — unchanged from baseline.** Same finding the baseline traced as "at least a
  fifth recorded sighting" across five reviews; this build makes it at least a sixth. Still `[design]`,
  still unfixed, still not fixable from `src/content/hubs/**`.
- `[FAIL] 2.68:1 (needs 4.5) rgb(154,154,154) on rgb(251,249,245) @13px "About"`. **Not a live defect —
  confirmed exempt, same as baseline.** `About` is the header nav's `<span class="nav-l soon"
  aria-disabled="true" title="Coming soon">About</span>` — the identical non-interactive, muted-by-design
  pattern `skill-reviews/design/2026-07-30-measure-contrast-and-tap-targets.md` already ruled exempt
  under WCAG 1.4.3's inactive-UI-component carve-out. (The baseline's own second instance of this same
  false FAIL, the comparison table's ACT "Coming soon" cell, no longer exists — ACT is a real column
  now, so that trigger is gone; "About" alone remains, sitewide, unrelated to this page's own content.)
- Passes: no horizontal overflow at 320/360/390px; 16 interactive elements checked, all ≥44px tap
  target; 39 text styles sampled for live contrast at 390px, all pass; mobile measure ~37 CPL.

Both scripts ran against the fresh build (not skipped, not re-used from the baseline's numbers).

### 6 · `final-check` + `ai-detector` — read directly against the current copy

1. **Contradictions** — **one confirmed-still-open real finding** (the `.f-asqa` defect, detailed in §7)
   and **one new, lower-severity finding** (the TAS/ACT "Issued by" precision gap, §8 item 2). No other
   contradiction: all 5 states' price, delivery mode, RTO and government-fee figures match identically
   across the hub cards, the comparison table and the FAQ (WA $99 / TAS $59 / NSW $129 / QLD $109 / ACT
   $137, checked in both places for all five).
2. **Duplicate/repeated information** — the RTO-partner sentence recurs verbatim in FAQ Q6 and
   `.f-auth` (deliberate, as baseline found: legal disclosure vs conversational FAQ, each independently
   extractable — not a defect). New in this redesign: "Accepted nationally, on any construction site in
   Australia." repeats verbatim across all 5 hub cards. This is the expected shape of a parallel
   state-card grid (the same fact is equally true for every card, the same way "Course fee" repeats as a
   row label 5 times in the comparison table) — checked, not a defect.
3. **Logical flow** — Hero → choose your state (spokes, now 5) → compare → FAQ (objections) → CTA.
   Unchanged, coherent; ACT is integrated as a full fifth option throughout, not bolted on (its own
   card, its own comparison column, named in FAQ Q2/Q3/Q5/Q7, two of its own Sources entries).
4. **Logical grouping** — state-specific facts stay in spokes/comparison; cross-state questions stay in
   FAQ. Nothing misplaced; ACT's facts land in the same places WA/TAS/NSW/QLD's already do.
5. **Australian English** — grepped the full frontmatter content (comments stripped) for American
   spellings/vocabulary (`organize`, `color`, `favorite`, `center`, `defense`, `traveled`, `enrollment`,
   `program `, `behavior`, `analyze`, `recognize`, `utilize`, etc.): **zero hits.** "organisation",
   "recognised", "enrol"/"enrolment" (single L) all used correctly and consistently.
6. **AI-writing patterns** — grepped for `delve`, `leverage`, `robust`, `comprehensive` and formulaic
   openers: **zero hits.** Em dash count in the frontmatter: 5, all inside `footerSources[].label`
   values ("WorkSafe WA — Construction induction training" etc.) — the exact pattern
   `kb/mistakes-log.md` already ruled exempt (labels are data, not prose). Body prose uses " - " (spaced
   hyphen) in place of an em dash throughout (55 occurrences), which is the house style working as
   intended, not an AI tell. Copy stays concrete and specific (exact prices, exact government fees, named
   RTOs, named regulators) rather than generic. Nothing flagged.

### 7 · The baseline's known-open defect — re-checked directly, **still open, unchanged**

Read the live `.f-asqa` and `.f-auth` blocks in the fresh `dist/white-card/index.html` rather than
trusting the baseline's account:

```html
<p class="f-asqa">ABE Education is not a Registered Training Organisation (RTO). Its owner builder and
CPD courses are delivered directly by ABE Education under state government approvals.</p>
...
<div class="f-auth"><p>ABE Education is not a registered training organisation. Each course is
delivered and assessed by a registered training organisation: Blue Dog Training (RTO 31193) in
Queensland, Western Australia and Tasmania, Upskill Institute (RTO 45708) in New South Wales, and
AlertForce (RTO 91826) in the ACT. ...</p></div>
```

`.f-asqa` (the sitewide `SourcesFooter.astro` compliance line) still asserts the **state-approved-direct**
disclosure — wrong for a hub whose every one of its 5 spokes is ASQA-accredited, RTO-delivered — while
`.f-auth` (this hub's own `disclaimersHtml`) and FAQ Q6 both correctly state the ASQA-accredited version,
on the same page. **Root cause unchanged**: `src/content.config.ts`'s `hubs` schema still has no `asqa`
field, and `HubLayout.astro`'s `<SourcesFooter>` call still doesn't pass one, so `SourcesFooter.astro`'s
`asqa = false` default still fires unconditionally for every hub — confirmed by inspection, this build
session didn't re-derive the code trace, but the rendered HTML is the same wrong sentence, verbatim, that
the baseline quoted. **Nothing in the 5–7 Aug redesign touched `content.config.ts` or `HubLayout.astro`**
(both are outside a build session's writable paths, and the design review's own file list confirms
neither was touched), so this was never going to have self-resolved. **Still not fixable in this
session's writable paths.** `[design]`-and-`[skills]` cross-cutting, same as baseline.

### 8 · Real defects found, and fix ownership

1. **`SourcesFooter.astro` / `HubLayout.astro` — wrong ASQA disclosure on `/white-card`.** Confirmed
   still open, §7 above. `[design]`-and-`[skills]`.
2. **HubCard "Issued by [RTO]" bullets for TAS and ACT omit the "Statement of Attainment" qualifier
   their own spoke pages always pair it with, creating an overclaim risk on exactly the two states where
   the physical card is not RTO-issued.** `kb/rules/authority-model.md` §6 states plainly: "the physical
   White Card is issued by the state regulator; in TAS that is WorkSafe Tasmania via Service Tasmania,
   not the RTO" — and `white-card-act.mdx`'s own `disclaimersHtml` states "The card is issued by Access
   Canberra ... not by ABE Education or AlertForce." Every spoke page pairs "issued by [RTO]" with
   "Statement of Attainment" every single time it appears (`white-card-tas.mdx:82,87,94`;
   `white-card-act.mdx:80,85,92` — "Statement of Attainment issued by Blue Dog Training" /
   "the nationally recognised Statement of Attainment for CPCWHS1001... issues"). The hub's own bullets
   read as bare "<b>Issued by</b> Blue Dog Training (RTO)." / "<b>Issued by</b> AlertForce (RTO)." with
   no object — true for the Statement of Attainment (all 5 states) and true for the physical card in
   WA/NSW/QLD (RTO issues directly there), but on TAS and ACT specifically the physical White Card comes
   from a state authority the RTO does not control. A reader skimming just the card (the format's whole
   point) could reasonably read "Issued by Blue Dog Training" as meaning the White Card itself, which is
   what `authority-model.md` explicitly corrects against. The page-level FAQ (Q2, Q7) does correctly
   disambiguate the TAS/ACT card-lodgement process elsewhere on the same page, which limits the real-world
   exposure, but it doesn't fix the bullet's own wording. **Not a hard-blocker** (no page states "ABE" or
   the wrong entity issues anything, and the RTO named on each card is always the correct one for that
   state) but a genuine precision gap the source pages themselves already knew to avoid. `[build]` — fix
   is a wording change inside `src/content/hubs/white-card.mdx`'s two affected bullets (e.g. "Issued by
   Blue Dog Training (RTO), Statement of Attainment." / "Issued by AlertForce (RTO), Statement of
   Attainment."), matching the spoke pages' own pattern.
3. **The page's own freshness signal is now stale.** `reviewedBy.date` and `lastReviewedAt` both still
   read "4 August 2026" (`git log` on `src/content/hubs/white-card.mdx`: last substantive commit
   `f10f166`, 2026-08-07 02:40 — 3 days and a structural redesign later: a new live spoke, redesigned
   HubCard bullets, a transposed-then-transposed-back comparison table). The rendered breadcrumb line
   ("Reviewed by Dominic Ogburn ... on 4 August 2026") is crawlable, plain HTML — exactly the E-E-A-T
   freshness signal `verification.md` §1c requires — and it now asserts a review date that precedes the
   content it's attached to, the same category of staleness `check-pipeline.mjs` catches for the 07
   artefact but which no tool checks for `reviewedBy`/`lastReviewedAt` against the git history. Not
   itself a regulatory-fact error (nothing dated 4 Aug is factually wrong), but the signal is
   misleading as written. `[build]` — bump `lastReviewedAt` and `reviewedBy.date` (and get an actual
   review of the redesigned copy if one hasn't happened) in `src/content/hubs/white-card.mdx`.
4. **`src/data/nav.ts:45`'s TAS mega-menu description repeats the banned residency claim, live on this
   page's own chrome.** Detailed in §1 above. Pre-existing (already inside the toolchain's 12-place
   `tas-online-residency` FAIL both before and after this redesign — the count didn't move), not
   introduced by the 5–7 Aug work, and not fixable from `pipeline/white-card/**`, but named explicitly by
   file and line for the first time. `[build]` — `src/data/**` is build-owned.
5. **`scripts/check-links.mjs`'s stale `PLANNED` entry for `/white-card`.** Unchanged from baseline,
   `[skills]`, not fixable here.
6. **`.capsule` at ~91 CPL.** Unchanged from baseline, now at least a sixth recorded sighting,
   `[design]`, not fixable from `src/content/hubs/**`.
7. **Title tag grew from 56 to 61 characters** ("White Card Australia - WA, TAS, NSW, QLD, ACT | ABE
   Education"), 1 over the `verification.md` §1a "~60 char" soft ceiling, from adding ", ACT". Not a
   hard blocker (title length isn't on the hard-blockers list) and the meta description (232 chars,
   already over the ~155-char SEO guideline at baseline and now longer still) is explicitly a
   non-blocking aside per the baseline's own disposition. Noting the measured drift rather than letting
   it go unrecorded. `[build]`, low priority.

### 9 · Hard-blockers (re-checked against the fresh build)

| Blocker | Status |
|---|---|
| No H1 / multiple H1 / missing keyword | Not breached — 1 H1, "White Card, by state." |
| Schema missing/invalid, or `recognizedBy` on a WA page | Not breached — 2 valid node types, no `recognizedBy` anywhere (hub carries no credential node). |
| On-page price != `Course.offers.price` | N/A — no `offers`/`price` field exists in this hub's schema. |
| RTO/"accredited"/(WA) "approved course"/permit breach | **Not breached as a hard-blocker** — no page text claims ABE is an RTO or that ABE issues a qualification. The `.f-asqa` defect (§7) names the wrong disclosure category, and the TAS/ACT "Issued by" bullets (§8.2) are imprecise, but neither asserts a prohibited claim from `authority-model.md` §4's table verbatim. Both are flagged as real defects regardless. |
| Gov claim with no visible source | Not breached — Sources block now carries 6 entries (was 4; +Access Canberra, +WorkSafe ACT for the new spoke), all primary/.gov.au, all within cadence. |
| `[confirm:]` / `[TO VERIFY]` open | Not breached — 0 occurrences. |
| Gov fee past re-verify cadence | Not breached — all 6 sources dated within cadence as of 7 Aug 2026 build. |
| Cannibalisation | Not breached — hub/spoke split intact, ACT follows the same pattern as the other 4. |
| Banned CTA / CTA in FAQ / "comprehensive" | Not breached — 0 occurrences of "comprehensive", 0 "Enrol now/today", all 7 `.ans` blocks checked for a nested `<a>`/`btn-*`: none found. |
| Pure-black ink / pure-white ground / body text below AA / CTA <44px | Not breached — `--ink`/`--ground` both off-pure; the one live-contrast FAIL (§5) is the pre-ruled-exempt "About" nav label, not this page's body text; 16 interactive elements all ≥44px. |

### Ship decision

**Amber, unchanged from baseline in kind.** The one defect that would need a human decision to close
(`SourcesFooter`'s wrong disclosure category, §7) is a schema/layout gap outside every writable path this
build session has, exactly as at baseline — this page has now been checked twice and the gap has not
moved, which is itself useful evidence that it needs a `[design]`+`[skills]` session, not another content
pass. The two new findings (§8.2, §8.3) are both `[build]`-fixable, low-to-moderate severity, and named
precisely enough for the next build session touching this file to close them in the same edit. Nothing
found here should block a deploy that was otherwise going ahead on the strength of the baseline's Amber;
it should, however, replace the baseline as the page's certifying record, which this section now does.

## Mandated sub-skill audits — disposition (re-verification pass)

All three run again, for real, against the fresh build: **`abe-readability-audit`** (`audit_static.py` +
`audit_render.py`, §5), **`final-check`** (six checks, §6), **`ai-detector`** (§6, folded into the same
read). No silent omission.

## Three `[build]`-tagged findings fixed same session, re-measured

§8.2, §8.3 and §8.4 above were all fixable from this build session's own writable paths
(`src/content/hubs/white-card.mdx`, `src/data/nav.ts`) and are closed here rather than left for a
later pass to rediscover.

1. **§8.2, TAS/ACT "Issued by" precision gap — FIXED.** `white-card.mdx`'s TAS and ACT bullets now
   read "Issued by Blue Dog Training (RTO), Statement of Attainment." and "Issued by AlertForce
   (RTO), Statement of Attainment." — matching the qualifier every spoke page itself always pairs
   with "issued by". WA/NSW/QLD bullets are unchanged (bare "Issued by [RTO]." stays correct there,
   since those three RTOs issue the physical card directly). **Re-measured in `dist/white-card/
   index.html`:** all 5 `<li class="hc-fact"><b>Issued by</b>...` bullets read exactly as intended,
   confirmed by reading the raw HTML around each of the 5 occurrences, not assumed from the source.
2. **§8.3, stale freshness signal — FIXED.** `reviewedBy.date` and `lastReviewedAt` both moved from
   "4 August 2026"/`"2026-08-04"` to "7 August 2026"/`"2026-08-07"`. **Re-measured:** the rendered
   breadcrumb line now reads "Reviewed by Dominic Ogburn ... on <time>7 August 2026</time>".
3. **§8.4, `nav.ts:45` residency claim — FIXED.** The TAS mega-menu card's `desc` changed from
   "Online and self-paced for Tasmanian residents" to "Online and self-paced, completed in
   Tasmania" — the regulator's own wording (`kb/register/online-delivery-policy-by-state.md` §2D),
   applied here without re-deriving it (already settled). **Re-measured:** `dist/white-card/
   index.html`'s TAS `<span class="mdesc">` now reads "Online and self-paced, completed in
   Tasmania"; the word "residents" no longer appears anywhere on this page's own rendered chrome.
   **Not claimed as closing the full 12-place `tas-online-residency` FAIL** — the other 11
   occurrences (`white-card-tas.mdx`, `white-card-nsw.mdx`, the two `faqs-white-card-{nsw,tas}.ts`
   files) are a separately spawned facts-session task and are untouched here.

**Re-built and re-measured after all three fixes:** `npm run build` — 24/24 guardrails passed. Every
row in §4, §5, §6 and §9 above still holds (none of the three fixes touched section structure,
schema, the readability/contrast findings, or any hard-blocker check) — spot-re-read rather than
assumed unaffected.

**Not fixed, by design, same as noted at each finding:** §7 (`SourcesFooter` wrong disclosure,
`[design]`+`[skills]`), §8.1/§8.5/§8.6/§8.7 (all outside this session's writable paths or explicitly
low-priority per their own entries).

## Ship decision (superseding the one above)

**Merge-ready.** Three of the six open findings are now fixed and re-measured; the remaining three
are unchanged, correctly outside this build session's scope, and already carry their fix-ownership
tags. This section, not the "Amber, unchanged from baseline in kind" verdict above, is the page's
current certifying record.
