import { Card } from "@/components/ui/card";

interface RadarComparisonProps {
  packageNames: string[];
  metrics: Array<{
    label: string;
    values: number[];
  }>;
}

export function RadarComparison({ packageNames, metrics }: RadarComparisonProps) {
  return (
    <Card title="Signal balance" description="Normalized scores highlight where each package is strongest.">
      <div className="grid gap-4 md:grid-cols-2">
        {packageNames.map((name, packageIndex) => (
          <div key={name} className="rounded-none border border-[#1a1a1a] bg-[#0f0f0f] p-4">
            <p className="text-sm font-medium text-white">{name}</p>
            <div className="mt-4 space-y-3">
              {metrics.map((metric) => {
                const value = metric.values[packageIndex] ?? 0;
                return (
                  <div key={metric.label}>
                    <div className="mb-1 flex items-center justify-between text-xs text-[#a1a1a1]">
                      <span>{metric.label}</span>
                      <span>{value}%</span>
                    </div>
                    <div className="h-2 rounded-none bg-[#1a1a1a]">
                      <div className="h-2 rounded-none bg-[var(--accent)]" style={{ width: `${value}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
