# Stage 7 — pre-deploy RE-VERIFICATION · `/cpd-building-tas`

**Re-run 25 July 2026.** Supersedes the 23 July run (commit `d8368f8`), which certified content that has
since changed. Seven commits touched this page after that verification, so `system-health` correctly
reported the old 07 as certifying stale content (page newer than its verification). This is a Stage-7
re-run only — Stages 1–6 artefacts are present and untouched, no rebuild.

Measured against `dist/cpd-building-tas/index.html`, rebuilt today (build green, 19 pages pass guardrails).
Every value below is read from the built HTML, not carried from a prior artefact.

Authority model: **state-approved-direct** (CBOS approves each course). Two Person nodes (ABE-developed).
`recognizedBy` CBOS Tasmania, never RTO / nationally recognised / Statement of Attainment.

## Commits re-checked (newest first)

- `f0d531b` content(cpd): "12 points" on the proof's first line, capitalise track steps
- `f939f0c` fix(hero): typeset + fill the CPD bundle hero image, payment microcopy
- `ac1caab` content(cpd): wire the Building bundle hero image
- `b1e4b19` feat(cpd): rewrite the bundle course list as cards with real per-course stats
- `5f217eb` fix(cpd): confirm the Building bundle checkout, correct the WHS-cap record
- `1c4bc4a` content: house-style and content-quality pass across course pages
- `651cdbd` fix(cpd): remove a false CBOS claim, and the section built on it

## Priority re-checks (what those commits moved)

1. **Points claim (`f0d531b`).** On-page figure = derived register total. `system-health`: *"CPD building:
   12 points from 12 live courses of 14 tagged"*. The page states "12 points" (sticky) / "twelve …points"
   (6×) and the hero H1 "twelve CBOS-approved points". No `points` field in frontmatter — the figure and
   the member table are counted at build from `kb/register/cpd/tas-courses.json`. No authored subtraction.
   **PASS.**
2. **Bundle course cards + per-course stats (`b1e4b19`).** 12 cards rendered. Each carries "1 CPD point"
   (register: one point each). Rendered minutes — 36, 37, 41, 46, 37, 55, 47, 35, 37, 45 — trace 1:1 to the
   10 `memberInfo.minutes` values (LearnWorlds Jul-2026 snapshot). The two newer courses render
   "— not measured", not a guessed figure. No per-course number is typed against the register. **PASS.**
3. **Checkout + WHS-cap record (`5f217eb`).** `Course.offers.price` = **499** = on-page **$499** (14×).
   The WHS-cap correction holds: the "what counts" section states the caps that exist (WorkSafe events 6/yr,
   research 4, journals 3, membership 2) and that approved online courses carry no cap. No residue of the
   false "capped at four a year" WHS claim (`capped at four` = 0, `four a year` = 0). **PASS.**
4. **Removed CBOS claim (`651cdbd`).** The false WHS-cap claim and the section built on it are gone; the
   rewritten `#what-counts` (marker 02) replaces it. No capsule or FAQ references the removed claim. **PASS.**
5. **Standard Stage-7 grid** — see table.

## Measured grid

| Check | Measured value | Verdict |
|---|---|---|
| H1 count / text | **1** — "Builder CPD Tasmania: twelve CBOS-approved points in one purchase" | PASS (carries primary keyword) |
| Question-led H2s | 7 question-form section H2s + FAQ H2 ("Common questions…") + CTA-band H2 ("Ready to complete your CPD year?") | PASS |
| Answer capsules 40–60, answer-first | 7 capsules: **46, 50, 47, 46, 49, 45, 46** words | PASS (all in band) |
| JSON-LD, single server-rendered `@graph` | Course + EducationalOccupationalCredential + BreadcrumbList + Person + Person | PASS |
| Person nodes ×2 (ABE-developed) | Dominic Ogburn (Course Developer) + Warwick Smith (Compliance & Currency Reviewer) | PASS |
| `recognizedBy` | **CBOS Tasmania** | PASS (state-approved-direct) |
| `Course.offers.price` = on-page price | **499** = $499 | PASS |
| `data-authority` | `state-approved-direct` | PASS (guardrails see the page) |
| Canonical, no-slash | `https://www.abeeducation.edu.au/cpd-building-tas` | PASS |
| Authority language | no RTO / no "nationally recognised" / no Statement of Attainment | PASS |
| Banned copy | "comprehensive" = 0 | PASS |
| Em dashes | 10 total, **none in body prose**: 7 in Source-citation labels ("CBOS — …"), 2 are stat-cell "—" placeholders for the unmeasured courses, 1 in the CTA label "Get the bundle — $499" (button label, consistent with the course-page CTA pattern; not body copy) | PASS |
| `check-claims` | 0 failing; 150/150 figures match register | PASS |
| `robots` | `noindex,nofollow` | NOTE — intentional pre-launch (see below) |

