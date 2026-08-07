/**
 * Observabilidade Causal — Opera Core
 * --------------------------------------------------------------
 * Fornece correlation_id + structured logging atravessando
 * client → edge function → RPC → trigger → audit.
 *
 * Cumpre o passo #2 do roadmap pós OPERA_CORE.
 *
 * Conceitos (ver .lovable/OPERA_CORE.md):
 *   - correlation_id : a história inteira de uma cadeia causal
 *   - causation_id   : o pai direto que originou o evento atual
 *   - event_type     : nome semântico (ex: 'presenca.confirmar')
 *   - source         : origem técnica (ex: 'client.RegistroPage')
 *
 * Regras:
 *   - Logamos transições, decisões, falhas, autorizações, mutações.
 *   - NÃO logamos render, polling, hover, eventos triviais.
 *   - Falhas de logging NUNCA quebram fluxo de negócio.
 */

import { supabase } from "@/lib/supabase";

const CORRELATION_HEADER = "x-correlation-id";
const CAUSATION_HEADER = "x-causation-id";

/** Gera um UUID v4 (compatível com browsers modernos + fallback). */
export function newCorrelationId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  // Fallback raro — Math.random é suficiente para identificador, não para segurança.
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

// ---------------------------------------------------------------
// Contexto causal por "operação lógica"
// ---------------------------------------------------------------

interface CausalContext {
  correlationId: string;
  causationId?: string;
  tenantId?: string;
  obraId?: string;
  source: string;
}

/**
 * Cria um novo contexto causal raiz (nova cadeia).
 * Use no início de uma ação do usuário (clique de botão, submit, etc).
 */
export function startCausalContext(source: string, opts?: {
  obraId?: string;
  tenantId?: string;
}): CausalContext {
  return {
    correlationId: newCorrelationId(),
    source,
    obraId: opts?.obraId,
    tenantId: opts?.tenantId,
  };
}

/**
 * Deriva um contexto filho que mantém o mesmo correlation_id
 * mas registra o evento atual como pai do próximo.
 */
export function childCausalContext(
  parent: CausalContext,
  source: string,
  parentEventId?: string,
): CausalContext {
  return {
    correlationId: parent.correlationId,
    causationId: parentEventId ?? parent.causationId,
    tenantId: parent.tenantId,
    obraId: parent.obraId,
    source,
  };
}

// ---------------------------------------------------------------
// Logger estruturado
// ---------------------------------------------------------------

export type EventStatus = "success" | "failure" | "warning" | "info" | "denied";
export type EventSeverity = "debug" | "info" | "warning" | "error" | "critical";

export interface LogEventInput {
  ctx: CausalContext;
  eventType: string;
  status?: EventStatus;
  severity?: EventSeverity;
  payload?: Record<string, unknown>;
  errorMessage?: string;
  durationMs?: number;
}

/**
 * Grava um evento operacional semântico.
 * Server-side valida tenant via RPC SECURITY DEFINER (I1/I2).
 *
 * Retorna o id do evento criado (útil para causation_id de eventos seguintes),
 * ou null se a gravação falhar — e nunca relança o erro.
 */
export async function logEvent(input: LogEventInput): Promise<string | null> {
  const { ctx, eventType } = input;

  // Console mirror (dev): rastreável visualmente
  if (import.meta.env.DEV) {
    const tag = `[obs:${input.severity ?? "info"}]`;
    // eslint-disable-next-line no-console
    console.log(tag, eventType, {
      correlation_id: ctx.correlationId,
      source: ctx.source,
      status: input.status ?? "success",
      ...input.payload,
    });
  }

  try {
    const { data, error } = await supabase.rpc("log_system_event", {
      _correlation_id: ctx.correlationId,
      _event_type: eventType,
      _source: ctx.source,
      _causation_id: ctx.causationId ?? null,
      _obra_id: ctx.obraId ?? null,
      _status: input.status ?? "success",
      _severity: input.severity ?? "info",
      _payload: (input.payload ?? {}) as never,
      _error_message: input.errorMessage ?? null,
      _duration_ms: input.durationMs ?? null,
    } as never);

    if (error) {
      // Falha silenciosa — observabilidade não pode derrubar fluxo.
      // eslint-disable-next-line no-console
      console.warn("[observability] log_system_event falhou:", error.message);
      return null;
    }
    return (data as unknown as string) ?? null;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.warn("[observability] log_system_event exception:", err);
    return null;
  }
}

/**
 * Wrapper para medir duração e logar sucesso/falha automaticamente.
 *
 * @example
 * await traced({ ctx, eventType: "presenca.confirmar" }, async () => {
 *   await supabase.from("registro_presencas").update(...);
 * });
 */
export async function traced<T>(
  base: Omit<LogEventInput, "status" | "durationMs" | "errorMessage">,
  fn: () => Promise<T>,
): Promise<T> {
  const start = performance.now();
  try {
    const result = await fn();
    void logEvent({
      ...base,
      status: "success",
      durationMs: Math.round(performance.now() - start),
    });
    return result;
  } catch (err) {
    void logEvent({
      ...base,
      status: "failure",
      severity: "error",
      durationMs: Math.round(performance.now() - start),
      errorMessage: err instanceof Error ? err.message : String(err),
    });
    throw err;
  }
}

// ---------------------------------------------------------------
// Headers para edge functions
// ---------------------------------------------------------------

/**
 * Headers HTTP para propagar correlação a edge functions.
 * Use em supabase.functions.invoke(name, { headers: causalHeaders(ctx) }).
 */
export function causalHeaders(ctx: CausalContext): Record<string, string> {
  const h: Record<string, string> = {
    [CORRELATION_HEADER]: ctx.correlationId,
  };
  if (ctx.causationId) h[CAUSATION_HEADER] = ctx.causationId;
  return h;
}

export const OBS_HEADERS = {
  CORRELATION: CORRELATION_HEADER,
  CAUSATION: CAUSATION_HEADER,
} as const;
