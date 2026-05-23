"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Smartphone } from "lucide-react";

interface MpesaSimProps {
  onComplete: () => void;
  disabled?: boolean;
  amount: number;
}

export function MpesaSim({ onComplete, disabled, amount }: MpesaSimProps) {
  const [phone, setPhone] = useState("254712345678");
  const [processing, setProcessing] = useState(false);
  const [step, setStep] = useState<"idle" | "stk" | "pin">("idle");

  const handleStk = async () => {
    setProcessing(true);
    setStep("stk");
    await new Promise((r) => setTimeout(r, 1500));
    setStep("pin");
    setProcessing(false);
  };

  const handleConfirm = async () => {
    setProcessing(true);
    await new Promise((r) => setTimeout(r, 2000));
    setProcessing(false);
    setStep("idle");
    onComplete();
  };

  return (
    <div className="space-y-4 rounded-lg border border-border p-6">
      <div className="flex items-center gap-2">
        <div className="rounded bg-[#4caf50] px-2 py-0.5 text-xs font-bold text-white">M-PESA</div>
        <span className="text-sm text-muted-foreground">Simulated STK Push</span>
      </div>
      <div className="space-y-2">
        <Label>Phone Number</Label>
        <div className="flex gap-2">
          <Smartphone className="h-10 w-10 p-2 rounded border border-border text-muted-foreground shrink-0" />
          <Input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="2547XXXXXXXX"
          />
        </div>
      </div>
      {step === "idle" && (
        <Button className="w-full bg-[#4caf50] hover:bg-[#43a047] text-white" onClick={handleStk} disabled={disabled}>
          Send STK Push — ${amount}
        </Button>
      )}
      {step === "stk" && (
        <p className="text-center text-sm text-muted-foreground animate-pulse">
          Check your phone for M-Pesa prompt…
        </p>
      )}
      {step === "pin" && (
        <div className="space-y-3">
          <p className="text-sm text-center">Enter your M-Pesa PIN on your phone, then confirm:</p>
          <Button className="w-full" onClick={handleConfirm} disabled={processing}>
            {processing ? <Loader2 className="h-4 w-4 animate-spin" /> : "I've Paid"}
          </Button>
        </div>
      )}
    </div>
  );
}
