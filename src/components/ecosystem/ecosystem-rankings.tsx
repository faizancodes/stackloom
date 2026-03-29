import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { formatNumber } from "@/lib/format";

interface EcosystemRankingsProps {
  packages: Array<{
    name: string;
    stars: number;
    forks: number;
    downloads: number;
    unresolvedRatio: number;
    trend: number;
  }>;
}

export function EcosystemRankings({ packages }: EcosystemRankingsProps) {
  return (
    <Card title="Ecosystem rankings" description="Libraries ordered by momentum, support burden, and repository traction.">
      <div className="space-y-3">
        {packages.map((pkg, index) => (
          <div key={pkg.name} className="flex flex-col gap-3 border-b border-[#1a1a1a] pb-3 last:border-b-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-[#666666]">#{index + 1}</span>
                <h4 className="text-base font-medium text-white">{pkg.name}</h4>
                {pkg.trend > 0 ? <Badge tone="success">Rising</Badge> : <Badge tone="warning">Watch</Badge>}
              </div>
              <p className="mt-1 text-sm text-[#a1a1a1]">{formatNumber(pkg.stars)} stars · {formatNumber(pkg.forks)} forks · {formatNumber(pkg.downloads)} downloads</p>
            </div>
            <div className="grid grid-cols-3 gap-3 text-right text-sm text-[#a1a1a1] sm:min-w-[260px]">
              <div>
                <div className="text-[10px] uppercase tracking-[0.05em] text-[#666666]">Stars</div>
                <div className="text-white">{formatNumber(pkg.stars)}</div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-[0.05em] text-[#666666]">Downloads</div>
                <div className="text-white">{formatNumber(pkg.downloads)}</div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-[0.05em] text-[#666666]">Unresolved</div>
                <div className="text-white">{Math.round(pkg.unresolvedRatio * 100)}%</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
