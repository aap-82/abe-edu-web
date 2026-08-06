# 06 · Image prompts — `/white-card-act`

Two slots (`05-components.md`'s table). Both ship as FPO placeholders this run — `artefactImg` and
`imgSrc` are deliberately omitted from the MDX, per the standard convention
(`src/lib/images.ts` resolves an unmatched basename unchanged rather than erroring, so naming a file
that doesn't exist yet would emit a live `<img>` pointing at a 404). Expert headshots are real
photographs and are never generated (CLAUDE.md) — not applicable here, Warwick Smith's existing
headshot is reused via `ExpertCredentials`, no new image needed for that slot.

## Slot 1 — Hero artefact

**Target filename:** `white-card-act-hero.avif`
**Ratio:** 4:5 portrait (~1000×1250)
**Alt text (already in the MDX, 111 chars):** "A construction worker in high-visibility clothing
arriving at a face-to-face White Card training session in Canberra, hard hat in hand."

**Prompt:**
> A construction worker in Canberra, Australia, arriving at a face-to-face White Card training venue.
> They're wearing a high-visibility vest over a collared shirt, carrying a hard hat under one arm, mid-
> stride toward an entrance. Warm, natural daylight, a hint of Canberra's low-rise architecture or
> autumn-toned trees in the soft-focus background — nothing that reads as a specific identifiable
> building. Photorealistic, editorial documentary style, warm colour grading consistent with ABE's
> existing hero photography (see `white-card-tas-hero.avif`, `white-card-wa-hero.avif` for tone
> reference). No visible text, logos or signage in frame. No white card or certificate visible in this
> shot — that would overclaim a specific object this image doesn't need to show.

## Slot 2 — ZSection image (`#how-it-works`)

**Target filename:** `white-card-act-classroom.avif`
**Ratio:** 4:5 (~520×650)
**Alt text (already in the MDX, 141 chars):** "An AlertForce trainer running a face-to-face White
Card classroom safety training session in Canberra, participants seated wearing hard hats and
high-visibility clothing."

**Prompt:**
> A small group construction-safety training classroom in Canberra, Australia. A trainer at the front
> gesturing toward a presentation screen or whiteboard (content not legible/generic), 4-6 adult
> participants seated at desks or tables, several wearing high-visibility vests and with hard hats
> resting on the desk in front of them. Warm, natural indoor lighting, a plain modern training-room
> setting — no specific branding, logos or identifiable company signage anywhere in frame (this is a
> generic depiction of the delivery format, not a claim about AlertForce's specific venue, which this
> build has not confirmed). Photorealistic, editorial documentary style, warm colour grading matching
> the site's existing photography.

## Disposition: not generated this run

Neither slot is generated or committed this session — both remain the standard FPO placeholder,
consistent with how `/white-card-wa` and `/white-card-tas` shipped before their own images landed.
Added to the site's open image-generation backlog
(`handover/HANDOVER-image-prompts-2026-08-02.md`) rather than generated ad hoc here, so the
established review/generation workflow handles it alongside the other open slots.

**Caution for whoever generates these:** neither prompt should be read as confirming a specific venue,
trainer appearance, or class size — this build has no sourced fact about AlertForce's actual classroom
setup (see `01-source-map.md`'s unknowns-gate note). Both prompts are written to depict the *format*
(face-to-face, small classroom) honestly without asserting specifics nobody has confirmed.
