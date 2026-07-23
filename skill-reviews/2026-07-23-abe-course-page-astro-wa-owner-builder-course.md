---
# Machine-readable block. scripts/review-trends.mjs parses this, so keep the keys and
# shapes exactly as they are — prose belongs below the frontmatter, not inside it.
date: 2026-07-23
skill: abe-course-page-astro
subject: wa-owner-builder-course
archetype: 1 — State-approval course (knowledge-requirement variant)
verdict: Amber
graded_by: independent
scores:                            # green | amber | red
  correct_and_safe: amber          # NON-NEGOTIABLE. red here fails the whole run.
  passed_gates_first_time: red
  inside_effort_budget: green
  low_rework: amber
  taught_us_something: green
metrics:
  turns_to_passed_audit:           # not recorded in the artefacts — see Grader note
  manual_fix_passes: 1             # fixes needed after the skill said "done"
  gate_fails_after_handoff: 1      # checks that failed only after handover
outcome:
  primary_keyword: "owner builder course wa"
  secondary_keywords: ["owner builder course wa online", "wa owner builder course", "owner builder course perth", "owner builders course wa", "owner builder course western australia", "best online owner builder course wa", "owner builder licence wa", "owner builder permit wa", "form 75 owner builder"]
  target: "hold 5.19% CTR at pos ~3.4 on the primary term, and lift the licence/permit/Form-75 recovery cluster (~1,000 impr/mo at ~0% CTR) above 2% within 12 weeks"
  live_url: "https://www.abeeducation.edu.au/wa-owner-builder-course"
  deploy_date: 2026-07-23
  review_4week: 2026-08-20
  review_12week: 2026-10-15
  result_4week: ""                 # filled at the 4-week review
  result_12week: ""
---

# Skill review — wa-owner-builder-course, 2026-07-23

## Verdict
**Amber.** The page that is live is the most accurate of the three evidence runs, and the
knowledge-requirement authority model — the last untested one — is verifiably right: I re-measured it in
`dist/` and found **zero** occurrences of `recognizedBy` anywhere in the document, a credential node whose
keys are exactly `@type, @id, name, credentialCategory`, and every "licence", "permit" and "WA-approved"
string on the page an explicit denial or an explanation. The run also did the single most valuable thing
any of the three runs has done: it read the **primary instrument** (Form 75), and thereby corrected two
published facts that *overstated a restriction on the reader* and added the four knowledge pathways,
telling registered practitioners to **buy nothing here**.

The Amber sits on how that result was reached. Four times in one run this pipeline asserted something
checkable without checking it — twice reaching a proposed change to a LIVE, indexed page carrying 883
clicks and 35,358 impressions a month — and none of the four was stopped by a check. And the run deployed
to that page **twice before its own pre-deploy verification stage existed**: `17f89e3` at 14:09 and
`d66a4a7` at 15:03, with `07-verification.md` written at 15:48 and still uncommitted at grading. One
defect reached production as a result (the page contradicted itself on the date of its own currency
review for roughly 54 minutes), and it is exactly the defect a pre-deploy gate exists to catch.

## What worked

**The authority model is right, and I checked it rather than took Stage 7's word.** In
`dist/wa-owner-builder-course/index.html`: `lang="en-AU" data-authority="knowledge-requirement"`; one
server-rendered `@graph` of Course + EducationalOccupationalCredential + BreadcrumbList + Person ×2;
`recognizedBy` count **0** across the whole document, against QLD/TAS/ACT which each carry their
regulator — so the omission is targeted, not a broken template. `offers.price` `"179"` against `$179`
fifteen times in visible text, every one the same figure. Three `WA-approved` hits, read in context, are
all denials (*"there is no accredited or WA-approved version of the course"*). Every `permit` refers to
the council building permit or is a denial; every `licence` is a denial, an explanation of why people
search the wrong word, or the adjectival `licensed trades`. ABE is stated not to be an RTO three times.
Person ×2 with Dominic Ogburn as Course Developer is correct on this model, exactly as run 2's fix drew
the line. `CPCWHS1001` ×4, `CPCCWHS1001` ×0. Zero "comprehensive", zero en dashes, 13 em dashes all
inside source-citation labels, zero banned CTAs, zero `[confirm:`.

