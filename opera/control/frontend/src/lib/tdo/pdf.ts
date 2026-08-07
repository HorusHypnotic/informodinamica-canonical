import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { formatBRL, classificarICO } from "./calculos";

interface KPIs {
  total: number;
  icoMed: number;
  icoMax: number;
  mcMensal: number;
  mcAcumulada: number;
  mcAnualizada: number;
}

interface CausaRow { nome: string; ocorrencias: number; percentual: number; classif: string }
interface EcoRow { data: string; titulo: string; categoria: string; prejuizo: number; ico: number }
interface MatrizCell { dominio: string; consequencia: string; valor: number }

export function gerarRelatorioPDF(opts: {
  gerado: Date;
  kpis: KPIs;
  topCausas: CausaRow[];
  ecos: EcoRow[];
  matriz?: MatrizCell[];
}) {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const W = doc.internal.pageSize.getWidth();
  const M = 48;

  // ===== CAPA =====
  doc.setFillColor(37, 99, 235);
  doc.rect(0, 0, W, 220, "F");
  doc.setTextColor(255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("OPERA CONTROL", M, 60);
  doc.setFontSize(28);
  doc.text("Diagnóstico de", M, 110);
  doc.text("Corrosão Operacional", M, 145);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.text(`Gerado em ${opts.gerado.toLocaleString("pt-BR")}`, M, 180);

  // ===== RESUMO EXECUTIVO =====
  doc.setTextColor(20);
  let y = 260;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text("Resumo executivo", M, y);
  y += 16;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  const resumo =
    opts.kpis.total === 0
      ? "Nenhum ECO registrado no período."
      : `Foram registrados ${opts.kpis.total} ECO(s). ICO (campo) médio ${opts.kpis.icoMed} (${classificarICO(opts.kpis.icoMed).label}), ICO (campo) máximo ${opts.kpis.icoMax} (${classificarICO(opts.kpis.icoMax).label}). Margem corroída acumulada de ${formatBRL(opts.kpis.mcAcumulada)}.`;
  doc.text(doc.splitTextToSize(resumo, W - M * 2), M, y);
  y += 50;

  // ===== KPIs =====
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text("Indicadores", M, y);
  y += 8;
  autoTable(doc, {
    startY: y + 4,
    margin: { left: M, right: M },
    head: [["Indicador", "Valor"]],
    body: [
      ["Total de ECOs", String(opts.kpis.total)],
      ["ICO (campo) médio", `${opts.kpis.icoMed} (${classificarICO(opts.kpis.icoMed).label})`],
      ["ICO (campo) máximo", `${opts.kpis.icoMax} (${classificarICO(opts.kpis.icoMax).label})`],
      ["MC do mês", formatBRL(opts.kpis.mcMensal)],
      ["MC acumulada", formatBRL(opts.kpis.mcAcumulada)],
      ["MC anualizada (proj.)", formatBRL(opts.kpis.mcAnualizada)],
    ],
    theme: "striped",
    headStyles: { fillColor: [37, 99, 235] },
    styles: { font: "helvetica", fontSize: 10 },
  });

  // ===== TOP CAUSAS =====
  const lastY1 = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text("Top causas raiz", M, lastY1 + 30);
  autoTable(doc, {
    startY: lastY1 + 36,
    margin: { left: M, right: M },
    head: [["Causa", "Ocorrências", "IR %", "Classificação"]],
    body: opts.topCausas.length
      ? opts.topCausas.map((c) => [c.nome, String(c.ocorrencias), `${c.percentual}%`, c.classif])
      : [["—", "0", "0%", "—"]],
    theme: "striped",
    headStyles: { fillColor: [37, 99, 235] },
    styles: { font: "helvetica", fontSize: 10 },
  });

  // ===== MATRIZ Domínio × Consequência =====
  if (opts.matriz && opts.matriz.length > 0) {
    const dominios = Array.from(new Set(opts.matriz.map((m) => m.dominio))).sort();
    const conseqs = Array.from(new Set(opts.matriz.map((m) => m.consequencia))).sort();
    const mapa = new Map<string, number>();
    for (const c of opts.matriz) mapa.set(`${c.dominio}|${c.consequencia}`, c.valor);
    const totaisCol: Record<string, number> = {};
    const body = dominios.map((d) => {
      let totalLinha = 0;
      const row = [d, ...conseqs.map((c) => {
        const v = mapa.get(`${d}|${c}`) ?? 0;
        totalLinha += v;
        totaisCol[c] = (totaisCol[c] ?? 0) + v;
        return v > 0 ? formatBRL(v) : "—";
      }), formatBRL(totalLinha)];
      return row;
    });
    const totalGeral = Object.values(totaisCol).reduce((s, v) => s + v, 0);
    body.push(["Total", ...conseqs.map((c) => formatBRL(totaisCol[c] ?? 0)), formatBRL(totalGeral)]);

    const lastY2 = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text("Matriz Domínio × Consequência", M, lastY2 + 30);
    autoTable(doc, {
      startY: lastY2 + 36,
      margin: { left: M, right: M },
      head: [["Domínio", ...conseqs, "Total"]],
      body,
      theme: "grid",
      headStyles: { fillColor: [37, 99, 235], fontSize: 8 },
      styles: { font: "helvetica", fontSize: 8 },
      foot: undefined,
    });
  }

  // ===== HISTÓRICO ECOs =====
  doc.addPage();
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text("Histórico de ECOs", M, 60);
  autoTable(doc, {
    startY: 76,
    margin: { left: M, right: M },
    head: [["Data", "Título", "Categoria", "Prejuízo", "ICO (campo)"]],
    body: opts.ecos.map((e) => [
      e.data, e.titulo, e.categoria, formatBRL(e.prejuizo), `${e.ico} (${classificarICO(e.ico).label})`,
    ]),
    theme: "striped",
    headStyles: { fillColor: [37, 99, 235] },
    styles: { font: "helvetica", fontSize: 9 },
    columnStyles: { 1: { cellWidth: 180 } },
  });

  // Rodapé
  const pages = doc.getNumberOfPages();
  for (let i = 1; i <= pages; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(120);
    doc.text(`OPERA Control · Baseado na Teoria da Degradação Operacional · página ${i}/${pages}`, M, doc.internal.pageSize.getHeight() - 20);
  }

  doc.save(`tdo-relatorio-${opts.gerado.toISOString().slice(0, 10)}.pdf`);
}
