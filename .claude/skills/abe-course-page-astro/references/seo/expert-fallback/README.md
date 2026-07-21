# Expert Fallback Snapshot

**⚠️ FALLBACK ONLY — Notion is the source of truth.**

These files are a static snapshot of the ABE Experts database in Notion (`collection://9e2e141b-1ebd-4077-8cf6-3317b16da24a`). They exist so that expert attribution, bios, schema, and the "What NOT to Claim" guardrails can still be produced when the live Notion query fails or returns no results. They are **not** a substitute for the live query under normal conditions.

**Snapshot synced:** 26 May 2026
**Source database:** https://www.notion.so/a8dc3f4c431c420092266cf73ab4067b

## When to use these files

Use a fallback file **only** when, at the point the skill would normally query Notion (Step 4, Step 6M, Step 7, or a direct question about an expert):

1. `Notion:notion-search` / `Notion:notion-fetch` errors, times out, or returns no matching expert, **and**
2. the expert needed is one of those snapshotted below.

When you fall back, you MUST:

- Note in the build output that expert data came from the **26 May 2026 fallback snapshot, not live Notion**, so the user knows it may be stale.
- Still obey every "What NOT to Claim" rule and the credential-usage matrix in the relevant file — these are the most important guardrails and they are reproduced here in full.
- Re-verify anything date-sensitive (review dates, licence expiry, student counts) against Notion as soon as it is reachable again.

If the needed expert is **not** in this directory, do not fabricate anything — fall through to the manual placeholder (`[EXPERT DATA UNAVAILABLE — query Notion Experts database manually]`) per SKILL.md → Graceful degradation.

## Experts snapshotted

| File | Expert | ABE role | Profile URL | Headshot in Notion | Notion `Last Verified` |
|---|---|---|---|---|---|
| `warwick-smith.md` | Warwick Smith | Compliance & Currency Reviewer (independent) | `/experts/warwick-smith` | ❌ Empty (do not publish profile page until set) | 14 April 2026 |
| `dominic-ogburn.md` | Dominic Ogburn | Course Developer · CEO, ABE Education | `/experts/dominic-ogburn` | ✅ Set | 14 April 2026 |

## Field mapping

Each file mirrors the build-time fields the skill consumes from the live Notion entry: database properties (role, organisation, profile URL, headshot URL, courses reviewed, verification status, last-verified date), the four bio lengths, the Expert Card Copy block, the credential-usage matrix, the full "What NOT to Claim" list, the Person schema JSON-LD template, and the Courses URL Map. Purely historical changelog content from the Notion pages is intentionally omitted — it is not used at build time.

## Re-syncing

To refresh this snapshot, re-fetch each expert page from Notion and overwrite the corresponding file:

```
Notion:notion-search — query: "[Expert Name]", data_source_url: "collection://9e2e141b-1ebd-4077-8cf6-3317b16da24a"
Notion:notion-fetch  — id: [returned page ID]
```

Then update the **Snapshot synced** date above and the per-expert `Last Verified` column. Recommended cadence: whenever the skill's freshness audit runs (next due 24 August 2026), or sooner if an expert's credentials change.
