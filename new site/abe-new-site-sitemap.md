# ABE new site — sitemap / information architecture

**Prepared:** 16 July 2026. Derived from `redirect-map-v1.csv` and the implementation plan. This is the planned page inventory and hub-and-spoke structure for the new Astro site. Australian English.

**Note on the XML sitemap:** the machine-readable `sitemap-index.xml` is generated automatically by `@astrojs/sitemap` at build time and submitted to Google Search Console at cutover (Wave 6). **It exists now** — `dist/sitemap-index.xml` + `dist/sitemap-0.xml`, carrying **20 indexable URLs** as at 10 Aug 2026. (This line previously read "It does not exist yet because the pages are not built", which stopped being true once Wave 1 shipped.) This document is the human-readable structure that XML mirrors.

**Canonical form:** no trailing slash on `www.abeeducation.edu.au` (e.g. `/white-card-wa`), set 16 Jul per risk audit R2 — keeps the live equity URLs unchanged through the migration.

**Status key:** ● live in repo and in the XML sitemap · ◑ **built but noindexed** (deliberately held back) · ○ to build · ⛔ blocked, must not ship as-is

`◐ port from pipeline content` and `◇ exists, refresh to new template` are retired: every page they described has since been built. They are noted here rather than deleted so an older copy of this document can still be read against this one.

---

## Status, re-ticked 10 August 2026 — measured against `dist/`, not memory

**Every row below was checked programmatically**: does `dist/{slug}/index.html` exist, and does the slug appear in `dist/sitemap-0.xml`. This is the second time this tracker has been corrected that way — the 24 Jul pass found it reading "all unstarted" while five tickets were live — so it is worth saying plainly that a status column is only as good as its last measurement.

**20 of ~41 planned pages are live and indexable.** Waves 1, 2 and 3 are essentially complete; Waves 4, 5 and 6 are not started apart from `/cpd` and `/cpd-tas`.

| | Count |
|---|---|
| ● Live and indexable | **20** |
| ◑ Built, noindexed | **3** (`/cpd-building-tas`, `/owner-builder-nsw-course` + its `-w` variant) |
| ○ To build | **~18** |
| Not a page | `/` is currently a 391-byte redirect stub to `/qld-owner-builder-course` (`astro.config.mjs:71`), correctly `noindex` and excluded from the XML sitemap. **Cutover must not happen with a redirecting root** — see the `TODO(cutover)` at `astro.config.mjs:69`. |

---

## Site tree

