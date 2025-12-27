'use client';

import { useState, useEffect } from 'react';

interface MetricsData {
  lastUpdated: string;
  source?: string;
  metrics: Record<string, unknown>;
  fetchStatus: 'success' | 'partial' | 'failed';
}

interface UseMetricsResult {
  data: MetricsData | null;
  loading: boolean;
  error: string | null;
}

export function useMetrics(projectId: string): UseMetricsResult {
  const [data, setData] = useState<MetricsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/metrics?project=${projectId}`);
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        const json = await response.json();
        setData(json);
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Failed to fetch');
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [projectId]);

  return { data, loading, error };
}

interface AllMetricsData {
  count: number;
  metrics: Record<string, MetricsData>;
}

interface UseAllMetricsResult {
  data: AllMetricsData | null;
  loading: boolean;
  error: string | null;
}

export function useAllMetrics(): UseAllMetricsResult {
  const [data, setData] = useState<AllMetricsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch('/api/all-metrics');
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        const json = await response.json();
        setData(json);
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Failed to fetch');
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
}
