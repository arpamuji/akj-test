// Shared types
export interface Submission {
  id: string;
  fullName: string;
  targetRole: string;
  yearsExperience: number;
  skills: string[];
  shortBio: string;
  location: string;
  preferredWorkType: 'remote' | 'hybrid' | 'onsite';
  createdAt: string;
  updatedAt: string;
}

export interface CompletenessResult {
  score: number;
  missingFields: string[];
  details: Record<string, boolean>;
}

export interface SubmissionInput {
  fullName: string;
  targetRole: string;
  yearsExperience: number;
  skills: string[];
  shortBio: string;
  location: string;
  preferredWorkType: 'remote' | 'hybrid' | 'onsite';
}
