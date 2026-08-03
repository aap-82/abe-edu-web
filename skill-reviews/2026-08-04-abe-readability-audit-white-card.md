---
date: 2026-08-04
skill: abe-readability-audit
subject: white-card
verdict: Green
graded_by: self
---

> **SUPERSEDED, 4 Aug 2026 (same day).** This review audited the ad-hoc `/white-card` build (written
> directly from Recipe B + the archetype-06 reference, not through the formal `abe-course-page-astro`
> pipeline). Later the same day, Andrey asked for the hub to be rebuilt from scratch through the full
> 9-stage pipeline, and the file this review describes was overwritten. The readability findings below
> (the `HubLayout.astro` intro-capsule CPL and the shared-token contrast issue) are **not stale** — the
> rebuilt page carries the identical sitewide/shared-component defects, re-measured independently in
> `pipeline/white-card/07-verification.md` (Stage 7, fresh subagent) and reconciled again in
> `skill-reviews/2026-08-04-abe-course-page-astro-white-card-hub-rebuild.md` (Stage 9). Read this file
> for readability-audit method and history only; for the current state of `/white-card`, read the
> rebuild review instead.

# Readability audit: /white-card (hub)
Page type: hub | Audited: 4 August 2026

## Verdict

**Green.** Every mechanical FAIL this page carries is byte-identical to the already-shipped
`/owner-builder-courses` hub, confirmed by running both scripts against both pages side by side
— they are `HubLayout`-level and design-token-level, not defects introduced by this page's own
content. The one genuinely new, non-shared finding is a Flag, not a Fail: the comparison table's
"Training provider" row is arguably a differentiator worth keeping, but the credential fact
(nationally recognised, CPCWHS1001) is correctly stated once rather than repeated per state,
which archetype 6 asks for.

## Scorecard

| Dimension | Verdict | One-line note |
|---|---|---|
| Line length (measure) | Fail (shared) | ~91 CPL on the "Choose your state" intro capsule at 1280px — identical on `/owner-builder-courses` |
| Font size and smallest text | Pass | Body 17px; smallest is the already-settled 11px Label-token floor (38 declarations, all sitewide components, not page content) |
| Line spacing and vertical rhythm | Pass | Matches `HubLayout`'s established rhythm |
| Hierarchy and type roles | Pass | One H1, question-led H2s, mono eyebrow/label roles used consistently |
| Typeface and character legibility | Pass | DM Sans body, DM Mono prices/codes — no 0/O or 1/l ambiguity in CPCWHS1001 or the price column |
| Columns, grids and Gestalt grouping | Pass | Spoke grid stacks at mobile; comparison table is a real `<table>`, not a faked grid |
| Alignment and paragraph structure | Pass | Left-aligned throughout; no justified text |
| Contrast and colour | Fail (shared) | 2.68:1 on "About" (disabled nav) and "Coming soon" (disabled comparison cell / soon badge) — same `--slate-light` token, same measured ratio, on `/owner-builder-courses` too. Already adjudicated: `skill-reviews/design/2026-07-30-measure-contrast-and-tap-targets.md` rules the disabled-"About" case not a defect under WCAG 1.4.3 (inactive UI component exemption). The "Coming soon" instance is the same exemption applied to the ACT comparison column and the nav's "Soon" badges, both genuinely inactive. |
| Scanning, chunking and answer-first ordering | Pass | Intro answers "why does state matter" before the grid; each FAQ is question-led |
| Progressive disclosure and accordions | Pass | FAQ accordion only; nothing load-bearing hidden |
| Conversion-element placement | Pass | No CTA sells the hub itself (archetype 6 rule); routing CTA appears in hero, spoke grid and CTA band |
| Mobile, reflow and page weight | Pass | No horizontal overflow at 320/360/390px; comparison table's mobile behaviour matches the OB hub |
| Wayfinding and information scent | Pass | `WayfinderNav` present (Choose your state / Compare / FAQ); states not covered (ACT, VIC, SA, NT) named in FAQ per archetype 6 §8 |
| Accessibility | Pass | Tap targets ≥44px (14 checked); heading order correct; `lang="en-AU"`; 1 image, 1 alt (the hardcoded hub placeholder) |

## Top fixes (ranked by impact)

