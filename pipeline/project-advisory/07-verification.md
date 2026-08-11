# 07 · Pre-deploy verification — `/project-advisory`

**Audited:** 10 August 2026 · **Auditor:** fresh subagent, no part in the build ·
**Session type:** build (inherited) · **Graded by:** fresh subagent

**What was audited, exactly:**
- `dist/project-advisory/index.html` (81,172 bytes, rebuilt during this audit — `npm run build` green,
  `ABE guardrails: 26 page(s) passed`)
- the page rendered in a real browser at 320 / 375 / 1280 px (`dist-static-auto`, served from `dist/`)
- `src/pages/project-advisory.astro`, read only for things invisible in the output
- `pipeline/project-advisory/01` through `06`
- `.claude/skills/abe-course-page-astro/references/verification.md`, `CLAUDE.md`,
  `src/integrations/guardrails.ts`

**The condition that shapes this whole audit.** The page carries no `data-authority`. Verified in the
built HTML: `data-authority` occurs **0 times**. `guardrails.ts:477` gates the forbidden-claim scan,
the four-node JSON-LD requirement, the Person-node count and the `Course.offers.price` parity check on
that attribute, so **none of them ran**. What did run on this page is checks 1, 1b, 5, 6, 7, 7a, 7b and
the inline-style ratchet. Every claim below marked "hand-checked" has no machine behind it.

---

## 1 · The hard rule (`01-source-map.md` §B): never imply the pack is part of an owner builder obligation

Every sentence in `<main>` read against the rule. **1,117 visible words, 62 sentences.** Nothing on the
page states or implies the pack satisfies a requirement. The rule is actively defended in four places:

| Where | Rendered wording | Verdict |
|---|---|---|
| §1 capsule | "It is not a course and it is not required by any regulator." | Defends the rule |
| §1 FactGrid | "Required? / No / Voluntary. No regulator requires it." | Defends the rule |
| §4 capsule | "No regulator requires it, and no owner builder approval depends on it." | Defends the rule |
| §4 Note (caution) | "**Not part of your requirement** — Your state's approved course, your White Card and your insurances are separate obligations, and none of them is satisfied by anything in this pack." | Defends the rule |
| Footer disclaimer | "…it is not approved or recognised by any regulator, and buying it does not satisfy any owner builder requirement." | Defends the rule |

**Nearest miss, quoted in full:** §1 body — *"Most people buy it once they have their approval and are
about to start pricing trades, which is the point at which a budget stops being a rough number and
starts being a set of commitments."* This does **not** breach the rule (it places the purchase *after*
the approval, which reinforces the separation). It is flagged under Defect 5 for a different reason:
nothing in the ledger supports the customer-behaviour claim.

**Verdict: the hard rule holds.** 0 breaches, 5 active defences.

## 2 · Sentences that read as a regulatory or government claim (`01-source-map.md` §C says there are none)

§C's "zero regulatory facts" is **true of figures** — no fee, date, section number, regulator name or
`.gov.au` citation appears anywhere on the page (0 occurrences of `gov.au` in `<main>`). It is **not
quite true of statements**. Three rendered sentences are regulatory in shape:

| # | Rendered wording | Reading |
|---|---|---|
| R1 | §4 Note: "Your state's approved course, your White Card and your insurances are separate obligations" | **Asserts that three obligations exist.** True, and sourced on other pages — but not on this one, and this page does not link to them (see Defect 2) |
| R2 | Footer disclaimer: "Your state's approved course, your White Card and your insurances are separate obligations." | R1 repeated in the page foot |
| R3 | §5 capsule: "there is no government fee attached to anything in the pack" | A negative claim about government charges |
| R4 (weak) | §2 TopicGrid card 03: "Energy and water efficiency taken past the state minimum rating" | References a regulatory minimum without stating one |

All four cut **against** the sale rather than for it, which is why none is a substantive problem. But
`verification.md`'s hard-blocker list says, literally: *"A government/legislative claim with no visible
source on the page, or the Consolidated Sources section missing."* R1–R3 are government/legislative
claims, and `05-components.md` §2 deliberately shipped no Sources block. Recorded as Defect 2 with the
cheap fix.

## 3 · Section conformance — both directions

`05-components.md` plan vs `dist/`. Both lists below are complete; neither has an entry the other lacks.

| Plan `id` | Plan H2 | In `dist/`? | Rendered H2 | Marker |
|---|---|---|---|---|
| `top` | (hero, single H1) | yes | — (H1: "The Project Advisory Pack.") | — |
| `what` | What is the Project Advisory Pack? | yes | What is the Project Advisory Pack? | 01 of 6 |
| `inside` | What is actually in it? | yes | What is actually in it? | 02 of 6 |
| `why-paid` | Why not just use a free template? | yes | Why not just use a free template? | 03 of 6 |
| `who` | Who is it for, and who is it not for? | yes | Who is it for, and who is it not for? | 04 of 6 |
| `cost` | What does it cost? | yes | What does it cost? | 05 of 6 |
| `content-review` | Who made it? | yes | Who made it? | 06 of 6 |

**Ids in `dist/` not in the plan:** `head-sentinel`, `mega-0`…`mega-3`, `mnav`, `main`, `ctastrip` —
all site chrome from `SiteHeader`/`BaseLayout`; and **`enrol`**, which is not a section at all (see
Defect 1). **Ids in the plan not in `dist/`:** none.

Heading order measured in the DOM: `H1, H2, H2, H3, H3, H3, H2, H2, H2, H2, H2`. One H1, no skipped
level, no H6-as-label. `check-pipeline`: `OK project-advisory: 6 section(s) match the plan`.

## 4 · Answer capsules — every capsule, measured

Word counts taken from the rendered `<p class="capsule">` text, tags stripped, entities decoded.
Band is 40–60.

