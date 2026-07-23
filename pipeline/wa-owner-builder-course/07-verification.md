# 07 · Pre-deploy verification — /wa-owner-builder-course

**Verifier:** independent (did not build or audit this page).
**Date:** 23 July 2026.
**Artefact measured:** `dist/wa-owner-builder-course/index.html` (75,182 bytes), plus the rendered page at
`http://localhost:4321/wa-owner-builder-course` (dev server confirmed live, HTTP 200).
**Authority model:** knowledge-requirement (WA / Form 75).
**Run type:** targeted-corrections audit of a live, indexed page — not a rebuild.

Every row below carries a value read out of the built HTML or the rendered DOM by script. No row is a tick.

---

## A · Structure

| # | Check | Measured value | Result |
|---|---|---|---|
| A1 | `<h1>` count | **1** | PASS |
| A2 | H1 text | `Owner Builder Course WA, ready for your Form 75.` | PASS — carries the money term "Owner Builder Course WA" |
| A3 | Heading order | H1 → 14×H2 → H3s only. **No H4/H5/H6 anywhere.** | PASS (no cosmetic H6, WCAG 1.3.1 clean) |
| A4 | `<section>` elements total | **15** (12 with `id`, 3 without: at-a-glance `sec bg-alt`, trust band `sec bg-dark trust`, end CTA `sec cta-end`) | NOTE — see C3 |
| A5 | `<section id>` in DOM order | `top`, `course`, `licence`, `need`, `responsibilities`, `learn`, `how`, `cost`, `obligations`, `become`, `content-review`, `faq` | PASS |
| A6 | Markers, in DOM order | `["01","02","03","04","05","06","07","08","09"]` | PASS — strictly sequential, no gaps, no repeats |
| A7 | Marker → section mapping | 01=`course` · 02=`licence` · 03=`need` · 04=`responsibilities` · 05=`learn` · 06=`how` · 07=`cost` · 08=`obligations` · 09=`become`. `top`, `content-review`, `faq` unmarked. | PASS — exactly the mapping 05-components declares |

### A8 · Section conformance, both ways, against 05-components.md

**Plan → page.** All 13 rows of the 05 table resolve to rendered content:

| 05 row | Rendered | H2 measured | Match |
|---|---|---|---|
| `top` (hero) | `section#top` | H1 as above | ✅ |
| (at a glance) | `section.sec.bg-alt` (no id) | `The facts before you enrol` | ✅ |
| `course` / 01 | `section#course` | `Is this course accepted for WA owner-builder approval?` | ✅ exact |
| `licence` / 02 | `section#licence` | `Is it a licence, a permit, or an approval?` | ✅ exact |
| `need` / 03 | `section#need` | `Do you need owner-builder approval, and this course?` | ✅ exact |
| `responsibilities` / 04 | `section#responsibilities` | `Your responsibilities as a WA owner-builder` | ✅ exact |
| `learn` / 05 | `section#learn` | `Introduction plus 12 modules, written for WA` | ✅ exact |
| `how` / 06 | `section#how` | `Three steps to your certificate` | ✅ exact |
| `cost` / 07 | `section#cost` | `Three costs, three payees, nothing hidden` | ✅ exact |
| `obligations` / 08 | `section#obligations` | `What else your WA project needs` | ✅ exact |
| `become` / 09 | `section#become` | `How to become an owner-builder in Western Australia` | ✅ exact |
| `content-review` | `section#content-review` | `Who develops and reviews this course` | ✅ exact |
| `faq` | `section#faq` | `Common questions` | ✅ exact |

**Page → plan.** Two rendered `<section>` elements have no row in the 05 table:

- `section.sec.bg-dark.trust` — H2 `Written for WA, reviewed for currency` (TrustBand/Credentials proof band, sits between `how` and `cost`).
- `section.sec.cta-end` — H2 `Ready to start your WA owner-builder course?` (closing CTA band).

**Result: NOTE, not FAIL.** 05 states "Section ids below are the rendered ids", and both omitted sections are
id-less closing/proof chrome carried by every ABE course page — nothing in this run touched them. But the
table header says "12 sections" while the table itself has 13 rows and the page has 15 `<section>`s. **Demand-list
item:** 05 should either list all rendered `<section>`s or say explicitly that it maps id'd sections only.

Also NOTE: 05 records the H1 as `Owner Builder Course WA, ready for your Form 75` — the rendered H1 has a
**trailing full stop**. Cosmetic; no keyword impact.

---

## B · Answer capsules (target 40–60 words)

Word counts are on the stripped text of each `<p class="capsule…">`, in DOM order.

| # | Section | Words | Result |
|---|---|---|---|
| 1 | (at a glance) | **47** | PASS |
| 2 | `course` | **50** | PASS |
| 3 | `licence` | **55** | PASS |
| 4 | `need` | **60** | PASS (at the ceiling) |
| 5 | `responsibilities` | **56** | PASS |
| 6 | `learn` | **44** | PASS |
| 7 | `how` | **49** | PASS |
| 8 | trust band (`capsule on-dark`) | **28** | NOTE — not an answer capsule; it is the proof-band lede ("A WA-specific course, Introduction plus 12 modules, independently reviewed for currency on 20 June 2026, from a provider that has trained more than 31,000 students since 2007."). The 40–60 target does not apply, but it shares the `.capsule` class, which is why `check-pipeline` counts 12 and a human counts 11. |
| 9 | `cost` | **42** | PASS |
| 10 | `obligations` | **38** | **FAIL (soft)** — two words under the 40 floor |
| 11 | `become` | **55** | PASS |
| 12 | `content-review` | **47** | PASS |

