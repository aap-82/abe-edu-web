# Facts review — CBOS approval letters, the Wiring Rules scope limit, and a mailbox-wide reconciliation

**Date:** 18 August 2026
**Session type:** facts
**Graded by:** self — no fresh-subagent facts grader exists
**Outcome:** the plumber bundle is now genuinely twelve claimable points. **The builder bundle is not,
and `/cpd-building-tas` is indexed and asserts that it is.** That is handed over, not fixed here.

---

## The reading, not just the figure

Rule 11(a): the instrument opened, the clause cited, the date, and what was searched for and not found.

**Instrument opened.** The CBOS approval email for *AS NZS 3000 2018 Wiring Rules Online*, supplied by
Andrey into `gov approvals/CBOS/` and read in full this session. Forwarded 12 Dec 2024 from the CBOS
Occupational Licensing / CPD Education and Training Officer to `info@abeeducation.edu.au`. The clause:

> Thanks for your application. Please be advised that this training has been approved for 1 CPD point
> **for electricians and restricted electrical licence holders only**.

**What the same PDF also contains, and why it misled.** Below the approval sits ABE's own submitted
form (`Online form submitted`, 5 Dec 2024), including a **"Type or category of licence"** block listing
Building, Electrical and Plumbing, and ending `Suggested CPD 1 points`. That block is the
**application**, not the decision. The two differ precisely in the categories CBOS struck out. Reading
the first page only would have got the date right and the scope wrong.

**What was searched for and not found.** Nothing further on Solar Energy. It is the one live course
absent from all three mailbox summaries in either direction — no approval, no rejection.

## The reversal, and it is mine

Rule 11(b) requires a reversal to name what it contradicts. This one contradicts my own assessment
from earlier the same day.

The source doc's per-row `Category Description` lists three categories for this course. **I calibrated
it before trusting it** — against *Plumbing Essentials*, the one row whose CBOS scope was already known
from a letter ("plumbers and gas-fitters"), whose field names exactly Gas-fitting and Plumbing. It
matched. On that basis I told Andrey his reading was well-supported and the mailbox summaries reporting
"electricians only" were the weaker evidence.

**One successful calibration is not a validated instrument.** The field is right on Plumbing Essentials
and wrong on Wiring Rules: one hit in two testable rows. The deeper error is that the field is derived
from ABE's application, so it can only ever record what was *asked for* — it is structurally incapable
of witnessing what was *granted*, however well curated it looks.

Places that still carried the old position, all named in `A4g`: the `Category Description` on row
`i-yfT1kEKZxE` (ABE's operational field, not corrected here), that row's `Category` and `Bundle` tags
(both since corrected), Andrey's statement of 18 Aug 2026 which quoted the field, and `A4f` as first
written.

## What was changed, and where

All at source, landed via `npm run sync:cpd`, checksum intact — no hand-edit.

| # | Change | Effect |
|---|---|---|
| 1 | `Approval Date` 12 Dec 2024 on Wiring Rules | `expiryBasis: approval`; expiry 05 Dec → **12 Dec 2026** |
| 2 | `Category` → Electrical only | live pools: building **12 → 11**, plumbing **13 → 12** |
| 3 | Plumber bundle: Wiring Rules out, Solar Energy in (Andrey's call) | plumbing **12 members, 12 claimable** |

Earlier the same session, four approval dates were recorded from letters read on 17 Aug, and
`Workplace Asbestos Basics`, `WELS` and `SWMS` were resolved on Andrey's confirmation — see `A4f`,
`A4h`. All three stay **submission-basis**: a confirmation establishes *that* a course is approved,
not *when*.

## Verification — measured on the built output

- `/cpd-plumbing-tas`: **12 `bcard` members**, Solar Energy present, Wiring Rules absent
- Solar renders with its blurb ("How rooftop solar and hot-water systems affect a residential job"),
  so no member silently lost its description to the `memberInfo` key coupling
- `rrp` assertion untouched: 12 × $99 = $1,188, so no price or copy change was forced
- `npm run build` green; `check-claims --strict` 0 failing; `system-health --strict` 0 failing
- `check-freshness` `SOFT-DATE` 6 → **5** live courses on submission-basis

## The caveat on the swap, recorded because it was accepted rather than resolved

**Solar Energy's plumbing scope is unverified.** No approval date, absent from every search, and its
plumbing category comes from the same application-derived field that was wrong for Wiring Rules. It was
flagged before the swap and the swap was made anyway, which is a legitimate commercial call — but it
means the plumber bundle's twelfth point rests on the weakest instrument in the register. Its estimated
expiry is **5 Dec 2026**, under four months out, and `check-freshness` fails the build on an expired
course still in a bundle.

## A check gap this exposed

`check-claims` reports **"CPD building: publishes 12 pts within a live pool of 12"** and passes. The
pool it counts is **bundle membership**, not **approved category** — so it cannot see that one member is
not approved for the licence the bundle is sold to. Nothing mechanical catches this class of error
today, which is why it took a letter to find. Routed below.

## Demand list

Tag every item: [skills] | [design] | [facts] | [build]

- [build] `cpd-plumbing-tas.mdx` — **four pool-count claims now overstate by one.** The live plumbing
  pool is **twelve**, not thirteen, since Wiring Rules is not plumber-approved. Fix `subhead` (:145),
  the FAQ question and answer (:189, :190) and the individual-courses paragraph (:255). Page is
  `noindex`, so this is wrong-on-page rather than public. The header comments at :14-51 and :140 also
  still describe Solar Energy as *out* of the plumber bundle, which is now backwards —
  `kb/mistakes-log.md` row 1 is exactly this shape.
- [build] `cpd-building-tas.mdx` — **the indexed page asserts twelve claimable points for a builder and
  delivers eleven.** Wiring Rules is still a bundle member and is not builder-approved. The claim is not
  one string: `description` (:55), `intro` (:91), `h1Html` (:111), `subhead` (:116), proof row (:127),
  CTA sub (:152), price comparison (:166, :174), FAQ (:188) and section H2/capsule (:218, :219).
  **Needs a decision before copy** — see the next item.
- [facts] **The builder bundle needs a twelfth builder-approved course, and there is no spare.** All 17
  rows were checked: every live building-approved course is already in the bundle. Routes are (a) the
  `Silica Awareness Course` letter of 12 Dec 2024, reported approved for Builders, Electricians/REL,
  Plumbers and Gas Fitters — the only option that would also have fixed plumbing, and a `refused` →
  approved reversal that **must not** be made from a summary; (b) re-approve *Wet Area Waterproofing*,
  expired 22 Feb 2026, which is also the only genuinely builder-technical course and would answer A4e;
  (c) restate the bundle as eleven points at `rrp` $1,089.
- [skills] `check-claims.mjs` — the CPD bundle check compares claimed points against **bundle
  membership**, never against **approved category**, so a member not approved for the bundle's licence
  class passes silently. That is how an indexed page came to promise a builder twelve claimable points.
  Add a per-licence assertion: every live member's `categories` must include the bundle's category.
- [facts] Six live courses remain submission-basis (`SOFT-DATE 5` plus SWMS). **Solar Energy is the one
  with no record at all** and now carries a bundle slot in three bundles; its letter is the highest
  value of those outstanding.
- [skills] `sync-cpd-register.mjs` — note in the header that Coda writes are **asynchronous** and that a
  read-back immediately after a `PUT` returns the old value. Two writes this session looked like
  failures for ~20 seconds. Also note that the MCP table tool silently accepts an ISO date on a
  `DAY_MONTH_YEAR` column and writes nothing; only `dd/mm/yyyy` takes.
