// Express app setup
import express from 'express';
import { corsMiddleware } from './middlewares/cors';
import { errorMiddleware } from './middlewares/error';
import { router } from './routes';
import type { Express } from 'express';

export const createApp = (): Express => {
  const app = express();

  // Middlewares
  app.use(corsMiddleware);
  app.use(express.json());

  // Routes
  app.use('/api', router);

  // Error handling (must be last)
  app.use(errorMiddleware);

  return app;
};
