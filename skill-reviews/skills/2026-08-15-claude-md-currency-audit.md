---
date: 2026-08-15
skill: skills-session
subject: claude-md-currency-audit
verdict: Amber
graded_by: self
---

# Skills review — CLAUDE.md currency audit, and the silica naming reconciliation, 2026-08-15

Self-graded: there is no fresh-subagent skills grader yet (CLAUDE.md session-types rule 10).

## Verdict

**Amber.** The audit did what it was asked to do and the corrections are verified at source. It is
not Green for one reason worth stating plainly: **the audit's own method missed the most consequential
defect in the file it was auditing.** I checked paths, config values, line numbers and CLI flags —
every mechanically checkable claim — and reported 34 of 38 accurate. I did not check CLAUDE.md's
*regulatory prose* against `kb/register/`, which is where a wrong claim actually costs something. The
silica defect was found only because the closing rule sent me to `skill-reviews/` looking for items to
strike, and it was sitting there, filed twelve days earlier, naming CLAUDE.md by name.

A currency audit that checks the file's pointers but not its claims will pass a document that says
ABE resells a course that does not exist.

## Why this, and why now

Invoked as `/plugin` → `claude-md-management:claude-md-improver` at Andrey's request. Pre-flight
`system-health.mjs`: **0 failing, 45 warning, 81 ok**. One of those warnings is the repo's most-repeated
risk, at **nine sightings**:

> A **standing or governance document** described the build and the build moved — `SYSTEM.md`,
> `CLAUDE.md`, `ROADMAP.md`, `DESIGN.md`, `PRODUCT.md`, `SKILL.md` and the skill references

Every finding below is an instance of that row. Three of the first four trace to a **single** event —
the 27 Jul 2026 image migration — whose consequences were never swept out of CLAUDE.md. That is the
useful shape here: the risk is not "documents drift at a steady rate", it is "one change lands and its
ripples sit unswept in three other files until someone reads them".

## What shipped

### Part 1 — CLAUDE.md currency (the audit as scoped)

Scored **81/100 (Grade B)** before changes. Measured, not asserted:

| Claim in CLAUDE.md | Measured reality | Fix |
|---|---|---|
| Images "served from the Cloudflare R2 public bucket" | **2** `r2.dev` refs in `src/`, one a comment. Only live one is the logo SVG. 23 images local in `src/assets/images/` | Section rewritten around `src/lib/images.ts` / basename resolution |
| "QLD/WA are still per-page `.astro` … being migrated" | Migrated in `dd5d4c7`; `[slug]/index.astro` renders the whole `courses` collection | Restated as done; "once the collection is wired" condition marked met |
| "Four owner-builder course pages live … Waves 1-6 are next" | 21 content entries; Waves 1-3 built, W3 exit gate half met 7 Aug | Real inventory + pointer to ROADMAP/system-health as the authority |
| `public/images/` named as a live artefact | Does not exist; `public/` holds 2 files | Removed from the ownership list; noted as gone |
| "three [handovers] currently are" without closure | **Four** | Corrected and all four named |
| "`.claude/` holds `commands/`, `skills/` and `settings*.json` only" | Also `launch.json`, which CLAUDE.md assigns to skills 40 lines earlier | Enumeration corrected; "no hooks" re-verified true |
| "`check-freshness.mjs` runs … via `prebuild`" | `prebuild` runs **3** scripts; a `postbuild` also exists | All four named |

**Verified accurate and left alone** (worth recording, because these are the kind that rot silently and
did not): `astro ^7.0.6`, `trailingSlash: 'never'`, `html_handling: "drop-trailing-slash"`,
`run_worker_first: true`, `--ground:#fbf9f5`, `--maroon:#800000`, all three `demand-split` flags, and
**both cited line numbers** — `check-freshness.mjs:186` is exactly the `process.exit(1)`, and
`check-claims.mjs` §6 is exactly "Company name in full". 33 of 34 referenced paths resolve.

**Compression.** The path-ownership section was five sequential prose derivations of one precedent,
the fifth of which says "the fifth is the one that should stop the counting" and then inverts the
default. Replaced with the operative rule, the test, the deliberately-unassigned list, and a 5-row
table carrying the citation trail. **64 lines → 36**, measured.

**Net file length: 571 → 581 lines (+10).** The compression saved 28; the corrections spent 38.
Density improved; length did not. Recording the real number rather than the flattering one — and
noting that I first wrote "578" here from an estimate, in a review whose whole complaint is that the
audit checked what was easy to check. Measured on the second pass.

### Part 2 — the silica reconciliation (not in the original scope)

