# 07 · Pre-deploy verification — `/owner-builder-insurance`

**Audited:** 8 August 2026 · **Auditor:** fresh Stage-7 subagent, no part in building the page ·
**Session type:** build

**What was audited.** `dist/owner-builder-insurance/index.html` (87,712 bytes, built 12:51, re-built
green during this audit), against `05-components.md`, `01-source-map.md`, `04-content.md`,
`references/verification.md`, `CLAUDE.md` and `references/archetypes/09-insurance-type.md`.
`src/pages/owner-builder-insurance.astro` was read only for things invisible in output (prop values,
inline-style count).

**Method.** Every value below was read out of `dist/` by running a command against the built file, not
inferred from source. Where something could not be measured it says "not measured" and why. Rows that
would have been a tick are written as numbers.

---

## 1 · Section conformance, both directions

Measured with a regex over `<section id="...">` in build order.

| Direction | Result |
|---|---|
| `id`s in `dist/`, in order | `top`, `what-you-need`, `compulsory`, `cover`, `timing`, `consequences`, `arrange`, `content-review` (8) |
| `id`s in `05-components.md` | `top`, `what-you-need`, `compulsory`, `cover`, `timing`, `consequences`, `arrange`, `content-review` (8) |
| In plan, missing from `dist/` | 0 |
| In `dist/`, missing from plan | 0 |
| `check-pipeline` verdict | `OK owner-builder-insurance: 7 section(s) match the plan` |

Non-section ids also present in `dist/`: `head-sentinel`, `mega-0..3`, `mnav`, `main` (sitewide
chrome), `enrol` (see defect 14), `ctastrip` (the sticky bar, planned as part of the closing CTA row).

**H2 text, plan versus built.** 8 `<h2>` render; the plan tabulates 7 numbered ones plus an unnumbered
`CtaBand` row.

| # | Plan H2 | Built H2 | Match |
|---|---|---|---|
| 1 | What insurance does an owner builder actually need? | identical | yes |
| 2 | Is home warranty insurance compulsory for an owner builder? | identical | yes |
| 3 | What does cover include, and what does it leave out? | identical | yes |
| 4 | When does cover need to be in place? | identical | yes |
| 5 | What happens if you do not hold the cover your state requires? | identical | yes |
| 6 | How do you arrange cover? | identical | yes |
| 7 | Who checks this page? | **Who reviews this page?** | **no** |
| — | (closing CTA, `CtaBand`) | Not sure which cover applies to your build? | planned, H2 text not in the table |

Heading structure: 1 `<h1>`, 8 `<h2>`, 1 `<h3>` (the `InsurancePartner` block), 0 `<h4>`/`<h5>`/`<h6>`.
No cosmetic H6, so no WCAG 1.3.1 breach from that source.

The three planned deviations from `03-briefs.md` are all present as built: section 5 is prose not a
second table, section 7 is `#content-review`, `ComparisonTable` runs items-as-rows (1 `<table>`,
`<caption>` "Home warranty and indemnity insurance for owner builders, by state", 3 `<th scope="col">`,
5 `<th scope="row">`, 6 `<tr>`, no action column).

---

## 2 · Answer capsules — word count and answer shape

Counted on the rendered `<p class="capsule">` text, tags stripped, hyphenated words counted as one.

| # | Section | H2 question shape | Words | 40–60? | Opening clause | Shape match |
|---|---|---|---|---|---|---|
| 1 | `what-you-need` | What | **48** | yes | "An owner builder normally deals with three covers:" | definition — yes |
| 2 | `compulsory` | Is | **56** | yes | "No home warranty scheme in any state ABE Education serves requires…" | yes/no — yes (see defect 7) |
| 3 | `cover` | What | **46** | yes | "Contract works and public liability cover the build and third parties…" | definition — yes |
| 4 | `timing` | When | **48** | yes | "…need to be in place before work starts" | time — yes |
| 5 | `consequences` | What happens | **53** | yes | "In most of these states the consequence lands at resale…" | outcome — yes |
| 6 | `arrange` | How | **42** | yes | "Through a licensed broker, not through ABE Education." | method — yes |
| 7 | `content-review` | **Who** | **47** | yes | "Every state position on this page is checked against the regulator that sets it, and dated." | **process, not a person — no** |

7 of 7 inside the 40–60 band. No FAQ section exists on this page, so the FAQ exemption is unused.
Capsule 7 is the one answer-shape miss: a "Who" heading is answered by a method sentence, and the
person (Warwick Smith) does not appear until sentence two.

No CTA appears inside any capsule (0 `<a>` elements inside the 7 `<p class="capsule">` blocks).

---

## 3 · Archetype 9 compliance

| Archetype requirement | Measured on `dist/` | Verdict |
|---|---|---|
| No course or enrolment CTA | 0 visible occurrences of "enrol" in `<main>`; the only "Enrolment" string on the page is the sitewide footer line "**Enrolment:** processed directly by ABE Education." All 6 CTAs read "Get an insurance quote" / "Get an owner builder insurance quote" | pass, with a footer artefact (defect 14) |
| No recommended level of cover | The only sum on the page is Tasmania's statutory "$5 million", stated as a permit condition, not a recommendation. No insurer, policy or sum insured is recommended | pass |
| No advice framing | 4 advice-shaped sentences measured, against the page's own line "we cannot give you insurance advice" | **partial, defect 11** |
| Referral relationship in BODY, not a footer | Section 6 capsule: "Through a licensed broker, not through ABE Education. We are a training provider, not an insurer". `InsurancePartner` body para: "ABE Education is not a licensed insurance provider. We work with our insurance partner InsuranceTek Pty Ltd, whose principal broker Mark Adams…". Both in `<main>` | pass |
| Commercial interest disclosed | The archetype's worked copy discloses "We receive a referral fee." The page discloses a partnership and a broker introduction, and no financial interest. Whether a fee is paid is **not recorded anywhere in `01-source-map.md`** — its §C internal-facts table lists only "referral relationship" | **unresolved, defect 12** |
| Consequences factual, not scare copy | Section 5, 4 paragraphs, 0 conditional-threat constructions, 0 exclamation marks. Reads "Western Australia and New South Wales are the two states where going without has a defined consequence attached to the sale." No urgency language | pass |
| **Fail condition:** can it tell a reader in a non-compulsory state they are not obliged to buy | Hero tick 1: "No state requires you to insure your own labour under a home warranty scheme". Capsule 2 (above). Table: QLD "the cover is not available to you rather than merely optional"; ACT "expressly excludes work carried out by a licensed owner-builder"; TAS "No home warranty scheme exists in Tasmania at all". Body: "A page selling cover has no reason to tell a reader they might not need to buy it. This one does, because ABE Education refers rather than sells." | **pass, clearly and in five places** |

