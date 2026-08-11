# HANDOVER — session close, 11 August 2026

## Status: OPEN — this is the starting point for the next session

Covers 8-11 August across four session types. Everything below is pushed and live; the working
tree is clean and `system-health` reports **0 failing**.

---

## Start here

```powershell
node scripts/system-health.mjs
```

Then pick from **Where to start next**, below. Nothing in this note is blocked on anything else in
it, so the order is a recommendation, not a dependency chain.

---

## What shipped, in one line each

**Pages (build)**
- `/owner-builder-insurance` (W2-6) — full pipeline, independent Stage 7.
- `/project-advisory` (W2-7) — full pipeline, independent Stage 7, $89, `Product` schema.
- Cross-links from four owner-builder state pages into both new pages.
- Reviews hero image wired; false Afterpay claims removed from two live pages.

**Checks and tooling (skills)**
- `scripts/check-reflow.mjs` — first check that renders a page. Closes a ROADMAP Phase 3 candidate.
- `scripts/page-status.mjs` + `scripts/status-board.mjs` — per-page status, measured from `dist/`.
- `review-trends.mjs` false-trend fix; `check-claims` and SYSTEM.md kept in step.

**Design**
- The measure defect closed on its sixth filing, then **all 35 CPL breaches cleared** and
  `CPL_BUDGET` emptied the day it was created.
- `/styleguide` stopped demoing white cards on a white ground.

**Documents (skills)**
- `ROADMAP.md` current to 11 Aug. `new site/abe-new-site-sitemap.md` re-ticked against `dist/`.
- `page-type-engine.md`'s three stale Owner Builder slug rows corrected.

---

## Where to start next

**1. FPO image placeholders — 13 indexable pages, 20 wells.** The most-filed open item in the repo
and the only one visible to customers: an unfilled slot publishes its own art direction as body copy.
- ~~**Build a guard** so an `index,follow` page cannot ship placeholder text again.~~ **DONE
  11 Aug** — `FPO_BUDGET` in `guardrails.ts`, ratcheted, noindex pages exempt. Detects the FPO
  wrapper structurally rather than its text, and **that immediately proved every previous count
  wrong**: the four filings, this note's own "12 pages", and the status board were all produced by
  grepping "Image placeholder", which is a default `label` that `Credentials.astro` overrides twice.
  `/white-card-wa` and `/white-card-tas` were reported clean while each shipped an RTO logo well.
  **True scale: 13 indexable pages, 20 wells.** `page-status.mjs` corrected to match.
- **Still open: generate the images.** Prompts in `handover/HANDOVER-image-prompts-2026-08-02.md`
  and `pipeline/{owner-builder-insurance,project-advisory}/06-image-prompts.md`. Lower each
  `FPO_BUDGET` line as a page is filled; the build fails if a count drops without the budget
  following. **Six of the 20 are RTO partner logos and expert portraits, not page art** — a
  different ask, already filed as "Blue Dog, AlertForce and Upskill each need a supplied logo asset
  plus a `logo:` line in their partner record".

**2. ~~Two no-op CTAs, live.~~ DONE 11 Aug.** `/white-card-tas` and `/qld-owner-builder-course` set
`cta.href` to `#enrol`, and `Hero.astro:55` hardcodes `id="enrol"` on its own anchor — so those
buttons linked to themselves and clicking moved the page nowhere. **9 dead CTAs across the two
pages, now 0**, repointed to each page's `#cost` section, the one that answers what the labels
promise. Verified in a live browser by measuring the distance each CTA travels to its target rather
than by reading the markup. Stage 7 re-verified on both in the same commit.
**The underlying trap is still live and is now the interesting part:** `Hero.astro` emits
`id="enrol"` on its own primary anchor unconditionally, so any page that ever sets `cta.href` to
`#enrol` reproduces this silently. Three pages did. **No check can see it** — `guardrails.ts`
check 6 and `check-links.mjs` both ask only whether the id *exists*, and Hero creates it. Filed
`[skills]`: either stop Hero emitting a fixed id, or teach the anchor check to fail a link whose
target is the link itself.

**3. ~~The hub cannot cross-link to either new page.~~** **Done 12 Aug 2026 (`904f487`), and this
item was wrong about why.** It claimed the `hubs` schema has no field for a cross-link and that the
fix needed one field in skills-owned `content.config.ts` or a `HubLayout.astro` change — which is
what ranked it as a cross-session-type item nobody could take alone.

