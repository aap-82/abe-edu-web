---
date: 2026-07-30
skill: design-session
subject: partner-blurb-ownership
verdict: Green
graded_by: self
---

# Design review — who owns the partner blurb, 2026-07-30

## Verdict

**Green.** The group of six related items resolves into **two** complaints, one already fixed and one
fixed here, and both are now closed. The blurb duplication had been filed **four times across four
reviews without being fixed**, every time for the same reason: each filing said one of the two
components should stop rendering it and none said which. This session made that call and recorded why.

## What the group actually contained

The `demand-split` group was labelled "6 related items" precisely because grouping is deliberately
generous — and it was right to be. Two distinct complaints, both naming `PartnerDisclosure`:

1. **Heading level (2 filings).** `PartnerDisclosure` at `after-hero` emitted an H3 as the first
   heading after the H1, skipping H2 (WCAG 1.3.1). **Already fixed** in an earlier session:
   `headingLevel?: 2 | 3` exists, `CourseLayout` passes `headingLevel={2}` at both placements.
   Verified in the built page rather than in the source — `h1 → h2 → h2 → h2 → h3`, no skip.
   Closed as done, not re-fixed.
2. **Duplicate blurb (4 filings).** Fixed here.

## The decision, and why it took four filings

Both components read the **same partner record**, so `blurb` rendered verbatim twice on every ASQA
page. The previous filing stated the blocker exactly: *"a content-ownership decision — which of
`PartnerDisclosure` or `Credentials` owns the description — and the losing one needs its copy re-cut,
not just suppressed."* Nobody had made the decision, so it was refiled instead.

**`PartnerDisclosure` owns it.** The blurb *is* the disclosure: it states who develops, delivers and
assesses, and that ABE Education is not an RTO — which is **disclosure location 6** in
`kb/rules/asqa-disclosure-framework.md`, *"a dedicated section (or equivalent role cards) must clearly
separate ABE Education's role from the RTO's role"*. `PartnerDisclosure` is that dedicated section,
it is placed for compliance, and it renders first. Location 6 wants the separation once, not twice.

`Credentials` keeps what is distinctly its own: RTO badge, legal name, credential list (RTO number,
ASQA accreditation, unit scope), contact, verification links, verified date. It reads as a facts card
beside the expert profile, which is its job in that section — not suppressed, re-scoped.

**Checked before cutting, not after.** Removing a disclosure paragraph could have broken ASQA
compliance, so the framework was read first and the blast radius measured: `Credentials` receives an
`org` only via `ExpertCredentials developerRto`, which is set only on pages that also have `asqa`,
and `rtoPlacement` defaults to `after-body` with both branches covered — so `PartnerDisclosure`
renders exactly once wherever `asqa` exists and the disclosure can never be dropped.

## Measured

Counted across every built page, before and after:

| Page | Before | After |
|---|---|---|
| `white-card-wa` | develops ×2, publishes ×2 | **×1, ×1** |
| `white-card-tas` | develops ×2, publishes ×2 | **×1, ×1** |
| `accreditation` | ×1, ×1 | ×1, ×1 (never renders this component) |
| `styleguide` | ×1, ×1 | ×1, ×1 |

Heading order on `/white-card-wa`: `h1 → h2 → h2 → h2 → h3`. Build green at 20 pages, `astro check`
0 errors. Verified in the running dev server as well as in `dist/`: `.pl-blurb` renders 2 paragraphs
(the owner), and the page-wide count of each sentence is 1.

## One adjacent fix, declared rather than smuggled

Removing the blurb put two lines next to each other that had been separated by it: `org.role`
("Registered training organisation") as a standalone line, immediately above the first credential
("Registered training organisation, RTO 31193"). The same words plus the number. The standalone line
is now gone from the **org** card only; the person cards keep theirs, where nothing duplicates it.

This was not on the demand list. It is in the same component, is the same defect class, and my own
change is what made it adjacent — leaving a duplication I had just exposed would have been worse than
the small scope increase. Recorded here so it is visible rather than discovered later.

## Demand list
Tag every item: [skills] | [design] | [facts] | [build]

- [design] Contact details (email and phone) still render in **both** `PartnerDisclosure` and
  `Credentials` on every ASQA page. Less egregious than two identical paragraphs and arguably useful
  in both places, but it is the same shape and nobody has decided it. First filing.
- [skills] The `demand-split` group that prompted this session held two different complaints under one
  heading, exactly as its own caveat warns. That is the design working, but the caveat is only in the
  generated note — worth a line in CLAUDE.md's demand-list format so a reader meets it before the note.
- [design] `VerifiedSources` / `SourcesFooter` citation links: new tab or not. **Fourth filing, still
  undecided.** This session decided the blurb question after four filings; this one is now in the same
  position and should be decided next rather than refiled.

## Output
- [x] **Fix applied** — `Credentials` no longer renders the blurb or a redundant org role line;
  6 demand items closed across 6 reviews.
- [x] **Design-register change** — none. No token, no colour, no spacing value changed, so this session
  is not exclusive under rule 7.
- [x] **Styleguide specimen** — unchanged and still valid; the `Credentials` specimen with an `org`
  renders the same component and the build's specimen check passes.
- [ ] **Memory written** — not needed; the decision and its reasoning live in the component comment,
  where the next person to consider re-adding the blurb will meet it.

## Grader note

`graded_by: self`; no fresh-subagent design grader exists. The reproducible part is the before/after
table, which anyone can re-derive by grepping the two sentences across `dist/*/index.html`. The
judgement call worth challenging is the ownership decision itself — the counter-argument is that the
E-E-A-T section reads thinner without the prose, and my answer is that the credential list carries the
substance and the prose was duplicated from 400 lines earlier on the same page.
