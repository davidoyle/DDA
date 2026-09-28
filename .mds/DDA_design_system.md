---
version: alpha

name: Diagnostics, Dataflow, Analysis

tagline: Get deep into the problem. Find what matters.

description: >-
  Analytical consulting for public-sector, industrial, regulated, and institutional problems.

tone: professional

color-scheme: light

colors:
  primary: "#16324F"
  secondary: "#27516F"
  accent: "#A7C947"
  background: "#FFFFFF"
  surface: "#F3F4F2"
  surface-dim: "#102B22"
  on-primary: "#FFFFFF"
  on-surface: "#111111"
  on-surface-variant: "#626966"
  outline: "#D9DDDA"
  error: "#D93025"
  success: "#2E7D32"

typography:
  display-lg:
    fontFamily: Aptos
    fontSize: 48px
    fontWeight: 300
    lineHeight: "1.2"

  display-md:
    fontFamily: Aptos
    fontSize: 36px
    fontWeight: 300
    lineHeight: "1.2"

  headline-lg:
    fontFamily: Aptos
    fontSize: 30px
    fontWeight: 400
    lineHeight: "1.3"

  headline-md:
    fontFamily: Aptos
    fontSize: 24px
    fontWeight: 600
    lineHeight: "1.3"

  body-lg:
    fontFamily: Open Sans
    fontSize: 18px
    fontWeight: 400
    lineHeight: "1.5"

  body-md:
    fontFamily: Open Sans
    fontSize: 14px
    fontWeight: 400
    lineHeight: "1.5"

  label-md:
    fontFamily: Open Sans
    fontSize: 14px
    fontWeight: 600
    lineHeight: "1"

  label-sm:
    fontFamily: Open Sans
    fontSize: 12px
    fontWeight: 600
    lineHeight: "1"

rounded:
  sm: 4px
  md: 8px
  lg: 16px
  xl: 24px
  full: 9999px

spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 48px

components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.label-md}"
    rounded: "{rounded.full}"
    padding: 12px 24px
    borderColor: "{colors.primary}"

  button-primary-hover:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.label-md}"
    rounded: "{rounded.full}"
    padding: 12px 24px
    borderColor: "{colors.secondary}"

  button-secondary:
    backgroundColor: "{colors.background}"
    textColor: "{colors.primary}"
    typography: "{typography.label-md}"
    rounded: "{rounded.full}"
    padding: 12px 24px
    borderColor: "{colors.primary}"

  card:
    backgroundColor: "{colors.background}"
    rounded: "{rounded.md}"
    borderColor: "{colors.outline}"

  card-elevated:
    backgroundColor: "{colors.background}"
    rounded: "{rounded.md}"

  input-field:
    backgroundColor: "{colors.background}"
    textColor: "{colors.on-surface-variant}"
    rounded: "{rounded.sm}"
    borderColor: "{colors.outline}"

  input-field-focus:
    backgroundColor: "{colors.background}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.sm}"
    borderColor: "{colors.primary}"

  link:
    textColor: "{colors.primary}"
    typography: "{typography.body-md}"

  link-hover:
    textColor: "{colors.secondary}"
    typography: "{typography.body-md}"

  badge:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.sm}"

  badge-error:
    backgroundColor: "{colors.error}"
    textColor: "{colors.on-primary}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.sm}"

  badge-success:
    backgroundColor: "{colors.success}"
    textColor: "{colors.on-primary}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.sm}"

  divider:
    backgroundColor: "{colors.outline}"
    height: 1px

  hero-banner:
    backgroundColor: "{colors.surface-dim}"
    textColor: "{colors.on-primary}"

  button-accent:
    backgroundColor: "{colors.accent}"
    typography: "{typography.label-md}"
    rounded: "{rounded.md}"
    padding: 8px 16px

motion:
  duration-short: 200ms
  duration-medium: 500ms
  duration-long: 1000ms
  easing-standard: cubic-bezier(0.4, 0, 0.2, 1)

elevation:
  sm: 0 1px 2px rgba(0, 0, 0, 0.1)
  md: 0 4px 8px rgba(0, 0, 0, 0.2)
  lg: 0 8px 16px rgba(0, 0, 0, 0.3)
---

## Overview

