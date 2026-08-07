import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, UserCheck, Clock, XCircle, Link2, TrendingUp } from "lucide-react";

interface BetaMetrics {
  total: number;
  aguardando: number;
  aprovados: number;
  listaEspera: number;
  rejeitados: number;
  limiteVagas: number;
  vagasRestantes: number;
  influencers: { codigo: string; nome: string; cadastros: number; convertidos: number; ativo: boolean }[];
}

export function BetaMetricsTab() {
  const [metrics, setMetrics] = useState<BetaMetrics | null>(null);

  useEffect(() => {
    const fetch = async () => {
      const [waitlistRes, configRes, influencerRes] = await Promise.all([
        supabase.from("beta_waitlist").select("status"),
        supabase.from("beta_config").select("*").limit(1).maybeSingle(),
        supabase.from("influencer_codes").select("*").order("total_cadastros", { ascending: false }),
      ]);

      const list = (waitlistRes.data || []) as { status: string }[];
      const config = configRes.data;
      const aguardando = list.filter((r) => r.status === "aguardando_aprovacao").length;
      const aprovados = list.filter((r) => r.status === "aprovado").length;
      const listaEspera = list.filter((r) => r.status === "lista_de_espera").length;
      const rejeitados = list.filter((r) => r.status === "rejeitado").length;
      const limite = config?.limite_vagas ?? 5;

      setMetrics({
        total: list.length,
        aguardando,
        aprovados,
        listaEspera,
        rejeitados,
        limiteVagas: limite,
        vagasRestantes: Math.max(0, limite - aguardando - aprovados),
        influencers: (influencerRes.data || []).map((i: any) => ({
          codigo: i.codigo,
          nome: i.nome,
          cadastros: i.total_cadastros,
          convertidos: i.total_convertidos,
          ativo: i.ativo,
        })),
      });
    };
    fetch();
  }, []);

  if (!metrics) {
    return <div className="text-center py-8 text-muted-foreground">Carregando métricas...</div>;
  }

  const kpis = [
    { label: "Total Cadastros", value: metrics.total, icon: Users, color: "text-primary" },
    { label: "Aprovados", value: metrics.aprovados, icon: UserCheck, color: "text-status-ok" },
    { label: "Pendentes", value: metrics.aguardando, icon: Clock, color: "text-chart-4" },
    { label: "Lista de Espera", value: metrics.listaEspera, icon: Clock, color: "text-muted-foreground" },
    { label: "Rejeitados", value: metrics.rejeitados, icon: XCircle, color: "text-destructive" },
    { label: "Vagas Restantes", value: `${metrics.vagasRestantes}/${metrics.limiteVagas}`, icon: TrendingUp, color: metrics.vagasRestantes > 0 ? "text-status-ok" : "text-destructive" },
  ];

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {kpis.map((kpi) => (
          <Card key={kpi.label} className="glass-card">
            <CardContent className="p-4 text-center space-y-1">
              <kpi.icon className={`h-5 w-5 mx-auto ${kpi.color}`} />
              <p className={`text-2xl font-bold ${kpi.color}`}>{kpi.value}</p>
              <p className="text-xs text-muted-foreground">{kpi.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Influencer Table */}
      <Card className="glass-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            <Link2 className="h-4 w-4" /> Influenciadores
          </CardTitle>
        </CardHeader>
        <CardContent>
          {metrics.influencers.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">Nenhum código de influenciador cadastrado</p>
          ) : (
            <div className="space-y-3">
              {metrics.influencers.map((inf) => (
                <div key={inf.codigo} className="flex items-center justify-between p-3 rounded-lg border border-border/50 bg-muted/10">
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary" className="font-mono text-xs">{inf.codigo}</Badge>
                    <span className="text-sm font-medium">{inf.nome}</span>
                    {!inf.ativo && <Badge variant="destructive" className="text-xs">Inativo</Badge>}
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="text-center">
                      <p className="font-bold text-primary">{inf.cadastros}</p>
                      <p className="text-xs text-muted-foreground">Cadastros</p>
                    </div>
                    <div className="text-center">
                      <p className="font-bold text-status-ok">{inf.convertidos}</p>
                      <p className="text-xs text-muted-foreground">Conversões</p>
                    </div>
                    <div className="text-center">
                      <p className="font-bold">{inf.cadastros > 0 ? Math.round((inf.convertidos / inf.cadastros) * 100) : 0}%</p>
                      <p className="text-xs text-muted-foreground">Taxa</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
