import { useMemo } from "react";
import { Users, TrendingDown, TrendingUp, Clock, UserX } from "lucide-react";
import { ProductivityMetrics, ColaboradorRanking, calculateColaboradorRanking } from "@/analytics/produtividade";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

interface ProductivityCardProps {
  metrics: ProductivityMetrics;
  registros: any[];
  presencas: any[];
}

const RANK_COLORS = [
  "hsl(var(--status-ok))",
  "hsl(var(--chart-4))",
  "hsl(var(--primary))",
  "hsl(var(--chart-5))",
  "hsl(var(--muted-foreground))",
];

const tooltipStyle = {
  background: "hsl(var(--card))",
  border: "1px solid hsl(var(--border))",
  borderRadius: 8,
  fontSize: 12,
};

export function ProductivityCard({ metrics, registros, presencas }: ProductivityCardProps) {
  const ranking = useMemo(() => calculateColaboradorRanking(registros, presencas, 5), [registros, presencas]);

  return (
    <div className="glass-card p-4">
      <div className="flex items-center gap-2 mb-3">
        <Users className="h-4 w-4 text-primary" />
        <h3 className="text-sm font-semibold">Produtividade & Equipe</h3>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
        <Metric
          label="Absenteísmo"
          value={`${metrics.absenteismo.toFixed(1)}%`}
          status={metrics.absenteismo > 5 ? "critical" : metrics.absenteismo > 3 ? "warning" : "ok"}
          icon={<UserX className="h-3 w-3" />}
        />
        <Metric
          label="Presentes"
          value={`${metrics.presentes}`}
          sub={`de ${metrics.totalDias} dias`}
          status="ok"
          icon={<Users className="h-3 w-3" />}
        />
        <Metric
          label="Aproveitamento"
          value={`${metrics.aproveitamentoJornada.toFixed(0)}%`}
          status={metrics.aproveitamentoJornada >= 85 ? "ok" : "warning"}
          icon={<TrendingUp className="h-3 w-3" />}
        />
        <Metric
          label="Desloc. médio"
          value={`${metrics.tempoMedioDeslocamento.toFixed(0)}min`}
          status={metrics.tempoMedioDeslocamento > 30 ? "warning" : "ok"}
          icon={<Clock className="h-3 w-3" />}
        />
      </div>

      {metrics.ociosos > 0 && (
        <div className="bg-status-warning/10 border border-status-warning/20 rounded-lg p-2 mb-3 text-xs text-status-warning flex items-center gap-2">
          <UserX className="h-3.5 w-3.5" />
          {metrics.ociosos} registros sem atividade/produção preenchida
        </div>
      )}

      {ranking.length > 0 && (
        <>
          <p className="text-xs font-medium text-muted-foreground mb-2">Top 5 — Produtividade por colaborador</p>
          <ResponsiveContainer width="100%" height={150}>
            <BarChart data={ranking} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis type="number" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }} />
              <YAxis type="category" dataKey="nome" width={80} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 9 }} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="produtividadeMedia" name="Prod/dia" radius={[0, 4, 4, 0]}>
                {ranking.map((_, i) => <Cell key={i} fill={RANK_COLORS[i % RANK_COLORS.length]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </>
      )}
    </div>
  );
}

function Metric({ label, value, sub, status, icon }: { label: string; value: string; sub?: string; status: "ok" | "warning" | "critical"; icon: React.ReactNode }) {
  const colors = { ok: "text-status-ok", warning: "text-status-warning", critical: "text-status-critical" };
  return (
    <div className="bg-secondary/50 rounded-lg p-2 text-center">
      <div className={`flex items-center justify-center gap-1 ${colors[status]}`}>{icon}</div>
      <p className={`text-lg font-bold ${colors[status]}`}>{value}</p>
      <p className="text-[10px] text-muted-foreground">{label}</p>
      {sub && <p className="text-[9px] text-muted-foreground">{sub}</p>}
    </div>
  );
}