**B-FAIL detail.** `obligations` capsule, verbatim: *"Beyond the course and approval, a few obligations apply:
home indemnity insurance if you sell within seven years, workers' compensation if you employ anyone, the timing
rules on your approval, licensed trades, and the separate council building permit."* = 38 words. It is a complete,
liftable, standalone answer; the miss is 5% under floor and this section was flagged "unchanged" in 05. **Fix or
accept — it does not block deploy**, but it is a measured miss and must not be recorded as a pass.

---

## C · JSON-LD (the authority-model gate)

Single `<script type="application/ld+json">`, **server-rendered in the static HTML**, parses without error.

| # | Check | Measured value | Result |
|---|---|---|---|
| C1 | Blocks | **1**, `@context: https://schema.org`, `@graph` of 5 nodes | PASS |
| C2 | Node `@type`s, in order | `Course` · `EducationalOccupationalCredential` · `BreadcrumbList` · `Person` · `Person` | PASS — Course + Credential + BreadcrumbList + Person ×2 all present |
| C3 | **`recognizedBy` on the credential** | Credential keys are exactly `@type, @id, name, credentialCategory`. **`recognizedBy` is ABSENT.** A whole-document search for the string `recognizedBy` returns **0 hits**. | **PASS — the distinguishing knowledge-requirement fact is correct** |
| C4 | Cross-check vs the state-approved siblings | `dist/qld-…` credential = `…,recognizedBy` → "Queensland Building and Construction Commission (QBCC)"; `dist/tas-…` → "Consumer, Building and Occupational Services (CBOS)"; `dist/act-…` → "Access Canberra (Construction Occupations Registrar)". WA is byte-identical to those minus that one key. | PASS — the omission is deliberate and correctly targeted, not an accident of a broken template |
| C5 | Person ×2 | `Dominic Ogburn` / jobTitle `Course Developer` / `sameAs` linkedin.com/in/dominic-ogburn; `Warwick Smith` / jobTitle `Compliance & Currency Reviewer` / `sameAs` linkedin.com/in/warwick-a-l-smith/ | PASS — **correct for this model.** ABE develops its own knowledge-requirement courses, so a Person titled "developer" is right here (it would be a build failure on an asqa page only) |
| C6 | `Course.offers.price` | `"179"`, `priceCurrency "AUD"` | PASS |
| C7 | Price on the page | `$179` appears **12 times** in visible text — hero CTA, PageBar CTA, at-a-glance capsule, FactGrid PRICE cell, Step 01, cost capsule, PriceCard `$179.00`, PriceCard footnote, bundle row, FAQ, footer note, end CTA. Every instance is $179. | PASS — schema price == on-page price |
| C8 | Arithmetic | PriceCard: $179.00 + $212.00 = **$391.00** ✓. Bundle: $179 + $99 = **$278** ✓. | PASS |
| C9 | AggregateRating / review markup | **0 occurrences** anywhere in the graph or the page | PASS — CLAUDE.md standing decision honoured |
| C10 | `inLanguage` placement | `en-AU` on `Course` and on the `ImageObject` only; **no** `EducationalOrganization` entity, so no invalid `inLanguage` | PASS |
| C11 | BreadcrumbList | 3 ListItems: Home → Owner Builder Training (`/owner-builder-courses`) → WA Owner Builder (`/wa-owner-builder-course`), and renders visually in the PageBar | PASS |
| C12 | Credential `issuedBy` | **Absent.** verification.md §1a expects "ABE `issuedBy` only" for a knowledge-requirement credential. | NOTE — **shared-template gap, not WA-specific.** QLD/TAS/ACT credentials are also missing `issuedBy`, and none of the four links the credential from `Course` via `educationalCredentialAwarded`, leaving an orphan node. Template-level backlog item; not a deploy blocker and not an authority breach. |
| C13 | Breadcrumb home `item` | `https://www.abeeducation.edu.au/` (trailing slash on the root only; all other items slash-less) | PASS — root-slash is the canonical form for a domain root |

---

## D · Authority language (knowledge-requirement hard rules)

Every hit below was pulled with a context window and read, not counted.

| # | Check | Measured | Result |
|---|---|---|---|
| D1 | `recognizedBy` | 0 | PASS (see C3) |
| D2 | "WA-approved" | **3 hits, all negated**: (a) *"there is no accredited or **WA-approved** version of the course"*; (b) CanCant ✕ row *"Not an accredited or **WA-approved** course. WA prescribes no course."*; (c) FAQ *"There is no licence involved, and no accredited or **WA-approved** version of the course."* | PASS — no asserted claim; all three are explicit denials |
| D3 | "approved course / approved provider" | Footer disclosure: *"Western Australia prescribes no owner-builder course and **does not run an approved-provider scheme**"*. Body: *"no course in WA is government approved."* | PASS |
| D4 | "permit" for the owner-builder step | Every "permit" on the page refers to the **council building permit** or is an explicit denial: *"It is **not a licence** and **not a permit**"*; ✕ *"Not the building permit. That is a separate application to your local council."* | PASS |
| D5 | "licence" for the owner-builder step | 20 hits reviewed. Denials (*"It is not a licence"*, *"There is no licence involved"*, *"Not a licence. That is what a registered building contractor holds."*), explanatory (*"people search for a licence or a permit, so it is worth being clear"*), or the correct adjectival use (*"licensed trades"*, *"licensed practitioners"*, *"a licensed builder"*). **Zero assertions that the owner-builder step is a licence.** | PASS |
| D6 | The positive framing | *"the accurate way to describe this course is that it **supports your Form 75 owner-builder approval**"* | PASS — exactly the sanctioned phrasing |
| D7 | ABE claimed as an RTO | 6 "RTO" hits: 4 in shared nav/footer chrome naming the RTO **partners** (Blue Dog 31193 / Upskill 45708 / AlertForce 91826), plus two denials — trust band *"This is **not an RTO course** and **not nationally recognised training**; WA prescribes no owner-builder course"* and footer *"**ABE Education is not a Registered Training Organisation (RTO)**"*. Page-level footer repeats it a third time. | PASS |
| D8 | "accredited" | 5 hits: 3 are the negations at D2; 2 are shared footer chrome describing the ASQA-accredited product line generally | PASS |
| D9 | "nationally recognised" | 5 hits: 3 in shared nav chrome (White Card / NSW OB menu labels), 2 are the D7 denials | PASS |
| D10 | White Card unit code | **`CPCWHS1001`** (single C) in both the `course` body and the bundle row | PASS — correct WA code |
| D11 | Regulator naming | "Building Services Board", "Building and Energy", `wa.gov.au`. Contains the deliberate currency test: *"If a course still refers to the Building Commission or the Department of Mines, its WA content is out of date."* | PASS — current names, and the superseded names appear only as a negative signal |
| D12 | `<html>` attributes | `lang="en-AU" data-authority="knowledge-requirement"` | PASS |

