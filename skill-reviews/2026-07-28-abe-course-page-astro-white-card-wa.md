---
# Machine-readable block. scripts/review-trends.mjs parses this, so keep the keys and
# shapes exactly as they are — prose belongs below the frontmatter, not inside it.
date: 2026-07-28
skill: abe-course-page-astro
subject: white-card-wa
archetype: 2 — Nationally recognised course
verdict: Amber
graded_by: independent
scores:                            # green | amber | red
  correct_and_safe: green          # NON-NEGOTIABLE. red here fails the whole run.
  passed_gates_first_time: red
  inside_effort_budget: green
  low_rework: amber
  taught_us_something: green
metrics:
  turns_to_passed_audit:           # not recorded in the artefacts — see Grader note
  manual_fix_passes: 1             # fixes needed after the skill said "done"
  gate_fails_after_handoff: 1      # checks that failed only after handover
---

# Skill review — white-card-wa, 2026-07-28

## What was built

`/white-card-wa`, archetype 2 (nationally recognised course), authority model `asqa-accredited`:
a rebuild of ABE Education's largest White Card asset (131 clicks / 39,960 impressions / position
9.04 over 16 months) around unit CPCWHS1001 delivered by Blue Dog Training (RTO 31193). One MDX file
plus a FAQ data file, rendered by `CourseLayout`, 9 marked sections, 64,759 bytes in `dist/`,
indexable and in `sitemap-0.xml`. Seven pipeline artefacts (1,598 lines), one commit (`d18cb62`),
one rebuild. It has **not** deployed — production deploys are human-triggered — and two open items
gate the deploy.

## Verdict

**Amber.** Correct-and-safe is green and I re-measured the whole load-bearing set myself rather than
taking Stage 7's word: the asqa authority model is exactly right in the built JSON-LD, no Tasmanian
fact leaked, and the `$0.00` government row is honest and reconciles. The Amber sits entirely on the
gates. The first Stage-7 pass returned **FAIL with 4 ship blockers and 20 findings**, one of them a
CTA banned by name in two separate skill files; and the three sub-skill audits Stage 7 is required to
run are **not mentioned once in any of the seven artefacts** — the third consecutive run to fail that
requirement, against a mistakes-log guard written specifically to stop it.

---

## The five scores, with evidence

### 1 · `correct_and_safe` — **green**

I verified each of these in `dist/white-card-wa/index.html` and `kb/register/`, not in the artefacts.

**Authority model, parsed out of the single server-rendered `@graph`:**

