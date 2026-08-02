---
date: 2026-08-02
skill: design-session
subject: siteheader-nsw-claim
verdict: Green
graded_by: self
---

# Design review — the NSW Owner Builder claim leaves the site chrome, 2026-08-02

Self-graded: there is no fresh-subagent design grader yet (CLAUDE.md session-types rule 9).

## Verdict

**Green.** One line changed, the claim is gone from every built page, and the change used the
component's own existing inactive-state pattern rather than inventing a treatment. Layout is
byte-for-byte unchanged in box terms (354x67 desktop card, same as its four live siblings), no
token or design-register change was needed, and the build, guardrails, `check-claims` and
`system-health` are all as green after as before.

Green rather than Amber because nothing was shipped against a rule and nothing needed adjudication:
the brief named the fix, the file already had the pattern, and the one thing the brief told me not
to touch (the `--slate-light` contrast) I verified was correctly hands-off rather than taking it on
trust.

## What shipped

`src/components/SiteHeader.astro`, one data line plus a comment block:

```
- { code: 'NSW', name: 'NSW Owner Builder', href: '/owner-builder-nsw-course', desc: 'Nationally recognised, with our RTO partner' },
+ { code: 'NSW', name: 'NSW Owner Builder', soon: true, desc: 'In development' },
```

`desc` is `'In development'` to match the two entries already using that exact string for the same
inactive state (`White Card QLD`, `White Card ACT`, lines 62 and 65). No launch date, no RTO, no
price, per the brief.

The comment block above it records *why* NSW is inert, because the distinction is not visible from
the data: every other `soon` in this file means "no page yet", while NSW means "authority hold on a
page that exists". The White Card TODO immediately above says "restore the href the moment a state's
White Card page ships", and that instruction is wrong for NSW — both NSW OB pages already exist.
Without the comment, the next person to sweep this file for stale `soon` flags would find two pages
on disk and restore the link.

## Measured, before and after

Counted across all 20 built pages in `dist/` (17 carry the site chrome; `dist/index.html` and three
others render no `.site-head` at all, which is why the page count is 17 and not 20).

| Measure | Before | After |
|---|---|---|
| `href="/owner-builder-nsw-course"` anchors, all pages | **34** | **0** |
| Pages carrying at least one such anchor | 17 | 0 |
| Of those, `meta robots index,follow` | **13** | **0** |
| `"Nationally recognised, with our RTO partner"` occurrences | **17** | **0** |
| Inert `NSW Owner Builder` cards rendered | 0 | 17 |
| Indexable pages attributing RTO 45708 to Owner Builder | (see note) | **0** |

34 anchors across 17 pages is two per page: the desktop megamenu card and the mobile nav row both
render from the same `items` entry, via `card()` and `mSub()`. The brief described the second one as
"the footer link group"; it is actually the mobile nav (`.mnav .bg` group). One data edit fixed both,
and no separate footer edit was needed — `SourcesFooter.astro` was checked and carries no NSW OB link.

Rendered markup, measured on `/owner-builder-courses`:

- Desktop: `<span class="mcard soon">…<em>Soon</em></span><span class="mdesc">In development</span>` — a
  `SPAN`, `href` null, `cursor: default`.
- Mobile: `<span class="dd-soon" aria-disabled="true">NSW Owner Builder<em>Soon</em></span>` — a `SPAN`,
  `aria-disabled="true"`, `tabIndex -1`, so it is correctly out of the tab order.

Layout, desktop megamenu, measured with `getBoundingClientRect`:

| Card | Box | Cursor |
|---|---|---|
| NSW (inert) | 354 x 67 | `default` |
| QLD / WA / TAS / ACT (live) | 354 x 67 | `pointer` |

No layout shift: the inert card occupies exactly the same box as the four it sits beside.

## Contrast — checked, not assumed

