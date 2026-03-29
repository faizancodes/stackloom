import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { PackageSignal } from "@/lib/types";

interface AlertFeedProps {
  alerts: PackageSignal[];
}

export function AlertFeed({ alerts }: AlertFeedProps) {
  return (
    <Card title="Alert feed" description="Signals that deserve immediate attention.">
      <div className="space-y-3">
        {alerts.map((alert) => (
          <div key={alert.id} className="rounded-none border border-[#222222] bg-[#0f0f0f] p-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="text-sm text-white">{alert.label}</div>
                <p className="mt-1 text-sm text-[#a1a1a1]">{alert.description}</p>
              </div>
              <Badge tone={alert.tone}>{alert.value}</Badge>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
