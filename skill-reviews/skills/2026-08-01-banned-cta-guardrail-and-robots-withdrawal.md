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
| Skill docs teaching the banned CTA | 3 positive worked examples, 3 as the button's name | 0, gated by `check-claims` §8 |

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

## The skill was teaching what the skill banned

Asked to update the reference docs, I grepped the skill for the banned phrase and found the likely
**root cause of all 21 shipped CTAs**: three reference docs used it as a *positive* worked example.

| Where | What it said | Status |
|---|---|---|
| `content-formatting-guidelines.md` §S5 | "Ready to get started? **Enrol now**" — the worked example of a good micro-CTA | fixed |
| `seo-content-reference.md` CTA table | \| "**Enrol Now**" \| Transactional course pages (**strongest**) \| | fixed |
| `seo-content-reference.md` copy rules | "Book Your White Card Course" > "**Enrol Now**" > "Submit" | fixed |
| `trust-bar-guidelines.md` ×3 | "Enrol Now" as the generic *name of the enrol button* | reworded |
| `content-craft.md` weak-draft sample | uses it, but the critique never named the breach | critique amended |

An author following §S5 was breaching §1f **by following it**. The CTA table went further and ranked
the banned phrase as the strongest option available, in direct contradiction of `meta-framework.md`'s
❌/✅ table two files away. This is `mistakes-log` #1's family seen from the inside: not documentation
drifting from code, but one document in a skill drifting from another in the same skill.

So the guard added at `check-claims.mjs` §8 reads the **source of the copy**, not the copy.
`guardrails.ts` reads `dist/` and a reference doc is never built, so this class was invisible to
every gate the repo had.

### The guard's first run flagged 10, and only 3 were the defect

Recorded because it is the interesting part, and because the corpus already warns (`MIN_SHARED_WORDS`)
against tuning a heuristic until the output looks tidy. The other 7 split two ways:

- **4 legitimately catalogue the ban** — the ❌/✅ table, `quality-gates` item 11, `verification.md`
  §1f and its blocker list, `SKILL.md` stage 7. A doc must be able to name what it forbids.
- **3 were real drift of a milder kind** — `trust-bar-guidelines.md` using "Enrol Now" as the generic
  button name, normalising the label without recommending it. Reworded, not exempted.

The first fix was to widen the explanatory word list, which took 10 → 4 and then stalled: the
remaining 4 are labelled by their *block*, not their line — a don't-column labelled by its table
header, a deliberately-weak sample labelled by the critique underneath. Widening the word list
further would eventually exempt everything. So the test reads a ±4-line window instead, and the
window is deliberately small: a ban stated nine lines away is not labelling this example.

**Then I put the real defect back and watched it fail**, rather than trusting a green:

```
FAIL  Skill reference docs demonstrate a banned CTA in 1 place(s): ...seo-content-reference.md:211
--- restored ---
OK    Skill docs: no banned CTA demonstrated in a worked example (2 phrase(s) scanned)
```

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

- ~~[build] Rewrite the 21 "Enrol now" CTAs on `act-owner-builder-course`, `owner-builder-nsw-course`,
  `owner-builder-nsw-course-w` and `tas-owner-builder-course` to benefit-led first-person wording, and
  drop each page's entry from `BANNED_CTA_BUDGET` as it reaches 0. The build now FAILs if a count
  falls without the budget following it, so the two must move together.~~ **Closed 8 Aug 2026.**
  Measured 20 occurrences in `dist/`, not 21 (5 per page × 4 pages, matching the old budget exactly).
  Rewritten to "Start my {STATE} course [— $price]" / "Start my course" (sticky short form),
  following this item's own quoted example and the pattern already live on
  `wa-owner-builder-course`. `BANNED_CTA_BUDGET` emptied to `{}`. See
  `skill-reviews/skills/2026-08-08-review-trends-sparse-sample-and-cta-rewrite.md` for the disclosed
  skills/build crossing this required (the check and the content are coupled — see that review for
  why they couldn't land as separate commits).
- [design] The styleguide's `SectionWayfinder label="Enrol now"` specimen (`styleguide.astro:734`)
  teaches the banned wording as the worked example. Out of the guardrail's scope by construction (the
  page loop skips `styleguide/`), so nothing will ever catch it. Change the specimen's label.
- ~~[skills] **`src/integrations/guardrails.ts` has no owner in the session-types table.** This session
  edited it on the strength of the demand item being tagged `[skills]` and the file being a check, but
  the table never assigns it, and CLAUDE.md names it only to forbid *the improvement pass* from
  touching it. Same shape as the open `.claude/launch.json` item and the `content.config.ts` /
  `SYSTEM.md` precedent. Assign it. `public/` has the same gap — see below.~~ Assigned to skills,
  4 Aug 2026 — see CLAUDE.md's session-types section and
  `skill-reviews/skills/2026-08-04-provenance-gate-and-path-ownership.md`.
- ~~[skills] **`public/robots.txt`, `public/_redirects` and `public/images/` have no owner either.**
  They are neither content nor component nor platform config, and `_redirects` in particular is the
  cutover's main deliverable. Assign `public/**` in the same pass.~~ Assigned to **skills** 1 Aug
  2026, in the same pass as `.claude/launch.json` as this item asked — see
  `skill-reviews/skills/2026-08-01-session-type-gaps.md`.
- [skills] **A withdrawn rule needs a closing record where the rule lived, not only where it was
  withdrawn.** Three sessions filed a demand item for a robots block that had been withdrawn 12 days
  earlier, because the withdrawal was recorded in the risk audit and in `verification.md` while the
  *absence* in `robots.txt` looked like an oversight. Worth a general form: when a rule is withdrawn,
  the artefact that no longer implements it gets a comment saying so. First filing.
- [skills] **`seo-content-reference.md` contradicting a canonical rule is now evidenced, not just
  suspected.** The open item calls it "~80% declared mirror of three files that own their numbers"
  and asks whether it should become a pure index. It did not merely duplicate `meta-framework.md`'s
  CTA rule — it **contradicted** it, ranking the banned "Enrol Now" as the strongest CTA available.
  A stale mirror is a nuisance; a mirror that inverts the rule it mirrors is a defect generator.
  **Second sighting**, and the stronger argument for the index conversion.
- [skills] **A worked example is a rule with no owner.** `check-claims` §8 now guards one phrase in
  one skill. The general form — every normative "never do X" in the skill should be checkable against
  the skill's own examples — is unbuilt, and the ❌/✅ table in `meta-framework.md` already lists four
  more banned CTAs ("Sign up", "Learn more", "Click here") that nothing checks in docs or in `dist`.
  First filing; recorded, not built.
- ~~[skills] `demand-split`'s header still counts its two halves in different units — this session moved
  it `83 open · 11 closed` → `75 open · 19 closed`, where 8 items closed and open fell by 8 only
  because none of them were deduped away. Already filed on 30 Jul; recording that it held here too,
  as the second sighting.~~ fixed 4 Aug 2026, commit `92f6571`/`f26d159` — see
  `skill-reviews/skills/2026-08-04-demand-split-header-units.md`.
