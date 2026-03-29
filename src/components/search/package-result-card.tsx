import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

interface PackageResultCardProps {
  name: string;
  ecosystem: string;
  score: number;
  downloads: string;
  unresolvedRatio: string;
  activity: string;
  category: string;
}

export function PackageResultCard({ name, ecosystem, score, downloads, unresolvedRatio, activity, category }: PackageResultCardProps) {
  return (
    <div className="rounded-none border border-[#222222] bg-[#0f0f0f] p-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-light text-white">{name}</h3>
            <Badge>{ecosystem}</Badge>
          </div>
          <p className="mt-1 text-sm text-[#a1a1a1]">{category}</p>
        </div>
        <div className="text-right">
          <div className="text-xs uppercase tracking-[0.05em] text-[#666666]">Score</div>
          <div className="text-3xl font-light text-white">{score}</div>
        </div>
      </div>
      <div className="mt-4 grid gap-3 text-sm text-[#a1a1a1] md:grid-cols-3">
        <div>{downloads}</div>
        <div>{unresolvedRatio}</div>
        <div>{activity}</div>
      </div>
    </div>
  );
}
