// Motores de cálculo da TDO — funções puras, testáveis isoladamente.

export type NivelICO =
  | "verde"
  | "amarelo"
  | "laranja"
  | "vermelho"
  | "cinza"
  | "preto";

export interface NivelInfo {
  nivel: NivelICO;
  label: string;
  descricao: string;
  /** Token semântico Tailwind, ex.: "bg-ico-verde". */
  token: string;
}

export const NIVEIS_ICO: Record<NivelICO, NivelInfo> = {
  verde: {
    nivel: "verde",
    label: "Verde",
    descricao: "Monitore. Não é urgente.",
    token: "ico-verde",
  },
  amarelo: {
    nivel: "amarelo",
    label: "Amarelo",
    descricao: "Fique atento. Pode piorar.",
    token: "ico-amarelo",
  },
  laranja: {
    nivel: "laranja",
    label: "Laranja",
    descricao: "Intervenção necessária em semanas.",
    token: "ico-laranja",
  },
  vermelho: {
    nivel: "vermelho",
    label: "Vermelho",
    descricao: "Intervenção imediata.",
    token: "ico-vermelho",
  },
  cinza: {
    nivel: "cinza",
    label: "Cinza",
    descricao: "Risco sistêmico. Ação executiva.",
    token: "ico-cinza",
  },
  preto: {
    nivel: "preto",
    label: "Preto",
    descricao: "Colapso iminente se nada for feito.",
    token: "ico-preto",
  },
};

export function classificarICO(valor: number): NivelInfo {
  if (valor <= 10) return NIVEIS_ICO.verde;
  if (valor <= 30) return NIVEIS_ICO.amarelo;
  if (valor <= 50) return NIVEIS_ICO.laranja;
  if (valor <= 80) return NIVEIS_ICO.vermelho;
  if (valor <= 110) return NIVEIS_ICO.cinza;
  return NIVEIS_ICO.preto;
}

export interface ICOResult {
  valor: number;
  info: NivelInfo;
}

export function calcICO(
  impacto: number,
  recorrencia: number,
  persistencia: number,
): ICOResult {
  const valor = clamp1to5(impacto) * clamp1to5(recorrencia) * clamp1to5(persistencia);
  return { valor, info: classificarICO(valor) };
}

function clamp1to5(n: number) {
  if (!Number.isFinite(n)) return 1;
  return Math.min(5, Math.max(1, Math.round(n)));
}

// ===== IR — Índice de Reincidência =====

export type ClassifIR =
  | "saudavel"
  | "atencao"
  | "relevante"
  | "patologia"
  | "estrutural";

export interface IRInfo {
  classif: ClassifIR;
  label: string;
}

const IR_LABELS: Record<ClassifIR, string> = {
  saudavel: "Saudável",
  atencao: "Atenção",
  relevante: "Reincidência relevante",
  patologia: "Patologia instalada",
  estrutural: "Falha estrutural",
};

export function classificarIR(percentual: number): IRInfo {
  let classif: ClassifIR = "saudavel";
  if (percentual >= 60) classif = "estrutural";
  else if (percentual >= 41) classif = "patologia";
  else if (percentual >= 26) classif = "relevante";
  else if (percentual >= 10) classif = "atencao";
  return { classif, label: IR_LABELS[classif] };
}

export interface IRPorCausa {
  causaId: string;
  ocorrencias: number;
  percentual: number;
  info: IRInfo;
}

export function calcIRporCausa(
  ecos: { causa_raiz_id: string | null }[],
): IRPorCausa[] {
  const total = ecos.length;
  if (total === 0) return [];
  const contagem = new Map<string, number>();
  for (const e of ecos) {
    if (!e.causa_raiz_id) continue;
    contagem.set(e.causa_raiz_id, (contagem.get(e.causa_raiz_id) ?? 0) + 1);
  }
  return Array.from(contagem.entries())
    .map(([causaId, ocorrencias]) => {
      const percentual = (ocorrencias / total) * 100;
      return { causaId, ocorrencias, percentual, info: classificarIR(percentual) };
    })
    .sort((a, b) => b.ocorrencias - a.ocorrencias);
}

