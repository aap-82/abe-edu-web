# 06 · Image prompts — `/white-card`

One slot only: the Hero artefact (`Placeholder` inside `Hero.astro`, ratio `r54` — 5:4 landscape).
`HubLayout.astro` passes `artefactDesc="Hub artefact placeholder."` and no `artefactImg`, so the
slot renders as the designed FPO placeholder rather than a live `<img>`.

## Disposition: left as FPO placeholder, not generated this run

A hub carries no product of its own to photograph (archetype 6 §4: no price, no CTA, no course
content belongs to the hub). The image backlog tracked in
`handover/HANDOVER-image-prompts-2026-08-02.md` scopes its 23 open slots to **course** pages
(WA/TAS/NSW/QLD/ACT White Card and the owner-builder set), not hubs — `/owner-builder-courses`,
the only other live hub, also ships with no hero artefact image, still on the FPO placeholder.
Generating one now would make `/white-card` the only hub with a real hero image, an inconsistency
with no brief behind it.

**If a hub-level hero image is wanted later**, a candidate prompt (not commissioned this run): a
wide shot of four separate Australian construction sites arranged as a grid or split-frame, each
showing a worker holding or wearing a white card / hi-vis with a card visible, evoking "one card,
many states" without naming a specific state (avoids implying any one spoke is the primary one).
Composite the ABE logo per the AI-image-prompt convention already in use elsewhere; never generate
the logo itself.

No slot is closed or opened by this decision — `src/lib/images.ts` resolves by basename and returns
a bare string unchanged when unmatched, so omitting `artefactImg` (as done here) is the only safe
state until an image exists in `src/assets/images/` and is committed (per `check-assets.mjs`).
