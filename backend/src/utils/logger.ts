import pino from "pino";
import { envs } from "../config/envs";

export const logger = pino({
    level: process.env.LOG_LEVEL || "info",
    base: { service: "backend" },
    transport: envs.nodeEnv === "development"
        ? {
            target: "pino-pretty",
            options: { colorize: true, translateTime: "SYS:standard" }
        }
        : undefined,
});