import { useMemo } from "react";
import { DollarSign, TrendingUp, TrendingDown, Target } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Area, AreaChart, Legend } from "recharts";
import { BurnRateMonth } from "@/analytics/financeiro";

interface FinancialChartsProps {
  burnRate: BurnRateMonth[];
  custoRealM2: number;
  custoOrcadoM2: number;
  projecaoCustoFinal: number;
  orcamentoTotal: number;
}

const tooltipStyle = {
  background: "hsl(var(--card))",
  border: "1px solid hsl(var(--border))",
  borderRadius: 8,
  fontSize: 12,
};

export function FinancialCharts({ burnRate, custoRealM2, custoOrcadoM2, projecaoCustoFinal, orcamentoTotal }: FinancialChartsProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* Burn rate chart */}
      {burnRate.length > 0 && (
        <div className="glass-card p-4">
          <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
            <TrendingDown className="h-4 w-4 text-status-critical" />
            Burn Rate & Saldo Acumulado
          </h3>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={burnRate}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="mes" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }} />
              <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }} tickFormatter={v => `${(v/1000).toFixed(0)}k`} />
              <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => `R$ ${v.toLocaleString("pt-BR")}`} />
              <Legend />
              <Area type="monotone" dataKey="custo" stroke="hsl(var(--status-critical))" fill="hsl(var(--status-critical))" fillOpacity={0.1} name="Custo" />
              <Area type="monotone" dataKey="receita" stroke="hsl(var(--status-ok))" fill="hsl(var(--status-ok))" fillOpacity={0.1} name="Receita" />
              <Line type="monotone" dataKey="acumulado" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 3 }} name="Acumulado" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Cost comparison */}
      <div className="glass-card p-4">
        <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
          <Target className="h-4 w-4 text-primary" />
          Custo Real vs Orçado
        </h3>
        <div className="space-y-4 py-4">
          {/* Cost per m² */}
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-muted-foreground">Custo/m²</span>
              <span className="font-mono">
                R$ {custoRealM2.toFixed(0)} <span className="text-muted-foreground">/ R$ {custoOrcadoM2.toFixed(0)}</span>
              </span>
            </div>
            <div className="h-3 bg-secondary rounded-full overflow-hidden relative">
              <div
                className={`h-full rounded-full transition-all ${custoRealM2 <= custoOrcadoM2 ? "bg-status-ok" : "bg-status-critical"}`}
                style={{ width: `${Math.min(100, custoOrcadoM2 > 0 ? (custoRealM2 / custoOrcadoM2) * 100 : 0)}%` }}
              />
              {custoOrcadoM2 > 0 && (
                <div className="absolute top-0 h-full w-0.5 bg-foreground/50" style={{ left: "100%" }} />
              )}
            </div>
            <p className={`text-[10px] mt-0.5 ${custoRealM2 <= custoOrcadoM2 ? "text-status-ok" : "text-status-critical"}`}>
              {custoRealM2 <= custoOrcadoM2 ? `${((1 - custoRealM2/custoOrcadoM2) * 100).toFixed(1)}% abaixo da meta` : `${((custoRealM2/custoOrcadoM2 - 1) * 100).toFixed(1)}% acima da meta`}
            </p>
          </div>

          {/* Projected vs budget */}
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-muted-foreground">Projeção final</span>
              <span className="font-mono">
                R$ {(projecaoCustoFinal/1000).toFixed(0)}k <span className="text-muted-foreground">/ R$ {(orcamentoTotal/1000).toFixed(0)}k</span>
              </span>
            </div>
            <div className="h-3 bg-secondary rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${projecaoCustoFinal <= orcamentoTotal ? "bg-status-ok" : "bg-status-critical"}`}
                style={{ width: `${Math.min(100, orcamentoTotal > 0 ? (projecaoCustoFinal / orcamentoTotal) * 100 : 0)}%` }}
              />
            </div>
            <p className={`text-[10px] mt-0.5 ${projecaoCustoFinal <= orcamentoTotal ? "text-status-ok" : "text-status-critical"}`}>
              {projecaoCustoFinal <= orcamentoTotal
                ? `Projeção ${((1 - projecaoCustoFinal/orcamentoTotal) * 100).toFixed(1)}% abaixo do orçamento`
                : `⚠ Projeção ${((projecaoCustoFinal/orcamentoTotal - 1) * 100).toFixed(1)}% acima do orçamento`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
