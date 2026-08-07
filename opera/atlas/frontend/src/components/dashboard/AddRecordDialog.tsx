import { useState, ReactNode } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useObra } from "@/hooks/useObra";
import { useAuth } from "@/hooks/useAuth";
import { usePermissions } from "@/hooks/usePermissions";

export interface FieldDef {
  name: string;
  label: string;
  type?: "text" | "number" | "date" | "time" | "select";
  placeholder?: string;
  options?: { value: string; label: string }[];
  defaultValue?: string;
  required?: boolean;
}

interface AddRecordDialogProps {
  title: string;
  fields: FieldDef[];
  onSubmit: (values: Record<string, any>) => Promise<{ error: any }>;
  trigger?: ReactNode;
}

export function AddRecordDialog({ title, fields, onSubmit, trigger }: AddRecordDialogProps) {
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [addedCount, setAddedCount] = useState(0);
  const { selectedObraId } = useObra();
  const { isGuest } = useAuth();
  const { canInsert } = usePermissions();

  if (!canInsert) return null;

  const handleOpen = (isOpen: boolean) => {
    setOpen(isOpen);
    if (isOpen) {
      const defaults: Record<string, string> = {};
      fields.forEach((f) => {
        if (f.defaultValue) defaults[f.name] = f.defaultValue;
      });
      setValues(defaults);
      setAddedCount(0);
    }
  };

  const handleSubmit = async (keepOpen = false) => {
    if (!selectedObraId && !isGuest) {
      toast.error("Selecione uma obra antes de adicionar registros");
      return;
    }
    const required = fields.filter((f) => f.required !== false);
    const missing = required.find((f) => !values[f.name]?.trim());
    if (missing) {
      toast.error(`Campo "${missing.label}" é obrigatório`);
      return;
    }

    setLoading(true);
    const parsed: Record<string, any> = {};
    fields.forEach((f) => {
      const v = values[f.name];
      if (v !== undefined && v !== "") {
        parsed[f.name] = f.type === "number" ? Number(v) : v;
      }
    });

    const { error } = await onSubmit(parsed);
    setLoading(false);
    if (error) {
      toast.error("Erro ao salvar: " + (error.message || error));
    } else if (keepOpen) {
      setAddedCount((c) => c + 1);
      toast.success("Registro adicionado! Preencha o próximo.");
      // Reset form but keep defaults
      const defaults: Record<string, string> = {};
      fields.forEach((f) => {
        if (f.defaultValue) defaults[f.name] = f.defaultValue;
      });
      setValues(defaults);
    } else {
      toast.success(`${addedCount + 1} registro(s) adicionado(s)!`);
      setAddedCount(0);
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button size="sm" className="gap-1.5">
            <Plus className="h-4 w-4" /> Adicionar Registro
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        {!selectedObraId && !isGuest && (
          <p className="text-sm text-status-critical">⚠ Selecione uma obra nos filtros antes de adicionar registros.</p>
        )}
        <div className="space-y-3 pt-2">
          {fields.map((f) => (
            <div key={f.name} className="space-y-1">
              <label className="text-sm font-medium">{f.label}</label>
              {f.type === "select" && f.options ? (
                <Select value={values[f.name] || ""} onValueChange={(v) => setValues({ ...values, [f.name]: v })}>
                  <SelectTrigger><SelectValue placeholder={f.placeholder || "Selecionar"} /></SelectTrigger>
                  <SelectContent>
                    {f.options.map((o) => (
                      <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <Input
                  type={f.type || "text"}
                  placeholder={f.placeholder}
                  value={values[f.name] || ""}
                  onChange={(e) => setValues({ ...values, [f.name]: e.target.value })}
                  step={f.type === "number" ? "any" : undefined}
                />
              )}
            </div>
          ))}
          {addedCount > 0 && (
            <p className="text-xs text-muted-foreground text-center">✅ {addedCount} registro(s) adicionado(s) nesta sessão</p>
          )}
          <div className="flex gap-2 mt-2">
            <Button variant="outline" onClick={() => handleSubmit(true)} disabled={loading || (!selectedObraId && !isGuest)} className="flex-1">
              {loading ? "Salvando..." : "+ Salvar e Adicionar Outro"}
            </Button>
            <Button onClick={() => handleSubmit(false)} disabled={loading || (!selectedObraId && !isGuest)} className="flex-1">
              {loading ? "Salvando..." : "Salvar e Fechar"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// --- Edit Dialog ---
interface EditRecordDialogProps {
  title: string;
  fields: FieldDef[];
  record: Record<string, any>;
  onSubmit: (id: string, values: Record<string, any>) => Promise<{ error: any }>;
}

export function EditRecordDialog({ title, fields, record, onSubmit }: EditRecordDialogProps) {
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const { canUpdate } = usePermissions();

  if (!canUpdate) return null;

  const handleOpen = (isOpen: boolean) => {
    setOpen(isOpen);
    if (isOpen) {
      const initial: Record<string, string> = {};
      fields.forEach((f) => {
        initial[f.name] = record[f.name]?.toString() || "";
      });
      setValues(initial);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    const parsed: Record<string, any> = {};
    fields.forEach((f) => {
      const v = values[f.name];
      if (v !== undefined && v !== "") {
        parsed[f.name] = f.type === "number" ? Number(v) : v;
      }
    });

    const { error } = await onSubmit(record.id, parsed);
    setLoading(false);
    if (error) {
      toast.error("Erro ao atualizar: " + (error.message || error));
    } else {
      toast.success("Registro atualizado!");
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="h-7 w-7">
          <Pencil className="h-3.5 w-3.5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="space-y-3 pt-2">
          {fields.map((f) => (
            <div key={f.name} className="space-y-1">
              <label className="text-sm font-medium">{f.label}</label>
              {f.type === "select" && f.options ? (
                <Select value={values[f.name] || ""} onValueChange={(v) => setValues({ ...values, [f.name]: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {f.options.map((o) => (
                      <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <Input
                  type={f.type || "text"}
                  placeholder={f.placeholder}
                  value={values[f.name] || ""}
                  onChange={(e) => setValues({ ...values, [f.name]: e.target.value })}
                  step={f.type === "number" ? "any" : undefined}
                />
              )}
            </div>
          ))}
          <Button onClick={handleSubmit} disabled={loading} className="w-full mt-2">
            {loading ? "Salvando..." : "Atualizar"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// --- Delete Confirmation ---
interface DeleteRecordButtonProps {
  onConfirm: () => Promise<void>;
  itemName?: string;
}

export function DeleteRecordButton({ onConfirm, itemName }: DeleteRecordButtonProps) {
  const { canDelete } = usePermissions();

  if (!canDelete) return null;

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive hover:text-destructive">
          <Trash2 className="h-3.5 w-3.5" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
          <AlertDialogDescription>
            Tem certeza que deseja excluir {itemName ? `"${itemName}"` : "este registro"}? Esta ação não pode ser desfeita.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
            Excluir
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
