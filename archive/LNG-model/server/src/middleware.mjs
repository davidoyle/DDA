import { config, isProduction } from './config.mjs';
import { deriveRole, getSessionUser } from './auth.mjs';

export async function attachSession(req, _res, next) {
  const token = req.cookies[config.sessionCookieName];
  if (!token) {
    req.auth = null;
    next();
    return;
  }

  const user = await getSessionUser(token);
  req.auth = user;
  next();
}

export function setSessionCookie(res, token) {
  res.cookie(config.sessionCookieName, token, {
    httpOnly: true,
    secure: isProduction,
    sameSite: 'lax',
    maxAge: config.sessionTtlMs,
    path: '/',
  });
}

export function clearSessionCookie(res) {
  res.clearCookie(config.sessionCookieName, {
    httpOnly: true,
    secure: isProduction,
    sameSite: 'lax',
    path: '/',
  });
}

export function requireAuthenticated(req, res, next) {
  if (!req.auth) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }
  next();
}

export function requireAdmin(req, res, next) {
  if (!req.auth || deriveRole(req.auth) !== 'admin') {
    res.status(403).json({ error: 'Forbidden' });
    return;
  }
  next();
}
