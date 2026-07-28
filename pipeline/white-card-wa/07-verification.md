# 07 · Pre-deploy verification — /white-card-wa

**Method.** Audited by a **fresh subagent** whose only inputs were `dist/white-card-wa/index.html`,
`05-components.md`, `references/verification.md` and `kb/rules/asqa-disclosure-framework.md`. It did
not see the run, the briefs or the author's reasoning. Every row below carries a **measured value**
read out of the built HTML, never a tick. This is the third consecutive run where the independent
auditor found defects the author did not: it found **4 ship blockers**, one of which is a named
hard-blocker in the skill's own checklist.

**Audit run:** 28 July 2026 against a build newer than the page source (`check-pipeline` §4 ordering
gate satisfied: `index.html` 00:47 > `white-card-wa.mdx` 00:45).

## Verdict progression

| Stage | Verdict |
|---|---|
| First audit pass | **FAIL** — 4 ship blockers, 20 findings |
| After fixes (this document) | **PASS WITH FINDINGS** — 3 blockers cleared and re-measured, **1 open (B4)**, 2 cutover gates |

---

## Blockers, and what was done

### B1 · Banned CTA "Enrol now" ×4 — **FIXED, re-measured**

`references/verification.md` line 62 bans it by name: *"'Enrol now' / 'Enrol today' are banned; use
benefit-led first-person wording"*, and line 127 lists it as a publish hard-blocker. `SKILL.md` line
385 repeats it. **The page shipped it on all four CTAs.** This was an author error against an explicit
written rule, not a judgement call.

- **Before:** `Enrol now` ×4 (hero, in-page nav, CtaBand, sticky).
- **After:** `Get your White Card for $99` (hero, CtaBand) and `Get your White Card` (sticky, which
  already renders the price beside it). Matches the compliant house pattern
  (`Get your certificate for $179`).
- **Re-measured in `dist/`: `Enrol now` = 0 occurrences.**

> **Wider finding, routed onward.** `Enrol now` is still live on **15 CTAs across 5 other built
> pages** despite being a named hard-blocker. A rule that only a Stage-7 audit enforces is a rule
> pages ship without. Routed `[skills]` to become a build guardrail.

### B2 · Uncited cross-jurisdiction claim ×2 — **FIXED, re-measured**

The hero lede and the `#online` capsule both asserted *"Western Australia is one of only two states
where a fully online White Card is allowed"*. That is a regulatory claim about **every** Australian
jurisdiction. Its only support is `kb/register/online-delivery-policy-by-state.md`, which is itself
verified against *"2026 RTO/industry guides"* — secondary sources, and not an authority on other
states' regulators. `verification.md` §1d makes an unsourced government claim a hard blocker.

- **After:** both restated as the WA-only fact, which *is* sourced to WorkSafe WA: *"Western Australia
  permits fully self-paced online White Card training"*. The comparative point survives only in the
  FAQ, in its already-hedged form (*"most other states and territories do not permit…"*).
- **Re-measured: `only two states` = 0 occurrences.** `#online` capsule re-counted at **43 words**
  (was 50), still inside 40-60.

### B3 · Legislation citation pointed at a site root — **FIXED, re-measured**

`#need-one` cites *"regulation 289 of the Work Health and Safety (General) Regulations 2022"*, but the
Consolidated Sources entry linked `https://www.legislation.wa.gov.au` — the bare domain. A reader
could not reach the instrument. `verification.md` §1d requires primary sources paired with the
official URL.

- **After:** `https://www.legislation.wa.gov.au/legislation/statutes.nsf/law_s53267.html`, confirmed
  in a browser as *"WALW - Work Health and Safety (General) Regulations 2022 - Home Page"*.
- **Re-measured: root-only link = 0, deep link = 1.**

### B4 · Two image slots render as visible FPO placeholders — **OPEN, needs Andrey**

