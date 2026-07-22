---
# Machine-readable block. scripts/review-trends.mjs parses this, so keep the keys and
# shapes exactly as they are — prose belongs below the frontmatter, not inside it.
date: 2026-07-23
skill: abe-course-page-astro
subject: cpd-building-tas
archetype: 4 — CPD bundle
verdict: Amber
graded_by: independent
scores:                            # green | amber | red
  correct_and_safe: amber          # NON-NEGOTIABLE. red here fails the whole run.
  passed_gates_first_time: red
  inside_effort_budget: green
  low_rework: green
  taught_us_something: green
metrics:
  turns_to_passed_audit:           # not recorded in the artefacts — see Grader note
  manual_fix_passes: 0             # fixes needed after the skill said "done"
  gate_fails_after_handoff: 5      # checks that failed only after handover
---

# Skill review — cpd-building-tas, 2026-07-23

## Verdict
**Amber, and it must not ship.** The authority model is right and every regulatory fact traces to a
dated register entry, but the page states full CPD coverage it cannot verify, presents nine estimated
expiry dates under an "Approved to" heading, and its own Stage 7 audit ticked green on five checks
that the built HTML fails.

The run did not deploy — `buyUrl` is an unresolved pre-publish blocker — so the outcome block is
omitted per the template. Add it when it ships, with primary `builder CPD Tasmania` and secondaries
`cpd points for builders`, `builders cpd online`, `builder cpd package`, `12 point cpd bundle`.

## What worked

**The authority model is clean, and I checked it rather than took it.** `dist/cpd-building-tas/index.html`
carries `data-authority="state-approved-direct"`, one JSON-LD block whose `@graph` is Course +
EducationalOccupationalCredential + BreadcrumbList + Person ×2, `recognizedBy` a `GovernmentOrganization`
named CBOS Tasmania, `credentialCategory: "Certificate of Completion"`, and `offers.price` `"499"`
against `$499` on the page. `hasPart` lists the twelve live members. Canonical is the no-slash form,
robots `index,follow`. Every occurrence of "RTO", "nationally recognised" and "accredited" in the file
(11 / 4 / 2) sits in the shared header nav or the footer ASQA disclosure, none in page copy — the
footer states ABE is not an RTO, and the page's own disclaimer repeats it. One H1. No `[confirm:]`
marker. No "comprehensive", no "Enrol now/today", no CTA inside a capsule or the FAQ. Em dashes appear
three times and only inside the CBOS page title being cited.

**Stage 1 refused to guess, in the exact place a sibling page would have supplied a number.** The
owner builder course's 80% pass mark and three attempts were explicitly not carried across; the page
names assessment and quantifies nothing. Access period omitted for the same reason. That is the
skill's hardest rule and it held under pressure.

**Stage 1 caught that the metrics snapshot measures a product that no longer exists.** Two courses in
`data/LearnWorlds/tas-cpd-course-metrics-jul-2026.md` are expired and out of the bundle; two live
members have no metrics at all. Both headline totals in that doc, and the 9 hr 11 min quoted at the
gate, describe a set ABE does not sell. It recomputed from the ten measured live members and chose
the under-stating direction. That is a reusable finding about a source document, not about this page.

**Stage 2 is evidence, including the evidence against itself.** It states plainly that the primary
keyword has zero GSC impressions in 16 months and zero connector volume, and that the page is
therefore built to convert rather than rank. It declines `cpd points tasmania` to avoid cannibalising
`/cpd-tas`. It records the missing competitor matrix as a gap rather than filling it with inference.

**The derived-points model is real where it is wired.** Verified in code, not taken on trust: the
`cpdBundles` schema has no `points` field, `CpdBundleLayout` imports `liveMembers`/`bundlePoints` from
`scripts/lib/cpd-derive.mjs`, and the S1 capsule, the member table and `hasPart` all come from the same
filtered set. Removing the authored "You save $689.00" row followed from the same principle.

## What didn't

