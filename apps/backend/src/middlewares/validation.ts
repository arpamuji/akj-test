// Validation middleware
import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

export const createValidationMiddleware = <T>(schema: ZodSchema<T>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // TODO: Validate request body against schema
    next();
  };
};
