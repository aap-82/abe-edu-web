# HANDOVER — facts: verify the TAS Electrical + Plumbing bundle compositions

**Session type: `facts`.** Drafted 25 July 2026 by a build-scoped session that could not do this work
(only a `facts` session may write `kb/register/**`, and a figure must be verified against source *in that
session*). This note records **no register figure** — it routes two source-verification jobs and hands the
current on-disk state to the session that owns them. It is not a source; do not carry a number from it.

Prerequisite for the two TAS bundle **pages** (`HANDOVER-cpd-bundles.md`, Task 2 / build). Those pages
derive their points from the register, so the register must be clean and source-verified first.

## Pre-flight

Run `node scripts/system-health.mjs`. Two WARNs name this work and should **resolve** as you finish:

```
WARN  CPD electrical: 11 points, short of the 12 a 12-point licence needs. The page must disclose the
      shortfall rather than imply full coverage.
WARN  CPD plumbing: 13 live courses against a 12-point cap, so 1 is surplus and the sold set is ambiguous.
      Prune it in the source doc so the sold set is unambiguous.
```

## How the register works (read before touching it)

`kb/register/cpd/tas-courses.json` is **generated**, not hand-authored. `scripts/sync-cpd-register.mjs`
pulls it from the Superhuman/Coda doc **"TAS CPD Courses"** (`superhuman://docs/wXRzQ7oMrm`), last synced
2026-07-23, and stamps a **checksum**. `check-claims.mjs` fails the build if the payload is hand-edited
(checksum mismatch). Practical consequence, and it is the whole reason Task 1.2 says "in the source doc":

- **Composition changes (adding/removing a course, changing points, status, dates) happen in the source
  doc, then you re-run the sync** to regenerate the JSON + checksum. A raw edit of the JSON will fail the
  checksum guard and be overwritten on the next sync.
- Per-course fields the register carries: `status` (`live` is the only publishable one), `points`,
  `bundles` (category tags), `approvedAt`, `expiresAt`, `expiryBasis` (`approval` = a real CBOS approval
  date; `submission` = an estimate of submit-date + 2 yrs, **not** a confirmed approval date).

**Source of truth for the regulatory facts:** the **CBOS CPD Determination list** on `cbos.tas.gov.au`
(the official approved-course register), read in a browser this session. The Superhuman doc is the data
pipe; CBOS is the authority. Where they disagree, CBOS wins and the doc is corrected.

## Current on-disk state (grounding, not a source)

`bundleMap` in the register names the three source-doc bundles — and the names already disagree with both
Andrey's confirmed line-up and the live composition. **That disagreement is the job.**

| Source-doc bundle name | Category | Andrey's line-up | Live members / points now | Tension to resolve |
|---|---|---|---|---|
| "TAS Builder CPD — 12 Points (2026)" | building | 12 / $499 | 12 live / 12 pts | none — built & live |
| "TAS Electrician CPD - **12 Points** (2026)" | electrical | **11** / $449 | **11 live / 11 pts** | name says 12, truth is 11 |
| "TAS Plumber CPD **11 pt** Bundle" | plumbing | **12** / $499 | **13 live / 13 pts** | name says 11, Andrey 12, register 13 |

## Task A — TAS Electrical: confirm 11 at source (do not restore 12)

1. On the CBOS Determination list, confirm each of the **11 live electrical members** (list below) is
   currently CBOS-approved and worth 1 point. 11 is the corrected figure — a code comment on record notes
   the bundle once "advertised 12"; **do not restore 12 by typing one in.**
2. Decide the real question the name raises: is the sold electrical bundle genuinely an **11-point** set,
   or is a 12th approved electrical course **missing / expired** from the doc that should be restored? Two
   electrical-tagged courses are currently non-live and correctly excluded — *Smart Home Integration*
   (expired) and *AS/NZS 3500 Plumbing & Drainage* (refused). Confirm at source that neither should be
   live; if one legitimately should be, that is how it becomes 12 — **verified**, not typed.
