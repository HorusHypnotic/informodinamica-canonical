import { supabase } from "@/lib/supabase";

interface AuditEntry {
  action: string;
  target_type?: string;
  target_id?: string;
  metadata?: Record<string, unknown>;
  /** Cadeia causal (ver src/lib/observability.ts). Opcional — preferir passar quando disponível. */
  correlation_id?: string;
  /** Evento pai direto (ver src/lib/observability.ts). */
  causation_id?: string;
}

export async function logAudit(entry: AuditEntry) {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data: profile } = await supabase
      .from("profiles")
      .select("tenant_id")
      .eq("id", user.id)
      .single();

    await supabase.from("audit_logs").insert({
      user_id: user.id,
      tenant_id: profile?.tenant_id || null,
      action: entry.action,
      target_type: entry.target_type || null,
      target_id: entry.target_id || null,
      metadata: entry.metadata || {},
      correlation_id: entry.correlation_id || null,
      causation_id: entry.causation_id || null,
    } as never);
  } catch (err) {
    console.warn("[AuditLog] Erro ao gravar log:", err);
  }
}
