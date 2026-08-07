import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Plus, Pencil, Trash2, FlaskConical } from "lucide-react";
import {
  listObrasPesquisa,
  createObraPesquisa,
  updateObraPesquisa,
  deleteObraPesquisa,
} from "@/lib/tdo/pesquisa.functions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_authenticated/pesquisa")({
  head: () => ({
    meta: [{ title: "Pesquisa de Campo — OPERA Control" }],
  }),
  component: PesquisaPage,
  errorComponent: ({ error }) => (
    <div className="p-6 text-sm text-red-400">Erro: {error.message}</div>
  ),
  notFoundComponent: () => <div className="p-6 text-sm">Não encontrado.</div>,
});

type Obra = {
  id: string;
  nome: string;
  grupo: "piloto" | "controle";
  status: "ativa" | "finalizada" | "desistente";
  data_inicio: string;
  observacoes: string | null;
  created_at: string;
};

const grupoStyle: Record<string, string> = {
  piloto: "bg-cyan-500/15 text-cyan-300 border-cyan-500/40",
  controle: "bg-slate-500/15 text-slate-300 border-slate-500/40",
};
const statusStyle: Record<string, string> = {
  ativa: "bg-emerald-500/15 text-emerald-300 border-emerald-500/40",
  finalizada: "bg-blue-500/15 text-blue-300 border-blue-500/40",
  desistente: "bg-orange-500/15 text-orange-300 border-orange-500/40",
};

function PesquisaPage() {
  const listFn = useServerFn(listObrasPesquisa);
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["obras_pesquisa"],
    queryFn: () => listFn(),
  });

  const obras = (data ?? []) as Obra[];
  const invalidate = () => qc.invalidateQueries({ queryKey: ["obras_pesquisa"] });

  const piloto = obras.filter((o) => o.grupo === "piloto").length;
  const controle = obras.filter((o) => o.grupo === "controle").length;

  return (
    <div className="space-y-5">
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold flex items-center gap-2">
            <FlaskConical className="h-5 w-5 text-cyan-400" />
            Pesquisa de Campo
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            10 obras · {piloto} piloto · {controle} controle
          </p>
        </div>
        <NovaObraDialog onSaved={invalidate} />
      </header>

      {isLoading ? (
        <div className="text-sm text-slate-400">Carregando…</div>
      ) : obras.length === 0 ? (
        <Card className="p-8 text-center bg-white/[0.02] border-white/10">
          <p className="text-sm text-slate-400">
            Nenhuma obra cadastrada. Clique em <b>Nova obra</b> para começar.
          </p>
        </Card>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {obras.map((o) => (
            <ObraCard key={o.id} obra={o} onChanged={invalidate} />
          ))}
        </div>
      )}
    </div>
  );
}

function ObraCard({ obra, onChanged }: { obra: Obra; onChanged: () => void }) {
  return (
    <Card className="p-4 bg-white/[0.03] border-white/10 space-y-3">
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-semibold text-slate-100 leading-tight">{obra.nome}</h3>
        <EditarObraDialog obra={obra} onSaved={onChanged} />
      </div>
      <div className="flex flex-wrap gap-1.5">
        <Badge variant="outline" className={cn("capitalize", grupoStyle[obra.grupo])}>
          {obra.grupo}
        </Badge>
        <Badge variant="outline" className={cn("capitalize", statusStyle[obra.status])}>
          {obra.status}
        </Badge>
      </div>
      <div className="text-xs text-slate-400">
        Início: {new Date(obra.data_inicio + "T00:00:00").toLocaleDateString("pt-BR")}
      </div>
      {obra.observacoes && (
        <p className="text-xs text-slate-400 whitespace-pre-wrap border-t border-white/5 pt-2">
          {obra.observacoes}
        </p>
      )}
    </Card>
  );
}