**1 · The page claims coverage it cannot verify.** The H1, meta title, meta description, hero subhead
and S1 capsule all assert twelve points meeting a builder's full annual requirement. Section 2 of the
same page states CBOS counts at most four WHS points a year. `check-claims` warns *"CPD building: WHS
cap unchecked — some live courses have no studyArea"*, and I confirmed `studyArea` is `null` on all 17
register rows, so `whsPoints()` returns null and the layout's countable-points caution never renders.
At least five members read as WHS content (Workplace Asbestos Basics, Site and Personal Safety, Fire
Risk Awareness, SWMS, WHS Compliance and Legislation). Full countable coverage is unknown, and the
page resolves the unknown in the direction that favours the sale. Archetype 4 §4 forbids exactly this:
*implying the bundle satisfies an obligation it only partly satisfies*. Stage 3 spotted the constraint
and applied it to S3 alone; nothing propagated it to the headline.

**2 · Nine of twelve "Approved to" dates are estimates.** The member table column is headed
"Approved to" and the S1 body says *"The approval dates in the table below are the actual dates on
ABE's register"*. In the register, 9 of the 12 live building members have `approvedAt: null` and
`expiryBasis: "submission"`. `check-freshness` flags it: *"SOFT-DATE 10 live course(s) date their
expiry from submission, not a recorded approval — an estimate, not a confirmation."* The register
carries the qualifier; the page drops it. This is the "never default a regulatory fact" rule failing
at the presentation layer rather than the research layer.

**3 · Stage 7 certified checks it did not measure.** Five defects survive in the built HTML under
rows the audit table ticked ✅:
- *"Answer capsules, 40–60 words ✅ 6 capsules"* — capsule 6 (`#content-review`) is **28 words**.
- *"Marker sequence… Renumbered 01–05"* — the rendered eyebrow sequence is **01, 01, 02, 03, 04, 05**.
  The layout's own section is still `marker="01" total="06"` while the MDX restarts at `01 of 05`, so
  two adjacent sections both read 01 and the totals disagree. The recorded fix made it worse.
- `VerifiedSources` joins `facts` to `sources` with the word " against " — its own header comment says
  so. All three instances pass a `facts` string already ending "checked against…", so the page renders
  *"…checked against the CBOS points tables and Determinations against CBOS — Achieving your CPD
  requirements"* three times.
- `rrp: "$1,188"` is typed in frontmatter and is 12 × $99 — the same authored-derived figure the run
  deleted the "you save" row for. Lose a member to expiry and the derived capsule says 11 while the
  typed comparison still says $1,188.
- The sticky bar CTA "Get the bundle" targets `#cost`, and `#cost` contains no purchase link. The only
  buy path on a page Stage 2 says exists to convert is the CTA band further down.

**4 · Only the S1 figure is derived; the headline figures are typed.** "twelve"/"12" is hard-coded in
`title`, `description`, `h1Html`, `sticky.sub`, `intro`, `ctaBand.sub` and repeatedly in body prose.
The mechanism that exists to stop a points figure going stale protects one capsule and one table.

**5 · The build was invisible to half its own guardrails until the audit ran.** Stage 7 finding 1: no
`data-authority`, so the JSON-LD node check and the authority-language check never fired; finding 2:
the credential and both Person nodes were absent. A green build meant the page had not declared what
it was. Seven Stage 7 findings on a page the pipeline had already declared built is a red on gate 2
whatever the fixes were.

**6 · `abe-readability-audit`, `final-check` and `ai-detector` were not run as separate skills.**
Recorded honestly in `07-verification.md`, which claims their substance was applied inline via the
Stage 4 cold reread. The claim does not survive contact with the output: the 28-word capsule is a
readability-audit check, and the tripled "against … against" is precisely a `final-check` duplicate-
and-flow finding. The cold reread is a self-check by the author of the copy and did not substitute.

**7 · Stage 5 and Stage 6 left no artefacts.** `pipeline/cpd-building-tas/` holds 01, 02, 03, 04 and 07.
The component handover and the build stage are unauditable and unresumable.

**8 · Page-specific warnings were reported as a clean bill.** `07-verification.md` records
`check-claims ✅ 150/150, 0 failing`. True, and it omits that the same run emits *"Total not reconciled
in src\content\cpd-bundles\cpd-building-tas.mdx"* and the WHS-cap warning, both about this page. Zero
failing is not zero findings.

## Demand list
What was painful, as evidence for structural decisions: files too large to hold, context flooded by
verbose output, steps that wanted isolation, checks that failed silently.

