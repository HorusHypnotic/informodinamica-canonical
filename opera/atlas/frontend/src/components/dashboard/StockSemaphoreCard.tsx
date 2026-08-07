import { StockItem } from "@/analytics/estoque";
import { Package, AlertTriangle, Clock } from "lucide-react";

interface StockSemaphoreCardProps {
  items: StockItem[];
}

export function StockSemaphoreCard({ items }: StockSemaphoreCardProps) {
  if (items.length === 0) return null;

  const critical = items.filter(i => i.status === "critical");
  const warning = items.filter(i => i.status === "warning");

  return (
    <div className="glass-card p-4">
      <div className="flex items-center gap-2 mb-3">
        <Package className="h-4 w-4 text-primary" />
        <h3 className="text-sm font-semibold">Semáforo de Estoque</h3>
        <div className="ml-auto flex gap-1.5">
          {critical.length > 0 && (
            <span className="bg-status-critical/20 text-status-critical text-[10px] font-bold px-1.5 py-0.5 rounded">{critical.length} crítico</span>
          )}
          {warning.length > 0 && (
            <span className="bg-status-warning/20 text-status-warning text-[10px] font-bold px-1.5 py-0.5 rounded">{warning.length} alerta</span>
          )}
        </div>
      </div>
      <div className="space-y-1.5 max-h-[200px] overflow-y-auto">
        {items.slice(0, 8).map((item, i) => (
          <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-secondary/30">
            <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${
              item.status === "critical" ? "bg-status-critical animate-pulse" :
              item.status === "warning" ? "bg-status-warning" :
              "bg-status-ok"
            }`} />
            <span className="text-xs font-medium flex-1 truncate">{item.material}</span>
            <span className={`text-xs font-mono ${
              item.status === "critical" ? "text-status-critical" :
              item.status === "warning" ? "text-status-warning" :
              "text-muted-foreground"
            }`}>{item.percentual.toFixed(0)}%</span>
            {item.diasRestantes !== null && (
              <span className="text-[10px] text-muted-foreground flex items-center gap-0.5">
                <Clock className="h-2.5 w-2.5" />~{item.diasRestantes}d
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
