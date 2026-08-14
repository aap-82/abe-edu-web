---
# Machine-readable block. scripts/review-trends.mjs parses this, so keep the keys and
# shapes exactly as they are — prose belongs below the frontmatter, not inside it.
date: 2026-08-04
skill: abe-course-page-astro
subject: white-card
archetype: 6 (hub)
verdict: Amber
graded_by: independent
scores:
  correct_and_safe: amber
  passed_gates_first_time: amber
  inside_effort_budget: green
  low_rework: green
  taught_us_something: green
metrics:
  turns_to_passed_audit: 2
  manual_fix_passes: 0
  gate_fails_after_handoff: 0
---

# Skill review — white-card, 2026-08-04

## Verdict
**Amber.** The formal pipeline (Stages 1-7, `pipeline/white-card/01` through `07`) ran cleanly and
produced a page whose own authored content — hero, spoke grid, comparison table, seven FAQs, CTA band,
`disclaimersHtml` — is accurate, on-brief and internally consistent. But the built page, as it stands,
carries one confirmed authority-model inconsistency in shared, non-authorable chrome (the sitewide
`SourcesFooter` compliance sentence) that this build could not have prevented and cannot fix from its
own writable paths, plus a well-established, still-unresolved readability defect this run re-surfaced
rather than caused. Neither is severe enough to call the run's own work unsafe or badly executed —
both are named, root-caused and routed rather than glossed over — so this lands Amber, not Red, and
not a clean Green either.

## What worked
- **Stage 2's research changed Stage 3/4, not just decorated them.** The connector/SERP pass found
  that no competitor in the `white card australia` top 10 states the WA/TAS-online vs NSW/QLD-live
  delivery-mode split up front, and that reframed the hero/intro brief around *delivery mode* as the
  differentiator rather than state-by-state alone (`03-briefs.md` §"What Stage 2 changed"). It also
  surfaced one concrete content gap — no FAQ answered the "how do I actually get my card" process
  intent (3,600/mo) — which became FAQ Q2 in `04-content.md`, confirmed present in
  `src/content/hubs/white-card.mdx` at position 2. This is the load-bearing evidence for
  `taught_us_something`: a traceable gap → brief → shipped-content chain, not research filed and
  ignored.
- **The one content revision this run needed, it made.** The answer capsule's first draft measured 65
  words, 5 over the 40-60 target; `04-content.md` records the trim (cutting the portability aside the
  FAQ already covers) with the "delete test"/"first-sentence test" reasoning shown. Recounted directly
  from the committed frontmatter (`intro:` in `src/content/hubs/white-card.mdx`) and from
  `dist/white-card/index.html`'s rendered capsule: both measure exactly **57 words**, in range. The fix
  is real and it shipped — see "What didn't" for why `07-verification.md` still lists this as open.
- **Stage 7 found a genuine, previously-undetected defect by design, not by luck.** The `SourcesFooter`
  mismatch (below) was only catchable by rendering this page and its sibling `/white-card-wa` side by
  side and comparing the same disclosure slot — exactly the comparison Stage 7 ran. Root cause traced
  to source and independently re-verified for this review (see Demand list item 1): `src/
  content.config.ts`'s `hubs` schema has no `asqa`-equivalent field; `HubLayout.astro:99`'s
  `<SourcesFooter>` call passes no `asqa` prop; `SourcesFooter.astro:21`'s `asqa = false` default
  always fires for every hub; `SourcesFooter.astro:88-95` shows the component itself already branches
  correctly when `asqa` is supplied (proven live by `/white-card-wa`). The gap is entirely upstream of
  anything a hub author can set.
- **The hub-level "Reviewed by Dominic Ogburn" byline is not an authority-model violation** — checked
  because it looked, at first read, like the same class of bug as the footer defect (Dominic is the
  named *developer* on ABE-developed products; White Card is 100% RTO-delivered). It isn't: every
  individual course page's own `reviewedBy` is Warwick Smith (confirmed by grep across
  `src/content/courses/*.mdx`), and `src/layouts/BaseLayout.astro:18` documents the split explicitly in
  a type comment — "Warwick Smith on course pages, Dominic Ogburn on hubs" — a standing, deliberate
  convention already in use on `/owner-builder-courses`, not something this build invented or misapplied.
