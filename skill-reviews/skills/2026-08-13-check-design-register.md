---
date: 2026-08-13
skill: skills-session
subject: scripts/check-design-register.mjs — DESIGN.md's tokens mechanised against global.css
verdict: Green
graded_by: self
---

# Skills review — check-design-register, 2026-08-13

Self-graded: there is no fresh-subagent skills grader. The substantive verification is the
falsification harness below, which is a stronger claim than a self-assessment, because it tests the
check against inputs designed to defeat it rather than against the state I just fixed.

## Verdict

**Green.** The check exists, starts green, is registered in both directions, and **11 of 11**
reintroduced drifts were confirmed to trip it. `system-health` goes 0 failing / 44 warning / 76 ok to
0 failing / 45 warning / 81 ok: five new OKs, and one new WARN that is a real pre-existing one-off it
surfaced rather than a regression.

## Pre-flight

`node scripts/system-health.mjs`: **0 failing**, 44 warning, 76 ok. Unchanged from this morning.

## What shipped

| File | Change |
|---|---|
| `scripts/check-design-register.mjs` | new, 5 assertion groups |
| `SYSTEM.md` §5 | names the check; "five checks beyond `check-freshness`" to "six", twice |
| `scripts/system-health.mjs` | new §4d block, `rec.designRegister` added to the log record |
| `skill-reviews/design/2026-08-13-...md` | the demand item that asked for this, struck closed |

## The gap it closes

`DESIGN.md` is canonical for tokens per `CLAUDE.md`, and **nothing in the repo reads it**. Astro does
not import it, `guardrails.ts` does not parse it, and `check-claims` verifies prose claims about the
build rather than token values. This morning's design session found six values disagreeing with
`global.css`, the worst being `--ground`: absent from the register entirely while being the
background of every page on the site, for three weeks after the ground/paper split, with every gate
green throughout.

That is SYSTEM.md §2's "every recorded thing has a reader" failing on the design register, and it is
the same shape as the §5 gap `check-claims` §7 was built to close in July. Third instance of
"documentation describing the build drifted from the code", the repeat risk the mistakes log has at
**11 sightings** and the highest count in the log.

## What it asserts, and what it deliberately does not

Five groups: colours (both directions), typography roles against the rule that renders each, spacing
(both directions), radius-scale use, and `{group.token}` reference resolution.

**The reverse direction is the point.** A forward-only check reads the register and confirms each
entry exists in the code, which is exactly the check that would have passed while `--ground` was
missing, because a token absent from the register is invisible to it. Recorded in the script header
so nobody simplifies it away.

Three narrowings, each stated in the script rather than left implicit, because a set-scoped check
that does not declare its scope reads as broader than it is:

- **Only DECLARED properties are compared.** `.h2` inherits `font-weight` from `h1,h2,h3,h4`, and
  `.h3` declares no line-height. Treating absence as disagreement would have produced nine false
  failures on day one. The count of uncompared properties is printed (currently 9), so the coverage
  is visible instead of assumed.
- **Font stacks are compared on the primary face only.** The CSS stacks carry the metric-matched
  fallback faces added on 12 Aug; the register's stacks omit them. That divergence is a separately
  filed item, not something this check should adjudicate.
- **The first `:root` block only.** A second lives inside `@media(max-width:900px)` and overrides a
  sticky-chrome height; a responsive override is not a second opinion about a token's value.

Two explicit escape maps, both short and both requiring a written reason: `ALIAS` for the two names
that genuinely differ (`verify-blue`/`--verify`, `ok-green`/`--ok`), and `NOT_IN_REGISTER` for the one
`:root` colour deliberately absent (`--verify-soft`, an alpha derivative rather than a palette entry).
An alias map is where a check quietly narrows, so both are kept minimal and visible.

## Severity, against the ratchet precedent

Colour, spacing and typography disagreements **FAIL**. Off-scale radii and unused scale steps
**WARN**.

The banned-CTA guardrail is a ratchet rather than a flat FAIL precisely because the rule was already
breached on four live pages, and a flat FAIL from a skills session would have handed build sessions a
red build they were not permitted to fix. **Neither condition holds here.** The register was brought
into exact agreement before the check was written, so it starts green, and `DESIGN.md` and
`global.css` are owned by the same session type, so whoever trips it may fix it. Off-scale radii warn
because a one-off radius is a judgement call, not two files contradicting each other.

