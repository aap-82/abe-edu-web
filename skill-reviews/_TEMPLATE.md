---
# Machine-readable block. scripts/review-trends.mjs parses this, so keep the keys and
# shapes exactly as they are — prose belongs below the frontmatter, not inside it.
date: YYYY-MM-DD
skill: abe-course-page-astro
subject: <page-or-course-slug>
archetype: <selector number and name>
verdict: Green | Amber | Red
graded_by: independent | self      # 'self' only when subagents were unavailable — say why below
scores:                            # green | amber | red
  correct_and_safe: green          # NON-NEGOTIABLE. red here fails the whole run.
  passed_gates_first_time: green
  inside_effort_budget: green
  low_rework: green
  taught_us_something: green
metrics:
  turns_to_passed_audit: 0         # assistant turns from start to a clean audit
  manual_fix_passes: 0             # fixes needed after the skill said "done"
  gate_fails_after_handoff: 0      # checks that failed only after handover
outcome:                           # omit the whole block for a run that did not deploy
  primary_keyword: ""
  secondary_keywords: []
  target: ""                       # e.g. "top 10 within 12 weeks"
  live_url: ""
  deploy_date: YYYY-MM-DD
  review_4week: YYYY-MM-DD         # deploy + 28 days
  review_12week: YYYY-MM-DD        # deploy + 84 days
  result_4week: ""                 # filled at the 4-week review
  result_12week: ""
---

# Skill review — <subject>, <date>

## Verdict
<Green / Amber / Red, and the one-sentence reason.>

## What worked

## What didn't

## Demand list
What was painful, as evidence for structural decisions: files too large to hold, context flooded by
verbose output, steps that wanted isolation, checks that failed silently.

## Output — every Amber or Red needs at least one
- [ ] Fix applied
- [ ] Memory written
- [ ] Skill-change spec for the improvement pass
- [ ] `kb/mistakes-log.md` entry added or incremented

## Grader note
If `graded_by: self`, say here why an independent grader was unavailable. A self-graded run is
weaker evidence and the trend report marks it.
