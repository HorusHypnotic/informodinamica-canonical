import { useMemo } from "react";
import { KPICard } from "@/components/dashboard/KPICard";
import { GlobalFilters } from "@/components/dashboard/GlobalFilters";
import { useTableData } from "@/hooks/useTableData";
import { useObra } from "@/hooks/useObra";
import { useAuth } from "@/hooks/useAuth";
import { usePermissions } from "@/hooks/usePermissions";
import { Users, Package, Wrench, ShieldAlert, TrendingUp, ShieldCheck, DollarSign, Heart, FileText, Share2, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useFeatureFlag } from "@/lib/featureFlags";
import { exportOperaReport } from "@/utils/exportOperaReport";
import { exportClientReport } from "@/utils/exportClientReport";
import { DashboardCharts } from "@/components/dashboard/DashboardCharts";
import { AnalyticsAlerts } from "@/components/dashboard/AnalyticsAlerts";
import { OperaScoreCard } from "@/components/dashboard/OperaScoreCard";
import { DataRetentionBanner } from "@/components/dashboard/DataRetentionBanner";

import { EconomyHeroCard } from "@/components/dashboard/EconomyHeroCard";
import { DailySummary } from "@/components/dashboard/DailySummary";
import { SafetyHeroCard } from "@/components/dashboard/SafetyHeroCard";
import { ScheduleCard } from "@/components/dashboard/ScheduleCard";
import { StockSemaphoreCard } from "@/components/dashboard/StockSemaphoreCard";
import { AnomalyCard } from "@/components/dashboard/AnomalyCard";
import { SimulatorCard } from "@/components/dashboard/SimulatorCard";
import { ProductivityCard } from "@/components/dashboard/ProductivityCard";
import { RiskMatrixCard } from "@/components/dashboard/RiskMatrixCard";
import { OperaRadarChart } from "@/components/dashboard/OperaRadarChart";
import { FinancialCharts } from "@/components/dashboard/FinancialCharts";
import { NotificationBadge } from "@/components/dashboard/NotificationBadge";
import { EmptyStateGuide } from "@/components/dashboard/EmptyStateGuide";
import { WasteRankingCard } from "@/components/dashboard/WasteRankingCard";
import { FornecedorRankingCard } from "@/components/dashboard/FornecedorRankingCard";
import { CustoPorCategoriaCard } from "@/components/dashboard/CustoPorCategoriaCard";
import { ObraComparisonCard } from "@/components/dashboard/ObraComparisonCard";
import { ProductTour } from "@/components/tour/ProductTour";
import { TourTrigger } from "@/components/tour/TourTrigger";
import { useProductTour } from "@/hooks/useProductTour";
import { CapacidadePresencaCard } from "@/components/dashboard/CapacidadePresencaCard";
import { ProdutividadeEquipeCard } from "@/components/dashboard/ProdutividadeEquipeCard";
import { useProdutividadeEquipe } from "@/hooks/useProdutividadeEquipe";
import { useDashboardAggregates, useEficienciaPresenca } from "@/hooks/useDashboardAggregates";

import { calculateOperaScore } from "@/analytics/operaScore";
import { calculateFinancials, calculateBurnRate } from "@/analytics/financeiro";
import { calculateProductivity } from "@/analytics/produtividade";
import { calculateStockSemaphore, detectAnomalies } from "@/analytics/estoque";
import { calculateScheduleMetrics } from "@/analytics/cronograma";
import { calculateSafetyMetrics } from "@/analytics/seguranca";