The archetype's stated fail condition is the one thing this page does best. It is not close.

---

## 4 · Fact conformance against `01-source-map.md` §C

Every per-state claim in `dist/` traced back to the ledger.

| Claim as rendered | Ledger row | Verdict |
|---|---|---|
| QLD "excluded from the Queensland Home Warranty Scheme by law, so the cover is not available to you rather than merely optional" | QLD row, S1 | traces |
| WA "required before settlement if you sell within seven years of the building permit being granted, on work valued over $20,000" | WA row, S3+S4 | traces |
| ACT "The statutory warranty that the $12,000 threshold triggers for licensed builders expressly excludes work carried out by a licensed owner-builder" | ACT row, S5 | traces |
| TAS "No home warranty scheme exists in Tasmania at all. Separately, at least $5 million of public and construction liability cover is a condition of the permit itself." | TAS row, S6 | traces |
| NSW "not required to hold Home Building Compensation cover for work you do yourself… consumer warning applies if you sell within seven years and six months… any trade you contract must hold cover on work over $20,000" | NSW row, S7 | traces |
| QLD "If you sell within six years of completion you must tell the prospective buyer in writing" | QLD consequence, S1 | traces |
| NSW "a purchaser can void the contract of sale before settlement if the required consumer warning is missing" | NSW consequence, S7 | traces |
| WA "reported fines run to $10,000 and a purchaser can withdraw before settlement" | WA consequence — ledger says **"Fines (third-party sources cite up to $10,000)"** | **traces to a non-government source, and the page says otherwise. Defect 1a** |
| ACT "in the ACT a rectification order can be issued to you after you have sold the property" | **no row in §B or §C** | **untraced. Defect 1b** |

**Tasmania: liability versus warranty.** The distinction the archetype exists to protect is handled
correctly, and in three separate places, each of which keeps the two apart rather than eliding them:

- Section 1: "Neither is a government mandate in most states. Tasmania is the exception, where at least
  $5 million of public and construction liability cover is a condition of the owner builder permit itself."
- Table, TAS row label: "No warranty scheme, but liability cover is mandatory"; cell: "No home warranty
  scheme exists in Tasmania at all. **Separately**, at least $5 million of public and construction
  liability cover is a condition of the permit itself."
- Section 5: "The ACT and Tasmania attach no warranty scheme consequence, because neither has a scheme
  to breach."

Nowhere does the page call the $5 million a warranty requirement or imply Tasmania has a scheme. This
is right. The one place it is under-stated is capsule 2 (defect 7).

**Register cross-check.** The page's four dollar figures were checked against `kb/register/`:
`$5 million` appears at `cbos-tas-reference.md:191` and `state-fees-register.md:34` (both carrying
`[VERIFY AT BUILD]`); `$20,000` and `$12,000` appear across `eligibility-by-state.md` and the
`legislation-references-*.md` files; **`$10,000` for a WA penalty appears nowhere in `kb/register/`**,
and `penalties-by-state.md:77` says explicitly that owner-builder penalties under building law "are out
of scope" of that file and belong in a future `penalties-owner-builder-by-state.md`.

**Two ledger facts the page omits.** `kb/register/legislation-references-act.md:14` records an ACT
"resale disclosure within 6 years". The page attributes a six-year resale-disclosure obligation to
Queensland only, and says of the ACT that it attaches "no warranty scheme consequence". Not a
contradiction on its face (the ACT obligation is a disclosure, not a scheme consequence), but a reader
in the ACT is left without it. `01-source-map.md` §C does not carry it either, so the ledger is
incomplete against the repo's own register.

**Sources cited versus sources held.** `01-source-map.md` §B holds 7 rows; the page cites 5. S2 (QBCC
Queensland Home Warranty Scheme) and **S4 (wa.gov.au home indemnity insurance fact sheet)** are not
cited anywhere on the page. §B names S4 as the source of the $20,000 work-value threshold, which the
page states.

---

## 5 · Sourcing honesty — does the page tell the reader, visibly?

**Yes for NSW and the TAS $5 million.** Rendered verbatim in section 2, in a `Note` titled "Sourcing",
immediately below the state table:

> The New South Wales figures, and Tasmania's $5 million liability figure, are corroborated by results
> citing the regulator rather than by a direct read of the source document, which returned an access
> error when checked. Treat them as reliable but not yet confirmed at source. The Queensland, Western
> Australian and ACT positions were read directly.

That is a real disclosure in reader-visible body copy, in the section where the figures appear, and it
is more conservative than the repo's own register (which already carries NSW's 7.5-year window at
`eligibility-by-state.md:35`). The page does **not** present all five states as equal-strength evidence.

**But its final sentence is not true of the whole page.** "The Queensland, Western Australian and ACT
positions were read directly" sits ten paragraphs above two claims that were not: the WA $10,000 fine
(ledger: third-party sources) and the ACT post-sale rectification order (no ledger row at all). The
one sentence a reader would rely on to calibrate trust is the sentence that misstates it. See
defect 1.

