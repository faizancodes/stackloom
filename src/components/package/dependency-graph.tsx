import { Badge } from "@/components/ui/badge";

interface DependencyGraphProps {
  root: string;
  dependencies: Array<{
    name: string;
    depth: number;
    risk: number;
    centrality: number;
    maintained: boolean;
  }>;
}

export function DependencyGraph({ root, dependencies }: DependencyGraphProps) {
  return (
    <div className="space-y-4">
      <div className="rounded-none border border-[#222222] bg-[#0f0f0f] p-4">
        <div className="text-xs uppercase tracking-[0.05em] text-[#666666]">Root package</div>
        <div className="mt-2 text-lg font-medium text-white">{root}</div>
      </div>
      <div className="grid gap-3">
        {dependencies.map((dependency) => (
          <div key={dependency.name} className="rounded-none border border-[#1a1a1a] bg-[#0f0f0f] p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="text-sm font-medium text-white">{dependency.name}</div>
                <div className="mt-1 text-xs text-[#666666]">Depth {dependency.depth} · Centrality {dependency.centrality}%</div>
              </div>
              <div className="flex gap-2">
                <Badge tone={dependency.maintained ? "success" : "warning"}>{dependency.maintained ? "Maintained" : "Lagging"}</Badge>
                <Badge tone={dependency.risk > 70 ? "error" : dependency.risk > 40 ? "warning" : "info"}>Risk {dependency.risk}%</Badge>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
