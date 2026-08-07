import { useState } from "react";
import { useMutation, useQuery, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import {
  listRecomendacoesByCausa, listImplementacoesByCausa,
  marcarRecomendacaoImplementada, registrarResultadoImplementacao,
} from "@/lib/tdo/recomendacoes.functions";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { CheckCircle2, Clock, Wrench, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface Rec { id: string; prazo: "curto"|"medio"|"estruturante"; acao: string; prazo_dias: number | null }
interface Impl { id: string; recomendacao_id: string; implementada_em: string; ico_antes: number | null; ico_depois: number | null }

const PRAZO_META = {
  curto:        { label: "Imediato",     hint: "≤ 7 dias",   icon: Clock,    tone: "border-l-ico-laranja-fg" },
  medio:        { label: "Médio prazo",  hint: "≤ 30 dias",  icon: Wrench,   tone: "border-l-ico-amarelo-fg" },
  estruturante: { label: "Estruturante", hint: "Sem prazo",  icon: Sparkles, tone: "border-l-ico-verde-fg" },
} as const;

export function RecomendacoesPanel({ causaId, icoAtual }: { causaId: string; icoAtual?: number }) {
  const fetchRecs = useServerFn(listRecomendacoesByCausa);
  const fetchImpl = useServerFn(listImplementacoesByCausa);

  const { data: recs } = useSuspenseQuery<Rec[]>({
    queryKey: ["recomendacoes", causaId],
    queryFn: () => fetchRecs({ data: { causaId } }),
  });
  const { data: impls = [] } = useQuery<Impl[]>({
    queryKey: ["recomendacoes-impl", causaId],
    queryFn: () => fetchImpl({ data: { causaId } }),
  });

  const implementadasIds = new Set(impls.map((i) => i.recomendacao_id));

  const grupos = { curto: [] as Rec[], medio: [] as Rec[], estruturante: [] as Rec[] };
  for (const r of recs) grupos[r.prazo].push(r);

  return (
    <Card className="p-4 sm:p-5 space-y-4">
      <div>
        <h3 className="font-semibold">Ações recomendadas (Biblioteca OPERA)</h3>
        <p className="text-sm text-muted-foreground">Marque como implementada para medir a redução de ICO (campo) depois.</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        {(["curto","medio","estruturante"] as const).map((p) => {
          const meta = PRAZO_META[p];
          const Icon = meta.icon;
          return (
            <Card key={p} className={cn("p-3 border-l-4", meta.tone)}>
              <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase">
                <Icon className="h-3.5 w-3.5" /> {meta.label} <span className="font-normal normal-case">· {meta.hint}</span>
              </div>
              <ul className="mt-2 space-y-2">
                {grupos[p].length === 0 && <li className="text-xs text-muted-foreground">—</li>}
                {grupos[p].map((r) => (
                  <RecItem
                    key={r.id}
                    rec={r}
                    causaId={causaId}
                    implementada={implementadasIds.has(r.id)}
                    icoAtual={icoAtual}
                  />
                ))}
              </ul>
            </Card>
          );
        })}
      </div>

      {impls.length > 0 && (
        <div>
          <h4 className="text-xs font-semibold uppercase text-muted-foreground mt-2">Histórico de implementações</h4>
          <div className="mt-2 divide-y divide-border/60">
            {impls.map((i) => <ImplRow key={i.id} impl={i} causaId={causaId} icoAtual={icoAtual} />)}
          </div>
        </div>
      )}
    </Card>
  );
}

function RecItem({
  rec, causaId, implementada, icoAtual,
}: { rec: Rec; causaId: string; implementada: boolean; icoAtual?: number }) {
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const [icoAntes, setIcoAntes] = useState<string>(icoAtual?.toString() ?? "");
  const marcar = useServerFn(marcarRecomendacaoImplementada);

  const mut = useMutation({
    mutationFn: () => marcar({ data: {
      recomendacaoId: rec.id,
      causaRaizId: causaId,
      icoAntes: icoAntes ? Number(icoAntes) : null,
    } }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["recomendacoes-impl", causaId] });
      toast.success("Marcado como implementada.");
      setOpen(false);
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <li className="text-sm flex items-start gap-2">
      <span className="flex-1">{rec.acao}</span>
      {implementada ? (
        <span className="inline-flex items-center gap-1 text-[11px] text-ico-verde-fg shrink-0">
          <CheckCircle2 className="h-3.5 w-3.5" /> Feito
        </span>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="text-[11px] text-primary hover:underline shrink-0"
        >
          Implementar
        </button>
      )}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Marcar como implementada</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">{rec.acao}</p>
          <div className="space-y-1.5">
            <Label htmlFor={`ico-antes-${rec.id}`}>ICO (campo) médio atual (antes)</Label>
            <Input
              id={`ico-antes-${rec.id}`} type="number" inputMode="numeric"
              value={icoAntes} onChange={(e) => setIcoAntes(e.target.value)}
              placeholder="Ex.: 45"
            />
            <p className="text-xs text-muted-foreground">
              Usado para comparar depois e medir a redução.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
            <Button onClick={() => mut.mutate()} disabled={mut.isPending}>Confirmar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </li>
  );
}

function ImplRow({ impl, causaId, icoAtual }: { impl: Impl; causaId: string; icoAtual?: number }) {
  const qc = useQueryClient();
  const registrar = useServerFn(registrarResultadoImplementacao);
  const mut = useMutation({
    mutationFn: (val: number) => registrar({ data: { id: impl.id, icoDepois: val } }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["recomendacoes-impl", causaId] });
      toast.success("Resultado registrado.");
    },
  });

  const reducao =
    impl.ico_antes != null && impl.ico_depois != null
      ? impl.ico_antes - impl.ico_depois
      : null;

  return (
    <div className="flex items-center justify-between gap-3 py-2 text-sm">
      <div className="min-w-0">
        <div className="text-xs text-muted-foreground">
          {new Date(impl.implementada_em).toLocaleDateString("pt-BR")}
        </div>
        <div className="text-xs">
          ICO (campo) antes: <span className="num font-medium">{impl.ico_antes ?? "—"}</span>
          {" · "}
          depois: <span className="num font-medium">{impl.ico_depois ?? "—"}</span>
          {reducao != null && (
            <span className={cn("ml-2 font-semibold", reducao > 0 ? "text-ico-verde-fg" : "text-ico-laranja-fg")}>
              {reducao > 0 ? "↓" : "↑"} {Math.abs(reducao).toFixed(0)}
            </span>
          )}
        </div>
      </div>
      {impl.ico_depois == null && icoAtual != null && (
        <Button size="sm" variant="outline" onClick={() => mut.mutate(icoAtual)} disabled={mut.isPending}>
          Registrar ICO (campo) atual ({icoAtual})
        </Button>
      )}
    </div>
  );
}
