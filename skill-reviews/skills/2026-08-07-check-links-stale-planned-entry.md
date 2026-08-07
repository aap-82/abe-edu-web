---
date: 2026-08-07
skill: skills-session
subject: check-links.mjs stale PLANNED entry for /white-card
verdict: Green
graded_by: self
---

# Skills review — delete stale `/white-card` PLANNED entry, 2026-08-07

## Verdict

**Green.** A one-line deletion, exactly as the check's own FAIL message specified. Verified rather
than assumed that no other `PLANNED` entry needed the same treatment before closing.

## What shipped

`scripts/check-links.mjs`'s `PLANNED` map carried `['/white-card', 'W3-6 - White Card hub']` since
before the hub existed. The hub shipped 4 Aug 2026; the entry was never removed, so the check's own
self-cleaning design (documented in its own header comment: "exists + still planned -> FAIL. The
page landed; delete its line below") correctly started failing. Deleted the one line.

## Measured, not assumed

Checked every remaining `PLANNED` entry against a fresh `dist/` build before touching anything,
rather than deleting only the one named in the FAIL message and hoping the rest were still current:

| Entry | Pass named | Built? |
|---|---|---|
| `/about` | W4 - about page | No |
| `/contact` | W5-4 - contact | No |
| `/faq` | W5-4 - FAQ | No |
| `/terms` | W5-5 - legal | No |
| `/privacy` | W5-5 - legal | No |
| `/cookies` | W5-5 - legal | No |
| `/cancellation-and-refund-policy` | W5-5 - legal | No |
| `/saaustralia` | Solar Association Australia partner page | No |
| `/tas-cpd-architects-courses` | W3 - TAS architects CPD | No |
| `/tas-cpd-building-designers-courses` | W3 - TAS building designers CPD | No |

All ten confirmed absent from `dist/` after a fresh `npm run build`. Only `/white-card` had landed.

**Before:** `node scripts/check-links.mjs` — 1 failing, 3 warning.
**After:** `node scripts/check-links.mjs` — **0 failing**, 3 warning (the 3 warnings are pre-existing
LearnWorlds same-origin links, unrelated to this fix and outside this task's scope).
**Build:** `npm run build` — 24/24 guardrails, unaffected (this file isn't part of the build).
**Typecheck:** `npm run check` — 0 errors, 0 warnings, unchanged.
**`system-health.mjs`**: 2 failing remain (`turns_to_passed_audit` trend, and the unrelated
`tas-online-residency` position contradiction, 11 places) — both pre-existing, both already tracked
elsewhere (a spawned build task and `handover/HANDOVER-white-card-stage7-drift-2026-08-07.md`
item 2 respectively), neither touched by this change.

## What worked

Checking the fresh build against every `PLANNED` entry, not just the one named, is what the task
itself asked for ("confirm... no other PLANNED entries need the same treatment while you're in the
file") and is cheap insurance against the exact failure mode this file's own header comment warns
about: `PLANNED` "rotting into a permanent allowlist" if entries aren't pruned as pages ship.

## What didn't

Nothing found. This was a correctly-scoped, single-line fix.

## Demand list
Tag every item: [skills] | [design] | [facts] | [build]

- [skills] none.

## Output
N/A — Green, nothing further to route.
