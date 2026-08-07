import { useMemo } from "react";
import { Truck, DollarSign, Clock, AlertCircle } from "lucide-react";

interface FornecedorRankingCardProps {
  lancamentos: any[];
}

interface FornecedorStats {
  nome: string;
  totalGasto: number;
  qtdLancamentos: number;
  pendentes: number;
  atrasados: number;
}

export function FornecedorRankingCard({ lancamentos }: FornecedorRankingCardProps) {
  const ranking = useMemo(() => {
    const byFornecedor: Record<string, FornecedorStats> = {};

    lancamentos
      .filter((l: any) => l.tipo === "custo" && l.fornecedor)
      .forEach((l: any) => {
        const nome = l.fornecedor!;
        if (!byFornecedor[nome]) {
          byFornecedor[nome] = { nome, totalGasto: 0, qtdLancamentos: 0, pendentes: 0, atrasados: 0 };
        }
        byFornecedor[nome].totalGasto += Number(l.valor);
        byFornecedor[nome].qtdLancamentos += 1;
        if (l.status_pagamento === "pendente") byFornecedor[nome].pendentes += 1;
        if (l.status_pagamento === "atrasado") byFornecedor[nome].atrasados += 1;
      });

    return Object.values(byFornecedor).sort((a, b) => b.totalGasto - a.totalGasto).slice(0, 8);
  }, [lancamentos]);

  if (ranking.length === 0) return null;

  const totalGeral = ranking.reduce((s, r) => s + r.totalGasto, 0);

  return (
    <div className="glass-card p-4">
      <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
        <Truck className="h-4 w-4 text-primary" />
        Top Fornecedores
      </h3>
      <div className="space-y-2.5">
        {ranking.map((f, i) => {
          const pct = totalGeral > 0 ? (f.totalGasto / totalGeral) * 100 : 0;
          return (
            <div key={i} className="group">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium truncate flex-1">{f.nome}</span>
                <div className="flex items-center gap-2 shrink-0">
                  {f.atrasados > 0 && (
                    <span className="text-[10px] text-status-critical flex items-center gap-0.5">
                      <AlertCircle className="h-3 w-3" />{f.atrasados}
                    </span>
                  )}
                  {f.pendentes > 0 && (
                    <span className="text-[10px] text-status-warning flex items-center gap-0.5">
                      <Clock className="h-3 w-3" />{f.pendentes}
                    </span>
                  )}
                  <span className="text-xs font-mono font-semibold">
                    R$ {(f.totalGasto / 1000).toFixed(1)}k
                  </span>
                </div>
              </div>
              <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                <div className="h-full rounded-full bg-primary/70 transition-all" style={{ width: `${pct}%` }} />
              </div>
              <p className="text-[10px] text-muted-foreground mt-0.5">
                {f.qtdLancamentos} lançamentos • {pct.toFixed(0)}% do total
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
