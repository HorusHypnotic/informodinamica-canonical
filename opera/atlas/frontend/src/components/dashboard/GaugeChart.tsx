interface GaugeChartProps {
  value: number;
  max?: number;
  target?: number;
  label: string;
  unit?: string;
  size?: number;
}

export function GaugeChart({ value, max = 100, target, label, unit = "%", size = 140 }: GaugeChartProps) {
  const percentage = Math.min((value / max) * 100, 100);
  const circumference = 2 * Math.PI * 52;
  const dashOffset = circumference - (percentage / 100) * circumference * 0.75;
  
  const color = target
    ? value <= target ? "hsl(var(--status-ok))" : value <= target * 1.5 ? "hsl(var(--status-warning))" : "hsl(var(--status-critical))"
    : "hsl(var(--primary))";

  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size * 0.85} viewBox="0 0 120 102" className="overflow-visible">
        {/* Background arc */}
        <path
          d="M 10 90 A 52 52 0 1 1 110 90"
          fill="none"
          stroke="hsl(var(--muted))"
          strokeWidth="10"
          strokeLinecap="round"
        />
        {/* Value arc */}
        <path
          d="M 10 90 A 52 52 0 1 1 110 90"
          fill="none"
          stroke={color}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={`${circumference * 0.75}`}
          strokeDashoffset={dashOffset}
          className="transition-all duration-1000 ease-out"
        />
        {/* Value text */}
        <text x="60" y="65" textAnchor="middle" className="fill-foreground text-2xl font-bold" fontSize="24">
          {value.toFixed(1)}
        </text>
        <text x="60" y="82" textAnchor="middle" className="fill-muted-foreground" fontSize="10">
          {unit}
        </text>
      </svg>
      <p className="text-xs text-muted-foreground mt-1 text-center">{label}</p>
      {target !== undefined && (
        <p className="text-xs text-muted-foreground">Meta: {target}{unit}</p>
      )}
    </div>
  );
}
