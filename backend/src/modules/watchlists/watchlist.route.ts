import { Router } from 'express';
import { WatchlistController } from './watchlist.controller';
import { WatchlistService } from './watchlist.service';
import { validateBody } from '../../middlewares/validate';
import { createWatchlistSchema } from './dto/create-watchlist.dto';
import { prisma } from '../../infra/prisma';

const router = Router();
const watchlistService = new WatchlistService(prisma);
const watchlistController = new WatchlistController(watchlistService);

router.post('/create', validateBody(createWatchlistSchema), watchlistController.createWatchlist.bind(watchlistController));
router.get('/', watchlistController.getAllWatchlists.bind(watchlistController));
router.get('/:id', watchlistController.getWatchlistById.bind(watchlistController));

export { router as watchlistRoutes };