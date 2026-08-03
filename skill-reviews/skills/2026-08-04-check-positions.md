---
date: 2026-08-04
skill: skills-session
subject: check-positions
verdict: Green
graded_by: self
---

# Skills review — the `check-positions` guardrail, 2026-08-04

Self-graded: there is no fresh-subagent skills grader yet (CLAUDE.md session-types rule 10).

## Verdict

**Green.** `handover/HANDOVER-todo-2026-08-02.md` item 5, built to its own stated DoD: the check
fails on a known instance before the copy is fixed. It does, on the first run, without needing to
manufacture a test case — `/white-card-tas`'s unsourced "Tasmanian residents only" framing has been
live and unfixed since the 3 Aug facts session found it. The run also surfaced one location that
session's own count missed.

## What shipped

`scripts/check-positions.mjs` (new), wired into `scripts/system-health.mjs` as a fifth check
beyond `check-freshness`, and named in `SYSTEM.md` §5 so `check-claims`'s own §7 claim-drift check
(which asserts §5 names every check that exists) did not immediately fail on the addition.

Two mechanisms, both reporting-only, both reading `kb/register/` but never writing to it:

1. **`POSITIONS`** — a hand-curated table, same shape as `check-claims.mjs`'s superseded-unit-code
   and bare-"ABE" checks: a banned phrasing, the register assertion it contradicts, and why.
   Scanned across `src/content`, `src/data`, `src/components` and `src/pages`, skipping comment
   lines. Three entries:
   - `tas-online-residency` — bans "Tasmanian resident(s)", "resident of Tasmania" and "evidence
     your/of residency", citing `online-delivery-policy-by-state.md` §2D/§3.
   - `wa-online-residency-shorthand` — bans the bare "WA residents" shorthand the register itself
     carried until 1 Aug 2026, citing §2B. A regression guard: 0 hits today.
   - `nsw-online-misattribution` — bans "SafeWork NSW ... permits/accepts/provides for ...
     online/connected/distance/virtual/self-paced", the exact clearing argument that failed for
     `/white-card-nsw` on 1 Aug 2026, citing §2A/§2A-1. A regression guard: 0 hits today.
2. **SiteHeader nav authority parity** — `guardrails.ts`'s `FORBIDDEN_BY_AUTHORITY` list,
   re-applied directly to `SiteHeader.astro`'s own nav data (Owner Builder and CPD groups; White
   Card is skipped, since RTO/"nationally recognised" is that group's *true* claim). This is the
   mechanism the 2 Aug design review asked for by name: `guardrails.ts` deliberately excises the
   whole `<header>` from every page it audits, to avoid flagging the White Card group's legitimate
   claim when it renders on an Owner Builder page — which means it structurally cannot see a WRONG
   claim IN the header's own source either. 0 hits today (the NSW OB claim this would have caught
   was already fixed on 2 Aug).

## Measured, before and after

| Measure | Before | After |
|---|---|---|
| `system-health` FAIL count | 1 (`manual_fix_passes` trend, unrelated — see below) | 2 |
| Checks `system-health` runs beyond `check-freshness` | 4 | 5 |
| Scripts named in `SYSTEM.md` §5 | 10 | 11 |
| `npm run build` | green, 22/22 guardrails, 21 pages (unchanged — this check runs at `system-health` only, never at prebuild or in `guardrails.ts`) | unchanged |
| Locations flagged by `tas-online-residency` | — | **12**, across 5 files |
| Of those, named by the 3 Aug facts review's own count | — | 8 (`white-card-tas.mdx` ×7, `faqs-white-card-tas.ts` ×1) |
| Of those, **not** named by that review | — | **4**: `white-card-nsw.mdx:158`, `faqs-white-card-nsw.ts:32` (both cross-references to TAS on the NSW page), and **`SiteHeader.astro:64`** — the site chrome, on every page that renders it |

The `system-health` FAIL count rising from 1 to 2 is the DoD, not a regression: the second FAIL is
the TAS finding itself, already a filed `[build]` item since 3 Aug
(`skill-reviews/facts/2026-08-03-tas-git-delivery.md`). The pre-existing FAIL
(`manual_fix_passes` trend, from the `/white-card-qld` Stage-9 review) is unrelated to this session
and tracked separately as `handover/HANDOVER-todo-2026-08-02.md` items 9 and 10.

## What this found that nobody had named yet

