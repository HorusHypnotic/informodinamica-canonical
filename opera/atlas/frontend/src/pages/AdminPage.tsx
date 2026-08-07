import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { SectionHeader } from "@/components/dashboard/SectionHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Plus, HardHat, Shield, Trash2, Rocket, Link2, Settings, BarChart3, Crown, Users, Building2, Mail, ClipboardList, KeyRound, Lock } from "lucide-react";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { logAudit } from "@/lib/auditLog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Navigate } from "react-router-dom";
import { useObra } from "@/hooks/useObra";
import { BetaUsersTab } from "@/components/admin/BetaUsersTab";
import { InfluencerCodesTab } from "@/components/admin/InfluencerCodesTab";
import { BetaConfigTab } from "@/components/admin/BetaConfigTab";
import { BetaMetricsTab } from "@/components/admin/BetaMetricsTab";
import { SuperAdminTab } from "@/components/admin/SuperAdminTab";
import { ObraMembrosTab } from "@/components/admin/ObraMembrosTab";
import { AdminKPIs } from "@/components/admin/AdminKPIs";
import { UsersTab } from "@/components/admin/UsersTab";
import { InvitesTab } from "@/components/admin/InvitesTab";
import { TenantProfileTab } from "@/components/admin/TenantProfileTab";
import { AuditLogTab } from "@/components/admin/AuditLogTab";
import { UserPermissionsEditor } from "@/components/admin/UserPermissionsEditor";
import { PeriodosFechadosTab } from "@/components/admin/PeriodosFechadosTab";
import { ExportarDadosTab } from "@/components/admin/ExportarDadosTab";
import { Database } from "lucide-react";

type AppRole = "admin" | "gestor" | "operacional" | "visualizador";

interface ProfileRow {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  tenant_id: string | null;
  account_status?: string;
}

interface RoleRow {
  id: string;
  user_id: string;
  role: AppRole;
  tenant_id: string | null;
}

interface ObraRow {
  id: string;
  nome: string;
  endereco: string | null;
  status: string;
  data_inicio: string | null;
  data_previsao: string | null;
}

