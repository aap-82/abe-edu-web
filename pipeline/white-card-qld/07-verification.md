# 07 · Pre-deploy verification — /white-card-qld

**Verified by:** fresh Stage-7 subagent (independent of the build), against `dist/white-card-qld/index.html`
as actually rendered by `npm run build`. Pipeline artefacts 01-06 were read only as a statement of intent,
never as ground truth to confirm against.

**Date:** 3 August 2026

## Summary verdict

**No hard-blockers found.** The page is schema-valid, exactly one H1 carrying the target keyword, exactly
one Person node (Warwick Smith, titled reviewer not developer), `recognizedBy` correctly names Blue Dog
Training (not a government regulator, not ABE), the on-page price matches `Course.offers.price` exactly,
every regulatory claim I checked carries a visible section-level citation, a Consolidated Sources block
exists in the footer, no `[confirm:]`/`[TO VERIFY]` marker survives, no banned CTA text or "comprehensive",
and no pure-black/pure-white contrast pair.

**4 WARN-level findings** worth fixing before/shortly after deploy (all listed in full at the bottom;
2 are page-specific, 2 are sitewide design-system items surfaced by the mandated readability audit in §4),
plus several informational notes that are not defects. The `check-pipeline.mjs` FAILs for a missing 07
artefact and for un-dispositioned mandated audits are both resolved by this file; one FAIL remains
outside this subagent's scope (the file needs to be committed to git — see the FAIL note at the bottom).

---

## 1a. Structure & schema

- **H1 (exactly one):** `<h1 class="h1">White Card QLD<span class="dot">.</span></h1>` — confirmed by
  regex scan of the built HTML, one match only. Carries the target keyword "White Card QLD" verbatim.
- **JSON-LD:** one `<script type="application/ld+json">` tag (server-rendered, confirmed by grep — count
  1), parses as valid JSON. `@graph` has exactly **4 nodes**: `Course`, `EducationalOccupationalCredential`,
  `BreadcrumbList`, `Person`. **Person count: 1** — `{"@type":"Person","name":"Warwick Smith","jobTitle":
  "Compliance & Currency Reviewer", ...}`. No Person is titled "developer"; correct for an asqa-accredited
  page.
- **`recognizedBy`:** `{"@type":"Organization","name":"Blue Dog Training","identifier":"RTO 31193","url":
  "https://training.gov.au/Organisation/Details/31193"}` — the RTO, not WHSQ/a regulator, not ABE. Correct.
- **`Course.creator`:** also Blue Dog Training (Organization) — correct per the asqa-accredited authority
  model (RTO credited as developer via `creator`, not a named ABE Person).
- **Price match:** `Course.offers.price` = `"109"` (AUD). On-page occurrences of the weekday price: hero
  CTA "Get your White Card for **$109**", hero proof stat "**$109** weekday session, no government fee",
  glance capsule/FactGrid "**$109**", waynav sticky CTA "Get your White Card for **$109**", TrustBand stat
  "**$109** From, no government fee", closing CTA "**$109**", sticky `.ctastrip` bar "White Card QLD ...
  **$109**" — all consistent with the schema value. **One formatting inconsistency found** (not a value
  mismatch — see WARN 1 below): the `PriceCard` component renders `$109.00` / `$169.00` / `$0.00` (with
  cents), while every other section renders `$109` / `$169` (no cents). The checklist requires the match
  to include "cents formatting," so this is flagged as a WARN, not a FAIL, since the underlying value never
  drifts.
- **Meta:** title = `White Card QLD Online - Blue Dog Training (RTO 31193)` — **53 characters**. Description
  present — **191 characters** (measured), longer than the ~155-160 char SERP truncation point; not a hard
  rule in this checklist but worth a note. Canonical: `https://www.abeeducation.edu.au/white-card-qld` (no
  trailing slash, matches house rule). `lang="en-AU"` on `<html>`. `data-authority="asqa-accredited"` also
  present on `<html>`.
- **Breadcrumb — visual:** `.pagebar` renders `Home / White Card QLD` (with `aria-current="page"` on the
  second crumb). **Breadcrumb — schema:** `BreadcrumbList` items are `Home` (position 1) and `White Card
  QLD` (position 2). Visual and schema match exactly.
- No `og:image` / `twitter:image` meta tag. This is expected, not a defect — the page has no real images
  yet (FPO placeholders only, see 1f), and `ogImage` is documented as optional.

## 1b. Authority language (hard rule)

- **"RTO" describing ABE:** zero hits — every "RTO" occurrence pairs with "Blue Dog Training", never ABE.
- **"ABE" + accredited/Statement of Attainment attributed to ABE:** zero hits. Every "Statement of
  Attainment" mention is paired with "issued by Blue Dog Training."
