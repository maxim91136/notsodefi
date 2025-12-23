/**
 * API Status Card Component
 *
 * Displays the status of all data fetching APIs.
 * Shows which chains have fresh data and any errors.
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

  const allSuccess = statuses.every((s) => s.status === 'success');

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
            {allSuccess ? 'All Systems OK' : 'Partial Data'}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {statuses.map((api) => (
            <div
              key={api.chain}
              className="flex items-center justify-between py-2 border-b border-white/5 last:border-0"
            >
              <div className="flex items-center gap-3">
                <StatusDot status={api.status} />
                <div>
                  <span className="font-medium text-white">{api.chain}</span>
                  <p className="text-xs text-white/40">{api.source}</p>
                </div>
              </div>
              <span className="text-xs text-white/50">
                {formatTimeAgo(api.lastUpdated)}
              </span>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs text-white/40">
          Data updates daily at 3:00-4:00 UTC via GitHub Actions.
        </p>
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
