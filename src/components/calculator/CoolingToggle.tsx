"use client";

import { cn } from "@/lib/utils";
import { useTerraNode } from "@/context/TerraNodeContext";
import { Wind, Droplets, Blend } from "lucide-react";

const options = [
  { value: "air" as const, label: "Air", icon: Wind },
  { value: "liquid" as const, label: "Liquid", icon: Droplets },
  { value: "hybrid" as const, label: "Hybrid", icon: Blend },
];

export function CoolingToggle() {
  const { computeProfile, setComputeProfile } = useTerraNode();

  return (
    <div className="grid grid-cols-3 gap-2">
      {options.map(({ value, label, icon: Icon }) => (
        <button
          key={value}
          type="button"
          onClick={() => setComputeProfile({ coolingType: value })}
          className={cn(
            "flex flex-col items-center gap-2 rounded-lg border p-4 transition-all",
            computeProfile.coolingType === value
              ? "border-primary bg-primary/10 text-primary"
              : "border-border hover:border-primary/50"
          )}
        >
          <Icon className="h-5 w-5" />
          <span className="text-sm font-medium">{label}</span>
        </button>
      ))}
    </div>
  );
}
