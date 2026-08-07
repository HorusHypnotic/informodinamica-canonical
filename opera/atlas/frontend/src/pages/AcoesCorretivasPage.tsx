import { useState, useRef } from "react";
import { SectionHeader } from "@/components/dashboard/SectionHeader";
import { GlobalFilters } from "@/components/dashboard/GlobalFilters";
import { AddRecordDialog, EditRecordDialog, DeleteRecordButton } from "@/components/dashboard/AddRecordDialog";
import { KPICard } from "@/components/dashboard/KPICard";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { useTableData } from "@/hooks/useTableData";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/lib/supabase";
import { ClipboardCheck, AlertTriangle, CheckCircle, Clock, Camera, Image as ImageIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";

interface AcaoCorretiva {
  id: string;
  descricao: string;
  responsavel: string | null;
  prazo: string | null;
  status: string;
  prioridade: string;
  pilar: string;
  foto_url: string | null;
  created_at: string;
}

const fields = [
  { name: "descricao", label: "Descrição da Ação", placeholder: "Ex: Corrigir prumo da parede 3º pav.", required: true },
  { name: "responsavel", label: "Responsável", placeholder: "Ex: Carlos Silva", required: false },
  { name: "pilar", label: "Pilar O.P.E.R.A.", type: "select" as const, defaultValue: "geral", options: [
    { value: "organizacao", label: "Organização" },
    { value: "padronizacao", label: "Padronização" },
    { value: "eficiencia", label: "Eficiência" },
    { value: "reducao", label: "Redução de Perdas" },
    { value: "analise", label: "Análise Contínua" },
    { value: "seguranca", label: "Segurança" },
    { value: "geral", label: "Geral" },
  ]},
  { name: "prioridade", label: "Prioridade", type: "select" as const, defaultValue: "media", options: [
    { value: "alta", label: "Alta" },
    { value: "media", label: "Média" },
    { value: "baixa", label: "Baixa" },
  ]},
  { name: "status", label: "Status", type: "select" as const, defaultValue: "pendente", options: [
    { value: "pendente", label: "Pendente" },
    { value: "em_andamento", label: "Em Andamento" },
    { value: "concluida", label: "Concluída" },
  ]},
  { name: "prazo", label: "Prazo", type: "date" as const, required: false },
];

const pilarLabels: Record<string, string> = {
  organizacao: "Organização",
  padronizacao: "Padronização",
  eficiencia: "Eficiência",
  reducao: "Redução de Perdas",
  analise: "Análise Contínua",
  seguranca: "Segurança",
  geral: "Geral",
};

const prioridadeStyles: Record<string, string> = {
  alta: "bg-status-critical/15 text-status-critical",
  media: "bg-status-warning/15 text-status-warning",
  baixa: "bg-muted text-muted-foreground",
};

function PhotoUploadButton({ acaoId, currentUrl, onUploaded }: { acaoId: string; currentUrl: string | null; onUploaded: (url: string) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const { user } = useAuth();

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    setUploading(true);
    const ext = file.name.split(".").pop();
    const path = `${user.id}/${acaoId}-${Date.now()}.${ext}`;

    const { error } = await supabase.storage.from("obra-fotos").upload(path, file);
    if (error) {
      toast.error("Erro ao enviar foto: " + error.message);
      setUploading(false);
      return;
    }

    const { data: urlData } = supabase.storage.from("obra-fotos").getPublicUrl(path);
    onUploaded(urlData.publicUrl);
    toast.success("Foto enviada!");
    setUploading(false);
  };

  return (
    <div className="flex items-center gap-1">
      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleUpload} />
      <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => inputRef.current?.click()} disabled={uploading}>
        <Camera className={`h-3.5 w-3.5 ${currentUrl ? "text-primary" : "text-muted-foreground"}`} />
      </Button>
      {currentUrl && (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" size="icon" className="h-7 w-7">
              <ImageIcon className="h-3.5 w-3.5 text-primary" />
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <img src={currentUrl} alt="Foto da ação" className="rounded-lg w-full" />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

export default function AcoesCorretivasPage() {
  const { data: acoes = [], isLoading, insert, update, remove } = useTableData<AcaoCorretiva>("acoes_corretivas");

  const pendentes = acoes.filter((a) => a.status === "pendente").length;
  const emAndamento = acoes.filter((a) => a.status === "em_andamento").length;
  const concluidas = acoes.filter((a) => a.status === "concluida").length;
  const altas = acoes.filter((a) => a.prioridade === "alta" && a.status !== "concluida").length;

  const handlePhotoUploaded = async (acaoId: string, url: string) => {
    await update(acaoId, { foto_url: url } as any);
  };

  return (
    <div>
      <GlobalFilters />
      <SectionHeader
        title="Ações Corretivas"
        subtitle="Registro e acompanhamento de ações corretivas imediatas"
        icon={<ClipboardCheck className="h-5 w-5" />}
      />

      <div className="flex justify-end mb-4">
        <AddRecordDialog title="Nova Ação Corretiva" fields={fields} onSubmit={insert} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <KPICard title="Pendentes" value={pendentes} icon={<Clock className="h-5 w-5" />} tooltip="Ações aguardando início" status={pendentes > 5 ? "critical" : pendentes > 0 ? "warning" : "ok"} />
        <KPICard title="Em Andamento" value={emAndamento} icon={<AlertTriangle className="h-5 w-5" />} tooltip="Ações em execução" status="warning" />
        <KPICard title="Concluídas" value={concluidas} icon={<CheckCircle className="h-5 w-5" />} tooltip="Ações finalizadas" status="ok" />
        <KPICard title="Prioridade Alta" value={altas} icon={<AlertTriangle className="h-5 w-5" />} tooltip="Ações urgentes não concluídas" status={altas > 0 ? "critical" : "ok"} />
      </div>

      {acoes.length > 0 && (
        <div className="glass-card p-5 mb-6">
          <h3 className="text-sm font-semibold mb-3">Progresso de Resolução</h3>
          <div className="flex items-center gap-4 mb-2">
            <span className="text-sm text-muted-foreground">Concluídas</span>
            <div className="flex-1 h-4 rounded-full bg-secondary overflow-hidden">
              <div
                className="h-full rounded-full bg-status-ok transition-all duration-700"
                style={{ width: `${(concluidas / acoes.length) * 100}%` }}
              />
            </div>
            <span className="text-sm font-mono">{concluidas}/{acoes.length}</span>
          </div>
        </div>
      )}

      <div className="glass-card p-4 overflow-x-auto">
        <h3 className="text-sm font-semibold mb-3">Todas as Ações</h3>
        {isLoading ? (
          <p className="text-sm text-muted-foreground py-8 text-center">Carregando...</p>
        ) : acoes.length === 0 ? (
          <p className="text-sm text-muted-foreground py-8 text-center">Nenhuma ação corretiva registrada. Adicione a primeira!</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-muted-foreground">
                <th className="text-left py-2 px-3">Descrição</th>
                <th className="text-left py-2 px-3">Pilar</th>
                <th className="text-left py-2 px-3">Responsável</th>
                <th className="text-left py-2 px-3">Prioridade</th>
                <th className="text-left py-2 px-3">Status</th>
                <th className="text-left py-2 px-3">Prazo</th>
                <th className="text-left py-2 px-3">Foto</th>
                <th className="text-right py-2 px-3">Ações</th>
              </tr>
            </thead>
            <tbody>
              {acoes.map((a) => (
                <tr key={a.id} className="border-b border-border/50 hover:bg-secondary/50 transition-colors">
                  <td className="py-2.5 px-3 font-medium max-w-[250px] truncate">{a.descricao}</td>
                  <td className="py-2.5 px-3">
                    <Badge variant="secondary" className="text-xs">{pilarLabels[a.pilar] || a.pilar}</Badge>
                  </td>
                  <td className="py-2.5 px-3 text-muted-foreground">{a.responsavel || "—"}</td>
                  <td className="py-2.5 px-3">
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold ${prioridadeStyles[a.prioridade] || ""}`}>
                      {a.prioridade}
                    </span>
                  </td>
                  <td className="py-2.5 px-3">
                    <StatusBadge status={a.status === "concluida" ? "ok" : a.status === "em_andamento" ? "warning" : "critical"} label={a.status === "concluida" ? "Concluída" : a.status === "em_andamento" ? "Em andamento" : "Pendente"} />
                  </td>
                  <td className="py-2.5 px-3 text-xs">{a.prazo || "—"}</td>
                  <td className="py-2.5 px-3">
                    <PhotoUploadButton acaoId={a.id} currentUrl={a.foto_url} onUploaded={(url) => handlePhotoUploaded(a.id, url)} />
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <div className="flex justify-end gap-1">
                      <EditRecordDialog title="Editar Ação Corretiva" fields={fields} record={a} onSubmit={update} />
                      <DeleteRecordButton onConfirm={() => remove(a.id)} itemName={a.descricao} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
