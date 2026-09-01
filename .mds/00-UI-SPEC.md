# DDA website UI specification

Status: implementation-ready; reconciled to canonical manifest P01–P20 and `00-FUNCTIONAL-SPEC.md`  
Scope: global interface system and page-specific UI mapping for every `is_webpage=true` row in `work/source-audit/page-manifest.tsv`. Public webpage Markdown files remain copy-only; layout guidance lives here and runtime behaviour lives in `00-FUNCTIONAL-SPEC.md`.  
Source boundary: the canonical DDA page inventory establishes the route set. The Deloitte material is used as a reference for hierarchy, modular layout, dark global chrome, mega-menu structure, editorial imagery, responsive behaviour, and restrained interaction. DDA's positioning follows the work itself, not prior summaries of that work. No Deloitte words, brand assets, organizational claims, or service inventory are carried into DDA.

This revision adopts the requested Deloitte-like profile: fixed dark header, wide mega-menus, search, a full-viewport dark homepage hero, dark footer, calm reveal motion, meaningful editorial imagery, and reusable card systems. DDA is presented as a strategic analysis and decision-design practice for complex public and regulated systems through four capabilities: Diagnose, Model, Design, and Equip.

## 1. Manifest lock and mapping contract

`work/source-audit/page-manifest.tsv` is the sole authority for the webpage inventory. The canonical manifest declares `WEBPAGE_COUNT=20` and identifies the webpage set as P01–P20. The machine-readable table below contains one row for each and preserves every `page_id`, `final_filename`, title, and slug verbatim.

The table is UTF-8, tab-separated data between stable HTML comment markers. Tabs delimit fields; semicolons inside fields delimit ordered components or compact clauses. This block is the implementation join between the copy-only page files and their UI treatment.