**The caveat is not repeated in section 7,** which `04-content.md` said it would be ("the NSW row's
sourcing caveat repeated rather than dropped"). Section 7 carries only the generic "Where a figure
could not be confirmed at its source, the page says so rather than presenting it as settled."

---

## 6 · Voice and house style

All counts taken on rendered visible text with tags and entities resolved.

| Check | `<main>` | Whole page | Notes |
|---|---|---|---|
| "comprehensive" | **0** | **0** | clean |
| "Enrol now" / "Enrol today" | **0** | **0** | clean; `guardrails.ts` banned-CTA ratchet passed at build |
| any "enrol*" token in visible copy | **0** | 1 | the sitewide footer's "Enrolment:" line |
| bare "ABE" not followed by "Education" | **0** | **0** | `system-health` agrees: "Company name: no bare ABE in reader-facing content" |
| em dash (U+2014) | 5 | 10 | **all 10 are inside source-citation labels** ("QBCC — About owner-building" and the four siblings), which the house rule exempts. **0 in body copy** |
| en dash (U+2013) | 0 | — | |
| US spellings (`-ize`, `-yze`, `color`, `defense`, `center`, `program`, `enrollment`, `fulfill`) | **0** | **0** | the 4 "licensed" hits are adjective/verb forms, correct en-AU |
| AI-pattern tokens (delve, leverage, robust, seamless, crucial, vital, ensure, utilise, "when it comes to", "in today's", "it's important to note") | **0** | **0** | |
| duplicate whole sentences | **0** | — | |
| body words in `<main>` | 1,667 | — | |
| bullet groups over 7 items | **0** | — | hero ticks 3, CanCant 3/3, process 3, wayfinder 6 |

**Duration house style — one breach.** CLAUDE.md requires durations spelled out in prose and capsules,
numerals only in data cells, sticky bars, CTAs and meta. Measured on the page: "within seven years",
"seven years and six months", "six years of completion" all spelled (correct); "Only if you sell
within 7 years" is a table cell (allowed); **and the same fact appears twice in section 6, about 120
words apart, in two different forms** — "close to twenty years" in the capsule and "close to 20 years"
in the `InsurancePartner` body paragraph. The numeral form is body copy, so it breaches the rule, and
carrying both forms in one section is a visible inconsistency. Measured sitewide: "close to 20 years"
appears on 4 built pages (this one plus QLD/TAS/WA course pages, where it is inherited component copy);
"close to twenty years" appears on **this page only**, so the inconsistency was introduced here.

"over 27 years" for Warwick Smith matches `/experts/warwick-smith` ("27+ years in the Australian VET
sector"). No contradiction.

---

## 7 · Schema

One `<script type="application/ld+json">`, server-rendered, parses without error.

| `@type` in the `@graph` | Count | Notes |
|---|---|---|
| `Article` | 1 | `@id` `…#article`, `inLanguage: en-AU`, `dateModified: 2026-08-08` |
| `Person` | 1 top-level | `@id` `…#reviewer`, Warwick Smith, `sameAs` LinkedIn, `url` `/experts/warwick-smith` |
| `BreadcrumbList` | 1 | 3 `ListItem`s |
| **`Course`** | **0** | correct for archetype 9 |
| **`offers`** | **0** | correct |
| `EducationalOccupationalCredential` | 0 | correct, not a course page |
| `AggregateRating` / any review type | **0** | correct, standing ABE rule |
| Nested `EducationalOrganization` (publisher) | 1 | no `inLanguage` on it, correct |

**BreadcrumbList item resolution** — every item checked against `dist/`:

| Position | `item` | Built route |
|---|---|---|
| 1 | `https://www.abeeducation.edu.au/` | `dist/index.html` exists |
| 2 | `https://www.abeeducation.edu.au/owner-builder-courses` | `dist/owner-builder-courses/index.html` exists |
| 3 | `https://www.abeeducation.edu.au/owner-builder-insurance` | self, exists |

All three resolve. Positions 2 and 3 use the no-slash canonical form. Position 1 is
`https://www.abeeducation.edu.au/` **with** a trailing slash; this is the site root and matches how the
shared breadcrumb component emits it elsewhere, so it is noted, not raised as this page's defect.

**Person count, stated precisely.** There is **1** top-level `Person` node, which is what the rule asks
for. There is also a **second, unlinked `Person` object** nested at `Article.reviewedBy`, duplicating
`name`, `jobTitle` and `sameAs` with no `@id` and no reference to `…#reviewer`. A consumer walking the
graph sees two Person entities for one human. `reviewedBy: { "@id": "…#reviewer" }` would collapse them.

**Headline mismatch.** `Article.headline` is "Owner builder insurance: what is actually compulsory, by
state" (the `04-content.md` draft H1). The rendered `<h1>` is "Owner builder insurance, and what your
state actually requires." They are different sentences.

**Meta.** `<title>` 53 chars, `description` 200 chars, `canonical`
`https://www.abeeducation.edu.au/owner-builder-insurance` (no slash, correct), `robots index,follow`,
`lang="en-AU"`, OG and Twitter tags present, breadcrumb renders visually in `.pagebar` **and** as
schema, page present in `dist/sitemap-0.xml`.

---

## 8 · Links and anchors

**In-page anchors — every target exists.** 6 distinct in-page hrefs measured: `#main`, `#top`,
`#what-you-need`, `#compulsory`, `#cover`, `#timing`, `#consequences`, `#arrange`. All 8 resolve to an
element carrying that `id`. 0 dangling anchors.

**Same-origin links.** `check-links.mjs` reports 1,219 same-origin links resolving repo-wide, 0
failing, and **0 of its 3 warnings name this slug** (the three are LearnWorlds `/payment` and
`/program/` paths on `/cpd-building-tas`, `/white-card-wa` and `/cpd-tas`). This page emits **no
LearnWorlds path** in body copy or JSON-LD. The only internal link inside `<main>` is
`/experts/warwick-smith`, which is built.

**The CTA destination, stated plainly.** Six links carry `href="#arrange"`:

| # | Where | Label | Destination |
|---|---|---|---|
| 1 | Hero primary button (`id="enrol"`) | Get an insurance quote | `#arrange`, this page |
| 2 | Wayfinder nav | Arrange cover | `#arrange`, this page |
| 3 | Wayfinder mini-CTA | Get an insurance quote | `#arrange`, this page |
| 4 | **Inside `<section id="arrange">`**, `InsurancePartner` button | Get an owner builder insurance quote | **`#arrange` — the section it is already inside** |
| 5 | `CtaBand` primary button | Get an insurance quote | `#arrange`, this page |
| 6 | Sticky `#ctastrip` | Get an insurance quote | `#arrange`, this page |

**The page's only call to action points at its own section, and the button that is supposed to convert
points at the section it already sits in.** A reader who clicks "Get an owner builder insurance quote"
stays exactly where they are. There is no form, no email address, no phone number, no broker URL and
no `/contact` link anywhere in `<main>`. `05-components.md` flagged this as an open Stage-6 item and a
"real ship gate"; it is confirmed here as built.

**Inbound links.** `/owner-builder-insurance` is linked from 21 built pages, exactly 2 times each,
which is the sitewide nav (megamenu plus mobile nav, `src/data/nav.ts:83`). **No page links to it from
body copy**, including the three course pages that carry `InsurancePartner` blocks about the same
partner. The page links up to `/owner-builder-courses` via the breadcrumb only, not from prose.

---

## 9 · Accessibility and alt text

| Measure | Value |
|---|---|
| `<img>` elements on the page | **1** |
| That image | the sitewide header logo: `alt=""`, `aria-hidden="true"`, `width/height` set. Correct decorative treatment |
| Content images | **0** — both image slots render the FPO `Placeholder` |
| FPO slot 1 description (future alt) | **129 chars**, en-AU: "An owner builder home mid-build behind temporary fencing, the site risk that contract works and liability cover exist to protect." |
| FPO slot 2 description (future alt) | **108 chars**: "An owner builder site with stacked materials and temporary fencing, suggesting the risk that cover protects." |
| `<svg>` elements | 6 (icons inside components) |
| Skip link | present, `href="#main"`, `<main id="main">` exists |
| Table semantics | `<caption>` present, 3 `<th scope="col">`, 5 `<th scope="row">` |
| Inline `style=` attributes in the page source | **0** (the 1 in `<main>` output comes from `CtaBand.astro`'s eyebrow, a component). Meets the "new file, budget 0" rule |
| Components used | 11, all with a `styleguide.astro` specimen (Hero, WayfinderNav, Section, AnswerCapsule, ComparisonTable, CanCant, Note, InsurancePartner, VerifiedSources, CtaBand, SourcesFooter) |

The alt-length rule is **not applicable yet**: there are no content images to fail it. Both future alt
strings already clear 80 chars. They are, however, near-duplicates of each other and are currently
rendered as **visible body text** in the placeholder, so a reader sees "temporary fencing… the risk
that cover protects" twice on one page.

Not measured: colour contrast ratios, characters per line, computed font sizes, tap-target pixel sizes.
Those need a rendered browser measurement (see "Not run, and why").

---

## 10 · Toolchain output, quoted

`node scripts/check-claims.mjs --slug=owner-builder-insurance`

```
  (filtered to --slug owner-builder-insurance: 0 of 30 finding(s) shown; totals below are for the whole repo)
  0 failing, 18 warning, 12 ok, 196 excluded
```

**Read that zero carefully.** `check-claims.mjs:215` builds its figure set from
`walk('src/content', '.mdx')` plus `walk('src/data', '.ts')`. This page is
`src/pages/owner-builder-insurance.astro`, so **the figure-versus-register cross-check never reads
it.** Had this page been an MDX collection entry, its `$5 million`, `$20,000`, `$12,000` and `$10,000`
would have been tested the way `white-card-qld.mdx`'s figures are ("Figure $99 … does not appear
anywhere in `kb/register/`"). Only the §6 bare-"ABE" scan reaches `src/pages` (line 548). The zero is
a scope artefact, not a clearance.

`node scripts/check-links.mjs --slug owner-builder-insurance`

```
  (filtered to --slug owner-builder-insurance: 0 of 3 finding(s) shown; totals below are for the whole repo)
  OK    1219 same-origin link(s) resolve (10 to explicitly planned page(s))
  0 failing, 3 warning
```

`node scripts/check-pipeline.mjs --slug owner-builder-insurance`

```
  FAIL  owner-builder-insurance: missing artefact(s) — 07 (pre-deploy verification)
  WARN  owner-builder-insurance: 7 capsule(s) on the page with no close match in 04 — first: "an owner builder normally deals with num covers contract works insuran..."
  OK    owner-builder-insurance: 7 section(s) match the plan
```

The FAIL is this file, now written. The WARN is real and is defect 9: **all seven** capsules were
rewritten after Stage 4 and `04-content.md` was never updated, so the drafted-copy artefact no longer
records what shipped.

`node scripts/system-health.mjs` — the two lines naming this slug:

```
  FAIL  owner-builder-insurance: missing artefact(s) — 07 (pre-deploy verification)
  WARN  owner-builder-insurance: 7 capsule(s) on the page with no close match in 04 — first: "an owner builder normally deals with num covers contract works insuran..."
  OK    owner-builder-insurance: 7 section(s) match the plan
```

Repo-wide totals at time of audit: `1 failing, 35 warning, 63 ok`.

`npm run build` — `ABE guardrails: 25 page(s) passed.` **Also read with care:** the page emits **0**
`data-authority` attributes, and `guardrails.ts` keys its forbidden-claim and authority-language scan
on that attribute, which only `CourseLayout` emits. As `05-components.md` predicted, the authority scan
did not run on this page. "25 pages passed" does not mean this page's claims were machine-checked.
The banned-CTA ratchet and the inline-style budget did apply, and both passed.

`node scripts/check-freshness.mjs` (prebuild) produced no line naming this slug.

---

## 11 · Artefact completeness

| Artefact | Present | Bytes |
|---|---|---|
| `01-source-map.md` | yes | 9,835 |
| `02-gap.md` | yes | 5,264 |
| `03-briefs.md` | yes | 8,289 |
| `04-content.md` | yes | 11,158 |
| `05-components.md` | yes | 5,929 |
| `06-image-prompts.md` | yes | 5,379 |
| `07-verification.md` | this file | — |

7 of 7 once this file lands. `04-content.md` is present but **stale** (defect 9).

---

## Real defects, ranked

### 1. Two government claims that no cited source supports, on a page that tells the reader otherwise — SHIP BLOCKER

**1a. The WA $10,000 fine.** Rendered in section 5: "In Western Australia, reported fines run to
$10,000 and a purchaser can withdraw before settlement if the insurance is not provided."

Evidence: `01-source-map.md` §C, WA row, consequence column reads "Fines (**third-party sources** cite
up to $10,000)". The figure appears nowhere in `kb/register/`, and `penalties-by-state.md:77` states
that owner-builder penalties under building law are out of that register's scope. Section 5 carries no
`VerifiedSources` block. Neither of the two WA sources in the page-foot list (S3, S4) is the ledger's
attributed source for this figure.

Why it is a blocker: `verification.md` §1d is a hard gate ("Every government/legislative/regulatory
claim on the rendered page carries a visible citation… fees, penalties"), and the hard-blocker list
names "A government/legislative claim with no visible source on the page". It is aggravated by the
page's own Sourcing note asserting "The Queensland, **Western Australian** and ACT positions were read
directly", which is the sentence a reader uses to calibrate how much to trust the rest.

**1b. The ACT post-sale rectification order.** Rendered in section 5: "…and in the ACT a rectification
order can be issued to you after you have sold the property."

Evidence: no row in `01-source-map.md` §B or §C makes this claim; §C's ACT consequence is "Liability
sits with the owner builder directly, and survives a sale". `kb/register/legislation-references-act.md:14`
says only "Disciplinary and rectification matters go to the ACT Civil and Administrative Tribunal
(ACAT)", which does not establish that an order can be issued to a former owner after settlement.
The ACT source cited on the page (S5, ACT Planning statutory warranties) is about statutory warranties.

Fix: cite both, or remove both. `04-content.md` contains neither sentence, so both were added after
Stage 4 without a ledger row.

### 2. The consolidated Sources block carries no verified dates — SHIP BLOCKER (§1d hard gate)

Measured: the page-foot `<ul class="srclist">` has **0** `class="vd"` spans across **5** `<li>`
entries. Comparison on the same component: `/white-card-act` renders 4 of 4, `/qld-owner-builder-course`
8 of 8 ("QBCC — About owner-building **Verified 24 Jun 2026**").

Evidence it is a page omission, not a component limit: `SourcesFooter.astro` renders
`{s.verified && <span class="vd">{s.verified}</span>}`; the page's `stateSources` array simply does not
set `verified`. `verification.md` §1d requires the consolidated section to pair "each
authority/instrument with its official URL **+ date verified**". One prop per source fixes it.

Related, same fix window: the page cites 5 of the ledger's 7 sources. S4 (wa.gov.au home indemnity
insurance fact sheet) is the ledger's named source for the $20,000 threshold the page states, and is
cited nowhere.

### 3. The only call to action is a circular anchor — SHIP BLOCKER

All 6 CTAs resolve to `#arrange`, and CTA 4 sits **inside** `<section id="arrange">` pointing back at
its own container. No form, email, phone number, broker URL or `/contact` link exists anywhere in
`<main>`. A reader who does everything the page asks reaches nothing.

This is already recorded in `05-components.md` as an open Stage-6 item and "a real ship gate, not a
cosmetic one". It is confirmed as built, unchanged. It needs a destination from Andrey (an InsuranceTek
URL, a form, or `/contact`) before the page earns its own CTA.

### 4. Section 7's source line reads "reviewed by Warwick Smith … against Warwick Smith" — not a blocker

Rendered verbatim: "Verified 8 August 2026 · Reviewed for regulatory currency by Warwick Smith, an
independent compliance and currency reviewer with over 27 years in the Australian vocational education
and training sector **against** Warwick Smith, compliance and currency reviewer".

`VerifiedSources` joins `facts` to its source list with the word "against". The `facts` string names
Warwick, and the only "source" supplied is Warwick again, so the E-E-A-T block ends in a self-
referential stutter. This is the exact defect class `05-components.md` warned about in its own prop
contract note ("phrase `facts` so it does not end in the word 'against' or the rendered line
stutters"), landing in the one section whose job is to look credible.

### 5. The same fact stated twice in one section, in two forms, one of which breaches house style — not a blocker

Section 6 capsule: "the broker our students have used for **close to twenty years**". Section 6
`InsurancePartner` paragraph, roughly 120 words later: "Mark Adams has helped ABE Education students
for **close to 20 years**". CLAUDE.md requires durations spelled out in body copy. Measured sitewide,
this is the only page carrying both forms.

### 6. Capsule 7 answers a "Who" question with a process — not a blocker

"Who reviews this page?" is answered by "Every state position on this page is checked against the
regulator that sets it, and dated." The person arrives in sentence two. This is the answer-shape defect
class the repo has hit before; the other six capsules pass.

### 7. Capsule 2 drops the only mandatory insurance on the page — not a blocker

"…and Tasmania has no scheme at all" is the last clause a Tasmanian reader gets from the extraction
unit, on a page whose central finding is that Tasmania is the one state where insurance genuinely is
compulsory. The `04-content.md` draft carried the qualifier ("Tasmania is the one state with a
*different* mandatory cover: at least $5 million…") and the built capsule cut it, presumably for the
56-word budget. It is recovered two paragraphs down, in the table and in section 1, so no reader who
reads the section is misled. A reader served only the capsule by an AI summary would be.

### 8. The breadcrumb reviewer link leaves the page, where every other page keeps it — not a blocker

This page: `<a href="/experts/warwick-smith" rel="author noopener" target="_blank">`.
`/white-card-act`, `/white-card-qld` and `/act-owner-builder-course` all render
`<a href="#content-review">`. `verification.md` §1c specifies the name anchors to `#content-review`.
The effect is that the topmost trust signal opens a new tab away from the page before the reader has
read anything.

### 9. `04-content.md` no longer records what shipped — not a blocker, but it hides the others

`check-pipeline` WARN, quoted in full above: **7 of 7** capsules on the page have no close match in 04.
The H1 changed too ("what's actually compulsory, by state" became "and what your state actually
requires"), and the section-5 table became prose. Some of that is the deliberate deviation 05 records;
the capsule rewrite is not recorded anywhere. Defects 1a and 1b both live in sentences that exist only
in `dist/`, which is precisely what a stale 04 makes hard to notice.

### 10. Government facts stated in sections with no verification block — not a blocker

2 of 7 sections carry a `VerifiedSources` block (2 and 7). Sections 1, 4 and 5 each state government
facts without one: §1 the TAS $5 million permit condition, §4 the WA before-settlement and NSW
disclosure timings, §5 four states' consequences. `verification.md` §1c asks for a per-section block on
"any section citing government facts". The page-foot block partly compensates, but not for defect 1.

### 11. Advice-shaped copy against the page's own disclaimer — not a blocker, worth a decision

Section 6 capsule says "we cannot give you insurance advice". Measured against that, four sentences:

- capsule 1: contract works and public liability are "both sensible from the day work starts"
- section 4 Note: "Do not let 'I am not selling any time soon' become a reason to delay the cover you need on day one"
- section 6: "Contract works and public liability cover are worth arranging before work starts"
- `CtaBand`: "a quote on the cover you actually need"

None recommends an insurer, a policy or a sum insured, so archetype 9's hard ban is not breached. But
the page tells a reader which covers they need and when, having just said it cannot. Either soften the
four, or drop the blanket disclaimer to the accurate narrower one (not a licensed insurance provider,
which it already says).

### 12. Whether ABE receives a referral fee is unresolved — not a blocker, needs a human answer

Archetype 9's worked copy discloses "We receive a referral fee." The page discloses the partnership and
the introduction, and no financial interest. `01-source-map.md` §C's internal-facts table records
"Commercial disclosure | ABE Education is not a licensed insurance provider; referral relationship" and
says nothing about a fee. If a fee or commission is paid, the archetype requires it disclosed in the
body and the page currently does not. If none is paid, this closes with a line in the ledger. A build
session cannot answer it.

### 13. Schema: two Person objects for one person, and a headline that is not the H1 — not a blocker

1 top-level `Person` (correct), plus an unlinked duplicate at `Article.reviewedBy` with no `@id`.
`Article.headline` is "Owner builder insurance: what is actually compulsory, by state"; the rendered
`<h1>` is "Owner builder insurance, and what your state actually requires."

### 14. Enrolment furniture on a page that sells nothing — not a blocker, cosmetic

The hero CTA carries `id="enrol"` (invisible, but it is the anchor identity of a button that says "Get
an insurance quote"), and the sitewide footer renders "**Enrolment:** processed directly by ABE
Education." on an insurance referral page. The second is `SourcesFooter`'s hardcoded sitewide block and
is a `[design]` question, not this page's to fix.

### 15. The two placeholder descriptions read as near-duplicates, visibly — not a blocker

"…behind temporary fencing, the site risk that contract works and liability cover exist to protect"
and "…with stacked materials and temporary fencing, suggesting the risk that cover protects". Both
render as visible body text today. Worth differentiating before the real images land, since
`06-image-prompts.md` treats them as two distinct slots.

### 16. Plan H2 for section 7 does not match the built H2 — not a blocker

Plan: "Who checks this page?". Built: "Who reviews this page?" (the eyebrow still says "Who checks
this"). Update whichever is wrong.

---

## Not run, and why

- **`abe-readability-audit` — not run.** Its `audit_static.py`, `audit_render.py` and
  `contrast_check.py` ship with the plugin skill, not this repo, and a truthful render measurement
  needs `dist/` served over HTTP with Chromium driving it. I did not do that, so **no contrast ratio,
  characters-per-line, computed font-size or tap-target measurement appears in this audit** and none
  should be inferred from it. Mitigating fact, measured rather than assumed: the page source carries
  **0** inline styles and composes **11** components that all have a `styleguide.astro` specimen, so
  its typography, contrast and tap targets are inherited from the shared register rather than authored
  here. Any finding would belong to those components, and would be a `[design]` item. This should be
  run before the page is treated as visually verified.
- **`final-check` — run manually against the built copy, not as the plugin skill.** All six checks
  were executed with measurements, reported in §6 and below. (1) Contradictions: one found, the
  "close to twenty years" / "close to 20 years" pair in §6, plus the Sourcing note's "Western
  Australian… read directly" against the WA fine's third-party provenance (defect 1a). (2) Duplicates:
  0 duplicate sentences; the two placeholder descriptions are near-duplicates (defect 15); "home
  warranty" 12x, "contract works" 8x, "public liability" 7x across 1,667 words, which is subject
  vocabulary rather than padding. (3) Logical flow: the decision order matches archetype 9 §2 exactly
  (definition, compulsory, cover, timing, consequences, how to obtain, sources). (4) Grouping: sound,
  with one exception, the TAS $5 million appearing in three sections. (5) Australian English: 0 US
  spellings. (6) AI-writing patterns: 0 tokens from an 13-pattern scan.
- **`ai-detector` — not run as a skill.** A static pattern scan stood in for it (§6, 0 hits across 13
  patterns), which is weaker evidence than the tool. This page is not a submission where human
  authorship is a stated requirement, so the substitution is a judgement call, recorded rather than
  hidden.

---

## Ship decision

**Not merge-ready.** Three blockers, in order of what they cost:

1. **Cite or cut the two unsourced government claims** (defect 1a, the WA $10,000 fine; defect 1b, the
   ACT post-sale rectification order). Until then the page states a penalty and an enforcement power
   with no source, on a page whose own note tells the reader those states were read directly. If a
   `[facts]` session cannot get a primary read, the honest fix is to delete both sentences: neither is
   load-bearing, and the section reads cleanly without them.
2. **Set `verified` on all five page-foot sources**, and add the two ledger sources the page uses but
   does not cite (S2, S4). One prop per entry; the component already renders it and every other page
   on the site does.
3. **Give the CTA a destination.** Six buttons currently point at a section on this page, one of them
   from inside that section. This needs Andrey: an InsuranceTek quote URL, a form, or `/contact` as the
   interim. Shipping a referral page whose referral goes nowhere is worse than shipping no CTA.

Then, before merge and cheap to do in the same pass: rewrite section 7's `facts` string so the source
line stops reading "reviewed by Warwick Smith against Warwick Smith" (defect 4); make the two
twenty-years statements agree and spell the numeral (defect 5); reopen capsule 7 with the reviewer's
name (defect 6); restore the Tasmania qualifier to capsule 2 (defect 7); point the breadcrumb reviewer
link at `#content-review` like every other page (defect 8); and **update `04-content.md` to what
actually shipped** (defect 9), because a stale draft is how defects 1a and 1b got past a Stage-4 read
in the first place.

Defect 12 (referral fee, yes or no) needs an answer from Andrey and should be asked in the same
message as the CTA destination.

What is genuinely good, and was tested hard before being called good: the archetype's stated fail
condition passes in five separate places; the Tasmania liability-versus-warranty distinction is kept
apart in all three places it appears, never conflated; all seven capsules land inside 40 to 60 words;
banned copy, bare "ABE", body-copy em dashes and US spellings all measure zero; the schema correctly
carries no `Course`, no `offers` and no rating; the consequences section is factual with no scare
framing; and the sourcing caveat on NSW and the TAS $5 million is a real, visible, reader-facing
disclosure that most pages of this kind would have buried.

---

## Demand list
Tag every item: [skills] | [design] | [facts] | [build]

- [build] `owner-builder-insurance.astro` section 5 states a WA $10,000 fine and an ACT post-sale rectification order with no `VerifiedSources` block and no row in `01-source-map.md` §C. Cite both or cut both before merge.
- [build] `owner-builder-insurance.astro` `stateSources` sets no `verified` date on any of its 5 entries, so the page-foot Sources block renders 0 of 5 dates where `/white-card-act` renders 4 of 4 and `/qld-owner-builder-course` 8 of 8. Add the dates and the two uncited ledger sources (S2, S4).
- [build] `owner-builder-insurance.astro` has 6 CTAs all pointing at `#arrange`, one of them from inside `<section id="arrange">`. SECOND SIGHTING of the no-destination problem `05-components.md` filed at Stage 5. Needs a real quote destination from Andrey.
- [build] `owner-builder-insurance.astro` section 7's `VerifiedSources` `facts` string names Warwick Smith and its only source is Warwick Smith, so the joiner renders "…training sector against Warwick Smith, compliance and currency reviewer".
- [build] `04-content.md` no longer matches the built page: 7 of 7 capsules diverge, per `check-pipeline`. Update it to what shipped.
- [build] `owner-builder-insurance.astro` states "close to twenty years" in the section 6 capsule and "close to 20 years" in the section 6 body, about 120 words apart. The numeral form is body copy and breaches the CLAUDE.md duration rule.
- [build] `owner-builder-insurance.astro` capsule 7 answers "Who reviews this page?" with a process sentence; Warwick Smith is not named until sentence two.
- [build] `owner-builder-insurance.astro` capsule 2 ends "Tasmania has no scheme at all" and omits the $5 million liability requirement, the only mandatory insurance on the page.
- [build] `owner-builder-insurance.astro` breadcrumb reviewer link points at `/experts/warwick-smith` with `target="_blank"`; `/white-card-act`, `/white-card-qld` and `/act-owner-builder-course` all point at `#content-review`, which is what `verification.md` §1c specifies.
- [build] `owner-builder-insurance.astro` JSON-LD nests an unlinked duplicate `Person` at `Article.reviewedBy`; use `{ "@id": "…#reviewer" }`. `Article.headline` also differs from the rendered `<h1>`.
- [build] `06-image-prompts.md` slots 1 and 2 render near-duplicate descriptions as visible body text ("temporary fencing… the risk that cover protects" twice).
- [build] `05-components.md` section-7 H2 reads "Who checks this page?"; the built H2 reads "Who reviews this page?".
- [facts] The WA owner-builder penalty for failing to provide home indemnity insurance has no row in `kb/register/`. `01-source-map.md` §C carries "$10,000" from third-party sources only, and `penalties-by-state.md:77` puts owner-builder building-law penalties out of that file's scope. Needs a primary read of the WA instrument, or the figure comes off the page.
- [facts] `01-source-map.md` §E's open NSW item stands: SIRA `information-for-owner-builders` returned 403 and needs a browser read. Note `kb/register/eligibility-by-state.md:35` and `legislation-references-nsw.md:15` already carry the 7.5-year window, so only the $20,000 contracted-trade HBC threshold is genuinely unheld.
- [facts] Whether an ACT rectification order can be issued to a former owner after settlement is unestablished. `legislation-references-act.md:14` records only that rectification matters go to ACAT.
- [facts] `kb/register/legislation-references-act.md:14` records an ACT "resale disclosure within 6 years" that `01-source-map.md` §C does not carry and the page does not state. Confirm and add it to the ledger.
- [skills] `check-claims.mjs:215` builds its figure-versus-register set from `src/content/**` and `src/data/**` only, so a hand-built `src/pages/*.astro` page carrying four regulatory dollar figures is never cross-checked. `--slug` returned a clean zero for a page the check does not read. Third Recipe C page to be built this way.
- [skills] `guardrails.ts`'s forbidden-claim and authority-language scan keys on `data-authority`, which only `CourseLayout` emits, so it did not run on this page. `05-components.md` predicted this at Stage 5 and no check confirms it either way; "25 page(s) passed" reads as coverage it does not have.
- [design] `SourcesFooter.astro` renders the sitewide line "**Enrolment:** processed directly by ABE Education." on every page, including a referral page that sells nothing and takes no enrolment.
- [design] `Hero.astro` emits `id="enrol"` on its primary CTA regardless of what the button says; here it labels "Get an insurance quote".

---

## Re-verification · 8 August 2026 — blockers 1 and 2 closed, blocker 3 escalated

Written by the build session that received the audit above, immediately after it. Every value
below was re-measured from a fresh `dist/` build, not inferred from the edits.

### Blocker 1 — unsourced government claims: CLOSED

Both sentences were **cut, not reworded**. Neither had a row in `01-source-map.md` §C, and the WA
source read for this run (`wa.gov.au` — "Home indemnity insurance, a reminder about your
obligations") explicitly states penalties for *registered builders* and declines to state one for
owner builders, so the "$10,000" figure was not merely uncited but arguably wrong for the party
this page addresses.

| Check | Before | After |
|---|---|---|
| `"10,000"` in `dist/` | 1 | **0** |
| `"rectification order"` in `dist/` | 1 | **0** |
| `VerifiedSources` blocks on the page | 2 (sections 2, 7) | **3** (2, 5, 7) |

Section 5's new block states the omission as policy rather than hiding it: "Where a penalty amount
is quoted by third parties but not stated by the regulator, this page leaves it out rather than
repeating it."

### Blocker 2 — Sources block carried no dates: CLOSED

| Check | Before | After |
|---|---|---|
| `verified` dates rendered in the page-foot Sources block | 0 of 5 | **6 of 6** |
| Ledger sources cited | 5 of 7 | **6 of 7** (S4, the WA fact sheet backing the $20,000 threshold, added) |

S3 (the WA Building Services Board policy) remains uncited on the page deliberately: it backs no
figure this page states.

### Blocker 3 — circular CTA: NOT FIXED, escalated to Andrey

Unchanged and confirmed still present: six CTAs, all resolving to `#arrange`, one of them rendered
*inside* `<section id="arrange">`. This is a real unknown, not an oversight — no quote destination
for InsuranceTek exists anywhere in the repo, and the three live `InsurancePartner` blocks on the
QLD, WA and TAS course pages all point their quote CTA at that page's own `#enrol` anchor, which
this page has no equivalent of. Inventing a URL, form or phone number would breach the
ask-don't-assume rule on an internal fact. **This is the one thing standing between the page and a
merge, and it needs an answer from Andrey rather than a decision from this session.**

### Also fixed from the audit's demand list

| Finding | Measured after |
|---|---|
| Capsule 2 dropped the TAS $5m qualifier | Restored; capsule now 57 words, inside 40-60 |
| Capsule 7 opened on process, not the person | Rewritten to open "Warwick Smith, an independent compliance and currency reviewer..."; 50 words |
| Section 7 `VerifiedSources` joiner stutter | `facts` rewritten; "sector against Warwick" occurrences: **0** |
| "close to 20 years" in body copy | **0** occurrences; both instances now "close to twenty years" |
| Breadcrumb reviewer link pointed at the profile | Now `href="#content-review"`, matching `verification.md` §1c and three shipped pages |
| Duplicate `Person` nested at `Article.reviewedBy` | Now `{ "@id": "...#reviewer" }`; `Person` nodes in JSON-LD: **1** |
| `Article.headline` differed from the `<h1>` | Now identical apart from the h1's decorative full stop |
| Two FPO slots printed near-duplicate visible text | `imgDesc` strings now distinct (structure-first vs materials-first) |
| `05-components.md` H2 drift | Table updated to "Who reviews this page?" |
| `04-content.md` diverged from the built page | Superseding note added at its head listing all six changes and why |

### Left open deliberately

- **The four `[facts]` items** (WA penalty instrument, the NSW SIRA read, ACT rectification-after-sale,
  ACT resale disclosure). A build session may not write `kb/register/**`, and rule 4 forbids
  recording a figure without reading its source in that session. Routed, not actioned.
- **The two `[skills]` items** (`check-claims.mjs` not reading `src/pages/**`; `guardrails.ts`'s
  authority scan not running on a page with no `data-authority`). Both are real coverage gaps this
  page sits inside, and both are outside a build session's may-write list.
- **The two `[design]` items** (`SourcesFooter`'s enrolment line on a page that takes no enrolment;
  `Hero.astro` emitting `id="enrol"` on a button labelled "Get an insurance quote").

### Ship decision, restated

**Not merge-ready, on one blocker rather than three.** The page is factually clean, every state
position is sourced and dated, and the archetype's own fail condition passes decisively. It cannot
merge while its only call to action points at itself.

---

## Post-ship correction, 12 Aug 2026 — an internal contradiction Stage 7 did not catch

Found while adding this page's inbound link on `/owner-builder-courses`, by reading the claim being
summarised rather than the page as a whole. **Two statements on this page contradicted its own state
table, and both shipped.**

| Where | Said | The table says |
|---|---|---|
| Hero tick | "No state requires you to insure your own labour under a home warranty scheme" | WA: "Home indemnity insurance is **required** before settlement if you sell within seven years" |
| Answer capsule | "No home warranty scheme in any state ABE Education serves requires an owner builder to insure their own labour" | same row, same page |

Two distinct defects, not one.

1. **Contradicted by the page's own data.** WA does require warranty cover for the owner builder's
   own work, conditionally on sale. The capsule then half-corrected itself in its second sentence
   ("Western Australia and New South Wales attach an obligation only if you sell"), which is how an
   absolute claim and its own refutation ended up in the same 55 words.
2. **Unscoped.** "No state" asserts a position on SA and VIC. This page verified five states and
   sourced five regulators. ABE Education has no product in SA or VIC and no source was read for
   either, so the claim reached beyond its evidence in a second, independent way.

The capsule also lumped NSW in with WA. They are not alike: SIRA's position, in this page's own NSW
row, is that cover is **not** required for work you do yourself, and the seven-and-a-half-year sale
trigger is a *consumer warning*, not an insurance obligation.

### Corrected to

- Tick: "**Only Western Australia can require warranty cover for your own work**, and only if you sell"
- Capsule: "Four of the five states ABE Education serves do not require an owner builder to insure
  their own labour: Queensland and the ACT exclude owner builders by law, New South Wales does not
  require cover for work you do yourself, and Tasmania has no scheme at all. Western Australia is the
  exception, and only if you sell within seven years." (60 words, at the ceiling.)

### No re-verification, deliberately, and the date is unchanged

**"Government facts verified 8 August 2026" still stands and was not bumped.** No source was read in
this session, so under rule 4 there is nothing to re-date. This was prose corrected to agree with data
already verified on 8 Aug against the six named regulator sources in `stateSources`; the figures, the
sources and their dates are untouched. Bumping the date would have claimed a re-reading that did not
happen, which is the exact failure rule 4 exists to prevent.

### Why the gates could not see it

Every check passed on both the wrong and the right version: 26/26 guardrails, `check-claims` 0
failing, `check-links` 0 failing, `check-reflow` 0 failing. Correctly so — **no check compares two
prose statements on the same page for agreement**, and none can. Both sentences were individually
well-formed, correctly scoped in tone, carried no banned CTA and no authority-model keyword. The
contradiction was only visible by reading the hero against the table, which is a job for a reader.

This is the "read copy as prose" lesson landing on a *factual* contradiction rather than a stylistic
one, and it is the more serious form: a green build certified a page whose hero told a Western
Australian the opposite of what its own table told them.

## Demand list
Tag every item: [skills] | [design] | [facts] | [build]

- [build] `owner-builder-insurance.astro` **carried a hero claim its own state table refuted, and
  shipped green.** Recorded here as the specific instance. The general shape — an absolute claim in
  hero furniture, qualified or reversed by the detail lower down the same page — is worth one
  deliberate read on any page whose hero ticks summarise a table. Not mechanisable; see below.
- ~~[skills] **A page's summary furniture (hero ticks, answer capsule, meta description) can contradict
  its own data table with every check green.**~~ **Closed 12 Aug 2026**, same day, as the reading step
  rather than a script — `verification.md` §3 check 1 now names the failure mode, carries this page as
  its worked example, states that no script can do it, and offers the forcing move that actually found
  it (restate the central claim as a one-line link description, then go find the row that proves it).
  Mirrored into `SKILL.md` §7 as check 5, and a matching hard-blocker added for the regulatory case. No existing check reads two prose statements against
  each other, and `check-claims` does not read `src/pages/**` at all (already filed above, 8 Aug).
  Worth deciding whether Stage 7 gets an explicit step — "read each hero tick against the section it
  summarises" — rather than another script. The failure here was a missing *reading*, not a missing
  *rule*, and the third sighting of Stage 7 having no step for a check the session must perform by
  eye (see the design-register item, 11 Aug).
