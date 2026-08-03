---
date: 2026-08-04
skill: skills-session
subject: provenance-gate-and-path-ownership
verdict: Green
graded_by: self
---

# Skills review — Stage-0 provenance gate, and four path-ownership assignments, 2026-08-04

Self-graded: there is no fresh-subagent skills grader yet (CLAUDE.md session-types rule 10).

## Verdict

**Green.** Two todo items, both process fixes rather than page work, both closed the same way they
were asked for: a rule written into the document a session actually reads, not just recorded as a
decision. One path-ownership assignment (`new site/*.md`) was added beyond the two named, because
this session hit the gap making the first edit — the same trigger CLAUDE.md already names for this
exact situation ("when you meet one, assign it in the same session that hit it").

## What shipped

### Item 9 — Stage-0 provenance gate

| | Before | After |
|---|---|---|
| Recipe A step 1 (`new site/abe-migration-implementation-plan.md`) | fact ledger + source-per-figure; silent on provenance | + explicit gate: every published row must be regulator-sourced before Stage 3 |
| Skill's own Stage 1 (`content-pipeline.md`) | same gap, and the document a build session actually executes | same gate, mirrored — worded once, not left to drift from Recipe A's restatement |
| Basis for "regulator-sourced" | none pointed at | `kb/register/online-delivery-policy-by-state.md` §4's own Primary/Secondary split, and its `UNVERIFIED` marker |

Both edits cite the same two runs that earned this: NSW built a complete page on an industry-guide
row that reversed at Stage 9 (`skill-reviews/facts/2026-08-01-nsw-git-conditions-and-fees.md`); QLD's
equivalent row was read first and cost a fraction of that
(`skill-reviews/facts/2026-08-02-qld-gcit-crtd-delivery.md` — the WHSQ CRTD read that landed before
the page did). Second occurrence, ROADMAP rule 3's threshold, named in the todo item itself.

**Why both documents, not one.** `new site/abe-migration-implementation-plan.md`'s Recipe A is the
ticket-level restatement CLAUDE.md tells every session to read before Wave 1+ work; `content-
pipeline.md`'s Stage 1 is the operational version the `abe-course-page-astro` skill actually runs.
The item named "Recipe A step 1" specifically, but a gate that lives only in the ticket-level prose
and not in the skill's own pipeline is exactly the two-documents-of-one-rule drift `mistakes-log` row
1 has now recorded ten times from the code side; this closes it from the rules side before it can
recur here.

### Item 10 — four path assignments (three named, one found)

| Path | Assigned to | Why |
|---|---|---|
| `src/integrations/guardrails.ts` | skills | Edited 1 Aug 2026 on the strength of a `[skills]`-tagged demand item and the file being a check — same category as `scripts/**` and `content.config.ts` |
| `.gitignore` | skills | Edited (in this session) to close the `*.xlsx`/`*.xls`/`*.csv` gap found 2 Aug — repo-wide config infrastructure, same shape as `public/**` |
| `src/layouts/**` | design | Formalises what two design sessions already did in practice (28 Jul landmarks, 1 Aug type-floor) — a layout renders shared chrome, the same category as `src/components/**` |
| `new site/*.md` (5 top-level planning docs) | skills | **Found in this session** while editing Recipe A above — standing plan/rules prose, same category as `ROADMAP.md`/`SYSTEM.md`, just not co-located |

All four pass the test CLAUDE.md already states for this list: does getting it wrong break one
page's correctness (assignable) or the deployment itself (human decision)? None of the four can
break a deployment; all four can make one page — or every page, for `guardrails.ts` — wrong.

**The `.gitignore` fix itself — two real defects found in it before it was right, both caught by
re-verifying rather than trusting the first green check.**

The edit that added the `*.xlsx`/`*.xls`/`*.csv` lines was applied with an `old_string`/`new_string`
replace that swapped the whole surrounding block. The replacement kept the comment describing
`*.pdf`/`*.docx`/`*.doc` but **dropped the three active rules themselves** — a self-inflicted version
of exactly the leak this session's own new CLAUDE.md paragraph warns about ("a wrong `.gitignore`
line... risks... a leaked document"). Caught only because the ship pre-flight ran `git check-ignore`
against a real PDF and got exit 1 (not ignored) where it expected exit 0:

```
$ git check-ignore -v "new site/reference/owner-builder_approval_form75.pdf"
(exit 1 — WRONG. *.pdf and *.docx were gone from the file.)
```

