import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Suspense } from "react";
import { getCausa } from "@/lib/tdo/causas.functions";
import { listEcos } from "@/lib/tdo/ecos.functions";
import { CausaForm } from "@/components/causa-form";
import { RecomendacoesPanel } from "@/components/recomendacoes-panel";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/_authenticated/causas/$id")({
  head: () => ({ meta: [{ title: "Editar causa — OPERA Control" }] }),
  component: () => (
    <Suspense fallback={<div className="text-muted-foreground">Carregando…</div>}>
      <EditarCausa />
    </Suspense>
  ),
  errorComponent: ({ error }) => <div className="text-destructive">Erro: {error.message}</div>,
});

function EditarCausa() {
  const { id } = Route.useParams();
  const fetchCausa = useServerFn(getCausa);
  const fetchEcos = useServerFn(listEcos);
  const { data: c } = useSuspenseQuery({ queryKey: ["causas", id], queryFn: () => fetchCausa({ data: { id } }) });
  const { data: ecos } = useSuspenseQuery({ queryKey: ["ecos"], queryFn: () => fetchEcos() });
  if (!c) return <p>Causa não encontrada.</p>;

  const ecosDessaCausa = ecos.filter((e) => e.causa_raiz_id === id);
  const icoAtual = ecosDessaCausa.length
    ? Math.round(ecosDessaCausa.reduce((s, e) => s + (e.ico ?? 0), 0) / ecosDessaCausa.length)
    : undefined;

  return (
    <div className="space-y-5">
      <Link to="/causas" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4 mr-1" /> Voltar
      </Link>
      <h1 className="text-2xl font-semibold">Editar causa</h1>
      <CausaForm initial={{
        id: c.id, nome: c.nome, descricao: c.descricao, categoria: c.categoria,
        criticidade: c.criticidade, status: c.status,
      }} />

      <Suspense fallback={<div className="text-sm text-muted-foreground">Carregando recomendações…</div>}>
        <RecomendacoesPanel causaId={id} icoAtual={icoAtual} />
      </Suspense>
    </div>
  );
}
