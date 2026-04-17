// Validation middleware
import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';

export const createValidationMiddleware = <T>(schema: ZodSchema<T>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedData = await schema.parseAsync(req.body);
      req.body = validatedData;
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errors =
          (error as any).issues?.map((issue: any) => ({
            field: issue.path.join('.'),
            message: issue.message,
          })) || [];
        res.status(400).json({
          error: {
            status: 400,
            message: 'Validation failed',
            details: errors,
          },
        });
        return;
      }
      next(error);
    }
  };
};
