// Analytics: Incident severity index, resolution rate, checklist compliance

export interface SafetyMetrics {
  diasSemAcidente: number;
  indiceSeveridade: number;
  taxaResolucao: number;
  tempoMedioResolucao: number; // days
  checklistCompliance: number; // %
  totalIncidentes: number;
  incidentesAbertos: number;
}

const SEVERITY_WEIGHTS: Record<string, number> = {
  leve: 1,
  media: 3,
  grave: 5,
  critica: 10,
};

export function calculateSafetyMetrics(
  incidentes: any[],
  checklist: any[]
): SafetyMetrics {
  // Days without accident
  const acidentes = incidentes.filter(i => i.tipo === "acidente");
  const lastAcidente = acidentes.sort((a: any, b: any) => b.data.localeCompare(a.data))[0];
  const diasSemAcidente = lastAcidente
    ? Math.floor((Date.now() - new Date(lastAcidente.data).getTime()) / 86400000)
    : incidentes.length > 0 ? 999 : 0;

  // Severity index
  const indiceSeveridade = incidentes.reduce((s, i) => {
    return s + (SEVERITY_WEIGHTS[i.severidade] || 1);
  }, 0);

  // Resolution rate
  const resolved = incidentes.filter(i => i.status === "resolvido" || i.status === "aprovado").length;
  const taxaResolucao = incidentes.length > 0 ? (resolved / incidentes.length) * 100 : 100;

  // Avg resolution time (simplified)
  const tempoMedioResolucao = 0; // Would need resolved_at field

  // Checklist compliance
  const totalExpected = checklist.length;
  const verified = checklist.filter(c => c.verificado).length;
  const checklistCompliance = totalExpected > 0 ? (verified / totalExpected) * 100 : 100;

  const incidentesAbertos = incidentes.filter(i => i.status === "aberto").length;

  return {
    diasSemAcidente, indiceSeveridade, taxaResolucao,
    tempoMedioResolucao, checklistCompliance,
    totalIncidentes: incidentes.length, incidentesAbertos,
  };
}

export interface RiskMatrixItem {
  id: string;
  risco: string;
  probabilidade: "baixa" | "media" | "alta";
  impactoLevel: "baixo" | "medio" | "alto";
  severidade: string;
  prazo: string | null;
}

export function buildRiskMatrix(riscos: any[]): RiskMatrixItem[] {
  return riscos.map(r => {
    const sevMap: Record<string, "baixa" | "media" | "alta"> = {
      baixa: "baixa", media: "media", alta: "alta", critica: "alta",
    };
    const impMap: Record<string, "baixo" | "medio" | "alto"> = {
      baixo: "baixo", medio: "medio", alto: "alto",
    };
    return {
      id: r.id,
      risco: r.risco,
      probabilidade: sevMap[r.severidade] || "media",
      impactoLevel: impMap[r.impacto] || "medio",
      severidade: r.severidade,
      prazo: r.prazo,
    };
  });
}
