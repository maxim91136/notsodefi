import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader } from '@/components/ui';
import { getAllCriteria, CATEGORIES } from '@/lib/framework';
import { bitcoin } from '@/lib/data/projects/bitcoin';

export default function HomePage() {
  const criteria = getAllCriteria();
  const chainCriteria = criteria.filter((c) => c.category === 'chain');
  const controlCriteria = criteria.filter((c) => c.category === 'control');
  const fairnessCriteria = criteria.filter((c) => c.category === 'fairness');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Beta Notice - First thing visitors see */}
      <section className="mb-8">
        <div className="p-4 rounded-lg bg-yellow-500/15 border border-yellow-500/40 text-center">
          <p className="text-yellow-400 font-bold text-lg mb-1">
            🚧 BETA - Work in Progress
          </p>
          <p className="text-white/70 text-sm max-w-2xl mx-auto">
            Scores may contain errors. If you spot inaccuracies, please{' '}
            <a
              href="https://github.com/maxim91136/notsodefi/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="text-yellow-400 hover:text-yellow-300 underline font-medium"
            >
              open an issue
            </a>{' '}
            or submit a PR. Community contributions make this framework better.
          </p>
        </div>
      </section>

      {/* Bitcoin Benchmark */}
      <section className="mb-12">
        <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-orange-500/10 to-orange-500/0 border border-orange-500/20">
          <p className="text-orange-400/80 text-sm font-mono uppercase tracking-wider mb-4">The Benchmark</p>
          <div className="flex items-center justify-center gap-6 mb-4">
            <Image
              src="/bitcoin-logo.svg"
              alt="Bitcoin"
              width={64}
              height={64}
              className="flex-shrink-0"
            />
            <span className="text-5xl font-bold text-orange-400">{bitcoin.scores.totalScore}</span>
            <div className="text-left">
              <p className="text-2xl font-bold text-white">Bitcoin</p>
              <p className="text-white/50 text-sm">15+ years, no premine, no foundation, no kill-switch</p>
            </div>
          </div>
          <p className="text-white/40 text-sm max-w-xl mx-auto">
            Launched in 2009 without premine, VC funding, or foundation structure. Currently the highest-scoring project in this framework.
          </p>
        </div>
      </section>

      {/* Hero */}
      <section className="text-center mb-20">
        <Image
          src="/logo.jpg"
          alt="NotSoDeFi.com"
          width={500}
          height={400}
          className="mx-auto mb-6 rounded-xl"
          priority
        />
        <p className="text-lg text-white/50 max-w-3xl mx-auto mb-8">
          <span className="text-white/80 font-semibold">This framework measures decentralization across three dimensions:</span>{' '}
          consensus control, governance power, and fund distribution. Projects are scored based on whether single entities hold disproportionate influence in these areas.
        </p>

        {/* Core Principles */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-mono text-white/80">
            Verify the data
          </span>
          <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-mono text-white/80">
            Data-driven metrics
          </span>
          <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-mono text-white/80">
            Decentralization ≠ Price
          </span>
        </div>

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
          14 criteria across three categories. Projects with admin kill-switches are capped at 1.0.
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
              <h3 className="font-semibold text-white mb-2">Quantifiable Metrics</h3>
              <p className="text-sm text-white/60">
                14 criteria measuring validator concentration, token distribution,
                governance power, and corporate control.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <h3 className="font-semibold text-white mb-2">Concentration Data</h3>
              <p className="text-sm text-white/60">
                The framework surfaces concentration metrics. Users determine
                relevance for their own use cases.
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
        <h2 className="text-2xl font-bold mb-4">Explore the data.</h2>
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
