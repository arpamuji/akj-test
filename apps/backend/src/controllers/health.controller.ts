// Health controller
export const healthController = {
  async check(req: any, res: any) {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  },
};
