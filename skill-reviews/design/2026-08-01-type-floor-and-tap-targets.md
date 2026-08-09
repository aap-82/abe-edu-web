---
date: 2026-08-01
skill: design-session
subject: type-floor-and-tap-targets
verdict: Green
graded_by: self
---

# Design review — the 11px type floor and the tap-target sweep, 2026-08-01

Self-graded: there is no fresh-subagent design grader yet (CLAUDE.md session-types rule 9).

## Verdict

**Green.** Three things shipped: two dead demand items closed (a third and a fourth turned out to
be dead as well), the sub-register type raised to the design register on every page, and every
tap target below the WCAG 2.5.8 AA floor either fixed or shown by measurement to be exempt.

Green rather than Amber because the one thing that could have made it Amber — a load-bearing
height moving under a chrome fix — was checked against a stashed baseline rather than assumed, and
did not happen. The session also caught itself writing an unmeasured claim into a comment and
corrected it; that is recorded below rather than quietly fixed.

## What the session was asked to do, and what it found

The brief: close two dead items, fix `PartnerDisclosure`'s contact-cell overflow, then sweep the
sub-12px type and sub-44px tap targets as one pass.

**Two of the four "live" items were already fixed.** The brief named two dead items; the
`PartnerDisclosure` overflow turned out to be the third, and the nav "Soon" badges the fourth.

| Item | Filed as | Measured 2026-08-01 |
|---|---|---|
| `.note` / `.price-foot` need a `max-width` | 128-172 CPL, four live pages | capped at `global.css:386` and `:729` |
| `PartnerDisclosure` contact cell overflows | 410px doc width @375, 90px scroll @320 | **0px** scroll at 375 and 320, on both partner pages |
| Nav "Soon" badges | 9px, 2.81:1 | **11px, 5.10:1**, box 24.1x43.7 |
| `.btn-link` micro-CTA tap target | 26px | `min-height:44px` at `global.css:123`; absent from the sweep |

This is the 10x repeat risk in `kb/mistakes-log.md` inverted. The usual failure is trusting a
comment over the code; here the *demand list* had drifted from the code, and four items were
routing design sessions at work that no longer existed. The fix for both directions is the same
and it is the only reason this session found them: measure before believing, including when what
you are being told is that something is broken.

## The register question, which decided the whole type pass

The filed items say "12px floor" (`references/verification.md:110`, "Meaningful text >= 12px").
**DESIGN.md:50 and :190 set the Label token at DM Mono 500, 11px**, and CLAUDE.md makes DESIGN.md
and `global.css` canonical on any conflict.

That matters because 11px is not drift — it is the site's micro-type idiom, on ~35 selectors across
all 20 pages. Sweeping it to 12px would be a design-register change, and rule 7 makes those an
exclusive session. So the line drawn was:

- **At 11px** — the register. Untouched.
- **Below 11px** — drift beneath the register. A component fix, and in scope.

Every sub-11px declaration was DM Mono uppercase micro-type, i.e. the Label token rendered at the
wrong size. Nothing needed a judgement call about what it was.

The 11px-vs-12px conflict itself is real and is filed as `[skills]`. It should be reconciled in one
place rather than re-argued by each audit.

## Measured before / after

Method: `npm run build`, `dist/` served on its own port (`dist-static-auto`, per the singleton-daemon
note in `.claude/launch.json`), then Playwright reading **computed styles and
`getBoundingClientRect()`** across all 20 built pages at 375px and 1280px. Not a grep of the CSS —
the first grep of this session missed every `font:` shorthand and would have left `.pl-frow dt`,
`.unit-k` and both `Credentials` labels at 10.5px.

### Type

| | Before | After |
|---|---|---|
| Smallest rendered type, sitewide | **9.5px** (`.bcard-unit`, `/cpd-building-tas`) | **11px** |
| Distinct selector+size combinations under 11px | **22** | **0** |
| Declaration sites under 11px in `src/` | **24**, in 10 files | **0** |

Raised: `.bcard-unit` 9.5; `.ht-eyebrow` `.ht-n` `.vd` `.l` `.wl` `.lab` `.bt-sub` `.mr-clabel`
`.bc-lic-k` `.bc-row dt` `.mlabel` `.mfeat-k` `.bg-h` `.bg-sub` and three styleguide specimen labels
10; `.mc-fig-k` `.fxrow dt` `.blurb-k` `.pl-frow dt` `.unit-k` `.unit-t thead th` `.bc-foot` 10.5.
The 10.5px group moved together on purpose: `UnitOutline.astro:154` and `Credentials.astro:328`
both document them as one shared label metric, and splitting them would have made that comment false.

