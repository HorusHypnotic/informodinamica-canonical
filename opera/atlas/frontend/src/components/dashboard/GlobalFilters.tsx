import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useObra } from "@/hooks/useObra";
import { Filter, Eye } from "lucide-react";
import { PeriodFilter, usePeriodFilter } from "@/hooks/usePeriodFilter";
import { Badge } from "@/components/ui/badge";

interface GlobalFiltersProps {
  children?: React.ReactNode;
}

/**
 * Renderiza apenas a UI dos filtros. O estado vive em PeriodFilterProvider
 * (montado globalmente em App.tsx) — todos os hooks RPC consomem o mesmo período.
 */
export function GlobalFilters({ children }: GlobalFiltersProps) {
  const { obras, selectedObraId, setSelectedObraId, isViewOnlyObra } = useObra();
  const { period, setPeriod } = usePeriodFilter();

  return (
    <>
      <div className="flex flex-wrap items-center gap-3 mb-6 p-4 glass-card">
        <Filter className="h-4 w-4 text-primary" />
        <span className="text-sm font-medium text-muted-foreground mr-1">Filtros:</span>

        {isViewOnlyObra && (
          <Badge variant="secondary" className="gap-1 text-xs">
            <Eye className="h-3 w-3" /> Somente leitura
          </Badge>
        )}

        <Select value={selectedObraId || "all"} onValueChange={(v) => setSelectedObraId(v === "all" ? null : v)}>
          <SelectTrigger className="w-[200px] h-9 bg-secondary border-border">
            <SelectValue placeholder="Obra" />
          </SelectTrigger>
          <SelectContent>
            {!isViewOnlyObra && <SelectItem value="all">Todas as obras</SelectItem>}
            {obras.map((o) => (
              <SelectItem key={o.id} value={o.id}>{o.nome}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={period} onValueChange={(v) => setPeriod(v as PeriodFilter)}>
          <SelectTrigger className="w-[160px] h-9 bg-secondary border-border">
            <SelectValue placeholder="Período" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">Últimos 7 dias</SelectItem>
            <SelectItem value="15d">Últimos 15 dias</SelectItem>
            <SelectItem value="30d">Últimos 30 dias</SelectItem>
            <SelectItem value="all">Todo o período</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {children}
    </>
  );
}