| # | Section | H2 shape | Words | In band | Does the capsule answer that shape? |
|---|---|---|---|---|---|
| 1 | `#what` | "What is…" (definition) | **47** | yes | Yes — opens "Three downloadable tools for the money side of an owner builder project" |
| 2 | `#inside` | "What is actually in it?" (contents) | **49** | yes | Yes — opens "The pack holds three files", then names all three |
| 3 | `#why-paid` | "Why not…" (comparison) | **50** | yes | Yes — opens "A free template gives you an estimate", then the contrast |
| 4 | `#who` | "Who is it for…" (person) | **47** | yes | Yes — opens "It suits an owner builder who is running their own trades…" |
| 5 | `#cost` | "What does it cost?" (amount) | **48** | yes | Yes — opens "$89.00, paid once" |
| 6 | `#content-review` | "Who made it?" (person/org) | **48** | yes | Partly — opens at organisation level ("ABE Education's own product"), then names Dominic Ogburn as "the developer behind the state owner builder courses", never as the developer of *this* pack. Deliberate and defensible (§C carries no developer row for the pack) but it leaves the H2's question answered only at brand level |

**Mean 48.2 words, range 47–50, all six in band, zero outliers.** No capsule contains a CTA or a link
(`<a>` count inside `p.capsule`: **0**). No capsule opens yes/no under a `what`/`who`/`why` heading —
`guardrails.ts` check 1b would have failed the build, and did not.
`check-pipeline`: `OK project-advisory: 6 capsule(s) match 04-content.md (figures normalised)`.

## 5 · Fact conformance — every figure on the page against `01-source-map.md` §C

| Figure on page | Occurrences (full HTML) | In §C ledger? | Note |
|---|---|---|---|
| `$89.00` / `$89` | 7 × "89.00", plus "$89" in hero proof and sticky bar | **Yes** | Corroborated in §C by LearnWorlds: A$1,602.00 / 18 payments = A$89.00 |
| `20% contingency` | 4 (main text) + 1 in schema `description` | **Yes** | §C, corroborated on `/faq` |
| `56 pages` / `56-page` | **3** (hero tick, TopicGrid card 03, schema `description`) | **Yes**, but §D-flagged | See Defect 4 |
| `3 tools` / three components | 6 restatements (see Defect 8) | **Yes** | §C components 1–3 |
| `GST-free` | **3** (FactGrid, §5 capsule, PriceCard row) | **Yes**, but §D-flagged | See Defect 4 |
| `$0.00` (Ongoing costs) | 1 | Derived | Follows from "nothing recurring"; not a claim of its own |
| **`31,000+` students trained** | 1 (hero proof stat) | **NO** | Not in §C. Matches 8 other built pages verbatim |
| **`2007` / "since 2007"** | 2 (hero proof stat; §6 capsule) | **NO** | Not in §C. `SourcesFooter.astro` renders "Training Australians since 2007" site-wide |
| **"more than 40 years in Australian construction"** | 1 (§6 capsule) | **NO** | Not in §C. Matches `src/pages/experts/index.astro:97` verbatim |

**Three reader-visible figures are absent from a ledger `01-source-map.md` §"Ship decision (Stage 1)"
calls closed.** None is wrong — all three reproduce standing site-wide claims — but "the ledger is
closed" was asserted while the hero carried two figures the ledger never listed. Defect 7.

Correctly **absent** from the page: the sales figures (18 payments, A$1,602.00) and the reviewer row
(Warwick Smith), both of which §C holds and neither of which belongs in front of a reader here.

## 6 · Flagged assumptions (`01-source-map.md` §D) — how the page renders them

§D flags two items as assumptions rather than verified facts. **The page renders both as settled
fact, with no hedge anywhere in the visible copy.** Exact rendered wording:

**§D item 1 — GST-free.** Three unhedged statements:
- FactGrid: *"Price / $89.00 / One payment, GST-free. Nothing recurring."*
- §5 capsule: *"The price is GST-free, and there is no government fee attached to anything in the pack."*
- PriceCard row 1 sub: *"Paid once to ABE Education, GST-free"*

**§D item 2 — the component list, "the 56-page figure is the one to watch".** Three unhedged
statements, one of them machine-readable:
- Hero tick: *"A 56-page written guide to efficiency, contracts and scoping trades"*
- TopicGrid card 03: *"56 pages. Energy and water efficiency taken past the state minimum rating…"*
- JSON-LD `Product.description`: *"…and a 56-page written guide to efficiency, contracts and scoping
  trades."*

This is not a criticism of the copy — §D itself says GST-free was reaffirmed on instruction and is
"not this session's call", and a hedge in front of a buyer ("approximately 56 pages") would be worse
writing. It is the **gate §D asked Stage 7 to set**, and it is set in Defect 4: the page is
publish-ready, and it should not be *advertised* until the page count is confirmed against the file
that actually ships. The schema copy raises the stakes slightly, because a `Product.description` is
the version that gets syndicated.

## 7 · Schema — every node type, and the price hand-check

One JSON-LD block, server-rendered, parses clean. `@type` values in document order:

`Product` → `Organization` (brand) → `Offer` → `Organization` (seller) → `BreadcrumbList` →
`ListItem` × 3.

| Requirement | Measured | Verdict |
|---|---|---|
| `Product` present | yes, `@id` `…/project-advisory#product` | PASS |
| `Offer` present | yes, nested in `Product.offers` | PASS |
| `BreadcrumbList` present | yes, 3 `ListItem`s | PASS |
| **No `Course`** | `"Course"` appears **0 times** in the whole file | PASS |
| **No `EducationalOccupationalCredential`** | **0 times** | PASS |
| **No `recognizedBy`** | **0 times** | PASS |
| **No `Person` credited with a credential** | `"Person"` appears **0 times** | PASS |
| **`Offer.price` == on-page price** | `Offer.price` = `"89.00"`, `priceCurrency` `"AUD"`; page shows `$89.00` in the §1 capsule, FactGrid, §5 capsule and all three PriceCard rows, and `$89` in the hero proof and sticky bar | **PASS — hand-checked.** `guardrails.ts:523` keys on `Course.offers.price`, which does not exist here, so no machine confirmed this |
| Canonical / breadcrumb URL form | `https://www.abeeducation.edu.au/project-advisory`, no trailing slash, in canonical, `og:url`, `Offer.url`, `Product.@id` and breadcrumb position 3 | PASS |
| `<a>` to production origin | 0 (guardrail 7b, ran, passed) | PASS |