- **Toolchain output matches what I re-ran independently.** `check-pipeline.mjs --slug white-card`,
  `check-claims.mjs --slug white-card` and `check-links.mjs --slug white-card`, re-run for this review,
  reproduce `07-verification.md`'s figures exactly (1 failing/1 warning/33 ok on pipeline; the same
  $169/QLD-Saturday-rate WARN pattern on claims; the same stale-`PLANNED` FAIL on links). Nothing in the
  toolchain section was overstated or invented.

## What didn't
- **The confirmed defect: wrong ASQA disclosure sentence.** `dist/white-card/index.html`'s `.f-asqa`
  paragraph reads "ABE Education is not a Registered Training Organisation (RTO). Its owner builder and
  CPD courses are delivered directly by ABE Education under state government approvals" — the
  state-approved-direct branch — on a hub whose four live spokes (WA/TAS/NSW/QLD White Card) are all
  ASQA-accredited, RTO-delivered products. The same page's own `.f-auth` block and FAQ Q6 state the
  correct model. I graded `correct_and_safe` **amber, not red**, for four reasons, each checked rather
  than assumed: (1) the wrong sentence is textually about "owner builder and CPD courses," not White
  Card — it doesn't assert a false fact about *this* product, it's an off-topic boilerplate default,
  not a lie about the page's own subject; (2) the correct model is stated on the same page, twice, in
  the hub's own authored content, so a reader is not left holding a false belief, only a momentarily
  inconsistent one; (3) `07-verification.md`'s own hard-blocker table already reached the same
  conclusion ("not a literal breach") and I independently re-derived it rather than deferring to that;
  (4) the root cause is a schema/layout gap with zero writable surface inside `pipeline/**` or
  `src/content/hubs/**` — no hub author, however careful, could have set this correctly today. Red is
  reserved for a run whose own work is unsafe; this run's own work is correct, and it caught, root-
  caused and escalated an infrastructure gap that predates it. That said, it is a real, live
  inconsistency on a page that would ship this way, which is why it isn't Green either.
- **`07-verification.md` itself has two inaccuracies I found on cross-check, not on trust.**
  - Real-defects item 3 says the capsule "is at 65 words... flagged rather than silently fixed." It
    isn't, currently: the committed `intro` field and the built HTML both measure 57 words (counted by
    hand above). `04-content.md`'s own revision note dates the trim to "after Stage 7's fresh check,"
    so the sequence is: Stage 7 found 65, that fed back into a content fix, and `07-verification.md`'s
    prose was never updated to match. The finding is stale, not live.
  - Real-defects item 4 calls the `--slate-light` "About"/"Coming soon" 2.68:1 contrast a "real,
    correctly-measured AA failure" worth a fresh `[design]` item. It's real *and measured correctly*,
    but not *open*: `skill-reviews/design/2026-07-30-measure-contrast-and-tap-targets.md` already
    adjudicated the identical token on the identical markup pattern (a non-interactive,
    `aria-disabled="true"` `<span>`, not a link) as exempt under WCAG 1.4.3's inactive-UI-component
    carve-out, and explicitly declined to raise it because doing so "would have destroyed the muting
    that tells a reader the item is not yet clickable." I verified this hub's own instances render the
    same way — `<span class="nav-l soon" aria-disabled="true" title="Coming soon">About</span>` and
    `<span class="cmp-soon">Coming soon</span>`, both non-interactive — so the exemption applies
    identically here. Re-filing this as a fresh design ask would spend a design session re-litigating a
    settled call.
  Neither slip changes the page's own correctness. Both are process findings about the verification
  artefact's own accuracy, which is why `passed_gates_first_time` is amber rather than green: the
  toolchain gates this page's content passed cleanly, but the audit narrative that describes them
  needed a correction on read, twice.
