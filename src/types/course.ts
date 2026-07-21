// Shared types for the QLD Owner Builder course page components.
export interface CTA { label: string; href: string; microcopy?: string; }
export interface Img { src: string; alt: string; }        // content images: alt >= 80 chars, en-AU
export interface Source { label: string; href: string; verified?: string; }
export interface Fact { key: string; value: string; note?: string; }
export interface Step { title: string; body: string; }
export interface TopicCard { tag: string; title: string; body: string; } // body may contain <b>

/**
 * A syllabus row. Widens TopicCard rather than replacing it, because the five states author
 * their module data differently: QLD and WA carry module numbers inside `body`, ACT and TAS
 * are prose with none, and NSW's "groups" are the regulator's units of competency. Both new
 * fields are optional, so every existing file renders unchanged and a state adopts them when
 * its copy is actually written, rather than being back-filled from a guess.
 */
export interface ModuleGroup extends TopicCard {
  modules?: string;   // e.g. "Modules 1-2" - pulled out of the prose so it can be scanned
  outcome?: string;   // what the reader can DO after this group
  /**
   * The individual modules in this group, numbered. Optional, and where present it REPLACES
   * the prose body: "Course Introduction, and the Key Responsibilities of an Owner Builder"
   * buried both module numbers and both names in one sentence, so a reader could not tell
   * which name belonged to which number. Each module gets its own line instead.
   *
   * `body` stays available for a note the list cannot carry. It is not a second copy of the
   * list - duplicating the contents in both fields is exactly how the two drift apart.
   */
  contents?: Array<{ n: string; name: string }>;
}
export interface PriceRow { label: string; sub?: string; amount: string; isTotal?: boolean; }
export interface FAQItem { q: string; a: string; open?: boolean; }
export interface NavItem { label: string; href: string; sectionId: string; }
export interface Person {
  name: string;
  role: string;
  creds: string;          // mono credential line
  bio: string[];          // one entry per paragraph; may contain minimal inline markup
  linkedin: string;
  portrait?: Img;         // omit -> FPO placeholder, and no image in schema
  profileHref?: string;   // set -> renders a link to that expert's profile page
}

// Visible breadcrumb trail. Built from the same data as the JSON-LD BreadcrumbList so
// the two cannot drift. The last crumb is the current page, rendered as text.
export interface Crumb { name: string; item: string; }

// ASQA-accredited disclosure block (White Card and similar). ABE Education publishes the
// course; the named RTO partner delivers it and issues the nationally recognised credential.
// ABE is never the RTO. See CLAUDE.md authority model (asqa-accredited).
export interface PartnerInfo {
  partner: string;        // RTO trading name, e.g. "Blue Dog Training"
  rto: string;            // RTO number, e.g. "31193"
  // A list: White Card is one unit, NSW owner builder is five. See the note in
  // content.config.ts for why this is not a single code.
  units?: Array<{ code: string; name: string }>;
  credential?: string;    // what the partner issues; defaults to "Statement of Attainment"
}

// CPD matrix: industries down the side, states across the top. A cell links to the course
// for that industry + state, or is null where none is offered yet.
export interface CpdCell { href: string; label?: string; }   // label defaults to "View"
export interface CpdRow { industry: string; note?: string; cells: (CpdCell | null)[]; }

// Dated last-reviewed line. Warwick Smith reviews the course pages for compliance and
// currency; Dominic Ogburn reviews the hubs.
//
// href points the reviewer's name at the proof of that review. On a course page that
// is the on-page "Developed and reviewed by" section (#content-review). Hub pages have
// no such section, so they point at the reviewer's LinkedIn instead. Omit it and the
// name renders as plain text rather than a link to nowhere.
export interface Reviewed { name: string; href?: string; date: string; }
