// Submissions routes
import { Router } from 'express';
import { submissionsController } from '../controllers/submissions.controller';
import { createValidationMiddleware } from '../middlewares/validation';
import { submissionSchema } from '@akj-test/shared';

export const submissionsRoutes: Router = Router();

submissionsRoutes.post(
  '/',
  createValidationMiddleware(submissionSchema),
  submissionsController.create
);
submissionsRoutes.get('/', submissionsController.findAll);
submissionsRoutes.get('/:id', submissionsController.findById);
submissionsRoutes.get('/:id/score', submissionsController.getScore);
submissionsRoutes.delete('/:id', submissionsController.deleteById);
