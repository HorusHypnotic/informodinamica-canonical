/**
 * Auth debug logger — DISABLED.
 * Was causing TOKEN_REFRESHED loops on mobile by registering
 * a second onAuthStateChange listener and calling getSession()
 * on visibility changes.
 */
export const installAuthDebug = (_supabase: any) => {
  // Intentionally empty — debug removed to fix mobile auth loop
};
