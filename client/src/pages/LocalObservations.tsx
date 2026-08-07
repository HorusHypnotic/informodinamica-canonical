import { useState, useEffect, useRef } from "react";
import { ArrowLeft, Calendar, ChevronRight, ClipboardList, Plus, Download, Upload, Search, Filter, RefreshCw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  loadObservations,
  loadOrganizations,
  exportCorpusJson,
  exportCorpusCsv,
  importCorpusJson,
  type ConflictStrategy,
} from "@/lib/observationStorage";
import type { LocalObservation, Organization } from "@/types/observation";

function formatDate(value: string): string {
  if (!value) return "Sem data";
  const date = new Date(`${value}T00:00:00`);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleDateString("pt-BR");
}

export default function LocalObservations() {
  const [observations, setObservations] = useState<LocalObservation[]>([]);
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrg, setSelectedOrg] = useState<string>("ALL");
  const [selectedDomain, setSelectedDomain] = useState<string>("ALL");
  const [selectedQuality, setSelectedQuality] = useState<string>("ALL");
  const [selectedStatus, setSelectedStatus] = useState<string>("ALL");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const refreshData = () => {
    setObservations(loadObservations());
    setOrganizations(loadOrganizations());
  };

  useEffect(() => {
    refreshData();
  }, []);

  const filteredObservations = observations.filter((obs) => {
    const matchesSearch =
      !searchQuery.trim() ||
      obs.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      obs.rawDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      obs.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      obs.locations.some((l) => l.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesOrg = selectedOrg === "ALL" || obs.organizationName === selectedOrg;
    const matchesDomain = selectedDomain === "ALL" || obs.domain === selectedDomain;
    const matchesQuality = selectedQuality === "ALL" || obs.quality === selectedQuality;
    const matchesStatus = selectedStatus === "ALL" || obs.status === selectedStatus;

    return matchesSearch && matchesOrg && matchesDomain && matchesQuality && matchesStatus;
  });

  const handleExportJson = () => {
    const jsonStr = exportCorpusJson();
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `tpc-corpus-${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExportCsv = () => {
    const csvStr = exportCorpusCsv();
    const blob = new Blob(["\uFEFF" + csvStr], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `tpc-corpus-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleFileImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (!content) return;

      const strategyPrompt = window.prompt(
        "Estratégia de conflito para IDs existentes:\n- Digite 'skip' para ignorar duplicados\n- Digite 'overwrite' para sobrescrever\n- Digite 'keep_both' para duplicar com novo ID\n\n(Padrão: skip)",
        "skip"
      );
      const strategy: ConflictStrategy =
        strategyPrompt === "overwrite" || strategyPrompt === "keep_both" ? strategyPrompt : "skip";

      const res = importCorpusJson(content, strategy);
      if (res.error) {
        window.alert(`Erro na importação: ${res.error}`);
      } else {
        window.alert(`Importação concluída!\nImportados: ${res.importedCount}\nIgnorados: ${res.skippedCount}`);
        refreshData();
      }
      if (fileInputRef.current) fileInputRef.current.value = "";
    };
    reader.readAsText(file);
  };

  const domainsList = Array.from(new Set(observations.map((o) => o.domain).filter(Boolean)));
  const qualitiesList = Array.from(new Set(observations.map((o) => o.quality).filter(Boolean)));

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      <header className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" className="text-slate-400 hover:text-emerald-400 p-2" onClick={() => { window.location.hash = ""; }}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-sm font-semibold text-white">Observações locais (V2)</h1>
              <span className="text-[10px] text-slate-500 font-mono">Corpus • {filteredObservations.length} de {observations.length} exibida(s)</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <input type="file" ref={fileInputRef} onChange={handleFileImport} accept=".json" className="hidden" />
            <Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()} className="border-slate-700 bg-slate-900 text-xs text-slate-300 hover:bg-slate-800">
              <Upload className="w-3.5 h-3.5 mr-1" /> Importar
            </Button>
            <Button size="sm" className="bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-medium" onClick={() => { window.location.hash = "#nova-observacao"; }}>
              <Plus className="w-4 h-4 mr-1" /> Nova
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8 space-y-6">
        {/* Barra de Ações de Exportação e Filtros */}
        <Card className="bg-slate-900 border-slate-800 shadow-xl">
          <CardHeader className="pb-3 border-b border-slate-800">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <CardTitle className="text-lg font-serif text-white flex items-center gap-2">
                <Filter className="w-4 h-4 text-emerald-400" /> Filtros e Corpus
              </CardTitle>
              <div className="flex flex-wrap items-center gap-2">
                <Button variant="outline" size="sm" onClick={handleExportJson} className="border-slate-700 bg-slate-950 text-xs text-slate-300 hover:bg-slate-800">
                  <Download className="w-3.5 h-3.5 mr-1 text-emerald-400" /> Exportar JSON
                </Button>
                <Button variant="outline" size="sm" onClick={handleExportCsv} className="border-slate-700 bg-slate-950 text-xs text-slate-300 hover:bg-slate-800">
                  <Download className="w-3.5 h-3.5 mr-1 text-emerald-400" /> Exportar CSV
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-4 space-y-4">
            <div className="relative">
              <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500" />
              <Input
                placeholder="Buscar por título, ID, local ou descrição..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-slate-950/70 text-sm border-slate-700 text-slate-100"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <Select value={selectedOrg} onValueChange={setSelectedOrg}>
                <SelectTrigger className="bg-slate-950/70 border-slate-700 text-xs text-slate-200">
                  <SelectValue placeholder="Organização" />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 border-slate-800 text-slate-100">
                  <SelectItem value="ALL">Todas Organizações</SelectItem>
                  {organizations.map((org) => (
                    <SelectItem key={org.id} value={org.name}>{org.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedDomain} onValueChange={setSelectedDomain}>
                <SelectTrigger className="bg-slate-950/70 border-slate-700 text-xs text-slate-200">
                  <SelectValue placeholder="Domínio" />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 border-slate-800 text-slate-100">
                  <SelectItem value="ALL">Todos Domínios</SelectItem>
                  {domainsList.map((d) => (
                    <SelectItem key={d} value={d}>{d}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedQuality} onValueChange={setSelectedQuality}>
                <SelectTrigger className="bg-slate-950/70 border-slate-700 text-xs text-slate-200">
                  <SelectValue placeholder="Qualidade" />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 border-slate-800 text-slate-100">
                  <SelectItem value="ALL">Todas Qualidades</SelectItem>
                  {qualitiesList.map((q) => (
                    <SelectItem key={q} value={q}>{q}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="bg-slate-950/70 border-slate-700 text-xs text-slate-200">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 border-slate-800 text-slate-100">
                  <SelectItem value="ALL">Todos Status</SelectItem>
                  <SelectItem value="registrada">Registrada</SelectItem>
                  <SelectItem value="enriquecida">Enriquecida</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Lista de Observações */}
        <Card className="bg-slate-900 border-slate-800 shadow-xl">
          <CardHeader className="border-b border-slate-800">
            <CardTitle className="text-xl font-serif text-white flex items-center gap-2">
              <ClipboardList className="w-5 h-5 text-emerald-400" />
              Lista de Observações
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {filteredObservations.length === 0 ? (
              <div className="px-6 py-14 text-center">
                <ClipboardList className="w-10 h-10 mx-auto mb-4 text-slate-600" />
                <p className="text-slate-300 mb-2">Nenhuma observação encontrada com os filtros atuais.</p>
                <p className="text-sm text-slate-500 mb-6">Ajuste os filtros ou registre uma nova observação.</p>
                <Button className="bg-emerald-600 hover:bg-emerald-500 text-slate-950" onClick={() => { window.location.hash = "#nova-observacao"; }}>
                  <Plus className="w-4 h-4 mr-2" /> Criar observação
                </Button>
              </div>
            ) : (
              <div className="divide-y divide-slate-800">
                {filteredObservations.map((observation) => (
                  <button
                    key={observation.id}
                    type="button"
                    className="w-full text-left px-5 py-4 hover:bg-slate-800/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                    onClick={() => { window.location.hash = `#observacao/${encodeURIComponent(observation.id)}`; }}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0 space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-mono text-xs text-emerald-400">{observation.id}</span>
                          <Badge className={`text-[10px] ${observation.status === "enriquecida" ? "bg-cyan-500/15 text-cyan-300 border-cyan-500/30" : "bg-emerald-500/15 text-emerald-300 border-emerald-500/30"}`}>
                            {observation.status}
                          </Badge>
                          {observation.organizationName && (
                            <Badge variant="outline" className="border-slate-700 bg-slate-950 text-slate-300 text-[10px]">
                              {observation.organizationName}
                            </Badge>
                          )}
                        </div>
                        <h2 className="text-base font-medium text-white truncate">{observation.title}</h2>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-400 font-mono pt-1">
                          <span className="inline-flex items-center gap-1"><Calendar className="w-3 h-3" />{formatDate(observation.eventDate)}</span>
                          <span>Locais: {(observation.locations || []).join(", ") || "—"}</span>
                          <span>Domínio: {observation.domain || "—"}</span>
                          <span>Qualidade: {observation.quality || "—"}</span>
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
