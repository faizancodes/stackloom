import { Badge } from "@/components/ui/badge";
import { EcosystemChart } from "@/components/ecosystem/ecosystem-chart";
import { EcosystemFilters } from "@/components/ecosystem/ecosystem-filters";
import { EcosystemRankings } from "@/components/ecosystem/ecosystem-rankings";

const categories = ["JavaScript", "TypeScript", "React", "Node.js"];

const packages = [
  { name: "Next.js", stars: 130000, forks: 29000, downloads: 42000000, unresolvedRatio: 0.18, trend: 92 },
  { name: "Vite", stars: 68000, forks: 6200, downloads: 28000000, unresolvedRatio: 0.12, trend: 88 },
  { name: "Remix", stars: 27000, forks: 2200, downloads: 4100000, unresolvedRatio: 0.24, trend: 61 },
  { name: "Astro", stars: 47000, forks: 3900, downloads: 16000000, unresolvedRatio: 0.15, trend: 84 },
];

export default function EcosystemPage() {
  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <Badge tone="info">Ecosystem intelligence</Badge>
          <Badge tone="default">Category ranking</Badge>
        </div>
        <div className="max-w-3xl space-y-3">
          <h1 className="text-4xl font-light tracking-tight text-white">Rank libraries by momentum and fragility</h1>
          <p className="text-[#a1a1a1]">Cross-reference GitHub traction, npm download momentum, and StackExchange unresolved question ratios to spot emerging or risky packages.</p>
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <EcosystemFilters activeCategory="TypeScript" categories={categories} />
        <EcosystemChart points={packages.map((pkg) => ({ label: pkg.name, value: pkg.trend }))} />
      </div>

      <EcosystemRankings packages={packages} />
    </div>
  );
}