**Reading the primary instrument beat every secondary source, and produced the run's only unique
finding.** `new site/reference/owner-builder_approval_form75.pdf` was in the repo the whole time. It
confirmed that the six-year clock runs from the **building permit being granted** (so an approval never
used does not bar reapplication — the live page had implied a flat six-year bar and was overstating a
restriction); it **corrected the run's own proposed wording** for the validity branch, where wa.gov.au's
"valid for the duration of the permit, permits run two years" is not the Form's "expires when the
building is complete"; and it produced finding #7, the **four sufficient-knowledge pathways**, which no
secondary source and no competitor carries. The commercially self-defeating copy that followed
(*"You may not need this course at all… buy nothing here and put your registration number on the form
instead"*) is the strongest honesty differentiator on any ABE page.

**Every regulatory figure traces to the register or a cited primary source, and the register was written
back to.** `check-claims` puts this page inside the 150/150 matched set with only ABE's own commercial
prices excluded; `check-freshness` reports 16/16 registers current and names no WA item. The corrected
six-year rule, the Form's three-branch validity rule and the four pathways were all written back to
`state-fees-register.md`, which owns them — no second copy made. The register row now even carries its
own correction note about the false processing-time claim, which is the right way to leave a fact store.

**Stage 7 ran all three mandated skill-audits, and its measured values reproduce.** This is run 2's
signature failure, fixed. §J quotes `audit_static.py` (`FAIL: 0 FLAG: 4`) and `audit_render.py`
(`FAIL: 5 FLAG: 0`) with the interpreter named and the dev server confirmed live; §K works through all
six `final-check` checks; §L is a real `ai-detector` pass with six human-authorship markers cited from
the copy. It triaged both 1:1 white-on-white contrast readings as probe artefacts by walking to the
opaque `.bg-dark` ancestor — and it is right. I re-measured its structural claims independently: 15
`<section>` elements (12 with id) ✔, marker sequence `01…09` ✔, zero H4/H5/H6 ✔, 12 `.capsule` elements
with the exact word counts it reports including the 38-word miss ✔, title 52 chars ✔, description 149
chars ✔, canonical slash-less ✔.

**It reported a target-miss as a FAIL rather than rounding it to a pass.** The `obligations` capsule at
38 words against a 40 floor is recorded as `FAIL (soft)` in §B and carried into §M. I measured it: 38.
That is the discipline run 1 was dinged for lacking.

**It knew what not to touch.** The `<title>` converting at 5.19% in position 3.38 was left alone by
explicit decision while the meta description was rewritten; `03-briefs.md` §3d records nine sections as
audited-and-deliberately-unchanged with a reason each, so a later reader can tell a considered no-change
from an oversight. On a page this valuable that restraint is worth more than a rebuild.

**It abandoned a brief after checking it.** S5 assumed the FAQ answers needed rewriting to be liftable
for People Also Ask; reading them showed they already open *"An approval."* and *"Yes."*. No edit made.
Writing one would have been change for its own sake on live copy.

## What didn't

**1 · Four assertions of a checkable fact without the check — and the pattern survived being written
down.** In one run: (a) the six-month validity called "MISSING on the page" when it was present, in a
section outside the two chunks that had been read; (b) the "around six weeks" processing time called
"unsupported and counter-indicated" — from a regex requiring **digits** against a source that spells the
number in **words** — a finding which would have deleted a true, sourced fact from a live page and which
did write the falsehood into the working copy of `state-fees-register.md`; (c) the FAQ answers assumed
not quotable when they were; (d) the meta description asserted at "154 characters" when it was 171.
(a) and (b) reached proposals. **(b) was caught by Andrey, not by any check.** The damning detail is the
sequence: §H of `01-source-map.md` wrote the lesson *"greps prove presence, never absence"*, and §I
records the same error committed **ninety minutes later**, because the lesson was recorded as prose
rather than as a method change. The run's own conclusion is correct and is the most useful thing it
produced.

**2 · The run deployed twice to a live, indexed page before its pre-deploy verification existed.** File
and commit evidence: `17f89e3` (14:09) shipped MDX content changes with only `01-source-map.md` beside
it — 02, 03 and 04 did not yet exist. `d66a4a7` (15:03) shipped further MDX plus `faqs-wa.ts` with 02,
03 and 04. `05`, `06` and `07` were written at 15:08, 15:08 and 15:48 and are **still untracked** in
`git status` at grading. `07-verification.md` is titled "Pre-deploy verification" and ran 45 minutes
after the last deploy to production. A gate that runs after the thing it gates is not a gate. Everything
07 found — including the 38-word capsule — was by construction found after handoff.

**3 · A defect this run introduced shipped to the live page.** The independent review date was changed
to 20 June 2026 in three places in the MDX and committed, while `src/data/faqs-wa.ts` still read *4 June
2026*. I confirmed it at the commit: `git show 17f89e3` has three "20 June 2026" in the MDX and "4 June
2026" in the FAQ data. For roughly 54 minutes the published page contradicted itself on the date of its
own currency review — on a page whose proposition includes being independently reviewed for currency.
Cause, per `04-content.md` §S7: the date was changed where it was *known* to appear rather than
everywhere it *does* appear, with no repo-wide grep before committing. Same family as #1 — acting on a
partial view of the surface. Fixed in `d66a4a7`; all four occurrences now agree (I verified: 4 hits of
"20 June 2026", 0 of "4 June 2026", across `.mdx`, `.ts` and `.astro`).

**4 · Two of 07's measured values do not reproduce.** 07 states the built file is **75,182 bytes**; it is
**75,272**. 07 states `$179` appears **12 times** in visible text and enumerates twelve locations; I count
**15** (it omits the hero subhead, the `learn`/FAQ mention and the end-CTA strip). Neither is
load-bearing — the load-bearing claim, that every instance is $179 and matches `offers.price`, holds —
but on a report whose whole authority is "no row is a tick", two numbers that do not reproduce matter.
The byte count in particular suggests the file was measured at one point and the report written after a
rebuild.

**5 · The sub-skill review was not filed.** `07-verification.md` §J is headed "MANDATORY AUDIT 1 —
abe-readability-audit" and both its scripts ran, but no `skill-reviews/2026-07-23-abe-readability-audit-
wa-owner-builder-course.md` exists — only the white-card one from run 2. That is mistakes-log **#17**
repeating in its second clause ("every sub-skill invoked in a run files its own review the same session
it runs"), logged one day earlier by the run that logged it.

**6 · Findings were deferred to the grader rather than fixed, on a page that was already live.** Both
carried forward as instructed:
- The **`obligations` answer capsule is 38 words** against the 40-60 target (verified: 38). It is a
  complete standalone answer and the miss is 5%, but it is live and unfixed, and the section it sits in
  was flagged "unchanged".
- **`.price-foot` renders ~172 CPL and `.note` 128-156 CPL at 1280px.** I confirmed the cause in source:
  `global.css` declares `.note{margin-top…;padding…;background…;border…;border-radius:6px;font-size:15px;
  color:var(--ink-3);}` and `.price-foot{font-size:14px;color:var(--slate);margin-top:var(--s-md);}` —
  **neither declares a `max-width`**, so both stretch to the 1144px wrap. Confirmed identical on QLD, TAS
  and ACT. This is a template-level defect on four live pages and the highest-value one-line fix on the
  backlog; the WA page uses five Notes, so it is the page that hurts most.

**7 · One soft content tension shipped, knowingly.** §K1: `obligations` §03 says *"Building permits
themselves are valid for two years"* immediately beside the approval's six-month lapse, which is the
wa.gov.au framing the register explicitly warns against (*"Prefer the Form's wording"*). Both statements
are true and about different instruments; a reader meeting the two-year figure first can carry it across
to the approval. 07 recommended naming the instrument and the fix was not made.

## Demand list
What was painful, as evidence for structural decisions.

1. **Stage 7 must run before the deploy commit, and the pipeline must be able to say so.** Evidence:
   `17f89e3` and `d66a4a7` both changed live page content; `05`/`06`/`07` were authored afterwards and
   remain untracked; the one defect that reached production (the split review date) is precisely what a
   pre-deploy gate catches, and instead Stage 4 caught it after it was live. Concretely: `check-pipeline`
   should FAIL a slug whose page files are newer in `main` than its `07`, and the skill should forbid a
   content commit on a live page until 07 exists. On a greenfield page a late gate costs nothing; on a
   page with 35,358 monthly impressions it is the whole risk.
2. **An absence finding needs a mechanical procedure, not a written lesson.** Evidence: the lesson was
   written in §H and the same error was made in §I ninety minutes later, then twice more (S5, S4) the
   same day — four instances, one run. Prose did not change behaviour. Make it a required artefact shape:
   any "fact X is missing / unsupported" finding must record (i) the whole-artefact read with accordions
   open, (ii) two differently-shaped queries including digits **and** spelled-out numbers, (iii) positive
   confirmation from the section that *would* contain the fact, named. And any absence finding that would
   remove or contradict **live published content** requires a second check at the primary instrument
   before it is proposed, not before it is merged.
3. **Stage 1 must enumerate and read the primary instruments before the guidance pages.** Evidence: Form
   75 sat in `new site/reference/` throughout; reading it settled finding #6, corrected the run's own
   branch-3 wording, and produced finding #7 (the four pathways) which no secondary source gave. Three of
   the run's errors came from reading *about* the requirement instead of reading the instrument. Stage 1
   should open with an inventory of forms, Acts and PDFs available for the jurisdiction, and record for
   each whether it was read — the same "report the value, not the tick" discipline Stage 7 now has.
4. **Any edit to a dated or repeated claim must be a repo-wide grep, and the checker should enforce it.**
   Evidence: the review date lives in `wa-owner-builder-course.mdx` (×3) and `src/data/faqs-wa.ts` (×1);
   a per-file edit shipped a self-contradiction to production. `05-components.md` now records this as a
   prop contract, which is right but only helps the reader who opens 05. A cheap gate: fail the build
   when the same page's rendered `reviewedBy` date and its FAQ review date disagree.
5. **`check-pipeline` has no notion of an audit run, and its capsule regex over-counts.** Evidence: it
   WARNs "12 capsule(s) on the page with no close match in 04" — correct as a statement and wrong as a
   signal, because on an audit 04 authors three changes and deliberately does not restate live copy. It
   also counts `.capsule.on-dark` proof bands as answer capsules (page-side regex `<p class="capsule[^"]*"`),
   so the 12 is 11 capsules plus one non-capsule. Both 05 and 07 reached this conclusion independently.
   Give it a run-type flag, and exclude `.on-dark`.
