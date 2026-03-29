import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { formatRelativeDate } from "@/lib/format";
import type { AlertItem } from "@/lib/types";

interface AlertListProps {
  alerts: AlertItem[];
}

const severityTone = {
  success: "success",
  warning: "warning",
  error: "error",
  info: "info",
} as const;

export function AlertList({ alerts }: AlertListProps) {
  return (
    <Card title="Triggered alerts" description="Operational signals that need review.">
      <div className="space-y-3">
        {alerts.map((alert) => (
          <article key={alert.id} className="rounded-none border border-[#222222] bg-[#0f0f0f] p-4 transition-colors hover:border-[#333333]">
            <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge tone={severityTone[alert.severity]}>{alert.metric}</Badge>
                  <span className="text-sm text-white">{alert.title}</span>
                </div>
                <p className="text-sm text-[#a1a1a1]">{alert.description}</p>
                <div className="flex flex-wrap gap-4 text-xs text-[#666666]">
                  <span>{alert.packageName}</span>
                  <span>{alert.thresholdLabel}</span>
                  <span>{formatRelativeDate(alert.triggeredAt)}</span>
                </div>
              </div>
              <div className="flex flex-col items-start gap-2 md:items-end">
                <Badge tone={severityTone[alert.severity]}>{alert.value}</Badge>
                <Link href={`/package/${alert.slug}`} className="text-sm text-[#7C3AED] transition-colors hover:text-[#6D28D9]">
                  Open package
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </Card>
  );
}