export default function AdminPage() {
  const { isAdmin, profile, isSuperAdmin, user } = useAuth();
  const { refetch: refetchObras } = useObra();
  const [profiles, setProfiles] = useState<ProfileRow[]>([]);
  const [userRoles, setUserRoles] = useState<RoleRow[]>([]);
  const [obras, setObras] = useState<ObraRow[]>([]);
  const [invites, setInvites] = useState<any[]>([]);
  const [newObraNome, setNewObraNome] = useState("");
  const [newObraEndereco, setNewObraEndereco] = useState("");
  const [obraDialogOpen, setObraDialogOpen] = useState(false);
  const [deleteObraConfirm, setDeleteObraConfirm] = useState<{ open: boolean; id: string; nome: string }>({ open: false, id: "", nome: "" });

  const tenantId = profile?.tenant_id;

  const fetchData = async () => {
    if (!tenantId) return;
    const [profRes, rolesRes, obrasRes, invitesRes] = await Promise.all([
      supabase.from("profiles").select("*").eq("tenant_id", tenantId),
      supabase.from("user_roles").select("*").eq("tenant_id", tenantId),
      supabase.from("obras").select("*").eq("tenant_id", tenantId).order("created_at", { ascending: false }),
      supabase.from("invites").select("*").eq("tenant_id", tenantId).order("created_at", { ascending: false }),
    ]);
    if (profRes.data) setProfiles(profRes.data as ProfileRow[]);
    if (rolesRes.data) setUserRoles(rolesRes.data as RoleRow[]);
    if (obrasRes.data) setObras(obrasRes.data as ObraRow[]);
    if (invitesRes.data) setInvites(invitesRes.data);
  };

  useEffect(() => { fetchData(); }, [tenantId]);

  if (!isAdmin && !isSuperAdmin) {
    return <Navigate to="/" replace />;
  }

  const activeInvites = invites.filter(i => !i.used && new Date(i.expires_at) > new Date()).length;
  const blockedUsers = profiles.filter(p => (p as any).account_status === "blocked").length;

  const addObra = async () => {
    if (!newObraNome.trim() || !tenantId) return;
    const { error } = await supabase.from("obras").insert({
      nome: newObraNome, endereco: newObraEndereco || null, tenant_id: tenantId,
    } as any);
    if (error) {
      toast.error(error.message.includes("Limite") ? "Limite de obras atingido!" : "Erro: " + error.message);
    } else {
      toast.success("Obra criada!");
      setNewObraNome(""); setNewObraEndereco(""); setObraDialogOpen(false);
      fetchData(); refetchObras();
    }
  };

  const deleteObra = async (id: string) => {
    const obra = obras.find(o => o.id === id);
    const { error } = await supabase.from("obras").delete().eq("id", id);
    if (error) toast.error("Erro ao excluir obra");
    else {
      await logAudit({ action: "DELETE_OBRA", target_type: "obra", target_id: id, metadata: { nome: obra?.nome } });
      toast.success("Obra excluída");
      fetchData();
      refetchObras();
    }
  };

  return (
    <div className="space-y-4">
      <SectionHeader
        title="Painel Administrativo"
        subtitle="Gerencie usuários, permissões e obras"
        icon={<Shield className="h-6 w-6" />}
      />

      <AdminKPIs
        totalUsers={profiles.length}
        totalObras={obras.length}
        activeInvites={activeInvites}
        blockedUsers={blockedUsers}
      />

      <Tabs defaultValue="usuarios" className="space-y-4">
        <TabsList className="w-full overflow-x-auto flex flex-nowrap h-auto gap-0.5 p-1 justify-start scrollbar-thin">
          <TabsTrigger value="usuarios" className="gap-1.5 shrink-0 text-xs sm:text-sm">
            <Users className="h-3.5 w-3.5" /> <span className="hidden sm:inline">Usuários</span><span className="sm:hidden">Users</span>
          </TabsTrigger>
          <TabsTrigger value="convites" className="gap-1.5 shrink-0 text-xs sm:text-sm">
            <Mail className="h-3.5 w-3.5" /> Convites
          </TabsTrigger>
          <TabsTrigger value="obras" className="gap-1.5 shrink-0 text-xs sm:text-sm">
            <HardHat className="h-3.5 w-3.5" /> Obras
          </TabsTrigger>
          <TabsTrigger value="equipe-obra" className="gap-1.5 shrink-0 text-xs sm:text-sm">
            <Users className="h-3.5 w-3.5" /> Equipe
          </TabsTrigger>
          <TabsTrigger value="permissoes" className="gap-1.5 shrink-0 text-xs sm:text-sm">
            <KeyRound className="h-3.5 w-3.5" /> Permissões
          </TabsTrigger>
          <TabsTrigger value="periodos" className="gap-1.5 shrink-0 text-xs sm:text-sm">
            <Lock className="h-3.5 w-3.5" /> Períodos
          </TabsTrigger>
          <TabsTrigger value="exportar" className="gap-1.5 shrink-0 text-xs sm:text-sm">
            <Database className="h-3.5 w-3.5" /> Dados
          </TabsTrigger>
          <TabsTrigger value="audit-log" className="gap-1.5 shrink-0 text-xs sm:text-sm">
            <ClipboardList className="h-3.5 w-3.5" /> Logs
          </TabsTrigger>
          <TabsTrigger value="tenant" className="gap-1.5 shrink-0 text-xs sm:text-sm">
            <Building2 className="h-3.5 w-3.5" /> Organização
          </TabsTrigger>
          {isSuperAdmin && (
            <>
              <TabsTrigger value="beta-users" className="gap-1.5 shrink-0 text-xs sm:text-sm">
                <Rocket className="h-3.5 w-3.5" /> Beta
              </TabsTrigger>
              <TabsTrigger value="influencers" className="gap-1.5 shrink-0 text-xs sm:text-sm">
                <Link2 className="h-3.5 w-3.5" /> <span className="hidden sm:inline">Influenciadores</span><span className="sm:hidden">Inflr.</span>
              </TabsTrigger>
              <TabsTrigger value="beta-config" className="gap-1.5 shrink-0 text-xs sm:text-sm">
                <Settings className="h-3.5 w-3.5" /> Config
              </TabsTrigger>
              <TabsTrigger value="beta-metrics" className="gap-1.5 shrink-0 text-xs sm:text-sm">
                <BarChart3 className="h-3.5 w-3.5" /> Métricas
              </TabsTrigger>
              <TabsTrigger value="super-admin" className="gap-1.5 shrink-0 text-xs sm:text-sm">
                <Crown className="h-3.5 w-3.5" /> Super Admin
              </TabsTrigger>
            </>
          )}
        </TabsList>

        <TabsContent value="usuarios" className="space-y-4">
          <UsersTab
            profiles={profiles}
            userRoles={userRoles}
            tenantId={tenantId || ""}
            onRefresh={fetchData}
            currentUserId={user?.id}
          />
        </TabsContent>

        <TabsContent value="convites" className="space-y-4">
          <InvitesTab
            invites={invites}
            obras={obras}
            tenantId={tenantId || ""}
            onRefresh={fetchData}
          />
        </TabsContent>

        <TabsContent value="obras" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold">Obras cadastradas</h3>
            <Dialog open={obraDialogOpen} onOpenChange={setObraDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="gap-1.5"><Plus className="h-4 w-4" /> Nova Obra</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader><DialogTitle>Cadastrar Nova Obra</DialogTitle></DialogHeader>
                <div className="space-y-4 pt-2">
                  <div className="space-y-1">
                    <label className="text-sm font-medium">Nome da obra</label>
                    <Input value={newObraNome} onChange={(e) => setNewObraNome(e.target.value)} placeholder="Ex: Residencial Vila Nova" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium">Endereço</label>
                    <Input value={newObraEndereco} onChange={(e) => setNewObraEndereco(e.target.value)} placeholder="Ex: Rua das Flores, 123" />
                  </div>
                  <Button onClick={addObra} className="w-full">Criar Obra</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <div className="glass-card overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Endereço</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[80px]">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {obras.map((o) => (
                  <TableRow key={o.id}>
                    <TableCell className="font-medium">{o.nome}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{o.endereco || "—"}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="text-xs">
                        {o.status === "em_andamento" ? "Em andamento" : o.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon" onClick={() => setDeleteObraConfirm({ open: true, id: o.id, nome: o.nome })}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {obras.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center text-muted-foreground py-8">Nenhuma obra cadastrada</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="equipe-obra" className="space-y-4">
          <ObraMembrosTab />
        </TabsContent>

        <TabsContent value="permissoes" className="space-y-4">
          <UserPermissionsEditor />
        </TabsContent>

        <TabsContent value="periodos" className="space-y-4">
          <PeriodosFechadosTab />
        </TabsContent>

        <TabsContent value="exportar" className="space-y-4">
          <ExportarDadosTab />
        </TabsContent>

        <TabsContent value="audit-log" className="space-y-4">
          <AuditLogTab />
        </TabsContent>

        <TabsContent value="tenant" className="space-y-4">
          <TenantProfileTab
            tenantId={tenantId || ""}
            totalUsers={profiles.length}
            totalObras={obras.length}
          />
        </TabsContent>

        {isSuperAdmin && (
          <>
            <TabsContent value="beta-users"><BetaUsersTab /></TabsContent>
            <TabsContent value="influencers"><InfluencerCodesTab /></TabsContent>
            <TabsContent value="beta-config"><BetaConfigTab /></TabsContent>
            <TabsContent value="beta-metrics"><BetaMetricsTab /></TabsContent>
            <TabsContent value="super-admin"><SuperAdminTab /></TabsContent>
          </>
        )}
      </Tabs>

      <ConfirmDialog
        open={deleteObraConfirm.open}
        onOpenChange={(v) => setDeleteObraConfirm(prev => ({ ...prev, open: v }))}
        title="Excluir Obra"
        description={`Tem certeza que deseja excluir a obra "${deleteObraConfirm.nome}"? Todos os dados vinculados serão perdidos.`}
        confirmText="EXCLUIR"
        onConfirm={() => deleteObra(deleteObraConfirm.id)}
      />
    </div>
  );
}
