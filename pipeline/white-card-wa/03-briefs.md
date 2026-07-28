# 03 · Archetype selection + section briefs — /white-card-wa

## 3a · Archetype

**Archetype 2 — nationally recognised course.** Selected because the reader arrives to buy a ticket
that lets them on site, the credential is a unit of competency issued by an RTO, and ABE is not the
issuing body. Not archetype 1: there is no state approval of an ABE course here, and archetype 1's
language would be an authority-model breach.

**Authority model: asqa-accredited.** Independent of the archetype. Consequences that bind every
brief below:
- Blue Dog Training (RTO 31193) **develops, delivers, assesses and issues**. ABE enrols, publishes and
  supports. "ABE delivers training" is prohibited.
- Exactly **one** Person node — Warwick Smith, reviewer. The RTO is credited as developer via
  `Course.creator` + the credential's `recognizedBy`. A Person titled "developer" fails the build.
- "Nationally recognised" is accurate here and should be used. Statement of Attainment, not
  Certificate of Completion.

**Archetype file correction, logged not followed.** `02-nationally-recognised-course.md` §5 says
`Person x2` and names frontmatter fields `rtoPartner` / `rtoNumber` / `unitCode`. The live schema uses
`partnerRto: { name, rtoNumber, units[] }` and the ASQA rule requires **one** Person. §3 of the same
file is correct. The skill's own instruction — read `content.config.ts`, not any description of it —
resolves it. Routed `[skills]`.

**The reader** (archetype §1, sharpened by `02-gap.md`): a WA worker who needs the card to be allowed
on site. Time-pressured, comparison-shopping across near-identical offers, and — the WA-specific
part — **looking at ABE's $99 next to a $44 result that ranks above it**. Already settled: that they
need a card, that many providers sell one. Unresolved: which are real, whether online is legal for
them, what the assessment involves, and what actually arrives.

**The governing constraint from Stage 2.** The page ranks at 9.07 and converts at 0.32%. This is a
snippet-and-capsule problem before it is a ranking problem, so every capsule below is written to be
liftable into a SERP description, and the differentiator — the live assessment — is placed where a
scanner meets it, not held back.

---

## 3b · Section briefs

### Hero → frontmatter

```
Section: Hero
Position: 0
Claim: You can get a nationally recognised WA White Card online, with a live
       trainer assessment, for $99 all in.
Reader arrives: from a search result they nearly did not click, price-anchored
       to a $44 competitor, unsure whether online is even allowed for them.
Objection defused: "Is this real, and is it legal for me to do it online?"
Facts: CPCWHS1001 + Blue Dog RTO 31193 [S1/S2, 28 Jul 2026]
       self-paced online lawful in WA [S5, 28 Jul 2026]
       $99, no government fee [internal + register §2]
       theory 2-6 hrs, live assessment 15-30 min [internal, 28 Jul 2026]
Distinctive material (Stage 2): the live Zoom assessment is the only thing on
       this page a $44 competitor cannot say. It goes in the hero ticks, not
       three sections down.
Carrier: Hero (ticks incl. ASQA loc 1, proof x3, priced CTA)
Fails if: a reader cannot see the RTO number, the price and the words "live
       assessment" without scrolling.
```

### 01 · `real` — "Is this a real White Card?"

```
Claim: The course is delivered by Blue Dog Training, RTO 31193, and you receive a
       nationally recognised Statement of Attainment for CPCWHS1001.
Reader arrives: warned about worthless certificates, scanning for a real RTO
       number before reading anything else.
Objection defused: "Is this one of the dodgy ones?"
Facts: RTO 31193 Current to 20 Mar 2030, ASQA-managed [S1, 28 Jul 2026]
       CPCWHS1001 on scope for WA, Explicit, Deliver and assess [S2, 28 Jul 2026]
       ABE Education is not an RTO [asqa framework]
Distinctive material (Stage 2): the Blue Dog brand cluster is 2,460 impressions
       and 2 clicks at average position ~6.5 - a CTR of 0.08% on the name of
       the organisation that actually delivers the course. People search the
       RTO's name, find ABE in the top ten, and do not click, because nothing
       in the snippet connects the two. Naming Blue Dog here, and inviting
       verification, is the highest-value change on the page.
Carrier: AnswerCapsule + prose + VerifiedSources
Fails if: the RTO number is not visible without scrolling, or the page implies
       ABE issues the credential.
```

### 02 · `need-one` — "Do you actually need a White Card in Western Australia?"

