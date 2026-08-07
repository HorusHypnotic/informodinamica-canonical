import { useState } from "react";
import {
  AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle,
  AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { AlertTriangle } from "lucide-react";

interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  /** If set, user must type this text to confirm (strong confirmation) */
  confirmText?: string;
  onConfirm: () => void;
  variant?: "default" | "destructive";
}

export function ConfirmDialog({
  open, onOpenChange, title, description,
  confirmText, onConfirm, variant = "destructive",
}: ConfirmDialogProps) {
  const [typed, setTyped] = useState("");
  const needsTyping = !!confirmText;
  const canConfirm = !needsTyping || typed.toUpperCase() === confirmText?.toUpperCase();

  const handleConfirm = () => {
    if (!canConfirm) return;
    setTyped("");
    onConfirm();
    onOpenChange(false);
  };

  const handleCancel = () => {
    setTyped("");
    onOpenChange(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={(v) => { if (!v) handleCancel(); else onOpenChange(v); }}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <AlertTriangle className={`h-5 w-5 ${variant === "destructive" ? "text-destructive" : "text-status-warning"}`} />
            {title}
          </AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>

        {needsTyping && (
          <div className="space-y-2 py-2">
            <p className="text-sm text-muted-foreground">
              Digite <span className="font-bold text-foreground">{confirmText}</span> para confirmar:
            </p>
            <Input
              value={typed}
              onChange={(e) => setTyped(e.target.value)}
              placeholder={confirmText}
              className="font-mono"
              autoFocus
            />
          </div>
        )}

        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleCancel}>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            disabled={!canConfirm}
            className={variant === "destructive" ? "bg-destructive text-destructive-foreground hover:bg-destructive/90" : ""}
          >
            Confirmar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