**Authority-model verdict: clean.** No breach, no `recognizedBy`, no asserted licence/permit/approved-course claim.

---

## E · Government facts vs `kb/register/`

Every regulatory figure was re-read against the register, because a wrong one is a RED regardless of everything else.

| Claim on page | Register value | Result |
|---|---|---|
| Approval needed over **$20,000** | `legislation-references-wa.md` §1 + `state-fees-register.md`: "$20,000" | PASS |
| **Four** sufficient-knowledge pathways, s43(2)(b)(ii), Form 75 p5 | Register lists exactly four, incl. "one of those registrations within the **last five years**" | PASS — page states all four, and adds *"buy nothing here and put your registration number on the form instead"*, which is the register's "pages must not imply the course is the only route" instruction honoured |
| Course currency **two years** | Register: "no more than **two years** before the application" | PASS |
| **Six-year** limit runs **from the building permit**, not the approval; waiver via Form 76 | Register: "the clock runs from the **building permit being granted**, NOT from the approval… Waiver via Form 76 / s45(2)" | PASS — and the page spells out the trap explicitly |
| Approval **lapses at six months**; on refusal ends at refusal; once issued, runs **until the building is complete** | Register quotes Form 75 p2 verbatim to that effect and instructs "prefer the Form's wording" | PASS — `become` uses the Form's three branches |
| Fees **$212** residential / **$467** industrial-commercial | Register: "$212.00 residential / $467.00 industrial/commercial", current FY26-27 as at 22 Jul 2026 | PASS |
| Fee reviewed **each 1 July**, "confirm the current amount before you lodge" | Register carries the LGIRS caveat and the re-check instruction | PASS — the caveat is surfaced to the reader, twice |
| **~six weeks** processing, *"varies with volume and how complete your application is"* | Register: "approximately within six weeks" **with** the variability caveat, "not as a flat promise" | PASS — caveat present both times it is stated |
| **Seven-year** resale / home indemnity insurance, penalty **$10,000** | Register: "cannot be sold within 7 years"; HBCA 1991 | PASS |
| False/misleading info penalty **$25,000**, BSR Act 2011 | Register: "Section **99** … penalties up to **$25,000**" | PASS |
| WHS duties under **Work Health and Safety Act 2020** | Register §2 | PASS |
| Class 10a under **$50,000** exempt; 1–2 storey commercial under **500 m²** | Not in the register file; sourced on-page to the WA — Owner-builder approval page in the `need` VerifiedSources block | PASS with visible citation |

`check-claims.mjs --verbose` independently confirms the WA page's figures are inside the **150/150 matched** set —
the only WA figures it excludes are ABE's own commercial prices ($179 ×12, $391.00 total reconciled by sum,
$99/$278 reconciled by the bundle check). No WA government figure is excluded from checking.

---

## F · Sourcing, freshness and the review date

| # | Check | Measured | Result |
|---|---|---|---|
| F1 | Breadcrumb freshness line | `Reviewed by Warwick Smith on 20 June 2026` — crawlable HTML in the PageBar, not schema or CSS | PASS |
| F2 | Per-section VerifiedSources blocks | **8 blocks**: `course` (23 Jul 2026), `licence` (7 Jul), `need` (23 Jul), `responsibilities` (7 Jul), `learn` (Course v2.0, 27 Jun), `how` (7 Jul), `obligations` (7 Jul), `become` (23 Jul), `faq` (7 Jul). Each `facts` string names what was re-verified, not a generic phrase. | PASS |
| F3 | Consolidated Sources block | 8 entries: WA — Owner-builder approval (7 Jul 2026) · Form 75 PDF (7 Jul 2026) · BSB Sufficient knowledge policy PDF (board-approved 10 Sep 2024) · Building and Energy fees $212/$467 (current FY26-27, verified 22 Jul 2026) · Building Act 2011 · Building Services (Registration) Act 2011 · Home Building Contracts Act 1991 · WorkSafe WA. **All primary `.gov.au` / legislation sources. No aggregator, no ABLIS, no business.gov.au, no competitor, no ABE self-citation.** | PASS |
| F4 | **Review date — EVERY occurrence** | Scanned all date strings in visible text. `20 June 2026` occurs **4 times**: (1) PageBar `Reviewed by Warwick Smith on 20 June 2026`; (2) trust-band capsule `independently reviewed for currency on 20 June 2026`; (3) `content-review` capsule `Warwick's review, dated 20 June 2026`; (4) FAQ Q6 `independently reviewed for currency on 20 June 2026`. **All four agree.** | **PASS — the prior two-different-dates defect is resolved** |
| F5 | Other dates, cross-checked for conflict | `23 Jul 2026` ×3 (VerifiedSources), `7 Jul 2026` ×7 (VerifiedSources + Sources), `27 Jun 2026` ×1 (course v2.0 build date — a different thing from the review date), `10 Sep 2024` ×1 (BSB policy board-approval date), `22 Jul 2026` ×1 + `22 July 2026` ×1 (fee verification, footer). Month-only: `Updated June 2026` (hero) and `updated in June 2026` (`learn`) — both consistent with the 20 June review. | PASS — no conflicting date |
| F6 | Date-format consistency | The same fee-verification date renders as `22 Jul 2026` in the Sources block and `22 July 2026` in the footer. | NOTE — cosmetic only, same date |
| F7 | Fee re-verify cadence | 1 July 2026 indexation has passed; register re-checked 22 Jul 2026; page carries the "reviewed each 1 July, confirm before you lodge" caveat twice | PASS |
| F8 | `[confirm: …]` / `[TO VERIFY]` | **0 and 0** | PASS |
| F9 | Expert profiles exist | Both cards link `Full profile →` plus LinkedIn; Person `sameAs` present for both | PASS |

