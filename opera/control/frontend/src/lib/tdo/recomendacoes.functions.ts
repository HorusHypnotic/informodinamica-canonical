import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { gerarRecomendacoesPriorizadas, type AcoesPorPrazo } from "./recomendacoes";

type SupabaseClientLike = { from: (t: string) => any };

export const listRecomendacoesByCausa = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { causaId: string }) => z.object({ causaId: z.string().uuid() }).parse(d))
  .handler(async ({ context, data }) => {
    const sb = context.supabase as SupabaseClientLike;
    const { data: rows, error } = await sb
      .from("recomendacoes").select("*").eq("causa_raiz_id", data.causaId)
      .order("prazo", { ascending: true });
    if (error) throw new Error(error.message);
    return rows ?? [];
  });

export const listImplementacoesByCausa = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { causaId: string }) => z.object({ causaId: z.string().uuid() }).parse(d))
  .handler(async ({ context, data }) => {
    const sb = context.supabase as SupabaseClientLike;
    const { data: rows, error } = await sb
      .from("recomendacoes_implementadas").select("*")
      .eq("causa_raiz_id", data.causaId)
      .order("implementada_em", { ascending: false });
    if (error) throw new Error(error.message);
    return rows ?? [];
  });

export const marcarRecomendacaoImplementada = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) =>
    z.object({
      recomendacaoId: z.string().uuid(),
      causaRaizId: z.string().uuid(),
      icoAntes: z.number().nullable().optional(),
      observacoes: z.string().max(1000).nullable().optional(),
    }).parse(d),
  )
  .handler(async ({ context, data }) => {
    const sb = context.supabase as SupabaseClientLike;
    const { data: row, error } = await sb
      .from("recomendacoes_implementadas")
      .insert({
        user_id: context.userId,
        recomendacao_id: data.recomendacaoId,
        causa_raiz_id: data.causaRaizId,
        ico_antes: data.icoAntes ?? null,
        observacoes: data.observacoes ?? null,
      })
      .select().single();
    if (error) throw new Error(error.message);
    return row;
  });

export const registrarResultadoImplementacao = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) =>
    z.object({
      id: z.string().uuid(),
      icoDepois: z.number(),
    }).parse(d),
  )
  .handler(async ({ context, data }) => {
    const sb = context.supabase as SupabaseClientLike;
    const { error } = await sb
      .from("recomendacoes_implementadas")
      .update({ ico_depois: data.icoDepois })
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const getRecomendacoesPriorizadas = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const sb = context.supabase as SupabaseClientLike;
    const [{ data: causas }, { data: ecos }, { data: recs }] = await Promise.all([
      sb.from("causas_raiz").select("id, nome"),
      sb.from("ecos").select("causa_raiz_id, ico"),
      sb.from("recomendacoes").select("causa_raiz_id, prazo, acao"),
    ]);
    const map: Record<string, AcoesPorPrazo> = {};
    for (const r of (recs ?? []) as { causa_raiz_id: string; prazo: "curto"|"medio"|"estruturante"; acao: string }[]) {
      if (!map[r.causa_raiz_id]) map[r.causa_raiz_id] = { curto: [], medio: [], estruturante: [] };
      map[r.causa_raiz_id][r.prazo].push(r.acao);
    }
    return gerarRecomendacoesPriorizadas(causas ?? [], ecos ?? [], map);
  });
