# 07 — Pre-deploy verification — `white-card-nsw`

Run 1 August 2026. Measured against `dist/white-card-nsw/index.html` served locally and read in a
browser, not against intent. Every row carries a measured value.

**⚠ Self-verified, not independently verified.** The skill requires Stage 7 to run as a fresh subagent
whose only inputs are the built HTML, `05-components.md` and the checklist. This session operates
under a standing instruction not to launch subagents unless the user asks, so the author of the copy
audited the copy. That is the exact bias Stage 7 exists to remove, and on the `cpd-building-tas` run a
self-audit ticked five rows the built HTML failed. **Treat these results as weaker evidence** and run
an independent pass before this page is considered verified.

---

## 1. Structure and schema — measured from `dist/`

| Check | Measured value | Verdict |
|---|---|---|
| H1 count | 1 — "White Card NSW." | PASS |
| H1 carries primary keyword | `white card nsw` verbatim | PASS |
| H2 count | 12 (10 section H2s + PartnerDisclosure "Upskill Institute Pty Ltd" + CTA band) | PASS |
| JSON-LD blocks | 1, server-rendered, single `@graph` | PASS |
| Graph nodes | `Course`, `EducationalOccupationalCredential`, `BreadcrumbList`, `Person` | PASS |
| **Person count** | **1 — Warwick Smith** | PASS (asqa-accredited requires exactly 1) |
| No Person titled "developer" | none | PASS |
| `Course.creator` | `Upskill Institute` (Organization) | PASS |
| `credential.recognizedBy` | `Upskill Institute` | PASS |
| `Course.offers.price` | `129` | PASS |
| `priceNumber` = `price` = schema price | `129` = `$129` = `129` | PASS |
| Breadcrumb items | `Home -> https://www.abeeducation.edu.au/`, `White Card NSW -> https://www.abeeducation.edu.au/white-card-nsw` | PASS — the unbuilt `/white-card` crumb is correctly absent |
| Canonical | `https://www.abeeducation.edu.au/white-card-nsw`, no trailing slash | PASS |
| Marker sequence | 01 to 08, in order | PASS |
| Image alt >= 80 chars | hero alt 117; ZSection alt 124 | PASS |
| Unresolved `[confirm:]` markers | 0 | PASS |
| Inline styles / structural classes in MDX body | 0 (only `.measure`, `.btn-link`) | PASS |

## 2. Answer capsules — measured word counts and opening shape

| # | Section | Words | Heading type | Opens with | Verdict |
|---|---|---|---|---|---|
| 1 | at a glance | 45 | What | "You pay ABE Education $129…" | PASS |
| 2 | `#real` | 50 | Is | "Yes." | PASS |
| 3 | `#online` | 55 | Can | "Yes, entirely online…" | PASS |
| 4 | `#accepted` | 46 | Where | "On construction sites anywhere in Australia." | PASS |
| 5 | `#your-card` | 48 | What/When | "You get a Statement of Attainment…" | PASS |
| 6 | `#cost` | 42 | What does it cost | "$129, and that is the whole cost." | PASS |
| 7 | TrustBand `onDark` | 18 | — | trust lede, not a section capsule | N/A |
| 8 | `#how-it-works` | 48 | How | "One booked day with a live trainer…" | PASS |
| 9 | `#content-review` | 57 | Who | "The course is developed, owned and delivered by Upskill Institute…" | PASS |
| — | `#faq` | none | — | documented exception | PASS |

All eight section capsules land inside 40 to 60 words. No yes/no opener under a
what/how/who/when/where heading.

## 3. Section conformance against `05-components.md`

Every `id` in the plan appears in `dist/`, and every section in `dist/` appears in the plan.

`real` · `online` · `accepted` · `your-card` · `cost` · `how-it-works` · `content-review` · `faq` —
**8 of 8 present, in plan order.** Unmarked furniture present as planned: at-a-glance opener,
TrustBand, `#rto-partner` PartnerDisclosure (`after-body`). **0 briefed sections lost.**

