"use client";

import { useMemo, useState } from "react";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { ProjectFilters } from "@/components/projects/ProjectFilters";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { StatCard } from "@/components/shared/StatCard";
import { AnimatedCounter } from "@/components/shared/AnimatedCounter";
import { useTerraNode } from "@/context/TerraNodeContext";
import { formatArea, formatCurrency } from "@/lib/formatters";
import { Leaf, Target, TrendingUp } from "lucide-react";

export default function ProjectsPage() {
  const { projects, stats } = useTerraNode();
  const [category, setCategory] = useState("all");
  const [status, setStatus] = useState("all");

  const filtered = useMemo(
    () =>
      projects.filter((p) => {
        if (category !== "all" && p.category !== category) return false;
        if (status !== "all" && p.status !== status) return false;
        return true;
      }),
    [projects, category, status]
  );

  return (
    <PageWrapper className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <div className="mb-10">
        <h1 className="text-3xl font-bold font-[family-name:var(--font-space)]">
          Restoration Projects
        </h1>
        <p className="mt-2 text-muted-foreground">
          Browse and fund verified land restoration projects across Kenya.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3 mb-10">
        <StatCard
          label="Active Projects"
          value={<AnimatedCounter value={stats.activeProjects} />}
          icon={Target}
        />
        <StatCard
          label="Total Restored"
          value={<AnimatedCounter value={stats.totalRestoredSqM} format={formatArea} />}
          icon={Leaf}
        />
        <StatCard
          label="Total Funded"
          value={<AnimatedCounter value={stats.totalFunded} format={formatCurrency} />}
          icon={TrendingUp}
        />
      </div>

      <div className="mb-8">
        <ProjectFilters
          category={category}
          status={status}
          onCategoryChange={setCategory}
          onStatusChange={setStatus}
        />
      </div>

      <ProjectGrid projects={filtered} />
    </PageWrapper>
  );
}
