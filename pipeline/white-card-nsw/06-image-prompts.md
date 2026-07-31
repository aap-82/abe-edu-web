# 06 — Image prompts — `white-card-nsw`

Two slots. Both currently ship as **FPO placeholders**: `artefactImg` and `imgSrc` are deliberately
omitted rather than pointed at filenames that do not exist yet. `check-assets.mjs` fails the build on
an image reference whose file is not tracked in git, and `src/lib/images.ts` returns an unmatched
basename unchanged, which is how a live `<img>` to a 404 once shipped on an indexable page.

**To fill a slot:** generate the image, save it to `src/assets/images/` under the exact filename
below, `git add` it, then add the `artefactImg` / `imgSrc` line. Both steps or neither.

Expert headshots are excluded from image generation and are always real photos. Neither slot here is
a person's portrait; both are scene images and may be generated.

---

## Slot 1 — Hero artefact

- **Target filename:** `white-card-nsw-hero.avif`
- **Frontmatter line to add:** `artefactImg: "/images/white-card-nsw-hero.avif"`
- **Spec:** 4:5 portrait, ~1000×1250 native. `artefactRatio: "r45"` is already set, so a 4:5 file
  needs no resize. Without `artefactRatio` the Hero defaults to `r54` landscape and a portrait image
  renders inside a landscape box.
- **Alt text (117 chars, inside the 80-125 guideline):**
  `A man in a Sydney home office attending the live online White Card session on a laptop, wearing a high-visibility vest.`

**Prompt (ChatGPT / Gemini):**

> A photorealistic image of a man in his thirties sitting at a desk in a modest home office in a
> Sydney suburb, attending a live online training session on an open laptop. He is wearing a
> high-visibility vest over a work shirt, with a white hard hat resting on the desk beside him next to
> safety glasses and ear plugs. Warm afternoon light from a window to his left. He is looking at the
> screen and listening, not posing for the camera. Natural documentary photography, warm neutral
> colour grading, shallow depth of field. Portrait orientation, 4:5 aspect ratio, approximately
> 1000x1250 pixels. No text, no logos, no watermarks, no readable content on the laptop screen.

**Art direction notes.** The whole point of this frame is that the training is live and at home at the
same time, so the laptop must read as a video call rather than a self-paced course: a visible webcam
tile or a speaking-participant layout, blurred enough to carry no readable text. The PPE on the desk
is the second story, because the assessment requires it. Do not render anything legible on screen; the
`white-card-tas` run had to rewrite its alt text after the generated frame showed a course title that
was not ABE Education's.

---

## Slot 2 — ZSection image, `#your-card`

- **Target filename:** `white-card-nsw-digital-card.avif`
- **Frontmatter line to add:** `imgSrc: "/images/white-card-nsw-digital-card.avif"` on the
  `<ZSection id="your-card">` call
- **Spec:** 4:5, ~520×650
- **Alt text (124 chars):**
  `A construction worker showing a digital construction induction card on a phone to a site supervisor at a Sydney site entrance.`

**Prompt (ChatGPT / Gemini):**

> A photorealistic image of a construction worker in a high-visibility shirt and hard hat standing at
> the entrance to a building site in Sydney, holding up a smartphone to show a digital credential to a
> site supervisor holding a clipboard. Both are mid-conversation and relaxed. Overcast daylight,
> scaffolding and site fencing softly out of focus behind them. Natural documentary photography, warm
> neutral colour grading. Portrait orientation, 4:5 aspect ratio, approximately 520x650 pixels. No
> text, no logos, no watermarks, and no readable content on the phone screen.

**Art direction notes.** This illustrates the section's actual argument, which is that you can work
before the plastic card arrives. Phone screen must carry nothing legible: rendering an invented card
design would be a fabricated government credential, which is the one thing this slot must not do.

---

## Consistency with the built set

Both prompts match the house treatment already on `white-card-wa` and `white-card-tas`: real working
people in real settings, warm neutral grade, documentary rather than stock-advertising framing, no
text anywhere in frame. Do not generate a person who could be read as a named ABE Education expert.