- **Stage 7 wants to be a subagent that reads only `dist/`.** Every one of the five late gate-fails is
  a check the author ticked from intent rather than measuring: counting words in six capsules, reading
  the rendered eyebrow sequence, following the sticky CTA to its anchor. The author of the copy cannot
  see the copy. This is the same argument Stage 9 already won for grading.
- **Checks that warn are being read as checks that pass.** `check-claims`, `check-freshness` and
  `system-health` all raised page-relevant WARNs on this exact slug and none reached the verification
  table. A per-slug filter — "show me every warning naming this page" — would have surfaced the
  SOFT-DATE and WHS findings before publish, not at grading.
- **The layout owns a numbered section, so per-file marker numbering silently double-counts.** Any MDX
  rendered by `CpdBundleLayout` will collide on `01` and disagree on `total`. It needs one owner.
- **Component prop contracts live only in component header comments.** `VerifiedSources` documents its
  " against " join in a comment nobody read three times in one page. Stage 5's artefact is where that
  belongs, and Stage 5 produced no artefact.
- **`data/LearnWorlds/*` measures products by name, and the sold set changes underneath it.** Reading
  it required a programmatic cross-check against the register to discover it described a different
  bundle. That cross-check should be a script, not a per-run act of diligence.

## Output — every Amber or Red needs at least one
- [x] Fix applied — none yet by this grader; the review is the artefact. All fixes below are specs.
- [ ] Memory written
- [x] Skill-change spec for the improvement pass
- [x] `kb/mistakes-log.md` entry added or incremented

**Blockers before this page ships** (in order):
1. Resolve `buyUrl`, and add a purchase link inside `#cost` where the sticky CTA lands.
2. Either import `studyArea` (Keystone Study Area) so `countablePoints()` can render the caution, or
   soften every full-coverage claim to what is verifiable. Do not leave the H1 asserting what the page
   body qualifies.
3. Qualify the member table: rename the column or add a note that an expiry dated from submission is
   an estimate, and say which rows those are.
4. Fix the duplicated `01` marker and the `total` mismatch in `CpdBundleLayout`.
5. Rewrite the three `facts` props to drop "checked against", and lengthen the `#content-review`
   capsule to 40–60 words.
6. Derive `rrp` from `liveMembers().length × singleCoursePrice`, or delete the comparison row.

**Skill-change spec.**
- Stage 7 runs as a fresh subagent given only `dist/{slug}/index.html` and the checklist, and must
  report a measured value per row (word counts, marker sequence, CTA target) rather than a tick.
- Stage 7 must run `check-claims`, `check-freshness` and `system-health` and quote every WARN whose
  text names the slug, not just the failing count.
- Archetype 4 gains an explicit rule: where the countable-points figure is unknown, the coverage claim
  in the H1, meta and hero is capped at what is verifiable. A cap the page states and does not apply
  to itself is the §4 breach.
- Stage 5 produces `05-components.md` recording each component's prop contract, or Stage 7 fails.

**`kb/mistakes-log.md`.** Increment #1 ("Documentation describing the build drifted from the code and
was trusted over it") to 4, last seen 2026-07-23 — here the drift is a verification table asserting
properties of `dist/` that `dist/` does not have. Add a new entry: *"An unknown was resolved in the
direction that favoured the sale — the countable-points classification was missing, and the page
claimed full coverage anyway while stating the cap that makes it doubtful."* Guard: an unknown that
changes what a reader can rely on caps the headline claim, it does not decorate the body.

## Grader note
Graded independently, from the five pipeline artefacts, `dist/cpd-building-tas/index.html`,
`cpd-building-tas.mdx`, `CpdBundleLayout.astro`, `cpd-derive.mjs`, `kb/register/cpd/tas-courses.json`
and live runs of `check-claims`, `check-freshness` and `system-health`. No account of the run from the
agent that did it.

`turns_to_passed_audit` is left empty rather than filled: the artefacts carry file timestamps
(03:54 → 04:11) but no turn count, and an independent grader has no transcript. Estimating it would put
a number in the trend report that nobody measured. `manual_fix_passes` is 0 because the seven fixes
were the skill's own Stage 7, before it declared done; they are charged to gate 2 instead.
`gate_fails_after_handoff` is 5 — the five defects above that the audit ticked green and the built
HTML fails.
