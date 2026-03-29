import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

const filters = [
  "Language",
  "Category",
  "Release recency",
  "Maintainer count",
  "Download tier",
  "Unresolved Q&A ratio",
  "Repo activity",
];

export function FilterPanel() {
  return (
    <Card title="Filters" description="Facet the search space by operational signals.">
      <div className="space-y-3">
        {filters.map((filter) => (
          <div key={filter} className="flex items-center justify-between rounded-none border border-[#222222] bg-[#0f0f0f] px-3 py-2">
            <span className="text-sm text-white">{filter}</span>
            <Badge>{"Any"}</Badge>
          </div>
        ))}
      </div>
    </Card>
  );
}
