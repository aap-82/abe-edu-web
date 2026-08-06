# HANDOVER — White Card Stage 7 drift + a facts contradiction, found closing out 2026-08-07

## Status: IN PROGRESS — item 1 closed same day, items 2 and 3 still open

Found running `node scripts/system-health.mjs` while closing a long design session
(`skill-reviews/design/2026-08-06-white-card-hub-redesign-and-ob-match.md`). Nothing here was
caused by that session's own commits except item 1's `/white-card` row — recorded here rather than
fixed in place, because re-running Stage 7 and re-checking a regulatory position are both work this
session's type (`design`) may not do. Per `CLAUDE.md` rule 1: close the session, open the type that
owns the fix.

## 1. ~~`[build]` Five pages have content newer than their own Stage 7 verification~~ CLOSED same day

**Closed 7 Aug 2026, commit `25445eb`.** Four spokes (WA/TAS/NSW/QLD) confirmed by `git show` that
the 4 Aug drift was a breadcrumb-only edit (restoring the middle "White Card" crumb now that the hub
exists) — light re-verify appended to each `07-verification.md`, no other fact/copy/schema changed.
The hub got the full pass this note called for: delegated to a fresh subagent (not self-verified,
matching this repo's own established Stage 7 pattern), which confirmed everything the redesign added
is correct (ACT fully live, "Issued by" lines name the RTO never the regulator, the comparison
table matches `/owner-builder-courses` exactly, no mobile overflow) and confirmed the baseline's
known `SourcesFooter`/ASQA-disclosure defect is still open (unchanged, `[design]`+`[skills]`, still
outside build scope) — but also found two NEW defects a self-audit would likely have missed, both
fixed same session: the TAS/ACT HubCard "Issued by" bullets were missing the "Statement of
Attainment" qualifier every spoke page itself pairs with it (a real overclaim risk specifically on
the two states where the physical card isn't RTO-issued), and the page's own `reviewedBy`/
`lastReviewedAt` freshness signal had gone stale against the redesign. A third, unrelated finding
from the same pass — `src/data/nav.ts`'s TAS mega-menu description repeating the banned "for
Tasmanian residents" phrasing live in sitewide chrome — was also fixed. `node scripts/check-pipeline.mjs`
now reports "verification is current" for all six White Card slugs. Full record:
`pipeline/white-card/07-verification.md`'s own "Re-verification · 7 August 2026" section.

**Original note, kept below for context:**

`check-pipeline.mjs`'s invariant ("content must never outrun its verification") is currently
FAILing on all five White Card pages plus the hub:

| Page | Content last touched | 07-verification.md last touched | Gap |
|---|---|---|---|
| `/white-card` (hub) | 7 Aug 2026, `f10f166` (this design session's redesign) | 4 Aug 2026 (the original hub build) | **New, this session's own doing** |
| `/white-card-wa` | 4 Aug 2026, `feat(content): build /white-card hub (W3-6)` | 31 Jul 2026 | Pre-existing since 4 Aug |
| `/white-card-tas` | 4 Aug 2026, same commit | 31 Jul 2026 | Pre-existing since 4 Aug |
| `/white-card-nsw` | 4 Aug 2026, same commit | 2 Aug 2026 | Pre-existing since 4 Aug |
| `/white-card-qld` | 4 Aug 2026, same commit | 3 Aug 2026 | Pre-existing since 4 Aug |

The four spoke pages (WA/TAS/NSW/QLD) were all last touched by the **same** commit — the 4 Aug hub
build must have made a small edit to each spoke course file (cross-links or similar) without
re-running Stage 7 on the spoke itself. That gap has sat unnoticed for three days because nobody
ran `system-health.mjs` mid-session until now.

The hub's own row is fresh and is this session's responsibility to flag: the redesign work
(HubCard bullet facts, the comparison-table exploration and revert-to-match-`/owner-builder-courses`,
the two regression fixes) changed `white-card.mdx` substantially after 4 Aug's Stage 7 sign-off, and
no Stage 7 has run since.

**Next build session: re-run Stage 7 on all five slugs** (`pipeline/{white-card,white-card-wa,
white-card-tas,white-card-nsw,white-card-qld}/`) before any of them ship again. The four spoke pages
likely need only a light re-verify (the drift is probably a small cross-link edit, not new copy) —
confirm what actually changed with `git show f10f166... -- src/content/courses/white-card-{wa,tas,
nsw,qld}.mdx` type diffs against the pre-4-Aug commit, rather than assuming. The hub needs a full
Stage 7 pass given the scope of what changed.

## 2. `[facts]` A live position contradicts the register in 12 places

`system-health.mjs` FAILs `POSITION CONTRADICTS REGISTER (tas-online-residency)`, spanning
`white-card-nsw.mdx:156` and eight+ lines in `white-card-tas.mdx` (25, 57, 85, 103, 123, 139, 145,
and more). Per the check's own message: WorkSafe Tasmania's own wording is that the GCIT must be
"completed in Tasmania" — a location condition, not a residency test — and the WHS Regulations 2022
(Tas) impose no delivery-mode restriction beyond that. No regulator source supports a Tasmanian
*residency* test, on `/white-card-tas` itself or as a comparison point on `/white-card-nsw`.

This is pre-existing (not touched by this session) and is exactly the shape of mistake
`kb/mistakes-log.md` row 21 already names (a page contradicting the register on a non-numeric
claim, with nothing checking the two against each other automatically for prose). A `facts` session
needs to re-read the source, confirm the correct wording, and fix every one of the 12 locations —
not just reword the first hit, since the same claim is repeated as a comparison point on a second
page.

## 3. `[skills]` Review coverage and trend, noted but not investigated

- `Review coverage: 7/13 pages graded` and `No Stage-9 review for "act-owner-builder-course"` — the
  ACT owner-builder page has no Stage-9 review on file. Not investigated further this session; flagging
  since it surfaced in the same health-check run.
- `Trend turns_to_passed_audit 0.0 -> 2.0 WORSENING` — a trend metric, not a content bug. Whether
  this is a real regression or an artefact of a short, unusual session (a lot of live iteration, one
  formal build) is for whoever reads the trend series next, not diagnosed here.

## What shipped, across the design session and its build-session close-out

Four commits, all green at build/typecheck/guardrails time: `f10f166` (the `/white-card-act` build
plus the HubCard/ComparisonTable redesign and its own regression fixes), `6f1fd37` (a
`kb/mistakes-log.md` entry plus an unrelated TrustBand heading fix on five owner-builder pages),
`10b400d` (the design review's post-review addendum + this handover note), and `25445eb` (item 1's
close-out: five Stage 7 re-verifications plus the three fixes they found). Full narrative detail in
`skill-reviews/design/2026-08-06-white-card-hub-redesign-and-ob-match.md`. **Item 2 (the TAS
residency facts contradiction) and item 3 (review coverage/trend) remain open** — neither is
build-session work, and item 1's close-out did not touch either.
