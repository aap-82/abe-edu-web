# 04 · Extended content — /white-card-wa

Written one section at a time from `03-briefs.md`, never from the heading. Cold reread applied before
Stage 5 (see the foot of this file).

**`{price}` resolves from frontmatter `price` ($99).** Written as a placeholder everywhere it appears,
including body prose, so this artefact cannot carry a figure that drifts from the page and so the
run records which numbers have a single owner. Every other number here is literal and sourced.

**House style applied:** Australian English, no em dashes, never "comprehensive", "ABE Education"
never bare, durations spelled out in prose.

---

## Head and hero → frontmatter

**Title tag** (66 chars)
> White Card WA Online - Blue Dog Training (RTO 31193) | ABE Education

The RTO partner's name is in the title deliberately. It is the ASQA disclosure requirement and, per
`02-gap.md` §2, the highest-value SEO change available: 2,460 impressions and two clicks sit on Blue
Dog brand queries at position 6.5 because nothing in the current snippet connects ABE Education to
the organisation people are searching for.

**Meta description** (156 chars)
> Get your nationally recognised White Card for WA online. Self-paced theory plus a live assessment
> with Blue Dog Training (RTO 31193). {price}, no government fee.

**H1**
> White Card WA.

Primary keyword verbatim, per `02-gap.md` §3.

**Hero subhead**
> Western Australia is one of only two states where you can do your White Card fully online. Work
> through the theory at your own pace, then meet a Blue Dog Training assessor on a short video call
> to finish. You receive a nationally recognised Statement of Attainment for CPCWHS1001.

**Hero ticks** (tick 2 carries ASQA disclosure location 1)
- **Nationally recognised** Statement of Attainment for CPCWHS1001
- Training delivered by **Blue Dog Training (RTO 31193)** · Enrolled through ABE Education
- **Online and self-paced** for anyone located in Western Australia
- A **live assessment with a trainer**, not a self-marked quiz

**Hero proof**
- {price} · one payment, no government fee
- 2-6 hrs · typical theory time
- 31193 · RTO partner

**How it works (hero strip)**
> Enrol → Work through the theory online → Book your live assessment → Blue Dog issues your card

**Hero CTA**
> Label: Get your White Card for {price}
> Microcopy: No hidden fees. Pay by card. Afterpay available.

The label is benefit-led with the price, because `verification.md` §1f bans "Enrol now" / "Enrol
today" by name. The microcopy overrides `Hero.astro`'s site default ("Pay by card or 4 interest-free
payments with Afterpay") with the string `cpd-building-tas` already uses, so the two pages read
alike. "No hidden fees" is strictly true here and stronger than on most pages: WA levies no
government card fee, so {price} really is the whole cost.

---

## At a glance (unmarked section)

**H2:** What do you need to know before you enrol?

**Answer capsule** (48 words)

> You pay ABE Education {price} and that is the whole cost, because Western Australia charges no
> government fee for a construction induction card. The theory is online and self-paced, the
> assessment is a live video call with a trainer, and the credential is nationally recognised.

**Carrier:** Section(bg-alt) + AnswerCapsule + FactGrid(`glance`).

---

## TrustBand (unmarked)

**H2:** Nationally recognised, delivered by an RTO

**Answer capsule, `onDark`** (19 words)

> A nationally recognised White Card, delivered and assessed by Blue Dog Training (RTO 31193) and
> published by ABE Education.

Deliberately short. It is a band restating the trust position between `cost` and `your-card`, not a
section answering a question, so the 40-to-60-word rule does not apply and a longer capsule would be
unreadable on the dark ground.

**Stats:** 31193 (Blue Dog Training RTO) · CPCWHS1001 (nationally recognised unit) · {price} (one
payment, no government fee) · Live (assessment with a trainer).

---

## 01 · `real` — Is this a real White Card?

**Answer capsule** (52 words)

> Yes. The training is delivered and assessed by Blue Dog Training, RTO 31193, and you receive a
> nationally recognised Statement of Attainment for CPCWHS1001 Prepare to work safely in the
> construction industry. Blue Dog Training issues that Statement, not ABE Education. You can check
> RTO 31193 on training.gov.au before you pay anything.

**Body**

> That number is the thing worth checking, and we would rather you did. Blue Dog Training's
> registration runs to 20 March 2030, and CPCWHS1001 sits on its scope for Western Australia with
> the right to both deliver and assess it. Both facts are on the national register, which is public
> and free to search.
>
> ABE Education is not a Registered Training Organisation. We publish the course, take your
> enrolment and support you through it. Blue Dog Training delivers the training, runs the assessment
> and issues the credential. If a provider selling you a White Card cannot tell you which registered
> training organisation stands behind it, that is your answer.

