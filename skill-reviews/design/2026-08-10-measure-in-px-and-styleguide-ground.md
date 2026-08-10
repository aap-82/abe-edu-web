---
date: 2026-08-10
skill: design-session
subject: measure capped in px not ch; styleguide demo wells on --ground
verdict: Green
graded_by: self
---

# Design review — measure in px, styleguide ground, 2026-08-10

## Verdict

**Green.** The repo's most-filed defect is closed on its sixth filing, with the root cause named
rather than the symptom re-tuned, and every consumer of the shared component re-measured live. One
backlog item turned out to be already fixed and was struck rather than re-fixed; one was left
deliberately unchanged because the session that filed it had escalated it to Andrey, and overriding
that would have been this session substituting its taste for a decision that is not its own.

## Pre-flight

`node scripts/system-health.mjs` — **0 failing**, 34 warning, 66 ok. Clean, so the session proceeded
(rule 1).

## The root cause, which is the actual finding

`.capsule` was capped at `max-width: 66ch` and rendered **92 CPL**. Five previous sessions filed
this and none fixed it, and the reason is that the number looks correct: 66ch reads as "66
characters". It is not.

**`1ch` is the advance width of the "0" glyph, not of an average character.** Measured in DM Sans at
18px on `/white-card-wa`:

| Quantity | Measured |
|---|---|
| `1ch` | **12.42px** |
| average character advance, over the real sentence copy in those capsules | **8.41px** |
| ratio | **1.48** |

So `66ch` resolved to 819.72px and bought about **92** characters, not 66. Every session that
"fixed" this by adjusting the ch number was measuring the value it typed rather than the line the
reader sees — the failure mode this repo has recorded before, applied to a unit rather than to a
specificity contest.

**The repo had already solved this and the answer never reached these elements.** `ModuleRows` was
converted to a px cap on 30 Jul 2026, and `UnitOutline.astro`'s own comment (line 206) states the
conclusion in full: *"a ch cap converts to a different CPL for every copy... px is what global.css
already settled on at `.measure` for exactly this reason."* That comment sat directly above the
`58ch` line this session converted. The fix was not a new idea; it was an existing decision that
had not been propagated.

## What shipped, with measured before and after

Every figure below is from `getComputedStyle` plus a canvas-measured character advance in the live
browser, at a 1280px viewport, before and after, not from reading the CSS.

| Element | Before | After | Change |
|---|---|---|---|
| `.capsule` (`/white-card-wa`, n=10) | 90-93 CPL, median **92** | 58-67, median **66** | `66ch` → `600px` |
| `.capsule` (`/white-card` hub, n=1) | **91** | **65** | same rule |
| `.capsule.on-dark` (`/act-owner-builder-course`) | **81** | **61** | `60ch` → `560px` |
| `.trust-lede` (`/styleguide`) | **~81** | **64** | `60ch` → `520px` |
| `.unit-eb` (`/white-card-wa`, n=4) | 82-88, median **84.5**, 1 over 85 | 64-68, median **65.5**, **0 over 85** | `58ch` → `460px` |
| `.sg-demo` background | `rgb(255,255,255)` | `rgb(251,249,245)` | `--paper` → `--ground` |

The px values are derived, not chosen by eye: `.capsule` is `600px` because 600 minus 46px of
padding and border leaves 554px of content, and 554 / 8.41 = **65.9 CPL**, the top of the 60-66
ideal band. Each cap carries that arithmetic in a comment beside it.

### Every consumer verified, not just the one that was filed

`.capsule` renders on every course page and both hubs, and a shared-component change that regresses
a sibling while the build stays green is a documented failure here. Six pages measured after the
change:

| Page | `.capsule` CPL | over 85 |
|---|---|---|
| `/white-card-wa` | 58-67 | 0 |
| `/white-card` | 65 | 0 |
| `/act-owner-builder-course` | 58-68 (+ on-dark 61) | 0 |
| `/qld-owner-builder-course` | 56-67 (+ on-dark 56) | 0 |
| `/owner-builder-insurance` | 65-66 | 0 |
| `/styleguide` | trust-lede 64 | 0 |

**43 capsules across six pages, 0 over the 85 hard rule.** Previously the median was 92.

**Mobile re-checked, because narrowing a cap could in principle have starved the small viewport.**
It cannot here, and this was measured rather than reasoned: at 375px on `/qld-owner-builder-course`
the capsules render **30-33 CPL**, inside the 30-45 mobile band, with **0px** document overflow. At
that width the viewport binds before the cap does, so mobile is unchanged by this session.

### `.sg-demo` — the styleguide was demoing white on white

Confirmed before the change: `.sg-demo` computed `rgb(255,255,255)` and the `.mrows` card inside it
computed `rgb(255,255,255)`. A **1.00:1** fill ratio, so every card boundary the styleguide exists to
demonstrate was carried entirely by a 1px hairline, and a component that lost its border would have
looked correct on the styleguide and broken in production.

Now `--ground`, which is what CLAUDE.md says that surface is: *"`--ground` is the page and its
full-width chrome; `--paper` is the fill of an ELEVATED surface."* The two tokens were split on
24 Jul 2026 for precisely this reason. After: well `rgb(251,249,245)`, card `rgb(255,255,255)`, and
the card's own `1px solid rgb(229,231,235)` border reads against the well at 1.18:1 — the same
relationship a real page has, which is the point. `.sg-demo--dark` re-checked and unchanged at
`rgb(26,26,26)`.

## Design-register changes

