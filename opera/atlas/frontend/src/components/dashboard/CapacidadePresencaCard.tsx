import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users2, AlertTriangle, Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import type { EficienciaPresencaRow } from "@/hooks/useDashboardAggregates";

interface Props {
  /** Dado oficial do RPC eficiencia_presenca. Null = obra sem dados ou sem capacidade. */
  data: EficienciaPresencaRow | null | undefined;
  obraNome?: string;
  isLoading?: boolean;
}

type Status = "ok" | "warning" | "critical" | "indisponivel";

const STATUS_STYLES: Record<Status, { color: string; bg: string; label: string }> = {
  ok: { color: "text-status-ok", bg: "bg-status-ok/10", label: "Ótima" },
  warning: { color: "text-status-warning", bg: "bg-status-warning/10", label: "Atenção" },
  critical: { color: "text-status-critical", bg: "bg-status-critical/10", label: "Crítica" },
  indisponivel: { color: "text-muted-foreground", bg: "bg-muted/30", label: "Sem dados" },
};

function statusFor(eficiencia: number | null, esperado: number): Status {
  if (!esperado || esperado <= 0) return "indisponivel";
  if (eficiencia === null) return "indisponivel";
  if (eficiencia < 70) return "critical";
  if (eficiencia < 90) return "warning";
  return "ok";
}

export function CapacidadePresencaCard({ data, obraNome, isLoading }: Props) {
  const esperado = data?.esperado ?? 0;
  const presente = data?.presente ?? 0;
  const eficiencia = data?.eficiencia ?? null;
  const status: Status = statusFor(eficiencia, esperado);
  const s = STATUS_STYLES[status];

  return (
    <Card data-tour="capacidade-card">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            <Users2 className="h-4 w-4 text-primary" />
            Capacidade de Presença
          </CardTitle>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="text-muted-foreground hover:text-foreground transition-colors">
                  <Info className="h-3.5 w-3.5" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="left" className="max-w-xs">
                <p className="text-xs">
                  Mostra quantas pessoas planejadas estão efetivamente presentes hoje.
                  Calculado como <strong>presença real / equipe esperada</strong>.
                  Configure o tamanho da equipe esperada no cadastro da obra.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {isLoading ? (
          <div className="h-24 animate-pulse bg-muted/30 rounded" />
        ) : status === "indisponivel" ? (
          <div className="flex items-start gap-2 p-3 rounded-md bg-muted/30 border border-muted">
            <AlertTriangle className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
            <div className="text-xs text-muted-foreground">
              <p className="font-medium mb-1">Capacidade não configurada</p>
              <p>
                {!obraNome
                  ? "Selecione uma obra para visualizar a eficiência de presença."
                  : <>Defina <strong>tamanho da equipe esperada</strong> no cadastro da obra para visualizar a eficiência de presença.</>}
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-end justify-between">
              <div>
                <div className={`text-3xl font-bold ${s.color}`}>
                  {eficiencia !== null ? `${eficiencia.toFixed(0)}%` : "—"}
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">Eficiência de hoje</p>
              </div>
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${s.bg} ${s.color}`}>
                {s.label}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2 rounded bg-muted/30">
                <p className="text-muted-foreground">Esperado</p>
                <p className="font-semibold text-foreground">{esperado} pessoas</p>
              </div>
              <div className="p-2 rounded bg-muted/30">
                <p className="text-muted-foreground">Hoje</p>
                <p className="font-semibold text-foreground">{presente.toFixed(1)} diárias</p>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