`HubLayout.astro:96` **already renders `<slot />`**, between `#spokes` and `#compare`, documented
there as "freeform body content (e.g. a 'why ABE' section) — optional, from the hub's own MDX".
Neither hub had ever used it, so the slot rendered nothing and the body looked structurally
impossible rather than merely empty. **The capability existed and was unexercised.** The fix was
content only: a "Beyond the course" section in `owner-builder-courses.mdx` with two `ResourceLink`s
and a wayfinder entry. No schema change, no layout change, no boundary crossing, one session type.

**The lesson is the misdiagnosis, not the gap.** "The body is empty" was observed correctly and then
read as "the body cannot be filled". Those are different claims, and the second was never checked
against the layout — which is the same shape as the withdrawn-robots-rule finding: reading an
artefact and finding X absent cannot tell you whether X is impossible or merely unused. Read the
component before recording what a page structurally cannot do.

*Disclosed crossing: `handover/**` is skills-owned and the session that struck this item and wrote
this correction was declared **build**. Done anyway, on the reasoning behind "any session may close
an item it has just fixed" — a closure states a fact about status, and this one also removes a false
constraint that would otherwise mislead the next session into scheduling a schema change that is not
needed. No other item on this list was touched.*

**4. `verification.md` has no step telling Stage 7 to check the design register first.** Third
sighting. It is why independent auditors keep re-opening findings the register already settled.

---

## What needs Andrey, not a session

- **The InsuranceTek quote destination.** `/owner-builder-insurance` is live and its only CTA
  resolves to `#arrange`, its own section, because no quote URL, form or number exists anywhere in
  the repo. The page answers the insurance question correctly and sourced; it just cannot convert.
- ~~**`.mr-title` is 18px against DESIGN.md's 22px Title step.**~~ **DECIDED 11 Aug: 22px**, shipped
  in `3966284`. The objection that had deferred it three times was measured rather than re-argued
  and does not materialise where it mattered: on ACT, the twelve-title worst case, **nothing wraps
  at 1280px at either size**, so the one-line-per-row index rhythm survives. Cost is on mobile,
  where the same 8 of 12 already wrapped and two moved to three lines (+6% section height). All six
  consumers verified at both viewports. `skill-reviews/design/2026-08-11-mr-title-22px.md`.
  **Its successor is a design session's, not Andrey's:** `.faq summary` (`global.css:1000`) is now
  the *only* holder of the undocumented Archivo 600 18px, so the choice is a clean either/or —
  raise it to 22px, or add 18px to DESIGN.md §3 as a documented accordion-trigger step. Adding a
  step is a register change and therefore an exclusive session (rule 7); raising it is not.

**One gate before advertising:** `/project-advisory` states "56 pages", read from ABE Education's own
live sales page. It is the one figure a buyer can hold against what they receive. Confirm it before
the URL is promoted.

---

## Dependencies — ~~checked 11 Aug, deliberately NOT changed~~ **bumped 12 Aug 2026**

`CLAUDE.md` forbids touching `package.json` without being asked, and `package.json` is on the
deliberately-unassigned list. Reporting rather than acting:

| | |
|---|---|
| Behind latest | `astro` 7.0.6 → 7.2.0, `@astrojs/mdx` 7.0.2 → 7.0.5, `@astrojs/check` 0.9.9 → 0.9.10, `secretlint` 13.0.2 → 13.0.4 |
| `typescript` | 6.0.3, latest 7.0.2 — a **major**, so not a routine bump |
| `npm audit` | 6 findings: 1 moderate (`astro`), 5 high (`fast-uri`, `js-yaml`, `nanoid`, `postcss`, `svgo`) |

**None of the six reaches a visitor, and that was verified rather than assumed.** The five high
findings are build-toolchain packages — grepped for in `dist/_astro/*.js`, none present, because a
static build ships HTML and CSS. The moderate one is Astro's reflected XSS **via View Transition
animation properties**, and this site does not use View Transitions (`grep` for `ViewTransitions`,
`transition:name`, `transition:animate`, `astro:transitions` across `src/` and `astro.config.mjs`
returns nothing).

