#!/usr/bin/env npx tsx
/**
 * Fetch BNB Chain Network Data
 *
 * Uses BNB Chain public RPC to fetch network metrics.
 * Saves results to data/bnb.json
 *
 * Usage: npx tsx scripts/fetch-bnb.ts
 */

import * as fs from 'fs';
import * as path from 'path';
import { bnb as bnbProject } from '../src/lib/data/projects/bnb';

import { getBnbChainFetcher } from '../src/lib/data/fetchers/bnb-chain';

interface BnbData {
  lastUpdated: string;
  source: string;
  totalScore: number;
  metrics: {
    blockNumber: number | null;
    peerCount: number | null;
    validatorCount: number | null;
    gasPrice: number | null;
    chainId: number | null;
  };
  fetchStatus: 'success' | 'partial' | 'failed';
}

async function main() {
  console.log('Fetching BNB Chain network data...\n');

  const bnb = getBnbChainFetcher();

  const data: BnbData = {
    lastUpdated: new Date().toISOString(),
    source: 'bsc-dataseed.binance.org',
    totalScore: bnbProject.scores.totalScore,
    metrics: {
      blockNumber: null,
      peerCount: null,
      validatorCount: null,
      gasPrice: null,
      chainId: null,
    },
    fetchStatus: 'failed',
  };

  let successCount = 0;

  // 1. Fetch block number
  console.log('1. Fetching block number...');
  try {
    const blockNumber = await bnb.getBlockNumber();
    if (blockNumber) {
      data.metrics.blockNumber = blockNumber;
      console.log(`   Block number: ${blockNumber.toLocaleString()}`);
      successCount++;
    }
  } catch (e) {
    console.log('   Error:', e);
  }

  // 2. Fetch peer count
  console.log('2. Fetching peer count...');
  try {
    const peerCount = await bnb.getPeerCount();
    if (peerCount !== null) {
      data.metrics.peerCount = peerCount;
      console.log(`   Peer count: ${peerCount}`);
      successCount++;
    }
  } catch (e) {
    console.log('   Error:', e);
  }

  // 3. Get validator count (always 21 for BNB Chain)
  console.log('3. Getting validator count...');
  try {
    const validatorCount = await bnb.getValidatorCount();
    data.metrics.validatorCount = validatorCount;
    console.log(`   Validator count: ${validatorCount} (PoSA fixed)`);
    successCount++;
  } catch (e) {
    console.log('   Error:', e);
  }

  // 4. Fetch gas price
  console.log('4. Fetching gas price...');
  try {
    const gasPrice = await bnb.getGasPrice();
    if (gasPrice !== null) {
      data.metrics.gasPrice = gasPrice;
      console.log(`   Gas price: ${gasPrice} Gwei`);
      successCount++;
    }
  } catch (e) {
    console.log('   Error:', e);
  }

  // 5. Fetch chain ID
  console.log('5. Fetching chain ID...');
  try {
    const chainId = await bnb.getChainId();
    if (chainId !== null) {
      data.metrics.chainId = chainId;
      console.log(`   Chain ID: ${chainId}`);
      successCount++;
    }
  } catch (e) {
    console.log('   Error:', e);
  }

  // Determine status
  data.fetchStatus = successCount === 0 ? 'failed' : successCount >= 4 ? 'success' : 'partial';

  // Save to file
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  const outputPath = path.join(dataDir, 'bnb.json');
  fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));

  console.log(`\nSaved to ${outputPath}`);
  console.log(`Status: ${data.fetchStatus} (${successCount} metrics)`);

  if (data.fetchStatus === 'failed') process.exit(1);
}

main().catch((e) => {
  console.error('Fatal error:', e);
  process.exit(1);
});
