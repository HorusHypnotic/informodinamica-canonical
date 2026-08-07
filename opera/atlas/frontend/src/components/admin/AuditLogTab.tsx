import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuth } from "@/hooks/useAuth";

interface AuditLog {
  id: string;
  user_id: string;
  action: string;
  target_type: string | null;
  target_id: string | null;
  metadata: any;
  created_at: string;
  tenant_id: string | null;
}

const ACTION_LABELS: Record<string, { label: string; color: string }> = {
  DELETE_OBRA: { label: "Excluir Obra", color: "destructive" },
  DELETE_DIARIA: { label: "Excluir Diária", color: "destructive" },
  ZERAR_DIARIAS: { label: "Zerar Diárias", color: "destructive" },
  ADD_ROLE: { label: "Adicionar Papel", color: "default" },
  REMOVE_ROLE: { label: "Remover Papel", color: "secondary" },
  BLOCK_USER: { label: "Bloquear Usuário", color: "destructive" },
  UNBLOCK_USER: { label: "Desbloquear Usuário", color: "default" },
  CREATE_INVITE: { label: "Criar Convite", color: "default" },
  DELETE_INVITE: { label: "Excluir Convite", color: "secondary" },
};

export function AuditLogTab() {
  const { profile } = useAuth();
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterAction, setFilterAction] = useState<string>("all");
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    if (!profile?.tenant_id) return;
    const fetch = async () => {
      setLoading(true);
      let q = supabase
        .from("audit_logs")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(200);

      const { data } = await q;
      setLogs((data || []) as AuditLog[]);
      setLoading(false);
    };
    fetch();
  }, [profile?.tenant_id]);

  const filtered = logs.filter(l => {
    if (filterAction !== "all" && l.action !== filterAction) return false;
    if (searchText) {
      const text = searchText.toLowerCase();
      const meta = JSON.stringify(l.metadata || {}).toLowerCase();
      return l.action.toLowerCase().includes(text) || meta.includes(text) || (l.target_id || "").toLowerCase().includes(text);
    }
    return true;
  });

  const uniqueActions = [...new Set(logs.map(l => l.action))];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3">
        <Select value={filterAction} onValueChange={setFilterAction}>
          <SelectTrigger className="w-[200px] h-9">
            <SelectValue placeholder="Filtrar por ação" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas as ações</SelectItem>
            {uniqueActions.map(a => (
              <SelectItem key={a} value={a}>{ACTION_LABELS[a]?.label || a}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input
          placeholder="Buscar nos logs..."
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
          className="w-[200px] h-9"
        />
      </div>

      <ScrollArea className="h-[500px]">
        <div className="glass-card overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Data/Hora</TableHead>
                <TableHead>Ação</TableHead>
                <TableHead>Detalhes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={3} className="text-center py-8 text-muted-foreground">Carregando...</TableCell>
                </TableRow>
              ) : filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} className="text-center py-8 text-muted-foreground">Nenhum log encontrado</TableCell>
                </TableRow>
              ) : filtered.map(log => {
                const info = ACTION_LABELS[log.action] || { label: log.action, color: "secondary" };
                const meta = log.metadata || {};
                const details = Object.entries(meta)
                  .filter(([k]) => k !== "action")
                  .map(([k, v]) => `${k}: ${v}`)
                  .join(" • ");

                return (
                  <TableRow key={log.id}>
                    <TableCell className="text-xs text-muted-foreground whitespace-nowrap">
                      {new Date(log.created_at).toLocaleString("pt-BR")}
                    </TableCell>
                    <TableCell>
                      <Badge variant={info.color as any} className="text-xs">
                        {info.label}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-xs max-w-[300px] truncate" title={details}>
                      {details || "—"}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </ScrollArea>
    </div>
  );
}
