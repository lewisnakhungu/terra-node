export type ProjectCategory =
  | "agricultural"
  | "wetland"
  | "forest"
  | "urban-green"
  | "riparian";

export type ProjectStatus = "funding" | "in-progress" | "verified" | "completed";

export interface RestorationProject {
  id: string;
  name: string;
  location: {
    region: string;
    country: string;
    coordinates: [number, number];
  };
  description: string;
  category: ProjectCategory;
  targetArea: number;
  restoredArea: number;
  fundingGoal: number;
  fundingRaised: number;
  costPerSqMeter: number;
  status: ProjectStatus;
  imageUrl: string;
  timeline: {
    startDate: string;
    estimatedCompletion: string;
  };
  backers: number;
  verificationScore?: number;
}

export type GpuType = "A100" | "H100" | "H200" | "B200" | "Custom";

export interface ComputeProfile {
  gpuType: GpuType;
  gpuCount: number;
  uptimeHoursPerDay: number;
  coolingType: "air" | "liquid" | "hybrid";
  facilityLocation: string;
}

export interface DebtResult {
  landFootprint: number;
  waterConsumption: number;
  arableLandDebt: number;
  estimatedCost: number;
  creditsToPurchase: number;
}

export type TransactionType = "corporate-purchase" | "micro-fund";

export interface Transaction {
  id: string;
  type: TransactionType;
  timestamp: string;
  amount: number;
  creditsOrArea: number;
  projectId: string;
  buyerName: string;
  status: "pending" | "confirmed" | "verified";
}

export interface AggregateStats {
  totalRestoredSqM: number;
  totalBackers: number;
  totalCredits: number;
  totalFunded: number;
  activeProjects: number;
}

export interface Company {
  id: string;
  name: string;
  industry: string;
  logoUrl?: string;
}
