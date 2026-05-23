"use client";

import { motion } from "framer-motion";
import { TreePine, Users, MapPin } from "lucide-react";
import { formatArea } from "@/lib/formatters";
import type { RestorationProject } from "@/types";

interface ImpactSummaryProps {
  project: RestorationProject;
  amount: number;
}

export function ImpactSummary({ project, amount }: ImpactSummaryProps) {
  const sqM = amount / project.costPerSqMeter;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="rounded-xl border border-primary/30 bg-primary/5 p-6 space-y-4"
    >
      <h3 className="font-semibold text-lg font-[family-name:var(--font-space)]">Your Impact</h3>
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="flex items-center gap-3">
          <TreePine className="h-8 w-8 text-primary" />
          <div>
            <p className="text-2xl font-bold text-primary">{formatArea(sqM)}</p>
            <p className="text-xs text-muted-foreground">land restored</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <MapPin className="h-8 w-8 text-accent" />
          <div>
            <p className="font-medium">{project.location.region}</p>
            <p className="text-xs text-muted-foreground">Kenya</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Users className="h-8 w-8 text-primary" />
          <div>
            <p className="font-medium">Micro-owner</p>
            <p className="text-xs text-muted-foreground">certificate issued</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