---

## G · Meta, indexation and images

| # | Check | Measured value | Result |
|---|---|---|---|
| G1 | `<title>` | `Owner Builder Course WA - Form 75 Ready, Online $179` — **52 chars** | PASS (≤60) |
| G2 | `<meta name="description">` | `In WA it is an owner-builder approval, not a licence, and you lodge Form 75. This WA-specific course gives the knowledge the Board accepts, for $179.` — **149 chars** | PASS — will not truncate; matches 05's "cut to 149" note exactly |
| G3 | Canonical | `https://www.abeeducation.edu.au/wa-owner-builder-course` | PASS — www, https, **no trailing slash** |
| G4 | Robots | `<meta name="robots" content="index,follow">` | PASS — correct for a live indexed page |
| G5 | OG / Twitter | 6 `og:` + 3 `twitter:` tags | PASS |
| G6 | `<img>` total | **7** | — |
| G7 | Content image alt lengths | hero **131**; `course` site photo **111**; `how` desk photo **123**; `obligations` insurance photo **126**; Dominic portrait **120**; Warwick portrait **117** | PASS — all six ≥ 80 chars, en-AU, descriptive |
| G8 | Decorative image | ABE header logo, `alt=""`, **no `aria-hidden`**. Parent `<a aria-label="ABE Education home">` supplies the accessible name and the link also carries visible text. | NOTE — **shared chrome** (`SiteHeader.astro`), present on every ABE page. Accessible name is not lost; the missing `aria-hidden` is a template tidiness item |
| G9 | Expert headshots | Real photographs (r2.dev `Dominic_Ogburn_portrait.webp`, `warwick smith rto consultant expert.avif`), not AI-generated | PASS |

---

## H · Banned copy and CTA hygiene

| # | Check | Measured | Result |
|---|---|---|---|
| H1 | "comprehensive" | **0** | PASS |
| H2 | Em dashes in **body copy** | **13 total in visible text; 0 in body copy.** All 13 sit inside source-citation labels: `WA — Owner-builder approval` ×9, `Form 75 — Approval, Owner-builder (PDF…)` ×2, `ABE Education — WA Owner-Builder Course modules…` ×1, `BSB — Sufficient knowledge policy (PDF)` ×1. Enumerated one by one. | PASS |
| H3 | En dashes | 0 | PASS |
| H4 | "Enrol now" / "Enrol today" | **0** | PASS |
| H5 | CTA inside an answer capsule | Scanned all 12 `.capsule` elements for `<a>`/`href`/`btn`: **0 hits** | PASS |
| H6 | CTA inside an FAQ answer | 8 `<details>` blocks; **0 contain an `<a>`**. The 2 anchors inside `section#faq` are the two source links in the section's VerifiedSources block, outside every answer. | PASS |
| H7 | "verified" beside a Trustpilot reference | 0 Trustpilot references on the page | PASS |
| H8 | CTA inventory + tap size | `Get your certificate for $179` (hero, 266×**54px**), PageBar `btn-mini` (227×41px), `See who needs approval` (text link, 213×26px), `Enrol in the bundle` (196×54px), `Get an owner-builder insurance quote` (346×54px), `Get your certificate for $179` (end, 266×54px) | PASS on the primaries — all three primary buttons are **54px**, above the 44px floor. The `btn-mini` at 41px and the `btn-link` at 26px are secondary/inline, above the 24px AA minimum |
| H9 | "Enrol in the bundle" | Not the banned passive form ("Enrol now/today"); it names a specific object | PASS — NOTE only: it is imperative rather than benefit-led first person, unlike the other five CTAs on the page |
| H10 | Sticky CTA | **Absent.** No element matching `[class*="sticky"]` in the rendered page, and `grep` finds none in `dist/qld-…`, `dist/tas-…`, `dist/act-…` or `dist/white-card-tas` either, though `src/components/StickyCta.astro` exists. | NOTE — **shared-template gap across all five course pages**, not a WA defect. readability §CTA wants a sticky CTA on long/mobile pages. Backlog item for the template, not this run |
| H11 | Duration numerals in prose | House style wants durations spelled out in prose. Spelled correctly: "two years", "seven years", "six months", "six years", "five years", "forty years". **Two numeral exceptions in prose:** H3 label `One approval every 6 years` (its body correctly says "every six years"), and `helped ABE students for close to 20 years` in the InsurancePartner block. Data cells (`19 YEARS OPERATING`, `40+ years`, `12 MODULES`) are permitted numerals. | NOTE — 2 minor house-style misses, both outside the sections this run touched |

---

## I · Repo checks — every line naming this slug, quoted verbatim

### `node scripts/check-claims.mjs`

```
  0 failing, 3 warning, 6 ok, 127 excluded
```

