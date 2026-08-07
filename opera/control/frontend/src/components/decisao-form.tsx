import { useState, useMemo } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { upsertDecisao } from "@/lib/tdo/decisoes.functions";
import { CENARIOS, type CenarioConfig, type CampoMDEO } from "@/lib/tdo/mdeo-schemas";
import { calcMDEO, formatBRL } from "@/lib/tdo/calculos";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { TrendingUp, TrendingDown, AlertCircle } from "lucide-react";

type Valores = Record<string, number>;

export function DecisaoForm({ cenario }: { cenario: CenarioConfig }) {
  const qc = useQueryClient();
  const save = useServerFn(upsertDecisao);

  const [titulo, setTitulo] = useState("");
  const [horizonte, setHorizonte] = useState(12);
  const [investimento, setInvestimento] = useState(0);
  const [status, setStatus] = useState<"rascunho" | "aprovada" | "descartada">("rascunho");
  const [observacoes, setObservacoes] = useState("");

  const initial = (campos: CampoMDEO[]): Valores =>
    Object.fromEntries(campos.map((c) => [c.key, 0]));

  const [premissas, setPremissas] = useState<Valores>(() => initial(cenario.premissas));
  const [custosA, setCustosA] = useState<Valores>(() => initial(cenario.custosA));
  const [custosB, setCustosB] = useState<Valores>(() => initial(cenario.custosB));

  const resultado = useMemo(
    () => calcMDEO({ custosA, custosB, investimentoInicialA: investimento, horizonteMeses: horizonte }),
    [custosA, custosB, investimento, horizonte],
  );

  const saveMut = useMutation({
    mutationFn: async () => {
      if (!titulo.trim()) throw new Error("Informe um título.");
      return save({ data: {
        cenario: cenario.id,
        titulo,
        horizonte_meses: horizonte,
        premissas,
        custos_a: custosA,
        custos_b: custosB,
        investimento_inicial_a: investimento,
        status,
        observacoes: observacoes || null,
      } as never });
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["decisoes"] });
      qc.invalidateQueries({ queryKey: ["capital-preservado"] });
      toast.success("Decisão salva.");
      setTitulo(""); setObservacoes("");
      setPremissas(initial(cenario.premissas));
      setCustosA(initial(cenario.custosA));
      setCustosB(initial(cenario.custosB));
      setInvestimento(0);
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <div className="grid gap-5 lg:grid-cols-3">
      <div className="lg:col-span-2 space-y-4">
        <Card className="p-4 sm:p-5 space-y-4">
          <div>
            <h3 className="font-semibold">{cenario.nome}</h3>
            <p className="text-sm text-muted-foreground">{cenario.pergunta}</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Título da decisão *</Label>
              <Input value={titulo} onChange={(e) => setTitulo(e.target.value)} placeholder="Ex.: Betoneira obra X — 2026" />
            </div>
            <div className="space-y-1.5">
              <Label>Horizonte (meses) *</Label>
              <Input type="number" inputMode="numeric" min={1} max={360} value={horizonte}
                onChange={(e) => setHorizonte(Math.max(1, Number(e.target.value) || 1))} />
            </div>
          </div>
          {cenario.premissas.length > 0 && (
            <div>
              <Label className="text-xs uppercase tracking-wide text-muted-foreground">Premissas</Label>
              <div className="grid sm:grid-cols-2 gap-3 mt-2">
                {cenario.premissas.map((c) => (
                  <CampoInput key={c.key} campo={c} value={premissas[c.key] ?? 0}
                    onChange={(v) => setPremissas((p) => ({ ...p, [c.key]: v }))} />
                ))}
              </div>
            </div>
          )}
        </Card>

        <Card className="p-4 sm:p-5 space-y-3 border-primary/20">
          <h3 className="font-semibold flex items-center gap-2">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground text-xs font-bold">A</span>
            Opção A — {cenario.rotuloA}
          </h3>
          {cenario.temInvestimentoA && (
            <div className="space-y-1.5">
              <Label>Investimento inicial (R$)</Label>
              <Input type="number" inputMode="decimal" step="0.01" value={investimento}
                onChange={(e) => setInvestimento(Math.max(0, Number(e.target.value) || 0))} />
              <p className="text-[11px] text-muted-foreground">Capital desembolsado no início para a Opção A (compra, treinamento, montagem etc.).</p>
            </div>
          )}
          <div className="grid sm:grid-cols-2 gap-3">
            {cenario.custosA.map((c) => (
              <CampoInput key={c.key} campo={c} value={custosA[c.key] ?? 0}
                onChange={(v) => setCustosA((p) => ({ ...p, [c.key]: v }))} />
            ))}
          </div>
        </Card>

        <Card className="p-4 sm:p-5 space-y-3 border-muted">
          <h3 className="font-semibold flex items-center gap-2">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-muted text-foreground text-xs font-bold">B</span>
            Opção B — {cenario.rotuloB}
          </h3>
          <div className="grid sm:grid-cols-2 gap-3">
            {cenario.custosB.map((c) => (
              <CampoInput key={c.key} campo={c} value={custosB[c.key] ?? 0}
                onChange={(v) => setCustosB((p) => ({ ...p, [c.key]: v }))} />
            ))}
          </div>
        </Card>

        <Card className="p-4 sm:p-5 space-y-3">
          <h3 className="font-semibold">Status e observações</h3>
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label>Status</Label>
              <Select value={status} onValueChange={(v) => setStatus(v as typeof status)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="rascunho">Rascunho</SelectItem>
                  <SelectItem value="aprovada">Aprovada (contabiliza no Capital Preservado)</SelectItem>
                  <SelectItem value="descartada">Descartada</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-1.5">
            <Label>Observações</Label>
            <Textarea rows={3} value={observacoes} onChange={(e) => setObservacoes(e.target.value)} />
          </div>
        </Card>
      </div>

      <div className="space-y-3">
        <Card className="p-4 sm:p-5 sticky top-24 space-y-3">
          <h3 className="font-semibold">Resultado ao vivo</h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <Metric label="CCT Opção A" value={formatBRL(resultado.cctA)} sub={cenario.rotuloA} />
            <Metric label="CCT Opção B" value={formatBRL(resultado.cctB)} sub={cenario.rotuloB} />
          </div>
          <div className="rounded-lg border bg-muted/30 p-3 space-y-2">
            <Recomendacao rec={resultado.recomendacao} cenario={cenario} epi={resultado.epi} />
            <div className="grid grid-cols-3 gap-2 text-xs">
              <Metric small label="EPI" value={formatBRL(resultado.epi)} />
              <Metric small label="Payback" value={resultado.paybackMeses != null ? `${resultado.paybackMeses.toFixed(1)} m` : "—"} />
              <Metric small label="ROC" value={resultado.roc != null ? `${(resultado.roc * 100).toFixed(0)}%` : "—"} />
            </div>
          </div>
          <Button className="w-full" disabled={saveMut.isPending} onClick={() => saveMut.mutate()}>
            {saveMut.isPending ? "Salvando…" : "Salvar decisão"}
          </Button>
          <p className="text-[11px] text-muted-foreground text-center">
            Use sufixos no nome do campo: <code>_mensal</code>, <code>_anual</code> ou <code>_unico</code>. O motor projeta no horizonte automaticamente.
          </p>
        </Card>
      </div>
    </div>
  );
}

function CampoInput({ campo, value, onChange }: { campo: CampoMDEO; value: number; onChange: (v: number) => void }) {
  return (
    <div className="space-y-1">
      <Label className="text-xs">{campo.label}</Label>
      <Input
        type="number"
        inputMode="decimal"
        step={campo.tipo === "inteiro" ? "1" : "0.01"}
        value={value}
        onChange={(e) => onChange(Number(e.target.value) || 0)}
      />
      {campo.ajuda && <p className="text-[10px] text-muted-foreground">{campo.ajuda}</p>}
    </div>
  );
}

function Metric({ label, value, sub, small }: { label: string; value: string; sub?: string; small?: boolean }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-wide text-muted-foreground">{label}</div>
      <div className={`num font-semibold tracking-tight ${small ? "text-sm" : "text-base"}`}>{value}</div>
      {sub && <div className="text-[10px] text-muted-foreground truncate">{sub}</div>}
    </div>
  );
}

function Recomendacao({ rec, cenario, epi }: { rec: ReturnType<typeof calcMDEO>["recomendacao"]; cenario: CenarioConfig; epi: number }) {
  if (rec === "opcao_a") return (
    <div className="flex items-center gap-2 text-sm font-semibold text-ico-verde-fg">
      <TrendingUp className="h-4 w-4" /> Recomendação: {cenario.rotuloA} ({formatBRL(epi)} preservados)
    </div>
  );
  if (rec === "opcao_b") return (
    <div className="flex items-center gap-2 text-sm font-semibold text-ico-laranja-fg">
      <TrendingDown className="h-4 w-4" /> Recomendação: {cenario.rotuloB} ({formatBRL(Math.abs(epi))} a mais com A)
    </div>
  );
  return (
    <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
      <AlertCircle className="h-4 w-4" /> Margem &lt; 10%. Revisar premissas.
    </div>
  );
}

// Re-export for the route page to lookup
export { CENARIOS };
