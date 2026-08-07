import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import type { OperaScoreBreakdown } from "@/analytics/operaScore";
import type { FinancialSummary } from "@/analytics/financeiro";

interface ReportData {
  obraNome: string;
  responsavel: string;
  data: string;
  registros: any[];
  consumo: any[];
  ativos: any[];
  riscos: any[];
  retrabalhos: any[];
  lancamentos: any[];
  incidentes: any[];
  logistica?: any[];
  ciclos?: any[];
  aditivos?: any[];
  acoes?: any[];
  checklist?: any[];
  colaboradores?: any[];
  presencas?: any[];
  // Computed analytics
  score?: OperaScoreBreakdown;
  financials?: FinancialSummary;
  productivity?: { absenteismo: number; aproveitamentoJornada: number; colaboradoresAtivos: number };
  safety?: { diasSemAcidente: number; indiceSeveridade: number; taxaResolucao: number; checklistCompliance: number };
  scheduleMetrics?: { spiPercent: number; faseAtual: string; diasDecorridos: number; diasRestantes: number } | null;
  obraData?: { orcamento_total?: number; area_m2?: number; custo_orcado_m2?: number };
}

export function exportOperaReport(data: ReportData) {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  let y = 20;

  const checkPage = (needed = 40) => {
    if (y > 280 - needed) { doc.addPage(); y = 20; }
  };

  const sectionTitle = (num: string, title: string) => {
    checkPage();
    doc.setFontSize(13);
    doc.setFont("helvetica", "bold");
    doc.text(`${num}. ${title}`, 14, y);
    y += 6;
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
  };

  const kpiLine = (text: string) => {
    doc.text(text, 14, y);
    y += 5;
  };

  // ══════════════════════════════════════════
  // HEADER
  // ══════════════════════════════════════════
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.text("RELATÓRIO OPERACIONAL O.P.E.R.A.", 14, y);
  y += 10;

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text(`Obra: ${data.obraNome}`, 14, y);
  doc.text(`Data: ${data.data}`, pageWidth - 60, y);
  y += 6;
  doc.text(`Responsável: ${data.responsavel}`, 14, y);
  y += 4;

  doc.setDrawColor(200);
  doc.line(14, y, pageWidth - 14, y);
  y += 8;

  // ══════════════════════════════════════════
  // SCORE O.P.E.R.A.
  // ══════════════════════════════════════════
  if (data.score) {
    sectionTitle("⭐", "Score O.P.E.R.A.");
    const s = data.score;
    kpiLine(`Score Total: ${s.total}/100`);
    kpiLine(`Organização: ${s.organizacao}/20  |  Padronização: ${s.padronizacao}/20  |  Eficiência: ${s.eficiencia}/20`);
    kpiLine(`Redução Perdas: ${s.reducaoPerdas}/20  |  Análise Contínua: ${s.analiseContinua}/20`);
    y += 3;
  }

  // ══════════════════════════════════════════
  // RESUMO FINANCEIRO
  // ══════════════════════════════════════════
  if (data.financials) {
    sectionTitle("💰", "Resumo Financeiro Consolidado");
    const f = data.financials;
    kpiLine(`Receitas: R$ ${f.totalReceitas.toLocaleString("pt-BR")}  |  Custos: R$ ${f.totalCustos.toLocaleString("pt-BR")}`);
    kpiLine(`Saldo: R$ ${f.saldo.toLocaleString("pt-BR")}  |  Margem: ${f.margem.toFixed(1)}%`);
    kpiLine(`Burn Rate Mensal: R$ ${f.burnRateMensal.toLocaleString("pt-BR", { maximumFractionDigits: 0 })}`);
    kpiLine(`Custo Retrabalho: R$ ${f.custoRetrabalho.toLocaleString("pt-BR")}  |  Desperdício Monetizado: R$ ${f.desperdicioMonetizado.toLocaleString("pt-BR", { maximumFractionDigits: 0 })}`);
    if (data.obraData?.orcamento_total) {
      const pctUsado = data.obraData.orcamento_total > 0 ? ((f.totalCustos / data.obraData.orcamento_total) * 100).toFixed(1) : "0";
      kpiLine(`Orçamento: R$ ${data.obraData.orcamento_total.toLocaleString("pt-BR")}  |  Utilizado: ${pctUsado}%`);
      kpiLine(`Projeção Custo Final: R$ ${f.projecaoCustoFinal.toLocaleString("pt-BR", { maximumFractionDigits: 0 })}`);
    }
    if (data.obraData?.area_m2 && data.obraData.area_m2 > 0) {
      kpiLine(`Custo Real/m²: R$ ${f.custoRealM2.toFixed(2)}  |  Orçado/m²: R$ ${(data.obraData.custo_orcado_m2 || 0).toFixed(2)}`);
    }
    y += 3;
  }

  // ══════════════════════════════════════════
  // CRONOGRAMA
  // ══════════════════════════════════════════
  if (data.scheduleMetrics) {
    sectionTitle("📅", "Cronograma & SPI");
    const sm = data.scheduleMetrics;
    kpiLine(`Fase Atual: ${sm.faseAtual}  |  SPI: ${sm.spiPercent.toFixed(0)}%`);
    kpiLine(`Dias Decorridos: ${sm.diasDecorridos}  |  Dias Restantes: ${sm.diasRestantes}`);
    y += 3;
  }

  // ══════════════════════════════════════════
  // 1. ORGANIZAÇÃO
  // ══════════════════════════════════════════
  sectionTitle("1", "Organização — Mão de Obra");
  const okCount = data.registros.filter((r) => r.status === "ok").length;
  kpiLine(`Total registros: ${data.registros.length}  |  Status OK: ${okCount}  |  Alertas: ${data.registros.length - okCount}`);

  if (data.productivity) {
    const p = data.productivity;
    kpiLine(`Absenteísmo: ${p.absenteismo.toFixed(1)}%  |  Aproveitamento Jornada: ${p.aproveitamentoJornada.toFixed(0)}%  |  Colaboradores Ativos: ${p.colaboradoresAtivos}`);
  }

  if (data.registros.length > 0) {
    autoTable(doc, {
      startY: y,
      head: [["Nome", "Atividade", "Produção", "Status", "Data"]],
      body: data.registros.slice(0, 15).map((r) => [
        r.nome, r.atividade || "—", r.producao || "—", r.status, r.data_registro,
      ]),
      styles: { fontSize: 8 },
      headStyles: { fillColor: [41, 37, 36] },
      margin: { left: 14 },
    });
    y = (doc as any).lastAutoTable.finalY + 8;
  } else {
    y += 6;
  }

  // ══════════════════════════════════════════
  // 2. PADRONIZAÇÃO
  // ══════════════════════════════════════════
  sectionTitle("2", "Padronização — Insumos");
  const despTotal = data.consumo.length > 0
    ? data.consumo.filter((m: any) => Number(m.previsto) > 0).reduce((a, m) => a + (Number(m.previsto) > 0 ? ((Number(m.real_consumo) - Number(m.previsto)) / Number(m.previsto)) * 100 : 0), 0) / Math.max(data.consumo.filter((m: any) => Number(m.previsto) > 0).length, 1)
    : 0;
  kpiLine(`Materiais: ${data.consumo.length}  |  Desperdício médio: ${despTotal.toFixed(1)}%`);

  if (data.consumo.length > 0) {
    autoTable(doc, {
      startY: y,
      head: [["Material", "Previsto", "Real", "Unidade", "Desp. %"]],
      body: data.consumo.slice(0, 10).map((m) => [
        m.material, m.previsto, m.real_consumo, m.unidade,
        Number(m.previsto) > 0 ? `${(((Number(m.real_consumo) - Number(m.previsto)) / Number(m.previsto)) * 100).toFixed(1)}%` : "—",
      ]),
      styles: { fontSize: 8 },
      headStyles: { fillColor: [41, 37, 36] },
      margin: { left: 14 },
    });
    y = (doc as any).lastAutoTable.finalY + 8;
  } else {
    y += 6;
  }

  // ══════════════════════════════════════════
  // 3. EFICIÊNCIA
  // ══════════════════════════════════════════
  sectionTitle("3", "Eficiência — Ativos");
  const ociosos = data.ativos.filter((a) => a.status === "ocioso");
  const ociosoValor = ociosos.reduce((s, a) => s + Number(a.valor), 0);
  kpiLine(`Ativos: ${data.ativos.length}  |  Ociosos: ${ociosos.length} (R$ ${ociosoValor.toLocaleString("pt-BR")})`);

  if (data.ativos.length > 0) {
    autoTable(doc, {
      startY: y,
      head: [["Equipamento", "Local", "Valor (R$)", "Status"]],
      body: data.ativos.map((a) => [a.nome, a.local_atual || "—", Number(a.valor).toLocaleString("pt-BR"), a.status]),
      styles: { fontSize: 8 },
      headStyles: { fillColor: [41, 37, 36] },
      margin: { left: 14 },
    });
    y = (doc as any).lastAutoTable.finalY + 8;
  } else {
    y += 6;
  }

  // 3b. Logística Interna
  const logistica = data.logistica || [];
  if (logistica.length > 0) {
    checkPage();
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("3b. Logística Interna", 14, y);
    y += 6;
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");

    const avgDeslocamento = logistica.reduce((s, l) => s + Number(l.tempo_deslocamento_min || 0), 0) / logistica.length;
    kpiLine(`Registros: ${logistica.length}  |  Tempo médio de deslocamento: ${avgDeslocamento.toFixed(0)} min`);

    autoTable(doc, {
      startY: y,
      head: [["Equipe", "Origem", "Destino", "Tempo (min)", "Data"]],
      body: logistica.slice(0, 10).map((l) => [
        l.equipe, l.origem || "—", l.destino || "—", l.tempo_deslocamento_min, l.data_registro,
      ]),
      styles: { fontSize: 8 },
      headStyles: { fillColor: [41, 37, 36] },
      margin: { left: 14 },
    });
    y = (doc as any).lastAutoTable.finalY + 8;
  }

  // 3c. Ciclos de Tarefa
  const ciclos = data.ciclos || [];
  if (ciclos.length > 0) {
    checkPage();
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("3c. Ciclos de Tarefa", 14, y);
    y += 6;
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");

    const avgDesvio = ciclos.reduce((s, c) => {
      const alvo = Number(c.tempo_alvo_min || 0);
      const real = Number(c.tempo_medio_min || 0);
      return s + (alvo > 0 ? ((real - alvo) / alvo) * 100 : 0);
    }, 0) / ciclos.length;
    kpiLine(`Tarefas monitoradas: ${ciclos.length}  |  Desvio médio: ${avgDesvio.toFixed(1)}%`);

    autoTable(doc, {
      startY: y,
      head: [["Tarefa", "Alvo (min)", "Médio (min)", "Desvio %", "Medições"]],
      body: ciclos.slice(0, 10).map((c) => {
        const alvo = Number(c.tempo_alvo_min || 0);
        const real = Number(c.tempo_medio_min || 0);
        const desvio = alvo > 0 ? (((real - alvo) / alvo) * 100).toFixed(1) + "%" : "—";
        return [c.tarefa, alvo, real, desvio, c.qtd_medicoes];
      }),
      styles: { fontSize: 8 },
      headStyles: { fillColor: [41, 37, 36] },
      margin: { left: 14 },
    });
    y = (doc as any).lastAutoTable.finalY + 8;
  }

  // ══════════════════════════════════════════
  // 4. REDUÇÃO DE PERDAS
  // ══════════════════════════════════════════
  sectionTitle("4", "Redução de Perdas");
  const totalRet = data.retrabalhos.reduce((s, r) => s + r.quantidade, 0);
  kpiLine(`Riscos ativos: ${data.riscos.length}  |  Retrabalhos: ${totalRet}`);
  if (data.financials) {
    kpiLine(`Custo Retrabalho: R$ ${data.financials.custoRetrabalho.toLocaleString("pt-BR")}  |  Custo Atrasos: R$ ${data.financials.custoAtrasos.toLocaleString("pt-BR", { maximumFractionDigits: 0 })}`);
  }

  if (data.riscos.length > 0) {
    autoTable(doc, {
      startY: y,
      head: [["Risco", "Severidade", "Impacto"]],
      body: data.riscos.map((r) => [r.risco, r.severidade, r.impacto || "—"]),
      styles: { fontSize: 8 },
      headStyles: { fillColor: [41, 37, 36] },
      margin: { left: 14 },
    });
    y = (doc as any).lastAutoTable.finalY + 8;
  } else {
    y += 6;
  }

  // Ações Corretivas
  const acoes = data.acoes || [];
  if (acoes.length > 0) {
    checkPage();
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("4b. Ações Corretivas", 14, y);
    y += 6;
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");

    const today = new Date().toISOString().substring(0, 10);
    const pendentes = acoes.filter((a: any) => a.status === "pendente").length;
    const vencidas = acoes.filter((a: any) => a.status === "pendente" && a.prazo && a.prazo < today).length;
    kpiLine(`Total: ${acoes.length}  |  Pendentes: ${pendentes}  |  Vencidas: ${vencidas}`);

    autoTable(doc, {
      startY: y,
      head: [["Descrição", "Pilar", "Prioridade", "Status", "Prazo"]],
      body: acoes.slice(0, 10).map((a: any) => [
        (a.descricao || "").substring(0, 40), a.pilar, a.prioridade, a.status, a.prazo || "—",
      ]),
      styles: { fontSize: 8 },
      headStyles: { fillColor: [41, 37, 36] },
      margin: { left: 14 },
    });
    y = (doc as any).lastAutoTable.finalY + 8;
  }

  // ══════════════════════════════════════════
  // 5. ANÁLISE CONTÍNUA — FINANCEIRO
  // ══════════════════════════════════════════
  sectionTitle("5", "Análise Contínua — Financeiro (Detalhado)");

  if (data.lancamentos.length > 0) {
    autoTable(doc, {
      startY: y,
      head: [["Data", "Tipo", "Descrição", "Fornecedor", "Valor (R$)", "Status"]],
      body: data.lancamentos.slice(0, 15).map((l) => [
        l.data, l.tipo, (l.descricao || "").substring(0, 30), l.fornecedor || "—",
        Number(l.valor).toLocaleString("pt-BR"), l.status_pagamento,
      ]),
      styles: { fontSize: 8 },
      headStyles: { fillColor: [41, 37, 36] },
      margin: { left: 14 },
    });
    y = (doc as any).lastAutoTable.finalY + 8;
  } else {
    kpiLine("Nenhum lançamento financeiro registrado.");
    y += 4;
  }

  // 5b. Aditivos
  const aditivos = data.aditivos || [];
  if (aditivos.length > 0) {
    checkPage();
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("5b. Aditivos Contratuais", 14, y);
    y += 6;
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");

    const totalAditivos = aditivos.reduce((s, a) => s + Number(a.valor || 0), 0);
    const aprovados = aditivos.filter((a) => a.aprovado).length;
    kpiLine(`Total aditivos: ${aditivos.length}  |  Aprovados: ${aprovados}  |  Valor total: R$ ${totalAditivos.toLocaleString("pt-BR")}`);

    autoTable(doc, {
      startY: y,
      head: [["Descrição", "Tipo", "Valor (R$)", "Aprovado", "Data"]],
      body: aditivos.slice(0, 10).map((a) => [
        a.descricao, a.tipo, Number(a.valor).toLocaleString("pt-BR"),
        a.aprovado ? "Sim" : "Não", a.data,
      ]),
      styles: { fontSize: 8 },
      headStyles: { fillColor: [41, 37, 36] },
      margin: { left: 14 },
    });
    y = (doc as any).lastAutoTable.finalY + 8;
  }

  // ══════════════════════════════════════════
  // 6. SEGURANÇA
  // ══════════════════════════════════════════
  sectionTitle("6", "Segurança & Qualidade");

  if (data.safety) {
    const sf = data.safety;
    kpiLine(`Dias sem Acidente: ${sf.diasSemAcidente}  |  Índice de Severidade: ${sf.indiceSeveridade.toFixed(1)}`);
    kpiLine(`Taxa de Resolução: ${sf.taxaResolucao.toFixed(0)}%  |  Checklist Compliance: ${sf.checklistCompliance.toFixed(0)}%`);
  } else {
    const acidentes = data.incidentes.filter((i) => i.tipo === "acidente");
    const ncAbertas = data.incidentes.filter((i) => i.tipo === "nc" && i.status === "aberto").length;
    const inspecoes = data.incidentes.filter((i) => i.tipo === "inspecao");
    const aprovadas = inspecoes.filter((i) => i.status === "aprovado").length;
    const lastAcidente = acidentes.sort((a, b) => b.data.localeCompare(a.data))[0];
    const dias = lastAcidente
      ? Math.floor((Date.now() - new Date(lastAcidente.data).getTime()) / (1000 * 60 * 60 * 24))
      : data.incidentes.length > 0 ? 999 : 0;
    kpiLine(`Dias sem acidente: ${dias}  |  NC abertas: ${ncAbertas}  |  Inspeções aprovadas: ${aprovadas}/${inspecoes.length}`);
  }

  // Checklist semanal
  const checklist = data.checklist || [];
  if (checklist.length > 0) {
    y += 2;
    const verificados = checklist.filter((c: any) => c.verificado).length;
    kpiLine(`Checklist Semanal: ${verificados}/${checklist.length} verificados`);
  }

  y += 6;

  // ══════════════════════════════════════════
  // FOOTER
  // ══════════════════════════════════════════
  checkPage(20);
  doc.setDrawColor(200);
  doc.line(14, y, pageWidth - 14, y);
  y += 6;
  doc.setFontSize(8);
  doc.setTextColor(128);
  doc.text(`Relatório gerado automaticamente pelo Sistema O.P.E.R.A. em ${new Date().toLocaleString("pt-BR")}`, 14, y);

  doc.save(`relatorio-opera-${data.data}.pdf`);
}