**Lines naming `wa-owner-builder-course`: none.** All three WARNs are TAS CPD (`cpd-building-tas` total not
reconciled; CPD electrical 11 points; CPD plumbing 13 courses / 12-point cap) and are unrelated to this slug.
Coverage of this page is positively confirmed by:

```
  OK    Figures: 150/150 page figures match the register (127 excluded — run with --verbose to list them)
  OK    Totals: 7 course page total(s) reconcile with price + register fee
  OK    Bundles: 3 bundle offer(s) reconcile (ABE commercial prices, not register figures)
```

and `--verbose` shows the only WA exclusions are commercial, not regulatory:

```
    src\content\courses\wa-owner-builder-course.mdx
      $179 ×12, $179.00  — this page's own price
      $391.00  — total reconciled by the sum check
      $99, $278  — ABE bundle price, reconciled by the bundle check
```

### `node scripts/check-freshness.mjs`

```
Register freshness: 16/16 current.
CPD approvals: 13 live of 17, 0 lapsed-but-live.
```

**Lines naming `wa-owner-builder-course`: none.** The four advisory lines (`STALE-TAG` ×2, `SOFT-DATE`, `NO-WHS`)
are all TAS CPD course-catalogue items. The WA registers this page depends on
(`legislation-references-wa.md`, `state-fees-register.md`) are inside the 16/16 current.

### `node scripts/check-pipeline.mjs`

```
  FAIL  wa-owner-builder-course: missing artefact(s) — 07 (pre-deploy verification)
  WARN  wa-owner-builder-course: 12 capsule(s) on the page with no close match in 04 — first: "wa runs a knowledge requirement model so this wa specific course plus ..."
  OK    wa-owner-builder-course: 11 section(s) match the plan
```
```
  1 failing, 1 warning, 7 ok
```

- **FAIL "missing 07" — EXPECTED.** 07 is this file. It did not exist when the check ran. Re-running after this
  file lands will clear it.
- **WARN "12 capsules" — I agree with 05-components' recorded decision, with one correction.** 05 argues the
  warning is correct and should stand because 04 is an audit artefact that authored only three changes and
  deliberately did not restate the page's existing capsules. I independently verified `check-pipeline.mjs:161`:
  the page-side regex is `<p class="capsule[^"]*"`, which matches 11 true answer capsules **plus** the trust-band
  `capsule on-dark` proof lede — so the "12" is 11 capsules + 1 non-capsule element sharing the class, not 12
  answer capsules. Re-drafting live, accurate, position-3 copy into 04 purely to satisfy a mechanical diff would
  be a worse outcome than the warning. **The demand-list item in 05 §"Recorded decision" is well-founded and I
  endorse it**, with the addition that the checker should also stop counting `.capsule.on-dark` proof bands as
  answer capsules.
- **OK "11 section(s) match the plan"** — the checker counts 11 where I count 12 id'd sections; it evidently
  excludes `top`. Consistent with the plan either way.

### `node scripts/system-health.mjs`

```
  FAIL  wa-owner-builder-course: missing artefact(s) — 07 (pre-deploy verification)
  WARN  No Stage-9 review for "wa-owner-builder-course" — that run was never seen by the learning loop
  WARN  wa-owner-builder-course: 12 capsule(s) on the page with no close match in 04 — first: "wa runs a knowledge requirement model so this wa specific course plus ..."
  OK    wa-owner-builder-course: 11 section(s) match the plan
```
```
  1 failing, 15 warning, 18 ok
```

The FAIL and the capsule WARN are the same two items dispositioned above. The Stage-9 WARN is a
**post-deploy** obligation (it applies equally to QLD, TAS, ACT, NSW and the hub, all listed alongside it) and
does not gate this deploy. `Register: 16/16 current`, `Skill references: 65/65 resolve`, and
`Code claims: 6/6 verified against source` all pass. The remaining WARNs are TAS CPD and review-coverage
housekeeping, none naming this slug.

---

## J · MANDATORY AUDIT 1 — abe-readability-audit

**Both scripts ran.** Interpreter: `py` (Python 3.14.4). Dev server confirmed live on 4321 before the render probe.

### J1 · `audit_static.py dist/wa-owner-builder-course/index.html`

```
FAIL: 0   FLAG: 4   checks: 10
```

| Finding | Measured | Triage |
|---|---|---|
| `[FLAG] Body font-size >= 16px` — "no explicit body font-size found" | Probe looks for a literal `body{font-size:…}`; this build sets type via tokens | **Probe artefact.** Rendered body prose measured at 15–18px; the `.capsule` is 18px/1.55, `.measure` prose 17px |
| `[FLAG] No meaningful text below 12px` — 13 declarations at 9.5–11px | `.pagebar .crumbs li` 11px, `.pagebar .reviewed` 11px, `.ht-eyebrow` 10px, `.ht-rail` 11px/9.5px, `.ht-n` 10px, `.bt-sub` 10px, `.bt-tlabel` 11px, `.bundle-note` 11px, `.mr-no`/`.mr-mods`/`.mr-mnum` 11px, `.mr-olabel` 10px | **Shared template.** Every one is a component eyebrow, rail label, crumb or numeric badge from `PageBar`/`Hero`/`BundleOffer`/`ModuleRows` — micro-labels, not running prose, and identical on every ABE course page. Real but template-owned |
| `[FLAG] Page ground is off-white` / `[FLAG] Body ink is off-black` — "not found" | Probe cannot resolve `var(--paper)` / `var(--ink)` | **Probe artefact.** Verified in the rendered DOM: ground `rgb(255,255,255)` on the hero/`sec` bands with `rgb(247,244,239)` warm and `rgb(242,243,244)` alt bands; ink `rgb(26,26,26)` — **off-black, not `#000`**. The ABE hard rule on pure black is met. The pure-`#fff` ground on default `sec` bands is worth a template look, but it is the site-wide token, not a WA choice |
| `[pass] ×6` | one `<h1>`; `lang="en-AU"`; 0 of 7 images missing alt; no justified text; no multi-column prose; measure cap present | — |

