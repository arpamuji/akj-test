// Shared types
export interface Submission {
  id: number;
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
