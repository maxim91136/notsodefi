'use client';

import Link from 'next/link';

const redFlags = [
  {
    marketing: 'Community-driven',
    reality: 'Foundation entscheidet',
  },
  {
    marketing: 'Governance token',
    reality: 'Whale-Voting, keine echte Macht',
  },
  {
    marketing: 'Decentralized network',
    reality: 'Mehrere Server statt einer',
  },
  {
    marketing: 'Trustless',
    reality: 'Trust us instead',
  },
  {
    marketing: 'Permissionless',
    reality: '...außer für Validatoren',
  },
  {
    marketing: 'Open source',
    reality: 'Code offen, Kontrolle geschlossen',
  },
  {
    marketing: 'Progressive decentralization',
    reality: 'Vielleicht, irgendwann',
  },
  {
    marketing: 'Fair launch',
    reality: 'Insider wussten früher Bescheid',
  },
  {
    marketing: 'No premine',
    reality: 'VC-funded Team minte zuerst',
  },
  {
    marketing: 'Decentralized governance',
    reality: '10 Wallets entscheiden alles',
  },
  {
    marketing: 'Battle-tested',
    reality: 'Wurde noch nicht gehackt (öffentlich)',
  },
  {
    marketing: 'Immutable',
    reality: 'Bis wir upgraden müssen',
  },
  {
    marketing: 'Censorship-resistant',
    reality: 'Sequencer kann Transaktionen ignorieren',
  },
  {
    marketing: 'Decentralized stablecoin',
    reality: '40% USDC als Collateral',
  },
  {
    marketing: 'DAO-governed',
    reality: 'Plutokratie mit Extra-Schritten',
  },
  {
    marketing: 'Non-custodial',
    reality: 'Upgradeable Proxy Contract',
  },
  {
    marketing: 'Validator network',
    reality: '21 von der Foundation ausgewählt',
  },
  {
    marketing: 'Layer 2 solution',
    reality: 'Sidechain mit Ethereum-Logo',
  },
];

export default function RedFlagsPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <Link href="/" className="text-blue-400 hover:text-blue-300 text-sm">
          &larr; Back to Rankings
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-2">Red Flags im Marketing</h1>
      <p className="text-gray-400 mb-8">
        Was Crypto-Projekte sagen vs. was sie meinen. Ein Übersetzungsguide für Marketing-Bullshit.
      </p>

      <div className="bg-yellow-900/20 border border-yellow-700/50 rounded-lg p-4 mb-8">
        <p className="text-yellow-200 text-sm">
          <strong>Disclaimer:</strong> Satire mit Wahrheitskern. Nicht alle Projekte sind gleich -
          aber diese Phrasen sollten immer kritisch hinterfragt werden.
          Überprüfe die Fakten auf unserer{' '}
          <Link href="/projects" className="underline hover:text-yellow-100">
            Projektseite
          </Link>.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="text-left py-4 px-4 text-gray-400 font-medium">
                Wenn ein Projekt sagt...
              </th>
              <th className="text-left py-4 px-4 text-gray-400 font-medium">
                ...bedeutet es oft:
              </th>
            </tr>
          </thead>
          <tbody>
            {redFlags.map((flag, index) => (
              <tr
                key={index}
                className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors"
              >
                <td className="py-4 px-4">
                  <span className="text-green-400 font-mono">&quot;{flag.marketing}&quot;</span>
                </td>
                <td className="py-4 px-4">
                  <span className="text-red-400">{flag.reality}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-12 p-6 bg-gray-800/50 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Wie man Marketing-Claims überprüft</h2>
        <ul className="space-y-3 text-gray-300">
          <li className="flex items-start gap-2">
            <span className="text-blue-400">1.</span>
            <span><strong>Nakamoto Coefficient prüfen:</strong> Wie viele Entitäten könnten das Netzwerk stoppen?</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-400">2.</span>
            <span><strong>Token-Verteilung:</strong> Wer hält wie viel? Wer hatte Zugang vor dem Launch?</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-400">3.</span>
            <span><strong>Upgrade-Mechanismus:</strong> Kann jemand die Regeln ändern? Wer?</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-400">4.</span>
            <span><strong>Kill-Switch:</strong> Kann das Netzwerk gestoppt werden? Von wem?</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-400">5.</span>
            <span><strong>Founder-Zitate lesen:</strong> Was sagen sie, wenn sie ehrlich sind?</span>
          </li>
        </ul>
      </div>

      <div className="mt-8 text-center text-gray-500 text-sm">
        <p>
          Kennst du weitere Red Flags?{' '}
          <a
            href="https://github.com/maxim91136/notsodefi"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300"
          >
            Pull Request auf GitHub
          </a>
        </p>
      </div>
    </div>
  );
}
