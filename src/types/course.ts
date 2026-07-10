// Shared types for the QLD Owner Builder course page components.
export interface CTA { label: string; href: string; microcopy?: string; }
export interface Img { src: string; alt: string; }        // content images: alt >= 80 chars, en-AU
export interface Source { label: string; href: string; verified?: string; }
export interface Fact { key: string; value: string; note?: string; }
export interface Step { title: string; body: string; }
export interface TopicCard { tag: string; title: string; body: string; } // body may contain <b>
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
}

// Visible breadcrumb trail. Built from the same data as the JSON-LD BreadcrumbList so
// the two cannot drift. The last crumb is the current page, rendered as text.
export interface Crumb { name: string; item: string; }

// Dated last-reviewed line. Warwick Smith reviews the course pages for compliance and
// currency; Dominic Ogburn reviews the hubs.
//
// href points the reviewer's name at the proof of that review. On a course page that
// is the on-page "Developed and reviewed by" section (#content-review). Hub pages have
// no such section, so they point at the reviewer's LinkedIn instead. Omit it and the
// name renders as plain text rather than a link to nowhere.
export interface Reviewed { name: string; href?: string; date: string; }