## 4. Authority language

| Check | Measured | Verdict |
|---|---|---|
| ABE claimed as RTO | 0 occurrences; "is not a registered training organisation" present in `#real`, TrustBand attestation and disclaimers | PASS |
| RTO partner named with number | `Upskill Institute`, `RTO 45708`, in the first sentence of `#real` | PASS |
| "nationally recognised" used | accurate for asqa-accredited | PASS |
| "Statement of Attainment" | correct credential name | PASS |
| "SafeWork NSW-approved course" | 0 occurrences | PASS |
| **Self-paced claimed for NSW** | 3 occurrences of "self-paced", **all negations or references to WA/TAS**: the WA/TAS permission sentence, the quoted SafeWork NSW prohibition, and a CanCant "cannot" item | PASS |
| ASQA disclosure locations | disclaimers block carries the denial sentence "ABE Education does not deliver training, conduct assessments, or issue qualifications" | PASS — and closes a gap `/white-card-wa` and `/white-card-tas` still carry |
| Mandatory ASQA FAQ trio | present, first three items | PASS |

## 5. Citation gate

Every government claim carries a `VerifiedSources` block dated 1 Aug 2026, and the page-foot sources
list holds five entries, all primary or issuing-authority:

training.gov.au (RTO 45708) · SafeWork NSW register (RTO800520) · SafeWork NSW white cards ·
SafeWork NSW general conditions for RTOs · Service NSW card application.

**No unsourced government claim.** The two UNVERIFIED facts from `01-source-map.md` (the SafeWork NSW
card fee amount, and any regulatory minimum duration) appear **nowhere on the page** — measured: 0
occurrences of a fee figure, 0 occurrences of a stated regulatory minimum.

## 6. Cannibalisation and indexation

| Check | Measured | Verdict |
|---|---|---|
| Primary keyword targeted elsewhere on site | `white card nsw` targeted by no other page | PASS |
| Sideways links to competing spokes | **In `<main>`: 0.** In the full document: **2 each** to `/white-card-wa` and `/white-card-tas`, from the header megamenu | PASS on the rule (it governs editorial cross-linking, not site chrome) |
| Links to the on-hold NSW OB page | **In `<main>`: 0.** In the full document: **2** to `/owner-builder-nsw-course`, from site chrome | PASS for this page, but see the sitewide finding below |

