import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface EcosystemFiltersProps {
  activeCategory: string;
  categories: string[];
}

export function EcosystemFilters({ activeCategory, categories }: EcosystemFiltersProps) {
  return (
    <Card title="Ecosystem filters" description="Narrow the ranking by language or package family.">
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button key={category} variant={category === activeCategory ? "primary" : "secondary"} className="h-9 px-3 text-xs">
            {category}
          </Button>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <Badge tone="info">GitHub stars</Badge>
        <Badge tone="success">Download momentum</Badge>
        <Badge tone="warning">Unresolved questions</Badge>
      </div>
    </Card>
  );
}
