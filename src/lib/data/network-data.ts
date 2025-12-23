/**
 * Network Data Loader
 *
 * Loads cached network data from JSON files.
 * Data is updated daily by GitHub Actions workflows.
 */

import * as fs from 'fs';
import * as path from 'path';

export interface BitcoinMetrics {
  totalNodes: number | null;
  cloudPercentage: number | null;
  top5PoolConcentration: number | null;
  largestPoolPercentage: number | null;
  poolDiversity: number | null;
}

export interface SolanaMetrics {
  totalValidators: number | null;
  activeValidators: number | null;
  nakamotoCoefficient: number | null;
  top5Concentration: number | null;
  largestValidatorPercentage: number | null;
  totalNodes: number | null;
  clientVersions: number | null;
}

export interface EthereumMetrics {
  connectedPeers: number | null;
  headSlot: number | null;
  finalizedEpoch: number | null;
  syncDistance: number | null;
}

export interface XrpMetrics {
  connectedPeers: number | null;
  validationQuorum: number | null;
  validatedLedgerSeq: number | null;
  serverState: string | null;
  buildVersion: string | null;
}

export interface BnbMetrics {
  blockNumber: number | null;
  peerCount: number | null;
  validatorCount: number | null;
  gasPrice: number | null;
  chainId: number | null;
}

export interface ZecMetrics {
  blocks: number | null;
  difficulty: number | null;
  hashrate24h: number | null;
  mempoolTxs: number | null;
  nodes: number | null;
}

export interface TaoMetrics {
  blockNumber: number | null;
  accounts: number | null;
  subnets: number | null;
  totalStaked: number | null;
  issued: number | null;
  totalValidators: number | null;
  totalActiveKeys: number | null;
}

export interface NetworkData<T> {
  lastUpdated: string;
  source?: string;
  metrics: T;
  fetchStatus: 'success' | 'partial' | 'failed';
}

function loadJsonFile<T>(filename: string): T {
  const filePath = path.join(process.cwd(), 'data', filename);
  const content = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(content) as T;
}

export function getBitcoinData(): NetworkData<BitcoinMetrics> {
  return loadJsonFile<NetworkData<BitcoinMetrics>>('bitcoin.json');
}

export function getSolanaData(): NetworkData<SolanaMetrics> {
  return loadJsonFile<NetworkData<SolanaMetrics>>('solana.json');
}

export function getEthereumData(): NetworkData<EthereumMetrics> {
  return loadJsonFile<NetworkData<EthereumMetrics>>('ethereum.json');
}

export function getXrpData(): NetworkData<XrpMetrics> {
  return loadJsonFile<NetworkData<XrpMetrics>>('xrp.json');
}

export function getBnbData(): NetworkData<BnbMetrics> {
  return loadJsonFile<NetworkData<BnbMetrics>>('bnb.json');
}

export function getZecData(): NetworkData<ZecMetrics> {
  return loadJsonFile<NetworkData<ZecMetrics>>('zec.json');
}

export function getTaoData(): NetworkData<TaoMetrics> {
  return loadJsonFile<NetworkData<TaoMetrics>>('tao.json');
}

export function getNetworkDataByProject(projectId: string): NetworkData<unknown> | null {
  switch (projectId) {
    case 'bitcoin':
      return getBitcoinData();
    case 'solana':
      return getSolanaData();
    case 'ethereum':
      return getEthereumData();
    case 'xrp':
      return getXrpData();
    case 'bnb':
      return getBnbData();
    case 'zcash':
      return getZecData();
    case 'bittensor':
      return getTaoData();
    default:
      return null;
  }
}

export interface ApiStatus {
  chain: string;
  status: 'success' | 'partial' | 'failed';
  lastUpdated: string;
  source: string;
}

export function getAllApiStatuses(): ApiStatus[] {
  const btc = getBitcoinData();
  const sol = getSolanaData();
  const eth = getEthereumData();
  const xrp = getXrpData();
  const bnb = getBnbData();
  const zec = getZecData();
  const tao = getTaoData();

  return [
    {
      chain: 'BTC',
      status: btc.fetchStatus,
      lastUpdated: btc.lastUpdated,
      source: 'bitnodes.io + blockchain.info',
    },
    {
      chain: 'SOL',
      status: sol.fetchStatus,
      lastUpdated: sol.lastUpdated,
      source: 'Solana RPC (mainnet-beta)',
    },
    {
      chain: 'ETH',
      status: eth.fetchStatus,
      lastUpdated: eth.lastUpdated,
      source: eth.source || 'Beacon API',
    },
    {
      chain: 'XRP',
      status: xrp.fetchStatus,
      lastUpdated: xrp.lastUpdated,
      source: xrp.source || 'XRPL (s1.ripple.com)',
    },
    {
      chain: 'BNB',
      status: bnb.fetchStatus,
      lastUpdated: bnb.lastUpdated,
      source: bnb.source || 'BNB Chain RPC',
    },
    {
      chain: 'ZEC',
      status: zec.fetchStatus,
      lastUpdated: zec.lastUpdated,
      source: zec.source || 'Blockchair',
    },
    {
      chain: 'TAO',
      status: tao.fetchStatus,
      lastUpdated: tao.lastUpdated,
      source: tao.source || 'Taostats',
    },
  ];
}
