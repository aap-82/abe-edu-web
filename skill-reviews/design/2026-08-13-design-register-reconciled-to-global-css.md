---
date: 2026-08-13
skill: design-session
subject: DESIGN.md frontmatter and prose reconciled to global.css, and the .impeccable sidecar refreshed
verdict: Green
graded_by: self
---

# Design review — the design register reconciled to global.css, 2026-08-13

## Verdict

**Green.** Six token facts in `DESIGN.md` disagreed with `src/styles/global.css`. All six are now
corrected, in the frontmatter and in every place the prose repeated them, and each corrected value is
verified against the CSS by a script rather than by eye. Nothing in `global.css`, `src/components/**`
or `src/styles/**` was touched: this changes only the record of what already ships. Build green,
health unchanged.

Green rather than Amber because the change is a documentation correction with a mechanical check
behind it, and because the one thing found that would have been a real design decision (a sixth
typography role) was **not** made, only reported.

## Pre-flight

`node scripts/system-health.mjs` at session start: **0 failing**, 44 warning, 76 ok
(`data/health-log.jsonl`). Re-run after every change below: **0 failing, 44 warning, 76 ok**, byte
identical. `npm run build`: green, `abe-guardrails` 28 pages passed, 27 pages built.

## Why this session existed

It did not start as design work. It began as `/impeccable init`, which updates `PRODUCT.md`; the
skill's boot check reported the `.impeccable/design.json` sidecar as older than `DESIGN.md`, Andrey
asked for the sidecar to be refreshed, and regenerating it from `global.css` is what surfaced the
register drift. The four findings were reported, and Andrey then asked for them to be fixed.

## What shipped

### `DESIGN.md` (the design register)

| # | Fact | Was | Is | Evidence |
|---|---|---|---|---|
| 1 | `ground` token | absent from the frontmatter entirely | `#fbf9f5` | `global.css:--ground`, and `body{background:var(--ground)}` |
| 2 | `paper-chrome` | `#ffffff` | `#fbf9f5` | `global.css: --paper-chrome:var(--ground)` |
| 3 | `paper-grey` | absent | `#f2f3f4` | `global.css:--paper-grey`, promoted 12 Aug 2026 |
| 4 | `paper-grey-soft` | absent | `#f8f9fa` | `global.css:--paper-grey-soft`, added 12 Aug 2026 |
| 5 | `typography.display` | `clamp(40px, 6.2vw, 72px)` / 600 / lh 1.02 | `clamp(34px, 4.6vw, 56px)` / 700 / lh 1.04 | `global.css: h1.h1`, consumed by `Hero.astro:45` |
| 6 | `rounded` scale | `sm` 5px, `md` 6px, `lg` 8px | adds `xs: 3px` | `border-radius:3px` on `.capsule`, `.note.maroon`, `.ph::after` |

**Finding 1 is the one that mattered.** `--ground` is the page background on every page of the site
and was recorded in neither `DESIGN.md` nor the sidecar. The register described the page as `#ffffff`
while it has shipped at `#fbf9f5` since the ground/paper split on 24 Jul 2026. Anything generated
from the register would have put cards on the same value as the page and lost the card lift that the
split exists to protect.

Prose corrected in five further places, because a frontmatter fix that leaves the prose asserting the
old value just moves the contradiction: §2 Neutral (rewritten, and it gained the `paper-inset` entry
it never had), §3 Display hierarchy, §4 Elevation ramp, §5 Corner Style and Background, §6 the first
Do bullet. Verified by grep that no stale form of any of the six survives anywhere in the file.

### `.impeccable/design.json` (the sidecar)

Regenerated from `global.css`, then amended so it does not describe drifts that no longer exist.

| Measure | Before | After |
|---|---|---|
| colour tokens with metadata | 5 | 22 |
| components with renderable snippets | 6 | 9 |
| motion tokens | 5 | 8 |
| named rules in the narrative | 5 | 8 |
| do's / don'ts | 7 / 7 | 9 / 9 |