Two observations, neither a defect: `Product` carries no `image`, so it is not eligible for a Product
rich result (this is honest — there is no product image yet, see Defect 9); and breadcrumb position 1
is `https://www.abeeducation.edu.au/`, the one URL on the site whose trailing slash is the root itself.

## 8 · Voice and house style — measured occurrences

Counts over the rendered `<main>` text (1,117 words) unless stated.

| Rule | Count | Verdict |
|---|---|---|
| "comprehensive" | **0** (also 0 across the whole file) | PASS |
| "Enrol now" / "Enrol today" | **0** (`guardrails.ts` 7a ran, budget 0, passed) | PASS |
| "enrol" in any form, visible | **0** | PASS |
| "today" as a CTA | **0** | PASS |
| Bare "ABE" not followed by "Education", `<main>` | **0** | PASS |
| Bare "ABE", whole `<body>` | **1** — the `SiteHeader` logotype `<span class="wordmark">ABE…` | PASS (documented exception) |
| "ABE Education" in `<main>` | 3 | — |
| Em dash U+2014, whole file | **0** | PASS |
| En dash U+2013, `<main>` | **0** | PASS |
| "owner-builder" hyphenated in prose | **0** | PASS |
| "owner builder" open form | 6 | PASS |
| US spellings (13 patterns tested: color, center, organiz-, recogniz-, program, analyze, catalog, fulfill, customiz-, meters, favorite, behavior, license-as-noun) | **0 hits** | PASS |
| `[confirm:` markers | **0** (guardrail 7, ran) | PASS |
| Inline `style=` attributes attributable to the page | **0** — `project-advisory.astro` is absent from `INLINE_STYLE_BUDGET`, so its budget is 0 and the build passed | PASS |

## 9 · Links and anchors

**In-page anchors — all 9 distinct hash targets resolve to an element id.** But one resolves to
itself; see Defect 1.

**Same-origin routes in `<main>`:** exactly one — `/experts` → `dist/experts/index.html`, resolves.

**Same-origin routes elsewhere on the page (breadcrumb + site chrome), 25 distinct:** 17 resolve,
**8 are dead** — `/about`, `/contact`, `/faq`, `/saaustralia`, `/terms`, `/privacy`, `/cookies`,
`/cancellation-and-refund-policy`. All eight are `SiteFooter`/`SiteHeader` links present on every page
in the build; none is this page's. Not attributed to this run.

**The CTA's resolved destination, stated plainly.** The page has **four** call-to-action instances —
hero button, `WayfinderNav` button, `CtaBand` button, sticky `ctastrip` button — and **all four**
point at `#enrol`. The element carrying `id="enrol"` is *the hero button itself*:

```html
<a class="btn-primary" href="#enrol" id="enrol">See what is in the pack</a>
```

Measured in the browser: `document.getElementById('enrol') === heroButton` → **`true`**; target
offset-top **795px**, CTA offset-top **795px**. **Clicking any call to action on this page moves the
reader nowhere.** Full detail and the fix in Defect 1.

**Inbound internal links — the finding that matters more.** `02-gap.md` §C states the page's entire
traffic model: *"Internal, not search… `page-type-engine.md` prescribes `/project-advisory` as a
cross-link from all five owner-builder state pages and a downlink from the `/owner-builder-courses`
hub."* Measured, `href="/project-advisory"` inside `<main>`:

| Page | In-body links to `/project-advisory` |
|---|---|
| `/owner-builder-courses` (hub, 59.9k impressions) | **0** |
| `/qld-owner-builder-course` | **0** |
| `/wa-owner-builder-course` (34.7k impressions) | **0** |
| `/tas-owner-builder-course` | **0** |
| `/act-owner-builder-course` | **0** |
| `/owner-builder-nsw-course` | **0** |

The only inbound path is the `SiteHeader` megamenu entry (`src/data/nav.ts:83`), which every page
carries. Defect 3.

`check-links.mjs`: **no warning names this slug.** All three of its warnings name other pages
(`/cpd-building-tas`, `/white-card-wa`, `/cpd-tas`). `OK 1320 same-origin link(s) resolve`. The page
emits **no** LearnWorlds `/course/*`, `/program/*` or `/payment` path, which is exactly what
`01-source-map.md` §E set out to avoid.

## 10 · Stage 2 conformance — did the page stay off the "free/template" queries?

`02-gap.md` ruled: no keyword-stuffed H1, do not chase "free"/"template"/"download", judge the page on
internal conversion. Measured against the three surfaces that carry intent:

| Surface | Rendered | Assessment |
|---|---|---|
| **H1** | "The Project Advisory Pack." | Brand name only. Exactly Stage 2's stated primary. **No stuffing.** |
| **Title** | "Project Advisory Pack - Owner Builder Budget & Contract Tools $89" — **65 chars** | Brand-first, then two of Stage 2's permitted secondaries (budget, contracts). No "free", no "template", no "download". 65 chars is over `verification.md`'s "<= ~60" target — 3rd longest of 21 built pages (range 31–74). Minor, Defect 10 |
| **Meta description** | 182 chars | Contains "downloadable" once, as a format description, not as a query play. 7th longest of 21 (site range 146–232), so inside this repo's own band |

Token counts in `<main>`: "free" **9**, "template" **3**, "download" family **7**. Every "free" and
every "template" sits inside §3, the objection-handling section the brief mandated, which is section
3 of 6 and not the opening hook Stage 2 forbade. "Download" describes the delivery format.

**No cannibalisation:** "project advisory" appears in the title or H1 of **1** built page — this one.

**Verdict: Stage 2 was honoured on the page.** It was **not** honoured off the page — the internal
link graph the conversion model depends on does not exist (Defect 3).

## 11 · Repo checks — every warning naming this slug, quoted

