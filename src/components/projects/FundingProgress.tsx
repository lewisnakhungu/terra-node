"use client";

import { Progress } from "@/components/ui/progress";
import { formatCurrency, fundingPercent } from "@/lib/formatters";

interface FundingProgressProps {
  raised: number;
  goal: number;
}

export function FundingProgress({ raised, goal }: FundingProgressProps) {
  const pct = fundingPercent(raised, goal);
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="font-semibold">{Math.round(pct)}%</span>
        <span className="text-muted-foreground">
          {formatCurrency(raised)} of {formatCurrency(goal)}
        </span>
      </div>
      <Progress value={pct} className="h-2.5" />
    </div>
  );
}
