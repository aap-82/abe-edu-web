# 06 · Image-generation prompts — `/project-advisory`

**One image slot on this page, and one deliberate refusal.**

## Which slots earn their place

| Slot | Verdict | Why |
|---|---|---|
| Hero artefact | **Earns it** | On a course page the strongest image is the credential being bought. Here the artefact *is* the product, and the product is a spreadsheet — so the hero can show the actual thing, which almost no page on this site can. |
| A per-component image (3 cards) | **Rejected** | `TopicGrid` cards carry no image slot, and adding one would mean three near-identical screenshots of spreadsheets. `references/image-prompts.md`: an image must carry information the text cannot. Three would carry the same information three times. |

## The refusal, stated because it is the interesting decision

**Do not generate a screenshot of the actual spreadsheet.** The obvious hero for this page is the
Project Budget Estimator itself, and a generated image of it would be **a fabricated depiction of a
real product a customer receives**. Every number, column and total in it would be invented, and a
buyer could hold the delivered file against the picture and find they do not match. That is a
different class of problem from an illustrative photo of a building site, and the honest options are
only two: a real screenshot of the real file (which ABE Education can supply, and which would be the
best image on this page), or a scene that implies the tool without depicting its contents.

The prompt below is the second. **If Andrey can export a real screenshot of the estimator, use that
instead** — it is strictly better, it is truthful, and it is the single strongest conversion asset
this page could carry.

## Prompt 1 — hero artefact

- **Filename:** `project-advisory-hero.avif`
- **Slot:** `Hero` `artefactDesc` / `artefactSpec`
- **Spec:** 5:4 landscape, approx 1000x800, warm tone
- **Alt text (112 chars, en-AU):** `A laptop and a folder of trade quotes on a kitchen table, an owner builder working through the project budget.`

```
A photorealistic wide shot of a laptop open on a scrubbed timber kitchen table, angled away
from the camera so the screen content is not legible. Beside it, a manila folder of loose
printed quotes, a calculator, a pencil and a mug. Warm late-afternoon light from a window
to the left, a set of rolled building plans propped against the wall behind. Domestic
rather than corporate: this is an owner builder doing the numbers at home in the evening,
not an office. Candid and documentary. Leave clear negative space in the upper right third
for text overlay.

Absolutely no legible text, numbers, spreadsheet cells, letters, signage, logos or
watermarks anywhere in the image, including on the laptop screen, which must read as a
soft glow rather than any readable interface. No people and no identifiable faces.
5:4 landscape aspect ratio.
```

**Why this composition.** The screen is deliberately turned away and explicitly unreadable, which is
what keeps it from depicting a product it would be inventing. The information the image carries is
*the situation*: paper quotes, a calculator, a domestic table, evening. That is the moment the page
is sold into, and it is true without asserting anything about the file's contents.

## Verification when the asset lands

1. **Check dimensions with `sharp`, not by eye** — AVIF cannot be inspected with the Read tool.
   Target ratio 1.25; outside roughly 1.22-1.28 it will be cropped by `object-fit: cover`.
2. **Look at the image before writing its alt text.** The alt above is written from the prompt, which
   describes what was *asked for*, not what arrived — correct it against the delivered file.
3. **Check the screen is genuinely illegible.** Generators frequently produce plausible-looking
   spreadsheet rows despite instructions. If any cell content reads as text or numbers, regenerate
   rather than accept: a legible fake spreadsheet is precisely the failure this slot's refusal above
   is written to avoid. After two failures on this specific point, switch strategy — crop tighter on
   the paperwork and drop the laptop from frame entirely.
4. **`git add` the file in the same change that references it** — `check-assets.mjs` fails the build
   on a pointer to an untracked asset.
