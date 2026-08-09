---
date: 2026-08-10
skill: skills-session
subject: check-reflow.mjs — the first check in the repo that renders a page
verdict: Green
graded_by: self
---

# Skills review — `check-reflow.mjs`, 2026-08-10

## Verdict

**Green.** Closes a ROADMAP Phase 3 candidate that had been authorised at two occurrences since
28 July and held only on a dependency question, and closes the measurement gap that let one defect be
filed six times without being fixed. The check is green on a real corpus, its ratchet was tested in
both directions rather than assumed, and it found a real defect on a page shipped the day before.

## Pre-flight

`node scripts/system-health.mjs` — **0 failing**, 34 warning, 66 ok.

## Why this exists

Every other check in this repo reads source or built HTML **as text**. None renders anything, so
none can see a layout defect. Two were paid for in full:

1. **A 90px sideways scroll at 320px** survived a green build, 20/20 guardrails, `check-claims` 0
   failing and an independent Stage 7 audit, on every page rendering `PartnerDisclosure`. Three
   independent causes, so a one-off fix would not have held. Two occurrences, ROADMAP Phase 3.
2. **`.capsule` rendered 92 CPL against an 85 rule and was filed six times across five sessions.**
   The cap read `max-width: 66ch` and 66 looks correct. It is not: `1ch` is the advance of the "0"
   glyph (12.42px in DM Sans 18px) against an 8.41px average character, so 66ch bought 92
   characters. Five sessions re-derived the same wrong conclusion from the same wrong unit, because
   **nothing in the repo could measure a rendered line.**

Defect 2 is the argument. A rule enforced only by a hand-run browser audit is a rule that gets filed
rather than fixed.

## The dependency question, which is why this was deferred rather than built

ROADMAP held this candidate as "authorised but needs playwright or puppeteer in `package.json`, so
it was raised with Andrey and held as a separate ask." That ask was granted this session.

Checked for a lighter path first rather than reaching for the dependency:

| Option | Verdict |
|---|---|
| Reuse CI's browser — `npx --yes @lhci/cli` already launches Chrome | **No.** Works for a CLI, but a script cannot `import` a driver from an npx-fetched package. |
| jsdom | **No.** No layout engine, so it cannot measure a line box or an overflow. Dead end for both halves. |
| Compute CPL from font metrics without a browser | **No.** Handles capped elements only, and cannot see overflow at all. |
| `playwright` devDependency | Yes — the option ROADMAP names, standard API. |

`playwright@^1.62.1` added as a **devDependency**, plus `npx playwright install chromium` (114.5 MiB,
downloaded to the user profile, not the repo). **`package.json` is on CLAUDE.md's deliberately-
unassigned list** — platform configuration, "its own decision with a human in it" — which is exactly
why this was an ask and not a side effect of an audit session. Disclosed rather than folded in.

## What shipped

`scripts/check-reflow.mjs` + `npm run check:reflow`. It serves `dist/` itself on an ephemeral port,
so it needs no dev server and cannot collide with one, then drives headless chromium at 375px and
1280px over every built page.

**Two measurements:**
- **Reflow** — `scrollWidth - innerWidth`, plus, for every element exceeding the viewport, whether
  any ancestor actually establishes an `overflow-x` scroll box. Containment is *tested*, not
  allow-listed, so a genuinely-leaking element cannot be excused by being named in a list.
- **CPL** — content width divided by the average character advance of the element's **own text in
  its own computed font**, measured on a canvas. Not glyph-counting, which needs line-box
  introspection the DOM does not expose. Same method that diagnosed the capsule defect, which is
  why the numbers reconcile with the design review filed today.

## Measured findings on first run

| Result | Value |
|---|---|
| Pages scrolling sideways, 375px and 1280px | **0** — the `PartnerDisclosure` defect is genuinely fixed |
| Mobile CPL breaches | **0** |
| Desktop CPL breaches | **35 elements across 11 pages** |
| Worst | `/cpd-building-tas` at 162 CPL; `/owner-builder-insurance` 7 paragraphs at 141-149 |

**The check found a real defect in a page shipped the day before.** `/owner-builder-insurance` uses
bare `<p>` inside `<Section>` with no `.measure` wrapper, so its body copy runs 141-149 CPL — the
worst reading measure on the site after `/cpd-building-tas`. Nothing caught that at Stage 7,
including an independent grader, because nothing could.

## Two corrections made during the run, both worth recording

**1. The first selector set produced 57 findings, 22 of them noise.** It flagged 11px mono source
lines and 14px footnotes at 93-173 CPL. Correctly measured and *not* defects: the CPL rule governs
sustained prose, and micro-type is set wide on purpose (DESIGN.md's Label is 11px tracked 0.18em; a
480px cap on a one-line meta string would look broken). Bounded to `font-size >= 16px`, the body
floor the readability standard already uses, so the rule and its scope now agree. Left unbounded,
this would have been the 93-warning `check-claims` failure again — a check nobody reads.

**2. The first budget table was wrong, and wrong in the way this repo has recorded before.** It was
typed from a truncated terminal tail: seven pages, when the true figure is eleven. Four breaching
pages had no budget line and would have failed on the first CI run. Regenerated from the tool's own
`--json` output. The instruction to do that is now in the file's own comment, next to the table. A
budget table derived from what fits on screen is the set-scoped-narrowing failure mode wearing a
different hat.

