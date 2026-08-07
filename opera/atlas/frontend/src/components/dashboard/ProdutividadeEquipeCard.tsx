import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

/**
 * Aceita tanto o formato do RPC (snake_case) quanto o legado (camelCase).
 * RPC é a fonte oficial — preferir useProdutividadeEquipe.
 */
export interface EquipeRow {
  equipe: string;
  registros: number;
  dias_trabalhados?: number;
  diasTrabalhados?: number;
  producao_total?: number;
  producaoTotal?: number;
  producao_media_dia?: number;
  producaoMediaDia?: number;
}

interface Props {
  equipes: EquipeRow[];
}

function formatEquipe(slug: string): string {
  if (!slug) return "—";
  return slug
    .split("_")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export function ProdutividadeEquipeCard({ equipes }: Props) {
  const normalized = equipes.map((e) => ({
    equipe: e.equipe,
    registros: e.registros,
    dias: e.dias_trabalhados ?? e.diasTrabalhados ?? 0,
    producaoTotal: e.producao_total ?? e.producaoTotal ?? 0,
    producaoMediaDia: e.producao_media_dia ?? e.producaoMediaDia ?? 0,
  }));
  const top = normalized.slice(0, 5);
  const max = top.reduce((m, e) => Math.max(m, e.producaoTotal), 0) || 1;

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            <Users className="h-4 w-4 text-primary" />
            Produtividade por Equipe
          </CardTitle>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="text-muted-foreground hover:text-foreground transition-colors">
                  <Info className="h-3.5 w-3.5" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="left" className="max-w-xs">
                <p className="text-xs">
                  Soma de produção numérica por equipe (campo <strong>Equipe</strong> no Registro Diário).
                  Equipes são normalizadas automaticamente (ex: "Equipe A" e "equipe a" agrupam).
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>
      <CardContent>
        {top.length === 0 ? (
          <p className="text-xs text-muted-foreground py-4 text-center">
            Sem registros de produção no período.
          </p>
        ) : (
          <div className="space-y-2">
            {top.map((e) => (
              <div key={e.equipe} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium truncate flex-1 mr-2">{formatEquipe(e.equipe)}</span>
                  <span className="text-muted-foreground tabular-nums">
                    {e.producaoTotal.toLocaleString("pt-BR")}
                  </span>
                </div>
                <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all"
                    style={{ width: `${(e.producaoTotal / max) * 100}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                  <span>{e.dias} dia(s) • {e.registros} registro(s)</span>
                  <span>~ {e.producaoMediaDia.toLocaleString("pt-BR")}/dia</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
