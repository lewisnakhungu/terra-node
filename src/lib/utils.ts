import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { RestorationProject } from "@/types";
import type { Project } from "@prisma/client";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function projectFromDb(p: Project): RestorationProject {
  return {
    id: p.id,
    name: p.name,
    location: {
      region: p.region,
      country: p.country,
      coordinates: [p.lat, p.lng],
    },
    description: p.description,
    category: p.category as RestorationProject["category"],
    targetArea: p.targetArea,
    restoredArea: p.restoredArea,
    fundingGoal: p.fundingGoal,
    fundingRaised: p.fundingRaised,
    costPerSqMeter: p.costPerSqMeter,
    status: p.status as RestorationProject["status"],
    imageUrl: p.imageUrl,
    timeline: {
      startDate: p.startDate,
      estimatedCompletion: p.estimatedCompletion,
    },
    backers: p.backers,
    verificationScore: p.verificationScore ?? undefined,
  };
}
