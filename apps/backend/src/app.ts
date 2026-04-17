// Express app setup
import express from 'express';
import helmet from 'helmet';
import { corsMiddleware } from './middlewares/cors';
import { errorMiddleware } from './middlewares/error';
import { router } from './routes';
import type { Express } from 'express';

export const createApp = (): Express => {
  const app = express();

  // Middlewares
  app.use(corsMiddleware);
  app.use(helmet({ contentSecurityPolicy: false })); // Disable CSP for development
  app.use(express.json({ limit: '10kb' }));
  app.use(express.urlencoded({ extended: true, limit: '10kb' }));

  // Routes
  app.use('/api', router);

  // Error handling (must be last)
  app.use(errorMiddleware);

  return app;
};
