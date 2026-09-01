# DDA website UI architecture

**Purpose:** Distilled layout and interaction specification for the DDA website.  
**Character:** Professional, precise, calm, and modern. The interface should feel like a serious analytical practice, not a marketing agency or generic software company.

## Design priorities

1. Help a municipal planner, finance director, CAO, public-sector executive, or advisor decide within seconds whether DDA is relevant.
2. Put the decision and the evidence near the top of every page.
3. Keep the visual system quiet so the analysis carries the page.
4. Make every route feel part of the same site without making every page identical.
5. Keep interaction useful, fast, keyboard-accessible, and respectful of reduced-motion settings.

## Global system

### Typography

Use a clean system sans-serif for headings and a highly readable sans-serif for body copy. A single family may serve both roles if it provides enough weight and size range.

Headings should have a clear scale with tight but comfortable tracking. Body copy should use generous line-height and a measure that supports sustained reading. Labels, metadata, categories, and source-status markers may use a restrained monospace face.

Use sentence case for interface labels and headings. Keep paragraphs short. Give long-form insights a wider reading measure than service cards.

### Colour

Use an off-white or near-white base with deep charcoal text. Add one strong accent for primary actions, active states, and selected highlights. Use a muted secondary tone for borders, metadata, and secondary actions.

The accent should be scarce. It marks action and state rather than decorating every section. Contrast must meet accessibility requirements for text, controls, and focus indicators.

### Spacing and rhythm

Use an 8-point spacing scale. Major sections need generous vertical space. Cards and form groups need tighter internal spacing with consistent alignment.

Use one container system across the site. The content width should support wide planning diagrams and tables while keeping ordinary text comfortable to read. Section padding should reduce on small screens without disappearing.

### Grid

Use a 12-column responsive grid on desktop. Most text blocks should occupy 6 to 8 columns. Hero copy should remain narrow enough to scan. Full-width sections should be reserved for the hero, statement bands, and selected calls to action.

### Surface treatment

Use thin borders, soft elevation, and subtle background changes to separate content. Avoid heavy shadows, decorative lines, busy textures, and visual noise.

## Header and footer

### Header

Use a sticky header with the wordmark on the left, primary navigation on the right, and one primary action at the far right.

Primary navigation:

- What we do
- Who we are
- Our thinking
- Contact

The active route should have a clear underline or quiet background state. The header can become more solid and slightly shorter after the page scrolls, but the transition should not move content unexpectedly.

On mobile, replace the navigation with a menu button that opens a full-height drawer or panel. The open state must expose all primary routes, the primary action, and a clear close control. Use large touch targets and trap keyboard focus inside the open menu.

### Footer

Use a sparse footer with the wordmark, purpose line, primary route links, and legal links. On desktop, group links into two or three columns. On mobile, stack them with clear spacing.

Use a soft top border or a light background shift. The footer should close the site, not compete with it.

## Component library

### Buttons

- Primary: filled accent background, medium-weight label, clear contrast.
- Secondary: outlined or quiet filled button for a supporting action.
- Tertiary: text link with underline or arrow for low-emphasis navigation.

Buttons should have consistent height, radius, padding, and focus treatment. Use a full-width primary button in narrow form layouts where it improves reachability.

### Cards

Use equal-height cards for service and insight grids when the content length permits. Give cards a thin border or soft elevation, consistent padding, and a clear title-to-description-to-link hierarchy.

Use a small accent edge, status mark, or category label only when it helps the reader sort the information. Hover may lift the card slightly or strengthen its border. The change should be subtle.

### Hero

Use a full-width hero with a constrained text block. The page title should appear before supporting copy and the primary action should be visible without searching.

Keep backgrounds quiet. Use a solid base, a barely visible texture, or a restrained data-inspired shape. Avoid stock photography unless it carries real meaning for the page.

### Section bands

Alternate white and very light grey sections to create rhythm. Use a stronger background only for a statement band or closing CTA.

### Service and insight cards

Service cards should show the service name, one outcome sentence, and a route to the full page. Insight cards should show category, title, short excerpt, and date or context.

Do not put a long service description into a card. The card routes the reader; the page does the explaining.

### Work pattern blocks

Use numbered or left-accented blocks for selected work. Keep each block internally consistent:

1. Situation or question.
2. Analytical contribution.
3. Decision supported.

Use a two-column arrangement on wide screens when the text remains readable. Stack the blocks on mobile.

### CTA bands

Use a full-width band near the end of a page with one sentence and one primary action. Keep the band visually distinct but restrained. Avoid introducing a second competing action.

### Forms

Use a single-column form for short contact flows. Use two columns only for short, related fields such as name and organization.

Every field needs a visible label. Do not rely on placeholder text as the label. Use clear error text near the affected field and preserve entered values after validation.

The form should feel like a professional intake, not a sales funnel. Include a short confidentiality note without promising privilege or security the site cannot provide.

## Motion and interaction

### Principles

Motion should explain state, hierarchy, or continuity. It should not decorate the page.

Animate opacity and transform for reveals, hover states, drawers, and page transitions. Avoid animating layout properties such as width, height, top, left, or margins when a transform can do the job.

Use one shared ease-out curve for most entrances and hover states. Keep transitions short for controls and slightly slower for section reveals.

### Scroll reveals

Reveal major sections with a soft fade and a small upward movement when they enter the viewport. Stagger items in a card grid only when the sequence helps the reader scan the group.

The page must remain usable when animation is disabled. Content should not depend on a reveal event to become visible.

### Hover and focus

Interactive cards may lift slightly on hover. Buttons may move a small amount or change colour. Links should gain a clear underline or accent state.

