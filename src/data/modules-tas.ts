import type { TopicCard, ModuleGroup } from '../types/course';

// Section 5 — the TAS course curriculum, taken from the LearnWorlds table of contents
// (confirmed by Andrey, 14 Jul 2026). Nine numbered sections. The front items (course
// disclaimer, insurance pages, foreword) and the closing items (Downloads, Certification)
// are course admin, not curriculum, and are deliberately not listed here.
export const moduleGroups: ModuleGroup[] = [
  { tag: '01', title: 'Prepare to be an owner builder', body: 'What the owner builder role actually means before you commit to it.' },
  { tag: '02', title: 'The regulatory authorities, permits and certificates', body: 'The Director of Building Control, your <b>building surveyor</b>, the certificate of likely compliance, planning and building permits, plumbing applications, start-work notification, and the Tasmanian Heritage Register.' },
  { tag: '03', title: 'The professionals', body: 'Who you need on the job, what each one is licensed to do, and how to engage them.' },
  { tag: '04', title: 'Contracts', body: 'Residential building contracts, including the minimum terms that apply to work over <b>$20,000</b> and the dispute path.' },
  { tag: '05', title: 'Estimating and job costing', body: 'Costing the build, budgeting, and keeping the project to the number.' },
  { tag: '06', title: 'Design considerations and sustainable building', body: 'Design criteria and standards of building work, <b>6-star energy efficiency</b>, passive solar design, orientation, glazing, thermal performance, ventilation, shading, building fabric and solar incentives.' },
  { tag: '07', title: 'Plans, drawings and specifications', body: 'Reading and working from the documents your build is approved against.' },
  { tag: '08', title: 'Managing your project', body: 'Running the site: sequencing, supervising trades, and seeing the build through.' },
  { tag: '09', title: 'Insurance', body: 'The cover you must hold, including Public Liability of at least <b>$5 million</b> for your permit application.' },
];

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
