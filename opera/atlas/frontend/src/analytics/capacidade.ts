// Analytics: Capacidade Planejada vs Real
// Regra: dado ausente NUNCA pune o score — apenas reduz visibilidade.

export interface CapacidadeMetrics {
  esperado: number;          // tamanho_equipe_esperada da obra
  presenteHoje: number;      // soma fracao_diaria do dia
  presenteMedio: number;     // média diária no período
  eficienciaHoje: number | null;   // % presenteHoje / esperado
  eficienciaMedia: number | null;  // % presenteMedio / esperado
  diasMedidos: number;
  status: "ok" | "warning" | "critical" | "indisponivel";
  consistencia: "confiavel" | "parcial" | "indisponivel";
}

/**
 * Calcula eficiência de presença a partir de presenças e tamanho esperado.
 * - Se esperado = 0 → indisponível (não pune score)
 * - >= 90% = ok, >= 70% = warning, < 70% = critical
 */
export function calculateCapacidade(
  presencas: any[],
  tamanhoEquipeEsperada: number,
  hoje: string = new Date().toISOString().substring(0, 10),
): CapacidadeMetrics {
  if (!tamanhoEquipeEsperada || tamanhoEquipeEsperada <= 0) {
    return {
      esperado: 0,
      presenteHoje: 0,
      presenteMedio: 0,
      eficienciaHoje: null,
      eficienciaMedia: null,
      diasMedidos: 0,
      status: "indisponivel",
      consistencia: "indisponivel",
    };
  }

  const presencasHoje = presencas.filter((p) => p.data === hoje);
  const presenteHoje = presencasHoje.reduce((acc, p) => acc + Number(p.fracao_diaria || 0), 0);

  // Agrupa por dia para média
  const porDia: Record<string, number> = {};
  presencas.forEach((p) => {
    const dia = p.data;
    if (!dia) return;
    porDia[dia] = (porDia[dia] || 0) + Number(p.fracao_diaria || 0);
  });
  const dias = Object.keys(porDia);
  const presenteMedio = dias.length > 0
    ? dias.reduce((acc, d) => acc + porDia[d], 0) / dias.length
    : 0;

  const eficienciaHoje = presencasHoje.length > 0
    ? Math.round((presenteHoje / tamanhoEquipeEsperada) * 1000) / 10
    : null;
  const eficienciaMedia = dias.length > 0
    ? Math.round((presenteMedio / tamanhoEquipeEsperada) * 1000) / 10
    : null;

  const ref = eficienciaHoje ?? eficienciaMedia ?? 0;
  let status: CapacidadeMetrics["status"] = "ok";
  if (eficienciaHoje === null && eficienciaMedia === null) status = "indisponivel";
  else if (ref < 70) status = "critical";
  else if (ref < 90) status = "warning";

  const consistencia: CapacidadeMetrics["consistencia"] =
    dias.length === 0 ? "indisponivel" : dias.length < 5 ? "parcial" : "confiavel";

  return {
    esperado: tamanhoEquipeEsperada,
    presenteHoje,
    presenteMedio: Math.round(presenteMedio * 100) / 100,
    eficienciaHoje,
    eficienciaMedia,
    diasMedidos: dias.length,
    status,
    consistencia,
  };
}

/**
 * Produtividade por equipe: cruza registros_diarios.equipe (ou atividade) com produção.
 * Se equipe estiver presente, usa equipe; senão, atividade.
 */
export interface ProdutividadeEquipe {
  equipe: string;
  registros: number;
  diasTrabalhados: number;
  producaoTotal: number;
  producaoMediaDia: number;
}

/**
 * @deprecated Prefira useProdutividadeEquipe (RPC). Mantido apenas para fallback offline/guest.
 * Usa producao_valor (numérico do banco) quando disponível; só regex no producao texto se ausente.
 */
export function calculateProdutividadePorEquipe(registros: any[]): ProdutividadeEquipe[] {
  const grupos: Record<string, { registros: number; dias: Set<string>; producao: number }> = {};

  registros.forEach((r) => {
    const rawKey = (r.equipe_normalizada || r.equipe || r.atividade || "sem_equipe").toString().trim();
    const key = rawKey.toLowerCase().replace(/\s+/g, "_");
    let prod: number;
    if (typeof r.producao_valor === "number" && !isNaN(r.producao_valor)) {
      prod = r.producao_valor;
    } else if (typeof r.producao === "string") {
      const match = r.producao.replace(",", ".").match(/[0-9]+(?:\.[0-9]+)?/);
      prod = match ? parseFloat(match[0]) : NaN;
    } else {
      prod = Number(r.producao);
    }
    if (!grupos[key]) grupos[key] = { registros: 0, dias: new Set(), producao: 0 };
    grupos[key].registros += 1;
    if (r.data_registro) grupos[key].dias.add(r.data_registro);
    if (!isNaN(prod)) grupos[key].producao += prod;
  });

  return Object.entries(grupos)
    .map(([equipe, g]) => ({
      equipe,
      registros: g.registros,
      diasTrabalhados: g.dias.size,
      producaoTotal: Math.round(g.producao * 100) / 100,
      producaoMediaDia: g.dias.size > 0 ? Math.round((g.producao / g.dias.size) * 100) / 100 : 0,
    }))
    .sort((a, b) => b.producaoTotal - a.producaoTotal);
}
