import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Map ticker symbols to project IDs (lowercase)
const tickerToId: Record<string, string> = {
  // Major coins
  btc: 'bitcoin',
  eth: 'ethereum',
  sol: 'solana',
  xrp: 'xrp',
  bnb: 'bnb',
  ada: 'cardano',
  avax: 'avalanche',
  trx: 'tron',
  ltc: 'litecoin',
  xmr: 'monero',
  doge: 'dogecoin',
  bch: 'bitcoincash',
  dot: 'polkadot',
  atom: 'cosmos',
  hype: 'hyperliquid',
  kas: 'kaspa',
  icp: 'icp',
  link: 'chainlink',
  aave: 'aave',
  ton: 'ton',
  xlm: 'stellar',
  sui: 'sui',
  uni: 'uniswap',
  hbar: 'hedera',
  usdt: 'tether',
  usdc: 'usdc',
  dai: 'dai',
  near: 'near',
  apt: 'aptos',
  pol: 'polygon',
  matic: 'polygon', // Old ticker
  inj: 'injective',
  fil: 'filecoin',
  arb: 'arbitrum',
  ldo: 'lido',
  etc: 'etc',
  zec: 'zcash',
  tao: 'bittensor',
};

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Check if it's a /projects/TICKER path
  if (pathname.startsWith('/projects/')) {
    const slug = pathname.split('/')[2]?.toLowerCase();

    // If the slug is a ticker symbol, redirect to the full project name
    if (slug && tickerToId[slug] && tickerToId[slug] !== slug) {
      const newUrl = new URL(`/projects/${tickerToId[slug]}`, request.url);
      return NextResponse.redirect(newUrl, 301);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/projects/:path*',
};
