---
date: 2026-08-10
skill: skills-session
subject: page-type-engine.md stale Owner Builder tail slugs
verdict: Green
graded_by: self
---

# Skills review — stale slugs in `page-type-engine.md`, 2026-08-10

## Verdict

**Green.** Three wrong URL rows corrected in the file that tells every Owner Builder page where to
cross-link, and the confirmed `/project-advisory` slug recorded with its reasoning so the next
session does not re-litigate it against the sitemap doc.

## Pre-flight

`node scripts/system-health.mjs` — **0 failing**, 34 warning, 66 ok.

## What was wrong

`references/seo/page-type-engine.md` is the canonical URL and internal-linking table for the whole
site, and three of its Owner Builder rows named pages that do not exist under those slugs:

| Line | Row | Was | Now | Why |
|---|---|---|---|---|
| 401 | OB hub downlink | `/insurance` | `/owner-builder-insurance` | The page **shipped 9 Aug 2026** under the longer slug |
| 414 | State-page cross-link | `/insurance` | `/owner-builder-insurance` | Same page. **This is the row every state page is told to link to** |
| 29 | Insurance **Hub** page-type | `/insurance` | `/insurances` | A *different* page. `new site/abe-new-site-sitemap.md` gives the hub as `/insurances` (plural), with the two service pages beneath it |

Rows 401 and 414 pointed at a slug that has never existed. Row 29 is the unbuilt hub, so nothing
depends on it yet, but it would have been read as authoritative by whoever builds it.

## The one that nearly got away

The first two were found by reading the line ranges the earlier grep surfaced. **The third was found
only by re-grepping the whole file after fixing them** — and it changed the finding, because row 29
is a different page with a different correct answer, not another instance of the same mistake. The
note written into the file initially said "wrong in both places it appeared"; that sentence was
itself wrong for about a minute, and is now corrected to name all three.

This is the same shape as the budget table typed from a truncated terminal earlier today: **a
line-range read is not an enumeration.** Recorded in the file's own note so the lesson sits where the
next editor will meet it.

## `/project-advisory`, confirmed rather than guessed

The two planning documents disagreed and neither was obviously right:

- `new site/abe-new-site-sitemap.md:29` → `/project-advisory-pack`, self-flagged **"slug TBC —
  confirm the preferred slug"**
- `page-type-engine.md:400,415` → `/project-advisory`, used as canonical **and** as the state-page
  cross-link target

Put to Andrey with that trade-off stated; **`/project-advisory` confirmed**, on the grounds that this
file already used it in two load-bearing positions, so confirming it left fewer stale references than
changing it would have. The reasoning is now in the file, along with the fact that the **sitemap doc
is now the stale one** and needs reconciling.

## Measured

| Check | Before | After |
|---|---|---|
| Bare `` `/insurance` `` slug references in the skill | **3** | **0** (2 remaining mentions are inside the explanatory note, describing the old value) |
| `system-health` skill references | 89/89 resolve | **89/89 resolve** |
| `system-health` | 0 failing | **0 failing** |

## What worked

Re-grepping after the fix rather than trusting the first search. It turned a two-row correction into
a three-row one and caught that the third row needed a *different* value.

## What didn't

Nothing beyond the near-miss above. The task was correctly scoped and self-contained.

## Demand list
Tag every item: [skills] | [design] | [facts] | [build]

- [skills] **`new site/abe-new-site-sitemap.md:29` still says `/project-advisory-pack`** and is now
  the stale document, since the slug was confirmed as `/project-advisory` today. Same file also
  carries the `/insurances` hub IA that `page-type-engine.md` now matches, so only the advisory row
  needs changing. Skills-owned (the five top-level `new site/*.md` planning docs), not done here to
  keep this session to one file.
- [skills] **Nothing checks that a slug named in the skill's URL tables resolves to a built page or
  a `PLANNED` entry.** `check-links.mjs` does exactly this job for `dist/`, and `system-health`'s
  dangling-reference check does it for file paths in governance docs, but a *URL* in a skill
  reference table is checked by neither — which is how `/insurance` survived in three rows. The
  existing `PLANNED` map in `check-links.mjs` is the natural place to reconcile against.

## Output
- [x] Fix applied — three rows corrected, reasoning recorded in the file

## Grader note

`graded_by: self` — no fresh-subagent skills grader (rule 10). Low risk: the change is three table
cells and a note, with before/after grep counts given above.
