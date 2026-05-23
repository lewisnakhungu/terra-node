"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { formatCurrency, fundingPercent } from "@/lib/formatters";
import type { RestorationProject } from "@/types";
import { MapPin } from "lucide-react";

export function ProjectCard({ project }: { project: RestorationProject }) {
  const pct = fundingPercent(project.fundingRaised, project.fundingGoal);

  return (
    <Link href={`/projects/${project.id}`}>
      <Card className="overflow-hidden transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 h-full">
        <div className="relative h-40 w-full">
          <Image
            src={project.imageUrl}
            alt={project.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <Badge className="absolute top-3 left-3 capitalize">{project.category}</Badge>
        </div>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg line-clamp-1">{project.name}</CardTitle>
          <CardDescription className="flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            {project.location.region}, {project.location.country}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-muted-foreground">{Math.round(pct)}% funded</span>
              <span className="font-medium">{formatCurrency(project.fundingRaised)}</span>
            </div>
            <Progress value={pct} />
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2">{project.description}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
