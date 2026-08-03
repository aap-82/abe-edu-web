// Sitewide navigation data — the content of the header's four megamenus, the utility row,
// and the student sign-in link. Split out of `SiteHeader.astro` on 4 Aug 2026 so a build
// session shipping a new page can add its own nav entry without touching a design-owned
// component (`src/components/**`) — the crossing named in
// `skill-reviews/skills/2026-08-04-siteheader-nav-split.md` and, before that, filed four
// times as the oldest fired trigger in the repo. `SiteHeader.astro` imports this file and
// owns everything about HOW these render; this file owns only what they SAY.
//
// `check-positions.mjs`'s SiteHeader nav authority-parity check reads THIS file now, not
// `SiteHeader.astro` — repointed in the same commit that made this split, or that check
// would have silently stopped finding anything.

export interface Sub { code: string; name: string; href?: string; soon?: boolean; desc: string; }
export interface Feature { kicker: string; title: string; body: string; price?: string; }
// `href` optional and `soon` added for the same reason Sub and Link carry them: a
// destination that does not exist yet renders inert rather than linking somewhere wrong.
export interface Hub { label: string; href?: string; soon?: boolean; }
export interface Link { label: string; href?: string; soon?: boolean; }
// One shape for every megamenu: a labelled grid of state (or bundle) cards, a hub link,
// a feature panel, and an optional `extra` row of plain links below a separator. CPD
// Courses and CPD Bundles used to be a bespoke three-level (state > profession > bundle)
// structure; the final IA flattens both into ordinary state-card menus like Owner
// Builder and White Card, so one Group type and one renderer now covers all four.
export interface Group { label: string; megaLabel: string; hub: Hub; items: Sub[]; feature: Feature; extra?: Link[]; }

