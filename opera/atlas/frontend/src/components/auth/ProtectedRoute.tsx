import { useAuth } from "@/hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";
import { ReactNode } from "react";
import { AlertTriangle, Shield } from "lucide-react";

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user, profile, loading, isGuest, isTrialExpired } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!user && !isGuest) {
    return <Navigate to="/landing" replace />;
  }

  // Guest mode skips all checks
  if (isGuest) {
    return <>{children}</>;
  }

  // Beta status check: if user has a beta_status and it's not approved, redirect
  if (profile && (profile as any).beta_status && (profile as any).beta_status !== "aprovado") {
    if (location.pathname !== "/beta-status") {
      return <Navigate to="/beta-status" replace />;
    }
  }

  // Tenant setup check
  if (profile && !profile.tenant_id && location.pathname !== "/setup") {
    return <Navigate to="/setup" replace />;
  }

  return (
    <>
      {isTrialExpired && (
        <div className="bg-destructive/10 border-b border-destructive/20 px-4 py-2 flex items-center gap-2 text-sm text-destructive">
          <AlertTriangle className="h-4 w-4 shrink-0" />
          <span>
            Seu período de teste expirou. O sistema está em <strong>modo somente leitura</strong>. 
            Entre em contato para ativar seu plano.
          </span>
        </div>
      )}
      {!isGuest && (
        <div className="bg-muted/50 border-b border-border px-4 py-1.5 flex items-center gap-2 text-xs text-muted-foreground">
          <Shield className="h-3 w-3 shrink-0" />
          <span>
            Durante o período beta, administradores do sistema podem acessar dados operacionais de forma limitada para diagnóstico e melhoria da plataforma.
          </span>
        </div>
      )}
      {children}
    </>
  );
}