### J2 · `audit_render.py http://localhost:4321/wa-owner-builder-course`

```
FAIL: 5   FLAG: 0   checks: 8
[pass] No horizontal overflow at 360px / 390px
[pass] Mobile measure (390px)  ~42 CPL on widest prose (334px @ 16px)
```

Each FAIL triaged, with an independent DOM measurement rather than the probe's word:

| Probe FAIL | Independent measurement | Triage |
|---|---|---|
| Horizontal overflow at 320px — `scrollWidth 324 > 320`, offender `button.burger-btn` | `button.burger-btn` is declared in `SiteHeader.astro` (`.site-head .burger-btn`) | **Shared chrome.** Present on every ABE page. Real WCAG 1.4.10 reflow issue, template-owned, 4px over |
| Tap target — `button.burger-btn 40x20px` | Same element | **Shared chrome.** Same component, same ticket. Below the 24px AA minimum on the *height* axis |
| Live contrast @390px and @1280px — `1:1 rgba(255,255,255,0.92) on rgb(255,255,255)` for "A WA-specific course, Intr" and "Introduction plus 12 modul" | I read the real cascade in the browser: element `.capsule.on-dark` colour `rgba(255,255,255,0.92)`, own background `rgba(255,255,255,0.06)`, **ancestor `section.sec.bg-dark.trust` background `rgb(26,26,26)`** | **Probe artefact — the two most alarming numbers on the report are false.** The probe composites the element's own translucent background over a default white instead of walking to the opaque `.bg-dark` ancestor. Actual contrast is roughly 14:1. Not a defect |
| Live contrast — `2.81:1 rgb(154,154,154)` on "Next" @10px | `p.waynext > a > span.lab` (WayfinderNav) | **Shared template** |
| Live contrast — `3.15:1 rgb(138,138,138)` on "CDRG" @11.5px | `ul.cred-list > li > span.cl-b` (ExpertCredentials) | **Shared template** |
| Live contrast — `3.81:1 rgba(255,255,255,0.4)` on "Sources" @11px | `footer > div.wrap > div.f-sources > span.f-col-h` (SourcesFooter) | **Shared chrome** |
| Live contrast — `2.53:1` on "On this page" @10px | `nav.waynav > div.wrap > div.jl > span.wl` (SectionWayfinder) | **Shared chrome** |
| Live contrast — `2.81:1` on "About" @12.5px | `nav.head-nav > span.nav-l.soon` (SiteHeader "coming soon" nav labels) | **Shared chrome** |
| Desktop measure — `~91 CPL on widest prose (820px @18px)` | I re-measured true chars-per-line with `Range.getClientRects()` across all 53 prose blocks at 1280px. **Median 70 CPL.** Running prose (`.measure` capped at 480px, `.capsule` at 66ch) is inside target. **The genuine offenders are wider than the probe reported:** `.price-foot` **172 CPL** (1108px @14px, `cost`), `.note` **156 CPL** (`licence`), `.note maroon` **154 CPL** (`become`), `.note` **150 CPL** (`learn`), `.note` **142 CPL** (`obligations`), `.note maroon` **128 CPL** (`responsibilities`) | **Shared template, but the worst finding of the audit.** `global.css:269` `.note{…}` and `:431` `.price-foot{…}` declare **no `max-width`**, so both stretch to the full 1144px wrap. Confirmed template-wide: `dist/qld-`, `dist/tas-` and `dist/act-owner-builder-course` each render 6 `.note` blocks under the same rule. Mobile is unaffected (42 CPL). **Not this page's defect — but this page uses 5 Notes, so it is the page that hurts most.** Recommend a `max-width:70ch` on `.note` and `.price-foot` as a one-line template fix |

**Readability net for this page:** 0 page-specific defects. 2 probe artefacts (including both 1:1 contrast
readings). All remaining findings are shared chrome/template and are being recorded as template backlog, not
as WA content defects.

---

## K · MANDATORY AUDIT 2 — final-check (six checks)

Run against the rendered visible copy (`main.innerText`, 1280px), not the source.

**1 · Contradictions — 1 soft finding.**
Cross-checked every repeated fact: price ($179, 12×), pass mark (80%, 2×), attempts (3, 2×), threshold ($20,000,
3×), fees ($212/$467, 4×), six-month clock (2×), six-year rule (2×), seven-year resale (3×), review date (4×),
student count (31,000+, 2×), years operating (19 vs "since 2007" = correct), Dominic's tenure (40+ / "more than
forty" = consistent). **No hard contradiction.** One soft tension: `obligations` §03 "Approval validity" says
*"Building permits themselves are valid for two years"*, while `become`'s Deadline note follows Form 75 and says
*"once the permit is issued, your approval runs until the building is complete."* Both statements are true and
about different instruments, but a reader meeting the two-year figure first may carry it across to the approval —
which is exactly the wa.gov.au framing the register warns against ("**Prefer the Form's wording**"). **Recommend**
tightening §03 to name the instrument, e.g. *"the building permit itself is valid for two years; your approval
runs until the building is complete."* Not a wrong fact, not a blocker.

**2 · Duplicate / repeated information — 1 real finding, 3 accepted.**
- **Real:** inside `become`, the capsule says *"Many approvals are determined in approximately six weeks, though
  that varies with volume and how complete your application is"* and Step 03 says *"Many applications are
  determined in approximately six weeks, though timeframes vary with the volume of applications and how complete
  yours is."* That is a full clause restated near-verbatim within one section, ~200 words apart. **Recommend
  trimming Step 03 to the bare timeframe.**
