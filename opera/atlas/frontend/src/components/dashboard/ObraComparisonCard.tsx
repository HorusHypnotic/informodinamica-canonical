import { useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { BarChart3 } from "lucide-react";

interface ObraComparisonCardProps {
  obras: any[];
  lancamentosByObra: Record<string, { receita: number; custo: number }>;
}

export function ObraComparisonCard({ obras, lancamentosByObra }: ObraComparisonCardProps) {
  const data = useMemo(() => {
    return obras.slice(0, 6).map(obra => {
      const fin = lancamentosByObra[obra.id] || { receita: 0, custo: 0 };
      return {
        nome: obra.nome.length > 15 ? obra.nome.substring(0, 15) + "…" : obra.nome,
        orcamento: Number(obra.orcamento_total || 0),
        custo: fin.custo,
        receita: fin.receita,
      };
    });
  }, [obras, lancamentosByObra]);

  if (data.length < 2) return null;

  return (
    <div className="glass-card p-4">
      <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
        <BarChart3 className="h-4 w-4 text-primary" />
        Comparativo entre Obras
      </h3>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} barGap={2}>
          <XAxis dataKey="nome" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 9 }} />
          <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }} tickFormatter={v => `${(v / 1000).toFixed(0)}k`} />
          <Tooltip
            contentStyle={{
              background: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: 8,
              fontSize: 12,
            }}
            formatter={(v: number) => `R$ ${v.toLocaleString("pt-BR")}`}
          />
          <Legend wrapperStyle={{ fontSize: 11 }} />
          <Bar dataKey="orcamento" name="Orçamento" fill="hsl(var(--chart-4))" radius={[4, 4, 0, 0]} />
          <Bar dataKey="custo" name="Custo Real" fill="hsl(var(--status-critical))" radius={[4, 4, 0, 0]} />
          <Bar dataKey="receita" name="Receita" fill="hsl(var(--status-ok))" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
