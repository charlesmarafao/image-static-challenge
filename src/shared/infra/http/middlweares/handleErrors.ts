import AppError from '@shared/errors/AppError';
import { NextFunction, Request, Response } from 'express';

export default function HandleErrors(
  error: Error,
  request: Request,
  response: Response,
  _next: NextFunction,
): Response<any> {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      name: error.name,
      message: error.message,
      ...error.data,
      ...(process.env.NODE_ENV !== 'production' && {
        stack: error.stack,
      }),
    });
  }

  return response.status(500).json({
    name: error.name,
    error: 'Internal server error',
    ...(process.env.NODE_ENV !== 'production' && {
      stack: error.stack,
      message: error.message,
    }),
  });
}
