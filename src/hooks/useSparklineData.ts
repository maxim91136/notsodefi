'use client';

import { useState, useEffect } from 'react';

interface SparklineData {
  [projectId: string]: number[];
}

interface UseSparklineDataResult {
  data: SparklineData;
  loading: boolean;
  daysAvailable: number;
}

// Fetches last 7 days of totalScore for sparklines
export function useSparklineData(projectIds: string[]): UseSparklineDataResult {
  const [data, setData] = useState<SparklineData>({});
  const [loading, setLoading] = useState(true);
  const [daysAvailable, setDaysAvailable] = useState(0);

  useEffect(() => {
    if (projectIds.length === 0) {
      setLoading(false);
      return;
    }

    const fetchHistory = async () => {
      setLoading(true);
      const result: SparklineData = {};
      let maxDays = 0;

      // Get last 7 dates
      const dates: string[] = [];
      for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        dates.push(d.toISOString().split('T')[0]);
      }

      // Fetch history for each project (in parallel, batched)
      const fetchProject = async (projectId: string): Promise<[string, number[]]> => {
        const scores: number[] = [];

        for (const date of dates) {
          try {
            const res = await fetch(`/api/history?project=${projectId}&date=${date}`);
            if (res.ok) {
              const json = await res.json();
              // Use totalScore from archived data
              if (typeof json.totalScore === 'number') {
                scores.push(json.totalScore);
              }
            }
          } catch {
            // Skip failed fetches
          }
        }

        return [projectId, scores];
      };

      // Fetch all projects in parallel (limit concurrency)
      const batchSize = 10;
      for (let i = 0; i < projectIds.length; i += batchSize) {
        const batch = projectIds.slice(i, i + batchSize);
        const results = await Promise.all(batch.map(fetchProject));

        for (const [projectId, scores] of results) {
          if (scores.length >= 2) {
            result[projectId] = scores;
            maxDays = Math.max(maxDays, scores.length);
          }
        }
      }

      setData(result);
      setDaysAvailable(maxDays);
      setLoading(false);
    };

    fetchHistory();
  }, [projectIds.join(',')]);

  return { data, loading, daysAvailable };
}
