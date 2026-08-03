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
