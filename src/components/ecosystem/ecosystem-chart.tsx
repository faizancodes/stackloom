import { Card } from "@/components/ui/card";

interface EcosystemChartProps {
  points: Array<{
    label: string;
    value: number;
  }>;
}

export function EcosystemChart({ points }: EcosystemChartProps) {
  const max = Math.max(...points.map((point) => point.value), 1);

  return (
    <Card title="Momentum profile" description="Relative ecosystem strength across the selected ranking window.">
      <div className="space-y-4">
        {points.map((point) => (
          <div key={point.label}>
            <div className="mb-2 flex items-center justify-between text-sm text-[#a1a1a1]">
              <span>{point.label}</span>
              <span>{point.value}</span>
            </div>
            <div className="h-3 rounded-none bg-[#1a1a1a]">
              <div className="h-3 rounded-none bg-[var(--accent)]" style={{ width: `${(point.value / max) * 100}%` }} />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
