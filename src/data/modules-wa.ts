import type { TopicCard, ModuleGroup } from '../types/course';

// Section 5 — Introduction + 12 modules grouped into 4 project-stage cards (rendered by <TopicGrid>).
// Source: ABE Education — WA Owner-Builder Course, Modules and Learning Outcomes, v2.0, 27 Jun 2026.
export const moduleGroupsWa: ModuleGroup[] = [
  { tag: 'Getting started', title: 'Deciding, and preparing', body: '<b>Introduction and Module 1:</b> course overview and requirements, an honest pros-and-cons self-assessment, then your responsibilities and liabilities as the principal builder.' },
  { tag: 'The law & the code', title: 'Legislation, NCC and bushfire', body: '<b>Modules 2, 3, 4:</b> WA legislation and safety (the three governing Acts), the National Construction Code (Class 1 and 10, Deemed-to-Satisfy, energy efficiency), and WA bushfire (BAL) requirements.' },
  { tag: 'Site hazards', title: 'Asbestos, silica and termites', body: '<b>Modules 5, 6, 10:</b> identifying and safely managing asbestos and lead, silica dust and silicosis, and termite risk, prevention and certification in WA.' },
  { tag: 'Running the build', title: 'Contracts, planning and finishing', body: '<b>Modules 7, 8, 9, 11, 12:</b> contracts, quotes, progress payments and insurance; programming and dispute handling; records, inspections and certification to Notice of Completion (BA7); project planning; and trades and scope of works.' },
];

export const moduleOutcomeWa =
  'By the end you will be able to complete Form 75, describe your duties under WA building and safety law, apply the National Construction Code and BAL bushfire rules, manage asbestos, silica and termite hazards, prepare contracts and arrange the right insurance, plan and sequence the build, and see it through to the Notice of Completion.';

// Section "What else your project needs" — wider obligation cards.
export const obligationCardsWa: TopicCard[] = [
  { tag: '01', title: 'Home indemnity insurance', body: 'If you sell within <b>seven years</b> of the building permit, you must have home indemnity insurance. Selling without it is an offence under the Home Building Contracts Act 1991 (penalty up to $10,000).' },
  { tag: '02', title: 'Workers&rsquo; compensation', body: 'If you employ anyone on site, you must hold workers&rsquo; compensation cover for them. It is separate from the trades you engage, who carry their own.' },
  { tag: '03', title: 'Approval validity', body: 'Your owner-builder approval lapses after <b>six months</b> if you have not applied for a building permit. Building permits themselves are valid for two years.' },
  { tag: '04', title: 'One approval every 6 years', body: 'You can generally hold only <b>one owner-builder approval every six years</b>, measured from when the permit is granted. A waiver is possible in genuine cases using Form 76.' },
  { tag: '05', title: 'Licensed trades', body: 'Electrical and plumbing work must be carried out by <b>licensed practitioners</b>. Owner-builder approval does not let you do licensed trade work yourself.' },
  { tag: '06', title: 'The building permit', body: 'After your approval, you apply to your <b>local council</b> for the building permit. The council charges value-based building-permit fees, separate from the approval fee.' },
];