- **Accepted:** the at-a-glance capsule opens *"WA runs a knowledge-requirement model"* and `course`'s first body
  paragraph opens *"WA runs what is called a knowledge-requirement model"* — an echoed opener, mitigated by the
  intervening capsule. The "no accredited or WA-approved version" line appears 3× (`licence` capsule, CanCant ✕
  row, FAQ) and the seven-year insurance rule 3× (`obligations` capsule, §01, InsurancePartner) — both are the
  page's core authority and liability points, and deliberate reinforcement across capsule / list / FAQ is the
  house pattern for AI-extractable copy.

**3 · Logical flow — pass.** Accepted → defined → do-I-need-it → what-it-costs-me-in-duty → what-I-learn → how →
price → wider obligations → the full path → who says so → FAQ → CTA. Reassurance-first, answer-first, and the
"you may not need this course at all" passage lands early rather than being buried. `WayfinderNav` "Next: …"
links carry the reader between sections. One structural overlap: `how` (three course steps) and `become` (five
regulatory steps) both present a numbered path; they are distinguishable by eyebrow ("HOW IT WORKS" vs "THE FULL
PATH") and serve different jobs, so I accept it.

**4 · Logical grouping — pass with one observation.** The six-year rule is explained in `need` and re-stated as a
card in `obligations` §04; the six-month clock appears in `obligations` §03 and `become`'s Deadline note. Both
sit correctly in both places (once as explanation, once as checklist), but a reader scanning only `obligations`
gets the six-month lapse without the refusal/completion branches. Minor.

**5 · Australian English — pass, clean.** Scanned for 21 US spellings (`organiz-`, `recogniz-`, `color`,
`center`, `program`, `labor`, `enroll`, `fulfill`, `analyze`, `behavior`, `favor`, `traveled`, `catalog`,
`defense`, `meter`, `specialty`, `skillful`, `installment`, `judgment` …) in **visible text only**: **zero hits**.
`licence`/`license` discipline is correct throughout — noun `licence` ("It is not a licence", "no licence
involved"), adjective/participle `licensed` ("licensed trades", "licensed practitioners", "a licensed builder",
"not a licensed insurance provider"). Footer uses `recognised`. `en-AU` declared on `<html>`.

**6 · AI-writing patterns — pass.** See §L.

---

## L · MANDATORY AUDIT 3 — ai-detector

Scanned the full body copy for AI-authorship tells.

**Lexical tells: none.** Zero instances of *comprehensive* (0), *delve*, *leverage*, *robust*, *seamless*,
*landscape*, *navigate the complexities*, *in today's*, *it's important to note*, *when it comes to*, *unlock*,
*empower*, *elevate*, *tapestry*, *testament to*, *ever-evolving*.

**Structural tells: none material.** No formulaic three-part opener; no "Firstly/Moreover/Furthermore" chain;
no over-hedged qualifiers; no em dashes in prose (0 — the 13 are citation labels); no title-case headings.

**Two low-confidence signals, both defensible as human craft:**
1. **Anaphora in `responsibilities`** — four consecutive paragraphs open with "You" (*You hold and comply… You
   engage… You carry… You supervise…*). Parallel construction is a documented AI habit, but here it is a
   duty-list rendered as prose and the parallelism is doing deliberate work. Not flagged as a defect.
2. **Antithesis pairs** — *"the difference between a clean application and a false start"*, *"It is not a
   licence, it is not the approval itself, and no course in WA is government approved."* Common in AI output;
   also common in good direct-response copy. Below the threshold.

**Strong human markers (evidence against AI authorship):**
- Commercially self-defeating advice, which a generator optimising for conversion does not write:
  *"You may not need this course at all… If one of those describes you, **buy nothing here** and put your
  registration number on the form instead."*
- A blunt negative admission: *"There is no free preview; what you get instead is…"*
- A specific, checkable heuristic no model would invent: *"If a course still refers to the Building Commission
  or the Department of Mines, its WA content is out of date."*
- Correction of a common misreading, in the reader's own voice: *"The six-year limit is not what most people
  think."*
- Australian tradesman idiom: *"40+ years on the tools"*, *"stepping into the builder's shoes"*, *"take the role
  on with your eyes open"*.
- Dense, specific, verifiable particulars (Form 76, s43(2)(b)(ii), s99, BAL, Class 1a(i), BA7, Lic. 369417C,
  Stuart Brothers since 1886).

**Verdict: low AI-authorship signal. Reads as human-authored specialist copy.**

---

## M · Consolidated findings

### Page-specific — action recommended, none blocking

| Ref | Finding | Severity |
|---|---|---|
| B10 | `obligations` answer capsule is **38 words**, 2 under the 40 floor | Minor |
| K2 | `become`: the "approximately six weeks + variability caveat" clause is restated near-verbatim in the capsule and in Step 03 | Minor |
| K1 | `obligations` §03 puts the building permit's two-year validity next to the approval's six-month lapse without naming which instrument the two years belongs to; register says prefer the Form's wording | Minor |
| H11 | Two numeral durations in prose: H3 `One approval every 6 years`; `close to 20 years` | Cosmetic |
| F6 | Same date rendered `22 Jul 2026` (Sources) and `22 July 2026` (footer) | Cosmetic |
| A8 | 05-components' table header says "12 sections" but has 13 rows, and omits two rendered id-less sections | Artefact hygiene |

### Shared chrome / template — NOT this page's defects, recorded for the template backlog

| Ref | Finding |
|---|---|
| J2 | `.note` runs **128–156 CPL** and `.price-foot` **172 CPL** at 1280px — `global.css:269` and `:431` set no `max-width`. Confirmed identical on QLD/TAS/ACT. Highest-value one-line fix on the list |
| J2 | `button.burger-btn` (`SiteHeader.astro`) causes 324px scrollWidth at a 320px viewport and is a 40×20px tap target |
| J2 | Sub-AA contrast on five micro-label styles: `.waynext .lab` 2.81:1, `.waynav .wl` 2.53:1, `.nav-l.soon` 2.81:1, `.cl-b` 3.15:1, `.f-col-h` 3.81:1 |
| J1 | 13 declarations at 9.5–11px across PageBar/Hero/BundleOffer/ModuleRows |
| H10 | No sticky CTA on any ABE course page, though `StickyCta.astro` exists |
| C12 | Credential node has no `issuedBy` and no `educationalCredentialAwarded` link from `Course` — on all four owner-builder pages |
| G8 | Header logo has `alt=""` without `aria-hidden` (accessible name supplied by the parent link's `aria-label`) |

### Probe artefacts — no action

- `audit_render.py` reports `1:1` white-on-white for the two `.capsule.on-dark` strings. **False.** Verified in
  the DOM: the ancestor `section.sec.bg-dark.trust` background is `rgb(26,26,26)`; real contrast ≈14:1.
- `audit_static.py` "no explicit body font-size", "ground colour not found", "ink colour not found" — the probe
  cannot resolve CSS custom properties. Verified in the DOM: ink `rgb(26,26,26)` (off-black ✓), grounds
  `#fff` / `rgb(247,244,239)` / `rgb(242,243,244)`.

---

## N · Hard-blocker sweep

| Hard blocker (verification.md) | Measured | Status |
|---|---|---|
| No H1 / >1 H1 / H1 without the target keyword | 1 H1, contains "Owner Builder Course WA" | CLEAR |
| Schema missing or invalid | 1 block, parses, 5 nodes, all four required types present | CLEAR |
| **`recognizedBy` present on a WA page** | **0 occurrences of the string anywhere in the document** | **CLEAR** |
| On-page price ≠ `Course.offers.price` | $179 × 12 on page; `offers.price` = "179" | CLEAR |
| RTO / accredited / WA-approved-course authority breach | 0 asserted; all such strings are explicit denials or shared-chrome references to RTO partners | CLEAR |
| Government claim with no visible source, or Sources section missing | 8 per-section VerifiedSources blocks + an 8-entry consolidated Sources block, all primary `.gov.au`/legislation | CLEAR |
| Unresolved gov fact / `[confirm:` / `[TO VERIFY]` | 0 / 0 / 0 | CLEAR |
| Gov fee past re-verify cadence | Fees re-verified 22 Jul 2026 after the 1 Jul 2026 indexation; caveat on page | CLEAR |
| Primary keyword cannibalised by another ABE page | WA is the only ABE page targeting "owner builder course WA"; sibling state pages target their own states; hub links down, page links up to `/owner-builder-courses` | CLEAR |
| Banned CTA / CTA in an answer or FAQ / "comprehensive" | 0 / 0 / 0 | CLEAR |
| Pure-black ink or pure-white ground; body below AA; primary CTA under 44px | Ink `rgb(26,26,26)`; primary CTAs 54px; body prose passes AA | CLEAR on ink and CTA. NOTE: default `sec` bands render `#fff` — a site-wide token question, not a WA content defect |

**All 12 hard blockers clear.**

---

## O · Verdict

# GREEN

The page is correct and safe to deploy.

- The **authority model is verifiably right**: the credential carries **no `recognizedBy`** (0 occurrences of
  the string in the whole document), proven against the QLD/TAS/ACT siblings which each carry their regulator.
  Person ×2 with Dominic Ogburn as developer is correct for a knowledge-requirement course. No "WA-approved
  course/provider" claim, no "permit"/"licence" assertion for the owner-builder step — all such wording is
  explicit denial or explanation. ABE is never claimed to be an RTO, and is three times stated not to be.
- **Every regulatory figure matches `kb/register/`**: $20,000, four pathways, two-year currency, six years from
  the building permit, six-month lapse with the Form's three branches, $212/$467 with the 1 July caveat, ~six
  weeks with the variability caveat, seven-year resale, $25,000 s99 penalty, CPCWHS1001.
- **The prior two-different-dates defect is fixed**: `20 June 2026` appears 4 times and all four agree.
- The six page-specific findings in §M are minor or cosmetic. The single measured miss against a stated target
  is the `obligations` capsule at **38 words** (floor 40) — recorded as a FAIL row, not a pass, and not a blocker.

### Confirmation that all three mandated audits ran

| Audit | Ran? | Evidence |
|---|---|---|
| **abe-readability-audit** | **YES — both scripts** | `py …/audit_static.py dist/wa-owner-builder-course/index.html` → `FAIL: 0  FLAG: 4  checks: 10`. `py …/audit_render.py http://localhost:4321/wa-owner-builder-course` → `FAIL: 5  FLAG: 0  checks: 8`. Dev server confirmed live (HTTP 200) before the render probe. All 5 render FAILs triaged in §J2 into 2 probe artefacts and shared-chrome/template items, each with an independent DOM measurement; **0 page-specific defects**. |
| **final-check** | **YES — all six checks** | §K: contradictions (1 soft), duplicates (1 real, 3 accepted), logical flow (pass), logical grouping (pass w/ observation), Australian English (**pass, 0 US spellings in visible text**, licence/licensed discipline correct), AI-writing patterns (pass). |
| **ai-detector** | **YES** | §L: zero lexical tells, no structural tells, two low-confidence signals both defensible, six strong human markers including commercially self-defeating advice. **Low AI-authorship signal.** |

None was skipped. None was unrunnable.

### Post-deploy obligation

`check-pipeline` / `system-health` will clear the `missing 07` FAIL once this file is committed. The standing
`No Stage-9 review for "wa-owner-builder-course"` WARN is post-deploy and applies to five other pages equally;
it does not gate this deploy.
