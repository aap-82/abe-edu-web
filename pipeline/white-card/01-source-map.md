# Stage 1 — Government resource map + fact ledger — `/white-card` hub

A hub asserts no NEW regulatory fact; it aggregates facts already verified and sourced on each
spoke's own course page. This ledger points at those sources rather than re-verifying them —
re-researching a figure the register already owns is exactly the second-copy risk `kb/register/`
exists to prevent.

## Regulatory facts (verified elsewhere, cited here by pointer)

| Fact | Value | Source | Verified |
|---|---|---|---|
| WA: delivery mode, government fee | Online/self-paced permitted; no government card fee | `kb/register/online-delivery-policy-by-state.md` §2B | 3 Aug 2026 |
| TAS: delivery mode, government fee | Online/self-paced permitted (no residency claim — see caution below); $13.72 government fee | `online-delivery-policy-by-state.md` §2D; `state-fees-register.md` §2 | 3 Aug 2026 / 22 Jul 2026 |
| NSW: delivery mode, government fee | Live online only, RTO's own arrangement, not regulator-permitted; no separate government fee | `online-delivery-policy-by-state.md` §2A-1 | 2 Aug 2026 (settled) |
| QLD: delivery mode, government fee | Live online (CRTD), regulator-defined as face-to-face; no separate government fee | `online-delivery-policy-by-state.md` §2C | 2 Aug 2026 |
| WA/TAS/NSW/QLD: RTO partner + unit | Blue Dog Training (RTO 31193) for WA/TAS/QLD; Upskill Institute (RTO 45708) for NSW; unit CPCWHS1001 throughout | each spoke's own `partnerRto` frontmatter, `training.gov.au` | per-spoke, 22 Jul–3 Aug 2026 |

**Caution carried forward, load-bearing for Stage 4:** `kb/register/online-delivery-policy-by-state.md`
§3 explicitly instructs "Do not state a residency test for TAS... including as a comparison point on
another state's page." `scripts/check-positions.mjs` (built 4 Aug 2026) currently FAILs on
`/white-card-tas` for exactly this claim, unfixed there. **This hub's copy must not repeat it** —
TAS content states delivery mode and price only, no residency or location qualifier.

## Internal facts (asked and confirmed, not re-derived)

| Fact | Value | Source |
|---|---|---|
| Live spokes | WA ($99), TAS ($59), NSW ($129), QLD ($109 weekday / $169 Saturday) | Each course's own `price`/`priceNumber` frontmatter — already ABE's confirmed commercial figure on an already-shipped page, not re-asked |
| ACT status | Not built (`/white-card-act`, W3-5, still open on the todo list) | `handover/HANDOVER-todo-2026-08-02.md` item 8 |
| RTO for ACT (when built) | AlertForce (RTO 91826) | `kb/rules/authority-model.md`; confirmed on scope (CPCWHS1001, ACT delivery notification) via `training.gov.au` 4 Aug 2026, ahead of this hub build |

**Unknowns gate: none outstanding for this hub.** No new internal fact is needed — a hub carries no
price of its own (archetype 6 §4: "a price and CTA for the hub itself" is a forbidden carry-over) and
every spoke fact is already confirmed on a live page.

## Primary keyword and demand signal (from the todo list's own GSC citation)

Per-page GSC export (`business data/GSC/…2026-08-01.zip`, `Filters.csv` → `Page: +white-card`):

| Page | Clicks | Impressions | Position |
|---|---|---|---|
| `/white-card-wa-online` (legacy → `/white-card-wa`) | 141 | 41,586 | 9.01 |
| `/white-card` (the hub itself) | 41 | 11,227 | 19.74 |
| `/tas-online-white-card` (legacy → `/white-card-tas`) | 35 | 7,873 | 11.95 |

The hub already carries meaningful impression volume (11,227) at a weak position (19.74) — room to
move on its own merits, not just as a router. NSW and QLD are too recently built (1 and 3 Aug) to
carry comparable GSC history.
