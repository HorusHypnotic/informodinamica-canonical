/**
 * Normalização canônica de nome de equipe.
 * Deve casar com a expressão GENERATED ALWAYS AS da coluna equipe_normalizada
 * em registros_diarios:  lower + trim + spaces->underscores
 */
export function normalizeEquipe(value: string | null | undefined): string | null {
  if (!value) return null;
  const trimmed = value.trim();
  if (trimmed === "") return null;
  return trimmed.toLowerCase().replace(/\s+/g, "_");
}

/**
 * Tenta extrair o primeiro número (com vírgula ou ponto decimal) de um texto livre.
 * Espelha a lógica do trigger extract_producao_valor no banco.
 */
export function parseProducaoValor(value: string | null | undefined): number | null {
  if (!value) return null;
  const normalized = String(value).replace(",", ".");
  const match = normalized.match(/[0-9]+(?:\.[0-9]+)?/);
  if (!match) return null;
  const n = parseFloat(match[0]);
  return Number.isFinite(n) ? n : null;
}

