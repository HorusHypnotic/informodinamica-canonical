import { createContext, useContext, useState, ReactNode } from "react";

export type PeriodFilter = "7d" | "15d" | "30d" | "all";

interface PeriodFilterContextType {
  period: PeriodFilter;
  setPeriod: (p: PeriodFilter) => void;
  /** Returns ISO date (YYYY-MM-DD) start cutoff, or null when "all" */
  getDateFrom: () => string | null;
  /** Resolved start date string (or undefined for "all") — use this in RPC keys */
  start?: string;
  /** Today (end cutoff) */
  end: string;
}

const PeriodFilterContext = createContext<PeriodFilterContextType | undefined>(undefined);

export { PeriodFilterContext };

function resolveStart(period: PeriodFilter): string | undefined {
  if (period === "all") return undefined;
  const days = period === "7d" ? 7 : period === "15d" ? 15 : 30;
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d.toISOString().substring(0, 10);
}

const TODAY = () => new Date().toISOString().substring(0, 10);

export function PeriodFilterProvider({ children, defaultPeriod = "30d" as PeriodFilter }: { children: ReactNode; defaultPeriod?: PeriodFilter }) {
  const [period, setPeriod] = useState<PeriodFilter>(defaultPeriod);
  const start = resolveStart(period);
  const end = TODAY();
  const getDateFrom = () => start || null;
  return (
    <PeriodFilterContext.Provider value={{ period, setPeriod, getDateFrom, start, end }}>
      {children}
    </PeriodFilterContext.Provider>
  );
}

export function usePeriodFilter() {
  const ctx = useContext(PeriodFilterContext);
  if (!ctx) {
    // Fallback (no provider mounted yet): default to 30d
    const start = resolveStart("30d");
    return {
      period: "30d" as PeriodFilter,
      setPeriod: () => {},
      getDateFrom: () => start || null,
      start,
      end: TODAY(),
    };
  }
  return ctx;
}

/** @deprecated kept for backward compatibility — prefer usePeriodFilter() */
export function createPeriodFilter(period: PeriodFilter) {
  const start = resolveStart(period);
  return {
    period,
    getDateFrom: () => start || null,
    start,
    end: TODAY(),
  };
}

/** Filter an array by a date field using the current period */
export function filterByPeriod<T>(items: T[], dateField: string, period: PeriodFilter): T[] {
  if (period === "all") return items;
  const days = period === "7d" ? 7 : period === "15d" ? 15 : 30;
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - days);
  const cutoffStr = cutoff.toISOString().substring(0, 10);
  return items.filter((item: any) => {
    const val = item[dateField];
    return val && val >= cutoffStr;
  });
}