**Verified line**
> ✓ VERIFIED · SOURCES — training.gov.au, RTO 31193 record and scope. Verified 28 July 2026.

---

## 02 · `need-one` — Do you actually need a White Card in Western Australia?

**Answer capsule** (53 words)

> Yes, if you do construction work in Western Australia. The catch is that the regulations define
> construction work far more broadly than most people expect: maintenance, fit-outs, repairs,
> excavation and even landscaping done as site preparation all count. If you hold a current
> interstate card, you do not need to do this again.

**CanCant**

*Counts as construction work*
- Building, altering, converting or fitting out a structure
- Renovation, repair, maintenance and refurbishment
- Demolition, decommissioning and dismantling
- Excavation, and site preparation including landscaping
- Installing, testing or maintaining an essential service
- Assembling prefabricated elements on site

*You may not need one*
- You already hold a current construction induction card from another state or territory
- The construction work is incidental to your actual job and you are directly supervised

**Body**

> The definition sits at regulation 289 of the Work Health and Safety (General) Regulations 2022, and
> the breadth is deliberate. Landscaping is the one that catches people out: done as preparation for
> a build, it is construction work.
>
> Where it is genuinely marginal, the regulations ask whoever controls the workplace to weigh how
> complex the tasks are, how closely the person is supervised, and whether the construction work is
> incidental to the main business. The regulator's own example is a farmer building an access road on
> their own property.
>
> If you are applying for a Western Australian owner builder approval, a white or blue card is one
> part of the knowledge pathway on Form 75, alongside a Western Australian owner builder course
> completed within the last two years. [Link: /wa-owner-builder-course]

