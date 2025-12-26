import { Redis } from "ioredis";
import dotenv from "dotenv";

dotenv.config();

const CACHE_TTL: number = 3600 * 8;
const cluster = new Redis({
    host: process.env.REDIS_URL,
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD
});

cluster.on('connect', () => console.log('[redis] connect'));
cluster.on('ready', () => console.log('[redis] ready'));
cluster.on('close', () => console.log('[redis] close'));
cluster.on('error', (err) => console.error('[redis] error:', err.message));
cluster.on('end', () => console.error('[redis] connection ended'));
cluster.on('node error', (err, options) =>
  console.error(`[redis] node error (${options.host}:${options.port}):`, err.message)
);
cluster.on('cluster error', (err) => {
  console.error('[CLUSTER ERROR]', err);
});

const isReady = () => cluster.status == "ready";
interface CustomClient {
    readWithLog: (key: string) => Promise<string | null>;
    writeWithLog: (key: string, data: string) => void;
    delWithLog: (key: string) => Promise<void>;
    delAllWithLog: (key: string, batchSize?: number) => Promise<number>;
}
type RedisClient = CustomClient & Redis;

const redis = cluster as RedisClient;

/**
 * Read data from cache
 * 
 * @param key - cache key 
 * @returns
*/
redis.readWithLog = async (key: string): Promise<string | null> => {
    if (!isReady())
        return null;

    let cache: string | null;
    try {
        cache = await cluster.get(key);
        return cache;
    }
    catch (err) {
        console.log("[redis, read]", err);
        cluster.disconnect();
    }

    return null;
}

/**
 * Write data to cache
 * 
 * @param key - cache key
 * @param data - JSON.stringify data
*/
redis.writeWithLog = (key: string, data: string): void => {
    if (!isReady())
        return;

    try { cluster.set(key, data, "EX", CACHE_TTL); }
    catch(err) {
        console.log("[redis, write]", err);
        cluster.disconnect();
    }
}

/**
 * Delete key from cache
 * 
 * @param key - cache key 
*/
redis.delWithLog = async (key: string): Promise<void> => {
    if (!isReady())
        return;
    try { await cluster.del(key); }
    catch(err) {
        console.log("[redis, del]", err);
        cluster.disconnect();
    }
}

/**
 * Delete all keys with pattern from cache
 * 
 * @param key - cache key
 * @param batchSize - batch size (default: 1000)
 * @returns 
*/
redis.delAllWithLog = async (key: string, batchSize=1000): Promise<number> => {
    let cursor: string = '0';
    let totalDeleted: number = 0;

    do {
        const [ nextCursor, keys ] = await cluster.scan(cursor, "MATCH", key, "COUNT", batchSize.toString());
        cursor = nextCursor;

        if (keys.length > 0) {
            const deletedCount = await cluster.del(keys);
            totalDeleted += deletedCount;
        }
    } while (cursor !== '0');

    console.log("[redis]", `clear ${totalDeleted} rows`);
    return totalDeleted;
}



export default redis;