"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, CreditCard } from "lucide-react";

interface PaymentSimProps {
  onComplete: () => void;
  disabled?: boolean;
}

export function PaymentSim({ onComplete, disabled }: PaymentSimProps) {
  const [processing, setProcessing] = useState(false);
  const [cardNumber, setCardNumber] = useState("4242 4242 4242 4242");

  const handlePay = async () => {
    setProcessing(true);
    await new Promise((r) => setTimeout(r, 2000));
    setProcessing(false);
    onComplete();
  };

  return (
    <div className="space-y-4 rounded-xl border border-border p-6 glass">
      <div className="flex items-center gap-2 text-muted-foreground">
        <CreditCard className="h-5 w-5" />
        <span className="text-sm">Simulated corporate payment</span>
      </div>
      <div className="space-y-2">
        <Label>Card Number</Label>
        <Input value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Expiry</Label>
          <Input defaultValue="12/28" />
        </div>
        <div className="space-y-2">
          <Label>CVC</Label>
          <Input defaultValue="123" type="password" />
        </div>
      </div>
      <Button className="w-full" onClick={handlePay} disabled={disabled || processing}>
        {processing ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Processing…
          </>
        ) : (
          "Complete Purchase"
        )}
      </Button>
    </div>
  );
}