An open `[skills]` item from `skill-reviews/facts/2026-08-03-act-delivery-and-alertforce-scope.md`
named CLAUDE.md and `authority-model.md` as both carrying a false product name. Verified against
`kb/register/alertforce-scope.md` (read at source 3 Aug 2026, in a browser, per the SPA note):

- **There is no course called "Silica Awareness."** AlertForce's scope carries **10830NAT, "Course in
  Crystalline Silica Exposure Prevention"**.
- **It is not national.** Delivery notification: **NSW, VIC, QLD, TAS, ACT**. WA, SA, NT absent.
- Asbestos (**11084NAT**) *is* national — confirmed as claimed.
- Whether an absent delivery notification is a hard bar or an administrative gap is **unsettled**, so
  WA/SA/NT are UNVERIFIED and every doc now says to state nothing either way.

The item named **two** files. It was in **six**:

| File | Sites | Owner | Done |
|---|---|---|---|
| `CLAUDE.md` | 1 | skills | ✅ |
| `kb/rules/authority-model.md` | 4 (decision tree ×2, partner wording, the §) | skills | ✅ |
| `kb/rules/asqa-disclosure-framework.md` | 2, incl. **the published disclosure paragraph** | skills | ✅ |
| `.claude/skills/…/seo/page-type-engine.md` | 1 — the availability matrix, ✅ in all five states | skills | ✅ |
| `.claude/skills/…/seo/badge-inventory.md` | 4 | skills | ✅ |
| `kb/register/cbos-tas-reference.md` | 1 (lines 145-147) | **facts** | ❌ re-filed |

**Not a live compliance defect.** Swept `src/`: the only `silica` in live copy is WA module content
about the hazard. No page names the product. This was a rules-doc defect that becomes a compliance
defect the first time a page is built from it — `page-type-engine.md` showed silica available in all
five states, which is exactly the input a build session reads at Stage 1.

**Two claims held apart** rather than one overwriting the other, per the NSW precedent: Andrey's 23 Jul
confirmation is about ABE's *commercial* resell arrangement and stands; the delivery notification is
about AlertForce's *regulatory* entitlement, per RTO per state. A commercial intent to sell nationally
does not create a scope entry. Neither is attributed to the other.

## Disclosed crossing

**One, taken deliberately on Andrey's instruction.** This session is `skills`, whose table forbids
`kb/register/**` outright. `kb/register/cbos-tas-reference.md` was edited anyway, after the crossing
was named, the alternative (leave it for a facts session) was offered and declined, and a third option
(re-verify at source first) was offered and declined. Same shape as the `SiteHeader.astro` nav split of
4 Aug 2026 and the QLD build session's disclosed component edit before it. Recorded here rather than
only in the commit and the chat.

**What made the crossing narrow enough to accept.** The fix deletes rather than corrects. Lines
145-147 were a *second copy* of scope data `kb/register/alertforce-scope.md` owns, which CLAUDE.md
forbids outright ("Never keep a second copy of a figure that `kb/register/` owns"). Replacing the
duplicate with a pointer removes both the stale claim and the dangling cross-reference **without any
figure entering the register**, so session-types rule 4 — no figure without a source read in that
session — is not engaged. A crossing that *corrected* the duplicate would have engaged it, and I would
have had to decline.

I also created the dangling pointer myself, by renaming the `authority-model.md` section that
paragraph cited. Fixing what I broke is a weak argument for crossing a boundary; the no-second-copies
rule is the real one.

Note line 142 of that same file — "CBOS refused approval for ABE's Silica Awareness Course" — is
**correct and was not changed**. That is ABE's own CBOS submission name, a different thing from
AlertForce's product. §9 below is built to allow it.

## §9, and proving it fails

`check-claims.mjs` §9 now reconciles regulatory claims against `kb/register/`, in both directions:

- **9a** — a retired product name asserted as current, anywhere in `CLAUDE.md`, `kb/`, `src/`,
  `new site/` or `.claude/skills/`.
- **9b** — an accredited `NNNNNAT` course code with no entry in `kb/register/`. A code absent from the
  register is a code nobody has read at source: the NSW Owner Builder failure as a gate.

**A green check proves nothing on a repo you just fixed**, so it was run against the broken tree:

| Test | Setup | Result |
|---|---|---|
| 9a catches the real defect | restored `authority-model.md` from `c596365` (pre-fix) | **FAIL, 6 sites** — 24, 38, 133, 134, 207, + |
| 9b catches an unread code | appended `99999NAT` to a rules doc | **FAIL, 1 site** |
| 9b allows a banned code | same code, line marked "superseded" | **OK** — no false positive |
| Clean tree | restored | **OK**, 183 files scanned, 0 failing |