| Command | Output naming `project-advisory` |
|---|---|
| `node scripts/check-claims.mjs --slug=project-advisory` | **No finding names this slug.** Verbatim: `(filtered to --slug project-advisory: 0 of 30 finding(s) shown; totals below are for the whole repo)` / `0 failing, 18 warning, 12 ok, 196 excluded`. Read this as thin coverage, not a clean bill: the page has no register-backed figures and no authority model for the check to bite on |
| `node scripts/check-links.mjs` | **No finding names this slug.** Its 3 warnings name `/cpd-building-tas`, `/white-card-wa`, `/cpd-tas`. `OK 1320 same-origin link(s) resolve (10 to explicitly planned page(s))` |
| `node scripts/check-pipeline.mjs --slug=project-advisory` | `FAIL project-advisory: missing artefact(s) — 07 (pre-deploy verification)` · `OK project-advisory: 6 section(s) match the plan` · `OK project-advisory: 6 capsule(s) match 04-content.md (figures normalised)`. **The FAIL is this file, and it is closed by this file existing** |
| `node scripts/check-reflow.mjs --slug=project-advisory` | `OK Measure: 0 prose element(s) over the CPL rule across 2 page/viewport combination(s)` · `OK Reflow: no page scrolls sideways at 375px or 1280px` · `0 failing, 0 warning, 2 ok` |
| `node scripts/system-health.mjs` | Only one line names the slug beyond the two OKs already quoted: `FAIL project-advisory: missing artefact(s) — 07 (pre-deploy verification)`. Repo totals `1 failing, 34 warning, 68 ok` — **that 1 failure is this artefact**. The 34 warnings are repo-wide (register staleness, repeat-risk rows); none names this page |
| `npm run build` | `ABE guardrails: 26 page(s) passed.` · `25 page(s) built in 2.00s` · postbuild: `Redirect targets: 15 distinct, 6 resolving, 9 pending` |

## 12 · Artefact completeness

`pipeline/project-advisory/` contents, measured:

| Artefact | Present | Bytes |
|---|---|---|
| `01-source-map.md` | yes | 7,256 |
| `02-gap.md` | yes | 5,462 |
| `03-briefs.md` | yes | 6,145 |
| `04-content.md` | yes | 8,024 |
| `05-components.md` | yes | 4,333 |
| `06-image-prompts.md` | yes | 4,305 |
| `07-verification.md` | **this file** | — |

01 through 06 were all present before this audit; 07 was the single missing artefact and the single
repo-wide FAIL. **Complete on this file landing.** Note `check-pipeline.mjs:234` also requires 07 to be
committed and no older than `src/pages/project-advisory.astro` — commit them together.

## 13 · Archetype: does §A's "none of the ten fits" hold, or was one dodged?

Re-checked independently against the two archetypes that could plausibly have been stretched to cover
this page, because that is where a dodge would be:

- **7, info guide.** §A rejects it on "not necessarily buy". That reasoning holds and is the right
  test: this page's decision order terminates in a purchase, its carrier set is `PriceCard` +
  `CanCant` + `FactGrid`, and §3 exists solely to defeat a price objection. An info guide with a
  `PriceCard` and four CTAs is not an info guide.
- **9, insurance type.** §A rejects it on the compulsory-question and the referral shape. Also holds,
  and the built page proves it: `/owner-builder-insurance` sends the reader **off-site to a broker**,
  where this page sells ABE Education's own good.

The one thing §A understates: the page it most resembles structurally is `/owner-builder-insurance`
(Recipe C, hand-built `.astro`, no `data-authority`, capsule + `CanCant` + `Note`, `#`-anchor CTA).
That is now **two** unarchetyped Recipe C pages in a fortnight, which is the second-occurrence
condition ROADMAP rule 3 turns on. §A's own recommendation — let a second page of the same shape prove
what the archetype needs — has now been met by this page. The `[skills]` item §A filed should be read
as trigger-met rather than trigger-pending.

**§A's reasoning holds. No archetype was dodged.**

---

## 14 · Mandated sub-skill audits

`check-pipeline.mjs:262` requires all three to be named and dispositioned. All three were run; the
scope of each is stated so a reader can tell measurement from assertion.

### `abe-readability-audit` — RUN, at the principles level, with measured values

**Not run:** the skill's own `audit_static.py` / `audit_render.py` / `contrast_check.py`. They ship
with the plugin skill, not this repo, and `verification.md` itself says to read them at the principles
level because they were written for a different token register. **Run instead:** their measurement
targets, directly in a real browser against `dist/` served over HTTP (never `file://`, per the
recorded false-FAIL trap), with contrast resolved by walking the computed-style ancestor chain rather
than reading the immediate parent.

