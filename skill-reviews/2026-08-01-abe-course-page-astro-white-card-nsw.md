---
# Machine-readable block. scripts/review-trends.mjs parses this, so keep the keys and
# shapes exactly as they are — prose belongs below the frontmatter, not inside it.
date: 2026-08-01
skill: abe-course-page-astro
subject: white-card-nsw
archetype: 2 nationally-recognised course
verdict: Amber
graded_by: independent
scores:                            # green | amber | red
  correct_and_safe: amber          # NON-NEGOTIABLE. red here fails the whole run.
  passed_gates_first_time: red
  inside_effort_budget: green
  low_rework: amber
  taught_us_something: green
metrics:
  turns_to_passed_audit: 6         # assistant turns from start to a clean audit
  manual_fix_passes: 2             # fixes needed after the skill said "done"
  gate_fails_after_handoff: 2      # checks that failed only after handover
---

# Skill review — white-card-nsw, 2026-08-01

## Verdict

**Amber.** The page is well built and the mechanical set survives independent re-measurement: one H1,
one `Person`, the RTO as `Course.creator`, price agreeing in three places, eight planned sections all
present, all eight capsules inside 40-60 words and every one opening in the shape its heading asks
for, and both facts marked UNVERIFIED at Stage 1 genuinely absent from the built HTML. The Amber is
not a quibble about any of that.

It sits on one thing. **The page's central regulatory claim is attached to a source that does not
carry it.** `#online` tells the reader "SafeWork NSW accepts live video delivery as face to face", and
the `VerifiedSources` block directly beneath attests that the "acceptance of live video as face to
face" is "quoted from the regulator's conditions", dated 1 Aug 2026, citing SafeWork NSW's general
conditions. It is not quoted from there, and on the run's own reading it cannot be: `01-source-map.md`
records that the general conditions permit connected delivery **"if provided for in the relevant
Specific Conditions"**, and that no current Specific Conditions document was located. The run's own
fact ledger sources that row to **"Andrey, 1 Aug 2026"** and marks it "not traceable to a public
primary source". The page cites the regulator for a fact the artefacts source to the business owner.
That gap is the finding, and it is on the page, not just in the process.

**Not red, and the argument for red is real, so here is why it lost.** Red on correct-and-safe is a
veto that fails the whole run, and it should be reserved for a fact that was guessed, defaulted, or
carried into a reader-facing surface against the evidence. None of those describes this. The claim is
the repo's **standing** position, written down before this run started: `kb/rules/authority-model.md`
line 141 already says NSW delivery is "trainer-led virtual classroom (accepted as face-to-face)", and
`kb/register/online-delivery-policy-by-state.md` §2 carries the same row. The run did not invent it,
it inherited it, then **raised a blocker against its own inherited position** when a contrary
regulator document appeared, and stopped. Two supporting facts were verified at source in this
session, not asserted: Upskill holds SafeWork NSW registration RTO800520 for General Construction
Induction Training (read on the SafeWork NSW register), and the register's own disclaimer cites the
WHS Regulation **2025** while the contrary PDF is framed under the **2017** Regulation. A regulator
listing a provider whose public, advertised offering is by Zoom is evidence, not nothing. The
disclosure is complete, unedited and routed, the page has not deployed, and no reader has seen it.

**Not green either.** CLAUDE.md gives exactly two dispositions for a government fact: verify it at
its source, or mark it explicitly UNVERIFIED. This run took a third — clear it verbally and record
the residual risk in `07-verification.md` and an MDX comment, both invisible to the reader — and then
let the page assert the cleared fact under a "Verified 1 Aug 2026" badge naming the regulator. The
mechanism that exists to tell a reader "we checked this" is doing the opposite of its job on the one
claim where it matters most. Amber.

**What would move it to green:** the current Specific Conditions for GIT obtained from SafeWork NSW
(13 10 50 / `tacs@safework.nsw.gov.au`) and showing connected delivery provided for; or SafeWork NSW
in writing; or Upskill's SafeWork NSW approval or variation for video delivery. Any one, read in a
`facts` session and recorded in `kb/register/`, closes it. **What would move it to red:** the page
deploying before one of those lands; or the October 2022 document turning out to be current.
Meanwhile a smaller fix is available today and would move nothing but is right anyway — the
`#online` `VerifiedSources` block should attest what it can actually quote (the self-paced
prohibition), and stop attesting the acceptance.

---

## The five scores, with evidence

### 1 · `correct_and_safe` — **amber**