**Recommended, as its own change with a human in it:** bump Astro 7.0.6 → 7.2.0 and re-run the full
gate suite. It clears the only advisory touching shipped output and is a minor version. Do not run
`npm audit fix` blind — it can pull majors, and `playwright` (added 10 Aug for `check-reflow`) makes
the tree larger than the checks that guard it.

### Outcome, 12 Aug 2026 — done, by Andrey running `npm update`

The 11 Aug reading above was accurate: live `npm outdated` matched it exactly a day later. All five
bumps sat **inside their existing `^` ranges**, so `package.json` never changed and only
`package-lock.json` moved. `astro` 7.0.6 → **7.2.0**, `@astrojs/mdx` → 7.0.5, `@astrojs/check` →
0.9.10, both `secretlint` packages → 13.0.4, `@astrojs/sitemap` → 3.7.3. **`typescript` held at
6.0.3** — 7.0.2 is a major and the caret correctly refused it.

**`npm audit`: 6 findings → 0.** Better than predicted. The note expected only the Astro moderate to
clear; the five high build-toolchain advisories went too, via transitive updates, and no
`npm audit fix` was run.

**The bump changed exactly one thing in shipped output, and it was verified rather than assumed.**
Every one of the 26 built HTML files changed hash, which looks alarming and is not: diffing the new
build against the **pre-bump build still being served live** showed the sole difference is that Astro
7.2.0 emits the scoped `.ph-img` rule *after* `.howtrack` instead of before. **Non-CSS diff: 0 lines
on every page sampled** — same markup, same copy, same `<img>` srcs, same schema.

A reordered CSS rule is the exact shape that silently loses a specificity contest, so it was measured
in a browser rather than reasoned about: all four `.ph-img` images on `/qld-owner-builder-course`
still compute `object-fit: cover` and `display: block`. There are **24 such images across 12 pages**
— a count that took two attempts, because `grep 'class="ph-img"'` returns **zero**: the real
attribute is `class="ph r45 ph-img"` and an exact-match grep misses every one of them.

**One false alarm worth recording so it is not re-investigated.** Those images report
`naturalWidth: 0` in the local preview and look broken. They are not: the local static server sends
**no `content-type`** for `.avif`, so the browser will not decode them. Cloudflare sends
`image/avif` for the byte-identical 14,400-byte file. A local-preview artefact, present before and
after the bump, and nothing to do with dependencies.

Gates after: `npm run build` 26/26 guardrails, `npm run check` 0 errors / 0 warnings, `check-claims`
0 failing, `check-links` 0 failing, `check-reflow` 0 failing, `system-health` 0 failing.

---

## Things a fresh session will otherwise rediscover

- **The `ch` unit is not characters.** `1ch` is the advance of "0" — 12.42px in DM Sans 18px against
  an 8.41px average character. `max-width: 66ch` renders ~92 CPL. This caused three separate defects
  and survived six filings. Cap measure in **px**. `global.css`'s `.capsule` carries the arithmetic.
- **`check-reflow` has a ceiling and no floor.** It passed a change that silently collapsed 307
  component paragraphs to 480px, because a narrower line never breaches an upper bound. Every other
  gate passed it too. It was caught by a before/after width diff over 1,142 paragraphs, and that
  script was ad hoc. Filed `[skills]`.
- **PowerShell 5.1 is the shell here.** `&&` is a parse error, and `>` writes UTF-16LE with a BOM —
  which silently produced a `status.json` that `JSON.parse` could not read. Use `--out` flags and
  `if ($LASTEXITCODE -eq 0)`. See `handover/HANDOVER-status-board.md`.
- **A ratcheted budget forces a session-type crossing.** The budget always lives in a skills-owned
  file and its debt in design- or build-owned files, so paying down debt cannot be completed inside
  one session type. Two sightings; three options are recorded in ROADMAP's Phase 3 section.

---

## Backlog, as at 11 Aug

`skills` 114 open · `design` **47** · `build` 31 · `facts` 12. Regenerate with
`node scripts/demand-split.mjs --write`; the four `reports/handover-*.md` files are derived views and
gitignored, so they are absent until generated.

**Reviews filed this session:** four design/skills reviews under `skill-reviews/`, plus two
independently-graded page reviews. `system-health` reports 0 failing, 38 warning, 70 ok.
