"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { formatArea, formatCurrency } from "@/lib/formatters";
import type { RestorationProject, Transaction } from "@/types";

interface FundingReceiptProps {
  transaction: Transaction;
  project: RestorationProject;
}

export function FundingReceipt({ transaction, project }: FundingReceiptProps) {
  const [copied, setCopied] = useState(false);
  const sqM = transaction.creditsOrArea;

  const copyId = async () => {
    await navigator.clipboard.writeText(transaction.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-xl border border-border bg-card p-6 space-y-4 font-[family-name:var(--font-jetbrains)] text-sm">
      <div className="flex items-center gap-2 text-primary">
        <Check className="h-5 w-5" />
        <span className="font-semibold font-[family-name:var(--font-space)]">Payment confirmed</span>
      </div>
      <dl className="grid gap-2">
        <div className="flex justify-between">
          <dt className="text-muted-foreground">Transaction ID</dt>
          <dd className="flex items-center gap-2">
            <span className="truncate max-w-[180px]">{transaction.id}</span>
            <Button type="button" variant="ghost" size="icon" className="h-7 w-7" onClick={copyId}>
              <Copy className="h-3.5 w-3.5" />
            </Button>
            {copied && <span className="text-xs text-primary">Copied</span>}
          </dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-muted-foreground">Amount</dt>
          <dd>{formatCurrency(transaction.amount)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-muted-foreground">Project</dt>
          <dd className="text-right">{project.name}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-muted-foreground">Land restored</dt>
          <dd className="text-primary">{formatArea(sqM)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-muted-foreground">Time</dt>
          <dd>{new Date(transaction.timestamp).toLocaleString()}</dd>
        </div>
      </dl>
    </div>
  );
}
