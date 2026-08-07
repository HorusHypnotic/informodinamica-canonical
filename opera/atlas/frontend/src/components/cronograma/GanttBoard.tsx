import { useEffect, useMemo, useState } from "react";
import { Gantt, Task, ViewMode } from "gantt-task-react";
import "gantt-task-react/dist/index.css";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Lock, RefreshCw, AlertCircle, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { startCausalContext, causalHeaders, logEvent } from "@/lib/observability";

interface ApiTask {
  id: string;
  obra_id: string;
  nome: string;
  data_inicio: string;
  data_fim: string;
  progresso: number;
  ordem: number;
  parent_id: string | null;
  responsavel: string | null;
  cor: string | null;
  readonly: boolean;
  locked_reason: string | null;
}

interface ApiDep {
  predecessora_id: string;
  sucessora_id: string;
}

interface Props {
  obraId: string;
  tenantId?: string;
}

function parseDate(d: string): Date {
  // YYYY-MM-DD → Date local (sem TZ surpresa)
  const [y, m, day] = d.split("-").map(Number);
  return new Date(y, (m ?? 1) - 1, day ?? 1);
}

function fmtDate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function GanttBoard({ obraId, tenantId }: Props) {
  const [tasks, setTasks] = useState<ApiTask[]>([]);
  const [deps, setDeps] = useState<ApiDep[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [canEdit, setCanEdit] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.Week);

  const load = async () => {
    setLoading(true);
    try {
      const url = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/gantt-list?obra_id=${obraId}`;
      const { data: { session } } = await supabase.auth.getSession();
      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${session?.access_token ?? ""}`,
          apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
        },
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error ?? "Erro ao carregar cronograma");
      setTasks(json.tasks ?? []);
      setDeps(json.dependencies ?? []);
      setCanEdit(!!json.can_edit);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Erro ao carregar");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (obraId) load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [obraId]);

  const ganttTasks: Task[] = useMemo(() => {
    const depMap = new Map<string, string[]>();
    deps.forEach((d) => {
      const arr = depMap.get(d.sucessora_id) ?? [];
      arr.push(d.predecessora_id);
      depMap.set(d.sucessora_id, arr);
    });
    return tasks.map((t) => {
      const start = parseDate(t.data_inicio);
      // gantt-task-react usa fim exclusivo — somamos 1 dia
      const endDate = parseDate(t.data_fim);
      endDate.setDate(endDate.getDate() + 1);
      const styles = t.readonly
        ? { backgroundColor: "hsl(var(--muted))", backgroundSelectedColor: "hsl(var(--muted))", progressColor: "hsl(var(--muted-foreground))", progressSelectedColor: "hsl(var(--muted-foreground))" }
        : t.cor
        ? { backgroundColor: t.cor, backgroundSelectedColor: t.cor, progressColor: "hsl(var(--primary))", progressSelectedColor: "hsl(var(--primary))" }
        : undefined;
      return {
        id: t.id,
        name: `${t.readonly ? "🔒 " : ""}${t.nome}`,
        start,
        end: endDate,
        progress: Number(t.progresso) || 0,
        type: "task",
        isDisabled: t.readonly,
        dependencies: depMap.get(t.id) ?? [],
        styles,
        project: t.parent_id ?? undefined,
      };
    });
  }, [tasks, deps]);

  const callUpdate = async (task: Task, kind: "date" | "progress") => {
    const original = tasks.find((t) => t.id === task.id);
    if (!original) return;
    if (original.readonly) {
      toast.error("Tarefa bloqueada (período fechado ou sem permissão)");
      void load();
      return;
    }

    setSaving(task.id);
    const ctx = startCausalContext("client.GanttBoard.update", { obraId, tenantId });

    try {
      const payload: Record<string, unknown> = { task_id: task.id };
      if (kind === "date") {
        // gantt-task-react fim é exclusivo → recuamos 1 dia
        const endInclusive = new Date(task.end);
        endInclusive.setDate(endInclusive.getDate() - 1);
        payload.data_inicio = fmtDate(task.start);
        payload.data_fim = fmtDate(endInclusive);
      } else {
        payload.progresso = task.progress;
      }

      const url = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/gantt-update-task`;
      const { data: { session } } = await supabase.auth.getSession();
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.access_token ?? ""}`,
          apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
          ...causalHeaders(ctx),
        },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok) {
        const msg = json?.code === "periodo_fechado"
          ? "Mês fechado — alteração bloqueada"
          : json?.error ?? "Falha ao atualizar";
        toast.error(msg);
        void logEvent({ ctx, eventType: "gantt.task.update.client_rejected", status: "failure", severity: "warning", payload: { task_id: task.id, server_error: json?.error } });
        void load();
        return;
      }
      toast.success("Cronograma atualizado");
      void load();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Erro de rede");
      void load();
    } finally {
      setSaving(null);
    }
  };

  return (
    <Card className="p-4 space-y-3">
      <div className="flex flex-wrap items-center gap-2 justify-between">
        <div className="flex items-center gap-2 text-sm">
          <ShieldCheck className="h-4 w-4 text-primary" />
          <span className="font-medium">Cronograma como Evidência</span>
          <span className="text-xs text-muted-foreground">
            · cada alteração é registrada com correlation_id
          </span>
        </div>
        <div className="flex items-center gap-2">
          {(["Day", "Week", "Month"] as const).map((v) => (
            <Button
              key={v}
              size="sm"
              variant={viewMode === (ViewMode[v as keyof typeof ViewMode] as ViewMode) ? "default" : "outline"}
              onClick={() => setViewMode(ViewMode[v as keyof typeof ViewMode] as ViewMode)}
            >
              {v === "Day" ? "Dia" : v === "Week" ? "Semana" : "Mês"}
            </Button>
          ))}
          <Button size="sm" variant="ghost" onClick={load} disabled={loading}>
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          </Button>
        </div>
      </div>

      {!canEdit && (
        <div className="flex items-center gap-2 text-xs p-2 rounded bg-muted/50 border border-border">
          <Lock className="h-3.5 w-3.5" />
          Modo somente leitura — você não tem permissão para editar este cronograma.
        </div>
      )}

      {ganttTasks.length === 0 && !loading ? (
        <div className="flex flex-col items-center justify-center py-12 text-muted-foreground text-sm gap-2">
          <AlertCircle className="h-6 w-6" />
          Nenhuma atividade cadastrada. Crie a primeira para começar.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <Gantt
            tasks={ganttTasks}
            viewMode={viewMode}
            locale="pt-BR"
            onDateChange={(t) => callUpdate(t, "date")}
            onProgressChange={(t) => callUpdate(t, "progress")}
            listCellWidth=""
            columnWidth={viewMode === ViewMode.Month ? 200 : viewMode === ViewMode.Week ? 120 : 60}
            barCornerRadius={4}
            barFill={70}
          />
          {saving && (
            <div className="text-xs text-muted-foreground mt-2">Salvando…</div>
          )}
        </div>
      )}
    </Card>
  );
}
