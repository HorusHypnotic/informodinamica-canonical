import { useState } from "react";
import { useObra } from "@/hooks/useObra";
import { useAuth } from "@/hooks/useAuth";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { GanttBoard } from "@/components/cronograma/GanttBoard";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { Plus, CalendarRange } from "lucide-react";

export default function CronogramaPage() {
  const { selectedObra, loading: obraLoading } = useObra();
  const { profile } = useAuth();
  const [open, setOpen] = useState(false);
  const [nome, setNome] = useState("");
  const [inicio, setInicio] = useState("");
  const [fim, setFim] = useState("");
  const [responsavel, setResponsavel] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  if (obraLoading) {
    return <div className="p-6 text-sm text-muted-foreground">Carregando…</div>;
  }
  if (!selectedObra) {
    return (
      <div className="p-6">
        <Card className="p-8 text-center">
          <CalendarRange className="h-8 w-8 mx-auto text-muted-foreground mb-3" />
          <p className="text-sm text-muted-foreground">Selecione uma obra para visualizar o cronograma.</p>
        </Card>
      </div>
    );
  }

  const handleCreate = async () => {
    if (!nome.trim() || !inicio || !fim) {
      toast.error("Preencha nome, início e fim");
      return;
    }
    if (fim < inicio) {
      toast.error("Data fim deve ser >= início");
      return;
    }
    setSubmitting(true);
    try {
      const { error } = await supabase.from("atividades").insert({
        nome: nome.trim(),
        data_inicio: inicio,
        data_fim: fim,
        responsavel: responsavel.trim() || null,
        obra_id: selectedObra.id,
        tenant_id: profile?.tenant_id,
      } as never);
      if (error) {
        toast.error(error.message);
        return;
      }
      toast.success("Atividade criada");
      setOpen(false);
      setNome(""); setInicio(""); setFim(""); setResponsavel("");
      setReloadKey((k) => k + 1);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-4 md:p-6 space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight flex items-center gap-2">
            <CalendarRange className="h-5 w-5 text-primary" />
            Cronograma — {selectedObra.nome}
          </h1>
          <p className="text-xs text-muted-foreground">
            Fonte única de verdade. Toda alteração gera evento auditável.
          </p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button size="sm"><Plus className="h-4 w-4 mr-1" /> Nova atividade</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Nova atividade</DialogTitle></DialogHeader>
            <div className="space-y-3">
              <div>
                <Label htmlFor="nome">Nome</Label>
                <Input id="nome" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Ex: Concretagem laje 2º pav." />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="inicio">Início</Label>
                  <Input id="inicio" type="date" value={inicio} onChange={(e) => setInicio(e.target.value)} />
                </div>
                <div>
                  <Label htmlFor="fim">Fim</Label>
                  <Input id="fim" type="date" value={fim} onChange={(e) => setFim(e.target.value)} />
                </div>
              </div>
              <div>
                <Label htmlFor="resp">Responsável (opcional)</Label>
                <Input id="resp" value={responsavel} onChange={(e) => setResponsavel(e.target.value)} />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
              <Button onClick={handleCreate} disabled={submitting}>{submitting ? "Salvando…" : "Criar"}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <GanttBoard key={reloadKey} obraId={selectedObra.id} tenantId={profile?.tenant_id ?? undefined} />
    </div>
  );
}
