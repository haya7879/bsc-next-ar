/**
 * Simple in-memory cache service
 * Note: React Query also handles caching, but this provides an additional layer
 */
class CacheService {
  private cache: Map<string, { data: any; timestamp: number }> = new Map();
  private defaultTTL: number = 5 * 60 * 1000; // 5 minutes

  get<T>(key: string): T | null {
    const cached = this.cache.get(key);
    if (!cached) return null;

    // Check if cache is expired (using default TTL)
    const now = Date.now();
    if (now - cached.timestamp > this.defaultTTL) {
      this.cache.delete(key);
      return null;
    }

    return cached.data as T;
  }

  set(key: string, data: any, ttl?: number): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
    });
  }

  delete(key: string): void {
    this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }
}

export const cacheService = new CacheService();