> **These two rows were wrong when first written, and the correction is the point.** They originally
> read "0 links" flat, measured over `<main>` but reported as a property of the page. An independent
> Stage-9 grader caught it. The judgement did not change; the measurement was overstated in the
> reassuring direction, which is the failure mode a self-audit is most prone to.
>
> **Sitewide finding surfaced by that correction, and it is more serious than anything on this page.**
> `/owner-builder-nsw-course` is linked twice from every page and four times from
> `/owner-builder-courses`, and it renders **`<meta name="robots" content="index,follow">`**.
> CLAUDE.md and ROADMAP both state that page and its `-w` variant are "pre-cutover and **noindexed**".
> Only the `-w` variant is: `astro.config.mjs:8` reads
> `NOINDEX = ['/owner-builder-nsw-course-w', '/cpd-building-tas']`. Today the page is shielded only by
> the host-level `X-Robots-Tag` on `workers.dev`. At cutover, when `workers_dev: false`, an ⛔ on-hold
> page carrying a nationally-recognised claim ABE cannot support (partnership unsigned, units not on
> RTO 45708's scope) becomes indexable and internally linked from every page on the site. Documentation
> drifting from code is this repo's most-recorded repeat risk, at ten sightings. Routed to `skills`,
> and it belongs on the Wave 6 pre-launch gate list.
| LearnWorlds paths emitted same-origin | **0** (`/course/*`, `/program/*`, `/payment` all absent) | PASS — better than `/white-card-wa` and `/cpd-building-tas`, which each emit one |
| Orphan check | linked from SiteHeader White Card group | PASS |

## 7. Every WARN naming this slug

Zero failing is not zero findings. All four checks re-read for `white-card-nsw`:

| Source | Finding |
|---|---|
| `check-claims` | **1 WARN** — "Total not reconciled … need exactly one course-fee row and one government-fee row present in `kb/register/`, plus an `isTotal` row (found 1 price, 0 government, 1 total). Skipped rather than guessed." **Assessed as a false positive for this page:** the price is all-inclusive by design, so there is no separate government-fee row to find. The reconciler assumes a government fee is always billed separately. Recorded on the demand list for `skills`; no page change. |
| `check-claims` (resolved in-run) | A card-fee WARN fired against a **frontmatter comment** explaining why the figure is barred. The comment was rewritten to carry no numeral. This is `kb/mistakes-log.md`'s pattern "a figure quoted inside a comment was scanned as a live page figure", **third sighting**, and this run walked into it. |
| `check-links` | 3 WARNs, **none naming this slug** (all are pre-existing LearnWorlds paths on `/cpd-building-tas`, `/white-card-wa`, `/cpd-tas`). 919 same-origin links resolve. |
| `check-assets` | 0 failing, 0 warning. 16 references resolve to tracked assets. |
| `system-health` | Pre-flight 0 FAIL / 13 WARN, none naming this slug (the slug did not exist at pre-flight). **Re-run before merge.** |
| `abe-guardrails` | 21 pages passed, 0 hard-blockers. |

## 8. The three mandated skill audits

All three run 1 Aug 2026. Full readability report:
`skill-reviews/2026-08-01-abe-readability-audit-white-card-nsw.md`.

| Audit | Disposition |
|---|---|
| `abe-readability-audit` | **RUN — Amber.** 14 dimensions scored against measured values at three asserted viewports (1417px, 375px, 320px). **10 Pass, 2 Flag, 2 Fail.** Both Fails are component-level and sitewide, not page content: `.mlabel` renders **10px** in the header megamenu against a 12px floor, and one primary CTA variant renders **43px** against the 44px tap-target rule. Flags: body leading **1.65** against a 1.4-1.6 target, and a **15px** reviewer link in the breadcrumb bar, under the WCAG 2.5.8 AA 24px minimum. Key passes, measured: body **17px**, contrast **8.43:1** and **8.06:1**, measure **56 / 38 / 31 CPL**, **zero horizontal overflow at 320px**, sticky CTA present and working (64px bar, 45x125px button), longest list 6 items. **No page-content fix required.** Four items routed to `design`. |
| `final-check` | **RUN — 6/6 PASS.** *Contradictions:* price ($129 across hero, glance, capsule and PriceCard total), schedule (Mon-Sat 9-4 plus Tue 4-11, in hero tick, `#how-it-works` and FAQ), duration (7 hrs / "about seven hours") and the 60/30 day card timeline all cross-checked between sections and consistent. *Duplication:* one **Flag**, not a fail — "Upskill Institute lodges your card application for you" appears four times (capsule, body, Stepper step 5, FAQ); three are the deliberate scannable-summary and FAQ-repeat patterns used site-wide, so it stands. *Flow:* follows archetype 02's decision order exactly, including `#accepted` at position 3. *Grouping:* coherent; the two-year lapse rule sits with acceptance, where the reader meets the question. *Australian English:* **0** americanisms across 11 patterns (`organiz`, `color`, `center`, `defense`, `license`, `recognize`, `enroll`, `specialize` and others) over 3,421 words. *AI writing:* **0 hits** across 29 patterns (`delve`, `leverage`, `robust`, `comprehensive`, `navigate the complexities`, `it is worth noting`, `unlock`, `at the heart of` and the rest); average sentence **19.1 words**. Also re-confirmed: 16 em dashes, **all** in `<a>` source labels, **0** in body prose; 1 bare "ABE", in `span.wordmark`, the documented logotype exception. |
| `ai-detector` | **NOT REQUIRED for this artefact type, and that is the disposition rather than a skip.** The skill's own trigger is content "where human-written content is required (like CBOS regulatory submissions, academic work, professional reports)". This is a marketing landing page, not a submission to a regulator. Its substantive check, AI writing-pattern detection, is `final-check`'s check 6, which ran above and returned 0 hits over 29 patterns. Re-running it would measure the same text against the same patterns. **If this page is ever repurposed into regulator-facing material, run it.** |

**Skipping is allowed; skipping silently is not.** All three are dispositioned rather than ticked, and
the two that ran carry measured values rather than ticks.

### What the audits did NOT cover

Both audits that ran were **self-run by the author of the copy**. `final-check`'s mechanical halves
(Australian English, AI patterns, em dashes, sentence length) are immune to that bias because they are
regex over the built HTML. Its judgement halves (contradictions, duplication, flow, grouping) are not:
they are the same reading, by the same author, that produced the Stage 4 cold reread. An independent
pass could still find what neither found.

## 9. Artefact completeness

`pipeline/white-card-nsw/` holds **01, 02, 03, 04, 05, 06, 07** — 7 of 7. No stage without an artefact.

---

## Findings that are not page defects

1. **`.cta-note` promises a payment method this page cannot accept.** The rendered CTA carries
   "Pay by card or 4 interest-free payments with Afterpay" while every CTA on the page is the
   in-page `#enrol` anchor and no checkout exists. It comes from the layout, not from this page's
   content, which means **`/white-card-tas` is live with the same promise**. Found by looking at a
   screenshot; no automated gate checks it. Routed to `design`.
2. **The nav link crossed a session boundary.** `src/components/SiteHeader.astro` belongs to a
   `design` session; the orphan check cannot be satisfied from inside a build session while
   `/white-card` does not exist. Andrey authorised the crossing explicitly on 1 Aug 2026. The edit
   restored the `href` on the existing NSW row and dropped its `soon` flag, which is what that file's
   own TODO comment instructs, and corrected the comment's now-false claim that none of the five
   slugs has a page.
3. **Archetype 02 contradicts itself and the code.** §5 specifies `Person` ×2 and frontmatter keys
   `rtoPartner` / `rtoNumber` / `unitCode`; §3 and `guardrails.ts` require ×1 for asqa-accredited, and
   the live schema key is `partnerRto`. Followed the code. Routed to `skills`.

## Publish hard-blockers

### ✅ BLOCKER 1 — RAISED AND CLEARED, 1 Aug 2026

**Cleared by Andrey the same night: trainer-led connected delivery IS permitted for GIT in NSW, and
the October 2022 Specific Conditions PDF is outdated.** The page ships with its delivery claim intact.

**What the residual risk is, stated plainly rather than buried.** The clearance rests on Andrey's
confirmation plus two supporting public facts: SafeWork NSW's live general conditions define connected
delivery and permit it where the Specific Conditions provide for it, and Upskill (RTO800520) is a
SafeWork-registered GIT provider delivering by video today. **A current Specific Conditions document
was not located publicly** — the only version findable on safework.nsw.gov.au is the superseded
October 2022 one, still linked from the site. So the page's central claim is not, today, traceable to
a public primary source the way every other government fact on it is.

**Route to a `facts` session:** obtain the current Specific Conditions for GIT from SafeWork NSW
(13 10 50 / `tacs@safework.nsw.gov.au`) and record it, so the next run does not rediscover the
October 2022 document and re-raise this blocker. `kb/register/online-delivery-policy-by-state.md`
should carry the correction and its source.

The original finding is kept below, unedited, because it is the evidence a future reader needs if the
question is ever reopened.

---

### Follow-up, 1 Aug 2026 — the attestation was narrowed, and what remains

The independent Stage-9 grader found that the `#online` `VerifiedSources` badge attested more than
its source supports. Measured before: `facts` read "The prohibition on self-paced learning within
connected delivery, **and the acceptance of live video as face to face**, quoted from the regulator's
conditions". The second clause is not quoted from those conditions, which permit connected delivery
only "if provided for in the relevant Specific Conditions".

**Narrowed on Andrey's instruction.** The badge now attests only the definition of connected delivery
and the prohibition within it, both genuinely quoted. Measured in `dist` after the change: the string
"acceptance of live video" returns **0 occurrences** in `#online`; the reader-facing body copy is
**unchanged**.

**Then closed properly, 1 Aug 2026, by re-attribution.** Narrowing the badge removed the
*verification claim* over that fact but not the *attribution* of it: the body still read "SafeWork
NSW accepts live video delivery as face to face". On Andrey's instruction the alternative route was
taken — attribute the acceptance to the delivering RTO, which is verifiable, rather than to the
regulator, which is not.

| Where | Now reads |
|---|---|
| `#online` body | "…the training has to happen with a live trainer, and SafeWork NSW sets a hard limit on what that delivery can contain" + a new paragraph: "Upskill Institute is registered with SafeWork NSW to deliver general construction induction training, registration RTO800520, and it runs this course as a live trainer-led session under that registration." |
| FAQ, "Why can I not do a self-paced White Card in NSW" | Quotes the prohibition, then: "Upskill Institute delivers this one as a live session under its SafeWork NSW registration, RTO800520." |

Measured in `dist` after the change: "accepts live video" returns **0 occurrences**; `RTO800520`
**present**. Every remaining SafeWork NSW attribution on the page is a verified quote from its general
conditions, and the acceptance now rests on the RTO's registration, which was read on the SafeWork
NSW register in this session (S9).

**Correction to this file's earlier claim.** It previously listed
`hasCourseInstance.courseMode: "online"` as part of the same problem. It is not. That property
describes how the course is delivered, and it genuinely is delivered online; it attributes nothing to
the regulator. The over-flag is recorded rather than deleted.

**Still worth doing:** the current Specific Conditions remain the top item on
`reports/handover-facts.md`. The page no longer depends on them, but the register row does.

### The finding as raised

**Do not ship this page.** Found at 02:15 on 1 Aug 2026, after the build was green, when Andrey
supplied the SafeWork NSW *Conditions for Registered Training Organisations Delivering General
Construction Induction Training in NSW* (October 2022), now at
`new site/reference/conditions-for-RTOs-delivering-general-construction-induction-training-oct-2022.pdf`.

Page 5, condition (q):

> "Ensure all training delivered in NSW is delivered by a nominated trainer using **face-to-face
> delivery techniques. Distance education and on-line learning are not permitted in NSW for the
> delivery of GIT.**"

The page currently claims the opposite, in its H1-adjacent hero, its `#online` section, its CanCant,
its FAQ and its `glance` grid: that the course runs entirely online by live video, and that SafeWork
NSW accepts live video as face to face.

**Where that claim came from, and why it is not enough.** SafeWork NSW's *general* conditions page
(read live, 1 Aug 2026) defines "connected delivery" as live video conferencing and permits it
**"if provided for in the relevant Specific Conditions"**. This PDF *is* the Specific Conditions for
GIT, and it does not provide for it. It prohibits online learning by name. The general page's
permission is conditional, and the condition is not met.

**Currency is unresolved, and that is the whole question.**

| Evidence | Points to |
|---|---|
| Specific Conditions PDF, October 2022, framed under the WHS Regulation **2017** | online **not** permitted |
| SafeWork NSW's own site still links this October 2022 PDF as the current conditions document | online **not** permitted |
| The SafeWork NSW register disclaimer cites the WHS Regulation **2025**, so a newer instrument exists | the 2022 conditions **may** be superseded |
| Upskill Institute, a SafeWork NSW-registered GIT provider (RTO800520), publicly sells NSW White Card as "up to 7 hours of trainer led delivery (via Zoom)" | online **is** being delivered in practice |

`kb/mistakes-log.md` M1 applies directly: treat "newer taught as current" and "superseded taught as
current" as equal blockers. I cannot establish which instrument is in force from public sources, and
**a plausible answer is worse than a visible gap** on a claim this page is built around.

**To clear it, one of these:**
1. SafeWork NSW confirms in writing that connected/virtual delivery is permitted for GIT and supplies
   the current Specific Conditions (13 10 50, or `tacs@safework.nsw.gov.au`); **or**
2. Upskill Institute supplies the SafeWork NSW approval or variation under which it delivers by Zoom.

**If online delivery turns out not to be permitted**, this is not a copy fix. The product itself is
wrong, `#online` and the CanCant invert, the hero and `glance` change, and the page becomes an
in-person or blended course, or it is not built at all. That is the NSW Owner Builder failure pattern
repeating: a partner offering that the regulator's own documents do not support.

### Facts this document DID close

Both were UNVERIFIED at Stage 1 and are now verified at a primary source:

| Fact | Value | Source |
|---|---|---|
| **Minimum duration** | **Not less than six hours, excluding breaks** and administrative activities such as registration or EOI checks (condition 14); breaks are additional (condition 16) | Specific Conditions, p.10 |
| Maximum class size | **20 participants** in any one session (condition 5) | Specific Conditions, p.8 |
| Minimum age | 14 or over (condition 6) | Specific Conditions, p.8 |
| Statement of Training | SafeWork NSW SOT issued to each successful participant, from RTO-held stock | Specific Conditions, p.10 |

The six-hour minimum was the register's unverified claim and it is **correct**, with a precision the
register lacked: six hours **excluding** breaks. Upskill's "up to 7 hours including breaks" is
consistent with it. Route to a `facts` session for `kb/register/`. The 20-participant cap is strong,
unused page material if the page survives blocker 1.

### ✅ BLOCKER 2 — RAISED AND CLEARED, 1 Aug 2026, with a copy correction

**As raised:** `#cost` claimed competitors' headline prices "often exclude the government card fee",
while SafeWork NSW's 2026-27 licensing schedule publishes **only replacement** card fees and **no fee
for a new card**.

**Resolved by Andrey, 1 Aug 2026:** a government fee for the new card does exist, but **the RTO pays
it, not the student**, and it is inside the course price.

That makes the sentence as drafted **wrong**, not merely unsupported: if the RTO always pays the fee,
then every competitor's headline price includes it too, so there was no exclusion to compare against.
It was ABE Education claiming a distinction that does not exist, which is the failure mode this
pipeline's "say the unhelpful thing" rule is meant to prevent, inverted.

**Corrected in the page**, not just noted:

| Element | Before | After |
|---|---|---|
| `#cost` capsule | "…Compare that against headline prices elsewhere, which often exclude the government card fee." | "…the government card fee, which Upskill Institute pays to SafeWork NSW on your behalf rather than charging you for it separately." (45 words) |
| `#cost` body ¶1 | "Two things are commonly quoted separately in this market and then added at checkout…" | "The government fee for issuing your card is real, but you never handle it…" |
| `#cost` body ¶2 | "Ask what the price covers and whether the card fee is on top…" | replaced with the replacement-card caveat |
| `priceRows` row 2 sub | "Included in the course price, not charged separately" | "Paid by Upskill Institute to SafeWork NSW on your behalf, inside the $129" |

**Still open, routed to `facts`:** the new-card fee **amount** remains unverified against any
`.gov.au` source and stays off the page, which is now harmless since no page sentence depends on it.
Two figures **were** verified at source in this session and belong in `kb/register/`, but a build
session cannot write them: SafeWork NSW replacement white card **$43**, or **$36** applied online,
2026-27 schedule, read 1 Aug 2026 at
`safework.nsw.gov.au/resource-library/licence-and-registrations/licensing-fees`.

### Everything else

No missing or duplicate H1, no price mismatch, no invalid schema, no authority-model breach, no
unsourced government claim, no banned CTA copy. Sections 1 to 9 above stand as measured.

## Warnings carried into production, deliberately

1. **No purchase path.** Every CTA is `#enrol`. There is no NSW White Card product in LearnWorlds at
   all — the 23 Jul revenue export carries only WA and TAS rows. Andrey's call, 1 Aug 2026, the same
   basis as `/white-card-tas`.
2. **Both image slots render FPO placeholders** that print their own art direction as body text on an
   indexable page. Prompts and filenames in `06-image-prompts.md`. Second sighting of this pattern
   across the build; 11 pages already carry it.
3. **Stage 7 is self-verified** and the readability and AI-detection audits have not been run.

---

## 12. Re-verification — 2 August 2026, delivery-mode exemption

**Why this section exists.** `src/content/courses/white-card-nsw.mdx` and
`src/data/faqs-white-card-nsw.ts` were edited on 2 Aug 2026 after the 1 Aug Stage 7 above, so
`check-pipeline` §4 correctly FAILed the slug: a verification that predates the content it certifies
has certified nothing. This section re-measures only what the change could have moved. Sections 1-11
above stand for everything else.

**What changed and why.** Andrey recorded the NSW delivery mode as an **exemption**
(`kb/register/online-delivery-policy-by-state.md` §2A-1): the course is delivered by Upskill Institute
as a trainer-led virtual classroom, stated as the RTO's own delivery, never attributed to SafeWork
NSW, and carrying no source link. The 1 Aug page credited the regulator with the mode and put a
`VerifiedSources` badge over it. That is what was removed.

**⚠ Self-verified again, same caveat as the header.** Measured from `dist/white-card-nsw/index.html`
after `npm run build`, by reading the built HTML, not the source.

| Check | Measured value | Verdict |
|---|---|---|
| `VerifiedSources` blocks in `#online` | **0** (was 1) | PASS — deliberate; §2A-1 rule 2 |
| `VerifiedSources` blocks page-wide | 5, all over regulator-sourced facts | PASS |
| Regulator credited with delivery mode | 0 matches for `SafeWork NSW (requires\|accepts\|permits\|treats) … (live\|video\|real time\|face)` | PASS |
| "accepted as face-to-face" anywhere | 0 | PASS |
| "because New South Wales requires it" | 0 (removed from the glance capsule) | PASS |
| Mode attributed to the RTO in `#online` | "Upskill Institute runs this course as a booked session…" present | PASS |
| Capsule word counts, all 8 section capsules | 40, 50, 53, 46, 48, 46, 48, 58 — all within 40-60 | PASS (glance capsule is now exactly 40, the floor; do not trim it further) |
| H1 / H2 counts | 1 / 12, unchanged | PASS |
| JSON-LD blocks / `@graph` | 1, single graph | PASS |
| Person nodes | 1 (Warwick Smith) | PASS — asqa-accredited requires exactly 1 |
| `Course.offers.price` | `129`, unchanged | PASS |
| Guardrails | 21 pages passed | PASS |
| `prose-lint` | 11 files passed | PASS |
| `check-claims` | 0 failing | PASS |
| Em dashes in this page's source | 13 → 12 (one removed with the deleted block; none added) | PASS |

**Three mandated sub-skill audits — dispositions.** Unchanged from section 11: this is a
targeted copy correction to four sentences and one deleted component, not a re-run of the page.
`abe-readability-audit` **not re-run** — no layout, token or component-geometry change; the only
structural delta is one removed `VerifiedSources` block, which shortens the section.
`final-check` **not re-run** — the four rewritten sentences were read as prose in-session for
repetition and answer/question fit. `ai-detector` **not re-run** — same reason, four sentences.
Skipping is allowed; skipping silently is not, which is why they are dispositioned here.

**Still open on this page, unchanged by this session:** no purchase path (every CTA is the in-page
`#enrol` anchor, since there is no NSW White Card product in LearnWorlds), and both image slots
render FPO placeholders.