<!-- UI_PAGE_MAPPING_TSV_BEGIN -->
```tsv
page_id	final_filename	slug	page_title	layout_family	component_order	distinctive_module	mobile_transform	accessibility_requirement	motion_limit
P01	01-home.md	/	Home	landing	site-header;full-viewport-purpose-hero;latest-thinking;selected-work-carousel;contact-close;site-footer	purpose hero followed by one lead and two supporting thinking cards four proof stories and direct contact	single-column reading order with primary CTA before optional visual; work carousel becomes stacked cards	decorative hero geometry hidden from assistive technology; carousel controls have names and position text	reveal major sections and stagger cards only; no autoplay or animated counters
P02	02-what-we-do.md	/what-we-do/	What we do	service-hub	site-header;hub-hero;four-capability-grid;seven-service-grid;related-thinking;contact-close;site-footer	Diagnose Model Design and Equip form a top layer above the seven deeper services	capability and service grids become one column	each service title is the descriptive link; focus ring replaces hover movement	one group reveal; card hover movement capped at 3px
P03	03-fiscal-impact-growth-modelling.md	/what-we-do/fiscal-impact-growth-modelling/	Fiscal impact and growth modelling	service-detail	breadcrumb;service-hero;problem;how-dda-helps;typical-work;related-thinking;contact-close;site-footer	outcome-led page with scenario comparison inside how DDA helps	scenario columns become labelled blocks or an accessible horizontal table	table title units period source status and text finding required; row and column headers explicit	no animated numbers; reveal complete module once
P04	04-official-community-plan-policy-analysis.md	/what-we-do/official-community-plan-policy-analysis/	Official Community Plan review and policy analysis	service-detail	breadcrumb;service-hero;problem;how-dda-helps;typical-work;related-thinking;contact-close;site-footer	outcome-led page with policy-to-delivery trace inside how DDA helps	left-to-right trace becomes numbered vertical sequence	gap states use written labels and symbols in addition to colour	no connector animation; reveal complete trace once
P05	05-economic-development-strategy.md	/what-we-do/economic-development-strategy/	Economic development strategy	service-detail	breadcrumb;service-hero;problem;how-dda-helps;typical-work;related-thinking;contact-close;site-footer	outcome-led page with opportunity screen inside how DDA helps	matrix becomes one labelled opportunity block at a time	no unsupported scores; semantic headers required when tabular	no score animation; reveal complete screen once
P06	06-labour-market-analysis.md	/what-we-do/labour-market-analysis/	Labour market analysis	service-detail	breadcrumb;service-hero;problem;how-dda-helps;typical-work;related-thinking;contact-close;site-footer	outcome-led page with workforce decomposition inside how DDA helps	horizontal or stepped sequence becomes ordered vertical list	plain-language text equivalent states how each constraint narrows usable supply	no animated counts or funnel motion
P07	07-resource-sector-complex-planning-analysis.md	/what-we-do/resource-sector-complex-planning-analysis/	Resource-sector and complex planning analysis	service-detail	breadcrumb;service-hero;problem;how-dda-helps;typical-work;related-thinking;contact-close;site-footer	outcome-led page with dependency mapping inside how DDA helps	wide dependency view becomes ordered dependency register	connections never carry meaning without labels; text key required	no motion along connectors; reveal register once
P08	08-long-range-financial-scenario-planning.md	/what-we-do/long-range-financial-scenario-planning/	Long-range financial and scenario planning	service-detail	breadcrumb;service-hero;problem;how-dda-helps;typical-work;related-thinking;contact-close;site-footer	outcome-led page with assumptions register inside how DDA helps	table becomes labelled rows or an accessible scroll region	no invented sample values; headers and source-status definitions required	no animated figures; reveal register once
P09	09-public-interest-research-evidence-packages.md	/what-we-do/public-interest-research-evidence-packages/	Public-interest research and evidence packages	service-detail	breadcrumb;service-hero;problem;how-dda-helps;typical-work;related-thinking;contact-close;site-footer	outcome-led page with claim-and-source register inside how DDA helps	register entries stack with all field labels retained	define each evidence status; do not imply privilege advocacy alignment or unsupported certainty	status changes use no decorative pulse; reveal register once
P10	10-who-we-are.md	/who-we-are/	Who we are	about	site-header;purpose-hero;why-dda;four-capability-grid;practice-focus;principal-note;contact-close;site-footer	Diagnose Model Design and Equip explain the practice	four-column capability grid becomes ordered vertical sequence	process order exists in markup; portrait alt text required if a verified portrait is used	reveal capabilities as one group; no connector animation
P11	11-insights.md	/insights/	Insights	insights-hub	site-header;hub-hero;lead-thinking-card;supporting-thinking-grid;four-capability-strip;contact-close;site-footer	one lead and two supporting articles with content type topic and read time	lead article followed by two supporting cards in reading order	metadata is visible text; article links have unique accessible names	reveal featured group once; no internal stagger
P12	12-insight-housing-target-delivery.md	/insights/when-a-housing-target-outruns-delivery/	When a housing target outruns delivery	insight-article	breadcrumb;article-metadata;article-header;article-body;target-delivery-comparison;practical-implications;related-thinking;contact-close;site-footer	content type topic and read time above a target-to-delivery comparison	opening side rail and comparison collapse inline after their contextual paragraphs	comparison has a text equivalent and no invented quantities	once-only callout reveal; no sticky share or progress gimmick
P13	13-insight-trade-gap-workforce-number.md	/insights/the-trade-gap-hidden-inside-a-workforce-number/	The trade gap hidden inside a workforce number	insight-article	breadcrumb;article-metadata;article-header;article-body;workforce-decomposition;practical-implications;related-thinking;contact-close;site-footer	content type topic and read time above workforce decomposition	horizontal decomposition becomes labelled vertical sequence	text equivalent carries the conclusion; shape alone cannot indicate narrowing	no animated counts or funnel motion
P14	14-insight-what-a-flag-tells-you.md	/insights/what-a-flag-tells-you/	What a FLAG tells you	insight-article	breadcrumb;article-metadata;article-header;article-body;evidence-status-key;evidence-register;practical-implications;related-thinking;contact-close;site-footer	content type topic and read time above an evidence-status register	register stacks with expanded status labels	FLAG and every status expanded or defined; unknown appears as a deliberate written state	no warning pulse; reveal key and register once
P15	15-selected-work.md	/selected-work/	Selected work	work-patterns	site-header;work-hero;five-part-proof-story-list;contact-close;site-footer	proof stories use Question Stakes Work Proof and Decision value	five fields become fully labelled stacks	field labels remain visible; imagery has contextual alt text	reveal each complete entry; no internal stagger
P16	16-contact.md	/contact/	Contact	contact	site-header;invitation-hero;decision-intake-form;what-happens-next;confidential-material-warning;no-engagement-line;site-footer	decision deadline consequence and available-material intake	form appears first followed by next-step warning and no-engagement line	visible labels; native controls; error summary; preserved values; announced submission state	no form-field reveals; success may fade without movement
P17	17-privacy.md	/privacy/	Privacy	utility-text	site-header;breadcrumb;document-header;contents-list;privacy-sections;privacy-contact;site-footer	actual website-data handling in a narrow legal reading layout	contents links wrap above a single reading column	implementation facts and review status must be accurate; headings and anchors remain semantic	no reveal motion
P18	18-legal.md	/legal/	Legal	utility-text	site-header;breadcrumb;document-header;contents-list;legal-sections;contact-link;site-footer	informational professional-advice intellectual-property third-party and liability boundaries	contents links wrap above a single reading column	keep Legal distinct from Terms; no generic boilerplate accordions	no reveal motion
P19	19-terms.md	/terms/	Terms	utility-text	site-header;breadcrumb;document-header;contents-list;terms-sections;contact-link;site-footer	website-use conditions including permitted and prohibited use and no engagement through website	contents links wrap above a single reading column	no assent control unless a real transaction requires acceptance	no reveal motion
P20	20-accessibility.md	/accessibility/	Accessibility	utility-text	site-header;breadcrumb;document-header;accessibility-measures;known-limitations;feedback-route;alternative-format-route;site-footer	commitment current measures known limits feedback and accommodation path	all sections remain in one reading column with feedback route prominent	no unverified conformance claim; page itself must model stated practices	no decorative or reveal motion
```
<!-- UI_PAGE_MAPPING_TSV_END -->

Mapping field definitions:

| Field | Meaning |
|---|---|
| `page_id` | Exact manifest identifier; primary reconciliation key |
| `final_filename` | Exact canonical Markdown filename for the copy-only webpage |
| `slug` | Exact public route from the manifest |
| `layout_family` | Shared page template or layout family |
| `component_order` | Ordered component identifiers |
| `distinctive_module` | Page-specific evidence, reading, form, or utility module |
| `mobile_transform` | Page-specific narrow-screen transformation |
| `accessibility_requirement` | Requirement beyond the global baseline |
| `motion_limit` | Page-specific motion restriction |

This mapping is locked only after a runnable set-equality check shows that:

1. no `is_webpage=true` manifest `page_id` is missing from the mapping;
2. no mapping `page_id` is absent from the `is_webpage=true` manifest set;
3. no mapping `page_id` is duplicated.

The footer is a shared global component, not a webpage row. The Insights hub may link only to P12–P14 at launch unless the canonical manifest is revised to add another complete article page.

## 2. Interface character

The site should feel like a high-level strategy and analytics practice whose work belongs in council packages, board decisions, planning files, project reviews, and public reports. It should have Deloitte's confidence, space, editorial rhythm, and conversion clarity at a scale that is credible for DDA. It should help a municipal planner, finance director, CAO, public-sector executive, or project adviser answer three questions quickly:

