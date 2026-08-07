import { supabase } from "@/lib/supabase";
import { useAuth } from "@/hooks/useAuth";
import { useObra } from "@/hooks/useObra";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { DEMO_DATA } from "@/data/demoData";
import { toast } from "sonner";

const SOFT_DELETE_TABLES = ["obras", "colaboradores", "lancamentos_financeiros", "apontamento_diarias"];

export function useTableData<T = any>(table: string) {
  const { profile, isGuest, sessionStable } = useAuth();
  const { selectedObraId } = useObra();
  const tenantId = profile?.tenant_id || null;
  const queryClient = useQueryClient();

  // Tables that do NOT have an obra_id column
  const tablesWithoutObraId = ["colaboradores", "profiles", "tenants", "user_roles", "obra_membros", "invites", "beta_waitlist", "beta_config", "influencer_codes", "lote_materiais"];

  const query = useQuery({
    queryKey: [table, tenantId, selectedObraId, isGuest],
    queryFn: async () => {
      if (isGuest) {
        const demoRows = (DEMO_DATA[table] || []) as T[];
        if (selectedObraId) {
          return demoRows.filter((r: any) => r.obra_id === selectedObraId);
        }
        return demoRows;
      }
      let q = (supabase as any).from(table).select("*");
      if (tenantId) q = q.eq("tenant_id", tenantId);
      if (selectedObraId && !tablesWithoutObraId.includes(table)) q = q.eq("obra_id", selectedObraId);
      // Soft delete: filter out deleted records
      if (SOFT_DELETE_TABLES.includes(table)) q = q.is("deleted_at", null);
      q = q.order("created_at", { ascending: false });
      const { data, error } = await q;
      if (error) throw error;
      return (data || []) as T[];
    },
    // Only fire queries after session is stable to avoid competing with token refresh
    enabled: (isGuest && sessionStable) || (!!tenantId && sessionStable),
  });

  const refetchAll = () => {
    queryClient.invalidateQueries({ queryKey: [table] });
  };

  const insert = async (record: Record<string, any>) => {
    if (isGuest) {
      toast.info("Modo convidado: dados não são salvos no banco");
      return { error: null };
    }
    if (!tenantId) return { error: { message: "Sem tenant" } };
    const payload = { ...record, tenant_id: tenantId } as any;
    if (selectedObraId && !tablesWithoutObraId.includes(table)) payload.obra_id = selectedObraId;
    // Normaliza equipe em registros_diarios (espelha equipe_normalizada do DB)
    if (table === "registros_diarios" && typeof payload.equipe === "string") {
      const trimmed = payload.equipe.trim();
      payload.equipe = trimmed === "" ? null : trimmed;
    }
    const { error } = await (supabase as any).from(table).insert(payload);
    if (error) {
      // Tratamento amigável de duplicidade de presença
      if (table === "registro_presencas" && (error.code === "23505" || /uniq_presenca/i.test(error.message || ""))) {
        toast.error("Este colaborador já tem presença registrada hoje nesta obra. Edite o registro existente.");
        return { error };
      }
    } else {
      refetchAll();
    }
    return { error };
  };

  const update = async (id: string, values: Record<string, any>) => {
    if (isGuest) {
      toast.info("Modo convidado: dados não são salvos no banco");
      return { error: null };
    }
    const { error } = await (supabase as any).from(table).update(values).eq("id", id);
    if (!error) refetchAll();
    return { error };
  };

  const remove = async (id: string) => {
    if (isGuest) {
      toast.info("Modo convidado: dados não são salvos no banco");
      return;
    }
    // Soft delete for supported tables
    if (SOFT_DELETE_TABLES.includes(table)) {
      const { error } = await (supabase as any).from(table).update({ deleted_at: new Date().toISOString() }).eq("id", id);
      if (error) {
        toast.error("Erro ao excluir: " + error.message);
      } else {
        toast.success("Registro excluído");
        refetchAll();
      }
      return;
    }
    const { error } = await (supabase as any).from(table).delete().eq("id", id);
    if (error) {
      toast.error("Erro ao excluir: " + error.message);
    } else {
      toast.success("Registro excluído");
      refetchAll();
    }
  };

  return { ...query, insert, update, remove };
}
