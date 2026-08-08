---
date: 2026-08-08
skill: skills-session
subject: review-trends.mjs sparse-sample false trend, review-coverage diagnosis, and the 4-page banned-CTA rewrite
verdict: Green
graded_by: self
---

# Skills review — sparse-sample trend fix + banned-CTA rewrite, 2026-08-08

## Verdict

**Green.** One real defect fixed in `review-trends.mjs` (a misleading WORSENING verdict computed
from a single data point on each side), the review-coverage WARN diagnosed and confirmed as a
standing, non-regressive gap needing no fix, and the 20 banned "Enrol now" CTAs on the four legacy
owner-builder pages rewritten with `BANNED_CTA_BUDGET` zeroed out. `system-health.mjs` went from
**1 failing / 33 warning / 62 ok to 0 failing / 34 warning / 62 ok.**

## Disclosed crossing

This session was declared `skills`. Closing the banned-CTA demand item
(`skill-reviews/skills/2026-08-01-banned-cta-guardrail-and-robots-withdrawal.md`) required editing
both `src/integrations/guardrails.ts` (skills-owned) and the four `src/content/courses/*.mdx` files
(build-owned) **together**, because the check and the content are structurally coupled: the guardrail
already FAILs on a budget *higher* than the live count ("Debt was paid — lower the number"), so
zeroing `BANNED_CTA_BUDGET` without fixing the content breaks the build, and fixing the content
without zeroing the budget immediately trips that same over-budget FAIL. There was no ordering that
kept the two edits in separate, independently-green commits. Content wording (not a regulatory or
authority-model claim) on four pages, one already-filed demand item, both halves verified green
together — recorded here rather than only in the commit, per the standing rule that a crossing must
be named in the artefact itself.

## What shipped

1. **`review-trends.mjs`** — the "recent third vs earliest third" direction computation now tracks
   the sample count in each window and refuses to assert a verdict below `n=2` per side, instead
   printing `(n=X -> n=Y) too few points to call a direction`.
2. **`system-health.mjs`** — wired the new "too few points" line to a WARN, so an unreadable metric
   says so rather than either FAILing falsely or silently dropping from the report.
3. **Review-coverage 7/13** — diagnosed, not fixed. Recorded below.
4. **`src/integrations/guardrails.ts`** — `BANNED_CTA_BUDGET` emptied to `{}` (was 5 per page × 4
   pages).
5. **Four `src/content/courses/*.mdx` files** (`act-owner-builder-course`, `owner-builder-nsw-course`,
   `owner-builder-nsw-course-w`, `tas-owner-builder-course`) — all 20 "Enrol now" occurrences rewritten
   to "Start my {STATE} course [— $price]" / "Start my course" (short form for the sticky bar),
   following the guardrail's own quoted example ("Start my ACT course") and the pattern already live
   on `wa-owner-builder-course` (same archetype, same "state-approved-direct" authority model).

## Measured, not assumed

- **Read the full six-point `turns_to_passed_audit` series before accepting the tool's own
  "WORSENING" label**: `0, 4, 0, 6, 6, 2` in date order. The "WORSENING (+2.0)" verdict was the
  earliest-third window (rows 1-4, containing exactly one non-null value: `0`) against the
  latest-third window (rows 11-14, exactly one non-null value: `2`) — a comparison of two individual
  reviews, not means over a meaningful sample. 8 of 14 graded runs don't record this metric at all.
  Read against the full series, the last recorded value is one of the *better* outcomes, not the
  worst — it dropped from the two 6s immediately before it.
- **Confirmed the review-coverage gap is the same six pages every time**, cross-referencing
  `skill-reviews/*.md` `subject:` fields by hand against every slug in `src/content/courses/` and
  `src/content/hubs/`: `act-owner-builder-course`, `owner-builder-nsw-course`,
  `owner-builder-nsw-course-w`, `qld-owner-builder-course`, `tas-owner-builder-course`, and the
  `owner-builder-courses` hub — all pre-pipeline pages, never run through Stage 9.
  `wa-owner-builder-course` is the only one of the four original owner-builder pages carrying a
  review, deliberately retrofitted 23 Jul 2026 as evidence run 3. Not a regression; no code change
  made.
- **Counted actual banned-CTA occurrences in `dist/` before trusting the demand item's stated "21"
  figure**: measured 20 (5 per page × 4 pages, exactly matching the old `BANNED_CTA_BUDGET`), not 21.
- **Before/after, measured**: `system-health.mjs` — 1 failing / 33 warning / 62 ok → **0 failing** /
  34 warning / 62 ok. `npm run build` — 24/24 guardrails pass (was 24/24 before too; the fix keeps it
  green rather than moving it). `check-claims.mjs` — 0 failing, unchanged. `check-pipeline.mjs` —
  0 failing, unchanged. `grep` for `Enrol (now|today)` across all four `dist/*/index.html` — 0
  matches (was 5 each).
- **Verified in-browser, not just grepped**: served `dist/` locally and read
  `act-owner-builder-course`'s rendered page text — "Start my ACT course — $179" in the hero and the
  `ctaBand`, "Start my ACT course" in the `SectionWayfinder` "ready" link. No "Enrol now" anywhere in
  the rendered text; ordinary uses of the verb ("start when you enrol") are untouched, correctly —
  the guardrail only ever matched the literal phrase, never the verb.

## What worked

Checking the full point series before accepting `review-trends.mjs`'s own "WORSENING" label — the
same discipline the 7 Aug review used when it grepped for a stale phrase rather than trusting another
session's account at face value. A trend computed from one point against one point is not a trend,
and the fix preserves the honest signal (adequately-sampled metrics still report a real verdict)
while refusing to report one the sample can't support.

## What didn't

Nothing found beyond the two diagnosed issues. The review-coverage WARN needed a determination, not
a fix — recording that distinction here so a future reader doesn't try to "fix" a check that is
already working correctly.

## Demand list
Tag every item: [skills] | [design] | [facts] | [build]

- [build] Consider whether the six pre-pipeline pages (`act-owner-builder-course`,
  `owner-builder-nsw-course`, `owner-builder-nsw-course-w`, `qld-owner-builder-course`,
  `tas-owner-builder-course`, `owner-builder-courses` hub) should get retrofitted Stage-9 reviews, or
  whether the standing WARN is accepted as permanent signal for pages that predate the pipeline. Not
  actioned here — a judgement call, not a defect.

## Output — every Amber or Red needs at least one
N/A — Green.

## Grader note
`graded_by: self` — no independent skills-review grader exists yet (same standing gap rules 9-11
note); reasoning and measured values recorded above for a later reader to check.
