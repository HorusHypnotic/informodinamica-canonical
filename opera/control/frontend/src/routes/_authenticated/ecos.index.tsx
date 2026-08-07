import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Suspense, useState, useMemo } from "react";
import { listEcos } from "@/lib/tdo/ecos.functions";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { IcoBadge } from "@/components/ico-badge";
import { formatBRL } from "@/lib/tdo/calculos";
import { Plus, Search, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/_authenticated/ecos/")({
  head: () => ({ meta: [{ title: "ECOs — OPERA Control" }] }),
  component: () => (
    <Suspense fallback={<div className="text-muted-foreground">Carregando…</div>}>
      <EcosList />
    </Suspense>
  ),
  errorComponent: ({ error }) => <div className="text-destructive">Erro: {error.message}</div>,
});

function EcosList() {
  const fetchEcos = useServerFn(listEcos);
  const { data: ecos } = useSuspenseQuery({ queryKey: ["ecos"], queryFn: () => fetchEcos() });
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return ecos;
    return ecos.filter((e) => {
      const causa = (e as { causas_raiz?: { nome?: string } | null }).causas_raiz?.nome ?? "";
      return e.titulo.toLowerCase().includes(term) || causa.toLowerCase().includes(term);
    });
  }, [ecos, q]);

  return (
    <div className="space-y-4 sm:space-y-5">
      <div className="flex items-end justify-between gap-3">
        <div className="min-w-0">
          <h1 className="text-xl sm:text-2xl font-semibold tracking-tight">Eventos de Corrosão</h1>
          <p className="text-sm text-muted-foreground">{ecos.length} evento(s) registrado(s).</p>
        </div>
        <Link to="/ecos/novo">
          <Button size="sm" className="sm:size-default" aria-label="Novo ECO">
            <Plus className="h-4 w-4 sm:mr-1" />
            <span className="hidden sm:inline">Novo ECO</span>
          </Button>
        </Link>
      </div>

      {ecos.length === 0 ? (
        <Card className="p-10 text-center text-muted-foreground">
          Nenhum ECO ainda. <Link to="/ecos/novo" className="text-primary hover:underline">Registre o primeiro</Link>.
        </Card>
      ) : (
        <>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Buscar por título ou causa…"
              className="pl-9"
            />
          </div>

          <div className="md:hidden space-y-2">
            {filtered.map((e) => {
              const causa = (e as { causas_raiz?: { nome?: string } | null }).causas_raiz?.nome;
              return (
                <Link key={e.id} to="/ecos/$id" params={{ id: e.id }}>
                  <Card className="p-3.5 active:bg-accent/40 transition-colors">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <div className="font-medium text-sm leading-snug">{e.titulo}</div>
                        {causa && (
                          <div className="mt-1 text-xs text-muted-foreground truncate">{causa}</div>
                        )}
                        <div className="mt-1.5 flex items-center gap-2 text-xs text-muted-foreground">
                          <span className="num">{new Date(e.data_evento).toLocaleDateString("pt-BR")}</span>
                          <span>•</span>
                          <span className="num font-medium text-foreground">{formatBRL(Number(e.valor_prejuizo))}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <IcoBadge valor={e.ico ?? 0} />
                        <ChevronRight className="h-4 w-4 text-muted-foreground/60" />
                      </div>
                    </div>
                  </Card>
                </Link>
              );
            })}
            {filtered.length === 0 && (
              <Card className="p-6 text-center text-sm text-muted-foreground">Nenhum resultado.</Card>
            )}
          </div>

          <Card className="overflow-hidden hidden md:block">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted/50 text-xs uppercase tracking-wide text-muted-foreground">
                  <tr>
                    <th className="text-left p-3">Data</th>
                    <th className="text-left p-3">Título</th>
                    <th className="text-left p-3">Causa raiz</th>
                    <th className="text-right p-3">Prejuízo</th>
                    <th className="text-right p-3">ICO (campo)</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((e) => (
                    <tr key={e.id} className="border-t hover:bg-accent/30">
                      <td className="p-3 num whitespace-nowrap">{new Date(e.data_evento).toLocaleDateString("pt-BR")}</td>
                      <td className="p-3">
                        <Link to="/ecos/$id" params={{ id: e.id }} className="font-medium hover:underline">
                          {e.titulo}
                        </Link>
                      </td>
                      <td className="p-3 text-muted-foreground">
                        {(e as { causas_raiz?: { nome?: string } | null }).causas_raiz?.nome ?? "—"}
                      </td>
                      <td className="p-3 text-right num">{formatBRL(Number(e.valor_prejuizo))}</td>
                      <td className="p-3 text-right"><IcoBadge valor={e.ico ?? 0} /></td>
                    </tr>
                  ))}
                  {filtered.length === 0 && (
                    <tr><td colSpan={5} className="p-8 text-center text-muted-foreground">Nenhum resultado.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </>
      )}
    </div>
  );
}
