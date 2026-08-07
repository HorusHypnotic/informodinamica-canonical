import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery, useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Suspense, useMemo, useState } from "react";
import { listEcos } from "@/lib/tdo/ecos.functions";
import { listCausas } from "@/lib/tdo/causas.functions";
import { getCapitalPreservado } from "@/lib/tdo/decisoes.functions";
import { getRecomendacoesPriorizadas } from "@/lib/tdo/recomendacoes.functions";
import { getIOPData } from "@/lib/tdo/iop.functions";
import { calcIRporCausa, calcMC, classificarICO, formatBRL } from "@/lib/tdo/calculos";
import { calcIOP } from "@/lib/tdo/iop";
import { IOPGauge } from "@/components/iop-gauge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { IcoBadge } from "@/components/ico-badge";
import { Plus, TrendingUp, AlertTriangle, ChevronRight, Activity, ShieldCheck, Calculator, Sparkles, AlertOctagon } from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, BarChart, Bar, CartesianGrid, Legend,
} from "recharts";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — OPERA Control" }] }),
  component: () => (
    <Suspense fallback={<div className="text-muted-foreground">Carregando…</div>}>
      <DashboardPage />
    </Suspense>
  ),
  errorComponent: ({ error }) => <div className="text-destructive">Erro: {error.message}</div>,
});

const DOMINIO_LABEL: Record<string, string> = {
  projeto: "Projeto", suprimentos: "Suprimentos", execucao: "Execução", gestao: "Gestão",
  cliente: "Cliente", ambiente: "Ambiente", financeiro: "Financeiro", compliance: "Compliance",
};
const CONSEQ_LABEL: Record<string, string> = {
  atraso: "Atraso", retrabalho: "Retrabalho", desperdicio: "Desperdício", ociosidade: "Ociosidade",
  compra_emergencial: "Compra emerg.", multa: "Multa", paralisacao: "Paralisação", perda_de_margem: "Perda margem",
};
const CONSEQ_COLORS: Record<string, string> = {
  atraso: "#f59e0b", retrabalho: "#ef4444", desperdicio: "#8b5cf6", ociosidade: "#06b6d4",
  compra_emergencial: "#f97316", multa: "#dc2626", paralisacao: "#7c2d12", perda_de_margem: "#10b981",
};

