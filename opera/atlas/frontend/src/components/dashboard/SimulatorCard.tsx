import { useState, useMemo } from "react";
import { Calculator, TrendingDown, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SimulatorCardProps {
  desperdicioAtual: number;
  custoMateriais: number;
  custoRetrabalhoAtual: number;
  burnRateAtual: number;
}

export function SimulatorCard({ desperdicioAtual, custoMateriais, custoRetrabalhoAtual, burnRateAtual }: SimulatorCardProps) {
  const [metaDesperdicio, setMetaDesperdicio] = useState(Math.max(0, desperdicioAtual - 5));
  const [metaRetrabalho, setMetaRetrabalho] = useState(50); // reduce by 50%

  const economia = useMemo(() => {
    const economiaDesperdicio = custoMateriais * ((desperdicioAtual - metaDesperdicio) / 100);
    const economiaRetrabalho = custoRetrabalhoAtual * (metaRetrabalho / 100);
    return {
      desperdicio: Math.max(0, economiaDesperdicio),
      retrabalho: Math.max(0, economiaRetrabalho),
      total: Math.max(0, economiaDesperdicio) + Math.max(0, economiaRetrabalho),
      mensal: burnRateAtual > 0 ? ((Math.max(0, economiaDesperdicio) + Math.max(0, economiaRetrabalho)) / burnRateAtual * 100) : 0,
    };
  }, [metaDesperdicio, metaRetrabalho, desperdicioAtual, custoMateriais, custoRetrabalhoAtual, burnRateAtual]);

  return (
    <div className="glass-card p-4">
      <div className="flex items-center gap-2 mb-3">
        <Calculator className="h-4 w-4 text-chart-5" />
        <h3 className="text-sm font-semibold">Simulador de Economia</h3>
      </div>

      <div className="space-y-3">
        <div>
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="text-muted-foreground">Meta de desperdício (%)</span>
            <span className="font-mono">{desperdicioAtual.toFixed(1)}% <ArrowRight className="h-3 w-3 inline" /> {metaDesperdicio.toFixed(1)}%</span>
          </div>
          <Input
            type="range"
            min={0}
            max={Math.max(desperdicioAtual, 1)}
            step={0.5}
            value={metaDesperdicio}
            onChange={e => setMetaDesperdicio(Number(e.target.value))}
            className="h-2 p-0 border-0"
          />
        </div>

        <div>
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="text-muted-foreground">Redução de retrabalho (%)</span>
            <span className="font-mono">{metaRetrabalho}%</span>
          </div>
          <Input
            type="range"
            min={0}
            max={100}
            step={5}
            value={metaRetrabalho}
            onChange={e => setMetaRetrabalho(Number(e.target.value))}
            className="h-2 p-0 border-0"
          />
        </div>

        <div className="bg-status-ok/10 border border-status-ok/30 rounded-lg p-3 text-center">
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Economia projetada</p>
          <p className="text-2xl font-bold text-status-ok">
            R$ {economia.total.toLocaleString("pt-BR", { maximumFractionDigits: 0 })}
          </p>
          <p className="text-xs text-muted-foreground">
            ≈ {economia.mensal.toFixed(1)}% do burn rate mensal
          </p>
        </div>
      </div>
    </div>
  );
}
