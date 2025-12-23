import fs from 'fs';
import path from 'path';

function getVersion(): string {
  const versionPath = path.join(process.cwd(), 'VERSION');
  return fs.readFileSync(versionPath, 'utf-8').trim();
}

function getFormattedDate(): string {
  const date = new Date();
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[date.getMonth()]}. ${date.getDate()}, ${date.getFullYear()}`;
}

export function Footer() {
  const version = getVersion();
  const date = getFormattedDate();

  return (
    <footer className="border-t border-white/10 bg-black/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="text-center text-sm text-white/40">
          <span>© {date} </span>
          <span className="text-white/60 font-medium">NotSoDeFi</span>
          <span className="mx-2">·</span>
          <span>Open Source</span>
          <span className="mx-2">·</span>
          <span className="font-mono text-white/50">v{version}</span>
          <span className="mx-2">·</span>
          <span>by </span>
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
    </footer>
  );
}
