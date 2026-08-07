import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
  PieChart, Pie, Cell, LineChart, Line,
} from "recharts";

interface DashboardChartsProps {
  registros: any[];
  consumo: any[];
  lancamentos: any[];
  incidentes: any[];
}

const COLORS = [
  "hsl(var(--primary))",
  "hsl(var(--status-ok))",
  "hsl(var(--status-warning))",
  "hsl(var(--status-critical))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
];

export function DashboardCharts({ registros, consumo, lancamentos, incidentes }: DashboardChartsProps) {
  // 1. Produção por atividade
  const byAtividade: Record<string, number> = {};
  registros.forEach((r: any) => {
    const key = r.atividade || "Sem atividade";
    byAtividade[key] = (byAtividade[key] || 0) + 1;
  });
  const prodData = Object.entries(byAtividade).map(([name, count]) => ({ name, count }));

  // 2. Consumo de materiais (previsto vs real)
  const consumoData = consumo.slice(0, 8).map((m: any) => ({
    name: m.material?.length > 12 ? m.material.substring(0, 12) + "…" : m.material,
    previsto: Number(m.previsto),
    real: Number(m.real_consumo),
  }));

  // 3. Fluxo de caixa por mês
  const byMonth: Record<string, { receita: number; custo: number }> = {};
  lancamentos.forEach((l: any) => {
    const mes = l.data?.substring(0, 7) || "N/A";
    if (!byMonth[mes]) byMonth[mes] = { receita: 0, custo: 0 };
    if (l.tipo === "receita") byMonth[mes].receita += Number(l.valor);
    else byMonth[mes].custo += Number(l.valor);
  });
  const fluxoData = Object.entries(byMonth)
    .sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime())
    .map(([mes, v]) => ({ mes, receita: v.receita, custo: v.custo, saldo: v.receita - v.custo }));

  // 4. Incidentes por tipo
  const byTipo: Record<string, number> = {};
  incidentes.forEach((i: any) => {
    const key = i.tipo === "nc" ? "Não Conformidade" : i.tipo === "inspecao" ? "Inspeção" : "Acidente";
    byTipo[key] = (byTipo[key] || 0) + 1;
  });
  const incidenteData = Object.entries(byTipo).map(([name, value]) => ({ name, value }));

  const tooltipStyle = {
    background: "hsl(var(--card))",
    border: "1px solid hsl(var(--border))",
    borderRadius: 8,
    fontSize: 12,
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
      {/* Produção por equipe/atividade */}
      {prodData.length > 0 && (
        <div className="glass-card p-4">
          <h3 className="text-sm font-semibold mb-4">Produção por Atividade</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={prodData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis type="number" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
              <YAxis type="category" dataKey="name" width={100} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="count" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} name="Registros" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Consumo previsto vs real */}
      {consumoData.length > 0 && (
        <div className="glass-card p-4">
          <h3 className="text-sm font-semibold mb-4">Consumo: Previsto vs Real</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={consumoData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="name" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }} />
              <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
              <Tooltip contentStyle={tooltipStyle} />
              <Legend />
              <Bar dataKey="previsto" fill="hsl(var(--status-ok))" radius={[4, 4, 0, 0]} name="Previsto" />
              <Bar dataKey="real" fill="hsl(var(--status-warning))" radius={[4, 4, 0, 0]} name="Real" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Fluxo de caixa */}
      {fluxoData.length > 0 && (
        <div className="glass-card p-4">
          <h3 className="text-sm font-semibold mb-4">Fluxo de Caixa Mensal</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={fluxoData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="mes" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
              <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
              <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => `R$ ${v.toLocaleString("pt-BR")}`} />
              <Legend />
              <Line type="monotone" dataKey="receita" stroke="hsl(var(--status-ok))" strokeWidth={2} name="Receita" dot={{ r: 4 }} />
              <Line type="monotone" dataKey="custo" stroke="hsl(var(--status-critical))" strokeWidth={2} name="Custo" dot={{ r: 4 }} />
              <Line type="monotone" dataKey="saldo" stroke="hsl(var(--primary))" strokeWidth={2} strokeDasharray="5 5" name="Saldo" dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Incidentes por tipo */}
      {incidenteData.length > 0 && (
        <div className="glass-card p-4">
          <h3 className="text-sm font-semibold mb-4">Incidentes por Tipo</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={incidenteData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={4} dataKey="value" label={({ name, value }) => `${name}: ${value}`}>
                {incidenteData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
