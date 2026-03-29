"use client";

import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useStackloomStore } from "@/lib/store";
import type { AlertRule } from "@/lib/types";

const metricOptions: Array<{ value: AlertRule["metric"]; label: string; description: string }> = [
  { value: "commitInactivity", label: "GitHub commit inactivity", description: "Track days since the last meaningful commit." },
  { value: "downloadDrop", label: "npm download drop", description: "Alert when weekly downloads fall below a threshold." },
  { value: "unresolvedRatio", label: "StackExchange unresolved ratio", description: "Watch for support debt and unanswered questions." },
  { value: "maintenanceScore", label: "npms.io maintenance score", description: "Flag packages with weakening maintenance signals." },
];

interface AlertRuleBuilderProps {
  packageName?: string;
  slug?: string;
  ecosystem?: string;
}

export function AlertRuleBuilder({ packageName = "react-query", slug = "react-query", ecosystem = "npm" }: AlertRuleBuilderProps) {
  const addAlertRule = useStackloomStore((state) => state.addAlertRule);
  const [name, setName] = useState("Maintenance lag");
  const [metric, setMetric] = useState<AlertRule["metric"]>("commitInactivity");
  const [operator, setOperator] = useState<AlertRule["operator"]>("above");
  const [threshold, setThreshold] = useState("14");

  const preview = useMemo(() => {
    const value = Number(threshold) || 0;
    return `${operator === "above" ? "Above" : "Below"} ${value} ${metric === "commitInactivity" ? "days" : metric === "downloadDrop" ? "% drop" : metric === "unresolvedRatio" ? "% unresolved" : "maintenance score"}`;
  }, [metric, operator, threshold]);

  const handleCreateRule = () => {
    addAlertRule({
      id: `${slug}-${metric}-${Date.now()}`,
      name,
      packageName,
      slug,
      ecosystem,
      metric,
      threshold: Number(threshold) || 0,
      operator,
      enabled: true,
      lastTriggeredAt: new Date().toISOString(),
    });
  };

  return (
    <Card title="Rule builder" description="Define thresholds for maintenance lag, bus factor risk, adoption acceleration, and support debt.">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-2 text-sm text-[#a1a1a1]">
          <span className="block text-[10px] font-semibold uppercase tracking-[0.05em] text-white">Rule name</span>
          <input className="w-full border border-[#222222] bg-[#0f0f0f] px-3 py-2 text-white outline-none transition-colors placeholder:text-[#666666] focus:border-[#333333]" value={name} onChange={(event) => setName(event.target.value)} />
        </label>
        <label className="space-y-2 text-sm text-[#a1a1a1]">
          <span className="block text-[10px] font-semibold uppercase tracking-[0.05em] text-white">Threshold</span>
          <input className="w-full border border-[#222222] bg-[#0f0f0f] px-3 py-2 text-white outline-none transition-colors placeholder:text-[#666666] focus:border-[#333333]" value={threshold} onChange={(event) => setThreshold(event.target.value)} inputMode="numeric" />
        </label>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <label className="space-y-2 text-sm text-[#a1a1a1]">
          <span className="block text-[10px] font-semibold uppercase tracking-[0.05em] text-white">Metric</span>
          <select className="w-full border border-[#222222] bg-[#0f0f0f] px-3 py-2 text-white outline-none transition-colors focus:border-[#333333]" value={metric} onChange={(event) => setMetric(event.target.value as AlertRule["metric"])}>
            {metricOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
        <label className="space-y-2 text-sm text-[#a1a1a1]">
          <span className="block text-[10px] font-semibold uppercase tracking-[0.05em] text-white">Condition</span>
          <select className="w-full border border-[#222222] bg-[#0f0f0f] px-3 py-2 text-white outline-none transition-colors focus:border-[#333333]" value={operator} onChange={(event) => setOperator(event.target.value as AlertRule["operator"])}>
            <option value="above">Above threshold</option>
            <option value="below">Below threshold</option>
          </select>
        </label>
      </div>

      <div className="mt-4 rounded-none border border-[#222222] bg-[#0f0f0f] p-4">
        <div className="text-[10px] font-semibold uppercase tracking-[0.05em] text-[#666666]">Preview</div>
        <p className="mt-2 text-sm text-white">{name}</p>
        <p className="mt-1 text-sm text-[#a1a1a1]">{preview}</p>
        <p className="mt-1 text-xs text-[#666666]">{metricOptions.find((option) => option.value === metric)?.description}</p>
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        <Button onClick={handleCreateRule}>Create alert rule</Button>
        <Button variant="secondary" onClick={() => setThreshold(metric === "maintenanceScore" ? "55" : "14")}>Reset threshold</Button>
      </div>
    </Card>
  );
}
