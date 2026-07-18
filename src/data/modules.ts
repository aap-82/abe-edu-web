import type { TopicCard } from '../types/course';

// Section 5 — 18 modules grouped into 6 project-stage cards (rendered by <TopicGrid>).
export const moduleGroups: TopicCard[] = [
  { tag: 'Group 01', title: 'Getting started', body: 'Your role and responsibilities. <b>Modules 1–2:</b> Course Introduction, Key Responsibilities of an Owner Builder.' },
  { tag: 'Group 02', title: 'Legal &amp; safety obligations', body: '<b>Modules 3, 11, 12:</b> Work Health and Safety, Obligations Under the QBCC Act 1991, Approvals and Inspections.' },
  { tag: 'Group 03', title: 'Design &amp; energy', body: '<b>Modules 4–5:</b> Design, and Environment and Energy, including the minimum 7-star energy rating.' },
  { tag: 'Group 04', title: 'Costing &amp; finance', body: '<b>Modules 6, 9, 10:</b> Estimating, Costing and Budgets; Finance and Loan Requirements; Taxation and the QLeave levy.' },
  { tag: 'Group 05', title: 'Planning &amp; running the build', body: '<b>Modules 7, 8, 13, 14:</b> Planning and Scheduling, Sequencing Building Activities, Building Coordination, Payments to Trade Contractors.' },
  { tag: 'Group 06', title: 'Protecting yourself &amp; finishing', body: '<b>Modules 15–18:</b> Insurances, Conflict Prevention and Resolution, Move In and Maintenance, Checklists and Appendix.' },
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