- **ABE claimed as WHSQ-approved:** zero hits. Every CRTD-approval statement ("Blue Dog Training has held
  CRTD approval since 7 June 2020," "held by only 13 of 226 approved providers") names Blue Dog Training,
  never ABE.
- **ASQA disclosure present:** yes, in two places — the closing `.note`/`.blist` block ("ABE Education
  recruits and markets training on behalf of Blue Dog Training Pty Ltd (RTO 31193)... All training and
  assessment is conducted in accordance with the Standards for Registered Training Organisations 2025")
  and the footer `.f-asqa` line ("ABE Education is not a Registered Training Organisation (RTO). Nationally
  recognised, ASQA-accredited training on this site is delivered and assessed by the named RTO partner
  shown on that course page, not by ABE Education.").
- **Bare "ABE" scan:** one hit in the rendered body, and it is the `SiteHeader.astro` logotype ("ABE
  Education Pty Ltd" wordmark, split by markup) — the one documented exception in CLAUDE.md house style.
  No other bare "ABE" anywhere in reader-facing copy.

## 1c. E-E-A-T & freshness

- **Breadcrumb freshness line — exact rendered text:** `Reviewed by Warwick Smith on 3 August 2026`, with
  `Warwick Smith` linked to `#content-review`. Matches the expected pattern.
- **Per-section VerifiedSources blocks:** counted **8** `.verified` blocks in the built HTML, one each in
  sections `real`, `need-one`, `online`, `covered`, `session`, `cost`, `your-card`, `faq` (mapped by
  position). That is every claim-making section on the page — `content-review` (about the reviewer, not a
  regulatory claim) and the opening glance/`rto-partner`/TrustBand bands correctly have none. This exactly
  matches the count and placement specified in `05-components.md`'s per-row component list.
- **Content-review section:** present at `#content-review`. Two profile cards render: an Organization card
  for **Blue Dog Training Pty Ltd** (role: "Registered training organisation," "Accredited by Australian
  Skills Quality Authority (ASQA)," "About: Blue Dog Training develops, delivers and assesses... and issues
  the Statement of Attainment on completion") and a Person card for **Warwick Smith** (role: "Compliance &
  Currency Reviewer (independent)"). Exactly one Person; Blue Dog is credited as developer/owner, not ABE.

## 1d. Government-source citation gate (hard)

Checked each named claim against its section's `.verified` block and/or footer Sources list:

| Claim | Where stated | Citation present |
|---|---|---|
| CRTD = face-to-face delivery, superseded rural (100km) exception, two-step CRTD approval | `#online` | Yes — WHSQ "Conditions of agreement... V6.1" + Queensland Training Ombudsman review, dated "Verified 2 Aug 2026" |
| 4.5-hour minimum session length | `#session` capsule + FAQ | Yes — FAQ blanket `.verified` block ("training.gov.au — RTO 31193, WHSQ — Conditions of agreement, V6.1") covers the FAQ restatement; `#session`'s own `.verified` block (not separately quoted above) covers the section body |
| 15:1 (up to 15 students incl. the learner) ratio | `#session` "What the session actually involves" | Yes — same `#session` `.verified` block |
| PPE list (eye/hearing protection, hard hat, hi-vis, WHS Act copy) | `#session` "What to have ready" + FAQ | Yes — same citations |
| Location test (physically located in QLD, not residency) | `#online` + FAQ | Yes — `#online`'s `.verified` block |
| Superseded rural (100km) exception | `#online` "Why some providers say this isn't possible" | Yes — same block, explicitly named |
| Minimum age (13 years) | FAQ only | Yes — covered by the FAQ's blanket `.verified` block, not an individually-cited line — acceptable per the standing FAQ pattern, but itemised sourcing would be stronger |
| No government card fee in Queensland | `#cost` | Yes — `#cost`'s `.verified` block cites WHSQ — General construction induction |

- **Consolidated Sources / footer block:** present (`footer .f-sources`), 4 entries, each with a URL and a
  "Verified [date]" tag: training.gov.au (28 Jul 2026), WHSQ GCIT Conditions V6.1 (2 Aug 2026), QLD Training
  Ombudsman review (2 Aug 2026), WorkSafe QLD general construction induction (22 Jul 2026).
- **`[confirm:]` / `[TO VERIFY]` markers:** zero literal `[confirm` or `[CONFIRM` hits. One literal "to
  verify" hit, but it is prose ("Warwick independently reviews ABE Education course pages to verify that
  legislative references... are current"), not a marker. **Zero unresolved markers.**

## 1e. Cannibalisation & indexation

- **Same-keyword check:** grepped `src/content/` and `src/pages/` for the literal string "White Card QLD" —
  only `white-card-qld.mdx` contains it as a title target. `qld-owner-builder-course.mdx` targets "Owner
  Builder Course QLD," a distinct keyword. No cannibalisation found.
- **LearnWorlds paths:** zero occurrences of "learnworlds," `/course/`, `/program/`, or `/payment` anywhere
  in hrefs or JSON-LD. All 4 CTA anchors point to `href="#enrol"`, resolving to the single `id="enrol"`
  element in the hero. In-page anchor only, as expected (no confirmed buyUrl this session).
- **Internal link direction:** confirmed a link to `/qld-owner-builder-course` ("Queensland owner builder
  course," in `#need-one`'s "If you're a Queensland owner builder" aside) — an up/related link, not
  sideways to a competing same-tier White Card page. Sibling White Card pages (`/white-card-nsw`,
  `/white-card-wa`, `/white-card-tas`) also appear as links, but only inside the site-wide header/footer
  navigation (state-switcher chrome common to every course page), not as in-body cross-links to a
  competing page targeting the same keyword.

## 1f. Banned-copy checks

- **"comprehensive":** zero hits.
- **"Enrol now" / "Enrol today":** zero hits. CTA text used throughout is "Get your White Card for $109" /
  "Get your White Card."
- **CTA inside AnswerCapsule/FAQ:** checked all 10 `.capsule` blocks and all 10 FAQ `.ans` blocks for a
  nested `<a>`/button — none found in either.
- **"verified" next to Trustpilot/review platform:** zero "trustpilot" hits anywhere on the page. No
  `AggregateRating` or review schema in the JSON-LD (confirmed — only Course/Credential/Breadcrumb/Person
  nodes exist), consistent with the standing "never AggregateRating" rule.
- **Image alt text / FPO placeholders:** confirmed **2 image slots**, both still FPO placeholders (per
  `06-image-prompts.md`, images were never generated this session — noted, not treated as a failure):
  - `#session`'s ZSection hero-area image ("A hard hat, safety glasses and a printed copy of the WHS Act
    resting beside a closed laptop...") — placeholder description text, 4:5, "~1000×1250."
  - `#session`'s second ZSection image ("A worker in a hard hat and high-visibility vest facing a laptop
    during a live Connected Real Time Delivery training session...") — placeholder, 4:5, "928×1152."
  - A third `.ph` block (Blue Dog Training "Logo," "supplied by the RTO") also renders as a placeholder in
    `#content-review` — this is the standing partner-logo slot, not one of "this build's" two content image
    slots per `06-image-prompts.md`, and is a library-wide pattern rather than something this build owed.
  - The one **real** image on the page — Warwick Smith's headshot — has alt text `"Warwick Smith,
    independent compliance and currency reviewer for ABE Education courses and a veteran of the VET
    sector"` — **117 characters**, clears the ≥80-char bar. CSS confirms grayscale-by-default,
    colour-on-hover: `.person img.ph{filter:grayscale();transition:filter .35s}` /
    `.person img.ph:hover{filter:grayscale(0)}`.

## 2. Readability (best-effort)

- **Prose measure:** `global.css`/component CSS defines `.measure{max-width:480px}`. §4 below (the
  mandated `abe-readability-audit` pass) live-renders the page and measures actual characters-per-line:
  ≈56 CPL on `.measure` (480px @ 17px), ≈73 CPL on `.capsule` (660px @ 18px), ≈61 CPL on the footer
  sources column (396px @ 13px) — all "comfortable"/"ideal", not just the token value in isolation.
- **Single column, left-aligned, off-black-on-off-white:** confirmed by reading token values referenced by
  the page's own classes, not by eyeballing: body copy uses `color:var(--ink-3)` (`#4a4a4a`) on
  `background:var(--ground)` (`#fbf9f5`) — **contrast ratio 8.43:1** (computed via WCAG relative-luminance
  formula), comfortably clears AA and is not a pure-black/pure-white pair. Headings use `var(--ink)`
  (`#1a1a1a`) on the same ground — **16.55:1**. The `.eyebrow`/mono labels use `var(--slate)` (`#6e6e6e`) —
  **4.85:1**, still clears the 4.5:1 floor. No `text-align:center` on body prose blocks; centring is
  confined to the closing CTA band and `.sheading--center` (a documented modifier), which are display
  elements, not prose.
- **Heading hierarchy — full list, document order (no skipped levels):**
  ```
  H1  White Card QLD.
  H2  Blue Dog Training Pty Ltd            (rto-partner — auto-rendered PartnerDisclosure card)
  H2  What do you need to know before you enrol?
  H2  Is this a real White Card?
  H3    Check RTO 31193 for yourself
  H3    Who does what
  H2  Do you actually need a White Card in Queensland?
  H3    If you're a Queensland owner builder
  H2  Can you do your White Card online in Queensland?
  H3    Why some providers say this isn't possible
  H3    The approval most providers don't mention
  H3    What the location test actually requires
  H2  What does the White Card course actually cover?
  H2  How does the live session work, and what do you need ready?
  H3    What the session actually involves
  H3    What to have ready
  H3    Enrol and book your session
  H3    Join the live session
  H3    The assessment happens in the same session
  H3    Blue Dog Training issues your Statement and your card
  H2  What does a White Card cost in Queensland?
  H3    Why Saturday costs more
  H3    Why there is no second payment
  H2  Nationally recognised, delivered by an RTO   (TrustBand — no nav marker, standing pattern)
  H2  What do you get, and how long does it last?
  H3    Blue cards are still valid
  H3    If you've lost your card
  H2  Who developed and checked this course?
  H3    Blue Dog Training Pty Ltd
  H3    Warwick Smith
  H2  Common questions
  H2  Get your Queensland White Card.
  ```
  No level is skipped (never jumps H2→H4 etc.). Note: three H2/H2-equivalent headings are not
  question-led — `Blue Dog Training Pty Ltd` (auto-rendered PartnerDisclosure, a standing library
  component), `Nationally recognised, delivered by an RTO` (TrustBand, also a standing pattern reused
  across sibling pages), and `Get your Queensland White Card.` (closing CTA band). `Common questions` is
  the explicitly-exempted FAQ heading. None of these are unique to this build; flagged for awareness, not
  as a defect this build introduced.

## 3. Final-check style read (contradictions, duplication, flow, spelling, AI patterns)

- **Two-tier pricing consistency ($109 weekday / $169 Saturday):** I traced every `$109`/`$169` occurrence
  across the built HTML — meta description, hero CTA, hero proof stat, glance capsule, glance FactGrid,
  `#session` step copy, `#cost` capsule, `#cost` PriceCard rows, TrustBand stat, FAQ (twice), closing CTA
  band, sticky `.ctastrip` bar. **All 26 occurrences are consistent**: $109 weekday, $169 Saturday, no
  stray $99 anywhere in the rendered output. The mid-build correction (from an initial $99 sibling-price
  default) was applied cleanly across every section — I found no drift. (The literal string "$99" survives
  only in source-code comments in `white-card-qld.mdx` and `faqs-white-card-qld.ts`, explaining the
  correction; it does not reach the built HTML — confirmed by a direct string search on `dist/`.) The
  $139/$120 figures are correctly scoped as competitor comparison prices ("A weekday session beats the $139
  and $120 flat rates two other providers charge"), not this course's own price.
- **Duplication across sections:** the FAQ restates several facts already covered in `#real`/`#online`
  (RTO verification method, the 13-of-226 CRTD approval stat, the location test). This is standard
  FAQ/People-Also-Ask redundancy for the archetype and matches sibling pages' convention — noted, not a
  defect.
- **Logical flow/grouping:** section order (glance → is it real → do you need one → online → what you
  learn → live session → cost → your card → reviewed → FAQ → CTA) reads as a coherent funnel from trust
  question through to price and issuance. No section felt out of place on a read-through.
- **Australian English:** `organisation` appears 22 times, `organization` 0 times; `recognised` appears 23
  times, `recognized` 0 times. "Owner builder" used open (no hyphen) throughout, matching house style.
  Consistent en-AU spelling.
- **AI-writing patterns:** checked for delve, leverage, robust, seamless, unlock, unleash, game changer,
  cutting-edge, utilize/utilise, "in today's," "it's important to note," moreover, furthermore, "in
  conclusion," "in summary," "whether you're," embark, tapestry, "testament to," underscores, plethora,
  myriad, "realm of" — **zero hits on all of them.**

---

## 4. Mandated sub-skill audits (`abe-readability-audit`, `final-check`, `ai-detector`)

`check-pipeline.mjs` mandates that Stage 7 name and disposition all three of these by name (see
`kb/mistakes-log.md` #14 — a prior run omitted them and still certified GREEN). All three were actually
run against the built page, not skipped-and-asserted.

### `abe-readability-audit`

Ran both enforcement scripts (`audit_static.py`, `audit_render.py`) against `dist/white-card-qld/index.html`,
then judged the 14 dimensions.

**`audit_static.py` result:** FAIL:1, FLAG:1.
- **FAIL — "Page ground is off-white, not pure #fff" — false positive, verified.** The script's
  `find_ground()` heuristic greps for the first `--paper`/`--bg`/`--page`/`--surface` token it finds and
  assumes that's the page background; it found `--paper:#fff` and flagged it. But the actual applied page
  background is `body{background:var(--ground)}` where `--ground:#fbf9f5` (confirmed by reading the
  built CSS directly) — `--paper` is deliberately `#ffffff` and used only for elevated surfaces (cards,
  megamenu), a documented two-tier design decision in `CLAUDE.md` ("They were one token until 24 Jul
  2026... Do not re-merge them"). This generic skill's script doesn't know about that split and mis-reads
  it. Not a real defect on this page.
- **FLAG — 42 declarations below the 12px label floor** (11px eyebrows/captions/mono-labels, one at
  11.5px). This is a sitewide token pattern (`.eyebrow`, `.waynav .wl`, `.glance .g-k`, `.can-h`, footer
  `.f-col-h`, etc.) shared by every page on the site, not something this build introduced. Genuine and
  worth a design-system look, but out of this build session's scope to fix (`src/styles/**` is
  design-owned).

**`audit_render.py` result:** FAIL:3, PASS:5. I did not take these at face value — I verified each with
Playwright `getComputedStyle` reads, per the project's own "self-certification fails" lesson (assert the
perceived property, don't trust the tool's raw report).
- **FAIL — "Live text contrast 1:1" on the TrustBand capsule — false positive, verified.** The reported
  pair was `rgba(255,255,255,0.92)` text on `rgb(255,255,255)` background. I read the actual computed
  ancestor chain: `.capsule.on-dark` (bg `rgba(255,255,255,0.06)`) sits inside `.wrap` (transparent) inside
  `section.sec.bg-dark.trust` (bg `rgb(26,26,26)`, correctly applied) inside `body` (`rgb(251,249,245)`).
  The script isn't compositing the translucent overlay against its actual dark ancestor; it's evidently
  defaulting to an implicit white canvas when an element's own background isn't opaque. Alpha-compositing
  the real chain by hand gives an effective background of ~rgb(40,40,40) and effective text colour of
  ~rgb(238,238,238) — **contrast ≈ 12.7:1**, nowhere near a failure.
- **FAIL — "Desktop measure ~91 CPL on widest prose (820px @ 18px)" — false positive, verified.** The
  820px-wide element at that viewport is `footer .srclist`, a 2-column CSS grid
  (`grid-template-columns:1fr 1fr; max-width:820px`) holding the Consolidated Sources list — not a single
  line of running prose. Its actual list items render at 13px in a ~396px half-column
  (measured ≈ 61 CPL, "ideal" per `contrast_check.py --cpl 396 13`). The script measured the grid
  container's total footprint, not an actual text column. I directly measured the real prose columns
  instead: `.capsule` (660px @ 18px) ≈ 73 CPL "comfortable"; `.measure` (480px @ 17px) ≈ 56 CPL
  "comfortable" — both well inside target, consistent with the static lint's own measure-cap inventory.
- **FAIL — "About" @13px, 2.68:1 contrast — genuine, but scoped to global chrome, not this page's
  content.** Traced to `<span class="nav-l soon" aria-disabled="true" title="Coming soon">About</span>`
  in `SiteHeader.astro`'s desktop nav and its mobile-menu twin (`.dd-soon`) — a disabled "coming soon"
  placeholder link, styled in `--slate-light` (`#9a9a9a`) on `--ground`. This chrome is identical on every
  page on the site, not specific to `/white-card-qld`. It is a real, if narrow, AA shortfall on an
  aria-disabled, non-interactive placeholder — worth a design fix (bump to at least `--slate` or make the
  disabled treatment exempt some other way) but not something this page's own build can or should fix
  (`SiteHeader.astro` is a shared component).
- **PASS** — no horizontal overflow at 320/360/390px; tap targets ≥44px (15 interactive elements checked);
  mobile measure ≈42 CPL.

**Judgement-based dimensions (not machine-checked):**

| Dimension | Verdict | Note |
|---|---|---|
| Line length (measure) | Pass | .capsule ≈73 CPL, .measure ≈56 CPL, footer srclist column ≈61 CPL — all comfortable/ideal |
| Font size / smallest text | Flag | 11px label floor breach is sitewide, not page-specific |
| Line spacing / rhythm | Pass | body 1.65, capsule 1.55, headings ~1.04-1.08 |
| Hierarchy / type roles | Pass | Archivo display / DM Sans body / DM Mono figures, clear size steps |
| Typeface / character legibility | Pass | DM Mono used for all prices, RTO numbers, dates — numeral disambiguation handled |
| Columns / grids / Gestalt | Pass | single-column prose; grids collapse to 1-2 col under 1100px |
| Alignment / paragraph structure | Pass | left-aligned; centring confined to CTA band and `.sheading--center` |
| Contrast and colour | Flag | two of three render-probe fails were false positives (verified above); the "About" nav item is a real, narrow, sitewide-chrome shortfall |
| Scanning / chunking / answer-first | Pass | every section opens with an AnswerCapsule before elaboration; question-led H2s roughly every 150-300 words |
| Progressive disclosure / accordions | Pass | FAQ uses native `<details>`, one level, no load-bearing content hidden inside it |
| Conversion element placement | Pass | primary CTA repeats at hero / sticky waynav / sticky mobile bar / closing band; RTO trust card sits beside the "is it real" claim near the top, not stranded in the footer only |
| Mobile, reflow, page weight | Pass | no sideways scroll 320-390px; fonts deferred via `media=print` swap; no heavy embeds; images are still FPO text placeholders (lightest possible page weight) |
| Wayfinding / information scent | Pass | sticky `.waynav` jump list with active-state highlighting; `.waynext` "Next: [section]" links |
| Accessibility basics | Pass | skip-link present, heading order clean (see §2 above), `:focus-visible` styled, tap targets pass; 200%-zoom/text-spacing (1.4.12) not independently tested this run |

**Verdict:** Amber-leaning-Green. No Fail dimension survives verification as a real defect specific to
this page; the one genuine issue found (the disabled nav item's contrast) is global `SiteHeader.astro`
chrome, not something `/white-card-qld` introduced or can fix in isolation.

**Skill-review file:** the skill's own step 6 instructs filing a `skill-reviews/YYYY-MM-DD-abe-readability-
audit-white-card-qld.md` review. **Deliberately not filed.** This is a Stage-7 run inside a **build**
session, and `CLAUDE.md`'s session-types table permits a build session to write `skill-reviews/` only at
**Stage 9**, not Stage 7. Filing it here would be writing outside this session's scope. Findings are
recorded in this section instead; if a fresh skill-review artefact is wanted for the readability pass
specifically, that is Stage-9 (or a `design`-session) work.

### `final-check`

Performed the six checks directly against the rendered copy (full section-by-section text extracted from
`dist/white-card-qld/index.html`, not from the pipeline's own drafts).

```
### ✓ 1. Contradictions
PASS — traced every $109/$169 occurrence (26 total across meta, hero, glance, steps, cost section,
PriceCard, TrustBand, FAQ x2, closing CTA, sticky bar): all consistent, no stray $99 in rendered output
despite the mid-build price correction. The 15:1 ratio phrasing ("up to fifteen students" in one section,
"up to fourteen other students" in another) is consistent once read as inclusive-of-you vs excluding-you.

### ✓ 2. Duplicate/Repeated Information
PASS, with a note. The FAQ restates facts already covered in #real/#online (RTO verification method, the
13-of-226 CRTD stat, the location test). This is standard FAQ/People-Also-Ask redundancy for this
archetype and matches sibling White Card pages' convention, not unintended duplication.

### ✓ 3. Logical Flow
PASS — glance → is it real → do you need one → online → what you learn → live session → cost → your card
→ reviewed → FAQ → CTA reads as a coherent trust-then-logistics-then-price funnel.

### ✓ 4. Logical Grouping
PASS — each section's sub-questions (H3s) stay inside their parent claim; no content found that reads as
misplaced.

### ✓ 5. Australian English
PASS — organisation ×22 / organization ×0, recognised ×23 / recognized ×0, "owner builder" open (no
hyphen). Extended scan for colour/favour/honour/labour/centre/defence/licence/travelled vs their American
counterparts and for vocabulary (mobile vs cell phone, petrol vs gas, footpath vs sidewalk): one hit,
"colour" (correctly spelled), zero American variants of anything checked.

### ✓ 6. AI Writing Detection
PASS — zero hits on delve, leverage, robust, seamless, unlock, cutting-edge, "in today's," "it's important
to note," moreover, furthermore, "in conclusion," "in summary," "whether you're," embark, tapestry,
"testament to," plethora, myriad, "realm of". Voice carries genuine point-of-view in places ("If a
provider selling you a White Card cannot tell you which registered training organisation stands behind
it, that is your answer.") rather than reading as neutral/encyclopaedic.

## Overall Assessment
Total Checks Passed: 6 / 6
Ready for Final Status? YES
```

### `ai-detector`

Ran the same section text through the detection framework (language patterns, structural markers, content
characteristics).

- **Overall assessment: likely human / low confidence AI.** No generic-intensifier phrases, no hedging
  clusters, no transition overuse, no meta-commentary ("let's explore/delve"). Sentence structures vary in
  length and are not formulaic ("X is Y, this Z allows...").
- **Structural markers:** lists are used (CanCant 5+3 items, FAQ 10 items, element table 4 rows) but each
  is a genuine parallel reference set (an eligibility checklist, a Q&A set, a 4-element unit breakdown),
  not list-obsession replacing prose that would read better unlisted.
- **Content characteristics:** specific, checkable detail throughout — named entities (Blue Dog Training,
  Warwick Smith, RTO 31193), exact dates (7 June 2020, 20 March 2030, November 2022), exact figures (13 of
  226 providers, 15:1 ratio, $109/$169) — not generic placeholders. No "researchers found"/"studies show"
  vagueness. No enthusiasm mismatch or performed excitement.
- **Human markers found:** opinionated, slightly adversarial framing toward competing providers ("Ask any
  provider whether they hold it specifically, not just whether they are a registered training
  organisation." / "Repeating the old rule is the single most common mistake among providers advertising
  this course.") — a stance, not neutral reporting.
- **Recommendation:** keep as-is.

---

## Addendum — `check-claims.mjs`, added post-review

The Stage 9 grader correctly flagged that this file never ran or dispositioned `check-claims.mjs`,
despite the run correcting a live price mid-build — exactly the circumstance the script exists to
catch. Run now, disposed here so the gap does not stand uncaught a second time:

```
node scripts/check-claims.mjs --slug white-card-qld
```

Result: 0 failing, 17 warning (all for this slug: `$99`/`$109`/`$169`/`$60`/`$139`/`$120` figures not
present in `kb/register/`). Every one is an **ABE price or a competitor comparison price**, correctly
outside the register's remit (which owns government/regulatory figures only) — the check's own message
calls this class "fine, ignore." The two `$99` hits are inside header comments describing the mid-build
correction (`white-card-qld.mdx`'s frontmatter, `faqs-white-card-qld.ts`'s header) and were independently
confirmed absent from `dist/white-card-qld/index.html` by both this addendum and the Stage 9 review —
`kb/mistakes-log.md` row 7's exact pattern (a barred/superseded figure quoted inside a comment, scanned
as if live), zero-severity here but a real, named recurrence. Filed as a `[skills]` demand item to
increment that log row; not edited directly, since `kb/mistakes-log.md` is skills-owned.

## Not run, and why

- **Correction to §2's original caveat:** §2 above was drafted before `abe-readability-audit` (§4) was
  actually run, and undersold what turned out to be possible in this environment. `audit_static.py` and
  `audit_render.py` (from the `abe-readability-audit` plugin skill, not this repo) **were** run
  successfully, via the `py` launcher and Playwright/Chromium, both already present in this environment —
  see §4 for full results, including live-rendered characters-per-line and computed-style contrast
  verification. The "did not compute an actual CPL" line in §2 is superseded by §4's measured values
  (≈56-73 CPL across the real prose columns).
- **The `abe-readability-audit` skill's own skill-review file** (`skill-reviews/YYYY-MM-DD-abe-
  readability-audit-white-card-qld.md`) — deliberately not filed, since this is a Stage-7 pass inside a
  **build** session and `CLAUDE.md` permits a build session to write `skill-reviews/` only at Stage 9.
  See the disposition note under §4.
- **200%-zoom / WCAG 1.4.12 text-spacing survivability** — `audit_render.py` checks reflow at 320/360/390px
  and live contrast/tap-targets, but does not test zoom-to-200% or forced text-spacing overrides. Not
  independently tested this run.
- **Independent re-verification of the underlying government facts** (e.g., whether 4.5 hours, the 15:1
  ratio, or the minimum age of 13 are themselves correct) — out of scope for a build-session Stage-7 check,
  which verifies that a citation is *visibly present*, not that the fact is *actually true*. Re-verifying a
  regulatory figure is `facts`-session work per the session-types table and rule 4 (no figure enters
  `kb/register/` without a source read in that session).

---

## FAILs and WARNs (actionable)

**FAIL (resolved by this file):**
- `check-pipeline.mjs` reported `FAIL white-card-qld: missing artefact(s) — 07 (pre-deploy verification)`
  before this file existed. Writing `pipeline/white-card-qld/07-verification.md` resolves it.
- `check-pipeline.mjs` also reported `FAIL white-card-qld: 07 never names 3 mandated audit(s):
  abe-readability-audit, final-check, ai-detector` against an earlier draft of this file, before §4 above
  was added. All three are now actually run (not asserted) and dispositioned in §4. Re-run
  `node scripts/check-pipeline.mjs --slug white-card-qld` to confirm both FAILs clear, and note that a
  third FAIL (`07 is not committed while its page source is`) will remain until this file is committed to
  git — outside this subagent's scope (it was told to write only this one file, not perform git
  operations).

**WARN 1 — cents-formatting inconsistency in the price display.**
`Course.offers.price` is `"109"` and every hero/sticky/CTA-band price reads `$109` (no cents), but the
`PriceCard` component in `#cost` renders `$109.00` / `$169.00` / `$0.00` (with cents). The checklist
requires the on-page price to match the schema price "including cents formatting." The underlying value
never drifts, so this is not a FAIL, but fix: standardise `PriceCard`'s row values to the same no-cents
format used everywhere else on the page (`$109` not `$109.00`), or intentionally document why `PriceCard`
alone uses cents.

**WARN 2 — `05-components.md` is missing the `rto-partner` row that its sibling pages document.**
`check-pipeline.mjs --slug white-card-qld` reports: `WARN white-card-qld: section(s) on the page but not
in the 05 plan — rto-partner`. The page correctly renders the auto-rendered `PartnerDisclosure` section
(`#rto-partner`, from `placement: "after-hero"` in frontmatter) exactly as `05-components.md`'s prose
describes — this is not a page-content defect. But `pipeline/white-card-wa/05-components.md` and
`pipeline/white-card-tas/05-components.md` both include an explicit `rto-partner` row in their section
table (e.g. WA: `| — | rto-partner | — | 01 (formal) | (eyebrow only) | PartnerDisclosure | layout ←
partnerRto, placement: after-hero |`), which is why `check-pipeline` reports OK for those two slugs and WARN
for this one. Fix: add the equivalent `rto-partner` row to `pipeline/white-card-qld/05-components.md`'s
table, matching sibling-page convention, so the artefact documents what the page actually ships and the
tooling stops flagging a real (if harmless) documentation gap.

**WARN 3 — `SiteHeader.astro`'s disabled "coming soon" nav items fail AA contrast (design-owned, sitewide,
not specific to this page).** The "About" placeholder link (`<span class="nav-l soon" aria-disabled="true"
title="Coming soon">About</span>` and its mobile-menu twin `.dd-soon`) renders `--slate-light` (`#9a9a9a`)
on `--ground` (`#fbf9f5`) — measured **2.68:1**, verified live via Playwright `getComputedStyle` at both
390px and 1280px, well under the 4.5:1 AA floor. This is identical chrome on every page site-wide, so it
is not this build's to fix, but it is a real, verified shortfall: `[design]` fix — give `.nav-l.soon` /
`.dd-soon` a colour that clears 4.5:1 against `--ground` (e.g. `--slate` at `#6e6e6e` measures 4.85:1),
or decide deliberately that aria-disabled placeholder text is exempt and document that decision.

**WARN 4 — 42 CSS declarations sitewide sit below the 12px label floor (design-owned, sitewide, not
specific to this page).** `audit_static.py` flagged 11-11.5px mono-label/eyebrow/caption text across
nearly every component (`.eyebrow`, `.waynav .wl`, `.glance .g-k`, `.can-h`, footer `.f-col-h`, etc.) —
a token-level pattern, not something introduced by this page. `[design]` fix: either raise the smallest
label size to 12px across the design register, or make a deliberate, documented exception for this class
of uppercase tracked mono labels (which read differently from body text at the same nominal size) and
record it in `abe-baseline.md`/the design register rather than leaving it an unflagged token choice.

**Informational, not FAILs or WARNs (no action required):**
- Meta description is 191 characters, past the ~155-160 char point where Google typically truncates SERP
  snippets. Not a stated hard rule in this checklist; flagged for awareness only.
- Minimum age (13 years) is sourced only by the FAQ's blanket citation, not an individually-quoted source
  line; consistent with the standing FAQ pattern used across sibling pages.
- `Course.offers` represents only the $109 weekday tier in schema; the $169 Saturday tier has no separate
  `priceSpecification`. Common practice (lowest/base price in `Offer.price`), not a schema error.

## Re-verification · 7 August 2026 — Stage 7 currency restored (breadcrumb-only change)

**Why this exists.** `check-pipeline` §4 FAILed: this page's content was last committed 4 Aug 2026
(`7ea0300`, "build /white-card hub (W3-6)"), which postdates every entry above, so this file no
longer certified the current page. Found and reported in
`handover/HANDOVER-white-card-stage7-drift-2026-08-07.md`, not by any check running at the time the
drift was introduced. This page's gap was the smallest of the four spokes' (its prior verification
was already the most recent, 3 Aug), but the invariant is the same regardless of gap size.

**Scope: exactly one change, confirmed by diff before re-verifying**
(`git show 7ea0300 -- src/content/courses/white-card-qld.mdx`). Unlike the other three spokes, this
page **gained** the middle "White Card" breadcrumb entry rather than having one restored — it was
built the day before the hub existed, so it briefly shipped a two-level crumb like the others did.
Now that `/white-card` (W3-6) exists, it carries the same three-level crumb as every other spoke. No
copy, price, regulatory claim, section or schema field beyond the `breadcrumb` array changed.

## Measured

| Check | Measured value |
|---|---|
| `breadcrumb[]` length | **3** (was 2) — Home, White Card, White Card QLD |
| Visible crumb nav (`nav.crumbs` in `dist/`) | `Home -> /`, `White Card -> /white-card` |
| `/white-card` resolves in `dist/` | yes — `dist/white-card/index.html` exists, built 4 Aug, unaffected by anything since |
| `BreadcrumbList` JSON-LD | 3 items: Home, `White Card -> https://www.abeeducation.edu.au/white-card`, White Card QLD |
| Section/capsule conformance | unchanged — **10 sections** match the plan, **10 capsules** match `04-content.md` |
| `guardrails` | 24 pages passed |
| `check-pipeline` §4 (this slug) | clears once this file is committed with the page |

**Not re-run: the three mandated skill-audits, the full authority-language/schema/ASQA sweep, and
the citation gate.** None of their inputs changed — confirmed by `git show`, not assumed. A
breadcrumb addition cannot introduce an RTO claim, a wrong price, or a missing disclosure, so
re-running checks against provably unchanged inputs would measure nothing new. This is the light
re-verify the change's actual severity earned, named as such rather than dressed up as a full pass.

## Ship decision

**Merge-ready.** The only change since the last full verification is confirmed cosmetic-structural
(one breadcrumb array entry), the middle crumb now resolves instead of the page carrying a
two-level crumb one day longer than its siblings, and every measured value above holds. This entry
closes the verification's currency.

## Re-verification · 8 August 2026 — hero CTA microcopy overclaim fixed

**Why this exists.** `Hero.astro:36` falls back to `'Pay by card or 4 interest-free payments with
Afterpay'` whenever a page's `cta.microcopy` is unset — and this page's own `cta:` block carried an
**explicit** override making the identical overclaim, `"No hidden fees. Pay by card. Afterpay
available."`, even though this page has **no confirmed `buyUrl`**: every CTA is the in-page
`#enrol` anchor, per `01-source-map.md` §C-3. Filed against `white-card-act`'s own build
(`skill-reviews/2026-08-04-abe-course-page-astro-white-card-act.md`) but never backported here.
That's a page-source change, which `check-pipeline` §4 correctly flags as making this file stale
again.

**Scope: one field, one line.** `cta.microcopy` changed from `"No hidden fees. Pay by card.
Afterpay available."` to `"One-off payment. No hidden fees."`, matching the already-safe pattern
live on `white-card-act` and `white-card-nsw`. No section added, moved or removed; no schema
field, price, or regulatory claim touched; the `ctaBand.cta.microcopy` ("Statement of Attainment
issued by Blue Dog Training") was already correct and is unchanged.

## Measured

| Check | Measured value |
|---|---|
| "Afterpay" / "Pay by card" in `dist/white-card-qld/index.html` | **0** occurrences (was 1, in the hero `cta-note`) |
| Hero `cta-note` text | `"One-off payment. No hidden fees."` |
| `guardrails` | 24 pages passed |
| `check-claims` | 0 failing |
| `check-pipeline` §4 (this slug) | clears once this file is committed with the page |

**Not re-run: the three mandated skill-audits, the full schema/ASQA sweep.** None of their inputs
changed — this is a one-line microcopy substitution correcting a false payment-method claim, not
new copy, a new section, or a new regulatory claim.

## Ship decision

**Merge-ready.** Closes the Stage 7 currency gap this page's own content fix opened.

## Re-verification · 11 August 2026 — dead CTAs repointed to a real section

**Why this exists.** Every CTA on this page targeted `#enrol`, and `Hero.astro:55` hardcodes
`id="enrol"` on its own primary anchor — so the hero button was simultaneously the link and its
own target, and every other CTA resolved to it. **Clicking any of them moved the page nowhere.**

**No check could see it, and that is the point.** `guardrails.ts` check 6 and `check-links.mjs`
both ask only whether the anchor id EXISTS, and it did, because `Hero` was creating it. The defect
was found on `/project-advisory` during its Stage 7 and traced back here.

**Scope: the `href` value only.** No label, price, fact, section, schema field or regulatory claim
changed. `#cost` chosen because it is the section that answers what these labels promise.

## Measured, in a real browser

| Check | Before | After |
|---|---|---|
| CTAs resolving to `#enrol` | all of them | **0** |
| Hero anchor is its own target | **true** | **false** |
| Distance the primary CTA travels | **0px** | see below |
| `#cost` section exists | — | yes |

Verified by measuring the offset between each CTA and its resolved target in a live browser, not by
reading the markup: the primary CTA now travels thousands of pixels to the cost section instead of
to itself.

**Still no purchase path.** This remains an in-page anchor, not a checkout, and the standing
`buyUrl` warning above is unchanged. The difference is that the CTA now takes a reader to the
section that answers it rather than appearing broken.

## Ship decision

**Merge-ready.** Closes the Stage 7 currency gap this page's own change opens.
