import { useState } from "react";
import { SectionHeader } from "@/components/dashboard/SectionHeader";
import { KPICard } from "@/components/dashboard/KPICard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { logAudit } from "@/lib/auditLog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useObra } from "@/hooks/useObra";
import { useAuth } from "@/hooks/useAuth";
import { usePermissions } from "@/hooks/usePermissions";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import {
  Building2, Plus, Pencil, Trash2, Calendar, MapPin, DollarSign,
  Clock, Target, User, Ruler, FileText, TrendingUp, CheckCircle2,
  AlertTriangle, BarChart3,
} from "lucide-react";
import { differenceInDays, format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

// ─── Types ───
interface ObraFull {
  id: string;
  nome: string;
  endereco: string | null;
  status: string;
  data_inicio: string | null;
  data_previsao: string | null;
  custo_orcado_m2: number;
  responsavel: string | null;
  orcamento_total: number;
  area_m2: number;
  fase_atual: string;
  abordagem: string;
  descricao: string | null;
  tipo_obra: string;
  tamanho_equipe_esperada: number;
  created_at: string;
}

const FASES = [
  { value: "iniciacao", label: "Iniciação", color: "bg-chart-4/20 text-chart-4" },
  { value: "planejamento", label: "Planejamento", color: "bg-chart-5/20 text-chart-5" },
  { value: "execucao", label: "Execução", color: "bg-status-ok/20 text-status-ok" },
  { value: "monitoramento", label: "Monitoramento & Controle", color: "bg-status-warning/20 text-status-warning" },
  { value: "encerramento", label: "Encerramento", color: "bg-muted text-muted-foreground" },
];

const ABORDAGENS = [
  { value: "preditiva", label: "Preditiva (Cascata)" },
  { value: "adaptativa", label: "Adaptativa (Ágil)" },
  { value: "hibrida", label: "Híbrida" },
];

const TIPOS_OBRA = [
  { value: "residencial", label: "Residencial" },
  { value: "comercial", label: "Comercial" },
  { value: "industrial", label: "Industrial" },
  { value: "infraestrutura", label: "Infraestrutura" },
  { value: "reforma", label: "Reforma" },
  { value: "outro", label: "Outro" },
];

const STATUS_OBRA = [
  { value: "em_andamento", label: "Em andamento", color: "bg-status-ok/20 text-status-ok" },
  { value: "pausada", label: "Pausada", color: "bg-status-warning/20 text-status-warning" },
  { value: "concluida", label: "Concluída", color: "bg-chart-4/20 text-chart-4" },
  { value: "cancelada", label: "Cancelada", color: "bg-destructive/20 text-destructive" },
];

function getDayCount(dataInicio: string | null): number {
  if (!dataInicio) return 0;
  return differenceInDays(new Date(), parseISO(dataInicio));
}

function getDaysRemaining(dataPrevisao: string | null): number | null {
  if (!dataPrevisao) return null;
  return differenceInDays(parseISO(dataPrevisao), new Date());
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);
}

