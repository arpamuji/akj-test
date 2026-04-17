// Submissions controller - handles HTTP request/response
import { Request, Response } from 'express';
import { submissionsService } from '../services/submissions.service';
import { completenessService } from '../services/completeness.service';
import httpErrors from 'http-errors';

export const submissionsController = {
  async create(req: Request, res: Response) {
    const submission = await submissionsService.create(req.body);
    const completeness = completenessService.calculateScore(submission);

    res.status(201).json({
      data: submission,
      completeness,
    });
  },

  async findAll(req: Request, res: Response) {
    const submissions = await submissionsService.findAll();
    const withCompleteness = submissions.map((submission) => ({
      ...submission,
      completeness: completenessService.calculateScore(submission),
    }));

    res.json({ data: withCompleteness });
  },

  async findById(req: Request, res: Response) {
    const id = req.params.id as string;
    const submission = await submissionsService.findById(id);

    if (!submission) {
      throw httpErrors(404, 'Submission not found');
    }

    const completeness = completenessService.calculateScore(submission);

    res.json({
      data: submission,
      completeness,
    });
  },

  async getScore(req: Request, res: Response) {
    const id = req.params.id as string;
    const submission = await submissionsService.findById(id);

    if (!submission) {
      throw httpErrors(404, 'Submission not found');
    }

    const completeness = completenessService.calculateScore(submission);

    res.json({ data: completeness });
  },

  async deleteById(req: Request, res: Response) {
    const id = req.params.id as string;
    const submission = await submissionsService.findById(id);

    if (!submission) {
      throw httpErrors(404, 'Submission not found');
    }

    await submissionsService.deleteById(id);

    res.status(204).send();
  },
};
