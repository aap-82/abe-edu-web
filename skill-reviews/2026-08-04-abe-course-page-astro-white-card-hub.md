---
date: 2026-08-04
skill: abe-course-page-astro
subject: white-card-hub
verdict: Green
graded_by: self
---

> **SUPERSEDED, 4 Aug 2026 (same day).** This review graded an ad-hoc build of `/white-card` — written
> directly from Recipe B + the archetype-06 reference file, self-graded, with no `pipeline/white-card/`
> artefacts. Later the same day Andrey asked for the hub to be rebuilt from scratch through the full
> formal `abe-course-page-astro` pipeline (Stages 1-9, artefacts in `pipeline/white-card/`), and
> `src/content/hubs/white-card.mdx` was overwritten. Read this file for history only (it records real
> work — the SiteHeader/nav.ts wiring and the four spokes' breadcrumb restoration described below did
> ship and were not undone); for the current build's own grading, read
> `skill-reviews/2026-08-04-abe-course-page-astro-white-card-hub-rebuild.md`, graded by an independent
> fresh subagent rather than self-graded.

# Stage 9 — `/white-card` hub (W3-6), 2026-08-04

Self-graded: no fresh-subagent build grader exists yet (CLAUDE.md session-types rule 6 permits
self-grading with a stated reason).

## Verdict