| Target | Measured | Verdict |
|---|---|---|
| Measure, mobile 375px (30–45 CPL) | capsule **38**, body prose **41** | PASS |
| Measure, desktop 1280px (45–75, ideal 60–66) | 9 prose elements, range **60–73**, mean 68; capsules 71–73, body prose 62–63; **0 over 75** | PASS (capsules sit above the ideal band, inside the acceptable one) |
| Body size (16–18px, 16 floor) | body prose **17px**, capsule **18px** | PASS |
| "Meaningful text >= 12px" | **22 elements at 11px** — `.updated`, `.proof .l` (hero stat labels). Identical on `/white-card-tas` (smallest main font 11px), so **inherited from `Hero.astro`**, not introduced here | Inherited finding → `[design]` |
| Leading (1.4–1.6×) | capsule 27.9/18 = **1.55** PASS; body prose 28.05/17 = **1.65**, marginally over, and site-wide | Inherited finding → `[design]` |
| Single column, left-aligned | `text-align: start`, single column at 375px | PASS |
| Contrast (AA 4.5:1) | `.capsule` **11.88:1**, body `p` **8.43:1**, `.g-n` **8.86:1**, `.updated` / `.proof .l` / `.cta-note` **4.85:1** (all on `rgb(251,249,245)`); footer `.f-auth` white-at-62%-alpha on `rgb(26,26,26)` composites to ≈8.9:1 | PASS — lowest measured 4.85:1 |
| Off-black on off-white (ABE hard rule) | text colours in `<main>`: **0** instances of `rgb(0,0,0)`; ground `rgb(251,249,245)`, not `#fff` | PASS |
| Lists chunked to ~7 | three lists in `<main>`: **3, 4, 4** items | PASS |
| Primary CTA >= 44px tap target | `a.btn-primary` **229 × 54px**; sticky `a.btn-mini` **206 × 45px** | PASS |
| Other tap targets (AA 24px) | `WayfinderNav` items **30px** high (AA pass, under the 44–48 mobile ideal); inline `/experts` link **22px**; `SiteFooter` links **18px** (**under the 24px AA floor**). All three are shared components, all identical on `/white-card-tas` | Inherited finding → `[design]` |
| Reflow, no horizontal scroll | 320px: `documentElement.scrollWidth` **320** = `innerWidth` **320**, no page-level scroll (the wayfinder strip scrolls inside its own container, by design). 375px and 1280px: `check-reflow.mjs` OK | PASS |
| One H1, headings in order | `H1, H2, H2, H3, H3, H3, H2, …` | PASS |
| Answer-first | all 6 sections open on a capsule; 0 sections bury the answer | PASS |
| One primary CTA per view, repeated, sticky present | 4 instances across hero / wayfinder / closing band / sticky strip | Placement PASS; **destination fails — Defect 1** |

### `final-check` — RUN, all six checks

1. **Contradictions — 1 soft finding.** §1 says "It is not a course"; the hero proof block directly
   above it offers "31,000+ / students trained" and "2007 / training since" as the social proof for a
   non-training product. Not a contradiction (both statements are true and are about different
   subjects), but the proof block borrows a training record to sell a spreadsheet, four lines before
   the page says it is not training. No factual conflict in dates, names, prices or claims: `$89.00`
   is identical in all 7 occurrences; "56 pages" identical in all 3; "20%" identical in all 5.
2. **Duplicate / restated information — the strongest prose finding.** The three-component list is
   restated **six times** before §3: hero subhead, hero ticks (×3), §1 capsule, §1 FactGrid "Inside /
   3 tools", §2 capsule, §2 TopicGrid. Term frequency in 1,117 words: "written guide" **7**,
   "contracts calculator" **7**, "budget estimator" **6**, "yours to keep" **6**, "one payment" **6**,
   "progress claims" **5**. Repeated 4-grams with n>1: **45**, led by "and a written guide" (3),
   "efficiency contracts and scoping" (3), "files are yours to keep" (3). Defect 8.
3. **Logical flow — PASS.** The decision order (what → what is in it → why pay → who for → cost → who
   made it) is the order a buyer actually asks in, and each section's opening sentence follows from
   the previous section's close.
4. **Logical grouping — PASS.** Nothing sits in the wrong section. The "not part of your requirement"
   Note is in §4 where the brief put it, not scattered.
5. **Australian English — PASS.** 13 US-spelling patterns tested, **0 hits**. "licensed builder" is
   the correct AU verb form. "-ise" endings used throughout.
6. **AI-writing patterns — PASS.** See below.

### `ai-detector` — RUN

| Signal | Measured |
|---|---|
| 29 AI-tell terms tested (delve, robust, seamless, leverage, elevate, unlock, empower, crucial, vital, moreover, furthermore, additionally, "it is important to note", tapestry, testament, realm, embark, streamline, holistic, cutting-edge, game-chang, pivotal, underscore, multifaceted, plethora, myriad, landscape, "in today's", "ensure that") | **0 hits** |
| Sentence length | mean **18.0 words**, natural spread rather than uniform |
| Sentence openers used 2+ times | "it" 7, "the" 6, "this" 4, "no" 3, then a long tail of 2s — human distribution, no formulaic anaphora |
| Triadic "rule of three" padding | "not just" 2, "it is not" 3 — used as genuine contrast, not as rhythm filler |
| Verdict | **Reads as human-authored.** The §3 line *"That is a real line, not a sales one. If your build is small… there is no reason to spend $89 on this."* is the kind of against-interest sentence a generator does not produce unprompted |

---

## Real defects, ranked

### 1. Every call to action on the page is a no-op self-link — HIGH, fix before deploy
**Evidence.** `src/pages/project-advisory.astro:49` sets `cta = { href: '#enrol', … }`, and
`Hero.astro:55` hardcodes `id="enrol"` on its own primary anchor. Rendered:
`<a class="btn-primary" href="#enrol" id="enrol">See what is in the pack</a>`. Measured in the
browser: `getElementById('enrol') === heroButton` → **true**; both offset-tops **795px**. All four
CTA instances (hero, `WayfinderNav`, `CtaBand`, sticky `ctastrip`) carry the same href.
**Why no check caught it.** `guardrails.ts` check 6 only asks whether an id exists; `#enrol` does
exist. `check-links.mjs` reports the same. A self-referential anchor is invisible to both.
**Scope, stated honestly.** Inherited, not introduced: `/white-card-tas` and `/qld-owner-builder-course`
render byte-identical self-links. But `/owner-builder-insurance`, the nearest Recipe C precedent, has
`href="#arrange"` on a real section (`<section class="sec bg-warm" id="arrange">`), so the fix pattern
already exists in this repo and was used one page earlier.
**Fix.** One line: `href: '#cost'` (the `PriceCard` section) or `'#inside'`. Zero risk, no component
change, and it makes the label "See what is in the pack" true.
**Ship blocker:** not by the letter of `verification.md`'s hard-blocker list, and not fairly, given
every sibling page does the same. But this is a conversion page whose only job is the click, so it
should be fixed in this run rather than filed.