```
Claim: If you do construction work in WA, yes - and "construction work" is
       defined far more broadly than most people expect.
Reader arrives: either not certain the rule applies to them at all (an owner
       builder, a landscaper, someone doing a fit-out), or certain it does and
       ready to skip this section.
Objection defused: "Does this actually apply to me, or am I buying something I
       don't need?"
Facts: construction work is defined at WHS (General) Regulations 2022 r. 289
       [S4, 28 Jul 2026] - construction, alteration, fit-out, renovation,
       repair, MAINTENANCE, demolition, excavation, and site preparation
       INCLUDING LANDSCAPING; also work on or near water
       the PCBU must ensure induction training is provided [S4]
       judgement factors where it is marginal - supervision, incidental work
       [S4]
       an interstate card is recognised; no need to redo WA training [S4]
       a white card is one requirement of pathway 1 of the WA Form 75
       owner-builder knowledge test [register, wa-owner-builder-course]
Distinctive material (Stage 2): "owner builder white card" is 215 impressions at
       position 5.4 site-wide, and "how to get a white card wa" another 144 at
       11.95 with zero clicks. Competitors answer "do I need one" with a
       one-line yes because their interest is the sale. Quoting r. 289's actual
       breadth - landscaping as site preparation is the line that surprises
       people - is both more useful and more persuasive.
Carrier: Section + AnswerCapsule + CanCant + VerifiedSources
Fails if: it reads as a fear pitch; or it fails to tell an interstate cardholder
       they do NOT need to buy this; or it states a minimum age (not published
       in WA - see 01 §D).
```

**Placement note.** Positioned second, directly after the trust section, on Andrey's call (28 Jul).
This overrides the Stage-3 draft, which folded it into the FAQ on the archetype's "the reader has
already settled that they need the card" line. The ordering reasoning: a reader who is *unsure*
whether the rule applies needs answering before the sell, not after it, and burying the qualifier
below the price serves only the readers who did not need it. The majority who have already settled it
scroll past one section.

### 03 · `online` — "Can you do your White Card online in Western Australia?"

```
Claim: Yes, and WA is one of only two states where it is allowed. You must be
       able to show you were located in WA when you sat the assessment.
Reader arrives: has heard online White Cards are a scam or were banned, and
       genuinely does not know whether that applies to them.
Objection defused: "Is an online White Card even legal, or will it be knocked
       back on site?"
Facts: self-paced online lawful in WA; the condition is evidence of being
       LOCATED IN WA AT THE TIME OF ASSESSMENT, not residency generally
       [S5, 28 Jul 2026]
       the six accepted evidence items, verbatim [S5, 28 Jul 2026]
       authority: item 3(a) p5, Terms and Conditions 2022 [S5]
Distinctive material (Stage 2): no competitor in the top-15 SERP publishes the
       evidence list. They say "WA residents only", which is both vaguer and
       wrong. Publishing the six items is the clearest single act of
       usefulness available on this page.
Carrier: AnswerCapsule + CanCant + VerifiedSources
Fails if: it says "WA residents" (the wrong test), or it suggests a competitor's
       lawful self-paced card is invalid.
```

### 04 · `assessment` — "What happens in the live assessment, and how do you pass?"

```
Claim: You work through the theory at your own pace, then meet a Blue Dog trainer
       on a 15 to 30 minute video call to demonstrate the safety practical.
Reader arrives: comparing a $99 course against a $44 one and unable to see any
       difference; or specifically searching how the assessment works because
       they are nervous about failing.
Objection defused: "Why would I pay $99 when the next result is $44?" and
       "What if I fail the assessment?"
Facts: theory self-paced, most WA learners finish in 2-6 hrs [internal]
       live assessment over Zoom, 15-30 min, with a Blue Dog trainer [internal,
       corroborated at ABE's own checkout 28 Jul 2026]
       assessment includes the PPE demonstration, supervised in real time
       [ppe-requirements + online-delivery register]
Distinctive material (Stage 2): "how to pass the wa white card online course and
       assessment?" is 154 impressions at position 7.91 with ZERO clicks, and
       "white card wa online course requirements and ppe list" another 104,
       also zero - 258 impressions of explicit assessment anxiety, nothing
       captured. ABE's differentiator is literally the answer to the query.
       This is the best-matched content gap on the page and the section that
       has to carry the $99.
Carrier: AnswerCapsule + Stepper OR FactGrid + Note(caution) + VerifiedSources
Fails if: the live assessment reads as a hurdle rather than the reason the card
       is worth having; or the page disparages self-paced competitors; or a
       reader still cannot tell what they will be asked to do on the call.
```

### 05 · `cost` — "What does a White Card cost in Western Australia?"

