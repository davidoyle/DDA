import express from 'express';
import { createSession, SESSION_AUTH_METHOD } from '../auth.mjs';
import {
  createFirstAdmin,
  hasAnyAdminAccount,
  validateAdminCredentials,
  validateEmail,
  validatePassword,
} from '../services/admin-bootstrap.mjs';
import { setSessionCookie } from '../middleware.mjs';

const router = express.Router();

router.get('/api/auth/admin/setup-status', async (_req, res) => {
  const hasAdmin = await hasAnyAdminAccount();
  res.json({ setupRequired: !hasAdmin });
});

router.post('/api/auth/admin/setup', async (req, res) => {
  const { email, password, confirmPassword } = req.body || {};

  if (!validateEmail(email)) {
    res.status(400).json({ error: 'Please enter a valid email address.' });
    return;
  }

  if (!validatePassword(password)) {
    res.status(400).json({ error: 'Password must be at least 8 characters long.' });
    return;
  }

  if (password !== confirmPassword) {
    res.status(400).json({ error: 'Passwords do not match.' });
    return;
  }

  try {
    const user = await createFirstAdmin({ email, password });
    const token = await createSession(
      user.id,
      {
        ipAddress: req.ip,
        userAgent: req.get('user-agent') || 'unknown',
      },
      SESSION_AUTH_METHOD.ADMIN_PASSWORD,
    );

    setSessionCookie(res, token);
    res.status(201).json({ ok: true, email: user.email, role: 'admin' });
  } catch (error) {
    if (error?.statusCode === 409) {
      res.status(409).json({ error: 'Admin setup already completed' });
      return;
    }

    if (error?.statusCode === 400) {
      res.status(400).json({ error: error.message });
      return;
    }

    res.status(500).json({ error: 'Unable to create admin account' });
  }
});

router.post('/api/auth/admin/login', async (req, res) => {
  const { email, password } = req.body || {};

  if (!email || !password) {
    res.status(400).json({ error: 'Email and password are required' });
    return;
  }

  const hasAdmin = await hasAnyAdminAccount();
  if (!hasAdmin) {
    res.status(403).json({ error: 'Admin setup is required first' });
    return;
  }

  const user = await validateAdminCredentials({ email, password });
  if (!user) {
    res.status(401).json({ error: 'Invalid credentials' });
    return;
  }

  const token = await createSession(
    user.id,
    {
      ipAddress: req.ip,
      userAgent: req.get('user-agent') || 'unknown',
    },
    SESSION_AUTH_METHOD.ADMIN_PASSWORD,
  );

  setSessionCookie(res, token);
  res.status(204).send();
});

export default router;
