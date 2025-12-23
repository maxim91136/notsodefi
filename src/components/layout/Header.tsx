'use client';

import Link from 'next/link';

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold">
              <span className="text-white">NotSo</span>
              <span className="text-red-500">DeFi</span>
            </span>
            <span className="px-1 py-0.5 text-[9px] font-medium bg-yellow-500/20 text-yellow-400 rounded border border-yellow-500/30">
              Beta
            </span>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-6">
            <Link
              href="/projects"
              className="text-sm text-white/70 hover:text-white transition-colors"
            >
              Projects
            </Link>
            <Link
              href="/calculator"
              className="text-sm text-white/70 hover:text-white transition-colors"
            >
              Calculator
            </Link>
            <a
              href="https://github.com/maxim91136/notsodefi"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-white/70 hover:text-white transition-colors"
            >
              GitHub
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
