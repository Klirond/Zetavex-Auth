import * as z from "zod";
import type { Response } from "express";

import logger from "./logger.ts";
import type { safeParseResult } from "../global/types.ts";

const validationErrorHandler = (
  res: Response,
  result: safeParseResult<unknown>,
): Response => {
  if (result.success) return res.status(200);

  logger.error(z.prettifyError(result.error!));

  return res.status(400).json({
    status: 400,
    message: z.flattenError(result.error!).fieldErrors,
  });
};

export { validationErrorHandler };
