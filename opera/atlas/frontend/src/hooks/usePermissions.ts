import { useAuth } from "@/hooks/useAuth";

/**
 * Hook centralizado para verificar permissões de UI por role.
 * Alinha com as policies RLS do banco:
 * - admin: CRUD completo + delete
 * - gestor: insert + update + select
 * - operacional: insert + select
 * - visualizador: select only
 */
export function usePermissions() {
  const { roles, isAdmin, isGestor, isGuest, isSuperAdmin, isTrialExpired } = useAuth();

  // Trial expired → read-only mode (like visualizador)
  const canInsert = !isTrialExpired && (isGuest || isAdmin || isGestor || roles.includes("operacional"));
  const canUpdate = !isTrialExpired && (isGuest || isAdmin || isGestor);
  const canDelete = !isTrialExpired && (isGuest || isAdmin);
  const canManageRoles = !isTrialExpired && (isAdmin || isSuperAdmin);
  const canManageObras = !isTrialExpired && (isAdmin || isGestor);
  const isViewOnly = !canInsert;

  return {
    canInsert,
    canUpdate,
    canDelete,
    canManageRoles,
    canManageObras,
    isViewOnly,
    isTrialExpired,
  };
}
