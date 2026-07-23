# 05 · Section plan + component map — /white-card-tas

The brief-to-section map. Every briefed section (`03-briefs.md`) maps to a page section here, and every
page section traces back to a brief. This is the artefact whose absence let a briefed section vanish on
run 1; `check-pipeline.mjs` checks both directions against it.

**Build shape:** one MDX file `src/content/courses/white-card-tas.mdx`, `authorityModel:
asqa-accredited`, `noindex: true`. Rendered by `CourseLayout` via `src/pages/[slug]/index.astro`.
FAQ data in `src/data/faqs-white-card-tas.ts`.

---

## Section map

| # | Page section (id) | Marker | From brief | H2 (question-led) | Components | Layout or authored |
|---|---|---|---|---|---|---|
| — | Hero | — | Hero | H1 "White Card Tasmania" | Hero (ticks incl. **ASQA loc 1**, proof ×3, priced CTA) | layout ← frontmatter.hero |
| — | At a glance | — | (S4/S5 facts) | "The facts before you enrol" | Section + AnswerCapsule + FactGrid(glance) | authored |
| 1 | `real` | 01 | **S1** | "Is this a real White Card?" | Section + AnswerCapsule + prose (verify on training.gov.au) + VerifiedSources | authored |
| 2 | `accepted` | 02 | **S2** | "Is it accepted, and can I do it online in Tasmania?" | Section + AnswerCapsule + CanCant + VerifiedSources | authored |
| 3 | `your-card` | 03 | **S3** | "What you get, and how to get your card" | ZSection + AnswerCapsule + Stepper(howItWorksSteps) + Note(caution) + VerifiedSources | authored |
| 4 | `cost` | 04 | **S4** | "What does a Tasmanian White Card cost in total?" | Section + AnswerCapsule + PriceCard(priceRows) + VerifiedSources | authored |
| — | TrustBand | — | (proof) | "Nationally recognised, delivered by an RTO" | TrustBand + TrustStats + AnswerCapsule(onDark) | authored |
| 5 | `how-it-works` | 05 | **S5** | "How does the course and assessment work?" | Section + AnswerCapsule + FactGrid + VerifiedSources | authored |
| 6 | `content-review` | 06 | **S6** | "Who developed and checked this course?" | Section + ExpertCredentials + reviewed line | authored |
| 7 | `faq` | 07 | **S7** | "White Card Tasmania FAQ" | Faq(items) — incl. **ASQA loc 5** (3 Qs) + OB cross-sell | authored ← data file |
| — | ASQA disclosure (loc 2) | — | CTA band brief | — | Note (full CTA template, adjacent to CtaBand) | authored (last body block) |
| — | `rto-partner` | — | S1 (formal) | (eyebrow only) | PartnerDisclosure card | **layout ← partnerRto, placement: after-body** |
| — | CtaBand | — | CTA band | "Get your Tasmanian White Card" | CtaBand | layout ← frontmatter.ctaBand |
| — | Footer | — | Sources / ASQA loc 3,4,7 | — | SourcesFooter (sources, asqaDisclaimer, copyright bar) | layout |

**Every brief is placed:** S1→#real (+ the formal #rto-partner card, layout), S2→#accepted, S3→#your-card,
S4→#cost, S5→#how-it-works, S6→#content-review, S7→#faq. Hero and CTA-band briefs → frontmatter. No
brief dropped.

---

## ASQA 7-location resolution (the two flagged at Stage 3 now closed)

| # | Location | Resolved |
|---|---|---|
| 1 | Hero inline short form | **authored** — hero tick: "Delivered by Blue Dog Training (RTO 31193) · Enrolled through ABE Education" |
| 2 | Near CTA (full template) | **authored** — Note block at end of body, adjacent to the layout's CtaBand (cannot inject into CtaBand) |
| 3 | Footer full legal disclosure | **layout** — `asqaDisclaimer`, auto-prepended to disclaimersHtml ✓ |
| 4 | Footer copyright bar | **authored into disclaimersHtml** — "Course: CPCWHS1001 … / Training provider: Blue Dog Training (RTO 31193) / Enrolment partner: ABE Education (ABN 64 125 455 272)". The generic `.f-pub` footer lists all three RTOs; this adds the per-course bar. |
| 5 | FAQ 3 mandatory questions | **authored** — first three FAQ items (who delivers / who to contact / how to verify) |
| 6 | About Your Training Provider | **layout** — PartnerDisclosure `rto-partner` (role separation in its disclosure sentence) ✓ |
| 7 | T&Cs link | **layout** — SourcesFooter `legalLinks` already emits `/terms` sitewide ✓ |

