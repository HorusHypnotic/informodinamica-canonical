import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const EcoInput = z.object({
  id: z.string().uuid().optional(),
  causa_raiz_id: z.string().uuid().nullable().optional(),
  data_evento: z.string().min(1),
  titulo: z.string().min(1).max(300),
  descricao: z.string().max(4000).optional().nullable(),
  categoria: z.enum([
    "retrabalho","compra_emergencial","atraso","falha_comunicacao",
    "falta_material","equipamento_parado","erro_execucao","erro_projeto",
    "aprovacao_lenta","outros",
  ]),
  valor_prejuizo: z.number().min(0).max(1_000_000_000),
  data_inicio_causa: z.string().nullable().optional(),
  responsavel: z.string().max(200).nullable().optional(),
  impacto: z.number().int().min(1).max(5),
  recorrencia: z.number().int().min(1).max(5),
  persistencia: z.number().int().min(1).max(5),
  observacoes: z.string().max(2000).nullable().optional(),
  dominio: z.enum(["projeto","suprimentos","execucao","gestao","cliente","ambiente","financeiro","compliance"]).nullable().optional(),
  mecanismo: z.enum(["tempo","informacao","capital","material","equipamento","comunicacao","qualidade","mao_de_obra"]).nullable().optional(),
  consequencia: z.enum(["atraso","retrabalho","desperdicio","ociosidade","compra_emergencial","multa","paralisacao","perda_de_margem"]).nullable().optional(),
  decisao_mdeo_id: z.string().uuid().nullable().optional(),
  padrao_codigo: z.string().max(20).nullable().optional(),
});

export const listEcos = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase
      .from("ecos")
      .select("*, causas_raiz(id, nome)")
      .order("data_evento", { ascending: false });
    if (error) throw new Error(error.message);
    return data;
  });

export const getEco = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { id: string }) => z.object({ id: z.string().uuid() }).parse(d))
  .handler(async ({ context, data }) => {
    const { data: row, error } = await context.supabase
      .from("ecos").select("*").eq("id", data.id).maybeSingle();
    if (error) throw new Error(error.message);
    return row;
  });

export const upsertEco = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => EcoInput.parse(d))
  .handler(async ({ context, data }) => {
    const payload = { ...data, user_id: context.userId };
    const { data: row, error } = data.id
      ? await context.supabase.from("ecos").update(payload).eq("id", data.id).select().single()
      : await context.supabase.from("ecos").insert(payload).select().single();
    if (error) throw new Error(error.message);
    return row;
  });

export const deleteEco = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { id: string }) => z.object({ id: z.string().uuid() }).parse(d))
  .handler(async ({ context, data }) => {
    const { error } = await context.supabase.from("ecos").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
