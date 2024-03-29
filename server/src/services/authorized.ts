import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
export interface AuthorizedUser {
  userId: string;
}
declare global {
  namespace Express {
    interface Request {
      currentUser: AuthorizedUser
    }
  }
}

export const authorized = (req: Request, res: Response, next: NextFunction): any => {
  const authorization = req.headers['authorization'];
  if (!authorization) {
    throw new Error('Unauthorized');
  }

  try {
    const token = authorization.split(' ')[1];
    const payload: any = verify(token, process.env.ACCESS_TOKEN_SECRET!);
    req.currentUser = payload;
  } catch (err) {
    console.log(err);
    throw new Error('not authenticated');
  }

  return next();
};