1. Is this work relevant to the decision in front of me?
2. Can I understand what will be delivered and how it will be supported?
3. Can I move to a substantive conversation without passing through a sales funnel?

Visual hierarchy should come from type, spacing, alignment, and content structure. Accent colour, elevation, imagery, and motion are supporting tools, not the identity of the site.

## 3. Global design system

### 3.1 Layout tokens

Use a 12-column desktop grid within a centred site container.

| Token | Recommended value | Use |
|---|---:|---|
| `--container-wide` | `1280px` | Header, broad grids, tables, work patterns |
| `--container-content` | `1120px` | Standard section content |
| `--measure-reading` | `720px` | Articles, legal text, sustained prose |
| `--measure-lead` | `820px` | Hero standfirst and opening statements |
| `--gutter-mobile` | `20px` | Viewports below 768px |
| `--gutter-tablet` | `32px` | 768–1023px |
| `--gutter-desktop` | `48px` | 1024px and above |
| `--header-height-mobile` | `64px` | Mobile header |
| `--header-height-desktop` | `80px` | Desktop header before scroll |

Breakpoints:

- Mobile: below `768px`.
- Tablet: `768px–1023px`.
- Desktop: `1024px` and above.
- Large desktop: container stops growing at `1280px`; whitespace grows outside it.

Use an 8-point spacing system, with `4px` available only for compact metadata and icon alignment. The normal sequence is `8, 16, 24, 32, 48, 64, 80, 96, 128`. Major section padding should be 96–128px on desktop, 72–88px on tablet, and 56–72px on mobile. Do not compress utility pages so tightly that legal or accessibility text becomes difficult to read.

### 3.2 Typography

Use a modern sans-serif family with strong screen rendering and a useful range from regular to bold. A single family is acceptable and preferable to an ornamental heading face. If a second face is used, reserve it for source labels, data states, and compact metadata—not body paragraphs.

Recommended fluid scale:

| Role | Desktop target | Mobile target | Notes |
|---|---:|---:|---|
| Display / home H1 | 64–76px | 42–48px | Maximum 12 words visible before supporting line |
| Page H1 | 52–64px | 38–44px | Wrap deliberately; no forced one-line titles |
| Section H2 | 36–44px | 30–34px | Sentence case |
| Component H3 | 24–30px | 22–26px | Cards, work entries, process steps |
| Lead | 21–24px | 19–21px | 1.45–1.6 line height |
| Body | 17–19px | 17–18px | 1.6–1.75 line height |
| Metadata | 13–15px | 13–15px | Never the only place essential meaning appears |

Keep paragraph line length near 60–75 characters in reading contexts. Use sentence case for headings, buttons, labels, and navigation. Avoid all-caps except very short nonessential category markers with increased letter spacing.

### 3.3 Colour and surfaces

Use a near-white base, deep charcoal text, one strong accent, and one muted secondary tone. Exact brand colour values are deliberately left for the DDA identity system, but implementation must define semantic tokens rather than hard-coded colours:

- `surface-base`, `surface-subtle`, `surface-strong`
- `text-primary`, `text-secondary`, `text-inverse`
- `border-default`, `border-strong`
- `action-primary`, `action-primary-hover`, `action-primary-text`
- `focus-ring`, `status-caution`, `status-neutral`

The primary accent identifies actions, links, active states, and the occasional key evidence marker. It should not appear as a decorative wash across every section. Use 1px borders and surface shifts before shadows. If elevation is needed, keep it diffuse and low contrast.

All text and interactive states must meet WCAG 2.2 AA contrast. A border-only form field must remain identifiable in high-contrast and forced-colour modes.

### 3.4 Imagery and evidence graphics

Use imagery selectively but confidently. The homepage hero should have a large abstract data or systems visual. Insight and selected-work cards may use licensed editorial photography, maps, document details, or data-derived graphics. Service heroes may use one contextual image or analytical visual where it improves recognition of the subject.

Do not use stock photos of handshakes, generic office teams, staged meetings, or generic dashboards. Place and project imagery must be relevant and licensed. Decorative geometry may be derived from grids, models, maps, or data relationships and must be hidden from assistive technology.

Charts and tables require:

- a plain-language title;
- units and time period where relevant;
- source or source-status text;
- a text summary of the finding;
- patterns, labels, or symbols in addition to colour;
- a responsive fallback that does not shrink labels below readability.

## 4. Shared shell

### 4.1 Header

The header is fixed, dark, and 68px tall on desktop (64px on mobile). It may sit translucently over the dark homepage hero. After 24px of scroll or after the hero threshold, it becomes solid with a subtle shadow or lower border. The change must not shift the page.

Desktop order:

1. DDA wordmark linked to the homepage.
2. Primary links: Who we are, What we do, Our Thinking, Selected work.
3. Utility controls: Search, conditional language/region, Contact.

Who we are, What we do, and Our Thinking open wide CSS-grid mega-menu panels. What we do must keep access to any diagnostic-tool routes already exposed by the current site. Panels may include one DDA promotional card, never a Deloitte asset. Open uses opacity and an 8px upward offset over 220ms. Triggers work on hover intent, click, and keyboard focus; panels close on Escape, outside click, pointer dismissal, or focus leaving the trigger/panel group. Use `aria-expanded`, `aria-controls`, and focus restoration exactly as defined in the functional specification.

The fourth launch item is Selected work because there is no Careers page in P01–P20. Careers is feature-gated and must remain absent until a complete route and recruiting workflow exist. Search is functional at launch. The language/region selector appears only when the current page has an equivalent French route; it is not decorative.

The logo is the first focusable item. Keyboard order follows visual order. Show active-page state with a visible underline or background and `aria-current="page"`.

Mobile behaviour:

