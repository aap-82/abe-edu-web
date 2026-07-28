---
# Machine-readable block for a DESIGN review. Kept in skill-reviews/design/ so the flat
# skill-reviews/*.md build-run scans (system-health coverage, review-trends) never read it.
date: 2026-07-28
kind: design
subject: design/dead-chrome-links
graded_by: self
grade_reason: no fresh-subagent design grader exists yet; consistent with the 2026-07-25 and 2026-07-27 design reviews.
verdict: Green
shipped:
  - src/components/SourcesFooter.astro   # removed the /cpd-bundles column entry
  - src/pages/styleguide.astro           # WayfinderNav specimen pointed at real section ids
---

# Design review — dead links in sitewide chrome and in the nav specimen

Session type: **design**. Opened directly after the `skills` session that fixed the
`abe-course-page-astro` audit's `[skills]` items (`f465915`), which routed two items here. Pre-flight
`node scripts/system-health.mjs` → **0 failing** before starting.

Both changes are one class of defect: a link in shared chrome pointing at nothing, invisible to every
gate because the gates checked the other direction.

## The problem

A full audit of the skill on 28 Jul found the footer linking **all 19 pages** at ten URLs that are not
built. `guardrails.ts` resolves in-page anchors (check 6) and catches orphans (check 8, nothing links
*to* a page), but nothing verified that a link points *at* something. Nine of the ten were legitimately
unbuilt Wave 3-5 pages. One was not.

- **`/cpd-bundles`** had been dropped from the IA outright — the bundle *is* the product and lives at
  `/cpd-{category}-{state}` (`references/archetypes/04-cpd-bundle.md`,
  `new site/abe-new-site-sitemap.md:81`). It could never resolve, and it breached `SourcesFooter.astro`'s
  own header rule, three lines above the array: *do not add a link here for a route with no ticket*.
- **`/styleguide`** carried three dead in-page anchors. The `WayfinderNav` specimen used
  `#course` / `#cost` / `#faq` — realistic course-page labels, but no element on the styleguide carries
  those ids. They survived since W0 because `WayfinderNav` renders a `<nav>` preceded by chrome that
  `pageBody()` strips, so guardrails classed them as site chrome and **warned instead of failing**
  ("Reported, not failed - the fix is a content decision"). A warning on an internal page is quiet
  enough to live forever.

## What shipped, with measured values (not ticks)

Measured by re-running `scripts/check-links.mjs` (added by the preceding skills session) and an
independent full-sweep script over `dist/`, before and after.

| Measure | Before | After |
|---|---|---|
| `check-links` result | **1 failing**, 2 warning | **0 failing**, 2 warning |
| Same-origin links resolving | — | **712** (11 to explicitly planned pages) |
| Distinct dead link targets | **10** | **9**, every one named in `PLANNED` with its wave |
| Dead link instances across the site | **192** | **171** |
| `/cpd-bundles` instances | **18** | **0** |
| Dead in-page anchors on `/styleguide` | **3** | **0** |
| `guardrails` | 19 pages passed | 19 pages passed |

The 21-instance drop is exactly 18 (`/cpd-bundles` on 18 pages) + 3 (styleguide anchors), so nothing
else moved.

The nav specimen now points at `#g-content`, `#g-nav`, `#g-trust`. Verified structurally in the built
HTML rather than asserted: all three hrefs present, each target id occurring **exactly once** in the
same document, and **zero** `preventDefault` on the page, so these are native fragment links to
existing targets. A component library demonstrates a component by making it work; an inert nav
specimen shows the styling and hides the behaviour.

**Not verified in a browser, deliberately.** The Astro CLI is a singleton daemon: a worktree cannot
run its own dev server (the wrapper ignores `--port` and reuses `:4321` from the main checkout), so a
browser check here would have rendered the *main repo's* code and reported a pass that said nothing
about this change. A misleading verification is worse than a stated structural one.

## Design-register changes

**None.** No token, no `global.css` rule, no radius/surface/border/colour change. Both edits are link
data in a component and a page. Rule 7 (token and design-register changes are exclusive) is not
engaged, which is why these two could ship together.

## What worked

- The `check-links` script written in the preceding session paid for itself immediately: it turned
  "192 broken links" into one actionable line naming the single defect that was not planned work, and
  it went from 1 failing to 0 on this change with no interpretation needed.
- Reading the component's own header comment decided the `/cpd-bundles` question outright. The rule
  was already written and already correct; the array had drifted from it.

## What didn't

- The styleguide anchors had been *reported by guardrails on every build since W0* and nobody read
  them. The chrome-warning branch is right in principle — a shared anchor genuinely may not exist on
  every page — but it means a real defect and an expected mismatch look identical in the log. This is
  the same shape as mistakes-log #1's 4th sighting: the check ran, was honest, and was not read.

## Demand list

Tag every item: [skills] | [design] | [facts]

- [skills] `guardrails` chrome-anchor warnings are indistinguishable from expected mismatches, so they
  are never read. Either name the chrome anchors that are *allowed* to miss (the `PLANNED` idiom, as
  `check-links` and `check-redirect-targets` both use) and fail on the rest, or drop the branch. A
  warning that is always partly wrong trains readers to skip it.
- [skills] `check-links` is standing but nothing invokes it. Decided this session to leave it
  standalone (`package.json` is off-limits without an explicit ask, and wiring it into `system-health`
  as a FAIL would halt build sessions over a chrome defect). Revisit if a dead link ships again.
- [design] Nine footer links still point at unbuilt Wave 3-5 pages. Correct sequencing per the
  component's own comment, and now explicitly tracked in `check-links`' `PLANNED`, but they are live
  404s on the preview host today. Confirm before cutover that Waves 3-5 have landed, or gate the
  footer columns on route existence.
