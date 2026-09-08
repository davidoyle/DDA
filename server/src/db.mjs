import pg from 'pg';
import { config } from './config.mjs';

if (!config.databaseUrl) {
  console.warn('DATABASE_URL is not configured. Express auth API will fail until configured.');
}

function resolveSsl() {
  if (config.nodeEnv !== 'production') return false;

  // Verify the server certificate by default. Only disable verification if an
  // operator explicitly opts in (e.g. a managed provider whose cert isn't in
  // the default CA store) — never silently, since that allows a MITM to read
  // every session token, password hash, and Stripe entitlement in transit.
  if (process.env.DATABASE_SSL_REJECT_UNAUTHORIZED === 'false') {
    console.warn(
      'DATABASE_SSL_REJECT_UNAUTHORIZED=false: Postgres TLS certificate verification is disabled.',
    );
    return { rejectUnauthorized: false };
  }

  return { rejectUnauthorized: true, ca: process.env.DATABASE_SSL_CA || undefined };
}

export const pool = new pg.Pool({
  connectionString: config.databaseUrl,
  ssl: resolveSsl(),
});

export async function query(text, params = []) {
  const result = await pool.query(text, params);
  return result.rows;
}
