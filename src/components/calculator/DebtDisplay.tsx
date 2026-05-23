"use client";

import { useTerraNode } from "@/context/TerraNodeContext";
import { AnimatedCounter } from "@/components/shared/AnimatedCounter";
import { formatArea, formatCurrency, formatLiters } from "@/lib/formatters";
import { Card, CardContent } from "@/components/ui/card";
import { LandPlot, Droplets, TreePine, Coins } from "lucide-react";

export function DebtDisplay() {
  const { currentDebt } = useTerraNode();

  const stats = [
    { label: "Land Footprint", value: currentDebt.landFootprint, format: formatArea, icon: LandPlot },
    { label: "Annual Water", value: currentDebt.waterConsumption, format: formatLiters, icon: Droplets },
    { label: "Arable Land Debt", value: currentDebt.arableLandDebt, format: formatArea, icon: TreePine },
    { label: "Est. Offset Cost", value: currentDebt.estimatedCost, format: formatCurrency, icon: Coins },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {stats.map(({ label, value, format, icon: Icon }) => (
        <Card key={label} className="glass">
          <CardContent className="p-5">
            <div className="flex items-center gap-2 mb-2 text-muted-foreground">
              <Icon className="h-4 w-4 text-primary mr-2" />
              <span className="text-sm">{label}</span>
            </div>
            <p className="text-2xl font-semibold font-[family-name:var(--font-space)]">
              <AnimatedCounter value={value} format={format} />
            </p>
          </CardContent>
        </Card>
      ))}
      <Card className="glass sm:col-span-2 border-primary/30">
        <CardContent className="p-5 text-center">
          <p className="text-sm text-muted-foreground">Credits to Purchase</p>
          <p className="text-4xl font-bold text-primary font-[family-name:var(--font-space)]">
            <AnimatedCounter value={currentDebt.creditsToPurchase} />
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
