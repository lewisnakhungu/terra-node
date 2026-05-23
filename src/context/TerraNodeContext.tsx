"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { calculateDebt } from "@/lib/calculator";
import { MOCK_PROJECTS } from "@/data/projects";
import type {
  AggregateStats,
  ComputeProfile,
  DebtResult,
  RestorationProject,
  Transaction,
  TransactionType,
} from "@/types";

interface TerraNodeContextValue {
  computeProfile: ComputeProfile;
  setComputeProfile: (p: Partial<ComputeProfile>) => void;
  currentDebt: DebtResult;
  projects: RestorationProject[];
  transactions: Transaction[];
  stats: AggregateStats;
  loading: boolean;
  refreshProjects: () => Promise<void>;
  submitTransaction: (data: {
    type: TransactionType;
    amount: number;
    creditsOrArea: number;
    projectId: string;
    buyerName: string;
  }) => Promise<Transaction | null>;
}

const defaultProfile: ComputeProfile = {
  gpuType: "H100",
  gpuCount: 64,
  uptimeHoursPerDay: 20,
  coolingType: "liquid",
  facilityLocation: "Nairobi",
};

const TerraNodeContext = createContext<TerraNodeContextValue | null>(null);

export function TerraNodeProvider({ children }: { children: React.ReactNode }) {
  const [computeProfile, setProfile] = useState<ComputeProfile>(defaultProfile);
  const [projects, setProjects] = useState<RestorationProject[]>(MOCK_PROJECTS);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [stats, setStats] = useState<AggregateStats>({
    totalRestoredSqM: 208100,
    totalBackers: 4340,
    totalCredits: 2081,
    totalFunded: 384750,
    activeProjects: 8,
  });
  const [loading, setLoading] = useState(true);

  const setComputeProfile = useCallback((p: Partial<ComputeProfile>) => {
    setProfile((prev) => ({ ...prev, ...p }));
  }, []);

  const currentDebt = useMemo(() => calculateDebt(computeProfile), [computeProfile]);

  const refreshProjects = useCallback(async () => {
    try {
      const [projRes, statsRes, txRes] = await Promise.all([
        fetch("/api/projects"),
        fetch("/api/stats"),
        fetch("/api/transactions"),
      ]);
      if (projRes.ok) setProjects(await projRes.json());
      if (statsRes.ok) setStats(await statsRes.json());
      if (txRes.ok) setTransactions(await txRes.json());
    } catch {
      /* fallback to mock */
    }
  }, []);

  useEffect(() => {
    refreshProjects().finally(() => setLoading(false));
  }, [refreshProjects]);

  const submitTransaction = useCallback(
    async (data: {
      type: TransactionType;
      amount: number;
      creditsOrArea: number;
      projectId: string;
      buyerName: string;
    }) => {
      try {
        const res = await fetch("/api/transactions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        if (!res.ok) return null;
        const tx = await res.json();
        await refreshProjects();
        return tx as Transaction;
      } catch {
        return null;
      }
    },
    [refreshProjects]
  );

  const value = useMemo(
    () => ({
      computeProfile,
      setComputeProfile,
      currentDebt,
      projects,
      transactions,
      stats,
      loading,
      refreshProjects,
      submitTransaction,
    }),
    [
      computeProfile,
      setComputeProfile,
      currentDebt,
      projects,
      transactions,
      stats,
      loading,
      refreshProjects,
      submitTransaction,
    ]
  );

  return (
    <TerraNodeContext.Provider value={value}>{children}</TerraNodeContext.Provider>
  );
}

export function useTerraNode() {
  const ctx = useContext(TerraNodeContext);
  if (!ctx) throw new Error("useTerraNode must be used within TerraNodeProvider");
  return ctx;
}
