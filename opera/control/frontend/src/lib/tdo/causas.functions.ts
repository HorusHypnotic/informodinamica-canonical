import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const CausaInput = z.object({
  id: z.string().uuid().optional(),
  nome: z.string().min(1).max(200),
  descricao: z.string().max(2000).optional().nullable(),
  categoria: z.enum(["processo", "pessoas", "fornecedor", "projeto", "gestao", "comunicacao", "outros"]),
  criticidade: z.enum(["baixa", "media", "alta", "critica"]),
  status: z.enum(["ativa", "monitorando", "resolvida", "arquivada"]),
});

export const listCausas = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase
      .from("causas_raiz")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return data;
  });

export const getCausa = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { id: string }) => z.object({ id: z.string().uuid() }).parse(d))
  .handler(async ({ context, data }) => {
    const { data: row, error } = await context.supabase
      .from("causas_raiz").select("*").eq("id", data.id).maybeSingle();
    if (error) throw new Error(error.message);
    return row;
  });

export const upsertCausa = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => CausaInput.parse(d))
  .handler(async ({ context, data }) => {
    const payload = { ...data, user_id: context.userId };
    const { data: row, error } = data.id
      ? await context.supabase.from("causas_raiz").update(payload).eq("id", data.id).select().single()
      : await context.supabase.from("causas_raiz").insert(payload).select().single();
    if (error) throw new Error(error.message);
    return row;
  });

export const deleteCausa = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { id: string }) => z.object({ id: z.string().uuid() }).parse(d))
  .handler(async ({ context, data }) => {
    const { error } = await context.supabase.from("causas_raiz").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
