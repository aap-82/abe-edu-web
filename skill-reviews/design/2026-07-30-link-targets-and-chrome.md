---
date: 2026-07-30
skill: design-session
subject: link-targets-and-chrome
verdict: Green
graded_by: self
---

# Design review — link targets, and the last of the chrome item, 2026-07-30

## Verdict

**Green.** Two groups closed, seven filings struck. The one that mattered was a **decision filed five
times and never made**, and the reason it kept coming back was not indecision: **no rule existed to
point at**, so each session re-argued it from scratch and filed it again. Deciding it without writing
it down would have produced a sixth.

## 1. Citations stay same-tab — and the rule is now written

**No markup changed** in `VerifiedSources` or `SourcesFooter`. The 200 citation links across 16 pages
are exactly as they were, which is the change that had to *not* happen and was verified as such.

The reasoning already existed in the codebase, unwritten. `ResourceLink.astro:8-9` draws the line
itself: `VerifiedSources` is *"a dated ledger attesting that WE checked a fact. Passive proof, past
tense"*, where ResourceLink is *"an invitation for the READER to go and look."* The `_blank` precedent
(`PartnerDisclosure.astro:38-42`) rests on *"a verify-then-return errand"* — and a citation is not one.

`DESIGN.md` §7 now states it as a table keyed on **the reader's job, not the destination**: invitations
to act open in a new tab with a mandatory `.sr-only` cue; provenance stays in-tab.

**Two conflicts this creates, routed rather than ignored.** Both predate the rule and prescribe
`target="_blank"` for exactly gov-citation links:
- `kb/register/government-listings.md:114,124` — **facts-owned**
- `.claude/skills/.../references/seo/trust-bar-guidelines.md:271` — **skills-owned**

DESIGN.md names itself the authority and names both files, so a reader who meets either one first has
a pointer out. Creating fresh drift while closing a five-time filing would have been the worst
available outcome, so this is flagged loudly here and in the rule itself.

## 2. `PageBar.astro` — the only `_blank` on the site without a cue

Fixed. It was non-conforming by the standard `PartnerDisclosure.astro:40-42` states, on every page
carrying an external reviewer link (`/cpd`, `/cpd-tas`, `/owner-builder-courses`).

Not on the demand list — found by the exploration for this session and declared rather than smuggled.
Hoisted into its own `const` per CLAUDE.md's Astro 7 rule, since `PageBar` builds the anchor as an
HTML string and a nested template literal would have failed the build at a lying line number.

Measured in the browser, not the markup: accessible name **"Dominic Ogburn, opens in a new tab"**, cue
computing to `position:absolute; width:1px; clip:rect(0,0,0,0)` — announced, not seen.

## 3. Logo `aria-hidden` — `SiteHeader.astro`

Added. Safe and verified: the brand link's accessible name is `aria-label="ABE Education home"` plus
visible `.wordmark` text, so the mark was never the accessible name. Confirmed in the browser that the
label survives. It never tripped a gate because `guardrails.ts` checks alt length on the page **body**,
with chrome excluded.

## 4. `training.gov.au` casing — two pages, not one

The item said "one page". It was **two**: `white-card-wa` and `white-card-tas`.

**The direction was verified at source before applying it,** because getting it backwards would have
put a redirecting URL into JSON-LD. Both forms were opened in a browser: each resolves, each
**preserves its own casing**, both serve the same record, neither redirects to the other. So there is
no correctness difference and the choice is house consistency — which the repo's own rules already
settle on the capitalised form (`authority-model.md:177,221`, `content-source-map.md:126`,
`CLAUDE.md:99`, `badge-inventory.md:42`, all three partner records).

| Page | Before | After |
|---|---|---|
| `white-card-wa` | `/Organisation/Details/` ×3, `/organisation/details/` ×6 | **×9, ×0** |
| `white-card-tas` | ×2, ×7 | **×9, ×0** |
| `CPCWHS1001/unitdetails` | ×1 | **×1, untouched** |
| JSON-LD `Organization.url` | lowercase, ×2 per page | **capitalised** |

Totals preserved exactly (9 and 9), so nothing was lost or duplicated in the rewrite.

**The measurement caught a miss.** After the first pass `white-card-tas` still had one lowercase: my
edit covered `src/content/courses/*.mdx` and the eleventh occurrence lived in
`src/data/faqs-white-card-tas.ts`. **This is the exact lesson `check-claims` was extended for** — the
ACT fee that went unnoticed because only `src/content` was scanned while page facts also live in
`src/data/*.ts`. Found only because the verification measured `dist/` rather than trusting the edit.

