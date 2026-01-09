#!/usr/bin/env npx tsx
/**
 * Fetch Solana Network Data
 *
 * Uses Solana public RPC to fetch validator and network metrics.
 * Saves results to data/solana.json
 *
 * Usage: npx tsx scripts/fetch-sol.ts
 */

import * as fs from 'fs';
import * as path from 'path';
import { solana as solanaProject } from '../src/lib/data/projects/solana';

import { getSolanaRpcFetcher } from '../src/lib/data/fetchers/solana-rpc';

interface SolanaData {
  lastUpdated: string;
  totalScore: number;
  metrics: {
    // Validator metrics
    totalValidators: number | null;
    activeValidators: number | null;
    nakamotoCoefficient: number | null;
    // Concentration metrics
    top5Concentration: number | null;
    largestValidatorPercentage: number | null;
    // Network metrics
    totalNodes: number | null;
    clientVersions: number | null;
  };
  fetchStatus: 'success' | 'partial' | 'failed';
}

async function main() {
  console.log('Fetching Solana network data...\n');

  const solana = getSolanaRpcFetcher();

  const data: SolanaData = {
    lastUpdated: new Date().toISOString(),
    totalScore: solanaProject.scores.totalScore,
    metrics: {
      totalValidators: null,
      activeValidators: null,
      nakamotoCoefficient: null,
      top5Concentration: null,
      largestValidatorPercentage: null,
      totalNodes: null,
      clientVersions: null,
    },
    fetchStatus: 'failed',
  };

  let successCount = 0;

  // 1. Fetch validator counts (1 RPC call - getVoteAccounts)
  console.log('1. Fetching validator data (Solana RPC)...');
  try {
    const total = await solana.getTotalValidators();
    if (total) {
      data.metrics.totalValidators = total.value as number;
      console.log(`   Total validators: ${total.value}`);
      successCount++;
    }

    const active = await solana.getActiveValidators();
    if (active) {
      data.metrics.activeValidators = active.value as number;
      console.log(`   Active validators: ${active.value}`);
      successCount++;
    }
  } catch (e) {
    console.log('   Error:', e);
  }

  // 2. Nakamoto Coefficient (uses cached data from step 1)
  console.log('\n2. Calculating Nakamoto Coefficient...');
  try {
    const nakamoto = await solana.getNakamotoCoefficient();
    if (nakamoto) {
      data.metrics.nakamotoCoefficient = nakamoto.value as number;
      console.log(`   Nakamoto Coefficient: ${nakamoto.value}`);
      successCount++;
    }
  } catch (e) {
    console.log('   Error:', e);
  }

  // 3. Concentration metrics
  console.log('\n3. Calculating stake concentration...');
  try {
    const top5 = await solana.getTop5Concentration();
    if (top5) {
      data.metrics.top5Concentration = top5.value as number;
      console.log(`   Top 5 concentration: ${top5.value}%`);
      successCount++;
    }

    const largest = await solana.getLargestValidatorPercentage();
    if (largest) {
      data.metrics.largestValidatorPercentage = largest.value as number;
      console.log(`   Largest validator: ${largest.value}%`);
      successCount++;
    }
  } catch (e) {
    console.log('   Error:', e);
  }

  // 4. Node and client data (1 RPC call - getClusterNodes)
  console.log('\n4. Fetching node data...');
  try {
    const nodes = await solana.getTotalNodes();
    if (nodes) {
      data.metrics.totalNodes = nodes.value as number;
      console.log(`   Total nodes: ${nodes.value}`);
      successCount++;
    }

    const versions = await solana.getClientVersions();
    if (versions) {
      data.metrics.clientVersions = versions.value as number;
      console.log(`   Client versions: ${versions.value}`);
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

  const outputPath = path.join(dataDir, 'solana.json');
  fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));

  console.log(`\nSaved to ${outputPath}`);
  console.log(`Status: ${data.fetchStatus} (${successCount} metrics)`);

  if (data.fetchStatus === 'failed') process.exit(1);
}

main().catch((e) => {
  console.error('Fatal error:', e);
  process.exit(1);
});
