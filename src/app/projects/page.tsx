"use client";

import { useMemo, useState } from "react";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { ProjectFilters } from "@/components/projects/ProjectFilters";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { useTerraNode } from "@/context/TerraNodeContext";
import { formatArea, formatCurrency } from "@/lib/formatters";

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
    <PageWrapper className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <div className="mb-10">
        <h1 className="text-3xl font-bold">
          Restoration projects
        </h1>
        <p className="mt-2 text-muted-foreground">
          Browse and fund verified land restoration projects across Kenya.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-10 text-center">
        <div>
          <p className="text-2xl font-semibold font-[family-name:var(--font-space)]">{stats.activeProjects}</p>
          <p className="text-sm text-muted-foreground mt-1">Active projects</p>
        </div>
        <div>
          <p className="text-2xl font-semibold font-[family-name:var(--font-space)]">{formatArea(stats.totalRestoredSqM)}</p>
          <p className="text-sm text-muted-foreground mt-1">Total restored</p>
        </div>
        <div>
          <p className="text-2xl font-semibold font-[family-name:var(--font-space)]">{formatCurrency(stats.totalFunded)}</p>
          <p className="text-sm text-muted-foreground mt-1">Total funded</p>
        </div>
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
