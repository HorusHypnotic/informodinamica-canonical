import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useNavigate } from "@tanstack/react-router";
import { upsertEco, deleteEco } from "@/lib/tdo/ecos.functions";
import { listCausas } from "@/lib/tdo/causas.functions";
import { listDecisoes } from "@/lib/tdo/decisoes.functions";
import { listPadroes } from "@/lib/tdo/padroes.functions";
import { inferirPorCausa, inferirPorEco } from "@/lib/tdo/inferencia";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { IcoPanel } from "@/components/ico-badge";
import { BookOpen, Check, X, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const CATEGORIAS: { v: string; label: string }[] = [
  { v: "retrabalho", label: "Retrabalho" },
  { v: "compra_emergencial", label: "Compra emergencial" },
  { v: "atraso", label: "Atraso" },
  { v: "falha_comunicacao", label: "Falha de comunicação" },
  { v: "falta_material", label: "Falta de material" },
  { v: "equipamento_parado", label: "Equipamento parado" },
  { v: "erro_execucao", label: "Erro de execução" },
  { v: "erro_projeto", label: "Erro de projeto" },
  { v: "aprovacao_lenta", label: "Aprovação lenta" },
  { v: "outros", label: "Outros" },
];

const DOMINIOS = [
  { v: "projeto", label: "Projeto" }, { v: "suprimentos", label: "Suprimentos" },
  { v: "execucao", label: "Execução" }, { v: "gestao", label: "Gestão" },
  { v: "cliente", label: "Cliente" }, { v: "ambiente", label: "Ambiente" },
  { v: "financeiro", label: "Financeiro" }, { v: "compliance", label: "Compliance" },
] as const;
const MECANISMOS = [
  { v: "tempo", label: "Tempo" }, { v: "informacao", label: "Informação" },
  { v: "capital", label: "Capital" }, { v: "material", label: "Material" },
  { v: "equipamento", label: "Equipamento" }, { v: "comunicacao", label: "Comunicação" },
  { v: "qualidade", label: "Qualidade" }, { v: "mao_de_obra", label: "Mão de obra" },
] as const;
const CONSEQUENCIAS = [
  { v: "atraso", label: "Atraso" }, { v: "retrabalho", label: "Retrabalho" },
  { v: "desperdicio", label: "Desperdício" }, { v: "ociosidade", label: "Ociosidade" },
  { v: "compra_emergencial", label: "Compra emergencial" }, { v: "multa", label: "Multa" },
  { v: "paralisacao", label: "Paralisação" }, { v: "perda_de_margem", label: "Perda de margem" },
] as const;

const schema = z.object({
  id: z.string().uuid().optional(),
  titulo: z.string().min(1, "Obrigatório").max(300),
  data_evento: z.string().min(1),
  causa_raiz_id: z.string().uuid().nullable().optional(),
  categoria: z.enum(CATEGORIAS.map((c) => c.v) as [string, ...string[]]),
  valor_prejuizo: z.coerce.number().min(0),
  data_inicio_causa: z.string().nullable().optional(),
  responsavel: z.string().max(200).nullable().optional(),
  descricao: z.string().max(4000).nullable().optional(),
  observacoes: z.string().max(2000).nullable().optional(),
  impacto: z.coerce.number().int().min(1).max(5),
  recorrencia: z.coerce.number().int().min(1).max(5),
  persistencia: z.coerce.number().int().min(1).max(5),
  dominio: z.enum(DOMINIOS.map((d) => d.v) as [string, ...string[]]).nullable().optional(),
  mecanismo: z.enum(MECANISMOS.map((m) => m.v) as [string, ...string[]]).nullable().optional(),
  consequencia: z.enum(CONSEQUENCIAS.map((c) => c.v) as [string, ...string[]]).nullable().optional(),
  decisao_mdeo_id: z.string().uuid().nullable().optional(),
  padrao_codigo: z.string().max(20).nullable().optional(),
});

export type EcoFormValues = z.infer<typeof schema>;

const DICAS = {
  impacto: [
    "1 — < R$ 500", "2 — R$ 500-2k", "3 — R$ 2k-10k", "4 — R$ 10k-50k", "5 — > R$ 50k",
  ],
  recorrencia: [
    "1 — 1 vez (3 meses)", "2 — 2-3 vezes", "3 — 4-6 vezes", "4 — 7-10 vezes", "5 — > 10 vezes",
  ],
  persistencia: [
    "1 — < 1 semana", "2 — 1 sem a 1 mês", "3 — 1-6 meses", "4 — 6-12 meses", "5 — > 1 ano",
  ],
};

export function EcoForm({ initial }: { initial?: Partial<EcoFormValues> & { id?: string } }) {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const fetchCausas = useServerFn(listCausas);
  const fetchDecisoes = useServerFn(listDecisoes);
  const fetchPadroes = useServerFn(listPadroes);
  const save = useServerFn(upsertEco);
  const del = useServerFn(deleteEco);

  const { data: causas = [] } = useQuery({ queryKey: ["causas"], queryFn: () => fetchCausas() });
  const { data: decisoes = [] } = useQuery({ queryKey: ["decisoes"], queryFn: () => fetchDecisoes() });
  const { data: padroes = [] } = useQuery({ queryKey: ["padroes"], queryFn: () => fetchPadroes() });

  const today = new Date().toISOString().slice(0, 10);

  const { register, handleSubmit, control, watch, setValue, getValues, formState: { errors, isSubmitting } } =
    useForm<EcoFormValues>({
      resolver: zodResolver(schema),
      defaultValues: {
        titulo: "",
        data_evento: today,
        causa_raiz_id: null,
        categoria: "retrabalho",
        valor_prejuizo: 0,
        impacto: 1,
        recorrencia: 1,
        persistencia: 1,
        decisao_mdeo_id: null,
        padrao_codigo: null,
        ...initial,
      },
    });

  const i = Number(watch("impacto")) || 1;
  const r = Number(watch("recorrencia")) || 1;
  const p = Number(watch("persistencia")) || 1;
  const icoLive = i * r * p;

  // Auto-preenche domínio/consequência ao escolher causa raiz ou trocar categoria.
  const watchedCausa = watch("causa_raiz_id");
  const watchedCategoria = watch("categoria");
  useEffect(() => {
    const v = getValues();
    const causa = causas.find((c) => c.id === watchedCausa);
    const inferido = inferirPorCausa(causa?.categoria) ?? inferirPorEco(watchedCategoria);
    if (!inferido) return;
    if (!v.dominio) setValue("dominio", inferido.dominio, { shouldDirty: false });
    if (!v.consequencia) setValue("consequencia", inferido.consequencia, { shouldDirty: false });
  }, [watchedCausa, watchedCategoria, causas, getValues, setValue]);

  const saveMut = useMutation({
    mutationFn: async (values: EcoFormValues) => {
      return save({ data: {
        ...values,
        causa_raiz_id: values.causa_raiz_id || null,
        data_inicio_causa: values.data_inicio_causa || null,
        responsavel: values.responsavel || null,
        descricao: values.descricao || null,
        observacoes: values.observacoes || null,
        dominio: values.dominio || null,
        mecanismo: values.mecanismo || null,
        consequencia: values.consequencia || null,
        decisao_mdeo_id: values.decisao_mdeo_id || null,
        padrao_codigo: values.padrao_codigo || null,
      } as never });
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["ecos"] });
      toast.success("ECO salvo.");
      navigate({ to: "/ecos" });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const delMut = useMutation({
    mutationFn: () => del({ data: { id: initial!.id! } }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["ecos"] });
      toast.success("ECO removido.");
      navigate({ to: "/ecos" });
    },
  });

  return (
    <form onSubmit={handleSubmit((v) => saveMut.mutate(v))} className="grid gap-5 lg:grid-cols-3 pb-20 md:pb-0">
      <div className="lg:col-span-2 space-y-4 sm:space-y-5">
        {/* Preview ICO no topo, só mobile */}
        <div className="lg:hidden">
          <IcoPanel valor={icoLive} />
          <p className="mt-2 text-xs text-muted-foreground text-center num">
            {i} × {r} × {p} = {icoLive}
          </p>
        </div>

        <Controller
          control={control}
          name="padrao_codigo"
          render={({ field }) => (
            <PadraoSelector
              padroes={padroes}
              value={field.value ?? null}
              onSelect={(p) => {
                field.onChange(p.codigo);
                setValue("dominio", p.dominio, { shouldDirty: true });
                setValue("mecanismo", p.mecanismo, { shouldDirty: true });
                setValue("consequencia", p.consequencia, { shouldDirty: true });
              }}
              onClear={() => field.onChange(null)}
              currentCausaId={watch("causa_raiz_id")}
            />
          )}
        />

        <Card className="p-4 sm:p-5 space-y-4">
          <h3 className="font-semibold">Descrição do evento</h3>
          <div className="space-y-1.5">
            <Label htmlFor="titulo">Título *</Label>
            <Input id="titulo" {...register("titulo")} />
            {errors.titulo && <p className="text-xs text-destructive">{errors.titulo.message}</p>}
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="data_evento">Data do evento *</Label>
              <Input id="data_evento" type="date" {...register("data_evento")} />
            </div>
            <Controller
              control={control}
              name="categoria"
              render={({ field }) => (
                <div className="space-y-1.5">
                  <Label>Categoria</Label>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {CATEGORIAS.map((c) => <SelectItem key={c.v} value={c.v}>{c.label}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              )}
            />
          </div>
          <Controller
            control={control}
            name="causa_raiz_id"
            render={({ field }) => (
              <div className="space-y-1.5">
                <Label>Causa raiz</Label>
                <Select value={field.value ?? "__none__"} onValueChange={(v) => field.onChange(v === "__none__" ? null : v)}>
                  <SelectTrigger><SelectValue placeholder="Selecione uma causa" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="__none__">— Não vincular —</SelectItem>
                    {causas.map((c) => <SelectItem key={c.id} value={c.id}>{c.nome}</SelectItem>)}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Não encontrou? <a href="/causas/novo" className="text-primary hover:underline">Cadastrar nova causa</a>
                </p>
              </div>
            )}
          />
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="valor_prejuizo">Prejuízo (R$) *</Label>
              <Input id="valor_prejuizo" type="number" step="0.01" inputMode="decimal" {...register("valor_prejuizo")} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="data_inicio_causa">Quando a causa começou?</Label>
              <Input id="data_inicio_causa" type="date" {...register("data_inicio_causa")} />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="responsavel">Responsável</Label>
            <Input id="responsavel" {...register("responsavel")} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="descricao">Descrição</Label>
            <Textarea id="descricao" rows={3} {...register("descricao")} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="observacoes">Observações / Evidências</Label>
            <Textarea id="observacoes" rows={3} {...register("observacoes")} />
          </div>
        </Card>

        <Card className="p-4 sm:p-5 space-y-4 border-primary/20">
          <div>
            <h3 className="font-semibold">Pontuação ICO (campo)</h3>
            <p className="text-sm text-muted-foreground">Atribua nota de 1 a 5 para cada fator.</p>
          </div>
          <ScoreField label="Impacto" name="impacto" register={register} dicas={DICAS.impacto} />
          <ScoreField label="Recorrência" name="recorrencia" register={register} dicas={DICAS.recorrencia} />
          <ScoreField label="Persistência" name="persistencia" register={register} dicas={DICAS.persistencia} />
        </Card>

        <Card className="p-4 sm:p-5 space-y-4">
          <div>
            <h3 className="font-semibold">Classificação (4 camadas)</h3>
            <p className="text-sm text-muted-foreground">Opcional. Permite cruzar ICO (campo), IR e MC por domínio, mecanismo e consequência. Pré-preenchido pela causa raiz.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <TaxonomySelect control={control} name="dominio" label="Domínio" placeholder="Onde nasceu" options={DOMINIOS} />
            <TaxonomySelect control={control} name="mecanismo" label="Mecanismo" placeholder="Como ocorreu" options={MECANISMOS} />
            <TaxonomySelect control={control} name="consequencia" label="Consequência" placeholder="O que aconteceu" options={CONSEQUENCIAS} />
          </div>
        </Card>

        <Card className="p-4 sm:p-5 space-y-3">
          <div>
            <h3 className="font-semibold">Vínculo com decisão MDEO</h3>
            <p className="text-sm text-muted-foreground">Opcional. Marque se este ECO foi consequência de uma decisão econômica registrada.</p>
          </div>
          <Controller
            control={control}
            name="decisao_mdeo_id"
            render={({ field }) => (
              <Select value={field.value ?? "__none__"} onValueChange={(v) => field.onChange(v === "__none__" ? null : v)}>
                <SelectTrigger><SelectValue placeholder="Selecione uma decisão" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="__none__">— Não vincular —</SelectItem>
                  {decisoes.map((d) => (
                    <SelectItem key={d.id} value={d.id}>{d.titulo}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </Card>
      </div>

      <div className="space-y-4 hidden lg:block">
        <Card className="p-5 sticky top-24">
          <h3 className="font-semibold mb-3">Resultado ao vivo</h3>
          <IcoPanel valor={icoLive} />
          <p className="mt-3 text-xs text-muted-foreground text-center num">
            {i} × {r} × {p} = {icoLive}
          </p>
          <div className="mt-5 space-y-2">
            <Button type="submit" className="w-full" disabled={isSubmitting || saveMut.isPending}>
              {initial?.id ? "Salvar alterações" : "Registrar ECO"}
            </Button>
            {initial?.id && (
              <Button
                type="button"
                variant="outline"
                className="w-full text-destructive hover:text-destructive"
                onClick={() => { if (confirm("Excluir este ECO?")) delMut.mutate(); }}
                disabled={delMut.isPending}
              >
                Excluir
              </Button>
            )}
          </div>
        </Card>
      </div>

      {/* Sticky action bar — mobile */}
      <div className="lg:hidden fixed bottom-16 inset-x-0 z-30 border-t bg-background/95 backdrop-blur px-4 py-3 flex items-center gap-2 safe-bottom">
        <div className="flex-1 text-xs text-muted-foreground">
          ICO (campo): <span className="num font-semibold text-foreground">{icoLive}</span>
        </div>
        {initial?.id && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="text-destructive"
            onClick={() => { if (confirm("Excluir este ECO?")) delMut.mutate(); }}
            disabled={delMut.isPending}
          >
            Excluir
          </Button>
        )}
        <Button type="submit" size="sm" disabled={isSubmitting || saveMut.isPending}>
          {initial?.id ? "Salvar" : "Registrar"}
        </Button>
      </div>
    </form>
  );
}

function ScoreField({
  label, name, register, dicas,
}: {
  label: string;
  name: "impacto" | "recorrencia" | "persistencia";
  register: ReturnType<typeof useForm<EcoFormValues>>["register"];
  dicas: string[];
}) {
  return (
    <div className="space-y-1.5">
      <Label className="flex items-baseline justify-between">
        <span>{label}</span>
      </Label>
      <div className="grid grid-cols-5 gap-1.5">
        {[1, 2, 3, 4, 5].map((n) => (
          <label key={n} className="cursor-pointer">
            <input type="radio" value={n} {...register(name)} className="peer sr-only" />
            <div className="rounded-md border bg-background py-2.5 text-center text-sm font-medium peer-checked:bg-primary peer-checked:text-primary-foreground peer-checked:border-primary peer-focus-visible:ring-2 peer-focus-visible:ring-ring transition">
              {n}
            </div>
          </label>
        ))}
      </div>
      <p className="text-[11px] sm:text-xs text-muted-foreground leading-relaxed">{dicas.join(" · ")}</p>
    </div>
  );
}

function TaxonomySelect({
  control, name, label, placeholder, options,
}: {
  control: ReturnType<typeof useForm<EcoFormValues>>["control"];
  name: "dominio" | "mecanismo" | "consequencia";
  label: string;
  placeholder: string;
  options: readonly { v: string; label: string }[];
}) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <div className="space-y-1.5">
          <Label>{label}</Label>
          <Select
            value={field.value ?? "__none__"}
            onValueChange={(v) => field.onChange(v === "__none__" ? null : v)}
          >
            <SelectTrigger><SelectValue placeholder={placeholder} /></SelectTrigger>
            <SelectContent>
              <SelectItem value="__none__">— Não classificar —</SelectItem>
              {options.map((o) => <SelectItem key={o.v} value={o.v}>{o.label}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      )}
    />
  );
}

type Padrao = {
  codigo: string;
  nome: string;
  dominio: string;
  mecanismo: string;
  consequencia: string;
  fenomeno_universal: string;
  sugestao_causa_categoria: string;
  sugestao_causa_nome: string;
};

function PadraoSelector({
  padroes, value, onSelect, onClear, currentCausaId,
}: {
  padroes: Padrao[];
  value: string | null;
  onSelect: (p: Padrao) => void;
  onClear: () => void;
  currentCausaId?: string | null;
}) {
  const [open, setOpen] = useState(false);
  const selecionado = padroes.find((p) => p.codigo === value) ?? null;

  return (
    <Card className="p-4 sm:p-5 space-y-3 border-primary/20 bg-primary/5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="font-semibold flex items-center gap-1.5">
            <BookOpen className="h-4 w-4" /> Padrão OPERA <span className="text-xs font-normal text-muted-foreground">(opcional)</span>
          </h3>
          <p className="text-sm text-muted-foreground">
            Escolha um padrão da biblioteca para preencher domínio, mecanismo e consequência automaticamente.
          </p>
        </div>
        {selecionado && (
          <Button type="button" variant="ghost" size="sm" onClick={onClear} className="shrink-0">
            <X className="h-4 w-4 mr-1" /> Limpar
          </Button>
        )}
      </div>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button type="button" variant="outline" className="w-full justify-start font-normal">
            {selecionado ? (
              <span className="truncate">
                <span className="font-medium">{selecionado.codigo}</span> — {selecionado.nome}
              </span>
            ) : (
              <span className="text-muted-foreground">Buscar padrão por código ou nome…</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0 w-[--radix-popover-trigger-width] max-h-[400px]" align="start">
          <Command>
            <CommandInput placeholder="Ex: P001 ou compra emergencial…" />
            <CommandList>
              <CommandEmpty>Nenhum padrão encontrado.</CommandEmpty>
              <CommandGroup>
                {padroes.map((p) => (
                  <CommandItem
                    key={p.codigo}
                    value={`${p.codigo} ${p.nome} ${p.fenomeno_universal}`}
                    onSelect={() => { onSelect(p); setOpen(false); }}
                  >
                    <Check className={cn("mr-2 h-4 w-4", value === p.codigo ? "opacity-100" : "opacity-0")} />
                    <div className="flex flex-col min-w-0">
                      <span className="text-sm"><span className="font-medium">{p.codigo}</span> — {p.nome}</span>
                      <span className="text-xs text-muted-foreground truncate">{p.fenomeno_universal}</span>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {selecionado && (
        <div className="flex flex-wrap gap-1.5 pt-1">
          <Badge variant="secondary">Domínio: {selecionado.dominio}</Badge>
          <Badge variant="secondary">Mecanismo: {selecionado.mecanismo}</Badge>
          <Badge variant="secondary">Consequência: {selecionado.consequencia}</Badge>
        </div>
      )}

      {selecionado && !currentCausaId && (
        <div className="flex items-start gap-2 rounded-md border border-primary/30 bg-background p-2.5 text-sm">
          <Sparkles className="h-4 w-4 text-primary shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0">
            <p className="text-xs text-muted-foreground">Sugestão de causa raiz</p>
            <p className="truncate">"{selecionado.sugestao_causa_nome}" ({selecionado.sugestao_causa_categoria})</p>
          </div>
          <a
            href={`/causas/novo?nome=${encodeURIComponent(selecionado.sugestao_causa_nome)}&categoria=${selecionado.sugestao_causa_categoria}`}
            className="text-xs text-primary hover:underline whitespace-nowrap"
          >
            Criar causa →
          </a>
        </div>
      )}
    </Card>
  );
}
