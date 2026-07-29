---
date: 2026-07-30
skill: design-session
subject: measure-contrast-and-tap-targets
verdict: Amber
graded_by: self
---

# Design review — measure, contrast, tap targets and three `<p>` wrappers, 2026-07-30

## Verdict

**Amber.** Nine fixes shipped, all measured before and after, and the page's tap-target rule went from
FAIL to PASS. Amber because the single most valuable thing this session produced is not a fix: it is
the discovery that **every `max-width` expressed in `ch` on this site is roughly 45% wider than it
reads**, which means the measure guidance in DESIGN.md has not been doing its job anywhere. That is a
design-register change and register changes are an exclusive session, so it is routed, not fixed.

## What prompted it

The `[design]` queue, plus nine freshly measured items from the Stage-7 readability audit run the same
day on `/white-card-wa`. Pre-flight `system-health`: **0 failing, 12 warning, 38 ok**.

## What shipped — measured, not asserted

| # | Fix | Before | After |
|---|---|---|---|
| 1 | `.pl-disc` ASQA disclosure gains a cap | **180 CPL**, `max-width:none` | **79 CPL** (440px) |
| 2 | `.f-auth` `<p>` → `<div>` | ABN block hoisted out, **135 CPL** uncapped | capped, off the >85 list |
| 3 | `footer .f-pub` `74ch` → `440px` | **101 CPL** | **73 CPL** |
| 4 | `footer .f-asqa` `74ch` → `440px` | **101 CPL** | **79 CPL** |
| 5 | `footer .f-col-h` alpha `.4` → `.62` | **3.81:1** at 11px | passes 4.5:1, no longer reported |
| 6 | `.burger-btn` min 44px | **40x20px** | rule PASSES, 13 elements checked |
| 7 | `Note.astro` `<p>` → `<div>` + `.note > p` | invalid nesting on any multi-line slot | both variants render, 0 empty callouts |
| 8 | reduced-motion guard swept | only `.reslink` guarded | `.topic` and `a.hub-card` too |
| 9 | `Login` href `#` → student platform | dead control, every page | resolves |

**Render probe overall: 4 FAIL → 3 FAIL**, and of the three that remain, two are not defects (below)
and one is routed. **Static lint: 0 FAIL** throughout. Build green at 20 pages, `astro check` 0 errors.

## The finding worth more than the fixes

`max-width: 74ch` was landing at **101 CPL**, on elements that looked capped. `ch` is the advance of
the **"0" glyph** — 0.684em in DM Sans — and not the average prose character, which measures 0.465em.
So `74ch` buys roughly **109 characters, not 74**. DESIGN.md's "65-75ch" guidance, applied literally as
a CSS `ch` value, produces a line about 45% longer than it names.

Half of this was already known: `global.css:532` records that `ch` is font-relative and that 74ch on
12px mono was wrong. The generalisation was missed — it is not a mono problem, it is a `ch` problem,
and it is sitewide. `.verified .v-body` still carries `74ch` and was left alone deliberately: it was
not measured this session, and fixing an unmeasured element on the strength of a pattern is the
failure this whole audit has been about avoiding.

**Routed, not fixed:** DESIGN.md's measure guidance needs to say what it means in a typeface where
`ch` ≠ character, and the working convention (px caps around 440px, which measure 63–79 CPL) needs to
become the stated one. Exclusive session, per rule 7.

## Two audit FAILs adjudicated as non-defects

Rule 8: a readability audit measures, it does not authorise. Both of these would have been wrong to
"fix", and one of them would have required changing a token.

**`rgb(154,154,154)` on the cream ground at 2.68:1, the nav "About".** Not a defect. It renders as
`<span class="nav-l soon" aria-disabled="true" title="Coming soon">`, a **`<span>`, not a link**.
WCAG 1.4.3 exempts text that is part of an inactive user interface component, and `--slate-light` is
documented in three places in `global.css` as a deliberately sub-AA muted token reserved for `.soon`
states. Raising it would have been a token change, an exclusive session, and would have destroyed the
muting that tells a reader the item is not yet clickable.

