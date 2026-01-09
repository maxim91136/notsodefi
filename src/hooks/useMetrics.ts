'use client';

import { useState, useEffect, useCallback } from 'react';

interface MetricsData {
  lastUpdated: string;
  source?: string;
  metrics: Record<string, unknown>;
  fetchStatus: 'success' | 'partial' | 'failed';
}

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

interface UseMetricsResult {
  data: MetricsData | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

// Cache configuration
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

// Global cache for metrics data
const metricsCache = new Map<string, CacheEntry<MetricsData>>();

// In-flight request map for deduplication
const inflightRequests = new Map<string, Promise<MetricsData>>();

// Global cache for all-metrics
let allMetricsCache: CacheEntry<AllMetricsData> | null = null;
let allMetricsInflight: Promise<AllMetricsData> | null = null;

/**
 * Fetch metrics with caching and request deduplication
 */
async function fetchMetricsWithCache(projectId: string): Promise<MetricsData> {
  const cacheKey = projectId;

  // Check cache first
  const cached = metricsCache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }

  // Check for in-flight request (deduplication)
  const inflight = inflightRequests.get(cacheKey);
  if (inflight) {
    return inflight;
  }

  // Create new request
  const request = (async () => {
    try {
      const response = await fetch(`/api/metrics?project=${projectId}`);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      const data = await response.json();

      // Update cache
      metricsCache.set(cacheKey, { data, timestamp: Date.now() });

      return data;
    } finally {
      // Remove from in-flight map
      inflightRequests.delete(cacheKey);
    }
  })();

  // Track in-flight request
  inflightRequests.set(cacheKey, request);

  return request;
}

export function useMetrics(projectId: string): UseMetricsResult {
  const [data, setData] = useState<MetricsData | null>(() => {
    // Initialize with cached data if available
    const cached = metricsCache.get(projectId);
    return cached ? cached.data : null;
  });
  const [loading, setLoading] = useState(!metricsCache.has(projectId));
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await fetchMetricsWithCache(projectId);
      setData(result);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to fetch');
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [projectId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refetch = useCallback(() => {
    // Clear cache for this project before refetching
    metricsCache.delete(projectId);
    fetchData();
  }, [projectId, fetchData]);

  return { data, loading, error, refetch };
}

interface AllMetricsData {
  count: number;
  metrics: Record<string, MetricsData>;
}

interface UseAllMetricsResult {
  data: AllMetricsData | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

/**
 * Fetch all metrics with caching and request deduplication
 */
async function fetchAllMetricsWithCache(): Promise<AllMetricsData> {
  // Check cache first
  if (allMetricsCache && Date.now() - allMetricsCache.timestamp < CACHE_TTL) {
    return allMetricsCache.data;
  }

  // Check for in-flight request (deduplication)
  if (allMetricsInflight) {
    return allMetricsInflight;
  }

  // Create new request
  const request = (async () => {
    try {
      const response = await fetch('/api/all-metrics');
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      const data = await response.json();

      // Update cache
      allMetricsCache = { data, timestamp: Date.now() };

      return data;
    } finally {
      // Clear in-flight reference
      allMetricsInflight = null;
    }
  })();

  // Track in-flight request
  allMetricsInflight = request;

  return request;
}

export function useAllMetrics(): UseAllMetricsResult {
  const [data, setData] = useState<AllMetricsData | null>(() => {
    // Initialize with cached data if available
    return allMetricsCache?.data || null;
  });
  const [loading, setLoading] = useState(!allMetricsCache);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await fetchAllMetricsWithCache();
      setData(result);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to fetch');
      setData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refetch = useCallback(() => {
    // Clear cache before refetching
    allMetricsCache = null;
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch };
}

/**
 * Invalidate all caches (useful after data updates)
 */
export function invalidateMetricsCache(): void {
  metricsCache.clear();
  allMetricsCache = null;
}