Diagnostics, Dataflow, Analysis uses a restrained, high-contrast visual system built for professional services. Deep dark surfaces and clean white content areas create authority and separation, with a controlled green accent used as a recognizable brand signal. The overall presentation should feel established, clear, and highly legible.

## Colors

The color strategy uses a dark institutional blue, clean neutrals, and a controlled green accent. High contrast should be maintained across all surfaces to support accessibility and an editorial, publication-like presentation.

* Primary `{colors.primary}` (#16324F): The primary brand color used for key interactive elements, links, and primary calls to action.

* Secondary `{colors.secondary}` (#27516F): A lighter blue variant used for hover states and secondary interactive elements.

* Accent `{colors.accent}` (#A7C947): The DDA accent green, used sparingly as a brand signature and highlight.

* Background `{colors.background}` (#FFFFFF): The clean white background used for main content areas.

* Surface `{colors.surface}` (#F3F4F2): A light neutral surface used for container backgrounds and subtle section grouping.

* Surface Dim `{colors.surface-dim}` (#102B22): A deep green-black surface used in high-impact hero sections and dark content blocks.

* On Primary `{colors.on-primary}` (#FFFFFF): High-contrast white text used on primary buttons and dark surfaces.

* On Surface `{colors.on-surface}` (#111111): The primary text color used on light backgrounds.

* On Surface Variant `{colors.on-surface-variant}` (#626966): A muted grey used for secondary metadata, placeholders, captions, and supporting text.

* Outline `{colors.outline}` (#D9DDDA): A light neutral border used for dividers, input fields, and card outlines.

* Error `{colors.error}` (#D93025): Standard semantic red used for error states and critical alerts.

* Success `{colors.success}` (#2E7D32): Standard semantic green used for success states and positive indicators.

## Typography

The typography system uses Aptos for display and headline levels to deliver an authoritative editorial tone, while relying on Open Sans for body copy and labels to optimize readability across digital screens.

* Display Large `{typography.display-lg}`: Aptos font family, used for high-impact hero titles and major section headers.

* Display Medium `{typography.display-md}`: Aptos font family, used for secondary hero titles and prominent landing page headers.

* Headline Large `{typography.headline-lg}`: Aptos font family, used for standard section headings and article titles.

* Headline Medium `{typography.headline-md}`: Aptos font family, used for subsections and card titles within content grids.

* Body Large `{typography.body-lg}`: Open Sans font family, used for introductory paragraphs and featured callouts.

* Body Medium `{typography.body-md}`: Open Sans font family, the standard body copy size used for articles, descriptions, and general text.

* Label Medium `{typography.label-md}`: Open Sans font family, used for interactive labels, button text, and navigation links.

* Label Small `{typography.label-sm}`: Open Sans font family, used for small metadata, tags, and caption labels.

## Layout

* The layout is structured around a clean, multi-column grid system with generous vertical spacing, utilizing standard spacing units like `{spacing.md}` for gutters and up to `{spacing.2xl}` for section blocks.

* Page sections follow a clear top-to-bottom order: `nav`, `hero`, primary content, supporting content, and `footer`.

* Hero banners use a strong headline and subhead with a single primary CTA, paired with an asymmetric supporting visual when appropriate.

* Responsive containers collapse gracefully on mobile viewports, with the navigation collapsing to a hamburger drawer below 768px.

## Elevation & Depth

Depth is primarily conveyed through flat, high-contrast color blocks, utilizing subtle single-layer shadows only when necessary to preserve a clean, professional aesthetic.

* `elevation.sm`: Used for low-intensity card lift and interactive element states.

* `elevation.md`: Applied to dropdown menus, popovers, and floating navigation elements.

* `elevation.lg`: Reserved for modal overlays, dialog windows, and deep drawer elements.

## Shapes

The brand employs a hybrid shape strategy that balances approachable interactivity with structured, corporate discipline. Interactive elements like primary and secondary CTA buttons utilize fully rounded pill shapes via `{rounded.full}` to clearly invite user action.

In contrast, structural elements such as cards, input fields, and content containers use sharp or subtly rounded corners, specifically `{rounded.sm}` and `{rounded.md}`, to maintain a highly structured, professional tone.

## Components

> **Note:** This spec was adapted from a reference-site design study and contains visual approximations.

> For production use, add a deep reference to each component pointing to its authoritative source:

> `→ Deep reference: src/components/Button/metadata.ts`

### Primary Button

The primary button is a fully rounded pill shape using `{rounded.full}` with a background of `{colors.primary}` and text in `{colors.on-primary}`. It transitions to `{colors.secondary}` during hover states. Use this component for the single most important action on a page or section.

### Secondary Button

The secondary button features a transparent or `{colors.background}` fill with a border and text colored in `{colors.primary}`. It maintains a `{rounded.full}` shape and is used for supporting actions that accompany a primary call to action.

### Card

A structural container utilizing `{rounded.md}` and a subtle border of `{colors.outline}`. It is used to group related content, articles, or insights in a clean, flat grid layout.

### Elevated Card

An alternative card container that relies on `{elevation.sm}` or `{elevation.md}` instead of a border to establish depth. Use this component to draw attention to featured insights or interactive grid items.

### Input Field

A text entry field with a subtle `{rounded.sm}` corner radius and `{colors.outline}` border. It transitions to a `{colors.primary}` border during focus states to provide clear interactive feedback.

### Link

Inline text elements styled with `{colors.primary}` and `{typography.body-md}` that transition to `{colors.secondary}` on hover. Use these for inline text navigation and editorial redirects.

### Badge

A small, compact label utilizing `{rounded.sm}` and `{colors.surface}` to categorize content. Semantic variants like `{colors.error}` and `{colors.success}` are used to represent system alerts or status indicators.

### Divider

A thin, 1px horizontal rule colored in `{colors.outline}`. Use this component to cleanly segment vertical content blocks and maintain editorial structure.

### Hero Banner

A high-impact, full-width container utilizing `{colors.surface-dim}` as a background and `{colors.on-primary}` for text. Use this at the top of landing pages to establish a strong editorial hierarchy.

### Accent Button

A specialized button utilizing `{colors.accent}` and `{rounded.md}`. Use this sparingly for brand-specific actions that need secondary emphasis.

## Do's and Don'ts

| Do | Don't |
| --- | --- |
| Use `{colors.primary}` for primary call-to-action buttons to ensure high visibility. | Do not use `{colors.accent}` as a background color for primary buttons or large text blocks. |
| Apply `{colors.accent}` sparingly as a controlled brand accent. | Do not saturate the interface with `{colors.accent}` or use it for every interactive state. |
| Use `{colors.surface-dim}` for high-impact hero sections and dark editorial blocks. | Do not use `{colors.surface-dim}` without high-contrast text like `{colors.on-primary}`. |
| Ensure all body copy uses `{typography.body-md}` with `{colors.on-surface}` on light backgrounds for optimal readability. | Do not mix font families by using `{typography.display-lg}` for body copy or paragraph blocks. |
| Use `{rounded.full}` for primary and secondary CTA buttons. | Never apply `{rounded.full}` to structural cards or content containers. |
| Separate content blocks cleanly using `{colors.outline}` for dividers. | Avoid tight spacing; maintain a minimum of `{spacing.md}` between adjacent content elements. |
| Apply `{elevation.sm}` or flat designs to interactive cards to maintain the professional aesthetic. | Avoid using heavy shadows or values exceeding `{elevation.lg}` for standard UI elements. |
| Use `{colors.surface}` to group secondary metadata or tags in a neutral container. | Do not use `{colors.primary}` or `{colors.secondary}` for static, non-interactive badge backgrounds. |

## Content Style

* **CTA Style**: Action buttons use imperative verbs in sentence case without exclamation marks. Labels should be concise, typically limited to 2-3 words.

* **Heading Tone**: Headlines should present concrete benefit statements without marketing superlatives. Use a professional mix of declarative statements and clear service language.

* **Copy Density**: Keep paragraphs short and highly scannable, ideally ranging from 1 to 3 sentences. Use bullets and inline links where they improve scanning.

## Imagery & Icons

* Use high-quality editorial photography with natural light, strong composition, and enough negative space to support typography.

* Prefer real places, infrastructure, communities, industrial environments, landscapes, civic settings, and working environments over generic office imagery.

* Avoid staged handshake photography, exaggerated corporate lifestyle imagery, overly glossy stock photography, and decorative visuals with no connection to the page.

* Use icons sparingly. Icons should be simple, geometric, and visually consistent with the typography and component system.

* Avoid dense icon grids when typography, photography, or a simple structural layout communicates the information more clearly.
