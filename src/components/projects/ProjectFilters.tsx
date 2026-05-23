"use client";

import { cn } from "@/lib/utils";
import type { ProjectCategory, ProjectStatus } from "@/types";

interface ProjectFiltersProps {
  category: string;
  status: string;
  onCategoryChange: (v: string) => void;
  onStatusChange: (v: string) => void;
}

const categories: (ProjectCategory | "all")[] = [
  "all",
  "agricultural",
  "wetland",
  "forest",
  "urban-green",
  "riparian",
];

const statuses: (ProjectStatus | "all")[] = ["all", "funding", "in-progress", "verified", "completed"];

export function ProjectFilters({
  category,
  status,
  onCategoryChange,
  onStatusChange,
}: ProjectFiltersProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => onCategoryChange(c)}
            className={cn(
              "rounded-full px-3 py-1 text-sm capitalize transition-colors",
              category === c
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-muted-foreground hover:text-foreground"
            )}
          >
            {c === "all" ? "All" : c.replace("-", " ")}
          </button>
        ))}
      </div>
      <select
        value={status}
        onChange={(e) => onStatusChange(e.target.value)}
        className="rounded-md border border-input bg-background px-3 py-2 text-sm"
      >
        {statuses.map((s) => (
          <option key={s} value={s}>
            {s === "all" ? "All statuses" : s}
          </option>
        ))}
      </select>
    </div>
  );
}