| Requirement (asqa-accredited) | Measured |
|---|---|
| Exactly one `Person` | **1** — Warwick Smith, `jobTitle: "Compliance & Currency Reviewer"` |
| No Person titled "developer" | **0** |
| `Course.creator` = the RTO | `Organization` / "Blue Dog Training" / `identifier: "RTO 31193"` |
| `recognizedBy` = the RTO, not a regulator | `Organization` / "Blue Dog Training" / `RTO 31193` |
| `offers.price` = on-page price | `"99"` against `$99` ×15 in visible text |
| `data-authority` declared (mistakes-log #10) | `asqa-accredited` |
| `AggregateRating` anywhere | **0** |

**No Tasmanian contamination.** `13.72` = **0**. `Service Tasmania` = **0**. No minimum age is
stated anywhere (`minimum age` = 0) — WA publishes none, and `01-source-map.md` §B records that as an
explicit unknown rather than importing TAS's 14. The 19 `Tasmania`/`TAS` hits are all site-header nav
chrome bar one, which is the true training.gov.au scope line ("White Card (unit CPCWHS1001) for QLD,
WA and TAS"). This was the single largest risk on the page and it is clean.

**The `$0.00` row is honest and the total reconciles.** The page prints Course fee `$99.00` +
Government card fee `$0.00` ("None in Western Australia. Your training organisation issues and posts
the card") = Total `$99.00`. `kb/register/state-fees-register.md` §2, WA row: *"None — no separate
government card fee; the RTO issues and mails the card with the course"*. Arithmetic and register
agree. I re-ran `check-claims.mjs` and reproduced the WARN 07 adjudicated —
`(found 1 price, 0 government, 1 total)` — and 07's diagnosis is right: the checker matches a
government row by dollar figure against register-scraped numbers, and "None" is a word, so `$0.00`
matches nothing. **The check is wrong and the page is right.** `system-health` separately reports
`Figures: 150/150 page figures match the register`.

**Unit code.** `CPCCWHS1001` (superseded, double C) = **0** in 64,759 bytes; `CPCWHS1001` = **23**.
The run found WorkSafe WA's own replacement-process text still citing the superseded code and
correctly took training.gov.au and the register over the regulator's page, recording the divergence
in `01` §C-2 rather than silently resolving it.

**Authority language.** "not a registered training organisation" ×5. Zero claims that ABE Education
delivers, assesses or issues. Zero `WA-approved`/`approved course`. `comprehensive` = 0.
Bare `ABE` = 2 and both are the `SiteHeader` logotype wordmark — the one documented exception in
CLAUDE.md; `system-health` agrees (`Company name: no bare "ABE" in reader-facing content`).

**It refused to guess twice under pressure.** WA's minimum age and Blue Dog's card-posting timeframe
are both recorded as unknown in `01` §D rather than defaulted, and the FAQ file carries a comment
explaining that "what happens if I fail the assessment?" is *deliberately absent* because the resit
policy is an unconfirmed internal fact. That is the hardest rule in CLAUDE.md and it held.

**Why green and not amber, given B2.** The hero and `#online` capsule originally asserted *"Western
Australia is one of only two states where a fully online White Card is allowed"* — a regulatory claim
about every Australian jurisdiction resting on a register entry itself sourced to secondary "2026
RTO/industry guides". That is a §1d hard blocker and it got into a build. But it was caught by this
pipeline's own pre-deploy gate, before any deploy, nothing entered `kb/register/`, and the replacement
(`only two states` = 0 in `dist/`) is the WA-only fact that *is* sourced to WorkSafe WA. Unlike the
`wa-owner-builder-course` run — where an unchecked absence finding reached a live page and wrote a
falsehood into the fact store — the near-miss here was contained by the gate that exists for it. The
cost is charged to gate 2, where it belongs. Nothing incorrect survives into the graded artefact.

### 2 · `passed_gates_first_time` — **red**

**Four ship blockers and 20 findings on the first audit pass.** The tally is not the point; the
composition is.

**B1 — the banned CTA shipped on all four CTAs.** `references/verification.md` §1f bans it by name
(*"'Enrol now' / 'Enrol today' are banned; use benefit-led first-person wording"*) and lists it again
in the publish hard-blocker list; `SKILL.md` line 385 repeats it. The page shipped `Enrol now` on the
hero, in-page nav, CtaBand and sticky bar. **This is not a judgement call, a novel case, or a
tolerance question — it is an explicit written rule, stated in two files, violated four times in one
build.** That it was fixed (`Enrol now` = 0, `Get your White Card` ×4 measured in `dist/`) does not
convert a shipped violation into a pass; "passed its gates first time" is precisely what did not
happen. The run's own wider finding makes it worse and more useful: I confirmed `Enrol now` is still
live on **5 other built pages** (`act-owner-builder-course`, `owner-builder-nsw-course`,
`owner-builder-nsw-course-w`, `tas-owner-builder-course`, `styleguide`). A named hard-blocker that
only a Stage-7 subagent enforces is a rule that pages ship without.

**B2** — the uncited cross-jurisdiction claim ×2 (above). **B3** — the legislation citation pointed at
the bare domain `legislation.wa.gov.au`; a reader could not reach the instrument the page cites by
regulation number. Fixed to the deep link, which I confirmed is the only `legislation.wa.gov.au` href
on the page. **B4** — open, see below.

**The three mandated sub-skill audits were not run, and not recorded as not-run.** This is my finding,
not 07's. `grep -ri "readability-audit|final-check|ai-detector"` across all seven artefacts returns
**zero matches**. `SKILL.md` §Stage 7 and `references/verification.md` §2 and §3 require all three.
`kb/mistakes-log.md` **#14** exists for exactly this failure and its guard reads: *"Stage 7's
delegation prompt must enumerate every required check (the three skill-audits by name) and the
verifier must report each as run-or-not; a GREEN with any required check absent is a FAIL."* This is
the **third consecutive occurrence** — `cpd-building-tas` (not run as separate skills),
`white-card-tas` (skipped by the first subagent, bolted on afterwards), and now `white-card-wa` (not
run, not named, not disclosed). The audit is thorough and honest about what it *did* check; it is
silent about a third of what it was required to check, which is #14's exact shape. In both prior runs
the audits, once run, found a real defect the structural pass had missed.

**B4 is open in the delivered artefact, and I confirmed it independently.** Two image slots render as
visible FPO placeholders on an `index,follow` page that is in `sitemap-0.xml`. The rendered text is
not hidden: `class="ph r54"` in the hero and `class="ph r45"` at `#assessment`, each printing
**"Image placeholder"**, the full art-direction sentence, and the spec string — `4:5 · warm tone ·
~1000×1250` and `4:5 · warm tone · ~520×650`. Internal production metadata as reader-facing body copy
on the page's highest-value real estate. Sibling evidence that this is a gap, not the house standard:
`white-card-tas` 0 placeholders, `qld-owner-builder-course` 0, `wa-owner-builder-course` 0; this page
is 2 of 2. Correctly gated against deploy rather than waved through.

**Cutover gates I re-verified in `dist/`:** `/payment` does not exist in the asset set, so **all four
CTAs are dead on the preview Worker** (F16); `/white-card` does not exist and is `BreadcrumbList`
position 2 plus 2 more chrome links (F5); `/terms`, `/privacy`, `/about`, `/contact`, `/faq` all
absent, and `/terms` is ASQA disclosure location 7 (F10). `robots.txt` is four lines with `Allow: /`
and **no `Disallow` at all**, against `verification.md` §1e requiring `/course/` and `/program/`
blocked (F20).

### 3 · `inside_effort_budget` — **green**

Artefact mtimes run `01` 14:26 → `07` 15:08 UTC: **~42 minutes** from source map to closed
verification, including a full blocker-fix pass. Compare `wa-owner-builder-course` at 103 minutes
(14:05 → 15:48). One commit, one source rewrite (`white-card-wa.mdx` 15:06:36), one rebuild
(`index.html` 15:06:44), `07` closed 15:08:42 — the `check-pipeline` §4 ordering gate is satisfied by
8 seconds and by construction, not by luck. Seven artefacts, 1,598 lines, no thrash, no bisecting, no
abandoned direction. There is no evidence of wasted motion anywhere in the run.

### 4 · `low_rework` — **amber**

One post-build fix-and-rebuild pass covering **eight** distinct items: three blockers (B1 ×4 CTAs, B2
×2 capsules, B3), plus five lesser fixes the audit tables record as FIXED — in-page nav coverage
7/8 → 8/8 (`#content-review` was unlinked), meta title **68 → 52 chars**, a CanCant "may not need"
column padded from **2 items to 3** against the 3-7 rule, and an adjacent-section overlap where
`#cost` restated `#assessment`'s three-clause price argument almost verbatim and the paragraph was
cut. Every one of those is a fix to work the pipeline had already produced.

Against that: the rework was **one pass, not a loop**, every fix was re-measured in `dist/` rather
than asserted, and the eight fixes shipped in a single rebuild. Amber, not red.

Also charged here: a **session-type boundary was crossed**. `src/components/SiteHeader.astro` is
`design`-owned per CLAUDE.md, and a `build` session edited it (the `WA` megamenu card from
`soon: true` to `href: '/white-card-wa'`) because the orphan guardrail fails a build with no nav link
to the new page. Done with the user's explicit approval and disclosed in the commit message, so it is
friction rather than a violation — see the demand list for why the model needs the boundary clarified
rather than the session needing a telling-off.

### 5 · `taught_us_something` — **green**, and this is the strongest Stage 2 of the four runs

**It reframed the page's job on evidence.** 0.33% CTR at position 9.04 against a ~2% published curve
for position 9 = roughly **670 clicks lost over 16 months**. It then made that mechanical: filtering
the page-filtered export to top-ten position, ≥80 impressions and zero clicks returned **ten rows,
2,455 impressions, zero clicks**. Conclusion — *"a page that ranks sixth and is never clicked is not
being out-ranked, it is being out-answered in the snippet"* — and the priority order changed
accordingly.

**The transferable finding.** Eight queries carrying the RTO partner's name draw **2,460 impressions
and 2 clicks at average position ~6.5 — a 0.08% CTR**. People search "blue dog white card", find ABE
Education in the top ten, and do not click, because nothing in the snippet connects the two. That
turns an ASQA compliance obligation (name the RTO partner) into the highest-value SEO change on the
page, and it generalises to every asqa-accredited page ABE Education will build. It is why
`partnerRto.placement` moved to `after-hero` and why the `<title>` is *"White Card WA Online - Blue
Dog Training (RTO 31193)"* — 52 chars, measured.

**It escalated a commercial finding instead of writing around it.** ABE at $99 against a $44 SERP
leader with 831 clicks is a 2.25× premium on a commodity query. §5 states plainly that the page
**cannot win on price and must not try**, forbids implying a competitor's self-paced card is invalid
(and the built page states the opposite twice, unprompted — I checked), and flags the pricing question
upward as Andrey's call rather than a copy problem.

**Three reusable defects found in the tooling and the fact store**, each routed rather than
quietly patched from a build session: `check-claims` has no model for a zero-fee jurisdiction and will
recur on every WA and QLD White Card page; the register's "WA residents" paraphrase is looser than the
regulator's "located in WA at the time of assessment" test (the page uses the regulator's); and the
competitor-pricing register classes ABE's WA product as commodity self-paced when it carries a live
trainer assessment.

---

## What worked

- **Every measured value in `07-verification.md` reproduces.** I re-extracted all nine answer capsules
  from `dist/`: **45 / 52 / 53 / 43 / 53 / 53 / 19 / 52 / 55** words — identical to 07's table, all
  eight section capsules inside 40-60, the only sub-40 the TrustBand tagline 07 honestly marks as not
  a section capsule. Marker sequence `01,02,03,04,05,06,07,08` clean. H1 = 1, H2 = 11. Title 52 chars,
  description 157. This is the second consecutive run where the Stage-7 numbers survive independent
  re-measurement, and it is the thing run 1 was graded down for lacking.
- **The independent Stage-7 subagent earned its place for the third run running.** It found four
  blockers the author did not, including one against an explicit written rule. Whatever else this
  review says, that pattern is now established evidence: the author of the copy cannot see the copy.
- **The adjudication of the `check-claims` WARN is exemplary.** It quotes the warning verbatim, reads
  the checker's source (`check-claims.mjs:229`), identifies the mechanism, reconciles by hand, states
  that the total is therefore machine-unreconciled and that the audit is the only thing that checked
  it, and routes the fix. That is `cpd-building-tas`'s "warnings read as a clean bill" failure fully
  closed — and it was **pre-flagged at Stage 5** (deviation 8) before Stage 7 saw it.
- **WA was built as WA, not as Tasmania with the state name swapped.** No lodgement Stepper (WA has no
  lodgement), `FactGrid` instead (the facts are parallel, not sequential), `courseWorkload` stated
  because a measured figure exists, `ZSection` moved from `your-card` to `assessment` because that is
  the section carrying the $99. Each deviation reasoned and recorded in `05`.
- **The regulator's six-item evidence list is published in full**, which no competitor in the top-15
  SERP does, and the location-vs-residency distinction is stated rather than glossed — including in
  the `CanCant` "you may not need this" column and a dedicated FAQ, so a reader who would be sold a
  course they cannot use is told before they pay.

## What did not

1. **The banned CTA shipped ×4.** Covered above. The rule was written, the page ignored it, and only a
   late audit caught it — on five other built pages, nothing has caught it at all.
2. **The three mandated sub-skill audits are absent from the record entirely.** Third consecutive
   occurrence, against a guard written to prevent it. Worse than `white-card-tas`'s version, where the
   omission was at least disclosed once noticed.
3. **The R4 parity gate was deferred to Stage 7 and Stage 7 never ran it.** `02-gap.md` §6 defines a
   26-query mechanical coverage gate and closes: *"Confirm at ship (Stage 7)."* `07` contains no
   query-coverage section. I spot-checked the weakest claim and it does not hold: §6 maps rows 4, 7
   and 11 ("white card perth online", "white card online perth", "white card perth" — **690
   impressions**) to "`#online` + locality", and §7 gap 8 calls Perth *"the biggest single ranking
   upside on the page"* at position 29.36 against 1,900/mo. **"Perth" appears twice in the built
   page**: once inside the FPO placeholder's art-direction string (which disappears the moment the
   image lands), and once in a sentence using Perth as the *counter*-example — *"Someone who lives in
   Perth but sits the assessment while away working interstate does not meet the condition."* No
   regional towns. The single highest-upside opportunity Stage 2 identified was not delivered, and
   the gate that would have caught it was defined and then skipped.
4. **B4 — two FPO placeholders on an indexable page**, printing internal art direction as body copy.
   Confirmed independently; correctly gated against deploy.
5. **`PartnerDisclosure` at `after-hero` emits an H3 before the first H2** (F1). I confirmed the
   rendered order is `h1 → h3 → h2 …`. WCAG 1.3.1. This is the exact untested-position risk `05`
   flagged before the build — the flag was right and the position shipped anyway.
6. **Sitewide chrome defects rode along unfixed**: `tel:(07)33316000` is a malformed tel URI (should be
   `tel:+61733316000`), `<a href="#">Login</a>` ×2 is a dead anchor, the logo `<img alt="">` has no
   `aria-hidden`, and the same training.gov.au URL appears in two casings on one page
   (`/Organisation/Details/` ×2 and `/organisation/details/` ×4). All confirmed in `dist/`.

---

## Demand list
Tag every item: [skills] | [design] | [facts]

**Restructure triggers (ROADMAP rule 3) — second-or-later occurrence:**

- [skills] **THIRD OCCURRENCE — Stage 7 did not run, name or disclose the three mandated sub-skill
  audits.** Zero matches for `readability-audit`, `final-check` or `ai-detector` across all seven
  artefacts. Prior: `cpd-building-tas` (claimed inline, was not), `white-card-tas` (skipped, bolted on
  after). mistakes-log #14's guard is prose and has now failed three times, which is the same
  meta-lesson as #18: **a lesson recorded as prose is not a method change.** Make it mechanical —
  `check-pipeline.mjs` FAILs a slug whose `07` does not contain a row for each of the three named
  audits with an explicit run/not-run disposition.
- [skills] **SECOND OCCURRENCE — `becomeSteps` is required by `content.config.ts` and meaningless
  outside owner builder.** Filed by `white-card-tas`; stubbed `[]` again here (`05` deviation 6 marks
  it as the trigger itself). Make the field optional. Owned by `skills`, per the 25 Jul assignment of
  `src/content.config.ts`.
- [skills] **SECOND OCCURRENCE — the archetype-2 ASQA branch under-renders its own core section.**
  `CourseLayout`'s `rto-partner` PartnerDisclosure carries no H2, capsule or sources, so archetype 2's
  defining trust section must be hand-built as a separate `#real`. Filed by `white-card-tas`, repeated
  verbatim here (`05` deviation 1). Either render it properly or make the split a prescribed pattern.
- [design] **SECOND OCCURRENCE (new shape) — `PartnerDisclosure` needs a heading-level prop.** At
  `after-hero` it emits an H3 as the first heading after the H1 (measured: `h1 → h3 → h2`), skipping a
  level. The `after-hero` placement is evidence-led and should stay; the heading level should follow
  the position.
- [skills] **Image slots left as FPO in a build declared ready (second sighting).** `cpd-building-tas`
  shipped three placeholders with no Stage-6 prompts; this run has prompts and filenames ready but
  still built an indexable page whose hero prints "Image placeholder · 4:5 · warm tone · ~1000×1250".
  Guard: fail the build when an `index,follow` page contains a `.ph` placeholder, or render the spec
  string only outside production.

**First occurrences:**

- [skills] **"Enrol now" needs a build guardrail, not an audit row.** Named hard-blocker in
  `verification.md` §1f and its publish-blocker list and in `SKILL.md`; shipped ×4 here and **still
  live on 5 other built pages**. A one-line regex in `guardrails.ts` closes it permanently.
- [skills] **The R4 query-coverage gate is defined at Stage 2 and enforced nowhere.** `02` §6 says
  "confirm at ship (Stage 7)"; `07` has no such section, and the Perth cluster (690 impressions,
  position 29.4) reached the page only as a counter-example and an FPO string. Either Stage 7 gains a
  required coverage table or `check-pipeline` reads §6 and checks the page for each covered-by target.
- [skills] **`check-claims.mjs:229` has no model for a zero-fee jurisdiction.** WA's fee is the word
  "None" in the register, so `$0.00` matches nothing and `govRows.length === 0`. The WA total is
  machine-unreconciled and will be on every WA and QLD White Card page. Teach the checker that a
  register entry of "None" licenses a `$0.00` row.
- [skills] **`/payment` is indexed and does not exist in the built asset set.** GSC shows 102
  impressions at position 63.42 for the WA checkout URL — a bare form exposed to searchers, splitting
  crawl signals. Separately, all four CTAs on this page resolve to a path with no asset and no
  `_redirects` rule, so on the preview Worker every conversion path is dead. Needs a robots rule *and*
  an origin confirmation before Stage 8.
- [skills] **`robots.txt` emits no `Disallow`.** `verification.md` §1e requires `/course/` and
  `/program/` blocked; the shipped file is `User-agent: * / Allow: / / Sitemap:`.
- [skills] **`Course.provider` is ABE Education while `Course.creator` is the RTO.** Not a rule breach
  as written, and it is the one place the authority split is not mirrored in structured data. Needs a
  documented decision in `asqa-disclosure-framework.md`, not a per-run judgement.
- [skills] **ASQA disclosure location 3 renders paragraph 1 of the template and not paragraph 2.** The
  substance appears five times elsewhere so it is not a compliance hole, but it should be a conscious
  call recorded in the framework.
- [skills] **The GSC export path in CLAUDE.md is wrong.** Documented as `data/GSC/`; actually
  `business data/GSC/`, with `data/` holding only `health-log.jsonl`. A run following the documented
  path finds nothing and concludes no export exists — which nearly happened here. mistakes-log #1
  family, 8th sighting.
- [skills] **Session types: a build session must edit design-owned `SiteHeader.astro` to ship any new
  page.** The orphan guardrail fails a build with no nav link, and the nav is design-owned. This is
  not a one-off — it is true of every page the pipeline will ever build. The model needs the boundary
  named: either the nav entry is declared build-owned (a data edit, not a design change), or the
  orphan guardrail accepts a declared-pending page, or page builds hand the nav entry to a design
  session and block on it. Silently crossing with per-run approval is the worst of the three.
- [design] **Sitewide chrome, all measured in `dist/`:** `tel:(07)33316000` is malformed (should be
  `tel:+61733316000`); `<a href="#">Login</a>` ×2 is a dead anchor; logo `<img alt="">` lacks
  `aria-hidden`; the same training.gov.au URL is emitted in two casings on one page.
- [design] **`ExpertCredentials developerRto` duplicates the PartnerDisclosure blurb, email, phone and
  verify link verbatim**, and the `after-hero` move put the two ~8 screens apart instead of adjacent.
- [skills] **`#real`'s micro-CTA precedes its verification block** (inverting `verification.md` §1c)
  and points at `#online` while the section's own "Next" wayfinder points at `#need-one`.
- [facts] **`online-delivery-policy-by-state.md` line 23 says "WA residents".** WorkSafe WA's test is
  *located in WA at the time of assessment* — not the same test, and the difference decides whether a
  buyer can use the course. The page uses the regulator's wording; the register should too.
- [facts] **`competitor-pricing-snapshot.md` §2, WA row, classes ABE's WA product as commodity
  self-paced.** It carries a live 15-to-30-minute trainer assessment, which the same file says drives
  the $99-$150 QLD/ACT band. The row needs a delivery-mode note, or the next run reads a 2.25×
  premium where there is a peer-set difference.

---

## Output — every Amber or Red needs at least one

- [ ] Fix applied — none by this grader; the review is the artefact, and three of the four blockers
      were already fixed and re-measured inside the run.
- [ ] Memory written — for the run owner, not the grader. Candidate: *a rule that only a Stage-7 audit
      enforces is a rule pages ship without — "Enrol now" is banned by name in two skill files and is
      live on five built pages.* Deliberately **not** memory: the zero-fee checker gap, the register
      wording divergence and the Perth coverage miss, all of which are repo-owned by this review,
      `kb/register/` and the demand list.
- [x] Skill-change spec for the improvement pass (below)
- [x] `kb/mistakes-log.md` entry added or incremented (below)

**Skill-change spec.**

1. **Make the sub-skill audits mechanical.** `07-verification.md` must carry a row for each of
   `abe-readability-audit`, `final-check` and `ai-detector` with an explicit run/not-run disposition,
   and `check-pipeline.mjs` FAILs a slug whose `07` lacks any of the three. Three runs have now proved
   the prose requirement does not hold.
2. **Move the banned-CTA check from the audit checklist into `guardrails.ts`** so it fails the build,
   and sweep the five pages currently carrying it.
3. **Give the R4 gate an enforcement point.** Stage 7 gains a required query-coverage table derived
   from `02` §6, listing each query and the heading, capsule or body string that covers it — measured
   in `dist/`, not asserted.
4. **Teach `check-claims.mjs` about zero-fee jurisdictions** — a register entry of "None" for a state's
   government fee licenses a `$0.00` row and makes the total reconcilable.
5. **Fail an `index,follow` build that contains an FPO placeholder**, or suppress the spec string
   outside dev. Internal art direction must not be reader-facing on an indexable page.
6. **Name the nav-entry boundary in the session-types table** so a page build does not have to cross
   into `design` by hand every time.
7. **Make `becomeSteps` optional** in `src/content.config.ts` (second occurrence, trigger fired), and
   resolve the archetype-2 PartnerDisclosure split one way or the other (second occurrence, trigger
   fired).

**`kb/mistakes-log.md`.**

- **#14 → times seen 3, last seen 2026-07-28.** Its guard has now failed on three consecutive runs and
  the failure mode has worsened: `white-card-tas` skipped the audits and disclosed it; `white-card-wa`
  does not mention them at all. Add the mechanical guard from spec item 1 to the entry, because the
  prose guard is demonstrably not one.
- **#1 → times seen 8, last seen 2026-07-28.** Documentation drifted from the code again: CLAUDE.md
  and the GSC memory entry both say `data/GSC/`, the export lives in `business data/GSC/`.
- **New entry.** *"A CTA banned by name in two skill files shipped on all four CTAs of a built page,
  and is still live on five other built pages — because the ban is enforced only by a Stage-7 audit
  checklist and by no build check."* Guard: a rule stated as a publish hard-blocker is implemented as
  a build guardrail in the same change that states it; a hard-blocker with no mechanical enforcement
  is a preference with strong wording.
- **New entry (candidate, first sighting).** *"A gate was defined at Stage 2, deferred to Stage 7 in
  writing, and never run — the R4 query-coverage gate named 26 queries and their covering sections,
  and the single highest-upside cluster it identified (Perth, 690 impressions, position 29.4) reached
  the page only as a counter-example."* Guard: a deferred check names the artefact that will run it,
  and the receiving stage fails if the row is absent.

---

## Outcome target

**The outcome block is omitted from the frontmatter, per the template's own instruction** (*"omit the
whole block for a run that did not deploy"*) and consistent with the two prior non-deploying reviews,
which `review-trends.mjs` parses without complaint. **This page has not deployed** — production
deploys are human-triggered, and this run is additionally gated on B4 (two generated images) and F16
(`/payment` confirmed at the deploy origin). `deploy_date` is therefore blank and the two review dates
cannot be computed yet.

Paste this into the frontmatter at deploy, filling the three dates:

```yaml
outcome:
  primary_keyword: "white card wa"
  secondary_keywords: ["white card wa online", "online white card wa", "white card online wa", "wa white card online", "wa white card", "white card western australia", "white card perth", "white card perth online", "blue dog white card", "blue dog training white card", "best online white card course wa", "white card wa cost", "white card check wa", "how to get white card wa"]
  target: "lift CTR on the Blue Dog brand cluster (2,460 impr, 2 clicks, 0.08% CTR at pos ~6.5) above 1.5%, and lift page CTR from 0.33% toward 1.5% at pos ~9, within 12 weeks; secondary — move 'white card perth' (1,900/mo, pos 29.36) into the top 15"
  live_url: "https://www.abeeducation.edu.au/white-card-wa"
  deploy_date:      # blank — not deployed
  review_4week:     # deploy + 28 days
  review_12week:    # deploy + 84 days
  result_4week: ""
  result_12week: ""
```

Note for the 4-week review: the primary success measure on this page is **CTR at unchanged position**,
not position. Stage 2's whole finding is that the ranking is fine and the snippet is not. A review that
reads position and declares no change will miss what this rebuild was for.

---

## Grader note

`graded_by: independent`. Graded from the seven pipeline artefacts, `dist/white-card-wa/index.html`,
`src/content/courses/white-card-wa.mdx`, `src/data/faqs-white-card-wa.ts`,
`kb/register/state-fees-register.md`, `kb/mistakes-log.md`, `ROADMAP.md`, `CLAUDE.md`,
`.claude/skills/abe-course-page-astro/SKILL.md` and `references/verification.md`, the three prior
reviews, `git show --stat HEAD` and the full `SiteHeader.astro` diff, and live runs of
`check-claims.mjs` and `system-health.mjs`. No account of the run from the agent that did it.

**Re-measured myself rather than taken from `07`:** the full JSON-LD `@graph` parsed (Person count and
jobTitle, `Course.creator`, `recognizedBy`, `offers.price`, breadcrumb items); `CPCCWHS1001` = 0 /
`CPCWHS1001` = 23; `13.72` = 0 and `Service Tasmania` = 0; all nine capsule word counts
(45/52/53/43/53/53/19/52/55); marker sequence; H1/H2/H3 counts and rendered heading order; title 52 /
description 157 chars; canonical slash-less; `Enrol now` = 0 on this page and present on five others;
`data-authority`; `AggregateRating` = 0; bare `ABE` = 2 in context; the two `.ph` placeholder blocks
with their rendered spec strings; every non-anchor `href` on the page and which of them exist in
`dist/`; `robots.txt`; sitemap membership; the `check-claims` WA total WARN; the `state-fees-register`
WA row; and the absence of all three sub-skill audit names across the artefacts.

**Metrics.** `turns_to_passed_audit` is left **empty**, consistent with all three prior reviews: the
artefacts carry mtimes (14:26 → 15:08 UTC) but no turn count, and an independent grader has no
transcript. Filling it would put an invented number in the trend report.

`manual_fix_passes` is **1** — one fix-and-rebuild pass after a built artefact existed, covering the
three fixable blockers plus five lesser fixes, with `white-card-tas`'s convention (a fix + rebuild
following Stage 7 counts as 1) applied. I note the tension: `cpd-building-tas` counted its seven
Stage-7 fixes as **0** on the grounds that the skill had not yet said "done", and by that reading this
run is also 0. **Either way the number under-reports the truth** — the metric cannot distinguish a run
with zero rework from a run that reworked eight items inside its own gate, which is itself worth a
demand item if the trend is to mean anything. The weight is carried by
`passed_gates_first_time: red`, not by this integer.

`gate_fails_after_handoff` is **1** — the R4 query-coverage gate, defined at Stage 2, deferred to
Stage 7 in writing and never run, with the Perth cluster (690 impressions across three R4 rows,
position 29.4) absent from body copy as a result. I found it after the run closed; no artefact records
it. The `check-claims` WARN is **not** counted, because `07` found, quoted, adjudicated and routed it
before handoff, and I only reproduced it. B4 is not counted either — it is disclosed, open by design,
and explicitly gates the deploy.

**Why `correct_and_safe` is green rather than amber.** Every load-bearing regulatory claim on the
built page traces to a dated primary source, the asqa authority model is exactly right in structured
data, no Tasmanian fact crossed the border, the zero-fee row is honest and reconciles by hand against
the register, and two facts are recorded as unknown rather than defaulted. The one dangerous claim
(the cross-jurisdiction "only two states") was authored, built, and then removed by this pipeline's own
pre-deploy gate before any deploy and without touching `kb/register/`. That is a gate working, and
charging it to the correctness score would make a successful gate look like a failure. It is charged
to `passed_gates_first_time`, which is red.
