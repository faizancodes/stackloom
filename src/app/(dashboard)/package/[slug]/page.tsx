import { notFound } from "next/navigation";

import { ActivityTimeline } from "@/components/package/activity-timeline";
import { DependencyGraph } from "@/components/package/dependency-graph";
import { PackageHeader } from "@/components/package/package-header";
import { PackageTabs } from "@/components/package/package-tabs";
import { SupportSurface } from "@/components/package/support-surface";
import { ContributorConcentrationChart } from "@/components/charts/contributor-concentration-chart";
import { DependencyRiskMap } from "@/components/charts/dependency-risk-map";
import { MaintenanceLagChart } from "@/components/charts/maintenance-lag-chart";
import { DownloadTrendChart } from "@/components/charts/download-trend-chart";
import { QuestionVolumeChart } from "@/components/charts/question-volume-chart";
import { Card } from "@/components/ui/card";
import { formatNumber } from "@/lib/format";
import { calculateRiskScore } from "@/lib/score";
import type { PackageScorecard } from "@/lib/types";

interface PackagePageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ tab?: string }>;
}

const packageData = {
  slug: "react-query",
  name: "react-query",
  ecosystem: "npm",
  description: "A data synchronization library with strong adoption, active maintenance, and a visible support surface.",
  stars: 231000,
  downloads: 2400000,
  repositoryUrl: "https://github.com/TanStack/query",
  scorecard: { health: 92, momentum: 88, support: 64, adoption: 96 } satisfies Omit<PackageScorecard, "risk">,
  activity: {
    downloads: [120, 132, 128, 145, 160, 172, 180, 190, 205, 220, 230, 240],
    releases: [1, 1, 2, 1, 2, 2, 3, 2, 4, 3, 4, 5],
    contributors: [3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9],
    questions: [8, 9, 10, 11, 12, 12, 13, 14, 15, 16, 17, 18],
  },
  support: {
    totalQuestions: 184,
    unresolvedRatio: 0.18,
    recentQuestions: 24,
    tags: ["react-query", "tanstack-query", "data-fetching"],
  },
  dependencies: [
    { name: "@tanstack/query-core", depth: 1, risk: 18, centrality: 92, maintained: true },
    { name: "@tanstack/react-query", depth: 1, risk: 12, centrality: 88, maintained: true },
    { name: "scheduler", depth: 2, risk: 44, centrality: 61, maintained: true },
    { name: "use-sync-external-store", depth: 2, risk: 58, centrality: 54, maintained: false },
    { name: "eventemitter3", depth: 3, risk: 73, centrality: 47, maintained: false },
    { name: "tslib", depth: 3, risk: 31, centrality: 39, maintained: true },
  ],
};

export default async function PackageDetailPage({ params, searchParams }: PackagePageProps) {
  const { slug } = await params;
  const { tab = "overview" } = await searchParams;

  if (slug !== packageData.slug) {
    notFound();
  }

  const score = calculateRiskScore({ ...packageData.scorecard, risk: 0 });

  return (
    <div className="space-y-6">
      <PackageHeader
        name={packageData.name}
        ecosystem={packageData.ecosystem}
        description={packageData.description}
        stars={packageData.stars}
        downloads={packageData.downloads}
        score={score}
        repositoryUrl={packageData.repositoryUrl}
      />

      <PackageTabs slug={slug} activeTab={tab} />

      {tab === "overview" ? (
        <div className="grid gap-6 xl:grid-cols-[1.4fr_0.6fr]">
          <Card title="Activity overview" description="Downloads, releases, contributors, and support demand over time.">
            <ActivityTimeline {...packageData.activity} />
          </Card>
          <SupportSurface {...packageData.support} />
        </div>
      ) : null}

      {tab === "activity" ? (
        <div className="grid gap-6 xl:grid-cols-2">
          <Card title="Downloads" description="Weekly download trend.">
            <DownloadTrendChart data={packageData.activity.downloads} />
          </Card>
          <Card title="Release cadence" description="Release velocity across recent months.">
            <MaintenanceLagChart data={packageData.activity.releases} />
          </Card>
          <Card title="Contributor concentration" description="Maintainer bus factor and contributor spread.">
            <ContributorConcentrationChart data={packageData.activity.contributors} />
          </Card>
          <Card title="Question volume" description="StackExchange support demand.">
            <QuestionVolumeChart data={packageData.activity.questions} />
          </Card>
        </div>
      ) : null}

      {tab === "support" ? <SupportSurface {...packageData.support} /> : null}

      {tab === "dependencies" ? (
        <div className="space-y-6">
          <Card title="Dependency risk explorer" description="High-centrality or under-maintained packages are flagged for review.">
            <DependencyGraph root={packageData.name} dependencies={packageData.dependencies} />
          </Card>
          <Card title="Risk map" description="Centrality and maintenance posture across the dependency surface.">
            <DependencyRiskMap nodes={packageData.dependencies.map((dependency) => ({ name: dependency.name, risk: dependency.risk, centrality: dependency.centrality }))} />
          </Card>
        </div>
      ) : null}

      <Card title="Intelligence summary" description="Cross-referenced signals for decision-making.">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-none border border-[#1a1a1a] bg-[#0f0f0f] p-4 text-sm text-[#a1a1a1]">
            {formatNumber(packageData.downloads)} weekly downloads and strong adoption momentum.
          </div>
          <div className="rounded-none border border-[#1a1a1a] bg-[#0f0f0f] p-4 text-sm text-[#a1a1a1]">
            Contributor concentration remains moderate, with a few high-centrality dependencies.
          </div>
          <div className="rounded-none border border-[#1a1a1a] bg-[#0f0f0f] p-4 text-sm text-[#a1a1a1]">
            Support demand is active but unresolved ratio remains within acceptable bounds.
          </div>
        </div>
      </Card>
    </div>
  );
}
