import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

interface SupportSurfaceProps {
  totalQuestions: number;
  unresolvedRatio: number;
  recentQuestions: number;
  tags: string[];
}

export function SupportSurface({ totalQuestions, unresolvedRatio, recentQuestions, tags }: SupportSurfaceProps) {
  return (
    <Card title="Support surface" description="StackExchange demand and unresolved load across the package ecosystem.">
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-none border border-[#1a1a1a] bg-[#0f0f0f] p-4">
          <div className="text-xs uppercase tracking-[0.05em] text-[#666666]">Questions</div>
          <div className="mt-2 text-3xl font-light text-white">{totalQuestions}</div>
        </div>
        <div className="rounded-none border border-[#1a1a1a] bg-[#0f0f0f] p-4">
          <div className="text-xs uppercase tracking-[0.05em] text-[#666666]">Unresolved</div>
          <div className="mt-2 text-3xl font-light text-white">{Math.round(unresolvedRatio * 100)}%</div>
        </div>
        <div className="rounded-none border border-[#1a1a1a] bg-[#0f0f0f] p-4">
          <div className="text-xs uppercase tracking-[0.05em] text-[#666666]">Recent</div>
          <div className="mt-2 text-3xl font-light text-white">{recentQuestions}</div>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Badge key={tag}>{tag}</Badge>
        ))}
      </div>
    </Card>
  );
}
