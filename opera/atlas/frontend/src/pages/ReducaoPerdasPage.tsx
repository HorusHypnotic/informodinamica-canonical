import { KPICard } from "@/components/dashboard/KPICard";
import { SectionHeader } from "@/components/dashboard/SectionHeader";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { GlobalFilters } from "@/components/dashboard/GlobalFilters";
import { AddRecordDialog, EditRecordDialog, DeleteRecordButton } from "@/components/dashboard/AddRecordDialog";
import { useTableData } from "@/hooks/useTableData";
import { ShieldAlert, AlertTriangle, RotateCcw } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Risco { id: string; risco: string; severidade: string; impacto: string | null; prazo: string | null; }
interface Retrabalho { id: string; etapa: string; quantidade: number; descricao: string | null; data_registro: string; }
interface SeqEquipe { id: string; equipe: string; semana_inicio: number; semana_fim: number; status: string; }

const riscoFields = [
  { name: "risco", label: "Descrição do Risco", placeholder: "Ex: Atraso na entrega de aço", required: true },
  { name: "severidade", label: "Severidade", type: "select" as const, defaultValue: "media", options: [
    { value: "alta", label: "Alta" }, { value: "media", label: "Média" }, { value: "baixa", label: "Baixa" },
  ]},
  { name: "impacto", label: "Impacto", placeholder: "Ex: 3 dias de parada" },
  { name: "prazo", label: "Prazo", placeholder: "Ex: 5 dias" },
];

const retrabalhoFields = [
  { name: "etapa", label: "Etapa", placeholder: "Ex: Alvenaria", required: true },
  { name: "quantidade", label: "Quantidade", type: "number" as const, defaultValue: "1" },
  { name: "descricao", label: "Descrição", placeholder: "Motivo do retrabalho", required: false },
  { name: "data_registro", label: "Data", type: "date" as const, defaultValue: new Date().toISOString().split("T")[0] },
];

const equipeFields = [
  { name: "equipe", label: "Equipe", placeholder: "Ex: Fundação", required: true },
  { name: "semana_inicio", label: "Semana Início", type: "number" as const },
  { name: "semana_fim", label: "Semana Fim", type: "number" as const },
  { name: "status", label: "Status", type: "select" as const, defaultValue: "planejado", options: [
    { value: "planejado", label: "Planejado" }, { value: "em_andamento", label: "Em Andamento" }, { value: "concluido", label: "Concluído" },
  ]},
];

const severityColors: Record<string, any> = { alta: "critical", media: "warning", baixa: "ok" };

