"use client";

import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useTerraNode } from "@/context/TerraNodeContext";

export function UptimeSlider() {
  const { computeProfile, setComputeProfile } = useTerraNode();

  return (
    <div className="space-y-3">
      <div className="flex justify-between">
        <Label>Daily Uptime</Label>
        <span className="text-sm font-mono text-primary">
          {computeProfile.uptimeHoursPerDay}h / day
        </span>
      </div>
      <Slider
        min={0}
        max={24}
        step={1}
        value={[computeProfile.uptimeHoursPerDay]}
        onValueChange={([v]) => setComputeProfile({ uptimeHoursPerDay: v })}
      />
    </div>
  );
}
