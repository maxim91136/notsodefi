#!/usr/bin/env npx tsx
/**
 * Fetch XRP Ledger Network Data
 *
 * Uses XRPL public JSON-RPC to fetch network metrics.
 * Saves results to data/xrp.json
 *
 * Usage: npx tsx scripts/fetch-xrp.ts
 */

import * as fs from 'fs';
import * as path from 'path';
import { xrp } from '../src/lib/data/projects/xrp';

import { getXrplFetcher } from '../src/lib/data/fetchers/xrpl';

interface XrpData {
  lastUpdated: string;
  source: string;
  totalScore: number;
  metrics: {
    connectedPeers: number | null;
    validationQuorum: number | null;
    validatedLedgerSeq: number | null;
    serverState: string | null;
    buildVersion: string | null;
  };
  fetchStatus: 'success' | 'partial' | 'failed';
}

async function main() {
  console.log('Fetching XRP Ledger network data...\n');

  const xrpl = getXrplFetcher();

  const data: XrpData = {
    lastUpdated: new Date().toISOString(),
    source: 's1.ripple.com',
    totalScore: xrp.scores.totalScore,
    metrics: {
      connectedPeers: null,
      validationQuorum: null,
      validatedLedgerSeq: null,
      serverState: null,
      buildVersion: null,
    },
    fetchStatus: 'failed',
  };

  let successCount = 0;

  // 1. Fetch server info (single RPC call gets all data)
  console.log('1. Fetching server info (XRPL RPC)...');
  try {
    const peers = await xrpl.getConnectedPeers();
    if (peers) {
      data.metrics.connectedPeers = peers.value as number;
      console.log(`   Connected peers: ${peers.value}`);
      successCount++;
    }

    const quorum = await xrpl.getValidationQuorum();
    if (quorum) {
      data.metrics.validationQuorum = quorum.value as number;
      console.log(`   Validation quorum: ${quorum.value}`);
      successCount++;
    }

    const ledgerSeq = await xrpl.getValidatedLedgerSeq();
    if (ledgerSeq) {
      data.metrics.validatedLedgerSeq = ledgerSeq.value as number;
      console.log(`   Validated ledger: ${ledgerSeq.value}`);
      successCount++;
    }

    const state = await xrpl.getServerState2();
    if (state) {
      data.metrics.serverState = state.value as string;
      console.log(`   Server state: ${state.value}`);
      successCount++;
    }

    const version = await xrpl.getBuildVersion();
    if (version) {
      data.metrics.buildVersion = version.value as string;
      console.log(`   Build version: ${version.value}`);
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

  const outputPath = path.join(dataDir, 'xrp.json');
  fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));

  console.log(`\nSaved to ${outputPath}`);
  console.log(`Status: ${data.fetchStatus} (${successCount} metrics)`);

  if (data.fetchStatus === 'failed') process.exit(1);
}

main().catch((e) => {
  console.error('Fatal error:', e);
  process.exit(1);
});
