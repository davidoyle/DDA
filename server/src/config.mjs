export const config = {
  port: Number(process.env.PORT || 3001),
  nodeEnv: process.env.NODE_ENV || 'development',
  databaseUrl: process.env.DATABASE_URL || '',
  sessionCookieName: process.env.SESSION_COOKIE_NAME || 'dda_sid',
  sessionSecret: process.env.SESSION_SECRET || 'replace-me-in-production',
  magicLinkSecret: process.env.MAGIC_LINK_SECRET || 'replace-me-in-production',
  sessionTtlMs: 1000 * 60 * 60 * 24 * 7,
};

export const isProduction = config.nodeEnv === 'production';
