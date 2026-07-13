import type { TopicCard } from '../types/course';

// Section 5 — the detailed TAS module list is deliberately NOT published here. The
// LearnWorlds curriculum for the Tasmanian course is unconfirmed, and the Stage-4
// content brief is explicit that it must not be invented. When the real list arrives,
// restore a <TopicGrid> of module groups in the #learn section.
// [confirm: LW] final module list + learning outcomes from the LearnWorlds curriculum.
//
// `moduleOutcome` is a general capability statement (the universal owner-builder
// responsibilities named in the Stage-4 brief), not a claim about specific modules.
export const moduleOutcome =
  'take on the owner builder role with your eyes open: apply work health and safety on your site, keep the build compliant with the National Construction Code, cost and finance the project, engage and manage licensed trades under proper contracts, put the right insurances in place, and see the build through to move-in.';

// Section 7 — wider obligations cards (Tasmania). Verified regulatory facts, not course content.
export const obligationCards: TopicCard[] = [
  { tag: '01', title: 'Safety training', body: 'You need a <b>White Card</b> before you can hold the permit, and asbestos awareness if you may disturb asbestos. Both are separate from this course.' },
  { tag: '02', title: 'Building surveyor', body: 'You must engage a <b>licensed building surveyor</b> before you apply. The surveyor signs a declaration that forms part of your permit application.' },
  { tag: '03', title: 'Insurance', body: 'You must hold Public Liability insurance of at least <b>$5 million</b> and provide a Certificate of Currency with your application.' },
  { tag: '04', title: 'Contracts', body: 'Residential building contracts over <b>$20,000</b> fall under the Residential Building Work Contracts and Dispute Resolution Act 2016, which sets minimum terms and a dispute path.' },
  { tag: '05', title: 'Permit limit', body: 'Tasmania allows only <b>two owner builder permits</b> per person in any 10-year period, the strictest limit in Australia.' },
  { tag: '06', title: 'Ongoing liability', body: 'You remain liable to future owners for defective building work for up to <b>10 years</b> after the work is complete.' },
];
