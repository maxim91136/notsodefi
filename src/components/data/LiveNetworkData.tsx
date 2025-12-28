'use client';

/**
 * Live Network Data Component
 *
 * Displays real-time network metrics fetched from KV API.
 * Shows last updated timestamp and data source.
 */

import { Card, CardContent, CardHeader } from '@/components/ui';
import { useMetrics } from '@/hooks/useMetrics';
import { getKvKey, getProjectColors } from '@/lib/config/projects';
import { formatTimeAgo } from '@/lib/utils/formatting';

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

interface LiveNetworkDataProps {
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

function ErrorState({ error }: { error: string }) {
  return (
    <Card className="border-red-500/30">
      <CardHeader>
        <h3 className="font-semibold text-red-400">Network Data Error</h3>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-white/60">{error}</p>
      </CardContent>
    </Card>
  );
}

export function LiveNetworkData({ projectId }: LiveNetworkDataProps) {
  const kvKey = getKvKey(projectId);
  const { data, loading, error } = useMetrics(kvKey);
  const colors = getProjectColors(projectId);

  if (loading) return <LoadingState />;
  if (error) return <ErrorState error={error} />;
  if (!data) return null;

  // Handle both 'metrics' and 'data' keys (stablecoins use 'data')
  const m = (data.metrics || (data as unknown as { data: Record<string, unknown> }).data || {}) as Record<string, unknown>;

  return (
    <Card className={colors.border}>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <h3 className={`font-semibold ${colors.text}`}>Live Network Data</h3>
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
  const str = (v: unknown) => (typeof v === 'string' ? v : null);

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

    case 'solana':
      return (
        <>
          <MetricRow label="Total Validators" value={num(m.totalValidators)} />
          <MetricRow label="Active Validators" value={num(m.activeValidators)} />
          <MetricRow label="Nakamoto Coefficient" value={num(m.nakamotoCoefficient)} />
          <MetricRow label="Top 5 Concentration" value={num(m.top5Concentration) ? `${m.top5Concentration}%` : null} />
          <MetricRow label="Total Nodes" value={num(m.totalNodes)} />
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

    case 'xrp':
      return (
        <>
          <MetricRow label="Validation Quorum" value={num(m.validationQuorum)} />
          <MetricRow label="Validated Ledger" value={num(m.validatedLedgerSeq)} />
          <MetricRow label="Connected Peers" value={num(m.connectedPeers)} />
          <MetricRow label="Server State" value={str(m.serverState)} />
        </>
      );

    case 'bnb':
      return (
        <>
          <MetricRow label="Block Number" value={num(m.blockNumber)} />
          <MetricRow label="Peer Count" value={num(m.peerCount)} />
          <MetricRow label="Validators" value={num(m.validatorCount)} />
          <MetricRow label="Gas Price" value={num(m.gasPrice) ? `${m.gasPrice} Gwei` : null} />
        </>
      );

    case 'zcash':
      return (
        <>
          <MetricRow label="Block Height" value={num(m.blocks)} />
          <MetricRow label="Network Nodes" value={num(m.nodes)} />
          <MetricRow label="Difficulty" value={num(m.difficulty)} />
          <MetricRow label="Mempool TXs" value={num(m.mempoolTxs)} />
        </>
      );

    case 'bittensor':
      return (
        <>
          <MetricRow label="Block Number" value={num(m.blockNumber)} />
          <MetricRow label="Accounts" value={num(m.accounts)} />
          <MetricRow label="Subnets" value={num(m.subnets)} />
          <MetricRow label="Total Staked" value={num(m.totalStaked) ? `${Math.round(m.totalStaked as number)} TAO` : null} />
          <MetricRow label="Validators" value={num(m.totalValidators)} />
        </>
      );

    case 'cardano':
      return (
        <>
          <MetricRow label="Epoch" value={num(m.epoch)} />
          <MetricRow label="Blocks (epoch)" value={num(m.blockCount)} />
          <MetricRow label="TXs (epoch)" value={num(m.txCount)} />
          <MetricRow label="Total Pools" value={num(m.totalPools)} />
        </>
      );

    case 'avalanche':
      return (
        <>
          <MetricRow label="Total Validators" value={num(m.totalValidators)} />
          <MetricRow label="Active Validators" value={num(m.activeValidators)} />
          <MetricRow label="P-Chain Height" value={num(m.pChainHeight)} />
          <MetricRow label="Network" value={str(m.networkName)} />
        </>
      );

    case 'tron':
      return (
        <>
          <MetricRow label="Total Witnesses" value={num(m.totalWitnesses)} />
          <MetricRow label="Active SRs" value={num(m.activeWitnesses)} />
          <MetricRow label="Latest Block" value={num(m.latestBlock)} />
          <MetricRow label="Connected Peers" value={num(m.connectedPeers)} />
        </>
      );

    case 'tether':
    case 'usdc':
      return (
        <>
          <MetricRow label="Total Supply" value={num(m.totalSupplyUsd) ? `$${(m.totalSupplyUsd as number / 1e9).toFixed(1)}B` : null} />
          {Array.isArray(m.topChains) && m.topChains.slice(0, 3).map((chain: { chain: string; percentage: number }) => (
            <MetricRow key={chain.chain} label={chain.chain} value={`${chain.percentage.toFixed(1)}%`} />
          ))}
        </>
      );

    case 'etc':
      return (
        <>
          <MetricRow label="Block Height" value={num(m.blocks)} />
          <MetricRow label="Total Transactions" value={num(m.transactions)} />
          <MetricRow label="Avg Block Time" value={num(m.avgBlockTime) ? `${(m.avgBlockTime as number / 1000).toFixed(1)}s` : null} />
          <MetricRow label="Price" value={num(m.price) ? `$${(m.price as number).toFixed(2)}` : null} />
          <MetricRow label="Market Cap" value={num(m.marketCap) ? `$${(m.marketCap as number / 1e9).toFixed(2)}B` : null} />
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
    success: 'Live',
    partial: 'Partial',
    failed: 'Error',
  };

  return (
    <span className={`px-2 py-1 rounded text-xs font-medium ${colors[status]}`}>
      {labels[status]}
    </span>
  );
}
