import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Settings, Save } from "lucide-react";

interface BetaConfig {
  id: string;
  limite_vagas: number;
  beta_ativo: boolean;
  lista_espera_ativa: boolean;
  tempo_teste_dias: number;
}

export function BetaConfigTab() {
  const [config, setConfig] = useState<BetaConfig | null>(null);
  const [saving, setSaving] = useState(false);

  const fetchConfig = async () => {
    const { data } = await supabase.from("beta_config").select("*").limit(1).maybeSingle();
    if (data) setConfig(data as BetaConfig);
  };

  useEffect(() => { fetchConfig(); }, []);

  const save = async () => {
    if (!config) return;
    setSaving(true);
    const { error } = await supabase.from("beta_config").update({
      limite_vagas: config.limite_vagas,
      beta_ativo: config.beta_ativo,
      lista_espera_ativa: config.lista_espera_ativa,
      tempo_teste_dias: config.tempo_teste_dias,
      updated_at: new Date().toISOString(),
    }).eq("id", config.id);
    setSaving(false);
    if (error) toast.error("Erro ao salvar: " + error.message);
    else toast.success("Configuração salva!");
  };

  if (!config) return <div className="text-center text-muted-foreground py-8">Carregando...</div>;

  return (
    <div className="space-y-6">
      <div className="glass-card p-6 space-y-6 max-w-lg">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <Settings className="h-4 w-4" /> Configurações do Beta
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Beta ativo</p>
              <p className="text-xs text-muted-foreground">Aceitar novos cadastros</p>
            </div>
            <Switch checked={config.beta_ativo} onCheckedChange={(v) => setConfig({ ...config, beta_ativo: v })} />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Lista de espera ativa</p>
              <p className="text-xs text-muted-foreground">Cadastrar excedentes na lista de espera</p>
            </div>
            <Switch checked={config.lista_espera_ativa} onCheckedChange={(v) => setConfig({ ...config, lista_espera_ativa: v })} />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium">Limite de vagas</label>
            <Input
              type="number"
              min={1}
              value={config.limite_vagas}
              onChange={(e) => setConfig({ ...config, limite_vagas: parseInt(e.target.value) || 1 })}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium">Tempo de teste (dias)</label>
            <Input
              type="number"
              min={1}
              value={config.tempo_teste_dias}
              onChange={(e) => setConfig({ ...config, tempo_teste_dias: parseInt(e.target.value) || 30 })}
            />
          </div>
        </div>

        <Button onClick={save} disabled={saving} className="w-full gap-1.5">
          <Save className="h-4 w-4" /> {saving ? "Salvando..." : "Salvar Configurações"}
        </Button>
      </div>
    </div>
  );
}