- Show the wordmark and a labelled Menu button.
- Open a full-screen panel; do not use a small dropdown.
- Convert mega-menu groups to accessible accordions while preserving direct routes.
- Keep Search and Contact present in the panel.
- Provide a visible close button, set `aria-expanded`, move focus into the panel, trap focus while open, close on Escape, and return focus to the Menu button.
- Prevent background scroll while open.
- Do not animate the panel for users requesting reduced motion.

### 4.2 Footer

Desktop layout uses a dark multi-column surface:

1. DDA wordmark and one-sentence purpose line.
2. Primary routes: Who we are, What we do, Our Thinking, Selected work, Diagnostic tools, Contact.
3. Utility routes: Privacy, Legal, Terms, Accessibility, plus verified social profiles.

Place “Metro Vancouver, British Columbia” and the current copyright year below the columns. This is a service location, not an invented office listing. Social icons appear only for verified live profiles. Do not add a newsletter capture, awards, multiple offices, or a second CTA without an operating need.

On mobile, stack the purpose line, primary links, and utility links. Use ordinary link lists; an accordion is unnecessary for this volume. The footer begins with a visible border or surface change and an accessible `footer` landmark.

### 4.3 Breadcrumbs

Use breadcrumbs on service pages, insight articles, and utility pages. Omit them on the homepage and top-level hubs. About, Selected work, and Contact may omit them because they are one level deep.

Breadcrumbs use an ordered list inside a labelled navigation landmark. The current page is text, not a link. On narrow screens, allow wrapping; do not hide intermediate levels that explain context.

## 5. Component contracts

### 5.1 Hero

Required slots:

- optional eyebrow or breadcrumb;
- one H1;
- one lead paragraph;
- zero or one primary action;
- zero or one secondary text link;
- optional evidence-oriented visual region.

Desktop: content occupies 7–8 columns; optional visual occupies the remaining 4–5. The home hero fills the usable viewport (`100svh` minus the fixed header); inner-page heroes are 40–60vh or content-sized with 96–128px vertical padding. Mobile: stack text, actions, then visual. Never place critical text over an image. Avoid carousel heroes.

Motion: the text group may fade in once over 400–500ms with no more than 16px vertical travel. The H1 and lead should not animate separately. No autoplay video, parallax, looping geometry, or cursor-following effects.

### 5.2 Outcome card

Slots: title, one-sentence outcome, optional short qualifier, descriptive link. Cards are entire-link targets only when they contain no nested controls. Otherwise, keep the link explicit.

Desktop: 3 columns for seven-service routing grids, with the final card occupying one column rather than stretching unnaturally. Tablet: 2 columns. Mobile: 1 column. Card heights align by row, not globally across all content lengths.

Hover: translate upward by 4–6px and strengthen the border or diffuse shadow over 180–220ms. Focus uses a 2–3px visible ring; movement is optional and never the only focus cue.

### 5.3 Statement band

Use for a short principle that changes how the surrounding material should be read, such as independence, source transparency, or the practical implication of an evidence gap. Limit to a heading, one short paragraph, and optionally one link. It is not a testimonial strip or slogan banner.

### 5.4 Evidence module

This family supports seven service-specific variants:

- scenario comparison;
- policy-to-delivery trace;
- opportunity screen;
- workforce constraint funnel;
- project dependency chain;
- assumptions register;
- claim-and-source register.

Each variant shares a visible heading, explanatory text, structured rows or nodes, status key if required, source-status note, and text equivalent. It must remain understandable without animation or colour.

On desktop, a wide evidence module may use all 12 columns. On mobile, transform multi-column comparisons into labelled stacked rows; use horizontal scrolling only for genuinely tabular data, preserve the first column where practical, and announce the scroll region with an accessible label.

### 5.5 Deliverable list

Use a semantic list in a two-column grid on desktop and one column on mobile. Each item contains the named output and one short line explaining what decision or review it supports. Do not use icons as substitutes for names. Avoid a card for each bullet when a structured list is clearer.

### 5.6 Process strip

Use for a short ordered sequence such as Diagnostics → Dataflow → Analysis → Decision support. Render as an ordered list. Desktop may show four connected columns; tablet uses two rows; mobile stacks vertically. Connection lines are decorative. Screen readers receive the step number and name in DOM order.

### 5.7 Work-pattern entry

Required slots:

1. situation or question;
2. analytical contribution;
3. decision supported;
4. optional service/category tags.

Desktop uses a 4/8-column split: entry number and short situation label on the left, structured narrative on the right. Mobile stacks the number, heading, then the three labelled fields. Entries are separated by spacing and a rule, not separate floating cards. There are no client logos or invented outcome metrics.

### 5.8 Insight card

Slots: category, title, one-line takeaway, date or context if known, link. Do not require imagery. The link text should include the article title or use an accessible name that does.

With only three live article pages, the hub uses one lead article and two standard cards. Do not implement category filters, pagination, or load-more controls until the published library has enough pages for those controls to change the result set.

### 5.9 Article evidence callout

Use a bordered aside for source basis, a material limitation, or an open question. It contains a concise label, short explanation, and source links or source-status statement. It must not interrupt every paragraph. On desktop it may sit in a 4-column side rail beside an 8-column article opening; on mobile it appears after the paragraph that establishes its context.

### 5.10 CTA band

Use once near the end of commercial and editorial pages. Slots: one outcome-oriented sentence and one primary action. A secondary link is allowed only when it serves a different, clearly named task. Centre alignment is acceptable for short copy; otherwise use a left-aligned 8/4 split. On mobile, stack and make the primary action full-width only if the label remains concise.

### 5.11 Contact form

Required visible fields:

- name;
- organization;
- role;
- email or phone according to preferred contact method;
- nature of the question or project;
- preferred contact method;
- consent/acknowledgement only if legally required.

