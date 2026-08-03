---
date: 2026-08-04
skill: skills-session
subject: demand-split-header-units
verdict: Green
graded_by: self
---

# Skills review — `demand-split`'s header-units mismatch, 2026-08-04

Self-graded: there is no fresh-subagent skills grader yet (CLAUDE.md session-types rule 10).

## Verdict

**Green.** Closes the last open half of todo item 11
(`handover/HANDOVER-todo-2026-08-02.md`), past its trigger threshold three times over: filed
30 Jul, 1 Aug and 2 Aug (`skill-reviews/skills/2026-08-02-self-declared-repeats.md`), fixed here.

## What was wrong

`scripts/demand-split.mjs`'s per-destination header read `**${openCount} open · ${closedCount}
closed.**`, and the two numbers were computed by different rules:

- `openCount = entries.length` — `entries` is the DEDUPLICATED bucket: near-duplicate open filings
  of the same complaint collapse into one entry with a `count` field.
- `closedCount` — a raw sum of every struck (`~~[tag] ...~~`) line across every review, with no
  deduplication at all.

So the same complaint filed and closed by three separate reviews read as "3 closed" while an
identical complaint filed three times and never closed would read as "1 open" — two different
units in one sentence, exactly as the three filings described.

## What shipped

A new `bucketItem()` helper, factored out of the open-item loop, that applies the identical
near-miss key logic (`normalise()` / `normaliseProseOnly()`, matched on either key) to whichever
population it is given. `main()` now builds a second bucket set, `closedBuckets`, from
`review.closed` per destination, and `closedCount` is `new Set(closedBuckets.get(destination)
.values()).size` — the same "distinct complaints" unit `openCount` already used.

The two buckets are kept **separate**, deliberately: a complaint filed, closed, then filed again
later as a genuine regression should count once in each, not cancel out or merge across the
open/closed boundary. Closed items with no valid destination tag are still excluded from every
`closedCount`, unchanged from before — a separate, smaller gap (no "unrouted closed" report),
named in the code comment rather than folded into this fix.

## Measured, before and after

Ran the pre-fix script (`git show HEAD:scripts/demand-split.mjs`) and the fixed version
side by side against the same 49 reviews:

| Destination | open | closed (before, raw) | closed (after, deduped) |
|---|---|---|---|
| skills | 111 | 24 | 24 |
| design | 48 | **39** | **38** |
| facts | 12 | **13** | **12** |
| build | 25 | 6 | 6 |

Two destinations changed, by exactly one each — not a wide, unexplained swing, which would have
been a reason to distrust the fix rather than ship it. Found and confirmed by hand which two pairs
collapsed:

- **design (39→38):** `ModuleRows`' `.mr-body { max-width: 70ch }` at ~91 CPL, filed and closed in
  both `skill-reviews/design/2026-07-30-credentials-cards.md` and
  `skill-reviews/design/2026-07-30-unit-outline.md` — one defect, closed twice, now counted once.
- **facts (13→12):** `competitor-pricing-snapshot.md` §2's WA-row commodity-self-paced
  classification, filed and closed in both `skill-reviews/2026-07-28-abe-course-page-astro-white-
  card-wa.md` and `skill-reviews/skills/2026-07-29-system-audit.md` — same shape, same fix.

`skills` and `build` were unaffected — no near-duplicate closed filings existed in either, which is
itself evidence the fix targets the specific defect rather than changing the count for unrelated
reasons.

`demand-split.mjs --write --strict` after the fix: exit 0, `196 tagged item(s) all route`, unrouted
0, no MALFORMED lines. `system-health`: 2 failing (both pre-existing and tracked, unrelated to this
change), 0 new.

## What was deliberately not done

**The staleness signal — explicitly out of scope, per instruction.** `skill-reviews/skills/2026-08-
02-self-declared-repeats.md`'s other named gap ("open items carry no age, a 23 Jul item ranks
equally with today's") is unrelated to the units mismatch and was scoped out of this pass rather
than bundled in. Still open, still worth its own pass.

## Session type held

Only `scripts/demand-split.mjs` and this review — both skills-owned. `reports/handover-*.md`
regenerated as a side effect of running the tool, per its own documented contract (derived,
gitignored, never hand-edited).

`system-health` run before (2 failing, 30 warning, 51 ok) and after (identical). Not shipped —
working tree only, pending Andrey's review.

## Demand list
Tag every item: [skills] | [design] | [facts] | [build]

- [skills] none.
