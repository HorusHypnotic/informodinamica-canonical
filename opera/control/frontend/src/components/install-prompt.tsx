import { useEffect, useState } from "react";
import { Download, X } from "lucide-react";
import { onInstallAvailability, promptInstall } from "@/lib/pwa/register-sw";
import { Button } from "@/components/ui/button";

const DISMISS_KEY = "opera:install-dismissed-at";
const DISMISS_MS = 7 * 24 * 60 * 60 * 1000;

export function InstallPrompt() {
  const [available, setAvailable] = useState(false);
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(DISMISS_KEY);
      const when = raw ? Number(raw) : 0;
      setDismissed(when + DISMISS_MS > Date.now());
    } catch { /* ignore */ }
    return onInstallAvailability(setAvailable);
  }, []);

  if (!available || dismissed) return null;

  return (
    <div className="fixed bottom-20 left-3 right-3 z-50 md:bottom-4 md:left-auto md:right-4 md:w-96 rounded-xl border border-cyan-500/30 bg-slate-900/95 backdrop-blur p-3 shadow-xl">
      <div className="flex items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-cyan-500/15 text-cyan-400">
          <Download className="h-4 w-4" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-sm font-semibold text-white">Instalar OPERA Control</div>
          <p className="mt-0.5 text-xs text-slate-300">
            Acesso rápido, tela cheia e funcionamento offline.
          </p>
          <div className="mt-2 flex gap-2">
            <Button
              size="sm"
              className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 h-8"
              onClick={async () => {
                const r = await promptInstall();
                if (r === "dismissed") {
                  try { localStorage.setItem(DISMISS_KEY, String(Date.now())); } catch { /* ignore */ }
                  setDismissed(true);
                }
              }}
            >
              Instalar
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="h-8 text-slate-300 hover:text-white hover:bg-slate-800"
              onClick={() => {
                try { localStorage.setItem(DISMISS_KEY, String(Date.now())); } catch { /* ignore */ }
                setDismissed(true);
              }}
            >
              Depois
            </Button>
          </div>
        </div>
        <button
          aria-label="Fechar"
          onClick={() => {
            try { localStorage.setItem(DISMISS_KEY, String(Date.now())); } catch { /* ignore */ }
            setDismissed(true);
          }}
          className="text-slate-400 hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
