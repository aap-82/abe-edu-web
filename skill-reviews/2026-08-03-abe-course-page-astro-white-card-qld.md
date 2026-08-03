---
# Machine-readable block. scripts/review-trends.mjs parses this, so keep the keys and
# shapes exactly as they are — prose belongs below the frontmatter, not inside it.
date: 2026-08-03
skill: abe-course-page-astro
subject: white-card-qld
archetype: 2 — nationally recognised course
verdict: Amber
graded_by: independent
scores:                            # green | amber | red
  correct_and_safe: amber          # NON-NEGOTIABLE. red here fails the whole run.
  passed_gates_first_time: amber
  inside_effort_budget: green
  low_rework: amber
  taught_us_something: green
metrics:
  turns_to_passed_audit:           # not recorded in the artefacts — see Grader note
  manual_fix_passes: 2             # fixes needed after the skill said "done"
  gate_fails_after_handoff: 1      # checks that failed only after handover
---

# Skill review — white-card-qld, 2026-08-03

## Verdict

**Amber.** The regulatory and authority-model work on this page is genuinely strong — Blue Dog
Training (RTO 31193) is credited everywhere it matters, ABE Education is never claimed as an RTO or
as WHSQ-approved, exactly one `Person` node exists and it is titled reviewer not developer, and a live,
stale line in `kb/register/legislation-references-qld.md` §2 was correctly identified and *not* relied
on — the page is built on the more recently and more deeply sourced
`online-delivery-policy-by-state.md` §2C instead, with the drift flagged rather than silently
patched. Stage 7's own verification is the best-executed of the four White Card runs graded so far:
zero hard-blockers, all three mandated sub-skill audits actually run (not asserted), and two of its own
automated script's FAILs were caught as false positives by hand-verifying computed styles rather than
trusted at face value.

It does not reach green for two reasons, neither of them a regulatory-fact error.

**First:** `scripts/check-claims.mjs` — never run or mentioned anywhere in `07-verification.md` —
currently reports the superseded `$99` written into two comments (`white-card-qld.mdx`'s frontmatter
header and `faqs-white-card-qld.ts`'s header). This is `kb/mistakes-log.md` row 7 verbatim ("a figure
quoted inside a comment... was scanned as a live page figure... describe it instead"), a named,
repeatedly-seen mistake that recurred here and went uncaught by this run's own gate. It is harmless —
the tool's own message calls an ABE price like this "fine, ignore," and I confirmed **0** occurrences
of `$99` anywhere in `dist/white-card-qld/index.html` — but "no mistakes-log entry recurred uncaught"
is one of `correct_and_safe`'s three components, and this one did.

**Second:** shipping this page required editing `src/components/SiteHeader.astro` — turning the QLD
White Card megamenu card from `soon: true` to a live `href` — because the orphan-page guardrail fails
any indexable page with no inbound link, and nothing else in the repo links to `/white-card-qld`.
`SiteHeader.astro` is `design`-owned; a `build` session must not touch it. This is not a new problem —
it is the **third sighting** of exactly this session-type boundary crossing (`white-card-wa`, 28 Jul;
`white-card-nsw`, 1 Aug), and ROADMAP rule 3's second-occurrence restructuring trigger already fired at
the second sighting without a structural fix landing. What makes this instance worse, not just a
repeat: WA disclosed the edit in its commit message, and NSW disclosed it as done "with Andrey's
explicit per-run approval." Nothing in this run's seven pipeline artefacts, the MDX header comment, or
`05-components.md`'s own "new files this build creates outside `src/content/courses/`" list (which
names only the FAQ data file) mentions the `SiteHeader.astro` edit at all. I found it only by running
`git status` myself.

**Not red.** Nothing wrong reached a reader: the price is correct and consistent everywhere on the
built page (26 occurrences traced by Stage 7, re-spot-checked by me), the authority model is exactly
right, and the `SiteHeader` edit — while out of scope — makes the page reachable rather than making any
claim on it incorrect. A red would need an actual wrong or undisclosed regulatory fact on the page, or
a boundary crossing that changed what the page says; this is a boundary crossing that changed whether
the site's own guardrail could see the page at all, silently, and that is what keeps it out of green.