```
Claim: $99, and that is the whole cost. WA charges no government card fee.
Reader arrives: price-shopping, and has been burned before by a headline price
       that grew at checkout.
Objection defused: "What else will I have to pay?"
Facts: course fee $99 [internal, corroborated at checkout 28 Jul 2026]
       NO government card fee in WA; the RTO issues and posts the card
       [register state-fees §2, 22 Jul 2026]
       no in-person lodgement anywhere in the process [S5]
Distinctive material (Stage 2): 263 impressions of explicit cost intent at
       positions 5.7 and 6.25, two clicks between them. Competitors run
       pay-after-pass and "from $X" pricing, which is exactly the pattern that
       teaches a buyer to distrust a headline price. Stating the total, and
       that there is no second payment, is the differentiator here - NOT being
       cheap, which is not available.
Carrier: AnswerCapsule + PriceCard(priceRows) + VerifiedSources
Fails if: it argues ABE is cheap, or it hides that competitors are cheaper by
       omission in a way a reader would feel misled by.
```

### 06 · `your-card` — "What you get, when it arrives, and how long it lasts"

```
Claim: Blue Dog issues your Statement of Attainment and posts your card to a WA
       address. The card does not expire while you stay in the industry.
Reader arrives: wants to know what physically arrives and when, and whether they
       will have to do this again.
Objection defused: "What do I actually end up holding, and will I have to redo
       it in a few years?"
Facts: Blue Dog issues the SoA and the CIT card; posted to a WA address
       [S5, register §2]
       no expiry, no mandatory refresher; INVALID after two consecutive years
       or more out of the construction industry [S4, 28 Jul 2026]
       blue -> white design change 2009; BOTH still accepted [S4]
       interstate cards recognised in WA; no need to redo [S4]
       check or replace via the WorkSafe card database; if the issuing RTO has
       closed, another RTO may re-issue [S4, S6]
Distinctive material (Stage 2): "white card wa check" is 227 impressions at
       position 15.92 with ZERO clicks and NO competitor in the top 15 targets
       it. The blue/white history is absent from every competitor page in the
       set and matters to older WA workers. Interstate recognition costs ABE a
       sale it was never going to win and buys the trust that wins others.
Carrier: ZSection + AnswerCapsule + FactGrid + Note(caution for the 2-year rule)
       + VerifiedSources
Fails if: it states a card-posting timeframe (not known - see 01 §D), or carries
       TAS's $13.72 / 60-day / age-14 facts, none of which are true in WA.
```

### 07 · `content-review` — "Who developed and checked this course?"

```
Claim: Blue Dog Training develops and owns the accredited course; Warwick Smith
       independently reviews this page for legislative currency.
Reader arrives: at the E-E-A-T proof, either sceptical or simply confirming.
Objection defused: "Who is actually behind this, and is the information current?"
Facts: RTO 31193 is the developer, as an Organization [asqa framework]
       Warwick Smith, compliance and currency reviewer, dated [expert record]
       NO ABE person may be credited as developer [asqa framework; build fails]
Distinctive material (Stage 2): the regulator ranks 8th on the primary keyword,
       which says a real share of this audience wants the rules rather than a
       sales page. A dated review line and a named reviewer answer that.
Carrier: ExpertCredentials(developerRto) + dated reviewed line
Fails if: two Person nodes render, or any ABE person is titled developer.
```

### 08 · `faq` — "White Card WA questions"

```
Claim: The remaining objections are answered plainly, including the three ASQA
       questions the framework mandates.
Reader arrives: nearly decided, with one specific blocker left.
Objection defused: the residual set - who delivers, who to contact, how to
       verify, do I even need one, what if I am not in WA.
Facts: ASQA loc 5 three mandatory Qs (delivers / contact / verify) [framework]
       construction work is defined broadly at WHS (General) Regs 2022 r. 289,
       including maintenance, fit-out, excavation and landscaping as site
       preparation [S4, 28 Jul 2026]
       owner builder crossover: a white card is one requirement of the WA Form
       75 knowledge pathway [register, wa-owner-builder-course]
Distinctive material (Stage 2): "owner builder white card" is 215 impressions at
       position 5.4. The r. 289 breadth is the honest answer to "do I need one",
       and it is where the OB cross-link belongs - down and across to a real
       ABE product, not sideways to a competing state.
Carrier: Faq(items) from a data file
Fails if: the three ASQA questions are missing or reworded past recognition.
```

### CTA band → frontmatter

