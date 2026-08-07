import { KPICard } from "@/components/dashboard/KPICard";
import { SectionHeader } from "@/components/dashboard/SectionHeader";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { GlobalFilters } from "@/components/dashboard/GlobalFilters";
import { AddRecordDialog, EditRecordDialog, DeleteRecordButton } from "@/components/dashboard/AddRecordDialog";
import { FornecedorRankingCard } from "@/components/dashboard/FornecedorRankingCard";
import { CustoPorCategoriaCard } from "@/components/dashboard/CustoPorCategoriaCard";
import { useTableData } from "@/hooks/useTableData";
import { TrendingUp, DollarSign, PiggyBank, AlertTriangle, FileText } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Lancamento { id: string; tipo: string; valor: number; descricao: string | null; data: string; fornecedor: string | null; status_pagamento: string; }
interface Aditivo { id: string; descricao: string; valor: number; tipo: string; aprovado: boolean; data: string; }

const fields = [
  { name: "tipo", label: "Tipo", type: "select" as const, defaultValue: "custo", options: [
    { value: "receita", label: "Receita" }, { value: "custo", label: "Custo" },
  ]},
  { name: "valor", label: "Valor (R$)", type: "number" as const, required: true },
  { name: "descricao", label: "Descrição", placeholder: "Ex: Pagamento fornecedor X", required: false },
  { name: "fornecedor", label: "Fornecedor", placeholder: "Ex: Votorantim", required: false },
  { name: "status_pagamento", label: "Status", type: "select" as const, defaultValue: "pendente", options: [
    { value: "pago", label: "Pago" }, { value: "pendente", label: "Pendente" }, { value: "atrasado", label: "Atrasado" },
  ]},
  { name: "data", label: "Data", type: "date" as const, defaultValue: new Date().toISOString().split("T")[0] },
];

const aditivoFields = [
  { name: "descricao", label: "Descrição", placeholder: "Ex: Alteração de projeto elétrico", required: true },
  { name: "valor", label: "Valor (R$)", type: "number" as const, required: true },
  { name: "tipo", label: "Tipo", type: "select" as const, defaultValue: "aditivo", options: [
    { value: "aditivo", label: "Aditivo Contratual" },
    { value: "desvio", label: "Desvio Técnico" },
  ]},
  { name: "aprovado", label: "Aprovado?", type: "select" as const, defaultValue: "false", options: [
    { value: "true", label: "Sim" }, { value: "false", label: "Não" },
  ]},
  { name: "data", label: "Data", type: "date" as const, defaultValue: new Date().toISOString().split("T")[0] },
];

