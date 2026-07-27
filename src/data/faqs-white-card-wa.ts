import type { FAQItem } from '../types/course';

// White Card WA FAQ. The first three items are the ASQA-mandatory questions (disclosure framework
// location 5): who delivers, who to contact, how to verify. Item 6 is the owner-builder cross-sell,
// linking DOWN to /wa-owner-builder-course, never sideways to another state's White Card page.
//
// Item 5 exists because WA's condition is LOCATION AT ASSESSMENT, not residency (WorkSafe WA,
// verified 28 Jul 2026). A reader who reads "WA residents" and books from interstate would be sold
// a course they cannot use, so the distinction is stated rather than glossed.
//
// DELIBERATELY ABSENT: "what happens if I fail the assessment?" — a natural question for a live
// assessment, but the resit policy is an internal Blue Dog fact that was not confirmed at Stage 1.
// It is left unanswered rather than invented. See pipeline/white-card-wa/04-content.md.
export const faqs: FAQItem[] = [
  {
    open: true,
    q: 'Who delivers this training?',
    a: 'Blue Dog Training Pty Ltd, RTO 31193, a registered training organisation regulated by the Australian Skills Quality Authority (ASQA). Blue Dog Training delivers the training, conducts the assessment and issues your Statement of Attainment. ABE Education recruits and markets the training on its behalf, takes your enrolment and supports you through the course. ABE Education is not a registered training organisation and does not deliver training, conduct assessment or issue qualifications.',
  },
  {
    q: 'Who do I contact about training or assessment issues?',
    a: 'Contact ABE Education about enrolment, payment, access to the course and general support. Contact Blue Dog Training about the training itself, the assessment, your Statement of Attainment and your card. If you are not sure which it is, ask ABE Education and we will point you to the right place.',
  },
  {
    q: 'How do I verify that Blue Dog Training is a real RTO?',
    a: 'Search RTO code 31193 on training.gov.au, the national register of registered training organisations. The record shows the registration status, the dates it runs between, and every unit on the organisation’s scope, including CPCWHS1001 for Western Australia. Anyone can search it and it costs nothing.',
  },
  {
    q: 'Is an online White Card accepted on Western Australian sites?',
    a: 'Yes. The unit is the same nationally recognised CPCWHS1001 whether you complete it online or in a classroom, and Western Australia permits online delivery. The card issued at the end is the same card. What matters is that the training organisation is registered to deliver the unit, and that you were located in Western Australia when you sat the assessment.',
  },
  {
    q: 'What if I am not in Western Australia when I sit the assessment?',
    a: 'Then this is not the right course for you, and the condition is a hard one: the card can only be issued to someone who was in Western Australia when they sat the assessment. Most other states and territories do not permit fully self-paced online White Card training at all, so check what applies where you are before you pay for anything.',
  },
  {
    q: 'Do I need a White Card for a Western Australian owner builder approval?',
    a: 'A white or blue card is part of one of the pathways for showing the Building Services Board you have sufficient knowledge on a Form 75 application. That pathway also asks for a Western Australian owner builder course completed within the last two years. It is not the only pathway, and a registered building practitioner does not need the card for that purpose. See our <a href="/wa-owner-builder-course">WA owner builder course</a> for the full picture.',
  },
  {
    q: 'How soon can I sit the assessment?',
    a: 'As soon as you have finished the theory. Most Western Australian learners get through it in two to six hours, and the assessment call itself takes fifteen to thirty minutes. You book the call at a time that suits you rather than waiting for a scheduled class.',
  },
];