**Three false-positive causes were found and fixed by measurement, not foresight.** The first
line-level implementation produced 6 hits and **all 6 were wrong** — the negating phrase sat on the
previous line, because this repo's prose wraps at ~100 chars while §5's subject happens to appear in
short data-ish lines. Widening to a 3-line window left 3. One of those survived because the negating
phrase was *itself* split by the wrap ("there is no" / "course called"), so joining the window with a
newline reproduced the break the window existed to undo — whitespace is now collapsed before matching.
The last two are inside the register file that *establishes* the retirement, now exempt wholesale,
because the alternative was widening the regex to swallow "UNVERIFIED", "not part of" and "**not** a
clean confirmation", each of which a genuinely wrong claim could also carry.

A check whose every finding is wrong is worse than no check: it teaches the reader to skip it. That
was the state of this one for its first three runs.

**It cannot redden a build.** `check-claims` is not in `prebuild` and exits non-zero only under
`--strict`, so a FAIL is reported to whoever runs it and blocks nothing — which is the right severity
for a check whose fixes may land in a session type that cannot make them.

## Checks

- `node scripts/system-health.mjs` — 0 failing, before and after.
- `node scripts/check-claims.mjs` — **0 failing**, incl. "Code claims: 14/14 verified against source"
  and "SYSTEM.md §5: names all 20 scripts".
- All four commit SHAs written into CLAUDE.md verified to exist, with subject lines checked against the
  claim each supports: `006da23`, `57c38d4`, `645b4e7` (images), `dd5d4c7` (MDX).
- Nothing committed. Branch `docs/correct-staleness-precision-claim`; pushing to `main` deploys here.

## What I would do differently

**Add a claims-vs-register pass to any standing-document audit.** The mechanical checks (paths, line
numbers, config) are the easy half and they were already 97% clean. The prose claims are the half that
carries regulatory risk, and nothing in the audit method touched them. `check-claims.mjs` §1 already
does exactly this for 14 code claims — the gap is that no equivalent exists for *regulatory* claims in
`CLAUDE.md` and `kb/rules/**` against `kb/register/**`. Filed below.

**Search `skill-reviews/` at the start, not the end.** The closing rule sent me there after the work
was done. Had I gone first, the silica item would have shaped the audit's scope instead of doubling it.

## Demand list
Tag every item: [skills] | [design] | [facts] | [build]

- ~~[facts] `kb/register/cbos-tas-reference.md:145-147` states ABE resells AlertForce's "Asbestos
  Awareness and Silica Awareness courses **in every state**" and cross-references
  `kb/rules/authority-model.md` § "Asbestos and Silica Awareness". Both are now wrong: the claim is
  superseded by that file's own sibling `kb/register/alertforce-scope.md` (3 Aug 2026), and the section
  was renamed to § "Asbestos and silica" by this session, so the pointer dangles. Register-owned; this
  skills session could not fix it.~~ **Closed same session, 15 Aug 2026, by a disclosed crossing** —
  see "Disclosed crossing" above. Fixed by *deleting* the duplicated scope claim and leaving a pointer
  at `kb/register/alertforce-scope.md`, per CLAUDE.md's no-second-copies rule, rather than correcting
  the duplicate. Adds no figure, so the facts source-read rule is not engaged. **Line 142 left alone**
  — "ABE's Silica Awareness Course" there is ABE's own CBOS-refused submission, correctly named, and a
  blind string sweep will damage it.
- ~~[skills] `check-claims.mjs` has no **regulatory**-claim pass. §1 verifies 14 code claims against
  source; nothing verifies a regulatory claim in `CLAUDE.md` or `kb/rules/**` against `kb/register/**`.
  This session's silica defect survived twelve days in five files, through a dedicated CLAUDE.md audit
  that reported the file 81/100, because every automated and manual check was looking at pointers. A
  §9 that fails when a rules doc names a course code, RTO scope or state list contradicting the
  register would have caught it on the 3 Aug commit.~~ **Closed same session** — `check-claims.mjs` §9
  shipped, both directions, and `SYSTEM.md`'s "four things" updated to five. Proven against the
  pre-fix tree rather than asserted: see "§9, and proving it fails" below.
- [skills] The path-ownership section was compressed this session on Andrey's explicit go-ahead. If the
  five per-session derivations are wanted as evidence under ROADMAP rule 3, they are in git history at
  `CLAUDE.md` before this commit — but nothing now points at them. Either accept the table as the
  record, or add one line naming the commit that holds the long form.
- [build] Any future asbestos or silica page: the product is **10830NAT, "Course in Crystalline Silica
  Exposure Prevention"**, never "Silica Awareness", and **WA/SA/NT availability is UNVERIFIED** — state
  nothing either way. Asbestos is 11084NAT and is genuinely national. `kb/register/alertforce-scope.md`
  is the owner.