**`p.capsule.on-dark` at 1:1.** A probe artefact. Its real ancestor is `section.sec.bg-dark` at
`rgb(26,26,26)`; white at 92% on near-black measures about **15:1**. `audit_render.py` resolves the
background from the immediate parent only, and that parent (`div.wrap`) is transparent. Verified by
walking the computed-style chain rather than believing the number.

## `<p>` wrappers: one bug, three instances

`Note.astro`, `SourcesFooter`'s `.f-auth`, and (previously) `Footnote.astro` all wrapped authored
content in a `<p>`. Any multi-paragraph content inside a `<p>` is invalid, so the browser closes the
wrapper early and hoists the content out — which is why `.f-auth`'s `max-width` was applying to an
empty element while its text ran at 135 CPL. `kb/mistakes-log.md` **#12** is exactly this, and its
guard was a comment inside the component telling authors to keep slots on one line. That guard has now
been replaced by the fix in all three.

**The rule, stated once so it stops recurring:** a container that receives an MDX slot or authored HTML
is never a `<p>`. It is a `<div>`, and the CSS strips the inner paragraph margins so both the one-line
and multi-line forms render identically.

## Demand list
Tag every item: [skills] | [design] | [facts] | [build]

- [design] **`.capsule` measures 91 CPL** at 820px/18px, over the 85 hard rule, on every page's most
  prominent element. Not changed here: the answer capsule is the design register's primary reading
  measure and resizing it sitewide is its own decision, not a side effect of a footer session.
- [design] **DESIGN.md's measure guidance is wrong as applied.** "65-75ch" in DM Sans yields ~95-110
  actual characters. State the intent in real characters and adopt the px convention that measures
  correctly. Design-register change, exclusive session.
- [design] `.verified .v-body` still carries `max-width:74ch`, unmeasured this session. Measure it
  under the same lens before changing it.
- ~~[design] The partner blurb still renders verbatim twice per ASQA page. **Fourth filing.** Not fixed
  here because it is a content-ownership decision — which of `PartnerDisclosure` or `Credentials` owns
  the description — and the losing one needs its copy re-cut, not just suppressed.~~ fixed in #92
- ~~[design] `VerifiedSources` / `SourcesFooter` citation links: new tab or not. **Third filing, still
  undecided.** This is a decision, not work; someone needs to make it.~~ decided in #93: citations stay same-tab; rule now in DESIGN.md §7
- [design] The 28px gutter is still hardcoded 11 times with no token. Token change, exclusive session.
- ~~[skills] `audit_render.py` must be given an HTTP URL, and resolves background from the immediate
  parent only. Both produce confident wrong numbers. Belongs in `references/verification.md`.~~ fixed 30 Jul 2026: both traps documented in references/verification.md, with the py/HTTP-URL fix
- [build] The footer links to `/about` while the header marks About as unbuilt. One of the two is
  wrong, and the footer link is one of the nine already tracked as pointing at unbuilt pages.

## Output
- [x] **Fix applied** — nine, each with a measured before/after above.
- [x] **`kb/mistakes-log.md`** — #12 has now been fixed in all three components rather than documented;
  see the `<p>` wrapper section. Not incremented: this session removed the defect, it did not re-suffer it.
- [ ] **Memory written** — not needed; the `ch` finding is routed as a DESIGN.md change where it will
  be read, and a memory would duplicate it.
- [ ] **Skill-change spec** — not applicable; the two tooling items are routed `[skills]`.

## Grader note

`graded_by: self` — there is no fresh-subagent design grader. Weight accordingly, and note that the
before/after column is the part that does not rest on my judgement: every value is reproducible by
serving `dist/` and running `audit_render.py` against `http://127.0.0.1:8899/white-card-wa/`. The
judgement calls are the two adjudicated non-defects and the decision to route rather than fix the
`ch` problem; those are the ones worth a second opinion.
