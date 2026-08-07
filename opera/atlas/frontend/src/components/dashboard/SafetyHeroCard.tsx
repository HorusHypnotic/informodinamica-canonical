import { Heart, Award } from "lucide-react";

interface SafetyHeroCardProps {
  diasSemAcidente: number;
  indiceSeveridade: number;
  taxaResolucao: number;
  checklistCompliance: number;
}

function getMilestoneMessage(dias: number): string | null {
  if (dias >= 365) return "🏆 1 ANO sem acidentes!";
  if (dias >= 180) return "🎉 180 dias sem acidentes!";
  if (dias >= 90) return "⭐ 90 dias sem acidentes!";
  if (dias >= 60) return "💪 60 dias sem acidentes!";
  if (dias >= 30) return "👏 30 dias sem acidentes!";
  return null;
}

export function SafetyHeroCard({ diasSemAcidente, indiceSeveridade, taxaResolucao, checklistCompliance }: SafetyHeroCardProps) {
  const milestone = getMilestoneMessage(diasSemAcidente);

  return (
    <div className="glass-card p-5 relative overflow-hidden">
      <div className="absolute -top-4 -right-4 opacity-5">
        <Heart className="h-32 w-32" />
      </div>
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2.5 rounded-xl bg-status-ok/15">
            <Heart className="h-6 w-6 text-status-ok" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Segurança</p>
            <p className="text-3xl font-bold text-status-ok">{diasSemAcidente}</p>
            <p className="text-xs text-muted-foreground">dias sem acidentes</p>
          </div>
          {milestone && (
            <div className="ml-auto">
              <div className="bg-status-ok/10 border border-status-ok/30 rounded-lg px-3 py-1.5 text-xs font-medium text-status-ok animate-pulse">
                {milestone}
              </div>
            </div>
          )}
        </div>
        <div className="grid grid-cols-3 gap-2 mt-3">
          <div className="text-center p-2 bg-secondary/50 rounded-lg">
            <p className="text-lg font-bold text-foreground">{indiceSeveridade}</p>
            <p className="text-[10px] text-muted-foreground">Índice severidade</p>
          </div>
          <div className="text-center p-2 bg-secondary/50 rounded-lg">
            <p className={`text-lg font-bold ${taxaResolucao >= 90 ? "text-status-ok" : "text-status-warning"}`}>
              {taxaResolucao.toFixed(0)}%
            </p>
            <p className="text-[10px] text-muted-foreground">Taxa resolução</p>
          </div>
          <div className="text-center p-2 bg-secondary/50 rounded-lg">
            <p className={`text-lg font-bold ${checklistCompliance >= 90 ? "text-status-ok" : "text-status-warning"}`}>
              {checklistCompliance.toFixed(0)}%
            </p>
            <p className="text-[10px] text-muted-foreground">Checklist</p>
          </div>
        </div>
      </div>
    </div>
  );
}
