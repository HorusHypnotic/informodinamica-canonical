// Analytics: Índice de retrabalho
export function calculateRetrabalho(retrabalhos: any[], registrosCount: number) {
  const total = retrabalhos.reduce((s, r) => s + Number(r.quantidade || 0), 0);
  const taxa = total / Math.max(registrosCount, 1);
  return { total, taxa: Math.round(taxa * 100) / 100 };
}
