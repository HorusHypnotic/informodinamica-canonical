import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const CENARIO = z.enum([
  "aluguel_vs_compra","terceirizacao_vs_proprio","corretiva_vs_preventiva",
  "estoque_vs_jit","capacitacao_vs_substituicao","vista_vs_parcelado",
  "internalizar_vs_subcontratar",
]);

const STATUS = z.enum(["rascunho","aprovada","descartada"]);

const DecisaoInput = z.object({
  id: z.string().uuid().optional(),
  cenario: CENARIO,
  titulo: z.string().min(1).max(300),
  horizonte_meses: z.number().int().min(1).max(360),
  premissas: z.record(z.string(), z.union([z.number(), z.string(), z.null()])).default({}),
  custos_a: z.record(z.string(), z.union([z.number(), z.string(), z.null()])).default({}),
  custos_b: z.record(z.string(), z.union([z.number(), z.string(), z.null()])).default({}),
  investimento_inicial_a: z.number().min(0).default(0),
  status: STATUS.default("rascunho"),
  observacoes: z.string().max(2000).nullable().optional(),
});

export const listDecisoes = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase
      .from("decisoes_economicas")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return data;
  });

export const getDecisao = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { id: string }) => z.object({ id: z.string().uuid() }).parse(d))
  .handler(async ({ context, data }) => {
    const { data: row, error } = await context.supabase
      .from("decisoes_economicas").select("*").eq("id", data.id).maybeSingle();
    if (error) throw new Error(error.message);
    return row;
  });

export const upsertDecisao = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => DecisaoInput.parse(d))
  .handler(async ({ context, data }) => {
    const payload = { ...data, user_id: context.userId };
    const { data: row, error } = data.id
      ? await context.supabase.from("decisoes_economicas").update(payload).eq("id", data.id).select().single()
      : await context.supabase.from("decisoes_economicas").insert(payload).select().single();
    if (error) throw new Error(error.message);
    return row;
  });

export const deleteDecisao = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { id: string }) => z.object({ id: z.string().uuid() }).parse(d))
  .handler(async ({ context, data }) => {
    const { error } = await context.supabase.from("decisoes_economicas").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const getCapitalPreservado = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase
      .from("vw_capital_preservado").select("*").maybeSingle();
    if (error) throw new Error(error.message);
    return data ?? { capital_preservado: 0, epi_mes: 0 };
  });
