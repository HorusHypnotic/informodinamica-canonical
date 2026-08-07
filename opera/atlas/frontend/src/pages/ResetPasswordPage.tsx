import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const getRecoveryToken = () => {
  const hashParams = new URLSearchParams(window.location.hash.replace("#", ""));
  return hashParams.get("type") === "recovery";
};

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const isRecoveryFlow = useMemo(() => getRecoveryToken(), []);

  const handleSubmit = async () => {
    if (!isRecoveryFlow) {
      toast.error("Link inválido ou expirado. Solicite uma nova recuperação.");
      return;
    }

    if (!password || password.length < 8) {
      toast.error("A nova senha deve ter no mínimo 8 caracteres.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("As senhas não coincidem.");
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      toast.error("Erro ao redefinir senha: " + error.message);
      setLoading(false);
      return;
    }

    toast.success("Senha redefinida com sucesso! Faça login.");
    navigate("/login", { replace: true });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="glass-card p-8 w-full max-w-sm space-y-5">
        <div>
          <h1 className="text-xl font-bold">Redefinir senha</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Digite sua nova senha para concluir a recuperação.
          </p>
        </div>

        {!isRecoveryFlow && (
          <p className="text-sm text-destructive">
            Este link não é válido para recuperação de senha.
          </p>
        )}

        <div className="space-y-3">
          <Input
            type="password"
            placeholder="Nova senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Confirmar nova senha"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          />
        </div>

        <Button onClick={handleSubmit} disabled={loading || !isRecoveryFlow} className="w-full">
          {loading ? "Salvando..." : "Salvar nova senha"}
        </Button>

        <div className="text-center">
          <Link to="/login" className="text-xs text-muted-foreground hover:text-primary transition-colors">
            Voltar para login
          </Link>
        </div>
      </div>
    </div>
  );
}
