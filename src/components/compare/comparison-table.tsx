import type { PackageComparisonRow } from "@/lib/types";

import { Card } from "@/components/ui/card";

interface ComparisonTableProps {
  rows: PackageComparisonRow[];
  packageNames: string[];
}

export function ComparisonTable({ rows, packageNames }: ComparisonTableProps) {
  return (
    <Card title="Comparison matrix" description="Side-by-side package signals across the selected set.">
      <div className="overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-0 text-left text-sm">
          <thead>
            <tr className="text-[10px] uppercase tracking-[0.05em] text-[#666666]">
              <th className="border-b border-[#222222] pb-3 pr-4 font-semibold">Metric</th>
              {packageNames.map((name) => (
                <th key={name} className="border-b border-[#222222] pb-3 pr-4 font-semibold">
                  {name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.label} className="align-top">
                <td className="border-b border-[#1a1a1a] py-4 pr-4 font-medium text-white">{row.label}</td>
                {row.values.map((value, index) => (
                  <td key={`${row.label}-${index}`} className="border-b border-[#1a1a1a] py-4 pr-4 text-[#a1a1a1]">
                    {value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
