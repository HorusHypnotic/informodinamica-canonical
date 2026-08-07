import { useMemo } from "react";
import { Calendar, Users, DollarSign, AlertTriangle, Package, CheckCircle2 } from "lucide-react";
import { ShareButton } from "@/components/dashboard/ShareButton";

interface DailySummaryProps {
  registros: any[];
  presencas: any[];
  lancamentos: any[];
  consumo: any[];
  acoes: any[];
  checklist: any[];
  colaboradores: any[];
  obraNome?: string;
}

export function DailySummary({ registros, presencas, lancamentos, consumo, acoes, checklist, colaboradores, obraNome }: DailySummaryProps) {
  const today = new Date().toISOString().substring(0, 10);

  const stats = useMemo(() => {
    const presenteHoje = presencas.filter(p => p.data === today && p.tipo === "presente").length;
    const faltasHoje = presencas.filter(p => p.data === today && (p.tipo === "falta_justificada" || p.tipo === "falta_injustificada")).length;
    
    const custoDiarias = presencas
      .filter(p => p.data === today && p.tipo === "presente")
      .reduce((s: number, p: any) => s + Number(p.valor_diaria_usado || 0), 0);

    const materiaisAlerta = consumo.filter(m => {
      const saldo = Number(m.previsto) - Number(m.real_consumo);
      const pct = Number(m.previsto) > 0 ? (saldo / Number(m.previsto)) * 100 : 100;
      return pct < 20;
    }).length;

    const acoesPendentes = acoes.filter(a => a.status === "pendente").length;
    const acoesVencidas = acoes.filter(a => a.status === "pendente" && a.prazo && a.prazo < today).length;

    const checklistPendentes = checklist.filter(c => !c.verificado).length;

    return {
      presenteHoje, faltasHoje, custoDiarias,
      materiaisAlerta, acoesPendentes, acoesVencidas, checklistPendentes,
      totalColab: colaboradores.filter((c: any) => c.ativo).length,
    };
  }, [presencas, consumo, acoes, checklist, colaboradores, today]);

  const items = [
    { icon: <Users className="h-3.5 w-3.5" />, text: `${stats.presenteHoje} presentes`, sub: stats.faltasHoje > 0 ? `${stats.faltasHoje} faltas` : undefined, color: "text-status-ok" },
    { icon: <DollarSign className="h-3.5 w-3.5" />, text: `R$ ${stats.custoDiarias.toLocaleString("pt-BR")} em diárias`, color: "text-foreground" },
    { icon: <Package className="h-3.5 w-3.5" />, text: `${stats.materiaisAlerta} materiais em alerta`, color: stats.materiaisAlerta > 0 ? "text-status-warning" : "text-status-ok" },
    { icon: <AlertTriangle className="h-3.5 w-3.5" />, text: `${stats.acoesPendentes} ações pendentes`, sub: stats.acoesVencidas > 0 ? `${stats.acoesVencidas} vencidas` : undefined, color: stats.acoesVencidas > 0 ? "text-status-critical" : "text-muted-foreground" },
    { icon: <CheckCircle2 className="h-3.5 w-3.5" />, text: `${stats.checklistPendentes} checklist pendentes`, color: stats.checklistPendentes > 0 ? "text-status-warning" : "text-status-ok" },
  ];

  const summaryText = items.map(i => `${i.text}${i.sub ? ` (${i.sub})` : ""}`).join("\n");

  return (
    <div className="glass-card p-4 mb-6">
      <div className="flex items-center gap-2 mb-2">
        <Calendar className="h-4 w-4 text-primary" />
        <h3 className="text-sm font-semibold">Resumo do dia</h3>
        <span className="text-xs text-muted-foreground flex-1">
          {new Date().toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long" })}
        </span>
        <ShareButton summary={summaryText} obraNome={obraNome || "Obra"} />
      </div>
      <div className="flex flex-wrap gap-x-5 gap-y-1.5">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-1.5 text-xs">
            <span className={item.color}>{item.icon}</span>
            <span className={item.color}>{item.text}</span>
            {item.sub && <span className="text-status-critical font-medium">({item.sub})</span>}
          </div>
        ))}
      </div>
    </div>
  );
}
