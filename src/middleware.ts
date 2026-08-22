import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Map ticker symbols to project IDs (lowercase)
const tickerToId: Record<string, string> = {
  btc: 'bitcoin',
  eth: 'ethereum',
  ltc: 'litecoin',
  xmr: 'monero',
  doge: 'dogecoin',
  bch: 'bitcoincash',
  kas: 'kaspa',
  etc: 'etc',
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
