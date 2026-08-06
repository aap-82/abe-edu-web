# 05 · Section plan + component map — `/white-card-act`

The brief-to-section map. Every briefed section in `03-briefs.md` maps to a page section here, and
every page section traces back to a brief. `check-pipeline.mjs` checks both directions against this
table, so the "Page section (id)" column is the load-bearing part of the file. **Only real DOM
section ids are backticked below** (lesson carried forward from the `/white-card` hub build the same
day — a backticked frontmatter field name gets misread as a claimed section id).

**Build shape:** one MDX file `src/content/courses/white-card-act.mdx`, `authorityModel:
asqa-accredited`, no `buyUrl` — every CTA is the in-page `#enrol` anchor (`sticky`, hero, CTA band),
same precedent as `/white-card-tas`. Rendered by `CourseLayout` via `src/pages/[slug]/index.astro`.
FAQ data in `src/data/faqs-white-card-act.ts`, following the per-page FAQ-data-file convention
already used by WA/TAS/NSW/QLD.

---

## Section map

| # | Page section (id) | Marker | From brief | H2 (question-led) | Components | Layout or authored |
|---|---|---|---|---|---|---|
| — | Hero | — | Hero | H1 "White Card ACT" | Hero (3 ticks, 3 proof stats) | layout, from the hero frontmatter |
| — | `rto-partner` | — | (archetype 2's disclosure) | (eyebrow only) | PartnerDisclosure | layout, from `partnerRto`, `placement: after-body` |
| — | At a glance | — | (facts summary) | "What do you need to know before you enrol?" | Section(bg-alt) + AnswerCapsule + FactGrid(glance) | authored |
| 01 | `real` | 01 | **1 (Is this real?)** | "Is this a real White Card?" | Section + AnswerCapsule + prose + VerifiedSources + SectionWayfinder | authored |
| 02 | `accepted` | 02 | **2 (Accepted/online?)** | "Will it be accepted, and can I do it online?" | Section(bg-alt) + AnswerCapsule + prose + VerifiedSources + SectionWayfinder | authored |
| 03 | `your-card` | 03 | **3 (What you get)** | "What do you get, and how do you get your card?" | ZSection (image slot, see below) + AnswerCapsule + prose + Stepper + Note(caution) + VerifiedSources | authored |
| 04 | `cost` | 04 | **4 (Price)** | "What does an ACT White Card cost in total?" | Section(bg-warm) + AnswerCapsule + PriceCard(priceRows) + VerifiedSources + SectionWayfinder | authored |
| — | TrustBand | — | (proof) | "Nationally recognised, delivered by an RTO" | TrustBand + TrustStats + AnswerCapsule(onDark) | authored |
| 05 | `how-it-works` | 05 | **5 (How it works)** | "How does the course work?" | Section + AnswerCapsule + prose + SectionWayfinder | authored |
| 06 | `content-review` | 06 | **6 (Developer/reviewer)** | "Who develops the course, and who checks this page?" | Section(bg-alt) + AnswerCapsule + ExpertCredentials(developerRto) | authored |
| 07 | `faq` | 07 | **7 (FAQ)** | "Common questions" | Section + Faq(items) | authored, data file |
| — | CtaBand | — | CTA band | "Get your ACT White Card" | CtaBand | layout, from the ctaBand frontmatter |
| — | Footer | — | Sources | — | SourcesFooter | layout, from footerSources and disclaimersHtml |

**Every brief is placed.** 1 -> `real`. 2 -> `accepted`. 3 -> `your-card`. 4 -> `cost`. 5 ->
`how-it-works`. 6 -> `content-review`. 7 -> `faq`. CTA band -> the layout's own `CtaBand`. **No
brief dropped, no section without a brief.**

**Markers run 01 to 07, sequential**, matching the archetype-2 convention. Bands alternate: default,
bg-alt, default (ZSection), bg-warm, TrustBand, default, bg-alt, default — zero adjacent
default/default or alt/alt pairs (checked against the band-rhythm rule the WA build's own Stage 5
named, per `pipeline/white-card-wa/05-components.md`'s "Band correction, 29 July 2026").

---

## Deviation from the sibling pages, and why

**`#your-card` (marker 03) is a `ZSection`, not a plain `Section` — the one deliberate structural
deviation from TAS's page, which put its ZSection at the same marker for a different reason.** TAS's
image showed the in-person Service Tasmania counter, since that was TAS's distinctive step (lodging
in person). ACT's application step is genuinely undramatic — an online ACT Digital Account form — so
putting the image there would show nothing distinctive. **ACT's own distinctive moment is the
face-to-face classroom itself**, since that is what separates this page from every other White Card
spoke (all delivered online). The image therefore illustrates the classroom session, not the
card-application step, even though both live under the `#your-card` marker's neighbourhood. On
reflection this argues for moving the image to `#how-it-works` (marker 05), which is literally about
the classroom — **corrected below**, not left as first drafted, because the image should illustrate
the section it is inside, not a neighbouring one.

**Corrected: `#how-it-works` (marker 05) is the `ZSection`, `#your-card` (marker 03) is a plain
`Section`.** This is the one departure from a straight copy of TAS's component choices, made because
ACT's distinctive fact (face-to-face delivery) sits at a different marker than TAS's (in-person
lodgement).

| Section map correction | Was (first draft, above) | Now |
|---|---|---|
| `your-card` (03) | ZSection | **Section** (no image — the ACT Digital Account application has nothing distinctive to show) |
| `how-it-works` (05) | Section | **ZSection** (the classroom session — ACT's one genuinely distinctive visual) |

## Component prop contracts carried forward (from the WA/TAS builds, still live)

- **`Note` slot must be ONE line** — the caution note under `#your-card` (the 60-day window) is
  single-line, matching TAS's own fix for this exact defect class.
- **`AnswerCapsule` inside `TrustBand` needs `onDark`.**
- **`ExpertCredentials developerRto={frontmatter.partnerRto.rtoNumber}`** resolves the `partners`
  record (`alertforce.md`) into an organisation developer card. `experts:` holds Warwick Smith alone.
- **CSS classes must not contain the substring "rto".**
- **`VerifiedSources`** takes `date`, `facts`, `sources=[{label, href}]` — not free prose.
- **In-page `nav` `sectionId`s must match a rendered section id**, or guardrail 7 fails.
- **Image alt >= 80 characters.**

## Image slots (input to Stage 6)

| Slot | Section | Ratio | Purpose |
|---|---|---|---|
| Hero artefact | hero | 4:5 (ratio r45, matching TAS/WA) | A worker in Canberra in hi-vis, arriving at or leaving a face-to-face White Card training session |
| ZSection image | `how-it-works` | 4:5 · ~520x650 | An AlertForce trainer running a face-to-face White Card classroom session, participants seated with hi-vis and hard hats visible |

Two slots, both ship as FPO placeholders this run (no `artefactImg`/`imgSrc` in the MDX) — see
`06-image-prompts.md` for the prompts and the disposition, following the same "generate later, ship
the designed placeholder now" pattern the hub used for its own single slot.