## Standing WARN — `Total not reconciled` — routed, not papered over

`system-health` / `check-claims` WARN: *"Total not reconciled … need exactly one course-fee row and one
government-fee row present in kb/register/, plus an isTotal row (found 0 price, 0 government, 1 total)."*

**Disposition: route to the skills demand list; not a page defect, not fixed here.** The reconciliation
model this check enforces is the course-page shape (course fee + government fee = total). A CPD **bundle**
has no government fee — the `#cost` capsule states it outright: *"There is no government fee attached to CPD
itself."* The bundle's own price integrity is checked separately and passes (`system-health`: *"Bundles: 3
bundle offer(s) reconcile"*; `priceRows` = $1,188 comparison + $499 isTotal, and the saving is left as the
reader's subtraction by design). Forcing a government-fee row onto this page to satisfy the check would
invent a fee that does not exist — the opposite of correct. The gap is in the check's archetype coverage,
not the page. Build-owned page content is correct; the check refinement belongs to the skills session.

## noindex status

`noindex: true` remains, and I have **not** removed it — that is a publish action and out of this
re-verification's scope (handover: "re-verify only … Stop at Stage 8 … do not deploy"). The *verification*
reason for the noindex (frontmatter comment: "verification is stale") is now cleared by this re-run. The
page still inherits one external open question — whether `/payment` survives on the LearnWorlds `learn.`
subdomain at cutover — so removing noindex remains Andrey's call at the publish gate, coupled to that
external blocker, not a Stage-7 output.

## Not run, and why

- `abe-readability-audit`, `final-check`, `ai-detector` not re-run as separate skills for this delta. The
  changed commits are content/figure/image edits already covered by the measured grid, `check-claims`, and
  the build guardrails; the prior run's inline application of those skills still holds for the unchanged
  structure. Recorded as a deviation, consistent with the 23 Jul run.

## Verdict: **PASS** (re-verified against current `dist/`)

0 FAIL for this slug after commit. The one WARN naming this page is the archetype-coverage issue above,
routed to the demand list. noindex is retained as the documented pre-launch state. Stop at Stage 8 — no deploy.

## Re-verification · 11 August 2026 — stepper opted into two columns

**Why this exists.** `Stepper` gained an opt-in `columns` prop the same day
(`skill-reviews/design/2026-08-11-stepper-wide-slot.md`). This page's stepper was the only other
call site on the site setting no `maxWidth`, so it rendered single-column across the full 1144px
wrap — the same "not using the whole length" shape raised on `/white-card-qld`. Andrey asked for it
to get the same treatment.

**Scope: one prop.** No step text, fact, figure, points total, price, heading or schema field
changed. Unlike `/white-card-qld`, this stepper is already in a plain `<Section>` at full width, so
it needed the prop alone and no `wide` slot.

## Measured

| Check | Before | After |
|---|---|---|
| Columns × rows | 1 × 5 | **2 × 3** (last row carries one) |
| Block height | ~1,000px | **481px** |
| Stepper width | 1144px | 1144px, unchanged |
| Page overflow, 1280px and 375px | 0 | **0** |
| `check-reflow` | 0 failing | **0 failing** |

**Reading order verified rather than assumed:** DOM order and visual left-to-right, top-to-bottom
order both run Step 01 → 05.

**Below 1100px it is a single column**, so the mobile rendering is unchanged. The breakpoint sits
above the point a ZSection stops splitting, which is what stops a track floor becoming a grid
child's min-content width — the failure that broke five pages during the change that introduced
this prop, recorded in the design review above.

