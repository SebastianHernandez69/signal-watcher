import { redisClient } from "./redis.client";

export class CacheService {
    private defaultTtlSeconds = 300;

    public generateKey(...parts: string[]): string {
        return parts.filter(Boolean).join(":");
    }

    async cacheWatchlist(watchlistId: string, data: any): Promise<void> {
        const key = this.generateKey("watchlist", watchlistId);
        await redisClient.set(key, data, 600);
    }

    async getCachedWatchlist<T = any>(watchlistId: string): Promise<T | null> {
        const key = this.generateKey("watchlist", watchlistId);
        return redisClient.get<T>(key);
    }
 
    async invalidateWatchlist(watchlistId: string): Promise<void> {
        const key = this.generateKey("watchlist", watchlistId);
        await redisClient.del(key);
    }


    // Cache watchlists list

    async cacheWatchlistsList(data: any): Promise<void> {
        const key = this.generateKey("watchlists", "all");
        await redisClient.set(key, data, this.defaultTtlSeconds);
    }

    async getCachedWatchlistsList<T = any>(): Promise<T | null> {
        const key = this.generateKey("watchlists", "all");
        return redisClient.get<T>(key);
    }
    
    async invalidateWatchlistsList(): Promise<void> {
        const key = this.generateKey("watchlists", "all");
        await redisClient.del(key);
    }

    // health check
    async healthCheck(): Promise<{ status: string }> {
        const ok = await redisClient.ping();
        return { status: ok ? "healthy" : "unhealthy" };
    }
}

export const cacheService = new CacheService();
