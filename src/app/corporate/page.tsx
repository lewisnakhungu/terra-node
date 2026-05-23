"use client";

import { useEffect, useState } from "react";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { CreditSelector } from "@/components/corporate/CreditSelector";
import { CheckoutSummary } from "@/components/corporate/CheckoutSummary";
import { PaymentSim } from "@/components/corporate/PaymentSim";
import { ConfirmationModal } from "@/components/corporate/ConfirmationModal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTerraNode } from "@/context/TerraNodeContext";
import { CONVERSION } from "@/data/constants";
import { cn } from "@/lib/utils";

export default function CorporatePage() {
  const { projects, currentDebt, submitTransaction } = useTerraNode();
  const [credits, setCredits] = useState(currentDebt.creditsToPurchase || 50);

  useEffect(() => {
    if (currentDebt.creditsToPurchase > 0) {
      setCredits(currentDebt.creditsToPurchase);
    }
  }, [currentDebt.creditsToPurchase]);
  const [projectId, setProjectId] = useState(projects[0]?.id ?? "");
  const [buyerName, setBuyerName] = useState("Nairobi AI Labs");
  const [confirmed, setConfirmed] = useState(false);
  const [certId, setCertId] = useState("");

  const project = projects.find((p) => p.id === projectId) ?? null;
  const amount = credits * CONVERSION.SQM_PER_CREDIT * CONVERSION.CREDIT_COST_PER_SQM;

  const handleComplete = async () => {
    if (!projectId || !buyerName) return;
    const tx = await submitTransaction({
      type: "corporate-purchase",
      amount,
      creditsOrArea: credits,
      projectId,
      buyerName,
    });
    if (tx) {
      setCertId(`TN-CERT-${tx.id.slice(0, 8).toUpperCase()}`);
      setConfirmed(true);
    }
  };

  return (
    <PageWrapper className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <div className="mb-10">
        <h1 className="text-3xl font-bold">
          Corporate credit purchase
        </h1>
        <p className="mt-2 text-muted-foreground">
          Purchase verified Land Restoration Credits to offset your compute debt.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Select credit tier</CardTitle>
            </CardHeader>
            <CardContent>
              <CreditSelector selectedCredits={credits} onSelect={setCredits} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Select restoration project</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {projects.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setProjectId(p.id)}
                  className={cn(
                    "w-full rounded-lg border p-3 text-left text-sm transition-colors",
                    projectId === p.id
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-foreground/30"
                  )}
                >
                  <span className="font-medium">{p.name}</span>
                  <span className="text-muted-foreground ml-2">— {p.location.region}</span>
                </button>
              ))}
            </CardContent>
          </Card>

          <div className="space-y-2">
            <Label>Company name</Label>
            <Input value={buyerName} onChange={(e) => setBuyerName(e.target.value)} />
          </div>

          <PaymentSim onComplete={handleComplete} disabled={!projectId || !buyerName} />
        </div>

        <CheckoutSummary project={project} credits={credits} buyerName={buyerName} />
      </div>

      <ConfirmationModal
        open={confirmed}
        onClose={() => setConfirmed(false)}
        credits={credits}
        projectName={project?.name ?? ""}
        amount={amount}
        certificateId={certId}
      />
    </PageWrapper>
  );
}
