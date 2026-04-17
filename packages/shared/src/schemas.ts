import { z } from 'zod';

export const submissionSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  targetRole: z.string().min(1, 'Target role is required'),
  yearsExperience: z.number().int().min(0).max(50),
  skills: z.array(z.string()).default([]),
  shortBio: z.string().max(500, 'Bio must be under 500 characters'),
  location: z.string().min(1, 'Location is required'),
  preferredWorkType: z.enum(['remote', 'hybrid', 'onsite']),
});

export type SubmissionInput = z.infer<typeof submissionSchema>;

export const completenessResultSchema = z.object({
  score: z.number().min(0).max(100),
  missingFields: z.array(z.string()),
  details: z.record(z.string(), z.boolean()),
});

export type CompletenessResult = z.infer<typeof completenessResultSchema>;
