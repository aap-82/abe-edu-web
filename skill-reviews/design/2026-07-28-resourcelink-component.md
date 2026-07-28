---
# Machine-readable block for a DESIGN review. Kept in skill-reviews/design/ so the flat
# skill-reviews/*.md build-run scans (system-health coverage, review-trends) never read it.
date: 2026-07-28
kind: design
subject: design/resourcelink-component
graded_by: self
grade_reason: no fresh-subagent design grader exists yet; consistent with the 2026-07-25 and 2026-07-27 design reviews.
verdict: Green
shipped:
  - src/components/ResourceLink.astro   # new component
  - src/styles/global.css               # .reslink rules; .reslink added to 3 shared arrow selectors
  - src/pages/styleguide.astro          # specimen (3 states)
  - .claude/launch.json                 # dist-static config, so a worktree can verify its own build
---

# Design review — ResourceLink, a record the reader can open

Session type: **design**, continuing from the dead-chrome-links change. Requested from a live element
selection on a White Card section: *"a callout component for links to resources, internal and
external, different to normal prose but not as loud as the CTA button."* Built through
`/impeccable craft`; register **brand** (declared in PRODUCT.md).

## Why a new component rather than composition

The Stage 5 protocol is compose first, promote on the second occurrence, build new only if genuinely
new. Checked all four near-neighbours before writing anything:

| Existing | Why it does not do this job |
|---|---|
| `VerifiedSources` | A dated ledger attesting **we** checked a fact. Passive, past tense, and it owns the `--verify` blue. |
| `Note` | A caveat or legal consequence. Inert prose in a box, nothing to open. |
| `KeyTakeaway` | Distils what a section already said. Never new, never a destination. |
| `.btn-link` | Right loudness, but inline and containerless, so it vanishes in body copy at the moment a reader wants proof. |

The deciding evidence is that the shape was **already hand-built twice**: `.pl` in
`Credentials.astro` and `.pl-verify` in `PartnerDisclosure.astro`, both rendering
"Verify on training.gov.au →". Two occurrences is this project's promote trigger, so this is a
promotion, not an invention. Neither existing instance was migrated in this change: that is a
follow-up, listed below, because it touches two components with their own layouts.

## Design decisions, and what each is answering

- **It is a destination, so it takes the interactive-card treatment** (border to `--ink`, 2px lift),
  which DESIGN.md names as the system's only elevation cue. That is the whole distinction from
  `Note` in one line: **a Note is read, a ResourceLink is opened.**
- **`--paper` fill, not `--paper-alt`.** `--paper` is defined as the fill of an elevated surface;
  `--paper-alt` is `Note`'s inert ground. Using the right token makes the difference legible without
  a second border treatment.
- **No `--verify` blue.** That token means exactly one thing on this site, a dated attestation. This
  component is an invitation to go and check, which is the opposite direction of trust, so borrowing
  the blue would have blurred a signal DESIGN.md deliberately reserves.
- **Maroon only on hover, only on the title and arrow.** No maroon fill, no maroon border. The accent
  keeps meaning "action" and stays inside its budget.
- **The bare host is the destination tell.** `training.gov.au` in mono says where the reader is about
  to land, which an external-link icon cannot. It doubles as the external affordance.
- **`desc` is a prop, not a `<slot>`.** MDX wraps multi-line children in their own `<p>`, which would
  nest invalidly and strand the text below an empty panel with a green build. That is mistakes-log
  #12, which has already cost this pipeline real time. A string prop cannot fail that way.
- **Kicker is optional.** brand.md warns that repeated tiny uppercase tracked labels read as AI
  scaffolding unless they are a deliberate named system. Here they are (DESIGN.md calls the mono
  label the register's clearest tell), but making it required would have put a label on panels that
  do not need one.

## What shipped, with measured values (not ticks)

Measured on the **built** page served from `dist/`, via `getComputedStyle` and element rects.

| Property | Measured |
|---|---|
| Panel | 544px wide desktop (`calc(480 + 2×32)`, matching `.note` so both share an optical edge) |
| Kicker | DM Mono 11px / 500, `#6e6e6e` `--slate`, 0.18em tracking |
| Title | Archivo 17px / 600, `#1a1a1a` `--ink` |
| Descriptor | DM Sans 15px, `#4a4a4a` `--ink-3` |
| Host | DM Mono 12px, `#6e6e6e` `--slate` |
| External anchor | `target="_blank" rel="noopener"` + `.sr-only` ", opens in a new tab" |
| Hover | `border-color` → `--ink`, `transform: translateY(-2px)`, title and arrow → `--maroon` |
| Focus | inherits the global `:focus-visible` (2px maroon, 3px offset). No bespoke rule needed. |

Contrast, against DESIGN.md's own published figures: `--slate` on `--paper` is **5.10:1** (AA small
text 4.50), `--ink-3` **8.43:1**. Colour never carries meaning alone here: external status is spoken
by the host text, not by hue.

**Responsive, measured at 360px** (three panels, all states):

| | Panel width | Height | Padding | Arrow | Overflow |
|---|---|---|---|---|---|
| kicker + desc + host | 254px | 218px | 16/24px | hidden | none |
| internal, no host | 254px | 172px | 16/24px | hidden | none |
| title + host only | 254px | 102px | 16/24px | hidden | none |

Zero horizontal overflow from any element inside the component. Every panel is entirely tappable and
far over the 44px minimum.

## The defect found during iteration

The `prefers-reduced-motion` override **did not work as written**, and it looked correct in the
source. I put `.reslink:hover{transform:none}` in the existing reduced-motion block near the top of
`global.css`, but `.reslink:hover{transform:translateY(-2px)}` is authored ~250 lines later. Equal
specificity, so source order decides, and the later rule won: a reader who asked for no motion still
got the lift. Caught by reading the **built** stylesheet, where rule order is visible, not the
source. Fixed by moving the override to its own block directly after the `.reslink` rules; verified
in `dist/` that `transform:none` now follows `translateY(-2px)`.

