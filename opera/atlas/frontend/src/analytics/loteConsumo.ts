// Analytics: Lote-based consumption analysis & predictive forecasting

export interface LoteAnalysis {
  loteId: string;
  atividade: string;
  areaExecutada: number;
  materiais: LoteMaterialAnalysis[];
  desperdicioMedio: number; // avg % waste across materials
  status: "ok" | "warning" | "critical";
}

export interface LoteMaterialAnalysis {
  material: string;
  unidade: string;
  previsto: number;
  real: number;
  desvio: number; // % difference
  consumoPorM2: number; // real / area
  previstoM2: number; // previsto / area
}

export interface PrevisaoConsumo {
  material: string;
  unidade: string;
  consumoMedioM2: number;
  areaProjetada: number;
  previsaoQtd: number;
  estoqueAtual: number;
  semanasCoberto: number | null;
  alertaReposicao: boolean;
}

export interface PadraoDesperdicioDetectado {
  material: string;
  mediaDesvio: number;
  totalLotes: number;
  tendencia: "crescente" | "estavel" | "decrescente";
  mensagem: string;
}

/**
 * Analyze each lote with its materials
 */
export function analyzeLotes(
  lotes: any[],
  materiais: any[]
): LoteAnalysis[] {
  return lotes.map((lote) => {
    const loteMats = materiais.filter((m: any) => m.lote_id === lote.id);
    const area = Number(lote.area_executada) || 1;

    const matAnalysis: LoteMaterialAnalysis[] = loteMats.map((m: any) => {
      const previsto = Number(m.previsto);
      const real = Number(m.real_consumo);
      const desvio = previsto > 0 ? ((real - previsto) / previsto) * 100 : 0;
      return {
        material: m.material,
        unidade: m.unidade,
        previsto,
        real,
        desvio: Math.round(desvio * 10) / 10,
        consumoPorM2: Math.round((real / area) * 1000) / 1000,
        previstoM2: Math.round((previsto / area) * 1000) / 1000,
      };
    });

    const desvios = matAnalysis.filter((m) => m.previsto > 0).map((m) => m.desvio);
    const desperdicioMedio =
      desvios.length > 0 ? Math.round((desvios.reduce((a, b) => a + b, 0) / desvios.length) * 10) / 10 : 0;

    const status: "ok" | "warning" | "critical" =
      desperdicioMedio > 15 ? "critical" : desperdicioMedio > 5 ? "warning" : "ok";

    return {
      loteId: lote.id,
      atividade: lote.atividade,
      areaExecutada: area,
      materiais: matAnalysis,
      desperdicioMedio,
      status,
    };
  });
}

/**
 * Predictive consumption forecast based on historical consumption/m²
 */
export function forecastConsumo(
  materiais: any[],
  lotes: any[],
  consumoMateriais: any[],
  areaProjetadaSemana: number = 100
): PrevisaoConsumo[] {
  // Group all lote_materiais by material name to get avg consumption/m²
  const byMaterial: Record<string, { totalReal: number; totalArea: number; unidade: string }> = {};

  materiais.forEach((m: any) => {
    const lote = lotes.find((l: any) => l.id === m.lote_id);
    if (!lote) return;
    const area = Number(lote.area_executada) || 0;
    const key = m.material;
    if (!byMaterial[key]) byMaterial[key] = { totalReal: 0, totalArea: 0, unidade: m.unidade };
    byMaterial[key].totalReal += Number(m.real_consumo);
    byMaterial[key].totalArea += area;
  });

  // Calculate current stock from consumo_materiais (previsto - real = saldo)
  const estoque: Record<string, number> = {};
  consumoMateriais.forEach((c: any) => {
    const key = c.material;
    if (!estoque[key]) estoque[key] = 0;
    estoque[key] += Number(c.previsto) - Number(c.real_consumo);
  });

  return Object.entries(byMaterial)
    .filter(([, d]) => d.totalArea > 0)
    .map(([material, d]) => {
      const consumoMedioM2 = d.totalReal / d.totalArea;
      const previsaoQtd = Math.round(consumoMedioM2 * areaProjetadaSemana * 100) / 100;
      const estoqueAtual = Math.max(estoque[material] || 0, 0);
      const consumoSemanal = previsaoQtd > 0 ? previsaoQtd : null;
      const semanasCoberto = consumoSemanal ? Math.round((estoqueAtual / consumoSemanal) * 10) / 10 : null;
      const alertaReposicao = semanasCoberto !== null && semanasCoberto < 2;

      return {
        material,
        unidade: d.unidade,
        consumoMedioM2: Math.round(consumoMedioM2 * 1000) / 1000,
        areaProjetada: areaProjetadaSemana,
        previsaoQtd,
        estoqueAtual: Math.round(estoqueAtual * 100) / 100,
        semanasCoberto,
        alertaReposicao,
      };
    })
    .sort((a, b) => (a.semanasCoberto ?? 999) - (b.semanasCoberto ?? 999));
}

/**
 * Detect waste patterns across lotes for each material
 */
export function detectWastePatterns(
  materiais: any[],
  lotes: any[]
): PadraoDesperdicioDetectado[] {
  const byMaterial: Record<string, { desvios: number[]; datas: string[] }> = {};

  materiais.forEach((m: any) => {
    const previsto = Number(m.previsto);
    const real = Number(m.real_consumo);
    if (previsto <= 0) return;
    const desvio = ((real - previsto) / previsto) * 100;
    const lote = lotes.find((l: any) => l.id === m.lote_id);
    const key = m.material;
    if (!byMaterial[key]) byMaterial[key] = { desvios: [], datas: [] };
    byMaterial[key].desvios.push(desvio);
    byMaterial[key].datas.push(lote?.data_inicio || "");
  });

  return Object.entries(byMaterial)
    .filter(([, d]) => d.desvios.length >= 2)
    .map(([material, d]) => {
      const media = d.desvios.reduce((a, b) => a + b, 0) / d.desvios.length;
      const half = Math.floor(d.desvios.length / 2);
      const firstHalf = d.desvios.slice(0, half).reduce((a, b) => a + b, 0) / Math.max(half, 1);
      const secondHalf = d.desvios.slice(half).reduce((a, b) => a + b, 0) / Math.max(d.desvios.length - half, 1);
      const diff = secondHalf - firstHalf;
      const tendencia: "crescente" | "estavel" | "decrescente" =
        diff > 3 ? "crescente" : diff < -3 ? "decrescente" : "estavel";

      let mensagem = `${material}: desvio médio de ${media.toFixed(1)}%`;
      if (tendencia === "crescente") mensagem += " — tendência de aumento no desperdício";
      else if (tendencia === "decrescente") mensagem += " — desperdício em queda";
      else mensagem += " — padrão estável";

      return {
        material,
        mediaDesvio: Math.round(media * 10) / 10,
        totalLotes: d.desvios.length,
        tendencia,
        mensagem,
      };
    })
    .filter((p) => Math.abs(p.mediaDesvio) > 3)
    .sort((a, b) => Math.abs(b.mediaDesvio) - Math.abs(a.mediaDesvio));
}
