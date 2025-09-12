import { Request, Response, NextFunction } from "express";
import { v4 as uuid } from "uuid";

export function correlationId(req: Request, res: Response, next: NextFunction) {
    const id = uuid();
    (req as any).correlationId = id;
    res.setHeader("X-Correlation-Id", id);
    next();
}