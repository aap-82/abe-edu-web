---
# Machine-readable block. scripts/review-trends.mjs parses this, so keep the keys and
# shapes exactly as they are — prose belongs below the frontmatter, not inside it.
date: 2026-08-04
skill: abe-course-page-astro
subject: white-card-act
archetype: 2 (nationally recognised course)
verdict: Amber
graded_by: independent
scores:                            # green | amber | red
  correct_and_safe: amber          # NON-NEGOTIABLE. red here fails the whole run.
  passed_gates_first_time: amber
  inside_effort_budget: green
  low_rework: green
  taught_us_something: green
metrics:
  turns_to_passed_audit:           # not recorded in the artefacts — no session/turn log available to this grader (see Grader note)
  manual_fix_passes: 1             # fixes needed after the skill said "done"
  gate_fails_after_handoff: 1      # checks that failed only after handover
---

# Skill review — white-card-act, 2026-08-04

## Verdict

**Amber.** The regulatory and authority-model work is genuinely strong — every one of the seven ASQA
disclosure locations plus the sitewide footer checks out against `kb/rules/asqa-disclosure-framework.md`
(re-verified directly, not taken on trust), the page's one central regulatory nuance (face-to-face
delivery is AlertForce's own arrangement, never a WorkSafe ACT requirement) is stated correctly in
every one of the 7+ places it appears, and `Course.offers.price` agrees with the on-page price in three
places. That is not what keeps this out of green.

Two things do. First, **`Course.hasCourseInstance.courseMode` is hardcoded `"online"`**
(`src/layouts/CourseLayout.astro:89`) in the server-rendered JSON-LD — confirmed directly in
`dist/white-card-act/index.html` — for a page whose entire differentiator from every other White Card
spoke is that it is *not* online. This is the first of the five White Card pages where that hardcoded
value is actually false (it happens to be true for WA/TAS/NSW/QLD), not a hypothetical risk. Second,
Stage 7's own verification — while it caught and the session fixed one real page-content bug (a
duplicated `SectionWayfinder` link) — itself contains defects a fresh check of the wider skill-reviews
record turns up: one demand item it filed is not a real, open finding at all (already explicitly
adjudicated as not-a-defect nine days earlier), a second is undercounted by a factor of six, and a
third genuine, reader-facing, repeatedly-filed defect class went unmentioned entirely. See "What
didn't" for all three, independently verified below.

Neither issue is a guessed or defaulted regulatory fact, neither reaches a human reader with false
information, and neither is an authority-model breach — which is why this is amber rather than red.

## What worked

- **ASQA disclosure, re-verified at all 8 locations directly against the framework**, not re-typed from
  Stage 7's own table: hero tick, `PartnerDisclosure` near-CTA card, footer `.f-auth`, footer copyright
  bar, the 3 mandatory FAQ questions, the `#rto-partner` section, the Terms link, and the sitewide
  `.f-asqa` paragraph. All present, all correctly attributing AlertForce (RTO 91826) as developer/
  deliverer and ABE Education as publisher/enrolment partner only. "ABE Education (RTO 91826)" appears
  nowhere.
- **The Stage 2 "online" search-demand finding (~100/mo) genuinely reshaped the copy**, independently
  confirmed live rather than taken from the pipeline's own account: `src/data/faqs-white-card-act.ts:5-8`
  carries a comment explicitly tracing the "Can I do this course online?" FAQ item back to Stage 2, and
  the `#accepted` section brief, content and shipped copy all lead with the same finding. This is real
  research changing real output, not a finding filed and ignored — the delete test in `04-content.md`
  ("cut the Stage 2 finding and the section collapses into a generic line") holds up against the built
  page.
- **No internal fact was re-asked.** `01-source-map.md` shows price and the CTA target (no `buyUrl` yet)
  were each asked once, answered by Andrey in-session, and closed; RTO partner, reviewer, credential and
  authority model were all pulled from existing records without being re-derived.
- **The one real page-content bug found in Stage 7 (duplicate `SectionWayfinder` in `#how-it-works`) was
  fixed same session and the fix verified in the rebuild** — confirmed independently: `grep`-counting
  "Who developed and checked this" in the built HTML returns exactly 1, not 2.
- Section conformance, band rhythm, JSON-LD validity (`Person`×1, `recognizedBy` = AlertForce, price
  parity, breadcrumb), canonical URL (no trailing slash), and the government-source citation gate all
  independently re-checked clean.

## What didn't

