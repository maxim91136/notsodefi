/**
 * Stellar (XLM) Data Fetcher
 *
 * Fetches network metrics from Stellar Horizon API and Dashboard API.
 * Uses FBA (Federated Byzantine Agreement) consensus.
 *
 * Docs: https://developers.stellar.org/api
 */

const HORIZON_API = 'https://horizon.stellar.org';
const DASHBOARD_API = 'https://dashboard.stellar.org/api/v2';

interface LedgerResponse {
  sequence: number;
  closed_at: string;
  successful_transaction_count: number;
  failed_transaction_count: number;
  operation_count: number;
  tx_set_operation_count: number;
  base_fee_in_stroops: number;
  protocol_version: number;
}

interface LedgersResponse {
  _embedded: {
    records: LedgerResponse[];
  };
}

interface LumensResponse {
  updatedAt: string;
  totalSupply: string;
  circulatingSupply: string;
  burnedLumens: string;
  sdfMandate: string;
  upgradeReserve: string;
  feePool: string;
}

export interface StellarMetrics {
  ledgerSequence: number | null;
  protocolVersion: number | null;
  txSuccessCount: number | null;
  txFailedCount: number | null;
  operationCount: number | null;
  baseFee: number | null;
  totalSupply: number | null;
  circulatingSupply: number | null;
  sdfMandate: number | null;
  sdfMandatePercent: number | null;
}

export class StellarFetcher {
  private horizonUrl: string;
  private dashboardUrl: string;

  constructor(horizonUrl?: string, dashboardUrl?: string) {
    this.horizonUrl = horizonUrl || HORIZON_API;
    this.dashboardUrl = dashboardUrl || DASHBOARD_API;
  }

  private async fetchHorizon<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${this.horizonUrl}${endpoint}`, {
      headers: {
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Horizon API error: ${response.status}`);
    }

    return response.json() as Promise<T>;
  }

  private async fetchDashboard<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${this.dashboardUrl}${endpoint}`, {
      headers: {
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Dashboard API error: ${response.status}`);
    }

    return response.json() as Promise<T>;
  }

  /**
   * Get latest ledger info
   */
  async getLatestLedger(): Promise<{
    sequence: number;
    protocolVersion: number;
    txSuccessCount: number;
    txFailedCount: number;
    operationCount: number;
    baseFee: number;
  }> {
    const result = await this.fetchHorizon<LedgersResponse>(
      '/ledgers?limit=1&order=desc'
    );

    const ledger = result._embedded.records[0];

    return {
      sequence: ledger.sequence,
      protocolVersion: ledger.protocol_version,
      txSuccessCount: ledger.successful_transaction_count,
      txFailedCount: ledger.failed_transaction_count,
      operationCount: ledger.operation_count,
      baseFee: ledger.base_fee_in_stroops,
    };
  }

  /**
   * Get lumens supply data
   */
  async getLumensSupply(): Promise<{
    totalSupply: number;
    circulatingSupply: number;
    sdfMandate: number;
    sdfMandatePercent: number;
  }> {
    const result = await this.fetchDashboard<LumensResponse>('/lumens');

    const totalSupply = parseFloat(result.totalSupply);
    const circulatingSupply = parseFloat(result.circulatingSupply);
    const sdfMandate = parseFloat(result.sdfMandate);

    return {
      totalSupply: Math.round(totalSupply),
      circulatingSupply: Math.round(circulatingSupply),
      sdfMandate: Math.round(sdfMandate),
      sdfMandatePercent: Math.round((sdfMandate / totalSupply) * 10000) / 100,
    };
  }

  /**
   * Get all metrics
   */
  async getAllMetrics(): Promise<StellarMetrics> {
    try {
      const [ledger, supply] = await Promise.all([
        this.getLatestLedger(),
        this.getLumensSupply(),
      ]);

      return {
        ledgerSequence: ledger.sequence,
        protocolVersion: ledger.protocolVersion,
        txSuccessCount: ledger.txSuccessCount,
        txFailedCount: ledger.txFailedCount,
        operationCount: ledger.operationCount,
        baseFee: ledger.baseFee,
        totalSupply: supply.totalSupply,
        circulatingSupply: supply.circulatingSupply,
        sdfMandate: supply.sdfMandate,
        sdfMandatePercent: supply.sdfMandatePercent,
      };
    } catch (error) {
      console.error('Error fetching Stellar metrics:', error);
      return {
        ledgerSequence: null,
        protocolVersion: null,
        txSuccessCount: null,
        txFailedCount: null,
        operationCount: null,
        baseFee: null,
        totalSupply: null,
        circulatingSupply: null,
        sdfMandate: null,
        sdfMandatePercent: null,
      };
    }
  }
}

export function getStellarFetcher(
  horizonUrl?: string,
  dashboardUrl?: string
): StellarFetcher {
  return new StellarFetcher(horizonUrl, dashboardUrl);
}
