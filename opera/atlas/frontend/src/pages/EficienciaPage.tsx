import { useMemo } from "react";
import { KPICard } from "@/components/dashboard/KPICard";
import { SectionHeader } from "@/components/dashboard/SectionHeader";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { GlobalFilters } from "@/components/dashboard/GlobalFilters";
import { AddRecordDialog, EditRecordDialog, DeleteRecordButton, FieldDef } from "@/components/dashboard/AddRecordDialog";
import { useTableData } from "@/hooks/useTableData";
import { Wrench, DollarSign, Activity, MapPin, Timer } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Ativo { id: string; nome: string; status: string; local_atual: string | null; valor: number; }
interface Logistica { id: string; equipe: string; tempo_deslocamento_min: number; origem: string | null; destino: string | null; observacao: string | null; data_registro: string; obra_id: string; }
interface CicloTarefa { id: string; tarefa: string; tempo_medio_min: number; tempo_alvo_min: number; qtd_medicoes: number; data_registro: string; }

const ativoFields: FieldDef[] = [
  { name: "nome", label: "Nome do Equipamento", placeholder: "Ex: Betoneira 400L", required: true },
  { name: "status", label: "Status", type: "select" as const, defaultValue: "ativo", options: [
    { value: "ativo", label: "Ativo" }, { value: "ocioso", label: "Ocioso" }, { value: "manutencao", label: "Manutenção" }, { value: "realocavel", label: "Realocável" },
  ]},
  { name: "local_atual", label: "Local", placeholder: "Ex: Bloco A" },
  { name: "valor", label: "Valor (R$)", type: "number" as const, placeholder: "8500" },
];

const cicloFields: FieldDef[] = [
  { name: "tarefa", label: "Tarefa", placeholder: "Ex: Assentamento cerâmico", required: true },
  { name: "tempo_medio_min", label: "Tempo Médio (min)", type: "number" as const, placeholder: "45" },
  { name: "tempo_alvo_min", label: "Tempo Alvo (min)", type: "number" as const, placeholder: "35" },
  { name: "qtd_medicoes", label: "Nº de Medições", type: "number" as const, defaultValue: "1" },
  { name: "data_registro", label: "Data", type: "date" as const, defaultValue: new Date().toISOString().split("T")[0] },
];

