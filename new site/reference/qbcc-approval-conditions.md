# QBCC approval — conditions binding the QLD owner builder page

**The source letters are deliberately not in this repo.** They are signed legal documents
carrying Docusign envelope IDs, Dominic Ogburn's signature and the business address, and
`aap-82/abe-edu-web` is public. They sit locally in this folder and are gitignored (`*.pdf`).
This file carries everything the site needs from them.

| | |
|---|---|
| Course code | **NONACCABE QBCC Owner Builder Course** |
| Supersedes | 10274NAT Course in Preparation for Owner Builder Permit |
| Status | **Interim and non-exclusive** |
| Granted | 25 May 2026 |
| Signed by | Cameron Byram, Director Licensing, QBCC |
| Actions accepted | 14 July 2026 |
| Next review | ~25 May 2027 (12 months from grant) |

Source documents, cited by name:

- *Interim Course Approval, QBCC Owner Builder Course* — QBCC to ABE Education Pty Ltd,
  25 May 2026, with attached Course Review Report.
- *QBCC Owner Builder Course Transition Statement* — QBCC to ABE Education Pty Ltd,
  14 July 2026.

## Why the approval exists

The QBCC granted it to keep owner builder training running while it progresses its own course
development, accreditation and procurement. It is a temporary licence arrangement, not a
permanent endorsement, and the wording of the site should never imply otherwise.

## The eight conditions

1. The course **must be identified as** "NONACCABE QBCC Owner Builder Course".
2. **All references to 10274NAT must be removed.**
3. Approval applies to **the reviewed course material only**. It is **not** an endorsement of
   ABE Education, nor of any other ABE training product or service.
4. **Any reference to QBCC approval must include the approved course code.**
5. Actions in the Course Review Report to be implemented within 30 days. *(Done — accepted
   14 Jul 2026, no further action outstanding.)*
6. **Substantial modifications** to approved training material require QBCC approval in
   advance, via IndustryEducation@qbcc.qld.gov.au. This covers course content, not marketing
   copy.
7. The QBCC may request updated material, conduct further reviews, **suspend or withdraw
   approval**, or terminate the arrangement where non-compliance, **misleading
   representations** or governance concerns are identified.
8. Approval is **reviewed 12 months from 25 May 2026.**

## The date that has teeth

**From 1 January 2027**, the QBCC accepts owner builder permit applications only where the
course completion carries the **NONACC prefix**. A six-month teach-out from ~14 July 2026
accepts certificates from both the old and new codings until then.

## What this means for the site

Conditions 2 and 4 are the ones the site breaches most easily, and condition 7 is what makes
them commercial risk rather than a style preference — a careless approval badge is grounds for
withdrawal.

Both are enforced mechanically by **guardrails check 7c** (`src/integrations/guardrails.ts`),
which fails the build when:

- `10274` appears anywhere in the built HTML, or
- a QBCC-approval claim has no `NONACC` within 200 characters of it.

The proximity window matters. A per-page check is worthless here: `SiteHeader` carries
"QBCC-approved: the NONACCABE course" into every page in the build, so "does this page mention
the code" is true everywhere regardless of what the body copy says. Verified by stripping the
code from the hub's own copy and watching a per-page check pass it.

Beyond what the guardrail can see, copy must not:

- claim ABE is QBCC-endorsed as an organisation (condition 3),
- imply the approval is permanent or exclusive — it is neither,
- describe the course as accredited or nationally recognised. QLD is
  `state-approved-direct`: approved course material, Certificate of Completion, no RTO.
