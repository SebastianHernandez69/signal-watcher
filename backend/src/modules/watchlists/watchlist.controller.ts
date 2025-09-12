import { Request, Response, NextFunction } from "express";
import { WatchlistService } from "./watchlist.service";

export class WatchlistController{
    constructor(private readonly watchlistService: WatchlistService){}

    async createWatchlist(req: Request, res: Response, next: NextFunction){
        const { name, terms } = req.body;
        const correlationId = req.get('X-Correlation-Id') as string;
        try {
            const watchlist = await this.watchlistService.createWatchlist({ name, terms }, correlationId);
            res.status(201).json(watchlist);
        } catch (error) {
            next(error);
        }
    }

    async getAllWatchlists(req: Request, res: Response, next: NextFunction){
        const correlationId = req.get('X-Correlation-Id') as string;
        try {
            const watchlists = await this.watchlistService.getAllWatchlists(correlationId);
            res.status(200).json(watchlists);
        } catch (error) {
            next(error);
        }
    }

    async getWatchlistById(req: Request, res: Response, next: NextFunction){
        const { id } = req.params;
        const correlationId = req.get('X-Correlation-Id') as string;
        try {
            const watchlist = await this.watchlistService.getWatchlistById(id, correlationId);
            res.status(200).json(watchlist);
        } catch (error) {
            next(error);
        }
    }

}