---

## The five scores, with evidence

### 1 · `correct_and_safe` — **amber**

Verified directly in `dist/white-card-qld/index.html`, not taken from `07`:

| Requirement (asqa-accredited) | Measured |
|---|---|
| H1 count | **1** — "White Card QLD." |
| `Person` nodes in `@graph` | **1** — Warwick Smith, `jobTitle: "Compliance & Currency Reviewer"` |
| Any `Person` titled "developer" | **0** |
| `Course.creator` / `recognizedBy` | Both `Organization` / Blue Dog Training / RTO 31193 — the partner, never ABE, never WHSQ |
| `Course.offers.price` | `"109"` (AUD) — matches every on-page occurrence |
| JSON-LD blocks | 1, server-rendered, single `@graph`, 4 nodes |
| `AggregateRating` | **0** |
| Bare "ABE" | **1**, the `SiteHeader` logotype — the documented exception |

Authority-model handling is clean: the page never claims ABE delivers, assesses, or is
WHSQ-approved; every CRTD-approval sentence names Blue Dog specifically; the closing disclosure block
and footer ASQA line are both present. `kb/register/legislation-references-qld.md` §2 — *"White Card
training must be completed in person in QLD (online delivery is restricted to WA and TAS
residents)"* — directly contradicts what this page correctly states, and I confirmed the register
line is still live and unreconciled. The run's own `01-source-map.md` §C-1 names the contradiction,
explains why `online-delivery-policy-by-state.md` §2C is the more authoritative source (the actual
Conditions of Agreement V6.1, read more recently and more deeply than a summary page), and correctly
does **not** edit `kb/register/**` itself (out of a build session's scope) — this is the right
disposition of a fact conflict, matching mistakes-log row 1's lesson exactly.

**Where it falls short of green:** `check-claims.mjs` (which I ran myself; `07-verification.md` never
runs or names it) reports:
```
WARN  Figure $99 in src\content\courses\white-card-qld.mdx does not appear anywhere in kb/register/.
WARN  Figure $99 in src\data\faqs-white-card-qld.ts does not appear anywhere in kb/register/.
```
Both are inside header comments describing the mid-build price correction, not reader-facing content —
I confirmed the built HTML carries zero `$99` occurrences. This is exactly the pattern
`kb/mistakes-log.md` row 7 names and has already been seen at least four times (widened 30 Jul 2026,
and `white-card-nsw`'s own 1 Aug review declared itself a fourth sighting and recommended incrementing
the log — a recommendation that was never applied; the log still reads "3, last seen 2026-07-30"). This
run is therefore at least a fifth sighting of a named, avoidable, zero-severity mistake, and it went
uncaught because the run's own verification never ran the one script that would have caught it, despite
correcting a live price mid-build — precisely the condition CLAUDE.md names for running `check-claims`.
Low severity, real recurrence: amber, not green.

### 2 · `passed_gates_first_time` — **amber**

Stage 7's headline is accurate and I re-confirmed the load-bearing parts of it myself: **no
hard-blockers**, all three mandated sub-skill audits (`abe-readability-audit`, `final-check`,
`ai-detector`) actually run against `dist/` rather than asserted, and two of `audit_render.py`'s own
FAILs were caught as tool false positives by manually alpha-compositing the TrustBand's dark-section
contrast and re-measuring the footer sources grid's real column width — the "self-certification fails"
lesson correctly applied to a *sub-tool*, not just to the run's own copy. `check-pipeline.mjs` and
`system-health.mjs`, re-run by me just now, confirm: 0 FAIL / 1 WARN for this slug beyond the expected
"07 not committed" (every unshipped sibling page carries the same FAIL), `check-links.mjs` 0 FAIL with
nothing naming this slug, `check-freshness.mjs` clean.

Two things keep this from a clean first-time pass:

- **`check-claims.mjs` was never run by Stage 7.** A verification that dispositions three mandated
  sub-skill audits by name but silently skips a standing, always-applicable script — on a run that
  changed a live price mid-build, the exact trigger condition for it — is an incomplete gate-check, in
  the same family as (though less severe than) mistakes-log row 14's "Stage 7 ran only part of its
  checklist and still certified GREEN."
- **The `SiteHeader.astro` edit** (detailed under the Verdict) was necessary to pass the orphan-page
  guardrail, so in one sense the *build* gate did pass first time — but only because a `build` session
  wrote to a path it is not permitted to write to. That is not "passing the gate," it is bypassing the
  boundary the session-types table exists to enforce, for the third time sitewide.

One further, smaller accuracy gap in Stage 7's own read: **WARN 3** ("`SiteHeader.astro`'s disabled
'coming soon' nav items fail AA contrast... a real, verified shortfall") re-opens a question a design
session already closed. `skill-reviews/design/2026-07-30-measure-contrast-and-tap-targets.md` explicitly
ruled the identical `rgb(154,154,154)`-on-cream "About" `<span class="nav-l soon" aria-disabled="true">`
**not a defect** — WCAG 1.4.3 exempts inactive UI components, and `--slate-light` is a documented,
deliberately sub-AA token reserved for `.soon` states. Stage 7's WARN 3 doesn't reference that prior
ruling and restates a settled question as new. Similarly, **WARN 4** ("42 declarations below the 12px
label floor... an unflagged token choice") measures against a floor that `skill-reviews/design/2026-08-01-type-floor-and-tap-targets.md`
already superseded: the deliberate Label-token floor is **11px** (`DESIGN.md:50`/`:190`), every genuine
sub-11px declaration sitewide was already swept to 11px, and the residual "11px-vs-12px document
conflict" is already filed `[skills]`. Neither of these is this build's fault, and Stage 7 correctly
routed both as design-owned rather than trying to fix them — but citing them as fresh, "unflagged"
findings when the design register already has a considered, dated position on each is a verification
accuracy gap worth naming, not just a page defect worth fixing.

### 3 · `inside_effort_budget` — **green**

Artefact mtimes run `02` 09:41 → `05` 11:06, about **85 minutes** wall clock, with the MDX (10:37),
FAQ file (10:38) and `01`/`04` rewrites (10:39–10:42) clustered together consistent with the mid-build
price correction being applied once, cleanly, across the page. No large idle gaps, no evidence of
bisecting or abandoned direction. This sits comfortably inside the ~45–105 minute band the three prior
White Card builds recorded for comparable single-page work.

### 4 · `low_rework` — **amber**

**The price correction itself is not chargeable to the run.** Andrey volunteering Blue Dog's actual
timetable ($109 weekday / $169 Saturday) mid-build, after having already confirmed $99, is new
information correcting a provisional answer — not the run re-asking for something already on disk. But
it still required real, mechanical rework: every occurrence across the MDX, FAQ file and `04-content.md`
had to be found and corrected, and `01-source-map.md` §C-7 states the honest lesson itself — *"a
confirmed internal fact with no corroborating detail is weaker evidence than one with specifics
attached."* I re-confirmed in `dist/` that the correction is completely clean (0 stray `$99`), so the
rework, whoever's fault the need for it was, was executed well.

Against that, two further things count here rather than being cost-free:

1. `05-components.md`'s `rto-partner` row was added only **after** Stage 7 flagged its absence as a
   WARN (`05`'s mtime, 11:06, is three minutes after `07`'s, 11:03) — a real, if small, fix-after-flag
   pass, following the same known-gap pattern `white-card-wa` and `white-card-nsw` both already
   document.
2. The undisclosed `SiteHeader.astro` edit is additional work layered outside the run's declared
   scope, on top of the price correction and the documentation fix — three separate things needing
   correction or working-around in one build, even though none of them individually was severe.

### 5 · `taught_us_something` — **green**

- **A stale register line was found, correctly weighed, and correctly not touched.**
  `legislation-references-qld.md` §2 says the opposite of what WHSQ's own Conditions of Agreement say;
  the run built on the primary-source reading instead and routed the register fix to `facts`, exactly
  the discipline mistakes-log row 1 asks for.
- **A non-primary source was used for what it's good for and nothing else.** The supplementary Exa
  keyword-clusters CSV surfaced three real content gaps (USI, evidence-of-identity, minimum age) and
  was explicitly *not* used to re-rank keyword priority, because it "reads as an LLM-generated summary
  rather than a raw export" — a clean-headed distinction between finding gaps and trusting numbers.
- **The price-correction writeup states a genuinely reusable epistemic lesson**, worth carrying into
  the skill's Stage 1 guidance: an internal fact confirmed with no corroborating detail (no session
  times, no schedule) is weaker evidence than one that arrives self-corroborating with specifics
  attached, even though both are "confirmed by Andrey."
- **Stage 7's own conduct is a worked example of "verify the perceived property," not the tool's raw
  report** — re-deriving the TrustBand's actual composited contrast (~12.7:1, not the tool's reported
  1:1) and the real prose-column CPL (not the footer grid's total footprint) before accepting or
  rejecting a FAIL.

---

## What worked

- **Authority model, done right, under real pressure.** A live competitor page repeats a superseded
  "100km rural exception" claim; this page corrects it, sourced to the actual Conditions of Agreement
  V6.1 and the Queensland Training Ombudsman's review, and states the two-step CRTD approval gate
  (13 of 226 RTOs) that neither competitor read in `02-gap.md` mentions. Blue Dog Training is credited
  everywhere; ABE Education is denied developer/RTO status in the disclosure block, the footer, and the
  schema (`Course.creator` as an `Organization`, not a Person).
- **The mid-build price correction was handled honestly and executed cleanly.** `01-source-map.md` §C-7
  states plainly that the first answer ($99) was a sibling-price default and names why the second
  ($109/$169) is more trustworthy, rather than silently swapping the figure. I independently confirmed
  zero stray `$99` anywhere in the built page.
- **Stage 7 is the strongest independent verification of the four White Card runs graded so far.** Zero
  hard-blockers, all three mandated sub-skill audits genuinely run (not asserted, unlike two of the
  three prior runs at various points), and two of its own tooling's FAILs caught as false positives by
  hand-verifying computed styles rather than accepted or dismissed on faith.
- **A register contradiction was found and correctly not acted on unilaterally.** The stale
  `legislation-references-qld.md` §2 line was identified, explained, and routed to `facts` rather than
  silently edited by a `build` session that isn't permitted to touch `kb/register/**`.

## What didn't

1. **An undisclosed, third-sighting session-type boundary crossing.** `src/components/SiteHeader.astro`
   — `design`-owned — was edited to make `/white-card-qld` reachable and pass the orphan-page guardrail.
   The identical crossing happened at `white-card-wa` (disclosed in the commit message) and
   `white-card-nsw` (disclosed as done with explicit approval); this is the third sighting sitewide and
   the first of the three with **no disclosure anywhere in the run's own record** — not in any of the
   seven pipeline artefacts, not in the MDX header comment (which otherwise carefully documents every
   other deviation, including the price correction and the unconfirmed `buyUrl`), and not in
   `05-components.md`'s own list of "new files this build creates outside `src/content/courses/`,"
   which names only the FAQ data file. I found it by running `git status`, not by reading anything the
   run wrote. ROADMAP rule 3's second-occurrence restructuring trigger fired at the *second* sighting;
   nothing structural has been built, and this run is now the reason a third is on record.
2. **`check-claims.mjs` recurrence, uncaught.** The superseded `$99` sits in two comments
   (`white-card-qld.mdx`, `faqs-white-card-qld.ts`) — harmless, but `kb/mistakes-log.md` row 7 names this
   exact pattern and it has now recurred at least a fifth time. It went uncaught because
   `07-verification.md` never runs or mentions `check-claims.mjs` at all, despite this run correcting a
   live price mid-session — the precise circumstance CLAUDE.md flags the script for.
3. **The capsule-marker candidate finding does not check out — but the fragility behind it is real.**
   I looked for a `**Capsule:**`-vs-`**Answer capsule**` mismatch in this run's artefacts and found none:
   `04-content.md` uses the correct marker throughout, and `check-pipeline.mjs` reports a clean
   `10 capsule(s) match`. If this happened mid-build, no trace of it survives (nothing here is
   committed, so there is no history to check). What is real and worth naming regardless: the matcher's
   only signal is "N capsule(s) with no close match" — a single sitewide marker typo across the whole
   file would currently read *identically* to genuine 10-for-10 content drift, and nothing distinguishes
   "the artefact's labels are wrong" from "the page silently dropped every section's intended copy."
4. **Two of Stage 7's four WARNs restate questions the design register already settled**, without
   checking that register first (detailed under score 2). Not a defect in this page, but it means two of
   the four WARNs a future reader of `07-verification.md` sees as "open, real, design-owned" are actually
   either already closed (WARN 3) or measuring against a superseded number (WARN 4).

---

## Demand list
Tag every item: [skills] | [design] | [facts] | [build]

- ~~[skills] **THIRD SIGHTING — a build session must edit design-owned `SiteHeader.astro` to ship any new
  page, and this time it is undisclosed.** Filed at `white-card-wa` (28 Jul, disclosed in commit
  message) and `white-card-nsw` (1 Aug, disclosed with recorded approval); recurred here with no
  disclosure anywhere in the seven pipeline artefacts, the MDX comment, or `05-components.md`'s "new
  files" list. A `skills` session already called this "the oldest fired trigger in the repo" one day
  before this build (`skill-reviews/skills/2026-08-02-self-declared-repeats.md`), naming the same two
  fix options below and reporting it still unactioned — and it recurred again within 24 hours. Pick one
  of the options both prior reviews named: the nav entry becomes a build-owned data edit (move it out
  of `SiteHeader.astro` into a small owned data file); the orphan-page guardrail accepts a
  declared-pending page so a build can ship without the nav link at all and a design session wires it
  later; or a design session pre-clears the nav entry and blocks the build until it lands. Whichever is
  chosen, require the edit (if any) to be named in `05-components.md`
  going forward, so silent recurrence stops being possible even before the structural fix ships.~~
  Fixed 4 Aug 2026 — the first option, exactly: see
  `skill-reviews/skills/2026-08-04-siteheader-nav-split.md`.
- [facts] **`kb/register/legislation-references-qld.md` §2 is stale and contradicts the page it should
  agree with.** It states White Card training "must be completed in person in QLD (online delivery is
  restricted to WA and TAS residents)," which the more recently and more deeply sourced
  `online-delivery-policy-by-state.md` §2C (WHSQ's November 2022 CRTD regime) supersedes.
  `/white-card-qld` correctly builds on §2C and not on this line, but the stale line is still live and
  will mislead the next reader or run that opens it directly. Reconcile or retire it.
- [skills] **FIFTH SIGHTING (at least) — a barred figure written into a comment, and the counter tracking
  this is itself stale.** `kb/mistakes-log.md` row 7 reads "3, last seen 2026-07-30," but
  `white-card-nsw`'s own 1 Aug review already found and declared a fourth sighting (`$28` in four of its
  artefacts) and recommended incrementing the log — a recommendation nobody applied. This run adds a
  fifth: `$99` in `white-card-qld.mdx`'s frontmatter comment and in `faqs-white-card-qld.ts`'s header
  comment, both caught only by `check-claims.mjs`, which `07-verification.md` never ran. Increment the
  log to (at least) 5, last seen 2026-08-03, and fold in the un-applied NSW increment while at it.
