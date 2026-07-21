# Archetype 6 — Hub

A page whose job is to route a reader to the right child page. It earns its place by making a choice
easy, not by explaining a topic.

## 1 · Reader and arrival state

Someone who knows roughly what they need but not which specific page serves them — usually splitting
by state, by licence class, or by course type.

**Actually unresolved:** which of these options is mine.

**The failure mode is a hub that explains instead of routes.** Explanation belongs on the child pages
or in an info guide. A hub that reads like an article makes the reader work to find the link.

## 2 · Decision order

1. **What is this set?** — one short orienting line, not a section.
2. **Which one is mine?** — the routing mechanism, immediately.
3. **What differs between them?** — only the differences that affect the choice.
4. **Anything common to all of them** — briefly, once, rather than repeated per child.

## 3 · Required sections

| Section | Why |
|---|---|
| Orienting line | One or two sentences. Establishes what the set is. |
| The routing grid or table | The reason the page exists. Above the fold. |
| Differentiators | Only the fields that change the choice (state, price, duration, credential). |
| Shared context | What is true of all children, said once. |

## 3a · The CPD hub hierarchy

CPD runs hubs on two axes at once, per the W4 plan: a main hub (`/cpd`), trade hubs (`/cpd-building`),
state hubs (`/cpd-nsw`, `/cpd-tas`, `/cpd-wa`) and a bundles hub (`/cpd-bundles`), all sitting above
five CPD course pages. That is a cannibalisation risk before it is a content problem, because a state
hub and a course page in the same state compete for the same query.

Give each level one job and let nothing else claim it:

| Level | Its query | What it must not do |
|---|---|---|
| `/cpd` | "CPD courses" generally | Answer a state or trade question in depth |
| `/cpd-building` | "building CPD" across states | Carry state-specific points or requirements |
| `/cpd-tas` | "CPD Tasmania" across trades | Carry a single trade's course detail |
| `/cpd-bundles` | "CPD bundle / full cycle" | Re-sell the component courses |
| `/cpd-building-tas` | the actual purchase intent | Duplicate the hub's routing content |

The test at Stage 2: if two of these would target the same primary keyword, one of them does not earn
a page. Links go up and down the hierarchy, never sideways between peers at the same level.

## 4 · Forbidden carry-overs

- **Long explanatory prose.** If it needs three paragraphs, it is an info guide.
- **A price and CTA for the hub itself.** The hub sells nothing.
- **Duplicating child-page content,** which cannibalises the children in search.
- **Answer capsules written as though the hub is the destination.**

## 5 · Schema and frontmatter

`CollectionPage` + `ItemList` + `BreadcrumbList`. **No `Course` node, no price.** Requires the
archetype-aware guardrail change. Frontmatter: `childPages`, `groupingBasis`.

## 6 · Component defaults

TopicGrid or a comparison table for routing. Cards are correct here — the reader is browsing entry
points, not comparing values, unless the choice genuinely turns on comparable numbers, in which case
use a table.

## 7 · Worked section brief

```
Section: Choose your state
Position: 1
Claim: Owner builder requirements differ by state; these are the states ABE
       covers.
Reader arrives: knowing they want an owner builder course, not knowing that the
       rules are state-specific.
Objection defused: "Which one applies to me?"
Facts: [states covered — internal]
Distinctive material (Stage 2): competitors run national pages that blur state
       rules. Routing by state is itself the differentiator.
Carrier: TopicGrid
Fails if: a reader cannot reach their state's page in one click from the top of
       the page.
```

## 8 · Worked copy

Written from the brief above. Keep it this short: a hub that explains is an info guide that failed to
declare itself.

> ### Choose your state
>
> Owner builder rules are set by each state, so the course, the approval and the fees differ depending
> on where you are building. Pick your state below.
>
> [Routing grid: state, credential, price, approval body]
>
> Building in a state not listed? The rules there are set by that state's regulator, and we do not
> currently offer a course for it.

**What to notice.** Two sentences before the grid, and the second one is the instruction. The
orienting line exists only to explain why a choice is necessary, because a reader who does not know
the rules are state-specific will not understand what they are choosing between.

Naming the states not covered stops a reader hunting through a grid for something that is not there.

**Do not transfer.** No answer capsule written as though the hub is the destination, no price for the
hub itself, and none of the child pages' content repeated here. Repetition cannibalises the children
in search, which is the specific way hubs damage the pages they exist to serve.
