---
date: 2026-08-04
skill: skills-session
subject: siteheader-nav-split
verdict: Amber
graded_by: self
---

# Skills review — splitting `SiteHeader.astro`'s nav data into `src/data/nav.ts`, 2026-08-04

Self-graded: there is no fresh-subagent skills grader yet (CLAUDE.md session-types rule 10).

## Verdict

**Amber, and the amber is the point, not a defect.** The fix is correct and measured
byte-identical against the pre-change build. It is graded Amber rather than Green because it
required a deliberate, disclosed session-type crossing — this session was declared `skills`,
whose table forbids `src/components/**` outright — and a crossing done on instruction is still a
crossing. Recording it plainly is what this rule exists for.

## Why this, and why now

The repo's oldest fired trigger, filed four times (`2026-07-28-abe-course-page-astro-white-card-
wa.md`, `2026-08-01-abe-course-page-astro-white-card-nsw.md`, `2026-08-02-self-declared-
repeats.md`, `2026-08-03-abe-course-page-astro-white-card-qld.md`): the orphan-page guardrail in
`guardrails.ts` fails a build with no nav link, and until today the only realistic way to satisfy
it was editing `SiteHeader.astro` directly — a design-owned file a build session may not touch.
Every one of the four filings named the same first option as the real fix: move the nav DATA out
of the component into a file build may edit, leaving the component to own only how it renders.

Surfaced today while reviewing `reports/handover-skills.md` at Andrey's request; built on his
explicit instruction after the crossing was named and the alternative (leave the trigger unbuilt)
was offered.

## What shipped

- **`src/data/nav.ts`** (new) — `navGroups`, `utility`, `studentPortal` and their five type
  interfaces (`Sub`, `Feature`, `Hub`, `Link`, `Group`), moved verbatim from `SiteHeader.astro`,
  every comment carried across unchanged (the authority-line note, the NSW-hold explanation, the
  CPD-bundles rework TODO — these are load-bearing institutional memory, not decoration).
- **`src/components/SiteHeader.astro`** — the three data blocks and five interfaces replaced with
  one import from `../data/nav`. Every render helper (`card`, `mega`, `mGroup`, the megamenu/burger
  controller script, all CSS) is untouched.
- **`scripts/check-positions.mjs`** — mechanism 2 repointed from `src/components/SiteHeader.astro`
  to `src/data/nav.ts` (constant renamed `SITEHEADER` → `NAV_DATA`). Without this, the check would
  have kept reading a file with no nav literals left in it and reported a clean, false 0-hit OK
  forever after — a check that stopped looking is worse than no check, because it still prints
  green. Caught before shipping, not after: see "Measured" below.
- **`CLAUDE.md`** — the SiteHeader component-gotcha section now states where nav data lives and
  the rule for adding a page's entry; `src/data/**` assigned to build (a gap already named twice
  before this and made load-bearing by this exact change — see "What this also closed"); the
  crossing disclosed in the session-types section.
- **Four source demand items closed** across `2026-07-28-abe-course-page-astro-white-card-wa.md`,
  `2026-08-01-abe-course-page-astro-white-card-nsw.md`, `2026-08-03-abe-course-page-astro-white-
  card-qld.md` and `skills/2026-08-02-self-declared-repeats.md` — all four filings of this exact
  trigger, struck through with a pointer here.

## Measured, before and after — not ticked

**Rendered output: byte-identical.** `git stash push -u -- src/components/SiteHeader.astro
src/data/nav.ts`, rebuilt, saved `dist/index.html`; popped the stash, rebuilt again, saved a
second copy. `diff` between the two: **exit 0, zero bytes different.** This is the one property
that actually matters for a "data moved, nothing changed" claim, and it was checked, not assumed.

**`check-positions.mjs`, before and after the repoint, same corpus:**

| | Before repoint (still pointed at `SiteHeader.astro`) | After |
|---|---|---|
| `tas-online-residency` hits | 12 (incl. `SiteHeader.astro:64`) | 12 (incl. `nav.ts:45` — same line, new address) |
| Mechanism 2 (`Nav data` / `SiteHeader nav`) | OK, 0 hits | OK, 0 hits |

Confirmed the hit count held exactly, and confirmed the ONE hit that used to name
`SiteHeader.astro` now names `nav.ts` at the corresponding line — not just "still 12", which could
have meant the check silently stopped finding the real one and coincidentally found a different
one elsewhere.

**Build and types:** `npm run build` — 22/22 guardrails, 21 pages, unchanged. `npm run check` — 0
errors, 0 warnings, same 372 pre-existing hints (104 files now, was 103 — `nav.ts` counted, nothing
else changed).

**`system-health`:** 2 failing before and after (both pre-existing, tracked, unrelated — the
`manual_fix_passes` trend and `check-positions`'s own TAS finding). 0 new.

## The crossing, disclosed rather than left to be found

This session was declared `skills`. `src/components/**` is explicitly forbidden to skills
sessions, with no exception carved out for refactors. `src/data/**` was unassigned at the moment
this session started editing it. Both were touched anyway, on Andrey's direct instruction, given
after I named the crossing and offered the alternative of leaving the trigger unbuilt for a design
session to pick up later. This is the same shape as three prior disclosed crossings in this repo's
own history (the QLD build session's `SiteHeader.astro` edit, the design session's
`check-redirect-targets.mjs` cherry-pick, and the original per-run "Andrey's explicit approval" on
`white-card-wa`) — none of which stopped happening once the rule existed, because the rule has no
declared hand-off mechanism (named as its own open item, `skills/2026-08-01-session-type-gaps.md`).
Recorded here, in `CLAUDE.md`'s session-types section, and in the commit — three places, not one,
because a fresh grader finding an undisclosed crossing invisible everywhere else is exactly the
failure this pattern exists to prevent.

## What this also closed, as a side effect rather than the goal

`src/data/**`'s missing owner (`skill-reviews/design/2026-08-02-siteheader-nsw-claim.md`: "It is
page data, edited by build sessions in practice, but the table does not say so") stopped being
theoretical the moment this split needed a file in that directory for build to own. Assigned to
build in the same `CLAUDE.md` edit, rather than filed as a fifth instance of the pattern to close
later.

## What was deliberately not done

- **The orphan-page guardrail itself is unchanged.** It still requires every new page to be linked
  from somewhere in the built site. That requirement is correct and untouched; only WHO may satisfy
  it (via `nav.ts`) changed.
- **No page's own nav entry was added, removed or reworded.** This is a pure location move —
  verified by the byte-identical diff above — not an IA change. Any future page still needs its own
  entry added to `nav.ts` by whichever session ships it; that entry itself is ordinary build work,
  not part of this fix.
- **The Phase 3 "session-type path check" (the mechanical commit-diff tool) was not built.** This
  fix removes the NEED for that specific crossing to keep recurring on nav entries; it does not
  build the general-purpose detector ROADMAP still lists as unbuilt for crossings of every other
  kind. Different fix, still open.

## Session type held

Declared `skills`. **Did not hold `src/components/**` or `src/data/**` boundaries** — see "The
crossing, disclosed" above; that is the finding of this review, not an omission from it. Otherwise
ordinary skills-owned work: `CLAUDE.md`, `scripts/check-positions.mjs`, four `skill-reviews/**`
closures, this review.

Not shipped — working tree only, pending Andrey's review.

## Demand list
Tag every item: [skills] | [design] | [facts] | [build]

- [skills] none.
