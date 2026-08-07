import { KPICard } from "@/components/dashboard/KPICard";
import { SectionHeader } from "@/components/dashboard/SectionHeader";
import { GlobalFilters } from "@/components/dashboard/GlobalFilters";
import { AddRecordDialog, EditRecordDialog, DeleteRecordButton } from "@/components/dashboard/AddRecordDialog";
import { useTableData } from "@/hooks/useTableData";
import { ShieldCheck, Heart, CheckCircle, XCircle } from "lucide-react";

interface Incidente { id: string; tipo: string; descricao: string | null; data: string; status: string; severidade: string; }

const fields = [
  { name: "tipo", label: "Tipo", type: "select" as const, defaultValue: "nc", options: [
    { value: "acidente", label: "Acidente" }, { value: "inspecao", label: "Inspeção" }, { value: "nc", label: "Não Conformidade" },
  ]},
  { name: "descricao", label: "Descrição", placeholder: "Descreva o incidente", required: true },
  { name: "status", label: "Status", type: "select" as const, defaultValue: "aberto", options: [
    { value: "aberto", label: "Aberto" }, { value: "resolvido", label: "Resolvido" }, { value: "aprovado", label: "Aprovado" }, { value: "reprovado", label: "Reprovado" },
  ]},
  { name: "severidade", label: "Severidade", type: "select" as const, defaultValue: "media", options: [
    { value: "alta", label: "Alta" }, { value: "media", label: "Média" }, { value: "baixa", label: "Baixa" },
  ]},
  { name: "data", label: "Data", type: "date" as const, defaultValue: new Date().toISOString().split("T")[0] },
];

export default function SegurancaQualidadePage() {
  const { data: incidentes = [], isLoading, insert, update, remove } = useTableData<Incidente>("incidentes_seguranca");

  const acidentes = incidentes.filter((i) => i.tipo === "acidente");
  const ncs = incidentes.filter((i) => i.tipo === "nc");
  const inspecoes = incidentes.filter((i) => i.tipo === "inspecao");
  const ncAbertas = ncs.filter((i) => i.status === "aberto").length;
  const ncResolvidas = ncs.filter((i) => i.status === "resolvido").length;
  const inspecoesAprovadas = inspecoes.filter((i) => i.status === "aprovado").length;
  const inspecoesTotal = inspecoes.length;
  const inspecoesPercent = inspecoesTotal > 0 ? (inspecoesAprovadas / inspecoesTotal) * 100 : 100;

  const lastAcidente = acidentes.sort((a, b) => b.data.localeCompare(a.data))[0];
  const diasSemAcidente = lastAcidente
    ? Math.floor((Date.now() - new Date(lastAcidente.data).getTime()) / (1000 * 60 * 60 * 24))
    : incidentes.length > 0 ? 999 : 0;

  return (
    <div>
      <GlobalFilters />
      <SectionHeader title="Segurança & Qualidade" subtitle="Indicadores de segurança do trabalho e conformidade" icon={<ShieldCheck className="h-5 w-5" />} />

      <div className="flex justify-end mb-4">
        <AddRecordDialog title="Novo Registro de Segurança" fields={fields} onSubmit={insert} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="glass-card p-6 glow-orange col-span-1 sm:col-span-2 lg:col-span-1 flex flex-col items-center justify-center">
          <Heart className="h-8 w-8 text-primary mb-2 animate-pulse" />
          <p className="text-5xl font-bold text-primary">{diasSemAcidente}</p>
          <p className="text-sm text-muted-foreground mt-1">Dias Sem Acidente</p>
        </div>
        <KPICard title="Inspeções Aprovadas" value={`${inspecoesPercent.toFixed(0)}%`} icon={<CheckCircle className="h-5 w-5" />} tooltip="Percentual de inspeções aprovadas" status={inspecoesPercent >= 90 ? "ok" : "warning"} subtitle={`${inspecoesAprovadas}/${inspecoesTotal}`} />
        <KPICard title="NC Abertas" value={ncAbertas} icon={<XCircle className="h-5 w-5" />} tooltip="Não conformidades abertas" status={ncAbertas > 5 ? "critical" : ncAbertas > 0 ? "warning" : "ok"} />
        <KPICard title="NC Resolvidas" value={ncResolvidas} icon={<CheckCircle className="h-5 w-5" />} tooltip="Não conformidades resolvidas" status="ok" />
      </div>

      {(ncAbertas + ncResolvidas > 0) && (
        <div className="glass-card p-5 mb-6">
          <h3 className="text-sm font-semibold mb-4">Progresso de Resolução — Não Conformidades</h3>
          <div className="flex items-center gap-4 mb-2">
            <span className="text-sm text-muted-foreground">Resolvidas</span>
            <div className="flex-1 h-4 rounded-full bg-secondary overflow-hidden">
              <div className="h-full rounded-full bg-status-ok transition-all duration-1000" style={{ width: `${(ncResolvidas / (ncResolvidas + ncAbertas)) * 100}%` }} />
            </div>
            <span className="text-sm font-mono">{ncResolvidas}/{ncResolvidas + ncAbertas}</span>
          </div>
        </div>
      )}

      <div className="glass-card p-4 overflow-x-auto">
        <h3 className="text-sm font-semibold mb-3">Todos os Registros</h3>
        {isLoading ? <p className="text-sm text-muted-foreground py-8 text-center">Carregando...</p> :
        incidentes.length === 0 ? <p className="text-sm text-muted-foreground py-8 text-center">Nenhum registro de segurança.</p> : (
          <table className="w-full text-sm">
            <thead><tr className="border-b border-border text-muted-foreground">
              <th className="text-left py-2 px-3">Tipo</th>
              <th className="text-left py-2 px-3">Descrição</th>
              <th className="text-left py-2 px-3">Severidade</th>
              <th className="text-left py-2 px-3">Status</th>
              <th className="text-left py-2 px-3">Data</th>
              <th className="text-right py-2 px-3">Ações</th>
            </tr></thead>
            <tbody>
              {incidentes.map((i) => (
                <tr key={i.id} className="border-b border-border/50 hover:bg-secondary/50 transition-colors">
                  <td className="py-2.5 px-3 font-medium capitalize">{i.tipo}</td>
                  <td className="py-2.5 px-3 text-muted-foreground">{i.descricao || "—"}</td>
                  <td className="py-2.5 px-3 capitalize">{i.severidade}</td>
                  <td className="py-2.5 px-3 capitalize">{i.status}</td>
                  <td className="py-2.5 px-3 text-xs">{i.data}</td>
                  <td className="py-2.5 px-3 text-right">
                    <div className="flex justify-end gap-1">
                      <EditRecordDialog title="Editar Registro" fields={fields} record={i} onSubmit={update} />
                      <DeleteRecordButton onConfirm={() => remove(i.id)} itemName={i.descricao || "registro"} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