This is the same lesson as the self-certification memory: the source looked right, the output was
wrong, and only measuring the output found it.

## Design-register changes

**No new tokens, no token values changed**, so Rule 7 (token changes are exclusive) stays unengaged
and this could ship alongside other work. Every value is an existing token.

**One shared-rule change worth flagging:** `.reslink` was added to three existing selector lists that
`.btn-link` and `.waynext` share (`.arr-clip` sizing, `.arr` sizing, and the hover animation), rather
than duplicating the arrow motion. One definition, three consumers. A future change to the arrow now
affects this component too, which is the intent.

## Verification limits, stated

- **Hover was verified as authored CSS in the built stylesheet, not as a live interaction.**
  Synthetic mouse events in this harness did not trigger `:hover` (`el.matches(':hover')` stayed
  false after a hover at the element's measured centre). The rules, their order and their computed
  values are confirmed in `dist/`; the mechanism is identical to `.topic`, which ships in production.
- **No mobile screenshot.** The Browser pane was not displayed, so compositing was unavailable and
  screenshots timed out. Responsive behaviour is reported from measured rects instead, which is the
  stronger evidence anyway.
- A `dist-static` entry was added to `.claude/launch.json` because the Astro CLI is a singleton
  daemon: `npm run dev` from a worktree reuses the main checkout's `:4321` and would have verified
  the wrong code. Serving the built `dist/` on its own port is how a worktree gets honest eyes.

## Not a defect

The 360px sweep flagged `.hub-card` overflowing on `/styleguide`. Checked on the real page
(`/owner-builder-courses`): `docOverflowX` is **false**, because `ComparisonTable` scrolls inside its
own container as designed. Styleguide specimen context only. Reported here rather than "fixed", per
the rule against inventing defects to demonstrate iteration.

## Follow-on: external-link behaviour made consistent

`ResourceLink` opening external links in a new tab left the site with two behaviours, since the
inline verify links opened in-tab. Resolved rather than left documented.

All four external links in `Credentials.astro` and `PartnerDisclosure.astro` now carry
`target="_blank" rel="noopener"` and an `.sr-only` ", opens in a new tab". **Scope was widened from
the two verify links to all four deliberately:** `Website` sits beside `Verify on training.gov.au`
in the same baseline row, and splitting behaviour between two identical-looking adjacent links is a
worse defect than the one being fixed.

Measured on the built `/white-card-tas`, reading every `.pl` / `.pl-verify` anchor:

| Link | Target | Cue hidden |
|---|---|---|
| `Verify on training.gov.au` ×2 | `_blank` | yes |
| `Website` | `_blank` | yes |
| `LinkedIn` | `_blank` | yes |
| `Full profile →` (internal) | same tab | n/a |
| `mailto:` / `tel:` ×2 | same tab | n/a |

The cue is required, not decorative: an unannounced tab change is a WCAG 3.2.5 failure. Confirmed the
`.sr-only` span computes to `position:absolute; width:1px`, so it is announced and not seen, and that
no `target="_blank"` landed on a non-`http` href anywhere in `dist/`.

One specimen fix fell out of it: the styleguide's demo reviewer had `linkedin: '#'`, which with a new
tab would have opened a blank tab onto the page itself. Pointed at the LinkedIn platform root, not a
real profile, because that reviewer is fictional and must not be attached to a real identity.

**Still inconsistent, deliberately out of scope:** source links in `VerifiedSources` and
`SourcesFooter` remain same-tab. Changing those is a site-wide convention change across every page's
citations, which is its own decision, not a rider on this one.

## Demand list

Tag every item: [skills] | [design] | [facts]

- ~~[design] Migrate `Credentials.astro` (`.pl`) and `PartnerDisclosure.astro` (`.pl-verify`) onto
  `ResourceLink`.~~ **WITHDRAWN 28 Jul 2026, same day, on inspection. The item was wrong.** What
  repeated across those two files is the *string and the intent* ("Verify on training.gov.au →"),
  never the *shape*. Both are inline micro-links inside dense cards; this is a block-level panel
  sized to the prose column. Measured: `.pl-verify` is 14px inside `.pl-check`, a right-aligned
  column stack under a 24px maroon RTO number, and `.partner` is itself `--paper` + 1px
  `--rule-strong` + 8px radius, so a bordered panel inside it is a **nested card**, which DESIGN.md
  bans outright. `.pl` is a 12px mono link in `.p-links`, a baseline-aligned row pairing it with a
  peer link, which a 544px block would break. Migrating would have degraded two shipped components
  to satisfy a note. Recorded in `ResourceLink.astro`'s header as a DO NOT MIGRATE so it is not
  retried. **Lesson: "the same intent twice" is not "the same shape twice", and only the second one
  is the promote trigger.** The promote rule should be read as being about shape.
- [design] `.topic` and the other interactive cards have no `prefers-reduced-motion` guard on their
  2px lift. `ResourceLink` now has one. Either sweep them or drop mine for consistency; a sweep is
  its own change and should not ride along with a new component.
- [design] Decide whether `VerifiedSources` and `SourcesFooter` citation links should also open in a
  new tab. They are the last same-tab external links on the site. Arguably they *should* stay in-tab
  (a citation is read, not an errand), but the call should be made and written down rather than left
  as residue from this change.
- [skills] Nothing in the build checks that a `prefers-reduced-motion` override actually wins. The
  bug above was a source-order tie, invisible in the source and obvious in `dist/`. If it recurs,
  that is the trigger for a check.