`ProcessTrack`'s `clamp(9.5px, 1.8cqw, 11px)` was replaced by a flat 11px. That clamp bought a
one-line rail by paying for layout with legibility; the connectors are `flex:1 1 auto` and absorb
the slack instead.

### Tap targets

WCAG 2.5.8 AA is 24x24, with an inline exception and a spacing exception. The house rule is 44px.

| Element | Before | After | Change |
|---|---|---|---|
| `.pagebar .reviewed a` | **15px** | 24px | `inline-flex` + `min-height` |
| `.person a.pl` | **17px** | 24px | `padding-top` (keeps the underline on the word) |
| `.pagebar .crumbs a` | **19.1px** | 24px | `inline-flex` + `min-height` |
| `.unit-verify` | **21.1px** | 24.1px | `padding-top:3px` |
| `.pl-verify` | **23.1px** | 24px | `inline-flex` + `min-height` |
| `.portal-btn` | **43.9px** | 44px | `min-height`, as the filing asked |

**Exempt by measurement, not by assumption.** Footer nav links render 18px tall but sit **31.1px**
centre-to-centre, so a 24px circle on each never intersects its neighbour's: the 2.5.8 spacing
exception applies and they pass unchanged. The 9 remaining sub-24px links are all `.verified
.v-body a` — citation links inside running source text with an 18.6px line-height — which is the
2.5.8 inline exception exactly. Both were checked with a distance computation across every
interactive element on every page, not eyeballed.

### Load-bearing heights, checked against a stashed baseline

`--head-h` and `--waynav-h` feed `.sec { scroll-margin-top }`, so a chrome fix that grows either
breaks every in-page jump on the site. The header measured 67px against a declared `--head-h:66px`
and the waynav 66.1px against 65px — which looks exactly like a regression this session caused.

It is not. The changes were stashed, the site rebuilt, and the baseline measured:

| | Baseline | After |
|---|---|---|
| `.site-head` height | 67px (`--head-h:66px`) | **67px, unchanged** |
| `.waynav` height @1280 | 66.1px (`--waynav-h:65px`) | **66.1px, unchanged** |
| `.pagebar` height @1280 | 42.1px | 47px (intended) |
| `/styleguide` doc overflow @375 | 182px | 182px, unchanged (pre-existing) |

Both token drifts are pre-existing and are filed as `[design]`. Without the baseline this session
would have either reported them as its own damage or, worse, "fixed" a 1px drift it did not cause.

## The claim this session wrote and had to withdraw

The `ProcessTrack` comment was written to read:

> Measured on all 20 built pages, 375px and 1280px: no rail overflows its container.

**That was written before the measurement.** The measurement then found `/experts/warwick-smith`
overflowing its rail by 8px at 375px, because `.ht-node` carried an unconditional
`white-space:nowrap` and "Operational design for training organisations" rendered a 327px node
inside a 319px rail. The overflow was pre-existing at 7px; the 10px -> 11px bump grew it to 8px.

Fixed properly rather than reverted: `nowrap` now applies only inside the `@container (min-width:560px)`
query, where the single-line rail actually needs it. The rail is `flex-wrap:wrap` by default
precisely so narrow columns wrap, and a node that could not wrap defeated that. Re-measured: **0px
rail overflow on all 20 pages at both widths**, and the comment now says something true.

A dead `.ht-node .ht-t { min-width: 0 }` rule was also written in the same edit, for an element the
markup does not have. Removed. The frontmatter comment claiming "font scales with the column" was
stale after the clamp came out, and now says what the component does.

## Verification

| Check | Result |
|---|---|
| `npm run build` | green, 20 pages, guardrails 21/21 passed |
| `node scripts/system-health.mjs` | no FAIL; WARN set identical to pre-flight, none new |
| `node scripts/check-claims.mjs` | 0 failing, 12 ok |
| `node scripts/demand-split.mjs` | design **46 -> 42 open, 30 -> 38 closed** against `origin/main`: 8 closed, 1 null removed, 5 new design items filed (3 more went to skills) |
| Styleguide specimens | render; no component gained or lost a specimen |
| Smallest rendered type, 20 pages x 2 viewports | 9.5px -> **11px** |
| Rail overflow | 8px -> **0px** |
| Tap targets failing 2.5.8 after both exceptions | **0** |

Nothing in `kb/register/**`, `.claude/skills/**`, `pipeline/**` or any token was touched. No
`--*` custom property changed value, so rule 7's exclusivity was not engaged.

