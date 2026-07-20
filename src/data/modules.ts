import type { ModuleGroup, TopicCard } from '../types/course';

// Section 5 — 18 modules in 6 project-stage groups, rendered as rows by <ModuleRows>.
//
// SOURCE OF TRUTH: "Learning Material — Cover Sheet and Currency Statement", NONACCABE QBCC
// Owner Builder Course, v2.0 (created 07 Jan 2026, last edited 02 Jul 2026), section 2
// "Module Content and Learning Outcomes". Every `outcome` below is a compression of that
// module group's STATED learning outcomes, not marketing copy written around them.
//
// Two things from that document's change log that this list depends on. v2.0 renumbered and
// reordered the modules to the approved A-4 sequence, and consolidated insurance under
// Module 15 (former Module 1 + Module 14). The groupings here match the v2.0 numbering, so
// if the course is renumbered again these ranges move with it. Modules 1 and 18 carry no
// stated learning outcomes in the source (a Course Introduction and an Appendix), which is
// why they appear in the group contents but contribute nothing to the outcome lines.
//
// Outcomes are full sentences and start with a capital: the row renders a "You will be able
// to" kicker on its own line above them, not inline, so a lowercase continuation would read
// as a fragment.
export const moduleGroups: ModuleGroup[] = [
  {
    tag: 'Group 01', modules: 'Modules 1–2', title: 'Getting started',
    body: 'Course Introduction, and the Key Responsibilities of an Owner Builder.',
    outcome: 'Identify the roles you take on, document every decision, variation and agreement in writing, and coordinate trade contractors, site activities and your neighbours from day one.',
  },
  {
    tag: 'Group 02', modules: 'Modules 3, 11, 12', title: 'Legal &amp; safety obligations',
    body: 'Work Health and Safety, Obligations Under the QBCC Act 1991, and Approvals and Inspections.',
    outcome: 'Apply your duties as a PCBU and principal contractor under the WHS Act, work within the permit conditions the QBCC Act sets, and book the compulsory building and plumbing inspections at the right stages.',
  },
  {
    tag: 'Group 03', modules: 'Modules 4–5', title: 'Design &amp; energy',
    body: 'Design, and Environment and Energy, including the minimum 7-star energy rating.',
    outcome: 'Choose and brief a licensed designer, read a full set of working drawings, and meet the 7-star minimum energy rating that has applied to Queensland houses since 1 May 2024.',
  },
  {
    tag: 'Group 04', modules: 'Modules 6, 9, 10', title: 'Costing &amp; finance',
    body: 'Estimating, Costing and Budgets; Finance and Loan Requirements; Taxation and the QLeave levy.',
    outcome: 'Estimate the build, carry a contingency, track actual costs against budget, align your draw-downs with your contracts, and handle GST, PAYG and the QLeave levy exemption.',
  },
  {
    tag: 'Group 05', modules: 'Modules 7, 8, 13, 14', title: 'Planning &amp; running the build',
    body: 'Planning and Scheduling, Sequencing Building Activities, Building Coordination, and Payments to Trade Contractors.',
    outcome: 'Build a schedule, sequence the trades and inspections in the right order, engage QBCC-licensed contractors on written contracts, and run progress payments, variations and retention correctly.',
  },
  {
    tag: 'Group 06', modules: 'Modules 15–18', title: 'Protecting yourself &amp; finishing',
    body: 'Insurances, Conflict Prevention and Resolution, Move In and Maintenance, and Checklists and Appendix.',
    outcome: 'Insure the build properly rather than assuming your home policy covers it, resolve disputes through the QBCC or QCAT, and work through the completion checklist, service connections and ongoing maintenance.',
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
