'use client';

/**
 * Live Network Data Component
 *
 * Displays real-time network metrics fetched from KV API.
 * Shows last updated timestamp and data source.
 */

import { Card, CardContent, CardHeader } from '@/components/ui';
import { useMetrics } from '@/hooks/useMetrics';

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

interface LiveNetworkDataProps {
  projectId: string;
}

// Map project IDs to KV keys
const projectToKvKey: Record<string, string> = {
  bitcoin: 'bitcoin',
  solana: 'solana',
  ethereum: 'ethereum',
  xrp: 'xrp',
  bnb: 'bnb',
  zcash: 'zcash',
  bittensor: 'tao',
  cardano: 'ada',
  avalanche: 'avax',
  tron: 'trx',
  litecoin: 'litecoin',
  monero: 'monero',
  dogecoin: 'dogecoin',
  'bitcoin-cash': 'bitcoincash',
  polkadot: 'polkadot',
  cosmos: 'cosmos',
  hyperliquid: 'hyperliquid',
  kaspa: 'kaspa',
  icp: 'icp',
  chainlink: 'chainlink',
  aave: 'aave',
  ton: 'ton',
  stellar: 'stellar',
  sui: 'sui',
  uniswap: 'uniswap',
  hedera: 'hedera',
  tether: 'tether',
  usdc: 'usdc',
  near: 'near',
  aptos: 'aptos',
  polygon: 'polygon',
  injective: 'injective',
};

// Project colors for styling
const projectColors: Record<string, { border: string; text: string }> = {
  bitcoin: { border: 'border-orange-500/30', text: 'text-orange-400' },
  solana: { border: 'border-purple-500/30', text: 'text-purple-400' },
  ethereum: { border: 'border-blue-500/30', text: 'text-blue-400' },
  xrp: { border: 'border-gray-500/30', text: 'text-gray-400' },
  bnb: { border: 'border-yellow-500/30', text: 'text-yellow-400' },
  zcash: { border: 'border-amber-500/30', text: 'text-amber-400' },
  bittensor: { border: 'border-cyan-500/30', text: 'text-cyan-400' },
  cardano: { border: 'border-sky-500/30', text: 'text-sky-400' },
  avalanche: { border: 'border-red-500/30', text: 'text-red-400' },
  tron: { border: 'border-rose-500/30', text: 'text-rose-400' },
};

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
  const kvKey = projectToKvKey[projectId] || projectId;
  const { data, loading, error } = useMetrics(kvKey);
  const colors = projectColors[projectId] || { border: 'border-white/10', text: 'text-white' };

  if (loading) return <LoadingState />;
  if (error) return <ErrorState error={error} />;
  if (!data) return null;

  const m = data.metrics as Record<string, unknown>;

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
