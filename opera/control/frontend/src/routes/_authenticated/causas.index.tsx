import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Suspense } from "react";
import { listCausas, deleteCausa } from "@/lib/tdo/causas.functions";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_authenticated/causas/")({
  head: () => ({ meta: [{ title: "Causas raiz — OPERA Control" }] }),
  component: () => (
    <Suspense fallback={<div className="text-muted-foreground">Carregando…</div>}>
      <CausasList />
    </Suspense>
  ),
  errorComponent: ({ error }) => <div className="text-destructive">Erro: {error.message}</div>,
});

const CRIT_LABEL = { baixa: "Baixa", media: "Média", alta: "Alta", critica: "Crítica" } as const;
const STATUS_LABEL = { ativa: "Ativa", monitorando: "Monitorando", resolvida: "Resolvida", arquivada: "Arquivada" } as const;

const CRIT_STYLE: Record<keyof typeof CRIT_LABEL, string> = {
  baixa: "bg-ico-verde text-ico-verde-fg",
  media: "bg-ico-amarelo text-ico-amarelo-fg",
  alta: "bg-ico-laranja text-ico-laranja-fg",
  critica: "bg-ico-vermelho text-ico-vermelho-fg",
};

const STATUS_STYLE: Record<keyof typeof STATUS_LABEL, string> = {
  ativa: "bg-primary/10 text-primary",
  monitorando: "bg-accent text-accent-foreground",
  resolvida: "bg-ico-verde/60 text-ico-verde-fg",
  arquivada: "bg-muted text-muted-foreground",
};

function CausasList() {
  const fetchCausas = useServerFn(listCausas);
  const del = useServerFn(deleteCausa);
  const qc = useQueryClient();
  const { data: causas } = useSuspenseQuery({ queryKey: ["causas"], queryFn: () => fetchCausas() });

  const delMut = useMutation({
    mutationFn: (id: string) => del({ data: { id } }),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["causas"] }); toast.success("Causa removida."); },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <div className="space-y-4 sm:space-y-5">
      <div className="flex items-end justify-between gap-3">
        <div className="min-w-0">
          <h1 className="text-xl sm:text-2xl font-semibold tracking-tight">Causas raiz</h1>
          <p className="text-sm text-muted-foreground">{causas.length} causa(s) cadastrada(s).</p>
        </div>
        <Link to="/causas/novo">
          <Button size="sm" className="sm:size-default" aria-label="Nova causa">
            <Plus className="h-4 w-4 sm:mr-1" />
            <span className="hidden sm:inline">Nova causa</span>
          </Button>
        </Link>
      </div>

      {causas.length === 0 ? (
        <Card className="p-10 text-center text-muted-foreground">
          Nenhuma causa cadastrada.
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {causas.map((c) => (
            <Card key={c.id} className="p-4 flex flex-col">
              <div className="flex items-start justify-between gap-2">
                <Link
                  to="/causas/$id"
                  params={{ id: c.id }}
                  className="font-semibold leading-snug hover:underline min-w-0"
                >
                  {c.nome}
                </Link>
                <button
                  onClick={() => { if (confirm("Remover causa?")) delMut.mutate(c.id); }}
                  className="text-muted-foreground hover:text-destructive shrink-0 p-1 -m-1 rounded"
                  aria-label="Remover"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              {c.descricao && <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{c.descricao}</p>}
              <div className="mt-3 flex flex-wrap gap-1.5 text-[11px] font-medium">
                <span className={cn("rounded-full px-2 py-0.5", CRIT_STYLE[c.criticidade])}>
                  {CRIT_LABEL[c.criticidade]}
                </span>
                <span className={cn("rounded-full px-2 py-0.5", STATUS_STYLE[c.status])}>
                  {STATUS_LABEL[c.status]}
                </span>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
