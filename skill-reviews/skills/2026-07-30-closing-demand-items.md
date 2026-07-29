---
date: 2026-07-30
skill: demand-split
subject: closing-demand-items
verdict: Green
graded_by: self
---

# Skills review — closing demand items, 2026-07-30

## Verdict

**Green.** The handover list can now go down as well as up, which it could not before: **11 items
closed on first use**, all of them work this repo had already shipped and was still listing as
outstanding. The mechanism is deliberate rather than accidental, counted rather than silent, and
guarded so a typo can no longer masquerade as a fix.

## What prompted it

Andrey asked what happens when he fixes something on the handover list. The answer, verified rather
than assumed, was **nothing**: every item fixed earlier the same day was still listed. `Note.astro` in
three places, the `Login` anchor in four, `prefers-reduced-motion` in four, the burger tap target, the
180 CPL disclosure. All fixed, all shipped to `main`, all still presented as work to do.

## The mechanism existed and worked by accident

One design review had struck a completed item through: `- ~~[design] Migrate Credentials.astro…~~`.
That item appeared in no handover note — **but not because anything understood strikethrough.** The
item regex expected `[tag]` immediately after the list marker, `~~` sat in front of it, so the line
failed to match and was discarded.

The right outcome by the wrong route. A live item with a typo in its tag was discarded just as
quietly, and nothing reported either. To the tool, **"fixed" and "lost" were the same event** — the
invisible-loss class that row 24 already records once.

## What shipped

| | Before | After |
|---|---|---|
| Closing an item | undocumented, worked by parse failure | `- ~~[design] …~~`, deliberate |
| Note header | item count only | **`40 open · 11 closed`** |
| Design note | 50 open | **40 open, 11 closed** |
| A malformed item line | silently dropped | **reported**, `--strict` exits 1 |
| Who may close | undefined | any session that fixed it (CLAUDE.md) |
| `check-claims` CLAIMS | 13 | **14** |

Closure strikes the item's **whole wrapped extent**, not just its first line. The first attempt struck
only the lead line and left continuations dangling as orphaned prose after the closure note; caught by
reading the rendered markdown rather than trusting the count, which had already gone green.

**Negative-tested both halves.** A scratch review with one malformed line and one closed item: the
malformed line is reported by location and `--strict` exits 1; the closed count moves 1 → 2. Reverted
cleanly. Reinstating the silent drop produces CLAIM DRIFT and 13/14.

## The policy half, which was the actual gap

The code was the easy part. **Nobody was allowed to close anything**: the session-types table assigns
`skill-reviews/**` to build (Stage 9) and design (its own review only), so an item filed by one session
and fixed by another had no one entitled to strike it. Waiting for the filing session to return means
nothing is ever closed, because sessions do not return.

CLAUDE.md now says: **any session may close an item it has just fixed, in whichever review filed it**,
and should do so in the same session as the fix. Closing states a fact about status; it does not
rewrite the run's findings, which stay readable under the strike.

## What the first real use taught

**Composite items cannot be closed.** One item bundles four sitewide chrome defects — a malformed
`tel:`, the `Login` anchor, a logo missing `aria-hidden`, and duplicate `training.gov.au` URL casings.
Two are fixed and two are not, so it correctly stays open and correctly keeps reporting a defect that
no longer exists. The demand-list format lets an item be a list, and an item that is a list is a
closure deadlock.

## Demand list
Tag every item: [skills] | [design] | [facts] | [build]

- [skills] **One demand item, one defect.** A composite item cannot be closed until every part is done,
  so it keeps reporting fixed work indefinitely — there is one in the corpus now doing exactly that.
  Say so in CLAUDE.md's demand-list format, and consider having `demand-split` flag an item containing
  more than one `;`-separated clause as probably composite.
- [skills] Closure is not verified. `~~…~~ fixed in #89` is a claim, and nothing checks that #89 exists
  or touched anything relevant. A cheap first version: require a closure note and warn when it names no
  PR or commit.
- ~~[design] The remaining composite chrome item still holds two live defects: the logo `<img alt="">`
  lacks `aria-hidden`, and one page emits the same `training.gov.au` URL in two casings.~~ both fixed in #93

## Output
- [x] **Fix applied** — closure parsed and counted, malformed lines reported, `--strict` covers them,
  the policy written down, and 11 real items closed.
- [x] **`kb/mistakes-log.md`** — not incremented. Row 24 already carries the invisible-loss lesson at
  2 sightings and this is the same family; a third tick adds a count, not a rule. The specific lesson —
  *a mechanism that works by accident is not a mechanism* — is in the code comment and here.
- [ ] **Memory written** — not needed; it would duplicate the CLAUDE.md rule, which is read every session.

## Grader note

`graded_by: self`. Green rather than Amber because this one behaved: the defect was found by asking a
plain question, the fix worked first time in substance, and the only rework — striking whole items
rather than lead lines — was caught by reading the output rather than by a later session. The
reproducible part is the 50 → 40 open count and the two negative tests. The judgement call worth
challenging is letting any session close another's item; the alternative is a list nobody can prune.