1. **Cap the "Choose your state" intro capsule's column** — currently renders at 820px (~91 CPL) on
   desktop; the site's own `.capsule` class already defines a 66ch cap, so the fix is applying it
   (or `.measure`'s 480px) to this specific instance in `HubLayout.astro`. **Design/component
   change**, not a per-page tweak — fixing `HubLayout.astro` fixes both hubs at once, and any
   future hub built on it. **Second occurrence**, now measured on two hub pages with an identical
   figure (91 CPL, 820px column) — past the point of coincidence.
2. **No action on the two contrast Fails.** Both are the site's already-adjudicated
   `--slate-light`-on-disabled-element exemption (WCAG 1.4.3), verified identical to the
   already-shipped `/owner-builder-courses`. Scored Fail per this audit's hard-rule convention
   because the rule is mechanical, but re-opening either would contradict a decision the design
   register already made — see `skill-reviews/design/2026-07-30-measure-contrast-and-tap-targets.md`.

## Detailed findings

**Line length.** `audit_render.py` measured ~91 CPL at 1280px on the widest prose block (820px
container at 18px body), specifically the `<AnswerCapsule>` under "Choose your state". Re-ran the
identical probe against `/owner-builder-courses` and got the exact same figure (820px, 91 CPL) —
this is not this page's content overflowing a cap, it is the cap not reaching this specific
`Section` + `AnswerCapsule` combination in `HubLayout.astro` at all. `contrast_check.py --cpl 820
18` confirms 91 is "too wide (>75)" and that ~594px (66ch) would land in the comfortable range.

**Contrast.** Two rendered failures, both `rgb(154,154,154)` (`--slate-light`) on
`rgb(251,249,245)` (`--ground`): the disabled "About" utility nav link (2.68:1, 13px) and
"Coming soon" text (2.68:1, 11px) — the ACT comparison-column cell and the megamenu/mobile-nav
"Soon" badge share this exact styling. All three are inactive-state UI, which WCAG 1.4.3
exempts, and the "About" instance specifically has already been reviewed and ruled correct on
this token. Not re-litigated here per the design register's own standing decision.

**Static lint.** One FAIL (`--paper: #ffffff` read as "pure white page ground") and one FLAG
(38 declarations at the sitewide 11px Label-token floor) — both reproduced identically against
`/owner-builder-courses`. The FAIL is a known false positive: CLAUDE.md's own token documentation
states `--ground` (#fbf9f5) is the page ground and `--paper` (#ffffff) is deliberately reserved for
elevated surfaces (cards, megamenu) — the static script cannot distinguish the two roles from a
stylesheet read alone. The FLAG is the already-settled 11px mono-label exception
(`skill-reviews/design/2026-08-01-type-floor-and-tap-targets.md`), confirmed by name-matching every
one of the 38 selectors to a sitewide component class, none of them page content.

**Archetype-6 conformance (hub-specific).** The page states the differentiator (delivery mode)
before the grid, states shared facts (nationally recognised, once issued) once rather than per
spoke, names the states not covered, and carries no price or CTA for the hub itself — all per
`references/archetypes/06-hub.md` §§2–4. The comparison table is the routing mechanism the
archetype calls for, not a second explanation of the spokes' own content.

## Already working (leave alone)

Left-alignment, non-pure-black ink, question-led FAQ headings, the spoke grid's mobile stacking,
and the hub's own restraint (no price, no CTA microcopy pitching the hub itself, states not
covered named plainly) are all already correct and match the pattern the owner-builder hub set.

## Output

- **Fix applied:** none — the one real design-owned finding (the intro capsule's column width) is
  outside a build session's writable paths (`src/layouts/**`). Filed below as `[design]`.
- **Mistakes-log:** not incremented. The CPL finding is new evidence for an existing class
  (unconstrained prose column in a shared layout) rather than a previously-logged risk recurring
  verbatim; a design session closing this should judge whether it belongs alongside an existing
  row or as its own.

## Demand list
Tag every item: [skills] | [design] | [facts] | [build]

- [design] **`HubLayout.astro`'s "Choose your state" `<AnswerCapsule>` renders at ~91 CPL (820px
  column) on desktop, uncapped by either `.capsule`'s 66ch or `.measure`'s 480px.** Measured
  identically on both hub pages that exist (`/owner-builder-courses` and the new `/white-card`),
  so fixing `HubLayout.astro` once fixes both, and every hub built on it after. **Second
  occurrence, same figure both times** — past a coincidence, and the trigger for treating this as
  a layout defect rather than a one-page tweak.
