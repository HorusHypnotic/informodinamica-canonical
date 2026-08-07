import { useMemo } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

interface CustoPorCategoriaCardProps {
  lancamentos: any[];
}

const CATEGORY_COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
  "hsl(var(--muted-foreground))",
];

function categorize(descricao: string | null, fornecedor: string | null): string {
  const text = `${descricao || ""} ${fornecedor || ""}`.toLowerCase();
  if (text.includes("folha") || text.includes("diária") || text.includes("salário") || text.includes("pagamento")) return "Mão de Obra";
  if (text.includes("material") || text.includes("cimento") || text.includes("aço") || text.includes("areia") || text.includes("tijolo")) return "Materiais";
  if (text.includes("aluguel") || text.includes("equipamento") || text.includes("locação") || text.includes("máquina")) return "Equipamentos";
  if (text.includes("transporte") || text.includes("frete") || text.includes("logística")) return "Logística";
  if (text.includes("admin") || text.includes("escritório") || text.includes("taxa") || text.includes("imposto")) return "Administrativo";
  return "Outros";
}

export function CustoPorCategoriaCard({ lancamentos }: CustoPorCategoriaCardProps) {
  const data = useMemo(() => {
    const byCategory: Record<string, number> = {};
    lancamentos
      .filter((l: any) => l.tipo === "custo")
      .forEach((l: any) => {
        const cat = categorize(l.descricao, l.fornecedor);
        byCategory[cat] = (byCategory[cat] || 0) + Number(l.valor);
      });

    return Object.entries(byCategory)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
  }, [lancamentos]);

  if (data.length === 0) return null;

  const total = data.reduce((s, d) => s + d.value, 0);

  return (
    <div className="glass-card p-4">
      <h3 className="text-sm font-semibold mb-3">Custo por Categoria</h3>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={75}
            innerRadius={45}
            paddingAngle={2}
            strokeWidth={0}
          >
            {data.map((_, i) => (
              <Cell key={i} fill={CATEGORY_COLORS[i % CATEGORY_COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              background: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: 8,
              fontSize: 12,
            }}
            formatter={(v: number) => `R$ ${v.toLocaleString("pt-BR")}`}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="space-y-1 mt-2">
        {data.map((d, i) => (
          <div key={i} className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: CATEGORY_COLORS[i % CATEGORY_COLORS.length] }} />
              <span>{d.name}</span>
            </div>
            <span className="font-mono text-muted-foreground">
              {total > 0 ? ((d.value / total) * 100).toFixed(0) : 0}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