export default function DashboardOverview() {
  const navigate = useNavigate();
  const { obras, selectedObra } = useObra();
  const { profile } = useAuth();
  const tour = useProductTour();

  const { data: registros = [] } = useTableData("registros_diarios");
  const { data: consumo = [] } = useTableData("consumo_materiais");
  const { data: ativos = [] } = useTableData("ativos");
  const { data: riscos = [] } = useTableData("riscos");
  const { data: retrabalhos = [] } = useTableData("retrabalhos");
  const { data: lancamentos = [] } = useTableData("lancamentos_financeiros");
  const { data: incidentes = [] } = useTableData("incidentes_seguranca");
  const { data: sequenciamento = [] } = useTableData("sequenciamento_equipes");
  const { data: logistica = [] } = useTableData("logistica_interna");
  const { data: ciclos = [] } = useTableData("ciclos_tarefa");
  const { data: aditivos = [] } = useTableData("aditivos_contratuais");
  const { data: acoes = [] } = useTableData("acoes_corretivas");
  const { data: checklist = [] } = useTableData("checklist_semanal");
  const { data: colaboradores = [] } = useTableData("colaboradores");
  const { data: presencas = [] } = useTableData("registro_presencas");

  // Opera Score
  const score = useMemo(() => calculateOperaScore({ registros, consumo, ativos, riscos, retrabalhos, lancamentos, incidentes, presencas, obra: selectedObra }), [registros, consumo, ativos, riscos, retrabalhos, lancamentos, incidentes, presencas, selectedObra]);

  // Financial intelligence
  const obraData = useMemo(() => selectedObra ? {
    orcamento_total: (selectedObra as any).orcamento_total || 0,
    area_m2: (selectedObra as any).area_m2 || 0,
    data_inicio: (selectedObra as any).data_inicio,
    data_previsao: (selectedObra as any).data_previsao,
    custo_orcado_m2: (selectedObra as any).custo_orcado_m2 || 0,
  } : undefined, [selectedObra]);

  const financials = useMemo(() => calculateFinancials(lancamentos, retrabalhos, consumo, colaboradores, presencas, obraData), [lancamentos, retrabalhos, consumo, colaboradores, presencas, obraData]);
  const burnRate = useMemo(() => calculateBurnRate(lancamentos), [lancamentos]);

  // Productivity
  const productivity = useMemo(() => calculateProductivity(registros, presencas, logistica, colaboradores), [registros, presencas, logistica, colaboradores]);

  // Stock semaphore
  const stockItems = useMemo(() => calculateStockSemaphore(consumo), [consumo]);
  const anomalies = useMemo(() => detectAnomalies(lancamentos), [lancamentos]);

  // Schedule
  const scheduleMetrics = useMemo(() => {
    if (!selectedObra) return null;
    return calculateScheduleMetrics(selectedObra as any, sequenciamento);
  }, [selectedObra, sequenciamento]);

  // Safety
  const safety = useMemo(() => calculateSafetyMetrics(incidentes, checklist), [incidentes, checklist]);

  // Capacidade & Produtividade por equipe (Camada de Planejamento) — RPC oficial.
  const { data: capacidade, isLoading: capacidadeLoading } = useEficienciaPresenca((selectedObra as any)?.id || null);
  const { data: equipesProdutividade = [] } = useProdutividadeEquipe((selectedObra as any)?.id || null);

  // Feature flag: dashboard unificado (RPC server-side para finance/safety/score components).
  // Quando ativa: cards passam a consumir agregados do servidor em paralelo ao legacy.
  const [unifiedDashboard, setUnifiedDashboard] = useFeatureFlag("unified_dashboard");
  const { data: aggregates } = useDashboardAggregates({
    includeFinance: unifiedDashboard,
    includeSafety: unifiedDashboard,
    includeScoreComponents: unifiedDashboard,
  });

  // Quando flag ativa, sobrescreve métricas-chave com a fonte server-side (período-aware).
  // Mantém estrutura de objeto para não quebrar componentes downstream.
  const financialsEffective = unifiedDashboard && aggregates?.financeiro ? {
    ...financials,
    receita: aggregates.financeiro.receita,
    totalCustos: aggregates.financeiro.custo,
    saldo: aggregates.financeiro.saldo,
    custoRetrabalho: aggregates.financeiro.custo_retrabalho ?? financials.custoRetrabalho,
  } : financials;

  const safetyEffective = unifiedDashboard && aggregates?.safety ? {
    ...safety,
    diasSemAcidente: aggregates.safety.dias_sem_acidente,
    taxaResolucao: aggregates.safety.taxa_resolucao,
    indiceSeveridade: aggregates.safety.indice_severidade,
    checklistCompliance: aggregates.safety.checklist_compliance,
  } : safety;

  // Notifications
  const today = new Date().toISOString().substring(0, 10);
  const acoesVencidas = acoes.filter((a: any) => a.status === "pendente" && a.prazo && a.prazo < today).length;
  const riscosAbertos = riscos.length;
  const checklistPendentes = checklist.filter((c: any) => !c.verificado).length;
  const materiaisCriticos = stockItems.filter(s => s.status === "critical").length;

  // Desperdicio for simulator
  const desperdicioMedio = consumo.length > 0
    ? consumo.filter((m: any) => Number(m.previsto) > 0).reduce((acc: number, m: any) => acc + Math.max(0, ((Number(m.real_consumo) - Number(m.previsto)) / Number(m.previsto)) * 100), 0) / Math.max(consumo.filter((m: any) => Number(m.previsto) > 0).length, 1)
    : 0;
  const custoMateriais = financials.totalCustos * 0.4;

  // Obra comparison data
  const lancamentosByObra = useMemo(() => {
    const result: Record<string, { receita: number; custo: number }> = {};
    lancamentos.forEach((l: any) => {
      if (!result[l.obra_id]) result[l.obra_id] = { receita: 0, custo: 0 };
      if (l.tipo === "receita") result[l.obra_id].receita += Number(l.valor);
      else result[l.obra_id].custo += Number(l.valor);
    });
    return result;
  }, [lancamentos]);

  const handleExportPDF = () => {
    exportOperaReport({
      obraNome: selectedObra?.nome || "Todas as obras",
      responsavel: profile?.full_name || profile?.email || "—",
      data: new Date().toLocaleDateString("pt-BR"),
      registros, consumo, ativos, riscos, retrabalhos, lancamentos, incidentes,
      logistica, ciclos, aditivos, acoes, checklist, colaboradores, presencas,
      score,
      financials,
      productivity,
      safety,
      scheduleMetrics: scheduleMetrics ? {
        spiPercent: (scheduleMetrics.spi || 0) * 100,
        faseAtual: (selectedObra as any)?.fase_atual || "iniciacao",
        diasDecorridos: scheduleMetrics.diasCorridos || 0,
        diasRestantes: scheduleMetrics.diasRestantes || 0,
      } : null,
      obraData,
    });
  };

  const handleExportClientPDF = () => {
    if (!selectedObra) return;
    const today = new Date().toISOString().substring(0, 10);
    const acoesPend = acoes.filter((a: any) => a.status === "pendente").length;
    const acoesVenc = acoes.filter((a: any) => a.status === "pendente" && a.prazo && a.prazo < today).length;
    const pctUsado = obraData?.orcamento_total && obraData.orcamento_total > 0
      ? (financials.totalCustos / obraData.orcamento_total) * 100 : 0;

    exportClientReport({
      obraNome: selectedObra.nome,
      empresaNome: profile?.full_name || "Construtora",
      responsavel: selectedObra.responsavel || profile?.full_name || "—",
      data: new Date().toLocaleDateString("pt-BR"),
      operaScore: score.total,
      orcamentoTotal: obraData?.orcamento_total || 0,
      custoRealizado: financials.totalCustos,
      percentualUtilizado: pctUsado,
      saldo: financials.saldo,
      margem: financials.margem,
      faseAtual: (selectedObra as any)?.fase_atual || "iniciacao",
      spiPercent: scheduleMetrics ? (scheduleMetrics.spi || 0) * 100 : 0,
      diasDecorridos: scheduleMetrics?.diasCorridos || 0,
      diasRestantes: scheduleMetrics?.diasRestantes || 0,
      dataInicio: (selectedObra as any)?.data_inicio,
      dataPrevisao: (selectedObra as any)?.data_previsao,
      diasSemAcidente: safety.diasSemAcidente,
      checklistCompliance: safety.checklistCompliance,
      riscosAtivos: riscos.length,
      acoesPendentes: acoesPend,
      acoesVencidas: acoesVenc,
      status: selectedObra.status,
    });
  };

  const sections = [
    { letter: "O", title: "Organização", subtitle: "Mão de Obra", icon: <Users className="h-5 w-5" />, url: "/organizacao", kpi: `${registros.length} registros`, status: registros.length === 0 ? "warning" as const : "ok" as const },
    { letter: "P", title: "Padronização", subtitle: "Insumos", icon: <Package className="h-5 w-5" />, url: "/padronizacao", kpi: `Desp: ${desperdicioMedio.toFixed(1)}%`, status: desperdicioMedio > 5 ? "warning" as const : "ok" as const },
    { letter: "E", title: "Eficiência", subtitle: "Ativos", icon: <Wrench className="h-5 w-5" />, url: "/eficiencia", kpi: `${ativos.length} ativos`, status: (ativos.length > 0 ? ativos.filter((f: any) => f.status === "ativo").length / ativos.length * 100 : 100) >= 80 ? "ok" as const : "warning" as const },
    { letter: "R", title: "Redução de Perdas", subtitle: "Improdutividade", icon: <ShieldAlert className="h-5 w-5" />, url: "/reducao-perdas", kpi: `${riscos.length} riscos`, status: riscos.length > 3 ? "critical" as const : "ok" as const },
    { letter: "A", title: "Análise Contínua", subtitle: "Financeiro", icon: <TrendingUp className="h-5 w-5" />, url: "/analise-continua", kpi: `Margem: ${financials.margem.toFixed(1)}%`, status: financials.margem > 15 ? "ok" as const : financials.margem > 10 ? "warning" as const : "critical" as const },
  ];

  const hasData = registros.length > 0 || consumo.length > 0 || lancamentos.length > 0 || ativos.length > 0;

  return (
    <div data-tour="welcome">
      <ProductTour
        isActive={tour.isActive}
        currentStep={tour.currentStep}
        steps={tour.steps}
        onNext={tour.nextStep}
        onPrev={tour.prevStep}
        onSkip={tour.skipTour}
      />

      <div data-tour="global-filters">
        <GlobalFilters />
      </div>
      <DataRetentionBanner />

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Dashboard O.P.E.R.A.</h1>
          <p className="text-sm text-muted-foreground">Visão consolidada • {selectedObra?.nome || "Todas as obras"}</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {/* Feature flag — fonte unificada (admins/avançado) */}
          <label className="flex items-center gap-1.5 text-xs text-muted-foreground glass-card px-2 py-1.5 cursor-pointer" title="Quando ativo, KPIs de financeiro/segurança/score consomem dashboard_aggregates RPC (período-aware) ao invés do legacy useTableData">
            <Zap className={`h-3.5 w-3.5 ${unifiedDashboard ? "text-primary" : ""}`} />
            <span className="hidden sm:inline">Fonte unificada</span>
            <Switch checked={unifiedDashboard} onCheckedChange={setUnifiedDashboard} />
          </label>
          <TourTrigger onClick={tour.startTour} />
          {selectedObra && (
            <Button variant="outline" size="sm" className="gap-1.5" onClick={handleExportClientPDF}>
              <Share2 className="h-4 w-4" /> Relatório Cliente
            </Button>
          )}
          <Button variant="outline" size="sm" className="gap-1.5" onClick={handleExportPDF} data-tour="export-pdf">
            <FileText className="h-4 w-4" /> Exportar PDF
          </Button>
        </div>
      </div>

      {/* Onboarding guide */}
      <div data-tour="onboarding-guide">
        <EmptyStateGuide
          hasObras={obras.length > 0}
          hasRegistros={registros.length > 0}
          hasConsumo={consumo.length > 0}
          hasAtivos={ativos.length > 0}
          hasLancamentos={lancamentos.length > 0}
          hasColaboradores={colaboradores.length > 0}
        />
      </div>

      {/* Notifications */}
      <NotificationBadge
        acoesVencidas={acoesVencidas}
        riscosAbertos={riscosAbertos}
        checklistPendentes={checklistPendentes}
        materiaisCriticos={materiaisCriticos}
        anomalias={anomalies.length}
      />

      {/* Daily Summary */}
      <DailySummary
        registros={registros} presencas={presencas} lancamentos={lancamentos}
        consumo={consumo} acoes={acoes} checklist={checklist} colaboradores={colaboradores}
        obraNome={selectedObra?.nome || "Todas as obras"}
      />

      {/* Economy Hero */}
      <EconomyHeroCard financials={financialsEffective} orcamentoTotal={obraData?.orcamento_total || 0} />

      {/* Score + Radar side by side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6" data-tour="opera-score">
        <OperaScoreCard registros={registros} consumo={consumo} ativos={ativos} riscos={riscos} retrabalhos={retrabalhos} lancamentos={lancamentos} incidentes={incidentes} presencas={presencas} obra={selectedObra} />
        <OperaRadarChart score={score} />
      </div>

      {/* Camada de Planejamento: Capacidade Real vs Esperada + Produtividade por Equipe */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <CapacidadePresencaCard data={capacidade} obraNome={selectedObra?.nome} isLoading={capacidadeLoading} />
        <ProdutividadeEquipeCard equipes={equipesProdutividade} />
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6" data-tour="kpi-row">
        <KPICard title="Saldo" value={`R$ ${(financialsEffective.saldo / 1000).toFixed(0)}k`} icon={<DollarSign className="h-4 w-4" />} tooltip="Receitas - Custos" status={financialsEffective.saldo >= 0 ? "ok" : "critical"} />
        <KPICard title="Obras" value={obras.length} icon={<TrendingUp className="h-4 w-4" />} tooltip="Total de obras cadastradas" status="ok" />
        <KPICard title="Dias s/ Acidente" value={safetyEffective.diasSemAcidente} icon={<Heart className="h-4 w-4" />} tooltip="Dias consecutivos sem acidentes" status="ok" />
        <KPICard title="Inspeções" value={`${safetyEffective.taxaResolucao.toFixed(0)}%`} icon={<ShieldCheck className="h-4 w-4" />} tooltip="Taxa de resolução de incidentes" status={safetyEffective.taxaResolucao >= 90 ? "ok" : "warning"} />
        <KPICard title="Absenteísmo" value={`${productivity.absenteismo.toFixed(1)}%`} icon={<Users className="h-4 w-4" />} tooltip="Faltas ÷ total de dias" status={productivity.absenteismo > 5 ? "critical" : productivity.absenteismo > 3 ? "warning" : "ok"} />
        <KPICard title="Colaboradores" value={productivity.colaboradoresAtivos} icon={<Users className="h-4 w-4" />} tooltip="Colaboradores ativos cadastrados" status="ok" />
      </div>

      {/* Financial Charts */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <DollarSign className="h-5 w-5 text-primary" />
          Visibilidade Financeira
        </h2>
        <FinancialCharts
          burnRate={burnRate}
          custoRealM2={financialsEffective.custoRealM2}
          custoOrcadoM2={obraData?.custo_orcado_m2 || 0}
          projecaoCustoFinal={financialsEffective.projecaoCustoFinal}
          orcamentoTotal={obraData?.orcamento_total || 0}
        />
      </div>

      {/* Productivity + Safety */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <ProductivityCard metrics={productivity} registros={registros} presencas={presencas} />
        <SafetyHeroCard
          diasSemAcidente={safetyEffective.diasSemAcidente}
          indiceSeveridade={safetyEffective.indiceSeveridade}
          taxaResolucao={safetyEffective.taxaResolucao}
          checklistCompliance={safetyEffective.checklistCompliance}
        />
      </div>

      {/* Schedule + Risk + Stock + Simulator */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <ScheduleCard metrics={scheduleMetrics} faseAtual={(selectedObra as any)?.fase_atual || "iniciacao"} />
        <RiskMatrixCard riscos={riscos} />
        <StockSemaphoreCard items={stockItems} />
        <SimulatorCard
          desperdicioAtual={desperdicioMedio}
          custoMateriais={custoMateriais}
          custoRetrabalhoAtual={financials.custoRetrabalho}
          burnRateAtual={financials.burnRateMensal}
        />
      </div>

      {/* Intelligence Row: Waste + Fornecedor + Categoria + Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <WasteRankingCard consumo={consumo} />
        <FornecedorRankingCard lancamentos={lancamentos} />
        <CustoPorCategoriaCard lancamentos={lancamentos} />
      </div>

      {/* Obra Comparison */}
      <div className="mb-6">
        <ObraComparisonCard obras={obras} lancamentosByObra={lancamentosByObra} />
      </div>

      {/* Anomalies */}
      <AnomalyCard anomalies={anomalies} />

      {/* Original charts */}
      <div className="mt-6">
        <DashboardCharts registros={registros} consumo={consumo} lancamentos={lancamentos} incidentes={incidentes} />
      </div>

      <AnalyticsAlerts registros={registros} consumo={consumo} retrabalhos={retrabalhos} sequenciamento={sequenciamento} />

      {/* Module navigation */}
      <h2 className="text-lg font-semibold mb-4">Módulos O.P.E.R.A.</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4" data-tour="module-nav">
        {sections.map((s) => (
          <button key={s.letter} onClick={() => navigate(s.url)} className="glass-card p-5 text-left hover:border-primary/50 transition-all group cursor-pointer">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-8 h-8 rounded-lg bg-primary/20 text-primary font-bold text-lg flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">{s.letter}</span>
              <div className="text-primary">{s.icon}</div>
            </div>
            <h3 className="font-semibold text-sm mb-0.5">{s.title}</h3>
            <p className="text-xs text-muted-foreground mb-3">{s.subtitle}</p>
            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-mono font-semibold ${
              s.status === "ok" ? "bg-status-ok/15 text-status-ok" :
              s.status === "warning" ? "bg-status-warning/15 text-status-warning" :
              "bg-status-critical/15 text-status-critical"
            }`}>{s.kpi}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