6. **`.note` and `.price-foot` need a `max-width`.** Verified in `global.css`: neither rule declares one,
   producing 128-172 CPL on four live pages. One line, four pages, the largest readability win available.
7. **Every sub-skill invoked files its own review the same session.** mistakes-log #17 was written on
   2026-07-23 and broken on 2026-07-23: the readability audit ran and no review was filed. If the
   requirement is real it belongs in `system-health` as a WARN naming the parent run.

## Compare to runs 1 and 2

**Run 1 (cpd-building-tas, Amber, 5 gate-fails-after-handoff)** — its four headline failures:

1. *Stage 7 certified rows the HTML failed* → **FIXED.** I re-measured every structural claim in 07
   against `dist/` (sections, ids, markers, all 12 capsule word counts, title/description lengths,
   schema nodes, price) and each reproduces. Two non-load-bearing numbers do not (byte count, `$179`
   occurrence count) — a smaller version of the same disease, not a recurrence of it.
2. *Page-relevant warnings read as a clean bill* → **FIXED.** 07 §I quotes every `check-claims`,
   `check-freshness`, `check-pipeline` and `system-health` line, states which name this slug (none, bar
   the self-referential missing-07 FAIL and the capsule WARN) and triages each. I re-ran all four and
   confirm the attribution.
