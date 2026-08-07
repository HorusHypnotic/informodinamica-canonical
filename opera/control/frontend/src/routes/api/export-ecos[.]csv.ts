import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";

function csvCell(v: unknown): string {
  if (v == null) return "";
  const s = typeof v === "number"
    ? v.toString().replace(".", ",")
    : String(v);
  if (/[";\n\r]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

function csvRow(cells: unknown[]): string {
  return cells.map(csvCell).join(";");
}

export const Route = createFileRoute("/api/export-ecos.csv")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const auth = request.headers.get("authorization");
        const token = auth?.startsWith("Bearer ") ? auth.slice(7) : null;
        if (!token) return new Response("Unauthorized", { status: 401 });

        const supabase = createClient(
          process.env.SUPABASE_URL!,
          process.env.SUPABASE_PUBLISHABLE_KEY!,
          {
            auth: { persistSession: false, autoRefreshToken: false, storage: undefined },
            global: { headers: { Authorization: `Bearer ${token}` } },
          },
        );

        const { data: userData, error: uerr } = await supabase.auth.getUser(token);
        if (uerr || !userData.user) return new Response("Unauthorized", { status: 401 });

        const url = new URL(request.url);
        const dataInicio = url.searchParams.get("data_inicio");
        const dataFim = url.searchParams.get("data_fim");
        const dominio = url.searchParams.get("dominio");
        const padraoCodigo = url.searchParams.get("padrao_codigo");

        let q = supabase
          .from("ecos")
          .select("*, causas_raiz(nome, categoria), padroes_biblioteca(codigo, nome), decisoes_economicas(titulo, epi)")
          .order("data_evento", { ascending: false });
        if (dataInicio) q = q.gte("data_evento", dataInicio);
        if (dataFim) q = q.lte("data_evento", dataFim);
        if (dominio) q = q.eq("dominio", dominio);
        if (padraoCodigo) q = q.eq("padrao_codigo", padraoCodigo);

        const { data: ecos, error } = await q;
        if (error) return new Response(error.message, { status: 500 });

        // Buscar recomendações implementadas do usuário (para ico_antes/ico_depois por causa)
        const { data: implementadas } = await supabase
          .from("recomendacoes_implementadas")
          .select("*, recomendacoes(causa_raiz_id, acao)");
        const porCausa = new Map<string, { antes: number | null; depois: number | null; acao: string | null }>();
        for (const imp of implementadas ?? []) {
          const rec = (imp as unknown as { recomendacoes: { causa_raiz_id: string; acao: string } | null }).recomendacoes;
          if (!rec?.causa_raiz_id) continue;
          porCausa.set(rec.causa_raiz_id, {
            antes: (imp as unknown as { ico_antes: number | null }).ico_antes,
            depois: (imp as unknown as { ico_depois: number | null }).ico_depois,
            acao: rec.acao,
          });
        }

        const header = [
          "ID_ECO","DATA","TITULO","PADRAO_CODIGO","PADRAO_NOME","DOMINIO","MECANISMO","CONSEQUENCIA",
          "CAUSA_RAIZ","CATEGORIA_CAUSA","IMPACTO","RECORRENCIA","PERSISTENCIA","ICO_CAMPO","VALOR_PREJUIZO",
          "ICO_CAMPO_ANTES","ICO_CAMPO_DEPOIS","RECOMENDACAO_IMPLEMENTADA","DECISAO_MDEO","EPI_DECISAO",
        ];
        const rows = (ecos ?? []).map((e) => {
          const r = e as unknown as {
            id: string; data_evento: string; titulo: string; padrao_codigo: string | null;
            dominio: string | null; mecanismo: string | null; consequencia: string | null;
            causa_raiz_id: string | null; impacto: number; recorrencia: number; persistencia: number;
            ico: number | null; valor_prejuizo: number;
            causas_raiz: { nome: string; categoria: string } | null;
            padroes_biblioteca: { codigo: string; nome: string } | null;
            decisoes_economicas: { titulo: string; epi: number | null } | null;
          };
          const imp = r.causa_raiz_id ? porCausa.get(r.causa_raiz_id) : null;
          return csvRow([
            r.id, r.data_evento, r.titulo,
            r.padroes_biblioteca?.codigo ?? r.padrao_codigo ?? "",
            r.padroes_biblioteca?.nome ?? "",
            r.dominio ?? "", r.mecanismo ?? "", r.consequencia ?? "",
            r.causas_raiz?.nome ?? "", r.causas_raiz?.categoria ?? "",
            r.impacto, r.recorrencia, r.persistencia, r.ico ?? 0, Number(r.valor_prejuizo),
            imp?.antes ?? "", imp?.depois ?? "", imp?.acao ?? "",
            r.decisoes_economicas?.titulo ?? "", r.decisoes_economicas?.epi ?? "",
          ]);
        });

        const csv = "\uFEFF" + [csvRow(header), ...rows].join("\r\n");
        const today = new Date().toISOString().slice(0, 10);
        return new Response(csv, {
          status: 200,
          headers: {
            "Content-Type": "text/csv; charset=utf-8",
            "Content-Disposition": `attachment; filename="opera-ecos-${today}.csv"`,
          },
        });
      },
    },
  },
});