**Green.** Recipe B, all four steps. Build green, 23/23 guardrails (up from 22), hub bijection
passes, every downlink resolves. The two mechanical audits (readability, `check-links`) both
returned findings, and both are explained with direct evidence rather than waved past: the
readability Fails are byte-identical to the already-shipped `/owner-builder-courses` hub (a
shared `HubLayout` issue, filed `[design]`), and the `check-links` Fail is `check-links.mjs`
correctly noticing its own `PLANNED` map is now stale (filed `[skills]`, since `scripts/**` is
outside this session's writable paths).

## What shipped

- **`src/content/hubs/white-card.mdx`** (new) — the hub. Four live spokes (WA, TAS, NSW, QLD) as
  `reference('courses')`; ACT as a `soon: true` comparison column only, same treatment
  `/owner-builder-courses` gives NSW, because no `/white-card-act` page exists yet to reference.
- **`src/pages/white-card.astro`** (new) — the route stub, mirroring
  `owner-builder-courses.astro` exactly.
- **`src/data/nav.ts`** — White Card Hub entry changed from `{ soon: true }` to
  `{ href: '/white-card' }`. Build-owned since 4 Aug 2026 (see the same day's path-ownership
  work); this is the file's first real use for exactly the purpose it was split out for.
- **Four spoke pages' breadcrumbs restored** — `white-card-nsw.mdx`, `white-card-wa.mdx`,
  `white-card-tas.mdx`, `white-card-qld.mdx` all go from a 2-level (`Home > White Card {State}`)
  to the correct 3-level (`Home > White Card > White Card {State}`) breadcrumb, now that
  `/white-card` exists to be the middle crumb. Three of the four carried a comment explaining why
  the crumb was deliberately absent and instructing a future session to restore it "when W3-6
  ships" — this is that session. Verified rendered, not just edited: `document.querySelector`
  against the live page for both WA and QLD confirmed `HOME / WHITE CARD / WHITE CARD {STATE}`.

## Recipe B, step by step

1. **[COW] Hub-level intro + one card per spoke.** The differentiator is delivery mode (WA/TAS
   self-paced online, NSW/QLD live trainer), stated before the grid — genuinely hub-level, not a
   state page in disguise, per the cannibalisation gate. `final-check` caught a real first-draft
   defect here: the hero subhead and the intro capsule said almost the same thing back to back
   (both explaining the WA/TAS-vs-NSW/QLD split in nearly identical wording). Fixed by shortening
   the subhead to a one-line teaser and letting the intro carry the full explanation — the kind of
   duplication this audit exists to catch, not shared with the already-shipped OB hub (checked).
2. **[CC] `HubLayout`, `ItemList` + `BreadcrumbList`, comparison table.** Built on the existing
   layout unchanged. Comparison table: Price / Delivery / Government card fee / Training
   provider — four rows, all genuine differentiators (credential is identical across all four
   spokes, so it is stated once in the FAQ rather than repeated as a fifth, redundant row, per
   archetype 6 §4's "shared context, once" rule). Links down to spokes only.
3. **[CC] Every downlink resolves.** All four spoke pages existed before this build started
   (items 2–4, 7 already closed). `check-links.mjs` confirms — see below.
4. **Audits + universal DoD.** See the next section.

## Universal DoD, checked not assumed

| Requirement | Result |
|---|---|
| Green `npm run build` | 23/23 guardrails, 22 pages (was 21) |
| One `<h1>`, question-led H2s, 40-60 word capsules | `audit_static.py`: 1 H1. FAQ questions are the routing/objection questions archetype 6 §8 asks for. |
| Single JSON-LD `@graph`, correct authority model | `HubLayout` emits `BreadcrumbList` + `ItemList` only — no `Course` node, matching "a hub is never itself a course" |
| Government facts sourced + dated | `footerSources`: WorkSafe WA, Service Tasmania, SafeWork NSW, WHSQ Conditions of Agreement V6.1 — the same primary sources already cited on each spoke page, not re-derived |
| Em-dash / banned-word lint | `prose-lint.mjs`: 0 hits on the new hub file |
| `abe-readability-audit` pass | Green, with explained Fails — see `skill-reviews/2026-08-04-abe-readability-audit-white-card.md` |
| `final-check` clean | 5/6 clean on first read; the one real finding (subhead/intro duplication) fixed same pass, confirmed on re-read |
| Lighthouse CI | Not run this session (no CI trigger from a local build) — flagged, not skipped silently |
| Named-reviewer E-E-A-T | `reviewedBy: Dominic Ogburn` — the hub convention (`BaseLayout.astro:18`'s own comment: "Warwick Smith on course pages, Dominic Ogburn on hubs") |

## Measured, not ticked

- `npm run build`: 23/23 guardrails passed (was 22/22 before this session).
- `check-positions.mjs`: still 12 hits on `tas-online-residency`, unchanged in count — confirmed
  the hub's own TAS blurb and comparison cells do **not** add a 13th. Deliberately wrote "Complete
  the whole course online and self-paced" with no residency or location qualifier at all, per the
  register's own §3 instruction, rather than repeating the exact claim this check already flags
  as unsourced.
- `check-claims.mjs`: one new WARN, `$169` (QLD's Saturday rate, stated in the comparison
  caption) not recognised as an ABE price. Same shape as seven pre-existing warnings already
  carried on `white-card-qld.mdx` itself for the identical figure — a `check-claims` heuristic
  gap (it only auto-exempts a page's frontmatter `price` field, not a second price mentioned in
  prose), not a new class of defect. Not fixed here (`scripts/**` is out of this session's scope);
  not filed again either, since it is not a new sighting of a defect nobody has named — it is the
  same named gap extending to one more file.
- `check-links.mjs`: **1 new FAIL**, correct and expected — `/white-card now exists but is still
  listed in PLANNED`. This is the check doing exactly its job the moment the condition it watches
  for became true. Filed below.
- Rendered verification: both a desktop megamenu click-through (`/qld-owner-builder-course`
  earlier this session) and the White Card hub's own spoke grid, comparison table and FAQ
  confirmed via `get_page_text` against the live dev server — all four spokes, all four price
  rows, the ACT "Coming soon" cell, and the FAQ's six questions render exactly as authored.

## What was deliberately not done

- **`HubLayout.astro`'s uncapped intro-capsule column (~91 CPL) was not fixed.** `src/layouts/**`
  is design-owned; this session confirmed the defect is shared byte-for-byte with the
  already-shipped OB hub (not something this build introduced) and filed it as a `[design]` item
  with the measured evidence, rather than either fixing it out of scope or omitting it because it
  predates this build.
- **`check-links.mjs`'s stale `/white-card` `PLANNED` entry was not fixed.** `scripts/**` is
  skills-owned. Filed below.
- **Lighthouse CI was not run.** No PR/preview URL exists yet for this branch at review time.
  Flagged rather than assumed green.

## Session type held

Build-owned throughout: `src/content/hubs/**` (new), `src/pages/**` (new stub), four spoke
`src/content/courses/**` files (breadcrumb restoration), `src/data/nav.ts` (build-owned since
4 Aug), and this review plus the readability sub-review in `skill-reviews/`. Did not touch
`src/layouts/**`, `src/components/**`, `scripts/**` or `kb/**` — both real findings that would
have required them are filed as demand items instead of fixed in place.

Not shipped — working tree only, pending Andrey's review.

## Demand list
Tag every item: [skills] | [design] | [facts] | [build]

- ~~[skills] **`scripts/check-links.mjs`'s `PLANNED` map still lists `/white-card` → "W3-6 - White
  Card hub", and the hub shipped today.** The check itself already names the fix: "Delete its
  line in `scripts/check-links.mjs`." Mechanical, one line, `scripts/**` is outside this session's
  writable paths.~~ fixed 7 Aug 2026 in a dedicated session (skill-reviews/skills/2026-08-07-check-links-stale-planned-entry.md: check-links went 1 failing to 0). Struck 14 Aug 2026 by the new demand-split staleness detector, which found it on its first sharpened run: filed twice on 4 Aug, fixed three days later, and left open for a further seven because nobody went back to the filing reviews. Verified before striking - /white-card no longer appears in the PLANNED map.
- [design] see `skill-reviews/2026-08-04-abe-readability-audit-white-card.md` — `HubLayout.astro`'s
  intro-capsule column width, filed there with the full measurement and the OB-hub comparison.