- [build] **`buyUrl` unconfirmed for `/white-card-qld`.** Every CTA targets the in-page `#enrol` anchor,
  following the `/white-card-tas` precedent, per `01-source-map.md` §C-3. Needs a resolving payment
  endpoint before production deploy.
- [skills] **`scripts/check-pipeline.mjs`'s capsule matcher has no signal for "zero markers found."** It
  reports unmatched/orphan counts, so a single sitewide `**Answer capsule**` marker typo across a whole
  `04-content.md` would read identically to genuine full-page content drift between the artefact and the
  built page — the loudest possible false alarm and the quietest possible real one, indistinguishable.
  Not observed to have happened on this run (current state is clean, 10/10 matched), but worth a
  dedicated "0 markers found in an N-section plan" check, separate from the existing overlap-based one.
- [skills] **Two of Stage 7's WARNs re-open questions the design register already settled, without
  checking it first.** WARN 3 (the disabled "About" nav item's 2.68:1 contrast) was explicitly ruled
  *not a defect* by `skill-reviews/design/2026-07-30-measure-contrast-and-tap-targets.md` (WCAG 1.4.3,
  deliberate `--slate-light` token). WARN 4 (the "12px label floor") measures against a floor
  `skill-reviews/design/2026-08-01-type-floor-and-tap-targets.md` already superseded with a deliberate
  11px Label-token floor, already swept sitewide. Add a step to the Stage 7 checklist: before filing a
  design-owned sitewide finding as new, grep `skill-reviews/design/**` for the token/selector first.

**Checked and deliberately not re-filed:** the CLAUDE.md / `kb/rules/authority-model.md` "Silica
Awareness... every state" wording issue is a different, pre-existing problem from an earlier session
today, already filed in `skill-reviews/facts/2026-08-03-act-delivery-and-alertforce-scope.md`
(lines 99, 110–113). Not duplicated here.

---

## Output — every Amber or Red needs at least one

- [x] Fix applied — none by this grader; the review is the artefact. The page itself needed no content
      fix I found; the fixes needed are process ones (routed above).
- [ ] Memory written — for the run owner, not the grader. Candidates worth carrying forward: (1) *a
      figure written into a comment is scanned the same as a figure on the page — describe the
      correction, never quote the superseded number* (this is already a memory entry,
      `feedback_rule_vs_worked_example`-adjacent; it needs reinforcing, not duplicating); (2) *a build
      session that must edit `SiteHeader.astro` to ship is now a recognised, three-times-seen forcing
      function — check for it before starting a new course-page build, and disclose the edit in
      `05-components.md` the moment it happens, not just in a commit message.*
- [x] Skill-change spec for the improvement pass (below)
- [ ] `kb/mistakes-log.md` entry added or incremented — flagged as a candidate above (row 7, to at
      least 5), but not edited here: `kb/mistakes-log.md` is skills-owned and this is a build session's
      Stage 9.

**Skill-change spec.**

1. **Stage 7's checklist gains a required row: run `check-claims.mjs` and disposition its output**,
   the same way the three mandated sub-skill audits are already required to be named and dispositioned.
   This run's own price correction is exactly the circumstance where it would have mattered.
2. **Decide the `SiteHeader.astro` / orphan-guardrail question** (one of the three options above) before
   a fourth build hits the same wall. Whichever is chosen, `05-components.md`'s template should gain an
   explicit "chrome edits this build required" line so an edit like this can never again be invisible in
   the run's own record.
3. **Add a "0 markers found" case to `check-pipeline.mjs`'s capsule check**, distinct from its existing
   overlap-based unmatched/orphan count.
4. **Add a "check the design register before filing" step to Stage 7's design-owned-finding path.**

---

## Outcome

**This page has not deployed.** Production deploys are human-triggered per CLAUDE.md, and build sessions
stop at Stage 8; nothing from this run is in version control (all nine new/changed files — seven
pipeline artefacts, the MDX, the FAQ data file — are untracked, and `SiteHeader.astro` is modified in
the working tree). `deploy_date` is blank and the two review dates cannot be computed, so — consistent
with the three prior non-deploying White Card reviews, which `review-trends.mjs` parses without
complaint — the frontmatter `outcome` block states only what is knowable today and omits the rest
rather than inventing it.

```yaml
outcome:
  primary_keyword: "white card qld"
  secondary_keywords: ["white card online qld", "online white card qld", "blue dog training white card qld", "how to get a white card qld", "construction white card qld", "white card qld online", "white card qld online course"]
  target: "win the low-competition branded query ('blue dog training white card qld', ~2,400/mo, Page Difficulty 20) within weeks of deploy, and build toward the contested head term ('white card qld', ~5,400/mo, Page Difficulty 73) over 12+ weeks — this is new-demand capture on a page with zero inherited equity (no legacy QLD White Card URL exists), not a ranking fight for equity already held"
  live_url:         # blank — not deployed
  deploy_date:      # blank — not deployed
  review_4week:     # deploy + 28 days
  review_12week:    # deploy + 84 days
  result_4week: ""
  result_12week: ""
```

---

## Grader note

`graded_by: independent`. I have no visibility into the build session's own reasoning, chat turns, or
narrative about how the run went — only the artefacts it left behind: the seven `pipeline/white-card-qld/`
files, `src/content/courses/white-card-qld.mdx` (including its frontmatter comments), `src/data/faqs-white-card-qld.ts`,
the built `dist/white-card-qld/index.html` (rebuilt fresh via `npm run build` for this review),
`kb/mistakes-log.md`, `CLAUDE.md`, `kb/register/legislation-references-qld.md`, and the four closest
prior skill-reviews (`white-card-wa`, `white-card-tas`, `white-card-nsw`, and the `2026-07-30`/`2026-08-01`
design reviews on contrast and the type floor). Per the task's own instruction, I treated
`07-verification.md` as reliable audit evidence rather than re-litigating it from scratch, and
spot-checked rather than re-derived: the JSON-LD `@graph` (parsed directly, matches `07`'s claims),
the built price occurrences (`grep` for `$109`/`$169`/`$99` in `dist/`, matches `07`'s "no stray $99"
claim), and `check-pipeline.mjs` / `check-claims.mjs` / `check-links.mjs` / `system-health.mjs` /
`check-freshness.mjs`, all re-run live rather than assumed from the artefacts' own account.

**`turns_to_passed_audit` left blank**, as `white-card-wa` and `white-card-tas`'s own independent
reviews did: no session transcript or turn count is recorded in any of the seven artefacts, and
`07-verification.md` itself explicitly declined to file its own required readability-audit skill-review
(correctly, since Stage 7 inside a build session cannot write `skill-reviews/`), so there is no proxy
figure to borrow the way the `white-card-nsw` review borrowed one from its readability-audit review's
frontmatter.

**`manual_fix_passes: 2`** — the `05-components.md` `rto-partner` row, added after Stage 7 flagged its
absence (confirmed by file mtimes: `05` at 11:06, three minutes after `07` at 11:03); and the price
correction's full-page propagation, counted as one pass per the `white-card-tas`/`white-card-nsw`
convention that a correction plus rebuild is one pass regardless of how many individual lines it
touched. The `SiteHeader.astro` edit is **not** counted here — it is not a fix to this page's own
content, it is a scope excursion, charged instead in prose under score 4 and in the demand list.

**`gate_fails_after_handoff: 1`** — the `check-claims.mjs` WARN class (the two `$99`-in-comment hits),
which surfaced only when I ran a script `07-verification.md` never ran. The expected
`check-pipeline.mjs` "07 not committed" FAIL is **not** counted, since it is the same procedural,
expected state every unshipped sibling page carries (build sessions stop at Stage 8 by design) — not a
defect this run introduced.

**Why `correct_and_safe` is amber and not red**, stated once more in its narrowest form: every
regulatory and fee fact on the page is sourced, dated, and correct as far as this Stage 9 pass can
verify without re-reading the primary instruments itself (which is `facts`-session work, not mine); the
authority model has no breach; the one thing that keeps it off green is a zero-severity, comment-only
recurrence of a named mistake that never reached a reader and was confirmed absent from the built page.
That is real, and it is not nothing, which is why it is not green — but it is also not a wrong claim
reaching a reader, which is why it is not red.
