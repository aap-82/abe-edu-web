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