Sitewide `.f-asqa` "ABE is not an RTO" line is separate and present on every page.

---

## Component prop contracts that bite (record, per skill Stage 5)

- **`Note` slot must be ONE line.** MDX wraps a multi-line JSX child in its own `<p>`, and a `<p>`
  inside the Note's `<p>` gets hoisted out — silent empty callout (mistakes-log #12). Both Note uses
  here (the 60-day caution, the ASQA loc-2 block) are single-line.
- **`AnswerCapsule` inside `TrustBand` needs `onDark`.** Without it the text is unreadable on the dark
  band (component-selection).
- **`ExpertCredentials developerRto={...}` (asqa only).** On an asqa-accredited page no ABE person is
  the course developer, so `experts:` holds the reviewer alone and `developerRto` (the RTO number from
  `partnerRto.rtoNumber`) resolves the matching `partners` record into an **organisation** developer
  card, rendered before the reviewer by `Credentials`'s new `org` prop. This restores the
  developer → reviewer two-card pairing with the RTO in the developer slot. Added this run:
  `Credentials.org` + `ExpertCredentials.developerRto` + a styleguide specimen. **Contract:** CSS
  classes must NOT contain the substring "rto" — the authority-language guardrail scans the bundled
  CSS and matches "rto" as a forbidden RTO claim on state-approved pages; the card's classes are
  `org-badge` / `org-verified` for that reason.
- **`VerifiedSources`** takes `date`, `facts`, `sources=[{label, href}]` — not free prose. Renders
  its own provenance line; no literal em dashes.
- **Markers must be sequential 01–07** across all marked sections, one `marker` mechanism only.
- **In-page nav `sectionId`s must match a rendered section id**, or guardrail 7 fails.

---

## Deviations from the briefs (recorded, per skill Stage 5)

1. **S1 split into two sections.** The layout auto-renders `rto-partner` (the PartnerDisclosure fact
   card) and gives it no H2/capsule/sources. So the archetype-2 trust copy — the answer capsule and the
   "check it yourself on training.gov.au, we'd rather you did" invitation, which the archetype's own
   worked copy makes the strongest move on the page — is authored as a separate `real` section. Result:
   `real` (trust prose, high) + `rto-partner` (formal fact card, after body). Not a dropped section;
   a deliberate split, because the layout's ASQA section cannot carry the copy. **FRICTION — logged for
   Stage 9:** the built ASQA branch under-renders archetype 2's core section; it was never exercised
   before this run, so nobody noticed.
2. **`becomeSteps: []`.** Required by the course schema but it is an owner-builder concept ("how to
   become an owner builder") with no archetype-2 meaning. Set empty and unused. **FRICTION — logged:**
   `becomeSteps`/`howItWorksSteps` are owner-builder-shaped required fields; recommend making
   `becomeSteps` optional.
3. **Card process mapped onto `howItWorksSteps`.** The 4-step lodgement flow (finish → SoA → lodge
   within 60 days → WorkSafe issues) uses the generic `howItWorksSteps` array, rendered as the Stepper
   in `your-card`.
4. **`how-it-works` is a FactGrid, not a Stepper.** The course/assessment facts (mode, assessment,
   USI, PPE) are parallel, not sequential, so FactGrid is the right carrier.
5. **CTA target is interim.** `buyUrl` is TBC, so the hero/sticky/CtaBand CTAs point at `/white-card`
   (the hub) as an honest placeholder. **The buyUrl swap and removing `noindex` happen together**, the
   same coupling run 1 used. Logged as the ship blocker.
6. **`courseWorkload` omitted.** Completion time is an unconfirmed internal fact (Stage 4 flag); the
   schema makes it optional precisely so no duration is invented. Aligns with the schema's own intent.
