import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface ClientReportData {
  obraNome: string;
  empresaNome: string;
  responsavel: string;
  data: string;
  // Score
  operaScore: number;
  // Financial
  orcamentoTotal: number;
  custoRealizado: number;
  percentualUtilizado: number;
  saldo: number;
  margem: number;
  // Schedule
  faseAtual: string;
  spiPercent: number;
  diasDecorridos: number;
  diasRestantes: number;
  dataInicio: string | null;
  dataPrevisao: string | null;
  // Safety
  diasSemAcidente: number;
  checklistCompliance: number;
  // Alerts
  riscosAtivos: number;
  acoesPendentes: number;
  acoesVencidas: number;
  // Status da obra
  status: string;
}

export function exportClientReport(data: ClientReportData) {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  let y = 20;

  // ══════════════════════════════════════════
  // HEADER
  // ══════════════════════════════════════════
  doc.setFillColor(30, 30, 30);
  doc.rect(0, 0, pageWidth, 45, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.text("RELATÓRIO DA OBRA", 14, 20);
  
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text(data.obraNome, 14, 30);
  
  doc.setFontSize(9);
  doc.text(`Emitido em: ${data.data}`, pageWidth - 60, 20);
  doc.text(`Por: ${data.empresaNome}`, pageWidth - 60, 28);
  
  y = 55;
  doc.setTextColor(0, 0, 0);

  // ══════════════════════════════════════════
  // SCORE O.P.E.R.A.
  // ══════════════════════════════════════════
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Score de Performance", 14, y);
  y += 8;

  // Score visual
  const scoreColor = data.operaScore >= 80 ? [34, 197, 94] : data.operaScore >= 60 ? [234, 179, 8] : [239, 68, 68];
  doc.setFillColor(scoreColor[0], scoreColor[1], scoreColor[2]);
  doc.roundedRect(14, y, 50, 25, 4, 4, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.setFont("helvetica", "bold");
  doc.text(`${data.operaScore}/100`, 20, y + 17);
  doc.setTextColor(0, 0, 0);

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  const scoreLabel = data.operaScore >= 80 ? "Excelente" : data.operaScore >= 60 ? "Bom" : "Atenção necessária";
  doc.text(scoreLabel, 70, y + 10);
  doc.text(`Status: ${data.status === "em_andamento" ? "Em andamento" : data.status}`, 70, y + 18);
  y += 35;

  // ══════════════════════════════════════════
  // RESUMO FINANCEIRO
  // ══════════════════════════════════════════
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Resumo Financeiro", 14, y);
  y += 4;

  autoTable(doc, {
    startY: y,
    head: [["Indicador", "Valor"]],
    body: [
      ["Orçamento Total", `R$ ${data.orcamentoTotal.toLocaleString("pt-BR")}`],
      ["Custo Realizado", `R$ ${data.custoRealizado.toLocaleString("pt-BR")}`],
      ["% Utilizado", `${data.percentualUtilizado.toFixed(1)}%`],
      ["Saldo", `R$ ${data.saldo.toLocaleString("pt-BR")}`],
      ["Margem", `${data.margem.toFixed(1)}%`],
    ],
    styles: { fontSize: 10, cellPadding: 5 },
    headStyles: { fillColor: [30, 30, 30] },
    columnStyles: { 0: { fontStyle: "bold", cellWidth: 80 } },
    margin: { left: 14, right: 14 },
    alternateRowStyles: { fillColor: [245, 245, 245] },
  });
  y = (doc as any).lastAutoTable.finalY + 10;

  // ══════════════════════════════════════════
  // CRONOGRAMA
  // ══════════════════════════════════════════
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Cronograma", 14, y);
  y += 4;

  autoTable(doc, {
    startY: y,
    head: [["Indicador", "Valor"]],
    body: [
      ["Fase Atual", data.faseAtual],
      ["Índice de Performance (SPI)", `${data.spiPercent.toFixed(0)}%`],
      ["Dias Decorridos", `${data.diasDecorridos}`],
      ["Dias Restantes", `${data.diasRestantes}`],
      ["Data Início", data.dataInicio || "Não definida"],
      ["Previsão Conclusão", data.dataPrevisao || "Não definida"],
    ],
    styles: { fontSize: 10, cellPadding: 5 },
    headStyles: { fillColor: [30, 30, 30] },
    columnStyles: { 0: { fontStyle: "bold", cellWidth: 80 } },
    margin: { left: 14, right: 14 },
    alternateRowStyles: { fillColor: [245, 245, 245] },
  });
  y = (doc as any).lastAutoTable.finalY + 10;

  // ══════════════════════════════════════════
  // SEGURANÇA
  // ══════════════════════════════════════════
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Segurança & Qualidade", 14, y);
  y += 4;

  autoTable(doc, {
    startY: y,
    head: [["Indicador", "Valor"]],
    body: [
      ["Dias sem Acidente", `${data.diasSemAcidente}`],
      ["Conformidade Checklist", `${data.checklistCompliance.toFixed(0)}%`],
    ],
    styles: { fontSize: 10, cellPadding: 5 },
    headStyles: { fillColor: [30, 30, 30] },
    columnStyles: { 0: { fontStyle: "bold", cellWidth: 80 } },
    margin: { left: 14, right: 14 },
    alternateRowStyles: { fillColor: [245, 245, 245] },
  });
  y = (doc as any).lastAutoTable.finalY + 10;

  // ══════════════════════════════════════════
  // ALERTAS
  // ══════════════════════════════════════════
  if (data.riscosAtivos > 0 || data.acoesPendentes > 0 || data.acoesVencidas > 0) {
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Alertas", 14, y);
    y += 4;

    const alertRows: string[][] = [];
    if (data.riscosAtivos > 0) alertRows.push(["Riscos ativos", `${data.riscosAtivos}`]);
    if (data.acoesPendentes > 0) alertRows.push(["Ações corretivas pendentes", `${data.acoesPendentes}`]);
    if (data.acoesVencidas > 0) alertRows.push(["Ações vencidas", `${data.acoesVencidas}`]);

    autoTable(doc, {
      startY: y,
      head: [["Alerta", "Quantidade"]],
      body: alertRows,
      styles: { fontSize: 10, cellPadding: 5 },
      headStyles: { fillColor: [200, 50, 50] },
      columnStyles: { 0: { fontStyle: "bold", cellWidth: 80 } },
      margin: { left: 14, right: 14 },
    });
    y = (doc as any).lastAutoTable.finalY + 10;
  }

  // ══════════════════════════════════════════
  // FOOTER
  // ══════════════════════════════════════════
  const checkPage = (needed = 30) => {
    if (y > 280 - needed) { doc.addPage(); y = 20; }
  };
  checkPage(30);

  doc.setDrawColor(200);
  doc.line(14, y, pageWidth - 14, y);
  y += 6;
  doc.setFontSize(8);
  doc.setTextColor(128);
  doc.text("Relatório gerado pelo Sistema O.P.E.R.A. — Gestão Inteligente de Obras", 14, y);
  y += 4;
  doc.text(`${data.empresaNome} • ${data.data}`, 14, y);
  y += 4;
  doc.text("Este documento é confidencial e destinado exclusivamente ao cliente.", 14, y);

  doc.save(`relatorio-cliente-${data.obraNome.replace(/\s+/g, "-").toLowerCase()}-${data.data.replace(/\//g, "-")}.pdf`);
}
