import { CONVERSION } from "@/data/constants";
import type { ComputeProfile, DebtResult } from "@/types";

export function calculateDebt(profile: ComputeProfile): DebtResult {
  const { gpuCount, uptimeHoursPerDay, coolingType } = profile;
  const rackCount = Math.ceil(gpuCount / 8);
  const directLand = rackCount * CONVERSION.LAND_PER_GPU_RACK;
  const totalLand = directLand * CONVERSION.FACILITY_OVERHEAD;
  const dailyWater =
    gpuCount * uptimeHoursPerDay * CONVERSION.WATER_PER_GPU_HOUR[coolingType];
  const annualWater = dailyWater * 365;
  const waterLandEquivalent = annualWater / 1000;
  const arableLandDebt = totalLand + waterLandEquivalent;
  const creditsToPurchase = Math.ceil(arableLandDebt / CONVERSION.SQM_PER_CREDIT);
  const estimatedCost = arableLandDebt * CONVERSION.CREDIT_COST_PER_SQM;
  return {
    landFootprint: totalLand,
    waterConsumption: annualWater,
    arableLandDebt,
    estimatedCost,
    creditsToPurchase,
  };
}
