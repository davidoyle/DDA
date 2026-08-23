# LNG model source copy

This folder is a portable, source-only copy of the complete LNG model application. It contains the model engine, assumptions, interface, API, server, configuration, and package lockfile.

## Why this copy contains no binary files

The download and review system accepts text files only. Unrelated binary marketing assets, the legacy `app.zip`, the FIPPA template PDF, generated build output, dependencies, and Git history are intentionally excluded. None of those files are required by the LNG model or its calculations.

## Run locally

1. Install Node.js 20 or newer.
2. Copy `.env.example` to `.env` and fill in any services you intend to use.
3. Run `npm install`.
4. Run `npm run dev` for the web application.
5. Run `npm run server` separately if you need the local API.

Run `npm run build` to generate a fresh `dist/` directory.
