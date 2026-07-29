---
# Machine-readable block for a DESIGN review. Kept in skill-reviews/design/ so the flat
# skill-reviews/*.md build-run scans (system-health coverage, review-trends) never read it.
date: 2026-07-28
kind: design
subject: design/landmarks-and-carriers
graded_by: self
grade_reason: no fresh-subagent design grader exists yet; consistent with the other 2026-07 design reviews.
verdict: Green
shipped:
  - src/layouts/BaseLayout.astro          # skip link
  - src/layouts/CourseLayout.astro        # <main>
  - src/layouts/CpdBundleLayout.astro     # <main>
  - src/layouts/HubLayout.astro           # <main>
  - src/pages/*.astro (8)                 # <main>, and skip link where the shell is duplicated
  - src/components/TrustBand.astro        # lede prop
  - src/components/PartnerDisclosure.astro # scoped the verification date
  - src/styles/global.css                 # .skip-link, .trust-lede, main > .note gutters
  - src/pages/styleguide.astro            # TrustBand specimen + <main>
---

# Design review — landmarks, a mis-scoped date, and the wrong carrier

Session type: **design**, taking the four `[design]` items from the independent Stage 7 audit of
`/white-card-wa`. Pre-flight `node scripts/system-health.mjs` → 0 failing before starting.

## F13 — no `<main>` landmark, and no skip link, anywhere

**Measured before:** `<main>` count **0** across all 19 pages. Skip link: **absent**.

The naive fix is to wrap `BaseLayout`'s `<slot />`. That is wrong here and worth recording: every
page layout renders `SourcesFooter` **inside** that slot, so wrapping it would put `<footer>` inside
`<main>` and **demote the site footer out of the `contentinfo` landmark** — trading one landmark
defect for another. `<main>` therefore goes in each layout and each standalone page, before the
footer.

**A `<main>` on its own is half a fix.** It helps a screen-reader user navigating by landmark; a
keyboard user still tabs the whole header and megamenu on every page. The skip link ships with it.

**Measured after, on the built output, all 19 pages:**

| Check | Result |
|---|---|
| Exactly one `<main>` per page | **19/19** |
| Exactly one `</main>` | 19/19 |
| `<footer>` outside `<main>` | 19/19 (see note) |
| `<header>` outside `<main>` | 19/19 |
| Skip link present | 19/19 |
| Skip link target resolves to `<main id="main">` | yes |

Skip-link behaviour, measured: `top` **-100px → 16px**, left 16px, **45px tall** (over the 44px tap
target), `z-index` **100** against the sticky header's **50**, maroon ground with white text.

*Note on the one flag:* the sweep reports "footer inside main" on `/styleguide`. That is the
`SourcesFooter` **specimen** — a rendered demo, which is content. The page's real footer (`.sg-foot`)
is outside `<main>`, verified separately. A false positive of my own checker, not a defect.

**One self-inflicted break, caught by the build:** the scripted insertion split
`{footerSources && <SourcesFooter/>}` across the `</main>` in `HubLayout`, because the closing point
was found by string search without accounting for a wrapping JSX conditional. Compiler error, fixed,
and every other file checked for the same shape (none had it).

## F5 — the ASQA disclosure escaped the gutter system

The archetype places the location-2 disclosure as the last body block, outside any `<section>`, so
it has no `.wrap` and no gutter.

**Measured on `/white-card-wa` at 1265px:** note left **0px** against a content edge of **61px**. The
gap *grows* with the viewport, because `.wrap` centres at `--max` (≈228px out at 1600px).

Fixed in CSS rather than in the page, because the page is content and this is a layout defect.
`main > .note` now takes the same column offset `.wrap` produces.

| Viewport | Note left → content left | After |
|---|---|---|
| 1265px | 0 vs 61 (**61px out**) | 61 vs 61, **aligned** |
| 375px | 28 vs 28 after the first fix, but the box ran to the **right viewport edge** | 28→347 vs 28→347, **both edges aligned** |

The mobile right-edge asymmetry was introduced by my own first attempt (left margin only) and caught
by measuring rather than assuming the left fix was sufficient.

## F8 — a date that contradicted the page

`PartnerDisclosure` rendered `rec.verified` bare: "Verified 19 Jul 2026", nine days older than the
page's own "Government facts verified 28 Jul 2026", on the page's single most important trust
artefact. An independent auditor read the older one as the page's own.

**The date was not wrong; it was unlabelled.** It is when the *partner record* was last checked, which
is legitimately independent of when the page's government facts were verified. Now renders
**"Provider record · Verified 19 Jul 2026"**. Four words, no content change, contradiction gone.

## F7 — the carrier, finally fixed

Earlier today this finding was raised, "fixed" by extending the TrustBand capsule from 19 to 55
words, then **reverted after measuring**: at 375px that produced fourteen lines of reversed text
against about five. Stage 4 had predicted exactly that in `04-content.md`.

The finding was real and the fix was wrong, because the problem is the **carrier**, not the copy.
`AnswerCapsule` carries a 40-60 word answer-first contract built for AI extraction. The trust band
answers no question, so the contract does not fit.

`TrustBand` now takes its own **`lede`** prop rendering a plain `.trust-lede` paragraph, with no
word-count contract. Measure capped at 60ch, matching the on-dark capsule ceiling, because reversed
text is where a long line costs most. **The slot is kept and marked deprecated** so existing pages
render unchanged until a build session migrates them — this session must not edit `src/content/**`.

The styleguide specimen now demonstrates `lede`, and its description states plainly why the capsule
is wrong here, including the measured fourteen lines.

## Design-register changes

**No token values changed.** Three new rules added, all from existing tokens: `.skip-link`,
`.trust-lede`, `main > .note`. Rule 7 is not engaged.

**One magic number, flagged rather than hidden:** `main > .note` repeats `.wrap`'s `28px` padding,
which has no token. The two must move together, and the comment says so.

## Verification limits

`:focus` could not be observed directly: the Browser pane never holds window focus, so
`document.hasFocus()` is false and `:focus` never matches even with `activeElement` set. Worse, the
`transition: top .15s` meant `getComputedStyle` returned the animating value on every read, which
looked at first like the rule not applying at all. Resolved by disabling the transition and reading
the settled value: **16px**, rect confirmed. Both the rule and its outcome are verified; only the
literal keyboard interaction is not.

Screenshots were unavailable again (pane not displayed, so no compositing).

## Demand list

Tag every item: [skills] | [design] | [facts]

- [build] Migrate the four `<TrustBand>` call sites in `src/content/courses/*.mdx` from
  `<AnswerCapsule onDark>` to the `lede` prop, then the deprecated slot can go. Content-owned.
- [build] `/white-card-tas` still carries a breadcrumb to the unbuilt `/white-card`, in both the
  visible crumb and the schema. Found by the new `check-links` breadcrumb rule (PR #58).
- ~~[design] `.topic` and the other interactive cards still have no `prefers-reduced-motion` guard on
  their 2px lift. `ResourceLink` has one. Sweep them or drop mine, but make it consistent.~~ fixed in #89
- [design] `.wrap`'s 28px gutter has no token, and is now written in two places. Give it one.
- [skills] My landmark checker counts any `<footer>` inside `<main>` as a defect, which is a false
  positive on a component library where a footer is a specimen. Narrow it if it is ever promoted
  from a scratch script into `scripts/`.