### 2. Three regulatory-shaped claims with no visible source and no Sources block — MEDIUM
**Evidence.** R1/R2/R3 in §2 above, quoted verbatim. `verification.md`'s hard-blocker list reads:
*"A government/legislative claim with **no visible source** on the page, or the **Consolidated
Sources** section missing."* `05-components.md` §2 deliberately shipped no Sources block, on the
correct reasoning that the page has zero government *facts*.
**Why it still matters.** §4's Note tells the reader three obligations exist and **does not link to a
single page where they are sourced**. `<main>` contains exactly one same-origin link, `/experts`.
**Fix, which also pays down Defect 3.** Link inside the Note: "your state's approved course" →
`/owner-builder-courses`, "your White Card" → `/white-card`. Both routes resolve in this build. The
claim then rests on pages that carry the citations, and the page gains the outbound cluster links it
currently lacks.
**Ship blocker:** no. Every one of these statements cuts against the sale, none is self-serving, and
none states a figure. Recorded because the checklist's literal wording is tripped and a future auditor
will trip it again.

### 3. The page's own traffic model is unbuilt — HIGH for the run, not for the HTML
**Evidence.** `02-gap.md` §C: *"Internal, not search… prescribes `/project-advisory` as a cross-link
from all five owner-builder state pages and a downlink from the `/owner-builder-courses` hub."*
Measured in-body `href="/project-advisory"`: hub **0**, QLD **0**, WA **0**, TAS **0**, ACT **0**,
NSW **0**. Sole inbound path is the megamenu entry at `src/data/nav.ts:83`.
**Why it matters more than usual here.** Stage 2 established that this page cannot and must not rank
(every seed ≤ 10/mo, every CPC $0, ten "free" variants), and then set its success measure as internal
click-through. Shipping it with no internal click-through path means the run ships a page it has
already predicted will get no traffic, by the only route it said would work — and `02-gap.md`'s
closing paragraph pre-authorises reading "0 clicks from search" as designed, which would mask it.
**Fix.** Add the cross-link to the five state pages and the hub. `src/content/**` and `src/data/**`
are both build-owned, so a build session may do this.
**Ship blocker:** no for `dist/`. Yes for calling the run complete.

### 4. Both §D assumptions render as settled fact, one of them in schema — MEDIUM, gate before advertising
**Evidence.** Six unhedged renderings quoted in full in §6 above: GST-free ×3, "56 pages" ×3 including
`Product.description` in the JSON-LD.
**Disposition, which is what §D asked for.** GST-free was reaffirmed on instruction and §D explicitly
says it is "not this session's call" — carried, not challenged. **"56 pages" is the row §D told Stage 7
to flag**, and it is hereby flagged: it is the only claim on this page a buyer can measure against what
they receive, it is stated three times without qualification, and its provenance is a legacy sales page
that may predate the current file. **Confirm the page count against the delivered guide before any paid
promotion of this URL.**
**Ship blocker:** no, per §D's own terms. Advertising blocker: yes, until confirmed.

### 5. An unsourced customer-behaviour claim — LOW/MEDIUM
**Evidence.** §1 body, rendered: *"Most people buy it once they have their approval and are about to
start pricing trades…"* The only sales data in `01-source-map.md` §C is "18 payments, A$1,602.00, to
23 Jul 2026" — a count with no timing dimension. Nothing in the ledger, the briefs or the content
notes supports a statement about *when* most buyers buy.
**Why it slipped.** It is a soft, plausible, non-regulatory sentence, which is exactly the class of
claim that has no check anywhere in this repo — and this page has no forbidden-claim scan either.
**Fix.** Recast as advice rather than observation: "It is most useful once you have your approval and
are about to start pricing trades", which says the same thing and asserts nothing about other buyers.
**Ship blocker:** no.

### 6. `#content-review` names an expert and links to the index, not his profile — LOW
**Evidence.** §6 names "Dominic Ogburn, a licensed NSW builder with more than 40 years in Australian
construction" and closes with *"…on the [experts page](/experts)"*. `dist/experts/dominic-ogburn/index.html`
exists and is not linked. `verification.md` §1c: *"An attribution without a real profile is worse than
none."* Here the profile is real and simply unlinked.
**Fix.** Point the anchor at `/experts/dominic-ogburn`, or add it alongside.
**Ship blocker:** no.

### 7. Three reader-visible figures are absent from a ledger declared closed — LOW
**Evidence.** "31,000+" (hero proof), "2007" (hero proof and §6 capsule), "more than 40 years" (§6
capsule). None appears in `01-source-map.md` §C, whose Ship decision says *"The ledger is closed."*
All three match existing site-wide usage verbatim (8 course pages, `src/pages/experts/index.astro:97`,
`SourcesFooter.astro`), so **no figure is wrong**.
**One wording note.** §6 renders *"ABE Education has trained owner builders since 2007"*, where the
site-wide claim is "31,000+ **students** since 2007" and the footer says "Training Australians since
2007". The page's version is narrower and weaker, so it is safe — but it is a third phrasing of a
claim the repo states two ways elsewhere.
**Fix.** Add the three brand facts to §C as internal rows, or note in §C that hero proof stats come
from the shared brand set.
**Ship blocker:** no.

### 8. The three-component list is restated six times before §3 — LOW, voice
**Evidence.** Restatement sites and term frequencies measured in §14 `final-check` item 2. A reader
gets the same list in the subhead, the ticks, the first capsule, a FactGrid cell, the second capsule
and then the TopicGrid, in roughly the same words, before reaching the section that actually argues
for the purchase.
**Why it is worth recording rather than ignoring.** `04-content.md`'s own cold reread ran an "anywhere
test" and a "delete test" per section, but neither test can see repetition *across* sections, and the
hero is not in `04-content.md` at all — so nothing in the pipeline compared the hero subhead against
the §1 capsule. They are near-paraphrases: *"Three downloadable tools for the money side of your
build…"* and *"Three downloadable tools for the money side of an owner builder project…"*.
**Fix.** Give the hero subhead a different job (the outcome) and let §1 carry the list.
**Ship blocker:** no.

