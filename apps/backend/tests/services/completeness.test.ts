// Completeness service unit tests
import { describe, expect, it } from 'bun:test';
import { completenessService } from '../../src/services/completeness.service';

describe('CompletenessService', () => {
  describe('calculateScore()', () => {
    it('should calculate score for complete submission', () => {
      const submission = {
        id: '1',
        fullName: 'John Doe',
        targetRole: 'Software Engineer',
        yearsExperience: 3,
        skills: ['JavaScript', 'React', 'Node.js'],
        shortBio: 'Experienced developer with a passion for building web applications.',
        location: 'New York',
        preferredWorkType: 'remote',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const result = completenessService.calculateScore(submission);

      expect(result.score).toBeGreaterThan(0);
      expect(result.missingFields).toHaveLength(0);
      expect(result.details.fullName).toBe(true);
      expect(result.details.targetRole).toBe(true);
      expect(result.details.location).toBe(true);
      expect(result.details.preferredWorkType).toBe(true);
      expect(result.details.yearsExperience).toBe(true);
      expect(result.details.shortBio).toBe(true);
      expect(result.details.skills).toBe(true);
    });

    it('should return missing fields for incomplete submission', () => {
      const submission = {
        id: '1',
        fullName: '',
        targetRole: '',
        yearsExperience: -1,
        skills: [],
        shortBio: '',
        location: '',
        preferredWorkType: 'invalid',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const result = completenessService.calculateScore(submission);

      expect(result.missingFields).toHaveLength(7);
      expect(result.details.fullName).toBe(false);
      expect(result.details.targetRole).toBe(false);
      expect(result.details.location).toBe(false);
      expect(result.details.preferredWorkType).toBe(false);
      expect(result.details.yearsExperience).toBe(false);
      expect(result.details.shortBio).toBe(false);
      expect(result.details.skills).toBe(false);
    });

    it('should give quality bonus for bio length >= 50', () => {
      const complete = {
        id: '1',
        fullName: 'John Doe',
        targetRole: 'Software Engineer',
        yearsExperience: 3,
        skills: ['JavaScript'],
        shortBio: 'Experienced developer with a passion for building web applications.',
        location: 'New York',
        preferredWorkType: 'remote',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const short = {
        ...complete,
        shortBio: 'Short bio',
      };

      const completeResult = completenessService.calculateScore(complete);
      const shortResult = completenessService.calculateScore(short);

      expect(completeResult.score).toBeGreaterThan(shortResult.score);
    });

    it('should give quality bonus for skills >= 3', () => {
      const many = {
        id: '1',
        fullName: 'John Doe',
        targetRole: 'Software Engineer',
        yearsExperience: 3,
        skills: ['JavaScript', 'React', 'Node.js'],
        shortBio: 'Experienced developer',
        location: 'New York',
        preferredWorkType: 'remote',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const few = {
        ...many,
        skills: ['JavaScript'],
      };

      const manyResult = completenessService.calculateScore(many);
      const fewResult = completenessService.calculateScore(few);

      expect(manyResult.score).toBeGreaterThan(fewResult.score);
    });

    it('should cap score at 100', () => {
      const perfect = {
        id: '1',
        fullName: 'John Doe',
        targetRole: 'Senior Software Engineer',
        yearsExperience: 10,
        skills: ['JavaScript', 'React', 'Node.js', 'TypeScript', 'Python'],
        shortBio:
          'Experienced developer with a passion for building web applications and leading teams.',
        location: 'New York',
        preferredWorkType: 'remote',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const result = completenessService.calculateScore(perfect);
      expect(result.score).toBeLessThanOrEqual(100);
    });
  });

  describe('getMissingFields()', () => {
    it('should return empty array for complete submission', () => {
      const submission = {
        id: '1',
        fullName: 'John Doe',
        targetRole: 'Software Engineer',
        yearsExperience: 3,
        skills: ['JavaScript', 'React'],
        shortBio: 'Experienced developer',
        location: 'New York',
        preferredWorkType: 'remote',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const missing = completenessService.getMissingFields(submission);
      expect(missing).toHaveLength(0);
    });

    it('should return all missing field names', () => {
      const submission = {
        id: '1',
        fullName: '',
        targetRole: '',
        yearsExperience: 0,
        skills: [],
        shortBio: '',
        location: '',
        preferredWorkType: 'invalid',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const missing = completenessService.getMissingFields(submission);
      expect(missing).toContain('fullName');
      expect(missing).toContain('targetRole');
      expect(missing).toContain('location');
      expect(missing).toContain('preferredWorkType');
      expect(missing).toContain('shortBio');
      expect(missing).toContain('skills');
    });
  });
});
