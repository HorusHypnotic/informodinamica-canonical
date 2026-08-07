import { Fragment, useEffect, useState, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { useObra } from "@/hooks/useObra";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Collapsible, CollapsibleContent, CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  AlertTriangle, ChevronDown, ChevronRight, History, Lock, RefreshCw, Unlock, Copy, CheckCircle2,
} from "lucide-react";
import { toast } from "sonner";
import { startCausalContext, traced } from "@/lib/observability";

interface PeriodoFechado {
  id: string;
  obra_id: string;
  obra_nome?: string;
  mes: string;
  versao: number;
  hash_snapshot: string;
  fechado_em: string;
  fechado_por: string;
  reaberto_em: string | null;
  reaberto_por: string | null;
  motivo_reabertura: string | null;
}

interface HistoricoVersao {
  id: string;
  versao: number;
  hash: string;
  fechado_em: string;
  motivo: string | null;
  reaberto_em: string | null;
  motivo_reabertura: string | null;
  ativo: boolean;
}

interface HistoricoReabertura {
  id: string;
  versao_anterior: number;
  hash_anterior: string;
  reaberto_em: string;
  motivo: string;
  refechado_em: string | null;
  versao_nova: number | null;
  hash_novo: string | null;
  pendente_refechamento: boolean;
}

interface Historico {
  obra_id: string;
  mes: string;
  versoes: HistoricoVersao[];
  reaberturas: HistoricoReabertura[];
}

const fmtMes = (mes: string) => {
  const d = new Date(mes + "T00:00:00");
  return d.toLocaleDateString("pt-BR", { month: "long", year: "numeric" });
};
const fmtDateTime = (s: string | null) =>
  s ? new Date(s).toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" }) : "—";
const shortHash = (h: string) => `${h.slice(0, 10)}…${h.slice(-6)}`;

function HashCell({ hash }: { hash: string }) {
  const copy = () => {
    navigator.clipboard?.writeText(hash);
    toast.success("Hash copiado");
  };
  return (
    <button
      onClick={copy}
      className="font-mono text-[10px] text-muted-foreground hover:text-foreground inline-flex items-center gap-1"
      title={hash}
    >
      {shortHash(hash)}
      <Copy className="h-3 w-3" />
    </button>
  );
}

