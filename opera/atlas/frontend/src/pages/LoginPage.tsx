import { supabase } from "@/lib/supabase";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LogIn, UserCheck, Mail, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function LoginPage() {
  const { user, loading, enterGuestMode } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [signingIn, setSigningIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);
  const [syncLoading, setSyncLoading] = useState(false);

  // Handle sync code from QR — verifies OTP to create independent mobile session
  useEffect(() => {
    const syncCode = searchParams.get("sync");
    if (!syncCode || user) return;

    setSyncLoading(true);
    const projectId = import.meta.env.VITE_SUPABASE_PROJECT_ID;
    fetch(
      `https://${projectId}.supabase.co/functions/v1/session-transfer?code=${syncCode}`
    )
      .then((r) => r.json())
      .then(async (data) => {
        if (data.email && data.token_hash) {
          // Verify the OTP token_hash to create a fully independent session
          const { error } = await supabase.auth.verifyOtp({
            email: data.email,
            token: data.token_hash,
            type: "email",
          });
          if (error) {
            console.error("[Sync] verifyOtp error:", error);
            toast.error("Erro ao restaurar sessão: " + error.message);
          } else {
            toast.success("Login restaurado com sucesso!");
            navigate("/", { replace: true });
          }
        } else {
          toast.error(data.error || "Código expirado ou inválido");
        }
      })
      .catch(() => toast.error("Erro de conexão ao sincronizar"))
      .finally(() => setSyncLoading(false));
  }, [searchParams, user, navigate]);

  useEffect(() => {
    if (!loading && user && !searchParams.get("sync")) {
      navigate("/", { replace: true });
    }
  }, [user, loading, navigate, searchParams]);

  const handleGoogleLogin = async () => {
    setSigningIn(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin,
      },
    });
    if (error) {
      toast.error("Erro ao conectar com Google: " + error.message);
      setSigningIn(false);
    }
  };

  const handlePasswordReset = async () => {
    if (!email) {
      toast.error("Informe seu email para recuperar a senha");
      return;
    }

    setResetLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) {
      toast.error("Erro ao enviar recuperação: " + error.message);
    } else {
      toast.success("Enviamos um link para redefinir sua senha.");
    }
    setResetLoading(false);
  };

  const handleEmailAuth = async () => {
    if (!email || !password) {
      toast.error("Preencha email e senha");
      return;
    }
    setEmailLoading(true);

    if (isSignUp) {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: window.location.origin },
      });

      if (error) {
        toast.error("Erro ao cadastrar: " + error.message);
      } else if (data.user && (data.user.identities?.length ?? 0) === 0) {
        toast.error("Este email já está cadastrado. Faça login ou redefina sua senha.");
        setIsSignUp(false);
      } else {
        toast.success("Conta criada com sucesso! Faça login para continuar.");
        setIsSignUp(false);
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        toast.error("Credenciais inválidas. Confira a senha ou use 'Esqueci minha senha'.");
      }
    }
    setEmailLoading(false);
  };

  const handleGuest = () => {
    enterGuestMode();
    navigate("/", { replace: true });
  };

  if (loading || syncLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          {syncLoading && (
            <p className="text-sm text-muted-foreground">Restaurando sessão...</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="glass-card p-8 w-full max-w-sm text-center space-y-6">
        <div className="flex items-center justify-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center font-bold text-primary-foreground text-lg">
            OP
          </div>
          <div className="text-left">
            <h1 className="text-xl font-bold tracking-tight">Método O.P.E.R.A.</h1>
            <p className="text-xs text-muted-foreground">Gestão Inteligente de Obras</p>
          </div>
        </div>

        <div className="space-y-3">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleEmailAuth()}
          />
          <Button
            onClick={handleEmailAuth}
            disabled={emailLoading}
            className="w-full gap-2"
            size="lg"
          >
            <Mail className="h-4 w-4" />
            {emailLoading ? "Aguarde..." : isSignUp ? "Criar Conta" : "Entrar com Email"}
          </Button>
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              {isSignUp ? "Já tem conta? Faça login" : "Não tem conta? Cadastre-se"}
            </button>

            {!isSignUp && (
              <>
                <span className="text-xs text-muted-foreground/40">•</span>
                <button
                  onClick={handlePasswordReset}
                  disabled={resetLoading}
                  className="text-xs text-muted-foreground hover:text-primary transition-colors disabled:opacity-60"
                >
                  {resetLoading ? "Enviando..." : "Esqueci minha senha"}
                </button>
              </>
            )}
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-card px-2 text-muted-foreground">ou</span>
          </div>
        </div>

        <div className="space-y-3">
          <Button
            onClick={handleGoogleLogin}
            disabled={signingIn}
            variant="outline"
            className="w-full gap-2"
            size="lg"
          >
            <LogIn className="h-4 w-4" />
            {signingIn ? "Redirecionando..." : "Entrar com Google"}
          </Button>

          <Button
            onClick={handleGuest}
            variant="ghost"
            className="w-full gap-2 text-muted-foreground"
            size="lg"
          >
            <UserCheck className="h-4 w-4" />
            Entrar como Convidado (Demo)
          </Button>
        </div>

        <p className="text-[10px] text-muted-foreground">
          Modo convidado permite explorar o sistema com dados de demonstração.
        </p>
      </div>
    </div>
  );
}
