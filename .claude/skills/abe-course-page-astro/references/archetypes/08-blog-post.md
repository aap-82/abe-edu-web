# Archetype 8 — Blog post

Timely, dated content: a rule change, a fee indexation, a seasonal piece, commentary. Its value is
tied to a moment, and it is allowed to age.

## 1 · Reader and arrival state

Someone who has encountered a change, or arrived from search on a dated query, or is browsing. Lower
intent than every other archetype.

**Actually unresolved:** what changed, when it takes effect, and whether it affects them.

**The failure mode is filing evergreen material here.** A durable explanation published as a blog post
gets a published date, ages visibly, and drops out of the verification cadence. If it will still be
true next year, it is an info guide.

## 2 · Decision order

1. **What changed, and when it takes effect.**
2. **Who it affects** — and who it does not.
3. **What they need to do,** if anything.
4. **Background,** for readers who need it.
5. **Where to go next.**

## 3 · Required sections

| Section | Why |
|---|---|
| The change and its date | The reason the post exists. |
| Who is affected | Lets the unaffected leave quickly, which is a service. |
| Required action | The practical payload. |
| Background | For readers arriving cold. |
| Sources and published date | Both visible. |

## 4 · Forbidden carry-overs

- **Evergreen material.** Route it to archetype 7.
- **Undated claims.** Everything here is time-bound by definition.
- **Course-page structure.** No eligibility, no price section.
- **Letting it go stale silently.** A superseded post needs an update note or a redirect.

## 5 · Schema and frontmatter

`BlogPosting` + `BreadcrumbList` + `Person` author. `datePublished` and `dateModified` both required.
**No `Course` node, no price.** Frontmatter: `datePublished`, `dateModified`, `author`, `supersededBy`.

## 6 · Component defaults

Prose-led. Note for the effective date. VerifiedSources for the regulatory claim. Minimal componentry;
this archetype should not look like a landing page.

## 7 · Worked section brief

```
Section: What changed
Position: 1
Claim: From [date], [regulator] [change].
Reader arrives: having heard something changed, unsure of the detail.
Objection defused: none — this reader wants the fact.
Facts: [the change — .gov.au source + verified date]
       [effective date — source + date]
Distinctive material (Stage 2): general news coverage states the change but not
       who it exempts. The exemption is the gap.
Carrier: AnswerCapsule + Note + VerifiedSources
Fails if: the effective date is not in the first section.
```

## 8 · Worked copy

Written from the brief above. The change and dates are placeholders; a blog post that gets its
effective date wrong is worse than no post.

> ### What changed
>
> From [date], [regulator] [change]. [One sentence on what it replaces.]
>
> This affects [who]. If you [condition], you need to [action] before [deadline]. If you [other
> condition], nothing changes for you and you can stop reading here.
>
> Work already [started/approved] before [date] continues under the old rule. There is no
> retrospective effect.
>
> ✓ VERIFIED · 🔗 SOURCES — [regulator announcement]. Verified [date].
>
> *Published [date]. Last reviewed [date].*

**What to notice.** The effective date is in the first sentence and the unaffected reader is released
in the second paragraph. Letting people leave quickly is a service, and it is the opposite of how most
compliance news is written.

The transitional rule gets its own paragraph because it is the question everyone asks second and
almost nobody answers.

**Do not transfer.** If this material will still be true next year, it is archetype 7 and it is in the
wrong place. Filing evergreen content here gives it a published date, ages it visibly, and drops it
out of the verification cadence, which is how good research ends up stranded on a page nobody revisits.
