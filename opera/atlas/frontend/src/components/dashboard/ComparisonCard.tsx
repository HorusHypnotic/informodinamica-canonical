import { calculatePadronizacaoIndex } from "@/analytics/estoque";
import { useMemo } from "react";
import { GaugeChart } from "@/components/dashboard/GaugeChart";

interface ComparisonCardProps {
  consumoAtual: any[];
  consumoAnterior: any[];
  lancamentosAtual: any[];
  lancamentosAnterior: any[];
  retrabalhoAtual: number;
  retrabalhoAnterior: number;
}

interface TrendItem {
  label: string;
  atual: number;
  anterior: number;
  unit: string;
  invertido?: boolean; // lower is better
}

export function ComparisonCard({ consumoAtual, consumoAnterior, lancamentosAtual, lancamentosAnterior, retrabalhoAtual, retrabalhoAnterior }: ComparisonCardProps) {
  const items = useMemo<TrendItem[]>(() => {
    const despAtual = consumoAtual.filter(m => Number(m.previsto) > 0).length > 0
      ? consumoAtual.filter(m => Number(m.previsto) > 0).reduce((acc, m) => acc + ((Number(m.real_consumo) - Number(m.previsto)) / Number(m.previsto)) * 100, 0) / consumoAtual.filter(m => Number(m.previsto) > 0).length
      : 0;
    const despAnt = consumoAnterior.filter(m => Number(m.previsto) > 0).length > 0
      ? consumoAnterior.filter(m => Number(m.previsto) > 0).reduce((acc, m) => acc + ((Number(m.real_consumo) - Number(m.previsto)) / Number(m.previsto)) * 100, 0) / consumoAnterior.filter(m => Number(m.previsto) > 0).length
      : 0;

    const custoAtual = lancamentosAtual.filter(l => l.tipo === "custo").reduce((s, l) => s + Number(l.valor), 0);
    const custoAnt = lancamentosAnterior.filter(l => l.tipo === "custo").reduce((s, l) => s + Number(l.valor), 0);

    return [
      { label: "Desperdício", atual: despAtual, anterior: despAnt, unit: "%", invertido: true },
      { label: "Custos", atual: custoAtual / 1000, anterior: custoAnt / 1000, unit: "k", invertido: true },
      { label: "Retrabalho", atual: retrabalhoAtual, anterior: retrabalhoAnterior, unit: "", invertido: true },
    ];
  }, [consumoAtual, consumoAnterior, lancamentosAtual, lancamentosAnterior, retrabalhoAtual, retrabalhoAnterior]);

  return (
    <div className="glass-card p-4">
      <h3 className="text-sm font-semibold mb-3">📊 Este mês vs anterior</h3>
      <div className="space-y-2.5">
        {items.map((item, i) => {
          const diff = item.atual - item.anterior;
          const pctChange = item.anterior !== 0 ? (diff / item.anterior) * 100 : 0;
          const isGood = item.invertido ? diff <= 0 : diff >= 0;

          return (
            <div key={i} className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground w-24">{item.label}</span>
              <div className="flex-1 flex items-center gap-2">
                <span className="text-sm font-mono">{item.atual.toFixed(1)}{item.unit}</span>
                <span className={`text-xs font-medium px-1.5 py-0.5 rounded ${
                  isGood ? "bg-status-ok/15 text-status-ok" : "bg-status-critical/15 text-status-critical"
                }`}>
                  {diff > 0 ? "+" : ""}{pctChange.toFixed(0)}%
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
