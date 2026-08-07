import { ReactNode } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from "lucide-react";

interface KPICardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: ReactNode;
  tooltip: string;
  trend?: { value: number; label: string };
  status?: "ok" | "warning" | "critical";
  className?: string;
}

const statusColors = {
  ok: "border-status-ok/30 bg-status-ok/5",
  warning: "border-status-warning/30 bg-status-warning/5",
  critical: "border-status-critical/30 bg-status-critical/5",
};

const statusTextColors = {
  ok: "text-status-ok",
  warning: "text-status-warning",
  critical: "text-status-critical",
};

export function KPICard({ title, value, subtitle, icon, tooltip, trend, status, className = "" }: KPICardProps) {
  return (
    <div className={`glass-card p-5 ${status ? statusColors[status] : ""} ${className}`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-primary/10 text-primary">
            {icon}
          </div>
          <Tooltip>
            <TooltipTrigger asChild>
              <Info className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
            </TooltipTrigger>
            <TooltipContent className="max-w-[250px]">
              <p className="text-sm">{tooltip}</p>
            </TooltipContent>
          </Tooltip>
        </div>
        {trend && (
          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
            trend.value >= 0 ? "bg-status-ok/10 text-status-ok" : "bg-status-critical/10 text-status-critical"
          }`}>
            {trend.value > 0 ? "+" : ""}{trend.value}% {trend.label}
          </span>
        )}
      </div>
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">{title}</p>
      <p className={`text-2xl font-bold animate-count-up ${status ? statusTextColors[status] : "text-foreground"}`}>
        {value}
      </p>
      {subtitle && <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>}
    </div>
  );
}
