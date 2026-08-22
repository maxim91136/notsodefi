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
  { id: 'dogecoin', kvKey: 'dogecoin', symbol: 'DOGE' },
  { id: 'litecoin', kvKey: 'litecoin', symbol: 'LTC' },
  { id: 'bitcoin-cash', kvKey: 'bitcoincash', symbol: 'BCH' },
  { id: 'monero', kvKey: 'monero', symbol: 'XMR' },
  { id: 'kaspa', kvKey: 'kaspa', symbol: 'KAS' },
  { id: 'etc', kvKey: 'etc', symbol: 'ETC' },
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
};

export function getProjectColors(projectId: string) {
  return PROJECT_COLORS[projectId] || { border: 'border-white/10', text: 'text-white' };
}
