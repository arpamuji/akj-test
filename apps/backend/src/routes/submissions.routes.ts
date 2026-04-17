// Submissions routes
import { Router } from 'express';
import { submissionsController } from '../controllers/submissions.controller';

export const submissionsRoutes = Router();

submissionsRoutes.post('/', submissionsController.create);
submissionsRoutes.get('/', submissionsController.findAll);
submissionsRoutes.get('/:id', submissionsController.findById);
submissionsRoutes.get('/:id/score', submissionsController.getScore);
