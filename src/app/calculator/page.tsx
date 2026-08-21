'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, ScoreRing } from '@/components/ui';
import {
  getAllCriteria,
  getCriteriaByCategory,
  calculateProjectScores,
  CATEGORIES,
} from '@/lib/framework';
import { getScoreTextColor } from '@/lib/utils';

export default function CalculatorPage() {
  const [values, setValues] = useState<Record<string, number>>({});

  const chainCriteria = getCriteriaByCategory('chain');
  const controlCriteria = getCriteriaByCategory('control');
  const fairnessCriteria = getCriteriaByCategory('fairness');

  const handleChange = (id: string, value: number) => {
    setValues((prev) => ({ ...prev, [id]: value }));
  };

  const scores = calculateProjectScores(values);
  const hasAnyValue = Object.keys(values).length > 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <Link href="/" className="text-blue-400 hover:text-blue-300 text-sm">
          &larr; Home
        </Link>
      </div>

      <h1 className="text-4xl font-bold mb-4">Score Calculator</h1>
      <p className="text-white/60 max-w-2xl mb-8">
        Enter raw values for each criterion to calculate decentralization
        scores. Scores update in real-time.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Input Forms */}
        <div className="lg:col-span-3 space-y-6">
          <CriteriaForm
            title="Chain Score"
            description={CATEGORIES.chain.description}
            criteria={chainCriteria}
            values={values}
            onChange={handleChange}
            color="blue"
          />
          <CriteriaForm
            title="Control Score"
            description={CATEGORIES.control.description}
            criteria={controlCriteria}
            values={values}
            onChange={handleChange}
            color="purple"
          />
          <CriteriaForm
            title="Fairness Score"
            description={CATEGORIES.fairness.description}
            criteria={fairnessCriteria}
            values={values}
            onChange={handleChange}
            color="green"
          />
        </div>

        {/* Results Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <Card>
              <CardHeader>
                <h2 className="font-semibold text-white">Results</h2>
              </CardHeader>
              <CardContent className="space-y-6">
                {hasAnyValue ? (
                  <>
                    <div className="flex justify-center">
                      <ScoreRing
                        score={scores.totalScore}
                        size="lg"
                        label="Total Score"
                      />
                    </div>
                    <div className="space-y-3">
                      <ScoreRow label="Chain" score={scores.chainScore} color="blue" />
                      <ScoreRow
                        label="Control"
                        score={scores.controlScore}
                        color="purple"
                      />
                      <ScoreRow
                        label="Fairness"
                        score={scores.fairnessScore}
                        color="green"
                      />
                    </div>
                    <div className="pt-4 border-t border-white/10">
                      <p className="text-xs text-white/40 text-center">
                        0.4 * Chain + 0.4 * Control + 0.2 * Fairness
                      </p>
                    </div>
                  </>
                ) : (
                  <p className="text-sm text-white/40 text-center py-8">
                    Enter values to see scores
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

function CriteriaForm({
  title,
  description,
  criteria,
  values,
  onChange,
  color,
}: {
  title: string;
  description: string;
  criteria: ReturnType<typeof getAllCriteria>;
  values: Record<string, number>;
  onChange: (id: string, value: number) => void;
  color: 'blue' | 'purple' | 'green';
}) {
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
        <h2 className={`font-semibold ${textColors[color]}`}>{title}</h2>
        <p className="text-sm text-white/50">{description}</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {criteria.map((criterion) => (
          <div key={criterion.id} className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-white/50 bg-white/5 px-2 py-0.5 rounded">
                {criterion.id}
              </span>
              <label className="font-medium text-white">{criterion.name}</label>
            </div>
            <p className="text-sm text-white/50">{criterion.description}</p>
            <div className="flex items-center gap-4">
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  max={criterion.mappings[criterion.mappings.length - 1]?.max ?? 100}
                  step="1"
                  value={values[criterion.id] ?? ''}
                  onChange={(e) => {
                    const val = parseFloat(e.target.value);
                    if (!isNaN(val) && val >= 0) {
                      onChange(criterion.id, val);
                    } else if (e.target.value === '') {
                      onChange(criterion.id, 0);
                    }
                  }}
                  className={`w-24 px-3 py-2 bg-white/5 border rounded-lg text-white focus:outline-none ${
                    values[criterion.id] !== undefined && values[criterion.id] < 0
                      ? 'border-red-500/50 focus:border-red-500'
                      : 'border-white/10 focus:border-white/30'
                  }`}
                  placeholder="Value"
                />
              </div>
              <div className="flex-1 text-xs text-white/40">
                {criterion.mappings.map((m, i) => (
                  <span key={i} className="mr-4">
                    {m.label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

function ScoreRow({
  label,
  score,
  color,
}: {
  label: string;
  score: number;
  color: 'blue' | 'purple' | 'green';
}) {
  const textColors = {
    blue: 'text-blue-400',
    purple: 'text-purple-400',
    green: 'text-green-400',
  };

  return (
    <div className="flex items-center justify-between">
      <span className={`text-sm ${textColors[color]}`}>{label}</span>
      <span className={`font-bold ${getScoreTextColor(score)}`}>
        {score.toFixed(1)}
      </span>
    </div>
  );
}