Focus states must be visible against every surface. Never use hover as the only indication that an element is interactive.

### Navigation and transitions

Use a simple dropdown or lightly nested menu. A mega-menu is unnecessary for the initial site; the service hub provides the right depth.

If route transitions are added, use a restrained shared fade or the View Transitions API where supported. Route changes must preserve focus and announce the new page title to assistive technology.

### Reduced motion

Respect `prefers-reduced-motion`. Remove movement and reduce transition duration for users who request less motion. Keep state changes visible through colour, border, focus, or text.

## Responsive behaviour

### Desktop

Use the 12-column grid, wide hero composition, and 3-column service or insight grids where content length supports them. Keep reading columns narrower than the overall layout.

### Tablet

Reduce the grid to two columns for cards. Allow hero copy and supporting visuals to stack when the text would become narrow. Keep section spacing generous.

### Mobile

- Collapse all card grids to one column when two columns would make scanning difficult.
- Stack hero copy, actions, and supporting elements.
- Use a menu drawer with large touch targets.
- Keep horizontal padding consistent on every route.
- Make primary form actions easy to reach.
- Allow tables or long evidence lists to scroll horizontally without breaking the page.

Typography should scale smoothly while preserving the hierarchy between page title, section title, card title, and body copy.

## Accessibility

- Use semantic landmarks: header, navigation, main, sections, footer.
- Use one page-level heading followed by an ordered heading structure.
- Provide visible keyboard focus for every interactive element.
- Keep touch targets comfortably large.
- Maintain strong contrast for text, controls, borders, and status markers.
- Give form fields explicit labels and useful error messages.
- Provide descriptive link text instead of repeated “read more” links without context.
- Use alt text for meaningful images and empty alt text for decorative images.
- Avoid conveying meaning through colour alone.
- Ensure drawers, dropdowns, accordions, and filters work with keyboard input.
- Respect reduced-motion preferences.
- Test long headings, large text settings, zoom, and narrow screens.

## Page-level layouts

### Homepage

1. Sticky header.
2. Large outcome-led hero with one primary action.
3. Four outcome pillars in a card grid.
4. Short statement band on independence and defensibility.
5. Selected work pattern blocks.
6. Insights teaser row.
7. Closing CTA band.
8. Sparse footer.

The hero should answer who DDA serves and what changes for the buyer. The work blocks should create confidence without turning the home page into a project archive.

### Services hub

1. Hero with a concise statement of the decision problems DDA handles.
2. Equal-weight service card grid.
3. Cross-cutting capabilities strip for sourcing, scenarios, gap registers, and decision briefs.
4. Closing CTA.

Keep every service card visually equal. Do not make one service appear to be the firm’s only offering unless that is a deliberate business decision.

### Individual service pages

1. Hero with service name, outcome statement, and primary action.
2. Decision-context section.
3. Deliverables list or cards.
4. Short approach section with evidence and defensibility markers.
5. Trigger list in a compact two-column block on desktop.
6. Related-services grid or horizontal list.
7. Closing CTA.

The page should be scannable for a municipal buyer while still giving a technical reader enough structure to judge fit.

### About

1. Hero with purpose and principal identity.
2. Purpose statement.
3. Diagnostics, Dataflow, Analysis process strip.
4. Independence and transparency band.
5. Focus and operating model.
6. Closing CTA.

Keep the page factual. Use the layout to show accountability and method rather than adding corporate biography.

### Insights hub

1. Hero with a short statement about evidence and decisions.
2. Featured insight row with one larger lead card.
3. Optional category chips or filter control.
4. Standard insight card grid.
5. Pagination or load-more control only when the archive needs it.
6. Closing CTA.

Keep category controls simple. The reader should still understand the archive when filters are unavailable.

### Insight article

1. Category and date metadata.
2. Clear title and short standfirst.
3. Narrow reading column.
4. Optional source or evidence callout.
5. “What remains open” block when the finding has a material limitation.
6. Related reading.
7. Closing CTA.

Use restrained inline data visuals only when they make a comparison easier to understand than prose.

### Selected work

1. Hero explaining confidentiality and pattern-based examples.
2. Stacked work blocks with consistent situation, contribution, and decision fields.
3. Optional category filter only when the archive becomes large.
4. Closing CTA.

Give each pattern enough breathing room. Avoid a dense case-study grid that makes consequential work look like a portfolio of logos.

### Contact

1. Hero with a direct invitation.
2. Form in a clean single-column layout.
3. Short process note beside or below the form.
4. Direct email option.
5. Confidentiality note.

Remove all visual distractions from this page. The form is the primary interface.

### Privacy, legal, terms, and accessibility

Use a simple text layout with a narrow reading column, clear headings, generous line-height, and no decorative interaction. Keep these routes easy to reach from the footer and easy to scan on mobile.

## Content-to-layout rules

- Put the decision supported before the methodology.
- Use one primary action per page section.
- Use cards for routing and comparison, not for long prose.
- Use a callout when a number, source status, or limitation changes the reader’s interpretation.
- Keep metadata quiet and consistent.
- Give source-heavy pages a reading mode with comfortable line length.
- Keep client names and confidential details out of public patterns unless permission is confirmed.

## Build order

1. Establish the container, type scale, spacing, colour tokens, focus states, and responsive breakpoints.
2. Build header, mobile menu, footer, buttons, cards, hero, CTA band, and form primitives.
3. Build the homepage and services hub as the shared layout test.
4. Apply the service-page template to all seven service routes.
5. Build About, Insights, Selected Work, and Contact.
6. Add legal/accessibility routes and validate keyboard flow, contrast, mobile layout, and reduced motion.
7. Add scroll reveals and route transitions only after the static layout is stable.