### 9. `artefactDesc` contradicts `06-image-prompts.md`'s own refusal — LOW, but fix before the image is generated
**Evidence.** The page renders the placeholder description *"A laptop on a kitchen table **showing a
construction budget spreadsheet**, beside a folder of trade quotes."* `06-image-prompts.md` §"The
refusal" says the opposite in terms: *"Do not generate a screenshot of the actual spreadsheet"*, and
its prompt requires the laptop screen to be *"a soft glow rather than any readable interface"*, with
alt text *"A laptop and a folder of trade quotes on a kitchen table, an owner builder working through
the project budget."*
**Why it matters.** Whoever generates this asset next is most likely to read the on-page description,
not the artefact, and would produce exactly the fabricated-product depiction 06 was written to prevent.
**Fix.** Replace `artefactDesc` with 06's alt text.
**Ship blocker:** no. The slot renders as an FPO placeholder today (0 `<img>` elements in `<main>`),
so nothing false is currently displayed.

### 10. Title is 65 characters against a ~60 target — LOW
**Evidence.** `Project Advisory Pack - Owner Builder Budget & Contract Tools $89` = 65 chars.
`verification.md` §1a: *"title <= ~60 chars"*. Third longest of 21 built pages (site range 31–74,
median ~53). Meta description 182 chars is inside this repo's band (7th of 21, range 146–232).
**Fix.** Drop "Contract" or the "$89": "Project Advisory Pack - Owner Builder Budget & Contract Tools"
is 61.
**Ship blocker:** no.

### Inherited and site-wide, measured here, not this run's to fix
Recorded so they are not re-attributed to this page by the next auditor. Each was confirmed identical
on at least one other built page.
- **11px type on 22 elements** (`.updated`, `.proof .l`) against the ">= 12px meaningful text" row.
  `Hero.astro`. Identical on `/white-card-tas`. → `[design]`
- **`SiteFooter` links at 18px tall**, under the 24px WCAG AA tap-target floor; `WayfinderNav` items
  at 30px, above AA but under the 44–48px mobile ideal. → `[design]`
- **Body prose leading 1.65**, marginally over the 1.4–1.6 target. Global CSS. → `[design]`
- **8 dead site-chrome routes** (`/about`, `/contact`, `/faq`, `/saaustralia`, `/terms`, `/privacy`,
  `/cookies`, `/cancellation-and-refund-policy`) on every page in the build. → `[build]`, later waves
- **`SourcesFooter` renders "Course publisher: ABE Education. Enrolment: processed directly by ABE
  Education."** on a page that states it is not a course. Shared component, design-owned; the page's
  own `disclaimersHtml` immediately below corrects it. → `[design]`

---

## Ship decision

**AMBER — ship-able, with four one-line fixes recommended first and one advertising gate.**

**What is genuinely sound, having tried to break it.** The hard rule holds with zero breaches and five
active defences, and it is defended in the strongest possible position (a FactGrid cell reading
"Required? / No"). The schema is exactly right and hand-verified: `Product` + `Offer` +
`BreadcrumbList`, zero occurrences of `Course`, `EducationalOccupationalCredential`, `recognizedBy` or
`Person` anywhere in the file, and `Offer.price` `"89.00"` matching seven on-page renderings of
`$89.00` — the price parity no machine checked on this page. All six capsules measure 47–50 words
against a 40–60 band, and each answers the grammatical shape its own H2 asks. House style is clean on
every rule tested: 0 "comprehensive", 0 banned CTAs, 0 em dashes, 0 US spellings, 0 bare "ABE" outside
the logotype, 0 inline styles. Readability passes every measured target the audit could apply, with
the lowest contrast on the page at 4.85:1 and mobile measure at 38–41 CPL. The copy is human, and §3
tells a reader not to buy.

**What is wrong, in order.** The page's four calls to action all resolve to the hero button itself, so
clicking any of them does nothing — inherited from a site-wide pattern, but solved one page earlier on
`/owner-builder-insurance`, and fatal to the one thing this page exists to do. Its stated traffic
model — internal cross-links from five state pages and the hub — is entirely unbuilt, zero in-body
links from any of the six. Three regulatory-shaped sentences carry no visible source and the page
links to none of the pages that hold one. And one sentence asserts a customer-behaviour pattern the
ledger cannot support.

**Recommended before deploy, all one-liners, none touching a component:**
1. `cta.href` → `'#cost'` (Defect 1)
2. Link the §4 Note's "state's approved course" and "White Card" to `/owner-builder-courses` and
   `/white-card` (Defects 2 and 3, partly)
3. Recast "Most people buy it once they have their approval…" as advice (Defect 5)
4. `/experts` → `/experts/dominic-ogburn` (Defect 6)

**Before this run is called complete:** add the `/project-advisory` cross-link to the five owner
builder state pages and the `/owner-builder-courses` hub (Defect 3).

**Before this URL is advertised or promoted:** confirm the "56 pages" figure against the delivered
guide (Defect 4, closing the gate `01-source-map.md` §D asked Stage 7 to set).

**Stage 8 remains human-triggered.** Nothing in this audit is a go.

