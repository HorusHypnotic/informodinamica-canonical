// Analytics: Productivity, absenteeism, idle detection
export interface ProductivityMetrics {
  absenteismo: number; // % of absences
  presentes: number;
  faltas: number;
  totalDias: number;
  ociosos: number; // workers present but no activity
  aproveitamentoJornada: number; // %
  tempoMedioDeslocamento: number; // min
  colaboradoresAtivos: number;
}

export interface ColaboradorRanking {
  nome: string;
  diasTrabalhados: number;
  producaoTotal: number;
  produtividadeMedia: number;
  faltas: number;
}

export function calculateProductivity(
  registros: any[],
  presencas: any[],
  logistica: any[],
  colaboradores: any[]
): ProductivityMetrics {
  const presentes = presencas.filter(p => p.tipo === "presente").length;
  const faltas = presencas.filter(p => p.tipo === "falta_justificada" || p.tipo === "falta_injustificada").length;
  const totalDias = presentes + faltas;
  const absenteismo = totalDias > 0 ? (faltas / totalDias) * 100 : 0;

  // Idle detection: registros with no atividade or producao
  const ociosos = registros.filter(r => !r.atividade && !r.producao).length;

  // Journey utilization (simplified)
  const comHoras = registros.filter(r => r.entrada && r.saida);
  let aproveitamentoJornada = 100;
  if (comHoras.length > 0 && logistica.length > 0) {
    const totalDeslocamento = logistica.reduce((s: number, l: any) => s + Number(l.tempo_deslocamento_min || 0), 0);
    const horasProdutivas = comHoras.length * 8 * 60; // 8h in minutes
    aproveitamentoJornada = Math.max(0, ((horasProdutivas - totalDeslocamento) / horasProdutivas) * 100);
  }

  const tempoMedioDeslocamento = logistica.length > 0
    ? logistica.reduce((s: number, l: any) => s + Number(l.tempo_deslocamento_min || 0), 0) / logistica.length
    : 0;

  const colaboradoresAtivos = colaboradores.filter((c: any) => c.ativo).length;

  return {
    absenteismo, presentes, faltas, totalDias, ociosos,
    aproveitamentoJornada, tempoMedioDeslocamento, colaboradoresAtivos,
  };
}

export function calculateColaboradorRanking(
  registros: any[],
  presencas: any[],
  top = 10
): ColaboradorRanking[] {
  const byNome: Record<string, { dias: number; prod: number; faltas: number }> = {};

  registros.forEach(r => {
    const nome = r.nome || "Desconhecido";
    if (!byNome[nome]) byNome[nome] = { dias: 0, prod: 0, faltas: 0 };
    byNome[nome].dias++;
    let prod: number;
    if (typeof r.producao_valor === "number" && !isNaN(r.producao_valor)) {
      prod = r.producao_valor;
    } else if (typeof r.producao === "string") {
      const m = r.producao.replace(",", ".").match(/[0-9]+(?:\.[0-9]+)?/);
      prod = m ? parseFloat(m[0]) : 0;
    } else {
      prod = Number(r.producao) || 0;
    }
    byNome[nome].prod += prod;
  });

  presencas.forEach(p => {
    // Try to match by colaborador_id — simplified by using all faltas
    if (p.tipo === "falta_justificada" || p.tipo === "falta_injustificada") {
      // We don't have name here, count globally
    }
  });

  return Object.entries(byNome)
    .map(([nome, d]) => ({
      nome,
      diasTrabalhados: d.dias,
      producaoTotal: d.prod,
      produtividadeMedia: d.dias > 0 ? Math.round((d.prod / d.dias) * 10) / 10 : 0,
      faltas: d.faltas,
    }))
    .sort((a, b) => b.produtividadeMedia - a.produtividadeMedia)
    .slice(0, top);
}
