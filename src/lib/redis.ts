import { Redis } from '@upstash/redis';

let cachedRedis: Redis | null | undefined = undefined;

/**
 * Safely returns an Upstash Redis client when environment variables are present.
 * Falls back to `null` (never throws) in local dev or when Redis is not yet provisioned.
 */
export function getRedisClient(): Redis | null {
  if (cachedRedis !== undefined) {
    return cachedRedis;
  }

  const url =
    process.env.UPSTASH_REDIS_REST_URL ||
    process.env.KV_REST_API_URL ||
    '';
  const token =
    process.env.UPSTASH_REDIS_REST_TOKEN ||
    process.env.KV_REST_API_TOKEN ||
    '';

  if (!url || !token) {
    cachedRedis = null;
    return null;
  }

  try {
    cachedRedis = new Redis({ url, token });
    return cachedRedis;
  } catch (err) {
    console.error('[REDIS] Failed to initialize Upstash client:', err);
    cachedRedis = null;
    return null;
  }
}