export default function AnaliseContinuaPage() {
  const { data: lancamentos = [], isLoading, insert, update, remove } = useTableData<Lancamento>("lancamentos_financeiros");
  const { data: aditivos = [], insert: insertAditivo, update: updateAditivo, remove: removeAditivo } = useTableData<Aditivo>("aditivos_contratuais");

  const receitas = lancamentos.filter((l) => l.tipo === "receita");
  const custos = lancamentos.filter((l) => l.tipo === "custo");
  const totalReceitas = receitas.reduce((s, l) => s + Number(l.valor), 0);
  const totalCustos = custos.reduce((s, l) => s + Number(l.valor), 0);
  const saldo = totalReceitas - totalCustos;
  const margem = totalReceitas > 0 ? ((saldo / totalReceitas) * 100) : 0;
  const margemStatus = margem > 15 ? "ok" : margem > 10 ? "warning" : "critical";

  const totalAditivos = aditivos.reduce((s, a) => s + Number(a.valor), 0);
  const aditivosNaoAprovados = aditivos.filter((a) => !a.aprovado && a.tipo === "desvio");

  const byMonth: Record<string, { receita: number; custo: number }> = {};
  lancamentos.forEach((l) => {
    const mes = l.data?.substring(0, 7) || "N/A";
    if (!byMonth[mes]) byMonth[mes] = { receita: 0, custo: 0 };
    if (l.tipo === "receita") byMonth[mes].receita += Number(l.valor);
    else byMonth[mes].custo += Number(l.valor);
  });
  const chartData = Object.entries(byMonth)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([mes, v]) => ({ mes, ...v, lucro: v.receita - v.custo }));

  return (
    <div>
      <GlobalFilters />
      <SectionHeader title="Análise Contínua — Financeiro" subtitle="Fluxo de caixa, projeções, aditivos e controle de fornecedores" icon={<TrendingUp className="h-5 w-5" />} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <KPICard title="Total Receitas" value={`R$ ${(totalReceitas / 1000).toFixed(0)}k`} icon={<TrendingUp className="h-5 w-5" />} tooltip="Total de receitas registradas" status="ok" />
        <KPICard title="Total Custos" value={`R$ ${(totalCustos / 1000).toFixed(0)}k`} icon={<DollarSign className="h-5 w-5" />} tooltip="Total de custos registrados" />
        <KPICard title="Saldo" value={`R$ ${saldo.toLocaleString("pt-BR")}`} icon={<PiggyBank className="h-5 w-5" />} tooltip="Receitas - Custos" status={saldo >= 0 ? "ok" : "critical"} />
        <KPICard title="Margem" value={`${margem.toFixed(1)}%`} icon={<AlertTriangle className="h-5 w-5" />} tooltip="Margem sobre receitas" status={margemStatus as any} subtitle="Mín. recomendado: 10%" />
        <KPICard title="Aditivos/Desvios" value={`R$ ${(totalAditivos / 1000).toFixed(0)}k`} icon={<FileText className="h-5 w-5" />} tooltip="Total de aditivos e desvios" status={aditivosNaoAprovados.length > 0 ? "critical" : "ok"} subtitle={`${aditivosNaoAprovados.length} não aprovados`} />
      </div>

      {margemStatus === "critical" && totalReceitas > 0 && (
        <div className="mb-6 p-4 rounded-lg bg-status-critical/10 border border-status-critical/30 flex items-center gap-3">
          <AlertTriangle className="h-5 w-5 text-status-critical shrink-0" />
          <div>
            <p className="text-sm font-semibold text-status-critical">⚠ Ponto de Ruptura Financeira</p>
            <p className="text-xs text-muted-foreground">A margem está sendo consumida. Ação imediata necessária.</p>
          </div>
        </div>
      )}

      {chartData.length > 0 && (
        <div className="glass-card p-4 mb-6">
          <h3 className="text-sm font-semibold mb-4">Evolução Financeira</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="mes" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
              <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }} formatter={(v: number) => `R$ ${v.toLocaleString("pt-BR")}`} />
              <Legend />
              <Area type="monotone" dataKey="receita" stroke="hsl(var(--status-ok))" fill="hsl(var(--status-ok) / 0.2)" name="Receita" />
              <Area type="monotone" dataKey="custo" stroke="hsl(var(--status-critical))" fill="hsl(var(--status-critical) / 0.2)" name="Custo" />
              <Area type="monotone" dataKey="lucro" stroke="hsl(var(--primary))" fill="hsl(var(--primary) / 0.2)" name="Lucro" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Intelligence Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <FornecedorRankingCard lancamentos={lancamentos} />
        <CustoPorCategoriaCard lancamentos={lancamentos} />
      </div>

      <Tabs defaultValue="lancamentos" className="space-y-4">
        <TabsList>
          <TabsTrigger value="lancamentos">Lançamentos ({lancamentos.length})</TabsTrigger>
          <TabsTrigger value="aditivos">Aditivos & Desvios ({aditivos.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="lancamentos">
          <div className="flex justify-end mb-3">
            <AddRecordDialog title="Novo Lançamento Financeiro" fields={fields} onSubmit={insert} />
          </div>
          <div className="glass-card p-4 overflow-x-auto">
            <h3 className="text-sm font-semibold mb-3">Lançamentos Recentes</h3>
            {isLoading ? <p className="text-sm text-muted-foreground py-8 text-center">Carregando...</p> :
            lancamentos.length === 0 ? <p className="text-sm text-muted-foreground py-8 text-center">Nenhum lançamento registrado.</p> : (
              <table className="w-full text-sm">
                <thead><tr className="border-b border-border text-muted-foreground">
                  <th className="text-left py-2 px-3">Tipo</th>
                  <th className="text-left py-2 px-3">Descrição</th>
                  <th className="text-left py-2 px-3">Fornecedor</th>
                  <th className="text-right py-2 px-3">Valor</th>
                  <th className="text-left py-2 px-3">Status</th>
                  <th className="text-left py-2 px-3">Data</th>
                  <th className="text-right py-2 px-3">Ações</th>
                </tr></thead>
                <tbody>
                  {lancamentos.slice(0, 20).map((l) => (
                    <tr key={l.id} className="border-b border-border/50 hover:bg-secondary/50 transition-colors">
                      <td className="py-2.5 px-3"><StatusBadge status={l.tipo === "receita" ? "ok" : "warning"} label={l.tipo === "receita" ? "Receita" : "Custo"} /></td>
                      <td className="py-2.5 px-3">{l.descricao || "—"}</td>
                      <td className="py-2.5 px-3 text-muted-foreground">{l.fornecedor || "—"}</td>
                      <td className="py-2.5 px-3 text-right font-mono">{Number(l.valor).toLocaleString("pt-BR")}</td>
                      <td className="py-2.5 px-3"><StatusBadge status={l.status_pagamento as any} /></td>
                      <td className="py-2.5 px-3 text-xs">{l.data}</td>
                      <td className="py-2.5 px-3 text-right">
                        <div className="flex justify-end gap-1">
                          <EditRecordDialog title="Editar Lançamento" fields={fields} record={l} onSubmit={update} />
                          <DeleteRecordButton onConfirm={() => remove(l.id)} itemName={l.descricao || "lançamento"} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </TabsContent>

        <TabsContent value="aditivos">
          <div className="flex justify-end mb-3">
            <AddRecordDialog title="Novo Aditivo / Desvio" fields={aditivoFields} onSubmit={insertAditivo}
              trigger={<button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm bg-status-warning/10 text-status-warning hover:bg-status-warning/20 transition-colors"><FileText className="h-4 w-4" /> Novo Aditivo/Desvio</button>}
            />
          </div>
          <div className="glass-card p-4 overflow-x-auto">
            <h3 className="text-sm font-semibold mb-3">Controle de Aditivos & Desvios Técnicos</h3>
            {aditivos.length === 0 ? <p className="text-sm text-muted-foreground py-8 text-center">Nenhum aditivo ou desvio registrado.</p> : (
              <table className="w-full text-sm">
                <thead><tr className="border-b border-border text-muted-foreground">
                  <th className="text-left py-2 px-3">Descrição</th>
                  <th className="text-left py-2 px-3">Tipo</th>
                  <th className="text-right py-2 px-3">Valor (R$)</th>
                  <th className="text-left py-2 px-3">Aprovado</th>
                  <th className="text-left py-2 px-3">Data</th>
                  <th className="text-right py-2 px-3">Ações</th>
                </tr></thead>
                <tbody>
                  {aditivos.map((a) => (
                    <tr key={a.id} className="border-b border-border/50 hover:bg-secondary/50 transition-colors">
                      <td className="py-2.5 px-3 font-medium">{a.descricao}</td>
                      <td className="py-2.5 px-3">
                        <StatusBadge status={a.tipo === "aditivo" ? "warning" : "critical"} label={a.tipo === "aditivo" ? "Aditivo" : "Desvio"} />
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono">{Number(a.valor).toLocaleString("pt-BR")}</td>
                      <td className="py-2.5 px-3">
                        <StatusBadge status={a.aprovado ? "ok" : "critical"} label={a.aprovado ? "Sim" : "Não"} />
                      </td>
                      <td className="py-2.5 px-3 text-xs">{a.data}</td>
                      <td className="py-2.5 px-3 text-right">
                        <div className="flex justify-end gap-1">
                          <EditRecordDialog title="Editar Aditivo" fields={aditivoFields} record={a} onSubmit={updateAditivo} />
                          <DeleteRecordButton onConfirm={() => removeAditivo(a.id)} itemName={a.descricao} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
