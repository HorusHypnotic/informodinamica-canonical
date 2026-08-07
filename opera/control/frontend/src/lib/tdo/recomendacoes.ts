// Motor puro de priorização de recomendações.
// Recebe causas + ECOs + dicionário de ações e devolve a lista priorizada.

export type PrioridadeRec = "alta" | "media" | "baixa";

export interface AcoesPorPrazo {
  curto: string[];
  medio: string[];
  estruturante: string[];
}

export interface RecomendacaoPriorizada {
  causaId: string;
  causaNome: string;
  prioridade: PrioridadeRec;
  icoMedio: number;
  ocorrencias: number;
  percentual: number;
  acoes: AcoesPorPrazo;
}

interface CausaLike { id: string; nome: string }
interface EcoLike { causa_raiz_id: string | null; ico: number | null }

export function gerarRecomendacoesPriorizadas(
  causas: CausaLike[],
  ecos: EcoLike[],
  acoesPorCausa: Record<string, AcoesPorPrazo>,
): RecomendacaoPriorizada[] {
  const totalEcos = ecos.length;
  if (totalEcos === 0) return [];

  const grupos = new Map<string, EcoLike[]>();
  for (const e of ecos) {
    if (!e.causa_raiz_id) continue;
    const arr = grupos.get(e.causa_raiz_id) ?? [];
    arr.push(e);
    grupos.set(e.causa_raiz_id, arr);
  }

  const resultado: RecomendacaoPriorizada[] = [];
  for (const [causaId, ecosDaCausa] of grupos.entries()) {
    const causa = causas.find((c) => c.id === causaId);
    if (!causa) continue;
    const icoMedio = ecosDaCausa.reduce((s, e) => s + (e.ico ?? 0), 0) / ecosDaCausa.length;
    const ocorrencias = ecosDaCausa.length;
    const percentual = (ocorrencias / totalEcos) * 100;

    let prioridade: PrioridadeRec = "baixa";
    if (icoMedio > 60 || percentual > 40) prioridade = "alta";
    else if (icoMedio > 30 || percentual > 20) prioridade = "media";

    const acoes = acoesPorCausa[causaId] ?? {
      curto: ["Revisar o processo afetado"],
      medio: ["Documentar e monitorar a recorrência"],
      estruturante: ["Redesenhar o fluxo eliminando a causa raiz"],
    };

    resultado.push({ causaId, causaNome: causa.nome, prioridade, icoMedio, ocorrencias, percentual, acoes });
  }

  const ordem: Record<PrioridadeRec, number> = { alta: 0, media: 1, baixa: 2 };
  resultado.sort((a, b) => {
    if (ordem[a.prioridade] !== ordem[b.prioridade]) return ordem[a.prioridade] - ordem[b.prioridade];
    return b.icoMedio - a.icoMedio;
  });
  return resultado;
}
