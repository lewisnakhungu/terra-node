"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GPU_OPTIONS } from "@/data/constants";
import { useTerraNode } from "@/context/TerraNodeContext";
import type { GpuType } from "@/types";

export function GpuSelector() {
  const { computeProfile, setComputeProfile } = useTerraNode();

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>GPU Type</Label>
        <Select
          value={computeProfile.gpuType}
          onValueChange={(v) => setComputeProfile({ gpuType: v as GpuType })}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {GPU_OPTIONS.map((g) => (
              <SelectItem key={g.value} value={g.value}>
                {g.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label>GPU Count</Label>
        <Input
          type="number"
          min={1}
          max={100000}
          value={computeProfile.gpuCount}
          onChange={(e) =>
            setComputeProfile({ gpuCount: Math.max(1, parseInt(e.target.value) || 1) })
          }
        />
      </div>
    </div>
  );
}
