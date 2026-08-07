import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  ArrowLeft,
  Calendar,
  Clock,
  CheckCircle2,
  Eye,
  HelpCircle,
  MapPin,
  Building2,
  FileEdit,
  Save,
} from "lucide-react";
import { findObservation, updateObservationEnrichment } from "@/lib/observationStorage";
import type { LocalObservation } from "@/types/observation";

function formatDate(value: string): string {
  if (!value) return "Sem data";
  const date = new Date(`${value}T00:00:00`);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleDateString("pt-BR");
}

function Field({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wide text-slate-500">{icon}{label}</div>
      <div className="rounded-lg border border-slate-800 bg-slate-800/40 px-4 py-3 text-sm text-slate-200 whitespace-pre-wrap min-h-11">{value || "—"}</div>
    </div>
  );
}

export default function LocalObservationDetail({ id }: { id: string }) {
  const [observation, setObservation] = useState<LocalObservation | null>(() => findObservation(id));
  const [enrichmentInput, setEnrichmentInput] = useState(() => observation?.enrichmentNotes || "");
  const [isSavingEnrichment, setIsSavingEnrichment] = useState(false);

  if (!observation) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center px-4">
        <Card className="bg-slate-900 border-slate-800 max-w-md w-full">
          <CardHeader><CardTitle className="text-white">Observação não encontrada</CardTitle></CardHeader>
          <CardContent>
            <p className="text-sm text-slate-400 mb-5">O registro local solicitado não existe neste navegador.</p>
            <Button onClick={() => { window.location.hash = "#observacoes-locais"; }} className="bg-emerald-600 hover:bg-emerald-500 text-slate-950">Voltar às observações</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleSaveEnrichment = () => {
    setIsSavingEnrichment(true);
    const updated = updateObservationEnrichment(observation.id, enrichmentInput);
    if (updated) {
      setObservation(updated);
      window.alert("Enriquecimento posterior salvo com sucesso!");
    } else {
      window.alert("Erro ao salvar enriquecimento.");
    }
    setIsSavingEnrichment(false);
  };

  const locsDisplay = (observation.locations && observation.locations.length > 0)
    ? observation.locations.join(", ")
    : observation.location || "—";

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      <header className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" className="text-slate-400 hover:text-emerald-400 p-2" onClick={() => { window.location.hash = "#observacoes-locais"; }}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-sm font-semibold text-white">Detalhe da observação (V2)</h1>
              <span className="text-[10px] text-slate-500 font-mono">{observation.id}</span>
            </div>
          </div>
          <Badge className={`text-[10px] ${observation.status === "enriquecida" ? "bg-cyan-500/15 text-cyan-300 border-cyan-500/30" : "bg-emerald-500/15 text-emerald-300 border-emerald-500/30"}`}>
            {observation.status}
          </Badge>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8 pb-20 space-y-6">
        <Card className="bg-slate-900 border-slate-800 shadow-xl">
          <CardHeader className="border-b border-slate-800">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <span className="font-mono text-xs text-emerald-400">{observation.id}</span>
                <CardTitle className="text-xl font-serif text-white mt-2">{observation.title}</CardTitle>
              </div>
              {observation.organizationName && (
                <Badge variant="outline" className="border-slate-700 bg-slate-950 text-slate-300">
                  <Building2 className="w-3 h-3 mr-1 text-emerald-400" /> {observation.organizationName}
                </Badge>
              )}
            </div>
            <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-slate-400 font-mono pt-3">
              <span className="inline-flex items-center gap-1"><Calendar className="w-3 h-3" /> Evento: {formatDate(observation.eventDate)}</span>
              <span className="inline-flex items-center gap-1"><Clock className="w-3 h-3" /> Registrada: {new Date(observation.createdAt).toLocaleString("pt-BR")}</span>
            </div>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Field label="Locais" value={locsDisplay} icon={<MapPin className="w-3.5 h-3.5" />} />
              <Field label="Domínio" value={observation.domain} icon={<FileEdit className="w-3.5 h-3.5" />} />
              <Field label="Qualidade" value={observation.quality} icon={<CheckCircle2 className="w-3.5 h-3.5" />} />
            </div>
            <Field label="Descrição bruta (Registro Imutável)" value={observation.rawDescription} icon={<Eye className="w-3.5 h-3.5" />} />
            <Field label="Resultado observado" value={observation.observedResult} icon={<CheckCircle2 className="w-3.5 h-3.5" />} />
            <Field label="Questões abertas" value={observation.openQuestions} icon={<HelpCircle className="w-3.5 h-3.5" />} />
          </CardContent>
        </Card>

        {/* Seção dedicada de Enriquecimento Posterior */}
        <Card className="bg-slate-900 border-slate-800 shadow-xl border-t-2 border-t-cyan-500">
          <CardHeader className="border-b border-slate-800">
            <CardTitle className="text-lg font-serif text-white flex items-center gap-2">
              <FileEdit className="w-5 h-5 text-cyan-400" />
              Enriquecimento Posterior e Análise
            </CardTitle>
            <p className="text-xs text-slate-400">
              Notas analíticas e hipóteses adicionadas separadamente do registro bruto original em campo.
            </p>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="enrichment" className="text-sm font-medium text-slate-200">Notas de Enriquecimento</Label>
              <Textarea
                id="enrichment"
                rows={5}
                placeholder="Insira análises teóricas, correlações ou notas interpretativas posteriores..."
                value={enrichmentInput}
                onChange={(e) => setEnrichmentInput(e.target.value)}
                className="bg-slate-950/70 text-base text-slate-100 placeholder:text-slate-600 border-slate-700"
              />
            </div>
            {observation.enrichmentUpdatedAt && (
              <p className="text-[11px] text-slate-500 font-mono">
                Última atualização de enriquecimento: {new Date(observation.enrichmentUpdatedAt).toLocaleString("pt-BR")}
              </p>
            )}
            <div className="flex justify-end">
              <Button onClick={handleSaveEnrichment} disabled={isSavingEnrichment} className="bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-medium">
                <Save className="w-4 h-4 mr-1.5" /> Salvar Enriquecimento
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
