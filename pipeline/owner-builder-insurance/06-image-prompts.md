# 06 · Image-generation prompts — `/owner-builder-insurance`

Two image slots on this page, both rendering FPO placeholders as built. Both pass the
"earns its place" test in `references/image-prompts.md`, but only just, and the reasoning is worth
recording because a third slot was considered and rejected.

## Which slots earn their place

| Slot | Verdict | Why |
|---|---|---|
| Hero artefact | **Earns it, weakly** | The strongest image on a course page is the artefact being bought. This page sells nothing, so there is no artefact. What the hero can honestly show is the *site risk* the page is about: a build behind temporary fencing, exposed to weather and theft. That carries information the text asserts but cannot show. |
| `InsurancePartner` (section 6) | **Earns it** | Same subject, different job: the block asks for a decision, and the image shows what is being protected. Matches the pattern already live on the QLD, WA and TAS course pages. |
| A per-state map or diagram | **Rejected** | The state axis is already a table, and a five-state map would restate it with less precision and no new information. `references/image-prompts.md`: "an instructional diagram only when a process genuinely branches." A comparison is not a branch. |

**No certificate imagery anywhere on this page.** The other four ABE image sets lead with a Certificate
of Completion, and reusing that motif here would imply this page sells a credential. It does not.

## Prompt 1 — hero artefact

- **Filename:** `owner-builder-insurance-hero.avif`
- **Slot:** `Hero` `artefactDesc` / `artefactSpec`, `src/pages/owner-builder-insurance.astro`
- **Spec:** 5:4 landscape, approx 1000x800, warm tone
- **Alt text (109 chars, en-AU):** `A part-built Australian home behind temporary site fencing at dusk, the risk owner builder insurance covers.`

```
A photorealistic wide shot of a part-built Australian suburban house at dusk, seen from
outside temporary mesh site fencing. Timber wall frames are up and partly clad, with
building wrap visible on one wall and window openings still unglazed. A stack of timber
sits under a tarpaulin in the foreground, weighted down. Overcast late light, warm and
slightly golden on the frame timber, eucalypts along the back boundary. Candid and
documentary, as if photographed at the end of a working day. Leave clear negative space in
the upper left third for text overlay.

Absolutely no text, letters, numbers, signage, logos, watermarks or brand marks anywhere in
the image. No people and no identifiable faces. No certificates or documents of any kind.
5:4 landscape aspect ratio.
```

**Why this composition:** the fencing and the tarpaulin are the point. They are what a reader
recognises as "my site, my risk, overnight" without a caption, and they carry the page's subject
without implying a product. The unglazed openings and exposed wrap read as weather and theft exposure,
which is exactly what contract works cover exists for.

## Prompt 2 — insurance partner block

- **Filename:** `owner-builder-insurance-partner.avif`
- **Slot:** `InsurancePartner` `imgDesc` / `imgSpec`, section 6
- **Spec:** 5:4 landscape, approx 1000x800, warm tone
- **Alt text (114 chars, en-AU):** `Stacked framing timber and tools on an owner builder site behind mesh fencing, the property cover protects.`

```
A photorealistic mid-distance shot of an Australian residential building site in daylight,
focused on stacked framing timber on pallets and a wheelbarrow resting beside it, with mesh
temporary fencing running across the foreground. Roof trusses lie flat on the ground to one
side. Overcast soft light, warm timber tones against grey gravel and churned earth. Candid
and documentary, not staged or glossy. Leave clear negative space on the right third for
text overlay.

Absolutely no text, letters, numbers, signage, logos, watermarks or brand marks anywhere in
the image. No people and no identifiable faces. No certificates or documents of any kind.
5:4 landscape aspect ratio.
```

**Why this composition:** deliberately materials-first rather than house-first, so the two images on
one page do not read as the same photograph twice. The hero shows the structure exposed; this shows
the loose, stealable, weather-exposed value sitting on the ground next to it.

## Verification when the assets land

Both slots currently render the FPO placeholder, which prints its own art direction as visible body
text on an indexable page. That is a known, still-unbuilt guard, at its fifth sighting across this
repo, and it is the reason this page should not be advertised until at least the hero is filled.

Before wiring either file:

1. **Check the real dimensions with `sharp`, not by eye.** AVIF cannot be inspected with the Read
   tool. Both slots want a ratio of 1.25; anything outside roughly 1.22 to 1.28 will be cropped by
   `object-fit: cover` and should be regenerated rather than accepted.
2. **Look at the image before writing its alt text.** Convert to PNG first. The alt text above is
   written from the prompt, which is a description of what was *asked for*, not of what arrived.
   Correct it against the delivered file.
3. **`git add` the file in the same change that references it.** `check-assets.mjs` fails the build
   on a pointer to an untracked asset, which is the guard that exists because a hero once shipped a
   live 404.
