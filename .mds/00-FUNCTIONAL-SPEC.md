# DDA website functional specification

Status: implementation handoff  
Revision: 1.2 — 1 September 2026  
Scope: the 20 supplied webpage files and the shared site behaviour

DDA is a strategic analysis and decision-design practice for complex public and regulated systems. The site organizes that work through four capabilities: Diagnose, Model, Design, and Equip.

## 1. How to use this handoff

- This file controls routes, interactions, states, and page assembly.
- `00-UI-SPEC.md` controls visual layout, responsive presentation, components, and motion.
- P01–P20 supply the approved public copy.
- The current DDA codebase remains authoritative for functionality that already works.

The Deloitte Canada website is a structural and editorial reference. Emulate its concise hero, insights-first homepage, modular story cards, dark global chrome, wide navigation, and restrained motion. Do not copy Deloitte language, brand assets, services, scale, or institutional claims.

## 2. Existing diagnostic tools

Preserve every diagnostic tool already present on the website at its current route and with its current functionality.

## 3. Page mapping

This table is the implementation join between each Markdown file and its public route.

<!-- FUNCTIONAL_PAGE_MAPPING_TSV_BEGIN -->
```tsv
page_id	final_filename	route	template	ordered_modules	functional_notes	acceptance
P01	01-home.md	/	home	global-header;full-viewport-purpose-hero;latest-thinking;selected-work-stories;contact-close;global-footer	purpose hero followed by one lead and supporting thinking cards proof stories and direct contact	P12-P16 links resolve and no unsupported organizational section is added
P02	02-what-we-do.md	/what-we-do/	service-hub	global-header;short-hero;four-capabilities;seven-service-routes;related-thinking;contact-close;global-footer	Diagnose Model Design and Equip form the top hierarchy above P03-P09	all four capabilities and all seven service routes remain keyboard reachable
P03	03-fiscal-impact-growth-modelling.md	/what-we-do/fiscal-impact-growth-modelling/	service-detail	global-header;breadcrumb;service-hero;problem;how-dda-helps;typical-work;related-thinking;contact-close;global-footer	outcome-led template with an accessible scenario comparison inside how DDA helps	no fabricated figures and every comparison has a text explanation
P04	04-official-community-plan-policy-analysis.md	/what-we-do/official-community-plan-policy-analysis/	service-detail	global-header;breadcrumb;service-hero;problem;how-dda-helps;typical-work;related-thinking;contact-close;global-footer	outcome-led template with a policy-to-delivery trace inside how DDA helps	sequence remains clear without colour or connector lines
P05	05-economic-development-strategy.md	/what-we-do/economic-development-strategy/	service-detail	global-header;breadcrumb;service-hero;problem;how-dda-helps;typical-work;related-thinking;contact-close;global-footer	outcome-led template with an opportunity screen inside how DDA helps	do not turn qualitative copy into invented scores
P06	06-labour-market-analysis.md	/what-we-do/labour-market-analysis/	service-detail	global-header;breadcrumb;service-hero;problem;how-dda-helps;typical-work;related-thinking;contact-close;global-footer	outcome-led template with workforce decomposition inside how DDA helps	module includes a complete written conclusion
P07	07-resource-sector-complex-planning-analysis.md	/what-we-do/resource-sector-complex-planning-analysis/	service-detail	global-header;breadcrumb;service-hero;problem;how-dda-helps;typical-work;related-thinking;contact-close;global-footer	outcome-led template with dependency mapping inside how DDA helps	connections never carry meaning without labels
P08	08-long-range-financial-scenario-planning.md	/what-we-do/long-range-financial-scenario-planning/	service-detail	global-header;breadcrumb;service-hero;problem;how-dda-helps;typical-work;related-thinking;contact-close;global-footer	outcome-led template with an assumptions register inside how DDA helps	register remains usable on mobile and at 200 percent zoom
P09	09-public-interest-research-evidence-packages.md	/what-we-do/public-interest-research-evidence-packages/	service-detail	global-header;breadcrumb;service-hero;problem;how-dda-helps;typical-work;related-thinking;contact-close;global-footer	outcome-led template with a claim-and-source register inside how DDA helps	statuses are written out and no legal privilege is implied
P10	10-who-we-are.md	/who-we-are/	about	global-header;purpose-hero;why-dda;four-capabilities;practice-focus;principal-note;contact-close;global-footer	present DDA as a principal-led strategic analysis and decision-design practice	no invented staff awards or biographies
P11	11-insights.md	/insights/	insight-hub	global-header;short-hero;lead-thinking-card;supporting-thinking-grid;four-capabilities;contact-close;global-footer	one lead card and two supporting cards with content type topic and read time	all three article links resolve and metadata is visible text
P12	12-insight-housing-target-delivery.md	/insights/when-a-housing-target-outruns-delivery/	article	global-header;breadcrumb;article-metadata;article-header;article-body;target-delivery-comparison;implications;related-thinking;contact-close;global-footer	long-form reading layout with content type topic read time and an inline comparison	article remains complete and readable without JavaScript
P13	13-insight-trade-gap-workforce-number.md	/insights/the-trade-gap-hidden-inside-a-workforce-number/	article	global-header;breadcrumb;article-metadata;article-header;article-body;workforce-decomposition;implications;related-thinking;contact-close;global-footer	long-form layout with content type topic read time and inline decomposition	no animated counts and the conclusion is available as text
P14	14-insight-what-a-flag-tells-you.md	/insights/what-a-flag-tells-you/	article	global-header;breadcrumb;article-metadata;article-header;article-body;evidence-status-key;evidence-register;implications;related-thinking;contact-close;global-footer	method article with content type topic read time and evidence-status register	status never relies on colour and no warning pulses
P15	15-selected-work.md	/selected-work/	work-stories	global-header;short-hero;five-part-proof-story-list;contact-close;global-footer	each story uses Question Stakes Work Proof and Decision value	no public provenance commentary or unsupported outcome claim
P16	16-contact.md	/contact/	contact	global-header;short-hero;decision-intake-form;what-happens-next;confidential-material-warning;no-engagement-line;global-footer	ask-specific fields and visible submission states	values survive errors and sensitive documents are not requested initially
P17	17-privacy.md	/privacy/	utility	global-header;breadcrumb;document-header;contents;privacy-sections;privacy-contact;global-footer	production form analytics and hosting behaviour must match the published policy	production behaviour matches every published statement
P18	18-legal.md	/legal/	utility	global-header;breadcrumb;document-header;contents;legal-sections;contact-link;global-footer	keep legal notice separate from Terms	no website use is described as creating an engagement
P19	19-terms.md	/terms/	utility	global-header;breadcrumb;document-header;contents;terms-sections;contact-link;global-footer	cover website use without unnecessary clickwrap	Privacy Legal and Contact links resolve
P20	20-accessibility.md	/accessibility/	utility	global-header;breadcrumb;document-header;accessibility-measures;feedback-route;alternative-format-route;global-footer	provide a clear accessibility feedback route	the feedback route works and public copy contains no implementation notes
```
<!-- FUNCTIONAL_PAGE_MAPPING_TSV_END -->

