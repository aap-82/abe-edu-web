---
date: 2026-08-01
skill: abe-readability-audit
subject: white-card-nsw
verdict: Amber
graded_by: self
graded_by_reason: >
  Run inside the build session that authored the page, under a standing instruction not to
  launch subagents unless asked. The author audited the author's own page. Weight accordingly.
scores:
  correct_and_safe: green
  passed_gates_first_time: amber
  inside_effort_budget: green
  low_rework: green
  taught_us_something: green
metrics:
  turns_to_passed_audit: 6
  manual_fix_passes: 0
  gate_fails_after_handoff: 0
---

# Readability audit: /white-card-nsw

Page type: course (archetype 2, nationally recognised) | Audited: 1 August 2026
Measured on the built `dist/` served at `localhost:4325`, in a browser, at three asserted viewports.

## Verdict

The page reads well and the type system is sound: 17px body, 8.4:1 contrast, 56 CPL on desktop and
31 at 320px, no horizontal overflow, sticky CTA working, lists all at or under six items. **Two Fails,
and neither is a page-content defect.** Both are component-level and sitewide: a 10px label in the
header megamenu, and one primary CTA that renders 1px under the 44px tap target. The single most
useful fix is the 10px label, because it fails the size floor on every page of the site at once.

**Method note.** `audit_static.py` and `audit_render.py` were **not** run. CLAUDE.md records that they
target the `.t-*` design register, which does not exist in this build, so their token verdicts would
be false failures. Every value below was measured directly in the browser instead.

## Scorecard

| Dimension | Verdict | Measured |
|---|---|---|
| 1. Line length (measure) | Pass | 480px / ~56 CPL desktop · 38 CPL @375 · 31 CPL @320. Target 60-66, tolerance 45-75; mobile 30-45 |
| 2. Font size and smallest text | **Fail** | Body 17px (floor 16). **Smallest text 10px** (`.mlabel`, "White Card by state", header megamenu) against a 12px floor |
| 3. Line spacing and rhythm | Flag | 28.05px on 17px = **1.65**. Target 1.4-1.6, so marginally loose rather than wrong |
| 4. Hierarchy and type roles | Pass | One H1, 10 section H2s visibly distinct, mono for figures |
| 5. Typeface and character legibility | Pass | DM Sans body (low stroke contrast, open apertures), DM Mono for prices/dates/RTO numbers, so 0/O and 1/l are unambiguous where digits carry meaning |
| 6. Columns, grids, Gestalt grouping | Pass | Single-column prose throughout, grids stack, groups carried by frames and washes not colour alone |
| 7. Alignment and paragraph structure | Pass | Left-aligned, ragged right, no justification. Paragraphs 2-4 sentences |
| 8. Contrast and colour | Pass | Body `rgb(74,74,74)` on `#fbf9f5` = **8.43:1**; on `bg-alt` `#f7f4ec` = **8.06:1**; CTA **17.40:1**. Ground is off-white, ink off-black, both house rules met |
| 9. Scanning, chunking, answer-first | Pass | Eight capsules, 42-57 words, every one answer-first. Longest list 6 items; no list over 7 |
| 10. Progressive disclosure | Pass | Only the FAQ collapses. Price, delivery mode and card timeline all live in open body copy |
| 11. Conversion-element placement | **Fail** | Sticky CTA present and working (64px bar, 45x125px button). CTA repeated 3x plus sticky. Trust sits beside the claim in `#real` and beside the price in the TrustBand. **But one primary CTA renders 43px high**, under the 44px rule |
| 12. Mobile, reflow, page weight | Pass | **Zero horizontal overflow at 320px**, scrollWidth 320, no element wider than the viewport, no tables to stack |
| 13. Wayfinding and information scent | Pass | Sticky `waynav` with eight labelled sections, all scent-carrying ("Online in NSW?", "Your card", not "More") |
| 14. Accessibility | Flag | Reflow, contrast and heading order clean. **"Warwick Smith" breadcrumb link is 15px high**, under the 24px WCAG 2.5.8 AA minimum. `waynav` links 30px: passes AA, under the 44px AAA target |

## Top fixes (ranked by impact)

1. **Raise `.mlabel` from 10px to 12px** in the header megamenu. Ten pixels is below the label floor and
   this is the smallest text on the site, in navigation, where scent matters most. **Token/component
   change, sitewide.** [design]
2. **Give the 43px primary CTA the missing pixel** — set a `min-height: 44px` on the wayfinder CTA
   variant rather than letting padding plus line-height decide it. One pixel sounds trivial, and the
   44px figure is a real motor-accuracy threshold, not a rounding convention. **Component change.**
   [design]
3. **Raise the reviewer link's hit area to 24px minimum** in the breadcrumb bar. Currently 15px, which
   fails WCAG 2.5.8 AA outright. Padding on the anchor is enough; no layout change needed.
   **Component change.** [design]
4. **Consider tightening body leading from 1.65 to 1.55.** A judgement call, not a rule break: 1.65 is
   generous rather than wrong, and on a page this long it costs about a screen of scroll. Test before
   adopting; the evidence for 1.4-1.6 is about optimal saccade return, and 1.65 is only just outside.
   **Token change, sitewide, so worth a deliberate decision rather than a page tweak.** [design]

None of the four is a per-page fix. The page content itself needs no readability change.

## Already working (leave alone)

Left alignment with ragged right, single-column prose at a measure that holds from 1417px down to
320px, off-black on off-white with contrast far above AA, answer-first capsules at a disciplined
40-60 words, question-led H2s, lists chunked well inside Miller's number, a sticky CTA that actually
appears and clears the tap-target rule, trust signals placed beside the claim rather than stranded in
the footer, and wayfinder labels that carry real information scent. The type system is not the problem
on this page.

## Demand list

Tag every item: [skills] | [design] | [facts] | [build]

- [design] `.mlabel` renders 10px in the header megamenu, under the 12px label floor. Sitewide, affects every page.
- [design] One primary CTA variant renders 43px high, under the 44px tap-target rule. Needs `min-height`, not more padding.
- [design] The reviewer link in the breadcrumb bar is 15px high, under the WCAG 2.5.8 AA 24px minimum.
- [design] Body leading is 1.65 against a 1.4-1.6 target. Not a rule break; worth a deliberate token decision rather than drift.
- [skills] This skill's `audit_static.py` and `audit_render.py` cannot run against this repo (they target the `.t-*` register, which does not exist here). CLAUDE.md records the caveat, but the skill still instructs running them first. Either port the render probe to this build's tokens or state the exception in the skill itself, so each run does not re-derive it.
- [skills] Viewport emulation in the browser pane silently reverted from 375px to 1417px mid-audit, which produced a false "sticky CTA is dead on mobile" finding that survived two measurements before being caught. Assert the viewport inside the same call as the measurement; never trust a resize from an earlier call.