**1. `hasCourseInstance.courseMode: "online"` — real, live, page-specific, and it is the first White
Card spoke where this is actually wrong.** Confirmed directly in the built HTML's JSON-LD. Not
fixable inside this page's frontmatter (the layout never exposes the field); Stage 7 flagged it
correctly as layout/schema-owned and routed it rather than attempting a cross-boundary fix. Weighed on
its own terms rather than copying Stage 7's framing: it is invisible to a human reader (inside a
`<script type="application/ld+json">` block, not rendered prose) and does not touch any authority-model
claim, so it does not rise to the "guessed/defaulted/reader-facing" bar the NSW review (1 Aug 2026)
correctly reserves for a red on `correct_and_safe`. But it is a genuine, live factual inversion in
machine-readable data a crawler or rich-result validator reads, on the one page for which it is
currently false — real enough to keep `correct_and_safe` out of green.

**2. Stage 7 mischaracterises an already-settled, closed finding as a live open defect — the same
mistake named twice already this week, for the exact same finding.** `07-verification.md` files the
disabled `.nav-l.soon` "About" nav item's 2.68:1 contrast (`SiteHeader.astro`) as a real, shared-
sitewide `[design]` FAIL. It is not open: `skill-reviews/design/2026-07-30-measure-contrast-and-tap-
targets.md` explicitly ruled this exact token/selector exempt under WCAG 1.4.3 (text inside an inactive
UI component) on 30 Jul 2026, five days before this run. This is not this review's own discovery of the
mistake — it is the **third** time it has been named: first by `skill-reviews/2026-08-03-abe-course-
page-astro-white-card-qld.md` ("Two of Stage 7's WARNs re-open questions the design register already
settled, without checking it first"), then again the same day as this build by `skill-reviews/2026-08-
04-abe-course-page-astro-white-card-hub-rebuild.md` (filed `[build]` against the hub's own
`07-verification.md` for identically mischaracterising the same finding). `white-card-act`'s Stage 7 is
a third, independent instance of the identical lapse, and `.claude/skills/abe-course-page-astro/
references/verification.md` still has no step telling a Stage 7 run to check the design register before
filing a readability WARN/FAIL — confirmed by reading the file directly.

**3. Stage 7 undercounts a repeatedly-filed defect by a wide margin, without checking the record.**
`07-verification.md` reports the `.capsule`/`.trust-lede` desktop measure (~91 CPL, over the site's own
85-CPL rule) as merely "confirmed byte-identical on `/white-card-tas`." It is that, but it understates
the finding's status: `skill-reviews/2026-08-04-abe-course-page-astro-white-card-hub-rebuild.md` already
tallied this as "AT LEAST FIFTH SIGHTING" as of earlier the same day, across
`skill-reviews/design/2026-07-30-measure-contrast-and-tap-targets.md`, `/white-card-wa`'s own 30 Jul
Stage 7, two now-superseded 4 Aug hub reviews, and the hub rebuild's own Stage 7. This run's
`07-verification.md` is therefore at least the **sixth** sighting, not a fresh one — well past ROADMAP
rule 3's second-occurrence restructuring trigger, which has now been cleared five times over without
the underlying `.capsule` cap being widened.

**4. A real, reader-facing defect Stage 7 never checked for at all.** `dist/white-card-act/index.html`
ships two FPO image placeholders (hero and the `#how-it-works` ZSection) that print their own internal
art direction as visible body copy — "Image placeholder", "A worker in Canberra in hi-vis, arriving at
a face-to-face White Card training session.", "4:5 · warm tone · ~1000×1250" — on a page confirmed
`<meta name="robots" content="index,follow">` and present in `dist/sitemap-0.xml`. `07-verification.md`
checks only the *alt-text length* of these slots (correctly, both pass); it never checks for the
separate, already-well-documented pattern of the placeholder's own spec string rendering as reader-
visible text on an indexable page. This is at minimum the **fourth sighting**: `skill-reviews/2026-07-
28-abe-course-page-astro-white-card-wa.md` ("B4"), `skill-reviews/2026-08-01-abe-course-page-astro-
white-card-nsw.md` ("THIRD SIGHTING — `cpd-building-tas`, `white-card-wa`, now `white-card-nsw`"), and
now `white-card-act`. Both prior reviews asked for the same fix ("fail the build when an `index,follow`
page contains a `.ph` placeholder, or render the spec string only outside production") and it still has
not been built — confirmed by grep, no script in `scripts/*.mjs` implements any such guard.

None of these four sit inside `verification.md`'s own named hard-blocker list, and none is an authority-
model or reader-facing regulatory-fact error — which is why the run is amber, not red. But three of the
four (2, 3, 4) are evidence that the Stage 7 gate itself is not doing the job the last three reviews
have already asked it to do, and that is a heavier finding than any one of this page's own defects.

## Demand list
Tag every item: [skills] | [design] | [facts] | [build]

- ~~[build] `src/content/courses/white-card-act.mdx:183` — duplicate `<SectionWayfinder>` inside a
  `<ZSection next={...}>` block~~ fixed same session, line deleted, rebuilt and confirmed clean (1
  occurrence of "Who developed and checked this" in the built HTML, independently re-counted here).
- [design] `CourseLayout.astro:89` `hasCourseInstance.courseMode` is hardcoded `"online"` for every
  course page. First sighting as a filed, named defect about the field itself — the only prior mention
  anywhere in `skill-reviews/` is `skill-reviews/2026-08-01-abe-course-page-astro-white-card-nsw.md`
  citing the same field value once, in passing, as evidence for a different, unrelated finding's blast
  radius (the SafeWork NSW online-delivery-authority question), never filed as its own item. Now
  demonstrated live and false on `white-card-act` specifically — the first of five White Card spokes
  where the hardcoded value does not happen to be true. Needs a frontmatter-driven field threaded
  through the layout, or at minimum a classroom/onsite branch. Owner: design (`CourseLayout.astro`)
  and/or skills (`src/content.config.ts` if a schema field is required).
- [skills] THIRD SIGHTING — `.claude/skills/abe-course-page-astro/references/verification.md`'s Stage 7
  checklist has no step requiring a check of the design register / recent `skill-reviews/` before
  filing a readability-audit WARN or FAIL, and it has now cost three separate runs in four days the
  identical mistake on the identical finding. `pipeline/white-card-act/07-verification.md` files the
  disabled `.nav-l.soon` "About" @2.68:1 contrast (`SiteHeader.astro`) as a live, shared-sitewide
  `[design]` defect. It is closed: `skill-reviews/design/2026-07-30-measure-contrast-and-tap-
  targets.md` ruled this exact token/selector exempt under WCAG 1.4.3 on 30 Jul 2026.
  `skill-reviews/2026-08-03-abe-course-page-astro-white-card-qld.md` named the pattern first (3 Aug);
  `skill-reviews/2026-08-04-abe-course-page-astro-white-card-hub-rebuild.md` named the identical finding
  again the same day this page was built. Add the check to `verification.md` once, rather than let a
  fourth Stage 7 rediscover it. Do not carry the "About/2.68" item forward as an open `[design]` item on
  this page — it is not one.
- [design] AT LEAST SIXTH SIGHTING — `.capsule`/`.trust-lede` (the shared answer-capsule component on
  every course page and both hubs) renders at ~91 characters per line at 820px/18px desktop, over the
  site's own 85-CPL rule. `pipeline/white-card-act/07-verification.md` reports this only as "confirmed
  byte-identical on `/white-card-tas`," which undercounts it: `skill-reviews/2026-08-04-abe-course-page-
  astro-white-card-hub-rebuild.md` already tallied "AT LEAST FIFTH SIGHTING" earlier the same day,
  citing `skill-reviews/design/2026-07-30-measure-contrast-and-tap-targets.md` (filed, deliberately
  deferred as a design-register decision), `/white-card-wa`'s own 30 Jul Stage 7, two 4 Aug hub reviews,
  and the hub rebuild's own Stage 7. This page's Stage 7 is at least the sixth. ROADMAP rule 3's
  restructuring trigger was cleared long ago and remains unactioned.
- [skills] FOURTH SIGHTING — an `index,follow` page (confirmed: `dist/white-card-act/index.html`'s
  robots meta and presence in `dist/sitemap-0.xml`) ships FPO image placeholders that print their own
  art-direction spec as visible reader-facing body copy ("Image placeholder", the alt-text prompt
  sentence, and the "4:5 · warm tone · ~1000×1250" dimension string) — confirmed directly in the built
  HTML, and not checked for anywhere in `pipeline/white-card-act/07-verification.md` (which checks only
  the frontmatter `alt` string length of the same slots). Prior sightings:
  `skill-reviews/2026-07-28-abe-course-page-astro-white-card-wa.md` ("B4"),
  `skill-reviews/2026-08-01-abe-course-page-astro-white-card-nsw.md` ("THIRD SIGHTING — `cpd-building-
  tas`, `white-card-wa`, now `white-card-nsw`"). Both asked for the same fix: fail the build when an
  `index,follow` page contains a `.ph` placeholder, or render the spec string only outside production.
  Confirmed still not built — no guard exists in any `scripts/*.mjs` file. This is now the fourth
  sighting with the identical remedy proposed each time.
- [build] The FPO placeholders on this specific page (hero, `#how-it-works`) should be replaced with the
  real images once generated, per `06-image-prompts.md`'s own "generate later" disposition — routine,
  not a defect in itself, but tracked here so it isn't lost alongside the guard item above.
- ~~[build] `Hero.astro:36`'s default CTA microcopy — `cta.microcopy ?? 'Pay by card or 4
  interest-free payments with Afterpay'` — fires on any page whose `cta` frontmatter omits
  `microcopy`, regardless of whether that page has a working `buyUrl`. Found after this review was
  filed, during the build session's own final browser check, not by this grader — recorded here so
  it isn't lost. Confirmed live on two already-shipped pages that have **no** purchase path (`href:
  "#enrol"`): `white-card-tas.mdx` (via the unset default) and `white-card-qld.mdx` (via an explicit
  `microcopy: "No hidden fees. Pay by card. Afterpay available."` override making the identical
  overclaim). Both currently tell a reader a payment method is available that isn't. Fixed on
  `white-card-act.mdx` itself (`microcopy: "One-off payment. No hidden fees."`, matching
  `white-card-nsw.mdx`'s already-safe pattern) — **not** fixed on TAS or QLD, since editing two
  already-live, unrelated pages is outside this build's declared scope; flagged for a follow-up pass
  instead of silently touched.~~ **Closed 8 Aug 2026.** Both pages fixed to the same
  `"One-off payment. No hidden fees."` pattern; `dist/` confirmed zero "Afterpay"/"Pay by card"
  occurrences on either page. Light Stage 7 re-verification appended to both pages'
  `07-verification.md`.

## Output — every Amber or Red needs at least one
- [x] Fix applied — the duplicate `SectionWayfinder` line, same session, confirmed in the rebuild.
- [x] Fix applied — `white-card-act.mdx`'s CTA microcopy overridden to avoid the Afterpay overclaim
  (see the demand-list item above); TAS and QLD's live instances are flagged, not fixed, here.
- [ ] Memory written — not done by this grading pass. Worth doing: the `verification.md` gap (item 3
  above) has now cost three independent runs the same rediscovery in four days and is squarely the
  shape of finding `MEMORY.md` exists to prevent recurring; a build/skills session should write it.
- [ ] Skill-change spec — not written here (this is a grading pass, not a fix pass); the two concrete,
  ready-to-act specs are already in the demand list above (add a design-register-check step to
  `verification.md`; build the FPO-placeholder-on-indexable-page guard).
- [ ] `kb/mistakes-log.md` entry added or incremented — not done; `kb/mistakes-log.md` is skills-owned
  and this is an independent grading pass for a `build` run, not a skills session. Flagging for a skills
  session: the FPO-placeholder pattern (now 4 sightings) and the "Stage 7 doesn't check the design
  register" pattern (now 3 sightings) both look like standing entries this log should carry rather than
  each new review rediscovering them from a `skill-reviews/` grep.

## Grader note

Graded independently: no chat history for this run, only the seven pipeline artefacts, the built
`dist/white-card-act/index.html`, and the repo's existing `skill-reviews/` record, per the task brief.
`turns_to_passed_audit` is left blank rather than guessed — nothing in the artefacts records assistant
turn counts, and QLD's 3 Aug review (also independently graded) left the same field blank for the same
reason; inventing a number would be less honest than a gap. `manual_fix_passes: 1` and
`gate_fails_after_handoff: 1` both refer to the duplicate-`SectionWayfinder` fix: the mechanical
toolchain (check-pipeline/claims/links/positions, guardrails) passed clean first time, and it was the
independent Stage 7 pass — not the build session's own checks — that caught the one real page-content
defect, which is what "after handoff" is meant to capture here.

Every finding under "What didn't" was independently re-derived from primary evidence (the built HTML,
`git log`/`grep` on `scripts/*.mjs`, and direct reads of the cited prior reviews) rather than taken on
Stage 7's or any other review's word — per the "self-certification fails" lesson, the perceived property
was checked (JSON-LD parsed and read, wayfinder link count grepped, sitemap membership grepped, guard
absence grepped) rather than assumed from what an artefact claimed.