Fixed by restoring the three original lines above the new ones, not just re-adding what looked
missing — diffed against the pre-edit content to confirm nothing else had dropped.

**Second defect, found while re-verifying the first fix:** the new `new site/reference/*.xlsx` line
(no `**`) only matches files directly inside that folder, not nested subdirectories — the same shallow
form the existing `*.doc` line already had, just never exercised. A real file was already sitting
untracked one level down: `new site/reference/QLD White Card/rto-approved-general-construction-
induction-training.xlsx` (the WHSQ CRTD-approval spreadsheet `kb/register/online-delivery-policy-by-
state.md` §2C cites) — exactly the kind of file this rule exists to protect, caught still exposed by
its own fix. Corrected to `new site/reference/**/*.xlsx` (and `.xls`/`.csv`), which matches every
depth including zero.

**Final state, verified clean:**

```
$ git check-ignore -v "new site/reference/owner-builder_approval_form75.pdf" \
    "new site/reference/QLD White Card/rto-approved-general-construction-induction-training.xlsx" \
    "new site/reference/test.csv"
.gitignore:52:*.pdf                              new site/reference/owner-builder_approval_form75.pdf
.gitignore:64:new site/reference/**/*.xlsx        new site/reference/QLD White Card/rto-approved-general-construction-induction-training.xlsx
.gitignore:66:new site/reference/**/*.csv         new site/reference/test.csv

$ git check-ignore -v "redirects.csv" "new site/redirect-map-v1.csv"
(exit 1 — neither matched, both stay tracked)

$ git status --porcelain=v1 -uall -- "new site/reference"
(empty — nothing left untracked in that tree)
```

Recorded in full because the review's own first draft printed a verification transcript against the
broken intermediate version and reported it as the finished state — the self-certification failure
this session was trying not to repeat, caught only by re-running the check instead of trusting the
first one. Scoped to `new site/reference/` rather than global, unlike `*.pdf`/`*.docx` in the same
block — a global `*.csv` would have caught two repo-tracked, actively-read files (`redirects.csv`,
`new site/redirect-map-v1.csv`) the moment either was ever deleted and regenerated.

## What was deliberately not done

- **No new `kb/mistakes-log.md` row for the NSW/QLD provenance sequencing lesson.** It is closely
  related to row 21 (register right, page wrong, nothing compared them — which is what motivated
  `check-positions` yesterday) but is a distinct lesson about *order* (verify then build, not build
  then verify), not about *reconciliation*. The todo item itself, backed by the two facts reviews it
  names, already serves as the record that authorised this fix — rule 3's trigger mechanism working
  as designed, not friction still waiting for one.
- **`new site/reference/`, `new site/examples of the certificates/` and `new site/experts/` were not
  assigned.** Deliberately excluded from the `new site/*.md` grant above: the first two are gitignored
  source paperwork (regulator documents, real customers' certificates) that no session type edits as
  a matter of course, and the third is an asset drop, not planning prose. Assigning the whole tree
  would have been the easy version of this fix and the wrong one.

## Session type held

Only `new site/abe-migration-implementation-plan.md`, `.claude/skills/abe-course-page-astro/
references/content-pipeline.md`, `CLAUDE.md`, `.gitignore` and `handover/HANDOVER-todo-2026-08-02.md`
— all skills-owned (the last assignment made in this same session, then immediately relied on to
make the rest of the edit list legible). Read but did not write: `kb/register/**`,
`src/integrations/guardrails.ts`, `src/layouts/**` (confirmed their current content matches what the
new ownership assignment describes; did not edit either).

`system-health` run before (2 failing, 30 warning, 51 ok — carried over from yesterday's
`check-positions` session, both fails already tracked) and after (identical: 2 failing, 30 warning,
51 ok). No new FAIL, no new dangling reference from any of today's cross-references.

Not shipped — working tree only, pending Andrey's review.

## Demand list
Tag every item: [skills] | [design] | [facts] | [build]

- [skills] **`.gitignore`'s existing `new site/reference/*.doc` line has the same shallow-depth gap
  the `*.xlsx`/`*.xls`/`*.csv` lines were just found to have and fixed with `**/`.** Not fixed here —
  out of this item's stated scope, and no `.doc` file is currently sitting in a nested subfolder the
  way the `.xlsx` one was — but the same defect class, found by the same check, in a line this session
  did not otherwise touch. Widen it to `new site/reference/**/*.doc` next time this block is opened.