Use visible labels and helpful examples outside placeholder-only text. Name and organization may share a row on desktop; all other fields are single column. Put errors next to fields and summarize them at the top after an unsuccessful submission. Move focus to the error summary, preserve entered values, and connect errors using `aria-describedby`. The success state confirms receipt without promising a response time unless DDA has committed to one.

The direct-contact alternative and a document-handling caution sit beside the form on desktop and below it on mobile. Do not add calendar booking, chat, pop-ups, lead scoring, or unnecessary required fields.

### 5.12 Utility text layout

Use a narrow reading column with a modest H1, effective-date slot where applicable, short in-page contents list when there are four or more sections, and correctly nested headings. No reveal animation, cards, decorative graphics, or closing sales CTA. Provide a plain Contact link for questions.

## 6. Motion and state system

Motion exists to explain entry, focus, expansion, and route continuity.

| State | Duration | Easing | Maximum movement |
|---|---:|---|---:|
| Button/link hover | 160–200ms | standard ease-out | 0–2px |
| Card hover | 180–220ms | standard ease-out | 0–3px |
| Drawer/dropdown | 220–280ms | ease-out | 12–20px |
| Section reveal | 400–520ms | ease-out-expo | 12–16px |
| Route transition | 180–240ms | ease-in-out | opacity only preferred |

Use `transform` and `opacity` for movement. Do not animate width, height, top, left, margin, or long shadows. Reveal each major section once; do not animate every paragraph, list item, legal section, or form field. Grid staggering is limited to 60ms between items and no more than six items per group.

Under `prefers-reduced-motion: reduce`:

- render all content in its final position and opacity;
- remove smooth scrolling and transforms;
- open drawers and disclosures without spatial movement;
- retain visible state changes through borders, labels, colour, and focus.

Content must be present and readable if JavaScript fails. Intersection observers enhance presentation only; they never gate visibility.

## 7. Accessibility and interaction baseline

Target WCAG 2.2 AA and test with keyboard-only navigation, screen-reader landmarks, 200% zoom, 400% reflow, high-contrast mode, and reduced motion.

Every page must provide:

- a skip link as the first focusable element;
- one H1 and correctly nested subsequent headings;
- `header`, labelled `nav`, `main`, and `footer` landmarks;
- a unique document title and useful meta description;
- visible focus on every control;
- links whose purpose is clear without relying on adjacent visual layout;
- a minimum 44×44px target for primary touch controls;
- meaningful alt text or empty alt text for decorative images;
- no meaning communicated by colour, position, or animation alone;
- status messages announced with an appropriate live region;
- page title focus or announcement after client-side route changes.

Do not make cards, table rows, or whole work-pattern blocks keyboard-focusable unless they perform an action. Do not use custom controls when native links, buttons, lists, inputs, tables, and details elements can do the job.

## 8. Responsive rules

### Mobile, below 768px

- One content column for all prose, forms, cards, and work entries.
- Keep 20px horizontal gutters and at least 56px between major sections.
- Stack hero actions; avoid two equal-width buttons when one is primary.
- Convert evidence diagrams to labelled stacked sequences.
- Keep breadcrumbs wrapping naturally.
- Do not hide deliverables, methods, source notes, or legal subsections behind accordions.
- Tables may scroll inside a labelled region; the page itself must not scroll horizontally.

### Tablet, 768–1023px

- Use two-column card grids.
- Allow service deliverables and triggers to use two columns when each item retains a readable width.
- Stack hero visuals below text if either region would become narrower than five grid columns.
- Use the mobile navigation pattern unless all labels fit without crowding.

### Desktop, 1024px and above

- Use the 12-column grid and preserve a narrow reading measure inside wide pages.
- Use three columns for routing grids and 4/8 or 5/7 splits for explanatory sections.
- Wide evidence modules and comparison tables may use the full content container.
- Sticky side rails are permitted only for article metadata or contact support and must stop before the footer.

### 8.1 Shared component states

Every interactive component must define all states below before implementation is accepted. The visual treatment may vary by component, but the meaning and accessibility behaviour do not.

| State | Required treatment |
|---|---|
| Default | Label, purpose, and affordance are visible without hover |
| Hover | Optional pointer enhancement; never the only indication of interactivity |
| Focus visible | 2–3px high-contrast ring with adequate offset; not clipped by overflow |
| Active/pressed | Immediate visual confirmation without moving adjacent content |
| Current/selected | Text or semantic state plus a visual marker; never colour alone |
| Disabled | Used sparingly; reason supplied nearby when the user could otherwise act |
| Loading | Existing content remains stable; progress is announced when it lasts long enough to matter |
| Empty | Plain-language explanation and a useful next step; no blank card grid |
| Error | Specific message in text, programmatically associated with the affected control |
| Success | Confirmation is visible, announced, and does not rely on colour or disappearance alone |

Skeleton loaders are unnecessary for server-rendered page content. If asynchronous filtering or submission is introduced later, reserve the result region's space to prevent layout shift and retain the user's inputs and context.

### 8.2 Progressive enhancement and performance

The complete information hierarchy, navigation, article text, service descriptions, work patterns, contact alternatives, and utility content must be present in semantic HTML. JavaScript may enhance the mobile drawer, form submission, filtering, and reveal effects; it must not create the only usable copy or route.

Global performance expectations:

- use system or self-hosted fonts with explicit fallbacks and restrained weight count;
- preload only the critical font asset actually used above the fold;
- size images explicitly to prevent layout shift;
- lazy-load below-fold images, not the wordmark or meaningful hero asset;
- use SVG or CSS for simple diagrams and status keys where accessible;
- avoid third-party scripts that do not serve an established user or operating need;
- keep scroll and pointer handlers passive or observer-driven;
- remove `will-change` after finite animation and do not apply it globally;
- ensure the header, first heading, and primary action render without waiting for client-side hydration.

