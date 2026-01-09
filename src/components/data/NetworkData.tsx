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

export function NetworkData({ projectId }: NetworkDataProps) {
  const kvKey = getKvKey(projectId);
  const colors = getProjectColors(projectId);

  // Static projects (kvKey = null) don't have live data
  const { data, loading, error } = useMetrics(kvKey || '');

  if (!kvKey) return null;  // Static project - no network data section
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
        </>
      );

    case 'zcash':
      return (
        <>
          <MetricRow label="Block Height" value={num(m.blocks)} />
          <MetricRow label="Network Nodes" value={num(m.nodes)} />
          <MetricRow label="Difficulty" value={num(m.difficulty)} />
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

    case 'cosmos':
      return (
        <>
          <MetricRow label="Block Height" value={num(m.blockHeight)} />
          <MetricRow label="Active Validators" value={num(m.activeValidators)} />
          <MetricRow label="Total Bonded" value={num(m.totalBonded) ? `${(m.totalBonded as number).toLocaleString()} ATOM` : null} />
          <MetricRow label="Top 5 Concentration" value={num(m.top5Concentration) ? `${m.top5Concentration}%` : null} />
          <MetricRow label="Chain ID" value={str(m.chainId)} />
        </>
      );

    case 'stellar':
      return (
        <>
          <MetricRow label="Ledger Sequence" value={num(m.ledgerSequence)} />
          <MetricRow label="Protocol Version" value={num(m.protocolVersion)} />
          <MetricRow label="Circulating Supply" value={num(m.circulatingSupply) ? `${(m.circulatingSupply as number / 1e9).toFixed(1)}B XLM` : null} />
          <MetricRow label="SDF Mandate" value={num(m.sdfMandatePercent) ? `${m.sdfMandatePercent}%` : null} />
        </>
      );

    case 'chainlink':
      return (
        <>
          <MetricRow label="ETH/USD Oracles" value={num(m.ethUsdOracles)} />
          <MetricRow label="Min Answers Required" value={num(m.ethUsdMinAnswers)} />
          <MetricRow label="Total Data Feeds" value={num(m.totalDataFeeds) ? `~${(m.totalDataFeeds as number).toLocaleString()}` : null} />
          <MetricRow label="Latest Round" value={num(m.ethUsdLatestRound)} />
        </>
      );

    case 'hedera':
      return (
        <>
          <MetricRow label="Council Nodes" value={num(m.totalNodes)} />
          <MetricRow label="Total Staked" value={num(m.totalStake) ? `${(m.totalStake as number).toLocaleString()} HBAR` : null} />
          <MetricRow label="Top 5 Concentration" value={num(m.top5Concentration) ? `${m.top5Concentration}%` : null} />
          <MetricRow label="Released Supply" value={num(m.releasedSupply) ? `${(m.releasedSupply as number / 1e9).toFixed(1)}B HBAR` : null} />
        </>
      );

    case 'filecoin':
      return (
        <>
          <MetricRow label="Active Miners" value={num(m.activeMiners)} />
          <MetricRow label="Total Power" value={num(m.totalPowerPiB) ? `${(m.totalPowerPiB as number).toLocaleString()} PiB` : null} />
          <MetricRow label="Nakamoto Coefficient" value={num(m.nakamotoCoefficient)} />
          <MetricRow label="Top 5 Concentration" value={num(m.top5Concentration) ? `${m.top5Concentration}%` : null} />
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

    case 'hyperliquid':
      return (
        <>
          <MetricRow label="Active Validators" value={num(m.activeValidators)} />
          <MetricRow label="Nakamoto Coefficient" value={num(m.nakamotoCoefficient)} />
          <MetricRow label="Foundation Stake" value={num(m.foundationPercent) ? `${m.foundationPercent}%` : null} />
          <MetricRow label="Top 5 Concentration" value={num(m.top5Concentration) ? `${m.top5Concentration}%` : null} />
          <MetricRow label="Total Staked" value={num(m.totalStake) ? `${(m.totalStake as number).toLocaleString()} HYPE` : null} />
        </>
      );

    case 'near':
      return (
        <>
          <MetricRow label="Block Height" value={num(m.blockHeight)} />
          <MetricRow label="Active Validators" value={num(m.activeValidators)} />
          <MetricRow label="Nakamoto Coefficient" value={num(m.nakamotoCoefficient)} />
          <MetricRow label="Top 5 Concentration" value={num(m.top5Concentration) ? `${m.top5Concentration}%` : null} />
          <MetricRow label="Total Staked" value={num(m.totalStaked) ? `${(m.totalStaked as number).toLocaleString()} NEAR` : null} />
        </>
      );

    case 'sui':
      return (
        <>
          <MetricRow label="Epoch" value={num(m.epoch)} />
          <MetricRow label="Total Validators" value={num(m.totalValidators)} />
          <MetricRow label="Nakamoto Coefficient" value={num(m.nakamotoCoefficient)} />
          <MetricRow label="Top 5 Concentration" value={num(m.top5Concentration) ? `${m.top5Concentration}%` : null} />
          <MetricRow label="Total Staked" value={num(m.totalStake) ? `${(m.totalStake as number / 1e9).toFixed(2)}B SUI` : null} />
        </>
      );

    case 'aptos':
      return (
        <>
          <MetricRow label="Block Height" value={num(m.blockHeight)} />
          <MetricRow label="Epoch" value={num(m.epoch)} />
          <MetricRow label="Active Validators" value={num(m.activeValidators)} />
          <MetricRow label="Nakamoto Coefficient" value={num(m.nakamotoCoefficient)} />
          <MetricRow label="Top 5 Concentration" value={num(m.top5Concentration) ? `${m.top5Concentration}%` : null} />
        </>
      );

    case 'icp':
      return (
        <>
          <MetricRow label="Total Nodes" value={num(m.totalNodes)} />
          <MetricRow label="Up Nodes" value={num(m.upNodes)} />
          <MetricRow label="Node Providers" value={num(m.nodeProviders)} />
          <MetricRow label="Subnets" value={num(m.subnets)} />
          <MetricRow label="Avg Nakamoto Coef." value={num(m.avgNakamotoCoefficient) ? (m.avgNakamotoCoefficient as number).toFixed(1) : null} />
        </>
      );

    case 'aave':
      return (
        <>
          <MetricRow label="Total Value Locked" value={num(m.tvl) ? `$${(m.tvl as number / 1e9).toFixed(2)}B` : null} />
          <MetricRow label="TVL Change (24h)" value={num(m.tvlChange24h) ? `${(m.tvlChange24h as number).toFixed(1)}%` : null} />
          <MetricRow label="Treasury" value={num(m.treasury) ? `$${(m.treasury as number / 1e6).toFixed(1)}M` : null} />
          <MetricRow label="Revenue (24h)" value={num(m.revenue24h) ? `$${(m.revenue24h as number / 1e3).toFixed(0)}K` : null} />
          <MetricRow label="Chains Deployed" value={num(m.totalChains)} />
        </>
      );

    case 'uniswap':
      return (
        <>
          <MetricRow label="Total Value Locked" value={num(m.tvl) ? `$${(m.tvl as number / 1e9).toFixed(2)}B` : null} />
          <MetricRow label="Volume (24h)" value={num(m.volume24h) ? `$${(m.volume24h as number / 1e9).toFixed(2)}B` : null} />
          <MetricRow label="Fees (24h)" value={num(m.fees24h) ? `$${(m.fees24h as number / 1e6).toFixed(2)}M` : null} />
          <MetricRow label="Treasury" value={num(m.treasury) ? `$${(m.treasury as number / 1e6).toFixed(1)}M` : null} />
          <MetricRow label="Chains Deployed" value={num(m.totalChains)} />
        </>
      );

    case 'injective':
      return (
        <>
          <MetricRow label="Active Validators" value={num(m.activeValidators)} />
          <MetricRow label="Nakamoto Coefficient" value={num(m.nakamotoCoefficient)} />
          <MetricRow label="Top 5 Concentration" value={num(m.top5Concentration) ? `${m.top5Concentration}%` : null} />
          <MetricRow label="Total Staked" value={num(m.totalStaked) ? `${(m.totalStaked as number).toLocaleString()} INJ` : null} />
        </>
      );

    case 'ton':
      return (
        <>
          <MetricRow label="Block Number" value={num(m.blockNumber)} />
          <MetricRow label="Total Validators" value={num(m.totalValidators)} />
          <MetricRow label="Total Staked" value={num(m.totalStake) ? `${(m.totalStake as number).toLocaleString()} TON` : null} />
          <MetricRow label="Top 5 Concentration" value={num(m.top5Concentration) ? `${m.top5Concentration}%` : null} />
          <MetricRow label="Min Stake" value={num(m.minStake) ? `${(m.minStake as number).toLocaleString()} TON` : null} />
        </>
      );

    case 'polygon':
      return (
        <>
          <MetricRow label="Active Validators" value={num(m.activeValidators)} />
          <MetricRow label="Nakamoto Coefficient" value={num(m.nakamotoCoefficient)} />
          <MetricRow label="Top 5 Concentration" value={num(m.top5Concentration) ? `${m.top5Concentration}%` : null} />
          <MetricRow label="Total Staked" value={num(m.totalStaked) ? `${(m.totalStaked as number / 1e9).toFixed(2)}B POL` : null} />
        </>
      );

    case 'dai':
      return (
        <>
          <MetricRow label="Total Supply" value={num(m.totalSupplyUsd) ? `$${(m.totalSupplyUsd as number / 1e9).toFixed(1)}B` : null} />
          {Array.isArray(m.topChains) && m.topChains.slice(0, 3).map((chain: { chain: string; percentage: number }) => (
            <MetricRow key={chain.chain} label={chain.chain} value={`${chain.percentage.toFixed(1)}%`} />
          ))}
        </>
      );

    case 'arbitrum':
      return (
        <>
          <MetricRow label="Block Number" value={num(m.blockNumber)} />
          <MetricRow label="Chain ID" value={num(m.chainId)} />
          <MetricRow label="Sequencer" value={str(m.sequencer)} />
        </>
      );

    case 'lido':
      return (
        <>
          <MetricRow label="Total Value Locked" value={num(m.tvl) ? `$${(m.tvl as number / 1e9).toFixed(2)}B` : null} />
          <MetricRow label="APR (7d avg)" value={num(m.apr7d) ? `${(m.apr7d as number).toFixed(2)}%` : null} />
          <MetricRow label="Fees (24h)" value={num(m.fees24h) ? `$${(m.fees24h as number / 1e6).toFixed(2)}M` : null} />
          <MetricRow label="Revenue (24h)" value={num(m.revenue24h) ? `$${(m.revenue24h as number / 1e3).toFixed(0)}K` : null} />
          <MetricRow label="Treasury" value={num(m.treasury) ? `$${(m.treasury as number / 1e6).toFixed(1)}M` : null} />
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
