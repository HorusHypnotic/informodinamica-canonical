// Índice Operacional OPERA (IOP) — 0 a 100, quanto MAIOR pior.
// Composto de 5 componentes, cada um normalizado 0-100:
//   - ICO (35%): criticidade dos ECOs recentes (ICO ponderado)
//   - IR  (25%): risco sistêmico (% de causas com reincidência)
//   - EO  (20%): eficiência operacional (recomendações vencidas + decisões erodidas)
//   - PA  (10%): plano de ação (% recomendações pendentes)
//   - T   (10%): tendência (ICO 7d vs 30d anteriores)
//
// Arquitetura pluggable: novos módulos (presença, inspeções, qualidade)
// podem alimentar `EO` no futuro sem alterar a fórmula geral.

export type IOPClasse = "excelente" | "adequado" | "atencao" | "critico";

export interface IOPComponentes {
  ICO: number; // criticidade
  IR: number;  // reincidência
  EO: number;  // eficiência operacional
  PA: number;  // plano de ação
  T: number;   // tendência
}

export interface IOPResult {
  score: number;
  componentes: IOPComponentes;
  classe: IOPClasse;
  label: string;
  descricao: string;
  tendenciaDelta: number; // % variação ICO 7d vs 30d anteriores
}

const PESOS: IOPComponentes = { ICO: 0.35, IR: 0.25, EO: 0.20, PA: 0.10, T: 0.10 };

export function classificarIOP(score: number): { classe: IOPClasse; label: string; descricao: string } {
  if (score <= 25) return { classe: "excelente", label: "Excelente", descricao: "Operação sob controle." };
  if (score <= 50) return { classe: "adequado", label: "Adequado", descricao: "Dentro dos limites aceitáveis." };
  if (score <= 75) return { classe: "atencao", label: "Atenção", descricao: "Sinais de degradação — agir." };
  return { classe: "critico", label: "Crítico", descricao: "Situação crítica — intervenção imediata." };
}

const clamp = (n: number) => Math.max(0, Math.min(100, n));

// ---------- Provedores (cada componente) ----------

interface EcoMin {
  ico: number | null;
  data_evento: string;
  causa_raiz_id: string | null;
  valor_prejuizo?: number | string | null;
  decisao_mdeo_id?: string | null;
}
interface RecomendacaoMin {
  prazo: "curto" | "medio" | "estruturante";
  created_at?: string;
}
interface ImplementacaoMin {
  recomendacao_id: string;
}
interface DecisaoMin {
  id: string;
  status?: string | null;
}

/** Componente ICO: média ponderada com decaimento por idade. Score 0-100 (ICO_médio / 125 * 100). */
export function calcComponenteICO(ecos: EcoMin[]): number {
  const agora = Date.now();
  const HORIZONTE_MS = 30 * 24 * 60 * 60 * 1000;
  let somaPeso = 0;
  let somaValor = 0;
  for (const e of ecos) {
    if (e.ico == null) continue;
    const idade = agora - new Date(e.data_evento).getTime();
    if (idade > HORIZONTE_MS) continue;
    // ECOs recentes pesam mais (linear 1.0 no dia 0 → 0.1 no dia 30)
    const peso = 1.0 - 0.9 * (idade / HORIZONTE_MS);
    somaPeso += peso;
    somaValor += (e.ico ?? 0) * peso;
  }
  if (somaPeso === 0) return 0;
  const icoMedioPonderado = somaValor / somaPeso;
  return clamp((icoMedioPonderado / 125) * 100);
}

/** Componente IR: % de causas com ≥2 ECOs vinculados. */
export function calcComponenteIR(ecos: EcoMin[], totalCausas: number): number {
  if (totalCausas === 0) return 0;
  const contagem = new Map<string, number>();
  for (const e of ecos) {
    if (!e.causa_raiz_id) continue;
    contagem.set(e.causa_raiz_id, (contagem.get(e.causa_raiz_id) ?? 0) + 1);
  }
  const reincidentes = [...contagem.values()].filter((n) => n >= 2).length;
  return clamp((reincidentes / totalCausas) * 100);
}

/** Componente EO: recomendações vencidas + decisões MDEO erodidas.
 *  Placeholder até módulos de presença/inspeções/produtividade entrarem. */
