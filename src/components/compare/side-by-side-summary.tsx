import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

interface SideBySideSummaryProps {
  items: Array<{
    name: string;
    score: number;
    highlight: string;
    tone: "success" | "warning" | "error" | "info";
  }>;
}

export function SideBySideSummary({ items }: SideBySideSummaryProps) {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {items.map((item) => (
        <Card key={item.name} title={item.name}>
          <div className="flex items-center justify-between gap-3">
            <Badge tone={item.tone}>{item.highlight}</Badge>
            <span className="text-3xl font-light text-white">{item.score}</span>
          </div>
          <p className="mt-4 text-sm text-[#a1a1a1]">Composite comparison score based on adoption, support, and maintenance signals.</p>
        </Card>
      ))}
    </div>
  );
}
