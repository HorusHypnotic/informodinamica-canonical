import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from "recharts";
import { OperaScoreBreakdown } from "@/analytics/operaScore";

interface OperaRadarChartProps {
  score: OperaScoreBreakdown;
}

export function OperaRadarChart({ score }: OperaRadarChartProps) {
  const data = [
    { pilar: "Organização", value: (score.organizacao / 20) * 100, fullMark: 100 },
    { pilar: "Padronização", value: (score.padronizacao / 20) * 100, fullMark: 100 },
    { pilar: "Eficiência", value: (score.eficiencia / 20) * 100, fullMark: 100 },
    { pilar: "Red. Perdas", value: (score.reducaoPerdas / 20) * 100, fullMark: 100 },
    { pilar: "Análise", value: (score.analiseContinua / 20) * 100, fullMark: 100 },
  ];

  return (
    <div className="glass-card p-4">
      <h3 className="text-sm font-semibold mb-2 text-center">Radar O.P.E.R.A.</h3>
      <ResponsiveContainer width="100%" height={220}>
        <RadarChart cx="50%" cy="50%" outerRadius="75%" data={data}>
          <PolarGrid stroke="hsl(var(--border))" />
          <PolarAngleAxis dataKey="pilar" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }} />
          <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} axisLine={false} />
          <Radar
            name="Score"
            dataKey="value"
            stroke="hsl(var(--primary))"
            fill="hsl(var(--primary))"
            fillOpacity={0.25}
            strokeWidth={2}
          />
          <Tooltip
            contentStyle={{
              background: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: 8,
              fontSize: 12,
            }}
            formatter={(v: number) => [`${v.toFixed(0)}%`, "Score"]}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
