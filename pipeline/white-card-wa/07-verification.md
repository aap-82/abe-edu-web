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

---

# 07c · Stage 7 verification — new section `#covered` (brief 09, marker 04)

**Added 28 July 2026** at Andrey's request. A new section, not an edit, so this is a fuller pass than
07b: it re-checks section conformance, the marker sequence, the wayfinder chain and the citation gate.

**SELF-VERIFIED**, for the same reason as 07b: subagents are unavailable in this session. On the
record rather than hidden.

## Why the gap existed

Not a lost section. `05-components.md` mapped briefs 01-08 to eight shipped sections and
`check-pipeline` reported 9/9 conformance throughout, so nothing vanished between Stage 4 and the
page. **It was never briefed**, and three layers independently failed to surface it:

- **Stage 2** ranks nine content gaps plus a list of gaps deliberately declined. Curriculum coverage
  is in neither. The GSC demand for this page is dominated by transactional and anxiety intent
  (assessment, online legality, cost, card check), so a "what does it cover" query never appeared.
- **The archetype** (02, nationally recognised course) lists seven required sections. All seven were
  already present. Course content is not among them.
- **Stage 7's own checklist** verifies that briefed sections reached the page. It has no check for a
  section that should have been briefed and never was.

Routed to the demand list below rather than fixed here.

## Sourcing decision

ABE's own lesson or module list is an **internal fact nobody holds**: it is not in this repo, and the
course is developed and owned by the RTO, not ABE. Inventing one would have been an authority-model
breach as well as a fabricated fact.

The sourceable answer is the **unit's own published elements** on the national register (S9, added to
`01-source-map.md` this session, read in a browser 28 Jul 2026, Release 2, usage recommendation
Current). The section therefore describes **CPCWHS1001**, never "our modules".

## Measured

