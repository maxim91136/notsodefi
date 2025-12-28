import { Card, CardContent, CardHeader } from '@/components/ui';
import { getAllCriteria } from '@/lib/framework';

export const metadata = {
  title: 'Methodology - NotSoDeFi.com',
  description: 'Why we score decentralization the way we do.',
};

export default function MethodologyPage() {
  const criteria = getAllCriteria();
  const chainCriteria = criteria.filter((c) => c.category === 'chain');
  const controlCriteria = criteria.filter((c) => c.category === 'control');
  const fairnessCriteria = criteria.filter((c) => c.category === 'fairness');

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Methodology</h1>
        <p className="text-white/60">
          The reasoning behind our scoring framework.
        </p>
      </div>

      {/* TL;DR */}
      <Card className="mb-8">
        <CardHeader>
          <h3 className="text-lg font-semibold">TL;DR</h3>
        </CardHeader>
        <CardContent className="space-y-2 text-white/80">
          <p><strong>Formula:</strong> TotalScore = 0.4 * Chain + 0.4 * Control + 0.2 * Fairness</p>
          <p><strong>Kill-Switch Cap:</strong> B5=0 caps total score at 1.0</p>
          <p><strong>Benchmark:</strong> Bitcoin is the reference for maximum decentralization</p>
        </CardContent>
      </Card>

      {/* Why 40/40/20 */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Why 40/40/20?</h2>
        <div className="space-y-4 text-white/80">
          <p>
            <strong>Chain Score (40%)</strong> measures technical decentralization - can the network
            survive attacks? This is fundamental: without a resilient network, nothing else matters.
          </p>
          <p>
            <strong>Control Score (40%)</strong> measures governance decentralization - who actually
            controls the protocol? A technically decentralized network means nothing if one entity
            can change the rules, halt the chain, or steal funds through upgrades.
          </p>
          <p>
            <strong>Fairness Score (20%)</strong> measures launch and distribution fairness. This
            matters less for ongoing decentralization but reflects the project&apos;s values and
            long-term incentive alignment. A 70% VC premine creates different dynamics than a fair launch.
          </p>
          <p className="text-white/60 italic">
            Chain and Control are equally weighted because both are necessary conditions for
            decentralization. Fairness is weighted lower because it&apos;s a one-time historical fact
            that affects but doesn&apos;t determine ongoing decentralization.
          </p>
        </div>
      </section>

      {/* Kill-Switch Cap */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Why Cap at 1.0 for Kill-Switches?</h2>
        <div className="space-y-4 text-white/80">
          <p>
            If a single entity can halt, freeze, or censor the chain (B5=0), the project is
            <strong> fundamentally not decentralized</strong> - regardless of how well it scores
            on other criteria.
          </p>
          <p>
            A project with excellent validator distribution, diverse clients, and fair launch
            is still centralized if one admin key can pause everything. The kill-switch is a
            binary property: either you have one or you don&apos;t.
          </p>
          <p>
            The 1.0 cap is harsh by design. It sends a clear message: <em>&quot;This project may
            have many good properties, but it cannot be considered decentralized.&quot;</em>
          </p>
          <p className="text-white/60 italic">
            We display the uncapped score for transparency, so users can see what the project
            would score without the penalty.
          </p>
        </div>
      </section>

      {/* Why These 12 Criteria */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Why These 12 Criteria?</h2>
        <div className="space-y-6 text-white/80">
          <p>
            We selected criteria that are <strong>measurable</strong>, <strong>meaningful</strong>,
            and <strong>resistant to gaming</strong>. Each criterion captures a distinct aspect of
            decentralization that cannot be easily faked.
          </p>

          <div>
            <h3 className="text-lg font-semibold text-blue-400 mb-2">Chain Score (A1-A4)</h3>
            <ul className="list-disc list-inside space-y-1 ml-2">
              {chainCriteria.map((c) => (
                <li key={c.id}>
                  <strong>{c.id}:</strong> {c.name} - {c.description.split('.')[0]}.
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-purple-400 mb-2">Control Score (B1-B6)</h3>
            <ul className="list-disc list-inside space-y-1 ml-2">
              {controlCriteria.map((c) => (
                <li key={c.id}>
                  <strong>{c.id}:</strong> {c.name} - {c.description.split('.')[0]}.
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-green-400 mb-2">Fairness Score (C1-C2)</h3>
            <ul className="list-disc list-inside space-y-1 ml-2">
              {fairnessCriteria.map((c) => (
                <li key={c.id}>
                  <strong>{c.id}:</strong> {c.name} - {c.description.split('.')[0]}.
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Bitcoin as Benchmark */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Bitcoin as Benchmark</h2>
        <div className="space-y-4 text-white/80">
          <p>
            Bitcoin is our reference point for maximum decentralization. Not because it&apos;s perfect,
            but because it&apos;s the oldest, most battle-tested example of a truly decentralized network.
          </p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>No premine, no VC allocation, no foundation treasury</li>
            <li>No single entity can halt or censor the network</li>
            <li>No fundamental protocol changes since 2009</li>
            <li>Satoshi disappeared - the project survives without its creator</li>
          </ul>
          <p className="text-white/60 italic">
            When evaluating any project, ask: &quot;How does this compare to Bitcoin?&quot;
          </p>
        </div>
      </section>

      {/* What We Don't Measure */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">What We Don&apos;t Measure</h2>
        <div className="space-y-4 text-white/80">
          <p>
            Decentralization is not the same as quality. We deliberately exclude:
          </p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li><strong>Price / Market Cap</strong> - Not a decentralization metric</li>
            <li><strong>TVL</strong> - Measures adoption, not decentralization</li>
            <li><strong>TPS / Performance</strong> - Often traded for centralization</li>
            <li><strong>User Experience</strong> - Orthogonal to decentralization</li>
            <li><strong>Team Reputation</strong> - Subjective and gameable</li>
          </ul>
          <p className="text-white/60 italic">
            A highly centralized project can be fast, cheap, and user-friendly.
            A decentralized project can be slow, expensive, and clunky.
            We measure decentralization, nothing else.
          </p>
        </div>
      </section>

      {/* Limitations */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Limitations</h2>
        <div className="space-y-4 text-white/80">
          <p>
            This framework is an approximation. Decentralization is a spectrum, not a binary.
            Some caveats:
          </p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Data is updated periodically - snapshots, not real-time</li>
            <li>Some criteria require manual assessment (brand ownership, governance dynamics)</li>
            <li>New attack vectors may emerge that our criteria don&apos;t capture</li>
            <li>Scores reflect current state, not trajectory or potential</li>
          </ul>
          <p className="text-white/60 italic">
            Use this as one input among many when evaluating projects.
            Not financial advice.
          </p>
        </div>
      </section>
    </div>
  );
}