Four values in the old sidecar were wrong against the code, not merely missing: `paper-warm` recorded
as `#f7f4ef` (is `#f5f1e8`); `verify-deep` absent entirely, so the attestation mark, half of the
site's signature trust device, had no token; the Glance card's mono key recorded as slate when it is
`--maroon`; and the Verified Source Line modelled as a flat `<p>` when it is a two-column grid
splitting the mark and the date across the two blues. The FAQ summary hover was `#fafafa`, a cool grey
removed from the ramp when `--paper-alt` was warmed.

The old sidecar's title also carried an em dash, against house style. Now a comma, matching
`DESIGN.md`'s own H1.

## Verification

Three scripted checks, because the failure mode this repo keeps hitting is certifying from intent:

1. **Every canonical hex against `global.css`.** Script resolves each frontmatter and sidecar token to
   its `--custom-property` and string-compares. Result: **20/20 frontmatter colours match**,
   **21/21 sidecar canonicals match**, plus `paper-chrome` verified through its `var(--ground)`
   indirection.
2. **Display role against the rendered rule.** Asserts all four of `clamp(34px,4.6vw,56px)`,
   `font-weight:700`, `line-height:1.04`, `letter-spacing:-.03em` appear in `h1.h1`. True.
3. **Sidecar self-consistency.** Every `ds-` class in a component's `html` has a rule in that
   component's `css` (0 orphans); every tonal ramp is exactly 8 steps; JSON parses.

Tonal ramps were computed, not eyeballed: sRGB to OKLab to OKLCH, fixed hue and chroma, eight
lightness steps from 0.15 to 0.95 with chroma tapered at the extremes to stay in gamut. The six
achromatic neutrals use the project's own real ladder (`ink` through `paper`) instead of a synthesised
one, per the spec's "use those values if a tonal scale already exists".

## Disclosed boundary crossing

**This session was not declared `design`, and it wrote to design-owned paths.** It opened as
`/impeccable init`, whose deliverable is `PRODUCT.md`. It then edited `DESIGN.md` and
`.impeccable/design.json`, both on Andrey's direct instruction after the findings were reported. Two
things follow, recorded here rather than left in the transcript, per the standing rule that a forced
crossing goes in the artefact:

- **Rule 7 (token and design-register changes are exclusive)** is arguably engaged, since `DESIGN.md`
  is the design register. The reading applied: recording a value that already ships is a correction,
  not a register change, and the locked system was not opened. No token value in `global.css` moved,
  no new token was invented, and the one change that *would* have been a register decision was
  declined (below). Flagged rather than assumed.
- **`PRODUCT.md` and `.impeccable/**` have no owner in the session-types table.** Same shape as the
  four gaps already closed by precedent (`content.config.ts`, `SYSTEM.md`/`handover/**`, `public/**`,
  `guardrails.ts`): infrastructure *for* the work rather than part of any one page's. Filed below.

## Found and deliberately not fixed

**`.statblock-v` sets `clamp(48px, 7vw, 84px)` at weight 700**, larger than the display role, and has
no typography role in either file. Adding a sixth role is a design-register decision under rule 7, not
a correction of a wrong value, so it was reported and left. It is recorded in the sidecar's
`typographyMeta.display` note so the next reader meets it.

`global.css` also carries a one-off `border-radius:7px` and the frontmatter's font stacks omit the
metric-matched `Archivo Fallback` / `DM Sans Fallback` / `DM Mono Fallback` faces. Both are cosmetic
against the register; neither was in scope.

## Addendum — the one-off radius the new check surfaced

`scripts/check-design-register.mjs` (built later the same day, see
`skill-reviews/skills/2026-08-13-check-design-register.md`) reported one WARN on its first run:
`.waynav a.j` at `global.css:318` was the only literal radius in the file outside the 3/5/6/8 scale,
at 7px. **Moved to 6px.**

