# 07 · Stage 7 — Pre-deploy verification — `/white-card-act`

**Verdict: AMBER.** Authority-model handling, ASQA disclosure and the government-source citation gate
are all clean — the page's central risk (never attributing face-to-face delivery to WorkSafe ACT) is
handled correctly in all 7 places that fact appears. But the page carries one genuine, page-specific
content-duplication bug (a doubled "Who developed and checked this" wayfinder link in `#how-it-works`,
from a copy-paste of the manual `<SectionWayfinder>` pattern onto a `<ZSection>` that already renders
one via its own `next` prop) and one schema-accuracy defect inherited from the shared layout
(`hasCourseInstance.courseMode` is hardcoded to `"online"` for every course page, which is simply false
for this page — its entire differentiator from every other White Card spoke is that it is **not**
online). Neither is a hard-blocker under `verification.md`'s own list, but the courseMode error
directly contradicts the page's own primary claim in machine-readable form and should not ship
unexamined.

Graded independently, with no access to `01-source-map.md` through `04-content.md` or any skill-review
of this page.

---

## 1. Toolchain output

```
node scripts/check-pipeline.mjs --slug white-card-act
node scripts/check-claims.mjs   --slug white-card-act
node scripts/check-links.mjs    --slug white-card-act
node scripts/check-positions.mjs
```

**check-pipeline.mjs** (filtered to `white-card-act`):
```
FAIL  white-card-act: missing artefact(s) — 07 (pre-deploy verification)
OK    white-card-act: 8 section(s) match the plan
OK    white-card-act: 8 capsule(s) match 04-content.md (figures normalised)
```
The FAIL is expected and self-resolving: it fires because this file did not exist yet at the time of
the run. It names no other defect for this slug. Repo-wide: 5 failing, 1 warning, 32 ok.

**check-claims.mjs** (filtered to `white-card-act`): **0 of 30 findings match this slug.** No WARN or
FAIL names `white-card-act`. Repo-wide: 0 failing, 18 warning, 12 ok, 201 excluded.

**check-links.mjs** (filtered to `white-card-act`, run after `npm run build`): **0 of 4 findings match
this slug.** No WARN or FAIL names `white-card-act`. Repo-wide: 1 failing, 3 warning (both pre-existing,
elsewhere).

**check-positions.mjs** (no `--slug` flag; scans `src/content`, `src/data`, `src/components`,
`src/pages` for hand-curated banned-phrase positions): one FAIL, `tas-online-residency`, quoted in full:
```
FAIL  POSITION CONTRADICTS REGISTER (tas-online-residency) in 12 place(s): src\content\courses\white-card-nsw.mdx:156,
src\content\courses\white-card-tas.mdx:25, ...tas.mdx:57, ...tas.mdx:85, ...tas.mdx:103, ...tas.mdx:123,
...tas.mdx:139, ...tas.mdx:145 .... kb/register/online-delivery-policy-by-state.md §2D (and §3, "apply
this") — WorkSafe Tasmania's own wording is that GCIT must be "completed in Tasmania" — a location
condition, not a residency test...
```
Verified directly: this FAIL's 12 hit locations are all in `white-card-nsw.mdx` and `white-card-tas.mdx`
(the script caps its printed list at 8 and truncates with "..."). I re-ran the check's own banned-phrase
regexes (`Tasmanian resident`, `resident of Tasmania`, `evidence...residency`, `WA residents?`, and the
SafeWork NSW online-attribution pattern) directly against `src/content/courses/white-card-act.mdx` and
got **zero matches** — this FAIL does not name `white-card-act` and is a pre-existing TAS/NSW defect,
unrelated to this page. The three `OK` lines (wa-online-residency-shorthand, nsw-online-misattribution,
nav authority parity) are unaffected by this page either way.

**`npm run build`**: ran clean. `abe-guardrails: 24 page(s) passed.` (includes `white-card-act`). No
banned-CTA, authority-model, or other guardrail failure for this page.

---

## 2. Section conformance

`05-components.md`'s "Page section (id)" column names 8 real, backticked DOM ids:
`rto-partner`, `real`, `accepted`, `your-card`, `cost`, `how-it-works`, `content-review`, `faq`.