3. Where a live member's `expiryBasis` is `submission` (an estimate), upgrade it to the **real approval
   date** from the Determination where CBOS publishes one (`approval` basis). This also fixes the building
   page's carried "submission-basis dates" note.
4. Whatever you settle, the build page must **disclose the 11-point shortfall** at the H1/meta/hero (a
   shortfall caps the headline, it does not decorate the body — mistakes-log #9). Record the confirmed
   number so the build session states it honestly.

## Task B — TAS Plumbing: resolve 11 vs 12 vs 13, then prune to the sold set

1. Three figures are in play: the doc name says **11**, Andrey says **12/$499**, the register holds **13
   live**. Resolve at source what the **sold plumbing bundle actually contains**, then make the source doc
   match — the live plumbing set must be exactly the sold set, unambiguous.
2. The 13 live plumbing set = **all 11 of the electrical live members, plus** the two plumbing-specific
   ones (**WELS / Understanding Water Efficiency Labelling** and **Plumbing Essentials**). Strong lead to
   check at source: the shared set carries **AS/NZS 3000:2018 Wiring Rules — the electrical wiring
   standard — inside the plumbing bundle**, while the plumbing-appropriate standard (AS/NZS 3500 Plumbing
   & Drainage) is currently `refused` and excluded. The wiring-rules course is the prime surplus candidate.
   Confirm from source which course is not in the sold plumbing bundle, and remove it in the **source
   doc**, not the JSON.
3. Re-run `scripts/sync-cpd-register.mjs` to regenerate the register + checksum, and confirm
   `bundlePoints('plumbing')` now equals the sold figure (12 per Andrey) with no cap being applied.

## Guardrails (facts rules)

- **No figure enters `kb/register/` without a source read in this session.** Mark anything you cannot
  confirm at source **UNVERIFIED** rather than carry it from this note or a page.
- `kb/register/` is the single owner of every verified regulatory figure — no second copies.
- Prices ($449 Electrical, $499 Plumbing) are **ABE commercial** figures (Andrey's word), not register
  facts; they live in page frontmatter, not here. Out of scope for this session.
- Composition edits go through the **source doc + re-sync**, never a raw JSON hand-edit (checksum guard).

## Done when

- `node scripts/system-health.mjs` → the electrical and plumbing WARNs above are **resolved** (plumbing
  live set unambiguous; electrical 11 confirmed and its shortfall documented for the page).
- CPD register checksum still matches (i.e., the change went through sync, not a hand-edit).
- Each figure recorded as **confirmed at source (with the CBOS Determination date)** or **UNVERIFIED**.

## Report back

1. Which electrical/plumbing figures were confirmed at source vs left UNVERIFIED, with the CBOS date.
2. Plumbing: which course was the surplus, and the sold-set count after the prune.
3. Electrical: confirmed 11, or a verified 12 (naming the restored course) — never a typed 12.
4. Hand back to **build** (`HANDOVER-cpd-bundles.md` Task 2) once pre-flight is green — the two bundle
   pages can then derive from a clean register.

---

### Appendix — live members on disk today (grounding only, verify each at source)

**Electrical — 11 live, 11 pts** (`expiresAt` · `expiryBasis`):
- Workplace Asbestos Basics — 2027-07-28 · submission
- Solar Energy — 2026-12-05 · submission  ← soonest expiry
- Site and Personal Safety for Climate-Exposed Trades — 2027-06-05 · submission
- Effective Email Management and Digital Communication — 2027-03-20 · **approval**
- The Role of Drones In Building, Plumbing & Electrical Work — 2027-02-19 · **approval**
- Effective Communication and Documentation — 2027-07-18 · **approval**
- AS/NZS 3000:2018 Wiring Rules — 2026-12-05 · submission  ← soonest expiry
- Fire Risk Awareness For All Trades — 2027-11-10 · submission
- TAS CPD: Cyber Risks and Workplace Safety — 2027-07-15 · submission
- Safe Work Method Statement (SWMS) — 2027-03-11 · submission
- WHS Compliance and Legislation — 2027-07-22 · submission

**Plumbing — 13 live, 13 pts** = **all 11 electrical members above** (note this includes AS/NZS 3000
Wiring Rules, an electrical standard — flagged as the surplus candidate in Task B), **plus**:
- Understanding Water Efficiency Labelling (WELS) — 2027-09-24 · submission
- Plumbing Essentials — 2027-09-09 · submission

One of these 13 is the surplus to remove so the sold set is exactly 12 (per Andrey).

Non-live, correctly excluded: *Smart Home Integration* (expired, electrical), *Wet Area Waterproofing*
(expired, plumbing), *AS/NZS 3500 Plumbing & Drainage* (refused, electrical-tagged).

---

## Outcome — facts session, 25 Jul 2026

> ⚠️ **The plumbing "prune to 12" framing in this section rests on a wrong model and is SUPERSEDED** —
> see **"Model correction"** at the foot of this file. The prune was never needed; the real defect is in
> the check logic (a skills fix), not the register data.

**Done at source** (Coda "TAS CPD Courses", the register's actual owner, read + edited authed as Andrey):

- **Plumbing pruned to 12.** Removed the plumbing-bundle tag from *AS/NZS 3000:2018 Wiring Rules*
  (row `i-yfT1kEKZxE`) — an electrical wiring standard mis-filed in the plumbing bundle. Its Builder and
  Electrician tags, Category, points and Live status are untouched. Andrey confirmed the surplus and that
  the sold plumbing set = 12. After `npm run sync:cpd`, plumbing live = 12 = cap → the plumbing WARN
  clears to OK. Building (12) and electrical (11) are unaffected.
- **Electrical confirmed 11, not restorable to 12.** Both non-live electrical-tagged courses are
  correctly excluded at source: *Smart Home Integration* (Expired 04/04/2026) and *AS/NZS 3500 Plumbing
  & Drainage* (Refused). No approved 12th electrical course exists. Andrey's call: 11 is correct. The
  `11 < 12` "short of 12" WARN **persists by design** — it is the standing reminder that the build page
  discloses the shortfall (mistakes-log #9); no composition edit clears it.

**Premise correction — the handover's verification source does not exist.** The CBOS website publishes
**no per-course approved-CPD register**. Verified 25 Jul 2026 by reading the site in a browser: the "CPD
Determination List" is legislative instruments; CBOS runs a submit-for-approval model and lists approved
*providers* only (Pointsbuild etc.). Per-course approval is evidenced solely in ABE's Coda doc — which
holds **no CBOS approval letters** (its two attachment columns are "Course Submission" and "Course
Material" = course content). Only **3 of 11** live electrical courses carry an Approval Date (Effective
Email Management 20/03/2025, The Role of Drones 19/02/2025, Effective Communication 18/07/2025); the other
8 are submission-basis with no CBOS document to read. **Task A step 3 (upgrade submission→approval from
CBOS letters) is not actionable — there is nothing to read.** Those 8 dates stay UNVERIFIED against any
external gov source, which is inherent to how CBOS operates, not a gap this session can close.

**Blocked / not done:**

- **Register NOT yet regenerated.** `CODA_API_TOKEN` is absent this session, so `npm run sync:cpd` could
  not be run. **Andrey must run it, review the diff, and commit** for the change to reach
  `kb/register/cpd/tas-courses.json`. Until then `system-health.mjs` still shows the old counts.
- **Bundle-option renames NOT done, and must not be done in Coda alone.** "TAS Electrician CPD - 12
  Points (2026)" holds 11; "TAS Plumber CPD 11 pt Bundle" now holds 12 — both internal labels are stale.
  Renaming them in Coda breaks `BUNDLE_MAP` in `scripts/sync-cpd-register.mjs` (the sync joins on the
  exact names), which is **skills-owned**. Routed to skills: rename both options AND update `BUNDLE_MAP`
  in one change. Flagged as a background task.

  **Update (later on 25 Jul 2026) — the skills/background session is mid-flight and now OWNS the register
  landing.** It has already renamed the plumbing option in the shared Coda doc to
  **"TAS Plumber CPD 12 Points (2026)"**, so a `sync:cpd` run from any session with a stale `BUNDLE_MAP`
  now dies `Unmapped bundle "TAS Plumber CPD 12 Points (2026)"` (confirmed from this facts session). That
  is expected and correct — a facts session must not edit `BUNDLE_MAP`, so it cannot and must not complete
  the sync. **Coordination for the skills session:**
  1. The facts-session **plumbing prune is already applied in the Coda source** (Wiring Rules row
     `i-yfT1kEKZxE` no longer tagged to the plumbing bundle). Your `sync:cpd` will carry it through
     automatically — **expect plumbing = 12 live, not 13.** Do not re-add the plumbing tag to Wiring Rules.
  2. Update `BUNDLE_MAP` to the new plumbing name (and the electrician name if you rename that too), then
     run `CODA_API_TOKEN=… npm run sync:cpd`, review the diff, and commit. The regenerated register should
     show plumbing 12 / electrical 11 / building 12 and `check-claims` should pass.
  3. **Only one session should run the sync** — this facts session deliberately did not land it, to keep
     the Coda names and `BUNDLE_MAP` in lockstep.

---

## Model correction (25 Jul 2026, later — supersedes the "prune to 12" framing above)

Andrey corrected the premise the whole prune rested on. **CBOS approves CPD courses individually (1 point
each); ABE bundles and sells any selection of approved courses it likes.** Having MORE approved courses in
a trade's pool than the bundle's point target is normal inventory, not a surplus to delete — ABE just
picks any 12 of the 13 plumbing courses for the 12-point plumbing bundle.

Consequences:

- **No register data change was ever needed.** `bundlePoints = min(pool, 12)`, so plumbing was already 12
  (`min(13, 12)`) before any edit. The published points figure was never wrong.
- **The actual defect is the check logic, not the data.** `scripts/lib/cpd-derive.mjs`'s comment ("a
  bundle holding more live courses than the cap is a source-doc pruning job") and `check-claims.mjs`'s
  `live > cap` → "surplus / ambiguous / prune it" WARN both encode the wrong model. `live > cap` is fine.
  **Routed to skills** (flagged as a background task). Open sub-question for that fix: if a bundle PAGE
  enumerates its specific courses, the register needs a way to pin WHICH 12 are sold; if the page only
  states "12 points across approved courses", the selection needs no pinning and the WARN is purely
  spurious. Product/design call.
- **`live < cap` is a sizing/disclosure matter, not a defect.** ABE can sell a bundle of ANY size from
  approved courses; **12 points is merely the most desirable** because it meets the yearly CPD requirement
  in a single purchase. So electrical's 11 approved courses make a perfectly sellable **11-point bundle** —
  it just doesn't alone cover the annual 12, which the build page should disclose. Neither `live > cap` nor
  `live < cap` is a hard error; both are product-sizing signals. The right check is: a bundle page's
  claimed points must be `<= pool size` (enough approved courses to back the claim), not `pool == cap`.
- **The Coda prune of Wiring Rules is LEFT IN PLACE for now** (Andrey's call: "leave as-is" — he'll decide
  pool composition separately). So the Coda plumbing pool currently shows 12, not the full 13. That is
  incidental, not the fix; do not treat it as the resolution. The on-disk register JSON is still 13
  (the rename-blocked sync never ran).

**Hand back to build** (`HANDOVER-cpd-bundles.md` Task 2) once Andrey has synced + committed and
`system-health.mjs` shows plumbing green. The electrical bundle page must state 11 points and disclose
the one-point shortfall at H1/meta/hero.
