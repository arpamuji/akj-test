// Health routes
import { Router } from 'express';
import { healthController } from '../controllers/health.controller';

export const healthRoutes: Router = Router();

healthRoutes.get('/', healthController.check);
