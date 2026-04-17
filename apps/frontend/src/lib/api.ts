// API client for backend communication
const API_BASE = '/api';

export const api = {
  submissions: {
    async create(data: any) {
      const res = await fetch(`${API_BASE}/submissions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return res.json();
    },
    async findAll() {
      const res = await fetch(`${API_BASE}/submissions`);
      return res.json();
    },
    async getScore(id: number) {
      const res = await fetch(`${API_BASE}/submissions/${id}/score`);
      return res.json();
    },
  },
};
