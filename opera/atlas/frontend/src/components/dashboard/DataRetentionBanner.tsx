import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle, Clock, Info } from "lucide-react";
import { useTableData } from "@/hooks/useTableData";
import { useMemo } from "react";

interface OldestRecord {
  table: string;
  label: string;
  oldestDate: Date | null;
}

export function DataRetentionBanner() {
  const { data: registros = [] } = useTableData("registros_diarios");
  const { data: consumo = [] } = useTableData("consumo_materiais");
  const { data: incidentes = [] } = useTableData("incidentes_seguranca");
  const { data: lancamentos = [] } = useTableData("lancamentos_financeiros");
  const { data: retrabalhos = [] } = useTableData("retrabalhos");

  const retentionMonths = 3;

  const warnings = useMemo(() => {
    const now = new Date();
    const cutoff = new Date();
    cutoff.setMonth(cutoff.getMonth() - retentionMonths);

    const tables: { label: string; data: any[] }[] = [
      { label: "Registros diários", data: registros },
      { label: "Consumo de materiais", data: consumo },
      { label: "Incidentes", data: incidentes },
      { label: "Lançamentos financeiros", data: lancamentos },
      { label: "Retrabalhos", data: retrabalhos },
    ];

    const alerts: { label: string; daysLeft: number; count: number }[] = [];

    for (const t of tables) {
      if (t.data.length === 0) continue;

      const oldRecords = t.data.filter((r: any) => {
        const d = new Date(r.created_at);
        const daysUntilDeletion = Math.floor(
          (cutoff.getTime() - (d.getTime() - retentionMonths * 30 * 24 * 60 * 60 * 1000)) / (1000 * 60 * 60 * 24)
        );
        // Record is within 30 days of being deleted
        const recordAge = (now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24);
        const daysLeft = retentionMonths * 30 - recordAge;
        return daysLeft <= 30 && daysLeft > 0;
      });

      if (oldRecords.length > 0) {
        const oldest = oldRecords.reduce((min: any, r: any) =>
          new Date(r.created_at) < new Date(min.created_at) ? r : min
        );
        const ageInDays = (now.getTime() - new Date(oldest.created_at).getTime()) / (1000 * 60 * 60 * 24);
        const daysLeft = Math.max(0, Math.floor(retentionMonths * 30 - ageInDays));

        alerts.push({ label: t.label, daysLeft, count: oldRecords.length });
      }
    }

    return alerts.sort((a, b) => a.daysLeft - b.daysLeft);
  }, [registros, consumo, incidentes, lancamentos, retrabalhos]);

  const hasUrgent = warnings.some((w) => w.daysLeft <= 7);
  const hasCritical = warnings.some((w) => w.daysLeft <= 1);

  return (
    <div className="space-y-3 mb-6">
      {/* Static beta retention notice */}
      <Alert className="border-primary/30 bg-primary/5">
        <Info className="h-4 w-4 text-primary" />
        <AlertTitle className="text-sm font-semibold">Política de Retenção — Beta</AlertTitle>
        <AlertDescription className="text-xs text-muted-foreground">
          Durante o período beta, os dados operacionais são mantidos por até <strong>3 meses</strong>.
          Registros mais antigos são removidos automaticamente para manter o desempenho do sistema.
        </AlertDescription>
      </Alert>

      {/* Dynamic warnings for data approaching deletion */}
      {hasCritical && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle className="text-sm font-semibold">Exclusão iminente</AlertTitle>
          <AlertDescription className="text-xs">
            {warnings.filter((w) => w.daysLeft <= 1).map((w) => (
              <span key={w.label} className="block">
                <strong>{w.count}</strong> registros de "{w.label}" serão removidos nas próximas 24h.
              </span>
            ))}
          </AlertDescription>
        </Alert>
      )}

      {hasUrgent && !hasCritical && (
        <Alert className="border-amber-500/50 bg-amber-500/5">
          <Clock className="h-4 w-4 text-amber-500" />
          <AlertTitle className="text-sm font-semibold text-amber-600">Exclusão próxima</AlertTitle>
          <AlertDescription className="text-xs text-muted-foreground">
            {warnings.filter((w) => w.daysLeft <= 7 && w.daysLeft > 1).map((w) => (
              <span key={w.label} className="block">
                <strong>{w.count}</strong> registros de "{w.label}" serão removidos em <strong>{w.daysLeft} dias</strong>.
              </span>
            ))}
          </AlertDescription>
        </Alert>
      )}

      {warnings.length > 0 && !hasUrgent && !hasCritical && (
        <Alert className="border-blue-500/30 bg-blue-500/5">
          <Info className="h-4 w-4 text-blue-500" />
          <AlertTitle className="text-sm font-semibold text-blue-600">Dados próximos da retenção</AlertTitle>
          <AlertDescription className="text-xs text-muted-foreground">
            {warnings.map((w) => (
              <span key={w.label} className="block">
                <strong>{w.count}</strong> registros de "{w.label}" — restam <strong>{w.daysLeft} dias</strong>.
              </span>
            ))}
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
