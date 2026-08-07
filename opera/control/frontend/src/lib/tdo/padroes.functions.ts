import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export const listPadroes = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase
      .from("padroes_biblioteca")
      .select("*")
      .eq("ativo", true)
      .order("codigo");
    if (error) throw new Error(error.message);
    return data;
  });

export const getPadrao = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { codigo: string }) => z.object({ codigo: z.string() }).parse(d))
  .handler(async ({ context, data }) => {
    const { data: row, error } = await context.supabase
      .from("padroes_biblioteca").select("*").eq("codigo", data.codigo).maybeSingle();
    if (error) throw new Error(error.message);
    return row;
  });
