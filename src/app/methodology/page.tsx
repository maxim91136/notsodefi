import Link from 'next/link';
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
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <Link href="/" className="text-blue-400 hover:text-blue-300 text-sm">
          &larr; Home
        </Link>
      </div>

      <h1 className="text-4xl font-bold mb-4">Methodology</h1>
      <p className="text-white/60 mb-8">
        The reasoning behind our scoring framework.
      </p>

      {/* Summary */}
      <Card className="mb-8">
        <CardHeader>
          <h3 className="text-lg font-semibold">Summary</h3>
        </CardHeader>
        <CardContent className="space-y-2 text-white/80">
          <p><strong>Formula:</strong> TotalScore = 0.4 * Chain + 0.4 * Control + 0.2 * Fairness</p>
          <p><strong>Kill-Switch Cap:</strong> B5=0 caps total score at 1.0</p>
          <p><strong>Current #1:</strong> Bitcoin scores highest in our framework</p>
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
            The 1.0 cap reflects this binary property. Projects with halt capability receive the
            minimum score regardless of other criteria.
          </p>
          <p className="text-white/60 italic">
            We display the uncapped score for transparency, so users can see what the project
            would score without the penalty.
          </p>
        </div>
      </section>

      {/* Why These 14 Criteria */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Why These 14 Criteria?</h2>
        <div className="space-y-6 text-white/80">
          <p>
            We selected criteria that are <strong>measurable</strong>, <strong>meaningful</strong>,
            and <strong>resistant to gaming</strong>. Each criterion captures a distinct aspect of
            decentralization that cannot be easily faked.
          </p>

          <div>
            <h3 className="text-lg font-semibold text-blue-400 mb-2">Chain Score (A1-A5)</h3>
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
            <h3 className="text-lg font-semibold text-green-400 mb-2">Fairness Score (C1-C3)</h3>
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

      {/* Scoring Rubric */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Scoring Rubric</h2>
        <div className="space-y-6 text-white/80">
          <p>
            Each criterion is scored 0-10. Within each category, all criteria are
            <strong> equally weighted</strong>. Here&apos;s what the scores mean:
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left py-2 pr-4">Score</th>
                  <th className="text-left py-2">Meaning</th>
                </tr>
              </thead>
              <tbody className="text-white/70">
                <tr className="border-b border-white/10">
                  <td className="py-2 pr-4 font-mono text-red-400">0</td>
                  <td>Fully centralized / Single point of failure</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-2 pr-4 font-mono text-orange-400">1-3</td>
                  <td>Highly centralized / Few entities dominate</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-2 pr-4 font-mono text-yellow-400">4-6</td>
                  <td>Moderately decentralized / Some concentration</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-2 pr-4 font-mono text-green-400">7-9</td>
                  <td>Highly decentralized / Well distributed</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4 font-mono text-emerald-400">10</td>
                  <td>Maximum decentralization / No single point of control</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-6 space-y-4">
            <h3 className="text-lg font-semibold">Category Weights</h3>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li><strong>Chain Score:</strong> A1-A5 equally weighted (each 20% of Chain Score)</li>
              <li><strong>Control Score:</strong> B1-B6 equally weighted (each ~16.7% of Control Score)</li>
              <li><strong>Fairness Score:</strong> C1-C3 equally weighted (each ~33.3% of Fairness Score)</li>
            </ul>
            <p className="text-white/60 italic">
              N/A values (criteria that don&apos;t apply to a consensus type) are excluded from the average.
            </p>
          </div>

          <div className="mt-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
            <h4 className="font-semibold text-blue-400 mb-2">Example Calculation</h4>
            <p className="text-sm">
              Project with Chain=7.5, Control=6.0, Fairness=8.0:<br />
              <code className="text-white/90">TotalScore = 0.4 × 7.5 + 0.4 × 6.0 + 0.2 × 8.0 = 3.0 + 2.4 + 1.6 = 7.0</code>
            </p>
          </div>
        </div>
      </section>

      {/* Highest Scoring Project */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Highest Scoring Project</h2>
        <div className="space-y-4 text-white/80">
          <p>
            Bitcoin currently scores highest in this framework. This is an outcome of the criteria,
            not a predetermined choice. Key characteristics that contribute to its score:
          </p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>No premine, no VC allocation, no foundation treasury (C1, C2)</li>
            <li>No documented halt or censorship capability (B5)</li>
            <li>Limited protocol changes since launch (B6)</li>
            <li>Project continuity after founder departure</li>
          </ul>
          <p className="text-white/60 italic">
            Other projects may score higher as they evolve or as framework criteria are refined.
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
            This framework focuses on decentralization metrics only.
            Other factors may be relevant for different use cases.
          </p>
        </div>
      </section>

      {/* Data Sources & Objectivity */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Data Sources &amp; Objectivity</h2>
        <div className="space-y-4 text-white/80">
          <p>
            We measure what&apos;s measurable and document transparently where judgment is required.
            Each criterion falls into one of two categories:
          </p>

          <div className="space-y-6 mt-6">
            {/* Chain Score - API Integration Planned */}
            <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
              <h3 className="text-lg font-semibold text-blue-400 mb-3">Chain Score (A1-A5) - API Integration Planned</h3>
              <p className="text-sm text-white/60 mb-3">
                Currently manual assessment. API automation in development.
              </p>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li><strong>A1</strong> - Nakamoto Coefficient - Target: nakaflow.io API</li>
                <li><strong>A2</strong> - Validator concentration - Target: chain-specific APIs</li>
                <li><strong>A3</strong> - Client independence - Target: node explorer APIs</li>
                <li><strong>A4</strong> - Hosting distribution - Target: bitnodes, datacenter analysis</li>
                <li><strong>A5</strong> - Full node count - Target: bitnodes.io, ethernodes.org, monero.fail</li>
              </ul>
            </div>

            {/* Control Score - Expert Assessment */}
            <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
              <h3 className="text-lg font-semibold text-yellow-400 mb-3">Control Score (B1-B6) - Expert Assessment</h3>
              <p className="text-sm text-white/60 mb-3">
                Requires human judgment. No API can determine if a foundation can halt a chain.
                Each assessment is documented with sources and reasoning.
              </p>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li><strong>B1</strong> - Corporate/Foundation capture - Who controls roadmap, hiring, marketing?</li>
                <li><strong>B2</strong> - Repo ownership - GitHub contributor analysis, merge rights distribution</li>
                <li><strong>B3</strong> - Brand &amp; frontend control - Domain ownership, official apps, alternatives</li>
                <li><strong>B4</strong> - Treasury/upgrade keys - Multisig composition, signer independence</li>
                <li><strong>B5</strong> - Admin halt capability - Can anyone pause/freeze the chain?</li>
                <li><strong>B6</strong> - Protocol change history - Fundamental rule changes since launch</li>
              </ul>
            </div>

            {/* Fairness Score */}
            <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/20">
              <h3 className="text-lg font-semibold text-purple-400 mb-3">Fairness Score (C1-C3) - Mixed</h3>
              <p className="text-sm text-white/60 mb-3">
                Historical and current distribution data. Verifiable from tokenomics sources.
              </p>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li><strong>C1</strong> - Premine % - Historical, verifiable (Messari, docs, blockchain explorers)</li>
                <li><strong>C2</strong> - Token concentration - Current insider holdings (on-chain data, Etherscan, etc.)</li>
                <li><strong>C3</strong> - Governance control - Voting power distribution (Snapshot, governance dashboards)</li>
              </ul>
            </div>

            {/* N/A Values */}
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h3 className="text-lg font-semibold text-white/80 mb-3">N/A Values</h3>
              <p className="text-sm text-white/60">
                N/A values indicate genuine absence of a centralization vector (e.g., Bitcoin has no
                treasury because there is no foundation). Projects cannot score poorly on metrics that
                don&apos;t apply to them - this is intentional, as absence of control structures is
                itself a form of decentralization.
              </p>
            </div>
          </div>

          <p className="mt-6">
            For expert assessments, each value includes:
          </p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Source links with dates</li>
            <li>Reasoning for the specific score</li>
            <li>Known limitations or caveats</li>
            <li>Full documentation in the{' '}
              <a
                href="https://github.com/maxim91136/notsodefi/tree/main/src/lib/data/projects"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 underline"
              >
                project source files
              </a>
            </li>
          </ul>

          <p className="text-white/60 italic mt-4">
            No API can tell you if a foundation can halt a chain or if a team controls the brand.
            These require judgment - but that judgment is documented, sourced, and open to challenge.
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
