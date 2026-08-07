import { useMemo } from "react";
import { TrendingUp, TrendingDown, DollarSign, AlertTriangle, Banknote } from "lucide-react";
import { FinancialSummary } from "@/analytics/financeiro";

interface EconomyHeroCardProps {
  financials: FinancialSummary;
  orcamentoTotal: number;
}

function formatCurrency(v: number): string {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 }).format(v);
}

export function EconomyHeroCard({ financials, orcamentoTotal }: EconomyHeroCardProps) {
  const economia = orcamentoTotal > 0 ? orcamentoTotal - financials.totalCustos : financials.saldo;
  const isPositive = economia >= 0;
  const percentual = orcamentoTotal > 0 ? ((economia / orcamentoTotal) * 100) : 0;

  return (
    <div className={`relative overflow-hidden rounded-xl border p-6 mb-6 ${
      isPositive 
        ? "bg-gradient-to-br from-status-ok/10 via-status-ok/5 to-transparent border-status-ok/30" 
        : "bg-gradient-to-br from-status-critical/10 via-status-critical/5 to-transparent border-status-critical/30"
    }`}>
      <div className="absolute top-3 right-3 opacity-10">
        <Banknote className="h-24 w-24" />
      </div>
      
      <div className="relative z-10">
        <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium mb-1">
          {isPositive ? "💰 Economia acumulada" : "⚠️ Estouro de orçamento"}
        </p>
        <p className={`text-4xl sm:text-5xl font-bold tracking-tight ${
          isPositive ? "text-status-ok" : "text-status-critical"
        }`}>
          {formatCurrency(Math.abs(economia))}
        </p>
        {orcamentoTotal > 0 && (
          <p className="text-sm text-muted-foreground mt-1">
            {isPositive ? `${percentual.toFixed(1)}% abaixo do orçamento` : `${Math.abs(percentual).toFixed(1)}% acima do orçamento`}
          </p>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5">
          <MiniMetric 
            label="Custo de retrabalho" 
            value={formatCurrency(financials.custoRetrabalho)} 
            negative={financials.custoRetrabalho > 0}
          />
          <MiniMetric 
            label="Desperdício em R$" 
            value={formatCurrency(financials.desperdicioMonetizado)} 
            negative={financials.desperdicioMonetizado > 0}
          />
          <MiniMetric 
            label="Custo de atrasos" 
            value={formatCurrency(financials.custoAtrasos)} 
            negative={financials.custoAtrasos > 0}
          />
          <MiniMetric 
            label="Burn rate/mês" 
            value={formatCurrency(financials.burnRateMensal)} 
          />
        </div>
      </div>
    </div>
  );
}

function MiniMetric({ label, value, negative }: { label: string; value: string; negative?: boolean }) {
  return (
    <div className="bg-background/50 rounded-lg p-2.5 border border-border/50">
      <p className="text-[10px] text-muted-foreground uppercase tracking-wide">{label}</p>
      <p className={`text-sm font-bold mt-0.5 ${negative ? "text-status-critical" : "text-foreground"}`}>
        {value}
      </p>
    </div>
  );
}
