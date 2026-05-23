"use client";

import Link from "next/link";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { GpuSelector } from "@/components/calculator/GpuSelector";
import { UptimeSlider } from "@/components/calculator/UptimeSlider";
import { CoolingToggle } from "@/components/calculator/CoolingToggle";
import { DebtDisplay } from "@/components/calculator/DebtDisplay";
import { DebtChart } from "@/components/calculator/DebtChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ArrowRight } from "lucide-react";

export default function CalculatorPage() {
  return (
    <PageWrapper className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <div className="mb-10">
        <h1 className="text-3xl font-bold">
          Compute debt calculator
        </h1>
        <p className="mt-2 text-muted-foreground">
          Quantify the arable land and water footprint of your GPU cluster.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Compute profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <GpuSelector />
            <UptimeSlider />
            <div className="space-y-2">
              <Label>Cooling type</Label>
              <CoolingToggle />
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <DebtDisplay />
          <Card>
            <CardHeader>
              <CardTitle>Debt breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <DebtChart />
            </CardContent>
          </Card>
          <Button size="lg" className="w-full" asChild>
            <Link href="/corporate">
              Offset now
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </PageWrapper>
  );
}
