'use client';

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

  const trend = data[data.length - 1] - data[0];

  // Threshold: ±0.1 score points = sideways, otherwise up/down
  const THRESHOLD = 0.1;
  const trendDirection = trend > THRESHOLD ? 'up' : trend < -THRESHOLD ? 'down' : 'sideways';
  const lineColor = color || (trendDirection === 'up' ? '#22c55e' : trendDirection === 'down' ? '#ef4444' : '#6b7280');

  // Calculate SVG path
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1; // Prevent division by zero

  // Add padding to prevent line from touching edges
  const padding = 2;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;

  const points = data.map((value, index) => {
    const x = padding + (index / (data.length - 1)) * chartWidth;
    const y = padding + chartHeight - ((value - min) / range) * chartHeight;
    return `${x},${y}`;
  });

  const pathD = `M ${points.join(' L ')}`;

  return (
    <div className="flex items-center gap-1">
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        className="overflow-visible"
      >
        <path
          d={pathD}
          fill="none"
          stroke={lineColor}
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {showTrend && (
        <span className={`text-xs font-medium ${
          trendDirection === 'up' ? 'text-green-500' :
          trendDirection === 'down' ? 'text-red-500' : 'text-gray-500'
        }`}>
          {trendDirection === 'up' ? '↑' : trendDirection === 'down' ? '↓' : '→'}
        </span>
      )}
    </div>
  );
}
