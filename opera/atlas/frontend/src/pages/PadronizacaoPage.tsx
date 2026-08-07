import { useMemo, useState } from "react";
import { KPICard } from "@/components/dashboard/KPICard";
import { SectionHeader } from "@/components/dashboard/SectionHeader";
import { GaugeChart } from "@/components/dashboard/GaugeChart";
import { GlobalFilters } from "@/components/dashboard/GlobalFilters";
import { AddRecordDialog, EditRecordDialog, DeleteRecordButton } from "@/components/dashboard/AddRecordDialog";
import { WasteRankingCard } from "@/components/dashboard/WasteRankingCard";
import { useTableData } from "@/hooks/useTableData";
import { Package, AlertTriangle, TrendingDown, Layers, BarChart3, Clock, Plus, Trash2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { analyzeLotes, forecastConsumo, detectWastePatterns } from "@/analytics/loteConsumo";
import { supabase } from "@/lib/supabase";
import { useObra } from "@/hooks/useObra";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

interface ConsumoMaterial { id: string; material: string; previsto: number; real_consumo: number; unidade: string; data_registro: string; }
interface CompraEmergencial { id: string; material: string; qtd: number; motivo: string | null; data: string; }

const consumoFields = [
  { name: "material", label: "Material", placeholder: "Ex: Cimento CP-II", required: true },
  { name: "previsto", label: "Qtd Prevista", type: "number" as const, placeholder: "500" },
  { name: "real_consumo", label: "Qtd Real", type: "number" as const, placeholder: "545" },
  { name: "unidade", label: "Unidade", placeholder: "sacos", defaultValue: "un" },
  { name: "data_registro", label: "Data", type: "date" as const, defaultValue: new Date().toISOString().split("T")[0] },
];

const compraFields = [
  { name: "material", label: "Material", placeholder: "Ex: Cimento CP-V ARI", required: true },
  { name: "qtd", label: "Quantidade", type: "number" as const },
  { name: "motivo", label: "Motivo", placeholder: "Falta no estoque", required: false },
  { name: "data", label: "Data", type: "date" as const, defaultValue: new Date().toISOString().split("T")[0] },
];

// --- Lote creation dialog with inline materials ---
interface MaterialRow { material: string; unidade: string; previsto: string; real_consumo: string; }

function AddLoteDialog({ onCreated }: { onCreated: () => void }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { selectedObraId } = useObra();
  const { profile, isGuest } = useAuth();
  const tenantId = profile?.tenant_id;

  const [atividade, setAtividade] = useState("");
  const [areaExecutada, setAreaExecutada] = useState("");
  const [unidadeArea, setUnidadeArea] = useState("m²");
  const [dataInicio, setDataInicio] = useState(new Date().toISOString().split("T")[0]);
  const [dataFim, setDataFim] = useState("");
  const [observacao, setObservacao] = useState("");
  const [materiais, setMateriais] = useState<MaterialRow[]>([
    { material: "", unidade: "un", previsto: "", real_consumo: "" },
  ]);

  const addMaterial = () => setMateriais([...materiais, { material: "", unidade: "un", previsto: "", real_consumo: "" }]);
  const removeMaterial = (i: number) => setMateriais(materiais.filter((_, idx) => idx !== i));
  const updateMaterial = (i: number, field: keyof MaterialRow, value: string) => {
    const updated = [...materiais];
    updated[i] = { ...updated[i], [field]: value };
    setMateriais(updated);
  };

  const handleSubmit = async () => {
    if (!atividade.trim()) { toast.error("Informe a atividade"); return; }
    const validMats = materiais.filter(m => m.material.trim());
    if (validMats.length === 0) { toast.error("Adicione pelo menos 1 material"); return; }
    if (isGuest) { toast.info("Modo convidado: dados não são salvos"); setOpen(false); return; }
    if (!tenantId || !selectedObraId) { toast.error("Selecione uma obra"); return; }

    setLoading(true);
    try {
      const { data: lote, error: loteErr } = await (supabase as any).from("lotes_consumo").insert({
        tenant_id: tenantId,
        obra_id: selectedObraId,
        atividade: atividade.trim(),
        area_executada: Number(areaExecutada) || 0,
        unidade_area: unidadeArea,
        data_inicio: dataInicio,
        data_fim: dataFim || null,
        observacao: observacao || null,
      }).select("id").single();

      if (loteErr) throw loteErr;

      const matPayload = validMats.map(m => ({
        lote_id: lote.id,
        tenant_id: tenantId,
        material: m.material.trim(),
        unidade: m.unidade || "un",
        previsto: Number(m.previsto) || 0,
        real_consumo: Number(m.real_consumo) || 0,
      }));

      const { error: matErr } = await (supabase as any).from("lote_materiais").insert(matPayload);
      if (matErr) throw matErr;

      toast.success(`Lote "${atividade}" criado com ${validMats.length} materiais`);
      setOpen(false);
      onCreated();
      // Reset
      setAtividade(""); setAreaExecutada(""); setObservacao(""); setDataFim("");
      setMateriais([{ material: "", unidade: "un", previsto: "", real_consumo: "" }]);
    } catch (err: any) {
      toast.error("Erro: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="gap-1.5"><Layers className="h-4 w-4" /> Novo Lote</Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Novo Lote de Consumo</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {/* Lote header */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-muted-foreground">Atividade / Etapa *</label>
              <Input value={atividade} onChange={e => setAtividade(e.target.value)} placeholder="Ex: Execução de contrapiso" />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Área Executada</label>
              <div className="flex gap-2">
                <Input type="number" value={areaExecutada} onChange={e => setAreaExecutada(e.target.value)} placeholder="120" className="flex-1" />
                <Input value={unidadeArea} onChange={e => setUnidadeArea(e.target.value)} className="w-16" />
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Data Início</label>
              <Input type="date" value={dataInicio} onChange={e => setDataInicio(e.target.value)} />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Data Fim</label>
              <Input type="date" value={dataFim} onChange={e => setDataFim(e.target.value)} />
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground">Observação</label>
            <Input value={observacao} onChange={e => setObservacao(e.target.value)} placeholder="Opcional" />
          </div>

          {/* Materials inline */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-semibold">Materiais do Lote</h4>
              <Button type="button" size="sm" variant="outline" onClick={addMaterial} className="gap-1 text-xs h-7">
                <Plus className="h-3 w-3" /> Material
              </Button>
            </div>
            <div className="space-y-2">
              {/* Header row - hidden on mobile */}
              <div className="hidden sm:grid sm:grid-cols-[1fr_80px_90px_90px_32px] gap-2 text-[10px] font-medium text-muted-foreground px-1">
                <span>Material</span><span>Unidade</span><span>Previsto</span><span>Real</span><span />
              </div>
              {materiais.map((m, i) => (
                <div key={i} className="grid grid-cols-1 sm:grid-cols-[1fr_80px_90px_90px_32px] gap-2 p-2 sm:p-0 rounded-lg sm:rounded-none bg-secondary/30 sm:bg-transparent">
                  <Input value={m.material} onChange={e => updateMaterial(i, "material", e.target.value)} placeholder="Material" className="text-sm h-8" />
                  <Input value={m.unidade} onChange={e => updateMaterial(i, "unidade", e.target.value)} placeholder="un" className="text-sm h-8" />
                  <Input type="number" value={m.previsto} onChange={e => updateMaterial(i, "previsto", e.target.value)} placeholder="Prev." className="text-sm h-8" />
                  <Input type="number" value={m.real_consumo} onChange={e => updateMaterial(i, "real_consumo", e.target.value)} placeholder="Real" className="text-sm h-8" />
                  <Button type="button" size="icon" variant="ghost" onClick={() => removeMaterial(i)} disabled={materiais.length <= 1} className="h-8 w-8 text-muted-foreground hover:text-destructive shrink-0">
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <Button onClick={handleSubmit} disabled={loading} className="w-full">
            {loading ? "Salvando..." : "Criar Lote"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// --- Main page ---
export default function PadronizacaoPage() {
  const { data: consumo = [], isLoading: loadingC, insert: insertConsumo, update: updateConsumo, remove: removeConsumo } = useTableData<ConsumoMaterial>("consumo_materiais");
  const { data: compras = [], isLoading: loadingP, insert: insertCompra, update: updateCompra, remove: removeCompra } = useTableData<CompraEmergencial>("compras_emergenciais");
  const { data: lotes = [], isLoading: loadingL, refetch: refetchLotes } = useTableData("lotes_consumo");
  const { data: loteMateriais = [], isLoading: loadingLM, refetch: refetchLM } = useTableData("lote_materiais");

  const refetchAll = () => { refetchLotes?.(); refetchLM?.(); };

  // Analytics
  const loteAnalysis = useMemo(() => analyzeLotes(lotes, loteMateriais), [lotes, loteMateriais]);
  const previsoes = useMemo(() => forecastConsumo(loteMateriais, lotes, consumo, 100), [loteMateriais, lotes, consumo]);
  const padroes = useMemo(() => detectWastePatterns(loteMateriais, lotes), [loteMateriais, lotes]);

  const desperdicioTotal = consumo.length > 0
    ? consumo.reduce((acc, m) => acc + (m.previsto > 0 ? ((m.real_consumo - m.previsto) / m.previsto) * 100 : 0), 0) / consumo.length
    : 0;
  const desperdicioStatus = desperdicioTotal > 8 ? "critical" : desperdicioTotal > 5 ? "warning" : "ok";

  const lotesComAlerta = loteAnalysis.filter(l => l.status !== "ok").length;

  return (
    <div>
      <GlobalFilters />
      <SectionHeader title="Padronização — Insumos" subtitle="Controle por lote, consumo e análise preditiva" icon={<Package className="h-5 w-5" />} />

      <div className="flex flex-wrap justify-end gap-2 mb-4">
        <AddLoteDialog onCreated={refetchAll} />
        <AddRecordDialog title="Consumo Avulso" fields={consumoFields} onSubmit={insertConsumo} trigger={<Button size="sm" variant="outline" className="gap-1.5"><Plus className="h-4 w-4" /> Consumo Avulso</Button>} />
        <AddRecordDialog title="Nova Compra Emergencial" fields={compraFields} onSubmit={insertCompra}
          trigger={<Button size="sm" variant="outline" className="gap-1.5 text-destructive border-destructive/30 hover:bg-destructive/10"><AlertTriangle className="h-4 w-4" /> Compra Emergencial</Button>}
        />
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <div className="glass-card p-4 flex items-center justify-center col-span-2 lg:col-span-1">
          <GaugeChart value={Math.max(0, desperdicioTotal)} target={5} label="Desperdício %" />
        </div>
        <KPICard title="Lotes" value={lotes.length} icon={<Layers className="h-5 w-5" />} tooltip="Lotes de consumo registrados" status={lotesComAlerta > 0 ? "warning" : "ok"} subtitle={`${lotesComAlerta} com alerta`} />
        <KPICard title="Compras Emerg." value={compras.length} icon={<AlertTriangle className="h-5 w-5" />} tooltip="Compras fora do planejamento" status={compras.length > 0 ? "critical" : "ok"} subtitle="fora do planejamento" />
        <KPICard title="% Desperdício" value={`${desperdicioTotal.toFixed(1)}%`} icon={<TrendingDown className="h-5 w-5" />} tooltip="Meta: < 5%" status={desperdicioStatus as any} subtitle="Meta: < 5%" />
      </div>

      <Tabs defaultValue="lotes" className="space-y-4">
        <TabsList className="flex flex-wrap h-auto gap-1">
          <TabsTrigger value="lotes" className="text-xs">Lotes de Consumo ({lotes.length})</TabsTrigger>
          <TabsTrigger value="previsao" className="text-xs">Previsão & Estoque</TabsTrigger>
          <TabsTrigger value="padroes" className="text-xs">Padrões Detectados</TabsTrigger>
          <TabsTrigger value="consumo" className="text-xs">Consumo Avulso</TabsTrigger>
          <TabsTrigger value="compras" className="text-xs">Compras Emerg. ({compras.length})</TabsTrigger>
        </TabsList>

        {/* Tab: Lotes */}
        <TabsContent value="lotes">
          {loadingL || loadingLM ? (
            <p className="text-sm text-muted-foreground py-8 text-center">Carregando...</p>
          ) : lotes.length === 0 ? (
            <div className="glass-card p-8 text-center">
              <Layers className="h-10 w-10 text-muted-foreground/40 mx-auto mb-3" />
              <p className="text-sm text-muted-foreground mb-2">Nenhum lote de consumo registrado.</p>
              <p className="text-xs text-muted-foreground">Crie um lote para registrar materiais por atividade/etapa da obra.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {loteAnalysis.map((la) => {
                const lote = lotes.find((l: any) => l.id === la.loteId);
                return (
                  <div key={la.loteId} className="glass-card p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                      <div>
                        <h3 className="text-sm font-semibold flex items-center gap-2">
                          <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                            la.status === "critical" ? "bg-status-critical animate-pulse" :
                            la.status === "warning" ? "bg-status-warning" : "bg-status-ok"
                          }`} />
                          {la.atividade}
                        </h3>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {la.areaExecutada} {lote?.unidade_area || "m²"} • {lote?.data_inicio}
                          {lote?.data_fim ? ` → ${lote.data_fim}` : " (em andamento)"}
                          {lote?.observacao && ` • ${lote.observacao}`}
                        </p>
                      </div>
                      <div className={`text-xs font-mono font-bold px-2 py-1 rounded ${
                        la.desperdicioMedio > 15 ? "bg-status-critical/15 text-status-critical" :
                        la.desperdicioMedio > 5 ? "bg-status-warning/15 text-status-warning" :
                        "bg-status-ok/15 text-status-ok"
                      }`}>
                        {la.desperdicioMedio > 0 ? "+" : ""}{la.desperdicioMedio}% desvio médio
                      </div>
                    </div>

                    {/* Materials table */}
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs">
                        <thead>
                          <tr className="border-b border-border text-muted-foreground">
                            <th className="text-left py-1.5 px-2">Material</th>
                            <th className="text-right py-1.5 px-2">Previsto</th>
                            <th className="text-right py-1.5 px-2">Real</th>
                            <th className="text-right py-1.5 px-2">Desvio</th>
                            <th className="text-right py-1.5 px-2 hidden sm:table-cell">Consumo/m²</th>
                          </tr>
                        </thead>
                        <tbody>
                          {la.materiais.map((m, mi) => (
                            <tr key={mi} className="border-b border-border/30">
                              <td className="py-1.5 px-2 font-medium">{m.material}</td>
                              <td className="py-1.5 px-2 text-right font-mono">{m.previsto} {m.unidade}</td>
                              <td className="py-1.5 px-2 text-right font-mono">{m.real} {m.unidade}</td>
                              <td className={`py-1.5 px-2 text-right font-mono font-semibold ${
                                m.desvio > 15 ? "text-status-critical" : m.desvio > 5 ? "text-status-warning" : m.desvio <= 0 ? "text-status-ok" : "text-muted-foreground"
                              }`}>
                                {m.desvio > 0 ? "+" : ""}{m.desvio}%
                              </td>
                              <td className="py-1.5 px-2 text-right font-mono text-muted-foreground hidden sm:table-cell">{m.consumoPorM2}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </TabsContent>

        {/* Tab: Previsão */}
        <TabsContent value="previsao">
          <div className="glass-card p-4">
            <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-primary" />
              Previsão de Consumo (próx. 100 m²)
            </h3>
            {previsoes.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-6">Registre lotes para gerar previsões.</p>
            ) : (
              <div className="space-y-2">
                {previsoes.map((p, i) => (
                  <div key={i} className={`p-3 rounded-lg border ${p.alertaReposicao ? "border-status-critical/30 bg-status-critical/5" : "border-border bg-secondary/20"}`}>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <div>
                        <span className="text-sm font-medium">{p.material}</span>
                        <span className="text-xs text-muted-foreground ml-2">({p.unidade})</span>
                      </div>
                      <div className="flex items-center gap-3 text-xs">
                        <span className="font-mono">
                          <span className="text-muted-foreground">Consumo/m²:</span> {p.consumoMedioM2}
                        </span>
                        <span className="font-mono font-semibold">
                          <span className="text-muted-foreground">Previsão:</span> {p.previsaoQtd}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-3 mt-1.5 text-xs">
                      <span className="font-mono">
                        <span className="text-muted-foreground">Estoque:</span> {p.estoqueAtual}
                      </span>
                      {p.semanasCoberto !== null && (
                        <span className={`flex items-center gap-1 font-mono font-semibold ${p.alertaReposicao ? "text-status-critical" : "text-muted-foreground"}`}>
                          <Clock className="h-3 w-3" />
                          {p.semanasCoberto} sem
                          {p.alertaReposicao && <AlertTriangle className="h-3 w-3 ml-1" />}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </TabsContent>

        {/* Tab: Padrões */}
        <TabsContent value="padroes">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <WasteRankingCard consumo={consumo} />
            <div className="glass-card p-4">
              <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                <TrendingDown className="h-4 w-4 text-status-warning" />
                Padrões de Desperdício por Lote
              </h3>
              {padroes.length === 0 ? (
                <p className="text-xs text-muted-foreground text-center py-4">Registre ao menos 2 lotes com o mesmo material para detectar padrões.</p>
              ) : (
                <div className="space-y-2">
                  {padroes.map((p, i) => (
                    <div key={i} className="p-2.5 rounded-lg bg-secondary/30 border border-border/50">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-medium">{p.material}</span>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded font-semibold ${
                          p.tendencia === "crescente" ? "bg-status-critical/15 text-status-critical" :
                          p.tendencia === "decrescente" ? "bg-status-ok/15 text-status-ok" :
                          "bg-muted text-muted-foreground"
                        }`}>
                          {p.tendencia === "crescente" ? "↑ crescente" : p.tendencia === "decrescente" ? "↓ decrescente" : "→ estável"}
                        </span>
                      </div>
                      <p className="text-[10px] text-muted-foreground">{p.mensagem}</p>
                      <p className="text-[10px] text-muted-foreground mt-0.5">{p.totalLotes} lotes analisados • desvio médio: {p.mediaDesvio}%</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </TabsContent>

        {/* Tab: Consumo avulso */}
        <TabsContent value="consumo">
          <div className="glass-card p-4 overflow-x-auto">
            {loadingC ? <p className="text-sm text-muted-foreground py-8 text-center">Carregando...</p> :
            consumo.length === 0 ? <p className="text-sm text-muted-foreground py-8 text-center">Nenhum material cadastrado.</p> : (
              <table className="w-full text-sm">
                <thead><tr className="border-b border-border text-muted-foreground">
                  <th className="text-left py-2 px-3">Material</th>
                  <th className="text-right py-2 px-3">Previsto</th>
                  <th className="text-right py-2 px-3">Real</th>
                  <th className="text-left py-2 px-3 hidden sm:table-cell">Unidade</th>
                  <th className="text-right py-2 px-3">Desvio</th>
                  <th className="text-right py-2 px-3">Ações</th>
                </tr></thead>
                <tbody>
                  {consumo.map((m) => {
                    const desp = m.previsto > 0 ? ((m.real_consumo - m.previsto) / m.previsto) * 100 : 0;
                    return (
                      <tr key={m.id} className="border-b border-border/50 hover:bg-secondary/50 transition-colors">
                        <td className="py-2.5 px-3 font-medium">{m.material}</td>
                        <td className="py-2.5 px-3 text-right font-mono">{m.previsto}</td>
                        <td className="py-2.5 px-3 text-right font-mono">{m.real_consumo}</td>
                        <td className="py-2.5 px-3 text-muted-foreground hidden sm:table-cell">{m.unidade}</td>
                        <td className={`py-2.5 px-3 text-right font-mono font-semibold ${desp > 8 ? "text-status-critical" : desp > 5 ? "text-status-warning" : "text-status-ok"}`}>{desp.toFixed(1)}%</td>
                        <td className="py-2.5 px-3 text-right">
                          <div className="flex justify-end gap-1">
                            <EditRecordDialog title="Editar Material" fields={consumoFields} record={m} onSubmit={updateConsumo} />
                            <DeleteRecordButton onConfirm={() => removeConsumo(m.id)} itemName={m.material} />
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

        {/* Tab: Compras emergenciais */}
        <TabsContent value="compras">
          <div className="glass-card p-4">
            {loadingP ? <p className="text-sm text-muted-foreground py-8 text-center">Carregando...</p> :
            compras.length === 0 ? <p className="text-sm text-muted-foreground py-8 text-center">Nenhuma compra emergencial.</p> : (
              <div className="space-y-3">
                {compras.map((a) => (
                  <div key={a.id} className="p-3 rounded-lg bg-status-critical/5 border border-status-critical/20">
                    <div className="flex justify-between mb-1">
                      <span className="font-medium text-sm">{a.material}</span>
                      <div className="flex items-center gap-1">
                        <span className="text-xs text-muted-foreground mr-2">{a.data}</span>
                        <EditRecordDialog title="Editar Compra" fields={compraFields} record={a} onSubmit={updateCompra} />
                        <DeleteRecordButton onConfirm={() => removeCompra(a.id)} itemName={a.material} />
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">{a.motivo || "—"}</p>
                    <p className="text-xs font-mono mt-1">Qtd: {a.qtd}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
