import { useEffect, useState, useMemo } from "react";
import { supabase } from "@/lib/supabase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Building2, Users, HardHat, Crown, Save, Search, CheckSquare, RefreshCw, Activity, ArrowUpDown } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface TenantRow {
  id: string;
  nome: string;
  cnpj: string | null;
  limite_obras: number;
  created_at: string;
  _obra_count?: number;
  _user_count?: number;
  _last_activity?: string | null;
}

type SortField = "nome" | "created_at" | "_user_count" | "_obra_count";

export function SuperAdminTab() {
  const [tenants, setTenants] = useState<TenantRow[]>([]);
  const [editingLimits, setEditingLimits] = useState<Record<string, number>>({});
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [bulkLimit, setBulkLimit] = useState<number>(3);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState<SortField>("created_at");
  const [sortAsc, setSortAsc] = useState(false);
  const [loading, setLoading] = useState(false);
  const isMobile = useIsMobile();

  const fetchTenants = async () => {
    setLoading(true);
    const { data: tenantData } = await supabase
      .from("tenants")
      .select("*")
      .order("created_at", { ascending: false });

    if (!tenantData) { setLoading(false); return; }

    const enriched = await Promise.all(
      tenantData.map(async (t: any) => {
        const [obrasRes, usersRes, activityRes] = await Promise.all([
          supabase.from("obras").select("id", { count: "exact", head: true }).eq("tenant_id", t.id),
          supabase.from("profiles").select("id", { count: "exact", head: true }).eq("tenant_id", t.id),
          supabase.from("profiles").select("updated_at").eq("tenant_id", t.id).order("updated_at", { ascending: false }).limit(1),
        ]);
        return {
          ...t,
          _obra_count: obrasRes.count ?? 0,
          _user_count: usersRes.count ?? 0,
          _last_activity: activityRes.data?.[0]?.updated_at ?? null,
        } as TenantRow;
      })
    );

    setTenants(enriched);
    setLoading(false);
  };

  useEffect(() => { fetchTenants(); }, []);

  const filteredTenants = useMemo(() => {
    let result = tenants;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(t => t.nome.toLowerCase().includes(q) || (t.cnpj && t.cnpj.includes(q)));
    }
    result = [...result].sort((a, b) => {
      const av = a[sortField] ?? "";
      const bv = b[sortField] ?? "";
      if (typeof av === "number" && typeof bv === "number") return sortAsc ? av - bv : bv - av;
      return sortAsc ? String(av).localeCompare(String(bv)) : String(bv).localeCompare(String(av));
    });
    return result;
  }, [tenants, searchQuery, sortField, sortAsc]);

  const updateLimit = async (tenantId: string) => {
    const newLimit = editingLimits[tenantId];
    if (newLimit === undefined || newLimit < 1) return;
    const { error } = await supabase.from("tenants").update({ limite_obras: newLimit }).eq("id", tenantId);
    if (error) { toast.error("Erro ao atualizar limite: " + error.message); }
    else {
      toast.success("Limite atualizado!");
      setEditingLimits(prev => { const copy = { ...prev }; delete copy[tenantId]; return copy; });
      fetchTenants();
    }
  };

  const applyBulkLimit = async () => {
    if (selectedIds.size === 0) { toast.error("Selecione ao menos um cliente"); return; }
    if (bulkLimit < 1) return;
    const promises = Array.from(selectedIds).map(id =>
      supabase.from("tenants").update({ limite_obras: bulkLimit }).eq("id", id)
    );
    const results = await Promise.all(promises);
    const errors = results.filter(r => r.error);
    if (errors.length > 0) toast.error(`${errors.length} erro(s) ao atualizar`);
    else toast.success(`${selectedIds.size} cliente(s) atualizado(s)!`);
    setSelectedIds(new Set());
    fetchTenants();
  };

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const toggleAll = () => {
    if (selectedIds.size === filteredTenants.length) setSelectedIds(new Set());
    else setSelectedIds(new Set(filteredTenants.map(t => t.id)));
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) setSortAsc(!sortAsc);
    else { setSortField(field); setSortAsc(true); }
  };

  const totalObras = tenants.reduce((acc, t) => acc + (t._obra_count || 0), 0);
  const totalUsers = tenants.reduce((acc, t) => acc + (t._user_count || 0), 0);
  const tenantsAtLimit = tenants.filter(t => (t._obra_count || 0) >= t.limite_obras).length;

  const formatDate = (d: string | null) => d ? new Date(d).toLocaleDateString("pt-BR") : "—";
  const formatRelative = (d: string | null) => {
    if (!d) return "Sem atividade";
    const diff = (Date.now() - new Date(d).getTime()) / (1000 * 60 * 60);
    if (diff < 1) return "Agora";
    if (diff < 24) return `${Math.floor(diff)}h atrás`;
    if (diff < 720) return `${Math.floor(diff / 24)}d atrás`;
    return `${Math.floor(diff / 720)}m atrás`;
  };

  return (
    <div className="space-y-4">
      {/* KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="glass-card">
          <CardContent className="p-3 sm:p-4 text-center space-y-1">
            <Building2 className="h-4 w-4 sm:h-5 sm:w-5 mx-auto text-primary" />
            <p className="text-xl sm:text-2xl font-bold text-primary">{tenants.length}</p>
            <p className="text-[10px] sm:text-xs text-muted-foreground">Clientes</p>
          </CardContent>
        </Card>
        <Card className="glass-card">
          <CardContent className="p-3 sm:p-4 text-center space-y-1">
            <Users className="h-4 w-4 sm:h-5 sm:w-5 mx-auto text-chart-4" />
            <p className="text-xl sm:text-2xl font-bold text-chart-4">{totalUsers}</p>
            <p className="text-[10px] sm:text-xs text-muted-foreground">Usuários</p>
          </CardContent>
        </Card>
        <Card className="glass-card">
          <CardContent className="p-3 sm:p-4 text-center space-y-1">
            <HardHat className="h-4 w-4 sm:h-5 sm:w-5 mx-auto text-status-ok" />
            <p className="text-xl sm:text-2xl font-bold text-status-ok">{totalObras}</p>
            <p className="text-[10px] sm:text-xs text-muted-foreground">Obras Total</p>
          </CardContent>
        </Card>
        <Card className="glass-card">
          <CardContent className="p-3 sm:p-4 text-center space-y-1">
            <Activity className="h-4 w-4 sm:h-5 sm:w-5 mx-auto text-destructive" />
            <p className="text-xl sm:text-2xl font-bold text-destructive">{tenantsAtLimit}</p>
            <p className="text-[10px] sm:text-xs text-muted-foreground">No Limite</p>
          </CardContent>
        </Card>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <Input
            placeholder="Buscar cliente ou CNPJ..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="pl-8 h-8 text-sm"
          />
        </div>
        <Button variant="outline" size="sm" className="gap-1.5 h-8" onClick={fetchTenants} disabled={loading}>
          <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} /> Atualizar
        </Button>
      </div>

      {/* Bulk Actions */}
      {selectedIds.size > 0 && (
        <Card className="glass-card border-primary/30">
          <CardContent className="p-3 flex flex-col sm:flex-row sm:items-center gap-2">
            <CheckSquare className="h-4 w-4 text-primary shrink-0" />
            <span className="text-xs font-medium">{selectedIds.size} selecionado(s)</span>
            <div className="flex items-center gap-2 flex-1">
              <span className="text-xs text-muted-foreground">Novo limite:</span>
              <Input
                type="number"
                min={1}
                max={100}
                value={bulkLimit}
                onChange={e => setBulkLimit(parseInt(e.target.value) || 1)}
                className="w-20 h-7 text-center text-sm"
              />
              <Button size="sm" variant="default" className="gap-1 h-7 text-xs" onClick={applyBulkLimit}>
                <Save className="h-3 w-3" /> Aplicar em lote
              </Button>
              <Button size="sm" variant="ghost" className="h-7 text-xs" onClick={() => setSelectedIds(new Set())}>
                Limpar
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Mobile: Card Layout / Desktop: Table */}
      {isMobile ? (
        <div className="space-y-3">
          <div className="flex items-center gap-2 px-1">
            <Checkbox
              checked={selectedIds.size === filteredTenants.length && filteredTenants.length > 0}
              onCheckedChange={toggleAll}
            />
            <span className="text-xs text-muted-foreground">Selecionar todos</span>
          </div>
          {filteredTenants.map(t => (
            <Card key={t.id} className={`glass-card transition-colors ${selectedIds.has(t.id) ? "ring-1 ring-primary/50" : ""}`}>
              <CardContent className="p-3 space-y-2">
                <div className="flex items-start gap-2">
                  <Checkbox
                    checked={selectedIds.has(t.id)}
                    onCheckedChange={() => toggleSelect(t.id)}
                    className="mt-0.5"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{t.nome}</p>
                    <p className="text-[10px] text-muted-foreground">{t.cnpj || "Sem CNPJ"}</p>
                  </div>
                  <Badge
                    variant="secondary"
                    className={`text-[10px] shrink-0 ${(t._obra_count || 0) >= t.limite_obras ? "bg-destructive/20 text-destructive" : "bg-status-ok/20 text-status-ok"}`}
                  >
                    {t._obra_count}/{t.limite_obras} obras
                  </Badge>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div>
                    <p className="text-xs font-bold text-chart-4">{t._user_count}</p>
                    <p className="text-[10px] text-muted-foreground">Usuários</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold">{formatDate(t.created_at)}</p>
                    <p className="text-[10px] text-muted-foreground">Criado</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-primary">{formatRelative(t._last_activity)}</p>
                    <p className="text-[10px] text-muted-foreground">Atividade</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-muted-foreground">Limite:</span>
                  <Input
                    type="number"
                    min={1}
                    max={100}
                    className="w-16 h-6 text-center text-xs"
                    value={editingLimits[t.id] ?? t.limite_obras}
                    onChange={e => setEditingLimits(prev => ({ ...prev, [t.id]: parseInt(e.target.value) || 1 }))}
                  />
                  {editingLimits[t.id] !== undefined && editingLimits[t.id] !== t.limite_obras && (
                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => updateLimit(t.id)}>
                      <Save className="h-3 w-3 text-status-ok" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
          {filteredTenants.length === 0 && (
            <p className="text-center text-sm text-muted-foreground py-8">
              {searchQuery ? "Nenhum resultado encontrado" : "Nenhum cliente cadastrado"}
            </p>
          )}
        </div>
      ) : (
        <Card className="glass-card overflow-x-auto">
          <CardContent className="p-0">
            <Table className="min-w-[700px]">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[40px]">
                    <Checkbox
                      checked={selectedIds.size === filteredTenants.length && filteredTenants.length > 0}
                      onCheckedChange={toggleAll}
                    />
                  </TableHead>
                  <TableHead className="cursor-pointer select-none" onClick={() => handleSort("nome")}>
                    <span className="flex items-center gap-1">Nome <ArrowUpDown className="h-3 w-3" /></span>
                  </TableHead>
                  <TableHead>CNPJ</TableHead>
                  <TableHead className="text-center cursor-pointer select-none" onClick={() => handleSort("_user_count")}>
                    <span className="flex items-center gap-1 justify-center">Usuários <ArrowUpDown className="h-3 w-3" /></span>
                  </TableHead>
                  <TableHead className="text-center cursor-pointer select-none" onClick={() => handleSort("_obra_count")}>
                    <span className="flex items-center gap-1 justify-center">Obras <ArrowUpDown className="h-3 w-3" /></span>
                  </TableHead>
                  <TableHead className="text-center">Limite</TableHead>
                  <TableHead className="text-center">Atividade</TableHead>
                  <TableHead className="cursor-pointer select-none" onClick={() => handleSort("created_at")}>
                    <span className="flex items-center gap-1">Criado <ArrowUpDown className="h-3 w-3" /></span>
                  </TableHead>
                  <TableHead className="w-[60px]">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTenants.map(t => (
                  <TableRow key={t.id} className={selectedIds.has(t.id) ? "bg-primary/5" : ""}>
                    <TableCell>
                      <Checkbox checked={selectedIds.has(t.id)} onCheckedChange={() => toggleSelect(t.id)} />
                    </TableCell>
                    <TableCell className="font-medium">{t.nome}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{t.cnpj || "—"}</TableCell>
                    <TableCell className="text-center">
                      <Badge variant="secondary" className="text-xs">{t._user_count}</Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge
                        variant="secondary"
                        className={`text-xs ${(t._obra_count || 0) >= t.limite_obras ? "bg-destructive/20 text-destructive" : "bg-status-ok/20 text-status-ok"}`}
                      >
                        {t._obra_count}/{t.limite_obras}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <Input
                        type="number"
                        min={1}
                        max={100}
                        className="w-20 h-7 text-center mx-auto"
                        value={editingLimits[t.id] ?? t.limite_obras}
                        onChange={e => setEditingLimits(prev => ({ ...prev, [t.id]: parseInt(e.target.value) || 1 }))}
                      />
                    </TableCell>
                    <TableCell className="text-center">
                      <span className="text-xs text-muted-foreground">{formatRelative(t._last_activity)}</span>
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">{formatDate(t.created_at)}</TableCell>
                    <TableCell>
                      {editingLimits[t.id] !== undefined && editingLimits[t.id] !== t.limite_obras && (
                        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => updateLimit(t.id)}>
                          <Save className="h-3.5 w-3.5 text-status-ok" />
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
                {filteredTenants.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center text-muted-foreground py-8">
                      {searchQuery ? "Nenhum resultado encontrado" : "Nenhum cliente cadastrado"}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
