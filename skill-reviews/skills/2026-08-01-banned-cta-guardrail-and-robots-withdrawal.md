---
date: 2026-08-01
skill: guardrails
subject: banned-cta-guardrail-and-robots-withdrawal
verdict: Green
graded_by: self
---

# Skills review — the banned-CTA guardrail, and a demand item that should never be built, 2026-08-01

## Verdict

**Green.** One publish hard-blocker became mechanical, five already-shipped items were closed, and two
items were closed **withdrawn rather than fixed** — building them would have damaged the migration.
`graded_by: self` because there is still no fresh-subagent grader for skills sessions (rule 10).

## What shipped

| | Before | After |
|---|---|---|
| "Enrol now" enforcement | prose in `verification.md` §1f + `SKILL.md`; hand-checked each run | `BANNED_CTA_BUDGET` in `guardrails.ts`, fails the build |
| Banned CTAs in `dist` body | 21 across 5 pages (unmeasured until today) | 21, now budgeted and ratcheted down-only |
| A new page shipping "Enrol now" | passed every gate | FAILs on first build, budget 0 |
| `skill-reviews` open items (skills) | 83 open · 11 closed | **75 open · 19 closed** |
| `public/robots.txt` | bare `Allow: /`, no record of why | carries the R1 reasoning inline |

## The four already-fixed items

All four were verified in the code before being struck, not taken on trust:

| Item | Evidence |
|---|---|
| `demand-split.mjs` missing | present; created `057a569`, extended #87/#90/#91; regenerates all four notes |
| GSC path wrong | `CLAUDE.md:234` reads `business data/GSC/` (#86, `d09a5c2`) |
| Stage 7 audits not enforced | `REQUIRED_AUDITS`, `check-pipeline.mjs:263`, hard FAIL; 5/5 slugs pass |
| `CPCCWHS1001` ungated | `RETIRED_UNIT`, `check-claims.mjs:509`, hard FAIL; green |

Five struck lines, not four: the Stage-7-audits defect was filed twice (`white-card-tas` 23 Jul,
`white-card-wa` 28 Jul). One defect, two filings, both closed — which is the trigger-counting case
ROADMAP rule 3 cares about, and it was already built before either could be counted.

## Why the CTA guard is a ratchet and not the one-line regex the item asked for

The item said "a one-line regex in `guardrails.ts` closes it permanently". A flat FAIL is the correct
rule and would have **reddened the build on four live pages today**. Fixing that copy is
`src/content/**` — a build session's territory, not this one's — so a bare FAIL from a skills session
hands every other session a broken build it is not permitted to repair.

`INLINE_STYLE_BUDGET`, already in this file, solved exactly that shape, so this follows it. Each page
gets its measured count as a budget and the only legal direction is down:

- **over budget** → FAIL. A new banned CTA, caught on the first build. This is the case that matters.
- **under budget** → FAIL. Debt was paid; lower the number so it cannot creep back.
- **page absent** → budget 0. Every page written from here on starts clean.

The under-budget arm is what makes it converge rather than rot. A page whose CTAs get rewritten goes
to 0 and then leaves the table.

## Measured, not ticked

The count came from `dist` after `npm run build`, using the same `pageBody` semantics as the check —
not from the source grep, which said 4 per page where the rendered body has 5.

```
  5 act-owner-builder-course/index.html
  5 owner-builder-nsw-course/index.html
  5 owner-builder-nsw-course-w/index.html
  5 tas-owner-builder-course/index.html
  1 styleguide/index.html        <- out of scope: page loop skips styleguide/preview
TOTAL 21
```

Then **both failure arms were observed firing** before the table was restored, per the
self-certification lesson — a check believed rather than seen fail is a check not known to work:

```
ERROR  act-owner-builder-course/index.html: 5 banned CTA(s) ("Enrol now") in the body, budget 0. ...
ERROR  tas-owner-builder-course/index.html: 5 banned CTA(s) ... but BANNED_CTA_BUDGET still allows 7.
       Debt was paid - lower the number ... to 5 so it cannot creep back.
ABE guardrails: 2 publish hard-blocker(s). Build stopped.
```

The restored file was diffed against its pre-test backup: identical. Build green, 21 pages pass.

## The robots.txt item: withdrawn, not built

**This is the finding of the session.** Two demand items asked for `Disallow: /course/` and
`/program/` in `public/robots.txt`, citing `verification.md` §1e. Building it would have been wrong,
for a reason already settled in this repo three times over:

- **Risk audit R1 (16 Jul 2026)** removed the block, naming "the robots line inherited from the
  skill/v1" as the thing to amend. Its reasoning: those ~229 player URLs 301 to `learn.*`, and a
  disallowed URL's redirect is **never followed**, so they would linger indexed on dead paths,
  transfer nothing, and flood GSC with "indexed though blocked". One carries 33 clicks.
- **Migration plan v2** applied it — §5 and cutover runbook step 3 both say the marketing host must
  *not* disallow those paths.
- **`verification.md` §1e was amended on 28 Jul** to withdraw the row and explain that this build
  cannot assert it.
- **`public/_redirects:170,173,179`** already 301 those exact paths to `learn.*`.

The first filing (28 Jul) post-dates R1 by twelve days; the second (29 Jul) post-dates the §1e
amendment by a day. Both were reading a rule that had already been withdrawn.

So the closure records the withdrawal rather than a fix, and `public/robots.txt` now carries the
reasoning **in the file a future session will actually open**. The three prior filings each went to a
document; the fourth would have too. This is the `mistakes-log` #1 family from the other side: not
documentation drifting from code, but a **withdrawn rule outliving its withdrawal** because the
withdrawal was recorded only where the rule used to live.

The related `check-links` WARN — whether this build *advertises* those paths — is a different and
still-open question, and was not closed.

## What I did not do

- **Did not fix the 21 CTAs.** `src/content/**` is build-owned. They are budgeted, visible and
  failing-if-worsened; the rewrite is a build session's, and is now filed as `[build]`.
- **Did not touch `package.json`, `wrangler.jsonc` or `worker/`.** Unassigned platform config.
- **`public/robots.txt` is unassigned too** and I edited it — a comment-only change, no behaviour
  change, made because it is the one place that prevents a fourth filing. Called out here rather than
  left to be discovered, on the `worker/entry.js` precedent from the 29 Jul audit. Filed below.

## Demand list
Tag every item: [skills] | [design] | [facts] | [build]

- [build] Rewrite the 21 "Enrol now" CTAs on `act-owner-builder-course`, `owner-builder-nsw-course`,
  `owner-builder-nsw-course-w` and `tas-owner-builder-course` to benefit-led first-person wording, and
  drop each page's entry from `BANNED_CTA_BUDGET` as it reaches 0. The build now FAILs if a count
  falls without the budget following it, so the two must move together.
- [design] The styleguide's `SectionWayfinder label="Enrol now"` specimen (`styleguide.astro:734`)
  teaches the banned wording as the worked example. Out of the guardrail's scope by construction (the
  page loop skips `styleguide/`), so nothing will ever catch it. Change the specimen's label.
