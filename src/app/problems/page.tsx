import Link from 'next/link';
import { Card, CardContent, CardHeader } from '@/components/ui';

export const metadata = {
  title: 'Known Problems - NotSoDeFi.com',
  description: 'Known problems in blockchain systems and their trade-offs.',
};

export default function ProblemsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <Link href="/" className="text-blue-400 hover:text-blue-300 text-sm">
          &larr; Home
        </Link>
      </div>

      <h1 className="text-4xl font-bold mb-4">Known Problems</h1>
      <p className="text-white/60 mb-8">
        Honest analysis of blockchain limitations and trade-offs.
      </p>

      {/* The Trilemma */}
      <Card className="mb-8 border-yellow-500/30 bg-yellow-500/5">
        <CardHeader>
          <h3 className="text-lg font-semibold text-yellow-400">The Blockchain Trilemma</h3>
        </CardHeader>
        <CardContent className="space-y-4 text-white/80">
          <div className="flex justify-center">
            <div className="text-center">
              <div className="flex justify-center gap-8 mb-4">
                <span className="px-3 py-1 rounded bg-blue-500/20 text-blue-400 font-mono text-sm">Scalability</span>
                <span className="px-3 py-1 rounded bg-green-500/20 text-green-400 font-mono text-sm">Security</span>
                <span className="px-3 py-1 rounded bg-purple-500/20 text-purple-400 font-mono text-sm">Decentralization</span>
              </div>
              <p className="text-white/60 text-sm italic">Pick two. Optimizing for all three simultaneously remains unsolved.</p>
            </div>
          </div>
          <p className="text-sm">
            Every blockchain makes trade-offs between these three properties. High throughput often requires fewer validators.
            Strong decentralization typically limits transaction speed. Security guarantees come at computational cost.
          </p>
        </CardContent>
      </Card>

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
            This page documents known problems in blockchain systems and discusses possible solutions.
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
              Shor&apos;s algorithm breaks elliptic curve cryptography (ECDSA, Schnorr).
              Grover&apos;s algorithm weakens hash functions quadratically.
              Signatures are the critical vulnerability - not hashes.
            </p>
          </div>
          <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
            <h4 className="font-semibold text-green-400 mb-2">Possible Approach</h4>
            <p className="text-sm">
              Post-quantum signatures (SPHINCS+, Dilithium, FALCON).
              SHA3-512 for hash functions. Lattice-based cryptography for key exchange.
            </p>
          </div>
          <p className="text-white/60 italic text-sm">
            <strong>Honest limitation:</strong> Current estimates give decades of buffer.
            But estimates have been wrong before. Migration is complex.
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

      {/* 8. Liquid Staking Centralization */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">8. Liquid Staking Centralization</h2>
        <div className="space-y-4 text-white/80">
          <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
            <h4 className="font-semibold text-red-400 mb-2">Problem</h4>
            <p className="text-sm">
              Liquid staking protocols concentrate stake. Lido controls ~30% of staked ETH.
              Users delegate for convenience, creating new centralization vectors in PoS systems.
            </p>
          </div>
          <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
            <h4 className="font-semibold text-green-400 mb-2">Possible Approach</h4>
            <p className="text-sm">
              Self-limiting mechanisms. Stake caps. Distributed validator technology (DVT).
              Protocol-level incentives against concentration.
            </p>
          </div>
          <p className="text-white/60 italic text-sm">
            <strong>Honest limitation:</strong> Convenience wins. Users prefer liquid tokens over locked stake.
            Market forces favor concentration.
          </p>
        </div>
      </section>

      {/* 9. MEV (Maximal Extractable Value) */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">9. MEV (Maximal Extractable Value)</h2>
        <div className="space-y-4 text-white/80">
          <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
            <h4 className="font-semibold text-red-400 mb-2">Problem</h4>
            <p className="text-sm">
              Block producers extract value by reordering transactions.
              Sophisticated actors centralize block building. Creates validator centralization pressure.
            </p>
          </div>
          <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
            <h4 className="font-semibold text-green-400 mb-2">Possible Approach</h4>
            <p className="text-sm">
              Proposer-Builder Separation (PBS). Encrypted mempools. Fair ordering protocols.
              MEV redistribution to users.
            </p>
          </div>
          <p className="text-white/60 italic text-sm">
            <strong>Honest limitation:</strong> MEV is inherent to ordering transactions.
            Solutions redistribute or obscure it, but don&apos;t eliminate it.
          </p>
        </div>
      </section>

      {/* 10. Geographic Centralization */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">10. Geographic Centralization</h2>
        <div className="space-y-4 text-white/80">
          <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
            <h4 className="font-semibold text-red-400 mb-2">Problem</h4>
            <p className="text-sm">
              Nodes, miners, and validators concentrate in specific jurisdictions.
              China mining ban (2021) showed regulatory risk. Single-country concentration enables coordinated shutdown.
            </p>
          </div>
          <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
            <h4 className="font-semibold text-green-400 mb-2">Possible Approach</h4>
            <p className="text-sm">
              Incentivize geographic distribution. Penalize concentration.
              Make node operation accessible in more jurisdictions.
            </p>
          </div>
          <p className="text-white/60 italic text-sm">
            <strong>Honest limitation:</strong> Cheap electricity and friendly regulation attract concentration.
            Market forces work against distribution.
          </p>
        </div>
      </section>

      {/* 11. RPC/Infrastructure Centralization */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">11. RPC/Infrastructure Centralization</h2>
        <div className="space-y-4 text-white/80">
          <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
            <h4 className="font-semibold text-red-400 mb-2">Problem</h4>
            <p className="text-sm">
              Most users access blockchains through centralized RPC providers (Infura, Alchemy).
              Few run their own nodes. Creates single points of failure and censorship vectors.
            </p>
          </div>
          <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
            <h4 className="font-semibold text-green-400 mb-2">Possible Approach</h4>
            <p className="text-sm">
              Light clients. Decentralized RPC networks. Make node operation easier.
              Reduce hardware requirements for verification.
            </p>
          </div>
          <p className="text-white/60 italic text-sm">
            <strong>Honest limitation:</strong> Running nodes is inconvenient.
            Centralized services offer better UX. Convenience wins.
          </p>
        </div>
      </section>

      {/* 12. Oracle Centralization */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">12. Oracle Centralization</h2>
        <div className="space-y-4 text-white/80">
          <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
            <h4 className="font-semibold text-red-400 mb-2">Problem</h4>
            <p className="text-sm">
              Smart contracts need external data. Chainlink dominates oracle infrastructure.
              Oracle failure = DeFi failure. Single provider creates systemic risk.
            </p>
          </div>
          <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
            <h4 className="font-semibold text-green-400 mb-2">Possible Approach</h4>
            <p className="text-sm">
              Multiple oracle sources. On-chain price discovery (AMM-based).
              Decentralized oracle networks with economic guarantees.
            </p>
          </div>
          <p className="text-white/60 italic text-sm">
            <strong>Honest limitation:</strong> External data is inherently trust-dependent.
            The oracle problem has no perfect solution.
          </p>
        </div>
      </section>

      {/* 13. Social Layer Attacks */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">13. Social Layer Attacks</h2>
        <div className="space-y-4 text-white/80">
          <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
            <h4 className="font-semibold text-red-400 mb-2">Problem</h4>
            <p className="text-sm">
              Governance capture through social engineering. Influencer manipulation.
              Community splits (BTC/BCH, ETH/ETC). Coordinated narrative attacks.
            </p>
          </div>
          <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
            <h4 className="font-semibold text-green-400 mb-2">Possible Approach</h4>
            <p className="text-sm">
              Minimize governance surface. Protocol rules over social consensus.
              Reduce attack surface by reducing decisions that require coordination.
            </p>
          </div>
          <p className="text-white/60 italic text-sm">
            <strong>Honest limitation:</strong> Humans run the systems.
            Social attacks are always possible. The goal is resilience, not immunity.
          </p>
        </div>
      </section>

      {/* 14. Collateral Contagion */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">14. Collateral Contagion</h2>
        <div className="space-y-4 text-white/80">
          <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
            <h4 className="font-semibold text-red-400 mb-2">Problem</h4>
            <p className="text-sm">
              &quot;Decentralized&quot; protocols inherit centralization from their collateral.
              DAI is ~40% backed by USDC. Circle freezes USDC → DAI destabilizes.
              Wrapped assets (WBTC, WETH) depend on custodians.
            </p>
          </div>
          <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
            <h4 className="font-semibold text-green-400 mb-2">Possible Approach</h4>
            <p className="text-sm">
              Native collateral only (ETH, not USDC). Diversified collateral baskets.
              Transparent collateral composition. Risk-weighted scoring.
            </p>
          </div>
          <p className="text-white/60 italic text-sm">
            <strong>Honest limitation:</strong> Users want stability and liquidity.
            Centralized collateral is often more liquid. Market pressure favors convenience over purity.
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
