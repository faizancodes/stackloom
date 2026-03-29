import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatNumber } from "@/lib/format";

interface PackageHeaderProps {
  name: string;
  ecosystem: string;
  description: string;
  stars: number;
  downloads: number;
  score: number;
  repositoryUrl?: string;
}

export function PackageHeader({ name, ecosystem, description, stars, downloads, score, repositoryUrl }: PackageHeaderProps) {
  return (
    <Card>
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone="info">{ecosystem}</Badge>
            <Badge>{formatNumber(stars)} stars</Badge>
          </div>
          <div>
            <h1 className="text-4xl font-light tracking-tight text-white">{name}</h1>
            <p className="mt-3 max-w-3xl text-sm text-[#a1a1a1]">{description}</p>
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-3 lg:min-w-[360px]">
          <div className="rounded-none border border-[#1a1a1a] bg-[#0f0f0f] p-4">
            <div className="text-xs uppercase tracking-[0.05em] text-[#666666]">Score</div>
            <div className="mt-2 text-3xl font-light text-white">{score}</div>
          </div>
          <div className="rounded-none border border-[#1a1a1a] bg-[#0f0f0f] p-4">
            <div className="text-xs uppercase tracking-[0.05em] text-[#666666]">Downloads</div>
            <div className="mt-2 text-3xl font-light text-white">{formatNumber(downloads)}</div>
          </div>
          <div className="rounded-none border border-[#1a1a1a] bg-[#0f0f0f] p-4">
            <div className="text-xs uppercase tracking-[0.05em] text-[#666666]">Repository</div>
            {repositoryUrl ? (
              <Button variant="secondary" className="mt-2 w-full">
                <Link href={repositoryUrl} target="_blank" rel="noreferrer">Open</Link>
              </Button>
            ) : (
              <div className="mt-2 text-sm text-[#a1a1a1]">Not linked</div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
