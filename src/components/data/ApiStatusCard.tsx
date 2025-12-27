/**
 * API Status Card Component
 *
 * Displays the status of all data fetching APIs.
 * Compact summary by default, expandable for details.
 */

import { Card, CardContent, CardHeader } from '@/components/ui';
import { getAllApiStatuses } from '@/lib/data/network-data';

function formatTimeAgo(isoDate: string): string {
  const date = new Date(isoDate);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffMins = Math.floor(diffMs / (1000 * 60));

  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  return `${Math.floor(diffHours / 24)}d ago`;
}

export function ApiStatusCard() {
  const statuses = getAllApiStatuses();

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
            {allSuccess ? `All ${successCount} OK ✓` : `${issues.length} Issues`}
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

        {/* Collapsible details */}
        <details className="group">
          <summary className="cursor-pointer text-sm text-white/50 hover:text-white/70 transition-colors list-none flex items-center gap-2">
            <span className="text-xs">▶</span>
            <span className="group-open:hidden">Show all {statuses.length} data sources</span>
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

  return (
    <span className={`w-2 h-2 rounded-full ${colors[status]}`} />
  );
}
