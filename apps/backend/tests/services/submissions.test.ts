// Submissions service unit tests
import { describe, expect, it, beforeAll, afterAll } from 'bun:test';
import { PrismaLibSql } from '@prisma/adapter-libsql';
import { PrismaClient } from '../../generated/prisma/client';
import { submissionsService } from '../../src/services/submissions.service';

// Create test database adapter
const testAdapter = new PrismaLibSql({ url: 'file:./prisma/test.db' });
const testPrisma = new PrismaClient({ adapter: testAdapter });

describe('SubmissionsService', () => {
  beforeAll(async () => {
    // Ensure test database is clean
    await testPrisma.submission.deleteMany();
  });

  afterAll(async () => {
    await testPrisma.$disconnect();
  });

  describe('create()', () => {
    it('should create a submission with valid data', async () => {
      const data = {
        fullName: 'John Doe',
        targetRole: 'Software Engineer',
        yearsExperience: 3,
        skills: ['JavaScript', 'React', 'Node.js'],
        shortBio: 'Experienced developer',
        location: 'New York',
        preferredWorkType: 'remote',
      };

      const submission = await submissionsService.create(data);

      expect(submission.fullName).toBe(data.fullName);
      expect(submission.targetRole).toBe(data.targetRole);
      expect(submission.yearsExperience).toBe(data.yearsExperience);
      expect(submission.location).toBe(data.location);
      expect(submission.preferredWorkType).toBe(data.preferredWorkType);
      expect(submission.shortBio).toBe(data.shortBio);
      // Service transforms skills to array
      expect(submission.skills).toEqual(data.skills);
      expect(submission.id).toBeDefined();
    });

    it('should create submission with empty skills array', async () => {
      const data = {
        fullName: 'Jane Doe',
        targetRole: 'Designer',
        yearsExperience: 2,
        skills: [],
        shortBio: 'Creative designer',
        location: 'Boston',
        preferredWorkType: 'hybrid',
      };

      const submission = await submissionsService.create(data);
      expect(submission.skills).toEqual([]);
    });
  });

  describe('findAll()', () => {
    it('should return all submissions ordered by createdAt desc', async () => {
      const first = await submissionsService.create({
        fullName: 'First User',
        targetRole: 'Developer',
        yearsExperience: 1,
        skills: ['JavaScript'],
        shortBio: 'First',
        location: 'City A',
        preferredWorkType: 'remote',
      });

      const second = await submissionsService.create({
        fullName: 'Second User',
        targetRole: 'Designer',
        yearsExperience: 2,
        skills: ['Figma'],
        shortBio: 'Second',
        location: 'City B',
        preferredWorkType: 'onsite',
      });

      const submissions = await submissionsService.findAll();

      expect(submissions.length).toBeGreaterThanOrEqual(2);
      expect(submissions[0].id).toBe(second.id);
      expect(submissions[1].id).toBe(first.id);
    });
  });

  describe('findById()', () => {
    it('should return submission by id', async () => {
      const created = await submissionsService.create({
        fullName: 'Find Me',
        targetRole: 'Tester',
        yearsExperience: 5,
        skills: ['Testing'],
        shortBio: 'Find this submission',
        location: 'Test City',
        preferredWorkType: 'remote',
      });

      const found = await submissionsService.findById(created.id);

      expect(found).toBeDefined();
      expect(found?.fullName).toBe('Find Me');
      expect(found?.id).toBe(created.id);
    });

    it('should return null for non-existent id', async () => {
      const found = await submissionsService.findById('non-existent-id');
      expect(found).toBeNull();
    });
  });

  describe('deleteById()', () => {
    it('should delete submission by id', async () => {
      const created = await submissionsService.create({
        fullName: 'Delete Me',
        targetRole: 'Tester',
        yearsExperience: 1,
        skills: [],
        shortBio: 'To be deleted',
        location: 'Test',
        preferredWorkType: 'remote',
      });

      await submissionsService.deleteById(created.id);

      const found = await submissionsService.findById(created.id);
      expect(found).toBeNull();
    });
  });
});
