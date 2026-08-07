import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Building2, Save, HardHat, Users } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface TenantProfileTabProps {
  tenantId: string;
  totalUsers: number;
  totalObras: number;
}

export function TenantProfileTab({ tenantId, totalUsers, totalObras }: TenantProfileTabProps) {
  const [nome, setNome] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [limiteObras, setLimiteObras] = useState(3);
  const [saving, setSaving] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!tenantId) return;
    supabase.from("tenants").select("*").eq("id", tenantId).single().then(({ data }) => {
      if (data) {
        setNome(data.nome);
        setCnpj(data.cnpj || "");
        setLimiteObras(data.limite_obras);
        setLoaded(true);
      }
    });
  }, [tenantId]);

  const save = async () => {
    if (!nome.trim()) { toast.error("Nome é obrigatório"); return; }
    setSaving(true);
    const { error } = await supabase.from("tenants").update({
      nome: nome.trim(),
      cnpj: cnpj.trim() || null,
    } as any).eq("id", tenantId);
    setSaving(false);
    if (error) toast.error("Erro ao salvar: " + error.message);
    else toast.success("Dados atualizados!");
  };

  if (!loaded) return <div className="text-center py-8 text-muted-foreground text-sm">Carregando...</div>;

  const obraPercent = limiteObras > 0 ? Math.min(100, (totalObras / limiteObras) * 100) : 0;

  return (
    <div className="space-y-4">
      {/* Usage indicators */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Card className="glass-card">
          <CardContent className="p-4 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <HardHat className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">Obras</span>
              </div>
              <Badge variant="secondary" className={`text-xs ${obraPercent >= 100 ? "bg-destructive/20 text-destructive" : "bg-status-ok/20 text-status-ok"}`}>
                {totalObras}/{limiteObras}
              </Badge>
            </div>
            <Progress value={obraPercent} className="h-2" />
            <p className="text-[10px] text-muted-foreground">
              {obraPercent >= 100 ? "Limite atingido — solicite aumento" : `${limiteObras - totalObras} obra(s) disponível(is)`}
            </p>
          </CardContent>
        </Card>
        <Card className="glass-card">
          <CardContent className="p-4 space-y-2">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-chart-4" />
              <span className="text-sm font-medium">Usuários ativos</span>
            </div>
            <p className="text-2xl font-bold text-chart-4">{totalUsers}</p>
            <p className="text-[10px] text-muted-foreground">Total de membros no seu tenant</p>
          </CardContent>
        </Card>
      </div>

      {/* Edit tenant info */}
      <Card className="glass-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center gap-2">
            <Building2 className="h-4 w-4" /> Dados da Organização
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-1">
            <label className="text-xs text-muted-foreground">Nome da empresa</label>
            <Input value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Nome da empresa" />
          </div>
          <div className="space-y-1">
            <label className="text-xs text-muted-foreground">CNPJ (opcional)</label>
            <Input value={cnpj} onChange={(e) => setCnpj(e.target.value)} placeholder="00.000.000/0001-00" />
          </div>
          <Button onClick={save} disabled={saving} className="gap-1.5 w-full sm:w-auto">
            <Save className="h-4 w-4" /> {saving ? "Salvando..." : "Salvar Alterações"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
