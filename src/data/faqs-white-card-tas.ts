import type { FAQItem } from '../types/course';

// White Card Tasmania FAQ. The first three items are the ASQA-mandatory questions (disclosure
// framework location 5): who delivers, who to contact, how to verify. The last item is the
// owner-builder cross-sell (Stage-2 demand: "white card and owner builder course", 5.62% CTR),
// linking DOWN to /tas-owner-builder-course, never sideways to another state's White Card page.
export const faqs: FAQItem[] = [
  {
    open: true,
    q: 'Who delivers this training?',
    a: 'Blue Dog Training Pty Ltd, RTO 31193, a registered training organisation accredited by the Australian Skills Quality Authority (ASQA). Blue Dog delivers the training, conducts the assessment and issues the Statement of Attainment. ABE Education publishes the course and handles enrolment and support, and is not an RTO.',
  },
  {
    q: 'Who do I contact about a training or assessment problem?',
    a: 'For anything about the training itself, the assessment or your Statement of Attainment, the RTO, Blue Dog Training, is responsible. For enrolment, payment, access to the course or general support, contact ABE Education. We will connect you with Blue Dog where an issue is theirs to resolve.',
  },
  {
    q: 'How do I verify the RTO?',
    a: 'Go to <a href="https://training.gov.au/organisation/details/31193">training.gov.au</a>, the national register, and search RTO code 31193. You will find Blue Dog Training listed as current, with CPCWHS1001 on its scope. Checking before you enrol is sensible, and we encourage it.',
  },
  {
    q: 'How long does the course take?',
    a: 'It is self-paced, so the time is yours to set. You can work through it across one or two sittings, including the video assessment, and pick it up where you left off.',
  },
  {
    q: 'Can I do the online course if I do not live in Tasmania?',
    a: 'The self-paced online course is for Tasmanian residents. If you live in another state, the delivery rules there may require real-time or in-person training, so use your own state’s White Card course instead.',
  },
  {
    q: 'I am on a student visa. Can I enrol?',
    a: 'Yes. You need a Unique Student Identifier, which anyone studying nationally recognised training in Australia can create, and identity documents for the card lodgement.',
  },
  {
    q: 'When will my card arrive?',
    a: 'After you lodge your Statement of Attainment at Service Tasmania, WorkSafe Tasmania processes the application and posts the card. If it has not arrived within 60 days of lodgement, contact WorkSafe Tasmania.',
  },
  {
    q: 'I am also doing an owner builder permit. Do I need the White Card as well?',
    a: 'Yes. A Tasmanian owner builder needs both an approved owner builder course and a White Card. If that is you, see the <a href="/tas-owner-builder-course">Tasmanian owner builder course</a>; the two together are what CBOS and WorkSafe Tasmania expect.',
  },
];
