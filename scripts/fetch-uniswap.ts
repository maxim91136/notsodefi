/**
 * Uniswap Data Fetcher Script
 *
 * Fetches DeFi protocol data for Uniswap and saves to data/uniswap.json
 *
 * Usage: npx tsx scripts/fetch-uniswap.ts
 */

import * as fs from 'fs';
import * as path from 'path';
import { getUniswapFetcher, UniswapMetrics } from '../src/lib/data/fetchers/uniswap';
import { uniswap } from '../src/lib/data/projects/uniswap';

interface UniswapData {
  lastUpdated: string;
  source: string;
  totalScore: number;
  fetchStatus: 'success' | 'partial' | 'failed';
  metrics: UniswapMetrics;
}

async function main() {
  console.log('Fetching Uniswap (UNI) protocol data...\n');

  const fetcher = getUniswapFetcher();

  console.log('Fetching DeFi metrics from DefiLlama...');
  const metrics = await fetcher.getAllMetrics();

  // Display results
  console.log(`   TVL: $${metrics.tvl ? (metrics.tvl / 1e9).toFixed(2) + 'B' : 'N/A'}`);
  console.log(`   TVL Change 24h: ${metrics.tvlChange24h?.toFixed(2) || 'N/A'}%`);
  console.log(`   Total Chains: ${metrics.totalChains || 'N/A'}`);
  console.log(`   Volume 24h: $${metrics.volume24h ? (metrics.volume24h / 1e9).toFixed(2) + 'B' : 'N/A'}`);
  console.log(`   Fees 24h: $${metrics.fees24h ? (metrics.fees24h / 1e6).toFixed(2) + 'M' : 'N/A'}`);
  console.log(`   Revenue 24h: $${metrics.revenue24h ? metrics.revenue24h.toLocaleString() : 'N/A'}`);
  console.log(`   Treasury: $${metrics.treasury ? (metrics.treasury / 1e6).toFixed(2) + 'M' : 'N/A'}`);
  console.log(`   Treasury (UNI tokens): $${metrics.treasuryOwnTokens ? (metrics.treasuryOwnTokens / 1e6).toFixed(2) + 'M' : 'N/A'}`);

  if (Object.keys(metrics.chainTvls).length > 0) {
    console.log('\n   Chain TVL Breakdown:');
    const sortedChains = Object.entries(metrics.chainTvls)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5);
    for (const [chain, tvl] of sortedChains) {
      console.log(`     ${chain}: $${(tvl / 1e9).toFixed(2)}B`);
    }
  }

  // Count successful metrics
  const coreMetrics = [metrics.tvl, metrics.totalChains, metrics.volume24h];
  const successCount = coreMetrics.filter((v) => v !== null).length;

  // Determine fetch status
  let fetchStatus: 'success' | 'partial' | 'failed';
  if (successCount === coreMetrics.length) {
    fetchStatus = 'success';
  } else if (successCount > 0) {
    fetchStatus = 'partial';
  } else {
    fetchStatus = 'failed';
  }

  const data: UniswapData = {
    lastUpdated: new Date().toISOString(),
    source: 'DefiLlama API',
    totalScore: uniswap.scores.totalScore,
    fetchStatus,
    metrics,
  };

  // Save to file
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  const outputPath = path.join(dataDir, 'uniswap.json');
  fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));
  console.log(`\nSaved to ${outputPath}`);
  console.log(`Status: ${fetchStatus}`);
}

main().catch(console.error);
