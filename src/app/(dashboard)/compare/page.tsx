import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ComparisonTable } from "@/components/compare/comparison-table";
import { RadarComparison } from "@/components/compare/radar-comparison";
import { SideBySideSummary } from "@/components/compare/side-by-side-summary";
import { DEFAULT_COMPARISON_LIMIT } from "@/lib/constants";
import { formatNumber } from "@/lib/format";
import { normalizeScore } from "@/lib/score";
import type { PackageComparisonRow } from "@/lib/types";

const packages = [
  { name: "React", adoption: 98, maintenance: 94, support: 88, depth: 76, npms: 96, stars: 231000, forks: 47000 },
  { name: "Svelte", adoption: 82, maintenance: 86, support: 79, depth: 68, npms: 84, stars: 79000, forks: 4200 },
  { name: "Solid", adoption: 61, maintenance: 78, support: 72, depth: 54, npms: 73, stars: 29000, forks: 1300 },
].slice(0, DEFAULT_COMPARISON_LIMIT);

export default function ComparePage() {
  const rows: PackageComparisonRow[] = [
    { label: "Adoption growth", values: packages.map((pkg) => `${pkg.adoption}%`) },
    { label: "Maintainer activity", values: packages.map((pkg) => `${pkg.maintenance}%`) },
    { label: "Dependency depth", values: packages.map((pkg) => `${pkg.depth}%`) },
    { label: "Support burden", values: packages.map((pkg) => `${pkg.support}%`) },
    { label: "npms.io benchmark", values: packages.map((pkg) => `${pkg.npms}%`) },
    { label: "GitHub traction", values: packages.map((pkg) => `${formatNumber(pkg.stars)} stars`) },
  ];

  const metrics = [
    { label: "Adoption", values: packages.map((pkg) => normalizeScore(pkg.adoption)) },
    { label: "Maintenance", values: packages.map((pkg) => normalizeScore(pkg.maintenance)) },
    { label: "Support", values: packages.map((pkg) => normalizeScore(pkg.support)) },
    { label: "Depth", values: packages.map((pkg) => normalizeScore(pkg.depth)) },
  ];

  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <Badge tone="info">Comparison workflow</Badge>
          <Badge tone="default">Pinned packages</Badge>
        </div>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl space-y-3">
            <h1 className="text-4xl font-light tracking-tight text-white">Compare packages side by side</h1>
            <p className="text-[#a1a1a1]">Evaluate adoption growth, maintainer activity, dependency depth, support burden, and npms.io scores before choosing a dependency.</p>
          </div>
          <Button className="w-fit">Pin another package</Button>
        </div>
      </section>

      <SideBySideSummary
        items={packages.map((pkg) => ({
          name: pkg.name,
          score: normalizeScore((pkg.adoption + pkg.maintenance + pkg.npms) / 3),
          highlight: pkg.adoption > 90 ? "High adoption" : "Needs review",
          tone: pkg.adoption > 90 ? "success" : "warning",
        }))}
      />

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <ComparisonTable rows={rows} packageNames={packages.map((pkg) => pkg.name)} />
        <RadarComparison packageNames={packages.map((pkg) => pkg.name)} metrics={metrics} />
      </div>

      <Card title="Decision notes" description="Quick takeaways for engineering leaders and maintainers.">
        <div className="grid gap-4 md:grid-cols-3">
          {packages.map((pkg) => (
            <div key={pkg.name} className="rounded-none border border-[#1a1a1a] bg-[#0f0f0f] p-4">
              <h3 className="text-lg font-medium text-white">{pkg.name}</h3>
              <p className="mt-2 text-sm text-[#a1a1a1]">{pkg.name} shows {pkg.adoption > 80 ? "strong" : "moderate"} adoption with {pkg.support > 80 ? "manageable" : "elevated"} support burden.</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
