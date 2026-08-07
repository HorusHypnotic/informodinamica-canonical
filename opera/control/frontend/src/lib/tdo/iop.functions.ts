import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

type SupabaseLike = { from: (t: string) => any };

export const getIOPData = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const sb = context.supabase as SupabaseLike;
    const [ecosR, causasR, recsR, implsR, decisoesR] = await Promise.all([
      sb.from("ecos").select("ico, data_evento, causa_raiz_id, valor_prejuizo, decisao_mdeo_id"),
      sb.from("causas_raiz").select("id"),
      sb.from("recomendacoes").select("prazo, created_at, id"),
      sb.from("recomendacoes_implementadas").select("recomendacao_id"),
      sb.from("decisoes_economicas").select("id, status"),
    ]);
    if (ecosR.error) throw new Error(ecosR.error.message);
    if (causasR.error) throw new Error(causasR.error.message);
    if (recsR.error) throw new Error(recsR.error.message);
    if (implsR.error) throw new Error(implsR.error.message);
    if (decisoesR.error) throw new Error(decisoesR.error.message);

    return {
      ecos: (ecosR.data ?? []) as {
        ico: number | null;
        data_evento: string;
        causa_raiz_id: string | null;
        valor_prejuizo: number | string | null;
        decisao_mdeo_id: string | null;
      }[],
      totalCausas: (causasR.data ?? []).length,
      recomendacoes: (recsR.data ?? []) as { prazo: "curto" | "medio" | "estruturante"; created_at?: string }[],
      implementadas: (implsR.data ?? []) as { recomendacao_id: string }[],
      decisoes: (decisoesR.data ?? []) as { id: string; status?: string | null }[],
    };
  });
