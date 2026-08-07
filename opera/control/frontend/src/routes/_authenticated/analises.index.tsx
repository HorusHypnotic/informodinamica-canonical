import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, Suspense, useMemo } from "react";
import { useSuspenseQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { listDecisoes, deleteDecisao } from "@/lib/tdo/decisoes.functions";
import { listEcos } from "@/lib/tdo/ecos.functions";
import { CENARIOS_LIST, CENARIOS, type CenarioMDEO } from "@/lib/tdo/mdeo-schemas";
import { DecisaoForm } from "@/components/decisao-form";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatBRL } from "@/lib/tdo/calculos";
import { cn } from "@/lib/utils";
import { Trash2, FileSpreadsheet } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/analises/")({
  head: () => ({ meta: [{ title: "Análises (MDEO) — OPERA Control" }] }),
  component: () => (
    <Suspense fallback={<div className="text-muted-foreground">Carregando…</div>}>
      <AnalisesPage />
    </Suspense>
  ),
  errorComponent: ({ error }) => <div className="text-destructive">Erro: {error.message}</div>,
});

function AnalisesPage() {
  const [cenario, setCenario] = useState<CenarioMDEO>("aluguel_vs_compra");
  const fetchDecisoes = useServerFn(listDecisoes);
  const fetchEcos = useServerFn(listEcos);
  const { data: decisoes } = useSuspenseQuery({ queryKey: ["decisoes"], queryFn: () => fetchDecisoes() });
  const { data: ecos } = useSuspenseQuery({ queryKey: ["ecos"], queryFn: () => fetchEcos() });

  const vinculadosPorDecisao = useMemo(() => {
    const m = new Map<string, { count: number; prejuizo: number }>();
    for (const e of ecos) {
      if (!e.decisao_mdeo_id) continue;
      const cur = m.get(e.decisao_mdeo_id) ?? { count: 0, prejuizo: 0 };
      cur.count++;
      cur.prejuizo += Number(e.valor_prejuizo || 0);
      m.set(e.decisao_mdeo_id, cur);
    }
    return m;
  }, [ecos]);

  const cfg = CENARIOS[cenario];

  return (
    <div className="space-y-5 sm:space-y-6">
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold tracking-tight">Análises — MDEO</h1>
          <p className="text-sm text-muted-foreground">
            Motor de Decisão Econômica Operacional. 7 cenários, 5 indicadores (CCT, EPI, PO, ROC, CP). Baseado na TDO.
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={async () => {
          try {
            const { data: sess } = await supabase.auth.getSession();
            const token = sess.session?.access_token;
            if (!token) { toast.error("Sessão expirada."); return; }
            const res = await fetch("/api/export-decisoes.csv", { headers: { Authorization: `Bearer ${token}` } });
            if (!res.ok) throw new Error(await res.text());
            const blob = await res.blob();
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `opera-decisoes-${new Date().toISOString().slice(0, 10)}.csv`;
            a.click();
            URL.revokeObjectURL(url);
          } catch (e) {
            toast.error(e instanceof Error ? e.message : "Falha na exportação");
          }
        }}>
          <FileSpreadsheet className="h-4 w-4 sm:mr-1" />
          <span className="hidden sm:inline">Exportar CSV</span>
          <span className="sm:hidden ml-1">CSV</span>
        </Button>
      </div>

      {/* Tabs cenário */}
      <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
        <div className="flex gap-2 min-w-max pb-1">
          {CENARIOS_LIST.map((c) => (
            <button
              key={c.id}
              onClick={() => setCenario(c.id)}
              className={cn(
                "rounded-md border px-3 py-1.5 text-xs sm:text-sm font-medium whitespace-nowrap transition-colors",
                cenario === c.id
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-background text-muted-foreground hover:text-foreground hover:bg-accent/50",
              )}
            >
              {c.nome}
            </button>
          ))}
        </div>
      </div>

      <DecisaoForm key={cfg.id} cenario={cfg} />

      <Card className="p-4 sm:p-5">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-sm sm:text-base">Histórico de decisões</h3>
          <span className="text-xs text-muted-foreground">{decisoes.length} no total</span>
        </div>
        {decisoes.length === 0 ? (
          <p className="text-sm text-muted-foreground mt-3">Nenhuma decisão registrada ainda.</p>
        ) : (
          <div className="mt-3 divide-y divide-border/60">
            {decisoes.map((d) => (
              <DecisaoRow key={d.id} d={d} vinculados={vinculadosPorDecisao.get(d.id)} />
            ))}
          </div>
        )}
      </Card>

      <p className="text-[11px] text-muted-foreground text-center pb-4">
        Precisa cadastrar causas raiz? <Link to="/causas" className="text-primary hover:underline">Ir para Causas →</Link>
      </p>
    </div>
  );
}

