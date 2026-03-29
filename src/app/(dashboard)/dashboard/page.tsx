import Link from "next/link";

import { AlertFeed } from "@/components/dashboard/alert-feed";
import { HealthScorecard } from "@/components/dashboard/health-scorecard";
import { OverviewMetrics } from "@/components/dashboard/overview-metrics";
import { DownloadTrendChart } from "@/components/charts/download-trend-chart";
import { ReleaseVelocityChart } from "@/components/charts/release-velocity-chart";
import { QuestionVolumeChart } from "@/components/charts/question-volume-chart";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { APP_DESCRIPTION } from "@/lib/constants";

const alerts = [
  { id: "1", label: "Maintenance lag", value: "12 days", tone: "warning" as const, description: "Last release is drifting behind issue activity." },
  { id: "2", label: "Bus factor", value: "2 maintainers", tone: "error" as const, description: "Contributor concentration is elevated." },
  { id: "3", label: "Adoption acceleration", value: "+18%", tone: "success" as const, description: "Weekly downloads are trending upward." },
];

const scorecard = { health: 82, momentum: 74, support: 61, adoption: 88, risk: 24 };
const trend = [12, 18, 16, 22, 28, 31, 29, 35, 41, 39, 44, 52];
const releases = [2, 1, 3, 2, 4, 3, 5, 4, 6, 5, 7, 6];
const questions = [8, 10, 9, 12, 14, 13, 15, 17, 16, 18, 20, 19];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <section className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.05em] text-[#7C3AED]">Dashboard</p>
          <h2 className="text-3xl font-light text-white lg:text-4xl">Package health, momentum, and support surface at a glance.</h2>
          <p className="max-w-2xl text-sm text-[#a1a1a1]">{APP_DESCRIPTION}</p>
        </div>
        <div className="flex gap-3">
          <Button>
            <Link href="/search">Search packages</Link>
          </Button>
          <Button variant="secondary">
            <Link href="/compare">Compare</Link>
          </Button>
        </div>
      </section>

      <OverviewMetrics />
      <HealthScorecard scorecard={scorecard} />

      <div className="grid gap-6 xl:grid-cols-3">
        <Card title="Download momentum" description="Weekly download trend across the last quarter." className="xl:col-span-1">
          <DownloadTrendChart data={trend} />
        </Card>
        <Card title="Release velocity" description="Release cadence and maintenance rhythm." className="xl:col-span-1">
          <ReleaseVelocityChart data={releases} />
        </Card>
        <Card title="Support pressure" description="StackExchange question volume and unresolved load." className="xl:col-span-1">
          <QuestionVolumeChart data={questions} />
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <AlertFeed alerts={alerts} />
        <Card title="Momentum snapshot" description="A quick read on the current package posture.">
          <div className="space-y-4 text-sm text-[#a1a1a1]">
            <p>Stackloom combines GitHub activity, npm trends, npms.io quality, and StackExchange pressure into a single decision surface.</p>
            <p>Use the search workspace to filter by release recency, maintainer count, download tier, and unresolved Q&A ratio.</p>
          </div>
        </Card>
      </div>
    </div>
  );
}
