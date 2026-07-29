---
# Machine-readable block. scripts/review-trends.mjs parses this, so keep the keys and
# shapes exactly as they are — prose belongs below the frontmatter, not inside it.
date: 2026-07-30
skill: abe-readability-audit
subject: white-card-wa
archetype: 2 — Nationally recognised course
verdict: Amber
graded_by: self
scores:
  correct_and_safe: green
  passed_gates_first_time: amber
  inside_effort_budget: green
  low_rework: green
  taught_us_something: green
metrics:
  turns_to_passed_audit: 0
  manual_fix_passes: 0
  gate_fails_after_handoff: 0
---

# Skill review — the three mandated Stage-7 audits, white-card-wa, 2026-07-30

## Verdict

**Amber.** Correct-and-safe is green: the page's own copy, structure and regulatory claims all hold,
and no content change was needed. The Amber is that the page has been live and indexable since 28 July
while six sitewide readability defects went unmeasured, including an ASQA disclosure block running at
**180 CPL** — more than twice the 85 CPL hard rule.

## What this run was

Not a new build. `check-pipeline.mjs` §5 — added 29 Jul — FAILed this slug because its
`07-verification.md` named none of the three mandated sub-skill audits. The Stage-9 grader had filed
that as the **third consecutive occurrence**, and mistakes-log #14 had carried a prose guard for it
since 23 July that did not hold three times running.

The FAIL was cleared by **running the audits**, not by writing a "not run, and why" disposition. The
escape hatch is for a deliberate skip; using it on the third silent skip would have been the wrong use
of it. Full measured output is in `pipeline/white-card-wa/07-verification.md` §07d.

## What it found

**Six paragraphs over the 85 CPL hard rule**, worst first: `.pl-disc` at **180 CPL**
(`max-width: none`), an unclassed ABN paragraph at **135 CPL**, two footer paragraphs at 101, and the
answer capsules at 91.

**The 180 CPL disclosure is a repeat.** The first time these audits were skipped and then run
(`cpd-building-tas`), what they found was an ASQA disclosure block at ~135 CPL. Same component class,
recurred wider. That is the strongest argument available that skipping them is not cheap: both times
they have been run after a skip, they have found the same defect getting worse.

**Two real AA contrast failures** — footer "About" at 2.68:1, the "Sources" label at 3.81:1 — and one
tap target under size, `button.burger-btn` at 40x20px.

**A duplicate the copy check caught that three design reads had only argued about:** the partner blurb
renders verbatim twice per ASQA page, from `PartnerDisclosure` and again from `Credentials`.

**`ai-detector`: high confidence human.** One minor tic (three "worth" constructions), strong
stance-taking, insider knowledge and concrete specificity throughout. No rewrite indicated.

## What didn't

**The audit tooling gave four false FAILs on the first run, and they were plausible.**
`audit_render.py` loads its target as `file://`; this site's stylesheet is a root-absolute path, so
over `file://` it never loads and the probe measures an **unstyled** page. It reported 158 CPL,
white-on-white text and `a.btn-primary` at 185x17px. Every one an artefact. Serving `dist/` over HTTP
and passing the URL fixes it, and the script already accepts one.

**A fifth false positive survived the correct run.** The probe reported `p.capsule.on-dark` at 1:1,
because it resolves only the immediate parent for a background and that parent is transparent. The
real ancestor is `section.sec.bg-dark` at `rgb(26,26,26)`, so the true ratio is about **15:1**. Caught
by walking the computed-style chain rather than believing the number.

**The near-miss that matters most.** The page and `kb/register/eligibility-by-state.md` disagree on the
WA sufficient-knowledge test, and the first read pointed at the page. Reporting it that way would have
proposed removing correct, sourced content from a live indexed page and writing the falsehood into the
register — **mistakes-log #18, verbatim, on a page that had already suffered #21.** The page is right:
its provenance comment records that it is sourced to **Form 75 page 5**, the instrument the applicant
signs, and that the regulator's web summary is self-contradictory. The register is the stale one. Only
the comment in the MDX prevented the wrong call.

## Demand list
Tag every item: [skills] | [design] | [facts] | [build]

- ~~[design] `.pl-disc` (ASQA partner disclosure) renders at **180 CPL** with `max-width: none`. Worst
  measure on the page and a recurrence of the defect the first post-skip audit found at ~135 CPL.~~ fixed in #89
- [design] The unclassed ABN and authorised-publisher paragraph renders at **135 CPL** with no cap.
- [design] Footer "About" link measures **2.68:1** against the cream ground, below the 4.5:1 AA floor.
- ~~[design] The "Sources" label measures **3.81:1** on `rgb(26,26,26)`, below the 4.5:1 AA floor.~~ fixed in #89
- ~~[design] `button.burger-btn` is **40x20px** at 390px, under both the 44px primary target and the
  24px minimum.~~ fixed in #89
- [design] Nine type declarations sit below the 12px floor, smallest 9.5px (`.ht-rail`).
- [design] The partner blurb renders verbatim twice on every ASQA page, from `PartnerDisclosure` and
  again from `Credentials`. Third filing, and the first caught by a copy check rather than a design read.
- [facts] `kb/register/eligibility-by-state.md` WA sufficient-knowledge entry is sourced to the
  regulator's web summary, which the page demonstrated is self-contradictory. Re-verify against
  **Form 75 page 5** and record the four numbered pathways, including the five-year bound on pathway 4.
- [skills] `audit_render.py` must be given an **HTTP URL**, not a file path, or it measures an unstyled
  page and returns four false FAILs. Serve `dist/` first. Belongs in `references/verification.md`.
- [skills] `audit_render.py` resolves a background colour from the immediate parent only, so any text
  on a `bg-dark` section reports 1:1. Verify a contrast FAIL by walking the ancestor chain before
  believing it.

## Output — every Amber or Red needs at least one
- [x] **Fix applied** — the Stage-7 record is complete; `check-pipeline` FAIL cleared, `system-health`
  back to **0 failing**. No page content changed, because none needed to.
- [x] **Memory written** — not needed as a new memory; the transferable lessons are recorded in the
  demand list above and in mistakes-log #14's disposition.
- [ ] **Skill-change spec for the improvement pass** — not applicable, the two tooling findings are
  filed as `[skills]` items above.
- [x] **`kb/mistakes-log.md` entry added or incremented** — #14 marked BUILT and closed; see below.

## Grader note

`graded_by: self`. No fresh-subagent grader was used: this run produced no new page content to grade,
and its output is a set of measured numbers that are reproducible by re-running the two scripts against
`http://127.0.0.1:8899/white-card-wa/`. Check those rather than the verdict. The judgement calls worth
a second opinion are the two false positives and the register conflict, all three of which are shown
with the evidence that settled them.
