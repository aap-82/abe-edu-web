import type { FAQItem } from '../types/course';

// White Card NSW FAQ. The first three items are the ASQA-mandatory questions (disclosure framework
// location 5): who delivers, who to contact, how to verify. The rest come from real GSC queries on
// the 1 Aug 2026 page-filtered export (`can you get a white card online in nsw`, `white card
// validity nsw`, `qld white card in nsw`, `wa white card in nsw`), not from invention.
//
// NO cross-sell item here, deliberately. The TAS page closes with a link DOWN to the TAS owner
// builder course; NSW has no equivalent. NSW Owner Builder is on hold, its two pages are noindexed
// and must not be linked, and the WA and TAS White Card pages are competing spokes that are also
// legally wrong for this reader.
export const faqs: FAQItem[] = [
  {
    open: true,
    q: 'Who delivers this training?',
    a: 'Upskill Institute Pty Ltd, RTO 45708, a registered training organisation accredited by the Australian Skills Quality Authority (ASQA). Upskill Institute delivers the training, conducts the assessment and issues the Statement of Attainment. ABE Education publishes the course and handles enrolment and support, and is not an RTO.',
  },
  {
    q: 'Who do I contact about a training or assessment problem?',
    a: 'For anything about the training itself, the assessment or your Statement of Attainment, the RTO, Upskill Institute, is responsible. For enrolment, payment, access to your session or general support, contact ABE Education. We will connect you with Upskill Institute where an issue is theirs to resolve.',
  },
  {
    q: 'How do I verify the RTO?',
    a: 'Go to <a href="https://training.gov.au/organisation/details/45708">training.gov.au</a>, the national register, and search RTO code 45708. You will find Upskill Institute listed as current, with CPCWHS1001 on its scope to deliver and assess. Checking before you enrol is sensible, and we encourage it.',
  },
  {
    q: 'Can I get a White Card online in NSW?',
    a: 'Yes. The whole course runs online, with no travel and no classroom. Upskill Institute runs it as a booked session with a live trainer rather than as a self-paced course you click through, so the training and the assessment both happen in real time.',
  },
  {
    q: 'Why can I not do a self-paced White Card in NSW when other states can?',
    a: 'Fully self-paced online delivery only applies in Western Australia, for candidates located there at assessment, and Tasmania, for training completed there, so a course you click through on your own is not an option in New South Wales no matter how it is advertised. Upskill Institute delivers this one as a live trainer-led session under its SafeWork NSW registration, RTO800520, with nothing pre-recorded and no self-paced portion to work through beforehand.',
  },
  {
    q: 'How long does the course take?',
    a: 'About seven hours in one day, including breaks. Sessions run Monday to Saturday from 9am to 4pm, and there is an evening class on Tuesdays from 4pm to 11pm.',
  },
  {
    q: 'What do I need before the session starts?',
    a: 'A Unique Student Identifier, a hundred points of identification, a location in New South Wales for the duration of the session, and your own personal protective equipment: a hi-vis vest or shirt, a hard hat, ear plugs and safety glasses. The assessment includes fitting and wearing them correctly on camera.',
  },
  {
    q: 'I have a White Card from another state. Do I need a NSW one?',
    a: 'Usually not. SafeWork NSW accepts construction induction cards issued by other states and territories, so a valid Queensland, Western Australian or Tasmanian card works on NSW sites. The exception is a card that has gone void, which happens after two consecutive years or more without construction work.',
  },
  {
    q: 'How long until my card arrives, and can I work before then?',
    a: 'Your card usually arrives within thirty days. You can work in the meantime on the statement of training emailed to you on the day you pass, which is valid for sixty days. Upskill Institute lodges the card application with SafeWork NSW for you.',
  },
  {
    q: 'Does my White Card expire?',
    a: 'It has no expiry date, but it becomes void if you have not carried out construction work for two consecutive years or more. After that the training has to be completed again before you return to site.',
  },
];
