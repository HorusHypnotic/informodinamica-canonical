import { useState, useMemo } from "react";
import { GlobalFilters } from "@/components/dashboard/GlobalFilters";
import { SectionHeader } from "@/components/dashboard/SectionHeader";
import { KPICard } from "@/components/dashboard/KPICard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useTableData } from "@/hooks/useTableData";
import { useObra } from "@/hooks/useObra";
import { toast } from "sonner";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { usePermissions } from "@/hooks/usePermissions";
import { logAudit } from "@/lib/auditLog";
import {
  FileText, Download, Printer, DollarSign, Users, Calendar, Filter, FileSpreadsheet,
  Plus, Pencil, Trash2, RotateCcw, AlertTriangle,
} from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { resolvePresencaFracao } from "@/lib/payrollRules";

// ─── Types ───
interface Colaborador {
  id: string;
  nome: string;
  categoria: string | null;
  valor_diaria: number;
  pix_tipo: string | null;
  pix_chave: string | null;
  ativo: boolean;
}

interface ApontamentoDiaria {
  id: string;
  obra_id: string;
  colaborador_id: string;
  tenant_id: string;
  periodo_inicio: string;
  periodo_fim: string;
  quantidade_diarias: number;
  valor_diaria: number;
  observacao: string | null;
  created_at: string;
  tipo?: "ajuste" | "complemento" | "correcao" | "legacy_historico";
}

interface RegistroPresenca {
  id: string;
  colaborador_id: string;
  obra_id: string;
  data: string;
  tipo: string;
  fracao_diaria?: number;
  horas_extra: number;
  valor_diaria_usado: number | null;
  valor_diaria_especial: number | null;
  servico_especial: string | null;
  observacao: string | null;
  status_contabil?: "prevista" | "confirmada" | "ajustada";
}

interface ColaboradorObra {
  id: string;
  colaborador_id: string;
  obra_id: string;
  valor_diaria_especial: number | null;
  ativo: boolean;
}

interface ReportRow {
  colaboradorId: string;
  nome: string;
  funcao: string;
  valorDiaria: number;
  qtdDiarias: number;
  valorTotal: number;
  // Decomposição auditável: total = valorBasePresenca + valorAjuste + valorLegado
  valorBasePresenca: number;
  valorAjuste: number;
  valorLegado: number;
  qtdBasePresenca: number;
  qtdAjuste: number;
  // Estado contábil — separa previsão de confirmado
  valorConfirmado: number;     // presença real (status_contabil = confirmada)
  qtdConfirmada: number;
  valorAjustadoPresenca: number; // presença alterada após o dia (status = ajustada)
  qtdAjustadaPresenca: number;
  valorPrevisto: number;       // dias futuros assumidos (status = prevista)
  qtdPrevista: number;
  valorConsolidado: number;    // confirmado + ajustado_presenca + ajuste manual + legado
  valorProjetado: number;      // consolidado + previsto
  temPrevisao: boolean;
  pixChave: string;
  pixTipo: string;
  observacao: string;
  fonte: "presenca" | "ajuste" | "misto" | "legado";
  // operational (from presence)
  presencas: number;
  faltas: number;
  faltasJustificadas: number;
  horasExtra: number;
}

const CATEGORIAS: Record<string, string> = {
  ajudante: "Ajudante",
  pedreiro: "Pedreiro",
  armador: "Armador",
  carpinteiro: "Carpinteiro",
  eletricista: "Eletricista",
  encanador: "Encanador",
  pintor: "Pintor",
  gesseiro: "Gesseiro",
  mestre_obras: "Mestre de Obras",
  engenheiro: "Engenheiro",
  operador_maquinas: "Operador de Máquinas",
  servente: "Servente",
  outro: "Outro",
};

