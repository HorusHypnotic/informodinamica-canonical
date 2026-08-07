// Analytics: Score O.P.E.R.A. (0-100)
// Dual model: Performance (what's working) + Consistency (data reliability)

export interface ConsistencyItem {
  key: string;
  label: string;
  pillar: "organizacao" | "padronizacao" | "eficiencia" | "reducaoPerdas" | "analiseContinua";
  status: "confiavel" | "parcial" | "indisponivel";
  message: string;
  action?: string;
}

export interface PillarConsistency {
  level: "confiavel" | "parcial" | "indisponivel";
  items: ConsistencyItem[];
}

export interface OperaScoreBreakdown {
  total: number;
  organizacao: number;
  padronizacao: number;
  eficiencia: number;
  reducaoPerdas: number;
  analiseContinua: number;
  consistency: {
    overall: "confiavel" | "parcial" | "indisponivel";
    organizacao: PillarConsistency;
    padronizacao: PillarConsistency;
    eficiencia: PillarConsistency;
    reducaoPerdas: PillarConsistency;
    analiseContinua: PillarConsistency;
  };
}

interface ScoreInput {
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

function getPillarLevel(items: ConsistencyItem[]): "confiavel" | "parcial" | "indisponivel" {
  if (items.length === 0) return "confiavel";
  const hasIndisponivel = items.some(i => i.status === "indisponivel");
  const hasParcial = items.some(i => i.status === "parcial");
  if (hasIndisponivel) return "indisponivel";
  if (hasParcial) return "parcial";
  return "confiavel";
}

export function calculateOperaScore(data: ScoreInput): OperaScoreBreakdown {
  const consistencyItems: ConsistencyItem[] = [];
  const today = new Date();
  const todayStr = today.toISOString().substring(0, 10);
  const weekAgo = new Date(today.getTime() - 7 * 86400000).toISOString().substring(0, 10);

  // === O — Organização (20 pts): registros (60%) + presença (40%) ===
  const okCount = data.registros.filter((r) => r.status === "ok").length;
  const orgRate = data.registros.length > 0 ? okCount / data.registros.length : 0;

  // Presença real declarada (registro_presencas) — usa fracao_diaria como fonte única
  // presente=1, meio_periodo=0.5, falta=0. Soma fracoes / total de registros.
  let taxaPresenca: number | null = null;
  if (data.presencas && data.presencas.length > 0) {
    const somaFracoes = data.presencas.reduce((acc: number, p: any) => {
      const fracao = p.fracao_diaria != null
        ? Number(p.fracao_diaria)
        : (p.tipo === "falta" ? 0 : p.tipo === "meio_periodo" ? 0.5 : 1);
      return acc + fracao;
    }, 0);
    taxaPresenca = somaFracoes / data.presencas.length;
  }

  const organizacao = taxaPresenca !== null
    ? Math.round(((orgRate * 0.6) + (taxaPresenca * 0.4)) * 20)
    : Math.round(orgRate * 20);

  // Consistency checks - O
  if (data.registros.length === 0) {
    consistencyItems.push({
      key: "org_no_registros",
      label: "Sem registros diários",
      pillar: "organizacao",
      status: "indisponivel",
      message: "Dados operacionais incompletos — score de organização sem base de cálculo",
      action: "Registrar atividades diárias da equipe",
    });
  } else {
    const recentRegistros = data.registros.filter((r: any) => r.data_registro >= weekAgo);
    if (recentRegistros.length === 0) {
      consistencyItems.push({
        key: "org_stale_registros",
        label: "Registros desatualizados",
        pillar: "organizacao",
        status: "parcial",
        message: "Sem registros na última semana — visibilidade operacional reduzida",
        action: "Atualizar registros diários",
      });
    }
    const semAtividade = data.registros.filter((r: any) => r.status === "ok" && !r.atividade);
    if (semAtividade.length > 0) {
      consistencyItems.push({
        key: "org_sem_atividade",
        label: "Equipe presente sem produção vinculada",
        pillar: "organizacao",
        status: "parcial",
        message: `${semAtividade.length} registro(s) sem atividade descrita — produtividade não mensurável`,
        action: "Vincular atividade aos registros",
      });
    }
  }

  if (!data.presencas || data.presencas.length === 0) {
    consistencyItems.push({
      key: "org_no_presenca",
      label: "Sem controle de presença da equipe",
      pillar: "organizacao",
      status: "indisponivel",
      message: "Não há registro de presença — controle de equipe comprometido",
      action: "Registrar presença no relatório de equipe",
    });
  }

  // === P — Padronização (20 pts): desperdício médio ===
  let despMedio = 0;
  const validConsumo = data.consumo.filter((m) => Number(m.previsto) > 0);
  if (validConsumo.length > 0) {
    despMedio = validConsumo.reduce((acc, m) => {
      return acc + Math.abs((Number(m.real_consumo) - Number(m.previsto)) / Number(m.previsto)) * 100;
    }, 0) / validConsumo.length;
  }
  const padronizacao = Math.round(Math.max(0, 20 - (despMedio / 15) * 20));

  // Consistency checks - P
  if (data.consumo.length === 0) {
    consistencyItems.push({
      key: "pad_no_consumo",
      label: "Sem visibilidade de consumo",
      pillar: "padronizacao",
      status: "indisponivel",
      message: "Sem dados de consumo de materiais — controle de desperdício indisponível",
      action: "Registrar consumo de materiais",
    });
  } else {
    const semPrevisto = data.consumo.filter((m: any) => Number(m.previsto) === 0);
    if (semPrevisto.length > 0) {
      consistencyItems.push({
        key: "pad_sem_previsto",
        label: "Material sem referência de controle",
        pillar: "padronizacao",
        status: "parcial",
        message: `${semPrevisto.length} material(is) sem valor previsto — desvio não calculável`,
        action: "Definir previsto para cada material",
      });
    }
  }

  // === E — Eficiência (20 pts): % de ativos em uso ===
  const ativosAtivos = data.ativos.filter((a) => a.status === "ativo").length;
  const efRate = data.ativos.length > 0 ? ativosAtivos / data.ativos.length : 0;
  const eficiencia = Math.round(efRate * 20);

  // Consistency checks - E
  if (data.ativos.length === 0) {
    consistencyItems.push({
      key: "ef_no_ativos",
      label: "Sem dados de equipamentos",
      pillar: "eficiencia",
      status: "parcial",
      message: "Equipamentos não cadastrados — eficiência de ativos não mensurável",
      action: "Cadastrar equipamentos e ferramentas",
    });
  }

  // === R — Redução de Perdas (20 pts): riscos e retrabalhos ===
  const totalRetrabalho = data.retrabalhos.reduce((s, r) => s + Number(r.quantidade || 0), 0);
  const riskPenalty = Math.min(data.riscos.length * 2, 10);
  const retPenalty = Math.min(totalRetrabalho, 10);
  const reducaoPerdas = Math.max(0, 20 - riskPenalty - retPenalty);

  // Consistency checks - R
  const retSemDescricao = data.retrabalhos.filter((r: any) => !r.descricao);
  if (retSemDescricao.length > 0) {
    consistencyItems.push({
      key: "red_ret_sem_desc",
      label: "Retrabalho sem causa identificada",
      pillar: "reducaoPerdas",
      status: "parcial",
      message: `${retSemDescricao.length} retrabalho(s) sem descrição — não é possível prevenir recorrência`,
      action: "Descrever causa dos retrabalhos",
    });
  }
  const riscosAltosSemPrazo = data.riscos.filter((r: any) => r.severidade === "alta" && !r.prazo);
  if (riscosAltosSemPrazo.length > 0) {
    consistencyItems.push({
      key: "red_risco_sem_prazo",
      label: "Risco crítico sem plano de ação",
      pillar: "reducaoPerdas",
      status: "parcial",
      message: `${riscosAltosSemPrazo.length} risco(s) de alta severidade sem prazo definido`,
      action: "Definir prazo para riscos críticos",
    });
  }

  // === A — Análise Contínua (20 pts): margem + segurança ===
  const receitas = data.lancamentos.filter((l) => l.tipo === "receita").reduce((s, l) => s + Number(l.valor), 0);
  const custos = data.lancamentos.filter((l) => l.tipo === "custo").reduce((s, l) => s + Number(l.valor), 0);
  const margem = receitas > 0 ? ((receitas - custos) / receitas) * 100 : 0;
  const margemScore = Math.min(Math.round((margem / 25) * 10), 10);

  const ncAbertas = data.incidentes.filter((i) => i.tipo === "nc" && i.status === "aberto").length;
  const segScore = Math.max(0, 10 - ncAbertas * 2);
  const analiseContinua = margemScore + segScore;

  // Consistency checks - A
  if (data.lancamentos.length === 0) {
    consistencyItems.push({
      key: "ana_no_financeiro",
      label: "Dados financeiros incompletos",
      pillar: "analiseContinua",
      status: "indisponivel",
      message: "Sem lançamentos financeiros — projeção de custo e margem indisponível",
      action: "Lançar receitas e custos da obra",
    });
  } else {
    const recentLanc = data.lancamentos.filter((l: any) => l.data >= weekAgo);
    if (recentLanc.length === 0) {
      consistencyItems.push({
        key: "ana_stale_financeiro",
        label: "Financeiro desatualizado",
        pillar: "analiseContinua",
        status: "parcial",
        message: "Sem lançamentos na última semana — análise financeira pode estar imprecisa",
        action: "Atualizar lançamentos financeiros",
      });
    }
  }

  if (data.obra && (!data.obra.orcamento_total || Number(data.obra.orcamento_total) === 0)) {
    consistencyItems.push({
      key: "ana_sem_orcamento",
      label: "Indicadores financeiros indisponíveis",
      pillar: "analiseContinua",
      status: "indisponivel",
      message: "Obra sem orçamento cadastrado — projeção de custo e burn rate indisponível",
      action: "Cadastrar orçamento total da obra",
    });
  }

  const ncAntigas = data.incidentes.filter((i: any) => {
    if (i.tipo !== "nc" || i.status !== "aberto") return false;
    const diffDays = (today.getTime() - new Date(i.data).getTime()) / 86400000;
    return diffDays > 14;
  });
  if (ncAntigas.length > 0) {
    consistencyItems.push({
      key: "ana_nc_antiga",
      label: "Não conformidades sem resolução",
      pillar: "analiseContinua",
      status: "parcial",
      message: `${ncAntigas.length} NC(s) abertas há mais de 14 dias — sem resolução no prazo ideal`,
      action: "Resolver ou atualizar status das NCs",
    });
  }

  // Sort consistency items by severity (indisponivel first, then parcial)
  const severityWeight: Record<string, number> = { indisponivel: 2, parcial: 1, confiavel: 0 };
  consistencyItems.sort((a, b) => severityWeight[b.status] - severityWeight[a.status]);

  // Build pillar consistency
  const byPillar = (p: ConsistencyItem["pillar"]) => consistencyItems.filter(i => i.pillar === p);
  const orgItems = byPillar("organizacao");
  const padItems = byPillar("padronizacao");
  const efItems = byPillar("eficiencia");
  const redItems = byPillar("reducaoPerdas");
  const anaItems = byPillar("analiseContinua");

  const levels = [
    getPillarLevel(orgItems),
    getPillarLevel(padItems),
    getPillarLevel(efItems),
    getPillarLevel(redItems),
    getPillarLevel(anaItems),
  ];
  const hasIndisponivel = levels.includes("indisponivel");
  const hasParcial = levels.includes("parcial");
  const overallLevel = hasIndisponivel ? "indisponivel" : hasParcial ? "parcial" : "confiavel";

  const total = organizacao + padronizacao + eficiencia + reducaoPerdas + analiseContinua;

  return {
    total,
    organizacao,
    padronizacao,
    eficiencia,
    reducaoPerdas,
    analiseContinua,
    consistency: {
      overall: overallLevel,
      organizacao: { level: getPillarLevel(orgItems), items: orgItems },
      padronizacao: { level: getPillarLevel(padItems), items: padItems },
      eficiencia: { level: getPillarLevel(efItems), items: efItems },
      reducaoPerdas: { level: getPillarLevel(redItems), items: redItems },
      analiseContinua: { level: getPillarLevel(anaItems), items: anaItems },
    },
  };
}