function DecisaoRow({
  d, vinculados,
}: {
  d: { id: string; titulo: string; cenario: string; epi: number | null; recomendacao: string | null; status: string; horizonte_meses: number };
  vinculados?: { count: number; prejuizo: number };
}) {
  const qc = useQueryClient();
  const del = useServerFn(deleteDecisao);
  const delMut = useMutation({
    mutationFn: () => del({ data: { id: d.id } }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["decisoes"] });
      qc.invalidateQueries({ queryKey: ["capital-preservado"] });
      toast.success("Decisão removida.");
    },
  });
  const cfg = CENARIOS[d.cenario as CenarioMDEO];
  const epi = Number(d.epi ?? 0);
  const cor = epi > 0 ? "text-ico-verde-fg" : epi < 0 ? "text-ico-laranja-fg" : "text-muted-foreground";
  const recLabel = d.recomendacao === "opcao_a" ? cfg?.rotuloA : d.recomendacao === "opcao_b" ? cfg?.rotuloB : "Revisar";
  const realizado = vinculados ? epi - vinculados.prejuizo : null;
  const statusReal: "validada" | "erodida" | "neutra" | null =
    realizado == null ? null
    : realizado < 0 ? "erodida"
    : realizado >= epi * 0.8 ? "validada"
    : "neutra";
  return (
    <div className="flex items-center justify-between gap-3 py-3">
      <div className="min-w-0 flex-1">
        <div className="truncate font-medium text-sm">{d.titulo}</div>
        <div className="mt-0.5 flex items-center flex-wrap gap-x-2 gap-y-0.5 text-xs text-muted-foreground">
          <span>{cfg?.nome ?? d.cenario}</span>
          <span>•</span>
          <span>{d.horizonte_meses} m</span>
          <span>•</span>
          <span className={cn("font-medium", d.status === "aprovada" && "text-ico-verde-fg")}>{d.status}</span>
          <span>•</span>
          <span>Rec: {recLabel}</span>
          {vinculados && vinculados.count > 0 && (
            <>
              <span>•</span>
              <span>{vinculados.count} ECO(s) vinculados ({formatBRL(vinculados.prejuizo)})</span>
            </>
          )}
        </div>
        {statusReal && (
          <div className="mt-1 text-xs">
            Capital realizado:{" "}
            <span className={cn(
              "font-semibold num",
              statusReal === "validada" ? "text-ico-verde-fg"
              : statusReal === "erodida" ? "text-ico-vermelho"
              : "text-muted-foreground",
            )}>
              {formatBRL(realizado!)}
            </span>{" "}
            <span className="text-muted-foreground">
              · {statusReal === "validada" ? "Validada" : statusReal === "erodida" ? "Decisão erodida" : "Parcial"}
            </span>
          </div>
        )}
      </div>
      <div className={cn("text-sm font-semibold num", cor)}>{formatBRL(epi)}</div>
      <Button
        size="sm" variant="ghost"
        onClick={() => { if (confirm("Excluir esta decisão?")) delMut.mutate(); }}
        disabled={delMut.isPending}
      >
        <Trash2 className="h-4 w-4 text-destructive" />
      </Button>
    </div>
  );
}
