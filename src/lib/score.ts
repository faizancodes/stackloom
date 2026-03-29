import type { PackageScorecard } from "@/lib/types";

export function calculateRiskScore(scorecard: PackageScorecard) {
  return Math.max(0, Math.min(100, Math.round(100 - scorecard.health * 0.35 - scorecard.momentum * 0.2 - scorecard.support * 0.25 - scorecard.adoption * 0.2)));
}

export function normalizeScore(value: number) {
  return Math.max(0, Math.min(100, Math.round(value)));
}