function DashboardPage() {
  const fetchEcos = useServerFn(listEcos);
  const fetchCausas = useServerFn(listCausas);
  const fetchCP = useServerFn(getCapitalPreservado);
  const fetchRecs = useServerFn(getRecomendacoesPriorizadas);
  const fetchIOP = useServerFn(getIOPData);
  const { data: ecosAll } = useSuspenseQuery({ queryKey: ["ecos"], queryFn: () => fetchEcos() });
  const { data: causas } = useSuspenseQuery({ queryKey: ["causas"], queryFn: () => fetchCausas() });
  const { data: cp } = useSuspenseQuery({ queryKey: ["capital-preservado"], queryFn: () => fetchCP() });
  const { data: recsPrior = [] } = useQuery({ queryKey: ["recs-priorizadas"], queryFn: () => fetchRecs() });
  const { data: iopRaw } = useQuery({ queryKey: ["iop-data"], queryFn: () => fetchIOP() });
  const iop = useMemo(() => (iopRaw ? calcIOP(iopRaw) : null), [iopRaw]);

  const [filtroDominio, setFiltroDominio] = useState<string>("__all__");
  const ecos = useMemo(() => {
    if (filtroDominio === "__all__") return ecosAll;
    if (filtroDominio === "__none__") return ecosAll.filter((e) => !e.dominio);
    return ecosAll.filter((e) => e.dominio === filtroDominio);
  }, [ecosAll, filtroDominio]);

  const total = ecos.length;
  const icoMed = total ? Math.round(ecos.reduce((a, e) => a + (e.ico ?? 0), 0) / total) : 0;
  const icoMax = ecos.reduce((a, e) => Math.max(a, e.ico ?? 0), 0);
  const mc = calcMC(ecos);
  const ir = calcIRporCausa(ecos);
  const irMed = ir.length ? Math.round(ir.reduce((a, x) => a + x.percentual, 0) / ir.length) : 0;

  // Prejuízo vinculado a decisões MDEO subótimas
  const prejuizoMdeo = ecosAll
    .filter((e) => e.decisao_mdeo_id)
    .reduce((a, e) => a + Number(e.valor_prejuizo || 0), 0);

  // Cruzamento Domínio × Consequência (somando prejuízo)
  const matriz: Record<string, Record<string, number>> = {};
  const consequenciasUsadas = new Set<string>();
  for (const e of ecos) {
    if (!e.dominio || !e.consequencia) continue;
    matriz[e.dominio] ??= {};
    matriz[e.dominio][e.consequencia] = (matriz[e.dominio][e.consequencia] ?? 0) + Number(e.valor_prejuizo || 0);
    consequenciasUsadas.add(e.consequencia);
  }
  const chartCruz = Object.entries(matriz)
    .map(([d, conss]) => ({ dominio: DOMINIO_LABEL[d] ?? d, ...conss }))
    .sort((a, b) => {
      const sa = Object.values(a).filter((v) => typeof v === "number").reduce((s: number, n) => s + (n as number), 0);
      const sb = Object.values(b).filter((v) => typeof v === "number").reduce((s: number, n) => s + (n as number), 0);
      return sb - sa;
    });

  const meses: { mes: string; mc: number; ecos: number }[] = [];
  const now = new Date();
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const next = new Date(now.getFullYear(), now.getMonth() - i + 1, 1);
    const inMonth = ecos.filter((e) => {
      const ev = new Date(e.data_evento);
      return ev >= d && ev < next;
    });
    meses.push({
      mes: d.toLocaleDateString("pt-BR", { month: "short" }).replace(".", ""),
      mc: inMonth.reduce((a, e) => a + Number(e.valor_prejuizo || 0), 0),
      ecos: inMonth.length,
    });
  }

  const topCausas = ir.slice(0, 8).map((x) => {
    const c = causas.find((c) => c.id === x.causaId);
    const nome = c?.nome ?? "—";
    return { nome: nome.length > 24 ? nome.slice(0, 22) + "…" : nome, ocorrencias: x.ocorrencias, percentual: Math.round(x.percentual) };
  });

  // Padrões OPERA mais frequentes
  const padroesFreq = new Map<string, number>();
  for (const e of ecos) {
    const code = (e as unknown as { padrao_codigo?: string | null }).padrao_codigo;
    if (!code) continue;
    padroesFreq.set(code, (padroesFreq.get(code) ?? 0) + 1);
  }
  const topPadroes = [...padroesFreq.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([codigo, count]) => ({ codigo, count }));



  const empty = ecosAll.length === 0;
  const top3Rec = recsPrior.slice(0, 3);

  return (
    <div className="space-y-5 sm:space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold tracking-tight">Dashboard</h1>
          <p className="text-sm text-muted-foreground">Indicadores da sua operação em tempo real.</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={filtroDominio} onValueChange={setFiltroDominio}>
            <SelectTrigger className="w-[160px] h-9 text-xs"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="__all__">Todos os domínios</SelectItem>
              <SelectItem value="__none__">Sem classificação</SelectItem>
              {Object.entries(DOMINIO_LABEL).map(([v, l]) => <SelectItem key={v} value={v}>{l}</SelectItem>)}
            </SelectContent>
          </Select>
          <Link to="/ecos/novo">
            <Button size="sm" className="sm:size-default">
              <Plus className="h-4 w-4 mr-1" /> <span className="hidden sm:inline">Registrar ECO</span><span className="sm:hidden">ECO</span>
            </Button>
          </Link>
        </div>
      </div>

      {empty ? (
        <EmptyState />
      ) : (
        <>
          {iop && (
            <Card className="p-4 sm:p-5 border-cyan-500/20 bg-gradient-to-br from-slate-900/60 to-slate-950/40">
              <div className="grid gap-4 md:grid-cols-[auto_1fr] items-center">
                <div className="mx-auto md:mx-0">
                  <IOPGauge result={iop} />
                </div>
                <div className="space-y-2 md:pl-4 md:border-l border-white/5">
                  <div className="text-[10px] uppercase tracking-[0.2em] text-cyan-400/80">Índice Operacional OPERA</div>
                  <h2 className="text-lg sm:text-xl font-semibold">Como está a saúde da operação?</h2>
                  <p className="text-sm text-muted-foreground">
                    O IOP condensa criticidade, reincidência, eficiência, plano de ação e tendência em um único número (0–100, quanto maior pior).
                    Faixas: <span className="text-emerald-400 font-medium">0–25 Excelente</span> · <span className="text-lime-400 font-medium">26–50 Adequado</span> · <span className="text-orange-400 font-medium">51–75 Atenção</span> · <span className="text-red-400 font-medium">76–100 Crítico</span>.
                  </p>
                </div>
              </div>
            </Card>
          )}

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <KPI label="Total de ECOs" value={String(total)} icon={<Activity className="h-3.5 w-3.5" />} />
            <KPI label="ICO (campo) médio" value={String(icoMed)} hint={classificarICO(icoMed).label} accent={classificarICO(icoMed).nivel} />
            <KPI label="ICO (campo) máximo" value={String(icoMax)} hint={classificarICO(icoMax).label} accent={classificarICO(icoMax).nivel} />
            <KPI label="MC acumulada" value={formatBRL(mc.acumulada)} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            <KPI label="MC do mês" value={formatBRL(mc.mensal)} icon={<TrendingUp className="h-3.5 w-3.5" />} highlight />
            <KPI label="MC anualizada (proj.)" value={formatBRL(mc.anualizada)} />
            <KPI label="IR médio" value={`${irMed}%`} icon={<AlertTriangle className="h-3.5 w-3.5" />} />
          </div>

          {/* MDEO — Capital Preservado + Prejuízo associado a decisões */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            <Link to="/analises" className="contents">
              <KPI label="Capital Preservado (MDEO)" value={formatBRL(Number(cp.capital_preservado ?? 0))}
                hint="Soma do EPI de decisões aprovadas" icon={<ShieldCheck className="h-3.5 w-3.5" />} accent="verde" />
            </Link>
            <Link to="/analises" className="contents">
              <KPI label="EPI do mês" value={formatBRL(Number(cp.epi_mes ?? 0))}
                hint="Decisões aprovadas neste mês" icon={<Calculator className="h-3.5 w-3.5" />} />
            </Link>
            <KPI label="Prejuízo de decisões subótimas" value={formatBRL(prejuizoMdeo)}
              hint="ECOs vinculados a decisões MDEO" icon={<AlertOctagon className="h-3.5 w-3.5" />}
              accent={prejuizoMdeo > 0 ? "laranja" : "verde"} />
          </div>

          {/* Recomendações prioritárias */}
          {top3Rec.length > 0 && (
            <Card className="p-4 sm:p-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <h3 className="font-semibold text-sm sm:text-base">Recomendações prioritárias</h3>
                </div>
                <span className="text-[11px] sm:text-xs text-muted-foreground">Top {top3Rec.length}</span>
              </div>
              <div className="mt-3 grid gap-3 sm:grid-cols-3">
                {top3Rec.map((r) => (
                  <Link key={r.causaId} to="/causas/$id" params={{ id: r.causaId }}
                    className="block rounded-md border border-border/70 p-3 hover:bg-accent/40 transition-colors">
                    <div className="flex items-center justify-between">
                      <PrioBadge p={r.prioridade} />
                      <span className="text-xs text-muted-foreground num">ICO (campo) {r.icoMedio.toFixed(0)}</span>
                    </div>
                    <div className="mt-1.5 font-medium text-sm line-clamp-1">{r.causaNome}</div>
                    <div className="text-xs text-muted-foreground line-clamp-2 mt-1">
                      {r.acoes.curto[0] ?? "—"}
                    </div>
                  </Link>
                ))}
              </div>
            </Card>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card className="p-4 sm:p-5">
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-semibold text-sm sm:text-base">Evolução da Margem Corroída</h3>
                <span className="text-[11px] sm:text-xs text-muted-foreground">Últimos 6 meses</span>
              </div>
              <div className="h-48 sm:h-64 mt-3 sm:mt-4 -ml-2">
                <ResponsiveContainer>
                  <LineChart data={meses} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="mes" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
                    <YAxis tick={{ fontSize: 11 }} tickLine={false} axisLine={false} tickFormatter={(v) => (v >= 1000 ? `${Math.round(v / 1000)}k` : String(v))} />
                    <Tooltip formatter={(v: number) => formatBRL(v)} contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                    <Line type="monotone" dataKey="mc" stroke="var(--color-primary)" strokeWidth={2.5} dot={{ r: 3 }} activeDot={{ r: 5 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card className="p-4 sm:p-5">
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-semibold text-sm sm:text-base">Top causas raiz</h3>
                <span className="text-[11px] sm:text-xs text-muted-foreground">Por ocorrências</span>
              </div>
              <div className="h-48 sm:h-64 mt-3 sm:mt-4 -ml-2">
                {topCausas.length === 0 ? (
                  <p className="text-sm text-muted-foreground">Nenhuma causa vinculada a ECOs ainda.</p>
                ) : (
                  <ResponsiveContainer>
                    <BarChart data={topCausas} layout="vertical" margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" horizontal={false} />
                      <XAxis type="number" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} allowDecimals={false} />
                      <YAxis type="category" dataKey="nome" tick={{ fontSize: 10 }} width={100} tickLine={false} axisLine={false} />
                      <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                      <Bar dataKey="ocorrencias" fill="var(--color-primary)" radius={[0, 6, 6, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </div>
            </Card>
          </div>

          {/* Domínio × Consequência */}
          <Card className="p-4 sm:p-5">
            <div className="flex items-center justify-between gap-2">
              <div>
                <h3 className="font-semibold text-sm sm:text-base">Onde o prejuízo se concentra</h3>
                <p className="text-xs text-muted-foreground">Domínio × Consequência · soma de prejuízo</p>
              </div>
            </div>
            <div className="h-64 sm:h-72 mt-3 -ml-2">
              {chartCruz.length === 0 ? (
                <p className="text-sm text-muted-foreground">Classifique os ECOs com domínio e consequência para ver este cruzamento.</p>
              ) : (
                <ResponsiveContainer>
                  <BarChart data={chartCruz} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="dominio" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
                    <YAxis tick={{ fontSize: 11 }} tickLine={false} axisLine={false} tickFormatter={(v) => (v >= 1000 ? `${Math.round(v / 1000)}k` : String(v))} />
                    <Tooltip formatter={(v: number) => formatBRL(v)} contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                    <Legend wrapperStyle={{ fontSize: 11 }} />
                    {Array.from(consequenciasUsadas).map((c) => (
                      <Bar key={c} dataKey={c} stackId="x" name={CONSEQ_LABEL[c] ?? c} fill={CONSEQ_COLORS[c] ?? "#64748b"} />
                    ))}
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </Card>

          {topPadroes.length > 0 && (
            <Card className="p-4 sm:p-5">
              <h3 className="font-semibold text-sm sm:text-base">Padrões OPERA mais frequentes</h3>
              <p className="text-xs text-muted-foreground">Top 5 códigos da biblioteca detectados nos ECOs.</p>
              <div className="mt-3 space-y-2">
                {topPadroes.map((p) => (
                  <div key={p.codigo} className="flex items-center justify-between text-sm">
                    <span className="font-medium">{p.codigo}</span>
                    <span className="num text-muted-foreground">{p.count} ECO{p.count > 1 ? "s" : ""}</span>
                  </div>
                ))}
              </div>
            </Card>
          )}


          <Card className="p-4 sm:p-5">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-sm sm:text-base">ECOs recentes</h3>
              <Link to="/ecos" className="text-xs sm:text-sm text-primary hover:underline">Ver todos →</Link>
            </div>
            <div className="mt-2 divide-y divide-border/60">
              {ecos.slice(0, 5).map((e) => (
                <Link key={e.id} to="/ecos/$id" params={{ id: e.id }}
                  className="flex items-center justify-between gap-3 py-3 active:bg-accent/40 sm:hover:bg-accent/30 -mx-2 px-2 rounded-md transition-colors">
                  <div className="min-w-0 flex-1">
                    <div className="truncate font-medium text-sm sm:text-base">{e.titulo}</div>
                    <div className="mt-0.5 flex items-center gap-2 text-xs text-muted-foreground">
                      <span className="num">{new Date(e.data_evento).toLocaleDateString("pt-BR")}</span>
                      <span>•</span>
                      <span className="num">{formatBRL(Number(e.valor_prejuizo))}</span>
                    </div>
                  </div>
                  <IcoBadge valor={e.ico ?? 0} />
                  <ChevronRight className="h-4 w-4 text-muted-foreground/60 shrink-0" />
                </Link>
              ))}
            </div>
          </Card>
        </>
      )}
    </div>
  );
}

function PrioBadge({ p }: { p: "alta" | "media" | "baixa" }) {
  const m = {
    alta:  { label: "Prioridade alta",  cls: "bg-ico-vermelho/15 text-ico-vermelho" },
    media: { label: "Prioridade média", cls: "bg-ico-amarelo/30 text-ico-amarelo-fg" },
    baixa: { label: "Monitorar",        cls: "bg-ico-verde/30 text-ico-verde-fg" },
  }[p];
  return <span className={cn("text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded", m.cls)}>{m.label}</span>;
}

function KPI({
  label, value, hint, icon, accent, highlight,
}: {
  label: string; value: string; hint?: string; icon?: React.ReactNode;
  accent?: "verde" | "amarelo" | "laranja" | "vermelho" | "cinza" | "preto";
  highlight?: boolean;
}) {
  const dot: Record<string, string> = {
    verde: "bg-ico-verde-fg", amarelo: "bg-ico-amarelo-fg", laranja: "bg-ico-laranja-fg",
    vermelho: "bg-ico-vermelho", cinza: "bg-ico-cinza", preto: "bg-ico-preto",
  };
  return (
    <Card className={`p-3 sm:p-4 ${highlight ? "border-primary/30 bg-primary/[0.03]" : ""}`}>
      <div className="flex items-center justify-between text-[11px] sm:text-xs text-muted-foreground">
        <span className="truncate">{label}</span>
        {icon}
      </div>
      <div className="num mt-1 text-xl sm:text-2xl font-semibold tracking-tight">{value}</div>
      {hint && (
        <div className="mt-1 flex items-center gap-1.5 text-[11px] sm:text-xs text-muted-foreground">
          {accent && <span className={`inline-block h-2 w-2 rounded-full ${dot[accent]}`} />}
          {hint}
        </div>
      )}
    </Card>
  );
}

function EmptyState() {
  return (
    <Card className="p-8 sm:p-10 text-center">
      <div className="mx-auto h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
        <Activity className="h-6 w-6" />
      </div>
      <h3 className="mt-4 text-lg font-semibold">Sua operação ainda não tem dados.</h3>
      <p className="mt-2 text-sm text-muted-foreground max-w-sm mx-auto">
        Comece cadastrando uma causa raiz e depois registre seus primeiros ECOs.
      </p>
      <div className="mt-5 flex flex-col sm:flex-row justify-center gap-2">
        <Link to="/causas/novo"><Button variant="outline" className="w-full sm:w-auto">Nova causa raiz</Button></Link>
        <Link to="/ecos/novo"><Button className="w-full sm:w-auto">Registrar ECO</Button></Link>
      </div>
    </Card>
  );
}
