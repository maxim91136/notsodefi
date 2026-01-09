#!/usr/bin/env npx tsx
/**
 * Fetch Filecoin Network Data
 *
 * Uses Filfox API to fetch miner and storage metrics.
 * No API key required.
 * Saves results to data/filecoin.json
 *
 * Usage: npx tsx scripts/fetch-fil.ts
 */

import * as fs from 'fs';
import * as path from 'path';

import { getFilecoinFetcher } from '../src/lib/data/fetchers/filecoin';
import { filecoin } from '../src/lib/data/projects/filecoin';

interface FilecoinData {
  lastUpdated: string;
  source: string;
  totalScore: number;
  metrics: {
    activeMiners: number | null;
    totalPowerPiB: number | null;
    nakamotoCoefficient: number | null;
    top5Concentration: number | null;
    top10Concentration: number | null;
  };
  fetchStatus: 'success' | 'partial' | 'failed';
}

async function main() {
  console.log('Fetching Filecoin network data...\n');

  const fetcher = getFilecoinFetcher();

  const data: FilecoinData = {
    lastUpdated: new Date().toISOString(),
    source: 'filfox.info',
    totalScore: filecoin.scores.totalScore,
    metrics: {
      activeMiners: null,
      totalPowerPiB: null,
      nakamotoCoefficient: null,
      top5Concentration: null,
      top10Concentration: null,
    },
    fetchStatus: 'failed',
  };

  let successCount = 0;

  console.log('Fetching miner stats (Filfox API)...');
  try {
    const metrics = await fetcher.getAllMetrics();

    if (metrics.activeMiners !== null) {
      data.metrics.activeMiners = metrics.activeMiners;
      console.log(`   Active Miners: ${metrics.activeMiners}`);
      successCount++;
    }
    if (metrics.totalPowerPiB !== null) {
      data.metrics.totalPowerPiB = metrics.totalPowerPiB;
      console.log(`   Total Power: ${metrics.totalPowerPiB.toLocaleString()} PiB`);
      successCount++;
    }
    if (metrics.nakamotoCoefficient !== null) {
      data.metrics.nakamotoCoefficient = metrics.nakamotoCoefficient;
      console.log(`   Nakamoto Coefficient: ${metrics.nakamotoCoefficient}`);
      successCount++;
    }
    if (metrics.top5Concentration !== null) {
      data.metrics.top5Concentration = metrics.top5Concentration;
      console.log(`   Top 5 Concentration: ${metrics.top5Concentration}%`);
      successCount++;
    }
    if (metrics.top10Concentration !== null) {
      data.metrics.top10Concentration = metrics.top10Concentration;
      console.log(`   Top 10 Concentration: ${metrics.top10Concentration}%`);
      successCount++;
    }
  } catch (e) {
    console.log('   Error:', e);
  }

  // Determine status
  data.fetchStatus =
    successCount === 0 ? 'failed' : successCount >= 4 ? 'success' : 'partial';

  // Save to file
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  const outputPath = path.join(dataDir, 'filecoin.json');
  fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));

  console.log(`\nSaved to ${outputPath}`);
  console.log(`Status: ${data.fetchStatus} (${successCount} metrics)`);

  if (data.fetchStatus === 'failed') process.exit(1);
}

main().catch((e) => {
  console.error('Fatal error:', e);
  process.exit(1);
});
