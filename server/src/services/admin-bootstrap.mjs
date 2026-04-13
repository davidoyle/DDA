import bcrypt from 'bcryptjs';
import { randomUUID } from 'crypto';
import { pool, query } from '../db.mjs';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 8;

export function validateEmail(email) {
  return typeof email === 'string' && EMAIL_PATTERN.test(email.trim().toLowerCase());
}

export function validatePassword(password) {
  return typeof password === 'string' && password.length >= MIN_PASSWORD_LENGTH;
}

export async function hasAnyAdminAccount(client = null) {
  const runner = client || { query: async (text, params) => ({ rows: await query(text, params) }) };
  const result = await runner.query(
    `SELECT EXISTS(
      SELECT 1
      FROM users
      WHERE role = 'admin'
        AND password_hash IS NOT NULL
    ) AS has_admin`,
  );
  return result.rows[0]?.has_admin === true;
}

export async function createFirstAdmin({ email, password }) {
  const normalizedEmail = String(email || '').trim().toLowerCase();
  if (!validateEmail(normalizedEmail)) {
    const error = new Error('Invalid email');
    error.statusCode = 400;
    throw error;
  }

  if (!validatePassword(password)) {
    const error = new Error('Password must be at least 8 characters');
    error.statusCode = 400;
    throw error;
  }

  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const setupCompleted = await hasAnyAdminAccount(client);
    if (setupCompleted) {
      const error = new Error('Admin setup already completed');
      error.statusCode = 409;
      throw error;
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const result = await client.query(
      `INSERT INTO users (id, email, password_hash, role)
       VALUES ($1, $2, $3, 'admin')
       RETURNING id, email, role`,
      [randomUUID(), normalizedEmail, passwordHash],
    );

    await client.query('COMMIT');
    return result.rows[0];
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}

export async function validateAdminCredentials({ email, password }) {
  const normalizedEmail = String(email || '').trim().toLowerCase();
  const rows = await query('SELECT id, email, password_hash, role FROM users WHERE email = $1 LIMIT 1', [normalizedEmail]);
  const user = rows[0];
  if (!user || user.role !== 'admin' || !user.password_hash) return null;

  const valid = await bcrypt.compare(password, user.password_hash);
  return valid ? user : null;
}
