/**
 * Auth wrapper — simplified. 
 * The onAuthChange wrapper was removed because it registered
 * a second onAuthStateChange listener, contributing to
 * TOKEN_REFRESHED loops on mobile.
 */
import { supabase } from '@/integrations/supabase/client';

export async function getSession() {
  const { data: { session }, error } = await supabase.auth.getSession();
  if (error) console.warn('[Auth] Erro ao obter sessão:', error.message);
  return session;
}
