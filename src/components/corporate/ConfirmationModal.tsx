"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Download } from "lucide-react";
import { formatArea, formatCurrency } from "@/lib/formatters";
import { CONVERSION } from "@/data/constants";
import Link from "next/link";

interface ConfirmationModalProps {
  open: boolean;
  onClose: () => void;
  credits: number;
  projectName: string;
  amount: number;
  certificateId: string;
}

export function ConfirmationModal({
  open,
  onClose,
  credits,
  projectName,
  amount,
  certificateId,
}: ConfirmationModalProps) {
  const sqM = credits * CONVERSION.SQM_PER_CREDIT;

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="mx-auto mb-2 rounded-full bg-primary/20 p-3">
            <CheckCircle2 className="h-10 w-10 text-primary" />
          </div>
          <DialogTitle className="text-center">Restoration Credits Issued</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 text-center">
          <p className="text-muted-foreground">
            You purchased <span className="text-primary font-semibold">{credits}</span> credits for{" "}
            <span className="font-medium">{projectName}</span>
          </p>
          <div className="rounded-lg border border-primary/30 bg-primary/5 p-4 font-mono text-xs text-left space-y-1">
            <p>Certificate ID: {certificateId}</p>
            <p>Land Offset: {formatArea(sqM)}</p>
            <p>Amount: {formatCurrency(amount)}</p>
            <p>Status: Verified (simulated D-MRV)</p>
          </div>
          <div className="flex gap-2 justify-center">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-1" />
              Download PDF
            </Button>
            <Button size="sm" asChild>
              <Link href="/projects">View Projects</Link>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
