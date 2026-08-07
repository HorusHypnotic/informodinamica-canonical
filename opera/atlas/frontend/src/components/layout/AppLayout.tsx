import { ReactNode } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";
import { QrCode, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { SessionSyncQR } from "@/components/auth/SessionSyncQR";

export function AppLayout({ children }: { children: ReactNode }) {
  const { profile, isGuest, sessionStable } = useAuth();

  // If user has no tenant and is not guest, redirect to setup
  if (!isGuest && profile && !profile.tenant_id) {
    return <Navigate to="/setup" replace />;
  }

  // Show loading screen until session is fully stable
  // This prevents 15+ parallel queries from firing during token stabilization
  if (!sessionStable) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center font-bold text-primary-foreground text-2xl">
            OP
          </div>
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Preparando sistema...</p>
        </div>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-12 flex items-center border-b border-border px-4 shrink-0">
            <SidebarTrigger className="mr-3" />
            <span className="text-xs text-muted-foreground font-mono flex-1">
              Método O.P.E.R.A. • {new Date().toLocaleDateString("pt-BR")}
            </span>
            {!isGuest && (
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8" title="Sincronizar com celular">
                    <QrCode className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-xs">
                  <SessionSyncQR />
                </DialogContent>
              </Dialog>
            )}
          </header>
          <main className="flex-1 p-4 md:p-6 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
