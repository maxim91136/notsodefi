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

export interface AdaMetrics {
  epoch: number | null;
  blockCount: number | null;
  txCount: number | null;
  totalSupply: number | null;
  circulatingSupply: number | null;
  liveStake: number | null;
  activeStake: number | null;
  totalPools: number | null;
}

export interface AvaxMetrics {
  totalValidators: number | null;
  activeValidators: number | null;
  totalStaked: number | null;
  pChainHeight: number | null;
  networkName: string | null;
}

export interface TrxMetrics {
  totalWitnesses: number | null;
  activeWitnesses: number | null;
  totalVotes: number | null;
  latestBlock: number | null;
  connectedPeers: number | null;
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

export interface DotMetrics {
  blockNumber: number | null;
  era: number | null;
  activeValidators: number | null;
  waitingValidators: number | null;
  nominationPools: number | null;
  totalAccounts: number | null;
  activeNominators: number | null;
  totalStaked: number | null;
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

export function getAdaData(): NetworkData<AdaMetrics> {
  return loadJsonFile<NetworkData<AdaMetrics>>('ada.json');
}

export function getAvaxData(): NetworkData<AvaxMetrics> {
  return loadJsonFile<NetworkData<AvaxMetrics>>('avax.json');
}

export function getTrxData(): NetworkData<TrxMetrics> {
  return loadJsonFile<NetworkData<TrxMetrics>>('trx.json');
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

export function getDotData(): NetworkData<DotMetrics> {
  return loadJsonFile<NetworkData<DotMetrics>>('polkadot.json');
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
    case 'cardano':
      return getAdaData();
    case 'avalanche':
      return getAvaxData();
    case 'tron':
      return getTrxData();
    case 'litecoin':
      return getLtcData();
    case 'monero':
      return getXmrData();
    case 'dogecoin':
      return getDogeData();
    case 'bitcoincash':
      return getBchData();
    case 'polkadot':
      return getDotData();
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
  const ada = getAdaData();
  const avax = getAvaxData();
  const trx = getTrxData();
  const ltc = getLtcData();
  const xmr = getXmrData();
  const doge = getDogeData();
  const bch = getBchData();
  const dot = getDotData();

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
    {
      chain: 'ADA',
      status: ada.fetchStatus,
      lastUpdated: ada.lastUpdated,
      source: ada.source || 'Blockfrost',
    },
    {
      chain: 'AVAX',
      status: avax.fetchStatus,
      lastUpdated: avax.lastUpdated,
      source: avax.source || 'api.avax.network',
    },
    {
      chain: 'TRX',
      status: trx.fetchStatus,
      lastUpdated: trx.lastUpdated,
      source: trx.source || 'api.trongrid.io',
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
      chain: 'DOT',
      status: dot.fetchStatus,
      lastUpdated: dot.lastUpdated,
      source: dot.source || 'Subscan',
    },
  ];
}