## Design decisions, each with its reason

- **CPL is ratcheted, not flat-FAILed.** 35 breaches existed on day one, in page content and
  `src/styles/**` — paths a skills session may not write. A flat FAIL would redden every build over
  debt this session type is forbidden from clearing, and a red nobody is allowed to fix is a red
  everyone learns to ignore. Same shape as `BANNED_CTA_BUDGET` and `INLINE_STYLE_BUDGET`, including
  the falls-without-the-budget-following case. **Reflow has no budget**, because it was already
  clean and starting clean is the point.
- **The budget applies at desktop only.** A `max-width` cap binds at 1280 and cannot at 375, where
  the viewport is narrower than any sane measure. So a mobile CPL breach is never pre-existing cap
  debt — it means something is unwrappable or fixed-width — and it FAILs immediately, unbudgeted.
- **Skips rather than fails** when playwright, its browser, or `dist/` is missing: exit 0 with the
  install command. The contract `check-shipped` uses for a missing `gh`. Verified by running the
  script in an empty directory — printed the reason, **exit code 0**.
- **Out of `system-health`, deliberately.** It needs a browser and a current `dist/`; `system-health`
  is the pre-flight and runs when `dist/` may be absent or stale. Same standing as `check-links`,
  and written into SYSTEM.md §5 rather than left to be discovered.

## Verification

The ratchet was tested in both directions rather than assumed, since a check that cannot fail is
worse than no check:

| Test | Expected | Result |
|---|---|---|
| Budget correct (11 pages, true counts) | pass | **0 failing, 1 ok** |
| Budget raised 2 → 5 on `/cpd` (debt "paid" but not lowered) | FAIL | **FAIL**, naming the number to lower it to |
| Budget dropped 2 → 0 on `/cpd` (new breach) | FAIL | **FAIL**, naming the 2 worst elements |
| Run with no `dist/` | skip, exit 0 | **skip, exit 0** |

Gates after the change: `check-claims` **0 failing** (and its SYSTEM.md §5 guard correctly caught
the new script as undocumented before it was added — 11 → 12 checks named), `system-health`
**0 failing**, `npm run build` 25/25 guardrails.

## What worked

Running the check against the whole corpus before choosing between flat-FAIL and ratchet. The
decision was made from 35 measured breaches across 11 pages rather than from a guess about how much
debt existed, and the answer was not the one intended at the outset — the plan was a flat FAIL,
because the capsule work earlier the same day had left `.capsule` clean.

## What didn't

Both corrections above were self-inflicted and both were caught by running the tool rather than by
reading it. The budget-from-a-truncated-tail mistake is the more interesting one: the tool had a
`--json` flag, written in the same session, and the first instinct was still to read the console.

## Demand list
Tag every item: [skills] | [design] | [facts] | [build]

- [design] **35 prose elements across 11 pages exceed the 85 CPL rule**, all uncapped `<p>` inside
  `.sec` with no `.measure` wrapper. Measured, with per-page counts, in `CPL_BUDGET` in
  `scripts/check-reflow.mjs`. Worst: `/cpd-building-tas` (10 elements, to 162 CPL), `/cpd-tas` (9),
  `/owner-builder-insurance` (7, to 149). A single `.sec p` cap in `global.css` would likely clear
  most of it in one change, but it is sitewide CSS and belongs to a design session. Lower each
  budget line as it is cleared; the table is meant to disappear.
- [build] `/owner-builder-insurance` renders 7 body paragraphs at 141-149 CPL, the worst reading
  measure on the site after `/cpd-building-tas`, because it uses bare `<p>` inside `<Section>`.
  Shipped 9 Aug 2026 and passed an independent Stage 7 because no check could see it. Wrap its prose
  in `.measure`, or fix it under the sitewide `[design]` item above, whichever lands first.
- [skills] **`check-reflow` is not wired into CI**, so it runs only when someone remembers — the
  standing that SYSTEM.md itself calls the quieter failure mode. `.github/**` is on CLAUDE.md's
  deliberately-unassigned list, so wiring it into `ci.yml` (after the existing build step, alongside
  the Lighthouse job that already launches a browser) is a human decision, not a session's. Raising
  it rather than doing it.
- [skills] The check measures reflow and measure only. **Tap-target size (44px) and the 16px type
  floor are still enforced by hand-run audits**, and `2026-08-01-type-floor-and-tap-targets.md`
  already filed that "a tap-target and type floor is enforced by nothing" as a self-declared repeat.
  Both are the same shape of measurement as CPL and would fit this file's existing page loop for
  little extra cost.

## Output
- [x] Fix applied — `scripts/check-reflow.mjs`, `npm run check:reflow`, SYSTEM.md §5
- [x] `kb/mistakes-log.md` — not incremented; no existing row covers "budget table derived from a
      truncated console read", and the closest (#24, set-scoped tools narrowing) is about a
      non-recursive readdir. Recorded in this review's "What didn't" instead, since a new row is a
      layer-1 line and this is the first sighting.

## Grader note

`graded_by: self` — there is no fresh-subagent skills grader (rule 10 permits self-grading on that
basis). Mitigated by the ratchet being tested in all four states rather than asserted, and by every
figure here coming from the tool's `--json` output rather than from a console read, which is the
specific mistake this session already made once.
