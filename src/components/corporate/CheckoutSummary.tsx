"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CONVERSION } from "@/data/constants";
import { formatArea, formatCurrency } from "@/lib/formatters";
import type { RestorationProject } from "@/types";

interface CheckoutSummaryProps {
  project: RestorationProject | null;
  credits: number;
  buyerName: string;
}

export function CheckoutSummary({ project, credits, buyerName }: CheckoutSummaryProps) {
  const sqM = credits * CONVERSION.SQM_PER_CREDIT;
  const total = sqM * CONVERSION.CREDIT_COST_PER_SQM;

  return (
    <Card className="glass">
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Buyer</span>
          <span>{buyerName || "—"}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Project</span>
          <span className="text-right max-w-[60%]">{project?.name ?? "Select a project"}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Credits</span>
          <span>{credits}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Land restored</span>
          <span>{formatArea(sqM)}</span>
        </div>
        <div className="border-t border-border pt-3 flex justify-between text-lg font-semibold">
          <span>Total</span>
          <span className="text-primary">{formatCurrency(total)}</span>
        </div>
      </CardContent>
    </Card>
  );
}