```
/                                   Homepage                          ○  (W5-1) — see note, root currently redirects
├── /courses                        Course catalogue                  ○  (W5-2)
│
├── OWNER BUILDER ─────────────────────────────────────────────────
│   /owner-builder-courses          OB hub                            ●  (W2-5)
│   ├── /nsw-owner-builder-course   NSW  · ASQA (Upskill 45708)       ⛔ (W2-3) — slug NOT BUILT; see below
│   ├── /qld-owner-builder-course   QLD  · state-approved (QBCC)      ●
│   ├── /wa-owner-builder-course    WA   · knowledge-req (Form 75)    ●
│   ├── /tas-owner-builder-course   TAS  · state-approved (CBOS)      ●  (W2-2)
│   └── /act-owner-builder-course   ACT  · state-approved (Access Canberra)  ● (W2-4)
│   /insurances                     Insurance hub                     ○  (W2-6)
│   ├── /owner-builder-insurance    Service page                      ●  (W2-6, 9 Aug)
│   └── /professional-indemnity-insurance  Service page               ○  (W2-6)
│   /project-advisory               Project Advisory Pack · $89       ●  (W2-7, 10 Aug)
│
├── WHITE CARD ────────────────────────────────────────────────────
│   /white-card                     White Card hub                    ●  (W3-6)
│   ├── /white-card-nsw             ASQA (Upskill 45708) · CPCWHS1001  ● (W3-2)
│   ├── /white-card-qld             ASQA (Blue Dog 31193) · CPCWHS1001 ● (W3-3)
│   ├── /white-card-wa              ASQA (Blue Dog 31193) · CPCWHS1001  ● (W3-1)
│   ├── /white-card-tas             ASQA (Blue Dog 31193) · CPCWHS1001 ● (W3-4)
│   └── /white-card-act             ASQA (AlertForce 91826) · CPCWHS1001 ● (W3-5)
│
├── CPD ───────────────────────────────────────────────────────────
│   /cpd                            CPD main hub                      ●  (W4-8 refresh still open)
│   ├── /cpd-nsw                    State hub                         ○  (W4-7)
│   ├── /cpd-tas                    State hub                         ●  (live)
│   ├── /cpd-wa                     State hub                         ○  (W4-7)
│   │   Bundle pages — the bundle IS the course page (see note below):
│   ├── /cpd-building-tas           TAS Building · CBOS · 12 pts      ◑  (W4-2) — built, noindexed
│   ├── /cpd-plumbing-tas           TAS Plumbing · CBOS · 12 pts      ○  (W4-3)
│   ├── /cpd-electrical-tas         TAS Electrical · CBOS · 11 pts    ○  (W4-4)
│   ├── /cpd-building-nsw           CPD Building NSW                  ○  (W4-1)
│   └── /cpd-real-estate-wa         CPD Real Estate WA                ○  (W4-5)
│
├── TRUST ─────────────────────────────────────────────────────────
│   /experts                        Experts hub                       ●  (W1-3)
│   ├── /experts/dominic-ogburn     Developer profile                 ●  (W1-2)
│   └── /experts/warwick-smith      Reviewer profile                  ●  (W1-2)
│   /accreditation                  Accreditation + partners          ●  (W1-4)
│   /reviews                        Reviews (GBP 4.8/5, display-only)  ● (W1-5)
│
├── CONTENT HUB ───────────────────────────────────────────────────
│   /guides                         Guides index                      ○  (W5-7)
│   └── /guides/{article}           Articles (post-cutover, none at launch)
│
├── SUPPORT ───────────────────────────────────────────────────────
│   /about                          About (Organization schema)       ○  (W5-3)
│   /contact                        Contact (ContactPoint)            ○  (W5-4)
│   /faq                            FAQ (FAQPage)                     ○  (W5-4)
│   /help                           Help centre (slug TBC)           ○  (W5-4)
│   /saaustralia                    Solar Association Australia (partner)  ○ (W5-6)
│
└── LEGAL ─────────────────────────────────────────────────────────
    /terms                          Terms                             ○  (W5-5)
    /privacy                        Privacy                           ○  (W5-5)
    /cookies                        Cookies                           ○  (W5-5)
    /cancellation-and-refund-policy Refund policy                     ○  (W5-5)
```

---

**NSW Owner Builder — the one ⛔ row, and it is more tangled than a status symbol shows (10 Aug 2026).**
Three separate things are true at once:
- **The slug this tree names, `/nsw-owner-builder-course`, does not exist.** Nothing is built there.
- **What *is* built is `/owner-builder-nsw-course` and its `-w` variant**, both noindexed, both still
  asserting nationally recognised / RTO 45708 / Statement of Attainment. **Neither may ship in its
  current form.** The Upskill partnership is unsigned and none of the five required units is on
  RTO 45708's scope, so this is blocked on a commercial reality, not on build effort.
- **The two live legacy URLs carry 38,257 impressions between them** and their cutover fate is
  unresolved: `/owner-builder-nsw-course` (25,269 impr, pos 9.69) is noindexed, and
  `/nsw-owner-builder-course` (12,988 impr, pos 16.53) has no page at all — while W2-3 consolidates
  *to* that non-existent slug. Andrey's call. Canonical status: `kb/rules/authority-model.md` →
  "NSW Owner Builder"; the queued pre-launch-page decision is in `ROADMAP.md`.

