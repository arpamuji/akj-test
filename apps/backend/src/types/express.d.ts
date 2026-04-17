// Express type extensions
import { Submission } from '@prisma/client';

declare global {
  namespace Express {
    interface Request {
      submission?: Submission;
    }
  }
}

export {};
