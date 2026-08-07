import { HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface TourTriggerProps {
  onClick: () => void;
}

export function TourTrigger({ onClick }: TourTriggerProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClick}
            className="h-8 w-8 rounded-full text-muted-foreground hover:text-primary hover:bg-primary/10"
            aria-label="Iniciar tour"
          >
            <HelpCircle className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p className="text-xs">Tour interativo</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