export function calcComponenteEO(
  recomendacoes: RecomendacaoMin[],
  implementadas: ImplementacaoMin[],
  decisoes: DecisaoMin[],
  ecos: EcoMin[],
): number {
  // Parte 1: % recs vencidas (curto>7d, medio>30d sem implementação)
  const idsImpl = new Set(implementadas.map((i) => i.recomendacao_id));
  const agora = Date.now();
  let vencidas = 0;
  let elegiveis = 0;
  for (const r of recomendacoes) {
    if (r.prazo === "estruturante") continue;
    elegiveis++;
    if (!r.created_at) continue;
    const idade = (agora - new Date(r.created_at).getTime()) / (24 * 60 * 60 * 1000);
    const limite = r.prazo === "curto" ? 7 : 30;
    if (idade > limite) vencidas++;
  }
  const pctVencidas = elegiveis === 0 ? 0 : (vencidas / elegiveis) * 100;

  // Parte 2: % decisões aprovadas com prejuízo vinculado > 0 (erodidas)
  const decisoesAprovadas = decisoes.filter((d) => d.status === "aprovada");
  const decisoesErodidas = new Set<string>();
  for (const e of ecos) {
    if (e.decisao_mdeo_id) decisoesErodidas.add(e.decisao_mdeo_id);
  }
  const pctErodidas = decisoesAprovadas.length === 0
    ? 0
    : ([...decisoesErodidas].filter((id) => decisoesAprovadas.some((d) => d.id === id)).length / decisoesAprovadas.length) * 100;

  return clamp(0.6 * pctVencidas + 0.4 * pctErodidas);
}

/** Componente PA: % recomendações abertas (não implementadas). */
export function calcComponentePA(
  recomendacoes: RecomendacaoMin[],
  implementadas: ImplementacaoMin[],
): number {
  if (recomendacoes.length === 0) return 0;
  const idsImpl = new Set(implementadas.map((i) => i.recomendacao_id));
  const abertas = recomendacoes.length - idsImpl.size;
  return clamp((abertas / recomendacoes.length) * 100);
}

/** Componente T: variação ICO médio últimos 7d vs 30d anteriores. Positivo = piorando. */
export function calcComponenteT(ecos: EcoMin[]): { score: number; delta: number } {
  const agora = Date.now();
  const DIA = 24 * 60 * 60 * 1000;
  const j7 = agora - 7 * DIA;
  const j37 = agora - 37 * DIA;

  const media = (xs: number[]) => (xs.length === 0 ? 0 : xs.reduce((a, b) => a + b, 0) / xs.length);
  const recentes: number[] = [];
  const anteriores: number[] = [];
  for (const e of ecos) {
    if (e.ico == null) continue;
    const t = new Date(e.data_evento).getTime();
    if (t >= j7) recentes.push(e.ico);
    else if (t >= j37) anteriores.push(e.ico);
  }
  const mR = media(recentes);
  const mA = media(anteriores);
  if (mA === 0 && mR === 0) return { score: 0, delta: 0 };
  const delta = mA === 0 ? 100 : ((mR - mA) / mA) * 100;
  // Mapeia -50%..+50% para 0..100 (neutro em 50 quando delta=0)
  const score = clamp(50 + delta);
  return { score, delta };
}

// ---------- Motor principal ----------

export interface CalcIOPInput {
  ecos: EcoMin[];
  totalCausas: number;
  recomendacoes: RecomendacaoMin[];
  implementadas: ImplementacaoMin[];
  decisoes: DecisaoMin[];
}

export function calcIOP({ ecos, totalCausas, recomendacoes, implementadas, decisoes }: CalcIOPInput): IOPResult {
  const cICO = calcComponenteICO(ecos);
  const cIR = calcComponenteIR(ecos, totalCausas);
  const cEO = calcComponenteEO(recomendacoes, implementadas, decisoes, ecos);
  const cPA = calcComponentePA(recomendacoes, implementadas);
  const cT = calcComponenteT(ecos);

  const score = Math.round(
    PESOS.ICO * cICO + PESOS.IR * cIR + PESOS.EO * cEO + PESOS.PA * cPA + PESOS.T * cT.score,
  );
  const info = classificarIOP(score);

  return {
    score,
    componentes: { ICO: Math.round(cICO), IR: Math.round(cIR), EO: Math.round(cEO), PA: Math.round(cPA), T: Math.round(cT.score) },
    ...info,
    tendenciaDelta: Math.round(cT.delta),
  };
}

export const IOP_PESOS = PESOS;
