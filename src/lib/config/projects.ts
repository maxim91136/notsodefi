/**
 * Centralized Project Configuration
 *
 * Single source of truth for project IDs, KV keys, and display names.
 */

export interface ProjectConfig {
  id: string;        // URL slug (e.g., 'bitcoin', 'bitcoin-cash')
  kvKey: string | null;  // KV storage key (null = static, no API)
  symbol: string;    // Trading symbol (e.g., 'BTC', 'BCH')
}

/**
 * All supported projects with their mappings
 */
export const PROJECTS: ProjectConfig[] = [
  { id: 'bitcoin', kvKey: 'bitcoin', symbol: 'BTC' },
  { id: 'ethereum', kvKey: 'ethereum', symbol: 'ETH' },
  { id: 'solana', kvKey: 'solana', symbol: 'SOL' },
  { id: 'xrp', kvKey: 'xrp', symbol: 'XRP' },
  { id: 'bnb', kvKey: 'bnb', symbol: 'BNB' },
  { id: 'cardano', kvKey: 'cardano', symbol: 'ADA' },
  { id: 'dogecoin', kvKey: 'dogecoin', symbol: 'DOGE' },
  { id: 'avalanche', kvKey: 'avalanche', symbol: 'AVAX' },
  { id: 'tron', kvKey: 'tron', symbol: 'TRX' },
  { id: 'polkadot', kvKey: 'polkadot', symbol: 'DOT' },
  { id: 'chainlink', kvKey: 'chainlink', symbol: 'LINK' },
  { id: 'litecoin', kvKey: 'litecoin', symbol: 'LTC' },
  { id: 'bitcoin-cash', kvKey: 'bitcoincash', symbol: 'BCH' },
  { id: 'cosmos', kvKey: 'cosmos', symbol: 'ATOM' },
  { id: 'stellar', kvKey: 'stellar', symbol: 'XLM' },
  { id: 'monero', kvKey: 'monero', symbol: 'XMR' },
  { id: 'hedera', kvKey: 'hedera', symbol: 'HBAR' },
  { id: 'filecoin', kvKey: 'filecoin', symbol: 'FIL' },
  { id: 'kaspa', kvKey: 'kaspa', symbol: 'KAS' },
  { id: 'hyperliquid', kvKey: 'hyperliquid', symbol: 'HYPE' },
  { id: 'near', kvKey: 'near', symbol: 'NEAR' },
  { id: 'sui', kvKey: 'sui', symbol: 'SUI' },
  { id: 'aptos', kvKey: 'aptos', symbol: 'APT' },
  { id: 'bittensor', kvKey: 'bittensor', symbol: 'TAO' },
  { id: 'icp', kvKey: 'icp', symbol: 'ICP' },
  { id: 'aave', kvKey: 'aave', symbol: 'AAVE' },
  { id: 'uniswap', kvKey: 'uniswap', symbol: 'UNI' },
  { id: 'injective', kvKey: 'injective', symbol: 'INJ' },
  { id: 'ton', kvKey: 'ton', symbol: 'TON' },
  { id: 'polygon', kvKey: 'polygon', symbol: 'POL' },
  { id: 'zcash', kvKey: 'zcash', symbol: 'ZEC' },
  { id: 'tether', kvKey: 'tether', symbol: 'USDT' },
  { id: 'usdc', kvKey: 'usdc', symbol: 'USDC' },
  { id: 'dai', kvKey: 'dai', symbol: 'DAI' },
  { id: 'arbitrum', kvKey: 'arbitrum', symbol: 'ARB' },
  { id: 'lido', kvKey: 'lido', symbol: 'LDO' },
  { id: 'virtuals', kvKey: 'virtuals-protocol', symbol: 'VIRTUAL' },
  { id: 'etc', kvKey: 'etc', symbol: 'ETC' },
  { id: 'render', kvKey: null, symbol: 'RENDER' },  // Static - no API
];

/**
 * Lookup maps derived from PROJECTS array
 */
export const PROJECT_ID_TO_KV_KEY = Object.fromEntries(
  PROJECTS.map((p) => [p.id, p.kvKey])
) as Record<string, string>;

export const KV_KEY_TO_SYMBOL = Object.fromEntries(
  PROJECTS.map((p) => [p.kvKey, p.symbol])
) as Record<string, string>;

export const PROJECT_ID_TO_SYMBOL = Object.fromEntries(
  PROJECTS.map((p) => [p.id, p.symbol])
) as Record<string, string>;

/**
 * Helper functions
 */
export function getKvKey(projectId: string): string | null {
  const project = PROJECTS.find(p => p.id === projectId);
  if (project) return project.kvKey;
  return projectId; // Fallback for unknown projects
}

export function getSymbol(kvKeyOrProjectId: string): string {
  return KV_KEY_TO_SYMBOL[kvKeyOrProjectId]
    || PROJECT_ID_TO_SYMBOL[kvKeyOrProjectId]
    || kvKeyOrProjectId.toUpperCase();
}

/**
 * Project colors for UI styling
 */
export const PROJECT_COLORS: Record<string, { border: string; text: string }> = {
  bitcoin: { border: 'border-orange-500/30', text: 'text-orange-400' },
  ethereum: { border: 'border-blue-500/30', text: 'text-blue-400' },
  solana: { border: 'border-purple-500/30', text: 'text-purple-400' },
  cardano: { border: 'border-sky-500/30', text: 'text-sky-400' },
  avalanche: { border: 'border-red-500/30', text: 'text-red-400' },
  tron: { border: 'border-rose-500/30', text: 'text-rose-400' },
  bittensor: { border: 'border-cyan-500/30', text: 'text-cyan-400' },
  bnb: { border: 'border-yellow-500/30', text: 'text-yellow-400' },
  xrp: { border: 'border-gray-500/30', text: 'text-gray-400' },
  zcash: { border: 'border-amber-500/30', text: 'text-amber-400' },
  arbitrum: { border: 'border-blue-400/30', text: 'text-blue-300' },
  lido: { border: 'border-cyan-400/30', text: 'text-cyan-300' },
};

export function getProjectColors(projectId: string) {
  return PROJECT_COLORS[projectId] || { border: 'border-white/10', text: 'text-white' };
}
