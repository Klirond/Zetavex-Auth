import type { Response, Request, NextFunction } from "express";

const wrapper: Function = (
  f: Function,
): ((res: Response, req: Request, next: NextFunction) => Promise<void>) => {
  return async (
    res: Response,
    req: Request,
    next: NextFunction,
  ): Promise<void> => {
    try {
      await f(res, req, next);
    } catch (err: Error | unknown) {
      next(err);
    }
  };
};

export default wrapper;
