---
# Machine-readable block. scripts/review-trends.mjs parses this, so keep the keys and
# shapes exactly as they are — prose belongs below the frontmatter, not inside it.
date: 2026-07-23
skill: abe-readability-audit
subject: white-card-tas
archetype: 02 nationally-recognised-course
verdict: Amber
graded_by: self
scores:
  correct_and_safe: green
  passed_gates_first_time: amber
  inside_effort_budget: green
  low_rework: green
  taught_us_something: green
metrics:
  turns_to_passed_audit: 0
  manual_fix_passes: 0
  gate_fails_after_handoff: 0
---

<!-- manual_fix_passes is 0, NOT 1, on purpose: the one fix this audit surfaced (the ASQA Note,
135 -> 64 CPL) is the SAME physical fix already counted in the parent abe-course-page-astro run for
white-card-tas. Counting it here too would double-count it in review-trends. This sub-audit found the
defect; the parent run owns the fix count. DEMAND-LIST: review-trends aggregates all skill-reviews
regardless of `skill:`, so a readability sub-audit's metrics land in the same trend as course-page
runs; it should group by skill. And manual_fix_passes as a "lower is better" trend penalises catching
-and-fixing a defect BEFORE handoff, which is exactly what the pipeline should do — gate_fails_after
_handoff (shipped broken) is the metric that should dominate. -->


# Readability audit review — white-card-tas, 2026-07-23

> **Filed late, on 23 July 2026.** This review should have been written when the readability audit ran
> during the white-card-tas Stage 7, but the audit was itself run late (the Stage-7 subagent had omitted
> it) and its review was never filed. The audit's findings did reach
> `pipeline/white-card-tas/07-verification.md` §7b; this file completes the record. See
> `kb/mistakes-log.md` #14 and the new record-completeness entry.

**graded_by: self** — the readability audit was run inline by the main session, not by a fresh
subagent, so this is a self-assessment and weaker evidence. Recorded here rather than hidden.

## Verdict
Amber. One genuine page-specific readability defect was found and fixed (an ASQA disclosure block at
~135 CPL). Everything else the render probe flagged is either a probe artefact or a pre-existing
shared-component/template issue affecting every ABE page, not this page's authorship.

## Scorecard (measured)
| Check | Result |
|---|---|
| `audit_static.py` | 0 FAIL, 4 FLAG. All four are the parser-vs-token-register limitation the skill documents (body size, ground, ink are CSS-variable tokens it can't resolve) plus sub-12px text in shared chrome (header rail, pagebar, bundle-tile classes), not this page's body. |
| `audit_render.py` | 5 FAIL, triaged below. |
| Mobile measure (390px) | ~42 CPL — pass. |
| noindex / sitemap | correct (noindex present, absent from sitemap). |

**Render-probe FAILs triaged:**
- **Page-specific, FIXED:** the ASQA location-2 `Note` rendered full-width, ~135 CPL at 1273px. Wrapped
  in `.measure`; now 480px ≈ **64 CPL**. Rebuilt green. (This is the one `manual_fix_pass`.)
- **Probe false positive:** TrustBand "1:1 white-on-white" — the section is `bg-dark` rgb(26,26,26)
  with white text (~15:1); the probe measured the capsule's own 6%-opacity overlay, not the composited
  dark background.
- **Shared chrome / template-wide (NOT this page; present on every ABE page incl. live ones):** burger
  button overflow at 320px + 40×20px tap target (SiteHeader); low-contrast small labels in header nav,
  footer "Sources", SectionWayfinder; full-width prose in PriceCard `foot`, SectionWayfinder and the
  footer legal disclosure. Logged for a site-wide component/token pass, not fixed here (condition 1).

## What worked
The triage: separating one real page-specific defect from probe artefacts and shared-chrome issues,
rather than reporting all five FAILs as page defects. Reading the CSS chain in the browser distinguished
the TrustBand false positive from a real contrast failure.

## What didn't
The review was not filed at the time (this file is the late correction). The static lint's FLAGs are
mostly noise against this token-based register — the skill already warns about this, but it still needs
a human read to separate real sub-12px body text from shared chrome.

## Output
- Fix applied: ASQA Note width 135 → 64 CPL.
- mistakes-log: the shared-chrome contrast/overflow issues are a standing site-wide item (burger button,
  low-contrast small labels, component line-lengths) — logged for a deliberate token pass, not per-page.
- Demand list: the readability render probe conflates shared-chrome failures with page failures; a
  per-page filter (like the one proposed for the check-script warnings) would make its output actionable
  without a manual triage each run.
