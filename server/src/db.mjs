import pg from 'pg';
import { config } from './config.mjs';

if (!config.databaseUrl) {
  console.warn('DATABASE_URL is not configured. Express auth API will fail until configured.');
}

export const pool = new pg.Pool({
  connectionString: config.databaseUrl,
  ssl: config.nodeEnv === 'production' ? { rejectUnauthorized: false } : false,
});

export async function query(text, params = []) {
  const result = await pool.query(text, params);
  return result.rows;
}
