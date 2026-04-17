// Test helpers
export function createMockSubmission(overrides = {}) {
  return {
    fullName: 'John Doe',
    targetRole: 'Software Engineer',
    yearsExperience: 3,
    skills: '["JavaScript", "React", "Node.js"]',
    shortBio: 'Experienced developer',
    location: 'New York',
    preferredWorkType: 'remote',
    ...overrides,
  };
}

export const mockSubmissionData = createMockSubmission();
