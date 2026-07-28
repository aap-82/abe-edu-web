# HANDOVER — Stage 7 re-verification: `cpd-building-tas` + `white-card-tas`

**Session type: `build`.** Drafted 25 July 2026 by a halted `skills` session whose
pre-flight (`node scripts/system-health.mjs`) returned 2 FAIL. This note exists so
those two FAILs get cleared by the session type that owns them, freeing the skills
work (install session-types block + `demand-split.mjs`) to start from a green pre-flight.

## Why this exists

Both pages' source was edited *after* their Stage 7 verification was written, so
`system-health` reports the verification as certifying stale content:

```
FAIL  cpd-building-tas: page changed AFTER its last verification
      (src/content/cpd-bundles/cpd-building-tas.mdx newer than pipeline/cpd-building-tas/07-verification.md)
FAIL  white-card-tas:   page changed AFTER its last verification
      (src/content/courses/white-card-tas.mdx newer than pipeline/white-card-tas/07-verification.md)
```

These are committed content edits (clean working tree), not stray local changes —
exactly the "phase 2 may have run since" case the skills handover's Task 0 warned about.

## Scope — re-verify only, do not rebuild

Stages 1–6 artefacts are present and untouched for both pages. This is a Stage 7
re-run against the current built HTML, then a fresh `07-verification.md` that
post-dates the page source. Do not touch Stages 1–6 unless the audit surfaces a defect.

## Task 1 — `cpd-building-tas`

Verification on disk: `pipeline/cpd-building-tas/07-verification.md` (commit `d8368f8`, 23 Jul 04:21).
Page commits landed *since* that verification, newest first:

- `f0d531b` content(cpd): "12 points" on the proof's first line, capitalise track steps
- `f939f0c` fix(hero): typeset + fill the CPD bundle hero image, payment microcopy
- `ac1caab` content(cpd): wire the Building bundle hero image
- `b1e4b19` feat(cpd): rewrite the bundle course list as cards with real per-course stats
- `5f217eb` fix(cpd): confirm the Building bundle checkout, correct the WHS-cap record
- `1c4bc4a` content: house-style and content-quality pass across course pages
- `651cdbd` fix(cpd): remove a false CBOS claim, and the section built on it

Re-check with priority on what these commits moved:

1. **Points claim.** `f0d531b` changed the proof line to "12 points". `system-health`
   currently reads CPD building as 12 points from 12 live courses of 14 tagged — confirm
   the page's on-screen points figure still equals the derived register total, and that
   nothing authored the subtraction.
2. **Bundle course cards + per-course stats** (`b1e4b19`) — every per-course figure must
   trace to the register, not be typed into the card.
3. **Checkout + WHS-cap record** (`5f217eb`) — confirm `Course.offers.price` = on-page
   price ($499) and the WHS-cap correction holds.
4. **Removed CBOS claim** (`651cdbd`) — verify the false claim and its dependent section
   are gone from the built HTML, and no capsule/FAQ still references them.
5. Re-run the standard Stage 7 grid (H1, question-led H2s, capsules 40–60, JSON-LD graph
   with Person ×2, canonical no-slash, authority language, banned copy). The 23 Jul run
   also flagged a **standing WARN**: `Total not reconciled` (0 price / 0 government / 1
   isTotal row) — decide whether that is in Stage 7 scope or route it to the skills demand
   list; do not paper over it.

## Task 2 — `white-card-tas`

Verification on disk: `pipeline/white-card-tas/07-verification.md` (commit `e3a0398`, 23 Jul 11:56).
One page commit landed since:

- `1c4bc4a` content: house-style and content-quality pass across course pages

Lighter re-run — a single house-style/content pass, no structural change:

1. Re-measure capsule word counts (the pass may have moved them out of 40–60).
2. Confirm authority model intact: **asqa-accredited**, RTO **Blue Dog Training (RTO 31193)**,
   unit **CPCWHS1001** (single C — superseded `CPCCWHS1001` must be absent), **exactly one** Person
   node (the reviewer, Warwick Smith) — the RTO develops and owns an accredited course, so it is
   credited as an Organization via `Course.creator`, never as an ABE person — and re-confirm
   `recognizedBy` = Blue Dog, not ABE.

   > **Corrected 28 July 2026 (skill audit).** This step previously read "one Person node is wrong
   > for asqa — this page correctly carries Person ×2". That is backwards. `guardrails.ts` fails an
   > asqa-accredited page that does not have exactly 1 Person, and the built page correctly renders
   > 1. Both tasks in this handover are discharged, but the instruction was left standing as a trap:
   > a session acting on it would have "fixed" a correct page into a guaranteed build failure. The
   > same error had propagated into SKILL.md in three places and is fixed there too, and the rule is
   > now asserted in `check-claims.mjs` so it cannot drift again unnoticed.
3. Confirm the **noindex** pre-launch state is still intentional (buyUrl TBC) and recorded as
   NOTE, not a regression.
4. Price grid: $59 / card fee $13.72 / total $72.72 still reconciles.

## Done when

- Fresh `07-verification.md` written for each page, dated after the page source.
- `node scripts/system-health.mjs` → **0 FAIL** (WARNs may remain; triage each per
  session-types Rule 1 — fix here only if build-owned, else route to demand list).
- **Stop at Stage 8.** Production deploy is human-triggered. Do not deploy.

## Hand back

Once pre-flight is green, the skills session re-opens and runs its Task 0–5
(install the session-types block in `CLAUDE.md`, drop `demand-split.mjs` in `scripts/`,
gitignore `reports/`, wire the unrouted count into `system-health`, template + CLAIMS + ROADMAP).
