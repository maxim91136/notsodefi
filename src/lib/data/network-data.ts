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

export interface SolMetrics {
  totalValidators: number | null;
  activeValidators: number | null;
  nakamotoCoefficient: number | null;
  top5Concentration: number | null;
  largestValidatorPercentage: number | null;
  totalNodes: number | null;
  clientVersions: number | null;
}

export interface EthMetrics {
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

export interface EtcMetrics {
  blocks: number | null;
  transactions: number | null;
  addresses: number | null;
  avgBlockTime: number | null;
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

export interface AtomMetrics {
  blockHeight: number | null;
  chainId: string | null;
  activeValidators: number | null;
  totalBonded: number | null;
  totalUnbonded: number | null;
  top5Concentration: number | null;
}

export interface HypeMetrics {
  totalValidators: number | null;
  activeValidators: number | null;
  totalStake: number | null;
  foundationStake: number | null;
  foundationPercent: number | null;
  top5Concentration: number | null;
  nakamotoCoefficient: number | null;
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

export interface IcpMetrics {
  totalNodes: number | null;
  upNodes: number | null;
  nodeProviders: number | null;
  subnets: number | null;
  avgNakamotoCoefficient: number | null;
}

export interface LinkMetrics {
  ethUsdOracles: number | null;
  ethUsdMinAnswers: number | null;
  ethUsdDecimals: number | null;
  ethUsdLatestRound: number | null;
  totalDataFeeds: number | null;
}

export interface AaveMetrics {
  tvl: number | null;
  tvlChange24h: number | null;
  chainTvls: Record<string, number>;
  totalChains: number | null;
  treasury: number | null;
  treasuryOwnTokens: number | null;
  revenue24h: number | null;
  revenue30d: number | null;
}

export interface TonMetrics {
  blockNumber: number | null;
  totalValidators: number | null;
  totalStake: number | null;
  minStake: number | null;
  electAt: number | null;
  top5Concentration: number | null;
  feesCollected: number | null;
}

export interface XlmMetrics {
  ledgerSequence: number | null;
  protocolVersion: number | null;
  txSuccessCount: number | null;
  txFailedCount: number | null;
  operationCount: number | null;
  baseFee: number | null;
  totalSupply: number | null;
  circulatingSupply: number | null;
  sdfMandate: number | null;
  sdfMandatePercent: number | null;
}

export interface SuiMetrics {
  epoch: number | null;
  protocolVersion: number | null;
  totalValidators: number | null;
  maxValidators: number | null;
  totalStake: number | null;
  minValidatorStake: number | null;
  top5Concentration: number | null;
  nakamotoCoefficient: number | null;
  referenceGasPrice: number | null;
}

export interface UniMetrics {
  tvl: number | null;
  tvlChange24h: number | null;
  chainTvls: Record<string, number>;
  totalChains: number | null;
  treasury: number | null;
  treasuryOwnTokens: number | null;
  volume24h: number | null;
  fees24h: number | null;
  revenue24h: number | null;
}

export interface HbarMetrics {
  totalNodes: number | null;
  totalStake: number | null;
  top5Concentration: number | null;
  releasedSupply: number | null;
  totalSupply: number | null;
}

export interface UsdtMetrics {
  totalSupply: number | null;
  chainBreakdown: Record<string, number>;
  dominantChain: string | null;
  dominantChainPercent: number | null;
}

export interface UsdcMetrics {
  totalSupply: number | null;
  chainBreakdown: Record<string, number>;
  dominantChain: string | null;
  dominantChainPercent: number | null;
}

export interface DaiMetrics {
  totalSupply: number | null;
  savingsRate: number | null;
  savingsDeposits: number | null;
  collateralRatio: number | null;
}

export interface NearMetrics {
  activeValidators: number | null;
  totalStaked: number | null;
  nakamotoCoefficient: number | null;
  top5Concentration: number | null;
  top10Concentration: number | null;
  seatPrice: number | null;
  blockHeight: number | null;
}

export interface AptMetrics {
  blockHeight: number | null;
  epoch: number | null;
  activeValidators: number | null;
  totalStaked: number | null;
  nakamotoCoefficient: number | null;
  top5Concentration: number | null;
  top10Concentration: number | null;
}

export interface PolMetrics {
  activeValidators: number | null;
  totalStaked: number | null;
  nakamotoCoefficient: number | null;
  top5Concentration: number | null;
  top10Concentration: number | null;
}

export interface InjMetrics {
  activeValidators: number | null;
  totalStaked: number | null;
  nakamotoCoefficient: number | null;
  top5Concentration: number | null;
  top10Concentration: number | null;
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

export function getSolanaData(): NetworkData<SolMetrics> {
  return loadJsonFile<NetworkData<SolMetrics>>('solana.json');
}

export function getEthereumData(): NetworkData<EthMetrics> {
  return loadJsonFile<NetworkData<EthMetrics>>('ethereum.json');
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

export function getEtcData(): NetworkData<EtcMetrics> {
  return loadJsonFile<NetworkData<EtcMetrics>>('etc.json');
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

export function getAtomData(): NetworkData<AtomMetrics> {
  return loadJsonFile<NetworkData<AtomMetrics>>('cosmos.json');
}

export function getHypeData(): NetworkData<HypeMetrics> {
  return loadJsonFile<NetworkData<HypeMetrics>>('hyperliquid.json');
}

export function getKasData(): NetworkData<KasMetrics> {
  return loadJsonFile<NetworkData<KasMetrics>>('kaspa.json');
}

export function getIcpData(): NetworkData<IcpMetrics> {
  return loadJsonFile<NetworkData<IcpMetrics>>('icp.json');
}

export function getLinkData(): NetworkData<LinkMetrics> {
  return loadJsonFile<NetworkData<LinkMetrics>>('chainlink.json');
}

export function getAaveData(): NetworkData<AaveMetrics> {
  return loadJsonFile<NetworkData<AaveMetrics>>('aave.json');
}

export function getTonData(): NetworkData<TonMetrics> {
  return loadJsonFile<NetworkData<TonMetrics>>('ton.json');
}

export function getXlmData(): NetworkData<XlmMetrics> {
  return loadJsonFile<NetworkData<XlmMetrics>>('stellar.json');
}

export function getSuiData(): NetworkData<SuiMetrics> {
  return loadJsonFile<NetworkData<SuiMetrics>>('sui.json');
}

export function getUniData(): NetworkData<UniMetrics> {
  return loadJsonFile<NetworkData<UniMetrics>>('uniswap.json');
}

export function getHbarData(): NetworkData<HbarMetrics> {
  return loadJsonFile<NetworkData<HbarMetrics>>('hedera.json');
}

export function getUsdtData(): NetworkData<UsdtMetrics> {
  return loadJsonFile<NetworkData<UsdtMetrics>>('tether.json');
}

export function getUsdcData(): NetworkData<UsdcMetrics> {
  return loadJsonFile<NetworkData<UsdcMetrics>>('usdc.json');
}

export function getDaiData(): NetworkData<DaiMetrics> {
  return loadJsonFile<NetworkData<DaiMetrics>>('dai.json');
}

export function getNearData(): NetworkData<NearMetrics> {
  return loadJsonFile<NetworkData<NearMetrics>>('near.json');
}

export function getAptData(): NetworkData<AptMetrics> {
  return loadJsonFile<NetworkData<AptMetrics>>('aptos.json');
}

export function getPolData(): NetworkData<PolMetrics> {
  return loadJsonFile<NetworkData<PolMetrics>>('polygon.json');
}

export function getInjData(): NetworkData<InjMetrics> {
  return loadJsonFile<NetworkData<InjMetrics>>('injective.json');
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
    case 'cosmos':
      return getAtomData();
    case 'hyperliquid':
      return getHypeData();
    case 'kaspa':
      return getKasData();
    case 'icp':
      return getIcpData();
    case 'chainlink':
      return getLinkData();
    case 'aave':
      return getAaveData();
    case 'ton':
      return getTonData();
    case 'stellar':
      return getXlmData();
    case 'sui':
      return getSuiData();
    case 'uniswap':
      return getUniData();
    case 'hedera':
      return getHbarData();
    case 'tether':
      return getUsdtData();
    case 'usdc':
      return getUsdcData();
    case 'dai':
      return getDaiData();
    case 'near':
      return getNearData();
    case 'aptos':
      return getAptData();
    case 'polygon':
      return getPolData();
    case 'injective':
      return getInjData();
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
  const atom = getAtomData();
  const hype = getHypeData();
  const kas = getKasData();
  const icp = getIcpData();
  const link = getLinkData();
  const aave = getAaveData();
  const tonData = getTonData();
  const xlm = getXlmData();
  const suiData = getSuiData();
  const uniData = getUniData();
  const hbarData = getHbarData();
  const usdtData = getUsdtData();
  const usdcData = getUsdcData();
  const nearData = getNearData();
  const aptData = getAptData();
  const polData = getPolData();
  const injData = getInjData();
  const etcData = getEtcData();

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
    {
      chain: 'ATOM',
      status: atom.fetchStatus,
      lastUpdated: atom.lastUpdated,
      source: atom.source || 'Cosmos REST API',
    },
    {
      chain: 'HYPE',
      status: hype.fetchStatus,
      lastUpdated: hype.lastUpdated,
      source: hype.source || 'Hyperliquid API',
    },
    {
      chain: 'KAS',
      status: kas.fetchStatus,
      lastUpdated: kas.lastUpdated,
      source: kas.source || 'Kaspa REST API',
    },
    {
      chain: 'ICP',
      status: icp.fetchStatus,
      lastUpdated: icp.lastUpdated,
      source: icp.source || 'IC Dashboard API',
    },
    {
      chain: 'LINK',
      status: link.fetchStatus,
      lastUpdated: link.lastUpdated,
      source: link.source || 'data.chain.link + Etherscan',
    },
    {
      chain: 'AAVE',
      status: aave.fetchStatus,
      lastUpdated: aave.lastUpdated,
      source: aave.source || 'DefiLlama API',
    },
    {
      chain: 'TON',
      status: tonData.fetchStatus,
      lastUpdated: tonData.lastUpdated,
      source: tonData.source || 'TonAPI (tonapi.io)',
    },
    {
      chain: 'XLM',
      status: xlm.fetchStatus,
      lastUpdated: xlm.lastUpdated,
      source: xlm.source || 'Stellar Horizon + Dashboard API',
    },
    {
      chain: 'SUI',
      status: suiData.fetchStatus,
      lastUpdated: suiData.lastUpdated,
      source: suiData.source || 'SUI JSON-RPC',
    },
    {
      chain: 'UNI',
      status: uniData.fetchStatus,
      lastUpdated: uniData.lastUpdated,
      source: uniData.source || 'DefiLlama API',
    },
    {
      chain: 'HBAR',
      status: hbarData.fetchStatus,
      lastUpdated: hbarData.lastUpdated,
      source: hbarData.source || 'Mirror Node',
    },
    {
      chain: 'USDT',
      status: usdtData.fetchStatus,
      lastUpdated: usdtData.lastUpdated,
      source: usdtData.source || 'DefiLlama Stablecoins',
    },
    {
      chain: 'USDC',
      status: usdcData.fetchStatus,
      lastUpdated: usdcData.lastUpdated,
      source: usdcData.source || 'DefiLlama Stablecoins',
    },
    {
      chain: 'NEAR',
      status: nearData.fetchStatus,
      lastUpdated: nearData.lastUpdated,
      source: nearData.source || 'NEAR RPC',
    },
    {
      chain: 'APT',
      status: aptData.fetchStatus,
      lastUpdated: aptData.lastUpdated,
      source: aptData.source || 'Aptos REST API',
    },
    {
      chain: 'POL',
      status: polData.fetchStatus,
      lastUpdated: polData.lastUpdated,
      source: polData.source || 'Polygon Staking API',
    },
    {
      chain: 'INJ',
      status: injData.fetchStatus,
      lastUpdated: injData.lastUpdated,
      source: injData.source || 'Injective LCD API',
    },
    {
      chain: 'ETC',
      status: etcData.fetchStatus,
      lastUpdated: etcData.lastUpdated,
      source: etcData.source || 'Blockchair',
    },
  ];
}