3. *Page invisible to its own guardrails* → **FIXED.** `data-authority="knowledge-requirement"` present.
4. *05/06 artefacts missing* → **FIXED in substance, not in the record.** Both exist and are substantive
   (05 is a two-way brief-to-section map with prop contracts; 06 inventories all seven image slots with
   measured alt lengths). Both are **uncommitted**, along with 07 — so the run's record is once again
   incomplete at the moment of grading, which is mistakes-log #17.

**Run 2 (white-card-tas, Amber, 0 gate-fails-after-handoff)** — its headline failures:

1. *The Stage-7 verifier returned GREEN having skipped its three mandated skill-audits* → **FIXED, and
   this is the clearest improvement of run 3.** All three ran, with quoted script output and per-check
   detail: `abe-readability-audit` (both scripts, dev server confirmed live), `final-check` (all six
   checks, including a 21-item US-spelling scan of visible text), `ai-detector` (§L). 07 closes with an
   explicit "confirmation that all three mandated audits ran" table. mistakes-log #14's guard held.
2. *A shared-record alt text carried a course-specific false claim* → **FIXED upstream.** 06 records that
   Warwick's portrait alt was corrected in the shared expert record earlier the same session, so this
   page inherited it; I confirmed the WA page's six content images all carry ≥111-char alt.
