'use client';

import { useState } from 'react';
import Link from 'next/link';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Link href="/" className="text-xl font-bold">
              <span className="text-white">NotSo</span>
              <span className="text-red-500">DeFi</span>
              <span className="text-white">.com</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden sm:flex items-center gap-6">
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
            <Link
              href="/methodology"
              className="text-sm text-white/70 hover:text-white transition-colors"
            >
              Methodology
            </Link>
            <Link
              href="/problems"
              className="text-sm text-white/70 hover:text-white transition-colors"
            >
              Observations
            </Link>
            <Link
              href="/risk-indicators"
              className="text-sm text-white/70 hover:text-white transition-colors"
            >
              Risk Indicators
            </Link>
            <Link
              href="/spof"
              className="text-sm text-white/70 hover:text-white transition-colors"
            >
              SPOF
            </Link>
            <Link
              href="/roadmap-tracking"
              className="text-sm text-white/70 hover:text-white transition-colors"
            >
              Roadmaps
            </Link>
            <Link
              href="/funding-analysis"
              className="text-sm text-white/70 hover:text-white transition-colors"
            >
              Funding
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

          {/* Mobile Hamburger */}
          <button
            className="sm:hidden p-2 text-white/70 hover:text-white transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="sm:hidden border-t border-white/10 py-3 max-h-[calc(100vh-4rem)] overflow-y-auto">
            <div className="flex flex-col gap-1">
              <Link
                href="/projects"
                onClick={() => setMobileMenuOpen(false)}
                className="px-2 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 rounded transition-colors"
              >
                Projects
              </Link>
              <Link
                href="/calculator"
                onClick={() => setMobileMenuOpen(false)}
                className="px-2 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 rounded transition-colors"
              >
                Calculator
              </Link>
              <Link
                href="/methodology"
                onClick={() => setMobileMenuOpen(false)}
                className="px-2 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 rounded transition-colors"
              >
                Methodology
              </Link>
              <Link
                href="/problems"
                onClick={() => setMobileMenuOpen(false)}
                className="px-2 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 rounded transition-colors"
              >
                Observations
              </Link>
              <Link
                href="/risk-indicators"
                onClick={() => setMobileMenuOpen(false)}
                className="px-2 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 rounded transition-colors"
              >
                Risk Indicators
              </Link>
              <Link
                href="/spof"
                onClick={() => setMobileMenuOpen(false)}
                className="px-2 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 rounded transition-colors"
              >
                SPOF
              </Link>
              <Link
                href="/roadmap-tracking"
                onClick={() => setMobileMenuOpen(false)}
                className="px-2 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 rounded transition-colors"
              >
                Roadmaps
              </Link>
              <Link
                href="/funding-analysis"
                onClick={() => setMobileMenuOpen(false)}
                className="px-2 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 rounded transition-colors"
              >
                Funding
              </Link>
              <a
                href="https://github.com/maxim91136/notsodefi"
                target="_blank"
                rel="noopener noreferrer"
                className="px-2 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 rounded transition-colors"
              >
                GitHub
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
