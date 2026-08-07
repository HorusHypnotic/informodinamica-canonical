import { useState, useEffect, useCallback, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Clock,
  Eye,
  HelpCircle,
  MapPin,
  Plus,
  Trash2,
  Building2,
} from "lucide-react";
import {
  clearDraft,
  loadDraft,
  loadOrganizations,
  registerObservation,
  saveDraft,
} from "@/lib/observationStorage";
import {
  getDefaultObservationDraft,
  isDraftWithContent,
  type ObservationDraft,
  type Organization,
} from "@/types/observation";

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
  { value: "O1", label: "Observação direta, sensorial" },
  { value: "O2", label: "Observação mediada por instrumento" },
  { value: "O3", label: "Observação de representação" },
  { value: "O4", label: "Observação inferencial" },
];

const STEPS = [
  { title: "Contexto", description: "Organização, locais e data do evento" },
  { title: "Qualidade", description: "Como a observação foi obtida?" },
  { title: "O que aconteceu", description: "Registre o fenômeno sem interpretar." },
  { title: "O que falta saber", description: "Anote dúvidas para investigação futura." },
  { title: "Revisão", description: "Confira os dados antes de registrar." },
];

export default function NewObservation() {
  const [draft, setDraft] = useState<ObservationDraft>(() => loadDraft());
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [step, setStep] = useState(1);
  const [saveStatus, setSaveStatus] = useState<"saved" | "auto" | "idle">("idle");
  const [showIndicator, setShowIndicator] = useState(false);

  useEffect(() => {
    setOrganizations(loadOrganizations());
  }, []);

  const saveToStorage = useCallback((data: ObservationDraft) => {
    const payload = { ...data, lastSaved: new Date().toLocaleString("pt-BR") };
    if (saveDraft(payload)) {
      setDraft(payload);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isDraftWithContent(draft)) {
        saveToStorage(draft);
        setSaveStatus("auto");
        setShowIndicator(true);
        window.setTimeout(() => setShowIndicator(false), 1800);
      }
    }, 700);
    return () => window.clearTimeout(timer);
  }, [draft, saveToStorage]);

  const handleFieldChange = (field: keyof ObservationDraft, value: any) => {
    setDraft((previous) => ({ ...previous, [field]: value }));
    setSaveStatus("idle");
  };

  const handleLocationChange = (index: number, value: string) => {
    const newLocs = [...draft.locations];
    newLocs[index] = value;
    handleFieldChange("locations", newLocs);
  };

  const handleAddLocation = () => {
    handleFieldChange("locations", [...draft.locations, ""]);
  };

  const handleRemoveLocation = (index: number) => {
    if (draft.locations.length <= 1) {
      handleLocationChange(0, "");
      return;
    }
    const newLocs = draft.locations.filter((_, i) => i !== index);
    handleFieldChange("locations", newLocs);
  };

  const handleManualSave = () => {
    saveToStorage(draft);
    setSaveStatus("saved");
    setShowIndicator(true);
    window.setTimeout(() => setShowIndicator(false), 2500);
  };

  const handleClearDraft = () => {
    if (!window.confirm("Limpar o rascunho local? Esta ação não pode ser desfeita.")) return;
    clearDraft();
    setDraft(getDefaultObservationDraft());
    setStep(1);
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
    window.location.hash = "";
    window.location.href = window.location.pathname;
  };

  const goToStep = (nextStep: number) => {
    setStep(Math.min(Math.max(nextStep, 1), STEPS.length));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentStep = STEPS[step - 1];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-emerald-500 selection:text-black">
      <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/95 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-2xl items-center justify-between px-4">
          <div className="flex min-w-0 items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              aria-label="Voltar"
              className="h-11 w-11 shrink-0 text-slate-300 hover:bg-emerald-500/10 hover:text-emerald-300"
              onClick={handleGoBack}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="min-w-0">
              <h1 className="truncate text-sm font-semibold text-white">Nova observação (V2)</h1>
              <p className="truncate text-[11px] text-slate-500">Coleta rápida local</p>
            </div>
          </div>
          {showIndicator && (
            <div className="flex shrink-0 items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1.5 text-[11px] text-emerald-300">
              {saveStatus === "saved" ? <CheckCircle2 className="h-3.5 w-3.5" /> : <Clock className="h-3.5 w-3.5" />}
              <span className="hidden min-[380px]:inline">Salvo localmente</span>
              <span className="min-[380px]:hidden">Salvo</span>
            </div>
          )}
        </div>
      </header>

      <main className="mx-auto w-full max-w-2xl px-4 pb-36 pt-5 sm:pb-32">
        <section aria-label="Progresso do formulário" className="mb-6">
          <div className="mb-3 flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-emerald-400">Etapa {step} de {STEPS.length}</p>
              <h2 className="mt-1 text-2xl font-semibold tracking-tight text-white">{currentStep.title}</h2>
              <p className="mt-1 text-sm text-slate-400">{currentStep.description}</p>
            </div>
            <Badge variant="outline" className="mt-1 shrink-0 border-slate-700 bg-slate-900 text-slate-400">v2 local</Badge>
          </div>
          <div className="flex gap-1.5" aria-hidden="true">
            {STEPS.map((item, index) => (
              <div key={item.title} className={`h-1.5 flex-1 rounded-full ${index + 1 <= step ? "bg-emerald-400" : "bg-slate-800"}`} />
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 shadow-xl sm:p-6">
          <p className="mb-5 text-xs leading-relaxed text-slate-500">O autosave preserva seu rascunho neste navegador.</p>

          {step === 1 && (
            <div className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-sm font-medium text-slate-200">Título da Observação</Label>
                <Input
                  id="title"
                  autoFocus
                  placeholder="Ex.: Divergência de ritmo na fundação"
                  value={draft.title}
                  onChange={(event) => handleFieldChange("title", event.target.value)}
                  className="min-h-12 bg-slate-950/70 text-base text-slate-100 placeholder:text-slate-600"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="organization" className="flex items-center gap-2 text-sm font-medium text-slate-200">
                  <Building2 className="h-4 w-4 text-emerald-400" /> Organização / Construtora (Reutilizável)
                </Label>
                <div className="flex gap-2">
                  <Input
                    id="organization"
                    list="organizations-list"
                    placeholder="Ex.: Construtora Alfa / Cliente Beta"
                    value={draft.organizationName}
                    onChange={(event) => handleFieldChange("organizationName", event.target.value)}
                    className="min-h-12 bg-slate-950/70 text-base text-slate-100 placeholder:text-slate-600"
                  />
                  <datalist id="organizations-list">
                    {organizations.map((org) => (
                      <option key={org.id} value={org.name} />
                    ))}
                  </datalist>
                </div>
                <p className="text-[11px] text-slate-500">Digite uma nova ou selecione das organizações já cadastradas.</p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="flex items-center gap-2 text-sm font-medium text-slate-200">
                    <MapPin className="h-4 w-4 text-emerald-400" /> Locais da Observação (Múltiplos locais)
                  </Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleAddLocation}
                    className="h-8 border-slate-700 bg-slate-900 text-xs text-emerald-400 hover:bg-emerald-500/10"
                  >
                    <Plus className="mr-1 h-3.5 w-3.5" /> Adicionar local
                  </Button>
                </div>

                <div className="space-y-2">
                  {draft.locations.map((loc, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input
                        placeholder={`Local ${index + 1} (Ex.: Canteiro A, Setor Norte)`}
                        value={loc}
                        onChange={(e) => handleLocationChange(index, e.target.value)}
                        className="min-h-11 bg-slate-950/70 text-sm text-slate-100 placeholder:text-slate-600"
                      />
                      {draft.locations.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemoveLocation(index)}
                          className="h-11 w-11 shrink-0 text-slate-500 hover:bg-rose-500/10 hover:text-rose-400"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="date" className="flex items-center gap-2 text-sm font-medium text-slate-200">
                  <Calendar className="h-4 w-4 text-emerald-400" /> Data do evento
                </Label>
                <Input
                  id="date"
                  type="date"
                  value={draft.date}
                  onChange={(event) => handleFieldChange("date", event.target.value)}
                  className="min-h-12 bg-slate-950/70 text-base text-slate-100"
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="domain" className="text-sm font-medium text-slate-200">Domínio sistêmico</Label>
                <Select value={draft.domain} onValueChange={(val) => handleFieldChange("domain", val)}>
                  <SelectTrigger id="domain" className="min-h-12 bg-slate-950/70 text-base text-slate-100 border-slate-700">
                    <SelectValue placeholder="Selecione o domínio..." />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-900 border-slate-800 text-slate-100">
                    {DOMAINS.map((domain) => (
                      <SelectItem key={domain} value={domain} className="focus:bg-emerald-500/20 focus:text-emerald-300">
                        {domain}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label className="text-sm font-medium text-slate-200">Qualidade da observação (Epistemológica)</Label>
                <div className="grid grid-cols-1 gap-2.5">
                  {QUALITY_LEVELS.map((q) => {
                    const selected = draft.quality === q.value;
                    return (
                      <button
                        key={q.value}
                        type="button"
                        onClick={() => handleFieldChange("quality", q.value)}
                        className={`flex items-start gap-3 rounded-xl border p-3.5 text-left transition-all ${
                          selected
                            ? "border-emerald-500 bg-emerald-500/10 text-white"
                            : "border-slate-800 bg-slate-950/60 text-slate-300 hover:border-slate-700"
                        }`}
                      >
                        <span className={`mt-0.5 font-mono text-xs font-bold ${selected ? "text-emerald-400" : "text-slate-500"}`}>{q.value}</span>
                        <span className="text-sm">{q.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="rawDescription" className="text-sm font-medium text-slate-200">Descrição bruta do fenômeno</Label>
                <Textarea
                  id="rawDescription"
                  rows={5}
                  placeholder="O que foi observado diretamente, de forma objetiva, sem interpretações teóricas..."
                  value={draft.rawDescription}
                  onChange={(event) => handleFieldChange("rawDescription", event.target.value)}
                  className="bg-slate-950/70 text-base text-slate-100 placeholder:text-slate-600 border-slate-700"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="observedResult" className="text-sm font-medium text-slate-200">Resultado verificado</Label>
                <Textarea
                  id="observedResult"
                  rows={4}
                  placeholder="Qual foi o desfecho ou estado resultante constatado no momento..."
                  value={draft.observedResult}
                  onChange={(event) => handleFieldChange("observedResult", event.target.value)}
                  className="bg-slate-950/70 text-base text-slate-100 placeholder:text-slate-600 border-slate-700"
                />
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="openQuestions" className="text-sm font-medium text-slate-200">Questões abertas e dúvidas para investigação</Label>
                <Textarea
                  id="openQuestions"
                  rows={6}
                  placeholder="O que ficou em aberto? Quais pontos precisam de checagem posterior?"
                  value={draft.openQuestions}
                  onChange={(event) => handleFieldChange("openQuestions", event.target.value)}
                  className="bg-slate-950/70 text-base text-slate-100 placeholder:text-slate-600 border-slate-700"
                />
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-6">
              <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-4 space-y-4">
                <h3 className="text-sm font-semibold text-emerald-400 font-mono">Resumo do Registro</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-slate-500 block">Título:</span>
                    <span className="text-white font-medium">{draft.title || "—"}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Organização:</span>
                    <span className="text-white font-medium">{draft.organizationName || "—"}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Locais:</span>
                    <span className="text-white font-medium">{draft.locations.filter(Boolean).join(", ") || "—"}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Data do evento:</span>
                    <span className="text-white font-medium">{draft.date || "—"}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Domínio:</span>
                    <span className="text-white font-medium">{draft.domain || "—"}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Qualidade:</span>
                    <span className="text-white font-medium">{draft.quality || "—"}</span>
                  </div>
                </div>
                <div>
                  <span className="text-slate-500 block text-xs">Descrição Bruta:</span>
                  <p className="text-slate-300 text-xs mt-1 whitespace-pre-wrap">{draft.rawDescription || "—"}</p>
                </div>
              </div>
            </div>
          )}

          <div className="mt-8 flex items-center justify-between border-t border-slate-800 pt-5">
            {step > 1 ? (
              <Button type="button" variant="outline" onClick={() => goToStep(step - 1)} className="border-slate-700 bg-slate-900 text-slate-300 hover:bg-slate-800">
                Anterior
              </Button>
            ) : (
              <Button type="button" variant="ghost" onClick={handleClearDraft} className="text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 text-xs">
                Limpar rascunho
              </Button>
            )}

            {step < STEPS.length ? (
              <Button type="button" onClick={() => goToStep(step + 1)} className="bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-medium">
                Próximo
              </Button>
            ) : (
              <Button type="button" onClick={handleRegisterObservation} className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-6">
                Registrar Observação
              </Button>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
