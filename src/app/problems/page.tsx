import { Card, CardContent, CardHeader } from '@/components/ui';

export const metadata = {
  title: 'Known Problems - NotSoDeFi.com',
  description: 'Known problems in blockchain systems and their trade-offs. No hype, just honest analysis.',
};

export default function ProblemsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Known Problems</h1>
        <p className="text-white/60">
          Honest analysis of blockchain limitations and trade-offs.
        </p>
      </div>

      {/* Introduction */}
      <Card className="mb-8">
        <CardHeader>
          <h3 className="text-lg font-semibold">No System Is Perfect</h3>
        </CardHeader>
        <CardContent className="space-y-3 text-white/80">
          <p>
            Decentralization is an ideal that will likely never be fully achieved. Every system has trade-offs.
            The question is not &quot;Is it perfect?&quot; but &quot;Are the problems known and honestly communicated?&quot;
          </p>
          <p className="text-white/60 italic">
            This page documents known problems in blockchain systems and discusses possible solutions - without illusions.
          </p>
        </CardContent>
      </Card>

      {/* 1. Development Centralization */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">1. Development Centralization</h2>
        <div className="space-y-4 text-white/80">
          <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
            <h4 className="font-semibold text-red-400 mb-2">Problem</h4>
            <p className="text-sm">
              Few maintainers control code changes. They set rules, review code, decide what gets merged.
              Often funded by a handful of organizations.
            </p>
          </div>
          <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
            <h4 className="font-semibold text-green-400 mb-2">Possible Approach</h4>
            <p className="text-sm">
              Protocol rules instead of human governance. Mathematical constraints that apply automatically.
              No votes, no gatekeepers.
            </p>
          </div>
          <p className="text-white/60 italic text-sm">
            <strong>Honest limitation:</strong> Someone has to write the initial code. Someone sets checkpoints.
            Complete development decentralization is probably impossible. The goal is minimization, not elimination.
          </p>
        </div>
      </section>

      {/* 2. Mining Pool Centralization */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">2. Mining Pool Centralization</h2>
        <div className="space-y-4 text-white/80">
          <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
            <h4 className="font-semibold text-red-400 mb-2">Problem</h4>
            <p className="text-sm">
              Extreme variance in solo mining. A solo miner in large networks waits years for a block.
              This drives miners into pools. Pools centralize the network.
            </p>
          </div>
          <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
            <h4 className="font-semibold text-green-400 mb-2">Possible Approach</h4>
            <p className="text-sm">
              Share-based mining in the protocol. Rewards proportional to all who prove work - not just block finders.
              A decentralized pool directly in the protocol. Result: Small rewards regularly instead of large rewards rarely.
            </p>
          </div>
          <p className="text-white/60 italic text-sm">
            <strong>Honest limitation:</strong> Shifts the problem, doesn&apos;t solve it completely.
            The question becomes &quot;Who controls hashrate?&quot; instead of &quot;Who controls pools?&quot;
          </p>
        </div>
      </section>

      {/* 3. Hardware Centralization */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">3. Hardware Centralization</h2>
        <div className="space-y-4 text-white/80">
          <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
            <h4 className="font-semibold text-red-400 mb-2">Problem</h4>
            <p className="text-sm">
              Specialized hardware (ASICs) displaces normal users. Whoever controls chip production controls mining.
            </p>
          </div>
          <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
            <h4 className="font-semibold text-green-400 mb-2">Possible Approach</h4>
            <p className="text-sm">
              Dynamic memory scaling. Memory requirements increase automatically over time.
              Specialized hardware becomes obsolete after months. Consumer hardware remains usable.
            </p>
          </div>
          <p className="text-white/60 italic text-sm">
            <strong>Honest limitation:</strong> Every profitable activity attracts specialization.
            The goal is not &quot;no ASICs&quot; but &quot;ASICs have no lasting advantage&quot;.
            GPU mining remains possible. Specialization will come - it just becomes expensive and short-lived.
          </p>
        </div>
      </section>

      {/* 4. Long-Term Security Funding */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">4. Long-Term Security Funding</h2>
        <div className="space-y-4 text-white/80">
          <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
            <h4 className="font-semibold text-red-400 mb-2">Problem</h4>
            <p className="text-sm">
              Block rewards halve toward zero. Long-term security then depends on transaction fees -
              unpredictable, possibly insufficient.
            </p>
          </div>
          <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
            <h4 className="font-semibold text-green-400 mb-2">Possible Approach</h4>
            <p className="text-sm">
              Tail emission. After the regular emission phase, a minimal, perpetual reward.
              Guarantees miner incentives without dependence on fee volatility.
            </p>
          </div>
          <p className="text-white/60 italic text-sm">
            <strong>Honest limitation:</strong> No hard cap anymore.
            Trade-off between absolute scarcity and long-term security.
          </p>
        </div>
      </section>

      {/* 5. Quantum Vulnerability */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">5. Quantum Vulnerability</h2>
        <div className="space-y-4 text-white/80">
          <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
            <h4 className="font-semibold text-red-400 mb-2">Problem</h4>
            <p className="text-sm">
              Common hash algorithms offer limited security against quantum computers.
            </p>
          </div>
          <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
            <h4 className="font-semibold text-green-400 mb-2">Possible Approach</h4>
            <p className="text-sm">
              Post-quantum hash algorithms like SHA3-512. Higher Grover resistance.
            </p>
          </div>
          <p className="text-white/60 italic text-sm">
            <strong>Honest limitation:</strong> Current estimates give decades of buffer.
            But estimates have been wrong before.
          </p>
        </div>
      </section>

      {/* 6. Reorg/Double-Spend Attacks */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">6. Reorg &amp; Double-Spend Attacks</h2>
        <div className="space-y-4 text-white/80">
          <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
            <h4 className="font-semibold text-red-400 mb-2">Problem</h4>
            <p className="text-sm">
              Chain reorganizations enable double-spends. Only probabilistic security.
            </p>
          </div>
          <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
            <h4 className="font-semibold text-green-400 mb-2">Possible Approaches</h4>
            <ul className="list-disc list-inside space-y-1 text-sm mt-2">
              <li><strong>Reward Vesting:</strong> Rewards locked over time. On reorg, attacker loses unvested rewards.</li>
              <li><strong>Reorg Penalty:</strong> Quadratically scaling costs for deep reorgs.</li>
              <li><strong>Absolute Finality:</strong> After X time, nodes reject reorgs.</li>
            </ul>
          </div>
          <p className="text-white/60 italic text-sm">
            <strong>Honest limitation:</strong> 51% attacks still win. Math can only make them expensive, not prevent them.
            Absolute finality means: Long network partitions split the chain permanently. That&apos;s a trade-off, not a bug.
          </p>
        </div>
      </section>

      {/* 7. Funding Dependency */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">7. Funding Dependency</h2>
        <div className="space-y-4 text-white/80">
          <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
            <h4 className="font-semibold text-red-400 mb-2">Problem</h4>
            <p className="text-sm">
              Development is funded by few organizations. Indirect influence is inevitable.
            </p>
          </div>
          <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
            <h4 className="font-semibold text-green-400 mb-2">Possible Approach</h4>
            <p className="text-sm">
              Diversified funding structures. No single organization should dominate.
            </p>
          </div>
          <p className="text-white/60 italic text-sm">
            <strong>Honest limitation:</strong> Someone has to pay. The only question is who and under what conditions.
          </p>
        </div>
      </section>

      {/* Conclusion */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Conclusion</h3>
        </CardHeader>
        <CardContent className="text-white/80">
          <p>
            Perfect decentralization does not exist. Every solution creates new trade-offs.
            The difference between good and bad systems is not perfection - but honesty about their own limitations.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
