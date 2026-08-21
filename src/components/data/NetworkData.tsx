'use client';

/**
 * Network Data Component
 *
 * Displays network metrics fetched daily from KV API.
 * Shows last updated timestamp and data source.
 */

import { Card, CardContent, CardHeader } from '@/components/ui';
import { useMetrics } from '@/hooks/useMetrics';
import { getKvKey, getProjectColors } from '@/lib/config/projects';
import { formatTimeAgo } from '@/lib/utils/formatting';

// Format large hashrates to human-readable format
function formatHashrate(hashrate: number): string {
  if (hashrate >= 1e18) return `${(hashrate / 1e18).toFixed(2)} EH/s`;
  if (hashrate >= 1e15) return `${(hashrate / 1e15).toFixed(2)} PH/s`;
  if (hashrate >= 1e12) return `${(hashrate / 1e12).toFixed(2)} TH/s`;
  if (hashrate >= 1e9) return `${(hashrate / 1e9).toFixed(2)} GH/s`;
  if (hashrate >= 1e6) return `${(hashrate / 1e6).toFixed(2)} MH/s`;
  if (hashrate >= 1e3) return `${(hashrate / 1e3).toFixed(2)} KH/s`;
  return `${hashrate.toFixed(0)} H/s`;
}

interface MetricRowProps {
  label: string;
  value: string | number | null | undefined;
  unit?: string;
}

function MetricRow({ label, value }: MetricRowProps) {
  return (
    <div className="flex justify-between items-center py-2 border-b border-white/5 last:border-0">
      <span className="text-sm text-white/60">{label}</span>
      <span className="font-mono text-white">
        {value !== null && value !== undefined ? (
          typeof value === 'number' ? value.toLocaleString() : value
        ) : (
          <span className="text-white/30">N/A</span>
        )}
      </span>
    </div>
  );
}

interface NetworkDataProps {
  projectId: string;
}

