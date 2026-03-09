# DDA Website

This repository contains the public-facing website for **DDA (Diagnostics, Dataflow, Analysis)**.

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

To prevent direct URL 404s across hosts, the build now ships route-specific HTML entrypoints in `dist/`
(e.g. `dist/services/index.html`, `dist/consultation/municipality/index.html`) that load the same SPA shell.
This allows hard refresh and direct navigation on known routes even when host-level rewrite rules are unavailable.

The repo also includes optional host rewrite files:
- `public/.htaccess` for Apache-style hosts
- `public/_redirects` for Netlify-style hosts

`npm run build` generates both the normal Vite output and the route entrypoint files via
`scripts/generate-route-entrypoints.mjs`.
Your web host must rewrite unknown paths to `index.html`; otherwise direct navigation to deep links returns a server 404.

The repo now includes:
- `public/.htaccess` for Apache-style hosts
- `public/_redirects` for Netlify-style hosts

Vite copies these files into `dist/` during build.

## HTTPS / TLS troubleshooting (for `ddanalytics.ca`)

If a browser reports **"can't provide a secure connection"** for `https://ddanalytics.ca`,
the issue is usually at the DNS/certificate layer (not the React/Vite app itself).

### Quick diagnosis checklist

1. **Check DNS targets for apex and www**
   - `ddanalytics.ca` and `www.ddanalytics.ca` should typically resolve to the same hosting provider
     (or one should redirect to the other).
   - If they point at different providers, certificate provisioning often fails or appears inconsistent.

2. **Verify certificate is issued for both hostnames**
   - Certificate SANs should include:
     - `ddanalytics.ca`
     - `www.ddanalytics.ca`

3. **Confirm the host has HTTPS enabled for the connected domain**
   - In your hosting dashboard, ensure SSL/TLS is active and bound to this site.

4. **Apply a canonical redirect only after certificate is valid**
   - Redirect `www` → apex (or apex → `www`) once both names have working TLS.

### Why this happens

The web app in this repo is a static SPA and does not terminate TLS itself.
TLS is terminated by the edge host / CDN. If DNS is split across different origins,
or if the edge cert is missing for one hostname, browsers show a secure-connection error
before `index.html` is ever requested.
