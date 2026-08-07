import { AnomalyItem } from "@/analytics/estoque";
import { AlertTriangle } from "lucide-react";

interface AnomalyCardProps {
  anomalies: AnomalyItem[];
}

export function AnomalyCard({ anomalies }: AnomalyCardProps) {
  if (anomalies.length === 0) return null;

  return (
    <div className="glass-card p-4">
      <div className="flex items-center gap-2 mb-3">
        <AlertTriangle className="h-4 w-4 text-status-warning" />
        <h3 className="text-sm font-semibold">Anomalias Detectadas</h3>
      </div>
      <div className="space-y-2 max-h-[200px] overflow-y-auto">
        {anomalies.map((a, i) => (
          <div key={i} className="p-2.5 rounded-lg bg-status-warning/5 border border-status-warning/20">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium">{a.descricao}</span>
              <span className="text-xs font-mono text-status-warning font-bold">
                {a.desvio}σ
              </span>
            </div>
            <p className="text-[10px] text-muted-foreground mt-0.5">
              Valor: R$ {a.valor.toLocaleString("pt-BR")} · Média: R$ {a.media.toLocaleString("pt-BR")} · {a.data}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
