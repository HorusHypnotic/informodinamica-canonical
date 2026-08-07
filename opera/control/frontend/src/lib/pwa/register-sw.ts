// Registro guardado do Service Worker
// - Apenas em produção
// - Nunca em iframes / preview do Lovable / localhost
// - Falha silenciosamente

const FORBIDDEN_HOST_PATTERNS = [
  /lovableproject\.com$/i,
  /lovable\.app$/i,
  /^localhost$/i,
  /^127\.0\.0\.1$/,
];

export function registerServiceWorker() {
  if (typeof window === "undefined") return;
  if (!("serviceWorker" in navigator)) return;

  try {
    if (window.top !== window.self) return; // iframe
  } catch { return; }

  const host = window.location.hostname;
  if (FORBIDDEN_HOST_PATTERNS.some((r) => r.test(host))) return;
  if (!import.meta.env.PROD) return;

  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js", { scope: "/" })
      .catch(() => { /* silencioso */ });
  });
}

/** Hook simples para captar o evento beforeinstallprompt */
export type InstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

let _deferred: InstallPromptEvent | null = null;
const listeners = new Set<(available: boolean) => void>();

if (typeof window !== "undefined") {
  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    _deferred = e as InstallPromptEvent;
    listeners.forEach((l) => l(true));
  });
  window.addEventListener("appinstalled", () => {
    _deferred = null;
    listeners.forEach((l) => l(false));
  });
}

export function onInstallAvailability(cb: (available: boolean) => void): () => void {
  listeners.add(cb);
  cb(_deferred !== null);
  return () => listeners.delete(cb);
}

export async function promptInstall(): Promise<"accepted" | "dismissed" | "unavailable"> {
  if (!_deferred) return "unavailable";
  await _deferred.prompt();
  const choice = await _deferred.userChoice;
  _deferred = null;
  listeners.forEach((l) => l(false));
  return choice.outcome;
}
