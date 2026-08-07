import { useMemo } from "react";
import { Package, TrendingDown, AlertTriangle } from "lucide-react";

interface WasteRankingCardProps {
  consumo: any[];
}

export function WasteRankingCard({ consumo }: WasteRankingCardProps) {
  const ranking = useMemo(() => {
    return consumo
      .filter((m: any) => Number(m.previsto) > 0)
      .map((m: any) => {
        const previsto = Number(m.previsto);
        const real = Number(m.real_consumo);
        const desvio = ((real - previsto) / previsto) * 100;
        return { material: m.material, desvio, previsto, real, unidade: m.unidade };
      })
      .filter(m => m.desvio > 0)
      .sort((a, b) => b.desvio - a.desvio)
      .slice(0, 8);
  }, [consumo]);

  if (ranking.length === 0) return null;

  const maxDesvio = Math.max(...ranking.map(r => r.desvio), 1);

  return (
    <div className="glass-card p-4">
      <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
        <TrendingDown className="h-4 w-4 text-status-warning" />
        Ranking de Desperdício
      </h3>
      <div className="space-y-2">
        {ranking.map((item, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className={`w-5 h-5 rounded text-[10px] font-bold flex items-center justify-center shrink-0 ${
              item.desvio > 15 ? "bg-status-critical/20 text-status-critical" :
              item.desvio > 5 ? "bg-status-warning/20 text-status-warning" :
              "bg-muted text-muted-foreground"
            }`}>
              {i + 1}
            </span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-0.5">
                <span className="text-xs truncate">{item.material}</span>
                <span className={`text-xs font-mono font-semibold ${
                  item.desvio > 15 ? "text-status-critical" : item.desvio > 5 ? "text-status-warning" : "text-muted-foreground"
                }`}>
                  +{item.desvio.toFixed(1)}%
                </span>
              </div>
              <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${
                    item.desvio > 15 ? "bg-status-critical" : item.desvio > 5 ? "bg-status-warning" : "bg-muted-foreground"
                  }`}
                  style={{ width: `${(item.desvio / maxDesvio) * 100}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      {ranking.some(r => r.desvio > 15) && (
        <div className="mt-3 p-2 rounded-lg border border-status-critical/20 bg-status-critical/5 flex items-start gap-2">
          <AlertTriangle className="h-3.5 w-3.5 text-status-critical shrink-0 mt-0.5" />
          <p className="text-[10px] text-status-critical">
            {ranking.filter(r => r.desvio > 15).length} materiais com desperdício acima de 15%. Revise o controle de estoque.
          </p>
        </div>
      )}
    </div>
  );
}
