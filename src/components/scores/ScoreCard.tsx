'use client';

import { Card, CardContent } from '@/components/ui';
import { ScoreRing } from '@/components/ui';
import { CATEGORIES, Category } from '@/lib/framework';

interface ScoreCardProps {
  category: Category;
  score: number;
}

export function ScoreCard({ category, score }: ScoreCardProps) {
  const { name, description, color } = CATEGORIES[category];

  const colorClasses = {
    blue: 'border-blue-500/30',
    purple: 'border-purple-500/30',
    green: 'border-green-500/30',
  };

  return (
    <Card className={`${colorClasses[color]} hover:border-opacity-50 transition-colors`}>
      <CardContent className="flex flex-col items-center text-center">
        <ScoreRing score={score} size="md" showLabel={false} />
        <h3 className="mt-4 font-semibold text-white">{name}</h3>
        <p className="mt-1 text-sm text-white/50">{description}</p>
      </CardContent>
    </Card>
  );
}
