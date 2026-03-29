import type { PackageScorecard } from "@/lib/types";

export function calculateRiskScore(scorecard: PackageScorecard) {
  return Math.max(0, Math.min(100, Math.round(100 - scorecard.health * 0.35 - scorecard.momentum * 0.2 - scorecard.support * 0.25 - scorecard.adoption * 0.2)));
}

export function normalizeScore(value: number) {
  return Math.max(0, Math.min(100, Math.round(value)));
}

export function calculateComparisonScore(values: Array<number | undefined>) {
  const validValues = values.filter((value): value is number => typeof value === "number");
  if (validValues.length === 0) return 0;

  const average = validValues.reduce((sum, value) => sum + value, 0) / validValues.length;
  return normalizeScore(average);
}

export function calculateEcosystemMomentum(stars: number, downloads: number, unresolvedRatio: number) {
  const momentum = stars / 5000 + downloads / 1000000 - unresolvedRatio * 100;
  return normalizeScore(momentum);
}