Target Core Web Vitals should be treated as quality constraints rather than decorative scores: stable layout, responsive interactions, and timely primary content take precedence over entrance effects.

### 8.3 Print and document use

Municipal and public-sector readers may print, save, or circulate pages. Provide a print stylesheet that:

- removes navigation, decorative surfaces, motion, forms, and repetitive CTA bands;
- prints the page title, body, source notes, URLs for external references, and date/context where present;
- expands collapsed disclosures if any are introduced;
- avoids splitting short headings from the following paragraph;
- preserves table headers across pages where browser support permits;
- keeps text black on white and does not depend on background colour for status meaning.

### 8.4 Content-system constraints

Reusable components need editorial limits so the system remains coherent:

- heroes accept one H1, one lead, one primary action, and at most one secondary link;
- route cards accept one title, one outcome sentence, optional metadata, and one destination;
- statement bands accept one heading and one short paragraph;
- related-content groups accept two or three destinations unless a hub explicitly requires more;
- evidence modules require a title, interpretation, source-status field, and text equivalent;
- every optional field must collapse cleanly when absent, without leaving empty rules or columns;
- rich-text fields must preserve heading order and prohibit manually styled pseudo-headings;
- link authors must provide meaningful link labels rather than repeated generic labels.

The CMS or Markdown renderer must not infer missing facts, dates, client identities, sources, conformance claims, or performance outcomes from a template default.

## 9. Canonical page-specific implementation

The sections below expand the machine-readable mapping into implementation guidance. Headings use the exact manifest `page_id`, page title, and `final_filename`. Component order remains authoritative in the TSV block; these sections explain composition and responsive behaviour without adding instructions to the copy-only page files.

### P01 — Home (`01-home.md`)

Component order:

1. Global header.
2. Full-viewport purpose hero: the written H1 and lead, one route into What we do, and a large soft data or systems visual on the right.
3. Latest Insights row: P12–P14 and the Explore more route to P11.
4. Our work section: four story cards drawn from P15, followed by Explore selected work.
5. Work with DDA section: a contact-oriented replacement for the reference site's Careers block.
6. Global footer.

Desktop: hero text uses 6–7 columns with the graphic filling the remaining area; Insights uses three editorial cards; work uses a four-story manual carousel or a large-card strip. Cards may use licensed editorial imagery or data-derived graphics. Mobile: all content stacks in reading order, with the primary action before any visual. Carousel cards stack or remain manually scrollable with visible controls. Do not use a hero carousel, logo wall, testimonial slider, counters, or autoplay media.

Accessibility and motion: the evidence-grid visual is decorative unless it conveys actual data. Reveal major sections once; stagger only siblings inside card grids. If work stories use a carousel, it has labelled previous/next controls, current position text, no autoplay, and complete keyboard access.

### P02 — What we do (`02-what-we-do.md`)

Component order:

1. Header.
2. Hub hero with outcome framing and no competing secondary CTA.
3. Four capability family groups: Planning and place; Economics and modelling; Projects and policy; Diagnostic tools.
4. Seven service routes distributed across the first three groups, with existing tool routes in the fourth.
5. Cross-cutting standard strip: integrated analysis, traceable assumptions, scenario testing, and usable outputs.
6. Closing CTA.
7. Footer.

Desktop: each family has a clear heading and its own service-card grid. Do not force all seven services into one undifferentiated matrix. The Diagnostic tools group uses the current live tool names and routes without changing their behaviour. Mobile: family groups and cards stack. Each card must name a decision outcome, not merely a method.

Accessibility and motion: each service title is the descriptive link. Cards lift only on pointer hover; keyboard focus uses a ring with no movement. Capability icons, if present, are decorative.

### P03 — Fiscal impact and growth modelling (`03-fiscal-impact-growth-modelling.md`)

Component order:

1. Breadcrumb and service hero.
2. Decision supported section.
3. Scenario-comparison evidence module.
4. Deliverables list.
5. Method and source-transparency strip.
6. Engagement triggers.
7. Related services.
8. CTA and footer.

Distinctive module: a labelled scenario table or comparison frame showing assumptions, growth case, timing, revenue/cost categories, and interpretation slots. It is a structure for the page, not a fabricated calculator or dataset.

Desktop: decision text uses 7 columns; scenario module uses all 12; deliverables and triggers use two columns. Mobile: scenario columns become repeated labelled scenario blocks unless the content is truly tabular, in which case use an accessible horizontal scroll region. Do not animate numbers.

### P04 — Official Community Plan review and policy analysis (`04-official-community-plan-policy-analysis.md`)

Component order:

1. Breadcrumb and service hero.
2. Decision supported section.
3. Policy-to-delivery trace module.
4. Deliverables list.
5. Evidence and defensibility method strip.
6. Engagement triggers.
7. Related services.
8. CTA and footer.

Distinctive module: a trace from policy or target → evidence basis → implementation mechanism → delivery condition → unresolved gap. Use a left-to-right sequence on desktop and a numbered vertical sequence on mobile. Any gap status needs text and symbol, not colour alone.

### P05 — Economic development strategy (`05-economic-development-strategy.md`)

Component order:

1. Breadcrumb and service hero.
2. Decision supported section.
3. Opportunity-screen module.
4. Deliverables list.
5. Method strip.
6. Engagement triggers.
7. Related services.
8. CTA and footer.

Distinctive module: opportunity rows assessed against locally relevant criteria such as evidence, delivery control, timing, capacity, and dependency. Do not present unsupported scores or a generic four-quadrant graphic. Desktop may use a readable matrix; mobile uses one opportunity per stacked block with criteria labels.

### P06 — Labour market analysis (`06-labour-market-analysis.md`)

