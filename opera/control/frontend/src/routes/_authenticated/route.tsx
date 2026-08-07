import { createFileRoute, Outlet, redirect, Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { LayoutDashboard, ListChecks, GitBranchPlus, FileText, LogOut, Calculator, WifiOff, FlaskConical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { InstallPrompt } from "@/components/install-prompt";

export const Route = createFileRoute("/_authenticated")({
  ssr: false,
  beforeLoad: async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error || !data.user) throw redirect({ to: "/auth" });
    return { user: data.user };
  },
  component: AuthenticatedLayout,
});

const NAV = [
  { to: "/dashboard", label: "Dashboard", short: "Painel", icon: LayoutDashboard, mobile: true },
  { to: "/ecos", label: "ECOs", short: "ECOs", icon: ListChecks, mobile: true },
  { to: "/causas", label: "Causas Raiz", short: "Causas", icon: GitBranchPlus, mobile: false },
  { to: "/analises", label: "Análises", short: "Análises", icon: Calculator, mobile: true },
  { to: "/relatorio", label: "Relatório", short: "PDF", icon: FileText, mobile: true },
  { to: "/pesquisa", label: "Pesquisa", short: "Pesquisa", icon: FlaskConical, mobile: false },
] as const;


function useOnline() {
  const [online, setOnline] = useState(true);
  useEffect(() => {
    if (typeof navigator === "undefined") return;
    setOnline(navigator.onLine);
    const on = () => setOnline(true);
    const off = () => setOnline(false);
    window.addEventListener("online", on);
    window.addEventListener("offline", off);
    return () => { window.removeEventListener("online", on); window.removeEventListener("offline", off); };
  }, []);
  return online;
}

function AuthenticatedLayout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const online = useOnline();

  async function signOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  return (
    <div className="dark opera-tower min-h-screen bg-[#0a1420] text-slate-100">
      {/* header */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0a1420]/85 backdrop-blur supports-[backdrop-filter]:bg-[#0a1420]/70">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-2.5 sm:px-6 sm:py-3">
          <Link to="/dashboard" className="flex items-center gap-2 font-semibold min-w-0">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400 to-cyan-600 text-slate-950 text-[10px] font-bold shadow-[0_0_20px_rgba(56,189,248,0.45)] shrink-0 tracking-tight">
              OC
            </span>
            <div className="min-w-0">
              <div className="truncate text-sm sm:text-base leading-tight">OPERA Control</div>
              <div className="text-[9px] uppercase tracking-[0.2em] text-cyan-400/70 leading-tight">Central de Operações</div>
            </div>
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            {NAV.map((n) => {
              const active = pathname.startsWith(n.to);
              return (
                <Link
                  key={n.to}
                  to={n.to}
                  className={cn(
                    "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                    active
                      ? "bg-cyan-500/15 text-cyan-300 shadow-[inset_0_-2px_0_0_rgba(56,189,248,0.6)]"
                      : "text-slate-400 hover:text-slate-100 hover:bg-white/5",
                  )}
                >
                  {n.label}
                </Link>
              );
            })}
          </nav>
          <div className="flex items-center gap-1.5">
            {!online && (
              <span className="hidden sm:inline-flex items-center gap-1 rounded-md border border-orange-500/40 bg-orange-500/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-orange-300">
                <WifiOff className="h-3 w-3" /> Offline
              </span>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={signOut}
              className="gap-2 text-slate-300 hover:text-white hover:bg-white/5"
              aria-label="Sair"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Sair</span>
            </Button>
          </div>
        </div>
        {!online && (
          <div className="sm:hidden bg-orange-500/15 border-t border-orange-500/30 text-orange-200 text-[11px] py-1 text-center">
            <WifiOff className="inline h-3 w-3 mr-1" /> Modo offline — alterações serão sincronizadas
          </div>
        )}
      </header>

      <main className="mx-auto max-w-7xl px-4 py-5 pb-24 sm:px-6 sm:py-8 md:pb-8">
        <Outlet />
      </main>

      <InstallPrompt />

      {/* Bottom nav — mobile */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 border-t border-white/10 bg-[#0a1420]/95 backdrop-blur safe-bottom">
        <ul className="grid grid-cols-4">
          {NAV.filter((n) => n.mobile).map((n) => {
            const active = pathname.startsWith(n.to);
            const Icon = n.icon;
            return (
              <li key={n.to}>
                <Link
                  to={n.to}
                  className={cn(
                    "flex flex-col items-center justify-center gap-0.5 py-2.5 text-[11px] font-medium transition-colors",
                    active ? "text-cyan-400" : "text-slate-400 hover:text-slate-100",
                  )}
                >
                  <Icon className={cn("h-5 w-5", active && "stroke-[2.4] drop-shadow-[0_0_6px_rgba(56,189,248,0.7)]")} />
                  <span>{n.short}</span>
                  {active && <span className="mt-0.5 h-0.5 w-6 rounded-full bg-cyan-400 shadow-[0_0_6px_rgba(56,189,248,0.9)]" />}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
