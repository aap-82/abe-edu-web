---
date: 2026-08-10
skill: skills-session
subject: check-reflow measured redirect stubs as their targets
verdict: Green
graded_by: self
---

# Skills review — redirect stubs in `check-reflow`, 2026-08-10

## Verdict

**Green.** A mislabelling defect in a check shipped earlier the same day, found by reading its own
output rather than by a failure, fixed and tested end to end on a real redirect stub. A second,
unrelated no-op was found in the same file and corrected.

## Pre-flight

`node scripts/system-health.mjs` — **0 failing**, 38 warning, 70 ok.

## The defect

`check-reflow.mjs` drives a real browser. Astro emits a static redirect as a **real HTML file**
carrying `<meta http-equiv="refresh">`, and a real browser **follows it**. So requesting `/` landed
on `/qld-owner-builder-course`, measured that page, and filed the numbers under `/`.

Two consequences, both silent:
1. **Every `/` row was mislabelled** — the numbers were real, they just belonged to another page.
2. **One page was measured twice under two names**, inflating any count over the corpus.

**The evidence was in the first budget table this script ever produced**, committed this morning:

```
'/': 1,
'/qld-owner-builder-course': 1,
```

Both exactly 1, because they were the same page. It read as a coincidence and was not.

**Nothing shipped wrong from it.** The CPL work it drove was real, the fixes were verified
independently by a 1,142-paragraph width diff, and `CPL_BUDGET` is now empty. The cost was
confined to labels — but a check whose rows can name the wrong page is a check that will eventually
be believed about the wrong page.

## How it was found

Not by a failing check. Andrey asked whether the site has a sitemap; answering it meant reading
`dist/sitemap-0.xml`, noticing the homepage was absent, and confirming why — `astro.config.mjs:71`
redirects `/` to `/qld-owner-builder-course`, and `dist/index.html` is a 391-byte stub. Which
immediately contradicted a `check-reflow` line from that morning reporting `.sec p` at 88 CPL on
`/`. A 391-byte stub has no prose.

Worth recording because it is the second time today that **answering an unrelated question surfaced
a defect no gate could see** — the first being the insurance CTA that pointed at a course checkout,
found while looking for missing cross-links.

## The fix

After navigation, compare the landed pathname to the requested one; if they differ, the URL is a
redirect stub, so skip it. The target is always measured under its own slug anyway, so skipping is
correct rather than lossy. Trailing slashes normalised, because the server resolves `/slug` and
`/slug/` to the same file.

**Reported, not dropped.** The run now prints `Skipped N redirect stub(s), measured at their target
instead: …`. A check that quietly measures fewer pages than it appears to is the "no silent caps"
failure `SKILL.md` names — the count reads as full coverage when it is not.

## A second defect found in the same file

The slug filter read:

```js
slugs.filter((s) => !s.startsWith('_') && s !== 'styleguide' || s === 'styleguide');
```

which looks like it makes a decision about the styleguide and does not: `&&` binds tighter than
`||`, so the third clause re-admits exactly what the second excluded, and the whole expression
reduces to `!s.startsWith('_')`. **A no-op wearing the costume of a rule.** Rewritten to what it
actually does, with a note that `/styleguide` is measured *deliberately* — it is the one page whose
job is to show components behaving, so a defect there is worth catching even though it is internal
and noindex.

## Measured

| Check | Before | After |
|---|---|---|
| Rows labelled `/` | **2** (one per viewport), carrying `/qld-owner-builder-course`'s numbers | **0** |
| Distinct pages measured | 22 real + 1 phantom | **22 real** |
| `/qld-owner-builder-course` rows | 2 | **2**, unchanged |
| Redirect stubs reported | not reported | **1**, named in the output |
| Slug filter | 3 clauses reducing to 1 | 1 clause |

**Tested end to end on a genuine stub, not just on `/`.** A second Astro-shaped redirect file was
written into `dist/`, and the check reported **`Skipped 2 redirect stub(s) … /, /zz-testredirect`**
while the row total stayed at 44 — proving the skip fires on the real mechanism (meta refresh →
browser follows → pathname mismatch) and is conditional rather than always-on. `dist/` was then
regenerated with `npm run build` rather than deleted, since `rm -rf` is banned by `CLAUDE.md` and
`dist/` is build output.

Gates after: `system-health` **0 failing**, `check-claims` **0 failing**, `check-reflow` **0
failing**, build 26/26 guardrails.

## What worked

Following up a number that did not make sense. "88 CPL on a 391-byte redirect stub" was the whole
finding; everything after it was mechanical.

## What didn't

I wrote both defects this morning. The redirect case is a genuine blind spot — I reasoned about the
server (which serves the stub correctly) and not about the browser (which follows it) — but the
filter expression was simply not read carefully enough before shipping, and it is the kind of thing
that looks deliberate forever once committed.

Also, the first attempt to test the skip used `sed` with an escaping error, silently changed
nothing, and produced output identical to a pass. I caught it by grepping the file for the marker
rather than trusting the run, then wrote the real end-to-end test instead. **A test that cannot
fail looks exactly like a test that passed** — the same lesson the ratchet verification learned this
morning, met again from the other direction.

## Demand list
Tag every item: [skills] | [design] | [facts] | [build]

- [skills] **`check-reflow` still has a ceiling and no floor** — carried forward unchanged from
  `2026-08-10-check-reflow.md`, and unaffected by this fix. A cap that silently collapses to a
  narrower value passes it. Second filing.
- [build] **`/` is a redirect stub and cutover must not happen that way.** `astro.config.mjs:69`
  carries `TODO(cutover): replace with the real homepage in Wave 5 — cutover must not happen with a
  redirecting root`. Now also visible in `check-reflow`'s output every run, which is a better place
  for it than a config comment nobody opens. Wave 5 work, recorded here because the skip line will
  disappear the day a real homepage lands, and its disappearance is the signal.

## Output
- [x] Fix applied — redirect-stub skip + reporting, and the slug-filter no-op rewritten

## Grader note

`graded_by: self` — no fresh-subagent skills grader (rule 10). Mitigated by the fix being tested
against a synthetic stub rather than only against the one case that prompted it, and by the
before/after row counts being taken from the tool's own `--json`.
