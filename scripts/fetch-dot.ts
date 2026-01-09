#!/usr/bin/env npx tsx
/**
 * Fetch Polkadot Network Data
 *
 * Uses Subscan API to fetch Polkadot network metrics.
 * No API key required for basic endpoints.
 * Saves results to data/polkadot.json
 *
 * Usage: npx tsx scripts/fetch-dot.ts
 */

import * as fs from 'fs';
import * as path from 'path';
import { polkadot } from '../src/lib/data/projects/polkadot';

import { getPolkadotFetcher } from '../src/lib/data/fetchers/polkadot';

interface DotData {
  lastUpdated: string;
  source: string;
  totalScore: number;
  metrics: {
    blockNumber: number | null;
    era: number | null;
    activeValidators: number | null;
    waitingValidators: number | null;
    nominationPools: number | null;
    totalAccounts: number | null;
    activeNominators: number | null;
    totalStaked: number | null;
  };
  fetchStatus: 'success' | 'partial' | 'failed';
}

async function main() {
  console.log('Fetching Polkadot network data...\n');

  const fetcher = getPolkadotFetcher();

  const data: DotData = {
    lastUpdated: new Date().toISOString(),
    source: 'polkadot.subscan.io',
    totalScore: polkadot.scores.totalScore,
    metrics: {
      blockNumber: null,
      era: null,
      activeValidators: null,
      waitingValidators: null,
      nominationPools: null,
      totalAccounts: null,
      activeNominators: null,
      totalStaked: null,
    },
    fetchStatus: 'failed',
  };

  let successCount = 0;

  // Fetch all metrics
  console.log('Fetching network stats (Subscan API)...');
  try {
    const metrics = await fetcher.getAllMetrics();

    if (metrics.blockNumber !== null) {
      data.metrics.blockNumber = metrics.blockNumber;
      console.log(`   Block: ${metrics.blockNumber.toLocaleString()}`);
      successCount++;
    }
    if (metrics.era !== null) {
      data.metrics.era = metrics.era;
      console.log(`   Era: ${metrics.era}`);
      successCount++;
    }
    if (metrics.activeValidators !== null) {
      data.metrics.activeValidators = metrics.activeValidators;
      console.log(`   Active Validators: ${metrics.activeValidators}`);
      successCount++;
    }
    if (metrics.waitingValidators !== null) {
      data.metrics.waitingValidators = metrics.waitingValidators;
      console.log(`   Waiting Validators: ${metrics.waitingValidators}`);
      successCount++;
    }
    if (metrics.nominationPools !== null) {
      data.metrics.nominationPools = metrics.nominationPools;
      console.log(`   Nomination Pools: ${metrics.nominationPools}`);
      successCount++;
    }
    if (metrics.totalAccounts !== null) {
      data.metrics.totalAccounts = metrics.totalAccounts;
      console.log(`   Total Accounts: ${metrics.totalAccounts.toLocaleString()}`);
      successCount++;
    }
    if (metrics.activeNominators !== null) {
      data.metrics.activeNominators = metrics.activeNominators;
      console.log(`   Active Nominators: ${metrics.activeNominators.toLocaleString()}`);
      successCount++;
    }
    if (metrics.totalStaked !== null) {
      data.metrics.totalStaked = metrics.totalStaked;
      console.log(`   Total Staked: ${metrics.totalStaked.toLocaleString()} DOT`);
      successCount++;
    }
  } catch (e) {
    console.log('   Error:', e);
  }

  // Determine status
  data.fetchStatus = successCount === 0 ? 'failed' : successCount >= 5 ? 'success' : 'partial';

  // Save to file
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  const outputPath = path.join(dataDir, 'polkadot.json');
  fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));

  console.log(`\nSaved to ${outputPath}`);
  console.log(`Status: ${data.fetchStatus} (${successCount} metrics)`);

  if (data.fetchStatus === 'failed') process.exit(1);
}

main().catch((e) => {
  console.error('Fatal error:', e);
  process.exit(1);
});
