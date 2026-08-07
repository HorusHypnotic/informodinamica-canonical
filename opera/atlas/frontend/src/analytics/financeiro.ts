// Analytics: Financial intelligence — cost projections, savings, burn rate
export interface FinancialSummary {
  totalReceitas: number;
  totalCustos: number;
  saldo: number;
  margem: number;
  burnRateMensal: number;
  custoRetrabalho: number;
  custoAtrasos: number;
  desperdicioMonetizado: number;
  economiaAcumulada: number;
  projecaoCustoFinal: number;
  custoRealM2: number;
}

export interface BurnRateMonth {
  mes: string;
  custo: number;
  receita: number;
  saldo: number;
  acumulado: number;
}

export function calculateFinancials(
  lancamentos: any[],
  retrabalhos: any[],
  consumo: any[],
  colaboradores: any[],
  presencas: any[],
  obra?: { orcamento_total?: number; area_m2?: number; data_inicio?: string; data_previsao?: string; custo_orcado_m2?: number }
): FinancialSummary {
  const totalReceitas = lancamentos.filter(l => l.tipo === "receita").reduce((s, l) => s + Number(l.valor), 0);
  const totalCustos = lancamentos.filter(l => l.tipo === "custo").reduce((s, l) => s + Number(l.valor), 0);
  const saldo = totalReceitas - totalCustos;
  const margem = totalReceitas > 0 ? (saldo / totalReceitas) * 100 : 0;

  // Burn rate: average monthly cost
  const byMonth: Record<string, number> = {};
  lancamentos.filter(l => l.tipo === "custo").forEach(l => {
    const mes = l.data?.substring(0, 7) || "N/A";
    byMonth[mes] = (byMonth[mes] || 0) + Number(l.valor);
  });
  const months = Object.keys(byMonth);
  const burnRateMensal = months.length > 0 ? Object.values(byMonth).reduce((a, b) => a + b, 0) / months.length : 0;

  // Cost of rework: rework count × average daily rate
  const avgDiaria = colaboradores.length > 0
    ? colaboradores.reduce((s: number, c: any) => s + Number(c.valor_diaria || 0), 0) / colaboradores.length
    : 200; // fallback
  const totalRetrabalho = retrabalhos.reduce((s: number, r: any) => s + Number(r.quantidade || 0), 0);
  const custoRetrabalho = totalRetrabalho * avgDiaria;

  // Cost of delays
  let custoAtrasos = 0;
  if (obra?.data_previsao && obra?.data_inicio) {
    const previsao = new Date(obra.data_previsao);
    const hoje = new Date();
    if (hoje > previsao) {
      const diasAtraso = Math.floor((hoje.getTime() - previsao.getTime()) / 86400000);
      const custoDiario = burnRateMensal / 30;
      custoAtrasos = diasAtraso * custoDiario;
    }
  }

  // Waste monetized (simplified: % waste × total material cost)
  const custoMateriais = lancamentos.filter(l => l.tipo === "custo").reduce((s, l) => s + Number(l.valor), 0) * 0.4; // ~40% is materials
  const despMedio = consumo.length > 0
    ? consumo.filter(m => Number(m.previsto) > 0).reduce((acc, m) => {
        return acc + Math.max(0, (Number(m.real_consumo) - Number(m.previsto)) / Number(m.previsto));
      }, 0) / Math.max(consumo.filter(m => Number(m.previsto) > 0).length, 1)
    : 0;
  const desperdicioMonetizado = custoMateriais * despMedio;

  // Economy: budget - actual spend
  const orcamento = obra?.orcamento_total || 0;
  const economiaAcumulada = orcamento > 0 ? Math.max(0, orcamento - totalCustos) : 0;

  // Projection: if X% of budget used in Y days, project total
  let projecaoCustoFinal = totalCustos;
  if (obra?.data_inicio && totalCustos > 0) {
    const diasDecorridos = Math.max(1, Math.floor((Date.now() - new Date(obra.data_inicio).getTime()) / 86400000));
    const custoPorDia = totalCustos / diasDecorridos;
    if (obra.data_previsao) {
      const diasTotais = Math.floor((new Date(obra.data_previsao).getTime() - new Date(obra.data_inicio).getTime()) / 86400000);
      projecaoCustoFinal = custoPorDia * diasTotais;
    }
  }

  // Cost per m²
  const custoRealM2 = obra?.area_m2 && obra.area_m2 > 0 ? totalCustos / obra.area_m2 : 0;

  return {
    totalReceitas, totalCustos, saldo, margem, burnRateMensal,
    custoRetrabalho, custoAtrasos, desperdicioMonetizado,
    economiaAcumulada, projecaoCustoFinal, custoRealM2,
  };
}

export function calculateBurnRate(lancamentos: any[]): BurnRateMonth[] {
  const byMonth: Record<string, { receita: number; custo: number }> = {};
  lancamentos.forEach(l => {
    const mes = l.data?.substring(0, 7) || "N/A";
    if (!byMonth[mes]) byMonth[mes] = { receita: 0, custo: 0 };
    if (l.tipo === "receita") byMonth[mes].receita += Number(l.valor);
    else byMonth[mes].custo += Number(l.valor);
  });

  let acumulado = 0;
  return Object.entries(byMonth)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([mes, v]) => {
      acumulado += v.receita - v.custo;
      return { mes, custo: v.custo, receita: v.receita, saldo: v.receita - v.custo, acumulado };
    });
}
