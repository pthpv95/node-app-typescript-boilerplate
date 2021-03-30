import { NextFunction, Request, Response } from 'express';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction): any => {
  // TBD
  res.status(400).send({
    data: {
      ok: false,
      message: err.message,
    },
  });
};
