/**
 * REGRA OBRIGATÓRIA DE SISTEMA — Folha Determinística
 * ====================================================
 * TOTAL = BASE (presença) + AJUSTE (apontamento ajuste/complemento/correcao)
 * LEGADO (legacy_historico) = SOMENTE VISUALIZAÇÃO — nunca soma no ativo.
 *
 * Fração de diária NUNCA deriva de fallback silencioso.
 * Tipo manda sobre fracao_diaria. Se o tipo é "falta*", fração é 0 — sempre.
 * Só caímos em fracao_diaria do banco se o tipo for desconhecido/ausente.
 */
export function resolvePresencaFracao(p: {
  tipo?: string | null;
  fracao_diaria?: number | null;
}): number {
  const tipo = (p.tipo || "").toLowerCase();
  if (tipo.startsWith("falta")) return 0;          // falta, falta_justificada, falta_injustificada
  if (tipo === "meio_periodo") return 0.5;
  if (tipo === "presente") return 1;
  if (tipo === "hora_extra") return 0;             // hora_extra é tratada à parte (não conta como diária)
  // Tipo desconhecido — usa banco se confiável, senão 0 (NUNCA 1 silencioso)
  if (p.fracao_diaria != null && Number.isFinite(Number(p.fracao_diaria))) {
    return Number(p.fracao_diaria);
  }
  return 0;
}
