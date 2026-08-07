import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { FlaskConical, Plus, Pencil } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type Grupo = "piloto" | "controle";
type Status = "ativa" | "finalizada" | "desistente";

interface ObraPesquisa {
  id: string;
  nome: string;
  dono_id: string;
  grupo: Grupo;
  status: Status;
  data_inicio: string;
  observacoes: string | null;
  created_at: string;
}

const statusColor: Record<Status, string> = {
  ativa: "bg-status-ok/15 text-status-ok",
  finalizada: "bg-primary/15 text-primary",
  desistente: "bg-status-critical/15 text-status-critical",
};

export default function PesquisaPage() {
  const { user } = useAuth();
  const qc = useQueryClient();
  const { toast } = useToast();
  const [createOpen, setCreateOpen] = useState(false);
  const [editing, setEditing] = useState<ObraPesquisa | null>(null);

  const { data: obras = [], isLoading } = useQuery({
    queryKey: ["obras-pesquisa", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("obras_pesquisa")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as ObraPesquisa[];
    },
  });

  const createMut = useMutation({
    mutationFn: async (payload: {
      nome: string; grupo: Grupo; status: Status; data_inicio: string; observacoes: string;
    }) => {
      const { error } = await supabase.from("obras_pesquisa").insert({
        nome: payload.nome,
        grupo: payload.grupo,
        status: payload.status,
        data_inicio: payload.data_inicio,
        observacoes: payload.observacoes || null,
        dono_id: user!.id,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["obras-pesquisa"] });
      setCreateOpen(false);
      toast({ title: "Obra cadastrada" });
    },
    onError: (e: any) => toast({ title: "Erro ao cadastrar", description: e.message, variant: "destructive" }),
  });

  const updateMut = useMutation({
    mutationFn: async (payload: { id: string; status: Status; observacoes: string }) => {
      const { error } = await supabase
        .from("obras_pesquisa")
        .update({ status: payload.status, observacoes: payload.observacoes || null })
        .eq("id", payload.id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["obras-pesquisa"] });
      setEditing(null);
      toast({ title: "Obra atualizada" });
    },
    onError: (e: any) => toast({ title: "Erro ao salvar", description: e.message, variant: "destructive" }),
  });

  const totalPiloto = obras.filter(o => o.grupo === "piloto").length;
  const totalControle = obras.filter(o => o.grupo === "controle").length;

  return (
    <div className="p-6 space-y-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
            <FlaskConical className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold">Pesquisa de Campo</h1>
            <p className="text-sm text-muted-foreground">Piloto vs Controle · registro paralelo</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs">
            {totalPiloto} piloto · {totalControle} controle · {obras.length} total
          </Badge>
          <Dialog open={createOpen} onOpenChange={setCreateOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="gap-1.5">
                <Plus className="h-4 w-4" /> Nova obra
              </Button>
            </DialogTrigger>
            <CreateDialog onSubmit={(p) => createMut.mutate(p)} loading={createMut.isPending} />
          </Dialog>
        </div>
      </div>

      <Card className="p-0 overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center text-sm text-muted-foreground">Carregando…</div>
        ) : obras.length === 0 ? (
          <div className="p-12 text-center">
            <FlaskConical className="h-10 w-10 mx-auto text-muted-foreground/50 mb-3" />
            <p className="text-sm text-muted-foreground">
              Nenhuma obra cadastrada. Clique em "Nova obra" para começar a pesquisa.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Grupo</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Início</TableHead>
                  <TableHead>Observações</TableHead>
                  <TableHead className="w-16"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {obras.map((o) => (
                  <TableRow key={o.id}>
                    <TableCell className="font-medium">{o.nome}</TableCell>
                    <TableCell>
                      <Badge className={o.grupo === "piloto" ? "bg-primary/15 text-primary hover:bg-primary/20" : "bg-muted text-muted-foreground hover:bg-muted"}>
                        {o.grupo}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold ${statusColor[o.status]}`}>
                        {o.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-sm">
                      {new Date(o.data_inicio + "T00:00:00").toLocaleDateString("pt-BR")}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground max-w-xs truncate">
                      {o.observacoes || "—"}
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon" onClick={() => setEditing(o)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </Card>

      <Dialog open={!!editing} onOpenChange={(o) => !o && setEditing(null)}>
        {editing && (
          <EditDialog
            obra={editing}
            onSubmit={(p) => updateMut.mutate({ id: editing.id, ...p })}
            loading={updateMut.isPending}
          />
        )}
      </Dialog>
    </div>
  );
}

function CreateDialog({
  onSubmit, loading,
}: { onSubmit: (p: { nome: string; grupo: Grupo; status: Status; data_inicio: string; observacoes: string }) => void; loading: boolean }) {
  const [nome, setNome] = useState("");
  const [grupo, setGrupo] = useState<Grupo>("piloto");
  const [status, setStatus] = useState<Status>("ativa");
  const [dataInicio, setDataInicio] = useState("2026-08-03");
  const [obs, setObs] = useState("");

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Nova obra na pesquisa</DialogTitle>
      </DialogHeader>
      <div className="space-y-3">
        <div>
          <Label>Nome</Label>
          <Input value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Obra Ed. Aurora" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label>Grupo</Label>
            <Select value={grupo} onValueChange={(v) => setGrupo(v as Grupo)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="piloto">Piloto</SelectItem>
                <SelectItem value="controle">Controle</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Status</Label>
            <Select value={status} onValueChange={(v) => setStatus(v as Status)}>
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
        <Button
          onClick={() => onSubmit({ nome: nome.trim(), grupo, status, data_inicio: dataInicio, observacoes: obs.trim() })}
          disabled={loading || !nome.trim()}
        >
          {loading ? "Salvando…" : "Criar"}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}

function EditDialog({
  obra, onSubmit, loading,
}: { obra: ObraPesquisa; onSubmit: (p: { status: Status; observacoes: string }) => void; loading: boolean }) {
  const [status, setStatus] = useState<Status>(obra.status);
  const [obs, setObs] = useState(obra.observacoes ?? "");

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Editar · {obra.nome}</DialogTitle>
      </DialogHeader>
      <div className="space-y-3">
        <div className="text-xs text-muted-foreground">
          Grupo: <strong className="text-foreground">{obra.grupo}</strong> · travado após criação
        </div>
        <div>
          <Label>Status</Label>
          <Select value={status} onValueChange={(v) => setStatus(v as Status)}>
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
      <DialogFooter>
        <Button onClick={() => onSubmit({ status, observacoes: obs.trim() })} disabled={loading}>
          {loading ? "Salvando…" : "Salvar"}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
