import type { TopicCard } from '../types/course';

// Section 5 — 18 modules grouped into 6 project-stage cards (rendered by <TopicGrid>).
// [confirm: LW] Provisional TAS syllabus — confirm the final module list against the LearnWorlds curriculum before production.
export const moduleGroups: TopicCard[] = [
  { tag: 'Group 01', title: 'Getting started', body: 'Your role and responsibilities. <b>Modules 1–2:</b> Course Introduction, Key Responsibilities of an Owner Builder.' },
  { tag: 'Group 02', title: 'Legal &amp; safety obligations', body: '<b>Modules 3, 11, 12:</b> Work Health and Safety, Obligations Under the Building Act 2016 and Occupational Licensing Act 2005, Approvals and Inspections.' },
  { tag: 'Group 03', title: 'Design &amp; energy', body: '<b>Modules 4–5:</b> Design, and Environment and Energy, including the National Construction Code energy requirements.' },
  { tag: 'Group 04', title: 'Costing &amp; finance', body: '<b>Modules 6, 9, 10:</b> Estimating, Costing and Budgets; Finance and Loan Requirements; Taxation and the building training levy.' },
  { tag: 'Group 05', title: 'Planning &amp; running the build', body: '<b>Modules 7, 8, 13, 14:</b> Planning and Scheduling, Sequencing Building Activities, Building Coordination, Payments to Trade Contractors.' },
  { tag: 'Group 06', title: 'Protecting yourself &amp; finishing', body: '<b>Modules 15–18:</b> Insurances, Conflict Prevention and Resolution, Move In and Maintenance, Checklists and Appendix.' },
];

export const moduleOutcome =
  'By the end you will be able to set up your build, apply work health and safety, design and cost the project, arrange finance, plan and sequence the work, engage and manage licensed trades under proper contracts, put the right insurances in place, and see the build through to move-in.';

// Section 7 — wider obligations cards (Tasmania).
export const obligationCards: TopicCard[] = [
  { tag: '01', title: 'Safety training', body: 'You need a <b>White Card</b> before you can hold the permit, and asbestos awareness if you may disturb asbestos. Both are separate from this course.' },
  { tag: '02', title: 'Building surveyor', body: 'You must engage a <b>licensed building surveyor</b> before you apply. The surveyor signs a declaration that forms part of your permit application.' },
  { tag: '03', title: 'Insurance', body: 'You must hold Public Liability insurance of at least <b>$5 million</b> and provide a Certificate of Currency with your application.' },
  { tag: '04', title: 'Contracts', body: 'Residential building contracts over <b>$20,000</b> fall under the Residential Building Work Contracts and Dispute Resolution Act 2016, which sets minimum terms and a dispute path.' },
  { tag: '05', title: 'Permit limit', body: 'Tasmania allows only <b>two owner builder permits</b> per person in any 10-year period, the strictest limit in Australia.' },
  { tag: '06', title: 'Ongoing liability', body: 'You remain liable to future owners for defective building work for up to <b>10 years</b> after the work is complete.' },
];