**The scale was not the deciding argument.** `.waynav .btn-mini` at `global.css:350` sits in the same
bar, beside these pills, and has always been 6px. The strip was rendering two adjacent controls at
two different corners, and nothing said why: the comment above the rule justifies the padding
("symmetric and modest so the pill stays well under the 41px CTA") and the tracking, never the
corner. So this is an internal inconsistency closed, not a scale rule imposed on a deliberate choice.

The alternative was adding a fifth step to `rounded` to serve one declaration, which is the thing a
scale exists to prevent, for a difference of 1px on a 30px chip.

**Measured on the built page**, not in source, because a CSS edit that loses a specificity contest
ships doing nothing and reads identical in the diff. Served `dist/` via `dist-static-auto` and read
`getComputedStyle` on `/qld-owner-builder-course`:

| | Before | After |
|---|---|---|
| `.waynav a.j` computed `border-radius` | 7px | **6px**, all 7 pills, one distinct value |
| `.waynav .btn-mini` computed | 6px | 6px, unchanged |
| pill height | 30px | 30px, unchanged |
| `.waynav` height vs `--waynav-h` | 66px vs 65px | 66px vs 65px, unchanged (the 1px is the bar's bottom border, and predates this) |

`check-design-register` goes 0 failing / 1 warning / 5 ok to **0 failing / 0 warning / 5 ok**.
`system-health` returns to 44 warnings, with 81 ok against the 76 this session opened on. Build green,
`prose-lint` 16 files passed.

## Addendum 2 — the hero CLS, which turned out not to be a CLS bug

The nightly CWV run failed on three pages' CLS. Chasing `/cpd` (0.5622) found a layout defect that
CLS was merely the symptom of.

**`.hero .wrap` collapses to `grid-template-columns:1fr` below 1100px, but `.z-img` and `.howtrack`
keep the `grid-column:2` they are given at `global.css:412-413`.** A `grid-column:2` against a
one-column template does not place an item in a column that does not exist; it **creates an implicit
second column**, auto-sized to the image. `1fr` for column 1 then means "whatever is left", and
there was nothing left.

Measured on the deployed `/cpd` at 390px, before:

| | Before | After |
|---|---|---|
| `grid-template-columns` | `0px 286px` | `334px` |
| hero text column width | **0px** | 334px |
| `h1.h1` width | **0px** (248px tall) | 334px |
| hero text column height | 2780px | ~1226px |

**Every hero page below 1100px was rendering its headline and body copy in a zero-width column**,
tablets included, for the three weeks since the ProcessTrack rework on 12 Aug moved these placements
in. `left:76` in the Lighthouse trace is this exactly: 28px wrap padding + 0px text column + 48px
gap.

**Why the localhost gate never saw it.** The image is served instantly from a local static server,
so the broken layout never *moves*, and CLS only measures movement. The layout was equally broken in
both places; only the deployed host made it register as a metric. That is the case for the nightly
stated better than I stated it when building the thing.

### Verification

Deterministic layout measurement rather than a metric, because the fault is pure CSS and does not
need the network to reproduce:

- **Five hero pages at 390px** (`/cpd`, `/cpd-tas`, `/qld-owner-builder-course`, `/reviews`,
  `/white-card-wa`): single `334px` column, text and image both full width, on all five.
- **Breakpoint ladder on `/cpd`** at 1280 / 1101 / 1100 / 900 / 390 / 320px. Desktop is unchanged at
  `573.391px 498.594px` — the exact pair `global.css` already documents as correct in its
  `hero-bundle` note — and no horizontal scroll at any width, including 320px.
- **Mobile stacking order** on four page types including a bundle page: text, then image, then
  `.howtrack`, all full width. `.howtrack` still sits in column 2 row 2 at desktop (x=706 on `/qld`).
- Build green, 28 pages passed guardrails.

**What is not yet verified:** the CLS number itself. It cannot be confirmed from a local build, for
the same reason the gate missed the defect. Proof is a nightly run against the deployed host after
this ships.

## Addendum 3 — ProcessTrack back to horizontal, as two-line cards

Andrey's call, 13 Aug 2026, reversing the vertical ledger picked on 12 Aug. Worth recording *why the
reversal is legitimate* rather than a preference swing: the measurements that killed horizontal last
time were all about **one** line not fitting a ~107px cell. Two short lines fit where one long one
did not, so the constraint that decided it has changed.

**The split is authored, never inferred, and that is the whole design.** A first-word split was
tested against all 66 steps in all 18 distinct `howItWorks` strings *before* any code was written,
and it fails three ways: 11 of 66 steps (17%) are a single word, so no second line exists; it splits
proper nouns, putting the company's bare three-letter form alone on a line, which is the house-style
breach `check-claims` §6 exists to stop **and which that check cannot see, because the source string
is unchanged**; and it is often not action/descriptive at all ("Regulator approves" is noun/verb).
So an author opts in with `|`, and anything without one renders as one line.

**No word was invented.** 53 steps split across 19 files, applied from an explicit table rather than
by hand, and proved mechanically: every new string is byte-identical to its old one once each `|` is
read back as the space it replaced. 12 steps were deliberately left one-line, each for a stated
reason in the script. This is the guard the 12 Aug step-body split did not have, where writing the
second half of 28 sentences introduced two regulatory claims that were untrue.

Measured on the built pages:

| | Result |
|---|---|
| Authored pages (`/qld-owner-builder-course`, `/white-card-nsw`) | 4-up at 1280 and 900, **every action 1 line, every detail 1 line** |
| Same at 390px | reflows to 2-up on its own, still 1/1 |
| Card heights within a row | equal on every page and width tested |
| Horizontal scroll, 1280 / 900 / 390 / 320 | none anywhere |
| Unauthored page (`/accreditation`) | 3-up, actions wrap to 2 lines, cards stay equal height |

That last row is the honest limit: where a step is deliberately unsplit the action wraps, which is
the old raggedness in miniature. It is bounded — the cards still align, so it reads as a fuller card
rather than a broken row — and it only affects the 12 steps listed as unsplittable.

**One thing the build caught that is worth keeping.** The first draft of the component comment
*quoted* the offending bare brand form while explaining why the split must not produce it, and
`check-claims` §6 failed the run: `Bare "ABE" in reader-facing content, ProcessTrack.astro:54,55`.
The check was right and the comment was wrong. It is now written without quoting either fragment,
and says so in place.

## Addendum 4 — the three remaining design items, closed

**`figure` typography role added.** `.statblock-v` sets `clamp(48px, 7vw, 84px)` / 700 / lh 1, above
Display, and the register had no entry for it — so `DESIGN.md` implied 56px was the ceiling. Now a
sixth role, with the qualification that changes how it should be read: **`StatBlock` has no
production consumer.** It renders on `/styleguide` and nowhere else, established from `dist/` markup
(`grep -rl 'class="statblock'` → one file) rather than from the CSS, which is inlined into all 27
pages and matches every one of them. Recorded as an available shape, not as something the site uses.

**Font stacks completed, and a narrowing removed with them.** `DESIGN.md` listed
`Archivo, -apple-system, …`; `global.css` ships `'Archivo','Archivo Fallback',…`. The register now
carries the metric-matched fallbacks on all three faces. The interesting half is the check:
`check-design-register` compared **the primary face only**, and it did so *because* of this gap — a
full comparison would have failed on a known issue. Closing the gap let the narrowing go, so it now
compares the full stack with quotes stripped. That matters concretely: a generator following a
fallback-less stack emits type that reflows on load, which is the exact thing those faces were added
on 12 Aug to prevent, and the primary-face check could never have caught it.

**ModuleRows' comment corrected, and the filed framing was wrong.** The item said the "one accordion,
not two" line was false. It is not — that line is about *mechanism* (native `<details>`, no JS,
shared markup and marker, crawlable collapsed) and every part of it still holds. Two statements
further down the same comment were false: "Open therefore takes NO tint", when
`.mrow details[open] > summary` sets `--paper-grey`; and a measurement block still reading hover
`#f7f4ec / 4.64:1` when hover is `#f2f3f4 / 4.59:1`. Both are labelled superseded in place rather
than deleted, pointing at the live MEASURED block at the foot, and the mechanism line now says
explicitly that it is not a claim about colour — because it has been misread that way once already,
which is what produced this item.

