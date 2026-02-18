# DDA Website

This repository contains the public-facing website for **DDA (David Doyle Analysis)**.

The site presents DDA as a professional institutional analysis practice focused on helping leaders identify where systems are underperforming, quantify the impact, and plan evidence-based reforms.

## What this website is for

The website is designed to support a simple client journey:

1. **Look professional** — establish credibility and clarity around DDA’s institutional analysis focus.
2. **Get the call** — give visitors a clear path to make contact.
3. **Sell the tiered product** — present structured service offerings and price ranges.
4. **Scope delivery** — collect enough intake context to recommend an engagement level.

## Core positioning

DDA’s core message throughout the site:

- Institutional systems often run on assumptions.
- When assumptions diverge from reality, hidden costs compound.
- DDA performs forensic institutional diagnostics to expose those gaps and propose structural fixes.

## Site structure

### 1) Home (`/`)
The homepage establishes the institutional brand and value proposition:
- Hero: **Institutional Systems Analysis**
- Subheading focused on evidence-based diagnostics
- Core explanatory body copy
- Visual “assumed vs actual performance” concept
- Three service category summaries

### 2) Services (`/services`)
The services page explains how work is sold:
- **Diagnostic Assessments (entry point)** with tiered options:
  - Standard Diagnostic
  - Comprehensive Diagnostic
  - Strategic Assessment
- **Specialized Services** (e.g., litigation support, policy analysis, investigative research)
- Timeline and pricing ranges for decision-makers

### 3) About (`/about`)
The about page explains:
- Who DDA serves
- The evidence-first methodology
- Founder background and domain focus

### 4) Contact (`/contact`)
The contact page provides a professional intake form for:
- Email
- Brief system/problem description
- Preferred timeline
- Optional budget range

It sets response expectations for a preliminary assessment.

## Tech stack

- **React 19**
- **TypeScript**
- **Vite**
- **React Router**
- **Tailwind CSS**

## Local development

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

## Notes

- This repo currently includes legacy UI components and pages from earlier iterations.
- The active marketing flow is driven by the primary routes in `src/App.tsx`:
  - `/`
  - `/services`
  - `/about`
  - `/contact`

## Production routing for deep links

This app uses `BrowserRouter`, so routes like `/consultation/municipality` are resolved in the client.
Your web host must rewrite unknown paths to `index.html`; otherwise direct navigation to deep links returns a server 404.

The repo now includes:
- `public/.htaccess` for Apache-style hosts
- `public/_redirects` for Netlify-style hosts

Vite copies these files into `dist/` during build.
