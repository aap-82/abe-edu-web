# ABE new site — sitemap / information architecture

**Prepared:** 16 July 2026. Derived from `redirect-map-v1.csv` and the implementation plan. This is the planned page inventory and hub-and-spoke structure for the new Astro site. Australian English.

**Note on the XML sitemap:** the machine-readable `sitemap-index.xml` is generated automatically by `@astrojs/sitemap` at build time and submitted to Google Search Console at cutover (Wave 6). It does not exist yet because the pages are not built. This document is the human-readable structure that XML will mirror.

**Canonical form:** no trailing slash on `www.abeeducation.edu.au` (e.g. `/white-card-wa`), set 16 Jul per risk audit R2 — keeps the live equity URLs unchanged through the migration.

**Status key:** ● live in repo · ◐ port from pipeline content · ○ to build · ◇ exists, refresh to new template

---

## Site tree

```
/                                   Homepage                          ○  (W5-1)
├── /courses                        Course catalogue                  ○  (W5-2)
│
├── OWNER BUILDER ─────────────────────────────────────────────────
│   /owner-builder-courses          OB hub                            ○  (W2-5)
│   ├── /nsw-owner-builder-course   NSW  · ASQA (Upskill 45708)       ○  (W2-3)
│   ├── /qld-owner-builder-course   QLD  · state-approved (QBCC)      ●
│   ├── /wa-owner-builder-course    WA   · knowledge-req (Form 75)    ●
│   ├── /tas-owner-builder-course   TAS  · state-approved (CBOS)      ◐  (W2-2)
│   └── /act-owner-builder-course   ACT  · state-approved (Access Canberra)  ○ (W2-4)
│   /insurances                     Insurance hub                     ○  (W2-6)
│   ├── /owner-builder-insurance    Service page                      ○  (W2-6)
│   └── /professional-indemnity-insurance  Service page               ○  (W2-6)
│   /project-advisory-pack          Project Advisory Pack (slug TBC)  ○  (W2-7)
│
├── WHITE CARD ────────────────────────────────────────────────────
│   /white-card                     White Card hub                    ○  (W3-6)
│   ├── /white-card-nsw             ASQA (Upskill 45708) · CPCCWHS1001  ○ (W3-2)
│   ├── /white-card-qld             ASQA (Blue Dog 31193) · CPCCWHS1001 ○ (W3-3)
│   ├── /white-card-wa              ASQA (Blue Dog 31193) · CPCWHS1001  ○ (W3-1)
│   ├── /white-card-tas             ASQA (Blue Dog 31193) · CPCCWHS1001 ○ (W3-4)
│   └── /white-card-act             ASQA (AlertForce 91826) · CPCCWHS1001 ○ (W3-5)
│
├── CPD ───────────────────────────────────────────────────────────
│   /cpd                            CPD main hub                      ◇  (W4-8)
│   ├── /cpd-building               Trade hub (NSW + TAS)             ○  (W4-6)
│   ├── /cpd-nsw                    State hub                         ○  (W4-7)
│   ├── /cpd-tas                    State hub                         ○  (W4-7)
│   ├── /cpd-wa                     State hub                         ○  (W4-7)
│   │   Course pages (all ABE state-approved-direct):
│   ├── /cpd-building-nsw           CPD Building NSW                  ○  (W4-1)
│   ├── /cpd-building-tas           CPD Building TAS · CBOS           ○  (W4-2)
│   ├── /cpd-plumbing-tas           CPD Plumbing TAS · CBOS           ○  (W4-3)
│   ├── /cpd-electrical-tas         CPD Electrical TAS · CBOS         ○  (W4-4)
│   └── /cpd-real-estate-wa         CPD Real Estate WA               ○  (W4-5)
│   /cpd-bundles                    Bundle hub                        ○  (W4-10)
│   └── /cpd-bundles-tas            TAS bundle page (+ others per W4-9)  ○ (W4-10)
│
├── TRUST ─────────────────────────────────────────────────────────
│   /experts                        Experts hub                       ○  (W1-3)
│   ├── /experts/dominic-ogburn     Developer profile                 ○  (W1-2)
│   └── /experts/warwick-smith      Reviewer profile                  ○  (W1-2)
│   /accreditation                  Accreditation + partners          ○  (W1-4)
│   /reviews                        Reviews (GBP 4.8/5, display-only)  ○ (W1-5)
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

## Counts

| Group | Pages |
|---|---|
| Homepage + catalogue | 2 |
| Owner Builder (5 spokes + hub + 2 insurance + advisory) | 9 |
| White Card (5 spokes + hub) | 6 |
| CPD (5 courses + 4 hubs + main hub + 2 bundles) | 12 |
| Trust (2 experts + hub + accreditation + reviews) | 5 |
| Content hub (index; articles later) | 1 |
| Support | 5 |
| Legal | 4 |
| **Total indexable pages at launch** | **~44** |

Not in this sitemap and deliberately excluded: the 175 `/course/*` and 54 `/program/*` LearnWorlds player URLs (they stay on `learn.abeeducation.edu.au` and are robots-blocked from the marketing site), the retired NSW Real Estate CPD set, and any asbestos/silica pages (no product). All of those are handled as 301s in `redirect-map-v1.csv`.

---

## Two open slug decisions
- **Project Advisory Pack** — slug shown as `/project-advisory-pack` (placeholder). Confirm the preferred slug.
- **Help centre** — `/help` vs `/help-centre`, or fold into `/faq`. Confirm.

## How this maps to the machine sitemap
At build, `@astrojs/sitemap` walks the built routes and emits `sitemap-index.xml` + `sitemap-0.xml` with the production `site` URL in slash-less form (`trailingSlash: 'never'`). The internal link map is up/down only (spoke → hub, hub → spokes), never sideways between competing spokes — the same rule the tree above follows.
