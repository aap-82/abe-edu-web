# 07 · Stage 7 — POST-FIX RE-VERIFICATION ADDENDUM (24 July 2026)

**This addendum sits above the original verification report, which is preserved in full below.**

The verification below returned **AMBER** and named five findings. The three WA-page content findings
have been fixed in `src/content/courses/wa-owner-builder-course.mdx` and the page rebuilt; an
**independent second verifier** (fresh subagent, read only the rebuilt `dist/` HTML) confirmed each
fix against the built output with quoted evidence and found **no regression**.

| Finding | Fix applied | Independent re-verify |
|---|---|---|
| **F2** — page-foot Sources dated the WA-approval + Form 75 sources "7 Jul" while inline blocks cited the same URLs "23 Jul" | Foot entries bumped to "Verified 23 Jul 2026" — both sources were genuinely re-accessed 23 Jul during the WA run; inline per-fact dates left as truthful per-claim provenance | **FIXED** — 0 "7 Jul" in the foot; both entries read 23 Jul |
| **F28** — `VerifiedSources` renders `{facts} against {source}`, so 7 facts strings ending "against the current Act/guidance" rendered a doubled "against" | Ended each facts string at "fact-checked"; the named source now carries the "against" | **FIXED** — `current (Act\|guidance) against` count = 0; all 9 ledgers read with a single joiner |
| **F3** — the "Workers' compensation" obligation card asserts "you must hold cover" with no source on the page | Added the primary instrument (**Workers Compensation and Injury Management Act 2023**, browser-verified 24 Jul: s17 "Employer liable for compensation") to the `#obligations` VerifiedSources and named workers' comp in its facts. Corroborating reader-facing source: Consumer Protection WA — "all workers must be covered by a valid workers' compensation insurance policy" | **FIXED** — obligations ledger names workers' comp and links the WA .gov.au Act |

**Second verifier verdict: GREEN** — all three fixed in the built HTML; WA authority model intact
(zero `recognizedBy`, two Person nodes), price parity holds, `check-claims` 0 failing with no line
naming this slug.

**Still open — NOT WA-page defects, deliberately not fixed here (global-token decisions):**
- **F1** `--paper:#ffffff` is the body ground (pure white); the audit spec fails pure-white ground.
- **F18** `--slate-light:#9a9a9a` measures ~2.6:1, below WCAG AA.
Both are in `src/styles/global.css`, apply to **every** ABE page, and `CLAUDE.md` gives `global.css`
precedence over the audit spec. They need a recorded site-wide design decision, not a one-page edit,
and are logged here as backlog rather than silently passed.

**Net state of this page:** no WA-specific content defect remains open. The only outstanding items are
the two site-wide token decisions above. This addendum + the fixes are committed together with the page
so `check-pipeline.mjs` §4 certifies the corrected build.

---

# 07 · Stage 7 pre-deploy verification — /wa-owner-builder-course

- **Date:** 24 July 2026
- **Verifier:** independent subagent. Did not build, write or edit this page. No fixes applied — verify-and-report only.
- **What was verified:** `dist/wa-owner-builder-course/index.html` (74,969 bytes, built 24 Jul 2026 13:35),
  the built artefact, not the MDX. Source files (`src/content/courses/wa-owner-builder-course.mdx`
  02:56 24 Jul, `src/data/faqs-wa.ts` and `src/data/modules-wa.ts` 00:00 24 Jul) are all **older** than
  the build, so the build is current and reflects every landed commit including `1c4bc4a`.
- **Why re-run:** the previous 07 (23 Jul 2026 15:48) predates commit `1c4bc4a`
  *"content: house-style and content-quality pass across course pages"*. `check-pipeline.mjs` flags it:
  *"wa-owner-builder-course: the page changed 1011 minute(s) AFTER its last verification"*. That report
  certified H2s and capsule wording that no longer exist. This report replaces it entirely.
- **Method note:** DM Sans metrics were read from the actual font binary
  (`fonts.gstatic.com/s/dmsans/v17/…ttf`, unitsPerEm 1000) rather than estimated. Measured
  `advance("0") = 0.684em`; measured **average prose advance across 15,604 characters of this page's own
  body copy = 0.4648em**. Every CPL figure below is computed from those two numbers, so `ch`-based caps
  are converted to real characters, not repeated as-is.
- **Authority model in force:** `knowledge-requirement` (asserted by the build as
  `<html lang="en-AU" data-authority="knowledge-requirement">`).

---

## A · §1a Structure & schema

| Check | Measured value | Verdict |
|---|---|---|
| `<h1>` count | **1** | PASS |
| H1 text | `Owner Builder Course WA, ready for your Form 75.` (the full stop is `<span class="dot">`) | PASS |
| H1 carries target keyword | contains "Owner Builder Course WA" | PASS |
| Heading levels used | h1 ×1, h2 ×14, h3 ×22, **h4 ×0, h5 ×0, h6 ×0** | PASS (no cosmetic H6) |
| JSON-LD blocks | **1** block, server-rendered in the static HTML (not JS-injected); `JSON.parse` succeeded, 0 errors | PASS |
| `@type`s present in `@graph` | `Course`, `EducationalOccupationalCredential`, `BreadcrumbList`, `Person`, `Person` (5 nodes); nested `Organization`, `ImageObject`, `Offer`, `CourseInstance`, `ListItem`×3 | PASS |
| `recognizedBy` | **0 occurrences in the entire document.** Credential node in full: `{"@type":"EducationalOccupationalCredential","@id":"https://www.abeeducation.edu.au/wa-owner-builder-course#credential","name":"Certificate of Completion, WA Owner Builder Course","credentialCategory":"Certificate of Completion"}` | **PASS — the WA hard rule holds** |
| `issuedBy` on the credential | **0 occurrences.** Spec expects "ABE `issuedBy` only" for knowledge-requirement | FAIL (minor, F7) |
| `Course.offers.price` vs on-page | schema `"price":"179"`, `"priceCurrency":"AUD"`. On-page: hero CTA "Get your certificate for **$179**", FactGrid Price cell "**$179**", PriceCard row "**$179.00**", capsule §07 "**$179**", bundle line "$179", sticky bar "$179", FAQ "It is $179". **All identical.** | PASS |
| Derived totals | PriceCard total `$391.00` = 179 + 212 ✓. Bundle total `$278` = 179 + 99 ✓ | PASS |
| `AggregateRating` | **0 occurrences** | PASS |
| `inLanguage` | 2 occurrences, both on `Course` and its `ImageObject`. **None on an `EducationalOrganization`** (no such entity exists) | PASS |
| `<title>` | `Owner Builder Course WA - Form 75 Ready, Online $179` — **52 chars**, 1 `<title>` tag | PASS (≤60) |
| `<meta name="description">` | present, **149 chars** | PASS |
| `<link rel="canonical">` | `https://www.abeeducation.edu.au/wa-owner-builder-course` — 1 occurrence, no trailing slash | PASS |
| `lang` attribute | `lang="en-AU"` | PASS |
| Breadcrumb visible | `<nav class="crumbs" aria-label="Breadcrumb">` → Home / Owner Builder Training / WA Owner Builder (last as `aria-current="page"`) | PASS |
| Breadcrumb in schema | `BreadcrumbList`, 3 `ListItem`s, positions 1-3, matching names/URLs | PASS |
| Breadcrumb URL form | items 2 and 3 slash-less ✓; item 1 is `https://www.abeeducation.edu.au/` — **trailing slash** | FAIL (trivial, F11) |
| Persons linked to the Course | neither `Person` node has an `@id`, and `Course` has no `author` / `contributor` / `reviewedBy` edge — the two Persons float unattached in the graph | FAIL (minor, F8) |
| `Course.creator` | absent — correct, this is an ABE-developed course, not asqa-accredited | PASS |