**The FAQ was deliberately not changed.** Andrey asked for grey on ModuleRows specifically. Making
the FAQ follow would change hover on every page carrying one, on my inference about intent rather
than an instruction. Whether they should converge is a live design question, recorded as such.

**Verification.** `check-design-register` 0 failing / 0 warning / 5 ok, now covering **21 declared
properties across 6 roles** (was 16 across 5). Four new drift cases falsified in a scratch tree:
dropping the Archivo fallback, dropping the DM Mono fallback, a wrong `figure` size, and the
`figure` selector renamed in CSS — all caught, none silent. Build green, 28 pages passed guardrails,
`npm run check` 0 errors, `system-health` 0 failing.

## Demand list

Tag every item: [skills] | [design] | [facts] | [build]

- ~~[skills] `CLAUDE.md` session-types table has no owner for `PRODUCT.md` or `.impeccable/**`. This is
  the **fifth** application of the same pattern the file already names twice ("a path goes unassigned
  when it is infrastructure *for* the work rather than *part of* the work"), after
  `content.config.ts`, `SYSTEM.md`/`handover/**`, `public/**`/`launch.json` and
  `guardrails.ts`/`.gitignore`. Recommendation: both to **skills**, on the `SYSTEM.md` precedent.
  `PRODUCT.md` is a standing product-truth document and `.impeccable/**` is per-session tooling
  config; a wrong line in either risks the repo's own correctness, never the deployment.~~ assigned 14 Aug 2026: **PRODUCT.md and .impeccable/** to skills**, and the recommendation in this item is what was adopted. The fifth application also changed the default rather than adding a sixth paragraph later: an unassigned path now belongs to skills unless it is content, visual, a verified figure, or on the deliberately-unassigned platform list. Five sessions had each spent thought on the same judgement call and reached the same answer.
- ~~[design] `DESIGN.md` has no mechanical check that its token values still match `global.css`. This
  session found **six** disagreements by hand, one of which (`--ground`) had been wrong since 24 Jul
  2026 and describes the background of every page on the site. The scripted comparison written for
  this review is about fifteen lines and could be a `scripts/check-design-register.mjs` registered
  under SYSTEM.md §5. Nothing else in the repo reads `DESIGN.md`, which is exactly why it drifted
  silently for three weeks while every gate stayed green.~~ built the same day as
  `scripts/check-design-register.mjs`, registered in SYSTEM.md §5 and wired into `system-health`;
  see `skill-reviews/skills/2026-08-13-check-design-register.md`
- ~~[design] `.statblock-v` (`global.css:837`) sets `clamp(48px, 7vw, 84px)` / 700, above the display
  role, with no entry in `DESIGN.md`'s type hierarchy. Either give it a role or record it as a
  deliberate one-off; right now the register's account of its own largest type is incomplete.~~
  given a role, 13 Aug 2026 — `figure`, with the qualification that matters: **it has no production
  consumer.** `StatBlock` renders on `/styleguide` and nowhere else, checked against `dist/` markup
  rather than the CSS, which is inlined everywhere and matches every page. So it is recorded as an
  available shape, not as something the site uses. Recorded anyway because the register implied 56px
  was the ceiling, and a build session reading it would have believed that.
- ~~[design] `typography.*.fontFamily` in `DESIGN.md` omits the metric-matched fallback faces that
  `global.css` ships (`Archivo Fallback`, `DM Sans Fallback`, `DM Mono Fallback`). Harmless today,
  but a generator following the register would emit a stack that reflows on load, which is the exact
  thing those faces were added on 12 Aug to stop.~~ done 13 Aug 2026, and the check tightened with
  it: `check-design-register` compared the **primary face only**, a narrowing that existed precisely
  because of this gap. Now it compares the full stack, quotes stripped. Falsified both ways —
  dropping either the Archivo or the DM Mono fallback from the register now fails.
