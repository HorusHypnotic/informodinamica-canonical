import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/lib/supabase";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Building2, LogOut } from "lucide-react";

/**
 * First-time setup: when a user has no tenant_id,
 * they create their company (tenant) and become admin.
 */
export default function SetupPage() {
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSetup = async () => {
    if (!nome.trim() || !user) return;
    setLoading(true);

    const { data, error } = await supabase.rpc("setup_tenant", {
      _nome: nome.trim(),
      _cnpj: cnpj.trim() || null,
    });

    if (error) {
      toast.error("Erro ao criar empresa: " + error.message);
      setLoading(false);
      return;
    }

    toast.success("Empresa criada com sucesso!");
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="glass-card p-8 w-full max-w-md space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
            <Building2 className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold">Configuração Inicial</h1>
            <p className="text-xs text-muted-foreground">Cadastre sua empresa para começar</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-medium">Nome da Empresa</label>
            <Input value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Ex: Construtora ABC" />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium">CNPJ (opcional)</label>
            <Input value={cnpj} onChange={(e) => setCnpj(e.target.value)} placeholder="00.000.000/0000-00" />
          </div>
          <Button onClick={handleSetup} disabled={loading || !nome.trim()} className="w-full">
            {loading ? "Criando..." : "Criar Empresa e Continuar"}
          </Button>
          <Button variant="ghost" size="sm" className="w-full gap-2 text-muted-foreground" onClick={signOut}>
            <LogOut className="h-3.5 w-3.5" /> Sair e voltar ao login
          </Button>
        </div>
      </div>
    </div>
  );
}
