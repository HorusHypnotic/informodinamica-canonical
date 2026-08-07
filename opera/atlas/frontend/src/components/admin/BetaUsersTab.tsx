import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { CheckCircle2, XCircle, Clock, MessageCircle, Copy, Check, KeyRound } from "lucide-react";

interface BetaUser {
  id: string;
  nome: string;
  email: string;
  telefone: string | null;
  empresa: string | null;
  influencer_code: string | null;
  status: string;
  created_at: string;
}

const statusLabels: Record<string, string> = {
  aguardando_aprovacao: "Pendente",
  aprovado: "Aprovado",
  lista_de_espera: "Lista de Espera",
  rejeitado: "Rejeitado",
};

const statusColors: Record<string, string> = {
  aguardando_aprovacao: "bg-chart-4/20 text-chart-4",
  aprovado: "bg-status-ok/20 text-status-ok",
  lista_de_espera: "bg-muted text-muted-foreground",
  rejeitado: "bg-destructive/20 text-destructive",
};

export function BetaUsersTab() {
  const [users, setUsers] = useState<BetaUser[]>([]);
  const [filterStatus, setFilterStatus] = useState("todos");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [generatingLink, setGeneratingLink] = useState<string | null>(null);

  const fetchUsers = async () => {
    let q = supabase.from("beta_waitlist").select("*").order("created_at", { ascending: false });
    if (filterStatus !== "todos") q = q.eq("status", filterStatus);
    const { data } = await q;
    if (data) setUsers(data as BetaUser[]);
  };

  useEffect(() => { fetchUsers(); }, [filterStatus]);

  const updateStatus = async (id: string, newStatus: string) => {
    const { error } = await supabase.from("beta_waitlist").update({ status: newStatus, updated_at: new Date().toISOString() }).eq("id", id);
    if (error) toast.error("Erro: " + error.message);
    else { toast.success("Status atualizado!"); fetchUsers(); }
  };

  const generateResetLink = async (user: BetaUser) => {
    setGeneratingLink(user.id);
    try {
      const { data, error } = await supabase.functions.invoke("generate-reset-link", {
        body: {
          email: user.email,
          redirect_to: `${window.location.origin}/reset-password`,
        },
      });

      if (error || data?.error) {
        toast.error(data?.error || "Erro ao gerar link de redefinição");
        return;
      }

      const link = data?.link;
      if (link) {
        const phone = user.telefone?.replace(/\D/g, "") || "";
        const msg = `Olá ${user.nome}! 🔑\n\nAqui está seu link para definir/redefinir a senha do Método O.P.E.R.A.:\n\n${link}\n\nEsse link expira em 24h.`;

        if (phone) {
          window.open(`https://wa.me/55${phone}?text=${encodeURIComponent(msg)}`, "_blank");
        } else {
          await navigator.clipboard.writeText(link);
          toast.success("Link copiado! Usuário sem telefone cadastrado.");
        }
      }
    } catch {
      toast.error("Erro ao gerar link.");
    } finally {
      setGeneratingLink(null);
    }
  };

  const approveAndNotify = async (user: BetaUser) => {
    await updateStatus(user.id, "aprovado");
    const signupUrl = `${window.location.origin}/login`;
    const phone = user.telefone?.replace(/\D/g, "") || "";
    const msg = encodeURIComponent(
      `Olá ${user.nome}! 🎉\n\n` +
      `Seu acesso ao Beta do Método O.P.E.R.A. foi *aprovado*!\n\n` +
      `Crie sua conta acessando:\n${signupUrl}\n\n` +
      `Use o email: ${user.email}\n\n` +
      `Qualquer dúvida, estamos aqui!`
    );
    if (phone) {
      window.open(`https://wa.me/55${phone}?text=${msg}`, "_blank");
    } else {
      navigator.clipboard.writeText(decodeURIComponent(msg));
      toast.info("Mensagem copiada! O usuário não tem telefone cadastrado.");
    }
  };

  const copySignupLink = (user: BetaUser) => {
    const link = `${window.location.origin}/login`;
    navigator.clipboard.writeText(link);
    setCopiedId(user.id);
    toast.success("Link de cadastro copiado!");
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filtrar status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos</SelectItem>
            <SelectItem value="aguardando_aprovacao">Pendentes</SelectItem>
            <SelectItem value="aprovado">Aprovados</SelectItem>
            <SelectItem value="lista_de_espera">Lista de Espera</SelectItem>
            <SelectItem value="rejeitado">Rejeitados</SelectItem>
          </SelectContent>
        </Select>
        <Badge variant="secondary" className="text-xs">{users.length} registros</Badge>
      </div>

      <div className="glass-card overflow-x-auto -mx-4 sm:mx-0">
        <Table className="min-w-[700px]">
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Telefone</TableHead>
              <TableHead>Empresa</TableHead>
              <TableHead>Código</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Data</TableHead>
              <TableHead className="w-[220px]">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((u) => (
              <TableRow key={u.id}>
                <TableCell className="font-medium">{u.nome}</TableCell>
                <TableCell className="text-sm text-muted-foreground">{u.email}</TableCell>
                <TableCell className="text-sm text-muted-foreground">{u.telefone || "—"}</TableCell>
                <TableCell className="text-sm">{u.empresa || "—"}</TableCell>
                <TableCell className="text-sm font-mono">{u.influencer_code || "—"}</TableCell>
                <TableCell>
                  <Badge variant="secondary" className={`text-xs ${statusColors[u.status] || ""}`}>
                    {statusLabels[u.status] || u.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-xs text-muted-foreground">
                  {new Date(u.created_at).toLocaleDateString("pt-BR")}
                </TableCell>
                <TableCell>
                  <div className="flex gap-1 flex-wrap">
                    {u.status !== "aprovado" && (
                      <Button variant="ghost" size="icon" className="h-7 w-7" title="Aprovar e notificar via WhatsApp" onClick={() => approveAndNotify(u)}>
                        <CheckCircle2 className="h-3.5 w-3.5 text-status-ok" />
                      </Button>
                    )}
                    {u.status === "aprovado" && (
                      <>
                        <Button variant="ghost" size="icon" className="h-7 w-7" title="Copiar link de cadastro" onClick={() => copySignupLink(u)}>
                          {copiedId === u.id ? <Check className="h-3.5 w-3.5 text-status-ok" /> : <Copy className="h-3.5 w-3.5" />}
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7"
                          title="Gerar link de redefinição de senha (WhatsApp)"
                          onClick={() => generateResetLink(u)}
                          disabled={generatingLink === u.id}
                        >
                          <KeyRound className={`h-3.5 w-3.5 text-chart-4 ${generatingLink === u.id ? "animate-spin" : ""}`} />
                        </Button>
                      </>
                    )}
                    {u.status !== "rejeitado" && (
                      <Button variant="ghost" size="icon" className="h-7 w-7" title="Rejeitar" onClick={() => updateStatus(u.id, "rejeitado")}>
                        <XCircle className="h-3.5 w-3.5 text-destructive" />
                      </Button>
                    )}
                    {u.status !== "lista_de_espera" && (
                      <Button variant="ghost" size="icon" className="h-7 w-7" title="Lista de espera" onClick={() => updateStatus(u.id, "lista_de_espera")}>
                        <Clock className="h-3.5 w-3.5 text-chart-4" />
                      </Button>
                    )}
                    {u.telefone && (
                      <Button variant="ghost" size="icon" className="h-7 w-7" title="WhatsApp" asChild>
                        <a href={`https://wa.me/55${u.telefone.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer">
                          <MessageCircle className="h-3.5 w-3.5 text-primary" />
                        </a>
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {users.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} className="text-center text-muted-foreground py-8">
                  Nenhum registro encontrado
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
