import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { QrCode, Loader2, RefreshCw, Copy, CheckCircle } from "lucide-react";
import { toast } from "sonner";

export function SessionSyncQR() {
  const [code, setCode] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [expiresIn, setExpiresIn] = useState(180);

  const generateCode = async () => {
    setLoading(true);
    setCopied(false);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast.error("Você precisa estar logado para gerar o QR Code.");
        return;
      }

      const projectId = import.meta.env.VITE_SUPABASE_PROJECT_ID;
      const resp = await fetch(
        `https://${projectId}.supabase.co/functions/v1/session-transfer`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({}),
        }
      );

      const result = await resp.json();
      if (!resp.ok) throw new Error(result.error || "Erro ao gerar código");

      setCode(result.code);
      setExpiresIn(180);

      const interval = setInterval(() => {
        setExpiresIn((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setCode(null);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (err: any) {
      toast.error(err.message || "Erro ao gerar QR Code");
    } finally {
      setLoading(false);
    }
  };

  const syncUrl = code
    ? `${window.location.origin}/login?sync=${code}`
    : "";

  const copyUrl = async () => {
    if (!syncUrl) return;
    try {
      await navigator.clipboard.writeText(syncUrl);
      setCopied(true);
      toast.success("Link copiado!");
      setTimeout(() => setCopied(false), 3000);
    } catch {
      toast.error("Erro ao copiar");
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4 rounded-xl border border-border bg-card">
      <div className="flex items-center gap-2 text-sm font-medium text-foreground">
        <QrCode className="h-4 w-4 text-primary" />
        Login no celular via QR
      </div>

      {!code ? (
        <div className="text-center space-y-3">
          <p className="text-xs text-muted-foreground max-w-[240px]">
            Gera um código único para fazer login no celular. Sua sessão no PC não será afetada.
          </p>
          <Button onClick={generateCode} disabled={loading} variant="outline" size="sm" className="gap-2">
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <QrCode className="h-4 w-4" />}
            {loading ? "Gerando..." : "Gerar QR Code"}
          </Button>
        </div>
      ) : (
        <>
          <div className="bg-white p-3 rounded-lg">
            <QRCodeSVG value={syncUrl} size={200} level="M" />
          </div>
          <div className="text-center space-y-2">
            <p className="text-xs text-muted-foreground">
              Escaneie com a câmera do celular
            </p>
            <p className="text-xs font-mono text-primary font-medium">
              Código: {code}
            </p>
            <p className="text-[10px] text-muted-foreground">
              Expira em {Math.floor(expiresIn / 60)}:{String(expiresIn % 60).padStart(2, "0")}
            </p>
          </div>
          <div className="flex gap-2">
            <Button onClick={copyUrl} variant="outline" size="sm" className="gap-1 text-xs">
              {copied ? <CheckCircle className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
              {copied ? "Copiado" : "Copiar link"}
            </Button>
            <Button onClick={generateCode} variant="ghost" size="sm" className="gap-1 text-xs">
              <RefreshCw className="h-3 w-3" />
              Novo
            </Button>
          </div>
        </>
      )}

      <p className="text-[10px] text-muted-foreground text-center max-w-[240px]">
        Cria sessão independente no celular. O PC continua logado.
      </p>
    </div>
  );
}
