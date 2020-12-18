import { Request, Response } from 'express';

export interface HttpContext {
  context: {
    req: Request
    res: Response
    payload: any
  }
}