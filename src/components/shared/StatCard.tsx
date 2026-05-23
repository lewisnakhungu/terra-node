import { Card, CardContent } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: React.ReactNode;
  icon: LucideIcon;
  sub?: string;
}

export function StatCard({ label, value, icon: Icon, sub }: StatCardProps) {
  return (
    <Card>
      <CardContent className="flex items-start gap-3 p-4">
        <Icon className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wide">{label}</p>
          <p className="text-xl font-semibold font-[family-name:var(--font-space)] mt-0.5">{value}</p>
          {sub && <p className="text-xs text-muted-foreground mt-1">{sub}</p>}
        </div>
      </CardContent>
    </Card>
  );
}
