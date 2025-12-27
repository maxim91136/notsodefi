'use client';

/**
 * API Status Card Component
 *
 * Displays the status of all data fetching APIs.
 * Compact summary by default, expandable for details.
 */

import { Card, CardContent, CardHeader } from '@/components/ui';
import { useAllMetrics } from '@/hooks/useMetrics';
import { getSymbol } from '@/lib/config/projects';
import { formatTimeAgo } from '@/lib/utils/formatting';

interface ApiStatus {
  chain: string;
  source: string;
  status: 'success' | 'partial' | 'failed';
  lastUpdated: string;
}

function LoadingState() {
  return (
    <Card className="border-white/10">
      <CardHeader>
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-white">Data Pipeline Status</h3>
          <span className="px-2 py-1 rounded text-xs font-medium bg-white/10 text-white/50">
            Loading...
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-6 w-12 bg-white/5 rounded animate-pulse" />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function ErrorState({ error }: { error: string }) {
  return (
    <Card className="border-red-500/30">
      <CardHeader>
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-white">Data Pipeline Status</h3>
          <span className="px-2 py-1 rounded text-xs font-medium bg-red-500/20 text-red-400">
            Error
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-white/60">{error}</p>
      </CardContent>
    </Card>
  );
}

export function ApiStatusCard() {
  const { data, loading, error } = useAllMetrics();

  if (loading) return <LoadingState />;
  if (error) return <ErrorState error={error} />;
  if (!data) return null;

  // Convert metrics to status array using centralized config
  const statuses: ApiStatus[] = Object.entries(data.metrics).map(([key, value]) => ({
    chain: getSymbol(key),
    source: value.source || 'API',
    status: value.fetchStatus,
    lastUpdated: value.lastUpdated,
  }));

  const successCount = statuses.filter((s) => s.status === 'success').length;
  const issues = statuses.filter((s) => s.status !== 'success');
  const allSuccess = issues.length === 0;

  return (
    <Card className={allSuccess ? 'border-green-500/30' : 'border-yellow-500/30'}>
      <CardHeader>
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-white">Data Pipeline Status</h3>
          <span
            className={`px-2 py-1 rounded text-xs font-medium ${
              allSuccess
                ? 'bg-green-500/20 text-green-400'
                : 'bg-yellow-500/20 text-yellow-400'
            }`}
          >
            {allSuccess ? `All ${successCount} OK` : `${issues.length} Issues`}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        {/* Show issues prominently if any */}
        {issues.length > 0 && (
          <div className="space-y-2 mb-4">
            {issues.map((api) => (
              <div
                key={api.chain}
                className="flex items-center justify-between p-2 rounded bg-red-500/10 border border-red-500/20"
              >
                <div className="flex items-center gap-2">
                  <StatusDot status={api.status} />
                  <span className="font-medium text-white">{api.chain}</span>
                  <span className="text-xs text-white/40">{api.source}</span>
                </div>
                <span className="text-xs text-red-400">
                  {formatTimeAgo(api.lastUpdated)}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Compact overview - always visible */}
        <div className="flex flex-wrap gap-2 mb-3">
          {statuses.map((api) => (
            <div
              key={api.chain}
              className="flex items-center gap-1.5 px-2 py-1 rounded bg-white/5 text-xs"
              title={`${api.source} - ${formatTimeAgo(api.lastUpdated)}`}
            >
              <StatusDot status={api.status} />
              <span className="text-white/70">{api.chain}</span>
            </div>
          ))}
        </div>

        {/* Collapsible details */}
        <details className="group">
          <summary className="cursor-pointer text-sm text-white/50 hover:text-white/70 transition-colors list-none flex items-center gap-2">
            <span className="text-xs group-open:rotate-90 transition-transform">▶</span>
            <span className="group-open:hidden">Show details</span>
            <span className="hidden group-open:inline">Hide details</span>
          </summary>
          <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2">
            {statuses.map((api) => (
              <div
                key={api.chain}
                className="flex items-center justify-between p-2 rounded bg-white/5"
              >
                <div className="flex items-center gap-2">
                  <StatusDot status={api.status} />
                  <span className="font-medium text-white text-sm">{api.chain}</span>
                  <span className="text-xs text-white/40 truncate">{api.source}</span>
                </div>
                <span className="text-xs text-white/40">
                  {formatTimeAgo(api.lastUpdated)}
                </span>
              </div>
            ))}
          </div>
        </details>
      </CardContent>
    </Card>
  );
}

function StatusDot({ status }: { status: 'success' | 'partial' | 'failed' }) {
  const colors = {
    success: 'bg-green-500',
    partial: 'bg-yellow-500',
    failed: 'bg-red-500',
  };

  const labels = {
    success: 'OK',
    partial: 'Partial',
    failed: 'Error',
  };

  return (
    <span
      className={`w-2 h-2 rounded-full ${colors[status]}`}
      role="status"
      aria-label={labels[status]}
      title={labels[status]}
    />
  );
}
