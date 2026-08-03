---
date: 2026-08-03
skill: facts-session
subject: wa-git-delivery
verdict: Green
graded_by: self
---

# Facts review — WA General Construction Induction Training delivery mode, 2026-08-03

## Verdict

**Green.** Item 4 asked for the one column WA's row hadn't had checked: the delivery mode itself
(§2B, 1 Aug 2026, only corrected *eligibility* — "located in WA," not "resident"). `/white-card-wa`
(39.9k impressions, live and indexable) already states the location test correctly and needed no fix.
The delivery-mode finding is the best-evidenced of the four rows read this session: not a fresh,
current confirmation, but a real regulator statement, gated the same way as the eligibility test.

---

## 1. What was read

**WorkSafe WA/LGIRS's current live guidance**,
[Construction induction training](https://www.worksafe.wa.gov.au/construction-induction-training), read
3 Aug 2026: describes who needs training and how interstate cards are recognised. **Silent on delivery
mode** — no online/self-paced/face-to-face language, same shape as TAS and ACT.

**Work Health and Safety (General) Regulations 2022 (WA)**, the full consolidated PDF from
`legislation.wa.gov.au` (~31,000 lines extracted via `pdftotext`), read 3 Aug 2026. The definition of
general construction induction training is **word-for-word identical to TAS and ACT**: "training
delivered in Australia by an RTO for the specified VET course for general construction induction
training." A full-text search for every delivery-mode term used elsewhere in this register returned
exactly one hit — the definition itself. No other WA regulation touches delivery mode.

**An older WorkSafe WA (then DMIRS) notice**, "Construction induction training – changes to
regulations," still hosted at
`worksafe.wa.gov.au/system/files/migrated/sites/default/files/atoms/files/white_cards.pdf`, states under
"Online training": **"Online will continue to be available through registered training organisations,
scoped to deliver training in WA."** This is real regulator language, found by chance while trying to
locate the "Terms and Conditions 2022" document §2B already cites (that document itself has no public
link and was not found).

## 2. The conclusion, weighed against TAS and ACT

**Same underlying pattern as TAS (§2D) and ACT (§2E): the current regulation is silent on delivery
mode.** WA is the third state in a row with the identical "delivered in Australia" model clause and zero
delivery-mode content anywhere else in the instrument.

**But WA is not the same evidentiary position as TAS/ACT, and it would be a mistake to treat all three
identically.** The old DMIRS notice is a genuine regulator statement affirmatively permitting online
delivery, gated by the RTO's own WA scope — the same gating logic as the location test that already
governs eligibility. It is dated: it discusses the pre-2022 *Occupational Safety and Health Regulations
1996* as current, and the department name on it is two rebrands behind LGIRS. The current live page does
not repeat it, which is a gap, not a contradiction. **Net position: WA's self-paced ✅ is supported by
real if aging regulator language and contradicted by nothing found; TAS's and ACT's ✅s are contradicted
by nothing found but supported by nothing either.** That distinction is worth keeping precise rather
than flattening all three to "no restriction."

## 3. Why no page fix was needed

`white-card-wa.mdx` was checked against both findings. It already:
- states delivery as "online and self-paced for anyone **located in** Western Australia" (never
  "resident"), matching §2B's eligibility correction from 1 Aug;
- attributes the online-delivery position to WorkSafe WA via a dated `VerifiedSources` citation, not to
  an unsourced house rule;
- carries a `disclaimersHtml` line already using the regulator's own "located in Western Australia at
  the time of assessment" wording.

No demand item filed against the page — it was correct going in. This is the inverse of the TAS session
today, where the same kind of check found seven live wording errors.

## 4. Session close — every item with a disposition

| Item | Disposition |
|---|---|
| Pre-flight `system-health` | ✅ 0 failing, 14 warn at open (unchanged all session) |
| Register writes | ✅ `online-delivery-policy-by-state.md` §2B extended, §1, provenance banner and §4 updated — all sources read at source **in this session** (rule 4) |
| Page-copy check | ✅ `white-card-wa.mdx` read against both findings; no defect found, no edit made |
| This review filed | ✅ `skill-reviews/facts/` |
| Demand items routed | 0 new items this time — nothing to file |
| Session type held | ✅ only `kb/register/**` + this review |
| Post-change `system-health` | ✅ 0 failing, 14 warn, 44 ok — unchanged |
| Shipped | not shipped — working tree only, alongside the TAS and ACT reviews from earlier in this session |

## 5. What I did not do

- **Did not locate the "Terms and Conditions 2022" document itself** — §2B's eligibility quote and this
  session's online-delivery quote both come from WorkSafe WA pages that *cite* it, not from the document
  directly. It has no public link found. If it ever surfaces, re-check both quotes against it directly.
- **Did not contact WorkSafe WA/LGIRS to get a current confirmation** replacing the dated DMIRS notice.
  Not urgent — nothing contradicts the old position, and the page itself is already worded correctly.

## Demand list
Tag every item: [skills] | [design] | [facts] | [build]

- [facts] **Locate WorkSafe WA's actual "Terms and Conditions 2022" document, or obtain a current
  statement replacing the dated DMIRS online-delivery notice.** Low priority — nothing contradicts the
  current position and the live page is silent rather than adverse — but the register's best WA-delivery
  source is presently a page reference to an unlinked document plus a decade-old PDF under a superseded
  department name and regulation citation.
- [skills] **All five ABE White Card delivery-mode rows (NSW, WA, QLD, TAS, ACT) are now regulator- or
  legislation-sourced.** This closes the last item on the "do first" list that required a fresh
  regulator read for an existing product. Worth noting in the next ROADMAP/ `HANDOVER-todo` refresh —
  items 2, 3 and 4 of `handover/HANDOVER-todo-2026-08-02.md` are all now done.
