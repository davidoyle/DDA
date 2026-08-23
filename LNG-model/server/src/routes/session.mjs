import express from 'express';
import { deriveRole } from '../auth.mjs';

const router = express.Router();

function buildSessionResponse(auth) {
  if (!auth) {
    return { authenticated: false, role: 'free', planTier: 'free', email: null };
  }

  const role = deriveRole(auth);
  const planTier = auth.plan_tier === 'enterprise' ? 'enterprise' : auth.plan_tier === 'pro' ? 'pro' : 'free';

  return {
    authenticated: true,
    role,
    planTier,
    email: auth.email,
  };
}

router.get('/api/auth/session', (req, res) => {
  res.json(buildSessionResponse(req.auth));
});

router.get('/api/session', (req, res) => {
  res.json(buildSessionResponse(req.auth));
});

export default router;
