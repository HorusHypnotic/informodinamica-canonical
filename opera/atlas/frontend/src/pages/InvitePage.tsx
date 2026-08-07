import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { UserPlus, Shield, BarChart3, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const roleLabels: Record<string, string> = {
  admin: "Administrador",
  gestor: "Gestor",
  operacional: "Operacional",
  visualizador: "Visualizador",
};

const roleDescriptions: Record<string, string> = {
  admin: "Acesso total: gerenciar equipe, obras e indicadores",
  gestor: "Gerenciar obras e equipes, visualizar todos os indicadores",
  operacional: "Alimentar dados e registros diários das obras",
  visualizador: "Visualizar indicadores e relatórios das obras",
};

export default function InvitePage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");
  const [invite, setInvite] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!token) { setLoading(false); return; }
    (supabase as any).rpc("get_invite_by_token", { _token: token })
      .then(({ data }: any) => {
        const row = Array.isArray(data) ? data[0] : data;
        if (row) {
          setInvite({ ...row, token });
          setEmail(row.email);
        }
        setLoading(false);
      });
  }, [token]);

  const handleAcceptInvite = async () => {
    if (!email || !password || !invite) return;
    setSubmitting(true);

    try {
      const { data, error } = await supabase.functions.invoke("accept-invite", {
        body: { token: invite.token, email, password, full_name: fullName },
      });

      if (error || data?.error) {
        toast.error(data?.error || error?.message || "Erro ao aceitar convite");
        setSubmitting(false);
        return;
      }

      // Auto-login
      const { error: loginErr } = await supabase.auth.signInWithPassword({ email, password });
      if (loginErr) {
        toast.error("Conta criada, mas houve erro ao entrar. Faça login manualmente.");
        navigate("/login");
      } else {
        toast.success("Bem-vindo! Acesso liberado.");
        navigate("/");
      }
    } catch (err: any) {
      toast.error("Erro inesperado: " + err.message);
    }

    setSubmitting(false);
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full" />
    </div>
  );

  if (!invite) return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="glass-card p-8 max-w-sm text-center space-y-4">
        <p className="text-lg font-semibold">Convite inválido ou expirado</p>
        <p className="text-sm text-muted-foreground">Solicite um novo convite ao administrador da sua empresa.</p>
        <Button onClick={() => navigate("/login")}>Ir para login</Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="glass-card p-6 sm:p-8 w-full max-w-md space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center shrink-0">
            <UserPlus className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold">Você foi convidado!</h1>
            <p className="text-xs text-muted-foreground">Crie sua conta e acesse imediatamente</p>
          </div>
        </div>

        <div className="bg-muted/50 rounded-lg p-3 space-y-2">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Seu papel:</span>
            <Badge variant="secondary" className="text-xs">{roleLabels[invite.role] || invite.role}</Badge>
          </div>
          <p className="text-xs text-muted-foreground pl-6">
            {roleDescriptions[invite.role] || "Acesso ao sistema O.P.E.R.A."}
          </p>
        </div>

        <div className="flex items-start gap-2 text-xs text-muted-foreground bg-muted/30 rounded-lg p-3">
          <BarChart3 className="h-4 w-4 shrink-0 mt-0.5 text-primary" />
          <span>Após criar sua conta, você terá acesso direto aos indicadores e dados das obras da sua empresa.</span>
        </div>

        <div className="space-y-3">
          <div className="space-y-1">
            <label className="text-xs text-muted-foreground">Nome completo</label>
            <Input value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Seu nome" />
          </div>
          <div className="space-y-1">
            <label className="text-xs text-muted-foreground">Email</label>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" disabled />
          </div>
          <div className="space-y-1">
            <label className="text-xs text-muted-foreground">Crie uma senha</label>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mínimo 6 caracteres" />
          </div>
          <Button onClick={handleAcceptInvite} disabled={submitting || !password || password.length < 6} className="w-full gap-1.5">
            <Users className="h-4 w-4" />
            {submitting ? "Criando acesso..." : "Criar Conta e Entrar"}
          </Button>
        </div>

        <p className="text-[10px] text-center text-muted-foreground">
          Ao criar sua conta, você concorda com os termos de uso do sistema O.P.E.R.A.
        </p>
      </div>
    </div>
  );
}
