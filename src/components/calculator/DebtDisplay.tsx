"use client";

import { useTerraNode } from "@/context/TerraNodeContext";
import { formatArea, formatCurrency, formatLiters } from "@/lib/formatters";
import { Card, CardContent } from "@/components/ui/card";

export function DebtDisplay() {
  const { currentDebt } = useTerraNode();

  const stats = [
    { label: "Land footprint", value: formatArea(currentDebt.landFootprint) },
    { label: "Annual water", value: formatLiters(currentDebt.waterConsumption) },
    { label: "Arable land debt", value: formatArea(currentDebt.arableLandDebt) },
    { label: "Est. offset cost", value: formatCurrency(currentDebt.estimatedCost) },
  ];

  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2">
        {stats.map(({ label, value }) => (
          <Card key={label}>
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground uppercase tracking-wide">{label}</p>
              <p className="text-xl font-semibold font-[family-name:var(--font-space)] mt-1">
                {value}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card className="border-primary/30">
        <CardContent className="p-4 text-center">
          <p className="text-xs text-muted-foreground uppercase tracking-wide">Credits to purchase</p>
          <p className="text-3xl font-bold text-primary font-[family-name:var(--font-space)] mt-1">
            {currentDebt.creditsToPurchase}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
