import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Suspense } from "react";
import { getEco } from "@/lib/tdo/ecos.functions";
import { EcoForm } from "@/components/eco-form";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/_authenticated/ecos/$id")({
  head: () => ({ meta: [{ title: "Editar ECO — OPERA Control" }] }),
  component: () => (
    <Suspense fallback={<div className="text-muted-foreground">Carregando…</div>}>
      <Editar />
    </Suspense>
  ),
  errorComponent: ({ error }) => <div className="text-destructive">Erro: {error.message}</div>,
});

function Editar() {
  const { id } = Route.useParams();
  const fetchEco = useServerFn(getEco);
  const { data: eco } = useSuspenseQuery({
    queryKey: ["ecos", id],
    queryFn: () => fetchEco({ data: { id } }),
  });
  if (!eco) return <p>ECO não encontrado.</p>;
  return (
    <div className="space-y-5">
      <Link to="/ecos" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4 mr-1" /> Voltar
      </Link>
      <div>
        <h1 className="text-2xl font-semibold">Editar ECO</h1>
      </div>
      <EcoForm initial={{
        id: eco.id,
        titulo: eco.titulo,
        data_evento: eco.data_evento,
        causa_raiz_id: eco.causa_raiz_id,
        categoria: eco.categoria,
        valor_prejuizo: Number(eco.valor_prejuizo),
        data_inicio_causa: eco.data_inicio_causa,
        responsavel: eco.responsavel,
        descricao: eco.descricao,
        observacoes: eco.observacoes,
        impacto: eco.impacto,
        recorrencia: eco.recorrencia,
        persistencia: eco.persistencia,
      }} />
    </div>
  );
}