// Authority lines are legally load-bearing. QLD is QBCC-approved AND must name the
// NONACCABE course code wherever approval is claimed (QBCC approval condition 4); WA only supports a
// Form 75 approval, since no approved owner-builder course exists in WA; NSW and the
// White Card are nationally recognised via the RTO partner. Unreleased states claim
// nothing at all. Final nav IA (W0-4): four dropdowns in this order - White Card,
// Owner Builder, CPD Courses, CPD Bundles.
export const navGroups: Group[] = [
  {
    label: 'White Card',
    megaLabel: 'White Card by state',
    // Inert until /white-card ships (B2). Was an absolute link to the legacy site.
    hub: { label: 'White Card Hub', href: '/white-card' },
    items: [
      // TODO: the slugs still flagged `soon` below have no page yet, on this site or the
      // old one. Flagged so each renders inert rather than linking to a 404. Restore the
      // href and drop `soon` the moment a state's White Card page ships.
      { code: 'NSW', name: 'White Card NSW', href: '/white-card-nsw', desc: 'Live online with a trainer, six days a week' },
      { code: 'QLD', name: 'White Card QLD', href: '/white-card-qld', desc: 'Live online with a trainer, Connected Real Time Delivery' },
      { code: 'WA', name: 'White Card WA', href: '/white-card-wa', desc: 'Online and self-paced, with a live trainer assessment' },
      { code: 'TAS', name: 'White Card TAS', href: '/white-card-tas', desc: 'Online and self-paced for Tasmanian residents' },
      { code: 'ACT', name: 'White Card ACT', soon: true, desc: 'In development' },
    ],
    feature: { kicker: 'Delivered with', title: 'Blue Dog Training', body: 'Nationally recognised training, delivered with our RTO partner Blue Dog Training (RTO 31193).' },
  },
  {
    label: 'Owner Builder',
    megaLabel: 'Owner builder courses by state',
    // Every destination in this file is now either a path on THIS site or inert. Nothing
    // links to the production origin: that sent preview and dev traffic to the legacy
    // LearnWorlds site, and would break outright the moment that site is retired.
    hub: { label: 'Owner Builder Hub', href: '/owner-builder-courses' },
    items: [
      // NSW is inert on an AUTHORITY hold, not on a missing page - the two `-w` and non-`-w`
      // pages both exist and are both noindex,nofollow. Until 2 Aug 2026 this entry linked to
      // one of them and described it as "Nationally recognised, with our RTO partner", which
      // put that claim on 17 built pages, 13 of them index,follow, and made this file the
      // largest indexable surface still carrying it. Two independent gates are open: the
      // Upskill Institute partnership is unsigned, and none of the five units NSW requires is
      // on RTO 45708's scope. Canonical status, and the only file that may lift the hold:
      // kb/rules/authority-model.md, "NSW Owner Builder". Do NOT restore the href or name an
      // RTO here before that block says so - unlike the White Card TODO below, shipping a page
      // is not what unblocks this one.
      { code: 'NSW', name: 'NSW Owner Builder', soon: true, desc: 'In development' },
      { code: 'QLD', name: 'QLD Owner Builder', href: '/qld-owner-builder-course', desc: 'QBCC-approved: the NONACCABE course' },
      { code: 'WA', name: 'WA Owner Builder', href: '/wa-owner-builder-course', desc: 'Supports your Form 75 approval' },
      { code: 'TAS', name: 'TAS Owner Builder', href: '/tas-owner-builder-course', desc: 'Approved by CBOS Tasmania' },
      { code: 'ACT', name: 'ACT Owner Builder', href: '/act-owner-builder-course', desc: 'State-approved via Access Canberra' },
    ],
    feature: { kicker: 'Most popular', title: 'WA Owner Builder', body: 'Written for WA and reviewed for currency. Same-day certificate, ready for your Form 75.', price: '$179' },
    // Project Advisory has no page or confirmed URL yet, so it stays inert (soon).
    // Insurance moved here from the old top-level utility row - it is an owner-builder
    // cross-sell, not a sitewide utility link.
    extra: [
      { label: 'Project Advisory', soon: true },
      { label: 'Insurance', soon: true },
    ],
  },
  {
    label: 'CPD Courses',
    megaLabel: 'CPD courses by state',
    hub: { label: 'CPD Hub', href: '/cpd' },
    items: [
      { code: 'NSW', name: 'NSW Building CPD', soon: true, desc: 'CPD for NSW building practitioners' },
      { code: 'TAS', name: 'TAS CPD', href: '/cpd-tas', desc: 'Building, plumbing and electrical CPD' },
      { code: 'WA', name: 'WA Real Estate CPD', soon: true, desc: 'CPD for WA real estate practitioners' },
    ],
    // No authority claim here: points and cycles are the regulator's, not ABE's.
    feature: { kicker: 'Points and cycles', title: 'Set by your regulator', body: 'How many points you need, and when your cycle resets, differs by state and profession. Check with your regulator before you buy.' },
  },
  {
    label: 'CPD Bundles',
    megaLabel: 'CPD bundles',
    hub: { label: 'CPD Hub', href: '/cpd' },
    items: [
      // TODO — REWORK, do not simply restore these hrefs. `/cpd-bundles` and
      // `/cpd-bundles-tas` were dropped from the IA on 23 Jul 2026: the bundle IS the CPD
      // course page, so the products live at `/cpd-{category}-{state}` (`/cpd-building-tas`,
      // `/cpd-plumbing-tas`, `/cpd-electrical-tas`) and the state hubs index them. Building a
      // separate bundle hub would put two pages on one query with only one holding a purchase
      // path. When those pages ship, point these entries at them — or fold this whole group
      // into CPD Courses, since under the new IA the two now describe the same pages.
      { code: 'ALL', name: 'CPD Bundles', soon: true, desc: 'Multi-course point bundles across states' },
      { code: 'TAS', name: 'TAS CPD Bundles', soon: true, desc: 'Tasmania-specific point bundles' },
    ],
    feature: { kicker: 'Bundle and save', title: 'Complete your points in one order', body: 'Bundle multiple CPD courses together to cover your full annual point requirement.' },
  },
];

// Utility row: About, FAQ, Contact, then Login (below). Experts moved to the footer's
// Trust column; it is not a top-level nav item in the final IA.
export const utility: Link[] = [
  // All three ship in B4. Inert until then rather than linking to the legacy site, which
  // sends preview and dev traffic off-site and breaks the moment that site is retired.
  { label: 'About', soon: true },
  { label: 'FAQ', soon: true },
  { label: 'Contact', soon: true },
];

// Student sign-in, in the main row where the enrol CTA used to sit. Outlined rather
// than filled: it is a returning-student action, not the page's primary conversion,
// so it should not carry the visual weight of a solid button.
// TODO: href is a placeholder. Post-cutover target is https://learn.abeeducation.edu.au/signin
// (LearnWorlds' learn. subdomain); keep this placeholder until that cutover - see
// HANDOVER.md Phase E.
// href was '#' until 30 Jul 2026: a dead control in site chrome, on every page, that scrolled the
// reader to the top instead of doing anything. Filed twice, by the white-card-wa Stage 7 and the
// reflow design review. learn.abeeducation.edu.au is the student platform - redirects.csv routes
// /course/*, /program/*, /bundle/* and /payment there - so the host is confirmed, not guessed.
// The exact sign-in PATH is not: LearnWorlds uses /signin on some tenants and /login on others, so
// this points at the origin, which resolves for a logged-in student and offers sign-in otherwise.
// Confirm the deep link with Andrey and tighten it; an origin that works beats a path that 404s.
export const studentPortal: Link = { label: 'Login', href: 'https://learn.abeeducation.edu.au/' };
