import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface SectionHeaderProps {
  title: string;
  subtitle: string;
  icon: ReactNode;
  onAddRecord?: () => void;
}

export function SectionHeader({ title, subtitle, icon, onAddRecord }: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-3">
        <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
          {icon}
        </div>
        <div>
          <h2 className="text-xl font-bold">{title}</h2>
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        </div>
      </div>
      {onAddRecord && (
        <Button size="sm" onClick={onAddRecord} className="gap-1.5">
          <Plus className="h-4 w-4" />
          Adicionar Registro
        </Button>
      )}
    </div>
  );
}
