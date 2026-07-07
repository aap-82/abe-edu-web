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
  bio: string;            // may contain minimal inline markup
  linkedin: string;
  portrait?: Img;         // omit -> FPO placeholder, and no image in schema
}
