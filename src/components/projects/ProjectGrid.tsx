"use client";

import { ProjectCard } from "./ProjectCard";
import type { RestorationProject } from "@/types";

export function ProjectGrid({ projects }: { projects: RestorationProject[] }) {
  if (projects.length === 0) {
    return <p className="text-center text-muted-foreground py-12">No projects match your filters.</p>;
  }
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((p) => (
        <ProjectCard key={p.id} project={p} />
      ))}
    </div>
  );
}