export default function ReducaoPerdasPage() {
  const { data: riscos = [], insert: insertRisco, update: updateRisco, remove: removeRisco } = useTableData<Risco>("riscos");
  const { data: retrabalhos = [], insert: insertRetrabalho, update: updateRetrabalho, remove: removeRetrabalho } = useTableData<Retrabalho>("retrabalhos");
  const { data: equipes = [], insert: insertEquipe, update: updateEquipe, remove: removeEquipe } = useTableData<SeqEquipe>("sequenciamento_equipes");

  const totalRetrabalhos = retrabalhos.reduce((s, r) => s + r.quantidade, 0);

  return (
    <div>
      <GlobalFilters />
      <SectionHeader title="Redução de Perdas" subtitle="Combate à improdutividade, retrabalhos e riscos" icon={<ShieldAlert className="h-5 w-5" />} />

      <div className="flex justify-end gap-2 mb-4">
        <AddRecordDialog title="Novo Risco" fields={riscoFields} onSubmit={insertRisco}
          trigger={<button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm bg-status-warning/10 text-status-warning hover:bg-status-warning/20 transition-colors"><AlertTriangle className="h-4 w-4" /> Novo Risco</button>}
        />
        <AddRecordDialog title="Novo Retrabalho" fields={retrabalhoFields} onSubmit={insertRetrabalho}
          trigger={<button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors"><RotateCcw className="h-4 w-4" /> Retrabalho</button>}
        />
        <AddRecordDialog title="Nova Equipe (Sequenciamento)" fields={equipeFields} onSubmit={insertEquipe} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <KPICard title="Riscos Ativos" value={riscos.length} icon={<AlertTriangle className="h-5 w-5" />} tooltip="Riscos cadastrados atualmente" status={riscos.length > 3 ? "critical" : riscos.length > 0 ? "warning" : "ok"} />
        <KPICard title="Retrabalhos" value={totalRetrabalhos} icon={<RotateCcw className="h-5 w-5" />} tooltip="Total de retrabalhos registrados" status={totalRetrabalhos > 10 ? "critical" : "warning"} />
        <KPICard title="Equipes no Sequenciamento" value={equipes.length} icon={<ShieldAlert className="h-5 w-5" />} tooltip="Equipes no cronograma" />
      </div>

      <Tabs defaultValue="riscos" className="space-y-4">
        <TabsList>
          <TabsTrigger value="riscos">Riscos ({riscos.length})</TabsTrigger>
          <TabsTrigger value="retrabalhos">Retrabalhos ({totalRetrabalhos})</TabsTrigger>
          <TabsTrigger value="equipes">Sequenciamento ({equipes.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="riscos">
          <div className="glass-card p-4">
            {riscos.length === 0 ? <p className="text-sm text-muted-foreground py-8 text-center">Nenhum risco cadastrado.</p> : (
              <div className="space-y-3">
                {riscos.map((r) => (
                  <div key={r.id} className={`p-3 rounded-lg border ${r.severidade === "alta" ? "bg-status-critical/5 border-status-critical/20" : "bg-status-warning/5 border-status-warning/20"}`}>
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-medium text-sm">{r.risco}</span>
                      <div className="flex items-center gap-1">
                        <StatusBadge status={severityColors[r.severidade] || "warning"} label={r.severidade.toUpperCase()} />
                        <EditRecordDialog title="Editar Risco" fields={riscoFields} record={r} onSubmit={updateRisco} />
                        <DeleteRecordButton onConfirm={() => removeRisco(r.id)} itemName={r.risco} />
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">{r.impacto || "—"}</p>
                    {r.prazo && <p className="text-xs font-mono mt-1 text-muted-foreground">Em {r.prazo}</p>}
                  </div>
                ))}
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="retrabalhos">
          <div className="glass-card p-4 overflow-x-auto">
            {retrabalhos.length === 0 ? <p className="text-sm text-muted-foreground py-8 text-center">Nenhum retrabalho registrado.</p> : (
              <table className="w-full text-sm">
                <thead><tr className="border-b border-border text-muted-foreground">
                  <th className="text-left py-2 px-3">Etapa</th>
                  <th className="text-right py-2 px-3">Qtd</th>
                  <th className="text-left py-2 px-3">Descrição</th>
                  <th className="text-left py-2 px-3">Data</th>
                  <th className="text-right py-2 px-3">Ações</th>
                </tr></thead>
                <tbody>
                  {retrabalhos.map((r) => (
                    <tr key={r.id} className="border-b border-border/50 hover:bg-secondary/50 transition-colors">
                      <td className="py-2.5 px-3 font-medium">{r.etapa}</td>
                      <td className="py-2.5 px-3 text-right font-mono">{r.quantidade}</td>
                      <td className="py-2.5 px-3 text-muted-foreground">{r.descricao || "—"}</td>
                      <td className="py-2.5 px-3 text-xs">{r.data_registro}</td>
                      <td className="py-2.5 px-3 text-right">
                        <div className="flex justify-end gap-1">
                          <EditRecordDialog title="Editar Retrabalho" fields={retrabalhoFields} record={r} onSubmit={updateRetrabalho} />
                          <DeleteRecordButton onConfirm={() => removeRetrabalho(r.id)} itemName={r.etapa} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </TabsContent>

        <TabsContent value="equipes">
          {/* glass-card sem overflow-hidden — scroll fica isolado no trilho */}
          <div className="glass-card p-4 overflow-visible">
            {equipes.length === 0 ? <p className="text-sm text-muted-foreground py-8 text-center">Nenhuma equipe no sequenciamento.</p> : (() => {
              // Escala dinâmica: cobre a maior semana_fim, com mínimo 22 e folga de 2 semanas
              const maxSemana = Math.max(22, ...equipes.map((e) => e.semana_fim || 0)) + 2;
              const PX_POR_SEMANA = 48; // largura por semana (absoluta, sem % — evita drift)
              const trilhoWidth = maxSemana * PX_POR_SEMANA;
              return (
                <div className="space-y-2">
                  {/* Régua de semanas */}
                  <div className="flex items-center gap-3">
                    <span className="w-32 shrink-0" />
                    <div className="flex-1 min-w-0 overflow-x-auto">
                      <div className="relative h-5 text-[10px] text-muted-foreground" style={{ width: trilhoWidth, minWidth: "100%" }}>
                        {Array.from({ length: maxSemana + 1 }).map((_, i) => (
                          <div key={i} className="absolute top-0 border-l border-border/40 h-full pl-1" style={{ left: i * PX_POR_SEMANA, width: PX_POR_SEMANA }}>
                            S{i}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="shrink-0 w-[180px]" />
                  </div>

                  {equipes.map((eq) => {
                    const inicio = Math.max(0, eq.semana_inicio || 0);
                    const fim = Math.max(inicio + 1, eq.semana_fim || inicio + 1);
                    const leftPx = inicio * PX_POR_SEMANA;
                    const widthPx = Math.max((fim - inicio) * PX_POR_SEMANA, 24);
                    return (
                      <div key={eq.id} className="flex items-center gap-3">
                        <span className="w-32 text-xs text-right text-muted-foreground shrink-0 truncate">{eq.equipe}</span>
                        {/* Trilho com scroll horizontal — barras nunca extrapolam */}
                        <div className="flex-1 min-w-0 overflow-x-auto">
                          <div className="h-7 bg-secondary rounded relative" style={{ width: trilhoWidth, minWidth: "100%" }}>
                            <div
                              className={`absolute top-0 h-full rounded flex items-center justify-center text-[10px] font-semibold whitespace-nowrap px-1 ${
                                eq.status === "concluido" ? "bg-status-ok/30 text-status-ok" :
                                eq.status === "em_andamento" ? "bg-primary/30 text-primary" :
                                "bg-muted-foreground/20 text-muted-foreground"
                              }`}
                              style={{ left: leftPx, width: widthPx }}
                            >
                              S{eq.semana_inicio}-S{eq.semana_fim}
                            </div>
                          </div>
                        </div>
                        {/* Ações sempre visíveis FORA do scroll horizontal */}
                        <div className="flex items-center gap-1 shrink-0 w-[180px] justify-end">
                          <StatusBadge status={eq.status as any} />
                          <EditRecordDialog title="Editar Equipe" fields={equipeFields} record={eq} onSubmit={updateEquipe} />
                          <DeleteRecordButton onConfirm={() => removeEquipe(eq.id)} itemName={eq.equipe} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })()}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
