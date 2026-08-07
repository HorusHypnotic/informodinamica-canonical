import { useMemo } from "react";
import { calculateOperaScore, OperaScoreBreakdown, ConsistencyItem } from "@/analytics/operaScore";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { CheckCircle2, AlertTriangle, XCircle, Info } from "lucide-react";

interface OperaScoreCardProps {
  registros: any[];
  consumo: any[];
  ativos: any[];
  riscos: any[];
  retrabalhos: any[];
  lancamentos: any[];
  incidentes: any[];
  presencas?: any[];
  obra?: any;
}

const pillars = [
  { key: "organizacao" as const, label: "O", name: "Organização", max: 20 },
  { key: "padronizacao" as const, label: "P", name: "Padronização", max: 20 },
  { key: "eficiencia" as const, label: "E", name: "Eficiência", max: 20 },
  { key: "reducaoPerdas" as const, label: "R", name: "Redução de Perdas", max: 20 },
  { key: "analiseContinua" as const, label: "A", name: "Análise Contínua", max: 20 },
];

function getScoreColor(score: number): string {
  if (score >= 80) return "text-status-ok";
  if (score >= 60) return "text-status-warning";
  return "text-status-critical";
}

function getScoreBg(score: number): string {
  if (score >= 80) return "bg-status-ok";
  if (score >= 60) return "bg-status-warning";
  return "bg-status-critical";
}

const consistencyIcons = {
  confiavel: <CheckCircle2 className="h-3.5 w-3.5 text-status-ok" />,
  parcial: <AlertTriangle className="h-3.5 w-3.5 text-status-warning" />,
  indisponivel: <XCircle className="h-3.5 w-3.5 text-status-critical" />,
};

const consistencyLabels = {
  confiavel: "Confiável",
  parcial: "Parcial",
  indisponivel: "Indisponível",
};

const consistencyColors = {
  confiavel: "text-status-ok",
  parcial: "text-status-warning",
  indisponivel: "text-status-critical",
};

export function OperaScoreCard(props: OperaScoreCardProps) {
  const score = useMemo(
    () => calculateOperaScore(props),
    [props.registros, props.consumo, props.ativos, props.riscos, props.retrabalhos, props.lancamentos, props.incidentes, props.obra]
  );

  const allItems = useMemo(() => {
    const items: ConsistencyItem[] = [];
    for (const p of pillars) {
      items.push(...score.consistency[p.key].items);
    }
    return items;
  }, [score]);

  return (
    <div className="glass-card p-6">
      <div className="flex flex-col sm:flex-row items-center gap-6">
        {/* Score circular */}
        <div className="relative w-28 h-28 shrink-0">
          <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
            <circle cx="50" cy="50" r="42" fill="none" stroke="hsl(var(--secondary))" strokeWidth="8" />
            <circle
              cx="50" cy="50" r="42" fill="none"
              stroke={score.total >= 80 ? "hsl(var(--status-ok))" : score.total >= 60 ? "hsl(var(--status-warning))" : "hsl(var(--status-critical))"}
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${(score.total / 100) * 264} 264`}
              className="transition-all duration-1000"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`text-3xl font-bold ${getScoreColor(score.total)}`}>{score.total}</span>
            <span className="text-[10px] text-muted-foreground font-mono">/100</span>
          </div>
        </div>

        {/* Breakdown */}
        <div className="flex-1 w-full">
          <div className="flex items-center gap-2 mb-3">
            <h3 className="text-sm font-semibold">Score O.P.E.R.A.</h3>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium border ${
                  score.consistency.overall === "confiavel" ? "border-status-ok/30 bg-status-ok/10" :
                  score.consistency.overall === "parcial" ? "border-status-warning/30 bg-status-warning/10" :
                  "border-status-critical/30 bg-status-critical/10"
                }`}>
                  {consistencyIcons[score.consistency.overall]}
                  <span className={consistencyColors[score.consistency.overall]}>
                    {consistencyLabels[score.consistency.overall]}
                  </span>
                </span>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="max-w-xs">
                <p className="text-xs font-medium mb-1">Índice de consistência dos dados</p>
                <p className="text-xs text-muted-foreground">
                  {score.consistency.overall === "confiavel"
                    ? "Todos os dados estão completos — score confiável"
                    : score.consistency.overall === "parcial"
                    ? "Alguns dados estão incompletos — score pode estar impreciso"
                    : "Dados críticos ausentes — alguns indicadores indisponíveis"}
                </p>
              </TooltipContent>
            </Tooltip>
          </div>
          <div className="space-y-2">
            {pillars.map((p) => {
              const val = score[p.key];
              const pct = (val / p.max) * 100;
              const pillarConsistency = score.consistency[p.key];
              return (
                <Tooltip key={p.key}>
                  <TooltipTrigger asChild>
                    <div className="flex items-center gap-3 cursor-default">
                      <span className="w-5 h-5 rounded text-[10px] font-bold flex items-center justify-center bg-primary/20 text-primary shrink-0">
                        {p.label}
                      </span>
                      <div className="flex-1 h-2.5 rounded-full bg-secondary overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-700 ${getScoreBg(pct)}`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <span className="text-xs font-mono w-10 text-right text-muted-foreground">{val}/{p.max}</span>
                      <span className="shrink-0">{consistencyIcons[pillarConsistency.level]}</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="right" className="max-w-xs">
                    <p className="text-xs font-medium">{p.name}: {val} de {p.max} pontos</p>
                    {pillarConsistency.items.length > 0 && (
                      <div className="mt-1.5 space-y-1">
                        {pillarConsistency.items.map(item => (
                          <p key={item.key} className="text-xs text-muted-foreground">
                            {item.status === "indisponivel" ? "❌" : "⚠️"} {item.message}
                          </p>
                        ))}
                      </div>
                    )}
                  </TooltipContent>
                </Tooltip>
              );
            })}
          </div>
        </div>
      </div>

      {/* Consistency feedback - only show if there are issues */}
      {allItems.length > 0 && (
        <div className="mt-4 pt-4 border-t border-border/50">
          <div className="flex items-center gap-1.5 mb-2">
            <Info className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-xs text-muted-foreground font-medium">
              {allItems.length === 1 ? "1 ponto de atenção" : `${allItems.length} pontos de atenção`} — dados incompletos reduzem a precisão do score
            </span>
          </div>
          <div className="space-y-1.5 max-h-[120px] overflow-y-auto">
            {allItems.slice(0, 4).map(item => (
              <div key={item.key} className="flex items-start gap-2 text-xs">
                {consistencyIcons[item.status]}
                <div className="flex-1 min-w-0">
                  <span className="text-foreground">{item.label}</span>
                  {item.action && (
                    <span className="text-muted-foreground"> → {item.action}</span>
                  )}
                </div>
              </div>
            ))}
            {allItems.length > 4 && (
              <p className="text-xs text-muted-foreground pl-5">
                +{allItems.length - 4} outro(s) ponto(s)
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