- **The one genuinely open, unresolved repeat: `.capsule`'s line length.** `HubLayout.astro`'s intro
  capsule (shared `.capsule` component, used sitewide) renders at ~91 characters per line at 820px/18px
  — over the site's own 85 CPL hard rule — and this has now been measured and filed at least five times
  without a fix (see Demand list item 3). Unlike the contrast finding above, this one was never ruled a
  non-defect; it was explicitly deferred as a design-register decision each time.
- **`scripts/check-links.mjs`'s stale `PLANNED` entry for `/white-card`** is real and reproduces on
  re-run, but the fix is a one-line deletion inside `scripts/**`, outside this build's writable paths.

## Demand list
Tag every item: [skills] | [design] | [facts] | [build]

- [skills] `src/content.config.ts`'s `hubs` schema has no `asqa`-equivalent field, so
  `HubLayout.astro:99`'s `<SourcesFooter>` call can never pass one, and `SourcesFooter.astro:21`'s
  `asqa = false` default always fires for every hub regardless of its spokes' real authority model.
  Confirmed wrong on `/white-card` (100% ASQA-accredited spokes): the built page's `.f-asqa` paragraph
  states the state-approved-direct disclosure, contradicting the same page's own `.f-auth` block and
  FAQ Q6. `SourcesFooter.astro` already branches correctly when `asqa` is supplied (proven live by
  `/white-card-wa`'s correct rendering of the same slot) — only the schema field and the
  `HubLayout.astro` thread-through are missing. Filed under `[skills]` because the schema field is the
  blocking prerequisite; a `[design]` session still needs to edit `HubLayout.astro:97-99` to read the
  new field and pass it to `<SourcesFooter>` once it exists — flagging that follow-up here rather than
  opening a second item for it. First sighting of this specific gap; it predates this build (the
  default happened to be correct for `/owner-builder-courses`, the only other live hub) and will recur
  on any future ASQA-accredited hub until fixed.
- ~~[skills] `scripts/check-links.mjs:44` still lists `/white-card` in its `PLANNED` array
  ("W3-6 - White Card hub") now that the page exists and ships. One-line deletion. Confirmed the FAIL
  still fires via `node scripts/check-links.mjs --slug white-card` as of this review. First sighting.~~ fixed 7 Aug 2026 in a dedicated session (skill-reviews/skills/2026-08-07-check-links-stale-planned-entry.md: check-links went 1 failing to 0). Struck 14 Aug 2026 by the new demand-split staleness detector, which found it on its first sharpened run: filed twice on 4 Aug, fixed three days later, and left open for a further seven because nobody went back to the filing reviews. Verified before striking - /white-card no longer appears in the PLANNED map.
- ~~[design] AT LEAST FIFTH SIGHTING — `.capsule` (the shared answer-capsule component `HubLayout.astro`
  and every course page use) renders at ~91 characters per line at 820px/18px, over the site's own 85
  CPL hard rule. Prior sightings, oldest first: `skill-reviews/design/2026-07-30-measure-contrast-and-
  tap-targets.md` (filed, explicitly deferred: "the answer capsule is the design register's primary
  reading measure and resizing it sitewide is its own decision, not a side effect of a footer
  session"); `/white-card-wa`'s own 30 Jul 2026 Stage 7; the now-superseded
  `skill-reviews/2026-08-04-abe-course-page-astro-white-card-hub.md` and `skill-reviews/2026-08-04-
  abe-readability-audit-white-card.md` (both against this same page, same day); and now
  `pipeline/white-card/07-verification.md` (this run). ROADMAP rule 3 treats a second occurrence as
  authorising restructuring; this is at least the fifth and still unfixed.~~ **Closed 10 Aug 2026.**
  `.capsule` converted from `66ch` to a measured `600px` cap. This hub's own capsule measured 91 CPL
  before and **65 CPL** after. Root cause was the unit, not the number: `1ch` is the advance of "0"
  (12.42px) against an 8.41px average character, so `66ch` bought 92 characters. See
  `skill-reviews/design/2026-08-10-measure-in-px-and-styleguide-ground.md`.
- ~~[build] `pipeline/white-card/07-verification.md`'s Real-defects item 3 states the answer capsule is
  at 65 words. It is not, currently: `src/content/hubs/white-card.mdx`'s committed `intro` field and
  `dist/white-card/index.html`'s rendered capsule both measure 57 words (counted directly), matching
  `04-content.md`'s own revision note that the trim happened "after Stage 7's fresh check." The finding
  is stale — strike it (or update it to record the fix) before `07-verification.md` is committed, so
  the artefact doesn't misstate the page's current state.~~ closed 14 Aug 2026 — verified: 07-verification.md:276 now reads "~~Answer capsule at 65 words~~ Fixed same day, after this finding", with the trim to 57 words recorded. The stale prose this item reported has been struck in the artefact itself.
- [build] `pipeline/white-card/07-verification.md`'s Real-defects item 4 characterises the
  `--slate-light` "About"/"Coming soon" 2.68:1 contrast finding as live and worth a fresh `[design]`
  item. It's already closed: `skill-reviews/design/2026-07-30-measure-contrast-and-tap-targets.md`
  ruled the identical token on the identical non-interactive-`<span>` pattern exempt under WCAG 1.4.3,
  and this hub's own "About"/"Coming soon" instances render with the same
  `aria-disabled`/non-interactive markup (verified in `dist/white-card/index.html`). Correct or strike
  this half of item 4 before committing 07, so a future design session doesn't re-litigate a settled
  call. (The CPL half of item 4 is real and is carried forward separately above.)

## Output — every Amber or Red needs at least one
- [ ] Fix applied — none by this review; all four items above need a session type this grading pass
  doesn't have write access to (`scripts/**`, `src/content.config.ts`, `src/layouts/**`,
  `pipeline/white-card/07-verification.md` pre-commit edits).
- [ ] Memory written — not written here; nothing in this run's findings is a new transferable lesson
  beyond what the demand list already states precisely (the ASQA-footer gap is a one-off schema/layout
  fix, not a pattern needing a memory note yet — it will be, if a second ASQA hub reproduces it).
- [ ] Skill-change spec for the improvement pass — not filed; the `hubs`-schema gap is a data-model fix
  (`[skills]`), not a change to `abe-course-page-astro`'s own process.
- [ ] `kb/mistakes-log.md` entry added or incremented — not done by this review (outside this grading
  pass's writable scope); the `07-verification.md` staleness/mischaracterisation findings above are
  candidates for a future skills session to log if they recur on another page's Stage 7.

## Grader note
`graded_by: independent`. This review is the fresh-subagent grading CLAUDE.md rule 6 requires; no
self-grading rationale is needed. Method, for what it's worth checking: every claim above that could be
independently re-verified was — the `.f-asqa`/`.f-auth` text was read directly out of
`dist/white-card/index.html` (not taken from `07-verification.md`'s quotation of it), the schema/layout
root cause was re-traced through `src/content.config.ts`, `src/layouts/HubLayout.astro` and
`src/components/SourcesFooter.astro` rather than trusted from the artefact's description, the capsule
word count was recounted by hand against both the committed MDX and the built HTML, the "Reviewed by
Dominic Ogburn" byline was checked against every course page's own `reviewedBy` and against
`BaseLayout.astro`'s type comment before being cleared as not a defect, and the contrast/CPL repeat
counts were established by grepping `skill-reviews/` and `skill-reviews/design/` rather than asserted.
The three slug-scoped toolchain commands in `07-verification.md` were re-run rather than read only, and
reproduced the same figures. The two corrections to `07-verification.md` (the stale capsule claim and
the mischaracterised contrast finding) are the parts of this review most worth a second opinion, since
they disagree with the prior fresh subagent's own characterisation rather than merely extending it.
