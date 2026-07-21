# Static pages — build-only, never drafted

Contact, terms and conditions, privacy policy, refund policy, and any other legal or administrative
page. These are **not archetypes**. They have no research input, no keyword gap, no section briefs and
no Stage 4 writing.

## The rule

**This skill builds and deploys these pages. It does not draft, rewrite, restructure or "improve" their
wording.**

Legal wording is deliberate. Clauses are drafted for enforceability, not for readability, and the
instincts that serve a course page actively damage them: answer-first restructuring changes emphasis,
plain-English rewriting changes meaning, and shortening for scannability deletes qualifications that
exist for a reason.

Do not run `abe-readability-audit`, `final-check` or `ai-detector` against legal text with a view to
changing it. If those tools flag a legal page, report the finding and stop.

If a legal page needs new or amended wording, that is a task for the business and its adviser, not for
this pipeline. This skill will place supplied wording into the template unchanged.

## What this skill does supply

| Page | Schema | Frontmatter | Notes |
|---|---|---|---|
| Contact | `ContactPage` + `Organization` | `channels`, `hours`, `abn` | Form, channels, hours, ABN. No `Course`, no price. |
| Terms and conditions | `WebPage` | `lastUpdated` | Wording supplied by the business, placed verbatim. |
| Privacy policy | `WebPage` | `lastUpdated` | As above. |
| Refund policy | `WebPage` | `lastUpdated` | As above. Must not contradict the course pages' refund statements — flag any conflict, do not resolve it. |

## Build implications

Each of these needs an entry in the archetype-aware required-node table. The current guardrails
integration fails any build lacking `Course` + `Credential` + `Person` x2 and an on-page price, which
none of these pages has or should have.

## The one active check

Legal pages and course pages can drift apart — a refund window stated on a course page that no longer
matches the refund policy is a genuine problem. Detect and report contradictions between static pages
and course pages. Report them; never silently fix them.