---

## B · §1b Authority language

Grepped the **rendered text** (25,563 chars extracted from `dist/`). Every hit judged individually.

| Term | Hits | Where, and judgement | Verdict |
|---|---|---|---|
| `RTO` | **4** | L24 + L29: site megamenu, *other* products (Blue Dog / NSW). L315 TrustBand attestation: "This is **not an RTO course** and **not nationally recognised training**" — a negation. L498 global footer: "ABE Education is not a Registered Training Organisation (RTO)". **No hit claims ABE or this course is an RTO.** | PASS (see F12 for the nav) |
| `nationally recognised` | **4** (1 lower, 3 capitalised) | L315 is a negation. The other 3 are all in the **global megamenu**, describing White Card (Blue Dog RTO 31193) and the NSW OB card. None sits in WA page content. | PASS on the page; F12 on the chrome |
| `accredited` | **3** | L189 "there is **no** accredited or WA-approved version of the course"; L207 CanCant "✕ **Not** an accredited or WA-approved course. WA prescribes no course."; L436 FAQ "**no** accredited or WA-approved version". All three are explicit negations. | PASS |
| `Statement of Attainment` | **0** | — | PASS |
| `approved provider` | **0** (the only near-form is L503 "does **not** run an approved-provider scheme") | negation | PASS |
| `approved course` | **1** | L207, inside "Not an accredited or WA-approved course" | PASS |
| `permit` / `Permit` | **31** | Every occurrence refers to the **building permit** — a genuinely separate WA instrument issued by the local council. Sampled: "You apply on Form 75, then apply separately to your local council for the building permit"; "✕ Not the building permit. That is a separate application to your local council"; "the six years run from the date a building permit is granted". **Zero occurrences call the owner-builder step a permit.** | PASS |
| `licence` / `Licence` | **10** | L147 waynav label "Licence?" and L185/L188 the section H2 "Is it a licence, a permit, or an approval?" — these pose the reader's own question, and the answer immediately negates. L176 "It is **not** a licence"; L189 "It is **not** a licence"; L201 "✕ **Not** a licence"; L209 "people search for a licence or a permit, so it is worth being clear"; L436 "There is **no licence** involved". **Zero occurrences assert the OB step is a licence.** | PASS |
| `licensed` / `Licensed` | **11** | All refer to licensed *trades* (electrical/plumbing practitioners), Dominic as a licensed NSW builder, or "not a licensed insurance provider". None applies to the OB step. | PASS |
| Positive framing of the course | "**supports** your Form 75 owner-builder approval" appears 5× (hero eyebrow, hero subhead, §01 body, TrustBand attestation, footer disclaimer) | PASS |
| ASQA disclosure | Not required — no accredited course is offered on this page. The White Card is named only as a *unit* (`CPCWHS1001`, single C, correct for WA) with WorkSafe WA cited. | N/A |

---

## C · §1c E-E-A-T & freshness

