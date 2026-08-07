import { Card, CardContent } from "@/components/ui/card";
import { Users, HardHat, Mail, ShieldAlert } from "lucide-react";

interface AdminKPIsProps {
  totalUsers: number;
  totalObras: number;
  activeInvites: number;
  blockedUsers: number;
}

export function AdminKPIs({ totalUsers, totalObras, activeInvites, blockedUsers }: AdminKPIsProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      <Card className="glass-card">
        <CardContent className="p-3 sm:p-4 text-center space-y-1">
          <Users className="h-4 w-4 sm:h-5 sm:w-5 mx-auto text-primary" />
          <p className="text-xl sm:text-2xl font-bold text-primary">{totalUsers}</p>
          <p className="text-[10px] sm:text-xs text-muted-foreground">Usuários</p>
        </CardContent>
      </Card>
      <Card className="glass-card">
        <CardContent className="p-3 sm:p-4 text-center space-y-1">
          <HardHat className="h-4 w-4 sm:h-5 sm:w-5 mx-auto text-status-ok" />
          <p className="text-xl sm:text-2xl font-bold text-status-ok">{totalObras}</p>
          <p className="text-[10px] sm:text-xs text-muted-foreground">Obras</p>
        </CardContent>
      </Card>
      <Card className="glass-card">
        <CardContent className="p-3 sm:p-4 text-center space-y-1">
          <Mail className="h-4 w-4 sm:h-5 sm:w-5 mx-auto text-chart-4" />
          <p className="text-xl sm:text-2xl font-bold text-chart-4">{activeInvites}</p>
          <p className="text-[10px] sm:text-xs text-muted-foreground">Convites Ativos</p>
        </CardContent>
      </Card>
      <Card className="glass-card">
        <CardContent className="p-3 sm:p-4 text-center space-y-1">
          <ShieldAlert className="h-4 w-4 sm:h-5 sm:w-5 mx-auto text-destructive" />
          <p className="text-xl sm:text-2xl font-bold text-destructive">{blockedUsers}</p>
          <p className="text-[10px] sm:text-xs text-muted-foreground">Bloqueados</p>
        </CardContent>
      </Card>
    </div>
  );
}