`SiteHeader.astro:64` — `{ code: 'TAS', name: 'White Card TAS', href: '/white-card-tas', desc:
'Online and self-paced for Tasmanian residents' }` — carries the identical unsourced residency
claim, on the site's own nav chrome, rendered on every one of the 17 pages that show it. The 3 Aug
facts review's demand item lists seven locations, all in `white-card-tas.mdx` and its FAQ; it could
not have found this one, because a facts session does not read `src/components/**` looking for a
delivery-mode claim, and nothing before this check would have told it to.

This is exactly the design review's prediction from 2 Aug
(`skill-reviews/design/2026-08-02-siteheader-nsw-claim.md`: "the nav's per-item `desc` is the same
class of claim on 17 pages at once, and should be in that check's scope when it is built") —
confirmed on the first real run, on a different state than the one that prompted the prediction.

## What was deliberately not built

- **A QLD "remoteness exception" regression guard.** The register's §2C history names a superseded
  "100km rural" framing as the old wrong claim. `/white-card-qld` already discusses it — but only to
  correctly refute it ("That rule existed once, but it was replaced..."), so a naive banned pattern
  would have fired on the CORRECT explanatory sentence, not a defect. Building a safe version needs
  the same negation-window machinery `guardrails.ts`'s `isAsserted()` and `check-claims.mjs`'s
  `EXPLAINS_RETIRED`/`EXPLAINS_BANNED` use, and this session's WA/NSW entries got away with a
  simpler comment-line-only exemption because their false positives all happened to live inside
  comments. QLD's doesn't. Left for a session that wants to build that machinery properly rather
  than bolt on a narrower pattern and hope.
- **A generic per-`authorityModel` sweep of `src/content/**` prose**, mirroring `guardrails.ts`'s
  full `FORBIDDEN_BY_AUTHORITY` at the source level for every course page. Not needed: guardrails.ts
  already does this at build time against the rendered page body, correctly. The only proven gap
  was the header it deliberately excises — closed above — not the page bodies it already covers.

## Session type held

Only `scripts/check-positions.mjs` (new), `scripts/system-health.mjs`, `SYSTEM.md` and
`handover/HANDOVER-todo-2026-08-02.md` — all skills-owned. Read but did not write: `kb/register/**`,
`kb/rules/authority-model.md`, `src/content/**`, `src/data/**`, `src/components/SiteHeader.astro`.
The TAS defect this check surfaces, including the new SiteHeader location, is left for the sessions
that own those files — filed below, not fixed here.

`system-health` run at open (1 failing, 30 warning, 48 ok) and after (2 failing, 30 warning, 51 ok —
+1 fail is the intended finding, +3 ok are this check's own three passing entries).

Not shipped — working tree only, pending Andrey's review.

## Demand list
Tag every item: [skills] | [design] | [facts] | [build]

- [design] **`SiteHeader.astro:64`'s TAS nav card states "Online and self-paced for Tasmanian
  residents" — the same unsourced residency claim `skill-reviews/facts/2026-08-03-tas-git-delivery.md`
  found in `white-card-tas.mdx` and its FAQ, in a location that review's count did not cover.**
  Unlike that review's items, this file is design-owned, not build-owned — flagging it here rather
  than folding it into the existing `[build]` item, since a build session may not touch
  `src/components/**`. Do not reword it to "located in Tasmania" the way the WA fix did until
  Blue Dog's actual RTO delivery-location scope is checked (per the facts review's own caution) —
  the true gate may be narrower or broader than either wording.
- [build] **`white-card-nsw.mdx:158` and `faqs-white-card-nsw.ts:32` both restate the TAS residency
  claim as a comparison point** ("available only to Western Australian and Tasmanian residents").
  Not named by the 3 Aug facts review (which read `white-card-tas.mdx`, not the NSW page), but the
  same defect by the register's own §3 instruction: "Do not state a residency test for TAS... including
  as a comparison point on another state's page." Fix alongside the `white-card-tas.mdx` item once
  the correct TAS wording is settled — these three files should not say three different things.
- [skills] **A QLD remoteness-exception regression guard for `check-positions` needs a
  negation-aware match, not a bare banned phrase** — see "What was deliberately not built" above.
  `/white-card-qld` already correctly refutes the superseded claim in prose, and a bare pattern
  would flag the refutation. Worth building once another check needs the same
  negation-window machinery, rather than duplicating a narrower one-off here.
