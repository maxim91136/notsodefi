#!/usr/bin/env npx tsx
/**
 * Fetch Ethereum Network Data
 *
 * Uses public Beacon API to fetch validator and consensus metrics.
 * Saves results to data/ethereum.json
 *
 * Usage: npx tsx scripts/fetch-eth.ts
 */

import * as fs from 'fs';
import * as path from 'path';

import { getEthereumBeaconFetcher } from '../src/lib/data/fetchers/ethereum-beacon';
import { ethereum } from '../src/lib/data/projects/ethereum';

interface EthereumData {
  lastUpdated: string;
  source: string;
  totalScore: number;
  metrics: {
    // Network metrics
    connectedPeers: number | null;
    headSlot: number | null;
    finalizedEpoch: number | null;
    syncDistance: number | null;
    // Note: Full validator data requires paid APIs
    // These are from public beacon endpoint
  };
  fetchStatus: 'success' | 'partial' | 'failed';
}

async function main() {
  console.log('Fetching Ethereum network data...\n');

  const beacon = getEthereumBeaconFetcher();

  const data: EthereumData = {
    lastUpdated: new Date().toISOString(),
    source: 'ethereum-beacon-api.publicnode.com',
    totalScore: ethereum.scores.totalScore,
    metrics: {
      connectedPeers: null,
      headSlot: null,
      finalizedEpoch: null,
      syncDistance: null,
    },
    fetchStatus: 'failed',
  };

  let successCount = 0;

  // 1. Fetch peer count
  console.log('1. Fetching peer count (Beacon API)...');
  try {
    const peers = await beacon.getConnectedPeers();
    if (peers) {
      data.metrics.connectedPeers = peers.value as number;
      console.log(`   Connected peers: ${peers.value}`);
      successCount++;
    }
  } catch (e) {
    console.log('   Error:', e);
  }

  // 2. Fetch sync status
  console.log('\n2. Fetching sync status...');
  try {
    const headSlot = await beacon.getHeadSlot();
    if (headSlot) {
      data.metrics.headSlot = headSlot.value as number;
      console.log(`   Head slot: ${headSlot.value}`);
      successCount++;
    }

    const syncDistance = await beacon.getSyncDistance();
    if (syncDistance) {
      data.metrics.syncDistance = syncDistance.value as number;
      console.log(`   Sync distance: ${syncDistance.value}`);
      successCount++;
    }
  } catch (e) {
    console.log('   Error:', e);
  }

  // 3. Fetch finality
  console.log('\n3. Fetching finality checkpoints...');
  try {
    const finalized = await beacon.getFinalizedEpoch();
    if (finalized) {
      data.metrics.finalizedEpoch = finalized.value as number;
      console.log(`   Finalized epoch: ${finalized.value}`);
      successCount++;
    }
  } catch (e) {
    console.log('   Error:', e);
  }

  // Determine status
  data.fetchStatus = successCount === 0 ? 'failed' : successCount >= 3 ? 'success' : 'partial';

  // Save to file
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  const outputPath = path.join(dataDir, 'ethereum.json');
  fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));

  console.log(`\nSaved to ${outputPath}`);
  console.log(`Status: ${data.fetchStatus} (${successCount} metrics)`);

  if (data.fetchStatus === 'failed') process.exit(1);
}

main().catch((e) => {
  console.error('Fatal error:', e);
  process.exit(1);
});
