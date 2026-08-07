import { useState } from "react";
import { GlobalFilters } from "@/components/dashboard/GlobalFilters";
import { SectionHeader } from "@/components/dashboard/SectionHeader";
import { KPICard } from "@/components/dashboard/KPICard";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { useTableData } from "@/hooks/useTableData";
import { useObra } from "@/hooks/useObra";
import { usePermissions } from "@/hooks/usePermissions";
import { toast } from "sonner";
import {
  Users, Plus, Pencil, Trash2, Phone, DollarSign, UserCheck, UserX,
  ArrowRightLeft, Calendar, Clock, BadgeDollarSign,
} from "lucide-react";

// ─── Types ───
interface Colaborador {
  id: string;
  nome: string;
  telefone: string | null;
  pix_tipo: string | null;
  pix_chave: string | null;
  valor_diaria: number;
  turno: string;
  categoria: string | null;
  observacoes: string | null;
  ativo: boolean;
  created_at: string;
}

const CATEGORIAS = [
  { value: "ajudante", label: "Ajudante" },
  { value: "pedreiro", label: "Pedreiro" },
  { value: "armador", label: "Armador" },
  { value: "carpinteiro", label: "Carpinteiro" },
  { value: "eletricista", label: "Eletricista" },
  { value: "encanador", label: "Encanador" },
  { value: "pintor", label: "Pintor" },
  { value: "gesseiro", label: "Gesseiro" },
  { value: "mestre_obras", label: "Mestre de Obras" },
  { value: "engenheiro", label: "Engenheiro" },
  { value: "operador_maquinas", label: "Operador de Máquinas" },
  { value: "servente", label: "Servente" },
  { value: "outro", label: "Outro" },
];

interface ColaboradorObra {
  id: string;
  colaborador_id: string;
  obra_id: string;
  valor_diaria_especial: number | null;
  ativo: boolean;
}

interface RegistroPresenca {
  id: string;
  colaborador_id: string;
  obra_id: string;
  data: string;
  tipo: string;
  horas_extra: number;
  valor_diaria_usado: number;
  servico_especial: string | null;
  valor_diaria_especial: number | null;
  observacao: string | null;
}

