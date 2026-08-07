import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/hooks/useAuth";
import { usePeriodFilter } from "@/hooks/usePeriodFilter";

export interface ProdutividadeEquipeRow {
  equipe: string;
  registros: number;
  dias_trabalhados: number;
  producao_total: number;
  producao_media_dia: number;
}

/**
 * RPC oficial — fonte única de verdade para produtividade por equipe.
 * Período vem do PeriodFilterContext — queryKey inclui start/end (refetch automático ao trocar filtro).
 */
export function useProdutividadeEquipe(obraId: string | null, start?: string, end?: string) {
  const { profile, isGuest, sessionStable } = useAuth();
  const { start: ctxStart, end: ctxEnd } = usePeriodFilter();
  const tenantId = profile?.tenant_id || null;

  const _start = start ?? ctxStart ?? null;
  const _end = end ?? ctxEnd;

  return useQuery({
    queryKey: ["produtividade_equipe", tenantId, obraId, _start, _end],
    queryFn: async (): Promise<ProdutividadeEquipeRow[]> => {
      if (!obraId || isGuest || !tenantId) return [];
      const args: any = { _obra_id: obraId, _end };
      if (_start) args._start = _start;
      const { data, error } = await supabase.rpc("produtividade_por_equipe", args);
      if (error) throw error;
      return (data as ProdutividadeEquipeRow[]) || [];
    },
    enabled: !!obraId && !!tenantId && !!_end && sessionStable && !isGuest,
    staleTime: 0, // filtros = sempre fresh (coordenada #6)
    gcTime: 30_000,
    refetchOnWindowFocus: true,
  });
}
