import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";

function csvCell(v: unknown): string {
  if (v == null) return "";
  const s = typeof v === "number" ? v.toString().replace(".", ",") : String(v);
  if (/[";\n\r]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}
function csvRow(cells: unknown[]): string {
  return cells.map(csvCell).join(";");
}

export const Route = createFileRoute("/api/export-decisoes.csv")({
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

        const { data: decisoes, error } = await supabase
          .from("decisoes_economicas")
          .select("*")
          .order("created_at", { ascending: false });
        if (error) return new Response(error.message, { status: 500 });

        const header = [
          "ID","TITULO","CENARIO","STATUS","HORIZONTE_MESES","INVESTIMENTO_A",
          "CCT_A","CCT_B","EPI","PAYBACK_MESES","ROC","RECOMENDACAO","CRIADA_EM",
        ];
        const rows = (decisoes ?? []).map((d) => {
          const r = d as unknown as {
            id: string; titulo: string; cenario: string; status: string; horizonte_meses: number;
            investimento_inicial_a: number; cct_a: number | null; cct_b: number | null;
            epi: number | null; payback_meses: number | null; roc: number | null;
            recomendacao: string | null; created_at: string;
          };
          return csvRow([
            r.id, r.titulo, r.cenario, r.status, r.horizonte_meses, Number(r.investimento_inicial_a),
            r.cct_a, r.cct_b, r.epi, r.payback_meses, r.roc, r.recomendacao,
            new Date(r.created_at).toISOString().slice(0, 10),
          ]);
        });

        const csv = "\uFEFF" + [csvRow(header), ...rows].join("\r\n");
        const today = new Date().toISOString().slice(0, 10);
        return new Response(csv, {
          status: 200,
          headers: {
            "Content-Type": "text/csv; charset=utf-8",
            "Content-Disposition": `attachment; filename="opera-decisoes-${today}.csv"`,
          },
        });
      },
    },
  },
});