function NovaObraDialog({ onSaved }: { onSaved: () => void }) {
  const [open, setOpen] = useState(false);
  const [nome, setNome] = useState("");
  const [grupo, setGrupo] = useState<"piloto" | "controle">("piloto");
  const [status, setStatus] = useState<"ativa" | "finalizada" | "desistente">("ativa");
  const [dataInicio, setDataInicio] = useState("2026-08-03");
  const [obs, setObs] = useState("");

  const createFn = useServerFn(createObraPesquisa);
  const mut = useMutation({
    mutationFn: () =>
      createFn({
        data: {
          nome,
          grupo,
          status,
          data_inicio: dataInicio,
          observacoes: obs || null,
        },
      }),
    onSuccess: () => {
      toast.success("Obra cadastrada");
      setOpen(false);
      setNome("");
      setObs("");
      setGrupo("piloto");
      setStatus("ativa");
      setDataInicio("2026-08-03");
      onSaved();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="gap-1.5">
          <Plus className="h-4 w-4" /> Nova obra
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Nova obra</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <div>
            <Label>Nome</Label>
            <Input value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Ex.: Obra Alfa" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>Grupo</Label>
              <Select value={grupo} onValueChange={(v) => setGrupo(v as "piloto" | "controle")}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="piloto">Piloto</SelectItem>
                  <SelectItem value="controle">Controle</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Status</Label>
              <Select value={status} onValueChange={(v) => setStatus(v as typeof status)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="ativa">Ativa</SelectItem>
                  <SelectItem value="finalizada">Finalizada</SelectItem>
                  <SelectItem value="desistente">Desistente</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <Label>Data de início</Label>
            <Input type="date" value={dataInicio} onChange={(e) => setDataInicio(e.target.value)} />
          </div>
          <div>
            <Label>Observações</Label>
            <Textarea value={obs} onChange={(e) => setObs(e.target.value)} rows={3} />
          </div>
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={() => setOpen(false)}>Cancelar</Button>
          <Button onClick={() => mut.mutate()} disabled={!nome || mut.isPending}>
            {mut.isPending ? "Salvando…" : "Salvar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function EditarObraDialog({ obra, onSaved }: { obra: Obra; onSaved: () => void }) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState(obra.status);
  const [obs, setObs] = useState(obra.observacoes ?? "");

  const updateFn = useServerFn(updateObraPesquisa);
  const deleteFn = useServerFn(deleteObraPesquisa);

  const save = useMutation({
    mutationFn: () =>
      updateFn({ data: { id: obra.id, status, observacoes: obs || null } }),
    onSuccess: () => {
      toast.success("Obra atualizada");
      setOpen(false);
      onSaved();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const del = useMutation({
    mutationFn: () => deleteFn({ data: { id: obra.id } }),
    onSuccess: () => {
      toast.success("Obra removida");
      setOpen(false);
      onSaved();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="icon" variant="ghost" className="h-8 w-8 shrink-0" aria-label="Editar">
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Editar {obra.nome}</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <div>
            <Label>Status</Label>
            <Select value={status} onValueChange={(v) => setStatus(v as typeof status)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="ativa">Ativa</SelectItem>
                <SelectItem value="finalizada">Finalizada</SelectItem>
                <SelectItem value="desistente">Desistente</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Observações</Label>
            <Textarea value={obs} onChange={(e) => setObs(e.target.value)} rows={4} />
          </div>
        </div>
        <DialogFooter className="flex-row justify-between sm:justify-between">
          <Button
            variant="ghost"
            className="text-red-400 hover:text-red-300 hover:bg-red-500/10 gap-1.5"
            onClick={() => {
              if (confirm("Remover esta obra?")) del.mutate();
            }}
            disabled={del.isPending}
          >
            <Trash2 className="h-4 w-4" /> Excluir
          </Button>
          <div className="flex gap-2">
            <Button variant="ghost" onClick={() => setOpen(false)}>Cancelar</Button>
            <Button onClick={() => save.mutate()} disabled={save.isPending}>
              {save.isPending ? "Salvando…" : "Salvar"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