Everything below was measured by me in `dist/white-card-nsw/index.html`, not taken from `07`.

| Requirement (asqa-accredited) | Measured |
|---|---|
| H1 count | **1** — "White Card NSW." |
| `Person` nodes in the `@graph` | **1** — Warwick Smith, `jobTitle: "Compliance & Currency Reviewer"` |
| Any `Person` titled "developer" | **0** |
| `Course.creator` | `Organization` / "Upskill Institute" / `identifier: "RTO 45708"` |
| `credential.recognizedBy` | the RTO, not a regulator — correct for asqa |
| `Course.offers.price` vs on-page vs `priceNumber` | `"129"` = `$129` = `"129"` |
| JSON-LD blocks | 1, server-rendered, single `@graph` |
| `AggregateRating` | **0** |
| `data-authority` | `asqa-accredited` |
| Breadcrumb | `Home` → `White Card NSW` only; **the unbuilt `/white-card` crumb is correctly absent** |
| Canonical | `https://www.abeeducation.edu.au/white-card-nsw`, no trailing slash |
| `Enrol now` (banned CTA) | **0** |
| Bare `ABE` | **1**, the `span.wordmark` logotype — the documented exception |
| `comprehensive` | **0** |

**Capsules — re-counted from `dist/`, not from `07`.** 45 / 50 / 55 / 46 / 48 / 45 / 18 / 48 / 57.
All eight section capsules inside 40-60; the 18 is the `TrustBand` tagline, which `07` correctly marks
as not a section capsule. Opening shapes against their own headings: What → "You pay ABE Education
$129"; Is → "Yes."; Can → "Yes, entirely online"; **Where → "On construction sites anywhere in
Australia"**; What/When → "You get a Statement of Attainment"; What does it cost → "$129"; How →
"One booked day with a live trainer"; **Who → "The course is developed, owned and delivered by Upskill
Institute"**. No yes/no opener under a what/how/who/when/where heading. Clean. My counts differ from
`07`'s by up to 3 words on two rows (`#cost` 45 vs 42) — tokenisation around inline `<b>`, immaterial,
both inside the band.

**Section conformance.** Every `id` in `05-components.md` is in the HTML: `real` · `online` ·
`accepted` · `your-card` · `cost` · `how-it-works` · `content-review` · `faq`, in plan order, plus the
layout's `top` and `rto-partner`. Nothing on the page is unaccounted for. (`check-pipeline` disagrees
about `rto-partner` — see gate 2; that is a plan-format divergence from the two prior White Card runs,
not a missing section.)

**The two UNVERIFIED facts are genuinely off the page.** I grepped the built HTML rather than trusting
the row: **0** occurrences of any fee figure other than `$129`/`$129.00`, **0** occurrences of "six
hours"/"6 hours", and the single "minimum" on the page is inside a `VerifiedSources` `facts` string
about minimum **age**. The only durations stated are "about seven hours", sourced to the partner, and
the page states no regulatory minimum at all. This is the run's best work and it held under pressure:
a plausible six-hour figure was sitting in `kb/register/`, corroborated at condition 14 of a document
the run had in hand, and it still did not go on the page because the document's currency was in doubt.
That is CLAUDE.md's "a plausible figure is worse than a visible gap" actually obeyed, not cited.

**No authority-model breach.** Zero claims that ABE Education is an RTO, delivers the training,
assesses, or issues the credential; the denial sentence "ABE Education does not deliver training,
conduct assessments, or issue qualifications" is in the disclaimers block, which `07` correctly notes
closes a gap `/white-card-wa` and `/white-card-tas` still carry. **0** occurrences of "SafeWork
NSW-approved". Eleven "self-paced" hits, **every one** a negation, a WA/TAS reference, or the quoted
regulator prohibition — no claim anywhere that this course is self-paced for a NSW resident, including
in the schema.

**The amber, stated once more in its narrowest form.** Two sentences on the page assert what SafeWork
NSW accepts, under a citation to a document that conditions its permission on an instrument nobody
located. `hasCourseInstance.courseMode: "online"` puts the same claim into structured data. If the
October 2022 conditions are in force, `07` is right that this is not a copy fix — `#online`, the
CanCant, the hero, the glance grid and the product itself all invert. The blast radius is why this
scores amber rather than being waved through as an open item.

### 2 · `passed_gates_first_time` — **red**

