import type { FAQItem } from '../types/course';

/**
 * Answers cover only what was verified against nsw.gov.au and training.gov.au on
 * 20 Jul 2026. Questions about insurance, warranty on sale, and which specialist work needs
 * a licensed contractor are deliberately NOT answered here: those facts have not been
 * through a fact ledger, and a half-remembered answer on a regulated page is worse than no
 * answer. Add them when the ledger closes, with their own VerifiedSources line.
 */
export const faqs: FAQItem[] = [
  {
    open: true,
    q: 'Do I need an owner-builder permit in NSW?',
    a: 'You need one if you are doing or supervising residential building work on your own land where the reasonable market cost, including labour and materials, is over $10,000 including GST, and you are not engaging a licensed builder to supervise it. Below that threshold no permit is required.',
  },
  {
    q: 'When do I need to complete this course?',
    a: 'When the building work is $20,000 or more. Between $10,000 and $20,000 you still need a permit and a White Card, but not the education requirement. At $20,000 and above NSW Fair Trading requires the five units of competency this course delivers.',
  },
  {
    q: 'Is this course nationally recognised?',
    a: 'Yes. It is delivered and assessed by Upskill Institute, a registered training organisation (RTO 45708), and on completion Upskill issues a nationally recognised Statement of Attainment for the five units. ABE Education publishes the course and is not an RTO.',
  },
  {
    q: 'Which units of competency will I hold?',
    a: 'Five: CPCCWHS2001 Apply WHS requirements, policies and procedures in the construction industry; CPCCOM2001 Read and interpret plans and specifications; CPCCCM1011 Undertake basic estimation and costing; CPCCOM1013 Plan and organise work; and CPCCOM1014 Conduct workplace communication. These are the units NSW Fair Trading names for the owner-builder education requirement.',
  },
  {
    q: 'Do I need a White Card as well?',
    a: 'Yes, and it is separate from this course. A current general construction induction card is mandatory for every owner-builder permit application in NSW, whatever the work is worth. If you do not already hold one, get it before you lodge.',
  },
  {
    q: 'What does the permit itself cost?',
    a: 'The NSW owner-builder permit fee is $233 for the 2026 to 2027 financial year, made up of a $90 processing component and a $143 fixed component. It is paid to Service NSW when you apply, separately from the course fee, and owner-builder permits are issued for a one-year term only. Fees are subject to an annual CPI increase at the start of each financial year, so confirm the current amount before you lodge.',
  },
  {
    q: 'Can I get a second owner-builder permit later?',
    a: 'Not generally within five years. If you have held an owner-builder permit in the last five years you need to show evidence of special circumstances, unless the new application relates to the same land.',
  },
  {
    q: 'How long does the course take?',
    a: 'It is online and self-paced, so you set the pace and your progress is saved. There is no classroom attendance and no scheduled start date: you can enrol and begin the same day.',
  },
];
