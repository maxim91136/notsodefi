import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import { Card, CardContent, CardHeader } from '@/components/ui';
import { getAllCriteria, CATEGORIES } from '@/lib/framework';

function getVersion(): string {
  const versionPath = path.join(process.cwd(), 'VERSION');
  return fs.readFileSync(versionPath, 'utf-8').trim();
}

export default function HomePage() {
  const version = getVersion();
  const criteria = getAllCriteria();
  const chainCriteria = criteria.filter((c) => c.category === 'chain');
  const controlCriteria = criteria.filter((c) => c.category === 'control');
  const fairnessCriteria = criteria.filter((c) => c.category === 'fairness');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Hero */}
      <section className="text-center mb-20">
        <h1 className="text-5xl sm:text-6xl font-bold mb-6">
          <span className="text-white">NotSo</span>
          <span className="text-red-500">DeFi</span>
        </h1>
        <p className="text-xl text-white/70 max-w-2xl mx-auto mb-8">
          Measuring real decentralization. Because &quot;decentralized&quot; doesn&apos;t
          mean what most projects claim it means.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/projects"
            className="px-6 py-3 bg-white text-black font-medium rounded-lg hover:bg-white/90 transition-colors"
          >
            View Projects
          </Link>
          <Link
            href="/calculator"
            className="px-6 py-3 bg-white/10 text-white font-medium rounded-lg hover:bg-white/20 transition-colors border border-white/20"
          >
            Score Calculator
          </Link>
        </div>
      </section>

      {/* Framework Overview */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold text-center mb-4">The Framework</h2>
        <p className="text-center text-white/60 mb-12 max-w-2xl mx-auto">
          Three scores, ten criteria. A systematic approach to measuring what
          &quot;decentralization&quot; actually means.
        </p>

        {/* Formula */}
        <div className="text-center mb-12 p-6 rounded-xl bg-white/5 border border-white/10">
          <code className="text-lg font-mono text-white/80">
            TotalScore = 0.4 * Chain + 0.4 * Control + 0.2 * Fairness
          </code>
        </div>

        {/* Score Categories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ScoreSection
            category="chain"
            criteria={chainCriteria}
            color="blue"
          />
          <ScoreSection
            category="control"
            criteria={controlCriteria}
            color="purple"
          />
          <ScoreSection
            category="fairness"
            criteria={fairnessCriteria}
            color="green"
          />
        </div>
      </section>

      {/* Why This Matters */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold text-center mb-12">Why This Matters</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent>
              <h3 className="font-semibold text-white mb-2">Cut Through Marketing</h3>
              <p className="text-sm text-white/60">
                Every chain claims to be decentralized. This framework provides
                objective metrics to evaluate those claims.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <h3 className="font-semibold text-white mb-2">Understand Risks</h3>
              <p className="text-sm text-white/60">
                Centralization is a risk vector. Know where single points of
                failure exist before you invest or build.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <h3 className="font-semibold text-white mb-2">Track Progress</h3>
              <p className="text-sm text-white/60">
                Decentralization is a journey. Track how projects evolve over
                time with consistent measurement.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center py-16 px-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10">
        <h2 className="text-2xl font-bold mb-4">Ready to dig in?</h2>
        <p className="text-white/60 mb-8">
          Explore scored projects or calculate scores for new ones.
        </p>
        <Link
          href="/projects"
          className="px-8 py-3 bg-white text-black font-medium rounded-lg hover:bg-white/90 transition-colors"
        >
          Explore Projects
        </Link>
      </section>

      {/* Version Footer */}
      <footer className="mt-20 pt-8 border-t border-white/10 text-center">
        <p className="text-sm text-white/30 font-mono">v{version}</p>
      </footer>
    </div>
  );
}

function ScoreSection({
  category,
  criteria,
  color,
}: {
  category: 'chain' | 'control' | 'fairness';
  criteria: ReturnType<typeof getAllCriteria>;
  color: 'blue' | 'purple' | 'green';
}) {
  const { name, description } = CATEGORIES[category];
  const borderColors = {
    blue: 'border-blue-500/30',
    purple: 'border-purple-500/30',
    green: 'border-green-500/30',
  };
  const textColors = {
    blue: 'text-blue-400',
    purple: 'text-purple-400',
    green: 'text-green-400',
  };

  return (
    <Card className={borderColors[color]}>
      <CardHeader>
        <h3 className={`font-semibold ${textColors[color]}`}>{name}</h3>
        <p className="text-sm text-white/50">{description}</p>
      </CardHeader>
      <CardContent className="space-y-3">
        {criteria.map((c) => (
          <div key={c.id} className="flex items-start gap-3">
            <span className="flex-shrink-0 w-8 h-8 rounded bg-white/5 flex items-center justify-center text-xs font-mono text-white/60">
              {c.id}
            </span>
            <div>
              <p className="text-sm font-medium text-white">{c.name}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