| Check | Measured value | Verdict |
|---|---|---|
| Freshness line in crawlable HTML | `<p class="reviewed">Reviewed by <a href="#content-review">Warwick Smith</a> on <time>20 June 2026</time></p>` — plain markup in the pagebar, not in `<style>`, a comment, or schema | PASS |
| Freshness line format | Spec asks `Reviewed by [Name] · DD Mon YYYY`. Rendered uses **"on"** as the separator, not `·`, and **"20 June 2026"** not "20 Jun 2026". `<time>` carries **no `datetime` attribute**. | FAIL (cosmetic, F13) |
| Name anchors to `#content-review` | yes, `href="#content-review"`; target `<section … id="content-review">` exists | PASS |
| Review date freshness | 20 Jun 2026 vs today 24 Jul 2026 = **34 days old** | PASS |
| **Review-date identity across all three files** | `wa-owner-builder-course.mdx`: L18 `date: "20 June 2026"`, L205 "reviewed for currency on **20 June 2026**", L256 "review, dated **20 June 2026**" → **3 occurrences, all identical**. `src/data/faqs-wa.ts`: L9 "reviewed for currency on **20 June 2026**" → **1 occurrence, identical**. `dist/…/index.html`: **exactly 4 occurrences of "20 June 2026"** (pagebar, TrustBand capsule, content-review capsule, FAQ answer). **Zero occurrences of any other review date.** The only other June date in the HTML is `27 Jun 2026`, which is the *course version* date, a different fact. | **PASS — the defect that shipped last time is gone** |
| Per-section verification blocks | **9 `VerifiedSources` ledgers** rendered, on sections `course`(23 Jul 2026), `licence`(7 Jul), `need`(23 Jul), `responsibilities`(7 Jul), `learn`(Course v2.0, 27 Jun), `how`(7 Jul), `obligations`(7 Jul), `become`(23 Jul), `faq`(7 Jul) | PASS |
| Section carrying gov facts **without** a ledger | **`cost`** — the $212 / $467 approval fee, the 1-July review cadence and the council fee are stated there with no inline ledger. It is the only regulatory section without one. | FAIL (F4) |
| Ledger placement vs micro-CTA | Spec: consolidated block **before** the micro-CTA. §02/03/08/09 put `SectionWayfinder` after the ledger ✓. **§`course` puts the `btn-link` "See who needs approval" *before* the ledger** (both inside/adjacent to `.measure`), so the ledger trails the CTA. | FAIL (minor, F14) |
| Ledger visual grammar | Renders as `✓ Verified / <date>` + body. There is **no literal `🔗 SOURCES` label** — the component joins fact to source with the word " against ". Component is canonical; recorded as a deviation from the spec's prose, not a defect. | NOTE |
| `id="content-review"` section | present, H2 "Who develops and reviews this course?", names **Dominic Ogburn** (Course Developer · CEO) and **Warwick Smith** (Compliance & Currency Reviewer, independent), each with credential lists and a "Full profile →" link | PASS |
| `/experts/dominic-ogburn` exists in dist | `dist/experts/dominic-ogburn/` present; also in `sitemap-0.xml` | PASS |
| `/experts/warwick-smith` exists in dist | `dist/experts/warwick-smith/` present; also in `sitemap-0.xml` | PASS |
| Person schema x2 (ABE-developed rule) | 2 `Person` nodes: Dominic `jobTitle:"Course Developer"` + `sameAs` LinkedIn; Warwick `jobTitle:"Compliance & Currency Reviewer"` + `sameAs` LinkedIn. Correct count for a knowledge-requirement / ABE-developed page. | PASS |
| "Last verified" beside every trust badge / gov-listing reference | The TrustBand attestation links `wa.gov.au` beside `ABN 64 125 455 272` with **no adjacent date**. Every other government reference on the page is dated (9 ledgers + 8 footer source lines + the footer disclaimer's "verified 22 July 2026"). | FAIL (minor, F9) |

---

## D · §1d Government-source citation gate

Every government / regulatory claim on the rendered page, and whether it carries a **visible** citation.

| # | Claim (as rendered) | Visible citation | Verdict |
|---|---|---|---|
| 1 | Four sufficient-knowledge pathways, s43(2)(b)(ii) BSR Act | §`course` ledger, 23 Jul 2026 → Form 75 PDF **page 5** + WA OB approval page | PASS |
| 2 | Course must be completed within the **last two years** | same ledger, names the two-year currency | PASS |
| 3 | White Card unit **CPCWHS1001** | Consolidated Sources → *WorkSafe WA — White Card (CPCWHS1001)* | PASS |
| 4 | It is an **approval**, granted by the Building Services Board via Building and Energy | §`licence` ledger, 7 Jul 2026 → WA OB approval + Building Services (Registration) Act 2011 | PASS |
| 5 | **$20,000** threshold | §`need` ledger, 23 Jul 2026 → Building Act 2011; also Consolidated Sources *"Building Act 2011 (WA) — $20,000 threshold"* | PASS |
| 6 | **Six-year limit runs from the building permit**, waiver via Form 76 | §`need` ledger names it explicitly | PASS |
| 7 | Class 10a under **$50,000** needs no approval; no contract-splitting | §`need` ledger is present but its `facts` string names only the $20,000 threshold and the six-year limit — the $50,000 figure is covered by the section's citation, not named in it | PASS (weak — F5) |
| 8 | Class 1a(i) / Class 10 / commercial ≤2 storeys under 500 m²; who may apply | same — covered at section level, not named | PASS (weak — F5) |
| 9 | PCBU duties under **Work Health and Safety Act 2020** | §`responsibilities` ledger, 7 Jul 2026 → WHS Act 2020 | PASS |
| 10 | Penalties **up to $25,000** for false/misleading info, BSR Act 2011 | same ledger + Consolidated Sources *"Building Services (Registration) Act 2011 (WA) — Approval; s99 penalties"* | PASS |
| 11 | Approval fee **$212 residential / $467 industrial-commercial**, paid to Building and Energy | **no inline ledger in §`cost`**; carried by Consolidated Sources → *"Building and Energy fees ($212 / $467) — Current for FY26-27 · verified 22 Jul 2026"* (primary LGIRS fee schedule) | PASS via Sources — F4 |
| 12 | Fee **reviewed each 1 July**, confirm before lodging | stated in PriceCard foot, FAQ 7 and the footer disclaimer ("Government figures verified 22 July 2026 … reviewed each 1 July") | PASS |
| 13 | Council charges **value-based** building-permit fees | §`obligations` card 06 + Consolidated Sources WA OB approval page | PASS |
| 14 | Home indemnity insurance on resale **within seven years**; offence, **up to $10,000** | §`obligations` ledger, 7 Jul 2026 → Home Building Contracts Act 1991; Consolidated Sources *"Home Building Contracts Act 1991 (WA) — 7-year resale rule"* | PASS |
| 15 | **Workers' compensation** required if you employ anyone | **NO citation anywhere.** The §`obligations` ledger covers only "Home indemnity insurance and timing rules". No WorkCover WA source in the Consolidated Sources block. | **FAIL (F3)** |
| 16 | Approval **lapses after six months**; permits valid two years; refusal/completion branches | §`obligations` card 03 + §`become` ledger, 23 Jul 2026, which names "the six-month approval validity" → WA OB approval + Form 75 PDF | PASS |
| 17 | Processing **approximately six weeks**, varies with volume/completeness | §`become` ledger names it | PASS |
| 18 | Electrical/plumbing must be done by licensed practitioners | covered by the WA OB approval page cited in §`responsibilities` and §`obligations`; no licensing-authority source named | PASS (weak) |
| 19 | Notice of Completion (**BA7**) | no source named; a form name inside a process step, not a regulatory assertion | NOTE |

| Gate check | Measured value | Verdict |
|---|---|---|
| Consolidated Sources section exists | yes, page-foot `Sources` block, **8 entries**, all with a date or provenance label | PASS |
| Sources are primary | `wa.gov.au` ×4 (incl. the Form 75 PDF and the BSB sufficient-knowledge policy PDF), `legislation.wa.gov.au` ×3, `worksafe.wa.gov.au` ×1. **Zero aggregators** — no ABLIS, no business.gov.au, no blogs, no competitor/RTO pages, no archives. **Zero self-citations to abeeducation.edu.au.** | PASS |
| Every source dated | 8/8 carry `Verified 7 Jul 2026` ×2, `Board-approved 10 Sep 2024`, `Current for FY26-27 · verified 22 Jul 2026`, or a scope label ("$20,000 threshold", "Approval; s99 penalties", "7-year resale rule", "White Card (CPCWHS1001)") | PASS |
| Fee re-verify cadence (1 July) | fee verified **22 Jul 2026**, i.e. *after* the 1 Jul 2026 indexation. `kb/register/state-fees-register.md` L26 confirms the disposition and the caveat, which the page surfaces to the reader. | PASS |
| `[confirm: …]` count | **0** | PASS |
| `[TO VERIFY]` count | **0**. (A case-insensitive `to verify` grep returned 1 hit — the prose "reviews ABE Education course pages **to verify** that legislative references … are current". False positive, not a tag.) | PASS |
| `UNVERIFIED` count | **0** | PASS |
| One ledger cites a non-government source with an empty URL | §`learn`: *"ABE Education — WA Owner-Builder Course modules and learning outcomes (v2.0)"*, `href: ''` → renders as unlinked text. This is an internal course-content claim, not a government one, so §1d's primary-source rule does not bite; but a "SOURCES" line with no source is weak. | NOTE (F10) |

---

## E · §1e Cannibalisation & indexation

| Check | Measured value | Verdict |
|---|---|---|
| Robots meta | `<meta name="robots" content="index,follow">` — **indexable** | PASS |
| Page in sitemap | `dist/sitemap-0.xml` contains `<loc>https://www.abeeducation.edu.au/wa-owner-builder-course</loc>` (13 URLs total) | PASS |
| `sitemap-index.xml` emitted | `dist/sitemap-index.xml` present; `robots.txt` points to it | PASS |
| `robots.txt` blocks `/course/` and `/program/` | `dist/robots.txt` contains **only** `User-agent: *` / `Allow: /` / `Sitemap: …`. **No `Disallow` line at all.** | **FAIL (F6, site-level)** |
| Cannibalisation | Grepped all `src/content/**` titles. The 8 course/bundle titles are ACT, NSW ×2, QLD, TAS, **WA**, White Card TAS, TAS CPD Bundle. Only this page targets "owner builder course WA" / Form 75. No second page competes. | PASS |
| Internal links, body only (between `</header>` and `<footer`) | `/` , `/owner-builder-courses` (hub, **up**), `/experts/dominic-ogburn`, `/experts/warwick-smith` (cross-category, non-competing). Plus 12 same-page anchors. **Zero sideways links to QLD/TAS/ACT/NSW in the body.** | PASS |
| Sideways links in chrome | the global megamenu lists all five state OB pages. Site-wide navigation, not body cross-linking. | PASS |
| Content genuinely WA-specific | Names the WA regulator (Building Services Board via Building and Energy), the WA instrument (Form 75, Form 76), WA legislation (Building Act 2011, Building Services (Registration) Act 2011, Work Health and Safety Act 2020, Home Building Contracts Act 1991), WA fees ($212/$467), WA thresholds ($20,000 / $50,000), WA-only content (BAL bushfire, the knowledge-requirement model), and the WA-only White Card unit code CPCWHS1001 (single C). It also explicitly names the *superseded* WA bodies ("Building Commission", "Department of Mines") as a currency test. **This is not generic copy with a state name swapped.** | PASS |

---

## F · §1f Banned copy

| Check | Measured value | Verdict |
|---|---|---|
| "comprehensive" | **0 occurrences** in the built HTML (case-insensitive) | PASS |
| "Enrol now" | **0** | PASS |
| "Enrol today" | **0** | PASS |
| Every CTA label on the page | 1. `Get your certificate for $179` (hero, `.btn-primary`) · 2. `Get your certificate for $179` (waynav sticky, `.btn-mini`) · 3. `See who needs approval` (§01, `.btn-link`) · 4. `Enrol in the bundle` (§07, `.btn-primary`) · 5. `Get an owner-builder insurance quote` (§08, `.btn-secondary`) · 6. `Get your certificate for $179` (closing band, `.btn-primary`) · 7. `Get your certificate` (mobile sticky strip, `.btn-mini`) · 8. `Login` (chrome). **Judgement:** 1/2/6/7 are benefit-led ✓. 3 and 5 are benefit-led ✓. **4, "Enrol in the bundle", is not a banned string but is provider-voiced and generic** — the one CTA that does not describe what the reader gets. | PASS on the ban list; F15 on #4 |
| CTA inside an answer capsule | **12 `.capsule` elements parsed; `<a>` count in each = 0.** Zero CTAs in any answer capsule. | PASS |
| CTA inside an FAQ answer | 8 `<div class="ans">` blocks parsed; **zero `<a>` elements**. (The 2 links found in that region belong to the FAQ's `VerifiedSources` ledger, outside the answers.) | PASS |
| "verified" beside a Trustpilot reference | **0 Trustpilot references** on the page | PASS |
| Content image alt lengths | hero **131** · site **111** · online **123** · insurance **126** · Dominic portrait **120** · Warwick portrait **117**. **6/6 content images ≥ 80 chars**, all en-AU, all descriptive. | PASS |
| Decorative image handling | 1 decorative image: the header logo SVG, `alt=""`, **not** `aria-hidden`. Its parent `<a class="brand">` carries `aria-label="ABE Education home"`, so the link has an accessible name and the image is already hidden from AT by the empty alt. Spec asks for both attributes. | PASS (note only) |
| OG meta | `og:type`, `og:site_name`, `og:locale` (en_AU), `og:title`, `og:description`, `og:url` — 6 tags | PASS |
| Twitter meta | `twitter:card` (summary), `twitter:title`, `twitter:description` — 3 tags. No `og:image` (no `ogImage` passed) → summary card, not large image. | PASS (note) |
| Em dashes in body copy | **13 in rendered text, all 13 inside source-citation labels** ("WA — Owner-builder approval", etc). **Zero in prose.** | PASS |
| Bare "ABE" in reader-facing copy | `check-claims.mjs` §6: `OK Company name: no bare "ABE"`. Manual read confirms every prose mention is "ABE Education"; only bare "ABE" is the SiteHeader logotype (documented exception). | PASS |
| "five years" spelled out | §01 "within the **last five years**" ✓; seven/six/two years, six months, six weeks all spelled in prose ✓. **Exception:** §08 card title "One approval every **6** years" vs its body "every **six** years". | PASS overall; F16 |

---

## G · abe-readability-audit

**Characters per line.** Computed from real DM Sans metrics (avg prose advance 0.4648em, measured on this
page's own copy). `ch` = 0.684em, so every `ch`-based cap is ~1.47× longer in real characters than its
number suggests.

| Element | CSS cap | Rendered px | **Real CPL** | Target 45–75 (ideal 60–66) |
|---|---|---|---|---|
| `.measure` (running prose §01/03/04) | `max-width:480px` @17px | 480px | **60.7** | **PASS — ideal band** |
| `.hero .lede` | `32ch` @19px | 416px | **47.1** | PASS |
| `.price-foot` | `440px` @14px | 440px | **67.6** | PASS |
| `.cta-end .lede` | `46ch` @19px | 598px | **67.7** | PASS |
| `.verified .v-body` | `74ch` @12px **DM Mono** (monospaced) | 533px | **74.0** | PASS (at ceiling) |
| `.ins-partner p` | `52ch` @17px | 605px | **76.5** | FAIL (marginal) |
| `.note` (5 notes) | `calc(480px + 64px)` @15px | 544px | **78.0** | FAIL (marginal) |
| `.capsule.on-dark` (TrustBand) | `60ch` @18px | 739px | **88.3** | FAIL |
| `.attest` (TrustBand attestation) | `62ch` @14px | 594px | **91.2** | FAIL |
| **`.capsule` (all 12 answer capsules)** | `66ch` @18px | **813px** | **97.1** | **FAIL** |
| **`.faq .ans` (all 8 FAQ answers)** | `68ch` @16px | **744px** | **100.1** | **FAIL — worst on the page** |
| `footer .f-pub` | `74ch` @13px | 658px | **108.9** | FAIL (global chrome) |
| `footer .f-auth` | `66ch` @13px | 587px | **97.1** | FAIL (global chrome) |

Mobile CPL: at 375px viewport minus 2×16px `.wrap` padding = 343px; at 17px that is **43.4 CPL**, inside the
30–45 mobile band. PASS.

| Check | Measured value | Verdict |
|---|---|---|
| Body font-size | **17px** | PASS (16–18) |
| Smallest meaningful text | 10px (`.waynav .wl`, `.waynext .lab`) — below the 12px floor | FAIL (minor, F17) |
| Line-height | **1.65** body; `.capsule` 1.55; `.lede` 1.55; h1 1.02, .h2 1.08 (display, correctly tighter) | FAIL (marginal — 0.05 over the 1.4–1.6 band) |
| Paragraph spacing | `--s-md: 24px` = 1.41× the 17px body; capsule 24/32px. Target ~2× (34px). | FAIL (minor) |
| Single column for running prose | every prose block is one `.measure` / `.capsule` / `.ans` column; grids collapse to `1fr` at 640–1100px | PASS |
| Left-aligned, unjustified | `grep text-align` → 7 hits: `.ph`, `.pl-check`(right, a check column), 2× table `<th>`(center), `.cta-end`(center CTA band), `.mst`, Credentials badge. **No `justify`; no centred/right running prose.** | PASS |
| Body ink on ground | `--ink-3 #4a4a4a` on paper `#ffffff` = **8.86:1**, on paper-alt = **8.49:1**, on paper-warm = **8.08:1**. Headings `--ink #1a1a1a` = 17.40/16.67/15.86. Capsule `--ink-2 #2a2a2a` = 14.35/13.75/13.08. Dark section ≈#c6c6c6 on #1a1a1a = **10.19:1**. Button `#fff` on `#1a1a1a` = **17.40:1**. Maroon on white = **10.95:1**. | PASS — all ≥ 4.5:1 |
| Sub-AA colour in use | `--slate-light #9a9a9a` = **2.81 / 2.70 / 2.56:1** on the three grounds — below AA. Renders here in `.waynav .wl` ("On this page", 10px) and megamenu "Soon" badges. | **FAIL (F18)** |
| Pure black ink | `--ink` is `#1a1a1a`. **No `#000` anywhere.** | PASS |
| Pure white ground | **`--paper: #ffffff`**; `body{background:var(--paper)}`; `.sec` sets no background → sections `course`, `need`, `learn`, `obligations`, `faq` render body copy on **pure white**. | **FAIL — spec hard-blocker (F1)** |
| Lists chunked to ~7 | hero ticks 4 · glance 4 · CanCant 3+3 · ModuleRows 4 · Stepper 3 & 5 · TopicGrid 6 · priceRows 3 · people 2. **All ≤7.** Two flat runs at 8: FAQ (8) and Consolidated Sources (8, in a 2-col grid = 4+4). | PASS (marginal) |
| Answer-first | **12 of 12 content sections open with an `AnswerCapsule`.** Word counts 47,51,55,60,56,44,49,**28**,43,**38**,55,47 — 10 in 40–60, two short (TrustBand 28, obligations 38). Each leads with the direct answer. | PASS |
| Question-led H2s | 9 of 14 H2s are questions; the 5 that are not are non-prose panels (TrustBand, how-to, FAQ label, bundle, insurance). | PASS |
| CTA placement | Above fold ✓; sticky desktop waynav CTA ✓; sticky mobile strip <900px ✓; closing band ✓. **Gap: §01–§06 (six consecutive sections) carry no CTA** — next after hero is the §07 bundle. | FAIL (minor, F19) |
| Primary CTA tap target | `.btn-primary` 16px×1.65 + 14px×2 = **54.4px** ✓; `.btn-secondary` **54.4px** ✓ | PASS (≥44px) |
| Sticky CTA tap targets | `.ctastrip .btn-mini` (mobile) 15px×1.65 + 20 = **44.75px** ✓. `.waynav .btn-mini` (desktop) 14px×1.65 + 18 = **41.1px** — global.css:147 states "at 41px it is the tallest child". Below 44px, above AA 24px, desktop-only. | FAIL (minor, F20) |
| FAQ summary tap target | 20×2 + 18px×1.65 ≈ **69.7px** | PASS |
| Waynav jump links | `.waynav a.j` 12px×1.65 + 10 = **29.8px** — above AA 24px, below the 44px ideal, desktop only | PASS (AA) |
| Trust beside claim & near CTA | hero: 4 ticks + 3 proof stats beside the CTA ✓; TrustBand between §06 and §07 (before the price) ✓; named experts before FAQ ✓; dated ledgers under each claim ✓. **Not top-and-footer-only.** | PASS |
| Visible focus ring | `:focus-visible{outline:2px solid var(--maroon);outline-offset:3px}` — 10.95:1 | PASS |
| Reduced motion honoured | 3 `@media(prefers-reduced-motion:reduce)` blocks | PASS |
| Headings in order | h1 → h2 → h3 only; none skipped; no h4/h5/h6 | PASS |
| Meaningful link text | "See who needs approval", "Full profile →", "LinkedIn", named source titles. No "click here". | PASS |
| Reflow at 320px, no h-scroll | **NOT RUN** — needs a rendering engine. `audit_render.py` requires Chromium, unavailable to this subagent; no browser was started. Static evidence only (breakpoints down to 440px, `.wrap` `padding:0 28px` + `box-sizing:border-box`, `.waynav .wrap{overflow-x:clip}`). Not sufficient to certify 320px. | **NOT RUN** |
| 200% browser resize | **NOT RUN** — same reason. | **NOT RUN** |
| Text-spacing override survival | **NOT RUN** — same reason. Flag: `.waynav a.j` uses `white-space:nowrap` in a scrolling bar with a hard-coded `--waynav-h:65px`; that is the plausible failure point if tested. | **NOT RUN** |

---

## H · final-check, all six

### 1 · Contradictions

| Finding | Measured value | Verdict |
|---|---|---|
| **Verified-date conflict on the same sources** | §`course`/§`need`/§`become` ledgers date *Form 75 (PDF)* and *WA — Owner-builder approval* at **23 Jul 2026**; the Consolidated Sources block dates the **same two documents** at **"Verified 7 Jul 2026"**. The page states two verification dates for the same sources. | **FAIL (F2)** |
| Review vs course-version date | Warwick's currency review is dated **20 June 2026**; the §`learn` ledger is "Course v2.0, **27 Jun 2026**". The review predates by 7 days the version whose currency it is presented as attesting. | FAIL (soft, F21) |
| "Updated" dates | Hero badge "Updated **June** 2026"; footer "Last updated **July** 2026". | FAIL (minor, F22) |
| Six-year rule twice | §`need` "run from the date a building permit is granted" vs §`obligations` card 04 "measured from when the permit is granted". **Consistent.** | PASS |
| Six-month lapse twice | §`obligations` card 03 and §`become` Deadline note. **Consistent.** | PASS |
| Numbers | $179(7×), $212, $467, $391=179+212 ✓, $278=179+99 ✓, $20,000/$50,000/$25,000/$10,000, 80%, 3 attempts, 31,000+, 2007, "19 Years"(2026−2007 ✓), schema `PT4H` vs "an afternoon" ✓. **No numeric contradiction.** | PASS |
| Module count | "**twelve** modules" (§05) vs "**12** modules" (§06, TrustBand ×2). | FAIL (style, F23) |
| Register vs page framing of resale rule | register L26 "offence to sell within 7 years **without disclosure**"; page "you must have home indemnity insurance … selling **without it** is an offence". **UNKNOWN** which is the precise statutory wording — could not open the Act. Recorded, not guessed. | **UNKNOWN (F24)** |

### 2 · Duplicate / repeated information

5-word shingle frequency across the 25,563-char rendered text:

- "Board accepts a WA-specific course completed within … two years, plus a White Card, as evidence of
  sufficient knowledge" — **4 near-verbatim** (§01 capsule, §02 CanCant, FAQ 1, footer disclaimer).
- "apply to your local council for the building permit" — **5** (§02 capsule, §02 CanCant, §03 capsule,
  §08 card 06, §09 step 04).
- "if you sell within seven years" — **4**, three inside §`obligations` alone.
- "fact-checked against the current [Act/guidance]" — **6 of the 9 ledgers** share the identical stem.
- "supports your Form 75 owner-builder approval" — 5.
- FAQ restating body capsules: FAQ 1≈§01, 2≈§02, 3≈§03, 7≈§07, 8≈§08 card 01 — 5 of 8 answers.

Some FAQ mirroring is intentional (extractability), but **§`obligations` states the seven-year rule three
times in ~250 words**. **FAIL (F25).**

### 3 · Logical flow

Hero → at-a-glance → 01 accepted → 02 the right word → 03 need it → 04 responsibilities → 05 modules →
06 how it works → TrustBand → 07 cost → 08 obligations → 09 full path → who reviews → FAQ → CTA. Authority
and eligibility resolve before the product; product before money; money before obligations. Transitions
explicit (`SectionWayfinder` every time). **PASS**, one note: §09 largely recaps §03/§06/§08 (F26).

### 4 · Logical grouping

Bundle in §`cost` ✓ (a price); InsurancePartner in §`obligations` ✓; TrustBand between product and price ✓.
One split: the six-year rule is explained at length in §`need` and re-carded in §`obligations` five sections
later; approval validity appears as §08 card 03 and again as the §09 Deadline note. **PASS with F27.**

### 5 · Australian English

`-ise` throughout; **zero `-ize`**. `licence` noun 10×, `licensed` adj/participle 11× — correct everywhere;
no `license` as a noun. "Enrolment", "metres", "workers' compensation" ✓. Screened for and found none of
organiz-/recogniz-/authoriz-/color/center/defense/favor/labor/modeling/traveling. **PASS.**

### 6 · AI-writing patterns

Zero of: comprehensive, delve, leverage, robust, seamless, landscape, "navigate the", "it's worth noting",
crucial, vital, ensure. No "not only X but also Y". Sentence length varies hard ("Yes." / "An approval."
against 40-word sentences). Commercially self-limiting lines a generic model would not write
("buy nothing here", "There is no free preview", "not what most people think"). **PASS**, one templated
surface: the 6 identical ledger stems (F25).

**One reader-visible copy defect found reading the ledgers as prose:** `VerifiedSources.astro` joins
`facts` to `sources` with the literal word `" against "`. When `facts` already ends "against the current
Act/guidance", the line reads **"…fact-checked against the current Act against WA — Owner-builder
approval"**. In **6 of 9 ledgers**. **FAIL (F28).**

---

## I · ai-detector

**Assessment: predominantly human-authored. Low AI-likelihood for the body prose.**

- No standard AI lexical tells; vocabulary is domain-concrete (Form 75/76, BAL, BA7, Class 1a(i),
  CPCWHS1001, Deemed-to-Satisfy), not abstract.
- No formulaic openers, no "In this article", no summary paragraph restating the intro, no stacked hedging.
- Strong human voice: the page argues against its own sale ("You may not need this course at all", "buy
  nothing here"), takes positions ("no course in WA is government approved"), uses pointed idiom
  ("stepping into the builder's shoes", "a clean application and a false start").
- The one machine-flavoured surface is the `VerifiedSources.facts` set — 6 of 9 share the "fact-checked
  against the current [Act|guidance]" stem, exactly where the doubled "against" surfaces (F28).

---

## J · Cross-file consistency (MDX ↔ `faqs-wa.ts` ↔ `modules-wa.ts`)

| Fact | MDX value | `faqs-wa.ts` value | Match |
|---|---|---|---|
| Course price | `$179` (frontmatter + 6 body places) | "It is **$179**"; "the **$179** course fee" | ✓ |
| Bundle total | `$278` | "together for **$278**" | ✓ |
| White Card unit | `CPCWHS1001` | "unit is **CPCWHS1001**" | ✓ |
| Approval fee | `$212.00` / `$467` | "**$212** … or **$467**" | ✓ |
| Fee cadence | "reviewed each **1 July**" | "reviewed each **1 July**" | ✓ |
| Work-value threshold | "**$20,000**" | "valued over **$20,000**" | ✓ |
| Class 10a exemption | "under **$50,000**" | "valued under **$50,000**" | ✓ |
| No contract-splitting | "cannot split a project into smaller contracts" | "cannot split the work" | ✓ |
| Currency window | "within the **last two years**" | "within the **last two years**" | ✓ |
| **Review date** | **"20 June 2026"** ×3 (L18/205/256) | **"20 June 2026"** ×1 (L9) | **✓ all four identical** |
| Course version | "v2.0, **27 Jun 2026**"; "updated June 2026" | "**Version 2.0, updated June 2026**" | ✓ |
| Duration | "finish in an afternoon" | "finish in an afternoon" | ✓ |
| Certificate timing | "issued the same day you pass" | "**same-day certificate**" | ✓ |
| Resale rule | "sell within **seven years**" | "within **seven years**" | ✓ |
| Insurance partner | "InsuranceTek Pty Ltd" | "our partner **InsuranceTek**" | ✓ |
| Authority framing | "no accredited or WA-approved version" | "no accredited or WA-approved version" | ✓ |

`modules-wa.ts` ↔ MDX: module groups, outcome and obligation cards render verbatim; file header "v2.0,
27 Jun 2026" matches the §05 ledger. One internal inconsistency inside `obligationCardsWa[3]`: title "every
**6** years" vs body "every **six** years" (F16).

**Zero cross-file conflicts found.** `check-claims.mjs` independently confirms `Figures: 150/150` and
`Totals: 7 course page total(s) reconcile`.

---

## K · §05 brief-to-section map, both directions

**05 → dist.** Every id in `05-components.md` is present in the build: `top`, `course`, `licence`, `need`,
`responsibilities`, `learn`, `how`, `cost`, `obligations`, `become`, `content-review`, `faq` = **12/12**.
The un-idd "(at a glance)" row also renders. **PASS.**

**dist → 05.** The build emits **15 `<section>` elements**: the 12 above plus three un-idd — at-a-glance
(in 05 ✓), **TrustBand** (`sec bg-dark trust`) and the **closing CTA band** (`sec cta-end`). **TrustBand
and the CTA band appear in dist but have no row in 05's map.** `check-pipeline.mjs`:
`OK … 11 section(s) match the plan`. **FAIL (F29, minor).**

**H2 drift — 05 is stale after `1c4bc4a`.** 7 H2s recorded in 05 no longer match the build (ids unchanged,
titles historical):

| Section | 05 H2 | dist H2 |
|---|---|---|
| (at a glance) | "The facts before you enrol" | "What do you need to know before you enrol?" |
| `responsibilities` | "Your responsibilities as a WA owner-builder" | "What are your responsibilities as a WA owner-builder?" |
| `learn` | "Introduction plus 12 modules, written for WA" | "What do the WA modules cover?" |
| `how` | "Three steps to your certificate" | "How does the course work?" |
| `cost` | "Three costs, three payees, nothing hidden" | "What will you pay in total?" |
| `obligations` | "What else your WA project needs" | "What else does your WA project need?" |
| `content-review` | "Who develops and reviews this course" | "Who develops and reviews this course?" |

**FAIL (F30, documentation drift).**

---

## Repo gates — run and read in full

| Script | Result | Lines naming this slug |
|---|---|---|
| `check-claims.mjs` | **0 failing, 3 warning, 8 ok, 127 excluded** | **None.** 3 warnings all CPD/TAS-bundle scoped. Relevant OKs: `Figures: 150/150`, `Totals: 7 … reconcile`, `Bundles: 3 … reconcile`, `Superseded White Card unit CPCCWHS1001 not presented as current`, `no bare "ABE"`. |
| `check-freshness.mjs` | `Register freshness: 16/16 current.` + 2 STALE-TAG, 1 SOFT-DATE, 1 NO-WHS; `CPD approvals: 13 live of 17`. | **None.** All four warnings are TAS CPD register items. |
| `check-pipeline.mjs` | **3 failing, 1 warning, 8 ok** | **2 lines.** (1) `FAIL … page changed 1011 min AFTER its last verification` — **the reason this run exists; writing this file clears it.** (2) `WARN … 12 capsule(s) … no close match in 04` — **expected and already adjudicated in 05-components.md**: this was an *audit* run where 04 deliberately carries only the three click-recovery items, not the page's twelve pre-existing capsules. Re-read and agreed. Also `OK … all 7 artefacts present`, `OK … 11 section(s) match the plan`. |
| `system-health.mjs` | **3 failing, 14 warning, 21 ok** | **Same 2 lines.** Other warnings project-wide, none WA-specific (review coverage 2/8; 6 pages with no Stage-9 review; 1 of 4 self-graded; mistakes log 20 active; `Repeat risk seen 6x: Documentation drifted from the code and was trusted over it` — which is exactly F30 recurring). |
| `prose-lint.mjs` | `Prose lint: 9 file(s) passed.` | None |

---

## Hard-blockers

Evaluated against the spec's list. **1 of 10 is true.**

| # | Hard-blocker | Status |
|---|---|---|
| 1 | No H1 / >1 H1 / H1 without target keyword | Not true — 1 H1, carries "Owner Builder Course WA" |
| 2 | Schema missing/invalid, or `recognizedBy` on a WA page | Not true — 1 valid `@graph`, 0 errors, all 5 node types, **0 `recognizedBy`** |
| 3 | On-page price ≠ `Course.offers.price` | Not true — `"179"` = `$179` everywhere |
| 4 | RTO / accredited / (WA) approved-course / permit breach | Not true — every such term is a negation or the separate council building permit |
| 5 | Gov claim with no visible source, or Sources missing | Not true — Sources block present, 8 dated primary `.gov.au`. One claim (workers' comp, F3) lacks a named source; judged a serious gap, not a blocker |
| 6 | Unresolved gov fact / `[confirm:]` / `[TO VERIFY]` | Not true — 0/0/0 |
| 7 | Fee past re-verify cadence not re-checked | Not true — $212/$467 verified 22 Jul 2026, after the 1 Jul reset |
| 8 | Primary keyword already targeted by another ABE page | Not true |
| 9 | Banned CTA / CTA in answer or FAQ / "comprehensive" | Not true — 0 / 0 (12 capsules + 8 FAQ answers, zero `<a>`) / 0 |
| 10 | Pure-black ink / pure-white ground / body < AA / primary CTA < 44px | **PARTLY TRUE** — ink `#1a1a1a` ✓, body 8.08–8.86:1 ✓, primary CTA 54.4px ✓, but **`--paper:#ffffff` is a pure-white ground** and `.sec` sets none, so five sections render on `#ffffff`. → **F1** |

**Hard-blocker count: 1** (F1). It is a **global token, `src/styles/global.css:9`**, unchanged by this run,
present on every ABE page. `CLAUDE.md` gives `global.css` precedence over the audit reference on token
conflicts, so this is a standing system decision the spec contradicts, not a WA regression. Recorded as a
blocker because the spec says so; escalated as a project decision, not a WA fix.

---

## Findings, ranked

| # | Sev | Finding | File:line | Fix |
|---|---|---|---|---|
| **F1** | Blocker (system) | Pure-white ground: `--paper:#ffffff`; `.sec` sets no background so `course/need/learn/obligations/faq` render prose on `#ffffff`. Spec lists pure `#fff` as a hard-blocker. | `src/styles/global.css:9,28,35` | Shift `--paper` to off-white (e.g. `#fdfdfc`), **or** record a dated standing decision in `DESIGN.md` §3 and amend `verification.md:81,128` so the gate stops asserting a blocker the system decided against. Not silently either way. |
| **F2** | High | Two different verification dates for the same two gov sources: 23 Jul 2026 (§course/§need/§become ledgers) vs "Verified 7 Jul 2026" (Consolidated Sources) for *Form 75 (PDF)* and *WA — Owner-builder approval*. Self-contradiction on the trust surface. | `…mdx:76-77` vs `:131,:162,:251` | Roll `footerSources` forward to 23 Jul 2026, or add a provenance label distinguishing "page last read" from "fact last re-checked" (the fee row already does this). |
| **F3** | High | Workers' compensation stated as an obligation with **no source anywhere** — the §obligations ledger covers only home-indemnity/timing; no WorkCover WA in Sources. | `modules-wa.ts:20`; ledger `…mdx:243`; Sources `…mdx:75-83` | Add a WorkCover WA source and name workers' comp in the ledger `facts`. |
| **F4** | Medium | §`cost` is the only regulatory section with **no ledger**, yet carries the $212/$467 fee and the 1-July cadence (sourced only in the page foot). | `…mdx:208-224` | Add `VerifiedSources date="22 Jul 2026"` naming the fee + cadence → LGIRS schedule. |
| **F5** | Medium | Three §`need` facts sit under a ledger whose `facts` string does not name them: the **$50,000** Class 10a exemption, the class/size definitions, the eligibility rules. | `…mdx:151-153`, ledger `:162` | Extend the `facts` string to name the $50,000 threshold and eligibility. |
| **F6** | Medium | `robots.txt` does not block `/course/` and `/program/` (§1e). Only `Allow: /`. Site-level. | `public/robots.txt` | Add `Disallow: /course/` and `Disallow: /program/`. |
| **F7** | Medium | Credential node has **no `issuedBy`** — `recognizedBy` correctly absent, but the WA form is "ABE `issuedBy` only"; the certificate has no attributed origin. | JSON-LD emitter (course layout) | Add `"issuedBy":{"@type":"Organization","name":"ABE Education",…}`; confirm no `recognizedBy` for knowledge-requirement. |
| **F8** | Low | Two `Person` nodes have no `@id` and no edge from `Course`; they float in the graph. | JSON-LD emitter | Give each an `@id`; reference from `Course` (`author`→Dominic, `reviewedBy`→Warwick). |
| **F9** | Low | TrustBand attestation links `wa.gov.au` beside the ABN with **no date** — the only undated gov reference. | `…mdx:203` | Append "· verified 22 Jul 2026". |
| **F10** | Low | §`learn` ledger cites a source with `href:''` → a SOURCES line with no link. | `…mdx:182` | Link a durable internal artefact or drop the `sources` array. |
| **F11** | Trivial | `BreadcrumbList` item 1 = `…edu.au/` — trailing slash against the no-slash rule (items 2/3 comply). | `…mdx:15` | `https://www.abeeducation.edu.au` |
| **F12** | Low (not this copy) | Global megamenu renders "NSW Owner Builder — Nationally recognised, with our RTO partner", but NSW OB is ⛔ on hold per `kb/rules/authority-model.md`. Renders on every page. | `SiteHeader.astro` NSW OB card | Raise separately; do not resolve in this run. |
| **F13** | Low | Freshness line uses "on" not `·` and the `<time>` has no `datetime`. | `PageBar.astro` | Use `·` and add `datetime="2026-06-20"`. |
| **F14** | Low | §`course` micro-CTA renders **before** its ledger; other sections put the ledger first. Inconsistent gate ordering. | `…mdx:129-131` | Move the `btn-link` after `<VerifiedSources />`. |
| **F15** | Low | Bundle CTA "Enrol in the bundle" is provider-voiced, the only CTA not saying what the reader gets. | `…mdx:221` | e.g. "Get both certificates for $278". |
| **F16** | Trivial | Card title "every **6** years" vs body "every **six** years". | `modules-wa.ts:22` | Title → "every six years". |
| **F17** | Low | 10px text below the 12px floor (`.waynav .wl`, `.waynext .lab`). | `global.css:124,594` | Raise to 11–12px or record. |
| **F18** | Medium (a11y) | `--slate-light #9a9a9a` = **2.81/2.70/2.56:1** (below AA 4.5:1), used for text in `.waynav .wl` and "Soon" badges. `global.css:340` already documents this failure and fixed it for `.v-body`; other call sites not migrated. | `global.css:124,276`, SiteHeader "soon" rules | Move text-bearing sites to `--slate` (5.10/4.89/4.65:1). |
| **F19** | Low | §01–§06 (six sections) carry no CTA; next after hero is the §07 bundle. Partly mitigated by the sticky CTAs. | `…mdx:114-198` | Add one mid-page CTA after §04/§05. |
| **F20** | Low | `.waynav .btn-mini` = **41.1px** tall (global.css:147 confirms 41px). Below 44px, above AA 24px, desktop-pointer only. | `global.css:151` | Raise padding to 11px (→45.1px) or record. |
| **F21** | Low | Currency review dated 20 Jun 2026 predates the v2.0 course (27 Jun 2026) it is presented as attesting, by 7 days. | `…mdx:18/205/256` vs `:182` | Confirm which date is right; do not adjust either without checking the record. |
| **F22** | Trivial | Hero "Updated June 2026" vs footer "Last updated July 2026". | `…mdx:34` + footer | Reconcile or label distinctly. |
| **F23** | Trivial | "twelve modules" (§05) vs "12 modules" (§06, TrustBand). | `…mdx:179` vs `:195,202,205` | Pick one for prose. |
| **F24** | UNKNOWN | Register L26 "sell within 7 years **without disclosure**" vs page "selling **without it** [insurance] is an offence". Could not open the Home Building Contracts Act 1991; did not guess. | `state-fees-register.md:26` vs `modules-wa.ts:19` | Re-read the Act (s25C) in a browser and align register + page. |
| **F25** | Medium (copy) | §`obligations` states the seven-year rule **3× in ~250 words**; "Board accepts a WA-specific course…" 4× near-verbatim page-wide; "apply to your local council for the building permit" 5×; 6/9 ledgers share the identical "fact-checked against the current…" stem. | `…mdx:227`, `modules-wa.ts:19`, `…mdx:232`, `faqs-wa.ts:10` | Cut the seven-year rule to two statements; vary the ledger stems. |
| **F26** | Low | §`become` (§09) largely recaps §03/§06/§08 — main driver of F25. | `…mdx:247-253` | Tighten steps to point back rather than restate. |
| **F27** | Low | Six-year rule + approval validity each stated in two sections five apart. | `modules-wa.ts:21-22`, `…mdx:154,250` | Cross-reference instead of restating. |
| **F28** | Medium (copy, visible) | `VerifiedSources` joins `facts` to `sources` with the word " against "; 6/9 `facts` already end "against the current Act/guidance", so the line reads "…fact-checked against the current Act **against** WA — Owner-builder approval". | `VerifiedSources.astro:24`; `facts` at `…mdx:143,162,175,197,243,251,262` | Drop the trailing "against the current Act/guidance" from those `facts` strings. Cheapest fix, no component change. |
| **F29** | Low (artefact) | TrustBand and the closing CTA band render in dist but have no row in `05-components.md` (12 of 15 sections mapped). | `05-components.md` map | Add both rows, marked "unchanged". |
| **F30** | Low (artefact) | `05-components.md` records pre-`1c4bc4a` H2s for 7 sections (see K). ids resolve; titles are historical. system-health's most-repeated risk (6×). | `05-components.md` map | Update the 7 H2 cells to the shipped question-form headings. |

**Checks explicitly NOT RUN:** three, all in section G, all because **no rendering engine was available and
no browser was started** (so `audit_render.py`-class checks were impossible): (1) reflow at 320px with no
h-scroll, (2) 200% resize, (3) WCAG 2.2 text-spacing override survival. Static CSS evidence is recorded but
does not certify them. Every other check A–K was run.

---

## Verdict

**AMBER — ship with named caveats.**

The regulatory core is clean and the WA authority model is right in every place it matters: **zero
`recognizedBy`**, zero RTO/accredited/approved-course claims outside explicit negations, the owner-builder
step called an approval throughout with the building permit kept separate, two `Person` nodes for an
ABE-developed course, price identical in schema and on the page, eight primary `.gov.au` sources all dated,
zero `[confirm:]`/`[TO VERIFY]`, zero "comprehensive", zero banned CTAs, zero CTAs inside the 12 capsules or
8 FAQ answers, and — the defect that sank the last run — **the review date "20 June 2026" identical in all
four rendered places, in the MDX and in `faqs-wa.ts`.**

Not GREEN for three named reasons:

1. **F1** — one of the spec's ten hard-blockers is literally true: the ground is pure `#ffffff`. Global
   token, not a WA regression; `CLAUDE.md` gives `global.css` precedence. Needs a recorded decision, not a
   silent pass.
2. **F2** — the page contradicts itself about when two government sources were verified (23 Jul in three
   ledgers, 7 Jul in the page foot). On a page that sells dated verification, this is the one finding a
   reader could use against it. Cheap; fix before deploy.
3. **F3** — one regulatory claim (workers' compensation) carries no source anywhere.

**F28** (six ledgers reading "against … against") and **F18** (a sub-AA grey the codebase has already
documented and half-fixed) are next. Fix F2, F3 and F28 and this goes GREEN on the next pass, with F1
carried as a recorded system caveat.
