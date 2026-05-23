"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { formatCurrency, fundingPercent } from "@/lib/formatters";
import type { RestorationProject } from "@/types";

export function ProjectCard({ project }: { project: RestorationProject }) {
  const pct = fundingPercent(project.fundingRaised, project.fundingGoal);

  return (
    <Link href={`/projects/${project.id}`}>
      <Card className="overflow-hidden h-full hover:border-foreground/20 transition-colors">
        <div className="relative h-40 w-full">
          <Image
            src={project.imageUrl}
            alt={project.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
        <CardContent className="p-4 space-y-3">
          <div>
            <p className="font-medium line-clamp-1">{project.name}</p>
            <p className="text-sm text-muted-foreground">
              {project.location.region}, {project.location.country}
            </p>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1.5">
              <span className="text-muted-foreground">{Math.round(pct)}% funded</span>
              <span className="font-mono text-xs">{formatCurrency(project.fundingRaised)}</span>
            </div>
            <Progress value={pct} />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