function LoadingState() {
  return (
    <Card className="border-white/10 animate-pulse">
      <CardHeader>
        <div className="h-6 bg-white/10 rounded w-1/3" />
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-4 bg-white/5 rounded" />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function NetworkData({ projectId }: NetworkDataProps) {
  const kvKey = getKvKey(projectId);
  const colors = getProjectColors(projectId);

  // Static projects (kvKey = null) don't have live data
  const { data, loading, error } = useMetrics(kvKey || '');

  if (!kvKey) return null;  // Static project - no network data section
  if (loading) return <LoadingState />;
  if (error) return null;
  if (!data) return null;

  // Handle both 'metrics' and 'data' keys (stablecoins use 'data')
  const m = (data.metrics || (data as unknown as { data: Record<string, unknown> }).data || {}) as Record<string, unknown>;

  return (
    <Card className={colors.border}>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <h3 className={`font-semibold ${colors.text}`}>Network Data</h3>
            <p className="text-xs text-white/40 mt-1">
              Source: {data.source || 'API'}
            </p>
          </div>
          <StatusBadge status={data.fetchStatus} />
        </div>
      </CardHeader>
      <CardContent>
        <MetricsDisplay projectId={projectId} metrics={m} />
        <div className="mt-4 pt-3 border-t border-white/10 text-xs text-white/40">
          Updated {formatTimeAgo(data.lastUpdated)}
        </div>
      </CardContent>
    </Card>
  );
}

function MetricsDisplay({ projectId, metrics }: { projectId: string; metrics: Record<string, unknown> }) {
  const m = metrics;
  const num = (v: unknown) => (typeof v === 'number' ? v : null);

  switch (projectId) {
    case 'bitcoin':
      return (
        <>
          <MetricRow label="Total Nodes" value={num(m.totalNodes)} />
          <MetricRow label="Top 5 Pool Concentration" value={num(m.top5PoolConcentration) ? `${m.top5PoolConcentration}%` : null} />
          <MetricRow label="Largest Pool" value={num(m.largestPoolPercentage) ? `${m.largestPoolPercentage}%` : null} />
          <MetricRow label="Pool Diversity" value={num(m.poolDiversity) ? `${m.poolDiversity} pools` : null} />
        </>
      );

    case 'ethereum':
      return (
        <>
          <MetricRow label="Connected Peers" value={num(m.connectedPeers)} />
          <MetricRow label="Head Slot" value={num(m.headSlot)} />
          <MetricRow label="Finalized Epoch" value={num(m.finalizedEpoch)} />
          <MetricRow label="Sync Distance" value={num(m.syncDistance)} />
        </>
      );

    case 'etc':
      return (
        <>
          <MetricRow label="Block Height" value={num(m.blocks)} />
          <MetricRow label="Total Transactions" value={num(m.transactions)} />
          <MetricRow label="Avg Block Time" value={num(m.avgBlockTime) ? `${(m.avgBlockTime as number / 1000).toFixed(1)}s` : null} />
        </>
      );

    case 'dogecoin':
      return (
        <>
          <MetricRow label="Block Height" value={num(m.blocks)} />
          <MetricRow label="Hashrate (24h)" value={num(m.hashrate24h) ? formatHashrate(m.hashrate24h as number) : null} />
          <MetricRow label="Difficulty" value={num(m.difficulty) ? (m.difficulty as number).toExponential(2) : null} />
          <MetricRow label="Network Nodes" value={num(m.nodes)} />
        </>
      );

    case 'litecoin':
      return (
        <>
          <MetricRow label="Block Height" value={num(m.blocks)} />
          <MetricRow label="Hashrate (24h)" value={num(m.hashrate24h) ? formatHashrate(m.hashrate24h as number) : null} />
          <MetricRow label="Difficulty" value={num(m.difficulty) ? (m.difficulty as number).toExponential(2) : null} />
          <MetricRow label="Network Nodes" value={num(m.nodes)} />
        </>
      );

    case 'bitcoincash':
      return (
        <>
          <MetricRow label="Block Height" value={num(m.blocks)} />
          <MetricRow label="Hashrate (24h)" value={num(m.hashrate24h) ? formatHashrate(m.hashrate24h as number) : null} />
          <MetricRow label="Difficulty" value={num(m.difficulty) ? (m.difficulty as number).toExponential(2) : null} />
          <MetricRow label="Network Nodes" value={num(m.nodes)} />
        </>
      );

    case 'monero':
      return (
        <>
          <MetricRow label="Block Height" value={num(m.blocks)} />
          <MetricRow label="Hashrate (24h)" value={num(m.hashrate24h) ? formatHashrate(m.hashrate24h as number) : null} />
          <MetricRow label="Difficulty" value={num(m.difficulty) ? (m.difficulty as number).toExponential(2) : null} />
        </>
      );

    case 'polkadot':
      return (
        <>
          <MetricRow label="Block Number" value={num(m.blockNumber)} />
          <MetricRow label="Era" value={num(m.era) && m.era !== 0 ? num(m.era) : null} />
          <MetricRow label="Active Validators" value={num(m.activeValidators)} />
          <MetricRow label="Waiting Validators" value={num(m.waitingValidators)} />
          <MetricRow label="Total Staked" value={num(m.totalStaked) ? `${(m.totalStaked as number).toLocaleString()} DOT` : null} />
        </>
      );

    case 'kaspa':
      return (
        <>
          <MetricRow label="Block Count" value={num(m.blockCount)} />
          <MetricRow label="Hashrate" value={num(m.hashrate) ? `${(m.hashrate as number).toLocaleString()} PH/s` : null} />
          <MetricRow label="Circulating Supply" value={num(m.circulatingSupply) ? `${(m.circulatingSupply as number / 1e9).toFixed(2)}B KAS` : null} />
          <MetricRow label="Block Reward" value={num(m.blockReward) ? `${(m.blockReward as number).toFixed(2)} KAS` : null} />
        </>
      );

    default:
      // Generic display for other projects
      const keys = Object.keys(m).slice(0, 5);
      return (
        <>
          {keys.map((key) => (
            <MetricRow key={key} label={key} value={m[key] as string | number | null} />
          ))}
        </>
      );
  }
}

function StatusBadge({ status }: { status: 'success' | 'partial' | 'failed' }) {
  const colors = {
    success: 'bg-green-500/20 text-green-400',
    partial: 'bg-yellow-500/20 text-yellow-400',
    failed: 'bg-red-500/20 text-red-400',
  };

  const labels = {
    success: 'OK',
    partial: 'Partial',
    failed: 'Error',
  };

  return (
    <span className={`px-2 py-1 rounded text-xs font-medium ${colors[status]}`}>
      {labels[status]}
    </span>
  );
}
