/**
 * Feature flags client-side (paralelo com legacy).
 * Persistidas em localStorage para permitir comparar fontes em produção.
 *
 * Uso típico: super-admin/dev liga `unified_dashboard` para validar que
 * a RPC dashboard_aggregates expandida bate com os cálculos legacy
 * (useTableData + useMemo) antes do cutover definitivo.
 */
export type FeatureFlag = "unified_dashboard";

const STORAGE_KEY = "opera_feature_flags";

function read(): Record<FeatureFlag, boolean> {
  if (typeof window === "undefined") return { unified_dashboard: false };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { unified_dashboard: false };
    return { unified_dashboard: false, ...JSON.parse(raw) };
  } catch {
    return { unified_dashboard: false };
  }
}

export function getFeatureFlag(flag: FeatureFlag): boolean {
  return !!read()[flag];
}

export function setFeatureFlag(flag: FeatureFlag, value: boolean): void {
  if (typeof window === "undefined") return;
  const current = read();
  current[flag] = value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
  // Notifica listeners no mesmo tab
  window.dispatchEvent(new CustomEvent("feature-flags-changed", { detail: { flag, value } }));
}

import { useEffect, useState } from "react";

/** Hook reativo — re-renderiza quando a flag mudar (mesmo tab ou outras tabs). */
export function useFeatureFlag(flag: FeatureFlag): [boolean, (v: boolean) => void] {
  const [value, setValue] = useState<boolean>(() => getFeatureFlag(flag));

  useEffect(() => {
    const sync = () => setValue(getFeatureFlag(flag));
    window.addEventListener("storage", sync);
    window.addEventListener("feature-flags-changed", sync as EventListener);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener("feature-flags-changed", sync as EventListener);
    };
  }, [flag]);

  return [value, (v: boolean) => setFeatureFlag(flag, v)];
}
