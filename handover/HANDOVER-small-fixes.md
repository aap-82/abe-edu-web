# Handover — small fixes (figures without a source)

For Claude Code in `C:\dev\abe-web` on `main`. Self-contained. Short session.

`node scripts/check-claims.mjs` is down to 8 warnings and 0 FAIL. This clears the remaining 8. None
of them blocks phase 2, but each is a number on a live page that nothing can vouch for, and that is
the exact condition `kb/` exists to eliminate.

Windows PowerShell 5.1: `&&` is not a statement separator. New branch. Do not commit or push without
asking.

---

## The rule that governs this whole session

**Do not add a figure to `kb/register/` to silence a warning.** A figure enters the register only
when it has been read at an official source in this session, with a URL and a date. If you cannot
verify it, the answer is either "this is an ABE commercial figure, not a government one" (say so, and
it stays out of the register) or "this is unverified" (record it as such, as the previous session
correctly did for `$50,000`).

Silencing a warning by inventing provenance is worse than the warning.

---

## Task 1 — identify four unexplained figures

Three pages carry a total built from the course price plus a second cost that appears nowhere in the
register:

| Page | Figures | Arithmetic |
|---|---|---|
| `src/content/courses/qld-owner-builder-course.mdx` | $124, $303 | $179 + **$124** = $303 |
| `src/content/courses/owner-builder-nsw-course-w.mdx` | $134, $333 | $199 + **$134** = $333 |
| `src/content/courses/wa-owner-builder-course.mdx` | $278 | $179 + **$99** = $278 |

Read each page around those figures and determine what the second cost is. Likely candidates,
in rough order: a bundle or add-on ABE sells, a competitor comparison, an insurance premium, or a
government fee that is genuinely missing from the register.

For each, report which it is. Then:

- **ABE commercial figure** (bundle, add-on, comparison) → leave it on the page, and add its value to
  the frontmatter or a documented exclusion so the check stops flagging it. Say which mechanism you
  used.
- **Government figure** → verify at the official source, add it to the right `kb/register/` file with
  URL and date, and reference it from the page. If it cannot be verified this session, record it
  UNVERIFIED and report it.
- **Third-party figure** (an insurer's premium, a competitor's price) → it needs a source and a date
  like anything else, but it belongs in `kb/register/competitor-pricing-snapshot.md`, not the fee
  register.

`$99` on the WA page is inferred from arithmetic, not read from the file — confirm it actually
appears there before treating it as a figure.

---

## Task 2 — `$50,000` is live and unverified

`check-claims` reports it in both `src/content/courses/wa-owner-builder-course.mdx` and
`src/data/faqs-wa.ts`. The register records it as UNVERIFIED, which is correct and honest, but it is
published to the public without a source.

Work out what the threshold is for — the WA owner-builder work-value trigger is **$20,000**, so
`$50,000` is something else — then verify it at the official WA source (Building and Energy / LGIRS,
or the relevant WA legislation). Add the source and date to
`kb/register/eligibility-by-state.md`.

**If you cannot verify it this session, say so and recommend removing the claim from the page**
rather than leaving an unsourced regulatory number in front of customers. Do not remove it yourself
without asking — it may be load-bearing for the page's argument.

---

## Task 3 — close a single-owner leak

`$278` and `$50,000` each appear in **two** files: the WA course page and `src/data/faqs-wa.ts`. Two
copies of the same number is the problem `kb/` was created to prevent, in miniature — they will
diverge the first time one is updated.

Once Task 1 and 2 have established what each figure is, make the page and the FAQ data read from one
place. Prefer sourcing from the register (or from a single constant that references it) over
duplicating the literal.

While there, check whether the same pattern exists elsewhere:

```powershell
Select-String -Path src\data\*.ts -Pattern '\$[\d,]+' | Select-Object -First 40
```

Report any other figure that appears both in `src/data/` and in a page.

---

## Task 4 — confirm `$150,000` was resolved

An earlier run flagged `$150,000` in `src/data/modules.ts`. It no longer appears in the check output.
Confirm why — verified and added to the register, reclassified as an ABE figure, excluded, or removed
from the file. One line in your report. If it was excluded without being identified, treat it as
Task 1 and identify it.

---

## Verify

```powershell
node scripts/check-claims.mjs
node scripts/system-health.mjs
npm run build
```

Expected: `check-claims` at 0 FAIL and materially fewer than 8 warnings, with every remaining warning
explained in your report. Build 17 pages, guardrails green. The `Totals:` line must still report all
6 course page totals reconciling.

## Constraints

- Never default or invent a regulatory fact. Verify it, or mark it UNVERIFIED and leave it visible.
- Never silence a check by adding an unverified figure to the register.
- `kb/register/` stays the single owner of every government figure.
- Australian English. No em dashes in body copy. Never "comprehensive". ABE is not an RTO.

## Report back

One line per figure — `$124`, `$134`, `$99`/`$278`, `$50,000`, `$150,000` — saying what it is, what
you did, and where its source now lives. Plus any other `src/data/` duplication found, and the final
output of the three commands.
