import { useMemo } from "react";
import { SectionHeader } from "@/components/dashboard/SectionHeader";
import { KPICard } from "@/components/dashboard/KPICard";
import { useTableData } from "@/hooks/useTableData";
import { useObra } from "@/hooks/useObra";
import { calculateFinancials, calculateBurnRate } from "@/analytics/financeiro";
import { calculateRetrabalho } from "@/analytics/retrabalho";
import { Banknote, TrendingUp, TrendingDown, ShieldCheck, Wrench, Package, DollarSign } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart, Legend, BarChart, Bar } from "recharts";

function formatCurrency(v: number): string {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 }).format(v);
}

const tooltipStyle = {
  background: "hsl(var(--card))",
  border: "1px solid hsl(var(--border))",
  borderRadius: 8,
  fontSize: 12,
};

export default function EconomiaPage() {
  const { selectedObra } = useObra();
  const { data: lancamentos = [] } = useTableData("lancamentos_financeiros");
  const { data: retrabalhos = [] } = useTableData("retrabalhos");
  const { data: consumo = [] } = useTableData("consumo_materiais");
  const { data: colaboradores = [] } = useTableData("colaboradores");
  const { data: presencas = [] } = useTableData("registro_presencas");
  const { data: acoes = [] } = useTableData("acoes_corretivas");

  const obraData = useMemo(() => selectedObra ? {
    orcamento_total: (selectedObra as any).orcamento_total || 0,
    area_m2: (selectedObra as any).area_m2 || 0,
    data_inicio: (selectedObra as any).data_inicio,
    data_previsao: (selectedObra as any).data_previsao,
    custo_orcado_m2: (selectedObra as any).custo_orcado_m2 || 0,
  } : undefined, [selectedObra]);

  const financials = useMemo(() => calculateFinancials(lancamentos, retrabalhos, consumo, colaboradores, presencas, obraData), [lancamentos, retrabalhos, consumo, colaboradores, presencas, obraData]);
  const burnRate = useMemo(() => calculateBurnRate(lancamentos), [lancamentos]);
  const retrabalhoData = useMemo(() => calculateRetrabalho(retrabalhos, 1), [retrabalhos]);

  // Build economy timeline by month
  const economyTimeline = useMemo(() => {
    const byMonth: Record<string, { custoEvitado: number; desperdicioSalvo: number; retrabalhoEvitado: number }> = {};
    
    // Simulated savings per month based on improvement trends
    burnRate.forEach(m => {
      byMonth[m.mes] = {
        custoEvitado: Math.max(0, m.receita - m.custo) * 0.15, // 15% attributed to optimization
        desperdicioSalvo: financials.desperdicioMonetizado > 0 ? financials.desperdicioMonetizado / Math.max(burnRate.length, 1) : 0,
        retrabalhoEvitado: financials.custoRetrabalho > 0 ? financials.custoRetrabalho / Math.max(burnRate.length, 1) : 0,
      };
    });

    let acumulado = 0;
    return Object.entries(byMonth)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([mes, v]) => {
        const total = v.custoEvitado + v.desperdicioSalvo + v.retrabalhoEvitado;
        acumulado += total;
        return { mes, ...v, total, acumulado };
      });
  }, [burnRate, financials]);

  const totalEconomiaPotencial = financials.custoRetrabalho + financials.desperdicioMonetizado + financials.custoAtrasos;

  // Savings breakdown
  const savingsData = [
    { name: "Retrabalho", valor: financials.custoRetrabalho, fill: "hsl(var(--status-critical))" },
    { name: "Desperdício", valor: financials.desperdicioMonetizado, fill: "hsl(var(--status-warning))" },
    { name: "Atrasos", valor: financials.custoAtrasos, fill: "hsl(var(--chart-5))" },
  ].filter(s => s.valor > 0);

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Economia & Otimização"
        subtitle="Quanto o Método O.P.E.R.A. está economizando para você"
        icon={<Banknote className="h-6 w-6" />}
      />

      {/* Hero savings */}
      <div className="relative overflow-hidden rounded-xl border border-status-ok/30 bg-gradient-to-br from-status-ok/10 via-status-ok/5 to-transparent p-8 text-center">
        <div className="absolute top-4 right-4 opacity-5">
          <Banknote className="h-32 w-32" />
        </div>
        <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Potencial de economia identificado</p>
        <p className="text-5xl sm:text-6xl font-bold text-status-ok tracking-tight">
          {formatCurrency(totalEconomiaPotencial)}
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          Eliminando retrabalho, desperdício e atrasos nesta obra
        </p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <KPICard title="Custo Retrabalho" value={formatCurrency(financials.custoRetrabalho)} icon={<Wrench className="h-4 w-4" />} tooltip="Retrabalhos × diária média dos colaboradores" status={financials.custoRetrabalho > 0 ? "critical" : "ok"} />
        <KPICard title="Desperdício em R$" value={formatCurrency(financials.desperdicioMonetizado)} icon={<Package className="h-4 w-4" />} tooltip="% desperdício × custo estimado de materiais" status={financials.desperdicioMonetizado > 0 ? "warning" : "ok"} />
        <KPICard title="Custo de Atrasos" value={formatCurrency(financials.custoAtrasos)} icon={<TrendingDown className="h-4 w-4" />} tooltip="Dias de atraso × custo diário médio" status={financials.custoAtrasos > 0 ? "critical" : "ok"} />
        <KPICard title="Burn Rate/Mês" value={formatCurrency(financials.burnRateMensal)} icon={<DollarSign className="h-4 w-4" />} tooltip="Gasto médio mensal" status="ok" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Economy timeline */}
        {economyTimeline.length > 0 && (
          <div className="glass-card p-4">
            <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-status-ok" />
              Economia Acumulada
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={economyTimeline}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="mes" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }} />
                <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }} tickFormatter={v => `${(v/1000).toFixed(0)}k`} />
                <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => formatCurrency(v)} />
                <Area type="monotone" dataKey="acumulado" stroke="hsl(var(--status-ok))" fill="hsl(var(--status-ok))" fillOpacity={0.2} name="Acumulado" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Savings breakdown */}
        {savingsData.length > 0 && (
          <div className="glass-card p-4">
            <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-primary" />
              Onde você está perdendo dinheiro
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={savingsData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis type="number" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }} tickFormatter={v => `${(v/1000).toFixed(0)}k`} />
                <YAxis type="category" dataKey="name" width={90} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
                <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => formatCurrency(v)} />
                <Bar dataKey="valor" name="Valor perdido" radius={[0, 6, 6, 0]}>
                  {savingsData.map((entry, i) => (
                    <Bar key={i} dataKey="valor" fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      {/* Actionable insights */}
      <div className="glass-card p-5">
        <h3 className="text-sm font-semibold mb-3">💡 Insights acionáveis</h3>
        <div className="space-y-2">
          {financials.custoRetrabalho > 0 && (
            <InsightItem
              icon="🔧"
              title={`Retrabalho custou ${formatCurrency(financials.custoRetrabalho)}`}
              description={`Equivalente a ${Math.round(financials.custoRetrabalho / Math.max(financials.burnRateMensal, 1) * 30)} dias de operação. Invista em treinamento e controle de qualidade.`}
              severity="critical"
            />
          )}
          {financials.desperdicioMonetizado > 0 && (
            <InsightItem
              icon="📦"
              title={`Desperdício convertido: ${formatCurrency(financials.desperdicioMonetizado)}`}
              description="Revise o controle de estoque e consumo. Considere treinamento da equipe sobre uso racional de materiais."
              severity="warning"
            />
          )}
          {financials.custoAtrasos > 0 && (
            <InsightItem
              icon="⏱️"
              title={`Atrasos já custaram ${formatCurrency(financials.custoAtrasos)}`}
              description="Cada dia de atraso impacta diretamente o resultado. Revise o sequenciamento de equipes e elimine gargalos."
              severity="critical"
            />
          )}
          {financials.burnRateMensal > 0 && (
            <InsightItem
              icon="📊"
              title={`Velocidade de gasto: ${formatCurrency(financials.burnRateMensal)}/mês`}
              description={`Projeção de custo final: ${formatCurrency(financials.projecaoCustoFinal)}. ${financials.projecaoCustoFinal <= (obraData?.orcamento_total || 0) ? "Dentro do orçamento ✅" : "⚠️ Acima do orçamento previsto"}`}
              severity={financials.projecaoCustoFinal <= (obraData?.orcamento_total || 0) ? "ok" : "warning"}
            />
          )}
        </div>
      </div>
    </div>
  );
}

function InsightItem({ icon, title, description, severity }: { icon: string; title: string; description: string; severity: "ok" | "warning" | "critical" }) {
  const colors = {
    ok: "border-status-ok/30 bg-status-ok/5",
    warning: "border-status-warning/30 bg-status-warning/5",
    critical: "border-status-critical/30 bg-status-critical/5",
  };
  return (
    <div className={`p-3 rounded-lg border ${colors[severity]}`}>
      <p className="text-sm font-medium flex items-center gap-2">
        <span>{icon}</span> {title}
      </p>
      <p className="text-xs text-muted-foreground mt-1 ml-7">{description}</p>
    </div>
  );
}
