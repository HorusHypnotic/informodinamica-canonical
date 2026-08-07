import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { ConfirmDialog } from "./ConfirmDialog";
import { logAudit } from "@/lib/auditLog";
import { Plus, Trash2, HardHat, Shield, UserX, Eye, Pencil, Users, Clock, CalendarClock } from "lucide-react";

type AppRole = "admin" | "gestor" | "operacional" | "visualizador";

interface ProfileRow { id: string; email: string; full_name: string | null; account_status?: string; }
interface RoleRow { id: string; user_id: string; role: AppRole; }
interface ObraRow { id: string; nome: string; }
interface MembroRow { id: string; obra_id: string; user_id: string; expires_at: string | null; }

const roleBadgeColor: Record<AppRole, string> = {
  admin: "bg-destructive/20 text-destructive",
  gestor: "bg-primary/20 text-primary",
  operacional: "bg-chart-4/20 text-chart-4",
  visualizador: "bg-muted text-muted-foreground",
};

export function UserPermissionsEditor() {
  const { profile, user: currentUser } = useAuth();
  const tenantId = profile?.tenant_id;

  const [profiles, setProfiles] = useState<ProfileRow[]>([]);
  const [userRoles, setUserRoles] = useState<RoleRow[]>([]);
  const [obras, setObras] = useState<ObraRow[]>([]);
  const [membros, setMembros] = useState<MembroRow[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string>("");
  const [newRole, setNewRole] = useState<AppRole>("visualizador");
  const [newObraId, setNewObraId] = useState<string>("");
  const [expirationDays, setExpirationDays] = useState<string>("");
  const [confirmState, setConfirmState] = useState<{ open: boolean; title: string; desc: string; action: () => void; text?: string }>({
    open: false, title: "", desc: "", action: () => {}, text: undefined,
  });

  const fetchData = async () => {
    if (!tenantId) return;
    const [p, r, o, m] = await Promise.all([
      supabase.from("profiles").select("id, email, full_name, account_status").eq("tenant_id", tenantId),
      supabase.from("user_roles").select("id, user_id, role").eq("tenant_id", tenantId),
      supabase.from("obras").select("id, nome").eq("tenant_id", tenantId).order("nome"),
      supabase.from("obra_membros").select("id, obra_id, user_id, expires_at").eq("tenant_id", tenantId),
    ]);
    if (p.data) setProfiles(p.data as ProfileRow[]);
    if (r.data) setUserRoles(r.data as RoleRow[]);
    if (o.data) setObras(o.data as ObraRow[]);
    if (m.data) setMembros(m.data as MembroRow[]);
  };

  useEffect(() => { fetchData(); }, [tenantId]);

  const selectedProfile = profiles.find(p => p.id === selectedUserId);
  const selectedRoles = userRoles.filter(r => r.user_id === selectedUserId);
  const selectedMembros = membros.filter(m => m.user_id === selectedUserId);
  const isSelectedAdmin = selectedRoles.some(r => r.role === "admin");
  const isSelf = selectedUserId === currentUser?.id;
  const assignedObraIds = new Set(selectedMembros.map(m => m.obra_id));

  const addRole = async () => {
    if (!selectedUserId || !tenantId) return;
    if (selectedRoles.some(r => r.role === newRole)) {
      toast.error("Usuário já possui este papel");
      return;
    }
    const { error } = await supabase.from("user_roles").insert({ user_id: selectedUserId, role: newRole, tenant_id: tenantId } as any);
    if (error) toast.error("Erro: " + error.message);
    else {
      await logAudit({ action: "ADD_ROLE", target_type: "user", target_id: selectedUserId, metadata: { role: newRole, email: selectedProfile?.email } });
      toast.success("Papel adicionado!");
      fetchData();
    }
  };

  const removeRole = (roleId: string, role: AppRole) => {
    if (isSelf && role === "admin") { toast.error("Não pode remover seu próprio papel de admin"); return; }
    const action = async () => {
      const { error } = await supabase.from("user_roles").delete().eq("id", roleId);
      if (error) toast.error("Erro ao remover");
      else {
        await logAudit({ action: "REMOVE_ROLE", target_type: "user", target_id: selectedUserId, metadata: { role, email: selectedProfile?.email } });
        toast.success("Papel removido");
        fetchData();
      }
    };
    if (role === "admin") {
      setConfirmState({ open: true, title: "Remover Admin", desc: "Remover acesso administrativo?", action, text: "REMOVER" });
    } else {
      action();
    }
  };

  const addObra = async () => {
    if (!selectedUserId || !newObraId || !tenantId) return;
    if (assignedObraIds.has(newObraId)) { toast.error("Já vinculado a esta obra"); return; }
    const insertData: any = { user_id: selectedUserId, obra_id: newObraId, tenant_id: tenantId };
    if (expirationDays && parseInt(expirationDays) > 0) {
      const exp = new Date();
      exp.setDate(exp.getDate() + parseInt(expirationDays));
      insertData.expires_at = exp.toISOString();
    }
    const { error } = await supabase.from("obra_membros").insert(insertData);
    if (error) toast.error("Erro: " + error.message);
    else {
      const obraNome = obras.find(o => o.id === newObraId)?.nome;
      await logAudit({ action: "ADD_OBRA_MEMBRO", target_type: "obra_membros", target_id: selectedUserId, metadata: { obra: obraNome, email: selectedProfile?.email, expires_days: expirationDays || "sem limite" } });
      toast.success("Acesso à obra concedido!");
      setExpirationDays("");
      fetchData();
    }
  };

  const removeObra = async (membroId: string, obraId: string) => {
    const { error } = await supabase.from("obra_membros").delete().eq("id", membroId);
    if (error) toast.error("Erro ao remover");
    else {
      const obraNome = obras.find(o => o.id === obraId)?.nome;
      await logAudit({ action: "REMOVE_OBRA_MEMBRO", target_type: "obra_membros", target_id: selectedUserId, metadata: { obra: obraNome, email: selectedProfile?.email } });
      toast.success("Acesso à obra removido");
      fetchData();
    }
  };

  const revokeAll = () => {
    setConfirmState({
      open: true,
      title: "Revogar todo acesso",
      desc: `Remover TODOS os papéis e acessos a obras de "${selectedProfile?.full_name || selectedProfile?.email}"?`,
      text: "REVOGAR",
      action: async () => {
        await Promise.all([
          supabase.from("user_roles").delete().eq("user_id", selectedUserId).eq("tenant_id", tenantId!),
          supabase.from("obra_membros").delete().eq("user_id", selectedUserId).eq("tenant_id", tenantId!),
        ]);
        await logAudit({ action: "REVOKE_ALL_ACCESS", target_type: "user", target_id: selectedUserId, metadata: { email: selectedProfile?.email } });
        toast.success("Todo acesso revogado");
        fetchData();
      },
    });
  };

  return (
    <div className="space-y-4">
      <ConfirmDialog
        open={confirmState.open}
        onOpenChange={(v) => setConfirmState(prev => ({ ...prev, open: v }))}
        title={confirmState.title}
        description={confirmState.desc}
        confirmText={confirmState.text}
        onConfirm={confirmState.action}
      />

      {/* User selector */}
      <Card className="glass-card">
        <CardContent className="p-4">
          <label className="text-xs text-muted-foreground mb-1 block">Selecione um usuário para gerenciar</label>
          <Select value={selectedUserId} onValueChange={setSelectedUserId}>
            <SelectTrigger><SelectValue placeholder="Selecionar usuário..." /></SelectTrigger>
            <SelectContent>
              {profiles.map(p => (
                <SelectItem key={p.id} value={p.id}>
                  {p.full_name || p.email}
                  {p.id === currentUser?.id ? " (você)" : ""}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {selectedUserId && selectedProfile && (
        <>
          {/* User info */}
          <Card className="glass-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <Shield className="h-4 w-4 text-primary" />
                {selectedProfile.full_name || "Sem nome"}
                <span className="text-xs text-muted-foreground font-normal ml-auto">{selectedProfile.email}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0 space-y-4">
              {/* Roles section */}
              <div>
                <p className="text-xs font-semibold mb-2 flex items-center gap-1">
                  <Eye className="h-3 w-3" /> Papéis atribuídos
                </p>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {selectedRoles.map(r => (
                    <Badge
                      key={r.id}
                      variant="secondary"
                      className={`${roleBadgeColor[r.role]} text-xs cursor-pointer hover:opacity-70`}
                      onClick={() => removeRole(r.id, r.role)}
                    >
                      {r.role} ✕
                    </Badge>
                  ))}
                  {selectedRoles.length === 0 && <span className="text-xs text-muted-foreground">Nenhum papel</span>}
                </div>
                <div className="flex gap-2">
                  <Select value={newRole} onValueChange={v => setNewRole(v as AppRole)}>
                    <SelectTrigger className="h-8 text-xs w-[160px]"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="gestor">Gestor</SelectItem>
                      <SelectItem value="operacional">Operacional</SelectItem>
                      <SelectItem value="visualizador">Visualizador</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button size="sm" className="h-8 gap-1 text-xs" onClick={addRole}>
                    <Plus className="h-3 w-3" /> Adicionar
                  </Button>
                </div>
              </div>

              {/* Obras section */}
              <div>
                <p className="text-xs font-semibold mb-2 flex items-center gap-1">
                  <HardHat className="h-3 w-3" /> Acesso a obras
                </p>
                <div className="space-y-1.5 mb-2">
                  {selectedMembros.map(m => {
                    const obra = obras.find(o => o.id === m.obra_id);
                    const isExpired = m.expires_at && new Date(m.expires_at) < new Date();
                    const expiresLabel = m.expires_at
                      ? isExpired
                        ? "Expirado"
                        : `Até ${new Date(m.expires_at).toLocaleDateString("pt-BR")}`
                      : "Sem limite";
                    return (
                      <div key={m.id} className="flex items-center gap-2 flex-wrap">
                        <Badge
                          variant="secondary"
                          className={`text-xs cursor-pointer hover:bg-destructive/10 gap-1 ${isExpired ? "opacity-50 line-through" : ""}`}
                          onClick={() => removeObra(m.id, m.obra_id)}
                        >
                          <HardHat className="h-2.5 w-2.5" />
                          {obra?.nome || "—"} ✕
                        </Badge>
                        <span className={`text-[10px] flex items-center gap-0.5 ${isExpired ? "text-destructive" : "text-muted-foreground"}`}>
                          <Clock className="h-2.5 w-2.5" /> {expiresLabel}
                        </span>
                      </div>
                    );
                  })}
                  {selectedMembros.length === 0 && (
                    <span className="text-xs text-muted-foreground">
                      {isSelectedAdmin ? "Admin tem acesso total" : "Sem acesso a obras específicas"}
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  <Select value={newObraId} onValueChange={setNewObraId}>
                    <SelectTrigger className="h-8 text-xs flex-1 min-w-[140px]"><SelectValue placeholder="Selecionar obra..." /></SelectTrigger>
                    <SelectContent>
                      {obras.filter(o => !assignedObraIds.has(o.id)).map(o => (
                        <SelectItem key={o.id} value={o.id}>{o.nome}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <div className="flex items-center gap-1">
                    <CalendarClock className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                    <Input
                      type="number"
                      min="1"
                      placeholder="Dias"
                      value={expirationDays}
                      onChange={e => setExpirationDays(e.target.value)}
                      className="h-8 w-[70px] text-xs"
                    />
                  </div>
                  <Button size="sm" className="h-8 gap-1 text-xs" onClick={addObra} disabled={!newObraId}>
                    <Plus className="h-3 w-3" /> Vincular
                  </Button>
                </div>
              </div>

              {/* Revoke all */}
              {!isSelf && (selectedRoles.length > 0 || selectedMembros.length > 0) && (
                <Button variant="destructive" size="sm" className="gap-1.5 text-xs" onClick={revokeAll}>
                  <UserX className="h-3.5 w-3.5" /> Revogar todo acesso
                </Button>
              )}
            </CardContent>
          </Card>
        </>
      )}

      {!selectedUserId && (
        <div className="text-center text-muted-foreground py-8">
          <Users className="h-8 w-8 mx-auto mb-2 opacity-50" />
          <p className="text-sm">Selecione um usuário para gerenciar permissões e acesso a obras</p>
        </div>
      )}
    </div>
  );
}