## Demand list
Tag every item: [skills] | [design] | [facts] | [build]
- [build] `project-advisory.astro:49` — `cta.href = '#enrol'` resolves to `Hero.astro`'s own anchor, so all four CTAs are no-ops. Measured: `getElementById('enrol') === heroButton` true, both at offset-top 795px. Fix to `'#cost'`; `/owner-builder-insurance` already uses this pattern with `#arrange`
- [build] `qld/wa/tas/act/nsw-owner-builder-course.mdx` and `owner-builder-courses` carry **0** in-body links to `/project-advisory`, so `02-gap.md` §C's entire internal-traffic model is unbuilt. Add the cross-link the page-type engine prescribes
- [build] `project-advisory.astro:190` — the §4 Note asserts three regulatory obligations and links to none of the pages that source them. Link "state's approved course" → `/owner-builder-courses`, "White Card" → `/white-card`
- [build] `project-advisory.astro:157` — "Most people buy it once they have their approval" is a customer-behaviour claim with no support in `01-source-map.md` §C (which holds a payment count, not timing). Recast as advice
- [build] `project-advisory.astro:201` — names Dominic Ogburn, links to `/experts` rather than the existing `/experts/dominic-ogburn`
- [build] `project-advisory.astro:149` — `artefactDesc` says the laptop is "showing a construction budget spreadsheet", which `06-image-prompts.md` explicitly forbids; use 06's alt text so the next generator does not build the image 06 refused
- [build] `project-advisory.astro:124` — title is 65 chars against `verification.md`'s ~60 target
- [skills] `guardrails.ts:551` check 6 passes an anchor whose only matching id is the link itself. A self-referential CTA is invisible to it and to `check-links.mjs`; the pattern ships on at least three built pages. Fail (or warn) when `href="#x"` and `id="x"` are the same element
- [skills] `01-source-map.md` §C declared the ledger closed while the hero rendered "31,000+" and "2007" and §6 rendered "more than 40 years", none of which are ledger rows. Either Stage 1 must carry shared brand facts, or the closure wording must exclude them
- [skills] SECOND SIGHTING — a Recipe C page with no `data-authority` and no archetype. `/owner-builder-insurance` was the first; `/project-advisory` is the second, in a fortnight. `01-source-map.md` §A filed this as trigger-pending; the trigger is now met (ROADMAP rule 3)
- [skills] Nothing in the pipeline compares the hero against `04-content.md` — the hero is not in `04-content.md` at all, so the hero subhead and the §1 capsule shipped as near-paraphrases and no check or cold reread could see it
- [design] `Hero.astro` renders `.updated` and `.proof .l` at **11px** (22 elements on this page), under the ">= 12px meaningful text" row. Identical on `/white-card-tas`
- [design] `SiteFooter` links measure **18px** tall at 375px, under the 24px WCAG AA tap-target floor; `WayfinderNav` items measure 30px, above AA but under the 44–48px mobile ideal
- [design] `SourcesFooter` renders "Course publisher" and "Enrolment: processed directly by ABE Education" on `/project-advisory`, a page whose own copy states it is not a course
- [facts] `01-source-map.md` §D item 2 — the "56 pages" figure is stated three times on the page including in `Product.description`, and is the only claim a buyer can measure against what they receive. Confirm against the delivered guide before this URL is advertised
- [facts] `01-source-map.md` §D item 1 — GST-free renders unhedged three times. Carried on instruction, recorded here so the tax position has a filing home if it is ever revisited

---

## Re-verification · 10 August 2026 — four findings fixed, two escalated

Written by the build session that received the audit above, immediately after it. Re-measured from
a fresh `dist/`, not inferred from the edits.

### Fixed

| Finding | Before | After |
|---|---|---|
| **Every CTA a no-op self-link** | `cta.href = '#enrol'`, and `Hero.astro:55` hardcodes `id="enrol"` on its own anchor, so all four CTAs resolved to the hero button | `#inside`, the section the CTA label promises ("See what is in the pack"). Rendered `class="btn-primary" href="#inside"`, and `id="inside"` exists once |
| Unsourced customer-behaviour claim | "Most people buy it once they have their approval" | "It is most useful once you have your approval" — a judgement the page can make, not a statistic it cannot support. **0** occurrences of the old wording |
| `/experts` where a profile exists | `href="/experts"` | `href="/experts/dominic-ogburn"`, the person the sentence names |
| `artefactDesc` contradicted `06-image-prompts.md` | "showing a construction budget spreadsheet" — the exact depiction 06 refuses, because generating a fake of a real deliverable is a different class of problem from an illustrative photo | "angled away… screen not legible", matching the prompt |

**The CTA fix is the one worth reading twice.** No check in this repo could catch it:
`guardrails.ts` check 6 and `check-links.mjs` both ask only whether the anchor id *exists*, and it
did — `Hero.astro` was creating the very id the CTA pointed at. ~~`/white-card-tas` and
`/qld-owner-builder-course` still carry the identical no-op and are filed `[build]`.~~ **Both fixed
11 Aug 2026**, repointed to each page's own `#cost` section — 5 dead CTAs on TAS, 4 on QLD, now 0
resolving to `#enrol` on either. Verified in a live browser by measuring the distance each CTA
travels to its resolved target rather than by reading the markup. Stage 7 re-verification appended
to both pages' `07-verification.md` in the same commit as the fix.

### Escalated, not fixed

**1. The cross-links this page's traffic model depends on cannot all be built from here.**
`02-gap.md` §C argues the page converts warm internal traffic rather than ranking, and the audit
measured **0** in-body links to `/project-advisory` from the hub or any state page. Correct, and
partly out of reach: `src/content/hubs/owner-builder-courses.mdx` has an **empty body** and is
rendered entirely from frontmatter, and the `hubs` schema in `content.config.ts` has no field for a
cross-link or free body content. Adding one means editing skills-owned `content.config.ts` or
design-owned `HubLayout.astro`. **The four live state pages are build-owned MDX and can take the
link; the 59.9k-impression hub cannot, from this session type.** Filed for both.

**2. The two §D assumptions still render as settled fact** — GST-free ×3, "56 pages" ×3 including
`Product.description`. Deliberate: Andrey instructed GST-free explicitly and reaffirmed after the
basis was questioned, and the component list comes from ABE Education's own live sales page for a
product with 18 completed payments, which is the best available source. **The gate §D asked for
stands: confirm the page count before this URL is advertised.** Over-hedging a vendor's own figure
would be its own inaccuracy.

### Measured after

| Check | Value |
|---|---|
| `guardrails` | **26 pages passed** |
| CTA resolved destination | `#inside` (was: itself) |
| `check-pipeline --slug=project-advisory` | 0 failing, all 7 artefacts present |
| Capsule word counts | unchanged, 47/49/50/47/48/48, all in band |

### Ship decision, restated

**Ship-able, with one advertising gate.** The hard rule holds with five active defences and zero
breaches, the schema is exact, and the CTA now goes somewhere. Do not advertise the URL until the
"56 pages" figure is confirmed and at least the four state-page cross-links are wired, or the page
is a conversion page with nothing converting into it.
