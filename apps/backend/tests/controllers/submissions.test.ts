// Submissions controller integration tests
import { describe, expect, it, beforeAll, afterAll } from 'bun:test';
import request from 'supertest';
import { createApp } from '../../src/app';

describe('Submissions API', () => {
  const app = createApp();

  const validSubmission = {
    fullName: 'Test User',
    targetRole: 'Software Engineer',
    yearsExperience: 3,
    skills: ['JavaScript', 'React', 'Node.js'],
    shortBio: 'Experienced developer with a passion for building web applications.',
    location: 'New York',
    preferredWorkType: 'remote',
  };

  let createdId: string;

  describe('POST /api/submissions', () => {
    it('should return 201 and created submission', async () => {
      const res = await request(app as any)
        .post('/api/submissions')
        .send(validSubmission);

      expect(res.status).toBe(201);
      expect(res.body.data).toBeDefined();
      expect(res.body.data.fullName).toBe(validSubmission.fullName);
      expect(res.body.data.targetRole).toBe(validSubmission.targetRole);
      expect(res.body.completeness).toBeDefined();
      expect(res.body.completeness.score).toBeGreaterThanOrEqual(0);
      expect(res.body.completeness.score).toBeLessThanOrEqual(100);

      createdId = res.body.data.id;
    });

    it('should return 400 for missing required fields', async () => {
      const res = await request(app as any)
        .post('/api/submissions')
        .send({});

      expect(res.status).toBe(400);
      expect(res.body.error).toBeDefined();
      expect(res.body.error.message).toBe('Validation failed');
    });

    it('should return 400 for invalid preferredWorkType', async () => {
      const res = await request(app as any)
        .post('/api/submissions')
        .send({
          ...validSubmission,
          preferredWorkType: 'invalid',
        });

      expect(res.status).toBe(400);
    });

    it('should return 400 for bio over 500 characters', async () => {
      const res = await request(app as any)
        .post('/api/submissions')
        .send({
          ...validSubmission,
          shortBio: 'a'.repeat(501),
        });

      expect(res.status).toBe(400);
    });

    it('should return 400 for negative yearsExperience', async () => {
      const res = await request(app as any)
        .post('/api/submissions')
        .send({
          ...validSubmission,
          yearsExperience: -1,
        });

      expect(res.status).toBe(400);
    });
  });

  describe('GET /api/submissions', () => {
    it('should return all submissions with completeness scores', async () => {
      const res = await request(app as any).get('/api/submissions');

      expect(res.status).toBe(200);
      expect(res.body.data).toBeDefined();
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body.data.length).toBeGreaterThan(0);

      const submission = res.body.data[0];
      expect(submission.id).toBeDefined();
      expect(submission.completeness).toBeDefined();
      expect(submission.completeness.score).toBeDefined();
    });
  });

  describe('GET /api/submissions/:id', () => {
    it('should return single submission by id', async () => {
      const res = await request(app as any).get(`/api/submissions/${createdId}`);

      expect(res.status).toBe(200);
      expect(res.body.data.id).toBe(createdId);
      expect(res.body.completeness).toBeDefined();
    });

    it('should return 404 for non-existent id', async () => {
      const res = await request(app as any).get('/api/submissions/non-existent-id');

      expect(res.status).toBe(404);
    });
  });

  describe('GET /api/submissions/:id/score', () => {
    it('should return completeness score only', async () => {
      const res = await request(app as any).get(`/api/submissions/${createdId}/score`);

      expect(res.status).toBe(200);
      expect(res.body.data.score).toBeDefined();
      expect(res.body.data.missingFields).toBeDefined();
      expect(res.body.data.details).toBeDefined();
    });

    it('should return 404 for non-existent id', async () => {
      const res = await request(app as any).get('/api/submissions/non-existent-id/score');

      expect(res.status).toBe(404);
    });
  });

  describe('DELETE /api/submissions/:id', () => {
    it('should delete submission and return 204', async () => {
      const { body } = await request(app as any)
        .post('/api/submissions')
        .send({
          fullName: 'To Delete',
          targetRole: 'Tester',
          yearsExperience: 1,
          skills: [],
          shortBio: 'Short',
          location: 'Test',
          preferredWorkType: 'remote',
        });

      const res = await request(app as any).delete(`/api/submissions/${body.data.id}`);

      expect(res.status).toBe(204);
    });

    it('should return 404 for non-existent id', async () => {
      const res = await request(app as any).delete('/api/submissions/non-existent-id');

      expect(res.status).toBe(404);
    });
  });
});
