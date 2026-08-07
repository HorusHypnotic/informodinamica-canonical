import { Share2, MessageCircle, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useState } from "react";
import { toast } from "sonner";

interface ShareButtonProps {
  summary: string;
  obraNome: string;
}

export function ShareButton({ summary, obraNome }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const fullText = `📊 *Resumo O.P.E.R.A. — ${obraNome}*\n${new Date().toLocaleDateString("pt-BR")}\n\n${summary}`;

  const handleWhatsApp = () => {
    const encoded = encodeURIComponent(fullText);
    window.open(`https://wa.me/?text=${encoded}`, "_blank");
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(fullText);
    setCopied(true);
    toast.success("Resumo copiado!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="h-7 w-7">
          <Share2 className="h-3.5 w-3.5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-48 p-2" align="end">
        <button
          onClick={handleWhatsApp}
          className="w-full flex items-center gap-2 px-3 py-2 text-xs rounded-md hover:bg-secondary transition-colors"
        >
          <MessageCircle className="h-3.5 w-3.5 text-status-ok" />
          Enviar via WhatsApp
        </button>
        <button
          onClick={handleCopy}
          className="w-full flex items-center gap-2 px-3 py-2 text-xs rounded-md hover:bg-secondary transition-colors"
        >
          {copied ? <Check className="h-3.5 w-3.5 text-status-ok" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? "Copiado!" : "Copiar resumo"}
        </button>
      </PopoverContent>
    </Popover>
  );
}
