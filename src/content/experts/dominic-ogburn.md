---
# Source: Notion Experts database (AHE-3), v1.14, Verification Status "All Verified",
# credentials last verified 19 July 2026. Only credentials the source marks ✅ verified
# with documentary evidence appear here.
#
# DELIBERATELY OMITTED, per that record's "What NOT to Claim" list — do not add:
#   · Any university degree or current TAE qualification (unverified / superseded).
#     `education` is empty for exactly this reason; no alumniOf is emitted.
#   · Building Consultant Licence BC 359 (not independently verified).
#   · The 2002 Australian Financial Review citation (paywalled, content unverified —
#     the record says do not publish until manually verified).
#   · Any claim that ABE is an RTO. RTO 91794 was WITHDRAWN.
#   · "Authored AS 3740" — he was a committee member, not the author, and never chair.
#   · "CHOICE endorsed" / "CHOICE recommended" — he was a featured expert, not endorsed.
#   · "Testified before parliament" — he was cited by name and submitted written
#     evidence; he did not give oral testimony.
#   · "Former builder" or "registered builder" — the licence is CURRENT, and NSW uses
#     "licensed".
#   · Any suggestion he develops every ABE course. His scope is the STATE-APPROVED-DIRECT
#     courses ABE develops itself: owner builder QLD/WA/TAS/ACT and CPD, only. He is NOT the
#     developer of any ASQA-ACCREDITED course — those are developed and owned by the RTO
#     partner: White Card (Blue Dog / AlertForce), asbestos, silica, and the NSW owner builder
#     course (Upskill Institute). Do not put him in `experts:` on an asqa-accredited page; the
#     build blocks a Person titled "developer" there. See kb/rules/authority-model.md §6.
name: "Dominic Ogburn"
role: "Course Developer · CEO, ABE Education"
jobTitle: "Course Developer"
creds: "Licensed NSW builder (Lic. 369417C) · 40+ years in Australian construction · Standards Australia committee BD-038 (AS 3740-2010) · 2005 NSW Minister’s Award for Consumer Advocacy"
bio:
  - 'Dominic began at Stuart Brothers, Sydney builders operating since 1886, rising to Senior Construction Manager.'
  - 'He is co-author of "Your Home: Buying, Selling, Renovating, Building" (Allen and Unwin, 2004) and has been cited as a construction authority across six Sydney Morning Herald articles.'
  - 'As CEO of ABE Education since 2007 he has trained more than 31,000 students, and writes the course from the builder’s side of the table.'
linkedin: "https://www.linkedin.com/in/dominic-ogburn"
# The Notion record's Headshot URL points at LearnWorlds
# (lwfiles.mycourse.app). That platform is being migrated away at cutover, so the
# stable Cloudflare R2 copy already used across the course pages is canonical here.
portrait:
  src: "https://pub-e001e9a575874f24a0bcd7082a45cdbc.r2.dev/Dominic_Ogburn_portrait.webp"
  alt: "Dominic Ogburn, ABE Education course developer and CEO, a licensed builder with 40-plus years in Australian construction"

title: "Dominic Ogburn — Course Developer | ABE Education"
description: "Dominic Ogburn develops ABE Education's owner builder and CPD courses. A licensed NSW builder with over 40 years in Australian construction, and a 2005 NSW Minister's Award winner."
canonical: "https://www.abeeducation.edu.au/experts/dominic-ogburn"
breadcrumb:
  - { name: "Home", item: "https://www.abeeducation.edu.au/" }
  - { name: "Our experts", item: "https://www.abeeducation.edu.au/experts" }
  - { name: "Dominic Ogburn", item: "https://www.abeeducation.edu.au/experts/dominic-ogburn" }
summary: "A licensed NSW builder, NSW government award winner and Standards Australia committee member with over 40 years in Australian construction, beginning at Stuart Brothers, Sydney builders since 1886. He has been cited in NSW Parliament and six Sydney Morning Herald articles."
org: "ABE Education"
orgUrl: "https://www.abeeducation.edu.au"
yearsExperience: 40
specialistAreas:
  - "Owner builder regulations"
  - "Residential construction compliance"
  - "Building Code of Australia"
  - "Waterproofing standards (AS 3740)"
  - "Consumer protection in construction"
  - "NSW building legislation"
hasCredential:
  - name: "NSW Builder's Licence 369417C"
    category: "Licence"
    issuedBy: "Building Commission NSW"
    issuedByUrl: "https://www.nsw.gov.au/departments-and-agencies/building-commission"
  - name: "2005 NSW Fair Trading Minister's Award for Consumer Advocacy"
    category: "Award"
    issuedBy: "NSW Fair Trading"
    issuedByUrl: "https://www.fairtrading.nsw.gov.au"
careerHistory:
  - role: "CEO and Course Developer"
    org: "ABE Education"
    period: "2007 – present"
    note: "Founded ABE Education in May 2007. Develops the owner builder and CPD courses, now completed by more than 31,000 students."
  - role: "Proprietor, building and property inspector"
    org: "Access Property Inspections, Petersham NSW"
    period: "approximately 1987 – 2007"
    note: "Property and building inspection across Sydney's inner west. Submitted expert evidence to the Senate Select Committee on Aircraft Noise in Sydney in 1995."
  - role: "Senior Construction Manager"
    org: "Stuart Brothers Pty Ltd"
    period: "August 1985 – March 1991"
    note: "Commercial and residential projects valued up to $11 million, including the two-stage refurbishment of 50 Miller Street, North Sydney and the Wintergarden development in Rose Bay."
  - role: "Trainee Supervisor, Quantity Surveyor and Estimator"
    org: "Stuart Brothers Pty Ltd"
    period: "March 1980 – August 1985"
    note: "Work-based training in quantity surveying and construction estimating."
# Empty by design. The source record verifies no degree or diploma, and explicitly
# prohibits claiming one. Do not populate without documentary evidence.
education: []
sameAs:
  - "https://www.linkedin.com/in/dominic-ogburn"
lastVerified: "19 July 2026"
# Developer attribution, not review — hence no dates (see the schema note). TAS is
# deliberately absent: the source record flags Dominic's TAS developer attribution as
# open and unconfirmed, unlike Warwick's TAS review which is confirmed. NSW is absent
# because that course is delivered by Upskill Institute and he is not its developer.
courses:
  - { course: "qld-owner-builder-course", role: "Course developer" }
  - { course: "wa-owner-builder-course", role: "Course developer" }
  - { course: "act-owner-builder-course", role: "Course developer" }
sticky:
  label: "Dominic Ogburn"
  sub: "course developer, ABE Education"
  price: "40+ yrs"
  cta: { href: "#credentials", label: "Verified credentials" }
---
