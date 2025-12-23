/**
 * Live Network Data Component
 *
 * Displays real-time network metrics fetched from APIs.
 * Shows last updated timestamp and data source.
 */

import { Card, CardContent, CardHeader } from '@/components/ui';
import {
  getBitcoinData,
  getSolanaData,
  getEthereumData,
  getXrpData,
  getBnbData,
  getZecData,
  getTaoData,
} from '@/lib/data/network-data';

interface MetricRowProps {
  label: string;
  value: string | number | null;
  unit?: string;
}

function MetricRow({ label, value, unit }: MetricRowProps) {
  return (
    <div className="flex justify-between items-center py-2 border-b border-white/5 last:border-0">
      <span className="text-sm text-white/60">{label}</span>
      <span className="font-mono text-white">
        {value !== null ? (
          <>
            {typeof value === 'number' ? value.toLocaleString() : value}
            {unit && <span className="text-white/40 ml-1">{unit}</span>}
          </>
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

export function LiveNetworkData({ projectId }: LiveNetworkDataProps) {
  if (projectId === 'bitcoin') {
    const data = getBitcoinData();
    return (
      <Card className="border-orange-500/30">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-orange-400">Live Network Data</h3>
              <p className="text-xs text-white/40 mt-1">
                Source: bitnodes.io + blockchain.info
              </p>
            </div>
            <StatusBadge status={data.fetchStatus} />
          </div>
        </CardHeader>
        <CardContent>
          <MetricRow label="Total Nodes" value={data.metrics.totalNodes} />
          <MetricRow
            label="Top 5 Pool Concentration"
            value={data.metrics.top5PoolConcentration}
            unit="%"
          />
          <MetricRow
            label="Largest Pool"
            value={data.metrics.largestPoolPercentage}
            unit="%"
          />
          <MetricRow
            label="Pool Diversity"
            value={data.metrics.poolDiversity}
            unit="pools"
          />
          <div className="mt-4 pt-3 border-t border-white/10 text-xs text-white/40">
            Updated {formatTimeAgo(data.lastUpdated)}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (projectId === 'solana') {
    const data = getSolanaData();
    return (
      <Card className="border-purple-500/30">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-purple-400">Live Network Data</h3>
              <p className="text-xs text-white/40 mt-1">Source: Solana RPC</p>
            </div>
            <StatusBadge status={data.fetchStatus} />
          </div>
        </CardHeader>
        <CardContent>
          <MetricRow label="Total Validators" value={data.metrics.totalValidators} />
          <MetricRow label="Active Validators" value={data.metrics.activeValidators} />
          <MetricRow label="Nakamoto Coefficient" value={data.metrics.nakamotoCoefficient} />
          <MetricRow
            label="Top 5 Concentration"
            value={data.metrics.top5Concentration}
            unit="%"
          />
          <MetricRow
            label="Largest Validator"
            value={data.metrics.largestValidatorPercentage}
            unit="%"
          />
          <MetricRow label="Total Nodes" value={data.metrics.totalNodes} />
          <MetricRow label="Client Versions" value={data.metrics.clientVersions} />
          <div className="mt-4 pt-3 border-t border-white/10 text-xs text-white/40">
            Updated {formatTimeAgo(data.lastUpdated)}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (projectId === 'ethereum') {
    const data = getEthereumData();
    return (
      <Card className="border-blue-500/30">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-blue-400">Live Network Data</h3>
              <p className="text-xs text-white/40 mt-1">Source: {data.source || 'Beacon API'}</p>
            </div>
            <StatusBadge status={data.fetchStatus} />
          </div>
        </CardHeader>
        <CardContent>
          <MetricRow label="Connected Peers" value={data.metrics.connectedPeers} />
          <MetricRow label="Head Slot" value={data.metrics.headSlot} />
          <MetricRow label="Finalized Epoch" value={data.metrics.finalizedEpoch} />
          <MetricRow label="Sync Distance" value={data.metrics.syncDistance} />
          <div className="mt-4 pt-3 border-t border-white/10 text-xs text-white/40">
            Updated {formatTimeAgo(data.lastUpdated)}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (projectId === 'xrp') {
    const data = getXrpData();
    return (
      <Card className="border-gray-500/30">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-gray-400">Live Network Data</h3>
              <p className="text-xs text-white/40 mt-1">Source: {data.source || 'XRPL (s1.ripple.com)'}</p>
            </div>
            <StatusBadge status={data.fetchStatus} />
          </div>
        </CardHeader>
        <CardContent>
          <MetricRow label="Validation Quorum" value={data.metrics.validationQuorum} />
          <MetricRow label="Validated Ledger" value={data.metrics.validatedLedgerSeq} />
          <MetricRow label="Connected Peers" value={data.metrics.connectedPeers} />
          <MetricRow label="Server State" value={data.metrics.serverState} />
          <MetricRow label="Build Version" value={data.metrics.buildVersion} />
          <div className="mt-4 pt-3 border-t border-white/10 text-xs text-white/40">
            Updated {formatTimeAgo(data.lastUpdated)}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (projectId === 'bnb') {
    const data = getBnbData();
    return (
      <Card className="border-yellow-500/30">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-yellow-400">Live Network Data</h3>
              <p className="text-xs text-white/40 mt-1">Source: {data.source || 'BNB Chain RPC'}</p>
            </div>
            <StatusBadge status={data.fetchStatus} />
          </div>
        </CardHeader>
        <CardContent>
          <MetricRow label="Block Number" value={data.metrics.blockNumber} />
          <MetricRow label="Peer Count" value={data.metrics.peerCount} />
          <MetricRow label="Validators" value={data.metrics.validatorCount} />
          <MetricRow label="Gas Price" value={data.metrics.gasPrice} unit="Gwei" />
          <MetricRow label="Chain ID" value={data.metrics.chainId} />
          <div className="mt-4 pt-3 border-t border-white/10 text-xs text-white/40">
            Updated {formatTimeAgo(data.lastUpdated)}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (projectId === 'zcash') {
    const data = getZecData();
    return (
      <Card className="border-amber-500/30">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-amber-400">Live Network Data</h3>
              <p className="text-xs text-white/40 mt-1">Source: {data.source || 'Blockchair'}</p>
            </div>
            <StatusBadge status={data.fetchStatus} />
          </div>
        </CardHeader>
        <CardContent>
          <MetricRow label="Block Height" value={data.metrics.blocks} />
          <MetricRow label="Network Nodes" value={data.metrics.nodes} />
          <MetricRow label="Difficulty" value={data.metrics.difficulty} />
          <MetricRow label="Hashrate (24h)" value={data.metrics.hashrate24h ? Math.round(data.metrics.hashrate24h / 1e9) : null} unit="GH/s" />
          <MetricRow label="Mempool TXs" value={data.metrics.mempoolTxs} />
          <div className="mt-4 pt-3 border-t border-white/10 text-xs text-white/40">
            Updated {formatTimeAgo(data.lastUpdated)}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (projectId === 'bittensor') {
    const data = getTaoData();
    return (
      <Card className="border-cyan-500/30">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-cyan-400">Live Network Data</h3>
              <p className="text-xs text-white/40 mt-1">Source: {data.source || 'Taostats'}</p>
            </div>
            <StatusBadge status={data.fetchStatus} />
          </div>
        </CardHeader>
        <CardContent>
          <MetricRow label="Block Number" value={data.metrics.blockNumber} />
          <MetricRow label="Accounts" value={data.metrics.accounts} />
          <MetricRow label="Subnets" value={data.metrics.subnets} />
          <MetricRow label="Total Staked" value={data.metrics.totalStaked ? Math.round(data.metrics.totalStaked) : null} unit="TAO" />
          <MetricRow label="Total Issued" value={data.metrics.issued ? Math.round(data.metrics.issued) : null} unit="TAO" />
          <MetricRow label="Validators (all subnets)" value={data.metrics.totalValidators} />
          <MetricRow label="Active Keys" value={data.metrics.totalActiveKeys} />
          <div className="mt-4 pt-3 border-t border-white/10 text-xs text-white/40">
            Updated {formatTimeAgo(data.lastUpdated)}
          </div>
        </CardContent>
      </Card>
    );
  }

  return null;
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