// ─── Component ───
export default function ColaboradoresPage() {
  const { selectedObraId, obras } = useObra();
  const { canInsert, canUpdate, canDelete } = usePermissions();
  const { data: colaboradores = [], insert: insertColab, update: updateColab, remove: removeColab } = useTableData<Colaborador>("colaboradores");
  const { data: vinculos = [], insert: insertVinculo, update: updateVinculo, remove: removeVinculo } = useTableData<ColaboradorObra>("colaborador_obras");
  const { data: presencas = [], insert: insertPresenca, remove: removePresenca } = useTableData<RegistroPresenca>("registro_presencas");

  // Bulk delete state — aba Presenças & Faltas
  const [selectedPresencas, setSelectedPresencas] = useState<Set<string>>(new Set());
  const [bulkConfirmOpen, setBulkConfirmOpen] = useState(false);
  const [bulkDeleting, setBulkDeleting] = useState(false);

  const togglePresenca = (id: string) => {
    setSelectedPresencas((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };
  const toggleAllPresencas = (checked: boolean) => {
    if (checked) setSelectedPresencas(new Set(presencas.map((p) => p.id)));
    else setSelectedPresencas(new Set());
  };
  const clearPresencaSelection = () => setSelectedPresencas(new Set());
  const handleBulkDeletePresencas = async () => {
    const ids = Array.from(selectedPresencas);
    if (ids.length === 0) return;
    setBulkDeleting(true);
    let ok = 0, fail = 0;
    for (const id of ids) {
      try { await removePresenca(id); ok++; } catch { fail++; }
    }
    setBulkDeleting(false);
    clearPresencaSelection();
    if (fail === 0) toast.success(`${ok} registro(s) excluído(s)`);
    else toast.error(`${ok} excluído(s), ${fail} falharam`);
  };

  // KPIs
  const ativos = colaboradores.filter((c) => c.ativo).length;
  const inativos = colaboradores.filter((c) => !c.ativo).length;
  const vinculadosObra = selectedObraId
    ? vinculos.filter((v) => v.obra_id === selectedObraId && v.ativo).length
    : vinculos.filter((v) => v.ativo).length;
  const faltasTotal = presencas.filter((p) => p.tipo.includes("falta")).length;

  return (
    <div>
      <GlobalFilters />
      <SectionHeader
        title="Gestão de Colaboradores"
        subtitle="Cadastro central, vínculo multi-obra, presenças e pagamentos"
        icon={<Users className="h-5 w-5" />}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <KPICard title="Ativos" value={ativos} icon={<UserCheck className="h-5 w-5" />} status="ok" tooltip="Colaboradores ativos" />
        <KPICard title="Inativos" value={inativos} icon={<UserX className="h-5 w-5" />} status={inativos > 0 ? "warning" : "ok"} tooltip="Colaboradores inativos" />
        <KPICard title="Na Obra Atual" value={vinculadosObra} icon={<ArrowRightLeft className="h-5 w-5" />} tooltip="Vinculados à obra selecionada" />
        <KPICard title="Faltas (período)" value={faltasTotal} icon={<Calendar className="h-5 w-5" />} status={faltasTotal > 5 ? "critical" : faltasTotal > 0 ? "warning" : "ok"} tooltip="Faltas registradas no período" />
      </div>

      <Tabs defaultValue="cadastro" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="cadastro">Cadastro</TabsTrigger>
          <TabsTrigger value="vinculos">Vínculo por Obra</TabsTrigger>
          <TabsTrigger value="presencas">Presenças & Faltas</TabsTrigger>
        </TabsList>

        {/* ─── TAB: Cadastro ─── */}
        <TabsContent value="cadastro">
          <div className="glass-card p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold">Colaboradores Cadastrados</h3>
              {canInsert && <ColaboradorFormDialog mode="add" onSubmit={insertColab} />}
            </div>
            {colaboradores.length === 0 ? (
              <p className="text-sm text-muted-foreground py-8 text-center">Nenhum colaborador cadastrado. Adicione o primeiro!</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border text-muted-foreground">
                      <th className="text-left py-2 px-3">Nome</th>
                      <th className="text-left py-2 px-3">Categoria</th>
                      <th className="text-left py-2 px-3">Telefone</th>
                      <th className="text-left py-2 px-3">PIX</th>
                      <th className="text-right py-2 px-3">Diária</th>
                      <th className="text-left py-2 px-3">Turno</th>
                      <th className="text-left py-2 px-3">Status</th>
                      <th className="text-right py-2 px-3">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {colaboradores.map((c) => (
                      <tr key={c.id} className="border-b border-border/50 hover:bg-secondary/50 transition-colors">
                        <td className="py-2.5 px-3 font-medium">{c.nome}</td>
                        <td className="py-2.5 px-3">
                          <Badge variant="outline" className="text-[10px]">{CATEGORIAS.find(cat => cat.value === c.categoria)?.label || c.categoria || "—"}</Badge>
                        </td>
                        <td className="py-2.5 px-3 text-xs font-mono">{c.telefone || "—"}</td>
                        <td className="py-2.5 px-3 text-xs">{c.pix_chave ? `${c.pix_tipo}: ${c.pix_chave}` : "—"}</td>
                        <td className="py-2.5 px-3 text-right font-mono">R$ {Number(c.valor_diaria).toFixed(0)}</td>
                        <td className="py-2.5 px-3">
                          <Badge variant="outline" className="text-[10px]">{c.turno}</Badge>
                        </td>
                        <td className="py-2.5 px-3">
                          <StatusBadge status={c.ativo ? "ok" : "critical"} />
                        </td>
                        <td className="py-2.5 px-3 text-right">
                          <div className="flex justify-end gap-1">
                            {canUpdate && <ColaboradorFormDialog mode="edit" record={c} onSubmit={updateColab} />}
                            {canDelete && (
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive hover:text-destructive">
                                    <Trash2 className="h-3.5 w-3.5" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Excluir colaborador</AlertDialogTitle>
                                    <AlertDialogDescription>Excluir "{c.nome}"? Vínculos e presenças serão removidos.</AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => removeColab(c.id)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Excluir</AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </TabsContent>

        {/* ─── TAB: Vínculos por Obra ─── */}
        <TabsContent value="vinculos">
          <div className="glass-card p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold">Colaboradores vinculados às obras</h3>
              {canInsert && colaboradores.length > 0 && (
                <VinculoFormDialog colaboradores={colaboradores} obras={obras} onSubmit={insertVinculo} />
              )}
            </div>
            {vinculos.length === 0 ? (
              <p className="text-sm text-muted-foreground py-8 text-center">Nenhum vínculo criado. Vincule colaboradores às obras!</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border text-muted-foreground">
                      <th className="text-left py-2 px-3">Colaborador</th>
                      <th className="text-left py-2 px-3">Obra</th>
                      <th className="text-right py-2 px-3">Diária Especial</th>
                      <th className="text-left py-2 px-3">Ativo</th>
                      <th className="text-right py-2 px-3">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vinculos.map((v) => {
                      const colab = colaboradores.find((c) => c.id === v.colaborador_id);
                      const obra = obras.find((o) => o.id === v.obra_id);
                      return (
                        <tr key={v.id} className="border-b border-border/50 hover:bg-secondary/50 transition-colors">
                          <td className="py-2.5 px-3 font-medium">{colab?.nome || "—"}</td>
                          <td className="py-2.5 px-3">{obra?.nome || "—"}</td>
                          <td className="py-2.5 px-3 text-right font-mono">
                            {v.valor_diaria_especial != null ? `R$ ${Number(v.valor_diaria_especial).toFixed(0)}` : "Padrão"}
                          </td>
                          <td className="py-2.5 px-3">
                            <StatusBadge status={v.ativo ? "ok" : "critical"} />
                          </td>
                          <td className="py-2.5 px-3 text-right">
                            <div className="flex justify-end gap-1">
                              {canUpdate && (
                                <Button
                                  variant="ghost" size="icon" className="h-7 w-7"
                                  onClick={async () => {
                                    await updateVinculo(v.id, { ativo: !v.ativo });
                                    toast.success(v.ativo ? "Vínculo desativado" : "Vínculo reativado");
                                  }}
                                >
                                  <ArrowRightLeft className="h-3.5 w-3.5" />
                                </Button>
                              )}
                              {canDelete && (
                                <Button
                                  variant="ghost" size="icon" className="h-7 w-7 text-destructive hover:text-destructive"
                                  onClick={() => removeVinculo(v.id)}
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </Button>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </TabsContent>

        {/* ─── TAB: Presenças & Faltas ─── */}
        <TabsContent value="presencas">
          <div className="glass-card p-4">
            <div className="flex items-center justify-between mb-4 gap-2 flex-wrap">
              <h3 className="text-sm font-semibold">Registro de Presenças, Faltas e Horas Extras</h3>
              {canInsert && colaboradores.length > 0 && (
                <PresencaFormDialog colaboradores={colaboradores} obras={obras} onSubmit={insertPresenca} />
              )}
            </div>

            {canDelete && selectedPresencas.size > 0 && (
              <div className="flex items-center justify-between gap-2 mb-3 p-2 rounded-md border border-destructive/40 bg-destructive/5">
                <span className="text-sm font-medium">{selectedPresencas.size} selecionado(s)</span>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" onClick={clearPresencaSelection} disabled={bulkDeleting}>
                    Limpar seleção
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => setBulkConfirmOpen(true)}
                    disabled={bulkDeleting}
                    className="gap-1.5"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    Excluir selecionados
                  </Button>
                </div>
              </div>
            )}

            {presencas.length === 0 ? (
              <p className="text-sm text-muted-foreground py-8 text-center">Nenhum registro de presença. Comece a registrar!</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border text-muted-foreground">
                      {canDelete && (
                        <th className="py-2 px-3 w-8">
                          <Checkbox
                            checked={presencas.length > 0 && selectedPresencas.size === presencas.length}
                            onCheckedChange={(c) => toggleAllPresencas(!!c)}
                            aria-label="Selecionar todos"
                          />
                        </th>
                      )}
                      <th className="text-left py-2 px-3">Colaborador</th>
                      <th className="text-left py-2 px-3">Obra</th>
                      <th className="text-left py-2 px-3">Data</th>
                      <th className="text-left py-2 px-3">Tipo</th>
                      <th className="text-right py-2 px-3">H. Extra</th>
                      <th className="text-left py-2 px-3">Serviço Especial</th>
                      <th className="text-right py-2 px-3">Valor Dia</th>
                      <th className="text-right py-2 px-3">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {presencas.map((p) => {
                      const colab = colaboradores.find((c) => c.id === p.colaborador_id);
                      const obra = obras.find((o) => o.id === p.obra_id);
                      const tipoLabel: Record<string, string> = {
                        presente: "Presente",
                        falta_justificada: "Falta Just.",
                        falta_injustificada: "Falta Inj.",
                        hora_extra: "H. Extra",
                      };
                      const tipoStatus: Record<string, string> = {
                        presente: "ok",
                        falta_justificada: "warning",
                        falta_injustificada: "critical",
                        hora_extra: "ok",
                      };
                      const isSelected = selectedPresencas.has(p.id);
                      return (
                        <tr key={p.id} className={`border-b border-border/50 hover:bg-secondary/50 transition-colors ${isSelected ? "bg-destructive/5" : ""}`}>
                          {canDelete && (
                            <td className="py-2.5 px-3">
                              <Checkbox
                                checked={isSelected}
                                onCheckedChange={() => togglePresenca(p.id)}
                                aria-label={`Selecionar registro de ${colab?.nome || "colaborador"}`}
                              />
                            </td>
                          )}
                          <td className="py-2.5 px-3 font-medium">{colab?.nome || "—"}</td>
                          <td className="py-2.5 px-3">{obra?.nome || "—"}</td>
                          <td className="py-2.5 px-3 text-xs font-mono">{p.data}</td>
                          <td className="py-2.5 px-3">
                            <StatusBadge status={tipoStatus[p.tipo] as any} label={tipoLabel[p.tipo] || p.tipo} />
                          </td>
                          <td className="py-2.5 px-3 text-right font-mono">{p.horas_extra > 0 ? `+${p.horas_extra}h` : "—"}</td>
                          <td className="py-2.5 px-3 text-xs">{p.servico_especial || "—"}</td>
                          <td className="py-2.5 px-3 text-right font-mono">
                            {p.valor_diaria_especial != null ? `R$ ${Number(p.valor_diaria_especial).toFixed(0)}` : p.valor_diaria_usado > 0 ? `R$ ${Number(p.valor_diaria_usado).toFixed(0)}` : "—"}
                          </td>
                          <td className="py-2.5 px-3 text-right">
                            {canDelete && (
                              <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive hover:text-destructive" onClick={() => removePresenca(p.id)}>
                                <Trash2 className="h-3.5 w-3.5" />
                              </Button>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <ConfirmDialog
            open={bulkConfirmOpen}
            onOpenChange={setBulkConfirmOpen}
            title="Excluir registros selecionados"
            description={`Você está prestes a excluir ${selectedPresencas.size} registro(s) de presença/falta. Esta ação é irreversível.`}
            confirmText="EXCLUIR"
            onConfirm={handleBulkDeletePresencas}
            variant="destructive"
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

// ─── Colaborador Form Dialog ───
function ColaboradorFormDialog({
  mode,
  record,
  onSubmit,
}: {
  mode: "add" | "edit";
  record?: Colaborador;
  onSubmit: ((values: Record<string, any>) => Promise<{ error: any }>) | ((id: string, values: Record<string, any>) => Promise<{ error: any }>);
}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [v, setV] = useState<Record<string, string>>({});

  const handleOpen = (isOpen: boolean) => {
    setOpen(isOpen);
    if (isOpen) {
      if (mode === "edit" && record) {
        setV({
          nome: record.nome,
          telefone: record.telefone || "",
          pix_tipo: record.pix_tipo || "",
          pix_chave: record.pix_chave || "",
          valor_diaria: String(record.valor_diaria),
          turno: record.turno,
          categoria: record.categoria || "ajudante",
          observacoes: record.observacoes || "",
          ativo: record.ativo ? "true" : "false",
        });
      } else {
        setV({ turno: "diurno", ativo: "true", valor_diaria: "0", categoria: "ajudante" });
      }
    }
  };

  const handleSubmit = async () => {
    if (!v.nome?.trim()) { toast.error("Nome é obrigatório"); return; }
    setLoading(true);
    const payload: Record<string, any> = {
      nome: v.nome.trim(),
      telefone: v.telefone || null,
      pix_tipo: v.pix_tipo || null,
      pix_chave: v.pix_chave || null,
      valor_diaria: Number(v.valor_diaria) || 0,
      turno: v.turno || "diurno",
      categoria: v.categoria || "ajudante",
      observacoes: v.observacoes || null,
      ativo: v.ativo !== "false",
    };

    let result;
    if (mode === "edit" && record) {
      result = await (onSubmit as any)(record.id, payload);
    } else {
      result = await (onSubmit as any)(payload);
    }
    setLoading(false);
    if (result?.error) {
      toast.error("Erro: " + (result.error.message || result.error));
    } else {
      toast.success(mode === "edit" ? "Colaborador atualizado!" : "Colaborador cadastrado!");
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpen}>
      <DialogTrigger asChild>
        {mode === "add" ? (
          <Button size="sm" className="gap-1.5"><Plus className="h-4 w-4" /> Novo Colaborador</Button>
        ) : (
          <Button variant="ghost" size="icon" className="h-7 w-7"><Pencil className="h-3.5 w-3.5" /></Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{mode === "edit" ? "Editar Colaborador" : "Novo Colaborador"}</DialogTitle>
        </DialogHeader>
        <div className="space-y-3 pt-2">
          <div className="space-y-1">
            <label className="text-sm font-medium">Nome *</label>
            <Input placeholder="Ex: Carlos Silva" value={v.nome || ""} onChange={(e) => setV({ ...v, nome: e.target.value })} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-sm font-medium">Categoria *</label>
              <Select value={v.categoria || "ajudante"} onValueChange={(val) => setV({ ...v, categoria: val })}>
                <SelectTrigger><SelectValue placeholder="Selecionar categoria" /></SelectTrigger>
                <SelectContent>
                  {CATEGORIAS.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">Telefone</label>
              <Input placeholder="(11) 99999-9999" value={v.telefone || ""} onChange={(e) => setV({ ...v, telefone: e.target.value })} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-sm font-medium">Valor Diária (R$)</label>
              <Input type="number" step="any" value={v.valor_diaria || ""} onChange={(e) => setV({ ...v, valor_diaria: e.target.value })} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-sm font-medium">Tipo PIX</label>
              <Select value={v.pix_tipo || ""} onValueChange={(val) => setV({ ...v, pix_tipo: val })}>
                <SelectTrigger><SelectValue placeholder="Selecionar" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="cpf">CPF</SelectItem>
                  <SelectItem value="telefone">Telefone</SelectItem>
                  <SelectItem value="email">E-mail</SelectItem>
                  <SelectItem value="aleatoria">Chave Aleatória</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">Chave PIX</label>
              <Input placeholder="Chave PIX" value={v.pix_chave || ""} onChange={(e) => setV({ ...v, pix_chave: e.target.value })} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-sm font-medium">Turno</label>
              <Select value={v.turno || "diurno"} onValueChange={(val) => setV({ ...v, turno: val })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="diurno">Diurno</SelectItem>
                  <SelectItem value="noturno">Noturno</SelectItem>
                  <SelectItem value="integral">Integral</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">Status</label>
              <Select value={v.ativo || "true"} onValueChange={(val) => setV({ ...v, ativo: val })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="true">Ativo</SelectItem>
                  <SelectItem value="false">Inativo</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium">Observações</label>
            <Textarea placeholder="Informações adicionais..." value={v.observacoes || ""} onChange={(e) => setV({ ...v, observacoes: e.target.value })} />
          </div>
          <Button onClick={handleSubmit} disabled={loading} className="w-full mt-2">
            {loading ? "Salvando..." : mode === "edit" ? "Atualizar" : "Cadastrar"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ─── Vínculo Form Dialog ───
function VinculoFormDialog({
  colaboradores,
  obras,
  onSubmit,
}: {
  colaboradores: Colaborador[];
  obras: { id: string; nome: string }[];
  onSubmit: (values: Record<string, any>) => Promise<{ error: any }>;
}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [v, setV] = useState<Record<string, string>>({});

  const handleSubmit = async () => {
    if (!v.colaborador_id || !v.obra_id) { toast.error("Selecione colaborador e obra"); return; }
    setLoading(true);
    const payload: Record<string, any> = {
      colaborador_id: v.colaborador_id,
      obra_id: v.obra_id,
      valor_diaria_especial: v.valor_diaria_especial ? Number(v.valor_diaria_especial) : null,
      ativo: true,
    };
    const { error } = await onSubmit(payload);
    setLoading(false);
    if (error) {
      toast.error(error.message?.includes("duplicate") ? "Colaborador já vinculado a esta obra" : "Erro: " + error.message);
    } else {
      toast.success("Vínculo criado!");
      setOpen(false);
      setV({});
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="gap-1.5"><Plus className="h-4 w-4" /> Vincular à Obra</Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader><DialogTitle>Vincular Colaborador à Obra</DialogTitle></DialogHeader>
        <div className="space-y-3 pt-2">
          <div className="space-y-1">
            <label className="text-sm font-medium">Colaborador *</label>
            <Select value={v.colaborador_id || ""} onValueChange={(val) => setV({ ...v, colaborador_id: val })}>
              <SelectTrigger><SelectValue placeholder="Selecionar colaborador" /></SelectTrigger>
              <SelectContent>
                {colaboradores.filter((c) => c.ativo).map((c) => (
                  <SelectItem key={c.id} value={c.id}>{c.nome}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium">Obra *</label>
            <Select value={v.obra_id || ""} onValueChange={(val) => setV({ ...v, obra_id: val })}>
              <SelectTrigger><SelectValue placeholder="Selecionar obra" /></SelectTrigger>
              <SelectContent>
                {obras.map((o) => (
                  <SelectItem key={o.id} value={o.id}>{o.nome}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium">Diária Especial (R$) — opcional</label>
            <Input type="number" step="any" placeholder="Deixe vazio para usar o padrão" value={v.valor_diaria_especial || ""} onChange={(e) => setV({ ...v, valor_diaria_especial: e.target.value })} />
          </div>
          <Button onClick={handleSubmit} disabled={loading} className="w-full mt-2">
            {loading ? "Salvando..." : "Vincular"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ─── Presença Form Dialog ───
function PresencaFormDialog({
  colaboradores,
  obras,
  onSubmit,
}: {
  colaboradores: Colaborador[];
  obras: { id: string; nome: string }[];
  onSubmit: (values: Record<string, any>) => Promise<{ error: any }>;
}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const today = new Date().toISOString().split("T")[0];
  const [v, setV] = useState<Record<string, string>>({ data: today, tipo: "presente" });

  const handleOpen = (isOpen: boolean) => {
    setOpen(isOpen);
    if (isOpen) setV({ data: today, tipo: "presente" });
  };

  const handleSubmit = async () => {
    if (!v.colaborador_id || !v.obra_id) { toast.error("Selecione colaborador e obra"); return; }
    setLoading(true);

    const colab = colaboradores.find((c) => c.id === v.colaborador_id);
    const payload: Record<string, any> = {
      colaborador_id: v.colaborador_id,
      obra_id: v.obra_id,
      data: v.data || today,
      tipo: v.tipo || "presente",
      horas_extra: Number(v.horas_extra) || 0,
      valor_diaria_usado: colab ? colab.valor_diaria : 0,
      servico_especial: v.servico_especial || null,
      valor_diaria_especial: v.valor_diaria_especial ? Number(v.valor_diaria_especial) : null,
      observacao: v.observacao || null,
    };
    const { error } = await onSubmit(payload);
    setLoading(false);
    if (error) {
      toast.error("Erro: " + error.message);
    } else {
      toast.success("Presença registrada!");
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="gap-1.5"><Plus className="h-4 w-4" /> Registrar Presença</Button>
      </DialogTrigger>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader><DialogTitle>Registrar Presença / Falta</DialogTitle></DialogHeader>
        <div className="space-y-3 pt-2">
          <div className="space-y-1">
            <label className="text-sm font-medium">Colaborador *</label>
            <Select value={v.colaborador_id || ""} onValueChange={(val) => setV({ ...v, colaborador_id: val })}>
              <SelectTrigger><SelectValue placeholder="Selecionar" /></SelectTrigger>
              <SelectContent>
                {colaboradores.filter((c) => c.ativo).map((c) => (
                  <SelectItem key={c.id} value={c.id}>{c.nome} — R$ {Number(c.valor_diaria).toFixed(0)}/dia</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium">Obra *</label>
            <Select value={v.obra_id || ""} onValueChange={(val) => setV({ ...v, obra_id: val })}>
              <SelectTrigger><SelectValue placeholder="Selecionar" /></SelectTrigger>
              <SelectContent>
                {obras.map((o) => (<SelectItem key={o.id} value={o.id}>{o.nome}</SelectItem>))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-sm font-medium">Data</label>
              <Input type="date" value={v.data || today} onChange={(e) => setV({ ...v, data: e.target.value })} />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">Tipo</label>
              <Select value={v.tipo || "presente"} onValueChange={(val) => setV({ ...v, tipo: val })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="presente">Presente</SelectItem>
                  <SelectItem value="falta_justificada">Falta Justificada</SelectItem>
                  <SelectItem value="falta_injustificada">Falta Injustificada</SelectItem>
                  <SelectItem value="hora_extra">Hora Extra</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-sm font-medium">Horas Extra</label>
              <Input type="number" step="0.5" placeholder="0" value={v.horas_extra || ""} onChange={(e) => setV({ ...v, horas_extra: e.target.value })} />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">Diária Especial (R$)</label>
              <Input type="number" step="any" placeholder="Se diferente" value={v.valor_diaria_especial || ""} onChange={(e) => setV({ ...v, valor_diaria_especial: e.target.value })} />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium">Serviço Especial</label>
            <Input placeholder="Ex: trabalho em altura" value={v.servico_especial || ""} onChange={(e) => setV({ ...v, servico_especial: e.target.value })} />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium">Observação</label>
            <Input placeholder="Obs..." value={v.observacao || ""} onChange={(e) => setV({ ...v, observacao: e.target.value })} />
          </div>
          <Button onClick={handleSubmit} disabled={loading} className="w-full mt-2">
            {loading ? "Salvando..." : "Registrar"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
