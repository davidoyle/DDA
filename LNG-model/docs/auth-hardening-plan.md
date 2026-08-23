# Server-side Authentication & Entitlement Architecture

This project now uses a server-authoritative authentication model. The frontend no longer treats `localStorage`, URL params, or environment variables as trusted security controls.

## Security model

- **Admin auth:** `POST /api/auth/login` validates email/password against hashed credentials in `users`.
- **Session storage:** random session token is hashed and stored in `sessions`.
- **Session transport:** `HttpOnly`, `Secure` (production), `SameSite=Lax` cookie (`dda_sid`).
- **Session introspection:** `GET /api/session` returns authoritative role (`admin`, `pro`, `free`, `demo`) and `planTier`.
- **Route enforcement:** middleware enforces `requireAuthenticated` and `requireAdmin` for server APIs.
- **Magic links:** verification now validates HMAC signature with timing-safe compare before entitlement grant.
- **Webhook grants:** Stripe webhooks write entitlements into DB (`entitlements`) instead of memory; session checks read those grants.

## Endpoints

- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/session`
- `POST /api/auth/magic-link/create` (admin only)
- `POST /api/auth/magic-link/verify`
- `POST /api/webhook/stripe`
- `GET /api/admin/tools` (admin only)

## Database schema

`server/db/schema.sql` defines:

- `users`
- `sessions`
- `entitlements`
- `magic_links`
- `webhook_events`

These tables provide durable identity, session, and entitlement history across server restarts.

## Frontend contract

Frontend `AccessContext` now derives auth and role only from `GET /api/session`. This removes authority from client-editable storage and URL parameters.

## SSO extension point

Add provider-specific handlers at `/api/auth/sso/:provider` to exchange an IdP token/code for a local `users` row + `sessions` cookie.