Component order:

1. Breadcrumb and service hero.
2. Decision supported section.
3. Workforce-constraint funnel.
4. Deliverables list.
5. Method/source strip.
6. Engagement triggers.
7. Related services.
8. CTA and footer.

Distinctive module: move from broad labour supply to occupation/trade, qualification, location, mobility, timing, and employer demand. The visual must show that each constraint narrows the usable workforce. Desktop uses a horizontal or stepped sequence; mobile uses an ordered vertical list. Accompany the visual with a plain-language summary.

### P07 — Resource-sector and complex planning analysis (`07-resource-sector-complex-planning-analysis.md`)

Component order:

1. Breadcrumb and service hero.
2. Decision supported section.
3. Dependency-chain module.
4. Deliverables list.
5. Method/source strip.
6. Engagement triggers.
7. Related services.
8. CTA and footer.

Distinctive module: show project stages and dependencies such as workforce, infrastructure, approvals, housing, logistics, public services, and timing. It is a causal/dependency view, not a decorative process timeline. Desktop allows a wide network with a text key; mobile converts to an ordered dependency register. Avoid motion along connecting lines.

### P08 — Long-range financial and scenario planning (`08-long-range-financial-scenario-planning.md`)

Component order:

1. Breadcrumb and service hero.
2. Decision supported section.
3. Assumptions-register module.
4. Deliverables list.
5. Method/source strip.
6. Engagement triggers.
7. Related services.
8. CTA and footer.

Distinctive module: a compact register with assumption, source/status, time horizon, sensitivity, and decision effect. If sample values are not sourced, show field labels and explanatory structure only—never realistic-looking invented figures. Desktop uses a table; mobile uses labelled cards or a scroll region depending on density.

### P09 — Public-interest research and evidence packages (`09-public-interest-research-evidence-packages.md`)

Component order:

1. Breadcrumb and service hero.
2. Decision supported section.
3. Claim-and-source register module.
4. Deliverables list.
5. Method/source strip.
6. Engagement triggers.
7. Related services.
8. CTA and footer.

Distinctive module: claim/question → evidence found → source status → conflict or gap → implication. Status terms must be written out and defined. Do not imply legal privilege, advocacy alignment, or certainty the source record does not support.

### Shared service-page behaviour

All seven service pages use the same outer rhythm and related-service treatment, but the evidence module above changes with the analytical task. Related services are limited to two or three contextually relevant links and never form a seven-card duplicate of the hub. The hero CTA and closing CTA both route to Contact; the second instance can use shorter wording but should not introduce a different conversion path.

### P10 — Who we are (`10-who-we-are.md`)

Component order:

1. Header and purpose hero.
2. Why DDA exists.
3. Four-step process strip: diagnostics, dataflow, analysis, decision support.
4. Independence and transparency statement band.
5. Focus and operating model.
6. Modest principal/principles note only if verified copy exists.
7. CTA and footer.

Desktop: purpose statement uses an 8-column reading block; the process strip spans 12 columns; independence band uses a 5/7 split with concrete commitments in a list. Mobile: process becomes an ordered vertical sequence. Do not use employee-count graphics, office maps, awards walls, stock portraits, or enterprise-governance structures.

Accessibility and motion: process order must exist in the markup. Reveal the process as one group; do not animate step connectors. Any portrait requires useful alt text and must not become the principal credibility signal.

### P11 — Insights (`11-insights.md`)

Component order:

1. Header and insight-hub hero.
2. Featured article row: housing-target article as lead, two supporting real articles.
3. Browse-by-question labels as static links/tags only where they resolve to real pages or anchored sections.
4. Short editorial/source standard.
5. CTA and footer.

Desktop: lead article occupies 7 columns; the two supporting cards stack in 5 columns. Mobile: lead then supporting articles in chronological or editorial order. With only three live article pages, omit filters, search, pagination, and load-more controls. Any additional teaser without a page is styled as non-interactive editorial preview or removed.

Accessibility and motion: category tags are ordinary text unless they perform filtering. Article cards have unique accessible link names. Reveal the featured group once; do not stagger title, takeaway, and metadata separately.

### P12 — When a housing target outruns delivery (`12-insight-housing-target-delivery.md`)

Component order:

1. Breadcrumb.
2. Article header: category/context, H1, standfirst, date/context slot.
3. Article body in a narrow reading column.
4. Policy-to-delivery comparison or evidence callout after the framing section.
5. Practical implications for municipalities.
6. Sourced-basis aside.
7. Open questions/limitations if present.
8. Related reading and CTA.
9. Footer.

Desktop: opening uses 8 columns for text and 4 for metadata/source status; body returns to a centred 720px measure. Mobile: metadata follows the standfirst and callouts remain inline. A comparison graphic must identify target, delivery mechanism, constraint, and implication without invented quantities.

### P13 — The trade gap hidden inside a workforce number (`13-insight-trade-gap-workforce-number.md`)

Component order:

1. Breadcrumb.
2. Article header.
3. Article body.
4. Workforce-number decomposition callout.
5. Practical implications.
6. Sourced-basis aside.
7. Open questions/limitations if present.
8. Related reading and CTA.
9. Footer.

Distinctive module: decompose a broad workforce figure into trade/occupation, qualification, place, timing, and demand. Desktop may use a horizontal sequence; mobile uses a labelled vertical list. The text equivalent carries the conclusion; the graphic never relies on narrowing shapes alone.

### P14 — What a FLAG tells you (`14-insight-what-a-flag-tells-you.md`)

Component order:

1. Breadcrumb.
2. Article header.
3. Article body.
4. Evidence-status key and sample register structure.
5. Practical implications.
6. Sourced-basis aside.
7. Open questions/limitations if present.
8. Related reading and CTA.
9. Footer.

