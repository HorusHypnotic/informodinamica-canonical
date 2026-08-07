import { createFileRoute, Link } from "@tanstack/react-router";
import { EcoForm } from "@/components/eco-form";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/_authenticated/ecos/novo")({
  head: () => ({ meta: [{ title: "Novo ECO — OPERA Control" }] }),
  component: NovoEco,
});

function NovoEco() {
  return (
    <div className="space-y-5">
      <Link to="/ecos" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4 mr-1" /> Voltar
      </Link>
      <div>
        <h1 className="text-2xl font-semibold">Registrar ECO</h1>
        <p className="text-sm text-muted-foreground">Evento de Corrosão Operacional</p>
      </div>
      <EcoForm />
    </div>
  );
}
