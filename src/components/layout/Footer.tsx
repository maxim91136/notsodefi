import fs from 'fs';
import path from 'path';
import Link from 'next/link';

function getVersion(): string {
  const versionPath = path.join(process.cwd(), 'VERSION');
  return fs.readFileSync(versionPath, 'utf-8').trim();
}

export function Footer() {
  const version = getVersion();

  return (
    <footer className="border-t border-white/10 bg-black/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="text-center text-xs text-white/40 space-y-2">
          <p>
            Educational decentralization analysis. Not financial advice. Data may be incomplete.{' '}
            <Link href="/disclaimer" className="text-white/60 hover:text-white underline transition-colors">
              Full Disclaimer
            </Link>
          </p>
          <div>
            <span className="text-white/60 font-medium">NotSoDeFi.com</span>
            <span className="mx-1.5">·</span>
            <span className="font-mono text-white/50">v{version}</span>
            <span className="mx-1.5">·</span>
            <a
              href="https://github.com/maxim91136"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-white transition-colors"
            >
              maxim91136
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