3. *An ABE person credited as developer of an RTO course* → **not applicable and correctly not applied.**
   Person ×2 with Dominic as developer is right on the knowledge-requirement model, and 01 §A says so
   explicitly rather than pattern-matching run 2's fix onto a different model. That distinction is the
   point of this evidence run and the run got it right.
4. *The record closed while work continued* → **RECURS in a new shape.** Run 2's version was work after
   grading; run 3's is deploy before verification, with 05/06/07 uncommitted at grading. The underlying
   defect is the same: the record and the reality are not in the same order.

**Net across three runs:** verification honesty is now good (run 1's disease is gone, run 2's is gone).
What has replaced it is **sequencing** — the checks are real, thorough and honest, and they run at the
wrong time relative to the deploy. That is a cheaper problem to fix and a more dangerous one to leave on
the highest-traffic page in the repo.

## Output — every Amber or Red needs at least one
- [ ] Fix applied — none by this grader; the review is the artefact. Items below are specs.
- [ ] Memory written — for the run owner, not the grader. Candidate: *a run that audits a LIVE page must
      complete Stage 7 before the first content commit; the WA run deployed twice ahead of its own
      pre-deploy gate and shipped a self-contradiction for 54 minutes.* Deliberately **not** memory: the
      absence-finding lesson (owned by `kb/mistakes-log.md` #18), the primary-instrument rule (owned by
      the register row and this review), the `.note` CPL defect (owned by the template backlog).
- [x] Skill-change spec for the improvement pass (below)
- [ ] `kb/mistakes-log.md` entry added or incremented (below)

**Skill-change spec.**
- Stage 7 completes **before** the first content commit on any page that is already live and indexed. The
  skill's audit-and-rebuild path should state this as the ordering rule, and `check-pipeline` should FAIL
  a slug whose `src/` files are newer in `main` than its `07` artefact.
- A run is not closed until 05, 06, 07 and the Stage-9 review are committed. `system-health` should WARN
  on a slug with untracked pipeline artefacts.
- Stage 1 opens with a primary-instrument inventory (forms, Acts, PDFs under `new site/reference/`) and
  records read/not-read per item. Guidance pages are secondary; where a form and a guidance page differ,
  the form wins — as this run discovered and wrote into the register.
- Absence findings get a required three-part evidence shape (whole-artefact read, two differently-shaped
  queries incl. spelled-out numbers, positive confirmation of the section that would hold the fact), and
  an absence finding that would remove live published content needs a second check at the primary source
  before it is proposed.
