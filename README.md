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

> The section below describes an earlier content plan and no longer matches what's live.
> The routes actually implemented today are listed under "Notes"; the real page copy lives
> in `.mds/*.md`, imported by `src/content/siteContent.ts`.

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


## Data Commitments

- Diagnostic tooling in this cycle stores anonymous session and intent data in browser `localStorage` only.
- No identifying information (name, email, company, free-text entries) is collected in analytics events.
- Benchmarking language shown in tool UIs must remain true to implementation; if data handling changes (aggregation, export, sharing, sale), the disclosure line must be updated before release.
- The contact form is the one exception: submissions (name, email, message, and the other
  fields on `/contact/`) are written to `contact_submissions` in Postgres by `server/index.mjs`
  (see "Server" below). That table, and the account/session/billing tables alongside it, hold
  real personal data — this section's "localStorage only" claim does not cover them. If the
  privacy policy at `/privacy/` says otherwise, reconcile the two before this server is deployed.

## Notes

- The marketing flow is driven by the routes in `src/content/siteContent.ts` and rendered by
  `src/pages/WebsitePage.tsx`. The current primary routes are:
  - `/` (home)
  - `/what-we-do/` (services, plus one page per service line)
  - `/who-we-are/`
  - `/insights/`
  - `/selected-work/`
  - `/contact/`
  - Diagnostic tools live separately under `/tools/*`, and the fiscal model lives under `/model/*`.

## Production routing for deep links

This app uses `BrowserRouter`, so routes like `/consultation/municipality` are resolved in the client.

To prevent direct URL 404s across hosts, the build now ships route-specific HTML entrypoints in `dist/`
(e.g. `dist/what-we-do/index.html`, `dist/tools/pst-diagnostic/index.html`) that load the same SPA shell.
This allows hard refresh and direct navigation on known routes even when host-level rewrite rules are unavailable.
The route list lives in `scripts/generate-route-entrypoints.mjs` and must be kept in sync with the routes
registered in `src/App.tsx` — `npm run audit:site` checks this for the 20 markdown-driven pages, but not
for the tool/model routes, so double-check those by hand when adding one.

The repo also includes optional host rewrite files, which Vite copies into `dist/` during build:
- `public/.htaccess` for Apache-style hosts
- `public/_redirects` for Netlify-style hosts

Your web host must rewrite unknown paths to `index.html`; otherwise direct navigation to deep links returns a server 404.

## Server

`server/` is an Express + Postgres backend (sessions, admin login, magic-link entitlements,
Stripe billing, and the `/api/contact` and `/api/model/*` endpoints the frontend calls). It is
not wired to any deployment target in this repo — no Procfile, no Vercel/Netlify function config,
no CI step that runs it. If the production site is hosted as a static SPA (per the HTTPS section
below), none of this backend is currently reachable, which means `/contact/` submissions have
nowhere to land and the model/billing/admin flows are unusable in production.

To run it locally:

```bash
# needs a Postgres instance; run server/db/schema.sql against it first
npm run server
```

See `.env.example` for the required `DATABASE_URL`, `SESSION_SECRET`, `MAGIC_LINK_SECRET`, and
the optional `SMTP_*` / `CONTACT_WEBHOOK_URL` vars used to notify on new contact submissions.
Every contact submission is persisted to `contact_submissions` regardless of whether email/webhook
notification is configured; those are best-effort delivery on top of that. Decide whether this
backend should be deployed for real or removed — right now it's neither, which means it carries
real security surface (auth, sessions, a database, payments) for zero live functionality.

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
