/**
 * Simple in-memory cache for burnout analysis results
 * Prevents duplicate API calls for the same username
 */

import { AnalyzeResponse } from "./api";

interface CacheEntry {
  data: AnalyzeResponse;
  timestamp: number;
}

const CACHE_TTL = 1000 * 60 * 60; // 1 hour in milliseconds
const cache = new Map<string, CacheEntry>();

export function getCachedResult(username: string): AnalyzeResponse | null {
  const key = username.toLowerCase();
  const entry = cache.get(key);

  if (!entry) {
    return null;
  }

  // Check if cache entry has expired
  if (Date.now() - entry.timestamp > CACHE_TTL) {
    cache.delete(key);
    return null;
  }

  return entry.data;
}

export function setCachedResult(
  username: string,
  data: AnalyzeResponse
): void {
  const key = username.toLowerCase();
  cache.set(key, {
    data,
    timestamp: Date.now(),
  });
}

export function clearCache(): void {
  cache.clear();
}

export function getCacheStats(): { size: number; ttl: number } {
  return {
    size: cache.size,
    ttl: CACHE_TTL,
  };
}
