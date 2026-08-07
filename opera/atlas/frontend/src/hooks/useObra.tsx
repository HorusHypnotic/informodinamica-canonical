import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/hooks/useAuth";
import { DEMO_OBRAS } from "@/data/demoData";

interface Obra {
  id: string;
  nome: string;
  endereco: string | null;
  status: string;
  data_inicio: string | null;
  data_previsao: string | null;
  orcamento_total: number;
  custo_orcado_m2: number;
  area_m2: number;
  fase_atual: string;
  abordagem: string;
  responsavel: string | null;
  descricao: string | null;
  tipo_obra: string;
}

interface ObraContextType {
  obras: Obra[];
  selectedObraId: string | null;
  setSelectedObraId: (id: string | null) => void;
  selectedObra: Obra | null;
  loading: boolean;
  refetch: () => void;
  isViewOnlyObra: boolean;
}

const ObraContext = createContext<ObraContextType | undefined>(undefined);

export function ObraProvider({ children }: { children: ReactNode }) {
  const { profile, isGuest, sessionStable, roles, user } = useAuth();
  const [obras, setObras] = useState<Obra[]>([]);
  const [selectedObraId, setSelectedObraId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [memberObraIds, setMemberObraIds] = useState<string[] | null>(null);

  // Check if user is visualizador-only (no higher roles)
  const isVisualizadorOnly = !isGuest && roles.length > 0 && roles.every(r => r === "visualizador");

  const fetchObras = async () => {
    if (isGuest) {
      setObras(DEMO_OBRAS);
      if (!selectedObraId) setSelectedObraId(DEMO_OBRAS[0].id);
      setLoading(false);
      return;
    }
    if (!profile?.tenant_id) {
      setObras([]);
      setLoading(false);
      return;
    }

    // If visualizador-only, fetch obra_membros to filter
    let allowedObraIds: string[] | null = null;
    if (isVisualizadorOnly && user?.id) {
      const { data: membros } = await supabase
        .from("obra_membros")
        .select("obra_id, expires_at")
        .eq("user_id", user.id);
      // Filter out expired memberships
      const now = new Date();
      allowedObraIds = (membros || [])
        .filter((m: any) => !m.expires_at || new Date(m.expires_at) > now)
        .map((m: any) => m.obra_id);
      setMemberObraIds(allowedObraIds);
    } else {
      setMemberObraIds(null);
    }

    let q = supabase
      .from("obras")
      .select("id, nome, endereco, status, data_inicio, data_previsao, orcamento_total, custo_orcado_m2, area_m2, fase_atual, abordagem, responsavel, descricao, tipo_obra")
      .eq("tenant_id", profile.tenant_id)
      .order("created_at", { ascending: false });

    // Filter by allowed obras for visualizador
    if (allowedObraIds !== null) {
      if (allowedObraIds.length === 0) {
        setObras([]);
        setLoading(false);
        return;
      }
      q = q.in("id", allowedObraIds);
    }

    const { data } = await q;
    const list = (data || []) as Obra[];
    setObras(list);
    if (!selectedObraId && list.length > 0) {
      setSelectedObraId(list[0].id);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (sessionStable) {
      fetchObras();
    }
  }, [profile?.tenant_id, isGuest, sessionStable]);

  const selectedObra = obras.find((o) => o.id === selectedObraId) || null;

  return (
    <ObraContext.Provider
      value={{
        obras,
        selectedObraId,
        setSelectedObraId,
        selectedObra,
        loading,
        refetch: fetchObras,
        isViewOnlyObra: isVisualizadorOnly,
      }}
    >
      {children}
    </ObraContext.Provider>
  );
}

export function useObra() {
  const ctx = useContext(ObraContext);
  if (!ctx) throw new Error("useObra must be used within ObraProvider");
  return ctx;
}
