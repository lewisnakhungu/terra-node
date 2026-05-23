"use client";

import { motion } from "framer-motion";
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
        <motion.span
          key={raised}
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          className="font-semibold text-primary"
        >
          {Math.round(pct)}%
        </motion.span>
        <span className="text-muted-foreground">
          {formatCurrency(raised)} of {formatCurrency(goal)}
        </span>
      </div>
      <Progress value={pct} className="h-3" />
    </div>
  );
}
