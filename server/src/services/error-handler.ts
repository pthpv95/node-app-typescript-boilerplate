import { NextFunction, Request, Response } from 'express';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction): any => {
  // TBD
  console.log(JSON.stringify(err));
  res.send({
    data: {
      ok: false,
      message: err.message,
    },
  });
};
