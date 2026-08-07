import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Plus, Trash2, ToggleLeft, ToggleRight } from "lucide-react";

interface InfluencerCode {
  id: string;
  nome: string;
  codigo: string;
  ativo: boolean;
  total_cadastros: number;
  total_convertidos: number;
  created_at: string;
}

export function InfluencerCodesTab() {
  const [codes, setCodes] = useState<InfluencerCode[]>([]);
  const [newNome, setNewNome] = useState("");
  const [newCodigo, setNewCodigo] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  const fetchCodes = async () => {
    const { data } = await supabase.from("influencer_codes").select("*").order("created_at", { ascending: false });
    if (data) setCodes(data as InfluencerCode[]);
  };

  useEffect(() => { fetchCodes(); }, []);

  const addCode = async () => {
    if (!newNome.trim() || !newCodigo.trim()) return;
    const { error } = await supabase.from("influencer_codes").insert({
      nome: newNome.trim(),
      codigo: newCodigo.trim().toUpperCase(),
    });
    if (error) toast.error("Erro: " + error.message);
    else {
      toast.success("Código criado!");
      setNewNome(""); setNewCodigo(""); setDialogOpen(false); fetchCodes();
    }
  };

  const toggleActive = async (id: string, current: boolean) => {
    await supabase.from("influencer_codes").update({ ativo: !current }).eq("id", id);
    fetchCodes();
  };

  const deleteCode = async (id: string) => {
    await supabase.from("influencer_codes").delete().eq("id", id);
    toast.success("Código removido"); fetchCodes();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold">Códigos de Influenciadores</h3>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="gap-1.5"><Plus className="h-4 w-4" /> Novo Código</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Criar Código de Influenciador</DialogTitle></DialogHeader>
            <div className="space-y-4 pt-2">
              <div className="space-y-1">
                <label className="text-sm font-medium">Nome do influenciador</label>
                <Input value={newNome} onChange={(e) => setNewNome(e.target.value)} placeholder="Ex: Eduardo Silva" />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium">Código</label>
                <Input value={newCodigo} onChange={(e) => setNewCodigo(e.target.value)} placeholder="Ex: EDU01" className="uppercase" />
              </div>
              <Button onClick={addCode} className="w-full">Criar Código</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="glass-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Influenciador</TableHead>
              <TableHead>Código</TableHead>
              <TableHead>Cadastros</TableHead>
              <TableHead>Conversões</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[100px]">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {codes.map((c) => (
              <TableRow key={c.id}>
                <TableCell className="font-medium">{c.nome}</TableCell>
                <TableCell className="font-mono text-sm">{c.codigo}</TableCell>
                <TableCell>{c.total_cadastros}</TableCell>
                <TableCell>{c.total_convertidos}</TableCell>
                <TableCell>
                  <Badge variant="secondary" className={`text-xs ${c.ativo ? "bg-status-ok/20 text-status-ok" : "bg-muted text-muted-foreground"}`}>
                    {c.ativo ? "Ativo" : "Inativo"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => toggleActive(c.id, c.ativo)}>
                      {c.ativo ? <ToggleRight className="h-3.5 w-3.5 text-status-ok" /> : <ToggleLeft className="h-3.5 w-3.5" />}
                    </Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => deleteCode(c.id)}>
                      <Trash2 className="h-3.5 w-3.5 text-destructive" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {codes.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                  Nenhum código cadastrado
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
