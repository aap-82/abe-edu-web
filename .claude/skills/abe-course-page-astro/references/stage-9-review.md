# Stage 9 — file the per-run skill review

## Contents
- When to read this: after the page is built and verified, at the end of a run
- What the review must contain
- Grading, and who may grade
- The demand list and how items are routed

**Read at the end of a run.** Lifted out of SKILL.md 17 Aug 2026: it is consulted once, after the
page is done, and kept the stage spine 50 lines longer than it needed to be for every earlier stage.

### 9 · File the per-run skill review
Before the run is done, one review file is written for it. This is how the pipeline measures whether
it is improving; it is not optional and not gated on the person asking.

**A fresh grader writes it, not you.** Spawn a subagent whose only inputs are the run's artefacts —
`pipeline/{slug}/` (source map, fact ledger, gap analysis, briefs, content), the built HTML in
`dist/{slug}/`, and the audit output. It must not receive your reasoning or your account of the run.
The agent that did the work knows what it meant to do, which is precisely the knowledge that inflates
a self-assessment. The grader scores what was produced. If subagents are unavailable in the current
surface, say so in the handoff and mark the review self-graded, so the bias is on the record rather
than hidden.

**Where.** `skill-reviews/YYYY-MM-DD-<skill>-<page-or-course>.md` in the repo, copied from
`skill-reviews/_TEMPLATE.md`. One file per gradeable run — re-grading updates it, never duplicates it.
**Keep the template's frontmatter block intact.** `scripts/review-trends.mjs` parses it, and a review
with hand-edited keys drops silently out of the trend report — the metrics stop being answerable
rather than becoming visibly wrong.

**Fill from the artefacts.** Every field comes from output this run actually produced. Do not
re-derive, estimate, or infer a score nobody measured.
- **Verdict** — Green / Amber / Red.
- **Five scores, in priority order** (a higher one beats a lower one):
  1. **Correct & safe** (non-negotiable) — every regulatory, fee and legislative fact verified
     against its official source with a current date; authority model right (ABE is **not** an RTO);
     no `kb/mistakes-log.md` entry recurred.
  2. **Passed its gates first time** — SEO/schema, readability, final-check, design register,
     Australian English, no "comprehensive".
  3. **Inside the effort budget** — turns to passed-audit and manual fix passes vs the budget.
  4. **Low rework / high autonomy** — didn't re-ask for anything already on disk; few unblocks.
  5. **Taught us something** — surfaced a reusable fact or a weakness in this skill.
- **Three trend metrics** — assistant turns to passed-audit; manual fix passes after the skill said
  "done"; gate-fails caught after handoff. Recording them is not the same as knowing whether the
  system is improving: **run `node scripts/review-trends.mjs` after filing the review** and read the
  direction. It also reports any run that was self-graded, any red on correct-and-safe, and any
  4- or 12-week outcome review that has come due.
- **What worked / what didn't.**
- **Output — every Amber or Red needs at least one:** a fix applied, a skill-change spec, or a
  `kb/mistakes-log.md` add/increment (increment "times seen"; never duplicate an entry).
- **The demand list** — what was painful: files too large to hold, context flooded by verbose output,
  steps that wanted isolation, checks that failed silently. This is the input to any future decision
  about splitting skills or adding subagents, so it is evidence, not opinion.

**Outcome target (deploy-bound builds).** Fill the outcome-target block so the post-live reviews have
a baseline: primary and secondary keywords, target ranking/traffic, deploy date, live URL, and the
**4-week** and **12-week** review dates (deploy + 28 and + 84 days). Blank the deploy date if it did
not ship, and say so.

**Verdict rule — correct-and-safe is a veto.** A **Red on "Correct & safe" fails the whole run**,
whatever scores 2 to 5 say. A fast, clean page carrying one wrong regulatory fact still fails.
