// Analytics: Previsão de atraso baseada em sequenciamento
export interface AtrasoItem {
  id: string;
  equipe: string;
  semana_fim: number;
  status: string;
  tipo: "atrasada" | "em_risco";
  semanasRestantes?: number;
}

export function getCurrentWeek(): number {
  const start = new Date(new Date().getFullYear(), 0, 1);
  const diffDays = Math.floor((Date.now() - start.getTime()) / 86400000);
  return Math.ceil(diffDays / 7);
}

export function calculateAtrasos(sequenciamento: any[]): AtrasoItem[] {
  const currentWeek = getCurrentWeek();
  const results: AtrasoItem[] = [];

  sequenciamento.forEach((s) => {
    if (s.status === "concluido") return;
    if (s.semana_fim < currentWeek) {
      results.push({ id: s.id, equipe: s.equipe, semana_fim: s.semana_fim, status: s.status, tipo: "atrasada" });
    } else if (s.semana_fim <= currentWeek + 2) {
      results.push({ id: s.id, equipe: s.equipe, semana_fim: s.semana_fim, status: s.status, tipo: "em_risco", semanasRestantes: s.semana_fim - currentWeek });
    }
  });

  return results;
}
