// Completeness service - calculate profile completeness score
import type { Submission } from '../../generated/prisma/client';

interface CompletenessResult {
  score: number;
  missingFields: string[];
  details: Record<string, boolean>;
}

// Type with skills as array (after service transformation)
interface SubmissionWithSkills extends Omit<Submission, 'skills'> {
  skills: string[];
}

export const completenessService = {
  calculateScore(submission: SubmissionWithSkills): CompletenessResult {
    const details: Record<string, boolean> = {};
    const missingFields: string[] = [];

    const requiredFieldChecks = {
      fullName: !!submission.fullName.trim(),
      targetRole: !!submission.targetRole.trim(),
      location: !!submission.location.trim(),
      preferredWorkType: ['remote', 'hybrid', 'onsite'].includes(submission.preferredWorkType),
      yearsExperience: submission.yearsExperience >= 0,
      shortBio: !!submission.shortBio.trim(),
      skills: submission.skills.length > 0,
    };

    const requiredFieldsCount = Object.values(requiredFieldChecks).filter(Boolean).length;
    const requiredScore = (requiredFieldsCount / 7) * 60;

    for (const [field, isValid] of Object.entries(requiredFieldChecks)) {
      details[field] = isValid;
      if (!isValid) {
        missingFields.push(field);
      }
    }

    let qualityScore = 0;

    if (submission.shortBio.length >= 50) {
      qualityScore += 10;
    }

    if (submission.skills.length >= 3) {
      qualityScore += 10;
    }

    if (submission.yearsExperience >= 2) {
      qualityScore += 10;
    }

    if (submission.targetRole.length >= 3) {
      qualityScore += 10;
    }

    const totalScore = Math.round(requiredScore + qualityScore);

    return {
      score: Math.min(100, totalScore),
      missingFields,
      details,
    };
  },

  getMissingFields(submission: SubmissionWithSkills): string[] {
    const missing: string[] = [];

    if (!submission.fullName.trim()) missing.push('fullName');
    if (!submission.targetRole.trim()) missing.push('targetRole');
    if (!submission.location.trim()) missing.push('location');
    if (!['remote', 'hybrid', 'onsite'].includes(submission.preferredWorkType)) {
      missing.push('preferredWorkType');
    }
    if (submission.yearsExperience < 0) missing.push('yearsExperience');
    if (!submission.shortBio.trim()) missing.push('shortBio');
    if (submission.skills.length === 0) missing.push('skills');

    return missing;
  },
};