## Demand list
Tag every item: [skills] | [design] | [facts] | [build]

- [skills] **The audit's 12px type floor contradicts DESIGN.md's 11px Label token.**
  `references/verification.md:110` says "Meaningful text >= 12px"; DESIGN.md:50 and :190 set the
  Label token at DM Mono 11px, and CLAUDE.md makes DESIGN.md canonical on conflict. Every readability
  audit that has run on this repo has filed 11px mono labels as breaches, and every design session
  reading those items has to re-derive that they are not. Reconcile it in one place — either state
  the 11px mono exception in `verification.md`, or change the token deliberately in an exclusive
  session. Three separate filings on this list came from that one unreconciled sentence.
- [skills] **`demand-split`'s null-item match is too narrow, and a null declaration routes as work.**
  `isPlaceholder` anchors on `^(none|n/a|nil|nothing)\b[\s.-]*$`, so `- [design] none.` is dropped
  correctly but `- [design] none outstanding; the bullet treatment is now live...` parsed as a real
  item and sat on the design handover for five days. Reworded at source here, but at least one more
  survives: `- [facts] none - all figures carried verbatim...` is item 30 of `handover-facts.md`
  today. Broaden the match to a leading `none`/`nil`/`nothing` followed by explanatory prose.
  Second occurrence, so the trigger has fired.
- ~~[skills] **`src/layouts/**` has no owner in the session-types table.** This session edited
  `CpdBundleLayout.astro:278` — a `font-size` inside the layout's own `<style>` block, and the site's
  smallest type at 9.5px. The table gives design `src/components/**`, `src/styles/**` and the
  styleguide; it gives build `src/content/**`; nothing names `src/layouts/**`. Read strictly, the
  smallest type on the site could not be fixed by any session type. Taken as design's, on the
  grounds that a layout's `<style>` block is component styling — but that is a judgement call at a
  boundary and is recorded here rather than left to be discovered. Assign it, on the
  `content.config.ts` / `SYSTEM.md` precedent. Same shape as the open `.claude/launch.json` item.~~
  Assigned to design, 4 Aug 2026, on exactly the judgement call this item made — see CLAUDE.md's
  session-types section and
  `skill-reviews/skills/2026-08-04-provenance-gate-and-path-ownership.md`.
- [design] **`--head-h` is 66px and the header renders 67px; `--waynav-h` is 65px and the bar renders
  66.1px** (46px vs 46.8px below 900px). Measured on a stashed baseline, so both predate this
  session. Both tokens feed `.sec { scroll-margin-top }`, so every anchored jump on the site lands
  ~1px shallow. Small, harmless today, and exactly the kind of drift that stops being harmless when
  someone later trusts the token instead of the box. Token change, exclusive session.
- ~~[design] **`/styleguide` scrolls 182px horizontally at a 375px viewport.** Pre-existing and
  unchanged by this session. Internal and `noindex`, which is why it has survived, but it is the one
  page whose job is to show components behaving.~~ **Already fixed, struck 10 Aug 2026 — and this
  session did not fix it.** Measured on a `git stash`ed baseline with every 10 Aug change removed:
  `documentElement.scrollWidth - innerWidth` is **0px** at a 375px viewport, and zero elements
  overflow the viewport outside an `overflow-x` container. The fix was almost certainly
  `2026-08-01-styleguide-scroll-containing-block.md`, filed the same day as this item, which is why
  the two never met. Struck rather than re-fixed: the item was stale, not open. This is the class
  `demand-split` was made to surface — an item nobody closed because the session that fixed it was
  not the session that filed it.
- [design] **`.bc-foot` is mono reading copy, not a label.** It was 10.5px and is now 11px with the
  rest of the Label token, but its content is a sentence ("Add 1 further point from another approved
  activity to reach 12."), so mono micro-type is the wrong treatment regardless of size. It wants
  `Footnote`'s 14px `--slate`, which is what every other piece of fine print on the site uses.
- [design] **`li` renders 11.5px on 13 pages**, between the Label token and body. Above the register
  so not drift beneath it, and out of scope for this session's rule, but it is a fourth size in a
  micro-type system that documents one. Worth a look at where it comes from.
- [design] **A tap-target and type floor is enforced by nothing.** This sweep was hand-run, and the
  24 sub-register declarations it found accumulated across ~10 sessions that each shipped green.
  The measurement harness is ~80 lines of Playwright and exists in this session's scratchpad only.
  Second occurrence would justify making it a script; recording it as the first.
