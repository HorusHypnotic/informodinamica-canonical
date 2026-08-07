import { buildRiskMatrix, RiskMatrixItem } from "@/analytics/seguranca";
import { useMemo } from "react";
import { AlertTriangle } from "lucide-react";

interface RiskMatrixCardProps {
  riscos: any[];
}

const cells = [
  { row: "alta", col: "alto", severity: "critical" },
  { row: "alta", col: "medio", severity: "critical" },
  { row: "alta", col: "baixo", severity: "warning" },
  { row: "media", col: "alto", severity: "critical" },
  { row: "media", col: "medio", severity: "warning" },
  { row: "media", col: "baixo", severity: "ok" },
  { row: "baixa", col: "alto", severity: "warning" },
  { row: "baixa", col: "medio", severity: "ok" },
  { row: "baixa", col: "baixo", severity: "ok" },
];

const bgColors: Record<string, string> = {
  critical: "bg-status-critical/20",
  warning: "bg-status-warning/20",
  ok: "bg-status-ok/20",
};

export function RiskMatrixCard({ riscos }: RiskMatrixCardProps) {
  const items = useMemo(() => buildRiskMatrix(riscos), [riscos]);

  if (items.length === 0) return null;

  const getCount = (prob: string, imp: string) =>
    items.filter(i => i.probabilidade === prob && i.impactoLevel === imp).length;

  return (
    <div className="glass-card p-4">
      <div className="flex items-center gap-2 mb-3">
        <AlertTriangle className="h-4 w-4 text-status-warning" />
        <h3 className="text-sm font-semibold">Mapa de Riscos</h3>
        <span className="text-xs text-muted-foreground ml-auto">{items.length} riscos</span>
      </div>

      <div className="grid grid-cols-4 gap-1 text-center">
        {/* Header */}
        <div />
        <div className="text-[10px] text-muted-foreground font-medium p-1">Baixo</div>
        <div className="text-[10px] text-muted-foreground font-medium p-1">Médio</div>
        <div className="text-[10px] text-muted-foreground font-medium p-1">Alto</div>

        {/* Alta row */}
        <div className="text-[10px] text-muted-foreground font-medium p-1 flex items-center">Alta</div>
        {["baixo", "medio", "alto"].map(imp => {
          const count = getCount("alta", imp);
          const sev = cells.find(c => c.row === "alta" && c.col === imp)?.severity || "ok";
          return (
            <div key={`alta-${imp}`} className={`${bgColors[sev]} rounded p-2 text-sm font-bold ${count > 0 ? "text-foreground" : "text-muted-foreground/30"}`}>
              {count || "—"}
            </div>
          );
        })}

        {/* Média row */}
        <div className="text-[10px] text-muted-foreground font-medium p-1 flex items-center">Média</div>
        {["baixo", "medio", "alto"].map(imp => {
          const count = getCount("media", imp);
          const sev = cells.find(c => c.row === "media" && c.col === imp)?.severity || "ok";
          return (
            <div key={`media-${imp}`} className={`${bgColors[sev]} rounded p-2 text-sm font-bold ${count > 0 ? "text-foreground" : "text-muted-foreground/30"}`}>
              {count || "—"}
            </div>
          );
        })}

        {/* Baixa row */}
        <div className="text-[10px] text-muted-foreground font-medium p-1 flex items-center">Baixa</div>
        {["baixo", "medio", "alto"].map(imp => {
          const count = getCount("baixa", imp);
          const sev = cells.find(c => c.row === "baixa" && c.col === imp)?.severity || "ok";
          return (
            <div key={`baixa-${imp}`} className={`${bgColors[sev]} rounded p-2 text-sm font-bold ${count > 0 ? "text-foreground" : "text-muted-foreground/30"}`}>
              {count || "—"}
            </div>
          );
        })}
      </div>

      <div className="flex justify-between text-[9px] text-muted-foreground mt-1 px-8">
        <span>← Probabilidade</span>
        <span>Impacto →</span>
      </div>
    </div>
  );
}
