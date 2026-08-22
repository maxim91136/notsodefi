/**
 * Network Data Loader
 *
 * Loads cached network data from JSON files.
 * Data is updated daily by GitHub Actions workflows.
 */

import * as fs from 'fs';
import * as path from 'path';

export interface BtcMetrics {
  totalNodes: number | null;
  cloudPercentage: number | null;
  top5PoolConcentration: number | null;
  largestPoolPercentage: number | null;
  poolDiversity: number | null;
}

export interface EthMetrics {
  connectedPeers: number | null;
  headSlot: number | null;
  finalizedEpoch: number | null;
  syncDistance: number | null;
}

export interface EtcMetrics {
  blocks: number | null;
  transactions: number | null;
  addresses: number | null;
  avgBlockTime: number | null;
}

export interface LtcMetrics {
  blocks: number | null;
  difficulty: number | null;
  hashrate24h: number | null;
  mempoolTxs: number | null;
  nodes: number | null;
}

export interface XmrMetrics {
  blocks: number | null;
  difficulty: number | null;
  hashrate24h: number | null;
  mempoolTxs: number | null;
}

export interface DogeMetrics {
  blocks: number | null;
  difficulty: number | null;
  hashrate24h: number | null;
  mempoolTxs: number | null;
  nodes: number | null;
}

export interface BchMetrics {
  blocks: number | null;
  difficulty: number | null;
  hashrate24h: number | null;
  mempoolTxs: number | null;
  nodes: number | null;
}

export interface KasMetrics {
  networkName: string | null;
  blockCount: number | null;
  difficulty: number | null;
  hashrate: number | null;
  circulatingSupply: number | null;
  maxSupply: number | null;
  blockReward: number | null;
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

export function getBitcoinData(): NetworkData<BtcMetrics> {
  return loadJsonFile<NetworkData<BtcMetrics>>('bitcoin.json');
}

export function getEthereumData(): NetworkData<EthMetrics> {
  return loadJsonFile<NetworkData<EthMetrics>>('ethereum.json');
}

export function getEtcData(): NetworkData<EtcMetrics> {
  return loadJsonFile<NetworkData<EtcMetrics>>('etc.json');
}

export function getLtcData(): NetworkData<LtcMetrics> {
  return loadJsonFile<NetworkData<LtcMetrics>>('litecoin.json');
}

export function getXmrData(): NetworkData<XmrMetrics> {
  return loadJsonFile<NetworkData<XmrMetrics>>('monero.json');
}

export function getDogeData(): NetworkData<DogeMetrics> {
  return loadJsonFile<NetworkData<DogeMetrics>>('dogecoin.json');
}

export function getBchData(): NetworkData<BchMetrics> {
  return loadJsonFile<NetworkData<BchMetrics>>('bitcoincash.json');
}

export function getKasData(): NetworkData<KasMetrics> {
  return loadJsonFile<NetworkData<KasMetrics>>('kaspa.json');
}

export function getNetworkDataByProject(projectId: string): NetworkData<unknown> | null {
  switch (projectId) {
    case 'bitcoin':
      return getBitcoinData();
    case 'ethereum':
      return getEthereumData();
    case 'litecoin':
      return getLtcData();
    case 'monero':
      return getXmrData();
    case 'dogecoin':
      return getDogeData();
    case 'bitcoincash':
      return getBchData();
    case 'kaspa':
      return getKasData();
    case 'etc':
      return getEtcData();
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
  const eth = getEthereumData();
  const ltc = getLtcData();
  const xmr = getXmrData();
  const doge = getDogeData();
  const bch = getBchData();
  const kas = getKasData();
  const etcData = getEtcData();

  return [
    {
      chain: 'BTC',
      status: btc.fetchStatus,
      lastUpdated: btc.lastUpdated,
      source: 'bitnodes.io + blockchain.info',
    },
    {
      chain: 'ETH',
      status: eth.fetchStatus,
      lastUpdated: eth.lastUpdated,
      source: eth.source || 'Beacon API',
    },
    {
      chain: 'LTC',
      status: ltc.fetchStatus,
      lastUpdated: ltc.lastUpdated,
      source: ltc.source || 'Blockchair',
    },
    {
      chain: 'XMR',
      status: xmr.fetchStatus,
      lastUpdated: xmr.lastUpdated,
      source: xmr.source || 'Blockchair',
    },
    {
      chain: 'DOGE',
      status: doge.fetchStatus,
      lastUpdated: doge.lastUpdated,
      source: doge.source || 'Blockchair',
    },
    {
      chain: 'BCH',
      status: bch.fetchStatus,
      lastUpdated: bch.lastUpdated,
      source: bch.source || 'Blockchair',
    },
    {
      chain: 'KAS',
      status: kas.fetchStatus,
      lastUpdated: kas.lastUpdated,
      source: kas.source || 'Kaspa REST API',
    },
    {
      chain: 'ETC',
      status: etcData.fetchStatus,
      lastUpdated: etcData.lastUpdated,
      source: etcData.source || 'Blockchair',
    },
  ];
}
