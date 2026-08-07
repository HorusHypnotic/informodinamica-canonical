// Analytics: Schedule Performance Index, progress, milestones
export interface ScheduleMetrics {
  progressoTemporal: number; // % of time elapsed
  progressoFisico: number; // estimated % complete
  spi: number; // Schedule Performance Index
  diasCorridos: number;
  diasTotais: number;
  diasRestantes: number;
  status: "adiantado" | "no_prazo" | "atrasado" | "critico";
}

export function calculateScheduleMetrics(
  obra: { data_inicio?: string | null; data_previsao?: string | null; fase_atual?: string } | null,
  sequenciamento: any[]
): ScheduleMetrics | null {
  if (!obra?.data_inicio) return null;

  const inicio = new Date(obra.data_inicio);
  const hoje = new Date();
  const diasCorridos = Math.max(0, Math.floor((hoje.getTime() - inicio.getTime()) / 86400000));

  let diasTotais = 365; // default
  if (obra.data_previsao) {
    diasTotais = Math.max(1, Math.floor((new Date(obra.data_previsao).getTime() - inicio.getTime()) / 86400000));
  }

  const diasRestantes = diasTotais - diasCorridos;
  const progressoTemporal = Math.min(100, (diasCorridos / diasTotais) * 100);

  // Estimate physical progress from phase + sequencing
  const faseWeights: Record<string, number> = {
    iniciacao: 5,
    planejamento: 15,
    execucao: 60,
    monitoramento: 80,
    encerramento: 95,
  };
  const faseProgress = faseWeights[obra.fase_atual || "iniciacao"] || 10;

  // Also consider sequencing completion
  const totalSeq = sequenciamento.length;
  const concluidos = sequenciamento.filter(s => s.status === "concluido").length;
  const seqProgress = totalSeq > 0 ? (concluidos / totalSeq) * 100 : faseProgress;

  const progressoFisico = totalSeq > 0 ? seqProgress : faseProgress;

  const spi = progressoTemporal > 0 ? progressoFisico / progressoTemporal : 1;

  let status: ScheduleMetrics["status"];
  if (spi >= 1.1) status = "adiantado";
  else if (spi >= 0.9) status = "no_prazo";
  else if (spi >= 0.7) status = "atrasado";
  else status = "critico";

  return { progressoTemporal, progressoFisico, spi, diasCorridos, diasTotais, diasRestantes, status };
}

export interface MilestoneItem {
  fase: string;
  label: string;
  status: "done" | "current" | "pending";
}

export function getMilestones(faseAtual: string): MilestoneItem[] {
  const fases = [
    { fase: "iniciacao", label: "Iniciação" },
    { fase: "planejamento", label: "Planejamento" },
    { fase: "execucao", label: "Execução" },
    { fase: "monitoramento", label: "Monitoramento" },
    { fase: "encerramento", label: "Encerramento" },
  ];

  const currentIdx = fases.findIndex(f => f.fase === faseAtual);

  return fases.map((f, i) => ({
    ...f,
    status: i < currentIdx ? "done" as const : i === currentIdx ? "current" as const : "pending" as const,
  }));
}
