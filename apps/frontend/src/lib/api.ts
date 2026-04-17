import type { SubmissionInput, Submission, CompletenessResult } from '@/types';

const API_BASE = '/api';

export const api = {
  submissions: {
    async create(data: SubmissionInput): Promise<Submission> {
      const res = await fetch(`${API_BASE}/submissions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      return result.data;
    },
    async findAll(): Promise<Submission[]> {
      const res = await fetch(`${API_BASE}/submissions`);
      const result = await res.json();
      return result.data;
    },
    async getScore(id: string): Promise<CompletenessResult> {
      const res = await fetch(`${API_BASE}/submissions/${id}/score`);
      const result = await res.json();
      return result.data;
    },
  },
};
