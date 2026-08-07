import { useEffect, useState } from "react";
import { ArrowLeft, Calendar, ChevronRight, ClipboardList, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { loadObservations } from "@/lib/observationStorage";
import type { LocalObservation } from "@/types/observation";

function formatDate(value: string): string {
  if (!value) return "Sem data";
  const date = new Date(`${value}T00:00:00`);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleDateString("pt-BR");
}

export default function LocalObservations() {
  const [observations, setObservations] = useState<LocalObservation[]>([]);

  useEffect(() => {
    setObservations(loadObservations());
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      <header className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" className="text-slate-400 hover:text-emerald-400 p-2" onClick={() => { window.location.hash = ""; }}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-sm font-semibold text-white">Observações locais</h1>
              <span className="text-[10px] text-slate-500 font-mono">Corpus local • {observations.length} registrada(s)</span>
            </div>
          </div>
          <Button size="sm" className="bg-emerald-600 hover:bg-emerald-500 text-slate-950" onClick={() => { window.location.hash = "#nova-observacao"; }}>
            <Plus className="w-4 h-4 mr-1.5" />
            Nova observação
          </Button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <Card className="bg-slate-900 border-slate-800 shadow-xl">
          <CardHeader className="border-b border-slate-800">
            <CardTitle className="text-xl font-serif text-white flex items-center gap-2">
              <ClipboardList className="w-5 h-5 text-emerald-400" />
              Corpus de observações
            </CardTitle>
            <p className="text-xs text-slate-400 font-mono">Registros persistidos somente neste navegador.</p>
          </CardHeader>
          <CardContent className="p-0">
            {observations.length === 0 ? (
              <div className="px-6 py-14 text-center">
                <ClipboardList className="w-10 h-10 mx-auto mb-4 text-slate-600" />
                <p className="text-slate-300 mb-2">Nenhuma observação registrada.</p>
                <p className="text-sm text-slate-500 mb-6">Crie um rascunho e registre a primeira observação local.</p>
                <Button className="bg-emerald-600 hover:bg-emerald-500 text-slate-950" onClick={() => { window.location.hash = "#nova-observacao"; }}>
                  <Plus className="w-4 h-4 mr-2" />
                  Criar observação
                </Button>
              </div>
            ) : (
              <div className="divide-y divide-slate-800">
                {observations.map((observation) => (
                  <button
                    key={observation.id}
                    type="button"
                    className="w-full text-left px-5 py-4 hover:bg-slate-800/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                    onClick={() => { window.location.hash = `#observacao/${encodeURIComponent(observation.id)}`; }}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <span className="font-mono text-xs text-emerald-400">{observation.id}</span>
                          <Badge className="bg-emerald-500/15 text-emerald-300 border-emerald-500/30 text-[10px]">{observation.status}</Badge>
                        </div>
                        <h2 className="text-base font-medium text-white truncate">{observation.title}</h2>
                        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-400 font-mono">
                          <span className="inline-flex items-center gap-1"><Calendar className="w-3 h-3" />{formatDate(observation.eventDate)}</span>
                          <span>Qualidade: {observation.quality || "—"}</span>
                          <span>Domínio: {observation.domain || "—"}</span>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 shrink-0 text-slate-500 mt-3" />
                    </div>
                  </button>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
