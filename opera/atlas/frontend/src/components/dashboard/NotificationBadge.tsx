import { AlertTriangle, Clock, Shield, Package, DollarSign, Bell } from "lucide-react";

interface NotificationBadgeProps {
  acoesVencidas: number;
  riscosAbertos: number;
  checklistPendentes: number;
  materiaisCriticos: number;
  anomalias: number;
}

export function NotificationBadge({ acoesVencidas, riscosAbertos, checklistPendentes, materiaisCriticos, anomalias }: NotificationBadgeProps) {
  const total = acoesVencidas + riscosAbertos + checklistPendentes + materiaisCriticos + anomalias;
  if (total === 0) return null;

  const items = [
    { count: acoesVencidas, label: "ações vencidas", icon: <Clock className="h-3 w-3" />, color: "text-status-critical" },
    { count: riscosAbertos, label: "riscos sem tratamento", icon: <Shield className="h-3 w-3" />, color: "text-status-warning" },
    { count: checklistPendentes, label: "checklist pendentes", icon: <AlertTriangle className="h-3 w-3" />, color: "text-status-warning" },
    { count: materiaisCriticos, label: "materiais críticos", icon: <Package className="h-3 w-3" />, color: "text-status-critical" },
    { count: anomalias, label: "anomalias detectadas", icon: <DollarSign className="h-3 w-3" />, color: "text-status-warning" },
  ].filter(i => i.count > 0);

  return (
    <div className="bg-status-warning/5 border border-status-warning/20 rounded-xl p-3 mb-4">
      <div className="flex items-center gap-2 mb-2">
        <div className="relative">
          <Bell className="h-4 w-4 text-status-warning" />
          <span className="absolute -top-1.5 -right-1.5 bg-status-critical text-primary-foreground text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
            {total}
          </span>
        </div>
        <span className="text-xs font-semibold">Atenção necessária</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {items.map((item, i) => (
          <div key={i} className={`flex items-center gap-1 text-[11px] ${item.color}`}>
            {item.icon}
            <span className="font-medium">{item.count}</span>
            <span className="text-muted-foreground">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
