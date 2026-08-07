import { cn } from "@/lib/utils";
import { classificarICO, NIVEIS_ICO, type NivelICO } from "@/lib/tdo/calculos";

const TOKEN_BG: Record<NivelICO, string> = {
  verde: "bg-ico-verde text-ico-verde-fg",
  amarelo: "bg-ico-amarelo text-ico-amarelo-fg",
  laranja: "bg-ico-laranja text-ico-laranja-fg",
  vermelho: "bg-ico-vermelho text-ico-vermelho-fg",
  cinza: "bg-ico-cinza text-ico-cinza-fg",
  preto: "bg-ico-preto text-ico-preto-fg",
};

const DOT_BG: Record<NivelICO, string> = {
  verde: "bg-ico-verde-fg",
  amarelo: "bg-ico-amarelo-fg",
  laranja: "bg-ico-laranja-fg",
  vermelho: "bg-ico-vermelho",
  cinza: "bg-ico-cinza",
  preto: "bg-ico-preto",
};

export function IcoBadge({
  valor,
  size = "sm",
  variant = "default",
  showLabel = true,
}: {
  valor: number;
  size?: "sm" | "lg";
  variant?: "default" | "dot";
  showLabel?: boolean;
}) {
  const info = classificarICO(valor);
  if (variant === "dot") {
    return (
      <span className="inline-flex items-center gap-1.5 text-sm font-medium num">
        <span className={cn("inline-block h-2.5 w-2.5 rounded-full", DOT_BG[info.nivel])} />
        <span className="font-semibold">{valor}</span>
        {showLabel && <span className="text-muted-foreground">{info.label}</span>}
      </span>
    );
  }
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full font-medium num",
        size === "sm" ? "px-2.5 py-0.5 text-xs" : "px-3 py-1 text-sm",
        TOKEN_BG[info.nivel],
      )}
    >
      <span className="font-semibold">{valor}</span>
      {showLabel && <span>{info.label}</span>}
    </span>
  );
}

export function IcoPanel({ valor }: { valor: number }) {
  const info = classificarICO(valor);
  return (
    <div className={cn("rounded-xl p-5 text-center shadow-sm", TOKEN_BG[info.nivel])}>
      <div className="text-xs uppercase tracking-wider opacity-80">ICO (campo)</div>
      <div className="num mt-1 text-4xl font-semibold">{valor}</div>
      <div className="mt-1 text-sm font-medium">{info.label}</div>
      <div className="mt-1 text-xs opacity-80">{info.descricao}</div>
    </div>
  );
}

export { NIVEIS_ICO };
