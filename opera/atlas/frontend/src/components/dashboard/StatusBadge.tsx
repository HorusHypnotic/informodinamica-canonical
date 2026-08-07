interface StatusBadgeProps {
  status: "ok" | "warning" | "critical" | "pago" | "pendente" | "atrasado" | "ativo" | "ocioso" | "realocavel" | "concluido" | "em_andamento" | "planejado";
  label?: string;
}

const config: Record<string, { bg: string; text: string; label: string }> = {
  ok: { bg: "bg-status-ok/15", text: "text-status-ok", label: "OK" },
  warning: { bg: "bg-status-warning/15", text: "text-status-warning", label: "Atenção" },
  critical: { bg: "bg-status-critical/15", text: "text-status-critical", label: "Crítico" },
  pago: { bg: "bg-status-ok/15", text: "text-status-ok", label: "Pago" },
  pendente: { bg: "bg-status-warning/15", text: "text-status-warning", label: "Pendente" },
  atrasado: { bg: "bg-status-critical/15", text: "text-status-critical", label: "Em Atraso" },
  ativo: { bg: "bg-status-ok/15", text: "text-status-ok", label: "Ativo" },
  ocioso: { bg: "bg-status-critical/15", text: "text-status-critical", label: "Ocioso" },
  realocavel: { bg: "bg-status-warning/15", text: "text-status-warning", label: "Realocável" },
  concluido: { bg: "bg-status-ok/15", text: "text-status-ok", label: "Concluído" },
  em_andamento: { bg: "bg-primary/15", text: "text-primary", label: "Em Andamento" },
  planejado: { bg: "bg-muted", text: "text-muted-foreground", label: "Planejado" },
};

export function StatusBadge({ status, label }: StatusBadgeProps) {
  const c = config[status] || config.ok;
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${c.bg} ${c.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${c.text === "text-status-ok" ? "bg-status-ok" : c.text === "text-status-warning" ? "bg-status-warning" : c.text === "text-status-critical" ? "bg-status-critical" : c.text === "text-primary" ? "bg-primary" : "bg-muted-foreground"}`} />
      {label || c.label}
    </span>
  );
}