**BundleOffer — owner builder cross-sell** (added 28 Jul on Andrey's direction)

Carrier: `BundleOffer`, placed at the foot of this section because this is where the reader
self-identifies as an owner builder. The component's own contract is "two course products presented
as one deliberate bundle … the total is the sum of the parts (no discount), so the copy sells
completeness, never a saving", which is exactly the Form 75 relationship.

> **Eyebrow:** Building your own home
> **Heading:** The Form 75 knowledge pathway asks for both
> **Lede:** Most owner builders show the Building Services Board they have sufficient knowledge with
> a Western Australian owner builder course completed within the last two years, together with a
> white or blue card. If that is why you are here, one on its own will not finish the application.
>
> | Item | Sub | Price |
> |---|---|---|
> | White Card WA | CPCWHS1001, the course on this page | {price} |
> | WA Owner Builder Course | Completed within two years of applying | $179 |
> | **Both together** | | **$278** |
>
> **CTA:** See the WA owner builder course → `/wa-owner-builder-course`
> **Note:** This is one of four pathways to sufficient knowledge under the Building Services
> (Registration) Act 2011, and it is the one most owner builders use. A registered Western Australian
> building practitioner does not need either course. The Building Services Board's own application
> fee is separate and is paid to the Board, not to ABE Education.

**Why the note is not optional.** `state-fees-register.md` §2 records four pathways to sufficient
knowledge under s43(2)(b)(ii) and states plainly that **only pathway 1 needs ABE Education's course**,
adding "pages must not imply the course is the only route". A bundle block is exactly where that
implication would creep in, so the caveat and the practitioner exemption are part of the block, not
an afterthought.

**Verified line**
> ✓ VERIFIED · SOURCES — WorkSafe WA, construction induction training; WHS (General) Regulations 2022
> r. 289. Verified 28 July 2026.

---

## 03 · `online` — Can you do your White Card online in Western Australia?

**Answer capsule** (50 words)

> Yes. Western Australia is one of only two states where a fully online White Card is allowed, and
> the condition is specific: you must be able to show you were located in Western Australia at the
> time you sat the assessment. Being a Western Australian resident is not the test.

**Body**

> WorkSafe WA supplies construction induction cards to training organisations on the condition that
> they are issued only to candidates who can prove that. Any one of these does it:
>
> - a current Western Australian driver's licence
> - a current Western Australian learner driver's permit
> - current Western Australian student identification
> - a recent utilities invoice showing a Western Australian address in your name
> - Western Australian Construction Industry Training Fund payment eligibility
> - a Western Australian postal address for the card to be sent to
>
> The distinction between location and residency matters more than it sounds. Someone who lives in
> Perth but sits the assessment while away working interstate does not meet the condition. Someone
> working in Western Australia on a short contract does.
>
> Where you are within the state makes no difference. The course runs the same from Perth as it does
> from Bunbury, Geraldton or a camp in the Pilbara, and because the assessment is a video call there
> is no classroom to drive to. That is the practical reason online delivery matters more in Western
> Australia than almost anywhere else.

**Added after Stage 9 grading.** The independent grader found that "Perth" appeared twice on the page,
once inside the FPO placeholder's art-direction string and once as a *counter*-example, so the term
`02-gap.md` §3 named as "the biggest single ranking upside on the page" (1,900/mo, position 29.36) had
no positive coverage. This paragraph is not keyword filler: regional access is a genuine benefit of
online delivery in a state that size, and it is the natural thing to say in this section. Re-measured
after the fix: perth 3, bunbury 1.

**Verified line**
> ✓ VERIFIED · SOURCES — WorkSafe WA, candidates to provide evidence they are located in Western
> Australia (Terms and Conditions 2022, item 3(a) p5). Verified 28 July 2026.

---

## 04 · `assessment` — What happens in the live assessment, and how do you pass it?

**Answer capsule** (53 words)

> Two parts. You work through the theory online at your own pace, which most Western Australian
> learners finish in two to six hours. Then you meet a Blue Dog Training assessor on a video call for
> fifteen to thirty minutes and demonstrate the practical safety tasks, including fitting and wearing
> the protective equipment.

**Body**

> The video call is what separates this from a cheaper course, and it is worth understanding why it
> is there. The practical demonstration has been part of White Card assessment since December 2016,
> and regulators want it watched in real time rather than self-marked. An assessor sees you fit the
> equipment, corrects you if you have it wrong, and signs it off.
>
> It also means there is someone there when you are stuck. You book the call to suit yourself once
> the theory is done.
>
> Cheaper self-paced courses are lawful in Western Australia and the cards they issue are real. The
> credential is the same nationally recognised unit either way. What you are paying the difference
> for is a person on the other end of the call.

**Note (caution), single line**
> You will need a device with a camera and a working microphone for the assessment, and the safety
> equipment you are asked to bring.

**Verified line**
> ✓ VERIFIED · SOURCES — WorkSafe WA construction induction; online delivery and PPE demonstration
> requirements. Verified 28 July 2026.

---

## 05 · `cost` — What does a White Card cost in Western Australia?

**Answer capsule** (50 words)

> {price}, and that is the whole cost. Western Australia does not charge a government fee for a
> construction induction card: your training organisation issues it and posts it to you. There is no
> second payment, no counter to visit and no lodgement form, which is not true in every state.

**PriceCard rows**

| Row | Amount |
|---|---|
| Course fee — paid to ABE Education | {price} |
| Government card fee — none in Western Australia | $0.00 |
| **Total to a card in hand** | **{price}** |

**Body**

> That is worth saying plainly, because several states do charge a fee and some require you to lodge
> the paperwork in person before a card is issued. In Western Australia the training organisation
> issues the card and posts it to a Western Australian address, so the price you pay at enrolment is
> the price of getting the card.
>
> Cheaper White Card courses exist in Western Australia, and they are run by real training
> organisations. What differs is not the credential. It is the live assessment described above.

**Verified line**
> ✓ VERIFIED · SOURCES — kb/register/state-fees-register.md §2 (WA row), verified 22 July 2026;
> WorkSafe WA construction induction. Verified 28 July 2026.

---

## 06 · `your-card` — What do you get, and how long does it last?

**Answer capsule** (52 words)

> A nationally recognised Statement of Attainment for CPCWHS1001, issued by Blue Dog Training, and a
> construction induction card posted to your Western Australian address. The card carries no expiry
> date and there is no refresher to sit. It only lapses if you leave the construction industry for
> two consecutive years or longer.

**FactGrid**

| Key | Value | Note |
|---|---|---|
| Credential | CPCWHS1001 | Nationally recognised Statement of Attainment, issued by Blue Dog Training |
| Card | Construction induction card | Issued by the training organisation and posted to a WA address |
| Expiry | None | No refresher required while you stay in the industry |
| Lapses | After two years out | Two consecutive years or longer away from construction work |

**Body**

> If your card is blue rather than white, it is still valid. WorkSafe WA changed the design in 2009
> when the training was harmonised across the country, and both colours are accepted everywhere in
> Australia as evidence that you have completed the induction.
>
> If you have lost yours, WorkSafe WA runs a public database of cardholders. Look yourself up to find
> the training organisation that issued your card, then contact them for a replacement. If that
> organisation has since closed, another one may re-issue against your Statement of Attainment, at
> its own fee.
>
> A current card from another state or territory is recognised in Western Australia. If you already
> hold one, you do not need this course.

**Note (caution), single line**
> Leaving the construction industry for two consecutive years or longer makes the card invalid, and
> you would need to complete the training again.

**Verified line**
> ✓ VERIFIED · SOURCES — WorkSafe WA, construction induction training (card validity, blue and white
> cards, interstate recognition, replacement); construction induction training card database.
> Verified 28 July 2026.

---

## 07 · `content-review` — Who developed and checked this course?

**Answer capsule** (48 words)

> Blue Dog Training develops and owns the accredited course, as the registered training organisation
> delivering CPCWHS1001. ABE Education publishes this page, and Warwick Smith reviews it
> independently for legislative currency and regulatory accuracy. The government facts on this page
> carry the date each was last checked at its official source.

**Carrier:** `ExpertCredentials` with `developerRto="31193"` — the RTO resolves into the developer
card as an organisation, and Warwick Smith is the only Person. **No ABE person is credited as
developer**; a Person titled "developer" fails the build.

**Reviewed line:** Warwick Smith · 28 July 2026.

---

## 08 · `faq` — White Card WA questions

No answer capsule (FAQ is the documented exception). Items 1 to 3 are ASQA disclosure location 5 and
are mandatory.

**1. Who delivers this training?**
> Blue Dog Training Pty Ltd, RTO 31193, delivers the training and the assessment and issues your
> Statement of Attainment. It is a registered training organisation regulated by the Australian
> Skills Quality Authority. ABE Education recruits and markets the training on its behalf, takes your
> enrolment and supports you through the course. ABE Education is not a registered training
> organisation and does not deliver training, conduct assessment or issue qualifications.

**2. Who do I contact about training or assessment issues?**
> Contact ABE Education about enrolment, payment, access to the course and general support. Contact
> Blue Dog Training about the training itself, the assessment, your Statement of Attainment and your
> card. If you are not sure which it is, ask ABE Education and we will point you to the right place.

**3. How do I verify that Blue Dog Training is a real RTO?**
> Search RTO code 31193 on training.gov.au, the national register of registered training
> organisations. The record shows the registration status, the dates it runs between, and every unit
> on the organisation's scope, including CPCWHS1001 for Western Australia. Anyone can search it and
> it costs nothing.

**4. Is an online White Card accepted on Western Australian sites?**
> Yes. The unit is the same nationally recognised CPCWHS1001 whether you complete it online or in a
> classroom, and Western Australia permits online delivery. The card issued at the end is the same
> card. What matters is that the training organisation is registered to deliver the unit and that you
> were located in Western Australia when you sat the assessment.

**5. What if I am not in Western Australia when I sit the assessment?**
> Then this is not the right course for you, and the condition is a hard one: the card can only be
> issued to someone who was in Western Australia when they sat the assessment. Most other states and
> territories do not permit fully self-paced online White Card training at all, so check what applies
> where you are before you pay for anything.

*(Reworded after `final-check`. The original opened by restating the WorkSafe mechanism already given
in full at `#online` — "WorkSafe WA supplies construction induction cards to training organisations on
the condition that…" appeared twice on the page, near-verbatim. The FAQ now carries the consequence
and leaves the mechanism to the section that owns it.)*

**6. Do I need a White Card for a Western Australian owner builder approval?**
> A white or blue card is part of one of the pathways for showing the Building Services Board you
> have sufficient knowledge on a Form 75 application. That pathway also asks for a Western Australian
> owner builder course completed within the last two years. It is not the only pathway, and a
> registered building practitioner does not need the card for that purpose.
> [Link: /wa-owner-builder-course]

**7. How soon can I sit the assessment?**
> As soon as you have finished the theory. Most Western Australian learners get through it in two to
> six hours, and the assessment call itself takes fifteen to thirty minutes. You book the call at a
> time that suits you rather than waiting for a scheduled class.

---

## CTA band

**Heading:** Get your Western Australian White Card.
**Sub:** {price}, online and self-paced, with a live assessment run by Blue Dog Training (RTO 31193).
No government fee to pay afterwards.
**CTA:** Enrol now · microcopy: Statement of Attainment issued by Blue Dog Training

**Adjacent Note — ASQA disclosure location 2 (full template), single line:**
> ABE Education recruits and markets training on behalf of Blue Dog Training Pty Ltd (RTO 31193).
> Blue Dog Training Pty Ltd is the Registered Training Organisation responsible for delivering this
> qualification and issuing certification. All training and assessment is conducted in accordance
> with the Standards for Registered Training Organisations 2025. Blue Dog Training Pty Ltd can be
> verified on the national register at training.gov.au using RTO Code 31193.

---

## Post-audit additions — h3 subheads, and the partner card

Added 28 July on Andrey's direction, reading the rendered page. Recorded here because
**`check-pipeline` cannot see any of it**: its conformance check compares section ids and answer
capsules only, so an h3, a `BundleOffer`, an inline link or a CTA microcopy string can drift between
the page and this artefact with every gate still green. That is the phase-2 defect class inverted —
phase 2 lost briefed content on the way to the page; this run gained content the artefact never
recorded. Routed `[skills]`.

**Subhead map.** One `<h3 class="h3">` per distinct sub-topic inside a `.measure` block, using the
pattern `global.css` has styled since `tas-owner-builder-course` (`.measure .h3`). Thirteen in total.

| Section | h3 | Covers |
|---|---|---|
| `#real` | Check RTO 31193 for yourself | registration currency and scope on the national register |
| `#real` | Who does what | the ABE Education / Blue Dog split |
| `#need-one` | What counts as construction work | r. 289 breadth, landscaping |
| `#need-one` | When it is a judgement call | the marginal-case factors |
| `#need-one` | If you are an owner builder | the Form 75 pathway |
| `#online` | Proving you were in Western Australia | the six-item evidence list |
| `#online` | Location, not residency | the distinction, with the Perth example |
| `#online` | Perth or the regions, it works the same | regional access |
| `#assessment` | Why the assessment is live | the supervised PPE demonstration |
| `#assessment` | What you are paying the difference for | the honest price argument |
| `#cost` | Why there is no second payment | no government card fee |
| `#your-card` | Blue cards are still valid | the 2009 blue-to-white change |
| `#your-card` | If you have lost your card | the cardholder database and replacement |

Measured after the change: **29 headings, exactly one level skip**, and it is still only the known
`H1 → H3` at the after-hero partner card (07 F1). Every new h3 sits correctly under an h2.

**Inline link added** in `#your-card`, "If you have lost your card": *"Look yourself up in the
[construction induction training card database] to find the training organisation that issued your
card."* Descriptive anchor text, `rel="noopener"`. This closes the Stage-2 gap that was ranked fifth
and then never reached the page: "white card wa check" plus "white card check wa" is **341
impressions at zero clicks**, and no competitor in the top 15 targets it.

**Partner card copy** (`src/content/partners/blue-dog-training.md`, shared with `/white-card-tas`).
The blurb is now two logical groups, one paragraph each, and the column label reads "About the
training provider" to match ASQA disclosure location 6's own name. A second label, "Training provider
contact", now heads the email and phone group.

> Blue Dog Training develops, delivers and assesses the nationally recognised White Card unit
> CPCWHS1001, and issues the Statement of Attainment on completion.
>
> ABE Education publishes the course, takes your enrolment and provides student support. It is not a
> registered training organisation, and it does not deliver training, conduct assessment or issue
> qualifications.

Splitting the groups had a compliance benefit that was not the reason for the change: 07 F8 recorded
that the framework's closing negation, *"does not deliver training, conduct assessments, or issue
qualifications"*, appeared only in FAQ 1 and not in the footer disclosure. It now sits in the partner
card as its own paragraph, in both places the blurb renders.

## Cold reread (Move 5, applied before Stage 5)

| Check | Result |
|---|---|
| 1 · Fail conditions | All eight met. RTO number is in the title, hero tick 2 and the first sentence of `real`. `online` uses the location test, never "residents". `need-one` tells interstate cardholders not to buy. `cost` does not claim to be cheap. `your-card` states no posting timeframe. |
| 2 · Delete test | Cutting the Stage-2 findings changes six of eight sections: `real` would not lead on Blue Dog, `assessment` would not exist in this form, `cost` would argue value, `your-card` would omit the card database, `online` would say "WA residents", `need-one` would be a one-line yes. Spent. |
| 3 · First-sentence test | Every capsule opens on the answer. No "there are a few things to consider". |
| 4 · Anywhere test | The lines only ABE Education can write: the invitation to check RTO 31193 first, the six-item evidence list, "what you are paying the difference for is a person on the other end", and telling an interstate cardholder to keep their money. |
| 5 · Fact-to-meaning | Every fact is followed by its consequence. r. 289 → landscaping catches people out. Location test → the Perth-worker-interstate example. No government fee → the price at enrolment is the price of the card. |
| 6 · Archetype test | No archetype-1 language (no "approved course", no regulator approval of ABE Education's course). No owner-builder long-form. Delivery mode stated explicitly. RTO number never omitted. |
| 7 · Sources | Every government fact carries a source and 28 July 2026 verification. No `[confirm:]` markers: no regulatory fact is outstanding. |

**Capsule word counts** (target 40-60): 01 = 52 · 02 = 53 · 03 = 50 · 04 = 53 · 05 = 50 · 06 = 52 ·
07 = 48. All in range. FAQ carries none, which is the documented exception.

**Capsule-shape check** (guardrail 1b — a yes/no opener under a what/how/who heading fails the build):
01 "Is this…" → "Yes." ✓ · 02 "Do you…" → "Yes, if…" ✓ · 03 "Can you…" → "Yes." ✓ ·
04 "What happens…" → "Two parts." ✓ · 05 "What does it cost…" → "{price}," ✓ ·
06 "What do you get…" → "A nationally recognised Statement…" ✓ · 07 "Who…" → "Blue Dog Training…" ✓.
No what/how/who heading opens yes/no.

**No two sections answer the same question.** `real` is about the provider, `need-one` about the
reader's obligation, `online` about legality of the format, `assessment` about what happens,
`cost` about money, `your-card` about the artefact and its life. Checked pairwise against the
neighbour above.

---

## Open, and deliberately not answered

**What happens if you fail the live assessment?** A real objection for a scheduled assessment, and a
natural FAQ item. **It is an internal fact that was not asked at Stage 1** (resit policy, whether a
resit costs anything, how soon), so it is not answered rather than invented. Recorded here so it is
visible instead of quietly absent, and carried to Stage 9. Ask Andrey before the next White Card
state page, since the answer will apply to all of them.

---

## Added 28 July 2026 — `#covered` (brief 09, page marker 04)

Written from brief 09, not from the heading. Source for every fact: S9, the CPCWHS1001 unit record
on the national register, read 28 July 2026.

### H2 · What does the White Card course actually cover?

**Answer capsule (51 words).**

> Four things. The unit covers health and safety law on a construction site, how to spot hazards and
> control the risk, how safety information is communicated and reported, and what to do when
> something goes wrong. You also select and fit the protective equipment yourself, which is part of
> the assessment.

**Body.**

> CPCWHS1001 is built from four elements, and both the training and the assessment follow them:
>
> - **Health and safety law on site.** The duty of care you carry, the basic roles, responsibilities
>   and rights of everyone else on the job, and the safe work practices expected of you.
> - **Hazards and risk control.** The common construction hazards, the basic principles of risk
>   management, the measures used to control them, and the purpose and use of protective equipment.
> - **Communication and reporting.** Safety signs and symbols, the safety documents you will be
>   handed, who the designated safety people are, and how to report a hazard, an incident or an injury.
> - **Incidents and emergencies.** What to do when something goes wrong, how to get first aid, and the
>   types and purpose of fire safety equipment.
>
> Selecting and fitting the protective equipment sits inside the second element, and it is the part
> you demonstrate rather than answer. That is why the assessment is a live video call instead of a
> multiple-choice page, and it is worth knowing before you book one.

**Verified line.** Verified 28 Jul 2026 — the four elements of CPCWHS1001 and their performance
criteria, read on the national register (unit Release 2, usage recommendation Current) — against
training.gov.au, CPCWHS1001.

**Wayfinder.** "What the assessment involves" → `#assessment`.

### Cold-reread notes

- **Brief's fail condition:** does not invent an ABE module list; every bullet traces to a published
  performance criterion, and the section describes the UNIT rather than "our course".
- **Delete test:** the closing paragraph is the one thing here no competitor page says, because it
  explains *why* the assessment is live. Removing it would leave four bullets and no argument.
- **First-sentence test:** "Four things." answers the H2 before any set-up.
- **Anywhere test:** fails deliberately in one direction — the four elements are national, not WA
  specific. The WA specificity is carried by the sections around it, and duplicating it here would
  be padding.
- **Forbidden carry-overs:** no "our modules", no ABE-as-developer framing, no accredited-course
  claim beyond the unit itself.
