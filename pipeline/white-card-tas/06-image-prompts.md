# 06 · Image prompts — /white-card-tas

Ready-to-paste generation prompts for each image slot. Expert headshots are excluded (real photos
only — Dominic Ogburn, Warwick Smith). Every slot carries its target filename, aspect ratio, and the
>= 80-character en-AU alt text that ships in the MDX. House palette: warm cream ground, maroon accent
`#800000`, natural light, documentary not stock-cliché.

Until these are generated, each slot keeps its FPO `Placeholder` / hero artefact placeholder; the page
builds and is verifiable without them (they are not ship-blockers, but they are the reason `noindex`
plus a real image pass precede public launch).

---

## Slot 1 — Hero artefact (`hero.artefactImg`)

- **Filename:** `white-card-tas-hero.webp`
- **Ratio / size:** 4:5 · ~1000×1250 · warm tone
- **Alt (ships in `hero.artefactAlt`):** "A Tasmanian construction worker in a high-visibility shirt
  and white hard hat on a residential build site, holding a construction induction White Card, natural
  daylight."
- **Prompt (ChatGPT / Gemini):**
  > Photorealistic documentary photograph, 4:5 portrait. A construction worker on a Tasmanian
  > residential building site wearing a white hard hat, hi-vis shirt, safety glasses, holding a small
  > white construction-induction card toward camera. Soft natural daylight, warm cream and timber
  > tones, shallow depth of field, site slightly blurred behind. Calm and competent, not staged or
  > glossy. No text, no logos, no watermark. Australian residential construction context.

## Slot 2 — `#your-card` (ZSection image, the lodgement process)

- **Filename:** `white-card-tas-service-tasmania.webp`
- **Ratio / size:** 4:5 · ~520×650 · warm tone
- **Alt:** "A person handing a Statement of Attainment and identity documents across a Service Tasmania
  counter to lodge a construction induction card application in person."
- **Prompt:**
  > Photorealistic documentary photograph, 4:5 portrait. A person at a government service-centre
  > counter handing a printed certificate and ID documents to a staff member, lodging a card
  > application in person. Neutral public-office interior, warm even lighting, cream and muted tones.
  > Ordinary and reassuring, no branding, no readable text on documents, no logos or watermark.
  > Australian setting.

---

## Notes

- Slot 1 is the only hero artefact. If left as the placeholder, the hero renders the FPO block and the
  build stays green.
- Slot 2 is used only if `#your-card` is built as a `ZSection` with an image; if built as a plain
  `Section` (no image), this slot is not needed. Current plan (05) uses ZSection for `#your-card`, so
  the slot exists.
- No image may imply ABE issues the card or is the RTO. Slot 2 shows a government counter, which is
  accurate: WorkSafe Tasmania issues the card via Service Tasmania.
- Alt text is >= 80 characters and en-AU, per guardrail.
