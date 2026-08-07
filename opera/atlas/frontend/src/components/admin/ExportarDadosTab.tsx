import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Download, Loader2, FileArchive, AlertTriangle, ShieldCheck } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { startCausalContext, causalHeaders, logEvent } from "@/lib/observability";

interface Obra { id: string; nome: string }
interface ResultInfo {
  url: string;
  expires_at: string;
  total_rows: number;
  file_bytes: number;
  manifest: { table: string; rows: number }[];
}

export function ExportarDadosTab() {
  const { profile, user } = useAuth();
  const [obras, setObras] = useState<Obra[]>([]);
  const [obraId, setObraId] = useState<string>("");
  const [mes, setMes] = useState<string>(() => new Date().toISOString().slice(0, 7));
  const [loading, setLoading] = useState<string | null>(null);
  const [result, setResult] = useState<ResultInfo | null>(null);

  useEffect(() => {
    if (!profile?.tenant_id) return;
    supabase.from("obras").select("id, nome").eq("tenant_id", profile.tenant_id).order("nome")
      .then(({ data }) => setObras((data as Obra[]) ?? []));
  }, [profile?.tenant_id]);

  const run = async (scope: "tenant_full" | "obra" | "periodo") => {
    if (scope !== "tenant_full" && !obraId) {
      toast.error("Selecione uma obra");
      return;
    }
    if (scope === "periodo" && !mes) {
      toast.error("Informe o mês (YYYY-MM)");
      return;
    }
    setLoading(scope);
    setResult(null);
    const ctx = startCausalContext("client.ExportarDadosTab", { obraId: scope !== "tenant_full" ? obraId : undefined });
    const startedId = await logEvent({ ctx, eventType: "exportacao_csv.requested",
      payload: { scope, obra_id: scope !== "tenant_full" ? obraId : null, mes: scope === "periodo" ? mes + "-01" : null } });

    try {
      const { data, error } = await supabase.functions.invoke("export-csv", {
        body: {
          type: scope,
          obra_id: scope !== "tenant_full" ? obraId : undefined,
          mes: scope === "periodo" ? mes + "-01" : undefined,
        },
        headers: causalHeaders({ ...ctx, causationId: startedId ?? undefined }),
      });
      if (error) throw new Error(error.message);
      setResult(data as ResultInfo);
      toast.success(`Exportação pronta — ${(data as ResultInfo).total_rows.toLocaleString("pt-BR")} linhas`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      toast.error("Falha na exportação: " + msg);
      void logEvent({ ctx, eventType: "exportacao_csv.client_failed", status: "failure", severity: "error", errorMessage: msg });
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="space-y-4">
      <Alert>
        <ShieldCheck className="h-4 w-4" />
        <AlertTitle>Exportação universal CSV</AlertTitle>
        <AlertDescription className="text-xs">
          Arquivo ZIP contendo um CSV por tabela visível, respeitando RLS. Cada linha carrega
          <code className="mx-1">exportado_em</code> e <code className="mx-1">exportado_por</code> para rastreabilidade (OPERA_CORE I5).
          Disponível por 15 minutos via URL assinada.
        </AlertDescription>
      </Alert>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm flex items-center gap-2">
              <FileArchive className="h-4 w-4 text-primary" /> Tenant inteiro
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-xs text-muted-foreground">
              Todas as obras, períodos, audit logs e system events.
            </p>
            <Button className="w-full" onClick={() => run("tenant_full")} disabled={loading !== null}>
              {loading === "tenant_full" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
              <span className="ml-2">Exportar tudo</span>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm flex items-center gap-2">
              <FileArchive className="h-4 w-4 text-primary" /> Por obra
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Select value={obraId} onValueChange={setObraId}>
              <SelectTrigger><SelectValue placeholder="Selecione obra" /></SelectTrigger>
              <SelectContent>
                {obras.map(o => <SelectItem key={o.id} value={o.id}>{o.nome}</SelectItem>)}
              </SelectContent>
            </Select>
            <Button className="w-full" onClick={() => run("obra")} disabled={loading !== null || !obraId}>
              {loading === "obra" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
              <span className="ml-2">Exportar obra</span>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm flex items-center gap-2">
              <FileArchive className="h-4 w-4 text-primary" /> Período (mês)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Select value={obraId} onValueChange={setObraId}>
              <SelectTrigger><SelectValue placeholder="Selecione obra" /></SelectTrigger>
              <SelectContent>
                {obras.map(o => <SelectItem key={o.id} value={o.id}>{o.nome}</SelectItem>)}
              </SelectContent>
            </Select>
            <Input type="month" value={mes} onChange={(e) => setMes(e.target.value)} />
            <Button className="w-full" onClick={() => run("periodo")} disabled={loading !== null || !obraId || !mes}>
              {loading === "periodo" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
              <span className="ml-2">Exportar período</span>
            </Button>
          </CardContent>
        </Card>
      </div>

      <Alert variant="default">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription className="text-xs">
          Períodos abertos podem mudar — para prova jurídica, exporte apenas períodos já fechados.
          O CSV evidencia mas não substitui o hash do snapshot (I9).
        </AlertDescription>
      </Alert>

      {result && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Arquivo pronto</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-xs text-muted-foreground space-y-1">
              <div>Linhas: <strong>{result.total_rows.toLocaleString("pt-BR")}</strong></div>
              <div>Tamanho: <strong>{(result.file_bytes / 1024).toFixed(1)} KB</strong></div>
              <div>Tabelas: <strong>{result.manifest.length}</strong></div>
              <div>Expira: {new Date(result.expires_at).toLocaleString("pt-BR")}</div>
            </div>
            <Button asChild className="w-full">
              <a href={result.url} target="_blank" rel="noopener noreferrer" download>
                <Download className="h-4 w-4 mr-2" /> Baixar ZIP
              </a>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
