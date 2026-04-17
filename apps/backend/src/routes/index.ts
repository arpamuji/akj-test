// Routes index - register all route modules
import { Router } from 'express';
import { submissionsRoutes } from './submissions.routes';
import { healthRoutes } from './health.routes';

const router = Router();

router.use('/submissions', submissionsRoutes);
router.use('/health', healthRoutes);

export { router };