**Project Advisory Pack slug settled 10 August 2026: `/project-advisory`**, not the
`/project-advisory-pack` placeholder this document carried. Confirmed by Andrey, on the grounds that
`.claude/skills/abe-course-page-astro/references/seo/page-type-engine.md` already used the short form
both as canonical and as the cross-link target from all five owner-builder state pages, so confirming
it left fewer stale references than changing it. That file's three stale Owner Builder rows were
corrected the same day; **this document was the last place the old slug survived.**

**CPD structure changed 23 July 2026.** Three entries above were dropped, and the reason is the
same in each case — two pages were chasing one query with only one of them holding a purchase path:

- **`/cpd-bundles` and `/cpd-bundles-tas` are gone.** The bundle *is* the product, so it is the
  course page: `/cpd-{category}-{state}`. A separate bundle hub would compete with the state hubs,
  which already index them.
- **`/cpd-building` (trade hub across NSW + TAS) is gone.** It intersected the state hubs at
  exactly the pages that sell, which is the worst place for two hubs to overlap.
- **Bundles are named for the register's category axis** — Building, Electrical, Plumbing — not a
  single trade, because one category serves several licence types with different annual point
  requirements. This is why the slugs above are unchanged: `-building-` was right all along.

Point figures shown are **derived at build** from `kb/register/cpd/tas-courses.json` (live courses
only, capped at 12) and are current as at 23 July 2026, not authored targets.

## Counts

Planned at launch, against what is live as at **10 August 2026** (measured from `dist/` and
`dist/sitemap-0.xml`, not from this table's own history):

| Group | Planned | ● Live | Remaining |
|---|---|---|---|
| Homepage + catalogue | 2 | 0 | 2 — root is a redirect stub, not a page |
| Owner Builder (5 spokes + hub + 2 insurance + advisory) | 9 | **6** | 3 — NSW ⛔, `/insurances` hub, PI insurance |
| White Card (5 spokes + hub) | 6 | **6** | **0 — complete** |
| CPD (5 bundle/course pages + 3 state hubs + main hub) | 9 | **2** | 7 (+1 built but noindexed) |
| Trust (2 experts + hub + accreditation + reviews) | 5 | **5** | **0 — complete** |
| Content hub (index; articles later) | 1 | 0 | 1 |
| Support | 5 | 0 | 5 |
| Legal | 4 | 0 | 4 |
| **Total indexable pages at launch** | **~41** | **20** | **~21** |

**Waves 1 and 3 are complete; Wave 2 is 6 of 9.** The whole of Waves 4 (CPD), 5 (support, homepage,
content hub) and 6 (cutover) is where the remaining ~21 pages sit, and Legal and Support are placed
rather than drafted (`CLAUDE.md`: legal pages are never drafted or reworded by an agent).

Not in this sitemap and deliberately excluded: the 175 `/course/*` and 54 `/program/*` LearnWorlds player URLs (they stay on `learn.abeeducation.edu.au` and are robots-blocked from the marketing site), the retired NSW Real Estate CPD set, and any asbestos/silica pages (no product). All of those are handled as 301s in `redirect-map-v1.csv`.

---

## Open slug decisions — one left of two

- ~~**Project Advisory Pack** — slug shown as `/project-advisory-pack` (placeholder). Confirm the preferred slug.~~ **Settled 10 Aug 2026: `/project-advisory`.** Built and live at that slug; see the note under the tree.
- **Help centre** — `/help` vs `/help-centre`, or fold into `/faq`. Still open. Wave 5, so not yet blocking anything.

## How this maps to the machine sitemap
At build, `@astrojs/sitemap` walks the built routes and emits `sitemap-index.xml` + `sitemap-0.xml` with the production `site` URL in slash-less form (`trailingSlash: 'never'`). The internal link map is up/down only (spoke → hub, hub → spokes), never sideways between competing spokes — the same rule the tree above follows.