// ===== MC — Margem Corroída =====

export interface MCExtras {
  custosOcultos?: number;
  custoSupervisao?: number;
  custoOportunidade?: number;
}

export interface MCResult {
  mensal: number;
  acumulada: number;
  anualizada: number;
}

export function calcMC(
  ecos: { data_evento: string; valor_prejuizo: number | string }[],
  extras: MCExtras = {},
): MCResult {
  const extra =
    (extras.custosOcultos ?? 0) +
    (extras.custoSupervisao ?? 0) +
    (extras.custoOportunidade ?? 0);

  const acumulada =
    ecos.reduce((acc, e) => acc + Number(e.valor_prejuizo || 0), 0) + extra;

  const agora = new Date();
  const inicioMes = new Date(agora.getFullYear(), agora.getMonth(), 1);
  const mensal = ecos
    .filter((e) => new Date(e.data_evento) >= inicioMes)
    .reduce((acc, e) => acc + Number(e.valor_prejuizo || 0), 0);

  // Anualizada: extrapolação simples baseada na média dos últimos 3 meses.
  const tresMesesAtras = new Date(agora.getFullYear(), agora.getMonth() - 2, 1);
  const ultimos3 = ecos
    .filter((e) => new Date(e.data_evento) >= tresMesesAtras)
    .reduce((acc, e) => acc + Number(e.valor_prejuizo || 0), 0);
  const anualizada = (ultimos3 / 3) * 12;

  return { mensal, acumulada, anualizada };
}

export function formatBRL(v: number): string {
  return v.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  });
}

// ===== MDEO — Motor de Decisão Econômica Operacional =====

export type RecomendacaoMDEO = "opcao_a" | "opcao_b" | "revisar";

export interface MDEOInput {
  custosA: Record<string, number>;
  custosB: Record<string, number>;
  investimentoInicialA: number;
  horizonteMeses: number;
}

export interface MDEOResult {
  cctA: number;
  cctB: number;
  epi: number;
  paybackMeses: number | null;
  roc: number | null;
  recomendacao: RecomendacaoMDEO;
}

/** Projeta um conjunto de custos no horizonte aplicando o sufixo da chave. */
export function projetarCustos(custos: Record<string, number>, horizonteMeses: number): number {
  let total = 0;
  for (const [k, raw] of Object.entries(custos)) {
    const v = Number(raw) || 0;
    if (k.endsWith("_mensal")) total += v * horizonteMeses;
    else if (k.endsWith("_anual")) total += v * (horizonteMeses / 12);
    else total += v;
  }
  return total;
}

export function calcMDEO({ custosA, custosB, investimentoInicialA, horizonteMeses }: MDEOInput): MDEOResult {
  const h = Math.max(1, Math.round(horizonteMeses || 12));
  const inv = Math.max(0, investimentoInicialA || 0);
  const cctA = projetarCustos(custosA, h) + inv;
  const cctB = projetarCustos(custosB, h);
  const epi = cctB - cctA;
  const economiaMensal = epi / h;
  const paybackMeses = inv > 0 && economiaMensal > 0 ? inv / economiaMensal : null;
  const roc = inv > 0 ? epi / inv : null;

  let recomendacao: RecomendacaoMDEO;
  const denom = Math.max(cctA, cctB);
  if (denom > 0 && Math.abs(epi) / denom < 0.10) {
    recomendacao = "revisar";
  } else if (epi > 0 && (paybackMeses == null || paybackMeses <= h)) {
    recomendacao = "opcao_a";
  } else {
    recomendacao = "opcao_b";
  }

  return { cctA, cctB, epi, paybackMeses, roc, recomendacao };
}

