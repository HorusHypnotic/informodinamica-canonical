import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Check,
  CheckCircle2,
  ChevronLeft,
  Clock,
  Eye,
  FileText,
  HelpCircle,
  MapPin,
  Save,
  Trash2,
} from "lucide-react";
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
  { title: "Contexto", description: "Onde e quando isso aconteceu?" },
  { title: "Qualidade", description: "Como a observação foi obtida?" },
  { title: "O que aconteceu", description: "Registre o fenômeno sem interpretar." },
  { title: "O que falta saber", description: "Anote dúvidas para investigação futura." },
  { title: "Revisão", description: "Confira os dados antes de registrar." },
];

export default function NewObservation() {
  const [draft, setDraft] = useState<ObservationDraft>(() => loadDraft());
  const [step, setStep] = useState(1);
  const [saveStatus, setSaveStatus] = useState<"saved" | "auto" | "idle">("idle");
  const [showIndicator, setShowIndicator] = useState(false);

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

  const handleFieldChange = (field: keyof ObservationDraft, value: string) => {
    setDraft((previous) => ({ ...previous, [field]: value }));
    setSaveStatus("idle");
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
  const qualityLabel = useMemo(
    () => QUALITY_LEVELS.find((quality) => quality.value === draft.quality)?.label,
    [draft.quality],
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-emerald-500 selection:text-black">
      <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/95 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-2xl items-center justify-between px-4">
          <div className="flex min-w-0 items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              aria-label="Voltar para a vitrine"
              className="h-11 w-11 shrink-0 text-slate-300 hover:bg-emerald-500/10 hover:text-emerald-300"
              onClick={handleGoBack}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="min-w-0">
              <h1 className="truncate text-sm font-semibold text-white">Nova observação</h1>
              <p className="truncate text-[11px] text-slate-500">Coleta de campo local</p>
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
            <Badge variant="outline" className="mt-1 shrink-0 border-slate-700 bg-slate-900 text-slate-400">rascunho local</Badge>
          </div>
          <div className="flex gap-1.5" aria-hidden="true">
            {STEPS.map((item, index) => (
              <div key={item.title} className={`h-1.5 flex-1 rounded-full ${index + 1 <= step ? "bg-emerald-400" : "bg-slate-800"}`} />
            ))}
          </div>
          <div className="mt-2 flex justify-between text-[10px] text-slate-600">
            <span>Contexto</span>
            <span>Revisão</span>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 shadow-xl sm:p-6">
          <p className="mb-5 text-xs leading-relaxed text-slate-500">Os dados ficam somente neste navegador. O autosave preserva seu rascunho se você sair e voltar.</p>

          {step === 1 && (
            <div className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-sm font-medium text-slate-200">Título</Label>
                <Input id="title" autoFocus placeholder="Ex.: falha de sincronização" value={draft.title} onChange={(event) => handleFieldChange("title", event.target.value)} className="min-h-12 bg-slate-950/70 text-base text-slate-100 placeholder:text-slate-600" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="date" className="flex items-center gap-2 text-sm font-medium text-slate-200"><Calendar className="h-4 w-4 text-emerald-400" />Data do evento</Label>
                <Input id="date" type="date" value={draft.date} onChange={(event) => handleFieldChange("date", event.target.value)} className="min-h-12 bg-slate-950/70 text-base text-slate-100" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location" className="flex items-center gap-2 text-sm font-medium text-slate-200"><MapPin className="h-4 w-4 text-emerald-400" />Local</Label>
                <Input id="location" placeholder="Ex.: frente de trabalho" value={draft.location} onChange={(event) => handleFieldChange("location", event.target.value)} className="min-h-12 bg-slate-950/70 text-base text-slate-100 placeholder:text-slate-600" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-slate-200">Domínio</Label>
                <Select value={draft.domain} onValueChange={(value) => handleFieldChange("domain", value)}>
                  <SelectTrigger className="min-h-12 bg-slate-950/70 text-base text-slate-100"><SelectValue placeholder="Selecione o domínio" /></SelectTrigger>
                  <SelectContent className="bg-slate-900 text-slate-100">
                    {DOMAINS.map((domain) => <SelectItem key={domain} value={domain} className="min-h-11 focus:bg-emerald-500/10">{domain}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <p className="text-sm leading-relaxed text-slate-400">Escolha o nível que descreve melhor a origem do registro. Você poderá revisar antes de salvar no corpus.</p>
              <div className="space-y-3">
                {QUALITY_LEVELS.map((quality) => {
                  const selected = draft.quality === quality.value;
                  return (
                    <button key={quality.value} type="button" aria-pressed={selected} onClick={() => handleFieldChange("quality", quality.value)} className={`flex min-h-[76px] w-full items-center gap-4 rounded-xl border p-4 text-left transition-colors ${selected ? "border-emerald-400/70 bg-emerald-500/15 ring-2 ring-emerald-400/20" : "border-slate-700 bg-slate-950/60 hover:border-slate-500"}`}>
                      <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg font-mono text-sm font-bold ${selected ? "bg-emerald-400 text-slate-950" : "bg-slate-800 text-emerald-300"}`}>{selected ? <Check className="h-5 w-5" /> : quality.value}</span>
                      <span><span className="block text-sm font-semibold text-slate-100">{quality.value}</span><span className="mt-0.5 block text-xs leading-relaxed text-slate-400">{quality.label}</span></span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="rawDescription" className="flex items-center gap-2 text-sm font-medium text-slate-200"><Eye className="h-4 w-4 text-emerald-400" />Descrição bruta</Label>
                <p className="text-xs leading-relaxed text-slate-500">Descreva o que foi percebido, sem interpretação teórica.</p>
                <Textarea id="rawDescription" autoFocus placeholder="O que você viu, ouviu ou mediu?" value={draft.rawDescription} onChange={(event) => handleFieldChange("rawDescription", event.target.value)} rows={7} className="bg-slate-950/70 text-base leading-relaxed text-slate-100 placeholder:text-slate-600" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="observedResult" className="flex items-center gap-2 text-sm font-medium text-slate-200"><CheckCircle2 className="h-4 w-4 text-emerald-400" />Resultado observado</Label>
                <Textarea id="observedResult" placeholder="Qual foi o desfecho observável?" value={draft.observedResult} onChange={(event) => handleFieldChange("observedResult", event.target.value)} rows={4} className="bg-slate-950/70 text-base leading-relaxed text-slate-100 placeholder:text-slate-600" />
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-5">
              <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4"><p className="text-sm leading-relaxed text-slate-300">Se não houver questões agora, deixe em branco. Este campo registra o que merece ser investigado depois.</p></div>
              <div className="space-y-2">
                <Label htmlFor="openQuestions" className="flex items-center gap-2 text-sm font-medium text-slate-200"><HelpCircle className="h-4 w-4 text-amber-400" />Questões abertas</Label>
                <Textarea id="openQuestions" autoFocus placeholder="O que ainda não sabemos?" value={draft.openQuestions} onChange={(event) => handleFieldChange("openQuestions", event.target.value)} rows={8} className="bg-slate-950/70 text-base leading-relaxed text-slate-100 placeholder:text-slate-600" />
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-4">
              <div className="rounded-xl border border-emerald-500/25 bg-emerald-500/5 p-4"><p className="text-sm leading-relaxed text-slate-300">Confira o registro. Ao confirmar, ele receberá um ID local sequencial e aparecerá na lista de observações.</p></div>
              <div className="divide-y divide-slate-800 rounded-xl border border-slate-800 bg-slate-950/50">
                <ReviewRow label="Título" value={draft.title} />
                <ReviewRow label="Data" value={draft.date} />
                <ReviewRow label="Local" value={draft.location} />
                <ReviewRow label="Domínio" value={draft.domain} />
                <ReviewRow label="Qualidade" value={qualityLabel ? `${draft.quality} — ${qualityLabel}` : draft.quality} />
                <ReviewRow label="Descrição" value={draft.rawDescription} multiline />
                <ReviewRow label="Resultado" value={draft.observedResult} multiline />
                <ReviewRow label="Questões" value={draft.openQuestions} multiline />
              </div>
            </div>
          )}
        </section>
      </main>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-800 bg-slate-950/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md">
        <div className="mx-auto flex max-w-2xl items-center gap-2 px-4 py-3">
          {step > 1 ? <Button type="button" variant="outline" onClick={() => goToStep(step - 1)} className="min-h-12 min-w-12 border-slate-700 px-3 text-slate-300" aria-label="Etapa anterior"><ChevronLeft className="h-5 w-5" /><span className="hidden sm:inline">Voltar</span></Button> : <Button type="button" variant="outline" onClick={handleGoBack} className="min-h-12 min-w-12 border-slate-700 px-3 text-slate-300" aria-label="Voltar para a vitrine"><ArrowLeft className="h-5 w-5" /></Button>}
          <Button type="button" variant="ghost" onClick={handleManualSave} className="min-h-12 px-3 text-slate-400 hover:text-emerald-300" aria-label="Salvar rascunho"><Save className="h-4 w-4" /><span className="hidden sm:inline">Salvar</span></Button>
          <Button type="button" variant="ghost" onClick={handleClearDraft} className="min-h-12 px-3 text-slate-500 hover:text-red-300" aria-label="Limpar rascunho"><Trash2 className="h-4 w-4" /><span className="hidden sm:inline">Limpar</span></Button>
          <div className="flex-1" />
          {step < STEPS.length ? <Button type="button" onClick={() => goToStep(step + 1)} className="min-h-12 px-5 bg-emerald-500 text-slate-950 hover:bg-emerald-400">Próxima etapa<ArrowRight className="ml-2 h-4 w-4" /></Button> : <Button type="button" onClick={handleRegisterObservation} className="min-h-12 px-5 bg-cyan-400 font-semibold text-slate-950 hover:bg-cyan-300">Registrar<CheckCircle2 className="ml-2 h-4 w-4" /></Button>}
        </div>
      </div>
    </div>
  );
}

function ReviewRow({ label, value, multiline = false }: { label: string; value: string; multiline?: boolean }) {
  return <div className="px-4 py-3"><dt className="text-[11px] font-medium uppercase tracking-wide text-slate-500">{label}</dt><dd className={`mt-1 text-sm text-slate-200 ${multiline ? "whitespace-pre-wrap leading-relaxed" : "break-words"}`}>{value || <span className="text-slate-600">Não preenchido</span>}</dd></div>;
}
