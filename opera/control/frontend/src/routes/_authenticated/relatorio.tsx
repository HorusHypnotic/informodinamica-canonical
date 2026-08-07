import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Suspense } from "react";
import { listEcos } from "@/lib/tdo/ecos.functions";
import { listCausas } from "@/lib/tdo/causas.functions";
import { calcIRporCausa, calcMC, classificarICO, formatBRL } from "@/lib/tdo/calculos";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { IcoBadge } from "@/components/ico-badge";
import { Download, FileSpreadsheet } from "lucide-react";
import { gerarRelatorioPDF } from "@/lib/tdo/pdf";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/relatorio")({
  head: () => ({ meta: [{ title: "Relatório — OPERA Control" }] }),
  component: () => (
    <Suspense fallback={<div className="text-muted-foreground">Carregando…</div>}>
      <RelatorioPage />
    </Suspense>
  ),
  errorComponent: ({ error }) => <div className="text-destructive">Erro: {error.message}</div>,
});

function RelatorioPage() {
  const fetchEcos = useServerFn(listEcos);
  const fetchCausas = useServerFn(listCausas);
  const { data: ecos } = useSuspenseQuery({ queryKey: ["ecos"], queryFn: () => fetchEcos() });
  const { data: causas } = useSuspenseQuery({ queryKey: ["causas"], queryFn: () => fetchCausas() });

  const total = ecos.length;
  const icoMed = total ? Math.round(ecos.reduce((a, e) => a + (e.ico ?? 0), 0) / total) : 0;
  const icoMax = ecos.reduce((a, e) => Math.max(a, e.ico ?? 0), 0);
  const mc = calcMC(ecos);
  const irList = calcIRporCausa(ecos).slice(0, 10).map((x) => {
    const c = causas.find((c) => c.id === x.causaId);
    return { nome: c?.nome ?? "—", ocorrencias: x.ocorrencias, percentual: Math.round(x.percentual), classif: x.info.label };
  });

  const matriz: { dominio: string; consequencia: string; valor: number }[] = [];
  const acc = new Map<string, number>();
  for (const e of ecos) {
    if (!e.dominio || !e.consequencia) continue;
    const k = `${e.dominio}|${e.consequencia}`;
    acc.set(k, (acc.get(k) ?? 0) + Number(e.valor_prejuizo || 0));
  }
  for (const [k, v] of acc.entries()) {
    const [dominio, consequencia] = k.split("|");
    matriz.push({ dominio, consequencia, valor: v });
  }

  const handleExport = () => {
    gerarRelatorioPDF({
      gerado: new Date(),
      kpis: { total, icoMed, icoMax, mcMensal: mc.mensal, mcAcumulada: mc.acumulada, mcAnualizada: mc.anualizada },
      topCausas: irList,
      matriz,
      ecos: ecos.map((e) => ({
        data: new Date(e.data_evento).toLocaleDateString("pt-BR"),
        titulo: e.titulo,
        categoria: e.categoria,
        prejuizo: Number(e.valor_prejuizo),
        ico: e.ico ?? 0,
      })),
    });
  };
  const handleExportCsv = async () => {
    try {
      const { data: sess } = await supabase.auth.getSession();
      const token = sess.session?.access_token;
      if (!token) { toast.error("Sessão expirada."); return; }
      const res = await fetch("/api/export-ecos.csv", { headers: { Authorization: `Bearer ${token}` } });
      if (!res.ok) throw new Error(await res.text());
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `opera-ecos-${new Date().toISOString().slice(0, 10)}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Falha na exportação");
    }
  };


  return (
    <div className="space-y-5 sm:space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div className="min-w-0">
          <h1 className="text-xl sm:text-2xl font-semibold tracking-tight">Relatório executivo</h1>
          <p className="text-sm text-muted-foreground">Pré-visualize e exporte o diagnóstico.</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleExportCsv} disabled={total === 0} size="sm" variant="outline">
            <FileSpreadsheet className="h-4 w-4 sm:mr-1" />
            <span className="hidden sm:inline">Exportar CSV</span>
            <span className="sm:hidden ml-1">CSV</span>
          </Button>
          <Button onClick={handleExport} disabled={total === 0} size="sm">
            <Download className="h-4 w-4 sm:mr-1" />
            <span className="hidden sm:inline">Exportar PDF</span>
            <span className="sm:hidden ml-1">PDF</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <Card className="p-3 sm:p-4"><Stat label="Total ECOs" value={String(total)} /></Card>
        <Card className="p-3 sm:p-4"><Stat label="ICO (campo) médio" value={String(icoMed)} sub={classificarICO(icoMed).label} /></Card>
        <Card className="p-3 sm:p-4"><Stat label="ICO (campo) máximo" value={String(icoMax)} sub={classificarICO(icoMax).label} /></Card>
        <Card className="p-3 sm:p-4"><Stat label="MC acumulada" value={formatBRL(mc.acumulada)} /></Card>
      </div>

      <Card className="p-4 sm:p-5">
        <h3 className="font-semibold">Top causas raiz</h3>
        {irList.length === 0 ? (
          <p className="text-sm text-muted-foreground mt-2">Sem ECOs vinculados a causas raiz.</p>
        ) : (
          <div className="mt-3 overflow-x-auto">
            <table className="w-full text-sm min-w-[420px]">
              <thead className="text-xs uppercase text-muted-foreground bg-muted/40">
                <tr>
                  <th className="text-left p-2.5">Causa</th>
                  <th className="text-right p-2.5">Ocor.</th>
                  <th className="text-right p-2.5">IR</th>
                  <th className="text-right p-2.5">Classif.</th>
                </tr>
              </thead>
              <tbody>
                {irList.map((x) => (
                  <tr key={x.nome} className="border-t">
                    <td className="p-2.5">{x.nome}</td>
                    <td className="p-2.5 text-right num">{x.ocorrencias}</td>
                    <td className="p-2.5 text-right num">{x.percentual}%</td>
                    <td className="p-2.5 text-right text-muted-foreground">{x.classif}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      <Card className="p-4 sm:p-5">
        <h3 className="font-semibold">Histórico de ECOs</h3>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full text-sm min-w-[420px]">
            <thead className="text-xs uppercase text-muted-foreground bg-muted/40">
              <tr>
                <th className="text-left p-2.5">Data</th>
                <th className="text-left p-2.5">Título</th>
                <th className="text-right p-2.5">Prejuízo</th>
                <th className="text-right p-2.5">ICO (campo)</th>
              </tr>
            </thead>
            <tbody>
              {ecos.map((e) => (
                <tr key={e.id} className="border-t">
                  <td className="p-2.5 num whitespace-nowrap">{new Date(e.data_evento).toLocaleDateString("pt-BR")}</td>
                  <td className="p-2.5">{e.titulo}</td>
                  <td className="p-2.5 text-right num">{formatBRL(Number(e.valor_prejuizo))}</td>
                  <td className="p-2.5 text-right"><IcoBadge valor={e.ico ?? 0} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

function Stat({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div>
      <div className="text-[11px] sm:text-xs text-muted-foreground">{label}</div>
      <div className="num mt-0.5 text-xl sm:text-2xl font-semibold">{value}</div>
      {sub && <div className="text-[11px] sm:text-xs text-muted-foreground">{sub}</div>}
    </div>
  );
}
