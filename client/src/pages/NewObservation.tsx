import React, { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  clearDraft,
  loadDraft,
  registerObservation,
  saveDraft,
} from "@/lib/observationStorage";
import {
  getDefaultObservationDraft,
  isDraftWithContent,
  type ObservationDraft,
} from "@/types/observation";
import {
  ArrowLeft,
  Save,
  Trash2,
  CheckCircle2,
  Clock,
  FileText,
  MapPin,
  Calendar,
  Eye,
  HelpCircle,
} from "lucide-react";

const DOMAINS = [
  "Sociotécnico",
  "Cibernético",
  "Cognitivo",
  "Organizacional",
  "Infraestrutura",
  "Comunicação",
  "Outro",
];

const QUALITY_LEVELS = [
  { value: "O1", label: "O1 — Observação direta, sensorial" },
  { value: "O2", label: "O2 — Observação mediada por instrumento" },
  { value: "O3", label: "O3 — Observação de representação" },
  { value: "O4", label: "O4 — Observação inferencial" },
];

export default function NewObservation() {
  const [draft, setDraft] = useState<ObservationDraft>(() => loadDraft());

  const [saveStatus, setSaveStatus] = useState<"saved" | "auto" | "idle">("idle");
  const [showIndicator, setShowIndicator] = useState(false);

  // --- Autosave ---
  const saveToStorage = useCallback((data: ObservationDraft) => {
    const payload = {
      ...data,
      lastSaved: new Date().toLocaleString("pt-BR"),
    };
    if (saveDraft(payload)) {
      setDraft(payload);
    }
  }, []);

  // Debounced autosave
  useEffect(() => {
    const timer = setTimeout(() => {
      if (isDraftWithContent(draft)) {
        saveToStorage(draft);
        setSaveStatus("auto");
        setShowIndicator(true);
        setTimeout(() => setShowIndicator(false), 2000);
      }
    }, 800);

    return () => clearTimeout(timer);
  }, [draft, saveToStorage]);

  const handleFieldChange = (
    field: keyof ObservationDraft,
    value: string
  ) => {
    setDraft((prev) => ({ ...prev, [field]: value }));
    setSaveStatus("idle");
  };

  const handleManualSave = () => {
    saveToStorage(draft);
    setSaveStatus("saved");
    setShowIndicator(true);
    setTimeout(() => setShowIndicator(false), 3000);
  };

  const handleClearDraft = () => {
    if (!window.confirm("Limpar o rascunho local? Esta ação não pode ser desfeita.")) {
      return;
    }
    clearDraft();
    setDraft(getDefaultObservationDraft());
    setSaveStatus("idle");
    setShowIndicator(false);
  };

  const handleRegisterObservation = () => {
    if (!isDraftWithContent(draft)) {
      window.alert("Preencha ao menos um campo antes de registrar a observação.");
      return;
    }

    const registered = registerObservation(draft);
    if (!registered) {
      window.alert("Não foi possível registrar a observação localmente. O rascunho foi preservado.");
      return;
    }

    clearDraft();
    window.location.hash = "#observacoes-locais";
  };

  const handleGoBack = () => {
    // Navigate back to the main page (vitrine)
    window.location.hash = "";
    window.location.href = window.location.pathname;
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-emerald-500 selection:text-black">
      {/* Top Bar */}
      <header className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              className="text-slate-400 hover:text-emerald-400 hover:bg-emerald-500/10 p-2"
              onClick={handleGoBack}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-sm font-semibold text-white">Nova Observação</h1>
              <span className="text-[10px] text-slate-500 font-mono">Coleta de Campo Local</span>
            </div>
          </div>

          {/* Save indicator */}
          {showIndicator && (
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[11px] font-mono animate-in fade-in">
              {saveStatus === "saved" ? (
                <CheckCircle2 className="w-3.5 h-3.5" />
              ) : (
                <Clock className="w-3.5 h-3.5" />
              )}
              Salvo localmente
            </div>
          )}
        </div>
      </header>

      {/* Form */}
      <main className="max-w-3xl mx-auto px-4 py-6 pb-24">
        <Card className="bg-slate-900 border-slate-800 shadow-xl">
          <CardHeader className="border-b border-slate-800 pb-4">
            <CardTitle className="text-lg font-serif text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-emerald-400" />
              Formulário de Observação
            </CardTitle>
            <p className="text-xs text-slate-400 font-mono mt-1">
              Os dados são salvos automaticamente no navegador (localStorage).
              Nenhum dado é enviado a servidores externos.
            </p>
          </CardHeader>

          <CardContent className="pt-6 space-y-6">
            {/* Título */}
            <div className="space-y-2">
              <Label htmlFor="title" className="text-sm text-slate-200 flex items-center gap-2">
                <FileText className="w-4 h-4 text-emerald-400" />
                Título
              </Label>
              <Input
                id="title"
                placeholder="Ex: Falha de sincronização em canal assíncrono"
                value={draft.title}
                onChange={(e) => handleFieldChange("title", e.target.value)}
                className="bg-slate-800/60 border-slate-700 text-slate-100 placeholder:text-slate-500 focus-visible:ring-emerald-500/40 focus-visible:border-emerald-500/40"
              />
            </div>

            {/* Data e Local (grid) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date" className="text-sm text-slate-200 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-emerald-400" />
                  Data
                </Label>
                <Input
                  id="date"
                  type="date"
                  value={draft.date}
                  onChange={(e) => handleFieldChange("date", e.target.value)}
                  className="bg-slate-800/60 border-slate-700 text-slate-100 focus-visible:ring-emerald-500/40 focus-visible:border-emerald-500/40"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location" className="text-sm text-slate-200 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-emerald-400" />
                  Local
                </Label>
                <Input
                  id="location"
                  placeholder="Ex: Home office, São Paulo"
                  value={draft.location}
                  onChange={(e) => handleFieldChange("location", e.target.value)}
                  className="bg-slate-800/60 border-slate-700 text-slate-100 placeholder:text-slate-500 focus-visible:ring-emerald-500/40 focus-visible:border-emerald-500/40"
                />
              </div>
            </div>

            {/* Domínio */}
            <div className="space-y-2">
              <Label className="text-sm text-slate-200">Domínio</Label>
              <Select
                value={draft.domain}
                onValueChange={(val) => handleFieldChange("domain", val)}
              >
                <SelectTrigger className="bg-slate-800/60 border-slate-700 text-slate-100 focus:ring-emerald-500/40 focus:border-emerald-500/40">
                  <SelectValue placeholder="Selecione o domínio" />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 border-slate-700 text-slate-100">
                  {DOMAINS.map((d) => (
                    <SelectItem
                      key={d}
                      value={d}
                      className="focus:bg-emerald-500/10 focus:text-emerald-300"
                    >
                      {d}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Qualidade */}
            <div className="space-y-2">
              <Label className="text-sm text-slate-200">Qualidade Observacional</Label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {QUALITY_LEVELS.map((q) => (
                  <button
                    key={q.value}
                    type="button"
                    onClick={() => handleFieldChange("quality", q.value)}
                    className={`px-3 py-2.5 rounded-lg border text-xs font-mono transition-all text-left ${
                      draft.quality === q.value
                        ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-300 ring-1 ring-emerald-500/30"
                        : "bg-slate-800/60 border-slate-700 text-slate-400 hover:border-slate-600 hover:text-slate-300"
                    }`}
                  >
                    <span className="font-bold block">{q.value}</span>
                    <span className="text-[10px] leading-tight opacity-70 block mt-0.5">
                      {q.label.split("—")[1]?.trim() || q.value}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Descrição bruta */}
            <div className="space-y-2">
              <Label htmlFor="rawDescription" className="text-sm text-slate-200 flex items-center gap-2">
                <Eye className="w-4 h-4 text-emerald-400" />
                Descrição Bruta
              </Label>
              <p className="text-[11px] text-slate-500 font-mono">
                Registro observacional sem interpretação teórica. Descreva o fenômeno como foi percebido.
              </p>
              <Textarea
                id="rawDescription"
                placeholder="Descreva o que foi observado, sem inferência..."
                value={draft.rawDescription}
                onChange={(e) => handleFieldChange("rawDescription", e.target.value)}
                rows={5}
                className="bg-slate-800/60 border-slate-700 text-slate-100 placeholder:text-slate-500 focus-visible:ring-emerald-500/40 focus-visible:border-emerald-500/40 resize-y min-h-[100px]"
              />
            </div>

            {/* Resultado observado */}
            <div className="space-y-2">
              <Label htmlFor="observedResult" className="text-sm text-slate-200 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Resultado Observado
              </Label>
              <Textarea
                id="observedResult"
                placeholder="Qual foi o desfecho ou resultado mensurável?"
                value={draft.observedResult}
                onChange={(e) => handleFieldChange("observedResult", e.target.value)}
                rows={3}
                className="bg-slate-800/60 border-slate-700 text-slate-100 placeholder:text-slate-500 focus-visible:ring-emerald-500/40 focus-visible:border-emerald-500/40 resize-y min-h-[80px]"
              />
            </div>

            {/* Questões abertas */}
            <div className="space-y-2">
              <Label htmlFor="openQuestions" className="text-sm text-slate-200 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-amber-400" />
                Questões Abertas
              </Label>
              <Textarea
                id="openQuestions"
                placeholder="Perguntas que ficaram sem resposta ou merecem investigação adicional..."
                value={draft.openQuestions}
                onChange={(e) => handleFieldChange("openQuestions", e.target.value)}
                rows={3}
                className="bg-slate-800/60 border-slate-700 text-slate-100 placeholder:text-slate-500 focus-visible:ring-emerald-500/40 focus-visible:border-emerald-500/40 resize-y min-h-[80px]"
              />
            </div>

            {/* Last saved timestamp */}
            {draft.lastSaved && (
              <div className="flex items-center gap-2 text-[11px] text-slate-500 font-mono pt-2 border-t border-slate-800">
                <Clock className="w-3 h-3" />
                Último salvamento: {draft.lastSaved}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <Button
            onClick={handleManualSave}
            className="bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-semibold flex-1 sm:flex-none"
          >
            <Save className="w-4 h-4 mr-2" />
            Salvar rascunho
          </Button>

          <Button
            onClick={handleRegisterObservation}
            className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold flex-1 sm:flex-none"
          >
            <CheckCircle2 className="w-4 h-4 mr-2" />
            Registrar observação
          </Button>

          <Button
            variant="outline"
            onClick={handleClearDraft}
            className="border-red-500/30 text-red-400 hover:bg-red-500/10 hover:text-red-300 flex-1 sm:flex-none"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Limpar rascunho
          </Button>

          <Button
            variant="ghost"
            onClick={handleGoBack}
            className="border border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white flex-1 sm:flex-none"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar para a vitrine
          </Button>
        </div>
      </main>
    </div>
  );
}