- `check-pipeline` takes an audit run-type flag, and stops counting `.capsule.on-dark` as an answer capsule.
- Any sub-skill invoked in a run files its own `skill-reviews/` entry the same session.

**`kb/mistakes-log.md`.**
- **#18 → times seen 2.** The entry records two instances (the six-month "absence" and the processing-time
  regex). The run in fact produced **four** — add (c) the FAQ answers assumed not quotable when they were
  (`04-content.md` §S5) and (d) the meta description asserted at 154 characters when it was 171 (§S4).
  Four in one run, two reaching a proposal on a live page, is the count the trend should carry.
- **#17 → times seen 2, last seen 2026-07-23.** Broken the day it was written: the readability audit ran
  with no review filed, and 05/06/07 were uncommitted at grading.
- **New entry.** *"A pre-deploy verification stage was written after the deploy it was meant to gate —
  two commits changed a live, indexed page (883 clicks/mo) before `07-verification.md` existed, and a
  self-contradicting review date was published for ~54 minutes as a result."* Guard: on an audit of a
  live page, Stage 7 runs before the first content commit; a `07` newer than the `src/` change it
  certifies is a FAIL, not a formality.

## Grader note
`graded_by: independent`. Graded from the seven pipeline artefacts, `dist/wa-owner-builder-course/index.html`,
`src/content/courses/wa-owner-builder-course.mdx`, `src/data/faqs-wa.ts`, `src/styles/global.css`,
`kb/register/state-fees-register.md`, `kb/mistakes-log.md`, the two prior reviews, and live runs of
`check-claims`, `check-freshness` and `check-pipeline`, plus `git show` of both commits. No account of
the run from the agent that did it. Load-bearing values re-measured myself rather than taken from 07:
`recognizedBy` = 0, credential keys, Person ×2 and job titles, `offers.price` vs on-page `$179`, all
`WA-approved`/`licence`/`permit` hits read in context, all 12 capsule word counts, section/marker
sequence, title 52 / description 149 chars, canonical form, `20 June 2026` ×4 with `4 June 2026` ×0,
`CPCWHS1001` ×4 / `CPCCWHS1001` ×0, and the absence of `max-width` on `.note` and `.price-foot` in
`global.css`.

**Why `correct_and_safe` is amber, not green or red.** Nothing wrong is live: the authority model is
exemplary and I verified it, every regulatory figure matches the register or a cited primary source, and
the false processing-time finding was corrected *before* `17f89e3` — I checked the committed register and
MDX and neither ever carried it. That rules out red. But the safety did not come from the process: two
absence findings that no check caught reached proposals against a live page, one of them into the
working copy of the repo's single fact store, and the human caught the second one. A self-contradicting
currency date did reach production. Green would say the process produced a correct page; amber says the
page is correct and the process nearly wasn't.

**Why `passed_gates_first_time` is red.** Not for dishonesty — 07 is the most honest verification of the
three runs and its measurements reproduce. For sequencing: the gate ran 45 minutes after the second
deploy to production and is still uncommitted, so nothing it checked could have gated anything, and the
one defect that reached production is the class of defect it exists to catch.

**Metrics.** `turns_to_passed_audit` is left **empty**: the artefacts carry file timestamps
(01 at 14:05 → 07 at 15:48) and commit times, but no turn count, and an independent grader has no
transcript. Filling it would put an invented number in the trend report.
`manual_fix_passes` is **1** — `d66a4a7` fixing the split review date that `17f89e3` had already shipped
live. The pre-commit corrections (the register falsehood, the duplicate Note, the 171-char meta) are
counted as rework under `low_rework`, not as post-done fixes, because none of them reached `main`.
`gate_fails_after_handoff` is **1** — the `obligations` capsule at 38 words against the stated 40-60
target, measured only by a Stage 7 that ran after the page was already live, and still live at grading.
Strictly, *every* Stage-7 finding on this run is after handoff by construction; 1 counts the only
measured miss against a stated target, and the sequencing itself is charged to gate 2 instead.
