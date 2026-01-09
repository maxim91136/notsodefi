/**
 * Lido Data Fetcher Script
 *
 * Fetches liquid staking protocol data for Lido and saves to data/lido.json
 *
 * Usage: npx tsx scripts/fetch-lido.ts
 */

import * as fs from 'fs';
import * as path from 'path';
import { getLidoFetcher, LidoMetrics } from '../src/lib/data/fetchers/lido';
import { lido } from '../src/lib/data/projects/lido';

interface LidoData {
  lastUpdated: string;
  source: string;
  totalScore: number;
  fetchStatus: 'success' | 'partial' | 'failed';
  metrics: LidoMetrics;
}

async function main() {
  console.log('Fetching Lido (LDO) protocol data...\n');

  const fetcher = getLidoFetcher();

  console.log('Fetching metrics from DefiLlama and Lido API...');
  const metrics = await fetcher.getAllMetrics();

  // Display results
  console.log(`   TVL: $${metrics.tvl ? (metrics.tvl / 1e9).toFixed(2) + 'B' : 'N/A'}`);
  console.log(`   TVL Change 24h: ${metrics.tvlChange24h?.toFixed(2) || 'N/A'}%`);
  console.log(`   APR (7d avg): ${metrics.apr7d?.toFixed(2) || 'N/A'}%`);
  console.log(`   APR (latest): ${metrics.aprLatest?.toFixed(2) || 'N/A'}%`);
  console.log(`   Fees 24h: $${metrics.fees24h ? metrics.fees24h.toLocaleString() : 'N/A'}`);
  console.log(`   Revenue 24h: $${metrics.revenue24h ? metrics.revenue24h.toLocaleString() : 'N/A'}`);
  console.log(`   Treasury: $${metrics.treasury ? (metrics.treasury / 1e6).toFixed(2) + 'M' : 'N/A'}`);
  console.log(`   Treasury (LDO tokens): $${metrics.treasuryOwnTokens ? (metrics.treasuryOwnTokens / 1e6).toFixed(2) + 'M' : 'N/A'}`);

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
  const coreMetrics = [metrics.tvl, metrics.apr7d, metrics.treasury];
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

  const data: LidoData = {
    lastUpdated: new Date().toISOString(),
    source: 'DefiLlama + Lido API',
    totalScore: lido.scores.totalScore,
    fetchStatus,
    metrics,
  };

  // Save to file
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  const outputPath = path.join(dataDir, 'lido.json');
  fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));
  console.log(`\nSaved to ${outputPath}`);
  console.log(`Status: ${fetchStatus}`);
}

main().catch(console.error);