```
Section: CTA band
Claim: Start now, $99, and you could sit the assessment today.
Objection defused: "How soon can this be done?"
Facts: buyUrl resolves [verified 28 Jul 2026]
Carrier: CtaBand + adjacent Note carrying ASQA loc 2 (full CTA template)
Fails if: the CTA promises a timeframe for the card that is not known.
```

---

## Deliberate differences from `/white-card-tas` (same archetype, same RTO)

Recorded so a later reader can tell a decision from an oversight.

| | TAS | WA | Why |
|---|---|---|---|
| `partnerRto.placement` | `after-body` | **`after-hero`** | The schema's own comment says an ASQA page's RTO partner belongs after-hero, "since [it] answer[s] the question the reader arrived with". Backed by demand: the Blue Dog cluster is **2,460 impressions and 2 clicks at position ~6.5, a 0.08% CTR**. |
| `courseWorkload` | omitted (no measured figure) | **stated** | WA has a measured figure: theory 2-6 hrs plus a 15-30 min assessment. The schema makes it optional so nothing is invented; here it is known. |
| Cost section | two costs + total | **one cost** | WA has no government card fee. The `priceRows` table states the zero explicitly rather than dropping the row, so "no second payment" is structural rather than a claim in prose. |
| Card process | 4-step lodgement to Service Tasmania | **no lodgement step** | The RTO issues and posts the card in WA. |
| `need-one` | — | **its own section, at position 2** | **Andrey's call, 28 Jul**, overriding the draft that folded it into the FAQ on the archetype's "already settled" line. Restores the Stage-2 gap ranking, which placed it 4th, and answers the unsure reader before the sell rather than after it. |
| Section count | 7 marked | **8 marked** | One more than the archetype's "keep it tight" instinct wants. Watch total page length at Stage 7; if it runs long, `need-one` and `online` are the merge candidates, not the assessment section. |

## Open at Stage 3, to close at Stage 5

- **ASQA locations 1-7** need the same explicit resolution TAS did. Locations 3, 4, 6, 7 are
  layout-provided; 1, 2, 5 are authored. Carry the TAS resolution table forward and re-verify against
  the built HTML rather than assuming it still holds.
- **`becomeSteps: []`** again — an owner-builder-shaped required field with no archetype-2 meaning.
  Already on the demand list once from the TAS run; this is **occurrence two**, which is the trigger.

---

## 3c · Added after the run — 28 July 2026

Briefs below were written after the original Stage 3 pass, at Andrey's request. They keep new brief
numbers rather than renumbering 01-08, because a brief number is an **identity** the later artefacts
cite, while the page marker is a **position**. Rewriting the original numbering to make this look
like it was always there would destroy the record of what the run actually briefed.

### 09 · `covered` — "What does the White Card course actually cover?" (page marker 04)

**Why it was missed, stated plainly.** Not a lost section: `05-components.md` maps briefs 01-08 to
eight shipped sections and `check-pipeline` confirmed 9/9 conformance throughout. It was never
briefed. Stage 2 ranks nine content gaps plus a list of gaps deliberately declined, and curriculum
coverage appears in neither, because the GSC demand for this page is dominated by transactional and
anxiety intent (assessment, online legality, cost, card check). The archetype does not require it
either: its seven required sections were all present. So the gap is real and three layers missed it.

```
Claim: The unit covers four things, and you can see all four before you pay.
Reader arrives: has been told the card is mandatory and has accepted that, but
       has no idea what a day of "construction induction" actually contains,
       and is about to spend $99 on it.
Objection defused: "What am I actually paying $99 for? Is it a real course or
       a form I click through?"
Facts: the four elements of CPCWHS1001, verbatim from the unit's performance
       criteria [S9, 28 Jul 2026]
       PPE selection and fitting sits in element 2 and is DEMONSTRATED, which
       is what forces the live assessment [S9, 28 Jul 2026]
       unit Release 2, usage recommendation Current [S9, 28 Jul 2026]
Distinctive material (Stage 2): none directly, because Stage 2 never surfaced
       this. What it does carry is gap #1 (the live assessment, ABE's real
       differentiator): the PPE demonstration is the REASON the assessment is
       a video call, so this section sets up the section after it instead of
       repeating it.
Carrier: AnswerCapsule + BulletList (4 items) + prose + VerifiedSources
       + SectionWayfinder
Fails if: it invents ABE's own module or lesson list. That is an internal fact
       nobody holds - it is not in the repo, and the course is developed and
       owned by the RTO, not ABE. The unit's PUBLISHED elements are the only
       sourceable answer, so the section describes the UNIT, never "our
       modules". It also fails if it drifts into "what is a White Card",
       which is /white-card hub content (W3-6) and would cannibalise it.
```
