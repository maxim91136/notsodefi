'use client';

import { LineChart, Line, ResponsiveContainer } from 'recharts';

interface SparklineProps {
  data: number[];
  width?: number;
  height?: number;
  color?: string;
  showTrend?: boolean;
}

export function Sparkline({
  data,
  width = 60,
  height = 24,
  color,
  showTrend = true
}: SparklineProps) {
  if (!data || data.length < 2) {
    return <div className="w-[60px] h-6 flex items-center justify-center text-white/20 text-xs">—</div>;
  }

  const chartData = data.map((value, index) => ({ value, index }));
  const trend = data[data.length - 1] - data[0];

  const lineColor = color || (trend >= 0 ? '#22c55e' : '#ef4444');

  return (
    <div className="flex items-center gap-1">
      <div style={{ width, height }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <Line
              type="monotone"
              dataKey="value"
              stroke={lineColor}
              strokeWidth={1.5}
              dot={false}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      {showTrend && (
        <span className={`text-xs font-medium ${trend >= 0 ? 'text-green-500' : 'text-red-500'}`}>
          {trend >= 0 ? '↑' : '↓'}
        </span>
      )}
    </div>
  );
}