## Verification: the falsification harness

A check that only ever runs on good input has not been tested. Eleven drifts were reintroduced in a
scratch copy of `DESIGN.md` and `global.css` (never the repo) and the check was required to report
each one:

| # | Mutation | Result |
|---|---|---|
| 1 | `ground` dropped from the frontmatter | caught, reverse direction |
| 2 | `paper-chrome` reverted to `#ffffff` | caught |
| 3 | `paper-grey` dropped | caught, reverse direction |
| 4 | display role reverted to 40-72px / 600 | caught, 2 failures |
| 5 | `xs: 3px` radius step dropped | caught, WARN names 3px |
| 6 | component ref pointed at a nonexistent token | caught |
| 7 | spacing step dropped | caught, reverse direction |
| 8 | a colour changed **in the CSS only** | caught |
| 9 | a token renamed **in the CSS only** | caught, 2 failures |
| 10 | a typography selector renamed in the CSS | caught |
| 11 | the whole `colors` group emptied | caught by the zero-guard |

Baseline before and after every mutation: 0 failing, 1 warning, 5 ok.

Case 11 is the one worth naming. An empty `colors` group makes every forward comparison vacuously
true, so a naive check reports a clean pass on a register that declares nothing. It FAILs instead,
because a zero from a set-scoped check is its least trustworthy output. The same guard covers
`typography`.

**Two of the eleven initially reported as MISSED, and both were the harness being wrong, not the
check.** Case 4 did fail, on two properties, but my regex expected ``Typography `display` `` where
the message says ``Typography `display.fontSize` ``. Case 5 warned correctly but the warning *count*
did not rise, because warnings aggregate one line per category, and the harness was asserting on the
count. Recorded rather than quietly fixed: both near-misses were me writing an assertion from what I
expected the output to say instead of from what it says, which is the same error as certifying from
intent, one level up. Reading the actual output is what resolved both.

## Registration

`check-claims` §7 enforces that every `scripts/*.mjs` is named in SYSTEM.md §5 or exempted, in both
directions. It now reports **"names all 13 check(s) that run"**, up from 12, which is the registration
verified rather than asserted. `npm run build` green, 28 pages passed guardrails.

## Demand list

Tag every item: [skills] | [design] | [facts] | [build]

- ~~[design] `global.css:318` `.waynav a.j` uses a one-off `border-radius:7px`, the only literal radius
  outside the scale, now surfaced as a standing WARN by this check. Either absorb it into `rounded`
  or move the rule to `md` (6px). It is one declaration; the WARN will repeat on every health run
  until it is decided either way.~~ moved to 6px the same day, verified at 6px computed on the built
  page; see the addendum in `skill-reviews/design/2026-08-13-design-register-reconciled-to-global-css.md`
- [skills] `check-design-register` runs only at pre-flight, not at prebuild. That is deliberate, a
  register mismatch should not stop a content build, but it means the drift window is "until someone
  runs system-health" rather than "until the next build". Worth revisiting **only if** a drift is
  found again between pre-flight runs; do not build ahead of that evidence.
- [skills] The same reverse-direction gap likely exists for `.impeccable/design.json`, which drifted
  further than `DESIGN.md` did (five colour tokens against twenty-two, and four values wrong). It was
  left out of this check to keep the script to its named job. If the sidecar is going to be relied on
  by the live panel, it wants the same treatment, keyed off `DESIGN.md` rather than `global.css` so
  the two checks compose rather than duplicate.
- [skills] The mistakes-log row "Documentation describing the build drifted from the code and was
  trusted over it" is at **11 sightings** and this is another. Every mechanisation so far has been
  one document at a time (`check-claims` for prose claims and SYSTEM.md §5, now this for tokens).
  Worth asking once whether the remaining unread documents (`ROADMAP.md`'s current-state section,
  `handover/**` status headers) can be given readers by the same pattern, or whether the row should
  be split, because at 11 it no longer identifies a specific failure anyone can act on.
