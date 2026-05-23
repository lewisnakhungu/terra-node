export const CONVERSION = {
  LAND_PER_GPU_RACK: 12.5,
  WATER_PER_GPU_HOUR: {
    air: 3.7,
    liquid: 1.2,
    hybrid: 2.4,
  } as const,
  CREDIT_COST_PER_SQM: 8.5,
  SQM_PER_CREDIT: 100,
  FACILITY_OVERHEAD: 2.3,
};

export const GPU_OPTIONS = [
  { value: "A100" as const, label: "NVIDIA A100", powerW: 400 },
  { value: "H100" as const, label: "NVIDIA H100", powerW: 700 },
  { value: "H200" as const, label: "NVIDIA H200", powerW: 700 },
  { value: "B200" as const, label: "NVIDIA B200", powerW: 1000 },
  { value: "Custom" as const, label: "Custom GPU", powerW: 500 },
];

export const CREDIT_TIERS = [
  { credits: 10, label: "Starter", discount: 0 },
  { credits: 50, label: "Growth", discount: 0.05 },
  { credits: 100, label: "Scale", discount: 0.1 },
  { credits: 500, label: "Enterprise", discount: 0.15 },
];

export const FUNDING_AMOUNTS = [5, 10, 25, 50, 100];