**Two publish hard-blockers were raised inside the run**, one of them against the page's central
product claim, the other against a sentence that was **wrong rather than merely unsupported** —
`#cost` claimed competitors "often exclude the government card fee" when the RTO always pays it, so
there was no exclusion to compare against. `07` is admirably blunt about that one ("It was ABE
Education claiming a distinction that does not exist"). Both were caught by this pipeline's own gate,
which is the gate working, and neither reached a reader. But "passed its gates first time" is
precisely what did not happen.

**And the gates were not re-run.** `07` §7 records `system-health` as "Pre-flight 0 FAIL / 13 WARN,
none naming this slug (the slug did not exist at pre-flight). **Re-run before merge.**" I re-ran it.
It is now **1 FAIL and 17 WARN, five of them naming this slug**:

| Check | Now |
|---|---|
| `check-pipeline` | **FAIL** — `white-card-nsw: 07 is not committed while its page source is` |
| `check-pipeline` | WARN — `section(s) on the page but not in the 05 plan — rto-partner` |
| `check-pipeline` | WARN — `1 capsule(s) in 04 with no close match on the page` |
| `check-pipeline` | WARN — `3 capsule(s) on the page with no close match in 04` |
| `check-claims` | WARN — total not reconciled (the one `07` found and adjudicated) |

`check-claims` is otherwise 0 failing / 1 warning, and `check-links` 0 failing / 3 warning with **none
naming this slug** — 919 same-origin links resolve, and the `/white-card` link in the footer is a
listed PLANNED page, so it is scheduled work rather than this run's defect. `07`'s reading of those
two is accurate.

**`07` §6 has three rows that are false as rendered.** It reports "Sideways links to competing spokes:
0 links to `/white-card-wa` or `/white-card-tas`" and "Links to the on-hold NSW OB pages: 0". The
built page emits `/white-card-wa` twice, `/white-card-tas` twice and `/owner-builder-nsw-course` twice,
all from the `SiteHeader` megamenu. No reader harm — `/owner-builder-nsw-course` is a built,
indexable pre-launch page, and the White Card cross-links are site chrome — but the measurement is
wrong, and it is wrong in the reassuring direction on a page whose own FAQ file carries a comment
saying those pages "must not be linked". A row that says 0 when the answer is 2 was measured on the
body and reported as the page.

### 3 · `inside_effort_budget` — **green**

Artefact mtimes span 15:32 → 21:23 UTC, about **5h51m** wall clock, which against `white-card-wa`'s
42 minutes looks alarming until it is broken up. Writing activity is two blocks: **15:32 → 16:17**
(02, 03, 06, 05, the FAQ data file) and **20:57 → 21:23** (04 rewritten, 01 rewritten, the MDX, the
build, 07, the readability audit). About **105 minutes of work**, in line with `wa-owner-builder-course`
at 103. The 4h40m gap between them is a **human-response wait** on the delivery blocker and the
card-fee question — the run stopped and asked rather than guessing through a regulatory unknown, which
is the behaviour CLAUDE.md asks for and the opposite of wasted motion. Seven artefacts, one page, one
FAQ file, one build, no bisecting, no abandoned direction. Green, and the wait is to the run's credit.

### 4 · `low_rework` — **amber**

Two fix passes after the build was green.

1. **The `$28` comment fix.** `check-claims` fired against a frontmatter comment that quoted the
   barred figure while explaining why it was barred. The comment was rewritten to carry no numeral.
2. **Blocker 2's copy correction**, four discrete edits — the `#cost` capsule, two body paragraphs and
   a `priceRows` sub-label — plus `04-content.md` rewritten and rebuilt.

Against that: one pass each, not a loop; every correction re-measured in `dist/`; the whole thing
shipped in a single rebuild (MDX 21:02:22, `dist/` 21:02:30, `07` 21:19). Also charged here, and
disclosed by the run rather than found by me: `src/components/SiteHeader.astro` is `design`-owned and
a build session edited it, with Andrey's explicit authorisation. Amber, not red.

### 5 · `taught_us_something` — **green**

**The blocker itself is the lesson, and the run named its general shape unprompted:** *"That is the
NSW Owner Builder failure pattern repeating: a partner offering that the regulator's own documents do
not support."* That sentence is worth more than the page. It also wrote the currency question up as a
four-row evidence table pointing both ways rather than picking a side, and kept the original finding
**unedited** below the clearance "because it is the evidence a future reader needs if the question is
ever reopened". That is the right instinct about records and it is rare.

Four further transferable findings, each routed rather than quietly patched from a build session:
the **archetype 02 reference contradicts itself and the code** (§5 says `Person` ×2 and
`rtoPartner`/`rtoNumber`/`unitCode`; §3 and `guardrails.ts` require ×1 and the live key is
`partnerRto` — the run followed the code and filed the contradiction); the **`.cta-note` Afterpay
promise** rendered by the layout on a page with no checkout, which means `/white-card-tas` is live
carrying it; the **`check-claims` reconciler has no model for an all-inclusive price** and will fire
on every such page; and the **`$28`-in-a-comment** pattern, correctly identified as `kb/mistakes-log.md`'s
third sighting. It also closed the ASQA denial-sentence gap that `/white-card-wa` and `/white-card-tas`
still carry, which is a page improvement derived from reading the two prior runs rather than copying
them.

---

## What worked

- **The refusals held under pressure.** A six-hour minimum sat in `kb/register/`, was corroborated at
  condition 14 of a document the run had open, and still did not reach the page, because the
  document's currency was in doubt and "a superseded document cannot be current for one condition and
  stale for another at will". Same for the card fee: the amount is on the partner's own sales page,
  the page states `$129` all-inclusive and names no figure, and I confirmed **0** occurrences in the
  built HTML. Two chances to write a plausible number, two refusals.
- **A fact was upgraded mid-run rather than left partner-stated.** Upskill's SafeWork NSW registration
  went from the partner's word to **RTO800520 read on the SafeWork NSW register**, and the page now
  invites the reader to check both registers themselves, by name, before paying.
- **The schema is exactly right for `asqa-accredited`** — one Person, the RTO as `creator` and as
  `recognizedBy`, no ABE developer credit anywhere. Third consecutive run to get this right, and
  `05-components.md` records *why* (`ExpertCredentials` takes `developerRto`, not a second expert),
  which is how it stays right.
- **Every capsule opens in its heading's shape**, including the two that most often go wrong
  (`#accepted` Where and `#content-review` Who), and the FAQ opens with the three ASQA-mandatory
  questions, which `05` adds against `03`'s omission and says so.
- **The three mandated sub-skill audits are all dispositioned**, two run with measured values and
  `ai-detector` argued-and-declined rather than skipped. `system-health` confirms it for all five
  slugs now. The `white-card-wa` review's spec item 1 has landed and is holding.
- **`07` opens by discrediting itself.** "Self-verified, not independently verified... the author of
  the copy audited the copy. Treat these results as weaker evidence." A verification that tells you
  how much to trust it is worth more than one that does not, and that header is why I went looking in
  §6 and found the three wrong rows.

## What didn't

1. **The `VerifiedSources` block over-attests on the page's central claim.** Covered above. This is
   the finding.
2. **`07` §6's three "0 links" rows are wrong as rendered** (2 / 2 / 2). Measured on the body,
   reported as the page.
3. **`07` §3 certifies section conformance that `check-pipeline` WARNs on.** `05-components.md`
   deliberately keeps `rto-partner` out of its table as "not a section"; `white-card-tas` and
   `white-card-wa` both put it **in** their tables as a layout row, which is why they score
   `8 section(s) match the plan` and this page scores a WARN. The prose reasoning is defensible; the
   divergence from two prior runs was not checked against the tool that reads it.
4. **Stage 4 drifted from the page and was certified anyway.** `04-content.md`'s `#content-review`
   capsule is "Warwick Smith reviewed this page on 1 August 2026..." (44 words). The page's is "The
   course is developed, owned and delivered by Upskill Institute..." (57 words). The page's version is
   better — it answers "who develops" as well as "who checks" — but `04`'s cold-reread table still
   certifies "Who → 'Warwick Smith' ✓", certifying an opener that is not on the page. Three further
   page capsules have no match in `04`. Neither `07` §2 nor §3 noticed.
5. **`$28` is written into four of the seven artefacts** — `01` §3, `03` line 94, `04` line 309 and
   `07` line 105 — by a run whose `01` states, in the table above it, that "the amount is deliberately
   not written in this table" precisely because "`check-claims` scans comments and **artefacts**". The
   page is clean (0 in `dist/`), so there is no reader harm, and `03`'s use is arguably legitimate as
   a worked example of the banned form. But `01` §3 asks the question as *"Does ABE's $129 include the
   $28 SafeWork NSW card fee?"* two paragraphs from where it says it does not write the figure. The
   run diagnosed the pattern as its third sighting, fixed the one instance a checker happened to
   catch, and left four it did not. **A pattern is not closed by fixing the instance that alerted you.**
6. **The meta description is 208 characters and the title is 64.** Neither is recorded anywhere in the
   seven artefacts — `07` §1 has no meta row at all. The description will truncate at roughly 155-160,
   which costs the snippet on a page built to win an under-served query set from position ~45. The
   `white-card-wa` grader measured 52/157 and treated them as load-bearing; this run did not measure
   them.
7. **Two FPO placeholders on an `index,follow` page**, printing their own art direction as body copy.
   Disclosed by the run as warning 2 and correctly gated; the `white-card-wa` review filed the guard
   for it and it has not shipped, so this is the third sighting.

---

## Demand list
Tag every item: [skills] | [design] | [facts] | [build]

Read `skill-reviews/2026-08-01-abe-readability-audit-white-card-nsw.md` first — its six items
(`.mlabel` 10px, the 43px CTA, the 15px reviewer link, 1.65 leading, the `audit_*.py` scripts, the
viewport-reversion trap) are **not repeated here**. These are new.

**Restructure triggers (ROADMAP rule 3) — second-or-later occurrence:**

- [skills] **FOURTH SIGHTING — a barred figure written into the run's own artefacts.**
  `kb/mistakes-log.md`'s "figure quoted inside a comment was scanned as a live page figure" is at 3
  and this run declared itself the third sighting, then left `$28` in `01`, `03`, `04` and `07`. The
  prose guard does not work because the author is always explaining an exception when they breach it.
  Make it mechanical: `check-claims` already scans artefacts — have it report a barred-figure hit in
  `pipeline/{slug}/**` as a WARN naming the file, so the sweep is the tool's job and not the author's
  memory. Increment #the-figure-in-a-comment entry to 4.
- [skills] **THIRD SIGHTING — FPO placeholders on an `index,follow` page.** `cpd-building-tas`,
  `white-card-wa`, now `white-card-nsw` (2 of 2 slots, `Image placeholder` ×2 measured in `dist/`).
  The `white-card-wa` review filed the guard ("fail the build when an `index,follow` page contains a
  `.ph` placeholder") and it has not been built. Build it, or stop filing it.
- [skills] **SECOND SIGHTING — a build session must edit design-owned `SiteHeader.astro` to ship any
  page.** Filed by `white-card-wa`, recurred here verbatim with Andrey's explicit per-run approval.
  The trigger has fired twice; pick one of that review's three options and write it into the
  session-types table.

**First occurrences:**

- [facts] **Obtain the current Specific Conditions for GIT in NSW from SafeWork NSW** (13 10 50 /
  `tacs@safework.nsw.gov.au`) and record it in `kb/register/online-delivery-policy-by-state.md` with
  the source and date. This is the single highest-value item on this list: it decides whether
  `/white-card-nsw` ships as written, and until it lands the next run will rediscover the October 2022
  PDF — still linked from safework.nsw.gov.au — and re-raise the same blocker from scratch.
- [facts] **`kb/register/online-delivery-policy-by-state.md` §4 sources its whole delivery matrix to
  "2026 RTO/industry guides (Tradie Training, FirstAidPro, National Courses)".** That register file is
  the origin of the NSW "accepted as face-to-face" position that `kb/rules/authority-model.md` line
  141 now states as canonical, and industry guides are not a regulator. Its §4 already says "confirm
  against each WHS regulator... before changing any course-page delivery claim"; the confirmation has
  never happened for NSW. Either verify the row or mark it UNVERIFIED — a register row that CLAUDE.md
  says owns every verified regulatory figure should not be quietly carrying an unverified one.
- [facts] **The NSW row of that same file states "min. 6-hour course" with no source.** This run
  refused to put it on the page and was right to. Verify it against the current Specific Conditions
  when they arrive, or mark it UNVERIFIED.
- [facts] **SafeWork NSW replacement white card fee, 2026-27: $43, or $36 applied online**, read at
  source on 1 Aug 2026 at `safework.nsw.gov.au/resource-library/licence-and-registrations/licensing-fees`.
  Verified in a build session that could not write `kb/register/`. Re-read and record it.
- [build] **Narrow the `#online` `VerifiedSources` attestation to what it can quote.** It currently
  attests "the acceptance of live video as face to face... quoted from the regulator's conditions".
  The prohibition is quoted; the acceptance is not, and the cited general conditions make their
  permission conditional on a document nobody has. Attest the prohibition, and let the acceptance sit
  in body copy until the Specific Conditions land.
- [build] **`04-content.md`'s `#content-review` capsule and cold-reread table describe a capsule the
  page does not carry.** Bring `04` up to the built page, or the next reader of this run's record is
  reading a certification of text that was replaced.
- [skills] **`check-pipeline.mjs:233`'s FAIL message states a fact it never checked.** It fires
  whenever `07` is uncommitted (`verTime === null`) and reports "07 is not committed **while its page
  source is**" — but `srcTime` is not consulted on that branch. Here neither is committed, so the
  message is wrong about the only thing that makes it alarming. Either check `srcTime` before
  asserting it, or reword to "07 is not in version control".
- [skills] **The `05-components.md` convention for `rto-partner` is unsettled across three runs.**
  `white-card-tas` and `white-card-wa` list it as a table row; `white-card-nsw` argues in prose that
  it is not a section and omits it, and gets a `check-pipeline` WARN for the trouble. Prescribe one
  form in the archetype-02 reference so the tool and the plan agree.
- [skills] **Stage 7 has no meta-tag row.** Title and description lengths are load-bearing on every
  page this pipeline builds (this one ships 64 and **208** characters, the latter well past
  truncation) and are recorded in none of the seven artefacts. Add title/description length to the
  Stage 7 structure table.
- [skills] **Stage 7's link and cannibalisation checks measure the body and report the page.** Three
  §6 rows here read 0 where the rendered HTML has 2. Have Stage 7 state its scope explicitly
  ("body only" or "full document") on every link row, or measure the document.
- [skills] **Archetype 02's reference contradicts itself and the code** — §5 specifies `Person` ×2 and
  frontmatter keys `rtoPartner`/`rtoNumber`/`unitCode`; §3 and `guardrails.ts` require ×1 for
  asqa-accredited and the live key is `partnerRto`. Filed by the run in `07` and repeated here so it
  is routed. The run followed the code, correctly. `kb/mistakes-log.md` #1 family ("documentation
  drifted from the code and was trusted over it", now at 10).
- [design] **`.cta-note` promises "Pay by card or 4 interest-free payments with Afterpay" from the
  layout**, on pages with no checkout. Overridden per-page here via `cta.microcopy`;
  `/white-card-tas` is **live** with the default. Found by the run from a screenshot, checked by no
  gate.

**Added after grading, by the build session, 1 Aug 2026.** Not the grader's findings; its list above
is unedited. Filed here rather than under a heading of their own because `demand-split` reads only
this section, and two items placed outside it were parsed as nothing and reported as nothing.

- [build] **The two live NSW owner builder URLs carry 38,257 impressions between them and neither is
  resolved for cutover.** `/owner-builder-nsw-course` (335 clicks, 25,269 impressions, position 9.69)
  and `/nsw-owner-builder-course` (151 clicks, 12,988 impressions, position 16.53), from the 16-month
  site-wide GSC export. In this build `/owner-builder-nsw-course` exists and is now
  `noindex,nofollow`; **`/nsw-owner-builder-course` has no page at all.** Migration plan W2-3
  consolidates both legacy URLs *to* `/nsw-owner-builder-course`, the slug that does not exist, so
  the higher-equity URL serves a noindexed page and the 12,988-impression URL 404s unless the
  redirect map catches it. Both are for a product ABE cannot currently sell, which is why it has not
  bitten. Needs a decision about what those URLs *do* at cutover, not only about when the course
  returns. Read at Stage 0 by whoever builds NSW owner builder; belongs on the Wave 6 gate list too.
- [design] **Match the `ModuleRows` group accordion to the FAQ accordion** (Andrey, 1 Aug 2026).
  Scope it before starting: the plus-mark is already aligned (`0b02349`), structural and typographic
  parity is conflict-free, but full visual parity means adopting the FAQ's
  `background: var(--paper-alt)` surface-tint hover, which reverses `7236dec` and `bbc54a0`.
  `ModuleRows.astro` carries the measured reasoning for moving hover off the surface: a lighter wash
  reads as a weak version of the open state (already `--paper`), and a darker step puts `--slate` at
  4.40:1 against a 4.50 AA floor while `--slate` carries the module count. Re-measure `--slate` on
  the module row's ground and take the reversal deliberately.

---

## Output — every Amber or Red needs at least one

- [ ] Fix applied — none by this grader. The review is the artefact, and both in-run blockers were
      already adjudicated inside the run.
- [ ] Memory written — for the run owner, not the grader. Candidate: **a verbal clearance is a
      decision, not a source; a page may act on it but must not cite a regulator for it.** The page
      states the delivery claim under a "Verified 1 Aug 2026 · SafeWork NSW" badge while the fact
      ledger sources the same row to "Andrey, 1 Aug 2026". Deliberately **not** memory: the NSW
      Specific Conditions themselves, the register wording, and the fee figures, all of which are
      owned by `kb/register/` and the demand list above.
- [x] Skill-change spec for the improvement pass (below)
- [x] `kb/mistakes-log.md` entry added or incremented (below)

**Skill-change spec.**

1. **A publish hard-blocker cleared by a person, rather than by a source, must leave a visible mark.**
   Stage 7 gains a required row: any government fact whose ledger source is a person rather than a
   document is listed, with every page element that states it. Either the page carries an explicit
   UNVERIFIED marker per CLAUDE.md, or the deploy is gated until the source lands. What must not
   happen again is the current shape, where the reader sees a regulator citation and the residual
   risk lives in an artefact and a source comment.
2. **A `VerifiedSources` `facts` string must be quotable from the sources it lists.** Add it to Stage 7
   as a checked row: for each `VerifiedSources` block, name the sentence in the cited source that
   carries each attested fact. On this page that check fails once, and it fails on the most important
   sentence.
3. **Make the barred-figure sweep mechanical across `pipeline/{slug}/**`,** not just page source and
   comments. Fourth sighting.
4. **Add title and description length to the Stage 7 structure table.**
5. **Prescribe the `rto-partner` row form** in the archetype-02 reference so `check-pipeline` and
   `05-components.md` stop disagreeing, and **fix archetype 02 §5** against the code (`Person` ×1,
   `partnerRto`).
6. **Build the FPO-placeholder build guard** specified by the `white-card-wa` review. Three sightings,
   two filings, no guard.

**`kb/mistakes-log.md`.**

- **"A figure quoted inside a comment or an anecdote was scanned as a live page figure" → times seen
  4, last seen 2026-08-01.** The run declared itself the third sighting, fixed the one instance
  `check-claims` caught, and left `$28` in four artefacts including the table that declares it
  unwritten. Add: *fixing the instance a checker caught is not closing the pattern; sweep every
  artefact in the same change.*
- **#1 ("documentation drifted from the code and was trusted over it") → increment, last seen
  2026-08-01.** Archetype 02 §5 versus §3 and `guardrails.ts`.
- **New entry.** *"A publish hard-blocker against a page's central regulatory claim was cleared on a
  verbal confirmation, and the page then stated the cleared claim under a dated 'Verified' badge
  citing the regulator, while the run's own fact ledger sourced it to a person and marked it 'not
  traceable to a public primary source'."* Guard: a fact cleared by a person may be **acted on** and
  must not be **attributed** to a document that does not carry it. The citation follows the evidence,
  not the decision.
- **New entry (first sighting).** *"A verification measured the page body and reported the page. Three
  cannibalisation rows read 0 where the rendered document has 2, each in the reassuring direction."*
  Guard: every count in a verification states its scope in the same cell as the number.

---

## Outcome

**The outcome block is omitted from the frontmatter, per the template's own instruction** (*"omit the
whole block for a run that did not deploy"*), consistent with the three prior non-deploying build
reviews, which `review-trends.mjs` parses without complaint.

**This page has not deployed.** Production deploys are human-triggered, and this one is additionally
gated on the `facts` item at the top of the demand list — the current SafeWork NSW Specific Conditions
for GIT — plus the two FPO image slots and the absence of any NSW purchase path. Nothing from this run
is in version control either: the seven artefacts, the MDX, the FAQ data file and the readability
audit are all untracked, and `SiteHeader.astro` is modified in the working tree. `deploy_date` is
blank and the two review dates cannot be computed.

Paste this into the frontmatter at deploy, filling the three dates:

```yaml
outcome:
  primary_keyword: "white card nsw"
  secondary_keywords: ["white card nsw online courses", "white card training online nsw", "nsw white card online course", "nsw white card training", "nsw white card course online", "online white card training nsw", "can you get a white card online in nsw", "how to get a white card nsw", "what is white card nsw", "white card validity nsw"]
  target: "move the ~28-query NSW cluster (roughly 350 impressions, 0 clicks, average position ~45, currently landing on WA and TAS pages a NSW resident cannot lawfully use) into the top 15 within 12 weeks, and earn first clicks on 'white card nsw'"
  live_url: "https://www.abeeducation.edu.au/white-card-nsw"
  deploy_date:      # blank — not deployed
  review_4week:     # deploy + 28 days
  review_12week:    # deploy + 84 days
  result_4week: ""
  result_12week: ""
```

Note for the 4-week review: this is a **new URL with no inherited equity** (`02-gap.md` records it as
category C, no redirect, R4 parity not applicable), so unlike `/white-card-wa` the measure here is
position and first clicks, not CTR at unchanged position.

---

## Grader note

`graded_by: independent`. Graded from the seven pipeline artefacts,
`dist/white-card-nsw/index.html`, `src/content/courses/white-card-nsw.mdx`,
`src/data/faqs-white-card-nsw.ts`, the run's readability audit, `CLAUDE.md`,
`kb/rules/authority-model.md`, `kb/register/online-delivery-policy-by-state.md`,
`scripts/check-pipeline.mjs`, `scripts/check-links.mjs`, `astro.config.mjs`, `dist/_redirects`,
`skill-reviews/_TEMPLATE.md` and the two closest prior reviews (`white-card-tas`, `white-card-wa`),
plus live runs of `system-health.mjs`, `check-claims.mjs`, `check-links.mjs` and `review-trends.mjs`,
and `git status`. No account of the run from the agent that did it.

**Re-measured myself rather than taken from `07`:** the full JSON-LD `@graph` parsed (Person count and
`jobTitle`, `Course.creator`, `recognizedBy`, `offers.price`, `courseMode`, breadcrumb items);
H1 count and text; all twelve H2s; all nine capsule word counts and opening shapes; every `id` in the
built document against `05-components.md`; every `href` on the page and which resolve in `dist/`;
`$`-figure occurrences, "six hours", "minimum", "self-paced" ×11 in context, "SafeWork NSW-approved",
"Enrol now", `AggregateRating`, bare `ABE`, `comprehensive`; `data-authority`; title and description
lengths; `Image placeholder` ×2; sitemap membership and the `index,follow` robots tag;
`dist/_redirects` and the `PLANNED` map in `check-links.mjs`; the `$28` occurrences across all seven
artefacts; artefact mtimes; and `dist/white-card` not existing.

**Metrics, and how I got numbers where the three prior independent reviews left dashes.** The trend
report currently says `turns_to_passed_audit: not enough data` because every independent grader
correctly declined to invent one. That leaves the metric useless. I have used the **only turn count
this run recorded** — `turns_to_passed_audit: 6`, from the frontmatter of
`2026-08-01-abe-readability-audit-white-card-nsw.md`, written by the session that did the work. It
measures the readability audit's turns, not the whole build, so it **under-reports**; it is stated
here so the trend can read it as a floor rather than a fiction, and a future grader should prefer a
figure the build session records for itself.

`manual_fix_passes: 2` — the `$28` comment rewrite, and blocker 2's four-element cost correction with
its rebuild, applying `white-card-tas`'s convention that a fix plus rebuild counts as 1. Blocker 1 is
**not** counted: it was cleared without a page change.

`gate_fails_after_handoff: 2` — (1) `check-pipeline`'s FAIL on the uncommitted `07`, and (2) the
`check-pipeline` section-conformance and capsule-drift WARNs that contradict `07` §2 and §3. Both
surfaced only when I ran the re-check `07` itself deferred with "Re-run before merge". The
`check-claims` total WARN is **not** counted — `07` found, quoted, adjudicated and routed it before
handoff, and I only reproduced it. The three wrong §6 link rows are not counted as gate fails either;
they are a verification defect, charged to gate 2 in prose.

**Why `correct_and_safe` is amber and not red.** Argued at length under Verdict. In one line: the
claim was inherited from the repo's own standing rules rather than defaulted, the run raised the
blocker against itself and stopped, two supporting facts were verified at source in-session, the
disclosure is complete and unedited, and nothing has shipped — but the built page attributes the claim
to a regulator document that, on the run's own analysis, does not carry it, and CLAUDE.md's stated
alternative (mark it UNVERIFIED) was available and not taken.

**Why not amber-as-a-hedge.** If the current Specific Conditions turn out to prohibit connected
delivery, this page is not wrong in a sentence, it is wrong as a product, and `07` says so plainly.
That possibility is what the amber is for, and it is why the `facts` item to obtain those conditions
sits at the top of the demand list rather than in the middle of it.