export default function ObrasPage() {
  const { profile } = useAuth();
  const { obras, refetch, selectedObraId, setSelectedObraId } = useObra();
  const { canManageObras, canDelete } = usePermissions();
  const tenantId = profile?.tenant_id;

  const [obrasFull, setObrasFull] = useState<ObraFull[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingObra, setEditingObra] = useState<ObraFull | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<{ open: boolean; id: string; nome: string }>({ open: false, id: "", nome: "" });

  // Form state
  const [form, setForm] = useState({
    nome: "", endereco: "", descricao: "", responsavel: "",
    data_inicio: "", data_previsao: "", orcamento_total: "",
    custo_orcado_m2: "", area_m2: "", fase_atual: "iniciacao",
    abordagem: "preditiva", tipo_obra: "residencial", status: "em_andamento",
    tamanho_equipe_esperada: "",
  });

  const fetchObras = async () => {
    if (!tenantId) return;
    const { data } = await supabase
      .from("obras")
      .select("*")
      .eq("tenant_id", tenantId)
      .order("created_at", { ascending: false });
    if (data) setObrasFull(data as unknown as ObraFull[]);
    setLoading(false);
  };

  useState(() => { fetchObras(); });

  const resetForm = () => {
    setForm({
      nome: "", endereco: "", descricao: "", responsavel: "",
      data_inicio: "", data_previsao: "", orcamento_total: "",
      custo_orcado_m2: "", area_m2: "", fase_atual: "iniciacao",
      abordagem: "preditiva", tipo_obra: "residencial", status: "em_andamento",
      tamanho_equipe_esperada: "",
    });
    setEditingObra(null);
  };

  const openEdit = (obra: ObraFull) => {
    setEditingObra(obra);
    setForm({
      nome: obra.nome,
      endereco: obra.endereco || "",
      descricao: obra.descricao || "",
      responsavel: obra.responsavel || "",
      data_inicio: obra.data_inicio || "",
      data_previsao: obra.data_previsao || "",
      orcamento_total: obra.orcamento_total?.toString() || "0",
      custo_orcado_m2: obra.custo_orcado_m2?.toString() || "0",
      area_m2: obra.area_m2?.toString() || "0",
      fase_atual: obra.fase_atual || "iniciacao",
      abordagem: obra.abordagem || "preditiva",
      tipo_obra: obra.tipo_obra || "residencial",
      status: obra.status || "em_andamento",
      tamanho_equipe_esperada: obra.tamanho_equipe_esperada?.toString() || "",
    });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!form.nome.trim() || !tenantId) return;
    const payload = {
      nome: form.nome,
      endereco: form.endereco || null,
      descricao: form.descricao || null,
      responsavel: form.responsavel || null,
      data_inicio: form.data_inicio || null,
      data_previsao: form.data_previsao || null,
      orcamento_total: parseFloat(form.orcamento_total) || 0,
      custo_orcado_m2: parseFloat(form.custo_orcado_m2) || 0,
      area_m2: parseFloat(form.area_m2) || 0,
      fase_atual: form.fase_atual,
      abordagem: form.abordagem,
      tipo_obra: form.tipo_obra,
      status: form.status,
      tamanho_equipe_esperada: parseInt(form.tamanho_equipe_esperada) || 0,
      tenant_id: tenantId,
    };

    if (editingObra) {
      const { error } = await supabase.from("obras").update(payload as any).eq("id", editingObra.id);
      if (error) { toast.error("Erro ao atualizar: " + error.message); return; }
      toast.success("Obra atualizada!");
    } else {
      const { error } = await supabase.from("obras").insert(payload as any);
      if (error) {
        const msg = error.message.includes("Limite de obras")
          ? "Limite de obras atingido. Aumente nas configurações do tenant."
          : "Erro ao criar: " + error.message;
        toast.error(msg);
        return;
      }
      toast.success("Obra cadastrada!");
    }
    setDialogOpen(false);
    resetForm();
    fetchObras();
    refetch();
  };

  const handleDelete = async (id: string) => {
    const obra = obrasFull.find(o => o.id === id);
    const { error } = await supabase.from("obras").delete().eq("id", id);
    if (error) { toast.error("Erro ao excluir"); return; }
    await logAudit({ action: "DELETE_OBRA", target_type: "obra", target_id: id, metadata: { nome: obra?.nome } });
    toast.success("Obra excluída");
    fetchObras();
    refetch();
  };

  const totalObras = obrasFull.length;
  const obrasAtivas = obrasFull.filter(o => o.status === "em_andamento").length;
  const orcamentoTotal = obrasFull.reduce((s, o) => s + (o.orcamento_total || 0), 0);
  const areaTotal = obrasFull.reduce((s, o) => s + (o.area_m2 || 0), 0);

  const getFaseInfo = (fase: string) => FASES.find(f => f.value === fase) || FASES[0];
  const getStatusInfo = (status: string) => STATUS_OBRA.find(s => s.value === status) || STATUS_OBRA[0];

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Gestão de Obras"
        subtitle="Cadastro e acompanhamento de projetos — alinhado ao PMI/PMBOK® 8ª Ed."
        icon={<Building2 className="h-6 w-6" />}
      />

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <KPICard title="Total de Obras" value={totalObras} icon={<Building2 className="h-4 w-4" />} tooltip="Quantidade total de obras cadastradas" />
        <KPICard title="Em Andamento" value={obrasAtivas} icon={<TrendingUp className="h-4 w-4" />} tooltip="Obras com status em andamento" />
        <KPICard title="Orçamento Total" value={formatCurrency(orcamentoTotal)} icon={<DollarSign className="h-4 w-4" />} tooltip="Soma dos orçamentos de todas as obras" />
        <KPICard title="Área Total (m²)" value={areaTotal.toLocaleString("pt-BR")} icon={<Ruler className="h-4 w-4" />} tooltip="Soma da área de todas as obras" />
      </div>

      {/* Action */}
      {canManageObras && (
        <div className="flex justify-end">
          <Dialog open={dialogOpen} onOpenChange={(open) => { setDialogOpen(open); if (!open) resetForm(); }}>
            <DialogTrigger asChild>
              <Button className="gap-1.5"><Plus className="h-4 w-4" /> Nova Obra</Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingObra ? "Editar Obra" : "Cadastrar Nova Obra"}</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 pt-2">
                {/* Row 1 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-muted-foreground">Nome da obra *</label>
                    <Input value={form.nome} onChange={e => setForm(p => ({ ...p, nome: e.target.value }))} placeholder="Ex: Residencial Vila Nova" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-muted-foreground">Tipo de obra</label>
                    <Select value={form.tipo_obra} onValueChange={v => setForm(p => ({ ...p, tipo_obra: v }))}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {TIPOS_OBRA.map(t => <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Row 2 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-muted-foreground">Endereço</label>
                    <Input value={form.endereco} onChange={e => setForm(p => ({ ...p, endereco: e.target.value }))} placeholder="Rua das Flores, 123" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-muted-foreground">Responsável (Gerente de Projeto)</label>
                    <Input value={form.responsavel} onChange={e => setForm(p => ({ ...p, responsavel: e.target.value }))} placeholder="Nome do responsável" />
                  </div>
                </div>

                {/* Row 3 - Dates */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-muted-foreground">Data de início</label>
                    <Input type="date" value={form.data_inicio} onChange={e => setForm(p => ({ ...p, data_inicio: e.target.value }))} />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-muted-foreground">Previsão de conclusão</label>
                    <Input type="date" value={form.data_previsao} onChange={e => setForm(p => ({ ...p, data_previsao: e.target.value }))} />
                  </div>
                </div>

                {/* Row 4 - Financial */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-muted-foreground">Orçamento total (R$)</label>
                    <Input type="number" value={form.orcamento_total} onChange={e => {
                      const orcamento = e.target.value;
                      const area = parseFloat(form.area_m2) || 0;
                      const custoM2 = area > 0 ? (parseFloat(orcamento) || 0) / area : 0;
                      setForm(p => ({ ...p, orcamento_total: orcamento, custo_orcado_m2: custoM2 > 0 ? custoM2.toFixed(2) : p.custo_orcado_m2 }));
                    }} placeholder="0" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-muted-foreground">Custo orçado/m² (R$)</label>
                    <Input type="number" value={form.custo_orcado_m2} onChange={e => setForm(p => ({ ...p, custo_orcado_m2: e.target.value }))} placeholder="Auto-calculado" />
                    <p className="text-[10px] text-muted-foreground">Calculado automaticamente se preencher orçamento e área</p>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-muted-foreground">Área total (m²)</label>
                    <Input type="number" value={form.area_m2} onChange={e => {
                      const area = e.target.value;
                      const orcamento = parseFloat(form.orcamento_total) || 0;
                      const custoM2 = (parseFloat(area) || 0) > 0 ? orcamento / parseFloat(area) : 0;
                      setForm(p => ({ ...p, area_m2: area, custo_orcado_m2: custoM2 > 0 ? custoM2.toFixed(2) : p.custo_orcado_m2 }));
                    }} placeholder="0" />
                  </div>
                </div>

                {/* Row 4.5 - Capacity Planning */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="space-y-1 sm:col-span-1">
                    <label className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                      Equipe esperada (pessoas)
                      <span className="text-[10px] text-primary">novo</span>
                    </label>
                    <Input
                      type="number"
                      min="0"
                      value={form.tamanho_equipe_esperada}
                      onChange={e => setForm(p => ({ ...p, tamanho_equipe_esperada: e.target.value }))}
                      placeholder="Ex: 12"
                    />
                    <p className="text-[10px] text-muted-foreground">Base para Eficiência de Presença</p>
                  </div>
                </div>

                {/* Row 5 - PMI */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-muted-foreground">Fase atual (PMI)</label>
                    <Select value={form.fase_atual} onValueChange={v => setForm(p => ({ ...p, fase_atual: v }))}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {FASES.map(f => <SelectItem key={f.value} value={f.value}>{f.label}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-muted-foreground">Abordagem</label>
                    <Select value={form.abordagem} onValueChange={v => setForm(p => ({ ...p, abordagem: v }))}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {ABORDAGENS.map(a => <SelectItem key={a.value} value={a.value}>{a.label}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-muted-foreground">Status</label>
                    <Select value={form.status} onValueChange={v => setForm(p => ({ ...p, status: v }))}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {STATUS_OBRA.map(s => <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-1">
                  <label className="text-xs font-medium text-muted-foreground">Descrição / Escopo do projeto</label>
                  <Textarea
                    value={form.descricao}
                    onChange={e => setForm(p => ({ ...p, descricao: e.target.value }))}
                    placeholder="Descreva o escopo, objetivos estratégicos e entregáveis principais..."
                    rows={3}
                  />
                </div>

                <Button onClick={handleSave} className="w-full">
                  {editingObra ? "Salvar Alterações" : "Cadastrar Obra"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      )}

      {/* Obras Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {obrasFull.map(obra => {
          const dias = getDayCount(obra.data_inicio);
          const diasRestantes = getDaysRemaining(obra.data_previsao);
          const faseInfo = getFaseInfo(obra.fase_atual);
          const statusInfo = getStatusInfo(obra.status);
          const isSelected = selectedObraId === obra.id;

          return (
            <Card
              key={obra.id}
              className={`cursor-pointer transition-all hover:border-primary/40 ${isSelected ? "border-primary ring-1 ring-primary/30" : ""}`}
              onClick={() => setSelectedObraId(obra.id)}
            >
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <CardTitle className="text-base truncate">{obra.nome}</CardTitle>
                    {obra.endereco && (
                      <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                        <MapPin className="h-3 w-3 shrink-0" /> {obra.endereco}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <Badge variant="secondary" className={`text-[10px] ${statusInfo.color}`}>
                      {statusInfo.label}
                    </Badge>
                    {canManageObras && (
                      <>
                        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={e => { e.stopPropagation(); openEdit(obra); }}>
                          <Pencil className="h-3.5 w-3.5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={e => { e.stopPropagation(); setDeleteConfirm({ open: true, id: obra.id, nome: obra.nome }); }}>
                          <Trash2 className="h-3.5 w-3.5 text-destructive" />
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {/* Progress bars */}
                <div className="space-y-2">
                  {obra.data_inicio && obra.data_previsao && (
                    <div>
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" /> Progresso Temporal
                        </span>
                        <span className={`text-[10px] font-mono font-semibold ${
                          diasRestantes !== null && diasRestantes < 0 ? "text-status-critical" :
                          diasRestantes !== null && diasRestantes < 30 ? "text-status-warning" : "text-muted-foreground"
                        }`}>
                          {(() => {
                            const totalDias = differenceInDays(parseISO(obra.data_previsao!), parseISO(obra.data_inicio!));
                            const pct = totalDias > 0 ? Math.min(100, (dias / totalDias) * 100) : 0;
                            return `${pct.toFixed(0)}%`;
                          })()}
                        </span>
                      </div>
                      <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${
                            diasRestantes !== null && diasRestantes < 0 ? "bg-status-critical" :
                            diasRestantes !== null && diasRestantes < 30 ? "bg-status-warning" : "bg-primary"
                          }`}
                          style={{ width: `${Math.min(100, obra.data_previsao ? (dias / Math.max(1, differenceInDays(parseISO(obra.data_previsao), parseISO(obra.data_inicio!)))) * 100 : 0)}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* PMI badges */}
                <div className="flex flex-wrap gap-1.5">
                  <Badge variant="secondary" className={`text-[10px] ${faseInfo.color}`}>
                    {faseInfo.label}
                  </Badge>
                  <Badge variant="secondary" className="text-[10px]">
                    {TIPOS_OBRA.find(t => t.value === obra.tipo_obra)?.label || obra.tipo_obra}
                  </Badge>
                  <Badge variant="secondary" className="text-[10px]">
                    {ABORDAGENS.find(a => a.value === obra.abordagem)?.label || obra.abordagem}
                  </Badge>
                </div>

                {/* Metrics grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <div className="bg-secondary/50 rounded-lg p-2 text-center">
                    <p className="text-lg font-bold text-foreground">{dias}</p>
                    <p className="text-[10px] text-muted-foreground">Dias corridos</p>
                  </div>
                  <div className="bg-secondary/50 rounded-lg p-2 text-center">
                    <p className={`text-lg font-bold ${diasRestantes !== null && diasRestantes < 0 ? "text-destructive" : diasRestantes !== null && diasRestantes < 30 ? "text-status-warning" : "text-foreground"}`}>
                      {diasRestantes !== null ? diasRestantes : "—"}
                    </p>
                    <p className="text-[10px] text-muted-foreground">Dias restantes</p>
                  </div>
                  <div className="bg-secondary/50 rounded-lg p-2 text-center">
                    <p className="text-sm font-bold text-foreground truncate">{obra.orcamento_total ? formatCurrency(obra.orcamento_total) : "—"}</p>
                    <p className="text-[10px] text-muted-foreground">Orçamento</p>
                  </div>
                  <div className="bg-secondary/50 rounded-lg p-2 text-center">
                    <p className="text-sm font-bold text-foreground">{obra.area_m2 ? `${obra.area_m2.toLocaleString("pt-BR")} m²` : "—"}</p>
                    <p className="text-[10px] text-muted-foreground">Área</p>
                  </div>
                </div>

                {/* Responsável & datas */}
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                  {obra.responsavel && (
                    <span className="flex items-center gap-1"><User className="h-3 w-3" /> {obra.responsavel}</span>
                  )}
                  {obra.data_inicio && (
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" /> {format(parseISO(obra.data_inicio), "dd/MM/yyyy")}
                    </span>
                  )}
                  {obra.data_previsao && (
                    <span className="flex items-center gap-1">
                      <Target className="h-3 w-3" /> {format(parseISO(obra.data_previsao), "dd/MM/yyyy")}
                    </span>
                  )}
                  {obra.custo_orcado_m2 > 0 && (
                    <span className="flex items-center gap-1">
                      <DollarSign className="h-3 w-3" /> R$ {obra.custo_orcado_m2.toFixed(2)}/m²
                    </span>
                  )}
                </div>

                {/* Description */}
                {obra.descricao && (
                  <p className="text-xs text-muted-foreground line-clamp-2 border-t border-border pt-2">
                    {obra.descricao}
                  </p>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {obrasFull.length === 0 && !loading && (
        <div className="text-center py-16 text-muted-foreground">
          <Building2 className="h-12 w-12 mx-auto mb-3 opacity-30" />
          <p className="text-sm">Nenhuma obra cadastrada</p>
          <p className="text-xs mt-1">Clique em "Nova Obra" para começar</p>
        </div>
      )}

      <ConfirmDialog
        open={deleteConfirm.open}
        onOpenChange={(v) => setDeleteConfirm(prev => ({ ...prev, open: v }))}
        title="Excluir Obra"
        description={`Tem certeza que deseja excluir a obra "${deleteConfirm.nome}"? Todos os dados vinculados serão perdidos permanentemente.`}
        confirmText="EXCLUIR"
        onConfirm={() => handleDelete(deleteConfirm.id)}
      />
    </div>
  );
}
