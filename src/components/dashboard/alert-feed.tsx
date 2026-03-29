import Link from "next/link";

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
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <div className="text-sm text-white">{alert.label}</div>
                <p className="mt-1 text-sm text-[#a1a1a1]">{alert.description}</p>
                <p className="mt-2 text-xs text-[#666666]">Triggered by {alert.value}</p>
              </div>
              <div className="flex flex-col items-start gap-2 sm:items-end">
                <Badge tone={alert.tone}>{alert.tone}</Badge>
                <Link href={`/package/${alert.id}`} className="text-sm text-[#7C3AED] transition-colors hover:text-[#6D28D9]">
                  View package
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
