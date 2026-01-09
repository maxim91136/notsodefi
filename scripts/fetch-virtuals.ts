/**
 * Virtuals Protocol Data Fetcher Script
 *
 * Fetches AI Agent launchpad data and saves to data/virtuals.json
 *
 * Usage: npx tsx scripts/fetch-virtuals.ts
 */

import * as fs from 'fs';
import * as path from 'path';
import { getVirtualsFetcher, VirtualsMetrics } from '../src/lib/data/fetchers/virtuals';
import { virtuals } from '../src/lib/data/projects/virtuals';

interface VirtualsData {
  lastUpdated: string;
  source: string;
  totalScore: number;
  fetchStatus: 'success' | 'partial' | 'failed';
  metrics: VirtualsMetrics;
}

async function main() {
  console.log('Fetching Virtuals Protocol (VIRTUAL) data...\n');

  const fetcher = getVirtualsFetcher();

  console.log('Fetching metrics from DefiLlama...');
  const metrics = await fetcher.getAllMetrics();

  // Display results
  console.log(`   Fees 24h: $${metrics.fees24h ? metrics.fees24h.toLocaleString() : 'N/A'}`);
  console.log(`   Fees 7d: $${metrics.fees7d ? metrics.fees7d.toLocaleString() : 'N/A'}`);
  console.log(`   Fees 30d: $${metrics.fees30d ? metrics.fees30d.toLocaleString() : 'N/A'}`);
  console.log(`   Fees All-time: $${metrics.feesTotal ? (metrics.feesTotal / 1e6).toFixed(2) + 'M' : 'N/A'}`);

  if (metrics.chainBreakdown.base || metrics.chainBreakdown.ethereum || metrics.chainBreakdown.solana) {
    console.log('\n   Chain Fee Breakdown (24h):');
    if (metrics.chainBreakdown.base) {
      console.log(`     Base: $${metrics.chainBreakdown.base.toLocaleString()}`);
    }
    if (metrics.chainBreakdown.ethereum) {
      console.log(`     Ethereum: $${metrics.chainBreakdown.ethereum.toLocaleString()}`);
    }
    if (metrics.chainBreakdown.solana) {
      console.log(`     Solana: $${metrics.chainBreakdown.solana.toLocaleString()}`);
    }
  }

  // Count successful metrics
  const coreMetrics = [metrics.fees24h, metrics.feesTotal];
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

  const data: VirtualsData = {
    lastUpdated: new Date().toISOString(),
    source: 'DefiLlama',
    totalScore: virtuals.scores.totalScore,
    fetchStatus,
    metrics,
  };

  // Save to file
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  const outputPath = path.join(dataDir, 'virtuals.json');
  fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));
  console.log(`\nSaved to ${outputPath}`);
  console.log(`Status: ${fetchStatus}`);
}

main().catch(console.error);
