import express, { Request, Response } from "express";
import cors from "cors";
import pinoHttp from "pino-http";
import { logger } from "./utils/logger";
import { correlationId } from "./middlewares/correlationId";
import dotenv from "dotenv";
import { errorHandler } from "./middlewares/errorHandler";
import { watchlistRoutes } from "./modules/watchlists/watchlist.route";
import { eventRoutes } from "./modules/events/event.route";
import { envs } from "./config/envs";

dotenv.config();

const app = express();

app.use(cors({ origin: envs.frontendUrl }));
app.use(express.json());
app.use(correlationId);
app.use(pinoHttp({
    logger,
    genReqId: (req, res) => (req as any).correlationId,
}))

app.get('/', (req: Request, res: Response) => {
    logger.info('Hello World!');
    res.send('Hello World!');
});

app.use('/api/watchlist', watchlistRoutes);
app.use('/api/event', eventRoutes);

app.use(errorHandler);

export default app;
