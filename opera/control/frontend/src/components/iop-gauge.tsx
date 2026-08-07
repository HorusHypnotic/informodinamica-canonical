import { cn } from "@/lib/utils";
import type { IOPResult, IOPClasse } from "@/lib/tdo/iop";
import { IOP_PESOS } from "@/lib/tdo/iop";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

const CLASS_COLOR: Record<IOPClasse, string> = {
  excelente: "#22c55e",
  adequado: "#84cc16",
  atencao: "#f97316",
  critico: "#ef4444",
};

const CLASS_BG: Record<IOPClasse, string> = {
  excelente: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  adequado: "bg-lime-500/15 text-lime-400 border-lime-500/30",
  atencao: "bg-orange-500/15 text-orange-400 border-orange-500/30",
  critico: "bg-red-500/15 text-red-400 border-red-500/30",
};

const COMPONENT_LABEL: Record<keyof IOPResult["componentes"], string> = {
  ICO: "Criticidade",
  IR: "Reincidência",
  EO: "Eficiência",
  PA: "Plano de ação",
  T: "Tendência",
};

export function IOPGauge({ result, compact = false }: { result: IOPResult; compact?: boolean }) {
  const color = CLASS_COLOR[result.classe];
  // Semicircular gauge (180deg) SVG
  const size = compact ? 180 : 280;
  const r = size * 0.42;
  const cx = size / 2;
  const cy = size * 0.62;
  const strokeW = compact ? 14 : 22;
  const totalArc = Math.PI * r; // half circumference
  const filled = (result.score / 100) * totalArc;

  return (
    <div className="w-full">
      <div className="relative mx-auto" style={{ width: size, height: size * 0.72 }}>
        <svg width={size} height={size * 0.72} viewBox={`0 0 ${size} ${size * 0.72}`}>
          {/* fundo */}
          <path
            d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeW}
            strokeLinecap="round"
            className="text-white/8"
          />
          {/* preenchimento */}
          <path
            d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
            fill="none"
            stroke={color}
            strokeWidth={strokeW}
            strokeLinecap="round"
            strokeDasharray={`${filled} ${totalArc}`}
            style={{
              filter: `drop-shadow(0 0 8px ${color}80)`,
              transition: "stroke-dasharray 0.6s ease-out, stroke 0.3s ease",
            }}
          />
          {/* marcadores das faixas */}
          {[25, 50, 75].map((p) => {
            const angle = Math.PI - (p / 100) * Math.PI;
            const x1 = cx + (r - strokeW / 2 - 4) * Math.cos(angle);
            const y1 = cy - (r - strokeW / 2 - 4) * Math.sin(angle);
            const x2 = cx + (r + strokeW / 2 + 4) * Math.cos(angle);
            const y2 = cy - (r + strokeW / 2 + 4) * Math.sin(angle);
            return <line key={p} x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth={1} className="text-white/25" />;
          })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-1">
          <div className="text-[10px] uppercase tracking-[0.25em] text-white/60 num">IOP</div>
          <div
            className="num font-bold tabular-nums leading-none"
            style={{ fontSize: compact ? 40 : 64, color, textShadow: `0 0 24px ${color}55` }}
          >
            {result.score}
          </div>
          <div className={cn("mt-1 inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider", CLASS_BG[result.classe])}>
            {result.label}
          </div>
        </div>
      </div>

      {!compact && (
        <>
          <p className="mt-1 text-center text-xs text-muted-foreground">{result.descricao}</p>
          <div className="mt-4 flex items-center justify-center gap-1.5 text-xs">
            <TrendIcon delta={result.tendenciaDelta} />
            <span className="text-muted-foreground">
              Tendência 7d vs 30d:{" "}
              <span className={cn(
                "num font-semibold",
                result.tendenciaDelta > 5 ? "text-red-400" : result.tendenciaDelta < -5 ? "text-emerald-400" : "text-muted-foreground",
              )}>
                {result.tendenciaDelta > 0 ? "+" : ""}{result.tendenciaDelta}%
              </span>
            </span>
          </div>

          <div className="mt-4 grid grid-cols-5 gap-1.5">
            {(Object.keys(result.componentes) as (keyof IOPResult["componentes"])[]).map((k) => {
              const v = result.componentes[k];
              const cls = v <= 25 ? "#22c55e" : v <= 50 ? "#84cc16" : v <= 75 ? "#f97316" : "#ef4444";
              const peso = Math.round(IOP_PESOS[k] * 100);
              return (
                <div key={k} className="text-center">
                  <div className="relative h-14 rounded-md bg-white/5 overflow-hidden">
                    <div
                      className="absolute bottom-0 inset-x-0 transition-all duration-500"
                      style={{ height: `${v}%`, backgroundColor: cls, boxShadow: `0 0 8px ${cls}80` }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center num font-bold text-xs text-white">
                      {v}
                    </div>
                  </div>
                  <div className="mt-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">{k}</div>
                  <div className="text-[9px] text-muted-foreground/70">{COMPONENT_LABEL[k]} · {peso}%</div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

function TrendIcon({ delta }: { delta: number }) {
  if (delta > 5) return <TrendingUp className="h-3.5 w-3.5 text-red-400" />;
  if (delta < -5) return <TrendingDown className="h-3.5 w-3.5 text-emerald-400" />;
  return <Minus className="h-3.5 w-3.5 text-muted-foreground" />;
}

export function IOPMini({ result }: { result: IOPResult }) {
  const color = CLASS_COLOR[result.classe];
  return (
    <div className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-2 py-1">
      <span className="text-[9px] font-semibold uppercase tracking-wider text-muted-foreground">IOP</span>
      <span className="num font-bold tabular-nums text-sm" style={{ color }}>{result.score}</span>
      <span
        className="h-1.5 w-1.5 rounded-full"
        style={{ backgroundColor: color, boxShadow: `0 0 6px ${color}` }}
      />
    </div>
  );
}
