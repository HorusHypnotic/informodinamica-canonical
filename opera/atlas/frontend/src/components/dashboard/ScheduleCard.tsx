import { ScheduleMetrics, MilestoneItem, getMilestones } from "@/analytics/cronograma";
import { Target, CheckCircle2, Circle, Loader2 } from "lucide-react";

interface ScheduleCardProps {
  metrics: ScheduleMetrics | null;
  faseAtual: string;
}

const statusLabels: Record<string, { label: string; color: string }> = {
  adiantado: { label: "Adiantado", color: "text-status-ok" },
  no_prazo: { label: "No prazo", color: "text-chart-4" },
  atrasado: { label: "Atrasado", color: "text-status-warning" },
  critico: { label: "Crítico", color: "text-status-critical" },
};

export function ScheduleCard({ metrics, faseAtual }: ScheduleCardProps) {
  const milestones = getMilestones(faseAtual);
  const statusInfo = metrics ? statusLabels[metrics.status] : null;

  return (
    <div className="glass-card p-5">
      <div className="flex items-center gap-2 mb-4">
        <Target className="h-4 w-4 text-primary" />
        <h3 className="text-sm font-semibold">Cronograma & SPI</h3>
      </div>

      {metrics ? (
        <>
          {/* Progress bars */}
          <div className="space-y-3 mb-4">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-muted-foreground">Progresso temporal</span>
                <span className="font-mono">{metrics.progressoTemporal.toFixed(0)}%</span>
              </div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-chart-4 rounded-full transition-all" style={{ width: `${Math.min(100, metrics.progressoTemporal)}%` }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-muted-foreground">Progresso físico estimado</span>
                <span className="font-mono">{metrics.progressoFisico.toFixed(0)}%</span>
              </div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <div className={`h-full rounded-full transition-all ${
                  metrics.progressoFisico >= metrics.progressoTemporal ? "bg-status-ok" : "bg-status-warning"
                }`} style={{ width: `${Math.min(100, metrics.progressoFisico)}%` }} />
              </div>
            </div>
          </div>

          {/* SPI */}
          <div className="flex items-center gap-3 mb-4 p-3 bg-secondary/50 rounded-lg">
            <div>
              <p className={`text-2xl font-bold ${statusInfo?.color}`}>
                {metrics.spi.toFixed(2)}
              </p>
              <p className="text-[10px] text-muted-foreground">SPI</p>
            </div>
            <div className="flex-1">
              <p className={`text-sm font-medium ${statusInfo?.color}`}>{statusInfo?.label}</p>
              <p className="text-xs text-muted-foreground">
                {metrics.diasRestantes > 0 ? `${metrics.diasRestantes} dias restantes` : `${Math.abs(metrics.diasRestantes)} dias de atraso`}
              </p>
            </div>
          </div>
        </>
      ) : (
        <div className="text-center py-6 text-muted-foreground text-sm">
          Defina datas na obra para ver o cronograma
        </div>
      )}

      {/* Milestone tracker */}
      <div className="flex items-center justify-between gap-1">
        {milestones.map((m, i) => (
          <div key={m.fase} className="flex flex-col items-center gap-1 flex-1">
            <div className={`rounded-full p-1 ${
              m.status === "done" ? "text-status-ok" :
              m.status === "current" ? "text-primary" :
              "text-muted-foreground/40"
            }`}>
              {m.status === "done" ? <CheckCircle2 className="h-4 w-4" /> :
               m.status === "current" ? <Loader2 className="h-4 w-4 animate-spin" /> :
               <Circle className="h-4 w-4" />}
            </div>
            <span className={`text-[9px] text-center leading-tight ${
              m.status === "current" ? "text-primary font-medium" : "text-muted-foreground"
            }`}>{m.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
