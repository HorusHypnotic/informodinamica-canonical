// Analytics: Detector de desperdício de materiais
export interface DesperdicioItem {
  material: string;
  desvio: number;
  previsto: number;
  real: number;
}

export function calculateDesperdicio(consumo: any[]): DesperdicioItem[] {
  return consumo
    .filter((m) => m.previsto && Number(m.previsto) > 0)
    .map((m) => {
      const previsto = Number(m.previsto);
      const real = Number(m.real_consumo);
      const desvio = Math.round(((real - previsto) / previsto) * 1000) / 10;
      return { material: m.material, desvio, previsto, real };
    })
    .filter((m) => m.desvio > 5)
    .sort((a, b) => b.desvio - a.desvio);
}
