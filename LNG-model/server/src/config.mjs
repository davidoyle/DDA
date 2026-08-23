import { randomBytes } from 'crypto';

function resolveSecret(name) {
  const value = process.env[name];
  if (value && value.length >= 32) return value;

  const nodeEnv = process.env.NODE_ENV || 'development';
  if (nodeEnv === 'production') {
    throw new Error(`${name} must be set and at least 32 characters in production`);
  }

  return randomBytes(32).toString('hex');
}

export const config = {
  port: Number(process.env.PORT || 3001),
  nodeEnv: process.env.NODE_ENV || 'development',
  databaseUrl: process.env.DATABASE_URL || '',
  sessionCookieName: process.env.SESSION_COOKIE_NAME || 'dda_sid',
  sessionSecret: resolveSecret('SESSION_SECRET'),
  magicLinkSecret: resolveSecret('MAGIC_LINK_SECRET'),
  sessionTtlMs: 1000 * 60 * 60 * 24 * 7,
};

export const isProduction = config.nodeEnv === 'production';