## 4. Global header and navigation

The header is fixed, dark, and 64–72px high. It may be translucent over the homepage hero. After the hero or a short scroll, it becomes solid with a subtle shadow or lower border. The change must not move the page.

Desktop navigation:

- Who we are
- What we do
- Our Thinking
- Selected work
- Search
- Contact

The What we do panel presents Diagnose, Model, Design, and Equip first. Beneath that capability layer, it exposes the seven existing service routes P03–P09. Capabilities explain how DDA works; service routes explain where that work is applied.

Who we are, What we do, and Our Thinking open wide multi-column panels. Open on hover intent, click, Enter, Space, or keyboard focus. Close on Escape, outside click, or focus leaving the menu. Return focus to the trigger after Escape. The panel uses opacity and an 8px vertical offset over 200–300ms.

Below 1024px, replace desktop navigation with a labelled Menu button and full-screen panel. Mega-menu groups become accordions. Trap focus, lock background scroll, close on Escape, and restore focus to Menu.

## 5. Search

Search opens as a labelled modal and indexes P01–P20. It has loading, result, empty, and error states. Escape closes it and restores focus to the opener.

## 6. Footer

Use a dark multi-column footer with:

- DDA purpose line;
- Who we are, What we do, Our Thinking, Selected work, and Contact;
- Privacy, Legal, Terms, and Accessibility;
- verified social links only;
- Metro Vancouver, British Columbia;
- current copyright year.

The footer's conversion group uses the short sequence “Let's connect,” “Get in touch,” “Explore what we do,” and “Learn about DDA.” Each line must route to a real destination.

## 7. Homepage behaviour

The homepage follows the reference rhythm:

1. Full-viewport purpose hero that defines DDA as a strategic analysis and decision-design practice for complex public and regulated systems.
2. “Our latest thinking” with one lead card, two supporting cards, and an Explore more link.
3. “Our work” with four proof-story cards drawn from Selected work and a link to the full page.
4. A short contact close that invites the visitor to bring a decision, deadline, consequence, and available material.
5. Dark global footer.

The hero uses a large, soft abstract data or systems graphic on the right. It is decorative, hidden from assistive technology, and reduced or moved below the copy on mobile. Do not use a carousel in the hero.

