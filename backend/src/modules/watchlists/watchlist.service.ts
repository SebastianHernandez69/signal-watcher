import { logger } from "../../utils/logger";
import { CreateWatchlistDto } from "./dto/create-watchlist.dto";
import { NotFoundError } from "../../utils/errors";
import { PrismaClient } from "@prisma/client";
import { cacheService } from "../../infra/cache/cache.service";

export class WatchlistService {
    constructor(private readonly prisma: PrismaClient) {}

    // Create a new watchlist
    async createWatchlist(dto: CreateWatchlistDto, correlationId: string): Promise<any> {
        const { name, terms } = dto;
        
        const watchlist = await this.prisma.watchlist.create({
            data: {
                name,
                terms: {
                    create: terms
                }
            },
            include: {
                terms: true
            }
        });

        await cacheService.invalidateWatchlistsList();
        await cacheService.cacheWatchlist(watchlist.id, watchlist);
            
        logger.info({ correlationId, newWatchlist: watchlist }, "Watchlist created successfully");
        return watchlist;
    }

    // Get all watchlists
    async getAllWatchlists(correlationId: string): Promise<any> {
        const cachedWatchlists   = await cacheService.getCachedWatchlistsList();

        if (cachedWatchlists) {
            logger.info({ correlationId, count: cachedWatchlists.length, cachedWatchlists }, "Watchlists list retrieved from cache successfully");
            return cachedWatchlists;
        }

        const watchlistsList = await this.prisma.watchlist.findMany({
            include: {
                terms: true
            }
        });

        await cacheService.cacheWatchlistsList(watchlistsList);

        logger.info({ correlationId, count: watchlistsList.length }, "Watchlists list retrieved successfully");
        return watchlistsList;
    }

    // Get a watchlist by id
    async getWatchlistById(id: string, correlationId: string): Promise<any> {

        const cachedWatchlist = await cacheService.getCachedWatchlist(id);

        if (cachedWatchlist) {
            logger.info({ correlationId, countTerms: cachedWatchlist.terms.length, cachedWatchlist }, "Watchlist retrieved from cache successfully");
            return cachedWatchlist;
        }

        const watchlist = await this.prisma.watchlist.findUnique({
            where: {
                id
            },
            include: {
                terms: true
            }
        });

        if (!watchlist) {
            throw new NotFoundError("Watchlist not found");
        }

        await cacheService.cacheWatchlist(id, watchlist);

        logger.info({ correlationId, countTerms: watchlist.terms.length }, "Watchlist found successfully");
        return watchlist;
    }
}