Distinctive module: explain evidence states through written labels and a compact register. “Unknown” is displayed as a deliberate status, not an empty field or warning icon. Any acronym is expanded on first use in both visible copy and accessible description.

### Shared insight behaviour

Articles prioritise uninterrupted reading. No sticky social rail, floating share buttons, autoplay media, inline newsletter interruptions, or animated progress gimmicks. A simple reading-progress indicator is permitted only if it is nonessential, low contrast, and disabled for reduced motion. Source links open in the same tab by default and use descriptive labels.

### P15 — Selected work (`15-selected-work.md`)

Component order:

1. Header and work hero.
2. Six work-story entries using Situation, Work, and Value.
3. Closing CTA.
4. Footer.

Desktop: use full-width stacked entries with a 4/8 structure, or pair a relevant visual with the story. Alternate only subtle surface treatment, not left-right zig-zag layouts. Mobile: each entry stacks Situation, Work, and Value. Do not use invented client names, testimonials, or numerical impact claims. Add filters only when there are at least twelve entries across meaningful categories.

Accessibility and motion: labels remain visible for each field. Tags are not buttons unless they operate a real filter. Reveal each complete entry, with no internal stagger.

### P16 — Contact (`16-contact.md`)

Component order:

1. Header and compact invitation hero.
2. Short intake form.
3. What happens next note.
4. Sensitive-document caution.
5. Footer.

Desktop: form occupies 7 columns and the next-step note occupies 4 columns with a 1-column gap. Mobile: form first, then the note and document caution. The submit action is visually dominant; no newsletter or unrelated CTA appears.

Accessibility and interaction: follow the contact-form contract. Explain required fields in text before the form. Announce submission progress, error, and success. Do not clear the form on a failed submission or rely on colour to identify errors.

Motion: no scroll reveals inside the form. Success feedback may fade in without spatial movement. Respect reduced motion.

### P17 — Privacy (`17-privacy.md`)

Component order:

1. Header and breadcrumb.
2. H1, short scope statement, and effective-date slot.
3. In-page contents list.
4. Sections covering information provided, use, sharing, retention/security, access/correction, and changes.
5. Contact route for privacy questions.
6. Footer.

Use a 720px reading column. On desktop, a non-sticky contents list may sit above the body; do not create a permanent side rail for this page length. On mobile, contents links wrap and remain ordinary anchors. No reveal motion.

### P18 — Legal (`18-legal.md`)

Component order:

1. Header and breadcrumb.
2. H1 and short page scope.
3. In-page contents if four or more sections.
4. Legal identity, intellectual property, third-party links, liability/context notices, and contact sections as supported by final copy.
5. Footer.

Use the utility text layout. Keep Legal separate from Terms so the route and footer label match the page task. Do not insert generic boilerplate inside accordions. No commercial CTA or motion.

### P19 — Terms (`19-terms.md`)

Component order:

1. Header and breadcrumb.
2. H1, scope, and effective-date slot.
3. In-page contents.
4. Website use, no engagement through website, accuracy/change, acceptable use if applicable, governing law, and questions.
5. Footer.

Use the utility text layout. Terms must not be visually merged into Legal even if the final text cross-links between them. No checkboxes or acceptance control unless the site actually requires assent for a transaction or account.

### P20 — Accessibility (`20-accessibility.md`)

Component order:

1. Header and breadcrumb.
2. H1 and commitment statement.
3. Measures taken.
4. Known limitations or conformance-status slot if verified.
5. Feedback/contact method and expected response handling only if operationally supported.
6. Alternative-format request guidance.
7. Footer.

Use the utility text layout. Keep the feedback path prominent and keyboard reachable. Do not claim a conformance level, audit date, or remediation timeline unless verified. No decorative motion. This page itself should model the stated practices.

## 10. Separation of public copy and UI guidance

The 20 public webpage Markdown files contain publishable copy only. They must not contain UI blocks, implementation notes, layout metadata, responsive instructions, accessibility annotations, motion instructions, component names, or non-public front matter added for this coordination layer.

Implementation joins copy to UI by matching the public file's canonical `final_filename` to the row in the machine-readable mapping table. All global and page-specific interface requirements remain in this specification and `work/ui-coordination/page-layout-matrix.md`.

## 11. Build and verification order

1. Implement semantic shell, skip link, container, type, spacing, colour, focus, and breakpoint tokens.
2. Implement header, mobile drawer, footer, hero, buttons, links, statement band, CTA band, lists, and utility text layout.
3. Build Home and What we do to validate the global system and routing cards.
4. Build the shared service shell, then implement the seven distinctive evidence-module variants.
5. Build Who we are, Insights, the three article pages, Selected work, and Contact.
6. Build Privacy, Legal, Terms, and Accessibility as four separate routes.
7. Verify keyboard order, focus return, form errors, landmarks, heading hierarchy, colour contrast, zoom/reflow, touch targets, alt text, table behaviour, and JavaScript-off content.
8. Add optional reveal and route transitions only after the static site passes the accessibility and responsive checks.

## 12. Acceptance checklist

- All manifest routes P01–P20 exist and use one H1.
- The seven service pages share an outer template but have the correct distinct evidence module.
- The three real insight articles have reading-first pages and hub links.
- Privacy, Legal, Terms, and Accessibility are four separate pages.
- Header navigation remains limited to DDA’s actual top-level tasks.
- Selected work remains reachable without inflating the primary navigation.
- Every page has a usable mobile layout and page-specific exception where needed.
- Every interactive component is keyboard operable and has visible focus.
- Reduced-motion mode removes movement without hiding state.
- Forms preserve values, expose errors in text, and announce status.
- Cards route and compare; they do not hold long-form copy.
- No unsupported data, client marks, enterprise features, or decorative motion has been introduced.
