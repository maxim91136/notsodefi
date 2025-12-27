/**
 * Aave Data Fetcher Script
 *
 * Fetches DeFi protocol data for Aave and saves to data/aave.json
 *
 * Usage: npx tsx scripts/fetch-aave.ts
 */

import * as fs from 'fs';
import * as path from 'path';
import { getAaveFetcher, AaveMetrics } from '../src/lib/data/fetchers/aave';
import { aave } from '../src/lib/data/projects/aave';

interface AaveData {
  lastUpdated: string;
  source: string;
  totalScore: number;
  fetchStatus: 'success' | 'partial' | 'failed';
  metrics: AaveMetrics;
}

async function main() {
  console.log('Fetching Aave (AAVE) protocol data...\n');

  const fetcher = getAaveFetcher();

  console.log('Fetching DeFi metrics from DefiLlama...');
  const metrics = await fetcher.getAllMetrics();

  // Display results
  console.log(`   TVL: $${metrics.tvl ? (metrics.tvl / 1e9).toFixed(2) + 'B' : 'N/A'}`);
  console.log(`   TVL Change 24h: ${metrics.tvlChange24h?.toFixed(2) || 'N/A'}%`);
  console.log(`   Total Chains: ${metrics.totalChains || 'N/A'}`);
  console.log(`   Treasury: $${metrics.treasury ? (metrics.treasury / 1e6).toFixed(2) + 'M' : 'N/A'}`);
  console.log(`   Treasury (AAVE tokens): $${metrics.treasuryOwnTokens ? (metrics.treasuryOwnTokens / 1e6).toFixed(2) + 'M' : 'N/A'}`);
  console.log(`   Revenue 24h: $${metrics.revenue24h ? metrics.revenue24h.toLocaleString() : 'N/A'}`);
  console.log(`   Revenue 30d: $${metrics.revenue30d ? (metrics.revenue30d / 1e6).toFixed(2) + 'M' : 'N/A'}`);

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
  const coreMetrics = [metrics.tvl, metrics.totalChains, metrics.treasury];
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

  const data: AaveData = {
    lastUpdated: new Date().toISOString(),
    source: 'DefiLlama API',
    totalScore: aave.scores.totalScore,
    fetchStatus,
    metrics,
  };

  // Save to file
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  const outputPath = path.join(dataDir, 'aave.json');
  fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));
  console.log(`\nSaved to ${outputPath}`);
  console.log(`Status: ${fetchStatus}`);
}

main().catch(console.error);