| Check | Measured value |
|---|---|
| Section conformance | **10 sections match the plan** (was 9; `covered` added to `05`) |
| Capsule conformance | **10 capsules match `04-content.md`** |
| Answer capsule | **51 words** (band 40-60) |
| Body | 170 words in the section, 4 bullets of 138-187 chars (parallel, BulletList's 3-7 rule) |
| Marker sequence | 01-09 sequential; `assessment` 04→05, `cost` 05→06, `your-card` 06→07, `content-review` 07→08, `faq` 08→09 |
| Wayfinder chain | unbroken: real → need-one → online → **covered** → assessment → cost → your-card → content-review → faq |
| Nav | 9 entries, **0 dead** in-page targets |
| H1 / Person / `[confirm:]` / "comprehensive" | 1 / **1** (correct for asqa) / 0 / 0 |
| Measure | 480px at 17px; **52 CPL desktop** (band 45-75), **37 CPL at 375px** (band 30-45) |
| Mobile 375px | no element in the section overflows |
| `guardrails` | 20 pages passed |

## Citation gate

Every claim in the section traces to S9. The `VerifiedSources` block renders "Verified 28 Jul 2026 —
the four elements of CPCWHS1001 and their performance criteria, read on the national register (unit
Release 2, usage recommendation Current)" against the unit record.

One correction to an inference made earlier in this session and recorded so it is not repeated:
`#assessment` **does** carry a next-link. It is a `ZSection`, which renders `.waynext` from its
`next` prop rather than from a `SectionWayfinder` child, so a grep for `SectionWayfinder` misses it.
The chain was never broken.

## Ship decision

**Merge-ready.** The section is sourced, conformant and measured. The audit's two open cutover gates
(B4, F16) are **unchanged** and are not cleared by this.

## Demand list

- [skills] **Stage 7 has no check for a section that should exist and was never briefed.** It verifies
  that briefed sections reached the page, which is the opposite direction. This gap survived Stage 2,
  the archetype's required-sections list and Stage 7, and was found by a human reading the page. A
  "does the page answer what the product IS and what it contains" check belongs in the archetype's
  required sections, in `verification.md`, or both.
- [skills] **Archetype 02's required-section list has no course-content entry.** Every other course
  archetype sells a thing whose contents a buyer would want before paying. Worth adding, or worth an
  explicit note saying why a nationally recognised course deliberately omits it.

---

# 07c · Independent Stage 7 audit, and the fixes it forced

**28 July 2026.** A **fresh subagent** re-ran Stage 7 against `dist/white-card-wa/index.html`,
`05-components.md` and the checklist. It was given no account of the run and was explicitly denied
this file, so it could not read any earlier verdict. **It returned FAIL with four publish
hard-blockers.**

**This supersedes the "merge-ready" verdicts in `07b`, `07b.1` and `07b.2`.** Those were
self-verified, said so, and were still wrong. A self-audit cannot see this class of defect: the
author knows what they meant, which is exactly the knowledge that hides an unsourced claim. Third
time this project has recorded that lesson.

Five of the auditor's most severe claims were independently spot-checked before any fix. All five
held: `/white-card` absent from `dist/`; two FPO placeholders on this page against zero on every
other course page; the TrustBand capsule at exactly 19 words; a reader-visible doubled "against";
and no source link on the page naming Form 75 or the Building Services Act.

## F1 — the finding was worse than reported: the page stated a WRONG regulatory fact

The auditor reported the owner-builder claims as **unsourced**. Verifying them at source showed they
were also **incorrect**.

Read in a browser 28 Jul 2026 at
`https://www.wa.gov.au/organisation/service-delivery/owner-builder-approval`:

> "To satisfy this requirement, at least one of the applicants must have a general construction
> induction training card (white card or blue card) and, either: hold a current, or previous,
> Building Practitioners registration in Western Australia; be registered as an architect, building
> surveyor or building engineer in Western Australia; or have completed owner-builder training with
> Western Australian specific content within the previous 24 months."

| Claim as published | Status |
|---|---|
| "one of **four pathways** to sufficient knowledge" | **WRONG.** A card is a mandatory prerequisite, plus **one of three** alternatives. |
| "under the Building Services (Registration) **Act** 2011" | **Imprecise.** The source cites **r.22 of the Regulations 2011** for the approval requirement. |
| "The **Building Services Board's** own application fee" | **Unverifiable as written.** The source says "the board" in lower case and is published by a department whose name appears two different ways on the same page. Rewritten to "the regulator's own application fee", which is true without naming a body the source does not. |
| "within the last two years" | **Correct** — source says "previous 24 months". |
| white or blue card is part of the pathway | **Correct.** |

`kb/register/eligibility-by-state.md:41` had recorded this correctly since 22 Jul. The page
contradicted the register and no gate compares the two, because these are non-numeric claims and
`check-claims` only reconciles dollar figures.

**Fixed:** the `note` now states the real structure; a second `VerifiedSources` block was added to
`#need-one` (owner-builder approval is a *different regulator* from WorkSafe WA, so it needs its own
provenance line); and a dated footer source was added.

## F2 — dated claim removed rather than defended

"The practical demonstration has been part of White Card assessment **since December 2016**" traced
to `kb/register/online-delivery-policy-by-state.md`, whose own header records it as verified against
**2026 RTO and industry guides** — a source class section 1d excludes. The nearest primary date is
CPCCWHS1001 being superseded 09 Dec 2016, which is a *unit release*, not a change to assessment
policy. Treating one as the other is an inference dressed as a fact, so the date was **removed**.
The sentence keeps its point without it.

## F3 — breadcrumb pointed at a 404, in both the link and the schema

`/white-card` is not built. The crumb rendered as a visible link to a 404 and as a `BreadcrumbList`
ListItem naming a non-resolving URL, which Google treats as an invalid rich result. `check-links`
passed it because `/white-card` is legitimately in its `PLANNED` list, so it read as "not built yet"
rather than "broken" — a real limit of that check worth knowing.

**Not deferred to the hub.** The implementation plan (line 223) records that **W3-6 cannot start
until its spokes exist** — `hubs` types `spokes[].course` as `reference('courses')`, so a hub naming
an absent page fails Zod — and there is **one spoke of five**. W3-2, W3-3 and W3-5 come first. The
middle crumb was removed, with a comment tying its restoration to W3-6.

## F6 — consolidated sources: undated entry

The WHS (General) Regulations 2022 entry rendered its `verified` field as the bare string
`legislation.wa.gov.au`, so the one legislative source underwriting regulation 289 showed no date.
Set to **Verified 26 May 2026**, the date `01-source-map.md` S7 actually records.

## Measured after the fixes

| Check | Measured |
|---|---|
| "four pathways" in `dist` | **0** |
| "December 2016" in `dist` | **0** |
| Undated footer source | **0** — 6 entries, 5 x "Verified 28 Jul 2026", 1 x "Verified 26 May 2026" |
| `BreadcrumbList` names | `Home`, `White Card WA` — no non-resolving item |
| `href="/white-card"` on this page | **1**, and it is the **sitewide footer**, present on every page and tracked in `check-links` `PLANNED`. Not this page's defect. |
| `guardrails` | 20 pages passed |
| `check-claims` / `check-links` / `check-pipeline` | 0 failing each |
| `npm run check` | 0 errors, 0 warnings |
| `prose-lint` | 10 files passed |

## Still open — NOT fixed here, and none of them is closed by this pass

- **F4 (= the audit's open B4).** Two FPO placeholders still ship, exposing the raw image prompt and
  spec string to readers. This page is the only built course page with any. Needs the two assets in
  `06-image-prompts.md` generated. **Deploy gate.**
- **F7.** TrustBand capsule is 19 words against the component's own 40-60 contract.
- **F14.** Reader-visible doubled "against" in two `VerifiedSources` blocks: the authored `facts`
  string ends in "against" and the component appends its own. Needs either the copy or the component
  changed, so it is `[design]` as much as content.
- **F5, F8, F9, F10, F11, F12, F13** as recorded by the auditor. F11 (`check-claims` silently skips
  total reconciliation when the register says "None" rather than "$0.00") and F12 (`robots.txt` does
  not block `/course/` and `/program/`) are `[skills]`.
- **The `/payment` origin gate.** Implementation plan line 223: `/payment` is live on the legacy
  origin but absent from the Worker's asset set, so **all four CTAs are dead on staging**.

## Verdict

**PASS WITH FINDINGS, on the three items this pass took.** The two regulatory defects are corrected
and sourced, and the invalid breadcrumb is gone. **This is not a clean Stage 7** — the auditor's
remaining findings above are untouched, and F4 plus the `/payment` gate still block a real-domain
deploy exactly as the original audit said.

**Method note.** This entry is written by the agent that applied the fixes, so the *fix descriptions*
are self-reported. The *findings* they answer are not: they come from an independent auditor that
never saw this file. The correct next step before any real-domain deploy is another independent pass.

---

## Re-verification · 28 July 2026 — Form 75 pathways restored

A **facts session** read the primary instrument and reversed one of the four corrections applied
earlier today. Recorded here because the page changed after its last verification, and because the
reversal is the more interesting half of the story.

**What was wrong, and it was on an indexable page.** The `#need-one` cross-sell note had been
rewritten to say a white or blue card is required in all cases, plus one of three alternatives. That
came from the wa.gov.au owner-builder approval page. **The current 10-page Form 75, page 5, lists
four numbered pathways** under s43(2)(b)(ii) BSR Act, and **pathway 2 — current registration as a WA
Building Practitioner — carries no card clause at all.** The web page also drops the five-year bound
on pathway 4, and contradicts itself higher up by omitting the card entirely from its Eligibility
bullet. Form 75 is the instrument the applicant signs; it wins.

| Fix | Before | After |
|---|---|---|
| `BundleOffer` note | "at least one applicant must hold a white or blue card and, on top of that, either…" | "Form 75 sets out four ways… a currently registered Western Australian building practitioner needs neither the course nor the card" |
| Section `VerifiedSources` | cited the wa.gov.au overview page | cites **Form 75 page 5** |
| Consolidated Sources entry | label said "Form 75", href went to the web overview | label and href now both the Form |

That last one is worth naming on its own: **a citation whose label and target disagree is one a reader
cannot check.** It said Form 75 and linked something else.

**Re-measured:** build green, guardrails 20/20; the "on top of that" phrasing is gone; Form 75 is
linked twice (section provenance + Consolidated Sources); `system-health` 0 failing.

**What this does not reverse.** The other three findings from the independent run stand and were
correct: the section had cited **WorkSafe WA**, the wrong regulator entirely, for an owner-builder
claim; a "since December 2016" date traced only to secondary industry guides; and the breadcrumb
pointed at an unbuilt hub. Only the pathway restructure went the wrong way, and it went wrong by
trusting a regulator's website summary over the regulator's own form.

Standing rule now in `kb/register/state-fees-register.md` (WA row): **do not re-derive these pathways
from the wa.gov.au page.**

---

## Re-verification — hero aspect ratio, 29 July 2026

`a4a1237` added `artefactRatio: "r45"` to the hero. The page source then post-dated this
verification and `check-pipeline` §4 reported it as stale. Re-measured and committed with the fix.

**Scope: the hero box only.** `a4a1237` added three lines to this page and nothing else. No section,
capsule, fact, citation or link changed, so every row above stands, including the corrected Form 75
pathways and their sources.

### What the change does

`Hero.astro:22` defaults `artefactRatio` to **`r54`** (`aspect-ratio: 5/4`, landscape), while every
hero artefact here is authored 4:5 portrait. Without the prop the slot was a landscape box. On this
page that shaped the **FPO placeholder**, since the hero image does not exist yet.

### Measured on the built page

| Check | Measured |
|---|---|
| Wrapper class | `ph r45` |
| CSS aspect | `4 / 5` |
| Rendered box | **499 x 623**, ratio **0.800** |
| Contains an `<img>` | **no** — still the FPO placeholder |
| FPO placeholders on the page | **2**, unchanged |
| `artefactImg` | still absent; the only occurrence in the file is the comment explaining why |

The box is now the shape the eventual image needs, which is the point: when the two assets in
`06-image-prompts.md` are generated at 4:5, they will drop into a 4:5 slot instead of being cropped
by a landscape one.

### Not closed by this pass

**B4 remains open.** Both hero and `#assessment` still ship FPO placeholders exposing the raw image
prompt and spec string to readers, and this page is the only built course page with any. That is a
real-domain deploy gate and is untouched here. Four prompt variants per slot are now recorded in
`06-image-prompts.md` if that helps close it.

The `/payment` origin gate is likewise unchanged.

### 07c · Hero slot closed, 29 July 2026

`artefactImg`, `artefactAlt` and `artefactDesc` set on the hero, so the page source changed and this
verification is refreshed with it.

| Check | Measured |
|---|---|
| Asset | `white-card-wa-hero.avif`, 1000 x 1250, 4:5, 61,894 B, tracked in git |
| Matches `artefactSpec` | yes, exactly. No resize |
| Rendered | box **499 x 623** ratio **0.800**, decoded **640 x 800** ratio **0.800**, distortion-free |
| Serving | `loading="eager"` (LCP candidate), `decoding="async"`, `sizes` identical to QLD and TAS |
| Variants | 12.6 / 40.5 / 56.6 kB |
| Alt | **117 chars**, inside CR2 80-125, describes the frame, does not restate hero copy |
| FPO placeholders | **2 to 1** |
| `check-assets` | 0 failing |

**B4 is half closed.** The `#assessment` slot still ships an FPO placeholder exposing its prompt and
spec string, so the real-domain deploy gate stands. A `[design]` question is recorded at the foot of
`06-image-prompts.md`: the illustration uses maroon, which DESIGN.md reserves for actions.

### 07d · Section band rhythm corrected, 29 July 2026

`#covered` moved from the default band to `bg-alt`.

| | Band sequence |
|---|---|
| Before | alt, d, alt, d, **d, d**, warm, d, alt, d — three adjacent defaults |
| After | alt, d, alt, d, alt, d, warm, d, alt, d — **zero adjacent default pairs** |

Measured from the built HTML, and checked against all three sibling course pages, none of which has
even two adjacent defaults. This was caused by inserting `#covered` between two default sections
without giving it a band; the independent audit flagged the two-in-a-row at the time and it was not
acted on. Section conformance is unchanged: same id, same marker, same position.