**None.** Flagged explicitly, per rule 9, because this session came close to one and deliberately
stopped short.

DESIGN.md line 189 reads *"Long-form answer copy is capped around 66 to 80ch."* The register's
stated intent is **characters**; `ch` was simply the wrong unit for expressing it, and the rendered
result (92) sat outside the register's own range. Bringing the rendered line length to 65.9 makes
the code satisfy what the register already asks for, so this is conformance, not a register change,
and DESIGN.md is untouched.

That said, the register's wording is now the last place the wrong unit survives, and it will mislead
the next reader exactly as it misled five sessions. Correcting it is a design-register edit and
therefore an exclusive session (rule 7). Filed below as `[design]`.

## Not changed, deliberately

- **`.mr-title` at 18px** (2 filings). The filing session left it at 18px with a stated reason and
  routed the decision to Andrey: DESIGN.md's Title step is 22px, but ACT renders twelve group titles
  and *"at 22px the rail stops reading as a scannable index and starts reading as twelve headings."*
  That is a section-level hierarchy judgement, not a typographic tidy-up. Two filings authorise
  restructuring under ROADMAP rule 3, but the thing blocking it was never authorisation — it is that
  the call belongs to a human. Surfaced to Andrey; unchanged here.
- **`/styleguide`'s 182px horizontal scroll.** Struck as already fixed, not fixed by this session,
  and proven rather than assumed: measured on a `git stash`ed baseline with all of today's changes
  removed, `scrollWidth - innerWidth` is **0px** at 375px with zero uncontained overflowing elements.
  Almost certainly closed by `2026-08-01-styleguide-scroll-containing-block.md`, filed the same day
  as the complaint, which is why the two never met.

## Items closed in their source reviews

Seven, across six files: the `.capsule` item (`2026-07-30-measure-contrast-and-tap-targets.md`), its
fifth and sixth sightings (the two 4 Aug course-page reviews), both `.unit-eb` filings
(`2026-07-30-modulerows-measure.md`, `2026-07-31-module-accordion.md`), both `.sg-demo` filings
(`2026-08-01-styleguide-scroll-containing-block.md`, `2026-08-01-modulerows-faq-parity.md`), and the
stale styleguide-scroll item (`2026-08-01-type-floor-and-tap-targets.md`).

## Gates

| Check | Result |
|---|---|
| `npm run build` | 25/25 guardrails, 24 pages |
| `npm run check` | **0 errors, 0 warnings** |
| `system-health.mjs` | **0 failing**, 34 warning, 66 ok |
| `check-claims.mjs` | 0 failing |
| Page overflow, 1280px and 375px | 0px on every page measured |

## What worked

Reading the component's own comment before editing it. `UnitOutline.astro:206` already contained the
diagnosis, the precedent and the recommended fix; five sessions had filed the symptom without that
comment ever being connected to `.capsule`. The measurement that cracked it — the 12.42px vs 8.41px
ratio — took one browser call and turned a six-times-deferred "resize it sitewide is its own
decision" into a mechanical conversion with an arithmetic justification.

## What didn't

The first instinct was to correct the ch value (66ch → 48ch), which would have produced the right
CPL today and reintroduced the identical bug the moment the body font or size changed. The px
precedent was already the repo's settled answer and would have been missed by anyone who did not
read the neighbouring component. Recorded because the near-miss is the interesting part: the wrong
fix was measurable, verifiable, and would have passed every gate.

## Demand list
Tag every item: [skills] | [design] | [facts] | [build]

- [design] **DESIGN.md line 189 still states the measure rule in `ch`** ("capped around 66 to 80ch"),
  the unit that caused six filings of one defect. It should state the intent in rendered characters
  and name the px convention the code now uses. Design-register edit, so an exclusive session
  (rule 7). Second filing: `2026-07-30-measure-contrast-and-tap-targets.md` raised the same thing
  ("DESIGN.md's measure guidance is wrong as applied") and the trigger has therefore fired.
- ~~[design] `.mr-title` is 18px against DESIGN.md's 22px Title step, and the choice is Andrey's, not a
  design session's — see "Not changed, deliberately" above. Either adopt 22px, or add 18px to the
  documented scale as a list-heading step so the component stops carrying an undocumented size.
  Third filing.~~ **Closed 11 Aug 2026 — Andrey chose 22px**, the day after this filing. Routing it
  to a human rather than deciding it in a design session was the right call and cost one day. See
  `skill-reviews/design/2026-08-11-mr-title-22px.md`.
- [skills] **Nothing in the repo can measure characters per line**, which is why a unit error
  survived six filings and five sessions. The CPL rule is enforced entirely by hand-run browser
  audits. The measurement is about fifteen lines of DOM plus canvas (this session's own script) and
  would fit the headless width check already at two occurrences in ROADMAP's Phase 3 table, which
  needs a browser dependency in `package.json` and is held as a separate ask to Andrey.
- [build] The four `<TrustBand>` call sites in `src/content/courses/*.mdx` still use the deprecated
  `<AnswerCapsule onDark>` slot rather than the `lede` prop, so `.trust-lede` currently renders on
  `/styleguide` and nowhere else. Its cap is fixed either way, but the migration is still open and
  the component has one live consumer.

## Grader note

`graded_by: self` — there is no fresh-subagent design grader (rule 9 permits self-grading on that
basis). Mitigated by every claim in this review being a browser measurement with its before value
captured from a stashed baseline, so the numbers are checkable by re-running rather than trusted.
