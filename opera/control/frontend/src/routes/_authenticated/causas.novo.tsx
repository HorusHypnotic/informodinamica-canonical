import { createFileRoute, Link } from "@tanstack/react-router";
import { CausaForm } from "@/components/causa-form";
import { ArrowLeft } from "lucide-react";
import { z } from "zod";

const searchSchema = z.object({
  nome: z.string().optional(),
  categoria: z.enum(["processo", "pessoas", "fornecedor", "projeto", "gestao", "comunicacao", "outros"]).optional(),
});

export const Route = createFileRoute("/_authenticated/causas/novo")({
  head: () => ({ meta: [{ title: "Nova causa raiz — OPERA Control" }] }),
  validateSearch: searchSchema,
  component: NovaCausa,
});

function NovaCausa() {
  const { nome, categoria } = Route.useSearch();
  return (
    <div className="space-y-5">
      <Link to="/causas" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4 mr-1" /> Voltar
      </Link>
      <h1 className="text-2xl font-semibold">Nova causa raiz</h1>
      <CausaForm initial={{ nome: nome ?? "", categoria: categoria ?? "outros" }} />
    </div>
  );
}
