# Audit Workflow

User-triggered mode for verifying every recommendation in the ABE SEO Content Engine against current Google and schema.org guidance, producing a drift report, and applying approved updates.

This is distinct from per-run checks (which verify a single output as it is produced). Audit mode brings the **skill itself** up to date so future per-run checks have a fresh baseline.

---

## When to invoke audit mode

### Trigger phrases

The skill enters audit mode when the user says any of:

- "audit the skill" / "audit this skill"
- "check the skill against current Google guidance"
- "is this skill still current?"
- "run the freshness audit"
- "update the skill against latest [Google/schema/SEO] guidance"
- "check for drift"
- "verify the skill is current"

If the phrasing is ambiguous (e.g., "audit my page" — which could mean schema audit, content audit, or skill audit), confirm with the user before launching the workflow.

### When to recommend audit mode unprompted

- When the `Skill last audited` date in `freshness-check.md` is more than **90 days** older than the current date (use `user_time_v0` to check current date when starting any new conversation that invokes the skill)
- When per-run checks have flagged drift in the same source twice in recent conversations (Claude won't always remember this — but if the user mentions "you flagged this last time too", recommend audit)
- After any major Google search announcement the user mentions (e.g., "I read about a Google update yesterday")

The recommendation is non-blocking. Mention it once at the start of a session, then proceed with the user's actual request.

---

## Audit workflow

### Step 1 — Confirm scope and tier

Audit can run at three depths. Confirm with the user before starting:

| Tier | Coverage | Sources fetched | Time |
|---|---|---|---|
| **Quick** | High-volatility sources only (🔴 entries in `freshness-check.md`) | ~6 sources | Fast |
| **Standard** | All 🔴 and 🟡 entries | ~20 sources | Moderate |
| **Full** | Every entry in the registry, including 🟢 | ~30+ sources | Long |

Default to **Standard** unless the user specifies otherwise. If the skill has never been audited (first run after framework installation), recommend Full.

### Step 2 — Read the registry

Read `references/freshness-check.md` end-to-end. Build an internal worklist of sources to fetch, grouped by section, filtered by the chosen tier.

### Step 3 — Fetch sources

For each source in the worklist:

1. `web_fetch` the source URL
2. If `web_fetch` fails or returns unexpected structure (404, redirect to unfamiliar URL, page entirely restructured), mark as **could not verify** and continue. Do not block on a single failed source.
3. If the URL has redirected to a new canonical location, record the redirect — the registry will need an entry update.

Fetch in series, not parallel — Google's docs are stable and rate limits aren't a concern, but ordering helps when interpreting cross-references.

### Step 4 — Compare against the skill

For each fetched source, locate the section(s) in the skill it backs (the `Backs:` field in the registry entry). Compare the "Key claims to verify" against the live source. For each claim:

- **Match** — live source confirms the skill's recommendation
- **Drift, low-risk** — wording or framing has changed but the substantive recommendation is unchanged
- **Drift, must-update** — Google's recommendation has materially changed; the skill is now incorrect
- **New guidance** — the live source covers something the skill doesn't

Be conservative on the third category. If you're unsure whether a wording change is substantive, classify as "low-risk" and let the user decide.

### Step 5 — Produce the drift report

Output the report in this format:

```
═══════════════════════════════════════════════════════
  ABE SEO CONTENT ENGINE — FRESHNESS AUDIT
═══════════════════════════════════════════════════════
  Date:               [DD Month YYYY]
  Tier:               [Quick / Standard / Full]
  Sources checked:    [N of M]
  Could not verify:   [count]
  Last audited:       [previous date from registry]
═══════════════════════════════════════════════════════

✅ STILL CURRENT  ([count])
  Sources confirmed unchanged since last audit. No action needed.
  · [Source name] — [URL]
  · ...

🟡 DRIFT — LOW RISK  ([count])
  Wording or framing changes only. Recommendation unchanged.
  Skill update is optional but improves clarity.

  · [Source name] — [URL]
    Skill section: [file / section]
    Old wording: [paraphrase]
    New wording: [paraphrase]
    Proposed edit: [yes / no — if yes, see Section 7]

  · ...

🔴 DRIFT — MUST UPDATE  ([count])
  Google's recommendation has materially changed. Skill is now stale.

  · [Source name] — [URL]
    Skill section: [file / section]
    What changed: [description]
    Current skill text: "[verbatim quote of the affected line]"
    Live source guidance: [paraphrase or short quote — keep under 15 words]
    Proposed replacement text: "[new line]"
    Risk if not updated: [low / medium / high — what happens to ABE pages built with the stale guidance]

  · ...

🆕 NEW GUIDANCE  ([count])
  Live source covers something the skill doesn't address.

  · [Source name] — [URL]
    Topic: [description]
    Suggested skill addition: [where it would go — file / section]

  · ...

⚠️ COULD NOT VERIFY  ([count])
  Sources that didn't fetch cleanly. Manual check required.

  · [Source name] — [URL]
    Issue: [404 / redirect / page restructured / fetch error]
    Last successful verification: [date]
    Recommendation: [what the user should do]

  · ...

═══════════════════════════════════════════════════════
  PROPOSED ACTIONS
═══════════════════════════════════════════════════════
  1. Apply [N] must-update edits to skill
  2. Apply [N] low-risk edits (optional)
  3. Add [N] new-guidance sections
  4. Resolve [N] could-not-verify entries
  5. Update last-verified dates on [N] sources

  Reply with which actions to apply (e.g., "1 and 4", "all", "skip").
═══════════════════════════════════════════════════════
```

### Step 6 — Wait for user approval

Do not automatically apply edits. The user may:

- Accept all proposed edits ("apply all")
- Accept a subset ("just 1 and 3")
- Reject specific edits ("skip the spam policy one — I'll handle that manually")
- Ask for more detail on a specific drift item before deciding

If the user asks for more detail, return to the relevant source, fetch the full section, and explain. Then re-present the proposed action list.

### Step 7 — Apply approved edits

For each approved action:

1. **Edit the relevant skill file** using `str_replace`. Show the old/new diff before editing if the change is substantive.
2. **Update the corresponding registry entry** in `freshness-check.md` — bump the `Last verified` date to today, and amend any "Key claims to verify" if Google's coverage of the topic has shifted.
3. **Update the `Skill last audited` line** at the top of `freshness-check.md` to today's date.
4. **For new-guidance additions** — propose the new section inline first (so the user sees the wording), then add to the appropriate reference file.

Apply edits one section at a time so the user can intercept if a proposed edit looks wrong on closer inspection. Do not batch all edits silently.

### Step 8 — Confirm and close out

After all approved edits are applied:

```
═══════════════════════════════════════════════════════
  AUDIT COMPLETE
═══════════════════════════════════════════════════════
  Edits applied:           [count]
  Sources updated:         [count]
  New sections added:      [count]
  Could-not-verify open:   [count] (manual follow-up)
  Skill last audited:      [today's date]
  Next audit recommended:  [today + 90 days]
═══════════════════════════════════════════════════════
```

If any "could not verify" items remain open, list them again with a note: "These need manual follow-up. The next per-run check that touches these sources will surface a freshness warning until they are resolved."

---

## Safeguards

### Don't fabricate drift

If the live source is paywalled, fails to fetch, or returns content that doesn't clearly map to the skill's claim, mark as "could not verify" — never invent drift to produce a fuller report. An empty report is a valid result.

### Don't overwrite without showing

Every edit to a skill file must be visible in the conversation before it is applied. The user must see the current text and the proposed replacement, side by side, before approving.

### Don't update last-verified without verifying

The `Last verified` date in the registry only updates when the source was actually fetched and compared. Per-run checks update this date for the specific source they consulted; audit mode updates it for every source it checked.

### Distinguish Google guidance from industry consensus

Some recommendations in the skill (e.g., "best content in first 30% of page", "120–180 words between headings", "85% of AIO citations from updated content") are derived from industry studies, not Google's stated position. When auditing these, note the distinction:

- If Google's source contradicts the industry-derived figure, flag as drift
- If Google's source is silent on the figure, note "no Google guidance — figure remains industry-derived" and don't flag

### Respect copyright limits when quoting sources

When quoting Google's docs in the drift report, follow the standard rule: keep direct quotes under 15 words and use only one quote per source. Paraphrase otherwise.

---

## Quick-audit shortcut

If the user wants only a single source verified ("did Google change anything about Course schema?"), skip the registry walkthrough. Run the four steps directly against that one source:

1. Locate the registry entry
2. Fetch the source
3. Compare against the skill
4. Produce a one-source drift report (use the same format as Step 5 above, just with one entry)

This is useful when the user has heard about a specific update and wants to check before running a full audit.
