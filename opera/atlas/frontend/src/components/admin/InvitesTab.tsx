import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { UserPlus, Copy, Check, Trash2 } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { ConfirmDialog } from "./ConfirmDialog";
import { logAudit } from "@/lib/auditLog";

type AppRole = "admin" | "gestor" | "operacional" | "visualizador";

interface ObraRow { id: string; nome: string; }

const roleBadgeColor: Record<AppRole, string> = {
  admin: "bg-destructive/20 text-destructive",
  gestor: "bg-primary/20 text-primary",
  operacional: "bg-chart-4/20 text-chart-4",
  visualizador: "bg-muted text-muted-foreground",
};

interface InvitesTabProps {
  invites: any[];
  obras: ObraRow[];
  tenantId: string;
  onRefresh: () => void;
}

export function InvitesTab({ invites, obras, tenantId, onRefresh }: InvitesTabProps) {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<AppRole>("visualizador");
  const [obraId, setObraId] = useState<string>("none");
  const [loading, setLoading] = useState(false);
  const [copiedToken, setCopiedToken] = useState<string | null>(null);
  const isMobile = useIsMobile();
  const [deleteConfirm, setDeleteConfirm] = useState<{ open: boolean; id: string; email: string }>({ open: false, id: "", email: "" });

  const sendInvite = async () => {
    if (!email.trim() || !tenantId) return;
    setLoading(true);
    const payload: any = { email, role, tenant_id: tenantId };
    if (obraId && obraId !== "none") payload.obra_id = obraId;
    const { error } = await supabase.from("invites").insert(payload);
    setLoading(false);
    if (error) toast.error("Erro ao criar convite: " + error.message);
    else {
      await logAudit({ action: "CREATE_INVITE", target_type: "invite", metadata: { email, role, obraId: obraId !== "none" ? obraId : null } });
      toast.success("Convite criado!");
      setEmail("");
      onRefresh();
    }
  };

  const copyLink = (token: string) => {
    navigator.clipboard.writeText(`${window.location.origin}/invite?token=${token}`);
    setCopiedToken(token);
    toast.success("Link copiado!");
    setTimeout(() => setCopiedToken(null), 2000);
  };

  const deleteInvite = async (id: string, email: string) => {
    const { error } = await supabase.from("invites").delete().eq("id", id);
    if (error) toast.error("Erro ao excluir convite");
    else {
      await logAudit({ action: "DELETE_INVITE", target_type: "invite", target_id: id, metadata: { email } });
      toast.success("Convite removido");
      onRefresh();
    }
  };

  const getStatus = (inv: any) => {
    if (inv.used) return { label: "Usado", cls: "bg-muted text-muted-foreground" };
    if (new Date(inv.expires_at) < new Date()) return { label: "Expirado", cls: "bg-destructive/20 text-destructive" };
    return { label: "Ativo", cls: "bg-status-ok/20 text-status-ok" };
  };

  const obraName = (id: string | null) => {
    if (!id) return "Todas";
    return obras.find(o => o.id === id)?.nome || "—";
  };

  return (
    <div className="space-y-4">
      <Card className="glass-card">
        <CardContent className="p-4 space-y-3">
          <div>
            <h3 className="text-sm font-semibold">Convide sua equipe</h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Cada pessoa recebe acesso direto ao papel atribuído.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end gap-3">
            <div className="space-y-1 flex-1 min-w-[180px]">
              <label className="text-xs text-muted-foreground">Email</label>
              <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="colaborador@empresa.com" type="email" className="h-9" />
            </div>
            <div className="space-y-1">
              <label className="text-xs text-muted-foreground">Papel</label>
              <Select value={role} onValueChange={(v) => setRole(v as AppRole)}>
                <SelectTrigger className="w-full sm:w-[180px] h-9"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="gestor">Gestor</SelectItem>
                  <SelectItem value="operacional">Operacional</SelectItem>
                  <SelectItem value="visualizador">Visualizador</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <label className="text-xs text-muted-foreground">Obra (opcional)</label>
              <Select value={obraId} onValueChange={setObraId}>
                <SelectTrigger className="w-full sm:w-[180px] h-9"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Todas as obras</SelectItem>
                  {obras.map(o => <SelectItem key={o.id} value={o.id}>{o.nome}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <Button onClick={sendInvite} disabled={loading || !email.trim()} className="gap-1.5 h-9">
              <UserPlus className="h-4 w-4" /> {loading ? "Enviando..." : "Enviar"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {isMobile ? (
        <div className="space-y-2">
          {invites.map((inv) => {
            const status = getStatus(inv);
            return (
              <Card key={inv.id} className="glass-card">
                <CardContent className="p-3 space-y-1.5">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate">{inv.email}</p>
                      <div className="flex gap-1 mt-1">
                        <Badge variant="secondary" className={`${roleBadgeColor[inv.role as AppRole]} text-[10px]`}>{inv.role}</Badge>
                        <Badge variant="secondary" className={`${status.cls} text-[10px]`}>{status.label}</Badge>
                      </div>
                    </div>
                    <div className="flex gap-1 shrink-0">
                      <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => copyLink(inv.token)} disabled={inv.used || status.label === "Expirado"}>
                        {copiedToken === inv.token ? <Check className="h-3 w-3 text-status-ok" /> : <Copy className="h-3 w-3" />}
                      </Button>
                      <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setDeleteConfirm({ open: true, id: inv.id, email: inv.email })}>
                        <Trash2 className="h-3 w-3 text-destructive" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-[10px] text-muted-foreground">Obra: {obraName(inv.obra_id)} · Expira: {new Date(inv.expires_at).toLocaleDateString("pt-BR")}</p>
                </CardContent>
              </Card>
            );
          })}
          {invites.length === 0 && <p className="text-center text-sm text-muted-foreground py-8">Nenhum convite enviado</p>}
        </div>
      ) : (
        <div className="glass-card overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Email</TableHead>
                <TableHead>Papel</TableHead>
                <TableHead>Obra</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Expira</TableHead>
                <TableHead className="w-[100px]">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invites.map((inv) => {
                const status = getStatus(inv);
                return (
                  <TableRow key={inv.id}>
                    <TableCell className="font-medium">{inv.email}</TableCell>
                    <TableCell><Badge variant="secondary" className={`${roleBadgeColor[inv.role as AppRole]} text-xs`}>{inv.role}</Badge></TableCell>
                    <TableCell className="text-sm text-muted-foreground">{obraName(inv.obra_id)}</TableCell>
                    <TableCell><Badge variant="secondary" className={`${status.cls} text-xs`}>{status.label}</Badge></TableCell>
                    <TableCell className="text-xs text-muted-foreground">{new Date(inv.expires_at).toLocaleDateString("pt-BR")}</TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => copyLink(inv.token)} disabled={inv.used || status.label === "Expirado"}>
                          {copiedToken === inv.token ? <Check className="h-3.5 w-3.5 text-status-ok" /> : <Copy className="h-3.5 w-3.5" />}
                        </Button>
                        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setDeleteConfirm({ open: true, id: inv.id, email: inv.email })}>
                          <Trash2 className="h-3.5 w-3.5 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
              {invites.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground py-8">Nenhum convite enviado</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}

      <ConfirmDialog
        open={deleteConfirm.open}
        onOpenChange={(v) => setDeleteConfirm(prev => ({ ...prev, open: v }))}
        title="Excluir Convite"
        description={`Deseja remover o convite para "${deleteConfirm.email}"?`}
        onConfirm={() => deleteInvite(deleteConfirm.id, deleteConfirm.email)}
      />
    </div>
  );
}