export function PeriodosFechadosTab() {
  const { obras, selectedObraId } = useObra();
  const [loading, setLoading] = useState(true);
  const [periodos, setPeriodos] = useState<PeriodoFechado[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [historicos, setHistoricos] = useState<Record<string, Historico>>({});

  const [reabrirOpen, setReabrirOpen] = useState(false);
  const [refecharOpen, setRefecharOpen] = useState(false);
  const [target, setTarget] = useState<PeriodoFechado | null>(null);
  const [reaberturaPendente, setReaberturaPendente] = useState<HistoricoReabertura | null>(null);
  const [motivo, setMotivo] = useState("");
  const [keyword, setKeyword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const obraNomePorId = useCallback(
    (id: string) => obras.find((o) => o.id === id)?.nome ?? "—",
    [obras],
  );

  const fetchPeriodos = useCallback(async () => {
    setLoading(true);
    let query = supabase
      .from("periodos_fechados")
      .select("id, obra_id, mes, versao, hash_snapshot, fechado_em, fechado_por, reaberto_em, reaberto_por, motivo_reabertura")
      .order("mes", { ascending: false })
      .order("versao", { ascending: false })
      .limit(200);
    if (selectedObraId) query = query.eq("obra_id", selectedObraId);

    const { data, error } = await query;
    if (error) {
      toast.error("Erro ao carregar períodos: " + error.message);
      setPeriodos([]);
    } else {
      setPeriodos((data ?? []) as PeriodoFechado[]);
    }
    setLoading(false);
  }, [selectedObraId]);

  useEffect(() => { void fetchPeriodos(); }, [fetchPeriodos]);

  const loadHistorico = useCallback(async (p: PeriodoFechado) => {
    const key = `${p.obra_id}_${p.mes}`;
    if (historicos[key]) return;
    const { data, error } = await supabase.rpc("listar_historico_periodo", {
      _obra_id: p.obra_id,
      _mes: p.mes,
    } as never);
    if (error) {
      toast.error("Erro ao carregar histórico: " + error.message);
      return;
    }
    setHistoricos((h) => ({ ...h, [key]: data as unknown as Historico }));
  }, [historicos]);

  const toggleExpand = async (p: PeriodoFechado) => {
    const newId = expandedId === p.id ? null : p.id;
    setExpandedId(newId);
    if (newId) await loadHistorico(p);
  };

  const openReabrir = (p: PeriodoFechado) => {
    setTarget(p);
    setMotivo("");
    setKeyword("");
    setReabrirOpen(true);
  };

  const openRefechar = (p: PeriodoFechado, reab: HistoricoReabertura) => {
    setTarget(p);
    setReaberturaPendente(reab);
    setRefecharOpen(true);
  };

  const handleReabrir = async () => {
    if (!target) return;
    const trimmed = motivo.trim();
    if (trimmed.length < 20) {
      toast.error("Motivo precisa ter ao menos 20 caracteres");
      return;
    }
    const expectedKeyword = `REABRIR ${fmtMes(target.mes).toUpperCase()}`;
    if (keyword.trim().toUpperCase() !== expectedKeyword) {
      toast.error(`Digite exatamente: ${expectedKeyword}`);
      return;
    }
    setSubmitting(true);
    const ctx = startCausalContext("admin.PeriodosFechadosTab.reabrir", {
      obraId: target.obra_id,
    });
    try {
      await traced({ ctx, eventType: "periodo.reabrir.click" }, async () => {
        const { data, error } = await supabase.rpc("reabrir_periodo", {
          _obra_id: target.obra_id,
          _mes: target.mes,
          _motivo: trimmed,
          _correlation_id: ctx.correlationId,
        } as never);
        if (error) throw error;
        const payload = data as { ok: boolean; reabertura_id: string } | null;
        if (!payload?.ok) throw new Error("Reabertura recusada pelo servidor");
        toast.success("Período reaberto. Refechamento pendente.");
      });
      setReabrirOpen(false);
      // Limpa cache do histórico para forçar reload
      setHistoricos((h) => {
        const n = { ...h };
        delete n[`${target.obra_id}_${target.mes}`];
        return n;
      });
      await fetchPeriodos();
    } catch (err) {
      toast.error("Falha ao reabrir: " + (err instanceof Error ? err.message : String(err)));
    } finally {
      setSubmitting(false);
    }
  };

  const handleRefechar = async () => {
    if (!target || !reaberturaPendente) return;
    setSubmitting(true);
    const ctx = startCausalContext("admin.PeriodosFechadosTab.refechar", {
      obraId: target.obra_id,
    });
    try {
      await traced({ ctx, eventType: "periodo.refechar.click" }, async () => {
        const { data, error } = await supabase.rpc("refechar_periodo", {
          _obra_id: target.obra_id,
          _mes: target.mes,
          _reabertura_id: reaberturaPendente.id,
          _correlation_id: ctx.correlationId,
        } as never);
        if (error) throw error;
        const payload = data as { ok: boolean; versao_nova: number; hash_novo: string } | null;
        if (!payload?.ok) throw new Error("Refechamento recusado pelo servidor");
        toast.success(`Refechado como v${payload.versao_nova}.`);
      });
      setRefecharOpen(false);
      setHistoricos((h) => {
        const n = { ...h };
        delete n[`${target.obra_id}_${target.mes}`];
        return n;
      });
      await fetchPeriodos();
    } catch (err) {
      toast.error("Falha ao refechar: " + (err instanceof Error ? err.message : String(err)));
    } finally {
      setSubmitting(false);
    }
  };

  const expectedKeyword = target ? `REABRIR ${fmtMes(target.mes).toUpperCase()}` : "";

  // Detecta períodos com reabertura ATIVA (versão ainda aberta) — banner laranja
  const reaberturaAtiva = periodos.some((p) => p.reaberto_em !== null && !periodos.some(
    (other) => other.obra_id === p.obra_id && other.mes === p.mes && other.versao > p.versao && other.reaberto_em === null,
  ));

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold">Períodos Fechados</h3>
          <p className="text-xs text-muted-foreground">
            Cada fechamento gera um hash imutável. Reabrir cria uma nova versão e registra evidência.
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={fetchPeriodos} className="gap-1.5">
          <RefreshCw className="h-3.5 w-3.5" /> Atualizar
        </Button>
      </div>

      {reaberturaAtiva && (
        <Alert variant="destructive" className="border-orange-500/50 bg-orange-500/10 text-orange-200">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Reabertura pendente de refechamento</AlertTitle>
          <AlertDescription>
            Existe pelo menos um período reaberto sem novo hash. Refeche assim que as correções forem aplicadas.
          </AlertDescription>
        </Alert>
      )}

      <div className="glass-card overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40px]"></TableHead>
              <TableHead>Obra</TableHead>
              <TableHead>Mês</TableHead>
              <TableHead className="text-center">Versão</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Hash</TableHead>
              <TableHead>Fechado em</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading && (
              <TableRow><TableCell colSpan={8} className="text-center text-muted-foreground py-8">Carregando…</TableCell></TableRow>
            )}
            {!loading && periodos.length === 0 && (
              <TableRow><TableCell colSpan={8} className="text-center text-muted-foreground py-8">Nenhum período fechado.</TableCell></TableRow>
            )}
            {!loading && periodos.map((p) => {
              const isAtivo = p.reaberto_em === null;
              const expanded = expandedId === p.id;
              const histKey = `${p.obra_id}_${p.mes}`;
              const hist = historicos[histKey];
              const reabPendente = hist?.reaberturas?.find((r) => r.pendente_refechamento);
              return (
                <Fragment key={p.id}>
                  <TableRow key={p.id} className={isAtivo ? "" : "opacity-60"}>
                    <TableCell>
                      <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => toggleExpand(p)}>
                        {expanded ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronRight className="h-3.5 w-3.5" />}
                      </Button>
                    </TableCell>
                    <TableCell className="font-medium text-sm">{obraNomePorId(p.obra_id)}</TableCell>
                    <TableCell className="text-sm capitalize">{fmtMes(p.mes)}</TableCell>
                    <TableCell className="text-center">
                      <Badge variant="outline" className="font-mono text-xs">v{p.versao}</Badge>
                    </TableCell>
                    <TableCell>
                      {isAtivo ? (
                        <Badge className="gap-1 bg-status-success/15 text-status-success border-status-success/30">
                          <Lock className="h-3 w-3" /> Fechado
                        </Badge>
                      ) : (
                        <Badge className="gap-1 bg-orange-500/15 text-orange-400 border-orange-500/30">
                          <Unlock className="h-3 w-3" /> Reaberto
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell><HashCell hash={p.hash_snapshot} /></TableCell>
                    <TableCell className="text-xs text-muted-foreground">{fmtDateTime(p.fechado_em)}</TableCell>
                    <TableCell className="text-right">
                      {isAtivo ? (
                        <Button size="sm" variant="outline" className="gap-1.5" onClick={() => openReabrir(p)}>
                          <Unlock className="h-3.5 w-3.5" /> Reabrir
                        </Button>
                      ) : reabPendente ? (
                        <Button size="sm" className="gap-1.5" onClick={() => openRefechar(p, reabPendente)}>
                          <Lock className="h-3.5 w-3.5" /> Refechar
                        </Button>
                      ) : (
                        <span className="text-xs text-muted-foreground">—</span>
                      )}
                    </TableCell>
                  </TableRow>
                  {expanded && (
                    <TableRow key={`${p.id}_hist`} className="bg-muted/20">
                      <TableCell colSpan={8} className="py-4">
                        <HistoricoTimeline hist={hist} obraNome={obraNomePorId(p.obra_id)} />
                      </TableCell>
                    </TableRow>
                  )}
                </Fragment>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {/* DIALOG REABRIR */}
      <Dialog open={reabrirOpen} onOpenChange={setReabrirOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              Reabrir período
            </DialogTitle>
            <DialogDescription>
              {target && <>Obra <b>{obraNomePorId(target.obra_id)}</b> · <b className="capitalize">{fmtMes(target.mes)}</b> (v{target.versao}).</>}
            </DialogDescription>
          </DialogHeader>

          <Alert variant="destructive" className="border-orange-500/50 bg-orange-500/10">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription className="text-xs">
              Esta ação <b>invalida o hash atual</b> e fica registrada permanentemente em <code>periodos_reaberturas</code>.
              O hash anterior será preservado como evidência. Um refechamento será exigido.
            </AlertDescription>
          </Alert>

          <div className="space-y-3 py-1">
            <div className="space-y-1">
              <label className="text-sm font-medium">Motivo da reabertura</label>
              <Textarea
                value={motivo}
                onChange={(e) => setMotivo(e.target.value)}
                placeholder="Ex: Ajuste de diária do colaborador X identificado após auditoria interna."
                rows={3}
                maxLength={2000}
              />
              <p className="text-[11px] text-muted-foreground">
                Mínimo 20 caracteres. {motivo.trim().length}/20.
              </p>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">
                Confirme digitando: <span className="font-mono text-orange-400">{expectedKeyword}</span>
              </label>
              <Input
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder={expectedKeyword}
                className="font-mono"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setReabrirOpen(false)} disabled={submitting}>Cancelar</Button>
            <Button
              onClick={handleReabrir}
              disabled={submitting || motivo.trim().length < 20 || keyword.trim().toUpperCase() !== expectedKeyword}
              className="bg-orange-600 hover:bg-orange-600/90 text-white"
            >
              {submitting ? "Reabrindo…" : "Reabrir período"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* DIALOG REFECHAR */}
      <Dialog open={refecharOpen} onOpenChange={setRefecharOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-status-success" />
              Refechar período
            </DialogTitle>
            <DialogDescription>
              {target && <>Será gerada a versão <b>v{(reaberturaPendente?.versao_anterior ?? 0) + 1}</b> de <b className="capitalize">{fmtMes(target.mes)}</b>.</>}
            </DialogDescription>
          </DialogHeader>

          <Alert className="border-status-success/40 bg-status-success/10">
            <CheckCircle2 className="h-4 w-4 text-status-success" />
            <AlertDescription className="text-xs">
              O servidor recalcula a folha, valida previsões pendentes e grava um novo hash imutável.
              O hash anterior permanece no histórico.
            </AlertDescription>
          </Alert>

          <DialogFooter>
            <Button variant="outline" onClick={() => setRefecharOpen(false)} disabled={submitting}>Cancelar</Button>
            <Button onClick={handleRefechar} disabled={submitting}>
              {submitting ? "Refechando…" : "Refechar agora"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function HistoricoTimeline({ hist, obraNome }: { hist?: Historico; obraNome: string }) {
  if (!hist) return <p className="text-xs text-muted-foreground">Carregando histórico…</p>;
  const itens: Array<{
    kind: "fechamento" | "reabertura" | "refechamento";
    when: string;
    label: string;
    detail?: string;
    hash?: string;
    versao?: number;
  }> = [];

  hist.versoes.forEach((v) => {
    itens.push({
      kind: "fechamento",
      when: v.fechado_em,
      label: v.versao === 1 ? "Fechamento inicial" : `Refechamento → v${v.versao}`,
      hash: v.hash,
      versao: v.versao,
      detail: v.motivo ?? undefined,
    });
  });
  hist.reaberturas.forEach((r) => {
    itens.push({
      kind: "reabertura",
      when: r.reaberto_em,
      label: `Reabertura de v${r.versao_anterior}`,
      hash: r.hash_anterior,
      versao: r.versao_anterior,
      detail: r.motivo,
    });
  });

  itens.sort((a, b) => new Date(a.when).getTime() - new Date(b.when).getTime());

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <History className="h-3.5 w-3.5" />
        <span>Linha do tempo · {obraNome} · {fmtMes(hist.mes)}</span>
      </div>
      <ol className="space-y-2 border-l-2 border-border ml-2 pl-4">
        {itens.map((i, idx) => {
          const color = i.kind === "reabertura"
            ? "bg-orange-500"
            : i.kind === "refechamento"
              ? "bg-status-success"
              : "bg-primary";
          return (
            <li key={idx} className="relative">
              <span className={`absolute -left-[22px] top-1 h-3 w-3 rounded-full ${color}`} />
              <div className="flex items-baseline gap-2 flex-wrap">
                <span className="text-sm font-medium">{i.label}</span>
                {typeof i.versao === "number" && (
                  <Badge variant="outline" className="text-[10px] font-mono">v{i.versao}</Badge>
                )}
                <span className="text-[11px] text-muted-foreground">{fmtDateTime(i.when)}</span>
                {i.hash && <HashCell hash={i.hash} />}
              </div>
              {i.detail && <p className="text-xs text-muted-foreground mt-0.5">{i.detail}</p>}
            </li>
          );
        })}
        {itens.length === 0 && (
          <li className="text-xs text-muted-foreground">Sem eventos registrados.</li>
        )}
      </ol>
    </div>
  );
}
