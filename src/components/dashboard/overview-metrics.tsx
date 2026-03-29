import { Card } from "@/components/ui/card";

const metrics = [
  { label: "Packages tracked", value: "1,284" },
  { label: "High-risk alerts", value: "18" },
  { label: "Momentum leaders", value: "42" },
  { label: "Support debt", value: "7.4k" },
];

export function OverviewMetrics() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {metrics.map((metric) => (
        <Card key={metric.label} className="p-5">
          <div className="text-xs uppercase tracking-[0.05em] text-[#666666]">{metric.label}</div>
          <div className="mt-3 text-3xl font-light text-white">{metric.value}</div>
        </Card>
      ))}
    </div>
  );
}
