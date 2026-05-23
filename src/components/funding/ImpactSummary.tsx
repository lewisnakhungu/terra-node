"use client";

import { formatArea } from "@/lib/formatters";
import type { RestorationProject } from "@/types";

interface ImpactSummaryProps {
  project: RestorationProject;
  amount: number;
}

export function ImpactSummary({ project, amount }: ImpactSummaryProps) {
  const sqM = amount / project.costPerSqMeter;

  return (
    <div className="rounded-lg border border-primary/30 bg-primary/5 p-6 space-y-4">
      <h3 className="font-semibold text-lg">Your impact</h3>
      <div className="grid gap-4 sm:grid-cols-3 text-sm">
        <div>
          <p className="text-xl font-bold text-primary">{formatArea(sqM)}</p>
          <p className="text-muted-foreground">land restored</p>
        </div>
        <div>
          <p className="font-medium">{project.location.region}</p>
          <p className="text-muted-foreground">Kenya</p>
        </div>
        <div>
          <p className="font-medium">Micro-owner</p>
          <p className="text-muted-foreground">certificate issued</p>
        </div>
      </div>
    </div>
  );
}