Rendered `<section id="...">` ids in `dist/white-card-act/index.html`, in document order:
`top` (Hero, no id claim in the plan — expected), `real`, `accepted`, `your-card`, `cost`,
`how-it-works`, `content-review`, `faq`, `rto-partner`.

All 8 planned ids render. No extra id renders beyond the plan (`top` is the Hero's own anchor id, not a
planned "Page section (id)" entry, and the plan's table itself lists Hero with `—` in that column).

One placement note, checked and confirmed **not** a defect: the table lists `rto-partner` second (right
after Hero), but it renders **last** (immediately before `CtaBand`). This matches the frontmatter
exactly — `partnerRto.placement: "after-body"` — and `CourseLayout.astro:179` renders the ASQA partner
block after `<slot />` (i.e., after the whole authored body) when `placement === 'after-body'`. The
table's row order is documentation convenience, not a page-order claim; the frontmatter's explicit
`placement` field is authoritative and correctly set.

Band rhythm (05-components.md's own claim): default(hero) → bg-alt(rto-partner, but see order note
above — actually default→bg-alt→default→bg-warm→bg-dark→default→bg-alt→default, reading the DOM order)
— confirmed no adjacent same-band pairs in the rendered HTML.

---

## 3. Artefact completeness

`pipeline/white-card-act/` holds:
- `01-source-map.md` ✓
- `02-gap.md` ✓
- `03-briefs.md` ✓
- `04-content.md` ✓
- `05-components.md` ✓
- `06-image-prompts.md` ✓
- `07-verification.md` ✓ (this file)

01–06 present before this run started; 07 written by this run. Complete.

---

## 4. Stage 7 checklist (`verification.md`)

### 1a · Structure & schema

| Item | Result | Evidence |
|---|---|---|
| One `<h1>`, carries target keyword | **Pass** | `grep` count = 1; content `"White Card ACT."` |
| Every other heading H2/H3, no cosmetic H6 | **Pass** | No `<h6>` in the document; section headings are `<h2 class="h2">`/`<h3 class="h3">` |
| JSON-LD present, valid, server-rendered | **Pass** | `JSON.parse()` on the extracted `<script type="application/ld+json">` succeeds; graph is `Course` + `EducationalOccupationalCredential` + `BreadcrumbList` + 1×`Person`, present in the raw HTML fetched over HTTP (not injected by JS) |
| `recognizedBy` matches authority model | **Pass** | asqa-accredited page: `EducationalOccupationalCredential.recognizedBy` = `{Organization, AlertForce, RTO 91826}` — the RTO, not a government regulator, not ABE. Not a WA page, so the WA-specific "must be absent" rule doesn't apply here |
| `Course.offers.price` = on-page price | **Pass** | Schema `offers.price` = `"137"`; hero/proof/PriceCard/CTA band all show `$137` |
| `AggregateRating` | **N/A (correctly absent)** | No review schema anywhere on the page, per the sitewide "never AggregateRating" rule |
| Meta: title ≤~60 chars, description, canonical, `lang="en-AU"`, breadcrumb | **Pass, one soft flag** | Title is 65 chars (`"White Card ACT - Nationally Recognised, Face-to-Face (CPCWHS1001)"`), 5 over the ~60 guideline — but TAS (64) and NSW (64) run the same length, so this is the established site convention for this course group, not a page-specific regression. Description 166 chars, present. `<link rel="canonical" href="https://www.abeeducation.edu.au/white-card-act">` present, no trailing slash. `<html lang="en-AU">`. Breadcrumb renders visually (`.pagebar .crumbs`) and as `BreadcrumbList` schema (3 items: Home → White Card → White Card ACT) |

**One real defect found here, outside the checklist's named rows:** `Course.hasCourseInstance.courseMode`
is `"online"` — see "Real defects" below.

### 1b · Authority language

| Item | Result | Evidence |
|---|---|---|
| No "RTO"/"nationally recognised"/"accredited"/"Statement of Attainment" misused | **Pass** | All four terms appear, correctly — this is an asqa-accredited page, so "nationally recognised" and "Statement of Attainment" are the page's *true* claims, always paired with the AlertForce/RTO 91826 attribution, never claimed for ABE |
| ASQA disclosure complete | **Pass, substance confirmed at all 8 locations** — see table below |

**ASQA disclosure — all 7 per-course locations + the sitewide footer, checked against
`kb/rules/asqa-disclosure-framework.md` directly:**

| # | Location | Present? | Quote |
|---|---|---|---|
| 1 | Hero inline (short form) | **Pass** (site convention, not verbatim template) | Hero tick: `"Delivered by **AlertForce (RTO 91826)** · Enrolled through ABE Education"`. Framework's literal template is `"Training delivered by..."`; this page uses the exact same shortened form as the already-live `/white-card-tas` (`"Delivered by Blue Dog Training (RTO 31193) · Enrolled through ABE Education"`) — an established site pattern, not an ACT-specific deviation |
| 2 | Near-CTA (ASQA template) | **Pass, in substance** | `PartnerDisclosure`'s `.pl-disc`: `"ABE Education recruits and markets this training on behalf of AlertForce Pty Ltd. AlertForce Pty Ltd is the registered training organisation responsible for developing, delivering and assessing this qualification and issuing certification, in accordance with the Standards for Registered Training Organisations 2025. ABE Education is not a registered training organisation."` Close paraphrase of the framework's template (adds "developing", omits the "verify at training.gov.au using RTO Code" sentence — that verification instruction lives in FAQ Q3 instead). Identical wording renders on all 5 White Card pages (WA/TAS/NSW/QLD/ACT) — a shared component, not this page's own text |
| 3 | Per-course footer legal disclosure | **Pass** | `.f-auth`: `"This website is operated by ABE Education (ABN 64 125 455 272) as an authorised third-party enrolment partner. This course is delivered and assessed by AlertForce, a nationally recognised Registered Training Organisation (RTO 91826) accredited by the Australian Skills Quality Authority (ASQA), which issues the Statement of Attainment on completion."` |
| 4 | Footer copyright bar | **Pass, in substance** | Rendered as prose inside the same `.f-auth` block rather than as 3 visually separate lines: `"Course: CPCWHS1001 Prepare to work safely in the construction industry. Training provider: AlertForce Pty Ltd (RTO 91826). Enrolment partner: ABE Education Pty Ltd (ABN 64 125 455 272)."` All three required facts present; sitewide layout pattern (identical on TAS/WA), not specific to this page |
| 5 | FAQ — 3 mandatory questions | **Pass** | Q1 "Who delivers this training?" → names AlertForce, RTO 91826, ASQA. Q2 "Who do I contact about a training or assessment problem?" → correctly splits ABE (enrolment/support) from AlertForce (training/assessment). Q3 "How do I verify the RTO?" → points to training.gov.au and RTO code 91826 |
| 6 | About Your Training Provider section | **Pass** | `#rto-partner` section, eyebrow "About your training provider", full `PartnerDisclosure` card: RTO name, number, verify link, unit code, contact email/phone, disclosure paragraph |
| 7 | T&Cs link | **Pass** | Footer Legal column: `<a href="/terms">Terms</a>` |
| 8 | Sitewide compliance footer (not one of the 7, separate requirement) | **Pass, in substance** | `.f-asqa`: `"ABE Education is not a Registered Training Organisation (RTO). Nationally recognised, ASQA-accredited training on this site is delivered and assessed by the named RTO partner shown on that course page, not by ABE Education."` This is a shortened, generic paraphrase of the framework's literal sitewide text (which names every RTO by state) — byte-identical across every checked page (TAS, WA, ACT), confirming it is the shared `SourcesFooter`/`BaseLayout` component's fixed copy, not page-specific. Pre-existing sitewide condition, not introduced by this build |

**Nowhere on the page is "ABE Education (RTO 91826)" stated** (the specific prohibited-wording row in
the framework) — every RTO-number pairing is with "AlertForce". No Blue Dog wording appears on this ACT
page. Confirmed clean against the framework's Key Prohibitions table.

### 1c · E-E-A-T & freshness

| Item | Result | Evidence |
|---|---|---|
| Breadcrumb freshness line, crawlable HTML | **Pass** | `.pagebar .reviewed`: `Reviewed by <a href="#content-review">Warwick Smith</a> on <time>4 August 2026</time>` — real anchor tag in body HTML, not style/comment/schema |
| Per-section verification block on gov-fact sections | **Pass** | 6 `.verified` blocks found — one each on `real`, `accepted`, `your-card`, `cost`, `how-it-works`, `faq` — each with a dated `✓ Verified` and a sourced link |
| Content-review section, named developer + reviewer with real profiles | **Pass** | `#content-review`: AlertForce credited as developer/owner/deliverer (Organization card, RTO 91826, verify link, real contact details), Warwick Smith as sole independent reviewer, linked to `/experts/warwick-smith` (built route — confirmed in `npm run build` output) |
| "Last verified: DD Mon YYYY" beside trust badges/gov-listing refs | **Pass** | Every sourced fact carries a dated verification (e.g. "Verified 22 Jul 2026 · fee current FY26-27", "Verified 4 Aug 2026", "Verified 3 Aug 2026") |

### 1d · Government-source citation gate

| Item | Result | Evidence |
|---|---|---|
| Every gov/legislative claim carries a visible citation | **Pass** | Fee ($47.00/$44.00), the 60-day application window, RTO registration/scope, delivery-mode non-restriction — all carry inline sourced citations |
| Consolidated Sources section, primary sources only | **Pass** | Footer `.f-sources`: training.gov.au (AlertForce RTO 91826 scope), Access Canberra (GCIC), WorkSafe ACT (White cards page), ACT legislation register (WHS Regulation 2011). All 4 are primary `.gov.au`/national-register sources, each dated. No aggregator/directory/blog source |
| No `[confirm: …]` / `[TO VERIFY]` left | **Pass** | Both strings absent from the built HTML |

### 1e · Cannibalisation & indexation

| Item | Result | Evidence |
|---|---|---|
| No other ABE page targets the same primary keyword | **Pass** | check-pipeline/check-claims/check-positions raise nothing for this slug; `/white-card` (hub) and `/act-owner-builder-course` are the only other pages linked, both non-competing (hub→spoke, cross-category) |
| No LearnWorlds path emitted; sitemap emitted | **Pass** | No `/course/`, `/program/`, `/payment` path anywhere in the page; `sitemap-index.xml` created in the build log |
| Internal links point up/down, not sideways | **Pass** | `/white-card` (hub, up), `/act-owner-builder-course` (cross-category, non-competing FAQ cross-sell — confirmed built at `dist/act-owner-builder-course/index.html`) |
| State content genuinely state-specific | **Pass** | Regulator (WorkSafe ACT), fee ($47.00 Access Canberra, FY26-27), process (ACT Digital Account, 60-day window), legislation (WHS Regulation 2011 (ACT)) — all ACT-specific facts, not a generic template with the state swapped |

### 1f · Banned-copy checks

| Item | Result | Evidence |
|---|---|---|
| No "comprehensive" | **Pass** | Absent from built HTML |
| No banned CTA wording | **Pass** | No "Enrol now"/"Enrol today"; CTAs read "See White Card options". `abe-guardrails` build check passed (24/24 pages) |
| No CTA inside answer capsule or FAQ answer | **Pass** | All 8 FAQ answers checked — none contains a CTA link or button. The only in-FAQ-area link is a cross-sell to `/act-owner-builder-course` inside an answer, which is informational, not a CTA. The "Ready? See White Card options" wayfinder sits *after* the whole `.faq` block, not inside an answer |
| No "verified" beside a Trustpilot reference | **Pass** | No Trustpilot reference on this page (AlertForce, not Blue Dog) |
| Image alt ≥80 chars | **Pass** | Checked frontmatter directly (both slots ship as FPO placeholders, so no rendered `<img alt>` to read): `artefactAlt` = 135 chars; `imgAlt` (ZSection) = 170 chars. Both well over the 80-char floor |
| OG/Twitter meta emitted | **Pass** | `og:title`, `og:description`, `og:url`, `og:type`, `og:site_name`, `og:locale`, `twitter:card`, `twitter:title`, `twitter:description` all present |

---

## 5. abe-readability-audit

Server: `npm run build` (clean), then `dist/` served at `http://127.0.0.1:8899/`, then both scripts run
against `http://127.0.0.1:8899/white-card-act/`. Server stopped after the run.

### `audit_static.py` — FAIL:1, FLAG:1, 10 checks

- **[FAIL] "Page ground is off-white, not pure #fff" — verified FALSE POSITIVE**, exactly the documented
  pattern in `verification.md`: the script read `--paper: #fff` rather than `body{background}`. Read the
  actual compiled CSS directly: `body{...background:var(--ground)...}` and `--ground:#fbf9f5`, a warm
  off-white — not pure `#fff`. `--paper` is the elevated-surface fill (cards/megamenu), never the page
  ground, per `CLAUDE.md`'s explicit `--ground`/`--paper` split. Not a real defect.
- **[FLAG] 41 declarations of text below 12px (11px / 11.5px)** — all are mono-uppercase micro-labels
  (`.eyebrow`, `.waynav .wl`, `.proof .l`, section markers, footer column headers, etc.), identical
  across the whole component library and present on every page site-wide, including the already-live
  `/white-card-tas`. Not introduced by this page; a design-register question if pursued at all, not a
  build-session-fixable item on this page's content.
- **[Pass]** Body font-size ≥16px (17px base), no justified/multi-column text, reading column has a
  measure cap, ink is off-black (#1a1a1a), exactly one H1, `lang="en-AU"`, all `<img>` have alt (0 of 2
  missing — both images are FPO placeholders with no `<img>` tag at all, so nothing to check here beyond
  the frontmatter alt values already confirmed in 1f above).

### `audit_render.py` — FAIL:3, FLAG:0, 8 checks

- **[FAIL] Live text contrast 1:1, `rgba(255,255,255,.92)` on `rgb(255,255,255)` @18px, "A nationally
  recognised Wh..." — verified FALSE POSITIVE**, the documented dark-background misread pattern. The
  text is `.capsule.on-dark` inside `<section class="sec bg-dark trust">`. Composited manually: `.capsule
  .on-dark` background is `#ffffff0f` (6% white) over `.bg-dark`'s `#1a1a1a`, giving an effective
  background of ~`rgb(40,40,40)`; the 92%-opacity white text composites to ~`rgb(238,238,238)`. Real
  contrast ≈ **12.7:1** against the capsule's own layer, ≈**15.0:1** against the base `bg-dark`. Not a
  real defect.
- **[FAIL] Desktop measure ~91 CPL on widest prose (820px @ 18px)** — real number, but **confirmed
  sitewide and pre-existing**: re-ran the identical script against the already-live, already-graded
  `/white-card-tas` and got the byte-identical result (`~91 CPL on widest prose (820px @ 18px)`). This is
  a shared component's measure cap (the `.capsule`/`.trust-lede` class), not something this page's own
  copy or build introduced. Belongs to `design` if pursued (component/token change), not fixable inside
  this page's own content.
- **[FAIL] "About" @13px, `rgb(154,154,154)` on `rgb(251,249,245)` = 2.68:1 (needs 4.5)** — real number,
  traced to the SiteHeader's disabled nav item: `<span class="nav-l soon" aria-disabled="true"
  title="Coming soon">About</span>`, styled `.site-head .nav-l.soon{color:var(--slate-light)}`. This is
  sitewide chrome rendered identically on every page (confirmed: same result on `/white-card-tas`), a
  deliberately muted "coming soon, disabled" treatment, not this page's content. `SiteHeader.astro` is
  design-owned; not a `white-card-act`-specific defect.
- **[Pass]** No horizontal overflow at 320/360/390px, tap targets ≥44px at 390px (13 elements checked,
  includes the primary CTA), mobile measure ~42 CPL at 390px.

**Readability audit conclusion:** zero page-specific readability defects found. All 3 render FAILs and
the 1 static FAIL either verified as the two documented false-positive classes, or confirmed
byte-identical on the already-shipped `/white-card-tas` (i.e., pre-existing sitewide conditions, not
regressions introduced by this build).

---

## 6. final-check + ai-detector

Read directly from the built HTML: hero, all 8 section capsules, all 8 FAQ answers, footer disclosure,
CTA copy.

- **Contradictions:** none. Price ($137 course / $47.00 application / $44.00 replacement / $184.00
  total), RTO identity (AlertForce, RTO 91826), delivery mode (face-to-face, not online), the 60-day
  application window, and the WorkSafe ACT non-mandate framing are all stated consistently across every
  section that touches them.
- **Duplicate/repeated information:** **one real finding** — see "Real defects" below (the doubled
  `#how-it-works` wayfinder link). Otherwise, the repeated "face-to-face, not a WorkSafe ACT requirement"
  framing across `accepted`/`how-it-works`/FAQ/footer is deliberate reinforcement of the page's one
  central regulatory nuance, each instance phrased distinctly rather than copy-pasted — appropriate, not
  a defect.
- **Logical flow:** hero → at-a-glance → is-it-real → accepted/online → getting-the-card → cost →
  trust band → how-it-works → content-review → FAQ → CTA. Same order as the sibling WA/TAS pages;
  answer-first throughout, each capsule leads with the direct answer before elaborating.
- **Logical grouping:** clean — nothing found sitting in the wrong section (e.g. the delivery-mode
  question is answered once, fully, in `#accepted`, and later sections reference rather than re-litigate
  it).
- **Australian English:** "recognised", "organisation", "licence" (noun, FAQ Q8: "ACT owner builder
  licence") all correctly spelled. No American vocabulary found.
- **AI-writing patterns:** no "delve/leverage/comprehensive/robust", no formulaic openers, no hedging.
  Voice is direct and specific ("That is the difference between a real White Card and a worthless
  certificate: the unit code and the RTO number, both verifiable, before any money changes hands."),
  consistent with the established house voice on the sibling WA/TAS/NSW/QLD pages.

`ai-detector`: no AI-generated-content signatures found (formulaic transitions, generic hedging,
unnaturally even sentence rhythm) in the reader-facing prose reviewed above.

---

## Hard-blockers — explicit re-check

| Hard-blocker | Status |
|---|---|
| No H1 / >1 H1 / H1 without keyword | **Clear** — 1 H1, contains "White Card ACT" |
| Schema missing/invalid, or `recognizedBy` on a WA page | **Clear** — JSON.parse succeeds, 0 errors; this is not a WA page |
| On-page price ≠ `Course.offers.price` | **Clear** — both $137 / "137" |
| RTO / accredited / (WA) approved-course / permit authority-model breach | **Clear** — see 1b table, no breach found anywhere including the WorkSafe ACT framing |
| Gov/legislative claim with no visible source, or missing Sources section | **Clear** — see 1d |
| Unresolved gov fact, or `[confirm: LW]` / `[TO VERIFY]` left open | **Clear** — both strings absent |
| Gov fee past re-verify cadence (1 July) not re-checked | **Clear** — Access Canberra fee verified 22 Jul 2026, current for FY26-27; next reset 1 Jul 2027 |
| Primary keyword already targeted by an existing ABE page | **Clear** — no cannibalisation found |
| Banned CTA / CTA in answer/FAQ block / "comprehensive" | **Clear** — see 1f |
| Pure-black ink / pure-white ground / body text below AA / primary CTA <44px | **Clear** — ink #1a1a1a, ground #fbf9f5 (the "pure white ground" tool FAIL is the documented false positive), tap targets confirmed ≥44px by render audit |

**No hard-blocker is tripped.** The two real defects found (below) sit outside the hard-blocker list as
written, but the schema one is close enough to the spirit of "schema accuracy" that it should not be
waved through silently.

---

## Real defects found

1. ~~**Duplicate `SectionWayfinder` in `#how-it-works`**~~ **Fixed same session, immediately after
   this finding.** Line 183 deleted from `src/content/courses/white-card-act.mdx`; rebuilt and
   confirmed only one "Who developed and checked this" link renders in `#how-it-works`. Left below
   as the record of what was found and how, per the strikethrough-not-delete convention.

   Original finding: **Duplicate `SectionWayfinder` in `#how-it-works` — real, page-specific, build-fixable.**
   `src/content/courses/white-card-act.mdx:168-184` passes `<ZSection next={{ label: "Who developed and
   checked this", href: "#content-review" }}>`, which per `ZSection.astro:39` already renders its own
   `<SectionWayfinder>` automatically after the image/body split. The MDX body **also** manually includes
   `<SectionWayfinder label="Who developed and checked this" href="#content-review" />` as a child at
   line 183 — the pattern correctly used elsewhere in the same file for plain `<Section>` components
   (which have no `next` prop of their own). The result, confirmed in the built HTML: two identical
   "Next → Who developed and checked this" links stacked in the same section, one inside `.z-body`, one
   immediately after it. Confirmed this is **not** inherited from the sibling pages: `white-card-tas.mdx`
   and `white-card-wa.mdx` both use `<ZSection next={{...}}>` without a redundant manual
   `<SectionWayfinder>` child — this is specific to this page's authoring, not a copy-paste of an
   existing site-wide bug.
   **Fix:** delete line 183 (`<SectionWayfinder label="Who developed and checked this" href="#content-review" />`)
   from inside the `<ZSection>` block; the `next` prop already covers it.
   **Owner: build** (`src/content/courses/white-card-act.mdx` is in the build session's writable paths).

2. **`Course.hasCourseInstance.courseMode` is hardcoded `"online"` for a page whose entire point is that
   it is not — real, but layout-owned, not page-fixable.** `src/layouts/CourseLayout.astro:89`:
   `hasCourseInstance: { '@type': 'CourseInstance', courseMode: 'online', ... }` — unconditional, with no
   frontmatter-driven branch. This happens to be true for WA/TAS (self-paced online) and NSW/QLD (live
   online), so it has shipped unnoticed on four pages, but it is factually wrong for `white-card-act`:
   the page states, in the hero, the glance grid, three FAQ answers, the footer disclaimer and the
   VerifiedSources blocks, that this course is delivered **face-to-face in a classroom, not online, ever**
   in the ACT. A crawler or rich-result validator reading the schema would learn the opposite of what the
   page itself says. This is not a page-content bug — `white-card-act.mdx` has no `courseMode` field to
   set, because the layout never exposes one — so it cannot be fixed inside this page's own frontmatter.
   **Fix would require:** adding a `courseMode` (or equivalent) field to the course content schema and
   threading it through `CourseLayout.astro`, or at minimum branching the hardcoded value off
   `hero.ticks`/a new frontmatter flag for classroom-only delivery.
   **Owner: design** (`src/layouts/CourseLayout.astro` is design-owned per `CLAUDE.md`) **and/or skills**
   (if a schema field addition is needed, `src/content.config.ts` is skills-owned). Not fixable within
   this build session's writable paths (`src/content/courses/**`, `src/data/faqs-*.ts`,
   `src/content/hubs/**`, `src/pages/**`) — flagging for routing rather than attempting a cross-boundary
   fix.

No other defects found. Every other checklist row, hard-blocker, and readability/final-check item is
clean or a verified false positive / pre-existing sitewide condition.

---

## Demand list

Tag every item: [skills] | [design] | [facts] | [build]

- ~~[build] `src/content/courses/white-card-act.mdx:183` — duplicate `<SectionWayfinder>` inside a
  `<ZSection next={...}>` block~~ fixed same session, line deleted, rebuilt and confirmed clean.
- [design] `CourseLayout.astro:89` `hasCourseInstance.courseMode` is hardcoded `"online"` for every
  course page regardless of actual delivery mode — wrong for `/white-card-act`, whose entire point is
  face-to-face-only delivery in the ACT. Needs a frontmatter-driven value (or at minimum a
  classroom/onsite branch), not a build-session content fix.
- [design] `audit_render.py`'s "Desktop measure ~91 CPL on widest prose (820px @ 18px)" FAIL is real and
  **shared sitewide** — confirmed byte-identical on the already-live `/white-card-tas`. Traces to the
  `.capsule`/`.trust-lede` component's max-width cap being wider than the 75-CPL evidence-based target at
  desktop widths. A design-register question if pursued, not this page's own defect.
- [design] `audit_render.py`'s "'About' @13px = 2.68:1" FAIL is real and **shared sitewide** — the
  SiteHeader's disabled `.nav-l.soon` "About (Coming soon)" nav item uses `--slate-light` (#9a9a9a),
  which fails AA against the page ground. Confirmed identical on `/white-card-tas`. Whether a
  disabled/coming-soon nav label needs to clear body-text AA is a design-register judgement call, not
  something this page introduced.

---

## Skills/scripts run — accounted for

- `abe-readability-audit`: run (both `audit_static.py` and `audit_render.py`), see §5.
- `final-check`: run, see §6.
- `ai-detector`: run, see §6.

All three named per `verification.md`'s requirement that `check-pipeline` FAILs a slug whose
`07-verification.md` does not name all three. None were skipped.
