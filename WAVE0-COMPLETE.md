# Wave 0 — complete (19 Jul 2026)

All eight Wave 0 tickets are merged to `main` and live on
`https://abe-edu-web.andrey-p-personal.workers.dev`. Full detail lives in `HANDOVER.md`; this is the
short version.

## Shipped

- **W0-5 — Site config.** Production `site` confirmed; canonical URL form settled as **no trailing
  slash** (`trailingSlash: 'never'` + `drop-trailing-slash`) after a mid-wave reversal of an earlier
  trailing-slash draft — every live equity URL is already slash-less, so this keeps them byte-identical
  through the migration. Added a staging `X-Robots-Tag: noindex` on the `*.workers.dev` host
  (`worker/entry.js`) so the in-progress build can't be indexed as duplicate content.
- **W0-1 — Authority model.** `partnerRto` + a Zod `superRefine` on the `courses` schema, required iff
  `authorityModel === 'asqa-accredited'`. `CourseLayout` branches: ASQA pages get `PartnerDisclosure` +
  the sitewide ASQA disclosure, and credit the RTO partner (never ABE) in the credential JSON-LD.
- **W0-2 — CPD course template.** Optional `cpd` frontmatter block (points, licence classes, approval
  reference, renewal period, optional matrix/bundle). `CourseLayout` renders a points-by-licence
  `FactGrid`, `CpdMatrix`, and `BundleOffer` when present.
- **W0-3 — Hub template.** New `HubLayout` (lite Hero, spoke card grid via new `HubCard`, optional
  `ComparisonTable` — new component — TrustBand, Faq, CtaBand) + a `hubs` content collection. Spokes
  are typed references into `courses`, so price/state/URL can't drift from the source page.
- **W0-4 — Global chrome.** Sitewide footer (four link columns, publisher/RTO/enrolment block, ASQA
  disclosure) and the final four-megamenu nav IA (White Card, Owner Builder, CPD Courses, CPD Bundles).
- **W0-6 — CI gates.** GitHub Actions workflow: Lighthouse CI (performance, LCP, TBT, CLS, JS budget,
  render-blocking resources) + a prose lint (em dash / "comprehensive") on every PR. Fixed a real
  render-blocking Google Fonts link along the way.
- **W0-7 — Redirects + 404.** `redirects.csv` → `public/_redirects` generator, a 12-row Wave 0 spike
  sample, and a custom 404 page. Verified single-hop redirects and confirmed query strings survive the
  hop to LearnWorlds.
- **W0-8 — HANDOVER.md refresh.** Component list, QBCC fee correction, and the full Wave 0 + Wave 1-6
  roadmap indexed.

## What's still open (not blocking Wave 1)

- Andrey's sign-off on the thin-trade-hub IA + two redirect CONFIRM flags.
- `HubLayout` has no route wired up yet — real Wave 1 work.
- `cpd` and `asqa-accredited` branches are built but unproven — no live page uses either yet.
- TAS/ACT course pages still need local imagery (FPO placeholder for now).

## One thing worth knowing if you look at the PR history

Four of the eight tickets initially merged into the wrong intermediate branch instead of `main`
(GitHub's stacked-PR auto-retarget stopped working partway through the chain) — caught, diagnosed, and
fixed with one corrective PR. Everything above reflects the corrected, verified end state.