export default function EficienciaPage() {
  const { data: ativos = [], isLoading, insert, update, remove } = useTableData<Ativo>("ativos");
  const { data: logistica = [], insert: insertLog, update: updateLog, remove: removeLog } = useTableData<Logistica>("logistica_interna");
  const { data: ciclos = [], insert: insertCiclo, update: updateCiclo, remove: removeCiclo } = useTableData<CicloTarefa>("ciclos_tarefa");
  const { data: obras = [] } = useTableData("obras");

  const obraOptions = useMemo(() => obras.map((o: any) => ({
    value: o.id, label: o.nome,
  })), [obras]);

  const logisticaFields: FieldDef[] = useMemo(() => [
    { name: "equipe", label: "Equipe", placeholder: "Ex: Alvenaria", required: true },
    { name: "tempo_deslocamento_min", label: "Tempo de Deslocamento (min)", type: "number" as const, placeholder: "25" },
    { name: "origem", label: "Origem", placeholder: "Ex: Almoxarifado" },
    { name: "destino", label: "Destino", placeholder: "Ex: 4º Pavimento" },
    ...(obraOptions.length > 0 ? [{
      name: "obra_id", label: "Obra", type: "select" as const,
      options: obraOptions,
      defaultValue: obraOptions[0]?.value || "",
    }] : []),
    { name: "observacao", label: "Observação", placeholder: "Ex: Elevador parado", required: false },
    { name: "data_registro", label: "Data", type: "date" as const, defaultValue: new Date().toISOString().split("T")[0] },
  ], [obraOptions]);

  const ociosTotal = ativos.filter((f) => f.status === "ocioso").reduce((s, f) => s + Number(f.valor), 0);
  const ativosCount = ativos.filter((f) => f.status === "ativo").length;
  const totalValue = ativos.reduce((s, f) => s + Number(f.valor), 0);

  const tempoMedioDeslocamento = logistica.length > 0
    ? logistica.reduce((s, l) => s + l.tempo_deslocamento_min, 0) / logistica.length
    : 0;

  const ciclosComAtraso = ciclos.filter((c) => c.tempo_medio_min > c.tempo_alvo_min);

  // Map obra_id to nome for display
  const obraMap = useMemo(() => {
    const m: Record<string, string> = {};
    obras.forEach((o: any) => { m[o.id] = o.nome; });
    return m;
  }, [obras]);

  return (
    <div>
      <GlobalFilters />
      <SectionHeader title="Eficiência — Ativos" subtitle="Gestão de ferramentas, equipamentos, logística e ciclos de tarefa" icon={<Wrench className="h-5 w-5" />} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <KPICard title="Ativos Parados" value={`R$ ${ociosTotal.toLocaleString("pt-BR")}`} icon={<DollarSign className="h-5 w-5" />} tooltip="Valor total em equipamentos ociosos" status={ociosTotal > 0 ? "critical" : "ok"} />
        <KPICard title="Ativos em Uso" value={ativosCount} icon={<Activity className="h-5 w-5" />} tooltip="Equipamentos ativos em uso" status="ok" />
        <KPICard title="Desl. Médio" value={`${tempoMedioDeslocamento.toFixed(0)} min`} icon={<MapPin className="h-5 w-5" />} tooltip="Tempo médio de deslocamento das equipes" status={tempoMedioDeslocamento > 30 ? "critical" : tempoMedioDeslocamento > 15 ? "warning" : "ok"} />
        <KPICard title="Ciclos Lentos" value={ciclosComAtraso.length} icon={<Timer className="h-5 w-5" />} tooltip="Tarefas acima do tempo-alvo" status={ciclosComAtraso.length > 0 ? "warning" : "ok"} />
      </div>

      <Tabs defaultValue="ativos" className="space-y-4">
        <TabsList>
          <TabsTrigger value="ativos">Equipamentos ({ativos.length})</TabsTrigger>
          <TabsTrigger value="logistica">Logística ({logistica.length})</TabsTrigger>
          <TabsTrigger value="ciclos">Ciclos de Tarefa ({ciclos.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="ativos">
          <div className="flex justify-end mb-3">
            <AddRecordDialog title="Novo Ativo/Equipamento" fields={ativoFields} onSubmit={insert} />
          </div>
          <div className="glass-card p-4 overflow-x-auto">
            <h3 className="text-sm font-semibold mb-3">Mapa de Ferramentas & Equipamentos</h3>
            {isLoading ? <p className="text-sm text-muted-foreground py-8 text-center">Carregando...</p> :
            ativos.length === 0 ? <p className="text-sm text-muted-foreground py-8 text-center">Nenhum ativo cadastrado.</p> : (
              <table className="w-full text-sm">
                <thead><tr className="border-b border-border text-muted-foreground">
                  <th className="text-left py-2 px-3">Equipamento</th>
                  <th className="text-left py-2 px-3">Local</th>
                  <th className="text-right py-2 px-3">Valor (R$)</th>
                  <th className="text-left py-2 px-3">Status</th>
                  <th className="text-right py-2 px-3">Ações</th>
                </tr></thead>
                <tbody>
                  {ativos.map((f) => (
                    <tr key={f.id} className="border-b border-border/50 hover:bg-secondary/50 transition-colors">
                      <td className="py-2.5 px-3 font-medium">{f.nome}</td>
                      <td className="py-2.5 px-3 text-muted-foreground">{f.local_atual || "—"}</td>
                      <td className="py-2.5 px-3 text-right font-mono">{Number(f.valor).toLocaleString("pt-BR")}</td>
                      <td className="py-2.5 px-3"><StatusBadge status={f.status as any} /></td>
                      <td className="py-2.5 px-3 text-right">
                        <div className="flex justify-end gap-1">
                          <EditRecordDialog title="Editar Ativo" fields={ativoFields} record={f} onSubmit={update} />
                          <DeleteRecordButton onConfirm={() => remove(f.id)} itemName={f.nome} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </TabsContent>

        <TabsContent value="logistica">
          <div className="flex justify-end mb-3">
            <AddRecordDialog title="Novo Registro de Logística" fields={logisticaFields} onSubmit={insertLog}
              trigger={<button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm bg-primary/10 text-primary hover:bg-primary/20 transition-colors"><MapPin className="h-4 w-4" /> Registrar Deslocamento</button>}
            />
          </div>
          <div className="glass-card p-4 overflow-x-auto">
            <h3 className="text-sm font-semibold mb-3">Logística Interna — Tempo de Deslocamento</h3>
            {logistica.length === 0 ? <p className="text-sm text-muted-foreground py-8 text-center">Nenhum registro de logística.</p> : (
              <table className="w-full text-sm">
                <thead><tr className="border-b border-border text-muted-foreground">
                  <th className="text-left py-2 px-3">Equipe</th>
                  <th className="text-left py-2 px-3 hidden sm:table-cell">Obra</th>
                  <th className="text-left py-2 px-3">Origem</th>
                  <th className="text-left py-2 px-3">Destino</th>
                  <th className="text-right py-2 px-3">Tempo (min)</th>
                  <th className="text-left py-2 px-3 hidden sm:table-cell">Obs.</th>
                  <th className="text-left py-2 px-3">Data</th>
                  <th className="text-right py-2 px-3">Ações</th>
                </tr></thead>
                <tbody>
                  {logistica.map((l) => (
                    <tr key={l.id} className="border-b border-border/50 hover:bg-secondary/50 transition-colors">
                      <td className="py-2.5 px-3 font-medium">{l.equipe}</td>
                      <td className="py-2.5 px-3 text-xs text-muted-foreground hidden sm:table-cell">{obraMap[l.obra_id] || "—"}</td>
                      <td className="py-2.5 px-3 text-muted-foreground">{l.origem || "—"}</td>
                      <td className="py-2.5 px-3 text-muted-foreground">{l.destino || "—"}</td>
                      <td className={`py-2.5 px-3 text-right font-mono font-semibold ${l.tempo_deslocamento_min > 30 ? "text-status-critical" : l.tempo_deslocamento_min > 15 ? "text-status-warning" : "text-status-ok"}`}>{l.tempo_deslocamento_min}</td>
                      <td className="py-2.5 px-3 text-xs text-muted-foreground hidden sm:table-cell">{l.observacao || "—"}</td>
                      <td className="py-2.5 px-3 text-xs">{l.data_registro}</td>
                      <td className="py-2.5 px-3 text-right">
                        <div className="flex justify-end gap-1">
                          <EditRecordDialog title="Editar Logística" fields={logisticaFields} record={l} onSubmit={updateLog} />
                          <DeleteRecordButton onConfirm={() => removeLog(l.id)} itemName={l.equipe} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </TabsContent>

        <TabsContent value="ciclos">
          <div className="flex justify-end mb-3">
            <AddRecordDialog title="Novo Ciclo de Tarefa" fields={cicloFields} onSubmit={insertCiclo}
              trigger={<button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm bg-primary/10 text-primary hover:bg-primary/20 transition-colors"><Timer className="h-4 w-4" /> Registrar Ciclo</button>}
            />
          </div>
          <div className="glass-card p-4 overflow-x-auto">
            <h3 className="text-sm font-semibold mb-3">Análise de Ciclo de Tarefa — Cronometragem</h3>
            {ciclos.length === 0 ? <p className="text-sm text-muted-foreground py-8 text-center">Nenhum ciclo registrado.</p> : (
              <table className="w-full text-sm">
                <thead><tr className="border-b border-border text-muted-foreground">
                  <th className="text-left py-2 px-3">Tarefa</th>
                  <th className="text-right py-2 px-3">Tempo Médio</th>
                  <th className="text-right py-2 px-3">Tempo Alvo</th>
                  <th className="text-right py-2 px-3">Desvio</th>
                  <th className="text-right py-2 px-3">Medições</th>
                  <th className="text-left py-2 px-3">Data</th>
                  <th className="text-right py-2 px-3">Ações</th>
                </tr></thead>
                <tbody>
                  {ciclos.map((c) => {
                    const desvio = c.tempo_alvo_min > 0 ? ((c.tempo_medio_min - c.tempo_alvo_min) / c.tempo_alvo_min) * 100 : 0;
                    return (
                      <tr key={c.id} className="border-b border-border/50 hover:bg-secondary/50 transition-colors">
                        <td className="py-2.5 px-3 font-medium">{c.tarefa}</td>
                        <td className="py-2.5 px-3 text-right font-mono">{c.tempo_medio_min} min</td>
                        <td className="py-2.5 px-3 text-right font-mono">{c.tempo_alvo_min} min</td>
                        <td className={`py-2.5 px-3 text-right font-mono font-semibold ${desvio > 20 ? "text-status-critical" : desvio > 0 ? "text-status-warning" : "text-status-ok"}`}>
                          {desvio > 0 ? "+" : ""}{desvio.toFixed(0)}%
                        </td>
                        <td className="py-2.5 px-3 text-right font-mono">{c.qtd_medicoes}</td>
                        <td className="py-2.5 px-3 text-xs">{c.data_registro}</td>
                        <td className="py-2.5 px-3 text-right">
                          <div className="flex justify-end gap-1">
                            <EditRecordDialog title="Editar Ciclo" fields={cicloFields} record={c} onSubmit={updateCiclo} />
                            <DeleteRecordButton onConfirm={() => removeCiclo(c.id)} itemName={c.tarefa} />
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
