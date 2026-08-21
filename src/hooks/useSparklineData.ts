'use client';

import { useState, useEffect, useCallback } from 'react';

interface SparklineData {
  [projectId: string]: number[];
}

interface SparklineApiResponse {
  dates: string[];
  projects: SparklineData;
  count: number;
}

interface CacheEntry {
  data: SparklineData;
  timestamp: number;
}

interface UseSparklineDataResult {
  data: SparklineData;
  loading: boolean;
  daysAvailable: number;
  refetch: () => void;
}

// Cache configuration
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

// Global cache for sparkline data
let sparklineCache: CacheEntry | null = null;
let sparklineInflight: Promise<SparklineApiResponse> | null = null;

/**
 * Fetch sparkline data with caching and request deduplication
 * Uses new batch endpoint: /api/sparklines
 */
async function fetchSparklineDataWithCache(): Promise<SparklineApiResponse> {
  // Check cache first
  if (sparklineCache && Date.now() - sparklineCache.timestamp < CACHE_TTL) {
    return {
      dates: [],
      projects: sparklineCache.data,
      count: Object.keys(sparklineCache.data).length
    };
  }

  // Check for in-flight request (deduplication)
  if (sparklineInflight) {
    return sparklineInflight;
  }

  // Create new request
  const request = (async () => {
    try {
      const response = await fetch('/api/sparklines');
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      const data: SparklineApiResponse = await response.json();

      // Update cache
      sparklineCache = { data: data.projects, timestamp: Date.now() };

      return data;
    } finally {
      // Clear in-flight reference
      sparklineInflight = null;
    }
  })();

  // Track in-flight request
  sparklineInflight = request;

  return request;
}

/**
 * Hook to fetch sparkline data for all projects
 * Uses batch endpoint to reduce API calls from 280 to 1
 */
export function useSparklineData(projectIds: string[]): UseSparklineDataResult {
  const [data, setData] = useState<SparklineData>(() => {
    // Initialize with cached data if available
    return sparklineCache?.data || {};
  });
  const [loading, setLoading] = useState(!sparklineCache);
  const [daysAvailable, setDaysAvailable] = useState(0);

  const fetchData = useCallback(async () => {
    if (projectIds.length === 0) {
      setLoading(false);
      return;
    }

    setLoading(true);

    try {
      const result = await fetchSparklineDataWithCache();

      // Filter to requested projects
      const filteredData: SparklineData = {};
      let maxDays = 0;

      for (const projectId of projectIds) {
        if (result.projects[projectId]) {
          filteredData[projectId] = result.projects[projectId];
          maxDays = Math.max(maxDays, result.projects[projectId].length);
        }
      }

      setData(filteredData);
      setDaysAvailable(maxDays);
    } catch {
      // Keep existing data on error
    } finally {
      setLoading(false);
    }
  }, [projectIds.join(',')]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refetch = useCallback(() => {
    sparklineCache = null;
    fetchData();
  }, [fetchData]);

  return { data, loading, daysAvailable, refetch };
}

/**
 * Invalidate sparkline cache
 */
export function invalidateSparklineCache(): void {
  sparklineCache = null;
}