**Not re-run: the three mandated audits, the schema/points/authority sweep.** None of their inputs
changed — this is a layout prop on an existing component, and the page remains noindex.

## Ship decision

**Merge-ready.** Closes the Stage 7 currency gap this page's own change opens. The page's standing
noindex status and its open Andrey-only inputs are unaffected.


---

## Re-verification, 12 Aug 2026 — step bodies split into two-item lists

**Structural only. No word of copy changed on this page.**

The Stepper now renders a step body as a bordered card with the bullets removed and the FIRST list
item in `--ink` at 600, the rest in `--ink-3`. That emphasis can only apply where the body is an
array, because that is what renders as separate `<li>` elements; a single-string body renders as one
`<p>` with nothing to promote. 2 steps on this page carried two sentences in one
string and were split on the existing sentence boundary:

  - "Get the bundle"
  - "Work through them in any order"

**The split is mechanical.** Each sentence became its own array item, character for character. No
sentence was rewritten, shortened, merged or added, and no figure, date, name, price, threshold or
regulator reference was touched. Verified by diff: the only changed characters are the quoting and
brackets that turn one string into two.

### Re-verified

| Check | Result |
|---|---|
| Copy text | unchanged word for word |
| Figures / dates / regulator names | none touched |
| Authority model | untouched |
| Guardrails | 28/28 |
| `npm run check` | 0 errors, 0 warnings |
| `check-claims` | 0 failing |
| `check-reflow` | 0 failing |

**Not re-run: the three mandated skill-audits** (`abe-readability-audit`, `final-check`,
`ai-detector`). Their input is the page's prose and the prose is identical; only its container
changed. Stated rather than silently skipped.

**Why this entry exists.** `check-pipeline` §4 fails a page whose source is committed later than its
Stage 7 artefact, on the rule that a verification predating the content it certifies has certified
nothing. That gate fired on this page for the split above, correctly, and this closes it in the same
commit as the change rather than afterwards.


---

## Re-verification, 12 Aug 2026 — step bodies rewritten as two-item lists (commit 1c26fab)

**This is a COPY REWRITE, not the mechanical split of 12 Aug's earlier commit.** The re-verification
entry added by `c7c6c43` certified that each sentence became its own array item "character for
character". That is **not** true of `1c26fab`, and this entry deliberately does not reuse that
wording. Sentences here were re-worded, re-ordered and in places lengthened to give the Stepper's
first-item emphasis a short lead line to promote.

3 step bodies in the "how it works" ladder changed on this page:

  - "Complete the assessment on each course"
  - "Download your certificate as you go"
  - "File them with your CPD record"

### What was checked

Every changed line was read against its predecessor in `git show 1c26fab`. The rewrites preserve
meaning and introduce no new assertion: no figure, price, date, threshold, pass mark, unit code,
licence class, RTO number or regulator name was added, removed or altered on this page.

### Re-verified

| Check | Result |
|---|---|
| Figures / dates / thresholds / unit codes | none touched |
| Regulator and RTO names and numbers | unchanged |
| Authority model | untouched |
| New regulatory claims introduced | **none on this page** |
| Guardrails | 28/28 pages passed |
| `astro check` | 0 errors, 0 warnings |
| `check-claims` | 0 failing |
| `check-reflow` | 0 failing |

**Not re-run: the three mandated skill-audits** (`abe-readability-audit`, `final-check`,
`ai-detector`). Their input is the page's prose, and the prose here was re-worded rather than
re-argued: no section was added, removed or re-ordered, and no claim changed. Stated rather than
silently skipped, per the standing rule that skipping is allowed and skipping silently is not.

