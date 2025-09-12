import { Request, Response, NextFunction } from "express";
import { logger } from "../utils/logger";

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const correlationId = (req as any).correlationId;

  if (err instanceof Error && "statusCode" in err) {
    const status = (err as any).statusCode || 500;
    const code = (err as any).code;

    if (status >= 500) {
      logger.error({ err, correlationId }, `Unhandled error: ${err.message}`);
    } else {
      logger.warn({ err, correlationId }, `Client error: ${err.message}`);
    }

    return res.status(status).json({
      error: err.message,
      type: err.name,
      code,
      statusCode: status,
      correlationId,
    });
  }

  logger.error({ err, correlationId }, "Unexpected error");

  return res.status(500).json({
    error: "Internal Server Error",
    statusCode: 500,
    correlationId,
  });
}