## The boundary this session crossed, on instruction

The casing fix is entirely in `src/content/**` and `src/data/**` — **build-owned**, not design. I
raised that doing both in one session crosses the one-session-one-type rule; Andrey chose it. Recorded
here rather than left silent, because the rule's purpose is that boundary decisions are visible, not
that they never happen. Nothing else in the session left design's scope.

**Not exclusive under rule 7:** the DESIGN.md addition is behaviour guidance. No token, colour or
spacing value changed.

## Post-merge: the boundary crossing cost exactly what the rule predicts

Appended after #93 merged. Scores unchanged; this is the consequence, recorded rather than left for
the next session's pre-flight to discover.

**Editing build-owned page content tripped the build session's gate.** `check-pipeline` §4 (gate
ordering, mistakes-log #19) FAILed both slugs: the page sources became newer than their
`07-verification.md`, which is precisely the invariant it protects — *content must never outrun its
verification*. It fired correctly, and it fired **because** a design session wrote to `src/content/**`.
That is the one-session-one-type rule earning its keep, on the exact change I flagged when raising it.

Resolved by recording a dated delta in each `07-verification.md` rather than re-running Stage 7
wholesale — the same treatment the hero-asset and aspect-ratio deltas in those files received. The
note states what changed, that no fact, figure, wording, source or authority statement moved, and that
**both casings were opened in a browser**: each resolves, each preserves its casing, both serve the
same RTO 31193 record, neither redirects. All four slugs back to "verification is current".

Note it needed a **commit** to clear, not just an edit: §4 compares git commit times, not mtimes,
deliberately, because a checkout rewrites mtimes and would make the check lie.

**Then `check-shipped` fired** — "content that can no longer reach main" — because I had pushed the
delta notes to a branch whose PR was already merged. **That is mistakes-log row 22 verbatim**, caught
by the guard built for it, on the person who shipped that guard. Resolved with a second PR rather than
by pushing at a merged branch and hoping.

Two guards, two true positives, both on one session's tail. Neither is a defect in the work; both are
the system doing what it was built to do to a session that stepped outside its lane on purpose.

## Demand list
Tag every item: [skills] | [design] | [facts] | [build]

- [facts] `kb/register/government-listings.md:114,124` prescribes `target="_blank"` for government
  citation links, which now contradicts `DESIGN.md` §7. Update it to point at DESIGN.md as the
  authority. Register-owned, so a facts session must do it.
- [skills] `references/seo/trust-bar-guidelines.md:271` carries the same `target="_blank"` template for
  gov citation links, with the same conflict.
- [skills] Nothing checks link targets. The rule now exists in DESIGN.md and is enforced by nobody —
  a `_blank` without an `.sr-only` sibling is mechanically detectable in `dist/`, which is exactly how
  the `PageBar` defect was found by hand. First filing; recorded, not built.
- [skills] Nothing normalises external URL casing either, which is how one URL shipped in two casings
  across two pages for weeks. Same shape as the figure check: cheap to detect, invisible by eye.
- ~~[design] Contact details still render in both `PartnerDisclosure` and `Credentials` on every ASQA
  page. Second filing — carried from the partner-blurb review, still undecided.~~ decided 30 Jul 2026, then REVERSED the same day: both cards carry contact deliberately. Andrey reworked the Credentials card and restored it; at ~8 screens apart the second copy is reinforcement, not repetition. Closed as decided, not as removed

## Output
- [x] **Fix applied** — DESIGN.md rule, `PageBar` cue, logo `aria-hidden`, 11 URLs normalised;
  **7 demand items closed** across 7 reviews, design note 35 open → **30 open · 24 closed**.
- [x] **Design-register change** — none; rule 7 not triggered.
- [x] **Styleguide specimen** — `PageBar` and `SiteHeader` specimens unchanged and still valid; the
  build's specimen check passes.
- [ ] **Memory written** — not needed; the rule lives in DESIGN.md, which design sessions read.

## Grader note

`graded_by: self`; no fresh-subagent design grader exists. The reproducible parts are the casing table
(re-derive by grepping both casings across `dist/*/index.html`), the unchanged citation counts (17 on
white-card-wa, 22 on qld-owner-builder-course, 0 `_blank`, 0 `rel`), and the browser-measured
accessible name. The judgement call worth challenging is the same-tab decision itself: the strongest
counter-argument is that two repo files already prescribed `_blank` for precisely these links, and I
have overruled both from DESIGN.md rather than deferring to them.
