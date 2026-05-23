"use client";

import { cn } from "@/lib/utils";
import { CREDIT_TIERS } from "@/data/constants";
import { CONVERSION } from "@/data/constants";
import { formatCurrency } from "@/lib/formatters";
import { useTerraNode } from "@/context/TerraNodeContext";

interface CreditSelectorProps {
  selectedCredits: number;
  onSelect: (credits: number) => void;
}

export function CreditSelector({ selectedCredits, onSelect }: CreditSelectorProps) {
  const { currentDebt } = useTerraNode();
  const recommended = currentDebt.creditsToPurchase;

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Recommended from calculator: <span className="text-primary font-mono">{recommended}</span> credits
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        {CREDIT_TIERS.map((tier) => {
          const cost =
            tier.credits *
            CONVERSION.SQM_PER_CREDIT *
            CONVERSION.CREDIT_COST_PER_SQM *
            (1 - tier.discount);
          return (
            <button
              key={tier.credits}
              type="button"
              onClick={() => onSelect(tier.credits)}
              className={cn(
                "rounded-xl border p-4 text-left transition-all",
                selectedCredits === tier.credits
                  ? "border-primary bg-primary/10"
                  : "border-border hover:border-primary/50"
              )}
            >
              <p className="font-semibold">{tier.label}</p>
              <p className="text-2xl font-bold text-primary">{tier.credits} credits</p>
              <p className="text-sm text-muted-foreground">{formatCurrency(cost)}</p>
              {tier.discount > 0 && (
                <p className="text-xs text-accent mt-1">{(tier.discount * 100).toFixed(0)}% volume discount</p>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