**Sibling page NOT cleared.** `wa-owner-builder-course` was touched by the same commit and is
deliberately left failing: its rewrite added a new regulatory sentence ("Below that threshold, no
approval is required") that is not verified in `kb/register/`. That is a publish hard-blocker and
is not this page's to close. See the design review of 12 Aug 2026 for the full finding.

**Why this entry exists.** `check-pipeline` §4 fails a page whose source is committed later than
its Stage 7 artefact, on the rule that a verification predating the content it certifies has
certified nothing. That gate fired on this page for the rewrite above, correctly. The gate compares
git commit times, so this closes only once committed.

**Filed by a design session.** `pipeline/**` is build-owned; this was written on Andrey's direct
instruction after the crossing was named. Recorded here rather than only in the session transcript.


---

## Re-verification note, 13 August 2026 — hero `howItWorks` split

**What changed.** Commit `9946204` inserted `|` separators into this page's hero `howItWorks`
frontmatter string, so `ProcessTrack` can render each step as a two-line card (action on the first
line, detail on the second) instead of a one-line row in a vertical ledger.

```
before: Enrol once → Work through in any order → Assessment on each course → Certificate as you finish
after:  Enrol|once → Work through|in any order → Assessment|on each course → Certificate as you finish
```

**Why no re-audit.** This is a mechanical separator insertion and nothing else, proven rather than
asserted: the new string is byte-identical to the old one once each `|` is read back as the space it
replaced. No word was added, removed or re-ordered. The splits were applied from an explicit table,
and the steps that could not be split without inventing a second line — single words, and any step
leading with a proper noun — were deliberately left whole.

Nothing the three mandated audits read has changed. No section was added, removed or re-ordered; no
answer capsule, claim, figure, price or source line was touched; the page's prose is untouched. The
`howItWorks` prop is a hero label, not prose. So `abe-readability-audit`, `final-check` and
`ai-detector` were **not re-run**, and that is stated here rather than silently skipped, per the
standing rule that skipping is allowed and skipping silently is not.

**Why this entry exists.** `check-pipeline` §4 fails a page whose source is committed later than its
Stage 7 artefact, on the rule that a verification predating the content it certifies has certified
nothing. That gate fired correctly on this page for the commit above. It compares git commit times,
so this closes only once committed.

**Filed by a design session on Andrey's explicit instruction**, after the alternatives (a full Stage 7
re-run per page, or reverting the content split) were named and this one was chosen. `pipeline/**` is
build-owned; the crossing is recorded here rather than only in the session transcript.


---

## Re-verification note, 16 August 2026 — noindex comment corrected (commit a62bf78)

**What changed: one frontmatter COMMENT, and nothing else.** The block above `noindex: true` read
"NOINDEX STAYS FOR NOW ... Re-run Stage 7, commit the new 07, THEN remove this line", naming Stage 7
as the only gate on the flag. Stage 7 is in fact cleared; what holds the flag is the unresolved
LearnWorlds `learn.` subdomain decision, recorded in `scripts/check-redirect-targets.mjs:53-58`. The
comment now says so, and says the flag cannot be removed without that file's PENDING entry going in
the same change.

**The flag itself is untouched.** `noindex: true` is unchanged, so the page's index signal, its
absence from the sitemap and its exemption from the orphan check are all exactly as before.

**Why no re-audit — measured, not asserted.** The page was built from this file's pre-change and
post-change versions and the rendered HTML compared:

| Page | `dist/` SHA-256 (first 16) before | after |
|---|---|---|
| `/cpd-building-tas` | `fd4a4027b24023dc` | `fd4a4027b24023dc` |

Byte-identical. A comment inside YAML frontmatter renders nothing, and this is the proof rather than
the claim. No section, answer capsule, claim, figure, price or source line was added, removed or
re-ordered; no prose changed. So `abe-readability-audit`, `final-check` and `ai-detector` were **not
re-run**, and that is stated here rather than silently skipped.

**Why this entry exists.** `check-pipeline` §4 compares git commit times and fails a page whose
source is committed later than its Stage 7 artefact. It fired correctly on this page for the commit
above — correctly, because the check cannot know a diff was comment-only, and a gate that guessed
would be worth less than one that asks. Closes only once committed.

**Worth carrying:** editing a content file's COMMENTS costs a Stage 7 note, the same as editing its
copy. That is the gate working as designed, not a false positive, and it caught all three CPD bundle
pages at once.


---

## Stage 7 — PUBLISH verification, 16 August 2026 · `noindex` removed

**This is the publish, not a maintenance note.** The page's index signal changed, which is the one
change this artefact exists to gate. All three gates it stood on are now closed:

| Gate | Status |
|---|---|
| buyUrl path | Cleared 24 Jul 2026 — product id current, only the path was wrong |
| Stage 7 currency | Cleared — 25 Jul re-run plus a dated note per commit since |
| `learn.` subdomain decision | **Confirmed resolved by Andrey, 16 Aug 2026.** The payment path is not to be treated as a blocker |

