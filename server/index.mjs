import express from 'express';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import router from './src/routes.mjs';
import { attachSession } from './src/middleware.mjs';
import { config } from './src/config.mjs';

const app = express();

app.set('trust proxy', 1);
app.use(helmet());
app.use(cookieParser());
app.use((req, res, next) => {
  if (req.path === '/api/webhook/stripe') {
    next();
    return;
  }
  express.json()(req, res, next);
});
app.use(attachSession);

const modelStore = {
  assumptions: {},
  flags: {},
  changelog: [
    {
      version: 1.0,
      date: '2026-05-16',
      modulesAffected: ['All modules'],
      description: 'Initial B.C. Energy Fiscal Decision Model build.',
      reason: 'Create transparent public-assumption fiscal analysis tool.',
      sourceOrAuthority: 'DDA GS27MAN0002',
      ministryApproval: 'PENDING',
    },
  ],
};

app.get('/api/model/assumptions', (_req, res) => res.json({ assumptions: modelStore.assumptions }));
app.patch('/api/model/assumptions', (req, res) => {
  modelStore.assumptions = { ...modelStore.assumptions, ...(req.body?.assumptions ?? req.body ?? {}) };
  res.json({ assumptions: modelStore.assumptions });
});
app.post('/api/model/cashflow', (req, res) => {
  res.json({ status: 'accepted', project: req.body?.project ?? null, assumptions: req.body?.assumptions ?? modelStore.assumptions });
});
app.get('/api/model/changelog', (_req, res) => res.json({ entries: modelStore.changelog }));
app.post('/api/model/changelog', (req, res) => {
  const latest = Math.max(...modelStore.changelog.map((entry) => Number(entry.version) || 0), 0);
  const entry = { ...(req.body ?? {}), version: Math.round((latest + 0.1) * 10) / 10 };
  modelStore.changelog.push(entry);
  res.status(201).json({ entry, entries: modelStore.changelog });
});
app.get('/api/model/flags', (_req, res) => res.json({ flags: modelStore.flags }));
app.patch('/api/model/flags', (req, res) => {
  modelStore.flags = { ...modelStore.flags, ...(req.body?.flags ?? req.body ?? {}) };
  res.json({ flags: modelStore.flags });
});

app.use(router);

app.listen(config.port, () => {
  console.log(`Auth server running on http://localhost:${config.port}`);
});
