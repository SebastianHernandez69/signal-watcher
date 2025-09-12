import { PrismaClient } from "@prisma/client";
import { logger } from "../utils/logger";

export const prisma = new PrismaClient({
  log: [
    { emit: "event", level: "query" },
    { emit: "event", level: "error" },
    { emit: "event", level: "warn" },
  ],
});

prisma.$on("query", (e) => {
  logger.debug({ query: e.query, params: e.params, duration: e.duration }, "DB Query executed");
});

prisma.$on("error", (e) => {
  logger.error({ message: e.message, target: e.target }, "DB Error");
});

prisma.$on("warn", (e) => {
  logger.warn({ message: e.message }, "DB Warning");
});
