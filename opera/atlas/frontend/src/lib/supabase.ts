/**
 * Re-export the auto-generated Supabase client.
 * 
 * Previously this file created a separate client with async IndexedDB storage,
 * which caused TOKEN_REFRESHED loops on mobile because the SDK expects
 * synchronous reads. The auto-generated client uses localStorage (synchronous)
 * and works reliably on all platforms.
 */
export { supabase } from "@/integrations/supabase/client";
