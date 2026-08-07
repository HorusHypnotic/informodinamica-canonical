import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/hooks/useAuth";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Plus, Trash2, Users, HardHat } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ObraRow {
  id: string;
  nome: string;
}

interface ProfileRow {
  id: string;
  email: string;
  full_name: string | null;
}

interface MembroRow {
  id: string;
  obra_id: string;
  user_id: string;
}

export function ObraMembrosTab() {
  const { profile } = useAuth();
  const tenantId = profile?.tenant_id;

  const [obras, setObras] = useState<ObraRow[]>([]);
  const [profiles, setProfiles] = useState<ProfileRow[]>([]);
  const [membros, setMembros] = useState<MembroRow[]>([]);
  const [selectedObra, setSelectedObra] = useState("");
  const [selectedUser, setSelectedUser] = useState("");

  const fetchData = async () => {
    if (!tenantId) return;
    const [obrasRes, profilesRes, membrosRes] = await Promise.all([
      supabase.from("obras").select("id, nome").eq("tenant_id", tenantId).order("nome"),
      supabase.from("profiles").select("id, email, full_name").eq("tenant_id", tenantId),
      supabase.from("obra_membros").select("id, obra_id, user_id").eq("tenant_id", tenantId),
    ]);
    if (obrasRes.data) setObras(obrasRes.data as ObraRow[]);
    if (profilesRes.data) setProfiles(profilesRes.data as ProfileRow[]);
    if (membrosRes.data) setMembros(membrosRes.data as MembroRow[]);
  };

  useEffect(() => { fetchData(); }, [tenantId]);

  const addMembro = async () => {
    if (!selectedObra || !selectedUser || !tenantId) return;
    const exists = membros.find(m => m.obra_id === selectedObra && m.user_id === selectedUser);
    if (exists) {
      toast.error("Este usuário já está atribuído a esta obra");
      return;
    }
    const { error } = await supabase.from("obra_membros").insert({
      obra_id: selectedObra,
      user_id: selectedUser,
      tenant_id: tenantId,
    } as any);
    if (error) {
      toast.error("Erro ao atribuir membro: " + error.message);
    } else {
      toast.success("Membro atribuído à obra!");
      fetchData();
    }
  };

  const removeMembro = async (id: string) => {
    const { error } = await supabase.from("obra_membros").delete().eq("id", id);
    if (error) {
      toast.error("Erro ao remover membro");
    } else {
      toast.success("Membro removido da obra");
      fetchData();
    }
  };

  const getObraNome = (obraId: string) => obras.find(o => o.id === obraId)?.nome || "—";
  const getUserName = (userId: string) => {
    const p = profiles.find(pr => pr.id === userId);
    return p?.full_name || p?.email || "—";
  };

  // Group membros by obra
  const membrosByObra = obras.map(obra => ({
    ...obra,
    membros: membros.filter(m => m.obra_id === obra.id),
  }));

  return (
    <div className="space-y-4">
      {/* Assign form */}
      <div className="glass-card p-4 flex flex-wrap items-end gap-3">
        <div className="space-y-1">
          <label className="text-xs text-muted-foreground">Obra</label>
          <Select value={selectedObra} onValueChange={setSelectedObra}>
            <SelectTrigger className="w-[220px]">
              <SelectValue placeholder="Selecionar obra" />
            </SelectTrigger>
            <SelectContent>
              {obras.map(o => (
                <SelectItem key={o.id} value={o.id}>{o.nome}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1">
          <label className="text-xs text-muted-foreground">Membro</label>
          <Select value={selectedUser} onValueChange={setSelectedUser}>
            <SelectTrigger className="w-[250px]">
              <SelectValue placeholder="Selecionar usuário" />
            </SelectTrigger>
            <SelectContent>
              {profiles.map(p => (
                <SelectItem key={p.id} value={p.id}>{p.full_name || p.email}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button onClick={addMembro} className="gap-1.5" disabled={!selectedObra || !selectedUser}>
          <Plus className="h-4 w-4" /> Atribuir
        </Button>
      </div>

      {/* Grouped by obra */}
      {membrosByObra.map(obra => (
        <Card key={obra.id} className="glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <HardHat className="h-4 w-4 text-primary" />
              {obra.nome}
              <Badge variant="secondary" className="text-xs ml-auto">
                <Users className="h-3 w-3 mr-1" /> {obra.membros.length}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            {obra.membros.length === 0 ? (
              <p className="text-xs text-muted-foreground py-2">Nenhum membro atribuído — todos do tenant têm acesso</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {obra.membros.map(m => (
                  <Badge key={m.id} variant="secondary" className="gap-1 text-xs cursor-pointer hover:bg-destructive/10" onClick={() => removeMembro(m.id)}>
                    {getUserName(m.user_id)} ✕
                  </Badge>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      ))}

      {obras.length === 0 && (
        <p className="text-center text-muted-foreground py-8">Nenhuma obra cadastrada</p>
      )}
    </div>
  );
}
