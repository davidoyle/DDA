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
app.use(router);

app.listen(config.port, () => {
  console.log(`Auth server running on http://localhost:${config.port}`);
});
