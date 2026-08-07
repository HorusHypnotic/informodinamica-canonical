// Analytics: Ranking de produtividade por atividade/equipe
export interface RankingItem {
  equipe: string;
  producao: number;
}

function getProd(r: any): number {
  if (typeof r.producao_valor === "number" && !isNaN(r.producao_valor)) return r.producao_valor;
  if (typeof r.producao === "string") {
    const m = r.producao.replace(",", ".").match(/[0-9]+(?:\.[0-9]+)?/);
    return m ? parseFloat(m[0]) : 0;
  }
  return Number(r.producao) || 0;
}

export function calculateRanking(registros: any[], top = 5): RankingItem[] {
  const byAtividade: Record<string, number> = {};
  registros.forEach((r) => {
    const equipe = r.equipe || r.atividade || "Sem atividade";
    byAtividade[equipe] = (byAtividade[equipe] || 0) + getProd(r);
  });
  return Object.entries(byAtividade)
    .map(([equipe, producao]) => ({ equipe, producao: Math.round(producao) }))
    .sort((a, b) => b.producao - a.producao)
    .slice(0, top);
}