Homepage insight and work cards should support licensed editorial imagery or data-derived graphics. The component must also work without an image. Do not use generic stock handshakes, staged team scenes, or invented client photography.

The work stories may use a manual carousel on desktop if the final design calls for it. All slides must remain reachable by keyboard; controls need names and current-position text; no autoplay.

## 8. Shared component behaviour

### Cards

Cards contain a label, title, short excerpt, metadata where relevant, and a descriptive link. Thinking cards always show content type, topic, and read time. Grids reflow from four to three to two to one column as space requires. Hover may lift a card 4–6px and strengthen its shadow. Keyboard focus uses a visible ring and never relies on movement alone.

### Buttons

Primary buttons use a solid high-contrast fill. Hover and focus may shift the background and move the button no more than 2px. Link text must identify the destination.

### Evidence modules

Tables, charts, registers, comparisons, and dependency views need a title, units and period where relevant, source or status, and a written interpretation. Colour cannot be the only status cue. Do not animate numbers.

### Outcome-led service pages

P03–P09 use the same sequence: client problem, how DDA helps, typical work, related thinking, and contact close. The page-specific analytical module sits inside “How DDA helps.” Do not add a second methodology essay or repeat the full service directory.

### Related thinking

Service pages and articles show up to three related thinking cards. Each card displays content type, topic, read time, title, and a descriptive link. Relationships are editorially chosen, and a page never links to itself.

### Proof stories

Each P15 story has five visible parts: Question, Stakes, Work, Proof, and Decision value. “Proof” names the model, analysis, framework, map, brief, or other artifact produced. “Decision value” explains what the work made possible without inventing an adopted outcome.

### Contact close

Every commercial and editorial page ends with one short contact band. It asks for the decision and deadline, links to P16, and does not introduce a second conversion path.

## 9. Motion and responsive behaviour

- Section reveal: opacity 0→1 and `translateY(20–40px)`→0 over 500–700ms.
- Card stagger: 50–100ms, capped so the final card is not delayed more than 300ms.
- Hover and menu motion use transform and opacity.
- Reveals happen once and stay visible.
- Page changes may use a brief fade; the new route starts at the top unless an anchor or browser-history restoration applies.
- With reduced motion, remove translation, stagger, smooth scrolling, and route fades.

Build mobile first. At 320 CSS pixels there must be no page-level horizontal scrolling. Data tables may use a labelled internal scroll region when converting them to cards would destroy meaning. Touch targets should be at least 44×44 CSS pixels where practical.

## 10. Contact form

Fields: name, organization optional, email, decision, deadline, consequence, and material already available.

- Use visible labels and native controls.
- Validate after submit, then on blur for fields already in error.
- Put an error summary above the form and move focus to it.
- Preserve values when submission fails.
- Disable duplicate submission while pending.
- Announce success and explain the next step.
- Show one concise warning not to send privileged, personal, or commercially confidential material in the first message.
- Show one no-engagement line after the form.
- Do not send message contents to analytics.

## 11. Accessibility, privacy, and performance

Target WCAG 2.2 AA without claiming conformance until tested. Use semantic landmarks, one H1, logical headings, a skip link, visible focus, keyboard operation, sufficient contrast, text alternatives, and reduced-motion support.

Render core Markdown at build time or on the server. The 20 content pages, header links, and footer links must work without client-side JavaScript. Lazy-load nonessential visual and chart code by route. Aim for LCP at or below 2.5s, CLS at or below 0.1, and INP at or below 200ms on production mobile traffic.

Privacy, Legal, Terms, Accessibility, form behaviour, analytics, and hosting must be reconciled before launch. Never send form text to analytics.

## 12. Required states

- Navigation: closed, open, active page, keyboard focus.
- Search: closed, open, loading, results, empty, error.
- Cards and buttons: rest, hover, focus, active, disabled where applicable.
- Contact: untouched, invalid, submitting, success, failure.
- Content: normal and 404.

## 13. Acceptance checklist

- P01–P20 return their canonical route with one H1.
- Manifest, UI mapping, and functional mapping contain the same 20 page IDs, filenames, and routes.
- Every internal link resolves.
- The homepage sequence is hero, insights, work, Work with DDA, footer.
- Desktop mega-menus and mobile navigation work with pointer, touch, and keyboard.
- Search finds all 20 pages.
- Diagnose, Model, Design, and Equip appear above the seven deeper services on P02 and in its navigation panel.
- P03–P09 use the outcome-led service sequence.
- P15 stories expose all five proof fields.
- Contact validation, pending, success, and failure states work without losing entered values.
- No page overflows at 320px or fails at 200 percent zoom.
- Reduced-motion users do not receive translation, stagger, or smooth scrolling.
- Privacy and utility copy matches the implemented site before launch.