export default function RelatorioMaoObraPage() {
  const { selectedObraId, obras } = useObra();
  const { canInsert, canUpdate, canDelete } = usePermissions();
  const { data: colaboradores = [] } = useTableData<Colaborador>("colaboradores");
  const { data: apontamentos = [], insert: insertApontamento, update: updateApontamento, remove: removeApontamento } = useTableData<ApontamentoDiaria>("apontamento_diarias");
  const { data: presencas = [], insert: insertPresenca } = useTableData<RegistroPresenca>("registro_presencas");
  const { data: vinculos = [] } = useTableData<ColaboradorObra>("colaborador_obras");
  const { data: sequenciamento = [] } = useTableData<{ id: string; equipe: string; semana_inicio: number; semana_fim: number; status: string }>("sequenciamento_equipes");

  const [dataInicio, setDataInicio] = useState(() => {
    const d = new Date(); d.setDate(1);
    return d.toISOString().split("T")[0];
  });
  const [dataFim, setDataFim] = useState(() => new Date().toISOString().split("T")[0]);
  const [filtroFuncao, setFiltroFuncao] = useState("all");
  const [filtroTrabalhador, setFiltroTrabalhador] = useState("all");

  // Dialog state
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formColaboradorId, setFormColaboradorId] = useState("");
  const [formQtdDiarias, setFormQtdDiarias] = useState("");
  const [formValorDiaria, setFormValorDiaria] = useState("");
  const [formObs, setFormObs] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState<{ open: boolean; id: string; nome: string }>({ open: false, id: "", nome: "" });
  const [zerarConfirm, setZerarConfirm] = useState(false);

  const obraAtual = obras.find((o) => o.id === selectedObraId) || obras[0];

  const colabAtivos = useMemo(() => colaboradores.filter((c) => c.ativo), [colaboradores]);

  // ─── Build report rows ───
  // MODELO ÚNICO: presença = BASE | apontamento (ajuste/complemento/correcao) = DELTA
  // legacy_historico = exibido em coluna separada, NÃO recalculado
  // Snapshot: valor_diaria_usado vence cascata (histórico imutável)
  const reportRows = useMemo(() => {
    const rows: Record<string, ReportRow> = {};

    // ── 1) BASE: presença (sempre entra, faltas reduzem) ──
    const filteredPresencas = presencas.filter((p) => {
      if (selectedObraId && p.obra_id !== selectedObraId) return false;
      if (p.data < dataInicio || p.data > dataFim) return false;
      return true;
    });

    for (const p of filteredPresencas) {
      const colab = colaboradores.find((c) => c.id === p.colaborador_id);
      if (!colab) continue;
      if (filtroFuncao !== "all" && colab.categoria !== filtroFuncao) continue;
      if (filtroTrabalhador !== "all" && colab.id !== filtroTrabalhador) continue;

      if (!rows[colab.id]) rows[colab.id] = makeEmptyRow(colab);
      const row = rows[colab.id];

      // Blindagem: tipo manda sobre fracao_diaria — falta NUNCA vira diária por fallback
      if ((p.tipo || "").toLowerCase().startsWith("falta")) {
        if (p.tipo === "falta_justificada") row.faltasJustificadas += 1;
        else row.faltas += 1;
        continue; // falta não entra em base, não soma valor — fim
      }

      const fracao = resolvePresencaFracao(p);

      // Operacional
      if (p.tipo === "hora_extra") row.horasExtra += Number(p.horas_extra || 0);
      else if (fracao > 0) row.presencas += fracao;

      // Resolução de valor — snapshot vence cascata (HISTÓRICO IMUTÁVEL)
      const vinculo = vinculos.find(
        (v) => v.colaborador_id === colab.id && v.obra_id === (selectedObraId || p.obra_id) && v.ativo
      );
      const valorBase =
        (p.valor_diaria_usado != null && Number(p.valor_diaria_usado) > 0 ? Number(p.valor_diaria_usado) : null)
        ?? (p.valor_diaria_especial != null ? Number(p.valor_diaria_especial) : null)
        ?? (vinculo?.valor_diaria_especial != null ? Number(vinculo.valor_diaria_especial) : null)
        ?? Number(colab.valor_diaria);
      row.valorDiaria = valorBase;

      // Estado contábil: prevista (futuro) | confirmada (real) | ajustada (alterada após data)
      // Fallback: se coluna ainda não veio, infere por data (compatibilidade)
      const status = (p.status_contabil
        ?? (p.data > new Date().toISOString().split("T")[0] ? "prevista" : "confirmada")) as "prevista" | "confirmada" | "ajustada";

      if (fracao > 0 && p.tipo !== "hora_extra") {
        row.qtdBasePresenca += fracao;
        row.valorBasePresenca += valorBase * fracao;
        if (status === "prevista")       { row.qtdPrevista += fracao;          row.valorPrevisto += valorBase * fracao; }
        else if (status === "ajustada")  { row.qtdAjustadaPresenca += fracao;  row.valorAjustadoPresenca += valorBase * fracao; }
        else                             { row.qtdConfirmada += fracao;        row.valorConfirmado += valorBase * fracao; }
      } else if (p.tipo === "hora_extra") {
        const extraValue = (Number(p.horas_extra || 0) / 8) * valorBase;
        const extraQtd = Number(p.horas_extra || 0) / 8;
        row.qtdBasePresenca += extraQtd;
        row.valorBasePresenca += extraValue;
        if (status === "prevista")       { row.qtdPrevista += extraQtd;         row.valorPrevisto += extraValue; }
        else if (status === "ajustada")  { row.qtdAjustadaPresenca += extraQtd; row.valorAjustadoPresenca += extraValue; }
        else                             { row.qtdConfirmada += extraQtd;       row.valorConfirmado += extraValue; }
      }
    }

    // ── 2) DELTA: apontamento_diarias (ajuste/complemento/correcao soma; legado isolado) ──
    const filteredApontamentos = apontamentos.filter((a) => {
      if (selectedObraId && a.obra_id !== selectedObraId) return false;
      if (a.periodo_fim < dataInicio || a.periodo_inicio > dataFim) return false;
      return true;
    });

    for (const a of filteredApontamentos) {
      const colab = colaboradores.find((c) => c.id === a.colaborador_id);
      if (!colab) continue;
      if (filtroFuncao !== "all" && colab.categoria !== filtroFuncao) continue;
      if (filtroTrabalhador !== "all" && colab.id !== filtroTrabalhador) continue;

      if (!rows[colab.id]) rows[colab.id] = makeEmptyRow(colab);
      const row = rows[colab.id];

      const valor = Number(a.quantidade_diarias) * Number(a.valor_diaria);
      const tipo = a.tipo || "ajuste";

      if (tipo === "legacy_historico") {
        row.valorLegado += valor;
      } else {
        row.qtdAjuste += Number(a.quantidade_diarias);
        row.valorAjuste += valor;
      }
      if (a.observacao) row.observacao = a.observacao;
    }

    // ── 3) Consolidação: total, consolidado (sem previsão) e projetado (com previsão) ──
    for (const row of Object.values(rows)) {
      row.qtdDiarias = row.qtdBasePresenca + row.qtdAjuste;
      row.valorTotal = row.valorBasePresenca + row.valorAjuste + row.valorLegado;
      // Consolidado = realmente devido HOJE (sem previsões futuras)
      row.valorConsolidado = row.valorConfirmado + row.valorAjustadoPresenca + row.valorAjuste + row.valorLegado;
      // Projetado = consolidado + previsões (estimativa se sexta acontecer)
      row.valorProjetado = row.valorConsolidado + row.valorPrevisto;
      row.temPrevisao = row.valorPrevisto > 0 || row.qtdPrevista > 0;

      const hasBase = row.valorBasePresenca > 0 || row.qtdBasePresenca > 0;
      const hasAjuste = row.valorAjuste !== 0;
      const hasLegado = row.valorLegado > 0;

      if (hasLegado && !hasBase && !hasAjuste) row.fonte = "legado";
      else if (hasBase && hasAjuste) row.fonte = "misto";
      else if (hasAjuste && !hasBase) row.fonte = "ajuste";
      else row.fonte = "presenca";
    }

    return Object.values(rows).sort((a, b) => a.nome.localeCompare(b.nome));
  }, [apontamentos, presencas, colaboradores, vinculos, selectedObraId, dataInicio, dataFim, filtroFuncao, filtroTrabalhador]);

  function makeEmptyRow(colab: Colaborador): ReportRow {
    return {
      colaboradorId: colab.id,
      nome: colab.nome,
      funcao: CATEGORIAS[colab.categoria || ""] || colab.categoria || "—",
      valorDiaria: Number(colab.valor_diaria),
      qtdDiarias: 0,
      valorTotal: 0,
      valorBasePresenca: 0,
      valorAjuste: 0,
      valorLegado: 0,
      qtdBasePresenca: 0,
      qtdAjuste: 0,
      valorConfirmado: 0,
      qtdConfirmada: 0,
      valorAjustadoPresenca: 0,
      qtdAjustadaPresenca: 0,
      valorPrevisto: 0,
      qtdPrevista: 0,
      valorConsolidado: 0,
      valorProjetado: 0,
      temPrevisao: false,
      pixChave: colab.pix_chave || "",
      pixTipo: colab.pix_tipo || "",
      observacao: "",
      fonte: "presenca",
      presencas: 0,
      faltas: 0,
      faltasJustificadas: 0,
      horasExtra: 0,
    };
  }

  const subtotalGeral = reportRows.reduce((s, r) => s + r.valorTotal, 0);
  const totalDiarias = reportRows.reduce((s, r) => s + r.qtdDiarias, 0);
  const totalTrabalhadores = reportRows.length;
  // Estado contábil agregado
  const totalConsolidado = reportRows.reduce((s, r) => s + r.valorConsolidado, 0);
  const totalProjetado   = reportRows.reduce((s, r) => s + r.valorProjetado, 0);
  const totalPrevisto    = reportRows.reduce((s, r) => s + r.valorPrevisto, 0);
  const qtdPrevistaTotal = reportRows.reduce((s, r) => s + r.qtdPrevista, 0);
  const qtdConfirmadaTotal = reportRows.reduce((s, r) => s + r.qtdConfirmada, 0);
  const contemPrevisoes  = totalPrevisto > 0;
  const colabsComPrevisao = reportRows.filter((r) => r.temPrevisao).length;

  // ─── Apontamentos for current period ───
  const apontamentosPeriodo = useMemo(() => {
    return apontamentos.filter((a) => {
      if (selectedObraId && a.obra_id !== selectedObraId) return false;
      if (a.periodo_fim < dataInicio || a.periodo_inicio > dataFim) return false;
      return true;
    });
  }, [apontamentos, selectedObraId, dataInicio, dataFim]);

  // ─── CRUD handlers ───
  const openNewDialog = () => {
    setEditingId(null);
    setFormColaboradorId("");
    setFormQtdDiarias("0");
    setFormValorDiaria("");
    setFormObs("");
    setDialogOpen(true);
  };

  const openEditDialog = (a: ApontamentoDiaria) => {
    setEditingId(a.id);
    setFormColaboradorId(a.colaborador_id);
    setFormQtdDiarias(String(a.quantidade_diarias));
    setFormValorDiaria(String(a.valor_diaria));
    setFormObs(a.observacao || "");
    setDialogOpen(true);
  };

  const handleColabChange = (colabId: string) => {
    setFormColaboradorId(colabId);
    if (!formValorDiaria) {
      const colab = colaboradores.find((c) => c.id === colabId);
      if (colab) {
        const vinculo = vinculos.find((v) => v.colaborador_id === colabId && v.obra_id === selectedObraId && v.ativo);
        setFormValorDiaria(String(vinculo?.valor_diaria_especial ?? colab.valor_diaria));
      }
    }
  };

  const handleSave = async () => {
    const qtdNum = parseFloat(formQtdDiarias);
    const valorNum = parseFloat(formValorDiaria);
    if (!formColaboradorId) {
      toast.error("Selecione o trabalhador");
      return;
    }
    if (!Number.isFinite(qtdNum) || qtdNum <= 0) {
      toast.error("Informe uma quantidade de diárias maior que zero");
      return;
    }
    if (!Number.isFinite(valorNum) || valorNum <= 0) {
      toast.error("Informe um valor da diária maior que zero");
      return;
    }
    const payload = {
      obra_id: selectedObraId || obraAtual?.id,
      colaborador_id: formColaboradorId,
      periodo_inicio: dataInicio,
      periodo_fim: dataFim,
      quantidade_diarias: parseFloat(formQtdDiarias),
      valor_diaria: parseFloat(formValorDiaria),
      observacao: formObs || null,
    };

    if (editingId) {
      const { error } = await updateApontamento(editingId, payload);
      if (error) { toast.error("Erro: " + error.message); return; }
      toast.success("Apontamento atualizado");
    } else {
      const { error } = await insertApontamento(payload);
      if (error) { toast.error("Erro: " + error.message); return; }
      toast.success("Apontamento registrado");
    }
    setDialogOpen(false);
  };

  const handleDelete = async (id: string) => {
    await removeApontamento(id);
    await logAudit({ action: "DELETE_DIARIA", target_type: "apontamento_diarias", target_id: id });
  };

  const handleZerarQuinzena = async () => {
    if (apontamentosPeriodo.length === 0) {
      toast.info("Não há apontamentos para zerar neste período");
      return;
    }
    let errors = 0;
    for (const a of apontamentosPeriodo) {
      await removeApontamento(a.id);
    }
    await logAudit({
      action: "ZERAR_DIARIAS",
      target_type: "apontamento_diarias",
      metadata: { periodo_inicio: dataInicio, periodo_fim: dataFim, qtd_removidos: apontamentosPeriodo.length },
    });
    toast.success(`${apontamentosPeriodo.length} apontamentos zerados para nova quinzena`);
  };

  // ─── Quick presence (1-click for today) ───
  const hojeStr = new Date().toISOString().split("T")[0];
  const presencasHoje = useMemo(() => {
    const map: Record<string, RegistroPresenca | undefined> = {};
    for (const p of presencas) {
      if (p.data === hojeStr && (!selectedObraId || p.obra_id === selectedObraId)) {
        map[p.colaborador_id] = p;
      }
    }
    return map;
  }, [presencas, selectedObraId, hojeStr]);

  const registrarPresencaRapida = async (colaboradorId: string, fracao: 0 | 0.5 | 1) => {
    if (!selectedObraId) {
      toast.error("Selecione uma obra primeiro");
      return;
    }
    if (presencasHoje[colaboradorId]) {
      toast.info("Presença de hoje já registrada — edite na aba Operacional se precisar mudar");
      return;
    }
    const tipo = fracao === 0 ? "falta" : fracao === 0.5 ? "meio_periodo" : "presente";
    const colab = colaboradores.find((c) => c.id === colaboradorId);
    const vinculo = vinculos.find((v) => v.colaborador_id === colaboradorId && v.obra_id === selectedObraId && v.ativo);
    const valorDiaria = vinculo?.valor_diaria_especial ?? colab?.valor_diaria ?? 0;

    const { error } = await insertPresenca({
      colaborador_id: colaboradorId,
      obra_id: selectedObraId,
      data: hojeStr,
      tipo,
      fracao_diaria: fracao,
      valor_diaria_usado: Number(valorDiaria),
    } as any);
    if (error) {
      toast.error("Erro ao registrar: " + error.message);
      return;
    }
    const label = fracao === 0 ? "Falta" : fracao === 0.5 ? "½ diária" : "1 diária";
    toast.success(`${label} registrada para ${colab?.nome || "colaborador"}`);
  };

  // ─── Build per-obra report rows (used when no obra selected) ───
  // Mesmo modelo: BASE (presença) + DELTA (apontamento) + LEGADO isolado
  const buildRowsForObra = (obraId: string): ReportRow[] => {
    const rows: Record<string, ReportRow> = {};

    // BASE: presença
    const filteredPresencas = presencas.filter((p) => {
      if (p.obra_id !== obraId) return false;
      if (p.data < dataInicio || p.data > dataFim) return false;
      return true;
    });
    for (const p of filteredPresencas) {
      const colab = colaboradores.find((c) => c.id === p.colaborador_id);
      if (!colab) continue;
      if (filtroFuncao !== "all" && colab.categoria !== filtroFuncao) continue;
      if (filtroTrabalhador !== "all" && colab.id !== filtroTrabalhador) continue;
      if (!rows[colab.id]) rows[colab.id] = makeEmptyRow(colab);
      const row = rows[colab.id];

      // Blindagem: tipo manda sobre fracao_diaria — falta NUNCA vira diária por fallback
      if ((p.tipo || "").toLowerCase().startsWith("falta")) {
        if (p.tipo === "falta_justificada") row.faltasJustificadas += 1;
        else row.faltas += 1;
        continue;
      }

      const fracao = resolvePresencaFracao(p);

      if (p.tipo === "hora_extra") row.horasExtra += Number(p.horas_extra || 0);
      else if (fracao > 0) row.presencas += fracao;

      const vinculo = vinculos.find((v) => v.colaborador_id === colab.id && v.obra_id === obraId && v.ativo);
      const valorBase =
        (p.valor_diaria_usado != null && Number(p.valor_diaria_usado) > 0 ? Number(p.valor_diaria_usado) : null)
        ?? (p.valor_diaria_especial != null ? Number(p.valor_diaria_especial) : null)
        ?? (vinculo?.valor_diaria_especial != null ? Number(vinculo.valor_diaria_especial) : null)
        ?? Number(colab.valor_diaria);
      row.valorDiaria = valorBase;

      const status = (p.status_contabil
        ?? (p.data > new Date().toISOString().split("T")[0] ? "prevista" : "confirmada")) as "prevista" | "confirmada" | "ajustada";

      if (fracao > 0 && p.tipo !== "hora_extra") {
        row.qtdBasePresenca += fracao;
        row.valorBasePresenca += valorBase * fracao;
        if (status === "prevista")       { row.qtdPrevista += fracao;          row.valorPrevisto += valorBase * fracao; }
        else if (status === "ajustada")  { row.qtdAjustadaPresenca += fracao;  row.valorAjustadoPresenca += valorBase * fracao; }
        else                             { row.qtdConfirmada += fracao;        row.valorConfirmado += valorBase * fracao; }
      } else if (p.tipo === "hora_extra") {
        const extraValue = (Number(p.horas_extra || 0) / 8) * valorBase;
        const extraQtd = Number(p.horas_extra || 0) / 8;
        row.qtdBasePresenca += extraQtd;
        row.valorBasePresenca += extraValue;
        if (status === "prevista")       { row.qtdPrevista += extraQtd;         row.valorPrevisto += extraValue; }
        else if (status === "ajustada")  { row.qtdAjustadaPresenca += extraQtd; row.valorAjustadoPresenca += extraValue; }
        else                             { row.qtdConfirmada += extraQtd;       row.valorConfirmado += extraValue; }
      }
    }

    // DELTA: apontamento
    const filteredApontamentos = apontamentos.filter((a) => {
      if (a.obra_id !== obraId) return false;
      if (a.periodo_fim < dataInicio || a.periodo_inicio > dataFim) return false;
      return true;
    });
    for (const a of filteredApontamentos) {
      const colab = colaboradores.find((c) => c.id === a.colaborador_id);
      if (!colab) continue;
      if (filtroFuncao !== "all" && colab.categoria !== filtroFuncao) continue;
      if (filtroTrabalhador !== "all" && colab.id !== filtroTrabalhador) continue;
      if (!rows[colab.id]) rows[colab.id] = makeEmptyRow(colab);
      const row = rows[colab.id];

      const valor = Number(a.quantidade_diarias) * Number(a.valor_diaria);
      const tipo = a.tipo || "ajuste";
      if (tipo === "legacy_historico") {
        row.valorLegado += valor;
      } else {
        row.qtdAjuste += Number(a.quantidade_diarias);
        row.valorAjuste += valor;
      }
      if (a.observacao) row.observacao = a.observacao;
    }

    // Consolidação
    for (const row of Object.values(rows)) {
      row.qtdDiarias = row.qtdBasePresenca + row.qtdAjuste;
      row.valorTotal = row.valorBasePresenca + row.valorAjuste + row.valorLegado;
      row.valorConsolidado = row.valorConfirmado + row.valorAjustadoPresenca + row.valorAjuste + row.valorLegado;
      row.valorProjetado = row.valorConsolidado + row.valorPrevisto;
      row.temPrevisao = row.valorPrevisto > 0 || row.qtdPrevista > 0;
      const hasBase = row.valorBasePresenca > 0 || row.qtdBasePresenca > 0;
      const hasAjuste = row.valorAjuste !== 0;
      const hasLegado = row.valorLegado > 0;
      if (hasLegado && !hasBase && !hasAjuste) row.fonte = "legado";
      else if (hasBase && hasAjuste) row.fonte = "misto";
      else if (hasAjuste && !hasBase) row.fonte = "ajuste";
      else row.fonte = "presenca";
    }

    return Object.values(rows).sort((a, b) => a.nome.localeCompare(b.nome));
  };


  const buildReportBlocks = () => {
    if (selectedObraId) {
      return [{
        obraNome: obraAtual?.nome || "Obra",
        rows: reportRows,
        subtotal: subtotalGeral,
        totalDiarias,
      }];
    }
    const obraIds = new Set<string>();
    apontamentos.forEach((a) => { if (a.periodo_fim >= dataInicio && a.periodo_inicio <= dataFim) obraIds.add(a.obra_id); });
    presencas.forEach((p) => { if (p.data >= dataInicio && p.data <= dataFim) obraIds.add(p.obra_id); });
    return Array.from(obraIds)
      .map((obraId) => {
        const obra = obras.find((o) => o.id === obraId);
        const rows = buildRowsForObra(obraId);
        const sub = rows.reduce((s, r) => s + r.valorTotal, 0);
        const td = rows.reduce((s, r) => s + r.qtdDiarias, 0);
        return { obraNome: obra?.nome || "Obra desconhecida", rows, subtotal: sub, totalDiarias: td };
      })
      .filter((b) => b.rows.length > 0)
      .sort((a, b) => a.obraNome.localeCompare(b.obraNome));
  };

  const exportPDF = () => {
    const doc = new jsPDF({ orientation: "landscape" });
    const pageWidth = doc.internal.pageSize.getWidth();
    let y = 14;

    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("RELATÓRIO FINANCEIRO DE EQUIPE", 14, y);
    y += 6;

    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.text(`Obra: ${selectedObraId ? (obraAtual?.nome || "—") : "Todas as obras"}`, 14, y); y += 4;
    doc.text(`Período: ${formatDate(dataInicio)} - ${formatDate(dataFim)}`, 14, y); y += 4;
    doc.text(`Gerado em: ${new Date().toLocaleString("pt-BR")}`, 14, y); y += 5;

    // Aviso obrigatório de composição
    doc.setFont("helvetica", "bold");
    doc.setTextColor(180, 60, 0);
    doc.text("AVISO: TOTAL = Base Presença + Ajuste + Legado. Confira o breakdown antes de pagar. ⚠ = ajuste oculto.", 14, y);
    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "normal");
    y += 5;

    doc.setDrawColor(200);
    doc.line(14, y, pageWidth - 14, y);
    y += 4;

    const blocks = buildReportBlocks();

    if (blocks.length === 0) {
      doc.text("Nenhum dado encontrado para o período selecionado.", 14, y);
      doc.save(`relatorio-equipe-${dataInicio}-${dataFim}.pdf`);
      return;
    }

    let totalGeralValor = 0;
    let totalGeralDiarias = 0;

    blocks.forEach((block, idx) => {
      const lastY = (doc as any).lastAutoTable?.finalY;
      let titleY = idx === 0 ? y : (lastY ? lastY + 10 : y);
      if (titleY > doc.internal.pageSize.getHeight() - 40) {
        doc.addPage();
        titleY = 20;
      }

      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text(`Obra: ${block.obraNome}`, 14, titleY);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);

      autoTable(doc, {
        startY: titleY + 3,
        head: [["Nome", "Função", "Diária", "Qtd", "Base Presença", "Ajuste", "Legado", "TOTAL", "Origem", "PIX"]],
        body: block.rows.map((r) => {
          const expected = r.valorDiaria * r.qtdDiarias;
          const delta = r.valorTotal - expected;
          const flag = Math.abs(delta) > 0.01 ? " ⚠" : "";
          return [
            r.nome, r.funcao,
            `R$ ${r.valorDiaria.toFixed(2)}`,
            r.qtdDiarias % 1 === 0 ? r.qtdDiarias.toString() : r.qtdDiarias.toFixed(1),
            `R$ ${r.valorBasePresenca.toFixed(2)}`,
            `R$ ${r.valorAjuste.toFixed(2)}`,
            `R$ ${r.valorLegado.toFixed(2)}`,
            `R$ ${r.valorTotal.toFixed(2)}${flag}`,
            r.fonte === "legado" ? "Legado" : r.fonte === "misto" ? "Pres+Ajuste" : r.fonte === "ajuste" ? "Ajuste" : "Presença",
            r.pixChave ? `${r.pixTipo}: ${r.pixChave}` : "—",
          ];
        }),
        foot: [["", "", "", `${block.totalDiarias.toFixed(1)}`, "", "", "", `R$ ${block.subtotal.toFixed(2)}`, "", ""]],
        styles: { fontSize: 8, cellPadding: 2 },
        headStyles: { fillColor: [41, 37, 36], textColor: 255 },
        footStyles: { fillColor: [245, 245, 244], textColor: [0, 0, 0], fontStyle: "bold" },
        margin: { left: 8, right: 8 },
      });

      totalGeralValor += block.subtotal;
      totalGeralDiarias += block.totalDiarias;
    });

    if (blocks.length > 1) {
      const finalY = (doc as any).lastAutoTable?.finalY || y;
      let tgY = finalY + 10;
      if (tgY > doc.internal.pageSize.getHeight() - 20) { doc.addPage(); tgY = 20; }
      doc.setFontSize(11);
      doc.setFont("helvetica", "bold");
      doc.text(`TOTAL GERAL — ${totalGeralDiarias.toFixed(1)} diárias — R$ ${totalGeralValor.toFixed(2)}`, 14, tgY);
    }

    doc.save(`relatorio-equipe-${dataInicio}-${dataFim}.pdf`);
  };

  const exportExcel = async () => {
    const XLSX = await import("xlsx");
    const blocks = buildReportBlocks();
    const wsData: any[][] = [
      ["RELATÓRIO FINANCEIRO DE EQUIPE"],
      [`Obra: ${selectedObraId ? (obraAtual?.nome || "—") : "Todas as obras"}`],
      [`Período: ${formatDate(dataInicio)} - ${formatDate(dataFim)}`],
      ["AVISO: TOTAL = Base Presença + Ajuste + Legado. Confira o breakdown antes de pagar."],
      [],
    ];

    let totalGeralValor = 0;
    let totalGeralDiarias = 0;

    blocks.forEach((block) => {
      wsData.push([`Obra: ${block.obraNome}`]);
      wsData.push(["Nome", "Função", "Diária (R$)", "Qtd Diárias", "Base Presença (R$)", "Ajuste (R$)", "Legado (R$)", "TOTAL (R$)", "Esperado (Diária×Qtd)", "Delta", "Origem", "PIX"]);
      block.rows.forEach((r) => {
        const expected = r.valorDiaria * r.qtdDiarias;
        const delta = r.valorTotal - expected;
        wsData.push([
          r.nome, r.funcao, r.valorDiaria, r.qtdDiarias,
          r.valorBasePresenca, r.valorAjuste, r.valorLegado, r.valorTotal,
          expected, delta,
          r.fonte === "legado" ? "Legado" : r.fonte === "misto" ? "Presença+Ajuste" : r.fonte === "ajuste" ? "Ajuste" : "Presença",
          r.pixChave ? `${r.pixTipo}: ${r.pixChave}` : "",
        ]);
      });
      wsData.push(["", "", "", `Subtotal: ${block.totalDiarias.toFixed(1)}`, "", "", "", block.subtotal, "", "", "", ""]);
      wsData.push([]);
      totalGeralValor += block.subtotal;
      totalGeralDiarias += block.totalDiarias;
    });

    if (blocks.length > 1) {
      wsData.push(["", "", "", `TOTAL GERAL (${totalGeralDiarias.toFixed(1)} diárias)`, "", "", "", totalGeralValor, "", "", "", ""]);
    }

    const ws = XLSX.utils.aoa_to_sheet(wsData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Mão de Obra");
    XLSX.writeFile(wb, `relatorio-equipe-${dataInicio}-${dataFim}.xlsx`);
  };

  return (
    <div>
      <GlobalFilters />
      <SectionHeader
        title="Relatório de Mão de Obra"
        subtitle="Controle financeiro e operacional da equipe por período"
        icon={<FileText className="h-5 w-5" />}
      />

      {/* ─── Filter Bar ─── */}
      <div className="glass-card p-4 mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Filter className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium text-muted-foreground">Filtros do Relatório</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Data Início</label>
            <Input type="date" value={dataInicio} onChange={(e) => setDataInicio(e.target.value)} className="h-9" />
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Data Fim</label>
            <Input type="date" value={dataFim} onChange={(e) => setDataFim(e.target.value)} className="h-9" />
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Função</label>
            <Select value={filtroFuncao} onValueChange={setFiltroFuncao}>
              <SelectTrigger className="h-9"><SelectValue placeholder="Todas" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as funções</SelectItem>
                {Object.entries(CATEGORIAS).map(([k, v]) => (
                  <SelectItem key={k} value={k}>{v}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Trabalhador</label>
            <Select value={filtroTrabalhador} onValueChange={setFiltroTrabalhador}>
              <SelectTrigger className="h-9"><SelectValue placeholder="Todos" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                {colabAtivos.map((c) => (
                  <SelectItem key={c.id} value={c.id}>{c.nome}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* ─── KPIs ─── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <KPICard title="Trabalhadores" value={totalTrabalhadores} icon={<Users className="h-5 w-5" />} tooltip="Trabalhadores no período" />
        <KPICard title="Total Diárias" value={totalDiarias % 1 === 0 ? totalDiarias : totalDiarias.toFixed(1)} icon={<Calendar className="h-5 w-5" />} tooltip="Soma de todas as diárias" />
        <KPICard
          title="Subtotal Geral"
          value={`R$ ${subtotalGeral.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`}
          icon={<DollarSign className="h-5 w-5" />}
          tooltip="Valor total de mão de obra"
          status={subtotalGeral > 0 ? "ok" : "warning"}
        />
        <KPICard
          title="Média por Diária"
          value={totalDiarias > 0 ? `R$ ${(subtotalGeral / totalDiarias).toFixed(2)}` : "—"}
          icon={<DollarSign className="h-5 w-5" />}
          tooltip="Valor médio por diária paga"
        />
      </div>

      {/* ─── Tabs ─── */}
      <Tabs defaultValue="financeiro" className="space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <TabsList>
            <TabsTrigger value="financeiro">💰 Financeiro</TabsTrigger>
            {canInsert && <TabsTrigger value="apontamentos">📝 Apontamentos</TabsTrigger>}
            <TabsTrigger value="operacional">📋 Operacional</TabsTrigger>
            <TabsTrigger value="sequenciamento">🔄 Sequenciamento</TabsTrigger>
          </TabsList>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={exportPDF}>
              <Download className="h-4 w-4 mr-1" /> PDF
            </Button>
            <Button variant="outline" size="sm" onClick={exportExcel}>
              <FileSpreadsheet className="h-4 w-4 mr-1" /> Excel
            </Button>
            <Button variant="outline" size="sm" onClick={() => window.print()}>
              <Printer className="h-4 w-4 mr-1" /> Imprimir
            </Button>
          </div>
        </div>

        {/* ─── Financeiro Tab ─── */}
        <TabsContent value="financeiro">
          <div className="glass-card p-4 print:shadow-none">
            <div className="mb-4 pb-3 border-b border-border">
              <h2 className="text-base font-bold">Relatório Financeiro de Equipe</h2>
              <p className="text-sm text-muted-foreground">
                Obra: <span className="font-medium text-foreground">{obraAtual?.nome || "Todas"}</span>
                {" · "}
                Período: <span className="font-medium text-foreground">{formatDate(dataInicio)} - {formatDate(dataFim)}</span>
              </p>
            </div>

            {/* 🔴 Banner CRÍTICO: contém previsões (dias futuros) */}
            {contemPrevisoes && (
              <div className="mb-4 p-4 rounded-md border-2 border-red-500/60 bg-red-500/10 flex items-start gap-3">
                <AlertTriangle className="h-6 w-6 text-red-500 shrink-0 mt-0.5" />
                <div className="text-sm leading-relaxed">
                  <strong className="text-red-600 dark:text-red-400 block mb-1">⚠ PRÉVIA OPERACIONAL — NÃO PAGAR ANTES DE CONFIRMAR</strong>
                  Este relatório contém <strong>R$ {totalPrevisto.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</strong> em{" "}
                  <strong>{qtdPrevistaTotal.toFixed(1)} diárias previstas</strong> (dias futuros assumidos como presentes) de{" "}
                  <strong>{colabsComPrevisao}</strong> colaborador(es). Esses valores <strong>não são consolidados</strong> — só viram pagamento real após o dia ocorrer.
                  <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div className="px-3 py-1.5 rounded bg-green-500/10 border border-green-500/30">
                      <span className="text-muted-foreground">CONSOLIDADO (devido hoje):</span>{" "}
                      <strong className="text-green-700 dark:text-green-400">R$ {totalConsolidado.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</strong>
                    </div>
                    <div className="px-3 py-1.5 rounded bg-yellow-500/10 border border-yellow-500/30">
                      <span className="text-muted-foreground">PROJETADO (com previsões):</span>{" "}
                      <strong className="text-yellow-700 dark:text-yellow-400">R$ {totalProjetado.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</strong>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ⚠ Banner anti-prejuízo: composição do total */}
            <div className="mb-4 p-3 rounded-md border border-orange-500/40 bg-orange-500/10 flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-orange-500 shrink-0 mt-0.5" />
              <div className="text-xs leading-relaxed">
                <strong className="text-orange-600 dark:text-orange-400">ATENÇÃO antes de pagar:</strong>{" "}
                O <strong>TOTAL</strong> não é simplesmente <em>diária × qtd</em>. Ele é a soma de{" "}
                <strong>Confirmadas + Previstas + Ajuste + Legado</strong>. Sempre confira o breakdown.
                Linhas marcadas com <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-orange-500/20 text-orange-700 dark:text-orange-300 font-bold">⚠ ajuste</span> indicam que o total difere de <code>diária × qtd</code>.
                Linhas com <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-yellow-500/20 text-yellow-700 dark:text-yellow-300 font-bold">🟡 previsão</span> incluem dias que ainda não ocorreram.
              </div>
            </div>

            {reportRows.length === 0 ? (
              <p className="text-sm text-muted-foreground py-8 text-center">
                Nenhum registro encontrado. Use a aba "Apontamentos" para lançar diárias manualmente.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border text-muted-foreground">
                      <th className="text-left py-2 px-3">Nome</th>
                      <th className="text-left py-2 px-3">Função</th>
                      <th className="text-right py-2 px-3">Diária</th>
                      <th className="text-right py-2 px-3">Qtd</th>
                      <th className="text-right py-2 px-3 text-blue-600 dark:text-blue-400" title="Valor de presenças JÁ CONFIRMADAS (dia ocorreu)">Confirmadas</th>
                      <th className="text-right py-2 px-3 text-yellow-600 dark:text-yellow-400" title="Dias FUTUROS assumidos como presentes — não consolidado">🟡 Previstas</th>
                      <th className="text-right py-2 px-3 text-orange-600 dark:text-orange-400" title="Ajustes/complementos/correções manuais">Ajuste</th>
                      <th className="text-right py-2 px-3 text-muted-foreground" title="Valores históricos importados (somente leitura)">Legado</th>
                      <th className="text-right py-2 px-3 font-bold">TOTAL</th>
                      <th className="text-center py-2 px-3">Origem</th>
                      <th className="text-left py-2 px-3">PIX</th>
                      {canInsert && <th className="text-center py-2 px-3 print:hidden">Hoje</th>}
                    </tr>
                  </thead>
                  <tbody>
                    {reportRows.map((r) => {
                      const presHoje = presencasHoje[r.colaboradorId];
                      const fracaoHoje = presHoje
                        ? (presHoje.fracao_diaria != null
                            ? Number(presHoje.fracao_diaria)
                            : (presHoje.tipo === "falta" ? 0 : presHoje.tipo === "meio_periodo" ? 0.5 : 1))
                        : null;
                      const expected = r.valorDiaria * r.qtdDiarias;
                      const delta = r.valorTotal - expected;
                      const hasHiddenAdjust = Math.abs(delta) > 0.01;
                      return (
                      <tr key={r.colaboradorId} className={`border-b border-border/50 hover:bg-secondary/50 transition-colors ${r.temPrevisao ? "bg-yellow-500/5" : hasHiddenAdjust ? "bg-orange-500/5" : ""}`}>
                        <td className="py-2.5 px-3 font-medium">
                          {r.nome}
                          {r.temPrevisao && (
                            <span
                              className="ml-2 inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] bg-yellow-500/20 text-yellow-700 dark:text-yellow-300 font-bold"
                              title={`Inclui ${r.qtdPrevista.toFixed(1)} diária(s) PREVISTA(S) — R$ ${r.valorPrevisto.toFixed(2)}. Ainda não consolidado.`}
                            >
                              🟡 previsão
                            </span>
                          )}
                          {hasHiddenAdjust && (
                            <span
                              className="ml-2 inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] bg-orange-500/20 text-orange-700 dark:text-orange-300 font-bold"
                              title={`Esperado (diária × qtd) = R$ ${expected.toFixed(2)} | Diferença = R$ ${delta.toFixed(2)}`}
                            >
                              ⚠ ajuste
                            </span>
                          )}
                        </td>
                        <td className="py-2.5 px-3">
                          <Badge variant="outline" className="text-[10px]">{r.funcao}</Badge>
                        </td>
                        <td className="py-2.5 px-3 text-right font-mono">R$ {r.valorDiaria.toFixed(2)}</td>
                        <td className="py-2.5 px-3 text-right font-mono">
                          {r.qtdDiarias % 1 === 0 ? r.qtdDiarias : r.qtdDiarias.toFixed(1)}
                        </td>
                        <td className="py-2.5 px-3 text-right font-mono text-blue-600 dark:text-blue-400" title={`Confirmadas: ${r.qtdConfirmada.toFixed(1)} | Ajustadas: ${r.qtdAjustadaPresenca.toFixed(1)}`}>
                          R$ {(r.valorConfirmado + r.valorAjustadoPresenca).toFixed(2)}
                        </td>
                        <td className={`py-2.5 px-3 text-right font-mono ${r.valorPrevisto > 0 ? "text-yellow-600 dark:text-yellow-400 font-bold" : "text-muted-foreground/40"}`} title={r.valorPrevisto > 0 ? `${r.qtdPrevista.toFixed(1)} dia(s) futuro(s) assumido(s)` : "Sem previsões"}>
                          {r.valorPrevisto > 0 ? `R$ ${r.valorPrevisto.toFixed(2)}` : "—"}
                        </td>
                        <td className={`py-2.5 px-3 text-right font-mono ${r.valorAjuste !== 0 ? "text-orange-600 dark:text-orange-400 font-semibold" : "text-muted-foreground"}`}>
                          {r.valorAjuste !== 0 ? `R$ ${r.valorAjuste.toFixed(2)}` : "—"}
                        </td>
                        <td className={`py-2.5 px-3 text-right font-mono ${r.valorLegado > 0 ? "text-muted-foreground" : "text-muted-foreground/40"}`}>
                          {r.valorLegado > 0 ? `R$ ${r.valorLegado.toFixed(2)}` : "—"}
                        </td>
                        <td className="py-2.5 px-3 text-right font-mono font-bold">
                          R$ {r.valorTotal.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                        </td>
                        <td className="py-2.5 px-3 text-center">
                          <Badge
                            variant={r.fonte === "legado" ? "outline" : r.fonte === "misto" ? "default" : r.fonte === "ajuste" ? "default" : "secondary"}
                            className="text-[10px]"
                            title={`Base: R$ ${r.valorBasePresenca.toFixed(2)} | Ajuste: R$ ${r.valorAjuste.toFixed(2)}${r.valorLegado > 0 ? ` | Legado: R$ ${r.valorLegado.toFixed(2)}` : ""}`}
                          >
                            {r.fonte === "legado" ? "Legado" : r.fonte === "misto" ? "Pres+Ajuste" : r.fonte === "ajuste" ? "Ajuste" : "Presença"}
                          </Badge>
                        </td>
                        <td className="py-2.5 px-3 text-xs text-muted-foreground">
                          {r.pixChave ? `${r.pixTipo}: ${r.pixChave}` : "—"}
                        </td>
                        {canInsert && (
                          <td className="py-2 px-3 text-center print:hidden">
                            {presHoje ? (
                              <Badge
                                variant={fracaoHoje === 0 ? "destructive" : fracaoHoje === 0.5 ? "secondary" : "default"}
                                className="text-[10px]"
                              >
                                {fracaoHoje === 0 ? "Falta" : fracaoHoje === 0.5 ? "½ hoje" : "✓ hoje"}
                              </Badge>
                            ) : (
                              <div className="inline-flex gap-1">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="h-7 px-2 text-xs"
                                  onClick={() => registrarPresencaRapida(r.colaboradorId, 1)}
                                  title="Registrar 1 diária para hoje"
                                >
                                  +1
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="h-7 px-2 text-xs"
                                  onClick={() => registrarPresencaRapida(r.colaboradorId, 0.5)}
                                  title="Registrar meia diária para hoje"
                                >
                                  ½
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="h-7 px-2 text-xs text-destructive hover:bg-destructive/10"
                                  onClick={() => registrarPresencaRapida(r.colaboradorId, 0)}
                                  title="Registrar falta para hoje"
                                >
                                  ✕
                                </Button>
                              </div>
                            )}
                          </td>
                        )}
                      </tr>
                      );
                    })}
                  </tbody>
                  <tfoot>
                    <tr className="border-t-2 border-border bg-muted/30">
                      <td colSpan={4} className="py-3 px-3 font-bold text-right">SUBTOTAL</td>
                      <td className="py-3 px-3 text-right font-mono font-bold text-blue-600 dark:text-blue-400">
                        R$ {reportRows.reduce((s, r) => s + r.valorConfirmado + r.valorAjustadoPresenca, 0).toFixed(2)}
                      </td>
                      <td className="py-3 px-3 text-right font-mono font-bold text-yellow-600 dark:text-yellow-400">
                        {totalPrevisto > 0 ? `R$ ${totalPrevisto.toFixed(2)}` : "—"}
                      </td>
                      <td className="py-3 px-3 text-right font-mono font-bold text-orange-600 dark:text-orange-400">
                        R$ {reportRows.reduce((s, r) => s + r.valorAjuste, 0).toFixed(2)}
                      </td>
                      <td className="py-3 px-3 text-right font-mono font-bold text-muted-foreground">
                        R$ {reportRows.reduce((s, r) => s + r.valorLegado, 0).toFixed(2)}
                      </td>
                      <td className="py-3 px-3 text-right font-mono font-bold text-primary">
                        R$ {subtotalGeral.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                      </td>
                      <td colSpan={canInsert ? 3 : 2}></td>
                    </tr>
                    {contemPrevisoes && (
                      <tr className="bg-muted/10">
                        <td colSpan={4} className="py-2 px-3 text-right text-xs font-semibold text-muted-foreground">DOIS TOTAIS:</td>
                        <td colSpan={4} className="py-2 px-3 text-xs">
                          <div className="flex flex-wrap gap-3">
                            <span className="px-2 py-1 rounded bg-green-500/10 border border-green-500/30">
                              ✓ Consolidado (devido hoje): <strong className="text-green-700 dark:text-green-400">R$ {totalConsolidado.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</strong>
                            </span>
                            <span className="px-2 py-1 rounded bg-yellow-500/10 border border-yellow-500/30">
                              🟡 Projetado (com previsão): <strong className="text-yellow-700 dark:text-yellow-400">R$ {totalProjetado.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</strong>
                            </span>
                          </div>
                        </td>
                        <td colSpan={canInsert ? 4 : 3}></td>
                      </tr>
                    )}
                  </tfoot>
                </table>
              </div>
            )}
          </div>
        </TabsContent>

        {/* ─── Apontamentos Tab (CRUD) ─── */}
        <TabsContent value="apontamentos">
          <div className="glass-card p-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-border">
              <div>
                <h2 className="text-base font-bold">Apontamento de Diárias</h2>
                <p className="text-sm text-muted-foreground">
                  Lançamento manual de diárias por trabalhador — usado como fonte principal do relatório financeiro.
                </p>
              </div>
              <div className="flex gap-2 shrink-0">
                {canDelete && apontamentosPeriodo.length > 0 && (
                  <Button size="sm" variant="outline" className="gap-1 text-destructive border-destructive/30 hover:bg-destructive/10" onClick={() => setZerarConfirm(true)}>
                    <RotateCcw className="h-3.5 w-3.5" /> Zerar Quinzena
                  </Button>
                )}
                {canInsert && (
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                  <DialogTrigger asChild>
                    <Button size="sm" onClick={openNewDialog}>
                      <Plus className="h-4 w-4 mr-1" /> Novo Apontamento
                    </Button>
                  </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{editingId ? "Editar Apontamento" : "Novo Apontamento de Diárias"}</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label>Trabalhador</Label>
                      <Select value={formColaboradorId} onValueChange={handleColabChange}>
                        <SelectTrigger><SelectValue placeholder="Selecione..." /></SelectTrigger>
                        <SelectContent>
                          {colabAtivos.map((c) => (
                            <SelectItem key={c.id} value={c.id}>
                              {c.nome} — {CATEGORIAS[c.categoria || ""] || c.categoria || "—"}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label>Qtd Diárias</Label>
                        <Input
                          type="number"
                          step="0.5"
                          min="0"
                          placeholder="Ex: 4.5"
                          value={formQtdDiarias}
                          onChange={(e) => setFormQtdDiarias(e.target.value)}
                        />
                      </div>
                      <div>
                        <Label>Valor da Diária (R$)</Label>
                        <Input
                          type="number"
                          step="0.01"
                          min="0"
                          placeholder="Ex: 170.00"
                          value={formValorDiaria}
                          onChange={(e) => setFormValorDiaria(e.target.value)}
                        />
                      </div>
                    </div>
                    {formQtdDiarias && formValorDiaria && (
                      <div className="p-3 rounded-md bg-muted/50 text-sm">
                        <span className="text-muted-foreground">Total calculado: </span>
                        <span className="font-bold text-primary">
                          R$ {(parseFloat(formQtdDiarias || "0") * parseFloat(formValorDiaria || "0")).toFixed(2)}
                        </span>
                      </div>
                    )}
                    <div>
                      <Label>Observação</Label>
                      <Textarea
                        placeholder="Observação opcional..."
                        value={formObs}
                        onChange={(e) => setFormObs(e.target.value)}
                      />
                    </div>
                    <Button className="w-full" onClick={handleSave}>
                      {editingId ? "Salvar Alterações" : "Registrar Apontamento"}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
                )}
              </div>
            </div>

            {apontamentosPeriodo.length === 0 ? (
              <p className="text-sm text-muted-foreground py-8 text-center">
                Nenhum apontamento de diária para o período selecionado. Clique em "Novo Apontamento" para começar.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border text-muted-foreground">
                      <th className="text-left py-2 px-3">Trabalhador</th>
                      <th className="text-right py-2 px-3">Diária</th>
                      <th className="text-right py-2 px-3">Qtd</th>
                      <th className="text-right py-2 px-3">Total</th>
                      <th className="text-left py-2 px-3">Obs</th>
                      <th className="text-center py-2 px-3">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {apontamentosPeriodo.map((a) => {
                      const colab = colaboradores.find((c) => c.id === a.colaborador_id);
                      const total = Number(a.quantidade_diarias) * Number(a.valor_diaria);
                      return (
                        <tr key={a.id} className="border-b border-border/50 hover:bg-secondary/50 transition-colors">
                          <td className="py-2.5 px-3 font-medium">{colab?.nome || "—"}</td>
                          <td className="py-2.5 px-3 text-right font-mono">R$ {Number(a.valor_diaria).toFixed(2)}</td>
                          <td className="py-2.5 px-3 text-right font-mono">{Number(a.quantidade_diarias) % 1 === 0 ? Number(a.quantidade_diarias) : Number(a.quantidade_diarias).toFixed(1)}</td>
                          <td className="py-2.5 px-3 text-right font-mono font-semibold">R$ {total.toFixed(2)}</td>
                          <td className="py-2.5 px-3 text-xs text-muted-foreground max-w-[150px] truncate">{a.observacao || "—"}</td>
                          <td className="py-2.5 px-3 text-center">
                            {(canUpdate || canDelete) && (
                            <div className="flex items-center justify-center gap-1">
                              {canUpdate && (
                              <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => openEditDialog(a)}>
                                <Pencil className="h-3.5 w-3.5" />
                              </Button>
                              )}
                              {canDelete && (
                              <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => {
                                const colab = colaboradores.find((c) => c.id === a.colaborador_id);
                                setDeleteConfirm({ open: true, id: a.id, nome: colab?.nome || "—" });
                              }}>
                                <Trash2 className="h-3.5 w-3.5" />
                              </Button>
                              )}
                            </div>
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
        </TabsContent>

        {/* ─── Operacional Tab ─── */}
        <TabsContent value="operacional">
          <div className="glass-card p-4">
            <div className="mb-4 pb-3 border-b border-border">
              <h2 className="text-base font-bold">Relatório Operacional</h2>
              <p className="text-sm text-muted-foreground">
                Controle de presença, produtividade e ocorrências (baseado em registros de presença)
              </p>
            </div>

            {reportRows.filter(r => r.presencas + r.faltas + r.faltasJustificadas > 0).length === 0 ? (
              <p className="text-sm text-muted-foreground py-8 text-center">
                Nenhum dado operacional encontrado para os filtros selecionados.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border text-muted-foreground">
                      <th className="text-left py-2 px-3">Nome</th>
                      <th className="text-left py-2 px-3">Função</th>
                      <th className="text-right py-2 px-3">Presenças</th>
                      <th className="text-right py-2 px-3">Faltas</th>
                      <th className="text-right py-2 px-3">Faltas Just.</th>
                      <th className="text-right py-2 px-3">H. Extra</th>
                      <th className="text-left py-2 px-3">Assiduidade</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reportRows.filter(r => r.presencas + r.faltas + r.faltasJustificadas > 0).map((r) => {
                      const totalDias = r.presencas + r.faltas + r.faltasJustificadas;
                      const assiduidade = totalDias > 0 ? (r.presencas / totalDias) * 100 : 0;
                      return (
                        <tr key={r.colaboradorId} className="border-b border-border/50 hover:bg-secondary/50 transition-colors">
                          <td className="py-2.5 px-3 font-medium">{r.nome}</td>
                          <td className="py-2.5 px-3">
                            <Badge variant="outline" className="text-[10px]">{r.funcao}</Badge>
                          </td>
                          <td className="py-2.5 px-3 text-right font-mono">{r.presencas}</td>
                          <td className="py-2.5 px-3 text-right font-mono">{r.faltas}</td>
                          <td className="py-2.5 px-3 text-right font-mono">{r.faltasJustificadas}</td>
                          <td className="py-2.5 px-3 text-right font-mono">{r.horasExtra > 0 ? `+${r.horasExtra}h` : "—"}</td>
                          <td className="py-2.5 px-3">
                            <StatusBadge
                              status={assiduidade >= 90 ? "ok" : assiduidade >= 70 ? "warning" : "critical"}
                              label={`${assiduidade.toFixed(0)}%`}
                            />
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

        {/* ─── Sequenciamento Tab ─── */}
        <TabsContent value="sequenciamento">
          <div className="glass-card p-4">
            <div className="mb-4 pb-3 border-b border-border">
              <h2 className="text-base font-bold">Sequenciamento de Equipes</h2>
              <p className="text-sm text-muted-foreground">
                Planejamento e status das equipes na obra atual
              </p>
            </div>

            {sequenciamento.length === 0 ? (
              <p className="text-sm text-muted-foreground py-8 text-center">
                Nenhum sequenciamento cadastrado para esta obra. Cadastre em Redução de Perdas.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border text-muted-foreground">
                      <th className="text-left py-2 px-3">Equipe</th>
                      <th className="text-center py-2 px-3">Semana Início</th>
                      <th className="text-center py-2 px-3">Semana Fim</th>
                      <th className="text-center py-2 px-3">Duração</th>
                      <th className="text-center py-2 px-3">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sequenciamento.map((eq) => {
                      const duracao = eq.semana_fim - eq.semana_inicio + 1;
                      const statusColor = eq.status === "concluido" ? "bg-status-ok/20 text-status-ok" : eq.status === "em_andamento" ? "bg-chart-4/20 text-chart-4" : "bg-muted text-muted-foreground";
                      const statusLabel = eq.status === "concluido" ? "Concluído" : eq.status === "em_andamento" ? "Em Andamento" : "Planejado";
                      return (
                        <tr key={eq.id} className="border-b border-border/50 hover:bg-secondary/50 transition-colors">
                          <td className="py-2.5 px-3 font-medium">{eq.equipe}</td>
                          <td className="py-2.5 px-3 text-center font-mono">{eq.semana_inicio}</td>
                          <td className="py-2.5 px-3 text-center font-mono">{eq.semana_fim}</td>
                          <td className="py-2.5 px-3 text-center font-mono">{duracao} sem.</td>
                          <td className="py-2.5 px-3 text-center">
                            <Badge className={`${statusColor} text-[10px]`}>{statusLabel}</Badge>
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
      </Tabs>

      <ConfirmDialog
        open={deleteConfirm.open}
        onOpenChange={(v) => setDeleteConfirm(prev => ({ ...prev, open: v }))}
        title="Excluir Apontamento"
        description={`Deseja excluir o apontamento de diária de "${deleteConfirm.nome}"?`}
        onConfirm={() => handleDelete(deleteConfirm.id)}
      />

      <ConfirmDialog
        open={zerarConfirm}
        onOpenChange={setZerarConfirm}
        title="Zerar Diárias da Quinzena"
        description={`Esta ação irá remover TODOS os ${apontamentosPeriodo.length} apontamentos do período ${formatDate(dataInicio)} - ${formatDate(dataFim)}. Essa ação é irreversível.`}
        confirmText="ZERAR"
        onConfirm={handleZerarQuinzena}
      />
    </div>
  );
}

function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  const [y, m, d] = dateStr.split("-");
  return `${d}/${m}/${y}`;
}
