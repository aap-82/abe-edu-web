import type { ModuleGroup, TopicCard } from '../types/course';

// Section 5 — 18 modules in 6 project-stage groups, rendered as rows by <ModuleRows>.
//
// QLD is the exemplar for the structured shape: the module range is lifted OUT of the prose
// into its own field so it can be scanned down the rail, and each group carries the outcome
// it delivers. The outcomes are not new claims - they are the clauses of `moduleOutcome`
// below, which was already approved copy, split back onto the groups they belong to. The
// other states keep the two-field shape until their outcomes are actually written; see the
// note on the ModuleGroup type for why that is optional rather than back-filled.
export const moduleGroups: ModuleGroup[] = [
  {
    tag: 'Group 01', modules: 'Modules 1–2', title: 'Getting started',
    body: 'Course Introduction, and the Key Responsibilities of an Owner Builder.',
    outcome: 'set up your build, and explain what you take on when you sign as the owner builder.',
  },
  {
    tag: 'Group 02', modules: 'Modules 3, 11, 12', title: 'Legal &amp; safety obligations',
    body: 'Work Health and Safety, Obligations Under the QBCC Act 1991, and Approvals and Inspections.',
    outcome: 'apply work health and safety on your own site, and meet your obligations under the QBCC Act.',
  },
  {
    tag: 'Group 03', modules: 'Modules 4–5', title: 'Design &amp; energy',
    body: 'Design, and Environment and Energy, including the minimum 7-star energy rating.',
    outcome: 'design the project, including briefing to the minimum 7-star energy rating.',
  },
  {
    tag: 'Group 04', modules: 'Modules 6, 9, 10', title: 'Costing &amp; finance',
    body: 'Estimating, Costing and Budgets; Finance and Loan Requirements; Taxation and the QLeave levy.',
    outcome: 'cost the project, arrange finance, and account for tax and the QLeave levy.',
  },
  {
    tag: 'Group 05', modules: 'Modules 7, 8, 13, 14', title: 'Planning &amp; running the build',
    body: 'Planning and Scheduling, Sequencing Building Activities, Building Coordination, and Payments to Trade Contractors.',
    outcome: 'plan and sequence the work, and engage and manage licensed trades under proper contracts.',
  },
  {
    tag: 'Group 06', modules: 'Modules 15–18', title: 'Protecting yourself &amp; finishing',
    body: 'Insurances, Conflict Prevention and Resolution, Move In and Maintenance, and Checklists and Appendix.',
    outcome: 'put the right insurances in place, resolve disputes, and see the build through to move-in.',
  },
];

export const moduleOutcome =
  'By the end you will be able to set up your build, apply work health and safety, design and cost the project, arrange finance, plan and sequence the work, engage and manage licensed trades under proper contracts, put the right insurances in place, and see the build through to move-in.';

// Section 7 — wider obligations cards.
export const obligationCards: TopicCard[] = [
  { tag: '01', title: 'Safety training', body: 'Asbestos awareness if you may disturb asbestos, and a White Card if you will be on site. Both are separate from this course.' },
  { tag: '02', title: 'Deposits &amp; contracts', body: 'Under Schedule 1B of the QBCC Act 1991, trade deposits are capped: 10% under $20,000, 5% at $20,000 or more.' },
  { tag: '03', title: 'The QLeave levy', body: 'Applies to building work of $150,000 or more. Owner builders are exempt but must notify QLeave and quote the permit number.' },
  { tag: '04', title: 'NCC 7-star energy', body: 'New Queensland homes must meet a minimum 7-star energy rating under NCC 2022, current in QLD to 1 May 2027.' },
  { tag: '05', title: 'Disputes &amp; selling', body: 'A trade dispute can go to QCAT. You can hold only one owner builder permit every six years. Sell within six years of finishing and you must warn the buyer in writing before they sign, and the owner builder notation stays on the title for seven years.' },
  { tag: '06', title: 'Home Warranty', body: 'Owner builders cannot access the Queensland Home Warranty Scheme for their own work. It applies where a licensed contractor is engaged.' },
];
