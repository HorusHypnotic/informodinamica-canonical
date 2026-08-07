import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const grupoEnum = z.enum(["piloto", "controle"]);
const statusEnum = z.enum(["ativa", "finalizada", "desistente"]);

const ObraCreateInput = z.object({
  nome: z.string().min(1).max(200),
  grupo: grupoEnum,
  status: statusEnum.default("ativa"),
  data_inicio: z.string().min(1).default("2026-08-03"),
  observacoes: z.string().max(2000).optional().nullable(),
});

const ObraUpdateInput = z.object({
  id: z.string().uuid(),
  status: statusEnum.optional(),
  observacoes: z.string().max(2000).optional().nullable(),
  nome: z.string().min(1).max(200).optional(),
  grupo: grupoEnum.optional(),
  data_inicio: z.string().min(1).optional(),
});

export const listObrasPesquisa = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase
      .from("obras_pesquisa")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return data;
  });

export const createObraPesquisa = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => ObraCreateInput.parse(d))
  .handler(async ({ context, data }) => {
    const payload = { ...data, dono_id: context.userId };
    const { data: row, error } = await context.supabase
      .from("obras_pesquisa")
      .insert(payload)
      .select()
      .single();
    if (error) throw new Error(error.message);
    return row;
  });

export const updateObraPesquisa = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => ObraUpdateInput.parse(d))
  .handler(async ({ context, data }) => {
    const { id, ...patch } = data;
    const { data: row, error } = await context.supabase
      .from("obras_pesquisa")
      .update(patch)
      .eq("id", id)
      .select()
      .single();
    if (error) throw new Error(error.message);
    return row;
  });

export const deleteObraPesquisa = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { id: string }) => z.object({ id: z.string().uuid() }).parse(d))
  .handler(async ({ context, data }) => {
    const { error } = await context.supabase
      .from("obras_pesquisa")
      .delete()
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
