"use client";

import { use, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { FundingProgress } from "@/components/projects/FundingProgress";
import { AmountPicker } from "@/components/funding/AmountPicker";
import { MpesaSim } from "@/components/funding/MpesaSim";
import { ImpactSummary } from "@/components/funding/ImpactSummary";
import { FundingReceipt } from "@/components/funding/FundingReceipt";
import type { Transaction } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTerraNode } from "@/context/TerraNodeContext";
import { formatArea, formatCurrency } from "@/lib/formatters";
import { ArrowLeft } from "lucide-react";

export default function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { projects, loading, submitTransaction } = useTerraNode();
  const project = projects.find((p) => p.id === id);
  const [amount, setAmount] = useState(25);
  const [buyerName, setBuyerName] = useState("");
  const [funded, setFunded] = useState(false);
  const [lastTx, setLastTx] = useState<Transaction | null>(null);

  if (!loading && !project) notFound();
  if (!project) {
    return (
      <PageWrapper className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        <p className="text-muted-foreground">Loading project…</p>
      </PageWrapper>
    );
  }

  const handleFund = async () => {
    if (!buyerName.trim()) return;
    const sqM = amount / project.costPerSqMeter;
    const tx = await submitTransaction({
      type: "micro-fund",
      amount,
      creditsOrArea: sqM,
      projectId: project.id,
      buyerName: buyerName.trim(),
    });
    if (tx) {
      setLastTx(tx);
      setFunded(true);
    }
  };

  return (
    <PageWrapper className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <Button variant="ghost" size="sm" className="mb-6" asChild>
        <Link href="/projects">
          <ArrowLeft className="h-4 w-4" />
          All projects
        </Link>
      </Button>

      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <div className="relative h-64 sm:h-80 rounded-lg overflow-hidden mb-6">
            <Image
              src={project.imageUrl}
              alt={project.name}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div className="flex flex-wrap gap-2 mb-3">
            <Badge className="capitalize">{project.category}</Badge>
            <Badge variant="secondary">{project.status}</Badge>
            {project.verificationScore != null && (
              <Badge variant="outline">D-MRV {project.verificationScore}%</Badge>
            )}
          </div>
          <h1 className="text-2xl font-bold">{project.name}</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {project.location.region}, {project.location.country}
          </p>
          <p className="mt-4 text-muted-foreground leading-relaxed">{project.description}</p>
          <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Target area</p>
              <p className="font-semibold">{formatArea(project.targetArea)}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Restored</p>
              <p className="font-semibold text-primary">{formatArea(project.restoredArea)}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Backers</p>
              <p className="font-semibold">{project.backers}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Cost / m²</p>
              <p className="font-semibold">{formatCurrency(project.costPerSqMeter)}</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <h2 className="text-lg font-semibold">Funding progress</h2>
              <FundingProgress raised={project.fundingRaised} goal={project.fundingGoal} />
            </CardContent>
          </Card>

          {funded && lastTx ? (
            <>
              <ImpactSummary project={project} amount={amount} />
              <FundingReceipt transaction={lastTx} project={project} />
            </>
          ) : (
            <>
              <AmountPicker amount={amount} onChange={setAmount} />
              <div className="space-y-2">
                <Label>Your name</Label>
                <Input
                  value={buyerName}
                  onChange={(e) => setBuyerName(e.target.value)}
                  placeholder="Enter your name"
                />
              </div>
              <MpesaSim
                amount={amount}
                onComplete={handleFund}
                disabled={!buyerName.trim()}
              />
            </>
          )}
        </div>
      </div>
    </PageWrapper>
  );
}