- [skills] **`src/integrations/guardrails.ts` has no owner in the session-types table.** This session
  edited it on the strength of the demand item being tagged `[skills]` and the file being a check, but
  the table never assigns it, and CLAUDE.md names it only to forbid *the improvement pass* from
  touching it. Same shape as the open `.claude/launch.json` item and the `content.config.ts` /
  `SYSTEM.md` precedent. Assign it. `public/` has the same gap — see below.
- [skills] **`public/robots.txt`, `public/_redirects` and `public/images/` have no owner either.**
  They are neither content nor component nor platform config, and `_redirects` in particular is the
  cutover's main deliverable. Assign `public/**` in the same pass.
- [skills] **A withdrawn rule needs a closing record where the rule lived, not only where it was
  withdrawn.** Three sessions filed a demand item for a robots block that had been withdrawn 12 days
  earlier, because the withdrawal was recorded in the risk audit and in `verification.md` while the
  *absence* in `robots.txt` looked like an oversight. Worth a general form: when a rule is withdrawn,
  the artefact that no longer implements it gets a comment saying so. First filing.
- [skills] `demand-split`'s header still counts its two halves in different units — this session moved
  it `83 open · 11 closed` → `75 open · 19 closed`, where 8 items closed and open fell by 8 only
  because none of them were deduped away. Already filed on 30 Jul; recording that it held here too,
  as the second sighting.