The brief said the `--slate-light` sub-AA value is deliberate and not to be "fixed". Verified rather
than taken on trust, on `--paper` (#ffffff), 375px and desktop:

| Element | Colour | Ratio | Verdict |
|---|---|---|---|
| NSW card name (inactive) | `--slate-light` #9a9a9a | **2.81:1** | Sub-AA, permitted |
| NSW card desc "In development" | `--slate` #6e6e6e | **5.10:1** | Passes AA |
| Live card name | `--ink` #1a1a1a | 17.40:1 | Passes AA |

2.81:1 matches the figure `global.css:8` states for `--slate-light` on `--paper` to two decimal
places, which is a useful check that the token comment is still accurate and not drifted.

The split is the point, and it is worth naming because it is what makes the sub-AA value defensible
here: the muted `--slate-light` carries only the **inactive component's name**, which WCAG 1.4.3
exempts, while the text that actually tells a reader something — "In development" — is `--slate` at
5.10:1. A reader who cannot resolve the muted name still reads the status. Had `desc` inherited the
muted token, this would have been a real defect and the brief's instruction would have been wrong.
It does not, so it is not.

**No token or design-register change was made in this session.**

## What this did not close

The claim is out of the chrome. It is still on disk in four places, none of them design-owned, and
one of them is on an indexable page:

- `src/content/partners/upskill-institute.md:8` says Upskill "Develops, delivers and assesses the
  nationally recognised **NSW courses**" — plural. It renders on `/accreditation`, which is
  `index,follow`. Upskill legitimately delivers NSW **White Card** (CPCWHS1001 is on its scope), so
  the singular reading is fine and the plural is not: the only other NSW course this could mean is
  the Owner Builder one that is on hold. This is the last indexable ambiguity of the set.
- `src/content/courses/owner-builder-nsw-course.mdx` and its `-w` variant carry the full claim. Both
  are `noindex,nofollow` and `kb/rules/authority-model.md` already records that neither may ship at
  cutover in its current form.
- `src/data/nsw-w.ts:76-77` carries an FAQ answering "Is this course nationally recognised?" with
  "Yes… RTO 45708… Statement of Attainment", feeding the `-w` page above.

## Demand list

Tag every item: [skills] | [design] | [facts] | [build]

- [build] `src/content/partners/upskill-institute.md:8` says Upskill delivers "the nationally
  recognised NSW courses" (plural) and renders on `/accreditation`, an index,follow page. Narrow it
  to the NSW White Card explicitly, which is the only NSW course Upskill may be credited with while
  the Owner Builder hold stands.
- [build] `src/content/courses/owner-builder-nsw-course.mdx`, its `-w` variant and `src/data/nsw-w.ts`
  still assert nationally recognised / RTO 45708 / Statement of Attainment for NSW Owner Builder.
  Both pages are noindex so this is not live harm, but they are a cutover blocker and the copy fix
  needs Andrey's commercial call first (name a real delivering RTO, or pull the claim).
- [skills] `src/data/**` is unassigned in the session-types table. It is page data, edited by build
  sessions in practice, but the table does not say so — this session had to leave `nsw-w.ts` alone on
  the same reasoning that kept it out of `src/content/**`. Fourth instance of the unassigned-path
  pattern CLAUDE.md already names, after `content.config.ts`, `SYSTEM.md`/`handover/**` and `public/**`.
- [skills] A build session correcting an existing page has nowhere legitimate to file a finding: the
  mistakes log is `kb/**` (skills-owned) and a flat `skill-reviews/*.md` would falsely satisfy
  `system-health`'s page-coverage check by claiming a graded run. Hit on the hub fix earlier the same
  day; the SiteHeader defect had to be carried out of that session by hand.
- [skills] Nothing mechanically prevents a `desc` string in `SiteHeader.astro` from making an
  authority claim. `check-claims` reconciles figures and `check-positions` (to-do item 5) is proposed
  for delivery mode and authority model on pages — the nav's per-item `desc` is the same class of
  claim on 17 pages at once, and should be in that check's scope when it is built.
