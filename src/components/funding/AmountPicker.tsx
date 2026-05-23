"use client";

import { cn } from "@/lib/utils";
import { FUNDING_AMOUNTS } from "@/data/constants";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AmountPickerProps {
  amount: number;
  onChange: (amount: number) => void;
}

export function AmountPicker({ amount, onChange }: AmountPickerProps) {
  return (
    <div className="space-y-3">
      <Label>Contribution Amount (USD)</Label>
      <div className="flex flex-wrap gap-2">
        {FUNDING_AMOUNTS.map((a) => (
          <button
            key={a}
            type="button"
            onClick={() => onChange(a)}
            className={cn(
              "rounded-lg border px-4 py-2 text-sm font-medium transition-colors",
              amount === a
                ? "border-primary bg-primary/10 text-primary"
                : "border-border hover:border-primary/50"
            )}
          >
            ${a}
          </button>
        ))}
      </div>
      <Input
        type="number"
        min={1}
        value={amount}
        onChange={(e) => onChange(Math.max(1, parseFloat(e.target.value) || 1))}
        placeholder="Custom amount"
      />
    </div>
  );
}
