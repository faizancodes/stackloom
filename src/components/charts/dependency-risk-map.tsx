interface DependencyRiskMapProps {
  nodes: Array<{
    name: string;
    risk: number;
    centrality: number;
  }>;
}

export function DependencyRiskMap({ nodes }: DependencyRiskMapProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
      {nodes.map((node) => {
        const riskTone = node.risk > 70 ? "bg-[#2a1111] text-[#ef4444]" : node.risk > 40 ? "bg-[#241a0a] text-[#f59e0b]" : "bg-[#0f1f14] text-[#22c55e]";

        return (
          <div key={node.name} className="rounded-none border border-[#222222] bg-[#0f0f0f] p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h4 className="text-sm font-medium text-white">{node.name}</h4>
                <p className="mt-1 text-xs text-[#666666]">Centrality {node.centrality}%</p>
              </div>
              <span className={`rounded-[4px] px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.05em] ${riskTone}`}>
                Risk {node.risk}%
              </span>
            </div>
            <div className="mt-4 h-2 rounded-none bg-[#1a1a1a]">
              <div className="h-2 rounded-none bg-[var(--accent)]" style={{ width: `${node.centrality}%` }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