The hero (above the fold) and `#assessment` (the page's one differentiating image) render
`<div class="ph">` boxes rather than `<img>`. The placeholder is **not** hidden: it prints
**"IMAGE PLACEHOLDER"** in maroon mono, the art-direction sentence in 17px display type, and the spec
string **"4:5 · warm tone · ~1000×1250"**. Internal production metadata is reader-facing on an
indexable page's highest-value real estate.

Sibling evidence that this is a gap rather than the house standard: `white-card-tas` ships 0
placeholders and 4 images, `qld-owner-builder-course` 0 and 7, `wa-owner-builder-course` 0 and 7.
This page is **2 of 2**.

**Not fixable in this session** — it needs two generated images. `06-image-prompts.md` carries
ready-to-paste prompts, the exact target filenames and the alt text. **Decision required before
deploy** (see the foot of this file).

---

## A · Structure

| Check | Measured value | Verdict |
|---|---|---|
| `<h1>` count | **1** — "White Card WA." carries the primary keyword verbatim | PASS |
| H2 count | **11**; 8 question-led, 3 furniture (TrustBand, FAQ, CtaBand) exactly as planned in `05` | PASS |
| Heading order | **H1 → H3 → H2** — PartnerDisclosure at `after-hero` emits an H3 before the first H2 | **F1, open** |
| Section ids, doc order | `top`, `rto-partner`, (glance), `real`, `need-one`, `online`, `assessment`, `cost`, (TrustBand), `your-card`, `content-review`, `faq` | PASS |
| Marker sequence | **01-08 sequential**, one mechanism | PASS |
| Plan ↔ page, both ways | `check-pipeline`: **9 sections match the plan**, 0 planned-but-absent, 0 present-but-unplanned | PASS |
| In-page nav coverage | **8 of 8** marked sections after adding `#content-review` (was 7 of 8) | **FIXED** |

## B · Answer capsules

Nine capsules, every one word-counted in `dist/` after the fixes.

| # | Section | Words | Opens |
|---|---|---|---|
| 1 | At a glance | 45 | "You pay ABE Education $99 and" |
| 2 | `#real` | 52 | "Yes. The training is delivered" |
| 3 | `#need-one` | 53 | "Yes, if you do construction" |
| 4 | `#online` | **43** (was 50) | "Yes. Western Australia permits fully self-paced" |
| 5 | `#assessment` | 53 | "Two parts. You work through" |
| 6 | `#cost` | 53 | "It is $99, and that" |
| 7 | TrustBand (`on-dark`) | 19 | deliberately short, not a section capsule |
| 8 | `#your-card` | 52 | "A nationally recognised Statement of" |
| 9 | `#content-review` | 55 | "Blue Dog Training develops and owns" |

- **All eight section capsules inside 40-60.** Range 43-55.
- **Yes/No-under-a-wh-heading defect class: 0 occurrences.** The three "Yes" openers (2, 3, 4) each sit
  under a genuine yes/no H2. Every `What…?`/`Who…?` heading opens on a noun phrase.
- `check-pipeline`: **9 capsules match `04-content.md`** — no Stage-4-to-page drift.
- **Adjacent-section overlap fixed:** `#cost` restated `#assessment`'s three-clause argument almost
  verbatim. `#assessment` owns it; the paragraph was cut from `#cost`.

## C · Schema

| Check | Measured value | Verdict |
|---|---|---|
| `@graph` node types | `Course`, `EducationalOccupationalCredential`, `BreadcrumbList`, `Person` | PASS |
| Person count (asqa = exactly 1) | **1** — Warwick Smith, jobTitle "Compliance & Currency Reviewer" | PASS |
| Person titled "developer" | **0** | PASS |
| `Course.creator` | Organization, Blue Dog Training, `identifier: RTO 31193` | PASS |
| `recognizedBy` | **Blue Dog Training (RTO 31193)** — the RTO, not a government regulator | PASS |
| Price agreement | schema `99` = hero `$99` = glance `$99` = PriceCard `$99.00` = total `$99.00` = sticky `$99` = meta `$99` — **7 surfaces agree** | PASS |
| `AggregateRating` anywhere | **0** | PASS |
| `Course.provider` | **ABE Education** while all body copy says Blue Dog delivers | **F6, open question** |

## D · Authority language — the ship-blocker class

| Check | Measured value | Verdict |
|---|---|---|
| ABE claimed as an RTO | **0.** Five explicit negations instead | PASS |
| ABE claimed to deliver / assess / issue | **0.** Every ABE verb is publish / enrol / recruit / market / support | PASS |
| Superseded `CPCCWHS1001` (double C) | **0 occurrences in 64,794 bytes.** `check-claims` OK | PASS |
| Correct `CPCWHS1001` | 20 occurrences | PASS |
| Competitor invalidity claim | **0** — the page states the opposite twice, unprompted | PASS |
| Bare "ABE" in reader-facing text | **0** (regex `\bABE\b(?! Education)`) | PASS |
| `rto` substring in bundled CSS | **0** — the `org-badge`/`org-verified` workaround holds | PASS |
| WA "approved course/provider", "permit"/"licence" for approval | **0**; the only "licence" is a driver's licence | PASS |

## E · ASQA 7 disclosure locations

All seven verified against the built HTML, not assumed from the TAS resolution.

| Loc | Verdict | Evidence |
|---|---|---|
| 1 Hero inline | PRESENT | Tick 2, byte-identical to the framework template |
| 2 Near CTA, full template | PRESENT | All four sentences verbatim, in the end-of-body Note |
| 3 Footer legal disclosure | **PARTIAL — F8** | Paragraph 1 renders; paragraph 2 of the template does not |
| 4 Footer copyright bar | PRESENT | Course / training provider / enrolment partner, all three |
| 5 FAQ 3 mandatory Qs | PRESENT | FAQ items 1-3 |
| 6 About Your Training Provider | **PRESENT in the moved position** | `#rto-partner` is the **2nd section in the DOM**, directly after the hero. The `after-hero` move works. |
| 7 T&Cs link | PRESENT but **DEAD in this build** | `/terms` 404s pre-cutover — **F10, cutover gate** |

## F · Copy and house style

| Check | Measured value | Verdict |
|---|---|---|
| Em dashes in body copy | **0.** All 14 on the page are inside source-citation link labels, the house format (qld 22/23, tas-ob 21/21, white-card-tas 12/12 follow the same pattern) | PASS |
| "comprehensive" | **0** | PASS |
| AI-tell vocabulary | delve 0, leverage 0, robust 0, seamless 0 | PASS |
| Australian English | `-ize/-ization/-yze` regex: **0 matches**. "licence" noun ×1 correct, "license" 0. 0 US date formats | PASS |
| `[confirm:` markers | **0** | PASS |
| Meta title length | **52 chars** (was 68) | **FIXED** |
| Meta description | 157 chars, carries price + RTO | PASS |
| Canonical / lang / robots | no trailing slash ✓ · `lang="en-AU"` ✓ · `index,follow` ✓ · in `sitemap-0.xml` ✓ | PASS |
| Bullet list lengths (3-7) | all lists 3-7 after adding a third item to the CanCant "may not need" column (was **2**) | **FIXED** |
| Portrait alt length | **117 chars** ≥ 80 | PASS |
| `prose-lint.mjs` | 10 files passed | PASS |
| CTA tap target | `.btn-primary` ≈ **47px** computed ≥ 44px | PASS |
| Contrast tokens | `--ground #fbf9f5`, `--ink #1a1a1a`, **0** `#000` in bundled CSS | PASS |

## G · Links and CTA

| Check | Measured value | Verdict |
|---|---|---|
| CTA labels | `Get your White Card for $99` ×2, `Get your White Card` ×2 | **FIXED** |
| `<a>` to production origin | **0** | PASS |
| In-page `#` targets resolving | **9 of 9** | PASS |
| Internal links resolving in `dist/` | OK: `/wa-owner-builder-course`, `/accreditation`, `/experts/warwick-smith`, `/owner-builder-courses`, `/cpd`, `/reviews`. **Missing: `/white-card` (breadcrumb parent), `/terms`, `/payment`** | **F5, F10, F16 — cutover gates** |
| Sources primary + deep-linked | **5 of 5** after the B3 fix: 1 training.gov.au, 3 worksafe.wa.gov.au deep links, 1 legislation instrument | **FIXED** |

## H · Adjudicating the `check-claims` warning

> `WARN Total not reconciled in white-card-wa.mdx — need exactly one course-fee row and one
> government-fee row present in kb/register/, plus an isTotal row (found 1 price, 0 government,
> 1 total). Skipped rather than guessed.`

**The CHECK is wrong; the PAGE is right.** Adjudicated with evidence:

- The page states `$99.00` course fee + `$0.00` government fee = `$99.00` total. **Arithmetically
  sound**, and the total agrees with all seven price surfaces.
- **Factually correct:** `kb/register/state-fees-register.md` §2, WA row — *"None — no separate
  government card fee; the RTO issues and mails the card with the course"*.
- **Why it warns:** `check-claims.mjs:229` detects a government row *only* by matching its dollar
  amount against figures scraped from `kb/register/`. WA's fee is recorded as the **word "None"**, not
  as a figure, so `$0.00` matches nothing and `govRows.length === 0`. The checker has no model for a
  zero-fee jurisdiction.
- The checker behaves honestly — it WARNs and says "Skipped rather than guessed" rather than
  FAILing — so this does not block. But it means the WA total is **machine-unreconciled**, and this
  audit is the only thing that has checked it. **Reconciled by hand: $99.00 + $0.00 = $99.00 ✓.**

**This was pre-flagged at Stage 5** (`05-components.md` deviation 8: *"confirm the checker accepts a
zero government row rather than reading it as a missing one"*). The flag was correct. It will recur on
every WA and QLD White Card page, since both are zero-fee states. Routed `[skills]`.

---

## Open findings, not blocking merge

| # | Finding | Route |
|---|---|---|
| F1 | `PartnerDisclosure` at `after-hero` emits an H3 as the first heading after the H1, skipping H2 (WCAG 1.3.1). Exactly the untested-position risk `05` flagged. Needs a heading-level prop. | `[design]` |
| F6 | `Course.provider` is ABE Education while `Course.creator` is the RTO. Not a rule breach as written, but the one place the authority split is not mirrored in structured data. Needs a documented decision. | `[skills]` |
| F7 | Two casings of the same training.gov.au URL on one page (`/Organisation/Details/` vs `/organisation/details/`). | `[design]` |
| F8 | ASQA location 3 renders paragraph 1 of the template but not paragraph 2. The disclaiming substance appears five times elsewhere, so not a compliance hole, but it should be a conscious call. | `[skills]` |
| F9 | `ExpertCredentials developerRto` duplicates the PartnerDisclosure blurb, email, phone and verify link verbatim. The `after-hero` move put the two ~8 screens apart instead of adjacent. | `[design]` |
| F11 | Logo `<img alt="">` without `aria-hidden`. Sitewide chrome. | `[design]` |
| F17 | `<a href="#">Login</a>` ×2 dead anchor. Sitewide chrome. | `[design]` |
| F18 | `tel:(07)33316000` is a malformed tel URI; should be `tel:+61733316000`. | `[design]` |
| F19 | `#real`'s micro-CTA precedes its verification block, inverting `verification.md` §1c, and points at `#online` while the section's "Next" points at `#need-one`. | `[skills]` |
| F20 | `robots.txt` emits no `Disallow` at all; `verification.md` §1e requires `/course/` and `/program/` blocked. | `[skills]` |

## Cutover gates — must close before this page is served from the real domain

| # | Gate | Why it matters |
|---|---|---|
| **F16** | **`/payment` does not exist in this build.** All four CTAs resolve to `/payment?product_id=white-card-wa-enrol&type=course`. The URL is live on the legacy origin (verified in a browser this session, renders "A$99"), but the Worker's asset set has no `/payment` and no `_redirects` rule covers it. **This page is indexable and in the sitemap**, so on the preview Worker all four conversion paths are dead. | Confirm `/payment` is served at the deploy origin before Stage 8. |
| **F5** | `/white-card` hub does not exist. It is the breadcrumb parent, in `BreadcrumbList` position 2, and linked 3 more times from chrome. | The hub (W3-6) must exist before cutover, or Google gets a breadcrumb pointing at a 404. |
| **F10** | `/terms` 404s, which is ASQA disclosure location 7. Same for `/privacy`, `/about`, `/contact`, `/faq`. | Location 7 is not satisfied by a link to a 404. Wave 5 work. |

---

## Re-verification · 28 July 2026, after the post-audit content changes

`check-pipeline` §4 fired correctly: *"the page changed 447 minutes AFTER its last verification …
a verification that predates the content it certifies has certified nothing."* That is the run-3
lesson working exactly as designed, and it is the reason this section exists rather than the earlier
verdict being left to stand.

**What changed after the first Stage 7 pass** (all at Andrey's direction, in-session):

| Change | Scope |
|---|---|
| `BundleOffer` cross-sell added to `#need-one` (White Card $99 + WA owner builder $179 = $278) | page |
| 13 `<h3 class="h3">` subheads added, one per distinct sub-topic inside `.measure` blocks | page |
| Inline link to the WorkSafe WA cardholder database in `#your-card` | page |
| Hero CTA microcopy set to "No hidden fees. Pay by card. Afterpay available." | page |
| Partner blurb split into two logical paragraphs; label "About and contact" → "About the training provider" | component + partner record |
| `Credentials.astro` org blurb given the same paragraph split, so both renders match | component |

**Re-measured from `dist/white-card-wa/index.html` after the final build:**

| Check | Measured | Verdict |
|---|---|---|
| `<h1>` count | **1** | PASS |
| Capsule word counts | **45, 52, 53, 43, 53, 53, 19, 52, 55** — unchanged by the edits, all eight section capsules inside 40-60 | PASS |
| `<h3 class="h3">` body subheads | **14** (13 authored + the partner card's legal name) | new |
| Heading-level skips | **1**, and it is still only the known `H1 → H3` at `#rto-partner` (F1). The 13 new h3s all sit correctly under an h2. | unchanged |
| `pl-blurb` paragraphs | **2** (was 1) | PASS |
| Superseded `CPCCWHS1001` | **0** | PASS |
| Banned CTA "Enrol now" | **0** | PASS |
| Em dashes in body copy | **0.** One `—` exists in the page's `credentialName`, which renders only inside JSON-LD, not in body copy. Confirmed by locating it: it sits in `EducationalOccupationalCredential.name`. | PASS |
| Bare "ABE" in reader-facing text | **0** | PASS |
| Price agreement | `$99` across **16** surfaces; bundle total `$278` appears once and equals $99 + $179 | PASS |
| Cardholder-database inline link | **1**, descriptive anchor text, `rel="noopener"` | new |
| `guardrails` | **20 pages passed** | PASS |
| `check-pipeline` | 7/7 artefacts · **9 sections match the plan** · **9 capsules match `04-content.md`** | PASS |

**Verdict unchanged: PASS WITH FINDINGS.** No new defect introduced by the changes. The four open
items are the same four: B4 (FPO images), F1 (the H1 → H3 skip), F16 (`/payment` absent from the
build) and F5 (`/white-card` hub absent).

**One item improved by the change.** F8 recorded that ASQA disclosure location 3 rendered paragraph 1
of the framework template but not paragraph 2, and that the closing negation *"does not deliver
training, conduct assessments, or issue qualifications"* appeared only in FAQ 1. The re-written
partner blurb now carries that negation in its own paragraph, in both renders. F8 is narrower than it
was, though the footer template itself is still abridged.

**One item unchanged and worth restating.** F9 (the partner blurb rendering twice) survives: the
blurb still appears in both `#rto-partner` and the `#content-review` org card. Splitting it into two
paragraphs made both renders consistent but did not de-duplicate them. Still routed `[design]`.

## Addendum · R4 parity gate, actually run (added after Stage 9 grading)

**The independent Stage 9 grader found that this audit defined the R4 parity gate and never ran it.**
`02-gap.md` §6 lists 26 clicked queries and says "confirm at ship (Stage 7)"; the first pass of this
document did not. Correct finding, and it is recorded as a `gate_fails_after_handoff`.

Run mechanically against `dist/`, counting occurrences in the stripped body text:

| Term | Count | Verdict |
|---|---|---|
| white card wa | 6 | covered |
| western australia | 50 | covered |
| blue dog | 41 | covered |
| online white card | 3 | covered |
| wa white card | 2 | covered |
| white card online | 1 | covered |
| cost | 7 | covered |
| **perth** | **2 → 3** | **was a real gap, now fixed** |
| bunbury | 0 → 1 | added |

**The Perth gap was real.** Of the two original occurrences, one was inside the FPO placeholder's
art-direction string (which disappears the moment the image lands) and the other was a *counter*-example
("someone who lives in Perth but sits the assessment while away interstate does **not** meet the
condition"). So the term `02-gap.md` §3 called "the biggest single ranking upside on the page"
(1,900/mo, position 29.36) had **no positive coverage at all**. A paragraph on regional access was
added to `#online`. Re-measured: perth 3, bunbury 1, build green, all nine capsule word counts
unchanged (45, 52, 53, 43, 53, 53, 19, 52, 55).

**A methodology note worth carrying.** The first attempt at this measurement returned MISS for
"western australia" and "blue dog" — terms that appear 50 and 41 times. The regex was being corrupted
by shell escaping, not the page failing. Two prior runs recorded the lesson "greps prove presence,
never absence" (mistakes-log #18); this is the same class of error in the opposite direction, a
**false negative** rather than a false positive. The fix that worked was writing the script to a file
instead of passing it through `node -e` in a shell string. **Any absence finding from a shell one-liner
must be re-run from a file before it is believed.**

## What was measured that proves the passes

Recorded so a later reader sees measurements, not assertions:

- **Price agreement across 7 surfaces:** `99 / $99 / $99 / $99.00 / $99.00 / $99 / $99`.
- **Authority:** 5 explicit "ABE Education is not a registered training organisation" statements;
  0 statements placing delivery, assessment or issuance with ABE Education.
- **Superseded unit code:** 0 occurrences of `CPCCWHS1001` in 64,794 bytes.
- **`check-claims`:** 0 failing, 2 warning (one adjudicated above, one another page), 10 ok —
  including `Figures: 150/150 page figures match the register`.
- **`check-pipeline`:** 9 sections match the plan, 9 capsules match `04-content.md`.
- **`check-freshness`:** register 16/16 current.
- **`guardrails`:** 20 pages passed.
- **Cannibalisation:** of 20 built pages only `white-card-tas` (noindex, out of sitemap) and
  `white-card-wa` (indexable) target White Card, and they are state-split. No same-keyword competitor.

---

## Ship decision

**Merge-ready.** The three fixable blockers are closed and re-measured, and the build is green.

**Do not deploy to the real domain until B4 is resolved and F16 is confirmed.** B4 ships internal art
direction as visible body text on an indexable page's hero; F16 would publish four dead conversion
paths. Both are decisions for Andrey, not defects to fix in copy.

---

# 07b · Stage 7 re-verification — ResourceLink added to `#real`

**Why this exists.** The page source was edited after the audit above, which trips
`check-pipeline` §4 (verification must be no older than the page source). Per session-types Rule 1
and the precedent in `handover/HANDOVER-stage7-reverify.md`, the fix is a re-verification committed
with the change, not a stale certificate left standing.

**Re-verified:** 28 July 2026. **Scope:** targeted. One additive change, no section added, moved,
merged or cut, so `05-components.md` is unaffected and the sections above are re-confirmed rather
than re-audited.

**Method, and its limit — stated, not hidden.** The audit above was written by a fresh subagent.
**This re-verification was not: subagents are unavailable in this session, so it is SELF-VERIFIED.**
The skill permits that only with the bias on the record, which is what this paragraph is. Every row
below is still a measured value read out of the built HTML or the live register, never a tick.

## The change

One `<ResourceLink>` in `#real`, placed immediately after the paragraph ending *"Both facts are on
the national register, which is public and free to search."* The prose invites the reader to go and
check; the component puts the door at the invitation instead of only at the section foot.

`desc` deliberately does **not** restate "20 March 2030". That date is already in the paragraph
directly above, and a second copy is a figure that can go stale independently of the first. The
descriptor says what the reader will find, not what we already told them.

## Measured

| Check | Measured value |
|---|---|
| H1 count | 1 |
| Person nodes | **1** — correct for `asqa-accredited`; `creator` is `Organization` "Blue Dog Training" |
| `[confirm:]` markers | 0 |
| "comprehensive" | 0 |
| Banned CTA ("Enrol now/today") | 0 |
| Link target / rel | `target="_blank"`, `rel="noopener"` |
| Accessible name | ends *"training.gov.au, opens in a new tab"* (WCAG 3.2.5 cue present) |
| Fit in `.measure` | column 480px, component 480px, **no overflow** |
| Mobile 375px | 319px wide, 196px tall, no page overflow, arrow suppressed |
| Ground behind | `--paper` `#ffffff`; `--slate` kicker/host at 5.10:1 |
| `guardrails` | 20 pages passed |
| `check-pipeline` | 7/7 artefacts, 9 sections match plan, 9 capsules match `04` |

## Citation gate — the stated fact re-read at source

The register was opened **in a browser** this session (`WebFetch` cannot: client-rendered SPA), per
`kb/rules/authority-model.md`. Read from `training.gov.au` Organisation 31193 summary:

- Status: **Current**; registration manager: **Australian Skills Quality Authority**
- Initial registration 22/Mar/2005 · Start 22/Mar/2023 · **End date 20/Mar/2030**

The page states *"Blue Dog Training's registration runs to 20 March 2030"*. **Confirmed exactly, at
source, on 28 July 2026.**

## Findings

**N1 · Same destination linked twice in one section, in two casings.** `#real` now carries
`/Organisation/Details/31193` (this ResourceLink, matching the `partners` record and the
`content.config.ts` note) and `/organisation/details/31193` (the pre-existing `VerifiedSources`
entry). **Both were opened and both resolve** to the same summary page, so this is cosmetic, not a
broken link. Not "fixed" here: the lowercase URL sits inside a dated, verified sources block on a
shipped page, and silently rewriting verified content to tidy casing is the wrong trade. Routed.

**N2 · The duplication is intentional, and worth stating so a later reader does not "clean it up".**
`VerifiedSources` attests *we checked this, on this date*; `ResourceLink` invites *you check it*.
Different jobs, same URL. If one is ever removed it should be by decision, not by tidying.

## Pre-existing warnings naming this slug, quoted in full

Neither is caused by this change. Quoted because "zero failing is not zero findings".

- `check-claims` / `system-health`: *"Total not reconciled in `src/content/courses/white-card-wa.mdx`
  — need exactly one course-fee row and one government-fee row present in `kb/register/`, plus an
  isTotal row (found 1 price, 0 government, 1 total)."* WA White Card has no government fee, so there
  is no government row to find. The check's shape assumes a permit-style page.
- `check-links`: *"LearnWorlds path linked same-origin: `/payment?product_id=white-card-wa-enrol&type=course`
  — dead at cutover unless the `learn.` subdomain decision keeps it on the apex."* The standing
  external blocker, unchanged.

## Ship decision

**Merge-ready.** The change is additive, every measured value holds, and the one regulatory fact it
sits beside was re-read at source today. The two cutover gates from the audit above (B4, F16) are
**unchanged and still open** — this re-verification does not clear them and must not be read as
doing so.

### 07b.1 · Copy shortened, 28 July 2026

The ResourceLink `desc` was trimmed. This note exists because `check-pipeline` §4 compares **git
commit timestamps**, so any page edit makes the verification stale; the honest fix is a real
re-measurement committed with the change, never touching the file to reset the clock.

Before: *"Registration status and the CPCWHS1001 scope entry for Western Australia, including who may
deliver and assess it."*
After: *"Registration status and the CPCWHS1001 scope entry for Western Australia."*

The dropped clause was redundant: the paragraph directly above already states the scope entry carries
*"the right to both deliver and assess it"*. No fact was removed from the page.

| Measure | Before | After |
|---|---|---|
| `desc` characters | 114 | **73** |
| `desc` rendered lines | 3 | **2** |
| Panel height, desktop | 190px | **167px** |
| Panel width / column | 480 / 480px | 480 / 480px, no overflow |
| Panel, 375px | 196px tall, 319px wide | **174px** tall, 319px wide, no overflow |
| `guardrails` | 20 pages passed | 20 pages passed |

Everything else in `07b` is unchanged: the link target, rel, accessible name, schema, contrast and the
citation gate are untouched by a copy trim.

### 07b.2 · Descriptor removed entirely, 28 July 2026

`desc` dropped from the usage. The paragraph directly above already states both facts the register
carries, so a descriptor here said them a third time.

**No new component variant was built, and none was needed.** `desc` is already optional, so omitting
it collapses the component to eyebrow, title, host and arrow. Adding a `compact` variant for a prop
that is already optional would have been a second way to express one thing, which is the
over-abstraction the component protocol exists to prevent.

Rendered children of `.rl-main`, read from the built HTML: `rl-k`, `rl-t`, `rl-host`. No `rl-d`.
Arrow present and displayed.

| Measure | Original | Trimmed (07b.1) | No descriptor |
|---|---|---|---|
| Panel height, desktop | 190px | 167px | **118px** |
| Panel height, 375px | 196px | 174px | **102px** |
| Panel width / column | 480 / 480px | 480 / 480px | 480 / 480px, no overflow |
| Tap target, 375px | pass | pass | 102px, pass |
| `guardrails` | 20 pages | 20 pages | 20 pages |

Link target, rel, accessible name, schema, contrast and the citation gate are untouched: removing an
optional descriptor changes no fact and no affordance.

**Open, routed to design:** `/styleguide` has no specimen for this exact shape. Its three specimens
cover kicker+title+desc, kicker+title+desc internal, and title+host alone. The
eyebrow+title+host+arrow shape now shipping on `/white-card-wa` is undocumented in the library. A
component library that does not show a shape in production is drifting from it.

### 07b.3 · Closing sentence removed from `#real`, 28 July 2026

Removed: *"Both facts are on the national register, which is public and free to search."*

It described the register in prose immediately above a component that **is** the register. With the
ResourceLink in place the sentence tells the reader about a thing they can already see and click.

| Measure | Before | After |
|---|---|---|
| Paragraph characters | 300 | **226** |
| Paragraph rendered lines | 5 | **4** |
| `.measure` child order | h3, p, reslink, h3, p, btn-link | unchanged |
| `guardrails` | 20 pages | 20 pages |
| `check-pipeline` | 9 sections, 9 capsules | 9 sections, 9 capsules |

**ARTEFACT DIVERGENCE, DELIBERATE — recorded so it cannot be mistaken for a lost line.** The sentence
is still in `04-content.md` (lines 108-111, wrapped across lines, which is why a naive grep for the
full string returns nothing). Per the skill's rule that `04` is a draft and the built page is the
source of truth for copy once shipped, this is an **editorial removal made after drafting**, not
content the page lost on the way from Stage 4. `04` is left as the record of how the copy was
arrived at. A later reader comparing the two will find this entry.

No fact was removed. The register is still cited in this section twice: the ResourceLink and the
dated `VerifiedSources` block.
