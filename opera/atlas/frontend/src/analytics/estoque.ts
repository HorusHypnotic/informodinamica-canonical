// Analytics: Stock semaphore, material predictions, anomaly detection

export interface StockItem {
  material: string;
  saldo: number;
  percentual: number; // remaining %
  status: "ok" | "warning" | "critical";
  diasRestantes: number | null;
  unidade: string;
}

export interface AnomalyItem {
  tipo: string;
  descricao: string;
  valor: number;
  media: number;
  desvio: number;
  data: string;
}

export function calculateStockSemaphore(consumo: any[]): StockItem[] {
  // Group by material, sum previsto and real
  const byMaterial: Record<string, { previsto: number; real: number; unidade: string; entries: any[] }> = {};
  consumo.forEach(m => {
    const key = m.material;
    if (!byMaterial[key]) byMaterial[key] = { previsto: 0, real: 0, unidade: m.unidade || "un", entries: [] };
    byMaterial[key].previsto += Number(m.previsto);
    byMaterial[key].real += Number(m.real_consumo);
    byMaterial[key].entries.push(m);
  });

  return Object.entries(byMaterial).map(([material, d]) => {
    const saldo = d.previsto - d.real;
    const percentual = d.previsto > 0 ? (saldo / d.previsto) * 100 : 100;
    const status: "ok" | "warning" | "critical" = percentual > 30 ? "ok" : percentual > 10 ? "warning" : "critical";

    // Predict days remaining based on consumption rate
    let diasRestantes: number | null = null;
    if (d.entries.length >= 2 && saldo > 0) {
      const sorted = [...d.entries].sort((a, b) => a.data_registro?.localeCompare(b.data_registro));
      const lastWeek = sorted.slice(-7);
      const avgDailyConsumption = lastWeek.reduce((s: number, e: any) => s + Number(e.real_consumo), 0) / Math.max(lastWeek.length, 1);
      if (avgDailyConsumption > 0) {
        diasRestantes = Math.round(saldo / avgDailyConsumption);
      }
    }

    return { material, saldo, percentual, status, diasRestantes, unidade: d.unidade };
  }).sort((a, b) => a.percentual - b.percentual);
}

export function detectAnomalies(lancamentos: any[]): AnomalyItem[] {
  if (lancamentos.length < 5) return [];

  const custos = lancamentos.filter(l => l.tipo === "custo");
  const valores = custos.map(l => Number(l.valor));
  const media = valores.reduce((a, b) => a + b, 0) / valores.length;
  const stdDev = Math.sqrt(valores.reduce((s, v) => s + Math.pow(v - media, 2), 0) / valores.length);

  if (stdDev === 0) return [];

  return custos
    .filter(l => {
      const desvio = Math.abs(Number(l.valor) - media) / stdDev;
      return desvio > 2;
    })
    .map(l => ({
      tipo: "custo",
      descricao: l.descricao || l.fornecedor || "Lançamento",
      valor: Number(l.valor),
      media: Math.round(media),
      desvio: Math.round(Math.abs(Number(l.valor) - media) / stdDev * 10) / 10,
      data: l.data,
    }))
    .slice(0, 5);
}

export function calculatePadronizacaoIndex(consumo: any[]): number {
  if (consumo.length === 0) return 100;
  const valid = consumo.filter(m => Number(m.previsto) > 0);
  if (valid.length === 0) return 100;

  const withinMargin = valid.filter(m => {
    const desvio = Math.abs(Number(m.real_consumo) - Number(m.previsto)) / Number(m.previsto);
    return desvio <= 0.05; // within 5%
  }).length;

  return Math.round((withinMargin / valid.length) * 100);
}
