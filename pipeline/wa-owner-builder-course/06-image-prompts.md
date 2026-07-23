# 06 · Image slots — /wa-owner-builder-course

**Outcome: no prompts needed. Every slot on this page is already filled with a real, commissioned
image, and no FPO placeholder remains.** This artefact records that state and verifies the alt text,
rather than generating prompts for slots that do not exist.

Measured from `dist/wa-owner-builder-course/index.html`, 23 July 2026.

---

## Slot inventory

| Slot | File | Alt length | Status |
|---|---|---|---|
| Hero artefact (`hero.artefactImg`) | `/images/wa-owner-builder-course-hero.avif` | **131 ch** | ✅ real image |
| `course` ZSection | `/images/wa-owner-builder-course-site.avif` | **111 ch** | ✅ real image |
| `how` ZSection | `/images/wa-owner-builder-course-online.avif` | **123 ch** | ✅ real image |
| `obligations` InsurancePartner | `/images/wa-owner-builder-course-insurance.avif` | **126 ch** | ✅ real image |
| Expert portrait — Dominic Ogburn | r2.dev (shared expert record) | **120 ch** | ✅ **real photograph** |
| Expert portrait — Warwick Smith | r2.dev (shared expert record) | **117 ch** | ✅ **real photograph** |
| Site logo | r2.dev brand asset | 0 ch | ✅ correct — decorative, `alt=""` |

**FPO placeholders remaining: 0** (grep for `Placeholder` / `ph-fpo` in the built page returns none).

**Guardrail check:** every content image carries alt text of at least 80 characters in Australian
English. The shortest is 111 characters; the build's ≥80 gate passes with margin. The logo is
deliberately `alt=""` because it is decorative chrome, which is the correct treatment and not a miss.

---

## Why there is nothing to generate

The WA page is the most complete page in the repo on imagery: four commissioned page images plus two
real expert photographs. Contrast `/white-card-tas`, which shipped with two FPO placeholders and needed
two generation prompts written in its own `06`.

**Expert headshots are excluded from generation by standing rule** — they are real photographs of real
people and must never be AI-generated. Both are in place, sourced from the shared `experts` collection,
so no page-level action applies.

---

## The one image-adjacent finding

Nothing on this page. Recorded for completeness: the alt text on the shared Warwick Smith portrait was
corrected earlier this session (it previously named the owner-builder course specifically, which was
false on a White Card page). That fix was made in the shared expert record, so this page inherits the
corrected, course-agnostic alt automatically. No per-page change was needed here, which is the intended
behaviour of a single-owner shared record.

---

## If a future revision adds a slot

Follow `references/image-prompts.md`: a ready-to-paste prompt per slot with target filename, aspect
ratio and the ≥80-character en-AU alt written up front. House palette is warm cream ground with the
maroon accent, documentary rather than stock-cliché, and never a hard-hat-pointing-at-a-clipboard shot.
