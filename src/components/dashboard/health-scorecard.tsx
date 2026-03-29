import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { calculateRiskScore } from "@/lib/score";
import type { PackageScorecard } from "@/lib/types";

interface HealthScorecardProps {
  scorecard: PackageScorecard;
}

export function HealthScorecard({ scorecard }: HealthScorecardProps) {
  const risk = calculateRiskScore(scorecard);

  const items = [
    { label: "Health", value: scorecard.health, tone: "success" as const },
    { label: "Momentum", value: scorecard.momentum, tone: "info" as const },
    { label: "Support", value: scorecard.support, tone: "warning" as const },
    { label: "Adoption", value: scorecard.adoption, tone: "success" as const },
  ];

  return (
    <Card title="Health scorecard" description="Composite package posture across momentum, support, and adoption.">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {items.map((item) => (
          <div key={item.label} className="rounded-none border border-[#222222] bg-[#0f0f0f] p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-[0.05em] text-[#666666]">{item.label}</span>
              <Badge tone={item.tone}>{item.value}</Badge>
            </div>
          </div>
        ))}
        <div className="rounded-none border border-[#222222] bg-[#0f0f0f] p-4">
          <div className="text-xs uppercase tracking-[0.05em] text-[#666666]">Risk</div>
          <div className="mt-2 text-3xl font-light text-white">{risk}</div>
        </div>
      </div>
    </Card>
  );
}
