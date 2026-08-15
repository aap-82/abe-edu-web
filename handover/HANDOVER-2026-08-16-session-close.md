# HANDOVER — session close, 16 August 2026

## Status: OPEN — start here

Everything below is on `main` (`005b8a4`) and deployed. Working tree clean, `system-health` **0
failing**, `npm run build` green, no open PRs, no stale local branches.

```bash
node scripts/system-health.mjs
```

Thirteen PRs merged (#126-#138). **Read `ROADMAP.md`'s Current state for what changed; this note is
for what to do next and what nearly went wrong.**

---

## Read this first: three of today's PRs existed because a document described the build and the build had moved

Not a new class — `kb/mistakes-log.md` rows 1 and 27 have counted it eleven times between them — but
today it produced something the earlier sightings did not. **Two of those documents were in the
imperative, and a session followed them.**

| Document | What it said | What was true |
|---|---|---|
| `cpd-building-tas.mdx` frontmatter | "Re-run Stage 7 ... THEN remove this line" | Stage 7 was cleared weeks earlier; the flag was held by the `learn.` subdomain decision, recorded in a different file |
| `HANDOVER-facts-cpd-tas.md` | "Do not re-add the plumbing tag to Wiring Rules" | Wiring Rules carries the tag and **should**; the course out of the bundle is Solar Energy |
| Four `new site/` plans + `check-links` | the `learn.` decision is the cutover's one open dependency | Confirmed resolved by Andrey the same morning |

The first one was acted on: a build session removed the `noindex` flag it authorised removing. **Only
`check-redirect-targets.mjs` failing the build stopped a page publishing behind an unresolved
external blocker** — and it stopped it by accident of an unrelated design, not by reading the
comment. Nothing reads comments.

**The transferable rule, now in `mistakes-log` row 1:** where a comment authorises an ACTION, the
question is not "does the code beside it still say this" but **"what else holds this gate, and does
it agree"**. And the containment that actually worked: put the authoritative condition somewhere a
check reads. Prose that authorises an action and is the only record of the condition has no
containment at all.

---

## Where to start next

Ranked. Nothing here is blocked on anything else in it.

**1. Two images — `/cpd-electrical-tas` and `/cpd-plumbing-tas`.** `[build]` plus generation. **One
image each is now the ONLY thing keeping either page `noindex`**, and both pages are otherwise
finished and verified. Andrey waived the checkout-id blocker on 16 Aug, so the `TBC-` placeholders
stay and are recorded as a deliberate trade-off. Production prompts, with each bundle's real course
list as exact on-screen script, are in `handover/HANDOVER-image-prompts-2026-08-02.md` (§ "PROMOTED
16 Aug 2026").

**Do not ship only the image.** The full closing sequence is in that brief, and two of its steps are
easy to miss because `noindex` masks them from the orphan check:
- **Nothing links to `/cpd-electrical-tas`** from anywhere. Its `/cpd-tas` card renders no CTA
  because `BundleCard` shows the "soon" state without a `price`; it needs `price: '$449'`,
  `rrp: '$1,089'` and the CTA together.
- **The plumbing card still points at `/program/tas-plumber-cpd-bundle-01092025`**, the legacy
  LearnWorlds URL, not the page.

Also: lower both `FPO_BUDGET` lines, remove both `PENDING` entries in `check-redirect-targets.mjs` in
the same change as the flags, and commit each Stage 7 note **in the same commit** as the content.

**2. Wave 5 — the homepage is still a redirect stub.** `/` 301s to `/qld-owner-builder-course`, and
`/courses` and the legal pages do not exist. The largest structural gap on the site and the one
nobody has scheduled. Legal pages are placed, never drafted (CLAUDE.md Human gates).

**3. `--maroon` has more documented exceptions than rule.** `[design]`, and under rule 7 an
exclusive session — which is plausibly why it has been carried since 12 Aug rather than done. Worth
scheduling *as* that session rather than hoping it fits inside another.

**4. The remaining FPO images.** 20 wells on 13 indexable pages, 6 of them partner logos and expert
portraits that need supplying rather than generating.

**5. The two legacy NSW owner builder URLs.** 38,257 impressions between them, no cutover decision.
`/owner-builder-nsw-course` is noindexed and `/nsw-owner-builder-course` does not exist, while the
migration plan consolidates both *to* the slug that does not exist. Commercial call, not a build step.

---

## Needs Andrey, not a session

- **The two 2026 LearnWorlds checkout ids** (electrician, plumber). Waived as a blocker, still wrong.
- **learn.\* indexation, and whether the GSC property is a domain property** (risk audit R6). The
  subdomain *ticket* is closed; these two ABE-side decisions survive it and are due before cutover.
- **`?product_id=` surviving the `/payment*` 301** — `public/_redirects:178` flags "LW re-applies
  product query params; verify in spike". Pre-existing, unverified, and not closed by the 16 Aug
  confirmation.
- **ABE Education's verified profile URLs** for schema `sameAs` on `provider`. Inventing them would
  be a fabricated identity claim.
- **The InsuranceTek quote destination** — `/owner-builder-insurance` is live and cannot convert.

---

## What shipped

**Pages and data**
- `/cpd-building-tas` **published** (#128) — first Wave 4 bundle indexable.
- Plumbing's selected twelve recorded (#131): Solar Energy out of the plumber bundle at source,
  register re-synced, page renders 12 members. Building and electrical unchanged at 12 and 11.
- `courseMode` (#134): `/white-card-act` says `onsite`; a schema field now exists and the layout
  falls back to `online`.

**Social**
- 19 of 19 indexable pages carry a 1200x630 share card (#136), from 0 of 25. Generated by
  `scripts/generate-og-cards.mjs` in headless Chromium — the brand faces load from a CDN and there is
  no font file in the repo, so a rasteriser would have substituted Arial into 19 committed assets.
  `BaseLayout` emits `og:image` only when the card exists. Regenerate after adding a page:
  `npm run build && node scripts/generate-og-cards.mjs`.

**Gates**
- **`system-health --strict` on pull requests (#138).** `check-pipeline` §4 now blocks a merge
  instead of reporting after one. `fetch-depth: 0` is load-bearing — §4 reads git commit times and
  CI clones shallow.

**Records**
- The subdomain confirmation propagated to four plans and `check-links` (#130); the plumbing blocker
  closed in four places (#131, #132, #135); `HANDOVER-facts-cpd-tas.md` corrected and CLOSED (#132);
  `mistakes-log` row 1 → 5 and row 19 → 6.

---

## Process notes worth more than the features

**I breached one rule four times in one day, twice reaching `main`.** Editing a `src/content/**` file
without its `07-verification.md` in the same commit — a rule in `mistakes-log` row 19 since 7 Aug,
which I also wrote into a Stage 7 note that same morning in my own words, and then broke twice more.
Every instance was a comment or a single frontmatter value, which is the trap: none of them felt like
content edits. **Restating a rule is not complying with it; on the second breach, go looking for
where it can be enforced.** That is what #138 is.

**A prediction about a missing mechanism was wrong, and would have shipped as a feature.** Three
documents agreed `/cpd-plumbing-tas` needed a `bundleMembers` list or an `inBundle` flag. It needed
one cell changed: `Category` and `Bundle` were already separate columns at source. *A data error and
a model gap are indistinguishable from inside a generated projection* — check the source schema
before building the mechanism.

**Attempting the work found blockers that reading could not.** The FPO guardrail, the electrical
orphan and the legacy plumbing card all surfaced only because a publish was attempted and failed.
The publish was reverted rather than forced, and the guardrail was not weakened.
