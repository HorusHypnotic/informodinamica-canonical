import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useNavigate } from "@tanstack/react-router";
import { upsertCausa } from "@/lib/tdo/causas.functions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

const CATS = ["processo", "pessoas", "fornecedor", "projeto", "gestao", "comunicacao", "outros"] as const;
const CRITS = ["baixa", "media", "alta", "critica"] as const;
const STATUS = ["ativa", "monitorando", "resolvida", "arquivada"] as const;

const CAT_LABEL: Record<(typeof CATS)[number], string> = {
  processo: "Processo", pessoas: "Pessoas", fornecedor: "Fornecedor",
  projeto: "Projeto", gestao: "Gestão", comunicacao: "Comunicação", outros: "Outros",
};
const CRIT_LABEL: Record<(typeof CRITS)[number], string> = {
  baixa: "Baixa", media: "Média", alta: "Alta", critica: "Crítica",
};
const STATUS_LABEL: Record<(typeof STATUS)[number], string> = {
  ativa: "Ativa", monitorando: "Monitorando", resolvida: "Resolvida", arquivada: "Arquivada",
};

const schema = z.object({
  id: z.string().uuid().optional(),
  nome: z.string().min(1, "Obrigatório").max(200),
  descricao: z.string().max(2000).optional().nullable(),
  categoria: z.enum(CATS),
  criticidade: z.enum(CRITS),
  status: z.enum(STATUS),
});
export type CausaValues = z.infer<typeof schema>;

export function CausaForm({ initial }: { initial?: Partial<CausaValues> & { id?: string } }) {
  const save = useServerFn(upsertCausa);
  const qc = useQueryClient();
  const navigate = useNavigate();

  const { register, handleSubmit, control, formState: { errors, isSubmitting } } =
    useForm<CausaValues>({
      resolver: zodResolver(schema),
      defaultValues: {
        nome: "", descricao: "", categoria: "outros", criticidade: "media", status: "ativa",
        ...initial,
      },
    });

  const mut = useMutation({
    mutationFn: (v: CausaValues) => save({ data: { ...v, descricao: v.descricao || null } as never }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["causas"] });
      toast.success("Causa salva.");
      navigate({ to: "/causas" });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <form onSubmit={handleSubmit((v) => mut.mutate(v))} className="max-w-2xl">
      <Card className="p-4 sm:p-5 space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="nome">Nome *</Label>
          <Input id="nome" {...register("nome")} />
          {errors.nome && <p className="text-xs text-destructive">{errors.nome.message}</p>}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="descricao">Descrição</Label>
          <Textarea id="descricao" rows={4} {...register("descricao")} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Controller control={control} name="categoria" render={({ field }) => (
            <div className="space-y-1.5">
              <Label>Categoria</Label>
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{CATS.map((c) => <SelectItem key={c} value={c}>{CAT_LABEL[c]}</SelectItem>)}</SelectContent>
              </Select>
            </div>
          )} />
          <Controller control={control} name="criticidade" render={({ field }) => (
            <div className="space-y-1.5">
              <Label>Criticidade</Label>
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{CRITS.map((c) => <SelectItem key={c} value={c}>{CRIT_LABEL[c]}</SelectItem>)}</SelectContent>
              </Select>
            </div>
          )} />
          <Controller control={control} name="status" render={({ field }) => (
            <div className="space-y-1.5">
              <Label>Status</Label>
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{STATUS.map((c) => <SelectItem key={c} value={c}>{STATUS_LABEL[c]}</SelectItem>)}</SelectContent>
              </Select>
            </div>
          )} />
        </div>
      </Card>
      <div className="mt-4 flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={() => navigate({ to: "/causas" })}>Cancelar</Button>
        <Button type="submit" disabled={isSubmitting || mut.isPending}>Salvar</Button>
      </div>
    </form>
  );
}
