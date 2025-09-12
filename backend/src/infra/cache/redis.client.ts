// src/infra/cache/redis.client.ts
import Redis from "ioredis";
import { logger } from "../../utils/logger";
import { envs } from "../../config/envs";

export class RedisClient {
    private static instance: RedisClient;
    private client: Redis;
    private isConnected = false;

    private constructor() {
        const redisUrl = envs.redisUrl || "redis://localhost:6379";
        this.client = new Redis(redisUrl);
        this.setupEventHandlers();
    }

    public static getInstance(): RedisClient {
        if (!RedisClient.instance) {
            RedisClient.instance = new RedisClient();
        }
        return RedisClient.instance;
    }

    private setupEventHandlers(): void {
        this.client.on("connect", () => {
            this.isConnected = true;
            logger.info("Redis connected successfully");
        });

        this.client.on("error", (error) => {
            this.isConnected = false;
            logger.error({ error: error.message }, "Redis connection error");
        });

        this.client.on("close", () => {
            this.isConnected = false;
            logger.warn("Redis connection closed");
        });
    }

    public async connect(): Promise<void> {
        if (!this.isConnected) {
            await this.client.connect();
        }
    }

    public async disconnect(): Promise<void> {
        await this.client.quit();
        this.isConnected = false;
    }

    public async set(key: string, value: any, ttlSeconds?: number): Promise<void> {
        const serializedValue = JSON.stringify(value);
        if (ttlSeconds) {
            await this.client.setex(key, ttlSeconds, serializedValue);
        } else {
            await this.client.set(key, serializedValue);
        }
    }

    public async get<T = any>(key: string): Promise<T | null> {
        const value = await this.client.get(key);
        return value ? (JSON.parse(value) as T) : null;
    }

    public async del(key: string | string[]): Promise<void> {
        const keys = Array.isArray(key) ? key : [key];
        if (keys.length > 0) {
            await this.client.del(...keys);
        }
    }

    public async ping(): Promise<boolean> {
        try {
            return (await this.client.ping()) === "PONG";
        } catch {
            return false;
        }
    }
}

export const redisClient = RedisClient.getInstance();