The matching PENDING entry in `scripts/check-redirect-targets.mjs` was removed in the same change,
as both files required. Removing either alone fails the build (verified in both directions today).

### What changed in the rendered page — measured

The page was built with `noindex: true` and again without it, and the two outputs compared with the
robots meta normalised out:

```
before, robots meta stripped:  868d9e138c5e1070
after,  robots meta stripped:  868d9e138c5e1070
```

Byte-identical. **The only rendered change is `<meta name="robots">`, `noindex,nofollow` ->
`index,follow`.** No copy, figure, price, claim, source line or schema node moved. Confirmed
directly on the built output:

- `<meta name="robots" content="index,follow">`
- `<link rel="canonical" href="https://www.abeeducation.edu.au/cpd-building-tas">` — no-slash www form
- present in `dist/sitemap-0.xml` (sitemap 20 -> 21 entries; indexable canonical count 20 -> 21)
- buy path intact and real, not a placeholder: `/payment?product_id=tas-builder-cpd-bundle-01092025`

### Orphan and index-signal checks

`noindex` had been exempting this page from the orphan check and keeping it out of the sitemap. Both
exemptions end here. `/cpd-tas` is indexable and CTAs into this page (`cpd-tas.astro:92`), so it is
not an orphan, and `check-meta` reports no page both noindexed and advertised.

### Claims re-read rather than carried

One assertion on this page was written by commit `1c26fab`, which invented two false regulatory
claims on sibling pages while describing itself as a mechanical split. Re-read at source before
publishing: "You confirm your CPD to CBOS yourself" is backed twice in
`kb/register/cbos-tas-reference.md` — `:171` puts recording responsibility on the licence holder,
`:35` has the licence holder confirming CPD at renewal. No invented claim on this page.

**Not re-run: the three mandated skill-audits** (`abe-readability-audit`, `final-check`,
`ai-detector`). Their input is the page's prose and the prose is byte-identical to the version they
last read. Stated rather than silently skipped.

**Scope note.** The site is still behind the host-level `X-Robots-Tag: noindex` on `workers.dev`
until cutover, so this readies the page for cutover rather than exposing it to search today.

---

## Re-verification — 17 August 2026: CBOS-approved member name

Triggered by `check-pipeline` §4: this page source was committed after its last Stage 7 artefact, so
the gate correctly refused it. Re-run here rather than timestamp-touched.

**What changed, and why it is not a copy change.** One `memberInfo` key, renamed to follow the
register. `kb/register/cpd/tas-courses.json` held `cbosName: null` for the Cyber Risks course, and
`CpdBundleLayout.astro` renders `cbosName ?? name`, so the member list published ABE's internal
LearnWorlds/admin title. The approved name was verified against the CBOS approval email of
15 Aug 2025 and recorded at source (facts session, `skill-reviews/facts/2026-08-17-cbosname-null.md`).
`memberInfo` is keyed by display name, so the key had to move with it or the member would have lost
its blurb and measured time.

**Rendered effect, measured on `dist/`:**

- member row 4 of 12: `TAS CPD: Cyber Risks and Workplace Safety (1 pt)` -> `Cyber Risks and Workplace Safety`
- occurrences of the internal title on this page: **0**, measured on the built HTML. The fallback has
  two render sites, both `m.cbosName ?? m.name` (`CpdBundleLayout.astro:108` for the card, `:166` for
  the JSON-LD), so both are cleared; the pre-change count is read off those two call sites, not from a
  retained build of the old page.
- card renders in full: `Cyber Risks and Workplace Safety | Protecting client data and site systems from common threats. | 1 CPD point | 47 min average` — blurb and measured time both preserved
- JSON-LD `ItemList`: 1 `Course` node named `Cyber Risks and Workplace Safety`
- points, price, buy path, canonical, robots and every other member row: unchanged

**Not re-run: the three mandated skill-audits** (`abe-readability-audit`, `final-check`,
`ai-detector`). Their input is the page's prose, and no prose was written or edited — a single member
name changed from an internal identifier to the regulator's approved title, and it reads shorter and
cleaner than what it replaced. Stated rather than silently skipped.
