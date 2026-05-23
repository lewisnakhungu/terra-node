export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatNumber(value: number, decimals = 0): string {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: decimals,
  }).format(value);
}

export function formatArea(sqM: number): string {
  if (sqM >= 1_000_000) return `${(sqM / 1_000_000).toFixed(2)} km²`;
  if (sqM >= 10_000) return `${(sqM / 10_000).toFixed(1)} ha`;
  return `${formatNumber(sqM)} m²`;
}

export function formatLiters(liters: number): string {
  if (liters >= 1_000_000) return `${(liters / 1_000_000).toFixed(1)}M L`;
  if (liters >= 1_000) return `${(liters / 1_000).toFixed(0)}K L`;
  return `${formatNumber(liters)} L`;
}

export function formatPercent(value: number): string {
  return `${Math.round(value)}%`;
}

export function fundingPercent(raised: number, goal: number): number {
  return goal > 0 ? Math.min(100, (raised / goal) * 100) : 0;
}
